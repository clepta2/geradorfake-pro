export interface ContatoPessoa {
  email: string;
  senhaSugerida: string;
  celular: string;
  celularLimpo: string;
  telefoneFixo: string;
  whatsappUrl: string;
}

export interface EnderecoPessoa {
  cep: string;
  cepLimpo: string;
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  estado: string;
  pais: string;
}

export interface DadosBancariosPessoa {
  banco: string;
  codigoBanco: string;
  agencia: string;
  contaCorrente: string;
  chavePix: string;
}

export interface PerfilPessoa {
  profissao: string;
  rendaEstimada: number;
  rendaFormatada: string;
  tipoSanguineo: string;
  altura: string;
  peso: string;
  corFavorita: string;
}

export interface CnhPessoa {
  numero: string;
  categoria: string;
  orgaoEmissor: string;
}

export interface TituloEleitorPessoa {
  numero: string;
  numeroLimpo: string;
  zona: string;
  secao: string;
  orgaoEmissor: string;
}

export interface PisPasepPessoa {
  numero: string;
  numeroLimpo: string;
}

export interface CartaoCreditoPessoa {
  numero: string;
  numeroLimpo: string;
  bandeira: string;
  validade: string;
  cvv: string;
  algoritmo: string;
}

export interface PassaportePessoa {
  numero: string;
  orgaoEmissor: string;
}

export interface PessoaFake {
  nome: string;
  sexo: 'Masculino' | 'Feminino';
  idade: number;
  dataNascimento: string;
  dataNascimentoIso: string;
  signo: string;
  cpf: string;
  cpfLimpo: string;
  rg: string;
  rgLimpo: string;
  cnh: CnhPessoa;
  tituloEleitor: TituloEleitorPessoa;
  pisPasep: PisPasepPessoa;
  passaporte: PassaportePessoa;
  contato: ContatoPessoa;
  endereco: EnderecoPessoa;
  dadosBancarios: DadosBancariosPessoa;
  cartaoCredito: CartaoCreditoPessoa;
  perfil: PerfilPessoa;
  auditoriaValidadora: any;
  aviso: string;
}

export interface FiltrosGeracao {
  sexo?: 'M' | 'F' | 'aleatorio';
  uf?: string;
  idadeMin?: number;
  idadeMax?: number;
  qtd?: number;
}

export interface GeradorOptions {
  endpoint?: string;
  apiKey?: string;
}

export declare class GeradorFakePro {
  constructor(options?: GeradorOptions);
  static gerar(filtros?: FiltrosGeracao): PessoaFake;
  static gerarLote(quantidade?: number, filtros?: FiltrosGeracao): PessoaFake[];
  static gerarCpf(ufRf?: number | null): { limpo: string; formatado: string };
  static gerarRg(): { limpo: string; formatado: string };
  static gerarSenhaForte(tamanho?: number): string;
  obterPessoa(params?: FiltrosGeracao): Promise<{ ok: boolean; pessoa: PessoaFake }>;
}

export default GeradorFakePro;
