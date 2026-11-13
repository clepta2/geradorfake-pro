/**
 * GeradorFake Pro — Cloudflare Edge API Worker (<5ms)
 * 
 * Gerador de Dados Fakes Brasileiros Completos (Estilo 4Devs) na Cloudflare Edge.
 * Gera Pessoas, Documentos Válidos (CPF Módulo 11 por UF, RG), Endereços, Contatos e Cartões.
 * 
 * @license MIT
 * @see https://github.com/clepta2/geradorfake-pro
 */

import GeradorFakePro from './geradorfake-pro.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
  'Access-Control-Max-Age': '86400',
  'Content-Type': 'application/json; charset=utf-8'
};

function jsonResponse(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      ...CORS_HEADERS,
      ...extraHeaders
    }
  });
}

function extractApiKey(request) {
  const auth = request.headers.get('Authorization') || '';
  if (auth.startsWith('Bearer ')) {
    return auth.slice(7).trim();
  }
  const xKey = request.headers.get('x-api-key');
  if (xKey) return xKey.trim();

  const url = new URL(request.url);
  return (url.searchParams.get('key') || url.searchParams.get('apiKey') || '').trim();
}

function validateAuth(request) {
  const key = extractApiKey(request);
  if (!key) {
    return {
      authorized: false,
      status: 401,
      error: {
        ok: false,
        code: 'UNAUTHORIZED',
        message: 'Chave de API ausente. Envie o cabeçalho "Authorization: Bearer gen_live_..." ou "x-api-key: gen_live_...".',
        documentation: 'https://github.com/clepta2/geradorfake-pro#readme'
      }
    };
  }

  // Chaves válidas de sandbox ou produção
  if (key.startsWith('gen_') || key.startsWith('demo_') || key.length >= 12) {
    return { authorized: true, key };
  }

  return {
    authorized: false,
    status: 403,
    error: {
      ok: false,
      code: 'INVALID_API_KEY',
      message: 'Chave de API inválida ou formato incorreto.'
    }
  };
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // Rota de Status / Health Check
    if (path === '/' || path === '/health' || path === '/status') {
      return jsonResponse({
        status: 'online',
        service: 'GeradorFake Pro Edge API',
        version: env.API_VERSION || '1.0.0',
        edge_region: request.cf?.colo || 'GRU',
        edge_country: request.cf?.country || 'BR',
        latency_tier: '<5ms',
        endpoints: [
          'GET /api/gerar-pessoa?uf=SP&sexo=M&idadeMin=20&idadeMax=45',
          'GET /api/gerar-lote?quantidade=10&uf=RJ',
          'GET /api/gerar-cpf?uf=SP',
          'GET /api/gerar-cnpj',
          'GET /api/gerar-rg?uf=SP',
          'GET /api/gerar-cnh',
          'GET /api/gerar-cartao?bandeira=visa',
          'GET /api/gerar-veiculo',
          'GET /api/gerar-empresa?uf=SP',
          'GET /api/gerar-pix?chave=11987654321&valor=100.00',
          'GET /api/gerar-conta?banco=341'
        ]
      });
    }

    // Validação de autenticação
    const auth = validateAuth(request);
    if (!auth.authorized) {
      return jsonResponse(auth.error, auth.status);
    }

    try {
      // 1. Gerar Pessoa Completa
      if (path === '/api/gerar-pessoa' || path === '/gerar-pessoa') {
        const sexo = url.searchParams.get('sexo') || 'aleatorio';
        const uf = url.searchParams.get('uf') || null;
        const idadeMin = Number(url.searchParams.get('idadeMin') || 18);
        const idadeMax = Number(url.searchParams.get('idadeMax') || 70);

        const pessoa = GeradorFakePro.gerar({ sexo, uf, idadeMin, idadeMax });
        return jsonResponse({ ok: true, data: pessoa });
      }

      // 2. Gerar Lote de Pessoas
      if (path === '/api/gerar-lote' || path === '/gerar-lote') {
        let quantidade = Number(url.searchParams.get('quantidade') || 5);
        let filtros = {};

        if (request.method === 'POST') {
          try {
            const body = await request.json();
            if (body.quantidade) quantidade = Number(body.quantidade);
            filtros = body.filtros || body;
          } catch (_) {}
        }

        const qtdSegura = Math.max(1, Math.min(50, quantidade));
        const lote = GeradorFakePro.gerarLote(qtdSegura, filtros);
        return jsonResponse({ ok: true, count: lote.length, data: lote });
      }

      // 3. Gerar CPF Válido
      if (path === '/api/gerar-cpf' || path === '/gerar-cpf') {
        const uf = url.searchParams.get('uf') || null;
        const cpf = GeradorFakePro.gerarCpf(uf);
        return jsonResponse({ ok: true, data: cpf });
      }

      // 4. Gerar CNPJ Válido
      if (path === '/api/gerar-cnpj' || path === '/gerar-cnpj') {
        const comPontos = url.searchParams.get('pontos') !== 'false';
        const cnpj = GeradorFakePro.gerarCnpj(comPontos);
        return jsonResponse({ ok: true, data: cnpj });
      }

      // 5. Gerar RG
      if (path === '/api/gerar-rg' || path === '/gerar-rg') {
        const uf = url.searchParams.get('uf') || 'SP';
        const rg = GeradorFakePro.gerarRg(uf);
        return jsonResponse({ ok: true, data: rg });
      }

      // 6. Gerar CNH
      if (path === '/api/gerar-cnh' || path === '/gerar-cnh') {
        const cnh = GeradorFakePro.gerarCnh();
        return jsonResponse({ ok: true, data: cnh });
      }

      // 7. Gerar Cartão de Crédito
      if (path === '/api/gerar-cartao' || path === '/gerar-cartao') {
        const bandeira = url.searchParams.get('bandeira') || 'visa';
        const cartao = GeradorFakePro.gerarCartaoCredito(bandeira);
        return jsonResponse({ ok: true, data: cartao });
      }

      // 8. Gerar Veículo
      if (path === '/api/gerar-veiculo' || path === '/gerar-veiculo') {
        const veiculo = GeradorFakePro.gerarVeiculo();
        return jsonResponse({ ok: true, data: veiculo });
      }

      // 9. Gerar Empresa Completa
      if (path === '/api/gerar-empresa' || path === '/gerar-empresa') {
        const uf = url.searchParams.get('uf') || 'SP';
        const empresa = GeradorFakePro.gerarEmpresa({ uf });
        return jsonResponse({ ok: true, data: empresa });
      }

      // 10. Gerar PIX Copia e Cola / QR Code
      if (path === '/api/gerar-pix' || path === '/gerar-pix') {
        const chave = url.searchParams.get('chave') || '12345678909';
        const valor = Number(url.searchParams.get('valor') || 0);
        const nome = url.searchParams.get('nome') || 'RECEBEDOR TESTE';
        const cidade = url.searchParams.get('cidade') || 'SAO PAULO';
        const txid = url.searchParams.get('txid') || '***';

        const pix = GeradorFakePro.gerarPixPayload({ chave, valor, nome, cidade, txid });
        return jsonResponse({ ok: true, data: pix });
      }

      // 11. Gerar Conta Bancária
      if (path === '/api/gerar-conta' || path === '/gerar-conta') {
        const banco = url.searchParams.get('banco') || '341';
        const conta = GeradorFakePro.gerarContaBancaria(banco);
        return jsonResponse({ ok: true, data: conta });
      }

      return jsonResponse({
        error: 'Endpoint não encontrado',
        endpoints_disponiveis: [
          '/api/gerar-pessoa',
          '/api/gerar-lote',
          '/api/gerar-cpf',
          '/api/gerar-cnpj',
          '/api/gerar-rg',
          '/api/gerar-cnh',
          '/api/gerar-cartao',
          '/api/gerar-veiculo',
          '/api/gerar-empresa',
          '/api/gerar-pix',
          '/api/gerar-conta'
        ]
      }, 404);

    } catch (err) {
      return jsonResponse({
        error: 'Erro interno ao gerar dados',
        details: err.message
      }, 500);
    }
  }
};
