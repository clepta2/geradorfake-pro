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
  'Otavio', 'Breno', 'Luciano', 'Cristiano', 'Rogerio', 'Wagner', 'Mauricio', 'Cesar',
  'Arthur', 'Davi', 'Bernardo', 'Enzo', 'Igor', 'Heitor', 'Lorenzo', 'Theo', 'Pedro',
  'Guilherme', 'Daniel', 'Renan', 'Cassio', 'Claudio', 'Denis', 'Douglas', 'Everton',
  'Fabricio', 'Geraldo', 'Gilberto', 'Helio', 'Hugo', 'Ian', 'Ivan', 'Jonas', 'Jorge',
  'Julio', 'Kleber', 'Laerte', 'Lucio', 'Marcos', 'Mario', 'Moacir', 'Nelson', 'Nilton',
  'Osvaldo', 'Raul', 'Reginaldo', 'Reinaldo', 'Robson', 'Romulo', 'Ronaldo', 'Rubens',
  'Sergio', 'Tales', 'Tiago', 'Valdir', 'Valmir', 'Vicente', 'Walmir', 'Washington',
  'Wellington', 'Wesley', 'William', 'Yuri', 'Alaor', 'Alceu', 'Aldo', 'Alvaro', 'Elias', 'Jair'
];

const NOMES_FEMININOS = [
  'Maria', 'Ana', 'Mariana', 'Juliana', 'Carolina', 'Beatriz', 'Camila', 'Leticia',
  'Fernanda', 'Gabriela', 'Larissa', 'Amanda', 'Jessica', 'Bruna', 'Helena', 'Laura',
  'Alice', 'Sophia', 'Isabella', 'Manuela', 'Valentina', 'Giovanna', 'Luiza', 'Rafaela',
  'Yasmin', 'Patricia', 'Vanessa', 'Renata', 'Danielle', 'Priscila', 'Aline', 'Tatiane',
  'Bianca', 'Natalia', 'Debora', 'Simone', 'Cristina', 'Flavia', 'Claudia', 'Sandra',
  'Adriana', 'Alessandra', 'Andreia', 'Barbara', 'Carla', 'Cintia', 'Daiane', 'Daniela',
  'Denise', 'Elaine', 'Elisabete', 'Fabiana', 'Fatima', 'Gisele', 'Gloria', 'Ingrid',
  'Isabel', 'Joana', 'Kelly', 'Lais', 'Livia', 'Lorena', 'Luciana', 'Marcela', 'Marcia',
  'Marlene', 'Monica', 'Nair', 'Neusa', 'Paloma', 'Paula', 'Raquel', 'Rebeca', 'Regina',
  'Rita', 'Roberta', 'Sabrina', 'Samanta', 'Silvana', 'Silvia', 'Solange', 'Sonia',
  'Sueli', 'Suzana', 'Tais', 'Talita', 'Tania', 'Teresa', 'Valeria', 'Vera', 'Viviane',
  'Zilda', 'Alana', 'Brenda', 'Cecilia', 'Clarice', 'Ester', 'Evelyn', 'Heloisa', 'Joice', 'Luna', 'Maite'
];

const NOMES_MEIO_MASCULINO = [
  'Kebler', 'Eduardo', 'Henrique', 'Augusto', 'Alexandre', 'Roberto', 'Felipe',
  'Vinicius', 'Arthur', 'Rafael', 'Cesar', 'Guilherme', 'Antonio', 'Francisco',
  'Jose', 'Luis', 'Alberto', 'Tadeu', 'Otavio', 'Bento', 'Inacio', 'Afonso', 'Heitor',
  'Bernardo', 'Davi', 'Gabriel', 'Lucas', 'Matheus', 'Paulo', 'Renato', 'Samuel',
  'Vitor', 'Fernando', 'Rodrigo', 'Leonardo', 'Marcio', 'Ricardo', 'Fabio', 'Leandro',
  'Diego', 'Danilo', 'Caio', 'Murilo', 'Breno', 'Luciano', 'Cristiano', 'Rogerio',
  'Wagner', 'Mauricio', 'Lorenzo', 'Theo', 'Renan', 'Cassio', 'Claudio', 'Denis',
  'Douglas', 'Everton', 'Fabricio', 'Geraldo', 'Gilberto', 'Helio', 'Hugo', 'Ivan',
  'Jonas', 'Jorge', 'Julio', 'Kleber', 'Laerte', 'Lucio', 'Marcos', 'Mario',
  'Nelson', 'Nilton', 'Osvaldo', 'Raul', 'Reginaldo', 'Reinaldo', 'Robson', 'Romulo',
  'Ronaldo', 'Rubens', 'Sergio', 'Tales', 'Tiago', 'Valdir', 'Valmir', 'Vicente',
  'Walmir', 'Washington', 'Wellington', 'Wesley', 'William', 'Yuri', 'Alceu', 'Aldo',
  'Alvaro', 'Elias', 'Jair', 'Moises', 'Gaspar', 'Baltazar', 'Fausto'
];

const NOMES_MEIO_FEMININO = [
  'Antonieta', 'Eduarda', 'Helena', 'Aparecida', 'Cristina', 'Luiza', 'Beatriz',
  'Fernanda', 'Carolina', 'Gabriela', 'Ines', 'Tereza', 'Clara', 'Vitoria', 'Regina',
  'Alice', 'Sophia', 'Isabella', 'Manuela', 'Valentina', 'Giovanna', 'Rafaela',
  'Yasmin', 'Patricia', 'Vanessa', 'Renata', 'Danielle', 'Priscila', 'Aline',
  'Tatiane', 'Bianca', 'Natalia', 'Debora', 'Simone', 'Flavia', 'Claudia',
  'Sandra', 'Adriana', 'Alessandra', 'Andreia', 'Barbara', 'Carla', 'Cintia',
  'Daiane', 'Daniela', 'Denise', 'Elaine', 'Elisabete', 'Fabiana', 'Fatima',
  'Gisele', 'Gloria', 'Ingrid', 'Isabel', 'Joana', 'Kelly', 'Lais', 'Livia',
  'Lorena', 'Luciana', 'Marcela', 'Marcia', 'Marlene', 'Monica', 'Nair', 'Neusa',
  'Paloma', 'Paula', 'Raquel', 'Rebeca', 'Rita', 'Roberta', 'Sabrina', 'Samanta',
  'Silvana', 'Silvia', 'Solange', 'Sonia', 'Sueli', 'Suzana', 'Tais', 'Talita',
  'Tania', 'Teresa', 'Valeria', 'Vera', 'Viviane', 'Zilda', 'Alana', 'Brenda',
  'Cecilia', 'Clarice', 'Ester', 'Evelyn', 'Heloisa', 'Joice', 'Luna', 'Maite',
  'Adelaide', 'Aurora', 'Catarina', 'Constanca', 'Eulalia', 'Filomena'
];

const SOBRENOMES_MATERNOS = [
  'de Souza', 'de Oliveira', 'de Carvalho', 'de Freitas', 'de Alencar', 'de Paula',
  'de Andrade', 'de Castro', 'de Almeida', 'de Toledo', 'de Macedo', 'de Assis',
  'de Miranda', 'de Godoy', 'de Morais', 'de Aguiar', 'de Barros', 'de Queiroz',
  'da Silva', 'da Costa', 'da Rocha', 'da Fonseca', 'da Silveira', 'da Cunha',
  'da Mota', 'da Gama', 'da Cruz', 'da Luz', 'da Paz', 'da Veiga',
  'dos Santos', 'dos Passos', 'dos Anjos', 'dos Reis', 'dos Ramos',
  'Fagundes', 'Meireles', 'Nogueira', 'Barcellos', 'Vasconcelos', 'Peixoto', 'Medeiros',
  'Guimaraes', 'Pires', 'Toledo', 'Siqueira', 'Antunes', 'Camargo', 'Braga', 'Duarte',
  'Figueiredo', 'Gusmao', 'Macedo', 'Bittencourt', 'Maldonado', 'Fontes', 'Carneiro',
  'Paiva', 'Castilho', 'Queiroz', 'Menezes', 'Borges', 'Coelho', 'Cavalcanti', 'Pinto',
  'Prado', 'Lacerda', 'Albuquerque', 'Muniz', 'Furtado', 'Viana', 'Bueno', 'Brandao',
  'Gouveia', 'Tavares', 'Barreto', 'Cardoso', 'Pinheiro', 'Bicalho', 'Arruda', 'Sampaio',
  'Fontoura', 'Resende', 'Vargas', 'Lins', 'Campelo', 'Galvao', 'Chaves', 'Buarque',
  'Holanda', 'Frota', 'Porto', 'Belchior', 'Castelo', 'Pessoa', 'Campos', 'Bandeira',
  'Carvalheiro', 'Carvalhal', 'Belisario', 'Azevedo', 'Carregosa', 'Severo', 'Faleiro',
  'Valadao', 'Lemos', 'Bezerra', 'Montenegro'
];

