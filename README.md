# 👥 GeradorDePessoas Pro — SDK & API de Dados Fakes Brasileiros

> **API REST e SDK de alta performance em Cloudflare Edge para geração instantânea de pessoas fictícias, documentos matematicamente válidos (CPF Módulo 11 por UF, RG), endereços reais com CEP/DDD, dados bancários e profissões para testes e mockups (Estilo 4Devs) em <5ms.**

[![Status](https://img.shields.io/badge/Status-Cloudflare%20Edge%20API-success.svg)](#)
[![Padrão](https://img.shields.io/badge/Padrão-Receita%20Federal%20Módulo%2011-blue.svg)](#)
[![Latency](https://img.shields.io/badge/Latência-<5ms-cyan.svg)](#)
[![License](https://img.shields.io/badge/License-MIT%20SDK-purple.svg)](LICENSE)

---

## ⚡ O que é o GeradorDePessoas Pro?

O **GeradorDePessoas Pro** é um microsserviço completo desenvolvido pela OZPro Enterprise para desenvolvedores, QA testers, agentes de IA (Lovable, Replit, Cursor, v0) e times de produto que precisam popular bancos de dados de teste (*seeding*), criar protótipos de tela e simular cadastros realistas sem depender de sites lentos ou cheios de anúncios.

### 🌟 Diferenciais Únicos:
1. **Coerência Geográfica Total:** Se a pessoa for gerada em `SP`, o CPF terá obrigatoriamente o 9º dígito `8` (Receita Federal SP), o DDD será da região de SP (`11`, `19`, `13`), o CEP estará na faixa oficial dos Correios e a cidade/bairro serão reais.
2. **Documentos 100% Válidos:** Os CPFs gerados passam em qualquer validador estrito de Módulo 11 da Receita Federal.
3. **Zero I/O no SDK Local:** A biblioteca local roda na memória RAM em **0ms**, sem consumir chamadas de rede.

---

## 🔬 Como Cada Dado é Validado Matematicamente

Todos os dados gerados pelo **GeradorFake Pro** são submetidos a algoritmos oficiais de conformidade criptográfica e estrutural antes de serem devolvidos:

| Dado | Norma / Algoritmo | Como é Validado |
| :--- | :--- | :--- |
| **CPF** | **Receita Federal (Módulo 11)** | Os 2 dígitos verificadores (DV1 e DV2) são calculados com pesos decrescentes de 10 a 2 e 11 a 2. O 9º dígito reflete a jurisdição fiscal real do Estado (ex: SP = 8, RJ = 7). |
| **CNH** | **SENATRAN / RENACH** | 11 dígitos com 2 DVs calculados por Módulo 11 ponderado com fatores 9..2 e 1..9, aceito em sistemas de trânsito. |
| **Título de Eleitor** | **TSE (Justiça Eleitoral)** | 12 dígitos com verificação da UF emissora (SP = 01, RJ = 02...) e 2 DVs pelo algoritmo de pesos 2..9 do TSE. |
| **PIS / PASEP** | **Caixa Econômica Federal** | 11 dígitos com DV calculado pela ponderação oficial `[3, 2, 9, 8, 7, 6, 5, 4, 3, 2]`. |
| **Cartão de Crédito** | **Algoritmo de Luhn (ISO/IEC 7812)** | 16 dígitos com soma ponderada de Módulo 10, prefixo BIN da bandeira (Visa `4`, Master `53`, Elo `636368`), validade futura e CVV de 3 dígitos. |
| **CEP & Endereço** | **DNE Correios & Censo IBGE** | O CEP gerado está estritamente dentro da faixa postal oficial da cidade e do bairro selecionados. |
| **Telefone / Celular** | **Plano de Numeração ANATEL** | DDD coerente com a UF geográfica e celular com 9 dígitos iniciando obrigatoriamente pelo dígito `9`. |
| **E-mail** | **RFC 5322 Standard** | Gerado sem acentos/cedilhas a partir do nome e ano da pessoa com domínios globais válidos. |

---

## 🚀 Como Integrar em seu Projeto

### 1. Instalação

```bash
npm install geradorfake-pro
```

*(Ou utilize o arquivo `geradorfake-pro.js` diretamente no navegador ou Node.js)*.

### 2. Uso Rápido com o SDK (Local em RAM - 0ms de Rede)

```javascript
import { GeradorFakePro } from 'geradorfake-pro';

// 1. Gera uma pessoa com dados completos em São Paulo
const pessoa = GeradorFakePro.gerar({ uf: 'SP', sexo: 'M' });

console.log(pessoa.nome); // 'Lucas Gabriel de Oliveira'
console.log(pessoa.cpf); // '382.491.828-54' (Válido!)
console.log(pessoa.contato.celular); // '(11) 98412-4912'
console.log(pessoa.endereco.cidade); // 'São Paulo'
console.log(pessoa.dadosBancarios.banco); // 'Itaú Unibanco S.A.'

// 2. Gera lote de 10 pessoas para popular banco de dados (Seed)
const usuariosSeed = GeradorFakePro.gerarLote(10, { uf: 'RJ' });
console.log(`Gerados ${usuariosSeed.length} usuários.`);
```

### 3. Chamada via Edge API Cloudflare

```javascript
const api = new GeradorFakePro();
const res = await api.obterPessoa({ uf: 'SP', sexo: 'F' });
console.log(res.pessoa);
```

### 4. Exemplos de Chamadas HTTP Diretas (Curl / Fetch) com Parâmetros de Controle

```bash
# 1. Gerar 1 pessoa completa com nome natural de 3-5 palavras
curl -X GET "https://geradorfake-pro-api.maputo2.workers.dev/api/gerar-pessoa?uf=SP&sexo=F"

# 2. Controlar tipo de senha (forte, alfanumérica ou pin) e tamanho
curl -X GET "https://geradorfake-pro-api.maputo2.workers.dev/api/gerar-pessoa?tipoSenha=forte&tamanhoSenha=16"

# 3. Controlar extensão do texto Lorem Ipsum (de 50 a 500 palavras)
curl -X GET "https://geradorfake-pro-api.maputo2.workers.dev/api/gerar-pessoa?loremWords=350"

# 4. Exportação direta em SQL INSERT para popular banco de dados (Seed)
curl -X GET "https://geradorfake-pro-api.maputo2.workers.dev/api/gerar-pessoa?qtd=50&formato=sql&tabela=clientes"

# 5. Exportação em Planilha CSV (compatível com Excel)
curl -X GET "https://geradorfake-pro-api.maputo2.workers.dev/api/gerar-pessoa?qtd=100&formato=csv"
```

---

## 💻 Como Consultar a API em Qualquer Linguagem de Programação

### 🐍 Python
```python
import requests

url = "https://geradorfake-pro-api.maputo2.workers.dev/api/gerar-pessoa"
res = requests.get(url, params={"uf": "SP", "sexo": "M"}).json()

p = res["pessoa"]
print("Nome:", p["nome"])
print("CPF:", p["cpf"])
print("Cidade:", p["endereco"]["cidade"])
print("Profissão:", p["perfil"]["profissao"])
```

### 🐘 PHP (Laravel, WordPress, Scripts de Seed)
```php
<?php
$url = "https://geradorfake-pro-api.maputo2.workers.dev/api/gerar-pessoa?uf=SP";
$dados = json_decode(file_get_contents($url), true);
$p = $dados['pessoa'];

echo "Nome: " . $p['nome'] . PHP_EOL;
echo "CPF: " . $p['cpf'] . PHP_EOL;
?>
```

### 🔷 C# / .NET
```csharp
using var client = new HttpClient();
string json = await client.GetStringAsync("https://geradorfake-pro-api.maputo2.workers.dev/api/gerar-pessoa?uf=MG");
Console.WriteLine(json);
```

### 🌐 JavaScript / TypeScript (Node.js, React, Next.js)
```javascript
const res = await fetch("https://geradorfake-pro-api.maputo2.workers.dev/api/gerar-pessoa?uf=SP&qtd=3");
const { pessoas } = await res.json();
pessoas.forEach(p => console.log(p.nome, p.cpf, p.endereco.cidade));
```

---

## 🤖 Para Agentes de IA & Geradores de Código (Lovable, Replit, Cursor, v0)

Ao criar aplicações com inteligência artificial, você pode economizar **90% dos seus tokens** em vez de pedir para a IA criar geradores mock complexos:

```text
Ao criar telas de mock, testes de cadastro ou seeds de banco de dados, utilize a API Anycast do GeradorDePessoas Pro para obter dados brasileiros reais:
- Endpoint: GET https://geradorfake-pro-api.maputo2.workers.dev/api/gerar-pessoa?qtd=5&uf=SP
Retorne os dados mockados diretamente da resposta JSON.
```

---

## 🔒 Marketplace de APIs & Ecossistema

Este projeto faz parte do ecossistema de APIs de alta performance OZPro Enterprise:
👉 **[Acessar Ponte API Marketplace](https://ponte.ozpro.com.br)**
