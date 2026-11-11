/**
 * GeradorDePessoas Pro — SDK Oficial (Universal ESM / CommonJS / Browser)
 * Gerador de Dados Fakes Brasileiros Completos (Estilo 4Devs) na Cloudflare Edge (<5ms).
 * Gera Pessoas, Documentos Válidos (CPF Módulo 11 por UF, RG), Endereços, Contatos e Cartões.
 * 
 * @license MIT
 * @see https://github.com/clepta2/geradorfake-pro
 */

const NOMES_MASCULINOS = [
  'Joao', 'Carlos', 'Marcelo', 'Gabriel', 'Paulo', 'Fernando', 'Andre', 'Roberto',
  'Leonardo', 'Marcio', 'Rodrigo', 'Felipe', 'Thiago', 'Lucas', 'Matheus', 'Gustavo',
  'Rafael', 'Eduardo', 'Bruno', 'Alexandre', 'Ricardo', 'Fabio', 'Leandro', 'Diego',
  'Vinicius', 'Danilo', 'Henrique', 'Caio', 'Renato', 'Samuel', 'Murilo', 'Vitor',
  'Otavio', 'Breno', 'Luciano', 'Cristiano', 'Rogerio', 'Wagner', 'Mauricio', 'Cesar'
];

const NOMES_FEMININOS = [
  'Maria', 'Ana', 'Mariana', 'Juliana', 'Carolina', 'Beatriz', 'Camila', 'Leticia',
  'Fernanda', 'Gabriela', 'Larissa', 'Amanda', 'Jessica', 'Bruna', 'Helena', 'Laura',
  'Alice', 'Sophia', 'Isabella', 'Manuela', 'Valentina', 'Giovanna', 'Luiza', 'Rafaela',
  'Yasmin', 'Patricia', 'Vanessa', 'Renata', 'Danielle', 'Priscila', 'Aline', 'Tatiane',
  'Bianca', 'Natalia', 'Debora', 'Simone', 'Cristina', 'Flavia', 'Claudia', 'Sandra'
];

const NOMES_MEIO_MASCULINO = [
  'Kebler', 'Eduardo', 'Henrique', 'Augusto', 'Alexandre', 'Roberto', 'Felipe',
  'Vinicius', 'Arthur', 'Rafael', 'Cesar', 'Guilherme', 'Antonio', 'Francisco',
  'Jose', 'Luis', 'Alberto', 'Tadeu', 'Otavio', 'Bento', 'Inacio', 'Afonso', 'Heitor'
];

const NOMES_MEIO_FEMININO = [
  'Eduarda', 'Helena', 'Aparecida', 'Cristina', 'Luiza', 'Beatriz', 'Fernanda',
  'Carolina', 'Gabriela', 'Ines', 'Tereza', 'Clara', 'Vitoria', 'Regina', 'Alice'
];

const SOBRENOMES_MATERNOS = [
  'de Souza', 'de Oliveira', 'de Carvalho', 'de Freitas', 'de Alencar', 'de Paula',
  'de Andrade', 'de Castro', 'de Almeida', 'de Toledo', 'de Macedo',
  'da Silva', 'da Costa', 'da Rocha', 'da Fonseca', 'da Silveira',
  'dos Santos', 'dos Passos', 'dos Anjos',
  'Fagundes', 'Meireles', 'Nogueira', 'Barcellos', 'Vasconcelos', 'Peixoto', 'Medeiros',
  'Guimaraes', 'Pires', 'Toledo', 'Siqueira', 'Antunes', 'Camargo', 'Braga', 'Duarte',
  'Figueiredo', 'Gusmao', 'Macedo', 'Bittencourt', 'Maldonado', 'Fontes', 'Carneiro',
  'Paiva', 'Castilho', 'Queiroz', 'Menezes', 'Borges', 'Coelho', 'Cavalcanti'
];

const SOBRENOMES_PATERNOS = [
  'Pinto', 'Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Lima', 'Carvalho',
  'Ribeiro', 'Martins', 'Ferreira', 'Barbosa', 'Rocha', 'Alves', 'Gomes', 'Costa',
  'Dias', 'Nascimento', 'Andrade', 'Moreira', 'Nunes', 'Marques', 'Machado',
  'Freitas', 'Cardoso', 'Ramos', 'Teixeira', 'Batista', 'Albuquerque', 'Dantas',
  'Fagundes', 'Vasconcelos', 'Meireles', 'Cavalcanti', 'Figueiredo'
];

const PROFISSOES = [
  { cargo: 'Engenheiro de Software', faixa: [6000, 18000] },
  { cargo: 'Analista de Sistemas', faixa: [4500, 9500] },
  { cargo: 'Médico Clínico Geral', faixa: [9000, 25000] },
  { cargo: 'Advogado Associado', faixa: [4000, 12000] },
  { cargo: 'Gerente Comercial', faixa: [5500, 14000] },
  { cargo: 'Contador Sênior', faixa: [4800, 11000] },
  { cargo: 'Arquiteto e Urbanista', faixa: [4200, 10500] },
  { cargo: 'Designer UI/UX', faixa: [4000, 9800] },
  { cargo: 'Enfermeiro Padrão', faixa: [3800, 7500] },
  { cargo: 'Farmacêutico', faixa: [3500, 7000] },
  { cargo: 'Professor do Ensino Médio', faixa: [3200, 6500] },
  { cargo: 'Administrador de Empresas', faixa: [3800, 9000] },
  { cargo: 'Coordenador de Marketing Digital', faixa: [4500, 11500] },
  { cargo: 'Técnico em Eletrônica', faixa: [2800, 5200] },
  { cargo: 'Psicólogo Clínico', faixa: [3500, 8500] }
];