const SOBRENOMES_PATERNOS = [
  'Pinto', 'Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Lima', 'Carvalho',
  'Ribeiro', 'Martins', 'Ferreira', 'Barbosa', 'Rocha', 'Alves', 'Gomes', 'Costa',
  'Dias', 'Nascimento', 'Andrade', 'Moreira', 'Nunes', 'Marques', 'Machado',
  'Freitas', 'Cardoso', 'Ramos', 'Teixeira', 'Batista', 'Albuquerque', 'Dantas',
  'Fagundes', 'Vasconcelos', 'Meireles', 'Cavalcanti', 'Figueiredo', 'Camargo',
  'Barreto', 'Pinheiro', 'Menezes', 'Monteiro', 'Araujo', 'Moraes', 'Santana',
  'Borges', 'Coelho', 'Lopes', 'Vieira', 'Fernandes', 'Soares', 'Fonseca',
  'Campos', 'Rezende', 'Duarte', 'Siqueira', 'Guimaraes', 'Macedo', 'Viana',
  'Bueno', 'Brandao', 'Gouveia', 'Tavares', 'Antunes', 'Braga', 'Lacerda',
  'Muniz', 'Furtado', 'Arruda', 'Sampaio', 'Bicalho', 'Fontes', 'Carneiro',
  'Paiva', 'Castilho', 'Queiroz', 'Bittencourt', 'Maldonado', 'Barcellos',
  'Peixoto', 'Medeiros', 'Pires', 'Toledo', 'Nogueira', 'Gusmao', 'Fontoura',
  'Vargas', 'Lins', 'Campelo', 'Galvao', 'Chaves', 'Buarque', 'Holanda',
  'Frota', 'Porto', 'Belchior', 'Castelo', 'Pessoa', 'Bandeira', 'Azevedo',
  'Severo', 'Faleiro', 'Valadao', 'Lemos', 'Bezerra', 'Montenegro', 'Franco'
];

const PROFISSOES = [
  { cargo: 'Engenheiro de Software', faixa: [6000, 18000] },
  { cargo: 'Analista de Sistemas', faixa: [4500, 9500] },
  { cargo: 'M?dico Cl?nico Geral', faixa: [9000, 25000] },
  { cargo: 'Advogado Associado', faixa: [4000, 12000] },
  { cargo: 'Gerente Comercial', faixa: [5500, 14000] },
  { cargo: 'Contador S?nior', faixa: [4800, 11000] },
  { cargo: 'Arquiteto e Urbanista', faixa: [4200, 10500] },
  { cargo: 'Designer UI/UX', faixa: [4000, 9800] },
  { cargo: 'Enfermeiro Padr?o', faixa: [3800, 7500] },
  { cargo: 'Farmac?utico', faixa: [3500, 7000] },
  { cargo: 'Professor do Ensino M?dio', faixa: [3200, 6500] },
  { cargo: 'Administrador de Empresas', faixa: [3800, 9000] },
  { cargo: 'Coordenador de Marketing Digital', faixa: [4500, 11500] },
  { cargo: 'T?cnico em Eletr?nica', faixa: [2800, 5200] },
  { cargo: 'Psic?logo Cl?nico', faixa: [3500, 8500] },
  { cargo: 'Cientista de Dados', faixa: [7000, 20000] },
  { cargo: 'Engenheiro Civil', faixa: [5500, 16000] },
  { cargo: 'Engenheiro Mec?nico', faixa: [5200, 15000] },
  { cargo: 'M?dico Pediatra', faixa: [9500, 24000] },
  { cargo: 'M?dico Cirurgi?o Geral', faixa: [12000, 32000] },
  { cargo: 'Dentista Ortodontista', faixa: [4500, 14000] },
  { cargo: 'Fisioterapeuta Respirat?rio', faixa: [3200, 7200] },
  { cargo: 'Nutricionista Cl?nico', faixa: [3000, 6800] },
  { cargo: 'Veterin?rio de Pequenos Animais', faixa: [3600, 8500] },
  { cargo: 'Bi?logo Geneticista', faixa: [4200, 9800] },
  { cargo: 'Biom?dico Imunologista', faixa: [3400, 7600] },
  { cargo: 'Jornalista Investigativo', faixa: [3500, 8000] },
  { cargo: 'Publicit?rio Diretor de Arte', faixa: [4800, 12500] },
  { cargo: 'Redator de Conte?do SEO', faixa: [3000, 6500] },
  { cargo: 'Tradutor e Int?rprete', faixa: [3200, 8200] },
  { cargo: 'Economista Chefe', faixa: [7500, 22000] },
  { cargo: 'Consultor Financeiro', faixa: [5000, 15000] },
  { cargo: 'Analista de Compliance e Risco', faixa: [5200, 13000] },
  { cargo: 'Auditor Fiscal Independente', faixa: [6500, 17500] },
  { cargo: 'Corretor de Im?veis', faixa: [3000, 18000] },
  { cargo: 'Gerente de Recursos Humanos', faixa: [6000, 16000] },
  { cargo: 'Analista de Recrutamento e Sele??o', faixa: [3200, 6800] },
  { cargo: 'Especialista em Seguran?a da Informa??o', faixa: [7500, 21000] },
  { cargo: 'DevOps / Site Reliability Engineer', faixa: [7000, 19500] },
  { cargo: 'Administrador de Banco de Dados (DBA)', faixa: [6000, 15000] },
  { cargo: 'Product Manager (PM)', faixa: [8000, 22000] },
  { cargo: 'Scrum Master / Agile Coach', faixa: [6500, 14500] },
  { cargo: 'Analista de Suporte de TI', faixa: [2500, 5000] },
  { cargo: 'Desenvolvedor Frontend React', faixa: [5000, 14000] },
  { cargo: 'Desenvolvedor Backend Node.js', faixa: [5500, 15500] },
  { cargo: 'Desenvolvedor Mobile Flutter/React Native', faixa: [5500, 15000] },
  { cargo: 'Arquiteto de Solu??es em Nuvem', faixa: [9000, 26000] },
  { cargo: 'Engenheiro Eletricista', faixa: [5400, 15000] },
  { cargo: 'Engenheiro Qu?mico', faixa: [5200, 14500] },
  { cargo: 'Engenheiro de Produ??o', faixa: [4800, 13500] },
  { cargo: 'Engenheiro Agr?nomo', faixa: [4600, 12800] },
  { cargo: 'Engenheiro Ambiental', faixa: [4200, 11000] },
  { cargo: 'Ge?logo de Campo', faixa: [5000, 14000] },
  { cargo: 'Ocean?grafo Pesquisador', faixa: [4500, 11500] },
  { cargo: 'Meteorologista Forense', faixa: [4800, 12000] },
  { cargo: 'Assistente Social', faixa: [2800, 5800] },
  { cargo: 'Terapeuta Ocupacional', faixa: [3400, 7500] },
  { cargo: 'Fonoaudi?logo Cl?nico', faixa: [3200, 7200] },
  { cargo: 'Historiador e Pesquisador', faixa: [3000, 6500] },
  { cargo: 'Soci?logo Pesquisador de Mercado', faixa: [3500, 8200] },
  { cargo: 'Fil?sofo e Professor Universit?rio', faixa: [4500, 12000] },
  { cargo: 'Chefe de Cozinha / Chef Executivo', faixa: [4000, 14000] },
  { cargo: 'Sommelier de Vinhos Internacionais', faixa: [3800, 11000] },
  { cargo: 'Turism?logo e Consultor de Viagens', faixa: [2800, 6800] },
  { cargo: 'Piloto de Linha A?rea Comercial', faixa: [9000, 28000] },
  { cargo: 'Comiss?rio de Bordo Internacional', faixa: [3800, 8500] },
  { cargo: 'Capit?o da Marinha Mercante', faixa: [8500, 24000] },
  { cargo: 'Despachante Aduaneiro', faixa: [4000, 11000] },
  { cargo: 'Analista de Log?stica e Supply Chain', faixa: [3500, 8800] },
  { cargo: 'Comprador T?cnico S?nior', faixa: [4200, 10500] },
  { cargo: 'Policial Rodovi?rio Federal', faixa: [9800, 16500] },
  { cargo: 'Perito Criminal?stico Oficial', faixa: [8500, 18000] },
  { cargo: 'Delegado de Pol?cia Civil', faixa: [12000, 26000] },
  { cargo: 'Juiz de Direito Substituto', faixa: [18000, 36000] },
  { cargo: 'Promotor de Justi?a', faixa: [18000, 35000] },
  { cargo: 'Defensor P?blico Estadual', faixa: [15000, 30000] },
  { cargo: 'Tabeli?o e Registrador Notarial', faixa: [12000, 45000] },
  { cargo: 'Fot?grafo Comercial e Publicit?rio', faixa: [3000, 9500] },
  { cargo: 'Cineasta e Diretor de Fotografia', faixa: [4500, 16000] },
  { cargo: 'Produtor Musical e Engenheiro de ?udio', faixa: [3500, 12000] },
  { cargo: 'M?sico Instrumentista de Orquestra', faixa: [3200, 9000] },
  { cargo: 'Ator de Teatro e Dublador', faixa: [2800, 9000] },
  { cargo: 'Ilustrador e Artista Conceitual 3D', faixa: [3800, 11500] },
  { cargo: 'Animador 2D/3D', faixa: [4000, 12000] },
  { cargo: 'Game Designer', faixa: [4500, 13500] },
  { cargo: 'Estat?stico Modelador Atuarial', faixa: [6500, 18000] },
  { cargo: 'Matem?tico Financeiro', faixa: [6000, 16500] },
  { cargo: 'F?sico M?dico Nuclear', faixa: [7500, 21000] },
  { cargo: 'Astr?nomo e Astrof?sico', faixa: [5500, 14500] },
  { cargo: 'Antrop?logo Cultural', faixa: [3500, 7800] },
  { cargo: 'Restaurador de Obras de Arte', faixa: [3800, 9200] },
  { cargo: 'Bibliotec?rio e Cientista da Informa??o', faixa: [3000, 6500] },
  { cargo: 'Muse?logo e Curador de Exposi??es', faixa: [3400, 8000] },
  { cargo: 'Zootecnista Consultor', faixa: [4000, 10500] },
  { cargo: 'Engenheiro de Petr?leo e G?s Offshore', faixa: [9500, 28000] },
  { cargo: 'Engenheiro de Minas Subterr?neas', faixa: [6500, 19000] },
  { cargo: 'Engenheiro Metalurgista', faixa: [5400, 15500] },
  { cargo: 'Engenheiro T?xtil', faixa: [4200, 11000] },
  { cargo: 'Designer de Moda e Estilista', faixa: [3500, 12500] },
  { cargo: 'Cen?grafo de Produ??es C?nicas', faixa: [3600, 10000] }
];

