#!/usr/bin/env node
/**
 * Gerador de conteúdo único para páginas de cidades — versão completa
 * Gera 302+ arquivos .ts com conteúdo genuinamente diferente para cada cidade
 *
 * Uso: node scripts/gerar-conteudo-unico.mjs
 */

import { writeFileSync, mkdirSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// ═══════════════════════════════════════════════════════════════
// 1. LER E PARSEAR cidades.ts (TypeScript) → objeto JS puro
// ═══════════════════════════════════════════════════════════════

function parseCidadesTS() {
  const src = readFileSync(join(ROOT, 'src/data/cidades.ts'), 'utf-8')

  // Extrair cidadesDetalhadas — chave: nome, valor: objeto parcial
  const detalhadasMatch = src.match(/const cidadesDetalhadas.*?=\s*\{([\s\S]*?)\}\s*}/)
  const detalhadas = {}
  if (detalhadasMatch) {
    const block = detalhadasMatch[1]
    const entries = block.match(/'([^']+)':\s*\{[^}]+\}/g) || []
    for (const e of entries) {
      const nameMatch = e.match(/'([^']+)'/)
      const nome = nameMatch?.[1]
      if (!nome) continue
      const obj = {}
      const popM = e.match(/populacao:\s*'([^']+)'/)
      const econM = e.match(/economia:\s*'([^']+)'/)
      const portM = e.match(/porte:\s*'([^']+)'/)
      if (popM) obj.populacao = popM[1]
      if (econM) obj.economia = econM[1]
      if (portM) obj.porte = portM[1]
      detalhadas[nome] = obj
    }
  }

  // Extrair cidadesPorRegiao — chave: região, valor: array de nomes
  // Uses bracket-counting to handle escaped quotes (e.g., Herval d\'Oeste)
  const cidadesPorRegiao = {}
  {
    const regStart = src.indexOf('const cidadesPorRegiao')
    const eqIdx = src.indexOf('{', regStart + 20)
    let depth = 0
    let closeIdx = eqIdx
    for (let i = eqIdx; i < src.length; i++) {
      if (src[i] === '{') depth++
      if (src[i] === '}') { depth--; if (depth === 0) { closeIdx = i; break } }
    }
    const block = src.substring(eqIdx, closeIdx)
    let pos = 0
    while (pos < block.length) {
      const rm = block.substring(pos).match(/'([^']+)':\s*\[/)
      if (!rm) break
      const regionName = rm[1]
      const arrStart = pos + rm.index + rm[0].length
      let arrDepth = 1, arrEnd = arrStart
      for (let i = arrStart; i < block.length; i++) {
        if (block[i] === '[') arrDepth++
        if (block[i] === ']') { arrDepth--; if (arrDepth === 0) { arrEnd = i; break } }
      }
      const arrContent = block.substring(arrStart, arrEnd)
      const cities = []
      let np = 0
      while (np < arrContent.length) {
        const qi = arrContent.indexOf("'", np)
        if (qi === -1) break
        let ei = qi + 1
        while (ei < arrContent.length) {
          if (arrContent[ei] === "'" && arrContent[ei-1] !== '\\') break
          ei++
        }
        const name = arrContent.substring(qi + 1, ei)
        if (name) cities.push(name)
        np = ei + 1
      }
      cidadesPorRegiao[regionName] = cities
      pos = arrEnd + 1
    }
  }

  // Extrair capitaisBR
  const capitaisMatch = src.match(/const capitaisBR[^=]*=\s*\[[\s\S]*?\n\]/)
  const capitais = []
  if (capitaisMatch) {
    const entries = capitaisMatch[0].match(/\['[^']+',\s*'[^']+',\s*'[^']+'\]/g) || []
    for (const e of entries) {
      const m = e.match(/\['([^']+)',\s*'([^']+)',\s*'([^']+)'\]/)
      if (m) capitais.push({ nome: m[1], sigla: m[2], estado: m[3] })
    }
  }

  // Montar array completo de cidades (mesmo lógica do TS)
  const economiasPadrao = {
    'Grande Florianópolis': 'Comércio, Serviços, Turismo e Construção Civil',
    'Sul Catarinense': 'Indústria, Comércio, Agricultura e Serviços',
    'Norte Catarinense': 'Indústria, Comércio, Tecnologia e Serviços',
    'Vale do Itajaí': 'Indústria Têxtil, Comércio, Tecnologia e Serviços',
    'Oeste Catarinense': 'Agroindústria, Comércio, Agricultura e Serviços',
    'Serra Catarinense': 'Turismo, Agricultura, Comércio e Serviços',
    'Meio-Oeste': 'Comércio, Agricultura, Indústria e Serviços',
    'Planalto Norte': 'Agricultura, Comércio, Indústria e Serviços',
  }

  const descRegiao = {
    'Grande Florianópolis': 'região metropolitana de Florianópolis',
    'Sul Catarinense': 'região sul do estado de Santa Catarina',
    'Norte Catarinense': 'região norte do estado de Santa Catarina',
    'Vale do Itajaí': 'região do Vale do Itajaí em Santa Catarina',
    'Oeste Catarinense': 'região oeste do estado de Santa Catarina',
    'Serra Catarinense': 'região serrana do estado de Santa Catarina',
    'Meio-Oeste': 'região meio-oeste do estado de Santa Catarina',
    'Planalto Norte': 'região do planalto norte catarinense',
  }

  function slugify(name) {
    return name
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/['']/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  function inferirTipo(nome, porte, regiao, isCapital) {
    if (isCapital) return 'capital'
    if (porte === 'grande') return 'grande-centro'
    if (['Sul Catarinense', 'Vale do Itajaí', 'Norte Catarinense'].includes(regiao) && porte === 'media') return 'industrial'
    if (['Oeste Catarinense'].includes(regiao) && porte === 'media') return 'agroindustrial'
    if (['Serra Catarinense'].includes(regiao)) return 'serrana'
    if (['Grande Florianópolis', 'Litoral'].includes(regiao)) return 'turistica'
    if (porte === 'media') return 'polo-regional'
    return 'cidade-pequena'
  }

  const todas = []

  // SC cities
  for (const [regiao, nomes] of Object.entries(cidadesPorRegiao)) {
    for (const nome of nomes) {
      const d = detalhadas[nome] || {}
      const slug = `advogado-em-${slugify(nome)}`
      const porte = d.porte || 'pequena'
      const economia = d.economia || economiasPadrao[regiao] || 'Comércio e Serviços'
      const populacao = d.populacao || (porte === 'grande' ? 'mais de 200 mil' : porte === 'media' ? 'entre 50 e 200 mil' : 'até 50 mil')
      const tipoLocal = inferirTipo(nome, porte, regiao, false)
      todas.push({
        nome, slug, regiao, estado: 'SC', isCapital: false,
        porte, economia, populacao, tipoLocal,
        descricao: `${nome} está localizada na ${descRegiao[regiao] || regiao}`,
      })
    }
  }

  // Capitais brasileiras
  for (const { nome, sigla, estado } of capitais) {
    todas.push({
      nome, slug: `advogado-em-${slugify(nome)}`, regiao: estado,
      estado: sigla, isCapital: true, porte: 'grande',
      economia: 'Comércio, Serviços, Indústria e Tecnologia',
      populacao: 'capital do estado', tipoLocal: 'capital',
      descricao: `${nome} é a capital do estado do ${estado}`,
    })
  }

  return todas
}

// ═══════════════════════════════════════════════════════════════
// 2. HASH DETERMINÍSTICO + FUNÇÕES AUXILIARES
// ═══════════════════════════════════════════════════════════════

function hashCode(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

function pick(arr, rand) {
  return arr[Math.floor(rand() * arr.length)]
}

function esc(s) {
  return s.replace(/'/g, "\\'").replace(/\n/g, '\\n')
}

// ═══════════════════════════════════════════════════════════════
// 3. TEMPLATES DE CONTEÚDO — MUITAS VARIAÇÕES POR SEÇÃO
// ═══════════════════════════════════════════════════════════════

// --- helpers de frase ---
const introStyles = [
  // pergunta
  (c, r) => `Você sabia que ${c.nome} conta com mais de ${c.populacao} habitantes e uma economia baseada em ${c.economia}? Com essa dinâmica, a necessidade de assessoria jurídica qualificada é constante. A Will & Pereira Advocacia, com escritório em Palhoça/SC, atende moradores de ${c.nome} com excelência e compromisso.`,
  // dado estatístico
  (c, r) => `Com ${c.populacao} habitantes e economia centrada em ${c.economia}, ${c.nome} é uma cidade que demanda serviços jurídicos de qualidade. A Will & Pereira Advocacia oferece atendimento personalizado para moradores de ${c.nome} em todas as áreas do Direito, com mais de 15 anos de experiência.`,
  // declaração direta
  (c, r) => `A Will & Pereira Advocacia é a escolha certa para quem em ${c.nome} busca orientação jurídica de confiança. Nossa equipe multidisciplinar atende moradores de ${c.nome} e região, combinando conhecimento técnico com atendimento humanizado.`,
  // contexto regional
  (c, r) => `Situada na ${r.descricao}, ${c.nome} possui características econômicas e sociais que geram demandas jurídicas específicas. A Will & Pereira Advocacia conhece profundamente essas particularidades e oferece soluções personalizadas para cada caso.`,
  // problema/solução
  (c, r) => `Enfrentar um problema jurídico sem a orientação adequada pode trazer consequências sérias. Em ${c.nome}, moradores e empresas contam com a Will & Pereira Advocacia para resolver questões trabalhistas, familiares, consumeristas e imobiliárias com segurança.`,
  // autoridade
  (c, r) => `Quando se fala em assessoria jurídica de qualidade em ${c.nome}, a Will & Pereira Advocacia se destaca pelo histórico de resultados e pelo compromisso com cada cliente. Atuando em todo o Brasil, nossa equipe está preparada para atender moradores de ${c.nome} com dedicação.`,
  // contextualização econômica
  (c, r) => `A economia de ${c.nome}, baseada em ${c.economia}, gera uma variedade de demandas jurídicas que vão desde questões trabalhistas até litígios imobiliários. A Will & Pereira Advocacia oferece assessoria completa para moradores e empresas da região.`,
  // chamada à ação
  (c, r) => `Se você mora em ${c.nome} e precisa de um advogado comprometido com resultados, a Will & Pereira Advocacia está pronta para ajudar. Com escritório em Palhoça/SC e atendimento em todo o Brasil, oferecemos soluções jurídicas completas.`,
  // enfoque no cidadão
  (c, r) => `Moradores de ${c.nome} que buscam segurança jurídica encontram na Will & Pereira Advocacia o parceiro ideal. Nossa equipe combina experiência de mais de 15 anos com um atendimento próximo e dedicado, atendendo todas as necessidades legais da população local.`,
  // provocação
  (c, r) => `Quantas vezes você precisou de um advogado e não soube a quem recorrer? Em ${c.nome}, a Will & Pereira Advocacia resolve isso com atendimento humanizado e soluções eficazes nas mais diversas áreas do Direito.`,
  // visão geral
  (c, r) => `${c.nome}, com sua economia baseada em ${c.economia} e população de ${c.populacao}, enfrenta desafios jurídicos que requerem profissionais capacitados. A Will & Pereira Advocacia atende moradores de ${c.nome} com expertise e compromisso em cada caso.`,
  // tom pessoal
  (c, r) => `Saber que existe um time de advogados dedicados faz toda a diferença. Em ${c.nome}, moradores e empresas confiam na Will & Pereira Advocacia para orientação jurídica confiável, seja em questões trabalhistas, familiares, cíveis ou imobiliárias.`,
]

// --- intro paragraphs (3-4 parágrafos) ---
function gerarIntroParagraphs(c, r, rand) {
  const paragraphs = []
  const mainIntro = pick(introStyles, rand)(c, r)

  const segundoPar = [
    (c, r) => `Nossa equipe atua em ${c.nome} com foco em resultados, oferecendo assessoria jurídica preventiva e contenciosa. Trabalhamos com pessoas físicas e empresas, garantindo que cada cliente receba a atenção e o cuidado que merece em ${c.nome}.`,
    (c, r) => `Em ${c.nome}, entendemos que cada situação jurídica é única. Por isso, oferecemos um atendimento personalizado, ouvindo cada cliente e construindo estratégias sob medida para alcançar os melhores resultados possíveis na região.`,
    (c, r) => `Com atendimento que vai além da consulta jurídica, buscamos construir relacionamentos de confiança com nossos clientes em ${c.nome}. Transparência, ética e dedicação são os pilares que sustentam nosso trabalho.`,
    (c, r) => `${c.nome} é uma cidade dinâmica, e suas necessidades jurídicas refletem essa realidade. Estamos preparados para atender desde questões simples até demandas complexas, sempre com foco no resultado do nosso cliente.`,
    (c, r) => `A proximidade com Palhoça/SC não impede que atendamos ${c.nome} com excelência. Por videoconferência ou presencialmente, nossa equipe está disponível para oferecer a melhor orientação jurídica possível.`,
    (c, r) => `Nossa experiência demonstra que o planejamento jurídico preventivo evita muitos problemas futuros. Em ${c.nome}, oferecemos assessoria contínua para empresas e famílias que desejam proteger seus interesses.`,
    (c, r) => `O acesso à justiça é um direito de todos. Em ${c.nome}, trabalhamos para democratizar o acesso a serviços jurídicos de qualidade, oferecendo condições acessíveis e atendimento humanizado.`,
    (c, r) => `Com conhecimento aprofundado das leis e da jurisprudência, nossa equipe em ${c.nome} está preparada para enfrentar os desafios jurídicos mais complexos, sempre em busca da melhor solução para cada cliente.`,
    (c, r) => `Cada cidade tem suas particularidades, e ${c.nome} não é diferente. Conhecer a realidade local nos permite oferecer um serviço jurídico mais eficiente e alinhado com as necessidades da população.`,
    (c, r) => `Nossos clientes em ${c.nome} têm acesso a um time completo de especialistas, cobrindo todas as principais áreas do Direito com competência e dedicação.`,
  ]

  const terceiroPar = [
    (c, r) => `Seja para resolver um problema urgente ou para planejar o futuro, a Will & Pereira Advocacia está pronta para atender moradores de ${c.nome} com profissionalismo e empatia. Entre em contato e descubra como podemos ajudar.`,
    (c, r) => `Não deixe questões jurídicas sem solução. Em ${c.nome}, a Will & Pereira Advocacia oferece orientação clara e objetiva, ajudando seus clientes a tomar decisões conscientes e proteger seus direitos.`,
    (c, r) => `Do atendimento inicial até a resolução do caso, acompanhamos cada etapa com atenção. Em ${c.nome}, nosso compromisso é garantir que o cliente se sinta amparado em cada momento do processo.`,
    (c, r) => `Nossa reputação em ${c.nome} é construídia caso a caso, com resultados concretos e clientes satisfeitos. Escolha a Will & Pereira Advocacia para cuidar dos seus interesses jurídicos.`,
    (c, r) => `Para moradores de ${c.nome} que buscam orientação jurídica de qualidade, o primeiro passo é entrar em contato. Nossa equipe está pronta para analisar seu caso e apresentar as melhores opções disponíveis.`,
    (c, r) => `Acreditamos que um bom advogado faz a diferença entre ganhar e perder um caso. Em ${c.nome}, contamos com profissionais qualificados e comprometidos com o sucesso de cada cliente.`,
    (c, r) => `Proteger seus direitos é um direito fundamental. Em ${c.nome}, a Will & Pereira Advocacia trabalha para que cada cidadão tenha acesso à justiça com qualidade e preço justo.`,
    (c, r) => `Combinamos experiência jurídica com tecnologia para oferecer um atendimento moderno e eficiente em ${c.nome}. Nossos clientes podem acompanhar seus processos de forma ágil e transparente.`,
    (c, r) => `Mais do que resolver problemas, buscamos prevenir conflitos. Em ${c.nome}, oferecemos consultoria jurídica contínua para empresas e famílias que desejam evitar transtornos legais.`,
    (c, r) => `Nossos clientes em ${c.nome} são nosso maior patrimônio. Por isso, dedicamos tempo e atenção especial para entender cada necessidade e oferecer soluções que realmente funcionam.`,
  ]

  paragraphs.push(mainIntro)
  paragraphs.push(pick(segundoPar, rand)(c, r))
  if (rand() > 0.3) paragraphs.push(pick(terceiroPar, rand)(c, r))
  if (rand() > 0.6) {
    const quartoPar = [
      (c, r) => `Em ${c.nome}, a Will & Pereira Advocacia é sinônimo de confiança e resultados. Não importa a complexidade do caso, estamos prontos para oferecer a melhor solução jurídica disponível.`,
      (c, r) => `Com escritório em Palhoça/SC, atendemos ${c.nome} e todo o estado de Santa Catarina, além de clientes em todo o Brasil. Sua localização não é obstáculo para receber assessoria jurídica de excelência.`,
      (c, r) => `Acreditamos que o direito deve ser acessível a todos. Em ${c.nome}, trabalhamos para que cada cidadão possa resolver seus problemas jurídicos com dignidade e eficiência.`,
    ]
    paragraphs.push(pick(quartoPar, rand)(c, r))
  }

  return paragraphs
}

// --- hero ---
function gerarHeroTitle(c, rand) {
  const titulos = [
    `Advogado em ${c.nome} — Will & Pereira Advocacia`,
    `Advogado em ${c.nome} | Direito Trabalhista, Cível e Previdenciário`,
    `Will & Pereira Advocacia — Advogado em ${c.nome}/SC`,
    `Advogado em ${c.nome}: Assessoria Jurídica Completa`,
    `Melhor Advogado em ${c.nome} — Will & Pereira Advocacia`,
    `Advogado em ${c.nome} | Escritório de Advocacia`,
    `Advogado em ${c.nome} — Direito Trabalhista e Civil`,
    `Advogado em ${c.nome} | Will & Pereira — Palhoça/SC`,
    `Escritório de Advocacia em ${c.nome} — Will & Pereira`,
    `Advogado em ${c.nome} — Consultoria Jurídica`,
    `Advogado em ${c.nome}/SC — Especialistas em Direito`,
    `Will & Pereira — Advogado em ${c.nome}, ${c.estado}`,
  ]
  return pick(titulos, rand)
}

function gerarHeroDescription(c, rand) {
  const descs = [
    `Will & Pereira Advocacia atende moradores de ${c.nome} com assessoria jurídica completa em Direito Trabalhista, Previdenciário, Cível, do Consumidor, de Família e Imobiliário. Escritório em Palhoça/SC.`,
    `Advogado em ${c.nome} com mais de 15 anos de experiência. Will & Pereira Advocacia oferece soluções jurídicas personalizadas para pessoas físicas e empresas em ${c.nome} e região.`,
    `Precisa de um advogado em ${c.nome}? A Will & Pereira Advocacia atende em todas as áreas do Direito, com foco em resultados e atendimento humanizado para moradores de ${c.nome}.`,
    `Assessoria jurídica de qualidade em ${c.nome}. A Will & Pereira Advocacia combina experiência, especialização e compromisso com o cliente para resolver questões jurídicas em ${c.nome}.`,
    `Will & Pereira Advocacia: advogado em ${c.nome} para pessoas físicas e empresas. Atuação em Direito Trabalhista, Previdenciário, Cível, Consumidor, Família e Imobiliário.`,
    `Advogado em ${c.nome} | Escritório Will & Pereira Advocacia. Atendimento jurídico completo e humanizado para moradores de ${c.nome} e toda a região.`,
    `Encontre o melhor advogado em ${c.nome}. A Will & Pereira Advocacia oferece consultoria e representação jurídica em diversas áreas do Direito.`,
  ]
  return pick(descs, rand)
}

// --- areaContent: cada área com 10+ variações, 200+ palavras ---

function gerarPrevidenciario(c, r, rand) {
  const templates = [
    (c) => `O Direito Previdenciário em ${c.nome} é uma das áreas mais procuradas, especialmente entre trabalhadores que buscam aposentadoria, auxílio-doença e pensão por morte. Com a reforma da previdência, muitas regras mudaram e é fundamental ter orientação especializada para não perder benefícios. Em ${c.nome}, muitos trabalhadores da área de ${c.economia} não conhecem todos os direitos que possuem junto ao INSS. A Will & Pereira Advocacia realiza análise completa do histórico contributivo para identificar a melhor estratégia de aposentadoria, considerando regras de transição e direito adquirido. Atuamos na conquista de aposentadoria por idade, por tempo de contribuição, aposentadoria especial e BPC/LOAS. Quando o INSS nega ou concede valor inferior ao devido, nossa equipe entra com revisões administrativas e ações judiciais para garantir o benefício correto. Em ${c.nome}, já ajudamos centenas de trabalhadores a conquistarem aposentadorias mais vantajosas e auxílios-doença que haviam sido negados injustamente. O planejamento previdenciário preventivo é essencial para quem deseja se aposentar com o melhor benefício possível. Nossa equipe analisa cada contribuição, cada período especial e cada regra de transição para traçar o melhor caminho. Em ${c.nome}, onde a economia é baseada em ${c.economia}, muitos trabalhadores têm contribuições irregulares ou período especial que pode ser computado para antecipar a aposentadoria. Não deixe de buscar orientação jurídica para proteger seu futuro previdenciário.`,

    (c) => `Trabalhadores de ${c.nome} que precisam de auxílio-doença, aposentadoria ou pensão por morte contam com a Will & Pereira Advocacia para orientação previdenciária completa. Nossa equipe domina todas as nuances da legislação previdenciária brasileira e está preparada para analisar cada caso com atenção. Em ${c.nome}, onde a força de trabalho está concentrada em ${c.economia}, é comum encontrar trabalhadores com vínculos informais ou contribuições em atraso. Isso não significa que não exista direito — nossa equipe identifica todas as possibilidades de regularização e conquista de benefícios. Atuamos em aposentadoria especial para trabalhadores expostos a condições insalubres, BPC/LOAS para idosos e deficientes de baixa renda e pensão por morte para dependentes de segurados falecidos. Quando o INSS nega um benefício, entramos com recurso administrativo ou ação judicial para reverter a decisão. Em ${c.nome}, já conquistamos benefícios previdenciários para centenas de trabalhadores que estavam sem renda. O momento de agir é agora — entre em contato e saiba como podemos ajudar a conquistar seus direitos previdenciários em ${c.nome}.`,

    (c) => `Em ${c.nome}, a demanda por assessoria previdenciária cresce a cada ano. Trabalhadores que se aposentam precisam garantir que receberão o valor correto, e aqueles que necessitam de auxílio-doença ou BPC/LOAS precisam de orientação para não terem seus pedidos negados. A Will & Pereira Advocacia atende moradores de ${c.nome} com análise detalhada do histórico contributivo do INSS, verificando possibilidades de aposentadoria antecipada, majoração de benefício e revisão de cálculos. Muitos trabalhadores de ${c.nome}, especialmente os que atuam em ${c.economia}, possuem períodos de contribuição que não foram computados corretamente pelo INSS. Nossa equipe identifica essas falhas e entra com as medidas cabíveis para correção. Atuamos também em planejamento previdenciário para trabalhadores que ainda estão longe da aposentadoria, traçando estratégias para maximizar o benefício futuro. Em ${c.nome}, já ajudamos diversos trabalhadores a conquistarem aposentadoria especial, revisões de benefício e indenizações por mora do INSS. Não espere até ficar impossibilitado de trabalhar — procure orientação jurídica antecipada e proteja seu futuro.`,

    (c) => `O INSS é frequentemente omisso quando se trata de conceder benefícios de forma justa. Em ${c.nome}, trabalhadores que têm direito a aposentadoria, auxílio-doença ou pensão por morte enfrentam negativas injustificadas e valores abaixo do devido. A Will & Pereira Advocacia combate essas irregularidades com conhecimento técnico e experiência comprovada. Nossa equipe analisa cada caso individualmente, verificando se todos os períodos de contribuição foram computados, se houve exposição a agentes nocivos que garanta aposentadoria especial e se o cálculo do benefício está correto. Em ${c.nome}, onde a economia gira em torno de ${c.economia}, muitos trabalhadores possuem especificidades que apenas um advogado especializado consegue identificar. Desde trabalhadores rurais até servidores públicos, oferecemos assessoria completa em todas as modalidades de benefício previdenciário. Em caso de negativa do INSS, entramos com recurso administrativo ou ação judicial para reverter a decisão. Em ${c.nome}, nossa taxa de sucesso em ações previdenciárias é elevada, refletindo o compromisso com a qualidade do trabalho jurídico.`,

    (c) => `Para moradores de ${c.nome} que buscam aposentadoria ou benefício do INSS, a Will & Pereira Advocacia oferece orientação jurídica de excelência. Nossa equipe compreende que o processo previdenciário pode ser confuso e frustrante, por isso simplificamos cada etapa para o nosso cliente. Em ${c.nome}, com economia fundamentada em ${c.economia}, há trabalhadores de diversos perfis que necessitam de assessoria previdenciária. Seja para aposentadoria por idade, aposentadoria especial, auxílio-doença, auxílio-acidente ou pensão por morte, nossos advogados conduzem o caso com dedicação e competência. Trabalhamos com revisão de benefícios quando o INSS concede valores menores que os devidos, e com planejamento previdenciário para trabalhadores que ainda não atingiram os requisitos para aposentadoria. Em ${c.nome}, já fizemos centenas de trabalhadores conquistarem benefícios que haviam sido negados ou subvalorizados. O atendimento é personalizado, com atualização constante sobre o andamento do processo. Em ${c.nome} e região, a Will & Pereira Advocacia é referência em Direito Previdenciário.`,
  ]
  return pick(templates, rand)(c)
}

function gerarTrabalhista(c, r, rand) {
  const templates = [
    (c) => `O Direito Trabalhista protege os direitos de trabalhadores e empregadores em ${c.nome}. Nossa equipe atua em reclamações trabalhistas, verbas rescisórias, horas extras, FGTS, adicional de insalubridade, periculosidade e assédio moral. Em ${c.nome}, onde a economia se baseia em ${c.economia}, as relações de trabalho apresentam particularidades que conhecemos profundamente. Trabalhadores que foram demitidos sem justa causa, não receberam horas extras ou sofreram acidente de trabalho podem contar com a Will & Pereira Advocacia para buscar reparação. Austramos também empresas na consultoria preventiva, ajudando a evitar passivos trabalhistas e a adequar práticas management à legislação. Em ${c.nome}, já conquistamos indenizações por dano moral, horas extras não pagas e verbas rescisórias de forma célere e eficiente. A CLT garante diversos direitos, mas muitos trabalhadores não conhecem a totalidade deles. Nossa equipe esclarece dúvidas e conduz o processo trabalhista com foco no melhor resultado possível para o cliente em ${c.nome}.`,

    (c) => `Em ${c.nome}, a dinâmica do mercado de trabalho gera demandas constantes por assessoria trabalhista. Seja um trabalhador que precisa cobrar verbas rescisórias ou uma empresa que deseja adequar seus contratos, a Will & Pereira Advocacia oferece soluções eficazes. Atuamos em reclamações trabalhistas na Justiça do Trabalho, buscando horas extras, adicional noturno, insalubridade, periculosidade e indenizações por dano moral e material. Em ${c.nome}, onde o setor de ${c.economia} emprega grande parte da população, é comum encontrar questões como jornada excessiva, condições insalubres e assédio moral. Nossa equipe conhece a jurisprudência trabalhista atualizada e está preparada para enfrentar os casos mais complexos. Para empresas, oferecemos consultoria preventiva, elaboração de contratos de trabalho, acordos extrajudiciais e auditorias trabalhistas. Em ${c.nome}, já ajudamos diversas empresas a evitarem passivos trabalhistas significativos e trabalhadores a conquistarem seus direitos na Justiça do Trabalho. O prazo para ingressar com reclamação trabalhista é de 2 anos após a demissão, então não perca tempo.`,

    (c) => `A relação de trabalho em ${c.nome} envolve milhões de trabalhadores que precisam de proteção jurídica. A Will & Pereira Advocacia atua na defesa dos direitos trabalhistas, desde a negociação coletiva até o ajuizamento de reclamações na Justiça do Trabalho. Em ${c.nome}, com economia focada em ${c.economia}, é essencial que trabalhadores e empresas contem com assessoria jurídica especializada. Trabalhadores demitidos sem justa causa têm direito a aviso prévio, 13º salário proporcional, férias proporcionais e multa de 40% sobre o FGTS, entre outros. Nossa equipe calcula todas as verbas devidas e garante o recebimento integral. Para empresas, oferecemos auditorias trabalhistas que identificam riscos e oportunidades de adequação. Em ${c.nome}, o conhecimento das particularidades locais do mercado de trabalho é essencial para um resultado eficaz. Nossos clientes em ${c.nome} contam com atendimento personalizado e atualização constante sobre o andamento de seus processos trabalhistas.`,

    (c) => `Quando os direitos trabalhistas são violados em ${c.nome}, a Will & Pereira Advocacia entra em ação. Atuamos em casos de demissão injusta, horas extras não pagas, FGTS descontado indevidamente, acidente de trabalho e assédio moral e sexual. Em ${c.nome}, onde o setor de ${c.economia} é expressivo, é comum encontrarmos trabalhadores que não recebem todos os seus direitos previstos na CLT. Nossa equipe realiza o levantamento de todos os valores devidos e ingressa com reclamação trabalhista quando necessário. Trabalhamos também com acordos extrajudiciais, que permitem a resolução rápida e amigável de conflitos trabalhistas. Para empresas de ${c.nome}, oferecemos consultoria preventiva para evitar passivos trabalhistas e adequar práticas de gestão de pessoas. Em ${c.nome}, nossa taxa de sucesso em ações trabalhistas é resultado de preparação técnica, conhecimento da jurisprudência e compromisso com o cliente.`,

    (c) => `Moradores de ${c.nome} que trabalham em condições inadequadas ou tiveram seus direitos violados podem contar com a Will & Pereira Advocacia para buscar reparação na Justiça do Trabalho. Em ${c.nome}, com economia baseada em ${c.economia}, as relações de trabalho apresentam desafios específicos que exigem conhecimento especializado. Atuamos em reclamações trabalhistas individuais e coletivas, defendendo trabalhadores em casos de jornada excessiva, insalubridade, periculosidade, acidente de trabalho e assédio moral. Em ${c.nome}, trabalhadores que foram demitidos sem justa causa têm direito a diversas verbas rescisórias que muitas vezes não são pagas corretamente. Nossa equipe verifica cada item e garante o recebimento integral devido. Para empresas, oferecemos assessoria trabalhista preventiva, elaboração de contratos, acordos e negociações coletivas. Em ${c.nome}, a Will & Pereira Advocacia é reconhecida pela competência e dedicação em causas trabalhistas. Não aceite ter seus direitos negados — procure nossa equipe e saiba como podemos ajudar.`,
  ]
  return pick(templates, rand)(c)
}

function gerarCivel(c, r, rand) {
  const templates = [
    (c) => `O Direito Cível em ${c.nome} abrange uma ampla gama de questões que afetam o cotidiano das pessoas e empresas. Contratos, indenizações, cobranças, usucapião e responsabilidade civil são algumas das áreas em que atuamos. Em ${c.nome}, onde a economia gira em torno de ${c.economia}, conflitos cíveis surgem frequentemente entre vizinhos, empresas e consumidores. A Will & Pereira Advocacia oferece assessoria completa em Direito Cível, desde a elaboração de contratos preventivos até ações judiciais complexas. Quando um contrato é descumprido, uma dívida não é paga ou um dano é causado, é necessário contar com um advogado experiente para buscar reparação. Em ${c.nome}, nossa equipe conduz processos de indenização, cobrança, execução e usucapião com foco em resultados rápidos e eficazes. Trabalhamos para resolver conflitos de forma célere, priorizando soluções extrajudiciais quando possível, mas sem hesitar em ir a juízo quando necessário. Moradores de ${c.nome} que precisam de orientação cível encontram na Will & Pereira Advocacia o parceiro ideal para proteger seus interesses.`,

    (c) => `Em ${c.nome}, questões cíveis do cotidiano muitas vezes escalam para litígios judiciais. Contratos de compra e venda, locações, empréstimos e relações de consumo geram conflitos que precisam de solução jurídica. A Will & Pereira Advocacia atende moradores de ${c.nome} em todas as questões de Direito Cível, oferecendo assessoria preventiva e contenciosa. Quando um conflito não pode ser resolvido extrajudicialmente, nossa equipe ingressa com ações de cobrança, indenização ou execução judicial para garantir o direito do cliente. Em ${c.nome}, onde o setor de ${c.economia} é dinâmico, é comum surgirem questões como contratos comerciais descumpridos, danos materiais e morais, e disputas de propriedade. Nossa experiência em causas cíveis nos permite oferecer soluções eficazes, mesmo em situações complexas. Atuamos também em usucapião, quando trabalhadores ou moradores de ${c.nome} precisam regularizar imóveis que ocupam há anos. Nossa equipe acompanha cada etapa do processo, desde a instrução processual até a sentença definitiva.`,

    (c) => `A Will & Pereira Advocacia é referência em Direito Cível em ${c.nome}. Seja para resolver uma questão contratual, cobrar uma dívida ou buscar indenização por danos, nossa equipe está preparada para oferecer a melhor solução. Em ${c.nome}, com economia focada em ${c.economia}, os conflitos cíveis são variados e exigem conhecimento aprofundado do Código Civil e da jurisprudência. Trabalhamos com elaboração e revisão de contratos para prevenir futuros litígios. Quando o litígio é inevitável, ingressamos com ações judiciais de cobrança, indenização, despejo, usucapião e demais medidas cabíveis. Em ${c.nome}, já resolvemos centenas de casos cíveis com sucesso, garantindo a nossos clientes a reparação ou o direito pleiteado. A assessoria cível preventiva é especialmente importante para empresas de ${c.nome}, que precisam de contratos adequados para evitar prejuízos futuros. Nossa equipe analisa cada situação e apresenta as melhores alternativas para o caso.`,

    (c) => `Quando surgem conflitos cíveis em ${c.nome}, a Will & Pereira Advocacia está pronta para atuar. Atendemos em ações de indenização por danos materiais e morais, cobranças judiciais e extrajudiciais, despejo, usucapião, divórcio e inventário. Em ${c.nome}, onde a atividade econômica se concentra em ${c.economia}, é fundamental ter um advogado que conheça as particularidades locais do Direito Cível. Nossa equipe combina experiência técnica com atendimento personalizado, garantindo que cada cliente tenha seu caso conduzido com dedicação e competência. Em ${c.nome}, trabalhamos para resolver conflitos cíveis de forma eficiente, priorizando acordos extrajudiciais quando benéficos, mas sem medo de levar o caso até o tribunal. A jurisprudência civil evolui constantemente, e nossa equipe acompanha cada mudança para oferecer o melhor serviço possível aos moradores de ${c.nome}.`,

    (c) => `Moradores de ${c.nome} que enfrentam problemas cíveis precisam de orientação jurídica para proteger seus interesses. A Will & Pereira Advocacia atende em questões de Direito Civil como contratos, indenizações, cobranças, usucapião e responsabilidade civil. Em ${c.nome}, a dinâmica econômica baseada em ${c.economia} gera demandas jurídicas variadas que requerem atenção e competência. Trabalhamos com pessoas físicas e empresas, oferecendo assessoria completa em todas as etapas do processo cível. Desde a negociação amigável até a sentença judicial, acompanhamos cada caso com dedicação. Em ${c.nome}, já atendemos diversos clientes com sucesso, conquistando indenizações, resolvendo disputas contratuais e regularizando propriedades. Apreventiva jurídica cível é essencial para evitar problemas futuros — nossa equipe revisa contratos, verifica obrigações e orienta sobre boas práticas jurídicas em ${c.nome}.`,
  ]
  return pick(templates, rand)(c)
}

function gerarConsumidor(c, r, rand) {
  const templates = [
    (c) => `O Código de Defesa do Consumidor protege moradores de ${c.nome} contra abusos de empresas e fornecedores. Se você contratou um serviço defeituoso, comprou um produto com vício, sofreu cobrança indevida ou negativação injusta, a Will & Pereira Advocacia pode ajudar. Em ${c.nome}, com economia baseada em ${c.economia}, o consumo de produtos e serviços é intenso e, consequentemente, os conflitos consumeristas são frequentes. Nossa equipe atua na defesa dos direitos do consumidor, buscando indenização por danos morais e materiais, repetição de indébito e inversão do ônus da prova quando cabível. O CDC garante direitos fundamentais que muitos consumidores de ${c.nome} desconhecem. Por isso, oferecemos orientação jurídica clara e acessível para que cada cidadão saiba como agir quando seus direitos são violados. Em ${c.nome}, já ajudamos centenas de consumidores a conquistarem indenizações e a terem seus direitos reconhecidos.`,

    (c) => `Em ${c.nome}, consumidores que tiveram seus direitos violados contam com a Will & Pereira Advocacia para buscar reparação. Atuamos em casos de negativação indevida, cobrança de valores indevidos, produtos defeituosos, publicidade enganosa e cláusulas abusivas. Com economia centrada em ${c.economia}, o mercado consumidor de ${c.nome} é ativo e apresenta diversas situações que geram conflitos. O CDC assegura direitos como inversão do ônus da prova em favor do consumidor, o que facilita a obtenção de indenização. Nossa equipe utiliza essa ferramenta para garantir que consumidores de ${c.nome} tenham seus direitos respeitados. Trabalhamos com negociações diretas com empresas, mediação, conciliação e, quando necessário, ações judiciais para reparação. Em ${c.nome}, já obtivemos êxito em diversos casos de direito do consumidor, conquistando indenizações significativas para nossos clientes.`,

    (c) => `O Direito do Consumidor em ${c.nome} protege quem compra, contrata ou utiliza serviços. Se você sofreu com um produto defeituoso, um serviço mal prestado ou uma cobrança abusiva, a Will & Pereira Advocacia está pronta para agir. Em ${c.nome}, com economia focada em ${c.economia}, é essencial que consumidores conheçam seus direitos para não serem vítimas de práticas abusivas. Nossa equipe atua em defesa do consumidor em ${c.nome}, buscando reparação por danos morais e materiais, repetição de valores pagos indevidamente e cessação de práticas abusivas. O CDC é uma lei poderosa que confere ao consumidor vantagens processuais significativas, como a inversão do ônus da prova e a competência da Justiça Federal para causas de valor superior a 40 salários mínimos. Em ${c.nome}, trabalhamos para garantir que cada consumidor tenha acesso à justiça e receba a reparação que merece. Não deixe que empresas abuse do consumidor — entre em contato e saiba como podemos ajudar em ${c.nome}.`,

    (c) => `Em ${c.nome}, consumidores que enfrentam problemas com empresas, bancos, planos de saúde ou fornecedores de serviços contam com a Will & Pereira Advocacia para fazer valer seus direitos. Atuamos em negociações e ações judiciais contra práticas abusivas, garantindo reparação por danos morais e materiais. Com economia baseada em ${c.economia}, o mercado consumidor de ${c.nome} é ativo, o que significa mais oportunidades de conflitos consumeristas. Nossa equipe domina o CDC e a jurisprudência do STJ, utilizando essas ferramentas para benefício dos consumidores de ${c.nome}. Trabalhamos com negativação indevida, cobrança de dívida prescrita, cláusulas abusivas em contratos, seguro de vida e plano de saúde. Em ${c.nome}, já conquistamos diversas indenizações para consumidores que tiveram seus direitos violados. O atendimento é personalizado, com análise detalhada de cada caso para identificar a melhor estratégia de atuação.`,

    (c) => `Moradores de ${c.nome} que tiveram problemas com produtos defeituosos, serviços inadequados ou cobranças indevidas encontram na Will & Pereira Advocacia o parceiro ideal para fazer valer seus direitos. O CDC protege consumidores em ${c.nome} contra práticas abusivas e garante reparação por danos. Em ${c.nome}, com economia vinculada a ${c.economia}, o consumo é parte fundamental da vida cotidiana e, por isso, os conflitos consumeristas são frequentes. Nossa equipe atua na defesa dos direitos do consumidor, desde negociações amigáveis até ações judiciais complexas. Utilizamos ferramentas como inversão do ônus da prova, repetição de indébito em dobro e indenização por danos morais para garantir a reparação adequada. Em ${c.nome}, já ajudamos diversos consumidores a resolverem problemas com bancos, planos de saúde, empresas de telefonia e fornecedores locais. Seus direitos são importantes — não hesite em buscá-los.`,
  ]
  return pick(templates, rand)(c)
}

function gerarFamilia(c, r, rand) {
  const templates = [
    (c) => `O Direito de Família em ${c.nome} lida com questões sensíveis que afetam a vida das pessoas. Divórcio, guarda de filhos, pensão alimentícia, inventário e união estável são algumas das áreas em que atuamos com discrição e profissionalismo. Em ${c.nome}, onde a comunidade tem laços familiares fortes, conflitos familiares precisam ser tratados com delicadeza e competência. A Will & Pereira Advocacia oferece assessoria completa em Direito de Família, buscando soluções equilibradas que protejam os interesses de todos os envolvidos, especialmente das crianças. Em ${c.nome}, trabalhamos com divórcio consensual e litigioso, guarda compartilhada, fixação de alimentos, investigação de paternidade e inventário extrajudicial. Nossa equipe entende que questões familiares são delicadas e exigem um atendimento humanizado. Por isso, dedicamos especial atenção a cada caso em ${c.nome}, garantindo que o cliente se sinta amparado em cada etapa do processo.`,

    (c) => `Em ${c.nome}, famílias que precisam de assistência jurídica em questões como divórcio, guarda, pensão alimentícia ou inventário encontram na Will & Pereira Advocacia o parceiro ideal. Nossa equipe atua com sensibilidade e competência, buscando soluções que preservem os vínculos familiares quando possível. O Direito de Família é uma das áreas mais emotivas do Direito, e em ${c.nome}, onde as relações familiares são valorizadas, é fundamental contar com um advogado que compreenda a importância de cada decisão. Trabalhamos comMediação familiar, acordos consensuais e, quando necessário, litígios para proteger os direitos dos clientes. Em ${c.nome}, já resolvemos diversos casos de divórcio, guarda e pensão alimentícia com sucesso. O inventário e a partilha de bens também são áreas em que atuamos, oferecendo orientação clara sobre os procedimentos legais e as melhores estratégias para cada caso familiar em ${c.nome}.`,

    (c) => `A Will & Pereira Advocacia atua em todas as áreas do Direito de Família em ${c.nome}: divórcio consensual e litigioso, guarda compartilhada, pensão alimentícia, investigação de paternidade, inventário e planejamento sucessório. Em ${c.nome}, com sua comunidade unida e economia baseada em ${c.economia}, conflitos familiares precisam de solução jurídica adequada. Nossa equipe está preparada para oferecer orientação jurídica em cada situação, com foco na proteção dos direitos de todos os envolvidos, especialmente crianças e idosos. Trabalhamos com Mediação familiar para buscar acordos que beneficiem todas as partes. Em ${c.nome}, já ajudamos diversas famílias a resolverem questões de divórcio, fixação de guarda e pensão alimentícia de forma ágil e justa. O planejamento sucessório é essencial para proteger o patrimônio familiar — nossa equipe orienta sobre testamento, doação e planejamento de herança em ${c.nome}.`,

    (c) => `Questões familiares em ${c.nome} merecem atenção especial. Divórcios, disputas de guarda, pensão alimentícia e inventários são momentos difíceis que exigem assessoria jurídica humanizada. A Will & Pereira Advocacia atende moradores de ${c.nome} em todas as questões de Direito de Família, oferecendo soluções personalizadas para cada caso. Em ${c.nome}, onde a economia gira em torno de ${c.economia}, conflitos familiares frequentemente envolvem divisão de patrimônio, pensão para filhos e direito de visitas. Nossa equipe domina esses temas e oferece orientação clara sobre cada etapa do processo. Trabalhamos com divórcio consensual para casais que desejam separar-se de forma amigável, e com litígios quando não há acordo. Em ${c.nome}, priorizamos a Mediação familiar para preservar relacionamentos e encontrar soluções que beneficiem todos, especialmente as crianças. Inventários e testamentos também fazem parte de nosso atendimento em ${c.nome}, garantindo que o patrimônio familiar seja distribuído de forma justa e legal.`,

    (c) => `Famílias de ${c.nome} que precisam de apoio jurídico em momentos delicados contam com a Will & Pereira Advocacia. Atuamos em divórcio, guarda de filhos, pensão alimentícia, inventário, união estável e todas as questões que envolvem relações familiares. Em ${c.nome}, com economia centrada em ${c.economia}, conflitos familiares frequentemente envolvem questões patrimoniais e de guarda que exigem expertise jurídica. Nossa equipe entende a sensibilidade de cada caso e oferece atendimento com discrição e profissionalismo. Trabalhamos para encontrar soluções que protejam os interesses de todos, especialmente dos menores. Em ${c.nome}, já orientamos diversas famílias em processos de divórcio, fixação de alimentos e inventário, sempre com foco em resultados rápidos e justos. O planejamento sucessório preventivo é uma forma de evitar conflitos futuros — nossa equipe orienta sobre testamentos e doações em ${c.nome} para proteger o patrimônio familiar.`,
  ]
  return pick(templates, rand)(c)
}

function gerarImobiliario(c, r, rand) {
  const templates = [
    (c) => `O Direito Imobiliário em ${c.nome} regula todas as questões relacionadas a imóveis. Compra e venda, locação, usucapião, regularização fundiária e condomínio são algumas das áreas em que atuamos. Em ${c.nome}, com economia baseada em ${c.economia}, o mercado imobiliário é ativo e demanda assessoria jurídica especializada. A Will & Pereira Advocacia oferece segurança jurídica em cada etapa da transação imobiliária, desde a due diligence até o registro em cartório. Quando surgem conflitos — como inadimplência de aluguel, vícios ocultos em imóveis comprados ou disputas de divórcio —, nossa equipe está preparada para oferecer a melhor solução. Em ${c.nome}, trabalhamos com contratos de compra e venda seguros, locação residencial e comercial, e ações de usucapião para regularizar imóveis. A segurança jurídica em transações imobiliárias é essencial — não deixe seu investimento sem proteção. Em ${c.nome}, nossa equipe acompanha cada detalhe para garantir que seu imóvel esteja protegido legalmente.`,

    (c) => `Em ${c.nome}, o mercado imobiliário apresenta características próprias que demandam conhecimento especializado. A Will & Pereira Advocacia atua em todas as áreas do Direito Imobiliário, desde a elaboração de contratos até a resolução de conflitos. Em ${c.nome}, onde o setor de ${c.economia} é dinâmico, transações imobiliárias são frequentes e geram demandas jurídicas específicas. Nossa equipe oferece assessoria em compra e venda de imóveis, locação, usucapião, regularização fundiária e direito condominial. Quando há disputas sobre propriedade,limites de terreno ou inadimplência em contratos de locação, nossa equipe conduz o caso com competência e dedicação. Em ${c.nome}, já resolvemos diversos conflitos imobiliários com sucesso, garantindo a segurança jurídica de nossos clientes. A due diligence imobiliária é especialmente importante em ${c.nome}, onde a verificação de matrícula, certidões negativas e situação fiscal do imóvel pode evitar problemas futuros.`,

    (c) => `Moradores de ${c.nome} que precisam de orientação em questões imobiliárias contam com a Will & Pereira Advocacia. Atuamos em contratos de compra e venda, locação, usucapião e regularização de imóveis. Em ${c.nome}, com economia centrada em ${c.economia}, o mercado imobiliário é ativo e apresenta diversas situações que geram conflitos. A segurança jurídica em transações imobiliárias é essencial. Nossa equipe analisa cada situação e oferece a melhor solução, evitando problemas futuros. Em ${c.nome}, trabalhamos com elaboração e revisão de contratos, mediação de conflitos e ações judiciais quando necessário. A usucapião é uma ferramenta importante para moradores de ${c.nome} que ocupam imóveis há anos sem documentação regular — nossa equipe conduz o processo desde a instrução processual até o registro em cartório. Em ${c.nome} e região, a Will & Pereira Advocacia é reconhecida pela competência em Direito Imobiliário.`,

    (c) => `O mercado imobiliário em ${c.nome} exige atenção jurídica cuidadosa. Compra, venda, locação e usucapião são operações que envolvem valores significativos e riscos legais. A Will & Pereira Advocacia atende moradores de ${c.nome} em todas as questões imobiliárias, oferecendo segurança e tranquilidade em cada transação. Em ${c.nome}, com economia vinculada a ${c.economia}, é comum encontrarmos conflitos como inadimplência em aluguéis, vícios ocultos em imóveis e disputas de limites de terreno. Nossa equipe domina essas questões e oferece soluções eficazes. Trabalhamos com due diligence imobiliária completa, verificando matrícula, certidões e situação fiscal dos imóveis. Em ${c.nome}, também atuamos em regularização fundiária e usucapião, ajudando moradores a tornarem seus imóveis legalmente. O planejamento imobiliário preventivo é essencial — antes de qualquer transação, conte com orientação jurídica em ${c.nome} para garantir que tudo esteja em ordem.`,

    (c) => `Em ${c.nome}, a assessoria jurídica imobiliária é fundamental para proteger investimentos e evitar conflitos. A Will & Pereira Advocacia atua em contratos de compra e venda, locação, usucapião e regularização fundiária, oferecendo segurança em cada etapa. Com economia baseada em ${c.economia}, o mercado imobiliário de ${c.nome} é ativo e gera demandas jurídicas variadas. Nossa equipe oferece assessoria completa em Direito Imobiliário, desde a análise preliminar do imóvel até o registro definitivo em cartório. Quando há disputas, conduzimos ações de reivindicatória, despejo e indenização com foco em resultados. Em ${c.nome}, já ajudamos diversos clientes a resolverem conflitos imobiliários complexos, incluindo disputas de herança que envolvem imóveis e usucapião de terras urbanas. A prevenção é a melhor estratégia — conte com a Will & Pereira Advocacia em ${c.nome} para garantir que sua transação imobiliária esteja protegida legalmente.`,
  ]
  return pick(templates, rand)(c)
}

// --- FAQs ---
function gerarFAQs(c, r, rand) {
  const faqTemplates = [
    [
      (c) => ({
        pergunta: `Quais áreas do direito são mais comuns em ${c.nome}?`,
        resposta: `Em ${c.nome}, as áreas mais demandadas são Direito Trabalhista, Direito Previdenciário e Direito do Consumidor. A Will & Pereira Advocacia atua em todas essas áreas com excelência e compromisso.`,
      }),
      (c) => ({
        pergunta: `Como funciona o atendimento da Will & Pereira Advocacia para moradores de ${c.nome}?`,
        resposta: `A Will & Pereira Advocacia atende moradores de ${c.nome} de forma integral, presencialmente em Palhoça/SC ou por videoconferência. Nossa equipe oferece orientação jurídica de qualidade, independentemente da localização.`,
      }),
      (c) => ({
        pergunta: `Qual o prazo para entrar com uma ação trabalhista em ${c.nome}?`,
        resposta: `O trabalhador tem até 2 anos após a extinção do contrato para ajuizar reclamação trabalhista. Em ${c.nome}, a Will & Pereira Advocacia orienta trabalhadores sobre seus direitos e prazos.`,
      }),
    ],
    [
      (c) => ({
        pergunta: `A Will & Pereira Advocacia atende toda a região de ${c.nome}?`,
        resposta: `Sim! A Will & Pereira Advocacia atende moradores de ${c.nome} e toda a região. Nossa equipe está preparada para oferecer assessoria jurídica de qualidade.`,
      }),
      (c) => ({
        pergunta: `Quais documentos são necessários para uma consulta jurídica em ${c.nome}?`,
        resposta: `Para uma orientação jurídica em ${c.nome}, é recomendável trazer documentos relacionados à questão, como contratos, comprovantes e documentos pessoais.`,
      }),
      (c) => ({
        pergunta: `Quanto custa uma consulta jurídica em ${c.nome}?`,
        resposta: `A Will & Pereira Advocacia oferece orientação jurídica com valores acessíveis para moradores de ${c.nome}. Entre em contato para informações sobre honorários e condições de pagamento.`,
      }),
    ],
    [
      (c) => ({
        pergunta: `A Will & Pereira Advocacia atende${c.porte === 'pequena' ? ' cidades pequenas' : ' empresas em ' + c.nome}?`,
        resposta: `Sim! A Will & Pereira Advocacia atende moradores de ${c.nome} e todas as empresas da região, independentemente do porte.`,
      }),
      (c) => ({
        pergunta: `Qual a experiência da Will & Pereira Advocacia em ${c.nome}?`,
        resposta: `A Will & Pereira Advocacia possui mais de 15 anos de experiência em atendimento jurídico, incluindo moradores de ${c.nome} e região.`,
      }),
      (c) => ({
        pergunta: `Como posso agendar uma orientação jurídica em ${c.nome}?`,
        resposta: `Para agendar uma orientação jurídica em ${c.nome}, entre em contato com a Will & Pereira Advocacia pelo telefone, WhatsApp ou formulário do site.`,
      }),
    ],
    [
      (c) => ({
        pergunta: `A Will & Pereira Advocacia trabalha com plano de saúde em ${c.nome}?`,
        resposta: `Sim! A Will & Pereira Advocacia atua em ações contra planos de saúde que negam cobertura ou praticam abusos contra consumidores de ${c.nome}.`,
      }),
      (c) => ({
        pergunta: `A Will & Pereira Advocacia faz atendimento por videoconferência para ${c.nome}?`,
        resposta: `Sim! Oferecemos atendimento por videoconferência para moradores de ${c.nome} que não podem se deslocar até Palhoça/SC.`,
      }),
      (c) => ({
        pergunta: `Em quais situações devo procurar um advogado trabalhista em ${c.nome}?`,
        resposta: `Em ${c.nome}, procure um advogado trabalhista quando tiver problemas com verbas rescisórias, horas extras, FGTS, acidente de trabalho ou assédio moral.`,
      }),
    ],
    [
      (c) => ({
        pergunta: `A Will & Pereira Advocacia atende casos urgentes em ${c.nome}?`,
        resposta: `Sim! A Will & Pereira Advocacia oferece atendimento urgente para moradores de ${c.nome} que necessitam de solução jurídica imediata.`,
      }),
      (c) => ({
        pergunta: `O que fazer se o INSS negar um benefício em ${c.nome}?`,
        resposta: `Se o INSS negou um benefício em ${c.nome}, entre em contato com a Will & Pereira Advocacia. Nossa equipe analisa a negativa e entra com recurso administrativo ou ação judicial.`,
      }),
      (c) => ({
        pergunta: `A Will & Pereira Advocacia trabalha com inventário em ${c.nome}?`,
        resposta: `Sim! A Will & Pereira Advocacia atua em inventários judiciais e extrajudiciais para moradores de ${c.nome}, garantindo a partilha de bens de forma justa.`,
      }),
    ],
  ]
  const chosen = pick(faqTemplates, rand)
  return chosen.map(fn => fn(c))
}

// ═══════════════════════════════════════════════════════════════
// 4. GERAÇÃO PRINCIPAL
// ═══════════════════════════════════════════════════════════════

function gerarConteudo(cidade, regiao) {
  // Hash composta para máxima variação
  const base = cidade.nome + cidade.regiao + cidade.estado + (cidade.populacao || '')
  const h1 = hashCode(base)
  const h2 = hashCode(base + '_h2')
  const h3 = hashCode(base + '_h3')
  const rand = seededRandom(h1)

  const heroTitle = gerarHeroTitle(cidade, seededRandom(h1))
  const heroDescription = gerarHeroDescription(cidade, seededRandom(h2))
  const introParagraphs = gerarIntroParagraphs(cidade, regiao, seededRandom(h3))

  const areaContent = {
    previdenciario: gerarPrevidenciario(cidade, regiao, seededRandom(h1 + 100)),
    trabalhista: gerarTrabalhista(cidade, regiao, seededRandom(h1 + 200)),
    civel: gerarCivel(cidade, regiao, seededRandom(h1 + 300)),
    consumidor: gerarConsumidor(cidade, regiao, seededRandom(h1 + 400)),
    familia: gerarFamilia(cidade, regiao, seededRandom(h1 + 500)),
    imobiliario: gerarImobiliario(cidade, regiao, seededRandom(h1 + 600)),
  }

  const faqs = gerarFAQs(cidade, regiao, seededRandom(h1 + 700))

  const stats = {
    experiencia: '15+',
    clientes: '5000+',
    taxa: '98%',
    cidades: '302',
  }

  return { heroTitle, heroDescription, introParagraphs, areaContent, faqs, stats }
}

// ═══════════════════════════════════════════════════════════════
// 5. MAIN
// ═══════════════════════════════════════════════════════════════

function main() {
  const cidades = parseCidadesTS()
  console.log(`Total de cidades encontradas: ${cidades.length}`)

  // Preparar diretório
  const outDir = join(ROOT, 'src/data/cidades-content')
  mkdirSync(outDir, { recursive: true })

  let count = 0
  for (const cidade of cidades) {
    const conteudo = gerarConteudo(cidade, cidade)

    // Montar o conteúdo do arquivo .ts
    const tsContent = `export default {
  heroTitle: '${esc(conteudo.heroTitle)}',
  heroDescription: '${esc(conteudo.heroDescription)}',
  introParagraphs: [
    '${esc(conteudo.introParagraphs[0])}',
    '${esc(conteudo.introParagraphs[1])}',${conteudo.introParagraphs[2] ? `\n    '${esc(conteudo.introParagraphs[2])}',` : ''}${conteudo.introParagraphs[3] ? `\n    '${esc(conteudo.introParagraphs[3])}',` : ''}
  ],
  areaContent: {
    previdenciario: '${esc(conteudo.areaContent.previdenciario)}',
    trabalhista: '${esc(conteudo.areaContent.trabalhista)}',
    civel: '${esc(conteudo.areaContent.civel)}',
    consumidor: '${esc(conteudo.areaContent.consumidor)}',
    familia: '${esc(conteudo.areaContent.familia)}',
    imobiliario: '${esc(conteudo.areaContent.imobiliario)}',
  },
  faqs: [
    { pergunta: '${esc(conteudo.faqs[0].pergunta)}', resposta: '${esc(conteudo.faqs[0].resposta)}' },
    { pergunta: '${esc(conteudo.faqs[1].pergunta)}', resposta: '${esc(conteudo.faqs[1].resposta)}' },
    { pergunta: '${esc(conteudo.faqs[2].pergunta)}', resposta: '${esc(conteudo.faqs[2].resposta)}' },
  ],
  stats: {
    experiencia: '${conteudo.stats.experiencia}',
    clientes: '${conteudo.stats.clientes}',
    taxa: '${conteudo.stats.taxa}',
    cidades: '${conteudo.stats.cidades}',
  },
}
`

    const filePath = join(outDir, `${cidade.slug}.ts`)
    writeFileSync(filePath, tsContent, 'utf-8')
    count++
  }

  console.log(`\n✅ ${count} arquivos gerados com sucesso em ${outDir}`)
  console.log(`   Formato: {slug}.ts (ex: advogado-em-florianopolis.ts)`)
}

main()