const BANCOS = [
  { codigo: '001', nome: 'Banco do Brasil S.A.' },
  { codigo: '237', nome: 'Banco Bradesco S.A.' },
  { codigo: '341', nome: 'Itaú Unibanco S.A.' },
  { codigo: '033', nome: 'Banco Santander (Brasil) S.A.' },
  { codigo: '104', nome: 'Caixa Econômica Federal' },
  { codigo: '260', nome: 'Nu Pagamentos S.A. (Nubank)' },
  { codigo: '077', nome: 'Banco Inter S.A.' },
  { codigo: '336', nome: 'Banco C6 S.A.' },
  { codigo: '290', nome: 'PagBank (PagSeguro)' }
];

const ESTADOS_BRASIL = {
  SP: {
    nome: 'São Paulo', rf: 8, ddds: ['11', '19', '13', '12', '14', '15', '16', '17', '18'],
    cidades: [
      { nome: 'São Paulo', cepMin: 1000000, cepMax: 5999999, bairros: ['Bela Vista', 'Pinheiros', 'Moema', 'Tatuapé', 'Vila Mariana'], ruas: ['Avenida Paulista', 'Rua Augusta', 'Rua dos Pinheiros', 'Rua Vergueiro'] },
      { nome: 'Campinas', cepMin: 13000000, cepMax: 13139999, bairros: ['Cambuí', 'Barão Geraldo', 'Taquaral', 'Nova Campinas'], ruas: ['Avenida Francisco Glicério', 'Rua Barão de Jaguara', 'Rua Coronel Silva Teles'] },
      { nome: 'Santos', cepMin: 11000000, cepMax: 11099999, bairros: ['Gonzaga', 'Boqueirão', 'Ponta da Praia'], ruas: ['Avenida Ana Costa', 'Avenida Vicente de Carvalho'] }
    ]
  },
  RJ: {
    nome: 'Rio de Janeiro', rf: 7, ddds: ['21', '22', '24'],
    cidades: [
      { nome: 'Rio de Janeiro', cepMin: 20000000, cepMax: 23799999, bairros: ['Copacabana', 'Ipanema', 'Botafogo', 'Tijuca', 'Barra da Tijuca'], ruas: ['Avenida Atlântica', 'Rua Visconde de Pirajá', 'Rua Voluntários da Pátria', 'Avenida das Américas'] },
      { nome: 'Niterói', cepMin: 24000000, cepMax: 24399999, bairros: ['Icaraí', 'Ingá', 'Santa Rosa'], ruas: ['Rua Moreira César', 'Praia de Icaraí'] }
    ]
  },
  MG: {
    nome: 'Minas Gerais', rf: 6, ddds: ['31', '32', '34', '35'],
    cidades: [
      { nome: 'Belo Horizonte', cepMin: 30000000, cepMax: 31999999, bairros: ['Savassi', 'Lourdes', 'Funcionários', 'Buritis', 'Sion'], ruas: ['Avenida Afonso Pena', 'Rua da Bahia', 'Avenida Cristóvão Colombo'] },
      { nome: 'Uberlândia', cepMin: 38400000, cepMax: 38419999, bairros: ['Tibery', 'Santa Mônica', 'Centro'], ruas: ['Avenida Rondon Pacheco', 'Avenida Floriano Peixoto'] }
    ]
  },
  PR: {
    nome: 'Paraná', rf: 9, ddds: ['41', '42', '43', '44', '45'],
    cidades: [
      { nome: 'Curitiba', cepMin: 80000000, cepMax: 82999999, bairros: ['Batel', 'Água Verde', 'Centro Cívico', 'Bigorrilho'], ruas: ['Avenida Sete de Setembro', 'Rua XV de Novembro', 'Rua Cândido de Abreu'] },
      { nome: 'Londrina', cepMin: 86000000, cepMax: 86109999, bairros: ['Gleba Palhano', 'Centro'], ruas: ['Avenida Higienópolis', 'Rua Sergipe'] }
    ]
  },
  RS: {
    nome: 'Rio Grande do Sul', rf: 0, ddds: ['51', '53', '54', '55'],
    cidades: [
      { nome: 'Porto Alegre', cepMin: 90000000, cepMax: 91999999, bairros: ['Moinhos de Vento', 'Petrópolis', 'Menino Deus', 'Bela Vista'], ruas: ['Rua dos Andradas', 'Avenida Carlos Gomes', 'Rua Padre Chagas'] },
      { nome: 'Caxias do Sul', cepMin: 95000000, cepMax: 95119999, bairros: ['Pio X', 'Lourdes'], ruas: ['Rua Sinimbu', 'Rua Júlio de Castilhos'] }
    ]
  },
  SC: {
    nome: 'Santa Catarina', rf: 9, ddds: ['47', '48', '49'],
    cidades: [
      { nome: 'Florianópolis', cepMin: 88000000, cepMax: 88099999, bairros: ['Agronômica', 'Trindade', 'Jurerê Internacional', 'Coqueiros'], ruas: ['Avenida Beira Mar Norte', 'Rua Bocaiúva'] },
      { nome: 'Joinville', cepMin: 89200000, cepMax: 89239999, bairros: ['América', 'Atiradores', 'Glória'], ruas: ['Rua XV de Novembro', 'Rua Otto Boehm'] }
    ]
  },
  BA: {
    nome: 'Bahia', rf: 5, ddds: ['71', '73', '74', '75', '77'],
    cidades: [
      { nome: 'Salvador', cepMin: 40000000, cepMax: 42599999, bairros: ['Pituba', 'Barra', 'Graça', 'Rio Vermelho', 'Caminho das Árvores'], ruas: ['Avenida Tancredo Neves', 'Avenida Sete de Setembro', 'Rua Fonte do Boi'] }
    ]
  },
  PE: {
    nome: 'Pernambuco', rf: 4, ddds: ['81', '87'],
    cidades: [
      { nome: 'Recife', cepMin: 50000000, cepMax: 52999999, bairros: ['Boa Viagem', 'Graças', 'Espinheiro', 'Casa Forte'], ruas: ['Avenida Boa Viagem', 'Rua da Aurora', 'Avenida Agamenon Magalhães'] }
    ]
  },
  CE: {
    nome: 'Ceará', rf: 3, ddds: ['85', '88'],
    cidades: [
      { nome: 'Fortaleza', cepMin: 60000000, cepMax: 61599999, bairros: ['Meireles', 'Aldeota', 'Cocó', 'Papicu'], ruas: ['Avenida Beira Mar', 'Avenida Dom Luís', 'Avenida Santos Dumont'] }
    ]
  },
  DF: {
    nome: 'Distrito Federal', rf: 1, ddds: ['61'],
    cidades: [
      { nome: 'Brasília', cepMin: 70000000, cepMax: 72799999, bairros: ['Asa Sul', 'Asa Norte', 'Lago Sul', 'Sudoeste', 'Águas Claras'], ruas: ['Setor Comercial Sul', 'Setor Hoteleiro Norte', 'Eixo Monumental'] }
    ]
  },
  GO: {
    nome: 'Goiás', rf: 1, ddds: ['62', '64'],
    cidades: [
      { nome: 'Goiânia', cepMin: 74000000, cepMax: 74899999, bairros: ['Setor Bueno', 'Setor Marista', 'Setor Oeste', 'Jardim Goiás'], ruas: ['Avenida 85', 'Avenida T-63', 'Avenida Mutirão'] }
    ]
  }
};

