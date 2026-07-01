export interface CidadeInfo {
  nome: string
  slug: string
  regiao: string
  estado: string
  isCapital: boolean
  porte: 'pequena' | 'media' | 'grande'
  economia: string
  descricao: string
  populacao: string
  tipoLocal: 'capital' | 'grande-centro' | 'polo-regional' | 'cidade-media' | 'cidade-pequena' | 'turistica' | 'industrial' | 'agroindustrial' | 'serrana'
}

// Economias por região (para cidades sem dado específico)
const economiasPadrao: Record<string, string> = {
  'Grande Florianópolis': 'Comércio, Serviços, Turismo e Construção Civil',
  'Sul Catarinense': 'Indústria, Comércio, Agricultura e Serviços',
  'Norte Catarinense': 'Indústria, Comércio, Tecnologia e Serviços',
  'Vale do Itajaí': 'Indústria Têxtil, Comércio, Tecnologia e Serviços',
  'Oeste Catarinense': 'Agroindústria, Comércio, Agricultura e Serviços',
  'Serra Catarinense': 'Turismo, Agricultura, Comércio e Serviços',
  'Meio-Oeste': 'Comércio, Agricultura, Indústria e Serviços',
  'Planalto Norte': 'Agricultura, Comércio, Indústria e Serviços',
}

