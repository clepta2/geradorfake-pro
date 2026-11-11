/**
 * GeradorDePessoas Pro — Cloudflare Edge API Gateway
 *
 * Responsável por:
 * 1. Geração de Pessoas Fakes Brasileiras Coerentes na borda Anycast (<5ms)
 * 2. Emissão de CPFs válidos por Região Fiscal (Módulo 11) e RGs
 * 3. Endereçamento real com CEP, DDDs e dados bancários para testes
 * 4. Rate Limiting por IP e Chave Comercial
 *
 * @license MIT
 * @see https://github.com/clepta2/geradorfake-pro
 */

import { GeradorFakePro } from './geradorfake-pro.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
  'Access-Control-Max-Age': '86400'
};

const ipBuckets = new Map();

function checkRateLimit(ip, limit = 60, windowMs = 60000) {
  const now = Date.now();
  let entry = ipBuckets.get(ip);
  if (!entry || now > entry.resetAt) {
    entry = { count: 1, resetAt: now + windowMs };
    ipBuckets.set(ip, entry);
    if (ipBuckets.size > 10000) {
      for (const [k, v] of ipBuckets) {
        if (now > v.resetAt) ipBuckets.delete(k);
      }
    }
    return { ok: true, remaining: limit - 1, resetAt: entry.resetAt };
  }
  entry.count++;
  if (entry.count > limit) {
    return { ok: false, remaining: 0, resetAt: entry.resetAt };
  }
  return { ok: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, '') || '/';

    // 1. Preflight CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // 2. Blindagem de Métodos: API estritamente de consulta/geração (Read-only)
    if (request.method !== 'GET' && request.method !== 'POST') {
      return new Response(JSON.stringify({
        ok: false,
        error: 'Método não permitido. Esta API é estritamente de consulta e geração para testes.'
      }), {
        status: 405,
        headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
      });
    }

    // 3. Controle de Rate Limit por IP / Chave comercial
    const clientIp = request.headers.get('CF-Connecting-IP') || request.headers.get('x-real-ip') || '127.0.0.1';
    const authHeader = request.headers.get('Authorization') || request.headers.get('x-api-key') || '';
    const isCommercial = authHeader.length > 10;
    const maxReqs = isCommercial ? 300 : 60;
    const rl = checkRateLimit(clientIp, maxReqs, 60000);

    if (!rl.ok && path !== '/' && path !== '/health' && path !== '/demo') {
      return new Response(JSON.stringify({
        ok: false,
        error: 'Limite de requisições excedido. Limite gratuito: 60 requisições/minuto.',
        retryAfterSeconds: Math.ceil((rl.resetAt - Date.now()) / 1000)
      }, null, 2), {
        status: 429,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          ...CORS_HEADERS,
          'Retry-After': String(Math.max(1, Math.ceil((rl.resetAt - Date.now()) / 1000))),
          'X-RateLimit-Limit': String(maxReqs),
          'X-RateLimit-Remaining': String(rl.remaining)
        }
      });
    }

    // 4. Healthcheck
    if (path === '/health' || path === '/status') {
      return new Response(JSON.stringify({
        ok: true,
        service: 'GeradorDePessoas Pro — Cloudflare Edge API Gateway',
        status: 'operational',
        version: env.API_VERSION || '1.0.0',
        latency: 'edge-sub-5ms',
        padrao: 'FEBRABAN / Receita Federal Módulo 11',
        edgeLocation: request.cf ? request.cf.colo : 'Edge',
        docs: 'https://github.com/clepta2/geradorfake-pro'
      }, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          ...CORS_HEADERS
        }
      });
    }

    // 5. Geração de Pessoas (/api/gerar-pessoa, /api/pessoas, /gerar)
    if (path === '/api/gerar-pessoa' || path === '/api/pessoas' || path === '/api/pessoa' || path === '/gerar') {
      let params = {};

      if (request.method === 'GET') {
        params = {
          sexo: url.searchParams.get('sexo') || url.searchParams.get('genero'),
          uf: url.searchParams.get('uf') || url.searchParams.get('estado'),
          idadeMin: url.searchParams.get('idadeMin'),
          idadeMax: url.searchParams.get('idadeMax'),
          qtd: url.searchParams.get('qtd') || url.searchParams.get('quantidade') || 1,
          tipoSenha: url.searchParams.get('tipoSenha') || url.searchParams.get('senha') || 'forte',
          tamanhoSenha: url.searchParams.get('tamanhoSenha') || url.searchParams.get('tamanho') || 12,
          loremWords: url.searchParams.get('loremWords') || url.searchParams.get('lorem') || url.searchParams.get('palavrasLorem'),
          formato: (url.searchParams.get('formato') || url.searchParams.get('format') || 'json').toLowerCase()
        };
      } else if (request.method === 'POST') {
        try {
          params = await request.json();
          params.formato = (params.formato || params.format || 'json').toLowerCase();
        } catch (_) {}
      }

      const quantidade = parseInt(params.qtd || 1, 10);
      const listaPessoas = quantidade > 1 ? GeradorFakePro.gerarLote(quantidade, params) : [GeradorFakePro.gerar(params)];

      // Enriquece com hashes criptográficos SHA-256 e SHA-1
      for (const p of listaPessoas) {
        if (p.contato && p.contato.senhaSugerida) {
          p.contato.senhaSha256 = await GeradorFakePro.sha256(p.contato.senhaSugerida);
          p.contato.senhaSha1 = await GeradorFakePro.sha1(p.contato.senhaSugerida);
        }
      }

      // Exportação em SQL INSERT (PostgreSQL / MySQL)
      if (params.formato === 'sql') {
        const tabela = url.searchParams.get('tabela') || 'usuarios';
        const sql = GeradorFakePro.exportarSql(listaPessoas, tabela);
        return new Response(sql, {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Content-Disposition': 'inline; filename="seed-pessoas.sql"',
            ...CORS_HEADERS
          }
        });
      }

      // Exportação em CSV (Excel / Planilhas)
      if (params.formato === 'csv') {
        const csv = GeradorFakePro.exportarCsv(listaPessoas);
        return new Response(csv, {
          status: 200,
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': 'attachment; filename="pessoas-fakes.csv"',
            ...CORS_HEADERS
          }
        });
      }

      if (quantidade > 1) {
        return new Response(JSON.stringify({
          ok: true,
          quantidade: listaPessoas.length,
          pessoas: listaPessoas,
          timestamp: new Date().toISOString()
        }, null, 2), {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...CORS_HEADERS,
            'Cache-Control': 'no-cache, no-store'
          }
        });
      }

      return new Response(JSON.stringify({
        ok: true,
        pessoa: listaPessoas[0],
        timestamp: new Date().toISOString()
      }, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          ...CORS_HEADERS,
          'Cache-Control': 'no-cache, no-store'
        }
      });
    }

    // ─── SUÍTE COMPLETA DE 26 ROTAS DE GERAÇÃO (ESTILO 4DEVS INTEGRAL) ───
    if (path.startsWith('/api/gerar/')) {
      const sub = path.replace('/api/gerar/', '').toLowerCase();

      // 1. CPF
      if (sub === 'cpf') {
        const uf = url.searchParams.get('uf');
        const est = GeradorFakePro.getRf(uf);
        return new Response(JSON.stringify({ ok: true, ...GeradorFakePro.gerarCpf(est) }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 2. CNPJ
      if (sub === 'cnpj') {
        const filial = url.searchParams.get('filial') === 'true' || url.searchParams.get('tipo') === 'filial';
        return new Response(JSON.stringify({ ok: true, ...GeradorFakePro.gerarCnpj(filial) }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 3. CNH
      if (sub === 'cnh') {
        return new Response(JSON.stringify({ ok: true, ...GeradorFakePro.gerarCnh() }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 4. RENAVAM
      if (sub === 'renavam') {
        const ren = GeradorFakePro.gerarRenavam();
        return new Response(JSON.stringify({ ok: true, renavam: ren, valido: GeradorFakePro.validaRenavam(ren) }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 5. PIS/PASEP
      if (sub === 'pis' || sub === 'pasep') {
        return new Response(JSON.stringify({ ok: true, ...GeradorFakePro.gerarPis() }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 6. Título de Eleitor
      if (sub === 'titulo' || sub === 'titulo-eleitor') {
        const uf = url.searchParams.get('uf') || 'SP';
        return new Response(JSON.stringify({ ok: true, ...GeradorFakePro.gerarTituloEleitor(uf) }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 7. Cartão de Crédito
      if (sub === 'cartao' || sub === 'cartao-credito') {
        const bandeira = url.searchParams.get('bandeira') || 'visa';
        return new Response(JSON.stringify({ ok: true, ...GeradorFakePro.gerarCartaoCredito(bandeira) }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 8. Conta Bancária
      if (sub === 'conta' || sub === 'conta-bancaria') {
        const banco = url.searchParams.get('banco') || '341';
        return new Response(JSON.stringify({ ok: true, ...GeradorFakePro.gerarContaBancaria(banco) }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 9. Certidão CNJ (32 Dígitos)
      if (sub === 'certidao') {
        const tipoLivro = parseInt(url.searchParams.get('tipo') || 1, 10);
        const ano = parseInt(url.searchParams.get('ano') || 2024, 10);
        return new Response(JSON.stringify({ ok: true, ...GeradorFakePro.gerarCertidao(tipoLivro, ano) }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 10. RG
      if (sub === 'rg') {
        return new Response(JSON.stringify({ ok: true, ...GeradorFakePro.gerarRg() }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 11. Inscrição Estadual (IE)
      if (sub === 'ie' || sub === 'inscricao-estadual') {
        const uf = url.searchParams.get('uf') || 'SP';
        return new Response(JSON.stringify({ ok: true, ...GeradorFakePro.gerarIe(uf) }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 12. Pessoa Completa (3 a 5 palavras reais)
      if (sub === 'pessoa') {
        const sexo = url.searchParams.get('sexo') || url.searchParams.get('genero');
        const uf = url.searchParams.get('uf');
        return new Response(JSON.stringify({ ok: true, pessoa: GeradorFakePro.gerar({ sexo, uf }) }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 13. Empresa Completa
      if (sub === 'empresa') {
        const uf = url.searchParams.get('uf') || 'SP';
        return new Response(JSON.stringify({ ok: true, empresa: GeradorFakePro.gerarEmpresa({ uf }) }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 14. Placa de Veículo
      if (sub === 'placa') {
        const tipo = url.searchParams.get('tipo') || 'mercosul';
        const mercosul = tipo !== 'cinza' && tipo !== 'antiga';
        return new Response(JSON.stringify({ ok: true, placa: GeradorFakePro.gerarPlaca(mercosul), tipo: mercosul ? 'Mercosul' : 'Cinza (Antiga)' }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 15. Veículo Completo
      if (sub === 'veiculo') {
        return new Response(JSON.stringify({ ok: true, veiculo: GeradorFakePro.gerarVeiculo() }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 16. Senha
      if (sub === 'senha') {
        const tipo = url.searchParams.get('tipo') || 'forte';
        const tamanho = parseInt(url.searchParams.get('tamanho') || 12, 10);
        const s = GeradorFakePro.gerarSenhaConfiguravel({ tipo, tamanho });
        return new Response(JSON.stringify({ ok: true, senha: s, md5: GeradorFakePro.md5(s), sha256: await GeradorFakePro.sha256(s) }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 17. Nome Completo Realista
      if (sub === 'nome') {
        const sexo = url.searchParams.get('sexo') || 'M';
        const nome = GeradorFakePro.gerarNomeRealista(sexo);
        return new Response(JSON.stringify({ ok: true, nome, totalPalavras: nome.split(' ').length }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 18. Nicknames
      if (sub === 'nick' || sub === 'nicks' || sub === 'nickname') {
        return new Response(JSON.stringify({ ok: true, nicknames: GeradorFakePro.gerarNicknames() }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 19. Letras Diferentes
      if (sub === 'letras' || sub === 'fontes') {
        const txt = url.searchParams.get('texto') || 'Ponte APIs';
        return new Response(JSON.stringify({ ok: true, ...GeradorFakePro.gerarLetrasDiferentes(txt) }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 20. Símbolos para Copiar
      if (sub === 'simbolos') {
        return new Response(JSON.stringify({ ok: true, simbolos: GeradorFakePro.acervoSimbolos() }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 21. Lorem Ipsum
      if (sub === 'lorem') {
        const qtd = parseInt(url.searchParams.get('palavras') || url.searchParams.get('qtd') || 100, 10);
        const lorem = GeradorFakePro.gerarLorem(qtd);
        return new Response(JSON.stringify({ ok: true, totalPalavras: lorem.split(' ').length, lorem }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 22. Sorteador de Números
      if (sub === 'sorteador' || sub === 'sorteio' || sub === 'numeros') {
        const min = parseInt(url.searchParams.get('min') || 1, 10);
        const max = parseInt(url.searchParams.get('max') || 60, 10);
        const qtd = parseInt(url.searchParams.get('qtd') || 6, 10);
        return new Response(JSON.stringify({ ok: true, ...GeradorFakePro.sortearNumeros(min, max, qtd) }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 23. Imagem Placeholder SVG
      if (sub === 'imagem') {
        const w = parseInt(url.searchParams.get('w') || 400, 10);
        const h = parseInt(url.searchParams.get('h') || 300, 10);
        const bg = url.searchParams.get('bg') || '0f172a';
        const cor = url.searchParams.get('color') || url.searchParams.get('cor') || '38bdf8';
        const txt = url.searchParams.get('text') || '';
        const svg = GeradorFakePro.gerarImagemPlaceholder(w, h, bg, cor, txt);
        return new Response(svg, {
          status: 200, headers: { 'Content-Type': 'image/svg+xml; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 24. Currículo Completo
      if (sub === 'curriculo') {
        const sexo = url.searchParams.get('sexo');
        const uf = url.searchParams.get('uf');
        return new Response(JSON.stringify({ ok: true, curriculo: GeradorFakePro.gerarCurriculo({ sexo, uf }) }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 25. PIX Copia e Cola (EMV BR Code Padrão BACEN com CRC16)
      if (sub === 'pix') {
        const chave = url.searchParams.get('chave') || '52998224725';
        const nome = url.searchParams.get('nome') || 'RECEBEDOR TESTE';
        const cidade = url.searchParams.get('cidade') || 'SAO PAULO';
        const valor = parseFloat(url.searchParams.get('valor') || '0');
        const txid = url.searchParams.get('txid') || '***';
        return new Response(JSON.stringify({ ok: true, ...GeradorFakePro.gerarPixPayload({ chave, nome, cidade, valor, txid }) }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // 26. CIN (Carteira de Identidade Nacional - Nova Lei)
      if (sub === 'cin') {
        const uf = url.searchParams.get('uf');
        const est = GeradorFakePro.getRf(uf);
        return new Response(JSON.stringify({ ok: true, ...GeradorFakePro.gerarCin(est) }), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
        });
      }
    }

    // 6. Endpoint Dedicado de Gerador de Senhas & Hashes (/api/gerar-senha, /api/senhas)
    if (path === '/api/gerar-senha' || path === '/api/senhas' || path === '/api/senha') {
      const tipo = url.searchParams.get('tipo') || url.searchParams.get('modo') || 'forte';
      const tamanho = parseInt(url.searchParams.get('tamanho') || url.searchParams.get('len') || 12, 10);
      const prefixo = url.searchParams.get('prefixo') || 'sk_live';
      const senhaGerada = GeradorFakePro.gerarSenhaConfiguravel({ tipo, tamanho, prefixo });

      return new Response(JSON.stringify({
        ok: true,
        tipo,
        tamanho,
        senha: senhaGerada,
        hashes: {
          md5: GeradorFakePro.md5(senhaGerada),
          sha1: await GeradorFakePro.sha1(senhaGerada),
          sha256: await GeradorFakePro.sha256(senhaGerada)
        },
        timestamp: new Date().toISOString()
      }, null, 2), {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
      });
    }

    // 7. Landing / Playground (Root ou /demo)
    if (path === '/' || path === '/demo' || path === '/index.html') {
      return new Response(getHtmlDemo(), {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    return new Response(JSON.stringify({ ok: false, error: 'Endpoint não encontrado.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
    });
  }
};

function getHtmlDemo() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GeradorDePessoas Pro — API e SDK na Cloudflare Edge</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090d16;
      --card: #111827;
      --accent: #ec4899;
      --accent-glow: rgba(236, 72, 153, 0.25);
      --text: #f9fafb;
      --text-muted: #94a3b8;
      --border: rgba(255,255,255,0.08);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Plus Jakarta Sans', sans-serif;
      padding: 30px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }
    .container { max-width: 860px; width: 100%; }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 99px;
      background: rgba(236,72,153,0.12);
      border: 1px solid rgba(236,72,153,0.3);
      color: var(--accent);
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 16px;
    }
    h1 { font-size: 32px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.5px; }
    p.lead { color: var(--text-muted); font-size: 15px; margin-bottom: 28px; line-height: 1.6; }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    }
    .filters {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
      margin-bottom: 20px;
    }
    select, input {
      background: #040711;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 12px 14px;
      color: #fff;
      font-size: 13.5px;
      font-family: inherit;
      outline: none;
      width: 100%;
    }
    select:focus, input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
    .actions { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
    button.btn-primary {
      background: var(--accent);
      color: #fff;
      font-weight: 700;
      font-size: 14px;
      padding: 12px 24px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s;
    }
    button.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
    .btn-secondary {
      background: rgba(255,255,255,0.06);
      color: var(--text);
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 13px;
      border: 1px solid var(--border);
      cursor: pointer;
    }
    .output-box {
      background: #040711;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 18px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: #38bdf8;
      white-space: pre-wrap;
      word-break: break-all;
      min-height: 220px;
      line-height: 1.5;
    }
    footer { text-align: center; color: var(--text-muted); font-size: 13px; margin-top: auto; padding-top: 40px; }
    footer a { color: var(--accent); text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">⚡ Gerador Estilo 4Devs na Nuvem &bull; Latência sub-5ms</div>
    <h1>GeradorDePessoas Pro — API &amp; SDK</h1>
    <p class="lead">Gera pessoas fictícias com CPF válido (Módulo 11 alinhado à UF), RG, endereço real, celular com DDD, dados bancários e profissão para testes.</p>

    <div class="card">
      <div class="filters">
        <div>
          <label style="font-size:11px;color:var(--text-muted);display:block;margin-bottom:4px">Gênero:</label>
          <select id="filtroSexo">
            <option value="aleatorio">🎲 Aleatório</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>
        <div>
          <label style="font-size:11px;color:var(--text-muted);display:block;margin-bottom:4px">Estado (UF):</label>
          <select id="filtroUf">
            <option value="">🎲 Qualquer Estado</option>
            <option value="SP" selected>SP - São Paulo (DDD 11/19/13)</option>
            <option value="RJ">RJ - Rio de Janeiro (DDD 21/22/24)</option>
            <option value="MG">MG - Minas Gerais (DDD 31/32/34)</option>
            <option value="PR">PR - Paraná (DDD 41/42/43)</option>
            <option value="RS">RS - Rio Grande do Sul (DDD 51/54)</option>
            <option value="SC">SC - Santa Catarina (DDD 47/48)</option>
            <option value="BA">BA - Bahia (DDD 71/75)</option>
            <option value="PE">PE - Pernambuco (DDD 81)</option>
            <option value="CE">CE - Ceará (DDD 85)</option>
            <option value="DF">DF - Distrito Federal (DDD 61)</option>
            <option value="GO">GO - Goiás (DDD 62)</option>
          </select>
        </div>
        <div>
          <label style="font-size:11px;color:var(--text-muted);display:block;margin-bottom:4px">Quantidade:</label>
          <select id="filtroQtd">
            <option value="1">1 Pessoa</option>
            <option value="3">3 Pessoas</option>
            <option value="5">5 Pessoas</option>
            <option value="10">10 Pessoas</option>
          </select>
        </div>
      </div>

      <div class="actions">
        <button class="btn-primary" onclick="gerar()">🎲 Gerar Pessoa Agora</button>
        <button class="btn-secondary" onclick="copiarJson()">📋 Copiar JSON</button>
      </div>
      <div class="output-box" id="resultOutput">Gerando primeira pessoa...</div>
    </div>

    <footer>
      Código aberto no <a href="https://github.com/clepta2/geradorfake-pro" target="_blank">GitHub (clepta2/geradorfake-pro)</a>
    </footer>
  </div>

  <script>
    async function gerar() {
      const sexo = document.getElementById('filtroSexo').value;
      const uf = document.getElementById('filtroUf').value;
      const qtd = document.getElementById('filtroQtd').value;
      const out = document.getElementById('resultOutput');
      out.innerText = 'Gerando pessoa fictícia na borda da Cloudflare...';
      
      const params = new URLSearchParams();
      if (sexo !== 'aleatorio') params.set('sexo', sexo);
      if (uf) params.set('uf', uf);
      if (qtd > 1) params.set('qtd', qtd);

      try {
        const res = await fetch('/api/gerar-pessoa?' + params.toString());
        const data = await res.json();
        out.innerText = JSON.stringify(data, null, 2);
      } catch (err) {
        out.innerText = 'Erro: ' + err.message;
      }
    }

    function copiarJson() {
      const out = document.getElementById('resultOutput').innerText;
      navigator.clipboard.writeText(out);
      alert('JSON copiado para a área de transferência!');
    }

    window.onload = gerar;
  </script>
</body>
</html>`;
}