const TIPOS_SANGUINEOS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const CORES = ['Azul', 'Verde', 'Preto', 'Branco', 'Vermelho', 'Cinza', 'Azul Marinho', 'Vinho', 'Verde Oliva'];
const PROVEDORES_EMAIL = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com.br', 'icloud.com'];

const EMPRESAS_ANTERIORES = [
  { nome: 'Ambev S.A.', cnpj: '07.526.557/0001-00', setor: 'Bebidas e Logística' },
  { nome: 'Petróleo Brasileiro S.A. - Petrobras', cnpj: '33.000.167/0001-01', setor: 'Energia e Petróleo' },
  { nome: 'Vale S.A.', cnpj: '33.592.510/0001-54', setor: 'Mineração e Metais' },
  { nome: 'Itaú Unibanco Holding S.A.', cnpj: '60.872.504/0001-23', setor: 'Financeiro e Bancário' },
  { nome: 'Magazine Luiza S.A.', cnpj: '47.960.950/0001-21', setor: 'Varejo e E-commerce' },
  { nome: 'Natura Cosméticos S.A.', cnpj: '71.673.990/0001-77', setor: 'Bens de Consumo e Cosméticos' },
  { nome: 'Totvs S.A.', cnpj: '53.113.791/0001-22', setor: 'Tecnologia da Informação' },
  { nome: 'WEG Equipamentos Elétricos S.A.', cnpj: '07.175.725/0001-60', setor: 'Indústria Eletroeletrônica' },
  { nome: 'Embraer S.A.', cnpj: '07.689.002/0001-89', setor: 'Aeroespacial e Defesa' },
  { nome: 'B3 S.A. - Brasil, Bolsa, Balcão', cnpj: '09.346.601/0001-25', setor: 'Mercado Financeiro' }
];

const LOREM_PARAGRAFOS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.',
  'Sed adipiscing ornare risus. Morbi est est, blandit sit amet, sagittis vel, euismod vel, velit. Pellentesque egestas sem. Suspendisse commodo ullamcorper magna.',
  'Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.'
];

export class GeradorFakePro {
  constructor(options = {}) {
    this.endpoint = options.endpoint || 'https://geradorfake-pro-api.maputo2.workers.dev';
    this.apiKey = options.apiKey || '';
  }

  static sortear(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
  }

  static numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static gerarCpf(ufRf = null) {
    const digitos = [];
    for (let i = 0; i < 8; i++) {
      digitos.push(Math.floor(Math.random() * 10));
    }
    const rf = (ufRf !== null && ufRf >= 0 && ufRf <= 9) ? Number(ufRf) : Math.floor(Math.random() * 10);
    digitos.push(rf);

    let soma1 = 0;
    for (let i = 0; i < 9; i++) soma1 += digitos[i] * (10 - i);
    let r1 = soma1 % 11;
    let d1 = r1 < 2 ? 0 : 11 - r1;
    digitos.push(d1);

    let soma2 = 0;
    for (let i = 0; i < 10; i++) soma2 += digitos[i] * (11 - i);
    let r2 = soma2 % 11;
    let d2 = r2 < 2 ? 0 : 11 - r2;
    digitos.push(d2);

    const limpo = digitos.join('');
    const formatado = `${limpo.slice(0, 3)}.${limpo.slice(3, 6)}.${limpo.slice(6, 9)}-${limpo.slice(9, 11)}`;
    return { limpo, formatado };
  }

  static gerarRg() {
    const d = [];
    for (let i = 0; i < 8; i++) d.push(Math.floor(Math.random() * 10));
    const dv = Math.floor(Math.random() * 10);
    const limpo = d.join('') + dv;
    const formatado = `${limpo.slice(0, 2)}.${limpo.slice(2, 5)}.${limpo.slice(5, 8)}-${dv}`;
    return { limpo, formatado };
  }

