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
  'Grande Florianópolis': ['Águas Mornas', 'Antônio Carlos', 'Biguaçu', 'Florianópolis', 'Governador Celso Ramos', 'Palhoça', 'Santo Amaro da Imperatriz', 'São Bonifácio', 'São José', 'São Pedro de Alcântara', 'Angelina', 'Botuverá', 'Itacorubi', 'Major Gercino', 'Rancho Queimado', 'São João Batista'],
  'Sul Catarinense': ['Araranguá', 'Armazém', 'Balneário Arroio do Silva', 'Balneário Gaivota', 'Balneário Rincão', 'Braço do Norte', 'Capivari de Baixo', 'Criciúma', 'Ermo', 'Forquilhinha', 'Garopaba', 'Grão Pará', 'Içara', 'Imaruí', 'Imbituba', 'Jacinto Machado', 'Laguna', 'Lauro Müller', 'Maracajá', 'Meleiro', 'Morro Grande', 'Nova Veneza', 'Paulo Lopes', 'Passo de Torres', 'Pedras Grandes', 'Pescaria Brava', 'Praia Grande', 'Rio Fortuna', 'Santa Rosa do Sul', 'São João do Sul', 'São Ludgero', 'São Martinho', 'Sangão', 'Sombrio', 'Timbé do Sul', 'Treze de Maio', 'Tubarão', 'Turvo', 'Cocal do Sul', 'Itapirubá', 'Morro da Fumaça', 'Orleans', 'Siderópolis'],
  'Norte Catarinense': ['Araquari', 'Balneário Barra do Sul', 'Bela Vista do Toldo', 'Campo Alegre', 'Canoinhas', 'Corupá', 'Garuva', 'Guaramirim', 'Irineópolis', 'Itaiópolis', 'Itapoá', 'Jaraguá do Sul', 'Joinville', 'Mafra', 'Major Vieira', 'Massaranduba', 'Monte Castelo', 'Papanduva', 'Porto União', 'Rio Negrinho', 'São Bento do Sul', 'São Francisco do Sul', 'Schroeder', 'Três Barras', 'Itapocu', 'Itapoúma', 'Itapuíma', 'Manhumirim', 'Pangaré', 'Paula Freitas', 'Piratuba', 'Vacari'],
  'Vale do Itajaí': ['Agrolândia', 'Agronômica', 'Apiúna', 'Ascurra', 'Atalanta', 'Aurora', 'Balneário Camboriú', 'Balneário Piçarras', 'Barra Velha', 'Benedito Novo', 'Blumenau', 'Bombinhas', 'Braço do Trombudo', 'Brusque', 'Camboriú', 'Chapadão do Lageado', 'Dona Emma', 'Doutor Pedrinho', 'Gaspar', 'Guabiruba', 'Ibirama', 'Ilhota', 'Imbuia', 'Indaial', 'Itajaí', 'Itapema', 'Ituporanga', 'José Boiteux', 'Laurentino', 'Lontras', 'Luiz Alves', 'Mirim Doce', 'Navegantes', 'Penha', 'Petrolândia', 'Pomerode', 'Porto Belo', 'Pouso Redondo', 'Presidente Getúlio', 'Presidente Nereu', 'Rio do Campo', 'Rio do Oeste', 'Rio do Sul', 'Rio dos Cedros', 'Rodeio', 'Salete', 'Taió', 'Timbó', 'Trombudo Central', 'Vidal Ramos', 'Vitor Meireles', 'Witmarsum', 'Canela'],
  'Oeste Catarinense': ['Abelardo Luz', 'Água Doce', 'Águas de Chapecó', 'Águas Frias', 'Alto Bela Vista', 'Anchieta', 'Arabutã', 'Arroio Trinta', 'Arvoredo', 'Bandeirante', 'Barra Bonita', 'Belmonte', 'Bom Jesus do Oeste', 'Caibi', 'Calmon', 'Campo Erê', 'Caxambu do Sul', 'Chapecó', 'Cordilheira Alta', 'Coronel Freitas', 'Coronel Martins', 'Cunha Porã', 'Cunhataí', 'Descanso', 'Dionísio Cerqueira', 'Entre Rios', 'Faxinal dos Guedes', 'Flor do Sertão', 'Formosa do Sul', 'Galvão', 'Guaraciaba', 'Guarujá do Sul', 'Guatambú', 'Herval d\'Oeste', 'Ibiam', 'Ibicaré', 'Iomerê', 'Ipira', 'Iporã do Oeste', 'Ipuaçu', 'Ipumirim', 'Iraceminha', 'Irani', 'Irati', 'São Miguel do Oeste', 'Saudades', 'Seara', 'Serra Alta', 'Sul Brasil', 'Tigrinhos', 'Treze Tílias', 'Tunápolis', 'Vargeão', 'Vargem Bonita', 'Xanxerê', 'Xavantina', 'Xaxim', 'Zortéa', 'Itá', 'Jaborá', 'Jardinópolis', 'Joaçaba', 'Lacerdópolis', 'Lajeado Grande', 'Luzerna', 'Marema', 'Modelo', 'Mondaí', 'Nova Erechim', 'Nova Itaberaba', 'Novo Horizonte', 'Ouro', 'Ouro Verde', 'Paial', 'Palma Sola', 'Palmitos', 'Passos Maia', 'Peritiba', 'Pinhalzinho', 'Planalto Alegre', 'Ponte Serrada', 'Princesa', 'Quilombo', 'Riqueza', 'Romelândia', 'Santa Helena', 'Santa Terezinha do Progresso', 'Santiago do Sul', 'São Bernardino', 'São Carlos', 'São Domingos', 'São João do Oeste', 'São José do Cedro', 'São Lourenço do Oeste', 'São Miguel da Boa Vista', 'Itapiranga', 'Jupiá'],
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
