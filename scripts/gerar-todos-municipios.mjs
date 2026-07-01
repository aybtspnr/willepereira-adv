import { writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
const contentDir = join(projectRoot, 'src', 'data', 'cidades-content')
if (!existsSync(contentDir)) mkdirSync(contentDir, { recursive: true })

// Already existing content files
const existing = new Set(readdirSync(contentDir).filter(f=>f.endsWith('.ts')).map(f=>f.replace('.ts','')))

// Fetch all municipalities from IBGE
const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
const allMunicipios = await res.json()

// UF data
const ufInfo = {
AC:{e:'Comércio, Agricultura e Serviços'},AL:{e:'Indústria Canavieira, Comércio e Turismo'},
AP:{e:'Mineração, Comércio e Serviços Públicos'},AM:{e:'Indústria, Comércio e Tecnologia'},
BA:{e:'Petróleo, Turismo, Indústria e Comércio'},CE:{e:'Turismo, Indústria e Comércio'},
DF:{e:'Administrativo, Serviços e Tecnologia'},ES:{e:'Indústria Siderúrgica, Petróleo e Turismo'},
GO:{e:'Agronegócio, Mineração e Serviços'},MA:{e:'Agropecuária, Comércio e Serviços'},
MT:{e:'Agronegócio, Mineração e Comércio'},MS:{e:'Agronegócio, Pecuária e Indústria'},
MG:{e:'Mineração, Indústria e Agronegócio'},PA:{e:'Mineração, Petróleo e Comércio'},
PB:{e:'Indústria, Comércio e Agropecuária'},PR:{e:'Agronegócio, Indústria e Serviços'},
PE:{e:'Petróleo, Turismo e Indústria'},PI:{e:'Agropecuária, Comércio e Serviços'},
RJ:{e:'Petróleo, Turismo e Indústria'},RN:{e:'Petróleo, Turismo e Agropecuária'},
RO:{e:'Agronegócio e Mineração'},RR:{e:'Mineração, Comércio e Serviços Públicos'},
RS:{e:'Indústria, Vinicultura e Agronegócio'},SC:{e:'Indústria, Agronegócio e Turismo'},
SE:{e:'Indústria, Comércio e Agropecuária'},SP:{e:'Indústria, Serviços, Tecnologia e Finanças'},
TO:{e:'Agronegócio, Comércio e Serviços'},
}

const ufDesc = {
AC:'Acre',AL:'Alagoas',AP:'Amapá',AM:'Amazonas',BA:'Bahia',CE:'Ceará',
DF:'Distrito Federal',ES:'Espírito Santo',GO:'Goiás',MA:'Maranhão',
MT:'Mato Grosso',MS:'Mato Grosso do Sul',MG:'Minas Gerais',PA:'Pará',
PB:'Paraíba',PR:'Paraná',PE:'Pernambuco',PI:'Piauí',RJ:'Rio de Janeiro',
RN:'Rio Grande do Norte',RO:'Rondônia',RR:'Roraima',RS:'Rio Grande do Sul',
SC:'Santa Catarina',SE:'Sergipe',SP:'São Paulo',TO:'Tocantins',
}

function slugify(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/['']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}

function gerar(nome, uf, regiao) {
  const eco = ufInfo[uf]?.e || 'Comércio e Serviços'
  const estado = ufDesc[uf] || uf
  const hash = nome.split('').reduce((a,c)=>a+c.charCodeAt(0),0)
  
  const h = [
    `Advogado em ${nome}: Assessoria Jurídica Especializada em ${estado}`,
    `Direito em ${nome} — Advogados com Experiência em ${estado}`,
    `Assessoria Jurídica em ${nome}, ${estado} | Will & Pereira Advocacia`,
    `Advogados em ${nome}, ${estado} — Todas as Áreas do Direito`,
  ]
  const d = [
    `Encontre o melhor advogado em ${nome}/${uf}. A Will & Pereira Advocacia oferece assessoria jurídica completa com mais de 15 anos de experiência atendendo moradores de ${nome} e região.`,
    `Soluções jurídicas personalizadas para moradores de ${nome}/${uf}. Nossa equipe atua em todas as áreas do Direito com atendimento humanizado.`,
  ]
  
  return {
    heroTitle: h[hash%h.length],
    heroDescription: d[hash%d.length],
    introParagraphs: [`Quando se fala em assessoria jurídica de qualidade em ${nome}/${uf}, encontrar um profissional que conheça as particularidades locais é essencial. A Will & Pereira Advocacia, com mais de 15 anos de atuação e escritório em Palhoça/SC, é referência no atendimento jurídico para moradores de ${nome} e de toda a região de ${estado}.\n\nEm ${nome}/${uf}, as demandas jurídicas apresentam características específicas que conhecemos profundamente. A economia local é baseada em ${eco}, o que gera necessidades jurídicas particulares em áreas como direito trabalhista, previdenciário, consumerista e imobiliário. Nossa equipe multidisciplinar combina conhecimento técnico aprofundado com atendimento humanizado.\n\nEste guia apresenta os serviços jurídicos disponíveis para moradores de ${nome}, abrangendo Previdenciário, Trabalhista, Cível, do Consumidor, de Família e Imobiliário. Cada seção é elaborada com base na realidade de ${nome}/${uf}.`],
    areaContent: {
      previdenciario: `O Direito Previdenciário é uma das áreas mais demandadas em ${nome}/${uf}. Trabalhadores da região têm dúvidas sobre aposentadoria, auxílio-doença e pensão por morte. A reforma da previdência (EC 103/2019) trouxe mudanças significativas, e um advogado especializado é essencial para garantir o melhor benefício.\n\nEm ${nome}, com economia baseada em ${eco}, trabalhadores de diversas categorias precisam de orientação previdenciária. A Will & Pereira Advocacia realiza análise completa do histórico contributivo, identificando possibilidades de antecipação ou majoração da aposentadoria. Atendemos: aposentadoria por idade, tempo de contribuição e especial, auxílio-doença, pensão por morte, BPC/LOAS e revisões de benefícios.`,
      trabalhista: `O Direito Trabalhista protege relações entre empregados e empregadores. Em ${nome}/${uf}, oferecemos assessoria completa: verbas rescisórias, horas extras, FGTS, assédio moral e acidente de trabalho. A economia local baseada em ${eco} gera demandas trabalhistas específicas que conhecemos.\n\nAtuamos na defesa de trabalhadores que tiveram direitos violados e na consultoria preventiva para empresas. Principais direitos: pagamento correto de horas extras, verbas rescisórias, depósito do FGTS, estabilidade para acidentados e combate ao assédio.`,
      civel: `O Direito Cível abrange relações cotidianas. Em ${nome}/${uf}, atuamos em contratos, indenizações, cobranças, usucapião e questões de propriedade. A economia local baseada em ${eco} gera conflitos cíveis que exigem conhecimento aprofundado do Código Civil.\n\nTrabalhamos com elaboração e revisão de contratos, ações de cobrança, indenização por danos morais e materiais, usucapião e todas as questões cíveis que possam surgir no cotidiano dos moradores de ${nome}.`,
      consumidor: `O CDC protege moradores de ${nome}/${uf} contra abusos de empresas. Atendemos consumidores com produtos defeituosos, cobranças indevidas, negativas de planos de saúde e cláusulas abusivas. A economia local baseada em ${eco} gera demandas consumeristas que conhecemos.\n\nDominamos inversão do ônus da prova, repetição de indébito e indenização por danos morais, garantindo a reparação adequada para cada caso.`,
      familia: `O Direito de Família lida com questões sensíveis. Em ${nome}/${uf}, atendemos em divórcios, guarda, pensão alimentícia, inventários e união estável. Cada caso é tratado com discrição e profissionalismo.\n\nOferecemos mediação familiar, acordos consensuais e litígios quando necessário, sempre protegendo os direitos dos clientes, especialmente crianças e idosos.`,
      imobiliario: `O Direito Imobiliário regula questões de imóveis. Em ${nome}/${uf}, atuamos em compra e venda, locação, usucapião e regularização fundiária. A economia local baseada em ${eco} gera demandas imobiliárias que conhecemos.\n\nTrabalhamos com due diligence completa, elaboração de contratos e resolução de conflitos possessórios e condominiais.`,
    },
    exclusiva: `## Por Que Escolher a Will & Pereira Advocacia em ${nome}?\n\n**Experiência:** Mais de 15 anos de atuação em todas as áreas do Direito.\n\n**Conhecimento Local:** Conhecemos as particularidades de ${nome} e da região de ${estado}.\n\n**Atendimento Personalizado:** Cada caso recebe atenção individualizada.\n\n**Atuação Nacional:** Atendemos presencialmente e por videoconferência em todo o Brasil.\n\n**Transparência:** Honorários claros, sem surpresas.`,
    diaADia: `## Como um Advogado Pode Ajudar em ${nome}\n\n**Prevenção:** Análise de contratos, planejamento previdenciário, regularização de imóveis.\n\n**Resolução:** Muitos conflitos se resolvem sem ação judicial, economizando tempo.\n\n**Emergência:** Atendimento prioritário para situações urgentes.`,
    faqs: [
      {p:`Áreas mais comuns em ${nome}?`,r:`Em ${nome}/${uf}, as áreas variam conforme a economia (${eco}). Atuamos em todas com excelência.`},
      {p:`Como funciona o atendimento?`,r:`Presencial em Palhoça/SC e por videoconferência para todo o Brasil, incluindo ${nome}.`},
      {p:`Prazo para ação trabalhista?`,r:`Até 2 anos após a extinção do contrato, cobrando verbas dos últimos 5 anos.`},
      {p:`Atendem ${nome}?`,r:`Sim! Atendemos ${nome} e toda a região de ${uf}.`},
      {p:`Documentos para consulta?`,r:`Contratos, comprovantes e documentos pessoais relacionados à questão.`},
      {p:`Quanto custa?`,r:`Varia conforme o caso. Em muitos casos trabalhistas, trabalhamos com sucumbência.`},
    ],
    stats:{experiencia:'15+',clientes:'5000+',taxa:'98%',cidades:String(allMunicipios.length)},
  }
}

// Generate all missing
let gerados = 0, pulados = 0, erros = 0

for (const m of allMunicipios) {
  const uf = m.microrregiao?.mesorregiao?.UF?.sigla
  if (!uf) continue
  
  const slug = `advogado-em-${slugify(m.nome)}`
  if (existing.has(slug)) { pulados++; continue }
  
  try {
    const regiao = m.microrregiao?.mesorregiao?.nome || ''
    const conteudo = gerar(m.nome, uf, regiao)
    writeFileSync(join(contentDir, `${slug}.ts`), `export default ${JSON.stringify(conteudo, null, 2)}\n`)
    gerados++
    if (gerados % 500 === 0) console.log(`   ... ${gerados} gerados ...`)
  } catch(err) {
    erros++
  }
}

console.log(`\n📊 RESULTADO FINAL:`)
console.log(`   Total municípios IBGE: ${allMunicipios.length}`)
console.log(`   Já existentes: ${pulados}`)
console.log(`   Novos gerados: ${gerados}`)
console.log(`   Erros: ${erros}`)
console.log(`   Total arquivos: ${pulados + gerados}`)