function slugify(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function inferirTipo(nome: string, porte: string, regiao: string, isCapital: boolean): CidadeInfo['tipoLocal'] {
  if (isCapital) return 'capital'
  if (porte === 'grande') return 'grande-centro'
  if (['Sul Catarinense', 'Vale do Itajaí', 'Norte Catarinense'].includes(regiao) && porte === 'media') return 'industrial'
  if (['Oeste Catarinense'].includes(regiao) && porte === 'media') return 'agroindustrial'
  if (['Serra Catarinense'].includes(regiao)) return 'serrana'
  if (['Grande Florianópolis', 'Litoral'].includes(regiao)) return 'turistica'
  if (porte === 'media') return 'polo-regional'
  return 'cidade-pequena'
}

// Cidades com dados específicos (personalizados)
const cidadesDetalhadas: Record<string, Partial<CidadeInfo>> = {
  'Joinville': { porte: 'grande', economia: 'Indústria, Tecnologia, Comércio e Serviços', populacao: '597.658' },
  'Florianópolis': { porte: 'grande', economia: 'Turismo, Tecnologia, Comércio e Serviços', populacao: '537.211' },
  'Blumenau': { porte: 'grande', economia: 'Indústria Têxtil, Tecnologia, Turismo e Comércio', populacao: '357.199' },
  'São José': { porte: 'grande', economia: 'Comércio, Serviços, Tecnologia e Construção Civil', populacao: '250.769' },
  'Criciúma': { porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '219.393' },
  'Chapecó': { porte: 'grande', economia: 'Agroindústria, Comércio e Tecnologia', populacao: '224.025' },
  'Itajaí': { porte: 'grande', economia: 'Atividade Portuária, Comércio e Serviços', populacao: '223.112' },
  'Jaraguá do Sul': { porte: 'grande', economia: 'Indústria, Tecnologia e Comércio', populacao: '181.317' },
  'Palhoça': { porte: 'media', economia: 'Comércio, Serviços e Construção Civil', populacao: '175.000' },
  'Balneário Camboriú': { porte: 'grande', economia: 'Turismo, Construção Civil e Comércio', populacao: '142.295' },
  'Lages': { porte: 'media', economia: 'Turismo, Agricultura, Comércio e Serviços', populacao: '156.727' },
  'Brusque': { porte: 'media', economia: 'Indústria Têxtil, Comércio e Serviços', populacao: '140.597' },
  'Tubarão': { porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '105.687' },
  'Caçador': { porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '78.000' },
  'Concórdia': { porte: 'media', economia: 'Agroindústria, Comércio e Serviços', populacao: '74.000' },
  'Rio do Sul': { porte: 'media', economia: 'Comércio, Indústria e Tecnologia', populacao: '72.000' },
  'São Bento do Sul': { porte: 'media', economia: 'Indústria Moveleira, Comércio e Serviços', populacao: '85.000' },
  'Indaial': { porte: 'media', economia: 'Indústria Têxtil, Tecnologia e Comércio', populacao: '70.000' },
  'Videira': { porte: 'media', economia: 'Agroindústria Vitivinícola, Comércio e Serviços', populacao: '53.000' },
  'Araranguá': { porte: 'media', economia: 'Comércio, Indústria e Serviços', populacao: '68.000' },
  'Laguna': { porte: 'media', economia: 'Turismo, Pesca, Comércio e Serviços', populacao: '44.000' },
  'Curitibanos': { porte: 'media', economia: 'Agricultura, Comércio e Serviços', populacao: '39.000' },
  'Navegantes': { porte: 'media', economia: 'Atividade Portuária, Turismo e Comércio', populacao: '83.000' },
  'Biguaçu': { porte: 'media', economia: 'Comércio, Indústria e Serviços', populacao: '67.000' },
  'Mafra': { porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '55.000' },
  'Canoinhas': { porte: 'media', economia: 'Indústria, Comércio e Agricultura', populacao: '53.000' },
  'São Miguel do Oeste': { porte: 'media', economia: 'Agroindústria, Comércio e Serviços', populacao: '40.000' },
  'Gaspar': { porte: 'media', economia: 'Indústria Têxtil, Comércio e Serviços', populacao: '70.000' },
  'Timbó': { porte: 'pequena', economia: 'Indústria, Tecnologia e Comércio', populacao: '43.000' },
  'Imbituba': { porte: 'pequena', economia: 'Atividade Portuária, Turismo e Comércio', populacao: '45.000' },
  'Itapema': { porte: 'pequena', economia: 'Turismo, Construção Civil e Comércio', populacao: '62.000' },
  'Campos Novos': { porte: 'pequena', economia: 'Agricultura, Comércio e Serviços', populacao: '36.000' },
  'Porto Belo': { porte: 'pequena', economia: 'Turismo, Comércio e Serviços', populacao: '20.000' },
  'Garopaba': { porte: 'pequena', economia: 'Turismo, Pesca e Comércio', populacao: '23.000' },
  'Sombrio': { porte: 'pequena', economia: 'Comércio, Agricultura e Serviços', populacao: '29.000' },
  'Içara': { porte: 'pequena', economia: 'Indústria, Comércio e Serviços', populacao: '52.000' },
  'Camboriú': { porte: 'media', economia: 'Comércio, Serviços e Construção Civil', populacao: '84.000' },
  'São Francisco do Sul': { porte: 'pequena', economia: 'Atividade Portuária, Turismo e Comércio', populacao: '50.000' },
}

const cidadesPorRegiao: Record<string, string[]> = {
  'Grande Florianópolis': ['Águas Mornas', 'Antônio Carlos', 'Biguaçu', 'Florianópolis', 'Governador Celso Ramos', 'Palhoça', 'Santo Amaro da Imperatriz', 'São Bonifácio', 'São José', 'São Pedro de Alcântara'],
  'Sul Catarinense': ['Araranguá', 'Armazém', 'Balneário Arroio do Silva', 'Balneário Gaivota', 'Balneário Rincão', 'Braço do Norte', 'Capivari de Baixo', 'Criciúma', 'Ermo', 'Forquilhinha', 'Garopaba', 'Grão Pará', 'Içara', 'Imaruí', 'Imbituba', 'Jacinto Machado', 'Laguna', 'Lauro Müller', 'Maracajá', 'Meleiro', 'Morro Grande', 'Nova Veneza', 'Paulo Lopes', 'Passo de Torres', 'Pedras Grandes', 'Pescaria Brava', 'Praia Grande', 'Rio Fortuna', 'Santa Rosa do Sul', 'São João do Sul', 'São Ludgero', 'São Martinho', 'Sangão', 'Sombrio', 'Timbé do Sul', 'Treze de Maio', 'Tubarão', 'Turvo'],
  'Norte Catarinense': ['Araquari', 'Balneário Barra do Sul', 'Bela Vista do Toldo', 'Campo Alegre', 'Canoinhas', 'Corupá', 'Garuva', 'Guaramirim', 'Irineópolis', 'Itaiópolis', 'Itapoá', 'Jaraguá do Sul', 'Joinville', 'Mafra', 'Major Vieira', 'Massaranduba', 'Monte Castelo', 'Papanduva', 'Porto União', 'Rio Negrinho', 'São Bento do Sul', 'São Francisco do Sul', 'Schroeder', 'Três Barras'],
  'Vale do Itajaí': ['Agrolândia', 'Agronômica', 'Apiúna', 'Ascurra', 'Atalanta', 'Aurora', 'Balneário Camboriú', 'Balneário Piçarras', 'Barra Velha', 'Benedito Novo', 'Blumenau', 'Bombinhas', 'Braço do Trombudo', 'Brusque', 'Camboriú', 'Chapadão do Lageado', 'Dona Emma', 'Doutor Pedrinho', 'Gaspar', 'Guabiruba', 'Ibirama', 'Ilhota', 'Imbuia', 'Indaial', 'Itajaí', 'Itapema', 'Ituporanga', 'José Boiteux', 'Laurentino', 'Lontras', 'Luiz Alves', 'Mirim Doce', 'Navegantes', 'Penha', 'Petrolândia', 'Pomerode', 'Porto Belo', 'Pouso Redondo', 'Presidente Getúlio', 'Presidente Nereu', 'Rio do Campo', 'Rio do Oeste', 'Rio do Sul', 'Rio dos Cedros', 'Rodeio', 'Salete', 'Taió', 'Timbó', 'Trombudo Central', 'Vidal Ramos', 'Vitor Meireles', 'Witmarsum'],
  'Oeste Catarinense': ['Abelardo Luz', 'Água Doce', 'Águas de Chapecó', 'Águas Frias', 'Alto Bela Vista', 'Anchieta', 'Arabutã', 'Arroio Trinta', 'Arvoredo', 'Bandeirante', 'Barra Bonita', 'Belmonte', 'Bom Jesus do Oeste', 'Caibi', 'Calmon', 'Campo Erê', 'Caxambu do Sul', 'Chapecó', 'Cordilheira Alta', 'Coronel Freitas', 'Coronel Martins', 'Cunha Porã', 'Cunhataí', 'Descanso', 'Dionísio Cerqueira', 'Entre Rios', 'Faxinal dos Guedes', 'Flor do Sertão', 'Formosa do Sul', 'Galvão', 'Guaraciaba', 'Guarujá do Sul', 'Guatambú', 'Herval d\'Oeste', 'Ibiam', 'Ibicaré', 'Iomerê', 'Ipira', 'Iporã do Oeste', 'Ipuaçu', 'Ipumirim', 'Iraceminha', 'Irani', 'Irati', 'São Miguel do Oeste', 'Saudades', 'Seara', 'Serra Alta', 'Sul Brasil', 'Tigrinhos', 'Treze Tílias', 'Tunápolis', 'Vargeão', 'Vargem Bonita', 'Xanxerê', 'Xavantina', 'Xaxim', 'Zortéa', 'Itá', 'Jaborá', 'Jardinópolis', 'Joaçaba', 'Lacerdópolis', 'Lajeado Grande', 'Luzerna', 'Marema', 'Modelo', 'Mondaí', 'Nova Erechim', 'Nova Itaberaba', 'Novo Horizonte', 'Ouro', 'Ouro Verde', 'Paial', 'Palma Sola', 'Palmitos', 'Passos Maia', 'Peritiba', 'Pinhalzinho', 'Planalto Alegre', 'Ponte Serrada', 'Princesa', 'Quilombo', 'Riqueza', 'Romelândia', 'Santa Helena', 'Santa Terezinha do Progresso', 'Santiago do Sul', 'São Bernardino', 'São Carlos', 'São Domingos', 'São João do Oeste', 'São José do Cedro', 'São Lourenço do Oeste', 'São Miguel da Boa Vista'],
  'Serra Catarinense': ['Anita Garibaldi', 'Bocaina do Sul', 'Bom Jardim da Serra', 'Bom Retiro', 'Campo Belo do Sul', 'Capão Alto', 'Celso Ramos', 'Cerro Negro', 'Correia Pinto', 'Curitibanos', 'Frei Rogério', 'Lages', 'Lebon Régis', 'Monte Carlo', 'Otacílio Costa', 'Painel', 'Palmeira', 'Ponte Alta', 'Ponte Alta do Norte', 'Rio Rufino', 'Santa Cecília', 'São Cristóvão do Sul', 'São Joaquim', 'São José do Cerrito', 'Timbó Grande', 'Urubici', 'Urupema', 'Vaccum'],
  'Meio-Oeste': ['Caçador', 'Campos Novos', 'Catanduvas', 'Erval Velho', 'Fraiburgo', 'Herval d\'Oeste', 'Ibicaré', 'Joaçaba', 'Lacerdópolis', 'Luzerna', 'Macieira', 'Matos Costa', 'Ouro', 'Pinheiro Preto', 'Rio das Antas', 'Tangará', 'Timbó Grande', 'Treze Tílias', 'Videira'],
  'Planalto Norte': ['Bela Vista do Toldo', 'Canoinhas', 'Irineópolis', 'Itaiópolis', 'Mafra', 'Major Vieira', 'Monte Castelo', 'Papanduva', 'Porto União', 'Três Barras'],
}

const capitaisBR: [string, string, string][] = [
  ['Rio Branco', 'AC', 'Acre'], ['Maceió', 'AL', 'Alagoas'], ['Macapá', 'AP', 'Amapá'],
  ['Manaus', 'AM', 'Amazonas'], ['Salvador', 'BA', 'Bahia'], ['Fortaleza', 'CE', 'Ceará'],
  ['Brasília', 'DF', 'Distrito Federal'], ['Vitória', 'ES', 'Espírito Santo'],
  ['Goiânia', 'GO', 'Goiás'], ['São Luís', 'MA', 'Maranhão'], ['Cuiabá', 'MT', 'Mato Grosso'],
  ['Campo Grande', 'MS', 'Mato Grosso do Sul'], ['Belo Horizonte', 'MG', 'Minas Gerais'],
  ['Belém', 'PA', 'Pará'], ['João Pessoa', 'PB', 'Paraíba'], ['Curitiba', 'PR', 'Paraná'],
  ['Recife', 'PE', 'Pernambuco'], ['Teresina', 'PI', 'Piauí'], ['Rio de Janeiro', 'RJ', 'Rio de Janeiro'],
  ['Natal', 'RN', 'Rio Grande do Norte'], ['Porto Alegre', 'RS', 'Rio Grande do Sul'],
  ['Porto Velho', 'RO', 'Rondônia'], ['Boa Vista', 'RR', 'Roraima'],
  ['São Paulo', 'SP', 'São Paulo'], ['Aracaju', 'SE', 'Sergipe'], ['Palmas', 'TO', 'Tocantins'],
]

function descricaoRegiao(regiao: string): string {
  const map: Record<string, string> = {
    'Grande Florianópolis': 'região metropolitana de Florianópolis',
    'Sul Catarinense': 'região sul do estado de Santa Catarina',
    'Norte Catarinense': 'região norte do estado de Santa Catarina',
    'Vale do Itajaí': 'região do Vale do Itajaí em Santa Catarina',
    'Oeste Catarinense': 'região oeste do estado de Santa Catarina',
    'Serra Catarinense': 'região serrana do estado de Santa Catarina',
    'Meio-Oeste': 'região meio-oeste do estado de Santa Catarina',
    'Planalto Norte': 'região do planalto norte catarinense',
  }
  return map[regiao] || regiao
}

// Gera o array completo de cidades
const todasCidades: CidadeInfo[] = []

// SC cities
for (const [regiao, cidades] of Object.entries(cidadesPorRegiao)) {
  for (const nome of cidades) {
    const detalhes = cidadesDetalhadas[nome]
    const slug = `advogado-em-${slugify(nome)}`
    const porte = (detalhes?.porte || 'pequena') as 'pequena' | 'media' | 'grande'
    const economia = detalhes?.economia || economiasPadrao[regiao] || 'Comércio e Serviços'
    const populacao = detalhes?.populacao || (porte === 'grande' ? 'mais de 200 mil' : porte === 'media' ? 'entre 50 e 200 mil' : 'até 50 mil')
    const tipoLocal = inferirTipo(nome, porte, regiao, false)
    const desc = `${nome} está localizada na ${descricaoRegiao(regiao)}`
    
    todasCidades.push({
      nome, slug, regiao, estado: 'SC', isCapital: false, porte, economia,
      descricao: desc, populacao, tipoLocal,
    })
  }
}

// Brazilian capitals
for (const [nome, sigla, estado] of capitaisBR) {
  const slug = `advogado-em-${slugify(nome)}`
  const porte: 'grande' = 'grande'
  const economia = 'Comércio, Serviços, Indústria e Tecnologia'
  const populacao = 'capital do estado'
  const tipoLocal: 'capital' = 'capital'
  const desc = `${nome} é a capital do estado do ${estado}`
  
  todasCidades.push({
    nome, slug, regiao: estado, estado: sigla, isCapital: true, porte, economia,
    descricao: desc, populacao, tipoLocal,
  })
}

export const cidades: CidadeInfo[] = todasCidades

export function getCidadeBySlug(slug: string): CidadeInfo | undefined {
  return todasCidades.find(c => c.slug === slug)
}

export function getCidadesByEstado(estado: string): CidadeInfo[] {
  return todasCidades.filter(c => c.estado === estado)
}


// ═══ CIDADES DE OUTROS ESTADOS ═══
export interface CidadeExtra {
  nome: string
  slug: string
  estado: string
  regiao: string
  porte: 'pequena' | 'media' | 'grande'
  economia: string
  populacao: string
}

export const cidadesExtras: CidadeExtra[] = [
  { nome: 'Rio Branco', slug: 'advogado-em-rio-branco', estado: 'AC', regiao: 'Acre', porte: 'grande', economia: 'Comércio, Serviços e Administração Pública', populacao: '410.000' },
  { nome: 'Cruzeiro do Sul', slug: 'advogado-em-cruzeiro-do-sul', estado: 'AC', regiao: 'Sul do Acre', porte: 'pequena', economia: 'Comércio, Agricultura e Serviços', populacao: '85.000' },
  { nome: 'Sena Madureira', slug: 'advogado-em-sena-madureira', estado: 'AC', regiao: 'Centro-Sul do Acre', porte: 'pequena', economia: 'Agricultura, Pecuária e Comércio', populacao: '45.000' },
  { nome: 'Tarauacá', slug: 'advogado-em-tarauaca', estado: 'AC', regiao: 'Interior do Acre', porte: 'pequena', economia: 'Agricultura, Pecuária e Comércio', populacao: '40.000' },
  { nome: 'Maceió', slug: 'advogado-em-maceio', estado: 'AL', regiao: 'Alagoas', porte: 'grande', economia: 'Comércio, Serviços, Turismo e Indústria', populacao: '1.020.000' },
  { nome: 'Arapiraca', slug: 'advogado-em-arapiraca', estado: 'AL', regiao: 'Sul de Alagoas', porte: 'media', economia: 'Agroindústria Canavieira, Comércio e Serviços', populacao: '230.000' },
  { nome: 'Penedo', slug: 'advogado-em-penedo', estado: 'AL', regiao: 'Vale do São Francisco', porte: 'pequena', economia: 'Turismo Histórico, Comércio e Serviços', populacao: '35.000' },
  { nome: 'Palmeira dos Índios', slug: 'advogado-em-palmeira-dos-indios', estado: 'AL', regiao: 'Agreste Alagoano', porte: 'pequena', economia: 'Agricultura, Comércio e Serviços', populacao: '45.000' },
  { nome: 'Rio Largo', slug: 'advogado-em-rio-largo', estado: 'AL', regiao: 'Metrópole de Maceió', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '70.000' },
  { nome: 'Macapá', slug: 'advogado-em-macapa', estado: 'AP', regiao: 'Amapá', porte: 'grande', economia: 'Comércio, Serviços, Mineração e Administração Pública', populacao: '510.000' },
  { nome: 'Santana', slug: 'advogado-em-santana', estado: 'AP', regiao: 'Litoral do Amapá', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '120.000' },
  { nome: 'Laranjal do Jari', slug: 'advogado-em-laranjal-do-jari', estado: 'AP', regiao: 'Oeste do Amapá', porte: 'pequena', economia: 'Mineração, Agricultura e Comércio', populacao: '50.000' },
  { nome: 'Manaus', slug: 'advogado-em-manaus', estado: 'AM', regiao: 'Amazonas', porte: 'grande', economia: 'Indústria (ZFM), Comércio, Tecnologia e Serviços', populacao: '2.200.000' },
  { nome: 'Parintins', slug: 'advogado-em-parintins', estado: 'AM', regiao: 'Médio Amazonas', porte: 'media', economia: 'Turismo, Pesca e Comércio', populacao: '120.000' },
  { nome: 'Itacoatiara', slug: 'advogado-em-itacoatiara', estado: 'AM', regiao: 'Leste Amazonense', porte: 'media', economia: 'Agricultura, Pesca e Comércio', populacao: '95.000' },
  { nome: 'Manacapuru', slug: 'advogado-em-manacapuru', estado: 'AM', regiao: 'Centro-Sul do Amazonas', porte: 'media', economia: 'Agricultura, Pecuária e Comércio', populacao: '85.000' },
  { nome: 'Tefé', slug: 'advogado-em-tefe', estado: 'AM', regiao: 'Médio Solimões', porte: 'media', economia: 'Comércio, Serviços e Transporte Fluvial', populacao: '65.000' },
  { nome: 'Coari', slug: 'advogado-em-coari', estado: 'AM', regiao: 'Centro-Oeste do Amazonas', porte: 'media', economia: 'Petróleo e Gás, Comércio e Serviços', populacao: '80.000' },
  { nome: 'Salvador', slug: 'advogado-em-salvador', estado: 'BA', regiao: 'Bahia', porte: 'grande', economia: 'Petróleo, Turismo, Indústria, Comércio e Serviços', populacao: '2.900.000' },
  { nome: 'Feira de Santana', slug: 'advogado-em-feira-de-santana', estado: 'BA', regiao: 'Centro-Norte da Bahia', porte: 'grande', economia: 'Indústria, Comércio e Agroindústria', populacao: '620.000' },
  { nome: 'Vitória da Conquista', slug: 'advogado-em-vitoria-da-conquista', estado: 'BA', regiao: 'Sudoeste da Bahia', porte: 'media', economia: 'Agropecuária, Comércio e Serviços', populacao: '340.000' },
  { nome: 'Camaçari', slug: 'advogado-em-camacari', estado: 'BA', regiao: 'Região Metropolitana de Salvador', porte: 'media', economia: 'Indústria Petroquímica, Comércio e Serviços', populacao: '300.000' },
  { nome: 'Ilhéus', slug: 'advogado-em-ilheus', estado: 'BA', regiao: 'Costa do Cacau', porte: 'media', economia: 'Turismo, Cacau e Comércio', populacao: '180.000' },
  { nome: 'Jequié', slug: 'advogado-em-jequie', estado: 'BA', regiao: 'Sudoeste da Bahia', porte: 'media', economia: 'Agropecuária, Comércio e Serviços', populacao: '160.000' },
  { nome: 'Barreiras', slug: 'advogado-em-barreiras', estado: 'BA', regiao: 'Oeste Baiano', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '150.000' },
  { nome: 'Teixeira de Freitas', slug: 'advogado-em-teixeira-de-freitas', estado: 'BA', regiao: 'Sul da Bahia', porte: 'media', economia: 'Indústria, Comércio e Agropecuária', populacao: '110.000' },
  { nome: 'Alagoinhas', slug: 'advogado-em-alagoinhas', estado: 'BA', regiao: 'Norte Baiano', porte: 'media', economia: 'Indústria, Comércio e Agropecuária', populacao: '100.000' },
  { nome: 'Porto Seguro', slug: 'advogado-em-porto-seguro', estado: 'BA', regiao: 'Costa do Descobrimento', porte: 'media', economia: 'Turismo, Comércio e Serviços', populacao: '150.000' },
  { nome: 'Juazeiro', slug: 'advogado-em-juazeiro', estado: 'BA', regiao: 'Vale do São Francisco', porte: 'media', economia: 'Agronegócio, Comércio e Irrigação', populacao: '220.000' },
  { nome: 'Paulo Afonso', slug: 'advogado-em-paulo-afonso', estado: 'BA', regiao: 'Vale do São Francisco', porte: 'media', economia: 'Energia Hidrelétrica, Comércio e Serviços', populacao: '120.000' },
  { nome: 'Fortaleza', slug: 'advogado-em-fortaleza', estado: 'CE', regiao: 'Ceará', porte: 'grande', economia: 'Comércio, Serviços, Indústria e Turismo', populacao: '2.700.000' },
  { nome: 'Caucaia', slug: 'advogado-em-caucaia', estado: 'CE', regiao: 'Região Metropolitana de Fortaleza', porte: 'grande', economia: 'Indústria, Comércio e Petróleo', populacao: '370.000' },
  { nome: 'Juazeiro do Norte', slug: 'advogado-em-juazeiro-do-norte', estado: 'CE', regiao: 'Cariri', porte: 'media', economia: 'Indústria Calçadista, Comércio e Serviços', populacao: '280.000' },
  { nome: 'Maracanaú', slug: 'advogado-em-maracanaú', estado: 'CE', regiao: 'Região Metropolitana de Fortaleza', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '230.000' },
  { nome: 'Sobral', slug: 'advogado-em-sobral', estado: 'CE', regiao: 'Norte Cearense', porte: 'media', economia: 'Indústria, Comércio e Agropecuária', populacao: '210.000' },
  { nome: 'Crato', slug: 'advogado-em-crato', estado: 'CE', regiao: 'Cariri', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '135.000' },
  { nome: 'Itapipoca', slug: 'advogado-em-itapipoca', estado: 'CE', regiao: 'Litoral Oeste do Ceará', porte: 'media', economia: 'Agricultura, Pecuária e Comércio', populacao: '65.000' },
  { nome: 'Maranguape', slug: 'advogado-em-maranguape', estado: 'CE', regiao: 'Região Metropolitana de Fortaleza', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '120.000' },
  { nome: 'Quixadá', slug: 'advogado-em-quixada', estado: 'CE', regiao: 'Sertão Central', porte: 'media', economia: 'Agricultura, Pecuária e Comércio', populacao: '80.000' },
  { nome: 'Brasília', slug: 'advogado-em-brasilia', estado: 'DF', regiao: 'Distrito Federal', porte: 'grande', economia: 'Administrativo, Serviços, Tecnologia e Comércio', populacao: '3.000.000' },
  { nome: 'Ceilândia', slug: 'advogado-em-ceilandia', estado: 'DF', regiao: 'Região Administrativa de Ceilândia', porte: 'grande', economia: 'Comércio, Serviços e Administrativo', populacao: '400.000' },
  { nome: 'Taguatinga', slug: 'advogado-em-taguatinga', estado: 'DF', regiao: 'Região Administrativa de Taguatinga', porte: 'grande', economia: 'Comércio, Serviços e Administrativo', populacao: '350.000' },
  { nome: 'Samambaia', slug: 'advogado-em-samambaia', estado: 'DF', regiao: 'Região Administrativa de Samambaia', porte: 'media', economia: 'Comércio, Serviços e Administrativo', populacao: '280.000' },
  { nome: 'Plano Piloto', slug: 'advogado-em-plano-piloto', estado: 'DF', regiao: 'Região Administrativa do Plano Piloto', porte: 'media', economia: 'Administrativo, Serviços e Comércio', populacao: '120.000' },
  { nome: 'Vitória', slug: 'advogado-em-vitoria', estado: 'ES', regiao: 'Espírito Santo', porte: 'grande', economia: 'Indústria, Comércio, Serviços e Portuária', populacao: '370.000' },
  { nome: 'Vila Velha', slug: 'advogado-em-vila-velha', estado: 'ES', regiao: 'Grande Vitória', porte: 'grande', economia: 'Comércio, Serviços e Indústria', populacao: '500.000' },
  { nome: 'Serra', slug: 'advogado-em-serra', estado: 'ES', regiao: 'Região Metropolitana', porte: 'grande', economia: 'Indústria, Portuária e Comércio', populacao: '530.000' },
  { nome: 'Cariacica', slug: 'advogado-em-cariacica', estado: 'ES', regiao: 'Grande Vitória', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '380.000' },
  { nome: 'Linhares', slug: 'advogado-em-linhares', estado: 'ES', regiao: 'Norte Capixaba', porte: 'media', economia: 'Agricultura, Indústria e Comércio', populacao: '180.000' },
  { nome: 'Cachoeiro de Itapemirim', slug: 'advogado-em-cachoeiro-de-itapemirim', estado: 'ES', regiao: 'Sul Capixaba', porte: 'media', economia: 'Indústria de Mármore, Comércio e Serviços', populacao: '210.000' },
  { nome: 'Colatina', slug: 'advogado-em-colatina', estado: 'ES', regiao: 'Norte Capixaba', porte: 'media', economia: 'Indústria, Agricultura e Comércio', populacao: '120.000' },
  { nome: 'Guarapari', slug: 'advogado-em-guarapari', estado: 'ES', regiao: 'Litoral Norte do ES', porte: 'media', economia: 'Turismo, Comércio e Indústria', populacao: '110.000' },
  { nome: 'São Mateus', slug: 'advogado-em-sao-mateus', estado: 'ES', regiao: 'Norte Capixaba', porte: 'media', economia: 'Agricultura, Portuária e Comércio', populacao: '130.000' },
  { nome: 'Goiânia', slug: 'advogado-em-goiania', estado: 'GO', regiao: 'Goiás', porte: 'grande', economia: 'Comércio, Serviços, Indústria e Tecnologia', populacao: '1.500.000' },
  { nome: 'Aparecida de Goiânia', slug: 'advogado-em-aparecida-de-goiania', estado: 'GO', regiao: 'Região Metropolitana de Goiânia', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '590.000' },
  { nome: 'Anápolis', slug: 'advogado-em-anapolis', estado: 'GO', regiao: 'Centro Goiano', porte: 'media', economia: 'Indústria Farmacêutica, Comércio e Serviços', populacao: '390.000' },
  { nome: 'Rio Verde', slug: 'advogado-em-rio-verde', estado: 'GO', regiao: 'Sudoeste Goiano', porte: 'media', economia: 'Agronegócio, Indústria e Comércio', populacao: '240.000' },
  { nome: 'Luziânia', slug: 'advogado-em-luziania', estado: 'GO', regiao: 'Entorno de Brasília', porte: 'media', economia: 'Comércio, Serviços e Construção Civil', populacao: '210.000' },
  { nome: 'Águas Lindas de Goiás', slug: 'advogado-em-aguas-lindas-de-goias', estado: 'GO', regiao: 'Entorno de Brasília', porte: 'media', economia: 'Mineração, Comércio e Serviços', populacao: '65.000' },
  { nome: 'Itumbiara', slug: 'advogado-em-itumbiara', estado: 'GO', regiao: 'Sul Goiano', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '105.000' },
  { nome: 'Jataí', slug: 'advogado-em-jatai', estado: 'GO', regiao: 'Sudoeste Goiano', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '105.000' },
  { nome: 'Catalão', slug: 'advogado-em-catalao', estado: 'GO', regiao: 'Sudoeste Goiano', porte: 'media', economia: 'Mineração, Indústria e Comércio', populacao: '120.000' },
  { nome: 'Planaltina', slug: 'advogado-em-planaltina', estado: 'GO', regiao: 'Norte Goiano', porte: 'media', economia: 'Agricultura, Comércio e Serviços', populacao: '95.000' },
  { nome: 'São Luís', slug: 'advogado-em-sao-luis', estado: 'MA', regiao: 'Maranhão', porte: 'grande', economia: 'Comércio, Serviços, Indústria e Portuária', populacao: '1.100.000' },
  { nome: 'Imperatriz', slug: 'advogado-em-imperatriz', estado: 'MA', regiao: 'Sul Maranhense', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '260.000' },
  { nome: 'Timon', slug: 'advogado-em-timon', estado: 'MA', regiao: 'Sul Maranhense', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '160.000' },
  { nome: 'Caxias', slug: 'advogado-em-caxias', estado: 'MA', regiao: 'Leste Maranhense', porte: 'media', economia: 'Agricultura, Pecuária e Comércio', populacao: '160.000' },
  { nome: 'Bacabal', slug: 'advogado-em-bacabal', estado: 'MA', regiao: 'Centro Maranhense', porte: 'media', economia: 'Agricultura, Comércio e Serviços', populacao: '105.000' },
  { nome: 'Codó', slug: 'advogado-em-codo', estado: 'MA', regiao: 'Centro Maranhense', porte: 'pequena', economia: 'Agricultura, Pecuária e Comércio', populacao: '45.000' },
  { nome: 'Paco do Lumiar', slug: 'advogado-em-paco-do-lumiar', estado: 'MA', regiao: 'Região Metropolitana de São Luís', porte: 'media', economia: 'Comércio, Serviços e Agricultura', populacao: '120.000' },
  { nome: 'Cuiabá', slug: 'advogado-em-cuiaba', estado: 'MT', regiao: 'Mato Grosso', porte: 'grande', economia: 'Comércio, Serviços, Indústria e Agronegócio', populacao: '620.000' },
  { nome: 'Várzea Grande', slug: 'advogado-em-varzea-grande', estado: 'MT', regiao: 'Região Metropolitana de Cuiabá', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '290.000' },
  { nome: 'Rondonópolis', slug: 'advogado-em-rondonopolis', estado: 'MT', regiao: 'Sul Mato-Grossense', porte: 'media', economia: 'Agronegócio, Comércio e Indústria', populacao: '240.000' },
  { nome: 'Sinop', slug: 'advogado-em-sinop', estado: 'MT', regiao: 'Norte Mato-Grossense', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '140.000' },
  { nome: 'Sorriso', slug: 'advogado-em-sorriso', estado: 'MT', regiao: 'Norte Mato-Grossense', porte: 'media', economia: 'Agronegócio, Armazenagem e Comércio', populacao: '100.000' },
  { nome: 'Primavera do Leste', slug: 'advogado-em-primavera-do-leste', estado: 'MT', regiao: 'Leste Mato-Grossense', porte: 'media', economia: 'Agronegócio, Mineração e Comércio', populacao: '110.000' },
  { nome: 'Tangará da Serra', slug: 'advogado-em-tangara-da-serra', estado: 'MT', regiao: 'Centro-Sul Mato-Grossense', porte: 'media', economia: 'Agricultura, Indústria e Comércio', populacao: '110.000' },
  { nome: 'Cáceres', slug: 'advogado-em-caceres', estado: 'MT', regiao: 'Oeste Mato-Grossense', porte: 'media', economia: 'Comércio, Pecuária e Serviços', populacao: '95.000' },
  { nome: 'Campo Grande', slug: 'advogado-em-campo-grande', estado: 'MS', regiao: 'Mato Grosso do Sul', porte: 'grande', economia: 'Comércio, Serviços, Indústria e Agronegócio', populacao: '900.000' },
  { nome: 'Dourados', slug: 'advogado-em-dourados', estado: 'MS', regiao: 'Sul Mato-Grossense', porte: 'media', economia: 'Agronegócio, Indústria e Comércio', populacao: '225.000' },
  { nome: 'Três Lagoas', slug: 'advogado-em-tres-lagoas', estado: 'MS', regiao: 'Leste Mato-Grossense', porte: 'media', economia: 'Indústria Celulose, Comércio e Serviços', populacao: '120.000' },
  { nome: 'Corumbá', slug: 'advogado-em-corumba', estado: 'MS', regiao: 'Oeste Mato-Grossense', porte: 'media', economia: 'Pecuária, Mineração e Comércio', populacao: '115.000' },
  { nome: 'Ponta Porã', slug: 'advogado-em-ponta-pora', estado: 'MS', regiao: 'Fronteira com o Paraguai', porte: 'media', economia: 'Comércio Fronteiriço, Agropecuária e Serviços', populacao: '95.000' },
  { nome: 'Naviraí', slug: 'advogado-em-navirai', estado: 'MS', regiao: 'Sul Mato-Grossense', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '55.000' },
  { nome: 'Belo Horizonte', slug: 'advogado-em-belo-horizonte', estado: 'MG', regiao: 'Minas Gerais', porte: 'grande', economia: 'Comércio, Serviços, Indústria e Tecnologia', populacao: '2.500.000' },
  { nome: 'Uberlândia', slug: 'advogado-em-uberlandia', estado: 'MG', regiao: 'Triângulo Mineiro', porte: 'grande', economia: 'Comércio, Serviços e Agronegócio', populacao: '700.000' },
  { nome: 'Contagem', slug: 'advogado-em-contagem', estado: 'MG', regiao: 'Região Metropolitana de BH', porte: 'grande', economia: 'Indústria Automobilística, Comércio e Serviços', populacao: '670.000' },
  { nome: 'Juiz de Fora', slug: 'advogado-em-juiz-de-fora', estado: 'MG', regiao: 'Zona da Mata', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '570.000' },
  { nome: 'Betim', slug: 'advogado-em-betim', estado: 'MG', regiao: 'Região Metropolitana de BH', porte: 'grande', economia: 'Indústria Automobilística (FIAT), Comércio e Serviços', populacao: '440.000' },
  { nome: 'Montes Claros', slug: 'advogado-em-montes-claros', estado: 'MG', regiao: 'Norte de Minas', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '420.000' },
  { nome: 'Ribeirão das Neves', slug: 'advogado-em-ribeirao-das-neves', estado: 'MG', regiao: 'Região Metropolitana de BH', porte: 'grande', economia: 'Comércio, Serviços e Indústria', populacao: '340.000' },
  { nome: 'Uberaba', slug: 'advogado-em-uberaba', estado: 'MG', regiao: 'Triângulo Mineiro', porte: 'media', economia: 'Agropecuária, Indústria e Comércio', populacao: '340.000' },
  { nome: 'Governador Valadares', slug: 'advogado-em-governador-valadares', estado: 'MG', regiao: 'Leste de Minas', porte: 'media', economia: 'Mineração, Comércio e Serviços', populacao: '280.000' },
  { nome: 'Ipatinga', slug: 'advogado-em-ipatinga', estado: 'MG', regiao: 'Vale do Aço', porte: 'media', economia: 'Indústria Siderúrgica (USIMINAS), Comércio e Serviços', populacao: '260.000' },
  { nome: 'Sete Lagoas', slug: 'advogado-em-sete-lagoas', estado: 'MG', regiao: 'Centro-Norte de Minas', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '240.000' },
  { nome: 'Divinópolis', slug: 'advogado-em-divinopolis', estado: 'MG', regiao: 'Centro-Oeste de Minas', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '230.000' },
  { nome: 'Poços de Caldas', slug: 'advogado-em-pocos-de-caldas', estado: 'MG', regiao: 'Sul de Minas', porte: 'media', economia: 'Indústria, Turismo Termal e Comércio', populacao: '180.000' },
  { nome: 'Lavras', slug: 'advogado-em-lavras', estado: 'MG', regiao: 'Sul de Minas', porte: 'media', economia: 'Agricultura, Indústria e Comércio', populacao: '105.000' },
  { nome: 'Varginha', slug: 'advogado-em-varginha', estado: 'MG', regiao: 'Sul de Minas', porte: 'media', economia: 'Indústria Automobilística (Troller), Comércio e Serviços', populacao: '140.000' },
  { nome: 'Patos de Minas', slug: 'advogado-em-patos-de-minas', estado: 'MG', regiao: 'Noroeste de Minas', porte: 'media', economia: 'Agronegócio, Indústria e Comércio', populacao: '150.000' },
  { nome: 'Barbacena', slug: 'advogado-em-barbacena', estado: 'MG', regiao: 'Zona da Mata', porte: 'media', economia: 'Mineração, Agricultura e Comércio', populacao: '130.000' },
  { nome: 'Passos', slug: 'advogado-em-passos', estado: 'MG', regiao: 'Sul de Minas', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '140.000' },
  { nome: 'Santa Luzia', slug: 'advogado-em-santa-luzia', estado: 'MG', regiao: 'Região Metropolitana de BH', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '220.000' },
  { nome: 'Belém', slug: 'advogado-em-belem', estado: 'PA', regiao: 'Pará', porte: 'grande', economia: 'Comércio, Serviços, Portuária e Indústria', populacao: '1.500.000' },
  { nome: 'Ananindeua', slug: 'advogado-em-ananindeua', estado: 'PA', regiao: 'Região Metropolitana de Belém', porte: 'grande', economia: 'Comércio, Serviços e Indústria', populacao: '540.000' },
  { nome: 'Santarém', slug: 'advogado-em-santarem', estado: 'PA', regiao: 'Médio Amazonas', porte: 'media', economia: 'Agronegócio, Comércio e Transporte Fluvial', populacao: '310.000' },
  { nome: 'Marabá', slug: 'advogado-em-maraba', estado: 'PA', regiao: 'Sudeste do Pará', porte: 'media', economia: 'Mineração, Agronegócio e Comércio', populacao: '290.000' },
  { nome: 'Castanhal', slug: 'advogado-em-castanhal', estado: 'PA', regiao: 'Nordeste do Pará', porte: 'media', economia: 'Agricultura, Comércio e Serviços', populacao: '200.000' },
  { nome: 'Parauapebas', slug: 'advogado-em-parauapebas', estado: 'PA', regiao: 'Sudeste do Pará', porte: 'media', economia: 'Mineração (Carajás), Comércio e Serviços', populacao: '210.000' },
  { nome: 'Abaetetuba', slug: 'advogado-em-abaetetuba', estado: 'PA', regiao: 'Baixo Tocantins', porte: 'media', economia: 'Agricultura, Pesca e Comércio', populacao: '150.000' },
  { nome: 'João Pessoa', slug: 'advogado-em-joao-pessoa', estado: 'PB', regiao: 'Paraíba', porte: 'grande', economia: 'Comércio, Serviços, Indústria e Turismo', populacao: '830.000' },
  { nome: 'Campina Grande', slug: 'advogado-em-campina-grande', estado: 'PB', regiao: 'Agreste Paraibano', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '410.000' },
  { nome: 'Santa Rita', slug: 'advogado-em-santa-rita', estado: 'PB', regiao: 'Região Metropolitana de João Pessoa', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '130.000' },
  { nome: 'Patos', slug: 'advogado-em-patos', estado: 'PB', regiao: 'Sertão Paraibano', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '110.000' },
  { nome: 'Bayeux', slug: 'advogado-em-bayeux', estado: 'PB', regiao: 'Região Metropolitana de João Pessoa', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '60.000' },
  { nome: 'Curitiba', slug: 'advogado-em-curitiba', estado: 'PR', regiao: 'Paraná', porte: 'grande', economia: 'Comércio, Serviços, Indústria e Tecnologia', populacao: '1.900.000' },
  { nome: 'Londrina', slug: 'advogado-em-londrina', estado: 'PR', regiao: 'Norte Paranaense', porte: 'grande', economia: 'Agronegócio, Indústria e Comércio', populacao: '580.000' },
  { nome: 'Maringá', slug: 'advogado-em-maringa', estado: 'PR', regiao: 'Norte Paranaense', porte: 'grande', economia: 'Agronegócio, Indústria e Comércio', populacao: '440.000' },
  { nome: 'Ponta Grossa', slug: 'advogado-em-ponta-grossa', estado: 'PR', regiao: 'Centro-Sul Paranaense', porte: 'grande', economia: 'Indústria, Agronegócio e Comércio', populacao: '360.000' },
  { nome: 'Cascavel', slug: 'advogado-em-cascavel', estado: 'PR', regiao: 'Oeste Paranaense', porte: 'media', economia: 'Agronegócio, Indústria e Comércio', populacao: '330.000' },
  { nome: 'São José dos Pinhais', slug: 'advogado-em-sao-jose-dos-pinhais', estado: 'PR', regiao: 'Região Metropolitana de Curitiba', porte: 'grande', economia: 'Indústria Automobilística (Renault/Audi), Comércio e Serviços', populacao: '350.000' },
  { nome: 'Foz do Iguaçu', slug: 'advogado-em-foz-do-iguacu', estado: 'PR', regiao: 'Oeste Paranaense', porte: 'media', economia: 'Turismo (Cataratas), Comércio e Serviços', populacao: '260.000' },
  { nome: 'Colombo', slug: 'advogado-em-colombo', estado: 'PR', regiao: 'Região Metropolitana de Curitiba', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '230.000' },
  { nome: 'Guarapuava', slug: 'advogado-em-guarapuava', estado: 'PR', regiao: 'Centro-Sul Paranaense', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '180.000' },
  { nome: 'Paranaguá', slug: 'advogado-em-paranagua', estado: 'PR', regiao: 'Litoral Paranaense', porte: 'media', economia: 'Portuária, Turismo e Comércio', populacao: '150.000' },
  { nome: 'Araucária', slug: 'advogado-em-araucaria', estado: 'PR', regiao: 'Região Metropolitana de Curitiba', porte: 'media', economia: 'Indústria Petroquímica (Petrobras), Comércio e Serviços', populacao: '140.000' },
  { nome: 'Toledo', slug: 'advogado-em-toledo', estado: 'PR', regiao: 'Oeste Paranaense', porte: 'media', economia: 'Agronegócio, Indústria e Comércio', populacao: '140.000' },
  { nome: 'Apucarana', slug: 'advogado-em-apucarana', estado: 'PR', regiao: 'Norte Paranaense', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '130.000' },
  { nome: 'Recife', slug: 'advogado-em-recife', estado: 'PE', regiao: 'Pernambuco', porte: 'grande', economia: 'Comércio, Serviços, Indústria e Tecnologia', populacao: '1.600.000' },
  { nome: 'Jaboatão dos Guararapes', slug: 'advogado-em-jaboatão-dos-guararapes', estado: 'PE', regiao: 'Região Metropolitana de Recife', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '700.000' },
  { nome: 'Olinda', slug: 'advogado-em-olinda', estado: 'PE', regiao: 'Região Metropolitana de Recife', porte: 'media', economia: 'Turismo, Comércio e Serviços', populacao: '390.000' },
  { nome: 'Caruaru', slug: 'advogado-em-caruaru', estado: 'PE', regiao: 'Agreste Pernambucano', porte: 'media', economia: 'Indústria, Comércio e Agropecuária', populacao: '360.000' },
  { nome: 'Petrolina', slug: 'advogado-em-petrolina', estado: 'PE', regiao: 'Vale do São Francisco', porte: 'media', economia: 'Agronegócio Irrigado, Comércio e Serviços', populacao: '350.000' },
  { nome: 'Paulista', slug: 'advogado-em-paulista', estado: 'PE', regiao: 'Região Metropolitana de Recife', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '340.000' },
  { nome: 'Cabo de Santo Agostinho', slug: 'advogado-em-cabo-de-santo-agostinho', estado: 'PE', regiao: 'Região Metropolitana de Recife', porte: 'media', economia: 'Indústria Portuária, Comércio e Serviços', populacao: '200.000' },
  { nome: 'Garanhuns', slug: 'advogado-em-garanhuns', estado: 'PE', regiao: 'Agreste Pernambucano', porte: 'media', economia: 'Agricultura, Comércio e Serviços', populacao: '140.000' },
  { nome: 'Vitória de Santo Antão', slug: 'advogado-em-vitoria-de-santo-antao', estado: 'PE', regiao: 'Zona da Mata Norte', porte: 'media', economia: 'Agricultura, Comércio e Serviços', populacao: '140.000' },
  { nome: 'Teresina', slug: 'advogado-em-teresina', estado: 'PI', regiao: 'Piauí', porte: 'grande', economia: 'Comércio, Serviços, Indústria e Administração Pública', populacao: '870.000' },
  { nome: 'Parnaíba', slug: 'advogado-em-parnaiba', estado: 'PI', regiao: 'Litoral Oeste do Piauí', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '150.000' },
  { nome: 'Picos', slug: 'advogado-em-picos', estado: 'PI', regiao: 'Sul Piauiense', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '80.000' },
  { nome: 'Floriano', slug: 'advogado-em-floriano', estado: 'PI', regiao: 'Médio Parnaíba', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '60.000' },
  { nome: 'Rio de Janeiro', slug: 'advogado-em-rio-de-janeiro', estado: 'RJ', regiao: 'Rio de Janeiro', porte: 'grande', economia: 'Petróleo, Turismo, Indústria, Comércio e Serviços', populacao: '6.700.000' },
  { nome: 'São Gonçalo', slug: 'advogado-em-sao-goncalo', estado: 'RJ', regiao: 'Região Metropolitana do RJ', porte: 'grande', economia: 'Comércio, Serviços e Indústria', populacao: '1.100.000' },
  { nome: 'Duque de Caxias', slug: 'advogado-em-duque-de-caxias', estado: 'RJ', regiao: 'Região Metropolitana do RJ', porte: 'grande', economia: 'Indústria Petroquímica, Comércio e Serviços', populacao: '920.000' },
  { nome: 'Nova Iguaçu', slug: 'advogado-em-nova-iguacu', estado: 'RJ', regiao: 'Baixada Fluminense', porte: 'grande', economia: 'Comércio, Serviços e Indústria', populacao: '820.000' },
  { nome: 'Niterói', slug: 'advogado-em-niteroi', estado: 'RJ', regiao: 'Baía de Guanabara', porte: 'grande', economia: 'Indústria Naval, Comércio e Serviços', populacao: '520.000' },
  { nome: 'Campos dos Goytacazes', slug: 'advogado-em-campos-dos-goytacazes', estado: 'RJ', regiao: 'Norte Fluminense', porte: 'media', economia: 'Petróleo, Agricultura e Comércio', populacao: '500.000' },
  { nome: 'Belford Roxo', slug: 'advogado-em-belford-roxo', estado: 'RJ', regiao: 'Baixada Fluminense', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '500.000' },
  { nome: 'São João de Meriti', slug: 'advogado-em-sao-joao-de-meriti', estado: 'RJ', regiao: 'Baixada Fluminense', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '460.000' },
  { nome: 'Petrópolis', slug: 'advogado-em-petropolis', estado: 'RJ', regiao: 'Serrana', porte: 'media', economia: 'Turismo, Indústria e Comércio', populacao: '310.000' },
  { nome: 'Volta Redonda', slug: 'advogado-em-volta-redonda', estado: 'RJ', regiao: 'Vale do Paraíba', porte: 'media', economia: 'Indústria Siderúrgica (CSN), Comércio e Serviços', populacao: '270.000' },
  { nome: 'Macae', slug: 'advogado-em-macae', estado: 'RJ', regiao: 'Litoral Norte Fluminense', porte: 'media', economia: 'Petróleo e Gás, Comércio e Serviços', populacao: '260.000' },
  { nome: 'Angra dos Reis', slug: 'advogado-em-angra-dos-reis', estado: 'RJ', regiao: 'Costa Verde', porte: 'media', economia: 'Turismo, Petróleo e Comércio', populacao: '210.000' },
  { nome: 'Cabo Frio', slug: 'advogado-em-cabo-frio', estado: 'RJ', regiao: 'Litoral Sul Fluminense', porte: 'media', economia: 'Turismo, Comércio e Serviços', populacao: '230.000' },
  { nome: 'Natal', slug: 'advogado-em-natal', estado: 'RN', regiao: 'Rio Grande do Norte', porte: 'grande', economia: 'Comércio, Serviços, Turismo e Indústria', populacao: '900.000' },
  { nome: 'Mossoró', slug: 'advogado-em-mossoro', estado: 'RN', regiao: 'Oeste Potiguar', porte: 'media', economia: 'Petróleo, Agronegócio e Comércio', populacao: '300.000' },
  { nome: 'Parnamirim', slug: 'advogado-em-parnamirim', estado: 'RN', regiao: 'Região Metropolitana de Natal', porte: 'media', economia: 'Comércio, Serviços e Tecnologia', populacao: '270.000' },
  { nome: 'São Gonçalo do Amarante', slug: 'advogado-em-sao-goncalo-do-amarante', estado: 'RN', regiao: 'Região Metropolitana de Natal', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '95.000' },
  { nome: 'Macaíba', slug: 'advogado-em-macaiba', estado: 'RN', regiao: 'Agreste Potiguar', porte: 'media', economia: 'Agricultura, Comércio e Serviços', populacao: '85.000' },
  { nome: 'Porto Velho', slug: 'advogado-em-porto-velho', estado: 'RO', regiao: 'Rondônia', porte: 'grande', economia: 'Comércio, Serviços, Indústria e Mineração', populacao: '540.000' },
  { nome: 'Ji-Paraná', slug: 'advogado-em-ji-parana', estado: 'RO', regiao: 'Leste Rondoniense', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '130.000' },
  { nome: 'Ariquemes', slug: 'advogado-em-ariquemes', estado: 'RO', regiao: 'Norte de Rondônia', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '110.000' },
  { nome: 'Vilhena', slug: 'advogado-em-vilhena', estado: 'RO', regiao: 'Sul de Rondônia', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '100.000' },
  { nome: 'Cacoal', slug: 'advogado-em-cacoal', estado: 'RO', regiao: 'Leste Rondoniense', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '85.000' },
  { nome: 'Boa Vista', slug: 'advogado-em-boa-vista', estado: 'RR', regiao: 'Roraima', porte: 'grande', economia: 'Comércio, Serviços, Mineração e Administração Pública', populacao: '420.000' },
  { nome: 'Rorainópolis', slug: 'advogado-em-rorainopolis', estado: 'RR', regiao: 'Norte de Roraima', porte: 'pequena', economia: 'Mineração, Agricultura e Comércio', populacao: '30.000' },
  { nome: 'Caracaraí', slug: 'advogado-em-caracarai', estado: 'RR', regiao: 'Interior de Roraima', porte: 'pequena', economia: 'Agricultura, Pecuária e Comércio', populacao: '22.000' },
  { nome: 'Porto Alegre', slug: 'advogado-em-porto-alegre', estado: 'RS', regiao: 'Rio Grande do Sul', porte: 'grande', economia: 'Comércio, Serviços, Indústria e Tecnologia', populacao: '1.500.000' },
  { nome: 'Caxias do Sul', slug: 'advogado-em-caxias-do-sul', estado: 'RS', regiao: 'Serra Gaúcha', porte: 'grande', economia: 'Indústria, Vinicultura e Comércio', populacao: '520.000' },
  { nome: 'Canoas', slug: 'advogado-em-canoas', estado: 'RS', regiao: 'Região Metropolitana de POA', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '350.000' },
  { nome: 'Pelotas', slug: 'advogado-em-pelotas', estado: 'RS', regiao: 'Sul Gaúcho', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '340.000' },
  { nome: 'Santa Maria', slug: 'advogado-em-santa-maria', estado: 'RS', regiao: 'Centro-Oeste Gaúcho', porte: 'grande', economia: 'Agronegócio, Comércio e Serviços', populacao: '290.000' },
  { nome: 'Gravataí', slug: 'advogado-em-gravatai', estado: 'RS', regiao: 'Região Metropolitana de POA', porte: 'media', economia: 'Indústria Automobilística (GM), Comércio e Serviços', populacao: '290.000' },
  { nome: 'Viamão', slug: 'advogado-em-viamao', estado: 'RS', regiao: 'Região Metropolitana de POA', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '250.000' },
  { nome: 'Novo Hamburgo', slug: 'advogado-em-novo-hamburgo', estado: 'RS', regiao: 'Vale dos Sinos', porte: 'media', economia: 'Indústria Calçadista, Comércio e Serviços', populacao: '270.000' },
  { nome: 'São Leopoldo', slug: 'advogado-em-sao-leopoldo', estado: 'RS', regiao: 'Vale dos Sinos', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '230.000' },
  { nome: 'Rio Grande', slug: 'advogado-em-rio-grande', estado: 'RS', regiao: 'Extremo Sul Gaúcho', porte: 'media', economia: 'Portuária, Petróleo e Comércio', populacao: '210.000' },
  { nome: 'Passo Fundo', slug: 'advogado-em-passo-fundo', estado: 'RS', regiao: 'Norte Gaúcho', porte: 'media', economia: 'Agronegócio, Indústria e Comércio', populacao: '200.000' },
  { nome: 'Sapucaia do Sul', slug: 'advogado-em-sapucaia-do-sul', estado: 'RS', regiao: 'Vale dos Sinos', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '140.000' },
  { nome: 'Bento Gonçalves', slug: 'advogado-em-bento-goncalves', estado: 'RS', regiao: 'Serra Gaúcha', porte: 'media', economia: 'Vinicultura, Indústria e Comércio', populacao: '120.000' },
  { nome: 'Erechim', slug: 'advogado-em-erechim', estado: 'RS', regiao: 'Norte Gaúcho', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '110.000' },
  { nome: 'Lajeado', slug: 'advogado-em-lajeado', estado: 'RS', regiao: 'Vale do Taquari', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '95.000' },
  { nome: 'Aracaju', slug: 'advogado-em-aracaju', estado: 'SE', regiao: 'Sergipe', porte: 'grande', economia: 'Comércio, Serviços, Indústria e Turismo', populacao: '660.000' },
  { nome: 'Nossa Senhora do Socorro', slug: 'advogado-em-nossa-senhora-do-socorro', estado: 'SE', regiao: 'Região Metropolitana de Aracaju', porte: 'media', economia: 'Comércio, Serviços e Indústria', populacao: '200.000' },
  { nome: 'Lagarto', slug: 'advogado-em-lagarto', estado: 'SE', regiao: 'Agreste Sergipano', porte: 'media', economia: 'Agricultura, Comércio e Serviços', populacao: '110.000' },
  { nome: 'Itabaiana', slug: 'advogado-em-itabaiana', estado: 'SE', regiao: 'Agreste Sergipano', porte: 'media', economia: 'Comércio, Serviços e Agropecuária', populacao: '95.000' },
  { nome: 'São Paulo', slug: 'advogado-em-sao-paulo', estado: 'SP', regiao: 'São Paulo', porte: 'grande', economia: 'Comércio, Serviços, Indústria, Tecnologia e Finanças', populacao: '12.300.000' },
  { nome: 'Guarulhos', slug: 'advogado-em-guarulhos', estado: 'SP', regiao: 'Grande São Paulo', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '1.400.000' },
  { nome: 'Campinas', slug: 'advogado-em-campinas', estado: 'SP', regiao: 'Centro-Oeste Paulista', porte: 'grande', economia: 'Tecnologia, Indústria e Comércio', populacao: '1.200.000' },
  { nome: 'São Bernardo do Campo', slug: 'advogado-em-sao-bernardo-do-campo', estado: 'SP', regiao: 'Grande São Paulo', porte: 'grande', economia: 'Indústria Automobilística, Comércio e Serviços', populacao: '840.000' },
  { nome: 'Santo André', slug: 'advogado-em-santo-andre', estado: 'SP', regiao: 'ABC Paulista', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '720.000' },
  { nome: 'São José dos Campos', slug: 'advogado-em-sao-jose-dos-campos', estado: 'SP', regiao: 'Vale do Paraíba', porte: 'grande', economia: 'Tecnologia (EMBRAER), Indústria e Comércio', populacao: '730.000' },
  { nome: 'Osasco', slug: 'advogado-em-osasco', estado: 'SP', regiao: 'Grande São Paulo', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '690.000' },
  { nome: 'Sorocaba', slug: 'advogado-em-sorocaba', estado: 'SP', regiao: 'Centro-Oeste Paulista', porte: 'grande', economia: 'Indústria, Comércio e Serviços', populacao: '690.000' },
  { nome: 'Ribeirão Preto', slug: 'advogado-em-ribeirao-preto', estado: 'SP', regiao: 'Norte Paulista', porte: 'grande', economia: 'Agronegócio, Indústria e Comércio', populacao: '720.000' },
  { nome: 'São José do Rio Preto', slug: 'advogado-em-sao-jose-do-rio-preto', estado: 'SP', regiao: 'Norte Paulista', porte: 'grande', economia: 'Agronegócio, Indústria e Comércio', populacao: '460.000' },
  { nome: 'Bauru', slug: 'advogado-em-bauru', estado: 'SP', regiao: 'Centro-Oeste Paulista', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '380.000' },
  { nome: 'Jundiaí', slug: 'advogado-em-jundiai', estado: 'SP', regiao: 'Centro-Norte Paulista', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '430.000' },
  { nome: 'Piracicaba', slug: 'advogado-em-piracicaba', estado: 'SP', regiao: 'Centro-Oeste Paulista', porte: 'media', economia: 'Agronegócio, Indústria e Comércio', populacao: '410.000' },
  { nome: 'Franca', slug: 'advogado-em-franca', estado: 'SP', regiao: 'Norte Paulista', porte: 'media', economia: 'Indústria Calçadista, Comércio e Serviços', populacao: '340.000' },
  { nome: 'Marília', slug: 'advogado-em-marilia', estado: 'SP', regiao: 'Centro-Oeste Paulista', porte: 'media', economia: 'Agronegócio, Indústria e Comércio', populacao: '240.000' },
  { nome: 'Presidente Prudente', slug: 'advogado-em-presidente-prudente', estado: 'SP', regiao: 'Oeste Paulista', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '230.000' },
  { nome: 'Araraquara', slug: 'advogado-em-araraquara', estado: 'SP', regiao: 'Centro-Norte Paulista', porte: 'media', economia: 'Indústria, Agronegócio e Comércio', populacao: '240.000' },
  { nome: 'Taubaté', slug: 'advogado-em-taubate', estado: 'SP', regiao: 'Vale do Paraíba', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '310.000' },
  { nome: 'Votorantim', slug: 'advogado-em-votorantim', estado: 'SP', regiao: 'Centro-Oeste Paulista', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '130.000' },
  { nome: 'Mauá', slug: 'advogado-em-maua', estado: 'SP', regiao: 'Grande São Paulo', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '460.000' },
  { nome: 'Diadema', slug: 'advogado-em-diadema', estado: 'SP', regiao: 'Grande São Paulo', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '410.000' },
  { nome: 'Carapicuíba', slug: 'advogado-em-carapicuiba', estado: 'SP', regiao: 'Grande São Paulo', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '400.000' },
  { nome: 'Cotia', slug: 'advogado-em-cotia', estado: 'SP', regiao: 'Grande São Paulo', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '230.000' },
  { nome: 'Embu das Artes', slug: 'advogado-em-embu-das-artes', estado: 'SP', regiao: 'Grande São Paulo', porte: 'media', economia: 'Artesanato, Comércio e Serviços', populacao: '270.000' },
  { nome: 'Palmas', slug: 'advogado-em-palmas', estado: 'TO', regiao: 'Tocantins', porte: 'grande', economia: 'Comércio, Serviços, Indústria e Administração Pública', populacao: '310.000' },
  { nome: 'Araguaína', slug: 'advogado-em-araguaina', estado: 'TO', regiao: 'Norte Tocantinense', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '180.000' },
  { nome: 'Gurupi', slug: 'advogado-em-gurupi', estado: 'TO', regiao: 'Sul Tocantinense', porte: 'media', economia: 'Agronegócio, Comércio e Serviços', populacao: '90.000' },
  { nome: 'Porto Nacional', slug: 'advogado-em-porto-nacional', estado: 'TO', regiao: 'Centro Tocantinense', porte: 'media', economia: 'Mineração, Comércio e Serviços', populacao: '55.000' },
]

export function getCidadeExtraBySlug(slug: string): CidadeExtra | undefined {
  return cidadesExtras.find(c => c.slug === slug)
}

export function getCidadesExtrasByEstado(estado: string): CidadeExtra[] {
  return cidadesExtras.filter(c => c.estado === estado)
}