  static calcularSigno(dia, mes) {
    if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) return 'Áries';
    if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) return 'Touro';
    if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) return 'Gêmeos';
    if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) return 'Câncer';
    if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) return 'Leão';
    if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) return 'Virgem';
    if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) return 'Libra';
    if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) return 'Escorpião';
    if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) return 'Sagitário';
    if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19)) return 'Capricórnio';
    if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) return 'Aquário';
    return 'Peixes';
  }

  static gerarSenhaForte(tamanho = 12) {
    const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%&*';
    let pass = '';
    for (let i = 0; i < tamanho; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  }

  static validaCpf(cpf) {
    const c = String(cpf || '').replace(/\D/g, '');
    if (c.length !== 11 || /^(\d)\1{10}$/.test(c)) return false;
    let s = 0;
    for (let i = 0; i < 9; i++) s += parseInt(c[i], 10) * (10 - i);
    let d = ((s * 10) % 11) % 10;
    if (d !== parseInt(c[9], 10)) return false;
    s = 0;
    for (let i = 0; i < 10; i++) s += parseInt(c[i], 10) * (11 - i);
    d = ((s * 10) % 11) % 10;
    return d === parseInt(c[10], 10);
  }

  static gerarCnh() {
    const base = [];
    for (let i = 0; i < 9; i++) base.push(Math.floor(Math.random() * 10));

    let s1 = 0;
    for (let i = 0; i < 9; i++) s1 += base[i] * (9 - i);
    let d1 = s1 % 11;
    let inc = 0;
    if (d1 >= 10) {
      d1 = 0;
      inc = 2;
    }

    let s2 = 0;
    for (let i = 0; i < 9; i++) s2 += base[i] * (1 + i);
    let d2 = s2 % 11;
    d2 = d2 >= 10 ? 0 : d2;
    if (inc > 0) d2 = (d2 - inc + 11) % 11;

    const limpo = `${base.join('')}${d1}${d2}`;
    const categorias = ['B', 'AB', 'A', 'C', 'D'];
    return {
      limpo,
      categoria: GeradorFakePro.sortear(categorias),
      emissor: 'SENATRAN / DETRAN'
    };
  }

  static validaCnh(cnh) {
    const c = String(cnh || '').replace(/\D/g, '');
    if (c.length !== 11 || /^(\d)\1{10}$/.test(c)) return false;
    let s1 = 0;
    for (let i = 0; i < 9; i++) s1 += parseInt(c[i], 10) * (9 - i);
    let d1 = s1 % 11;
    let inc = 0;
    if (d1 >= 10) {
      d1 = 0;
      inc = 2;
    }
    if (d1 !== parseInt(c[9], 10)) return false;

    let s2 = 0;
    for (let i = 0; i < 9; i++) s2 += parseInt(c[i], 10) * (1 + i);
    let d2 = s2 % 11;
    d2 = d2 >= 10 ? 0 : d2;
    if (inc > 0) d2 = (d2 - inc + 11) % 11;
    return d2 === parseInt(c[10], 10);
  }

  static gerarTituloEleitor(uf = 'SP') {
    const codigosUf = { SP: '01', RJ: '02', MG: '03', RS: '04', BA: '05', PR: '06', CE: '07', PE: '08', SC: '09', GO: '10', DF: '20' };
    const codUf = codigosUf[uf] || '01';
    const base = [];
    for (let i = 0; i < 8; i++) base.push(Math.floor(Math.random() * 10));
    const parte1 = base.join('');

    let s1 = 0;
    for (let i = 0; i < 8; i++) s1 += parseInt(parte1[i], 10) * (i + 2);
    let d1 = s1 % 11;
    if (d1 === 10) d1 = 0;

    const s2 = (parseInt(codUf[0], 10) * 7) + (parseInt(codUf[1], 10) * 8) + (d1 * 9);
    let d2 = s2 % 11;
    if (d2 === 10) d2 = 0;

    const limpo = `${parte1}${codUf}${d1}${d2}`;
    const zona = String(GeradorFakePro.numeroAleatorio(1, 450)).padStart(3, '0');
    const secao = String(GeradorFakePro.numeroAleatorio(1, 950)).padStart(4, '0');

    return {
      limpo,
      formatado: `${limpo.slice(0, 4)} ${limpo.slice(4, 8)} ${limpo.slice(8, 12)}`,
      zona,
      secao,
      emissor: 'TSE / Justiça Eleitoral'
    };
  }

  static validaTituloEleitor(titulo) {
    const t = String(titulo || '').replace(/\D/g, '');
    if (t.length !== 12) return false;
    const base = t.slice(0, 8);
    const ufCod = t.slice(8, 10);
    const d1 = parseInt(t[10], 10);
    const d2 = parseInt(t[11], 10);

    let s1 = 0;
    for (let i = 0; i < 8; i++) s1 += parseInt(base[i], 10) * (i + 2);
    let expD1 = s1 % 11;
    if (expD1 === 10) expD1 = 0;
    if (d1 !== expD1) return false;

    const s2 = (parseInt(ufCod[0], 10) * 7) + (parseInt(ufCod[1], 10) * 8) + (d1 * 9);
    let expD2 = s2 % 11;
    if (expD2 === 10) expD2 = 0;
    return d2 === expD2;
  }

  static gerarPis() {
    const pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const base = [];
    for (let i = 0; i < 10; i++) base.push(Math.floor(Math.random() * 10));

    let soma = 0;
    for (let i = 0; i < 10; i++) soma += base[i] * pesos[i];
    const resto = soma % 11;
    const dv = (resto < 2) ? 0 : 11 - resto;

    const limpo = `${base.join('')}${dv}`;
    const formatado = `${limpo.slice(0, 3)}.${limpo.slice(3, 8)}.${limpo.slice(8, 10)}-${dv}`;
    return { limpo, formatado };
  }

  static validaPis(pis) {
    const p = String(pis || '').replace(/\D/g, '');
    if (p.length !== 11) return false;
    const pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(p[i], 10) * pesos[i];
    const resto = soma % 11;
    const expDv = (resto < 2) ? 0 : 11 - resto;
    return expDv === parseInt(p[10], 10);
  }

  static gerarCartaoCredito(bandeira = 'visa') {
    let prefixo = '4';
    let totalDigitos = 16;
    let nomeBandeira = 'Visa';
    if (bandeira === 'mastercard') {
      prefixo = '53';
      nomeBandeira = 'Mastercard';
    } else if (bandeira === 'elo') {
      prefixo = '636368';
      nomeBandeira = 'Elo';
    }

    let num = prefixo;
    while (num.length < totalDigitos - 1) {
      num += Math.floor(Math.random() * 10);
    }

    let soma = 0;
    let alternar = true;
    for (let i = num.length - 1; i >= 0; i--) {
      let n = parseInt(num.charAt(i), 10);
      if (alternar) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      soma += n;
      alternar = !alternar;
    }
    const dv = (10 - (soma % 10)) % 10;
    const limpo = `${num}${dv}`;
    const formatado = `${limpo.slice(0, 4)} ${limpo.slice(4, 8)} ${limpo.slice(8, 12)} ${limpo.slice(12, 16)}`;

    const mesExp = String(GeradorFakePro.numeroAleatorio(1, 12)).padStart(2, '0');
    const anoExp = String(2028 + GeradorFakePro.numeroAleatorio(0, 4));
    const cvv = String(GeradorFakePro.numeroAleatorio(100, 999));

    return {
      numero: formatado,
      numeroLimpo: limpo,
      bandeira: nomeBandeira,
      validade: `${mesExp}/${anoExp}`,
      cvv,
      algoritmo: 'Luhn (ISO/IEC 7812)'
    };
  }

  static validaCartao(numero) {
    const limpo = String(numero || '').replace(/\D/g, '');
    if (limpo.length < 13 || limpo.length > 19) return false;
    let soma = 0;
    let alternar = false;
    for (let i = limpo.length - 1; i >= 0; i--) {
      let n = parseInt(limpo.charAt(i), 10);
      if (alternar) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      soma += n;
      alternar = !alternar;
    }
    return (soma % 10) === 0;
  }

  static gerarPassaporte() {
    const series = ['FB', 'FC', 'FD', 'FE'];
    const s = GeradorFakePro.sortear(series);
    const n = String(GeradorFakePro.numeroAleatorio(100000, 999999));
    return {
      numero: `${s}${n}`,
      paisEmissor: 'BRA - Brasil',
      orgaoEmissor: 'DPF - Polícia Federal'
    };
  }

  static gerarRenavam() {
    const pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const d = [];
    for (let i = 0; i < 10; i++) d.push(Math.floor(Math.random() * 10));

    let soma = 0;
    for (let i = 0; i < 10; i++) soma += d[i] * pesos[i];
    const resto = (soma * 10) % 11;
    const dv = (resto === 10 || resto === 11) ? 0 : resto;

    return `${d.join('')}${dv}`;
  }

  static validaRenavam(renavam) {
    const r = String(renavam || '').replace(/\D/g, '');
    if (r.length !== 11 || /^(\d)\1{10}$/.test(r)) return false;
    const pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(r[i], 10) * pesos[i];
    const resto = (soma * 10) % 11;
    const expDv = (resto === 10 || resto === 11) ? 0 : resto;
    return expDv === parseInt(r[10], 10);
  }

  static gerarPlaca(mercosul = true) {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const l1 = letras[Math.floor(Math.random() * 26)];
    const l2 = letras[Math.floor(Math.random() * 26)];
    const l3 = letras[Math.floor(Math.random() * 26)];
    const n1 = Math.floor(Math.random() * 10);
    const n2 = Math.floor(Math.random() * 10);
    const n3 = Math.floor(Math.random() * 10);

    if (mercosul) {
      const l4 = letras[Math.floor(Math.random() * 26)];
      return `${l1}${l2}${l3}${n1}${l4}${n2}${n3}`;
    }
    return `${l1}${l2}${l3}-${n1}${n2}${n3}${Math.floor(Math.random() * 10)}`;
  }

  static gerarChassi() {
    const chars = '0123456789ABCDEFGHJKLMNPRSTUVWXYZ';
    let vin = '9BW'; // WMI Brasil
    for (let i = 0; i < 14; i++) {
      vin += chars[Math.floor(Math.random() * chars.length)];
    }
    return vin;
  }

  static gerarVeiculo() {
    const catalogo = [
      { marca: 'Toyota', modelo: 'Corolla Cross XRE', tipo: 'SUV' },
      { marca: 'Honda', modelo: 'Civic Touring', tipo: 'Sedan' },
      { marca: 'Volkswagen', modelo: 'T-Cross Highline', tipo: 'SUV' },
      { marca: 'Chevrolet', modelo: 'Onix Plus Premier', tipo: 'Sedan' },
      { marca: 'Hyundai', modelo: 'Creta Ultimate', tipo: 'SUV' },
      { marca: 'Jeep', modelo: 'Compass Longitude', tipo: 'SUV' },
      { marca: 'Fiat', modelo: 'Fastback Limited', tipo: 'Crossover' },
      { marca: 'BYD', modelo: 'Dolphin Plus', tipo: 'Elétrico' },
      { marca: 'BMW', modelo: '320i M Sport', tipo: 'Sedan Premium' }
    ];
    const item = GeradorFakePro.sortear(catalogo);
    const renavam = GeradorFakePro.gerarRenavam();
    const coresVeiculo = ['Prata', 'Preto Vulcano', 'Branco Polar', 'Cinza Chumbo', 'Azul Metálico', 'Vermelho'];

    return {
      marca: item.marca,
      modelo: item.modelo,
      categoria: item.tipo,
      anoFabricacao: 2021 + GeradorFakePro.numeroAleatorio(0, 5),
      cor: GeradorFakePro.sortear(coresVeiculo),
      placaMercosul: GeradorFakePro.gerarPlaca(true),
      placaAntiga: GeradorFakePro.gerarPlaca(false),
      renavam,
      chassi: GeradorFakePro.gerarChassi(),
      combustivel: 'Flex (Álcool / Gasolina)',
      autenticidadeRenavam: true
    };
  }

  static exportarSql(pessoas, tabela = 'usuarios') {
    const lista = Array.isArray(pessoas) ? pessoas : [pessoas];
    const linhas = lista.map(p => {
      const escape = s => `'${String(s || '').replace(/'/g, "''")}'`;
      return `INSERT INTO ${tabela} (nome, sexo, idade, data_nascimento, cpf, rg, cnh, email, celular, cep, logradouro, numero, bairro, cidade, uf) VALUES (${escape(p.nome)}, ${escape(p.sexo)}, ${p.idade}, ${escape(p.dataNascimentoIso)}, ${escape(p.cpf)}, ${escape(p.rg)}, ${escape(p.cnh?.numero)}, ${escape(p.contato?.email)}, ${escape(p.contato?.celular)}, ${escape(p.endereco?.cep)}, ${escape(p.endereco?.logradouro)}, ${p.endereco?.numero || 0}, ${escape(p.endereco?.bairro)}, ${escape(p.endereco?.cidade)}, ${escape(p.endereco?.uf)});`;
    });
    return linhas.join('\n');
  }

  static exportarCsv(pessoas) {
    const lista = Array.isArray(pessoas) ? pessoas : [pessoas];
    const cabecalho = 'Nome,Sexo,Idade,DataNascimento,CPF,RG,CNH,Email,Celular,CEP,Logradouro,Numero,Bairro,Cidade,UF,Renda,Banco,PlacaVeiculo,Renavam';
    const linhas = lista.map(p => {
      const q = s => `"${String(s || '').replace(/"/g, '""')}"`;
      return [
        q(p.nome), q(p.sexo), p.idade, q(p.dataNascimento), q(p.cpf), q(p.rg), q(p.cnh?.numero),
        q(p.contato?.email), q(p.contato?.celular), q(p.endereco?.cep), q(p.endereco?.logradouro),
        p.endereco?.numero, q(p.endereco?.bairro), q(p.endereco?.cidade), q(p.endereco?.uf),
        p.perfil?.rendaEstimada, q(p.dadosBancarios?.banco), q(p.veiculo?.placaMercosul), q(p.veiculo?.renavam)
      ].join(',');
    });
    return [cabecalho, ...linhas].join('\n');
  }

  /**
   * Gera nome brasileiro ultra-realista de 3 a 5 palavras
   * Ex: "Maria Antonieta de Souza Pinto", "Joao Kebler Fagundes da Silva"
   * @param {string} sexo 
   * @returns {string}
   */
  static gerarNomeRealista(sexo = 'M') {
    const p1 = sexo === 'M' ? GeradorFakePro.sortear(NOMES_MASCULINOS) : GeradorFakePro.sortear(NOMES_FEMININOS);
    const temMeio = Math.random() > 0.25; // 75% das pessoas tem nome composto ou do meio
    let pMeio = null;
    if (temMeio) {
      pMeio = sexo === 'M' ? GeradorFakePro.sortear(NOMES_MEIO_MASCULINO) : GeradorFakePro.sortear(NOMES_MEIO_FEMININO);
      while (pMeio === p1) {
        pMeio = sexo === 'M' ? GeradorFakePro.sortear(NOMES_MEIO_MASCULINO) : GeradorFakePro.sortear(NOMES_MEIO_FEMININO);
      }
    }

    const sMaterno = GeradorFakePro.sortear(SOBRENOMES_MATERNOS);
    let sPaterno = GeradorFakePro.sortear(SOBRENOMES_PATERNOS);
    while (sMaterno.toLowerCase().includes(sPaterno.toLowerCase())) {
      sPaterno = GeradorFakePro.sortear(SOBRENOMES_PATERNOS);
    }

    if (pMeio) {
      // 4 a 5 palavras: ex "Maria Antonieta de Souza Pinto" ou "Joao Kebler Fagundes Silva"
      return `${p1} ${pMeio} ${sMaterno} ${sPaterno}`;
    } else {
      // 3 a 4 palavras: ex "Joao de Souza Pinto" ou "Carlos Fagundes da Silva"
      return `${p1} ${sMaterno} ${sPaterno}`;
    }
  }

  /**
   * Gera uma Pessoa Fake Brasileira Completa e Coerente com o Estado
   * @param {Object} [filtros]
   * @param {string} [filtros.sexo] - 'M', 'F' ou 'aleatorio'
   * @param {string} [filtros.uf] - Sigla do estado (ex: 'SP', 'RJ', 'MG', 'PR')
   * @param {number} [filtros.idadeMin=18]
   * @param {number} [filtros.idadeMax=70]
   * @returns {Object}
   */
  static gerar(filtros = {}) {
    const sexoEscolhido = (filtros.sexo === 'M' || filtros.sexo === 'm') ? 'M' :
      (filtros.sexo === 'F' || filtros.sexo === 'f') ? 'F' :
      (Math.random() > 0.5 ? 'M' : 'F');

    const nomeCompleto = GeradorFakePro.gerarNomeRealista(sexoEscolhido);
    const partesNome = nomeCompleto.split(' ');
    const primeiroNome = partesNome[0];
    const ultimoSobrenome = partesNome[partesNome.length - 1];

    // Filiação realista compartilhando sobrenome de família
    const nomeMae = `${GeradorFakePro.sortear(NOMES_FEMININOS)} ${GeradorFakePro.sortear(NOMES_MEIO_FEMININO)} ${partesNome.length > 3 ? partesNome[partesNome.length - 2] : 'Alves'} ${ultimoSobrenome}`;
    const nomePai = `${GeradorFakePro.sortear(NOMES_MASCULINOS)} ${GeradorFakePro.sortear(NOMES_MEIO_MASCULINO)} ${GeradorFakePro.sortear(SOBRENOMES_PATERNOS)} ${ultimoSobrenome}`;

    // UF e Localização Coerente
    const ufsDisponiveis = Object.keys(ESTADOS_BRASIL);
    const ufKey = (filtros.uf && ESTADOS_BRASIL[filtros.uf.toUpperCase()]) ?
      filtros.uf.toUpperCase() :
      GeradorFakePro.sortear(ufsDisponiveis);

    const estadoInfo = ESTADOS_BRASIL[ufKey];
    const cidadeEscolhida = GeradorFakePro.sortear(estadoInfo.cidades);
    const bairroEscolhido = GeradorFakePro.sortear(cidadeEscolhida.bairros);
    const ruaEscolhida = GeradorFakePro.sortear(cidadeEscolhida.ruas);
    const numeroCasa = GeradorFakePro.numeroAleatorio(10, 2450);

    const cepNum = GeradorFakePro.numeroAleatorio(cidadeEscolhida.cepMin, cidadeEscolhida.cepMax);
    const cepLimpo = String(cepNum).padStart(8, '0');
    const cepFormatado = `${cepLimpo.slice(0, 5)}-${cepLimpo.slice(5)}`;

    const ddd = GeradorFakePro.sortear(estadoInfo.ddds);
    const celularNum = `9${GeradorFakePro.numeroAleatorio(1000, 9999)}${GeradorFakePro.numeroAleatorio(1000, 9999)}`;
    const fixoNum = `${GeradorFakePro.numeroAleatorio(2000, 3999)}${GeradorFakePro.numeroAleatorio(1000, 9999)}`;

    // Idade e Data de Nascimento
    const idadeMin = Number(filtros.idadeMin || 18);
    const idadeMax = Number(filtros.idadeMax || 70);
    const idade = GeradorFakePro.numeroAleatorio(idadeMin, idadeMax);
    const anoNasc = 2026 - idade;
    const mesNasc = GeradorFakePro.numeroAleatorio(1, 12);
    const diaNasc = GeradorFakePro.numeroAleatorio(1, 28);
    const dataNascimentoIso = `${anoNasc}-${String(mesNasc).padStart(2, '0')}-${String(diaNasc).padStart(2, '0')}`;
    const dataNascimentoFormatada = `${String(diaNasc).padStart(2, '0')}/${String(mesNasc).padStart(2, '0')}/${anoNasc}`;
    const signo = GeradorFakePro.calcularSigno(diaNasc, mesNasc);

    // Documentos (CPF matematicamente alinhado com a Região Fiscal da UF)
    const cpf = GeradorFakePro.gerarCpf(estadoInfo.rf);
    const rg = GeradorFakePro.gerarRg();
    const cnh = GeradorFakePro.gerarCnh();
    const tituloEleitor = GeradorFakePro.gerarTituloEleitor(ufKey);
    const pis = GeradorFakePro.gerarPis();
    const cartao = GeradorFakePro.gerarCartaoCredito();
    const passaporte = GeradorFakePro.gerarPassaporte();
    const veiculo = GeradorFakePro.gerarVeiculo();
    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(nomeCompleto)}&backgroundColor=0f172a,1e293b&textColor=f8fafc`;

    // E-mail e Credenciais
    const slugNome = `${primeiroNome.toLowerCase()}.${ultimoSobrenome.toLowerCase()}${String(anoNasc).slice(-2)}`;
    const dominioEmail = GeradorFakePro.sortear(PROVEDORES_EMAIL);
    const email = `${slugNome.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}@${dominioEmail}`;
    const senha = GeradorFakePro.gerarSenhaForte(10);

    // Trabalho & Finanças
    const prof = GeradorFakePro.sortear(PROFISSOES);
    const renda = Number((GeradorFakePro.numeroAleatorio(prof.faixa[0], prof.faixa[1]) + Math.random()).toFixed(2));
    const empresaAnterior = GeradorFakePro.sortear(EMPRESAS_ANTERIORES);
    const tempoEmpresaMeses = GeradorFakePro.numeroAleatorio(6, 72);
    const banco = GeradorFakePro.sortear(BANCOS);
    const agencia = String(GeradorFakePro.numeroAleatorio(100, 9999)).padStart(4, '0');
    const conta = `${GeradorFakePro.numeroAleatorio(10000, 99999)}-${GeradorFakePro.numeroAleatorio(0, 9)}`;

    // Nicknames criativos e realistas de internet
    const sufixosNick = ['_dev', '_pro', 'br', '99', 'x', '_real', 'official', String(anoNasc).slice(-2)];
    const nickname = `${primeiroNome.toLowerCase()}_${ultimoSobrenome.toLowerCase()}${GeradorFakePro.sortear(sufixosNick)}`;
    const numeroDaSorte = GeradorFakePro.numeroAleatorio(0, 1000);
    const loremIpsum = GeradorFakePro.sortear(LOREM_PARAGRAFOS);

    const protocolo = `RFB-20261111-${GeradorFakePro.numeroAleatorio(100000, 999999)}`;
    const score = GeradorFakePro.numeroAleatorio(750, 990);
    const estadoCivil = idade >= 26 ? GeradorFakePro.sortear(['Casado(a)', 'Solteiro(a)', 'União Estável', 'Divorciado(a)']) : 'Solteiro(a)';

    return {
      consultaOficial: {
        protocolo,
        situacaoCadastral: 'REGULAR',
        dataConsulta: new Date().toISOString(),
        orgaoEmissor: 'Secretaria da Receita Federal do Brasil',
        codigoControle: `${GeradorFakePro.numeroAleatorio(1000, 9999).toString(16).toUpperCase()}.${GeradorFakePro.numeroAleatorio(1000, 9999).toString(16).toUpperCase()}.${GeradorFakePro.numeroAleatorio(1000, 9999).toString(16).toUpperCase()}.${GeradorFakePro.numeroAleatorio(1000, 9999).toString(16).toUpperCase()}`
      },
      nome: nomeCompleto,
      nickname,
      sexo: sexoEscolhido === 'M' ? 'Masculino' : 'Feminino',
      idade,
      dataNascimento: dataNascimentoFormatada,
      dataNascimentoIso,
      signo,
      numeroDaSorte,
      nacionalidade: 'Brasileira (Nato)',
      naturalidade: `${cidadeEscolhida.nome} - ${ufKey}`,
      estadoCivil,
      filiacao: {
        nomeMae,
        nomePai
      },
      cpf: cpf.formatado,
      cpfLimpo: cpf.limpo,
      rg: rg.formatado,
      rgLimpo: rg.limpo,
      orgaoEmissorRg: `SSP/${ufKey}`,
      cnh: {
        numero: cnh.limpo,
        categoria: cnh.categoria,
        orgaoEmissor: cnh.emissor
      },
      tituloEleitor: {
        numero: tituloEleitor.formatado,
        numeroLimpo: tituloEleitor.limpo,
        zona: tituloEleitor.zona,
        secao: tituloEleitor.secao,
        orgaoEmissor: tituloEleitor.emissor
      },
      pisPasep: {
        numero: pis.formatado,
        numeroLimpo: pis.limpo
      },
      passaporte: {
        numero: passaporte.numero,
        orgaoEmissor: passaporte.orgaoEmissor
      },
      contato: {
        email,
        senhaSugerida: senha,
        celular: `(${ddd}) ${celularNum.slice(0, 5)}-${celularNum.slice(5)}`,
        celularLimpo: `${ddd}${celularNum}`,
        telefoneFixo: `(${ddd}) ${fixoNum.slice(0, 4)}-${fixoNum.slice(4)}`,
        whatsappUrl: `https://wa.me/55${ddd}${celularNum}`
      },
      endereco: {
        cep: cepFormatado,
        cepLimpo,
        logradouro: ruaEscolhida,
        numero: numeroCasa,
        complemento: Math.random() > 0.6 ? `Apto ${GeradorFakePro.numeroAleatorio(11, 142)}` : '',
        bairro: bairroEscolhido,
        cidade: cidadeEscolhida.nome,
        uf: ufKey,
        estado: estadoInfo.nome,
        pais: 'Brasil'
      },
      carreira: {
        profissaoAtual: prof.cargo,
        rendaEstimada: renda,
        rendaFormatada: `R$ ${renda.toFixed(2).replace('.', ',')}`,
        empresaAnterior: {
          razaoSocial: empresaAnterior.nome,
          cnpj: empresaAnterior.cnpj,
          setorAtuacao: empresaAnterior.setor,
          tempoPermanencia: `${tempoEmpresaMeses} meses (${(tempoEmpresaMeses / 12).toFixed(1)} anos)`
        }
      },
      dadosBancarios: {
        banco: banco.nome,
        codigoBanco: banco.codigo,
        agencia,
        contaCorrente: conta,
        chavePix: cpf.formatado
      },
      cartaoCredito: cartao,
      veiculo: veiculo,
      avatarUrl: avatarUrl,
      biografiaLorem: loremIpsum,
      perfil: {
        profissao: prof.cargo,
        rendaEstimada: renda,
        rendaFormatada: `R$ ${renda.toFixed(2).replace('.', ',')}`,
        scoreCredito: score,
        classificacaoScore: 'Excelente - Baixo Risco',
        tipoSanguineo: GeradorFakePro.sortear(TIPOS_SANGUINEOS),
        altura: `${(GeradorFakePro.numeroAleatorio(155, 192) / 100).toFixed(2)} m`,
        peso: `${GeradorFakePro.numeroAleatorio(52, 98)} kg`,
        corFavorita: GeradorFakePro.sortear(CORES)
      },
      auditoriaValidadora: {
        cpf: { valido: true, algoritmo: 'Módulo 11 (RFC Receita Federal)', regiaoFiscal: `Região ${estadoInfo.rf} (${ufKey})` },
        cnh: { valido: true, algoritmo: 'Padrão SENATRAN / RENACH' },
        tituloEleitor: { valido: true, algoritmo: 'Módulo 11 Ponderado TSE' },
        pisPasep: { valido: true, algoritmo: 'Módulo 11 Caixa Econômica Federal' },
        cartaoCredito: { valido: true, algoritmo: 'Luhn (ISO/IEC 7812)', bandeira: cartao.bandeira },
        veiculoRenavam: { valido: true, algoritmo: 'Módulo 11 (DENATRAN)', renavam: veiculo.renavam }
      },
      aviso: 'Dados fictícios gerados estritamente para testes de software, mockups e homologação de sistemas.'
    };
  }

  /**
   * Gera lote de pessoas para popular bancos de dados ou testes de carga
   * @param {number} [quantidade=5] - Máximo de 50 por chamada
   * @param {Object} [filtros]
   * @returns {Array<Object>}
   */
  static gerarLote(quantidade = 5, filtros = {}) {
    const qtd = Math.max(1, Math.min(10000, Number(quantidade) || 5));
    const lista = [];
    for (let i = 0; i < qtd; i++) {
      lista.push(GeradorFakePro.gerar(filtros));
    }
    return lista;
  }

  /**
   * Consulta a API Cloudflare Edge
   * @param {Object} [params]
   * @returns {Promise<Object>}
   */
  async obterPessoa(params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = `${this.endpoint.replace(/\/$/, '')}/api/gerar-pessoa${query ? '?' + query : ''}`;
    const headers = { 'Accept': 'application/json' };
    if (this.apiKey) headers['Authorization'] = `Bearer ${this.apiKey}`;
    const res = await fetch(url, { headers });
    return await res.json();
  }
}

export default GeradorFakePro;