const BANCOS = [
  {
    codigo: '001',
    ispb: '00000000',
    nomeReduzido: 'Banco do Brasil',
    razaoSocial: 'BANCO DO BRASIL S.A.',
    cnpj: '00.000.000/0001-91',
    segmento: 'Banco Múltiplo',
    site: 'https://www.bb.com.br',
    pixParticipante: true,
    chavePixTipos: ['CPF', 'CNPJ', 'Email', 'Telefone', 'EVP']
  },
  {
    codigo: '237',
    ispb: '60746948',
    nomeReduzido: 'Bradesco',
    razaoSocial: 'BANCO BRADESCO S.A.',
    cnpj: '60.746.948/0001-12',
    segmento: 'Banco Múltiplo',
    site: 'https://banco.bradesco',
    pixParticipante: true,
    chavePixTipos: ['CPF', 'CNPJ', 'Email', 'Telefone', 'EVP']
  },
  {
    codigo: '341',
    ispb: '60872504',
    nomeReduzido: 'Itaú Unibanco',
    razaoSocial: 'ITAÚ UNIBANCO S.A.',
    cnpj: '60.872.504/0001-23',
    segmento: 'Banco Múltiplo',
    site: 'https://www.itau.com.br',
    pixParticipante: true,
    chavePixTipos: ['CPF', 'CNPJ', 'Email', 'Telefone', 'EVP']
  },
  {
    codigo: '033',
    ispb: '90400888',
    nomeReduzido: 'Santander',
    razaoSocial: 'BANCO SANTANDER (BRASIL) S.A.',
    cnpj: '90.400.888/0001-42',
    segmento: 'Banco Múltiplo',
    site: 'https://www.santander.com.br',
    pixParticipante: true,
    chavePixTipos: ['CPF', 'CNPJ', 'Email', 'Telefone', 'EVP']
  },
  {
    codigo: '104',
    ispb: '00360305',
    nomeReduzido: 'Caixa Econômica',
    razaoSocial: 'CAIXA ECONÔMICA FEDERAL',
    cnpj: '00.360.305/0001-04',
    segmento: 'Caixa Econômica',
    site: 'https://www.caixa.gov.br',
    pixParticipante: true,
    chavePixTipos: ['CPF', 'CNPJ', 'Email', 'Telefone', 'EVP']
  },
  {
    codigo: '260',
    ispb: '18236120',
    nomeReduzido: 'Nubank',
    razaoSocial: 'NU PAGAMENTOS S.A. - INSTITUIÇÃO DE PAGAMENTO',
    cnpj: '18.236.120/0001-58',
    segmento: 'Instituição de Pagamento / Fintech',
    site: 'https://nubank.com.br',
    pixParticipante: true,
    chavePixTipos: ['CPF', 'CNPJ', 'Email', 'Telefone', 'EVP']
  },
  {
    codigo: '077',
    ispb: '00416968',
    nomeReduzido: 'Banco Inter',
    razaoSocial: 'BANCO INTER S.A.',
    cnpj: '00.416.968/0001-01',
    segmento: 'Banco Múltiplo Digital',
    site: 'https://inter.co',
    pixParticipante: true,
    chavePixTipos: ['CPF', 'CNPJ', 'Email', 'Telefone', 'EVP']
  },
  {
    codigo: '336',
    ispb: '31872495',
    nomeReduzido: 'Banco C6',
    razaoSocial: 'BANCO C6 S.A.',
    cnpj: '31.872.495/0001-72',
    segmento: 'Banco Múltiplo Digital',
    site: 'https://www.c6bank.com.br',
    pixParticipante: true,
    chavePixTipos: ['CPF', 'CNPJ', 'Email', 'Telefone', 'EVP']
  },
  {
    codigo: '290',
    ispb: '08561701',
    nomeReduzido: 'PagBank (PagSeguro)',
    razaoSocial: 'PAGSEGURO INTERNET INSTITUIÇÃO DE PAGAMENTO S.A.',
    cnpj: '08.561.701/0001-01',
    segmento: 'Instituição de Pagamento / Banco Múltiplo',
    site: 'https://pagbank.com.br',
    pixParticipante: true,
    chavePixTipos: ['CPF', 'CNPJ', 'Email', 'Telefone', 'EVP']
  },
  {
    codigo: '380',
    ispb: '22896431',
    nomeReduzido: 'PicPay',
    razaoSocial: 'PICPAY INSTITUIÇÃO DE PAGAMENTO S.A.',
    cnpj: '22.896.431/0001-10',
    segmento: 'Instituição de Pagamento',
    site: 'https://picpay.com',
    pixParticipante: true,
    chavePixTipos: ['CPF', 'CNPJ', 'Email', 'Telefone', 'EVP']
  },
  {
    codigo: '403',
    ispb: '37880206',
    nomeReduzido: 'Cora',
    razaoSocial: 'CORA SOCIEDADE DE CRÉDITO DIRETO S.A.',
    cnpj: '37.880.206/0001-63',
    segmento: 'Sociedade de Crédito Direto',
    site: 'https://www.cora.com.br',
    pixParticipante: true,
    chavePixTipos: ['CPF', 'CNPJ', 'Email', 'Telefone', 'EVP']
  },
  {
    codigo: '461',
    ispb: '19540550',
    nomeReduzido: 'Asaas',
    razaoSocial: 'ASAAS GESTÃO FINANCEIRA S.A.',
    cnpj: '19.540.550/0001-21',
    segmento: 'Instituição de Pagamento / Gateway',
    site: 'https://www.asaas.com',
    pixParticipante: true,
    chavePixTipos: ['CPF', 'CNPJ', 'Email', 'Telefone', 'EVP']
  },
  {
    codigo: '197',
    ispb: '16501555',
    nomeReduzido: 'Stone',
    razaoSocial: 'STONE INSTITUIÇÃO DE PAGAMENTO S.A.',
    cnpj: '16.501.555/0001-57',
    segmento: 'Instituição de Pagamento',
    site: 'https://www.stone.com.br',
    pixParticipante: true,
    chavePixTipos: ['CPF', 'CNPJ', 'Email', 'Telefone', 'EVP']
  },
  {
    codigo: '756',
    ispb: '00315557',
    nomeReduzido: 'Sicoob',
    razaoSocial: 'BANCO COOPERATIVO SICOOB S.A.',
    cnpj: '00.315.557/0001-40',
    segmento: 'Banco Cooperativo',
    site: 'https://www.sicoob.com.br',
    pixParticipante: true,
    chavePixTipos: ['CPF', 'CNPJ', 'Email', 'Telefone', 'EVP']
  },
  {
    codigo: '748',
    ispb: '01181521',
    nomeReduzido: 'Sicredi',
    razaoSocial: 'BANCO COOPERATIVO SICREDI S.A.',
    cnpj: '01.181.521/0001-55',
    segmento: 'Banco Cooperativo',
    site: 'https://www.sicredi.com.br',
    pixParticipante: true,
    chavePixTipos: ['CPF', 'CNPJ', 'Email', 'Telefone', 'EVP']
  }
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
  { nome: 'Ambev S.A.', cnpj: '07.526.557/0001-00', setor: 'Bebidas e Log?stica' },
  { nome: 'Petr?leo Brasileiro S.A. - Petrobras', cnpj: '33.000.167/0001-01', setor: 'Energia e Petr?leo' },
  { nome: 'Vale S.A.', cnpj: '33.592.510/0001-54', setor: 'Minera??o e Metais' },
  { nome: 'Ita? Unibanco Holding S.A.', cnpj: '60.872.504/0001-23', setor: 'Financeiro e Banc?rio' },
  { nome: 'Magazine Luiza S.A.', cnpj: '47.960.950/0001-21', setor: 'Varejo e E-commerce' },
  { nome: 'Natura Cosm?ticos S.A.', cnpj: '71.673.990/0001-77', setor: 'Bens de Consumo e Cosm?ticos' },
  { nome: 'Totvs S.A.', cnpj: '53.113.791/0001-22', setor: 'Tecnologia da Informa??o' },
  { nome: 'WEG Equipamentos El?tricos S.A.', cnpj: '07.175.725/0001-60', setor: 'Ind?stria Eletroeletr?nica' },
  { nome: 'Embraer S.A.', cnpj: '07.689.002/0001-89', setor: 'Aeroespacial e Defesa' },
  { nome: 'B3 S.A. - Brasil, Bolsa, Balc?o', cnpj: '09.346.601/0001-25', setor: 'Mercado Financeiro' },
  { nome: 'Banco Bradesco S.A.', cnpj: '60.746.948/0001-12', setor: 'Financeiro e Seguros' },
  { nome: 'Banco Santander (Brasil) S.A.', cnpj: '90.400.888/0001-42', setor: 'Servi?os Banc?rios' },
  { nome: 'Banco do Brasil S.A.', cnpj: '00.000.000/0001-91', setor: 'Banc?rio Governamental' },
  { nome: 'Caixa Econ?mica Federal', cnpj: '00.360.305/0001-04', setor: 'Banc?rio e Social' },
  { nome: 'Nu Pagamentos S.A. - Nubank', cnpj: '18.236.120/0001-58', setor: 'Fintech e Pagamentos' },
  { nome: 'Banco Inter S.A.', cnpj: '00.416.968/0001-01', setor: 'Banc?rio Digital' },
  { nome: 'Stone Pagamentos S.A.', cnpj: '16.501.555/0001-57', setor: 'Meios de Pagamento' },
  { nome: 'PagSeguro Internet S.A.', cnpj: '08.561.701/0001-01', setor: 'Fintech e Adquir?ncia' },
  { nome: 'Cielo S.A.', cnpj: '01.027.058/0001-91', setor: 'Tecnologia de Pagamentos' },
  { nome: 'Gerdau S.A.', cnpj: '33.611.500/0001-19', setor: 'Siderurgia e Metalurgia' },
  { nome: 'Usinas Sider?rgicas de Minas Gerais S.A. - Usiminas', cnpj: '60.870.003/0001-10', setor: 'Siderurgia' },
  { nome: 'Suzano S.A.', cnpj: '16.404.287/0001-55', setor: 'Papel e Celulose' },
  { nome: 'Klabin S.A.', cnpj: '89.637.490/0001-45', setor: 'Papel e Embalagens' },
  { nome: 'JBS S.A.', cnpj: '02.916.265/0001-60', setor: 'Alimentos e Frigor?ficos' },
  { nome: 'BRF S.A.', cnpj: '01.838.723/0001-27', setor: 'Alimentos Industrializados' },
  { nome: 'M. Dias Branco S.A. Ind?stria e Com?rcio de Alimentos', cnpj: '07.206.816/0001-15', setor: 'Massas e Biscoitos' },
  { nome: 'Camil Alimentos S.A.', cnpj: '64.904.295/0001-03', setor: 'Gr?os e Alimentos' },
  { nome: 'Rede D\'Or S?o Luiz S.A.', cnpj: '06.047.087/0001-39', setor: 'Sa?de e Hospitais' },
  { nome: 'Hapvida Participa??es e Investimentos S.A.', cnpj: '08.970.474/0001-47', setor: 'Operadora de Sa?de' },
  { nome: 'Fleury S.A.', cnpj: '60.840.055/0001-31', setor: 'Medicina Diagn?stica' },
  { nome: 'Dasa - Diagn?sticos da Am?rica S.A.', cnpj: '61.486.650/0001-83', setor: 'Laborat?rios e Diagn?stico' },
  { nome: 'Raia Drogasil S.A.', cnpj: '61.585.865/0001-51', setor: 'Farmac?utico e Varejo' },
  { nome: 'Hypera S.A.', cnpj: '04.343.932/0001-53', setor: 'Ind?stria Farmac?utica' },
  { nome: 'Eurofarma Laborat?rios S.A.', cnpj: '61.190.096/0001-92', setor: 'Medicamentos e Sa?de' },
  { nome: 'EMS S.A.', cnpj: '57.507.378/0003-65', setor: 'Farmac?utica de Gen?ricos' },
  { nome: 'Ultrapar Participa??es S.A. - Ipiranga', cnpj: '33.256.439/0001-39', setor: 'Distribui??o de Combust?veis' },
  { nome: 'Cosan S.A.', cnpj: '50.746.577/0001-15', setor: 'Energia e A??car/?lcool' },
  { nome: 'Ra?zen S.A.', cnpj: '33.453.598/0001-23', setor: 'Biocombust?veis e Postos' },
  { nome: 'Vibra Energia S.A.', cnpj: '34.274.233/0001-02', setor: 'Derivados de Petr?leo' },
  { nome: 'Eletrobras - Centrais El?tricas Brasileiras S.A.', cnpj: '00.001.180/0001-26', setor: 'Gera??o e Transmiss?o El?trica' },
  { nome: 'CPFL Energia S.A.', cnpj: '02.429.144/0001-93', setor: 'Distribui??o de Energia' },
  { nome: 'Neoenergia S.A.', cnpj: '01.083.200/0001-18', setor: 'Concession?ria de Energia' },
  { nome: 'Equatorial Energia S.A.', cnpj: '03.220.438/0001-73', setor: 'Infraestrutura El?trica' },
  { nome: 'Companhia de Saneamento B?sico do Estado de S?o Paulo - Sabesp', cnpj: '43.776.517/0001-80', setor: 'Saneamento e ?gua' },
  { nome: 'Telef?nica Brasil S.A. - Vivo', cnpj: '02.558.157/0001-62', setor: 'Telecomunica??es' },
  { nome: 'TIM S.A.', cnpj: '02.421.421/0001-11', setor: 'Telefonia M?vel' },
  { nome: 'Claro S.A.', cnpj: '40.432.544/0001-47', setor: 'Telecomunica??es e Banda Larga' },
  { nome: 'Lojas Renner S.A.', cnpj: '92.754.738/0001-62', setor: 'Moda e Varejo' },
  { nome: 'C&A Modas S.A.', cnpj: '45.242.914/0001-05', setor: 'Vestu?rio e Varejo' },
  { nome: 'Arezzo Ind?stria e Com?rcio S.A.', cnpj: '16.590.234/0001-76', setor: 'Cal?ados e Moda' },
  { nome: 'Grupo SBF S.A. - Centauro', cnpj: '13.217.485/0001-31', setor: 'Artigos Esportivos' },
  { nome: 'Atacad?o S.A.', cnpj: '75.315.333/0001-09', setor: 'Atacado e Supermercados' },
  { nome: 'Sendas Distribuidora S.A. - Assa? Atacadista', cnpj: '06.057.223/0001-71', setor: 'Atacarejo' },
  { nome: 'Companhia Brasileira de Distribui??o - GPA P?o de A??car', cnpj: '47.508.411/0001-56', setor: 'Supermercados' },
  { nome: 'Carrefour Com?rcio e Ind?stria Ltda.', cnpj: '45.543.915/0001-81', setor: 'Hipermercados' },
  { nome: 'Cogna Educa??o S.A. - Kroton', cnpj: '02.800.026/0001-40', setor: 'Ensino Superior e B?sico' },
  { nome: 'Yduqs Participa??es S.A. - Est?cio', cnpj: '08.807.432/0001-10', setor: 'Educa??o Privada' },
  { nome: 'Ser Educacional S.A.', cnpj: '04.986.320/0001-13', setor: 'Ensino T?cnico e Superior' },
  { nome: 'Localiza Rent a Car S.A.', cnpj: '16.670.085/0001-55', setor: 'Loca??o de Ve?culos e Frotas' },
  { nome: 'Movida Participa??es S.A.', cnpj: '21.314.559/0001-66', setor: 'Aluguel de Carros' },
  { nome: 'Gol Linhas A?reas S.A.', cnpj: '07.570.485/0001-72', setor: 'Avia??o Comercial' },
  { nome: 'Azul Linhas A?reas Brasileiras S.A.', cnpj: '09.296.295/0001-60', setor: 'Transporte A?reo' },
  { nome: 'Rumo S.A.', cnpj: '13.555.475/0001-98', setor: 'Log?stica Ferrovi?ria' },
  { nome: 'JSL S.A.', cnpj: '52.628.268/0001-72', setor: 'Transporte Rodovi?rio de Cargas' },
  { nome: 'Santos Brasil Participa??es S.A.', cnpj: '02.762.121/0001-04', setor: 'Opera??es Portu?rias' },
  { nome: 'CCR S.A.', cnpj: '02.846.056/0001-97', setor: 'Concess?es de Rodovias' },
  { nome: 'Ecorodovias Concess?es e Servi?os S.A.', cnpj: '04.572.274/0001-00', setor: 'Infraestrutura Vi?ria' },
  { nome: 'Marcopolo S.A.', cnpj: '88.611.835/0001-29', setor: 'Carrocerias de ?nibus' },
  { nome: 'Randoncorp S.A.', cnpj: '89.086.144/0001-16', setor: 'Implementos Rodovi?rios' },
  { nome: 'Tupy S.A.', cnpj: '84.683.374/0001-49', setor: 'Fundi??o Metal?rgica' },
  { nome: 'Portobello S.A.', cnpj: '83.475.954/0001-08', setor: 'Cer?micas e Revestimentos' },
  { nome: 'Duratex S.A. - Dexco', cnpj: '97.837.181/0001-47', setor: 'Pain?is de Madeira e Lou?as' },
  { nome: 'Vulcabras S.A. - Olympikus', cnpj: '00.954.394/0001-17', setor: 'Ind?stria Cal?adista' },
  { nome: 'Grendene S.A.', cnpj: '89.850.341/0001-06', setor: 'Cal?ados Sint?ticos' },
  { nome: 'Alpargatas S.A. - Havaianas', cnpj: '61.079.117/0001-05', setor: 'Sand?lias e Acess?rios' },
  { nome: 'Hering S.A.', cnpj: '82.640.558/0001-04', setor: 'T?xtil e Moda B?sica' },
  { nome: 'Grupo Casas Bahia S.A.', cnpj: '33.041.260/0652-90', setor: 'M?veis e Eletrodom?sticos' },
  { nome: 'Mercado Livre Brasil Ltda.', cnpj: '03.007.331/0001-41', setor: 'Marketplace e Tecnologia' },
  { nome: 'Amazon Servi?os de Varejo do Brasil Ltda.', cnpj: '15.436.940/0001-03', setor: 'Com?rcio Eletr?nico Global' },
  { nome: 'iFood Comida Digital S.A.', cnpj: '14.380.200/0001-21', setor: 'Food Delivery e Log?stica Urbana' },
  { nome: 'QuintoAndar Servi?os Imobili?rios Ltda.', cnpj: '16.788.643/0001-81', setor: 'Proptech e Im?veis' },
  { nome: 'Loft Solu??es Imobili?rias Ltda.', cnpj: '30.600.430/0001-15', setor: 'Tecnologia Imobili?ria' },
  { nome: 'Loggi Tecnologia Ltda.', cnpj: '18.508.851/0001-41', setor: 'Log?stica Expressa' },
  { nome: 'Gympass Tecnologia Ltda. - Wellhub', cnpj: '15.664.649/0001-84', setor: 'Benef?cios Corporativos de Sa?de' },
  { nome: 'Hotmart Tecnologia Ltda.', cnpj: '13.404.673/0001-71', setor: 'Economia dos Criadores' },
  { nome: 'Zup Innovation Ltda.', cnpj: '13.125.044/0001-01', setor: 'Software Corporativo e Open Source' },
  { nome: 'CI&T Software S.A.', cnpj: '00.419.467/0001-65', setor: 'Transforma??o Digital' },
  { nome: 'Stefanini Consultoria em Inform?tica S.A.', cnpj: '58.069.360/0001-19', setor: 'Consultoria Global de TI' },
  { nome: 'Positivo Tecnologia S.A.', cnpj: '81.243.735/0001-48', setor: 'Hardware e Eletr?nicos' },
  { nome: 'Multilaser Industrial S.A. - Multi', cnpj: '59.717.553/0001-02', setor: 'Acess?rios de Inform?tica' },
  { nome: 'Intelbras S.A. Ind?stria de Telecomunica??o', cnpj: '82.901.000/0001-27', setor: 'Seguran?a Eletr?nica e Redes' },
  { nome: 'Garen Automa??o S.A.', cnpj: '13.251.100/0001-08', setor: 'Motores e Port?es Autom?ticos' },
  { nome: 'Intelbras Solar S.A.', cnpj: '35.150.100/0001-92', setor: 'Energia Fotovoltaica' },
  { nome: 'Tigre S.A. Tubos e Conex?es', cnpj: '84.684.455/0001-01', setor: 'Constru??o Civil e Hidr?ulica' },
  { nome: 'Amanco Wavin Ind?stria e Com?rcio Ltda.', cnpj: '00.125.400/0001-88', setor: 'Tubula??es Pl?sticas' },
  { nome: 'Votorantim Cimentos S.A.', cnpj: '01.637.895/0001-32', setor: 'Cimento e Argamassas' },
  { nome: 'Gerdau A?os Longos S.A.', cnpj: '07.358.761/0001-69', setor: 'A?o para Constru??o' },
  { nome: 'Vedacit - Impermeabilizantes Baumgart Ind?stria Ltda.', cnpj: '60.528.205/0001-20', setor: 'Qu?mica da Constru??o' },
  { nome: 'Suvinil - BASF S.A.', cnpj: '48.539.407/0001-18', setor: 'Tintas Imobili?rias' },
  { nome: 'Coral - Akzo Nobel Ltda.', cnpj: '60.561.800/0001-40', setor: 'Tintas e Revestimentos' }
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

  static md5(str) {
    function safeAdd(x, y) {
      const lsw = (x & 0xffff) + (y & 0xffff);
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xffff);
    }
    function bitRol(num, cnt) { return (num << cnt) | (num >>> (32 - cnt)); }
    function md5cmn(q, a, b, x, s, t) { return safeAdd(bitRol(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b); }
    function md5ff(a, b, c, d, x, s, t) { return md5cmn((b & c) | (~b & d), a, b, x, s, t); }
    function md5gg(a, b, c, d, x, s, t) { return md5cmn((b & d) | (c & ~d), a, b, x, s, t); }
    function md5hh(a, b, c, d, x, s, t) { return md5cmn(b ^ c ^ d, a, b, x, s, t); }
    function md5ii(a, b, c, d, x, s, t) { return md5cmn(c ^ (b | ~d), a, b, x, s, t); }
    function binlMD5(x, len) {
      x[len >> 5] |= 0x80 << (len % 32);
      x[(((len + 64) >>> 9) << 4) + 14] = len;
      let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
      for (let i = 0; i < x.length; i += 16) {
        const olda = a, oldb = b, oldc = c, oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936); d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819); b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897); d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341); b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416); d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063); b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682); d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290); b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510); d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713); b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691); d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335); b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438); d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961); b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467); d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473); b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558); d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562); b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060); d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632); b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174); d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979); b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487); d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520); b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844); d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905); b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571); d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523); b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359); d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380); b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070); d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259); b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda); b = safeAdd(b, oldb); c = safeAdd(c, oldc); d = safeAdd(d, oldd);
      }
      return [a, b, c, d];
    }
    function binl2rstr(input) {
      let output = '';
      for (let i = 0; i < input.length * 32; i += 8) output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff);
      return output;
    }
    function rstr2binl(input) {
      const output = Array(input.length >> 2).fill(0);
      for (let i = 0; i < input.length * 8; i += 8) output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32);
      return output;
    }
    function rstr2hex(input) {
      const hexTab = '0123456789abcdef';
      let output = '';
      for (let i = 0; i < input.length; i++) {
        const x = input.charCodeAt(i);
        output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
      }
      return output;
    }
    return rstr2hex(binl2rstr(binlMD5(rstr2binl(String(str || '')), String(str || '').length * 8)));
  }

  static async sha1(str) {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(String(str || '')));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    return '';
  }

  static async sha256(str) {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(str || '')));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    return '';
  }

  static gerarLorem(qtdPalavras = 100) {
    const LOREM_VOCABULARIO = [
      'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
      'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
      'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip',
      'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
      'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat',
      'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est',
      'laborum', 'curabitur', 'pretium', 'tincidunt', 'lacus', 'gravida', 'orci', 'odio', 'varius', 'turpis',
      'pharetra', 'bibendum', 'felis', 'sollicitudin', 'mauris', 'integer', 'euismod', 'gravida', 'ornare',
      'risus', 'sagittis', 'egestas', 'ullamcorper', 'vestibulum', 'volutpat', 'fermentum', 'elementum'
    ];
    const n = Math.max(50, Math.min(500, parseInt(qtdPalavras, 10) || 100));
    const palavras = [];
    for (let i = 0; i < n; i++) {
      const w = LOREM_VOCABULARIO[Math.floor(Math.random() * LOREM_VOCABULARIO.length)];
      if (i === 0 || (i % 20 === 0 && i !== n - 1)) {
        palavras.push((i > 0 ? '. ' : '') + w.charAt(0).toUpperCase() + w.slice(1));
      } else {
        palavras.push(w);
      }
    }
    return palavras.join(' ').replace(/\s+\.\s+/g, '. ') + '.';
  }

  static gerarSenhaConfiguravel(opcoes = {}) {
    const tipo = String(opcoes.tipo || 'forte').toLowerCase();
    const tamanho = Math.max(4, Math.min(64, parseInt(opcoes.tamanho || 12, 10)));

    // 1. Passphrase / Mnemônica (Ex: estrela-floresta-trovao-horizonte)
    if (tipo === 'passphrase' || tipo === 'palavras') {
      const PALAVRAS = [
        'tucano', 'floresta', 'castelo', 'estrela', 'cafezal', 'safira', 'horizonte',
        'martelo', 'trovao', 'planeta', 'diamante', 'gaviao', 'oceano', 'cometa',
        'cascata', 'serpente', 'pantera', 'montanha', 'jaguar', 'tempestade', 'valente',
        'aurora', 'galaxia', 'falcao', 'cristal', 'ventania', 'nevoeiro', 'luar'
      ];
      const qtdPalavras = Math.max(3, Math.min(6, Math.floor(tamanho / 3) || 4));
      const selecionadas = [];
      for (let i = 0; i < qtdPalavras; i++) {
        selecionadas.push(PALAVRAS[Math.floor(Math.random() * PALAVRAS.length)]);
      }
      return selecionadas.join('-');
    }

    // 2. Pronunciável / Fácil de Falar (Ex: Batedo9, Lomire4)
    if (tipo === 'pronunciavel' || tipo === 'facil_falar') {
      const consoantes = 'bcdfghjklmnprstvz';
      const vogais = 'aeiou';
      let s = '';
      for (let i = 0; i < tamanho; i++) {
        s += (i % 2 === 0) ? consoantes[Math.floor(Math.random() * consoantes.length)]
                           : vogais[Math.floor(Math.random() * vogais.length)];
      }
      return s.charAt(0).toUpperCase() + s.slice(1, -1) + Math.floor(Math.random() * 9 + 1);
    }

    // 3. API Key / Secret Token (Ex: sk_live_83a7f82...)
    if (tipo === 'apikey' || tipo === 'token') {
      const prefixo = opcoes.prefixo || 'sk_live';
      const charsToken = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let token = '';
      for (let i = 0; i < Math.max(16, tamanho); i++) {
        token += charsToken.charAt(Math.floor(Math.random() * charsToken.length));
      }
      return `${prefixo}_${token}`;
    }

    // 4. UUID v4 Token
    if (tipo === 'uuid' || tipo === 'guid') {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    // 5. PIN Numérico (Ex: 1234, 123456)
    if (tipo === 'numerica' || tipo === 'pin') {
      let pin = '';
      for (let i = 0; i < tamanho; i++) pin += Math.floor(Math.random() * 10);
      return pin;
    }

    // 6. Alfanumérica (Sem símbolos especiais)
    if (tipo === 'alfanumerica' || tipo === 'sem_simbolos') {
      const charsAlfa = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let s = '';
      for (let i = 0; i < tamanho; i++) s += charsAlfa.charAt(Math.floor(Math.random() * charsAlfa.length));
      return s;
    }

    // 7. Forte Completa (Padrão: Maiúsculas, Minúsculas, Números e Símbolos)
    const charsForte = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%&*_-+=';
    let senha = '';
    for (let i = 0; i < tamanho; i++) {
      senha += charsForte.charAt(Math.floor(Math.random() * charsForte.length));
    }
    return senha;
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

  static gerarCnpj(filial = false) {
    const n = [];
    for (let i = 0; i < 8; i++) n.push(Math.floor(Math.random() * 10));
    const ordem = filial ? [0, 0, 0, Math.floor(Math.random() * 8 + 2)] : [0, 0, 0, 1];
    const base = [...n, ...ordem];

    const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let s1 = 0;
    for (let i = 0; i < 12; i++) s1 += base[i] * w1[i];
    let r1 = s1 % 11;
    const dv1 = r1 < 2 ? 0 : 11 - r1;
    base.push(dv1);

    const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let s2 = 0;
    for (let i = 0; i < 13; i++) s2 += base[i] * w2[i];
    let r2 = s2 % 11;
    const dv2 = r2 < 2 ? 0 : 11 - r2;
    base.push(dv2);

    const limpo = base.join('');
    const formatado = `${limpo.slice(0, 2)}.${limpo.slice(2, 5)}.${limpo.slice(5, 8)}/${limpo.slice(8, 12)}-${limpo.slice(12, 14)}`;
    return { limpo, formatado, tipo: filial ? 'Filial' : 'Matriz' };
  }

  static gerarCertidao(tipoLivro = 1, ano = 2024) {
    const cns = '123456';
    const acervo = '01';
    const servico = '55';
    const anoStr = String(ano || 2024);
    const tipoStr = String(tipoLivro || 1);
    const livro = String(Math.floor(Math.random() * 90000 + 10000));
    const folha = String(Math.floor(Math.random() * 900 + 100));
    const termo = String(Math.floor(Math.random() * 9000000 + 1000000));
    const base30 = `${cns}${acervo}${servico}${anoStr}${tipoStr}${livro}${folha}${termo}`;

    let soma1 = 0, peso1 = 2;
    for (let i = base30.length - 1; i >= 0; i--) {
      soma1 += parseInt(base30[i], 10) * peso1;
      peso1 = peso1 < 9 ? peso1 + 1 : 2;
    }
    let r1 = soma1 % 11;
    let dv1 = 11 - r1;
    if (dv1 >= 10) dv1 = 1;

    const base31 = `${base30}${dv1}`;
    let soma2 = 0, peso2 = 2;
    for (let i = base31.length - 1; i >= 0; i--) {
      soma2 += parseInt(base31[i], 10) * peso2;
      peso2 = peso2 < 9 ? peso2 + 1 : 2;
    }
    let r2 = soma2 % 11;
    let dv2 = 11 - r2;
    if (dv2 >= 10) dv2 = 1;

    const numero32 = `${base30}${dv1}${dv2}`;
    const tiposMap = { '1': 'Nascimento', '2': 'Casamento', '4': 'Óbito' };

    return {
      numero: numero32,
      formatado: `${numero32.slice(0, 6)} ${numero32.slice(6, 8)} ${numero32.slice(8, 10)} ${numero32.slice(10, 14)} ${numero32.slice(14, 15)} ${numero32.slice(15, 20)} ${numero32.slice(20, 23)} ${numero32.slice(23, 30)} ${numero32.slice(30, 32)}`,
      tipo: tiposMap[tipoStr] || 'Registro Civil',
      ano: parseInt(anoStr, 10),
      livro,
      folha,
      termo,
      dvs: `${dv1}${dv2}`
    };
  }

  static gerarIe(uf = 'SP') {
    const estado = String(uf || 'SP').toUpperCase();
    if (estado === 'SP') {
      const d = [];
      for (let i = 0; i < 8; i++) d.push(Math.floor(Math.random() * 10));
      const w1 = [1, 3, 4, 5, 6, 7, 8, 10];
      let s1 = 0;
      for (let i = 0; i < 8; i++) s1 += d[i] * w1[i];
      d.push((s1 % 11) % 10);
      d.push(Math.floor(Math.random() * 10));
      d.push(Math.floor(Math.random() * 10));
      const w2 = [3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2];
      let s2 = 0;
      for (let i = 0; i < 11; i++) s2 += d[i] * w2[i];
      d.push((s2 % 11) % 10);
      const limpo = d.join('');
      return { uf: 'SP', limpo, formatado: `${limpo.slice(0, 3)}.${limpo.slice(3, 6)}.${limpo.slice(6, 9)}.${limpo.slice(9, 12)}`, orgao: 'SEFAZ SP' };
    }
    if (estado === 'RJ') {
      const d = [];
      for (let i = 0; i < 7; i++) d.push(Math.floor(Math.random() * 10));
      const w = [2, 7, 6, 5, 4, 3, 2];
      let s = 0;
      for (let i = 0; i < 7; i++) s += d[i] * w[i];
      const r = s % 11;
      const dv = r <= 1 ? 0 : 11 - r;
      d.push(dv);
      const limpo = d.join('');
      return { uf: 'RJ', limpo, formatado: `${limpo.slice(0, 2)}.${limpo.slice(2, 5)}.${limpo.slice(5, 7)}-${dv}`, orgao: 'SEFAZ RJ' };
    }
    const d = [];
    for (let i = 0; i < 9; i++) d.push(Math.floor(Math.random() * 10));
    return { uf: estado, limpo: d.join(''), formatado: d.join(''), orgao: `SEFAZ ${estado}` };
  }

  static gerarContaBancaria(banco = '341') {
    const bCode = String(banco || '341');
    const agencia = String(GeradorFakePro.numeroAleatorio(100, 9999)).padStart(4, '0');
    let contaNum = '';
    let dv = '0';
    if (bCode === '341') { // Itaú
      contaNum = String(GeradorFakePro.numeroAleatorio(10000, 99999));
      dv = String((parseInt(contaNum, 10) % 9) + 1);
    } else if (bCode === '237') { // Bradesco
      contaNum = String(GeradorFakePro.numeroAleatorio(100000, 999999));
      dv = String(GeradorFakePro.numeroAleatorio(0, 9));
    } else {
      contaNum = String(GeradorFakePro.numeroAleatorio(10000, 99999));
      dv = String(GeradorFakePro.numeroAleatorio(0, 9));
    }
    return {
      banco: bCode,
      agencia,
      conta: `${contaNum}-${dv}`,
      contaLimpa: `${contaNum}${dv}`,
      operacao: bCode === '104' ? '013 (Poupança)' : '001 (Corrente)'
    };
  }

  static gerarEmpresa(filtros = {}) {
    const uf = filtros.uf || 'SP';
    const est = ESTADOS_BRASIL[uf.toUpperCase()] || ESTADOS_BRASIL.SP;
    const cid = GeradorFakePro.sortear(est.cidades);
    const cnpj = GeradorFakePro.gerarCnpj(false);
    const ie = GeradorFakePro.gerarIe(uf);
    const baseNome = GeradorFakePro.sortear(SOBRENOMES_PATERNOS);
    const atividade = GeradorFakePro.sortear(['Tecnologia', 'Comércio de Alimentos', 'Logística e Transportes', 'Consultoria e Gestão', 'Soluções Financeiras', 'Engenharia e Construção']);
    const capital = Number((GeradorFakePro.numeroAleatorio(50000, 2000000)).toFixed(2));
    const socio1 = GeradorFakePro.gerarNomeRealista('M');
    const socio2 = GeradorFakePro.gerarNomeRealista('F');

    return {
      razaoSocial: `${baseNome} & ${GeradorFakePro.sortear(SOBRENOMES_PATERNOS)} ${atividade} S.A.`,
      nomeFantasia: `${baseNome} ${atividade.split(' ')[0]} Brasil`,
      cnpj: cnpj.formatado,
      cnpjLimpo: cnpj.limpo,
      inscricaoEstadual: ie.formatado,
      situacaoCadastral: 'ATIVA',
      dataAbertura: '2018-05-14',
      capitalSocial: capital,
      capitalSocialFormatado: `R$ ${capital.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      regimeTributario: 'Simples Nacional / Lucro Presumido',
      endereco: {
        logradouro: GeradorFakePro.sortear(cid.ruas),
        numero: GeradorFakePro.numeroAleatorio(10, 2500),
        bairro: GeradorFakePro.sortear(cid.bairros),
        cidade: cid.nome,
        uf: est.nome,
        cep: `${String(cid.cepMin).slice(0, 5)}-000`
      },
      contato: {
        telefone: `(${est.ddds[0]}) 3${GeradorFakePro.numeroAleatorio(100, 999)}-${GeradorFakePro.numeroAleatorio(1000, 9999)}`,
        email: `contato@${baseNome.toLowerCase()}${atividade.split(' ')[0].toLowerCase()}.com.br`
      },
      quadroSocietario: [
        { nome: socio1, cargo: 'Sócio-Administrador', participacao: '60%' },
        { nome: socio2, cargo: 'Sócia', participacao: '40%' }
      ]
    };
  }

  static gerarNicknames() {
    const bases = ['Sniper', 'Shadow', 'Cyber', 'Ghost', 'Viper', 'Phoenix', 'Ninja', 'Raptor', 'Titan', 'Apex', 'Storm', 'Blade', 'Vortex', 'Kratos', 'Nexus'];
    const b = GeradorFakePro.sortear(bases);
    const n = GeradorFakePro.numeroAleatorio(10, 99);
    return {
      gamer: `${b}_${n}`,
      leet: b.replace(/e/gi, '3').replace(/a/gi, '4').replace(/o/gi, '0').replace(/i/gi, '1') + n,
      clan: `[OZ]_${b}`,
      clean: `${b.toLowerCase()}${n}`,
      pro: `xX_${b}_Xx`
    };
  }

  static gerarLetrasDiferentes(texto = 'Ponte APIs') {
    const t = String(texto || 'Ponte APIs');
    const bold = t.split('').map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D5D4 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D5EE + code - 97);
      return c;
    }).join('');
    const script = t.split('').map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D49C + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D4B6 + code - 97);
      return c;
    }).join('');
    const gothic = t.split('').map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D56C + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D586 + code - 97);
      return c;
    }).join('');
    const circles = t.split('').map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + code - 97);
      return c;
    }).join('');
    return { original: t, negrito: bold, manuscrito: script, gotico: gothic, circulado: circles };
  }

  static acervoSimbolos() {
    return {
      estrelas: ['★', '☆', '✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮', '✯', '✰', '✡'],
      setas: ['➔', '➜', '➤', '➥', '➦', '➧', '➨', '➩', '➪', '➮', '➯', '➱', '➲', '➳', '➵'],
      coracoes: ['♥', '♡', '❥', '❣', '❦', '❧', 'ღ'],
      especiais: ['✓', '✔', '✕', '✖', '✗', '✘', '⚡', '♾', '⚓', '⚔', '⚖', '⚜', '☣', '☢'],
      moedas: ['R$', '$', '€', '£', '¥', '₿', '¢', '₹']
    };
  }

  static sortearNumeros(min = 1, max = 60, qtd = 6) {
    const pool = [];
    for (let i = min; i <= max; i++) pool.push(i);
    const sorteados = [];
    for (let i = 0; i < qtd; i++) {
      if (!pool.length) break;
      const idx = Math.floor(Math.random() * pool.length);
      sorteados.push(pool.splice(idx, 1)[0]);
    }
    sorteados.sort((a, b) => a - b);
    return { min, max, quantidade: sorteados.length, sorteados };
  }

  static gerarImagemPlaceholder(largura = 400, altura = 300, bg = '0f172a', cor = '38bdf8', texto = '') {
    const w = parseInt(largura, 10) || 400;
    const h = parseInt(altura, 10) || 300;
    const txt = texto || `${w}x${h}`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="100%" height="100%" fill="#${bg.replace('#', '')}"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="20" font-weight="bold" fill="#${cor.replace('#', '')}">${txt}</text></svg>`;
  }

  static gerarCurriculo(filtros = {}) {
    const p = GeradorFakePro.gerar(filtros);
    return {
      dadosPessoais: {
        nome: p.nome,
        profissao: p.perfil.profissao,
        email: p.contato.email,
        celular: p.contato.celular,
        cidadeUf: `${p.endereco.cidade} - ${p.endereco.uf}`
      },
      resumoProfissional: `Profissional especializado em ${p.perfil.profissao} com sólido histórico de entrega em empresas como ${p.carreira.empresaAnterior.razaoSocial}. Apaixonado por inovação, boas práticas e alta performance.`,
      experiencias: [
        {
          cargo: p.perfil.profissao,
          empresa: p.carreira.empresaAnterior.razaoSocial,
          periodo: `2021 - Presente (${p.carreira.empresaAnterior.tempoPermanencia})`,
          descricao: p.biografiaLorem.slice(0, 180) + '.'
        },
        {
          cargo: 'Assistente / Analista Júnior',
          empresa: 'Grupo Votorantim S.A.',
          periodo: '2018 - 2021 (3 anos)',
          descricao: 'Atuação no suporte a operações estratégicas, implementação de fluxos ágeis e atendimento a metas corporativas.'
        }
      ],
      formacao: [
        { curso: `Graduação em ${p.perfil.profissao.split(' ')[0]}`, instituicao: 'Universidade de São Paulo (USP)', anoConclusao: 2018 }
      ],
      habilidades: ['Trabalho em Equipe', 'Liderança Ágil', 'Comunicação Assertiva', 'Gestão de Projetos', 'Resolução de Problemas'],
      idiomas: [
        { idioma: 'Português', nivel: 'Nativo' },
        { idioma: 'Inglês', nivel: 'Avançado / Fluente' }
      ]
    };
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
    
    // Senha configurável via opções de chamada da API
    const tipoSenha = filtros.tipoSenha || filtros.senhaTipo || 'forte';
    const tamanhoSenha = filtros.tamanhoSenha || filtros.senhaLen || 12;
    const senha = GeradorFakePro.gerarSenhaConfiguravel({ tipo: tipoSenha, tamanho: tamanhoSenha });
    const senhaMd5 = GeradorFakePro.md5(senha);

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

    // Lorem Ipsum com contagem de palavras configurável de 50 a 500 palavras
    const qtdLorem = filtros.loremWords || filtros.palavrasLorem || filtros.loremQtd || GeradorFakePro.numeroAleatorio(60, 150);
    const loremIpsum = GeradorFakePro.gerarLorem(qtdLorem);

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
        senhaMd5,
        tipoSenhaUtilizado: tipoSenha,
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
        banco: banco.razaoSocial,
        nomeReduzido: banco.nomeReduzido,
        codigoBanco: banco.codigo,
        ispb: banco.ispb,
        cnpjInstituicao: banco.cnpj,
        segmentoBancario: banco.segmento,
        siteOficial: banco.site,
        agencia,
        contaCorrente: conta,
        chavePix: cpf.formatado,
        tiposChaveAceitos: banco.chavePixTipos
      },
      cartaoCredito: cartao,
      veiculo: veiculo,
      avatarUrl: avatarUrl,
      biografiaLorem: loremIpsum,
      totalPalavrasLorem: loremIpsum.split(' ').length,
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
