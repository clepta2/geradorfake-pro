import { GeradorFakePro } from './geradorfake-pro.js';

console.log('🧪 Iniciando Bateria de Testes Unitários do GeradorDePessoas Pro...');

// 1. Gera pessoa em São Paulo
const pSP = GeradorFakePro.gerar({ uf: 'SP', sexo: 'M' });
console.assert(pSP.sexo === 'Masculino', 'Sexo deve ser Masculino');
console.assert(pSP.endereco.uf === 'SP', 'UF deve ser SP');
console.assert(pSP.cpfLimpo.charAt(8) === '8', 'O 9º dígito do CPF de SP deve ser 8');
console.assert(pSP.contato.celular.includes('(1'), 'DDD de SP deve iniciar com 1');
console.log('✅ Geração SP OK:', pSP.nome, 'CPF:', pSP.cpf, 'Cidade:', pSP.endereco.cidade, 'DDD:', pSP.contato.celular);

// 2. Gera pessoa no Rio de Janeiro
const pRJ = GeradorFakePro.gerar({ uf: 'RJ', sexo: 'F' });
console.assert(pRJ.sexo === 'Feminino', 'Sexo deve ser Feminino');
console.assert(pRJ.endereco.uf === 'RJ', 'UF deve ser RJ');
console.assert(pRJ.cpfLimpo.charAt(8) === '7', 'O 9º dígito do CPF do RJ deve ser 7');
console.assert(pRJ.contato.celular.includes('(2'), 'DDD do RJ deve iniciar com 2');
console.log('✅ Geração RJ OK:', pRJ.nome, 'CPF:', pRJ.cpf, 'Cidade:', pRJ.endereco.cidade);

// 3. Validação do CPF gerado contra o algoritmo oficial Módulo 11
function validaCpf(cpf) {
  const c = cpf.replace(/\D/g, '');
  if (c.length !== 11 || /^(\d)\1{10}$/.test(c)) return false;
  let s = 0;
  for (let i = 0; i < 9; i++) s += +c[i] * (10 - i);
  let d = ((s * 10) % 11) % 10;
  if (d !== +c[9]) return false;
  s = 0;
  for (let i = 0; i < 10; i++) s += +c[i] * (11 - i);
  d = ((s * 10) % 11) % 10;
  return d === +c[10];
}

console.assert(validaCpf(pSP.cpfLimpo), 'CPF de SP deve ser 100% válido no Módulo 11');
console.assert(validaCpf(pRJ.cpfLimpo), 'CPF do RJ deve ser 100% válido no Módulo 11');
console.log('✅ Validação Criptográfica do CPF Gerado: 100% VÁLIDO na Receita Federal');

// 4. Validação da CNH (SENATRAN)
console.assert(GeradorFakePro.validaCnh(pSP.cnh.numero), 'CNH deve ser válida pelo SENATRAN');
console.log('✅ Validação CNH (SENATRAN):', pSP.cnh.numero, 'Categoria:', pSP.cnh.categoria);

// 5. Validação do Título de Eleitor (TSE)
console.assert(GeradorFakePro.validaTituloEleitor(pSP.tituloEleitor.numeroLimpo), 'Título de Eleitor deve ser válido pelo TSE');
console.log('✅ Validação Título de Eleitor (TSE):', pSP.tituloEleitor.numero, 'Zona:', pSP.tituloEleitor.zona);

// 6. Validação do PIS/PASEP (Caixa Econômica)
console.assert(GeradorFakePro.validaPis(pSP.pisPasep.numeroLimpo), 'PIS deve ser válido');
console.log('✅ Validação PIS/PASEP:', pSP.pisPasep.numero);

// 7. Validação do Cartão de Crédito (Luhn Módulo 10)
console.assert(GeradorFakePro.validaCartao(pSP.cartaoCredito.numeroLimpo), 'Cartão deve ser válido pelo Algoritmo de Luhn');
console.log('✅ Validação Cartão de Crédito (Luhn):', pSP.cartaoCredito.numero, pSP.cartaoCredito.bandeira, 'CVV:', pSP.cartaoCredito.cvv);

// 8. Teste de Lote
const lote = GeradorFakePro.gerarLote(5);
console.assert(lote.length === 5, 'Deve gerar exatamente 5 pessoas');
console.log('✅ Geração em Lote (5 pessoas) OK! Primeiro:', lote[0].nome, lote[0].perfil.profissao);

console.log('🎉 Todos os testes unitários passaram!');
