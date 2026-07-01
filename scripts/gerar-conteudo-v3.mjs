import { writeFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
const contentDir = join(projectRoot, 'src', 'data', 'cidades-content')

const ufData = {
AC:{nome:'Acre',clima:'tropical equatorial',economias:['castanha-do-pará','pecuária','comércio'],desafios:['meio ambiente','terras indígenas','comércio fronteiriço']},
AL:{nome:'Alagoas',clima:'tropical úmido',economias:['cana-de-açúcar','turismo','pesca'],desafios:['trabalho escravo','desigualdade','turismo sazonal']},
AP:{nome:'Amapá',clima:'equatorial',economias:['mineração','comércio','serviços públicos'],desafios:['isolamento','terras indígenas','meio ambiente']},
AM:{nome:'Amazonas',clima:'equatorial',economias:['mineração','petróleo','comércio'],desafios:['meio ambiente','desmatamento','ZFM']},
BA:{nome:'Bahia',clima:'tropical',economias:['petróleo','turismo','indústria'],desafios:['desigualdade','violência','turismo']},
CE:{nome:'Ceará',clima:'tropical',economias:['turismo','indústria','agricultura'],desafios:['seca','desigualdade','turismo']},
DF:{nome:'Distrito Federal',clima:'tropical de altitude',economias:['serviços públicos','comércio','tecnologia'],desafios:['servidores públicos','mercado imobiliário','desigualdade']},
ES:{nome:'Espírito Santo',clima:'tropical',economias:['indústria siderúrgica','petróleo','turismo'],desafios:['indústria siderúrgica','meio ambiente','turismo']},
GO:{nome:'Goiás',clima:'tropical de altitude',economias:['agronegócio','mineração','comércio'],desafios:['agronegócio','meio ambiente','mineração']},
MA:{nome:'Maranhão',clima:'tropical',economias:['agropecuária','comércio','serviços'],desafios:['pobreza','desigualdade','educação']},
MT:{nome:'Mato Grosso',clima:'tropical',economias:['agronegócio','mineração','pecuária'],desafios:['meio ambiente','desmatamento','agronegócio']},
MS:{nome:'Mato Grosso do Sul',clima:'tropical',economias:['agronegócio','pecuária','indústria'],desafios:['agronegócio','meio ambiente','fronteira']},
MG:{nome:'Minas Gerais',clima:'tropical de altitude',economias:['mineração','indústria','agronegócio'],desafios:['mineração','meio ambiente','desigualdade']},
PA:{nome:'Pará',clima:'equatorial',economias:['mineração','petróleo','comércio'],desafios:['meio ambiente','desmatamento','mineração']},
PB:{nome:'Paraíba',clima:'tropical',economias:['indústria','comércio','agricultura'],desafios:['seca','desigualdade','indústria têxtil']},
PR:{nome:'Paraná',clima:'subtropical',economias:['agronegócio','indústria','comércio'],desafios:['agronegócio','indústria automobilística','meio ambiente']},
PE:{nome:'Pernambuco',clima:'tropical',economias:['petróleo','turismo','indústria'],desafios:['petróleo','desigualdade','turismo']},
PI:{nome:'Piauí',clima:'tropical',economias:['agropecuária','comércio','serviços'],desafios:['pobreza','seca','educação']},
RJ:{nome:'Rio de Janeiro',clima:'tropical',economias:['petróleo','turismo','indústria'],desafios:['violência','desigualdade','petróleo']},
RN:{nome:'Rio Grande do Norte',clima:'tropical',economias:['petróleo','turismo','agricultura'],desafios:['petróleo','seca','turismo']},
RO:{nome:'Rondônia',clima:'equatorial',economias:['agronegócio','mineração','comércio'],desafios:['desmatamento','meio ambiente','agronegócio']},
RR:{nome:'Roraima',clima:'equatorial',economias:['mineração','comércio','serviços públicos'],desafios:['isolamento','terras indígenas','meio ambiente']},
RS:{nome:'Rio Grande do Sul',clima:'subtropical',economias:['indústria','agronegócio','vinicultura'],desafios:['enchentes','indústria','agronegócio']},
SC:{nome:'Santa Catarina',clima:'subtropical',economias:['indústria','agronegócio','turismo'],desafios:['indústria','turismo','crescimento urbano']},
SE:{nome:'Sergipe',clima:'tropical',economias:['indústria','comércio','agricultura'],desafios:['pobreza','indústria','desigualdade']},
SP:{nome:'São Paulo',clima:'tropical de altitude',economias:['indústria','serviços','tecnologia'],desafios:['desigualdade','trânsito','violência']},
TO:{nome:'Tocantins',clima:'tropical',economias:['agronegócio','comércio','serviços'],desafios:['agronegócio','meio ambiente','crescimento urbano']},
}

function slugify(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/['']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function hash(s){return s.split('').reduce((a,c)=>a+c.charCodeAt(0),0)}

function gerar(nome, uf) {
  const d = ufData[uf] || ufData['SP']
  const eco = d.economias.join(', ')
  const ecoE = d.economias.slice(0,2).join(' e ')
  const h = hash(nome)
  const n = nome
  
  // Keyword strings
  const kw1 = `advogado em ${n}`
  const kw2 = `advocacia em ${n}`
  const kw3 = `advogados em ${n}`
  
  return {
    heroTitle: `${h%2===0 ? 'Advogado' : 'Advocacia'} em ${n}: Assessoria Jurídica Especializada em ${d.nome}`,
    heroDescription: `Encontre o melhor ${kw1}/${uf}. A Will & Pereira Advocacia oferece assessoria jurídica completa com mais de 15 anos de experiência atendendo moradores de ${n} e região.`,
    introParagraphs: [
      `Quando um cidadão de ${n}/${uf} precisa de orientação jurídica, a primeira preocupação é encontrar um profissional que combine conhecimento técnico com compromisso com resultados. A ${kw2}, com sede em Palhoça/SC e atuação nacional, atende moradores de ${n} há mais de 15 anos, oferecendo soluções jurídicas personalizadas para cada caso. Seja qual for a sua necessidade jurídica em ${n}, nossa equipe está pronta para ajudar.\n\nA cidade de ${n} apresenta características econômicas e sociais que influenciam diretamente as demandas jurídicas da população. Com economia voltada para ${eco}, os moradores enfrentam questões trabalhistas, previdenciárias e consumeristas que exigem conhecimento especializado. Um ${kw1} experiente é fundamental para navegar por essas questões com segurança.\n\nNeste guia completo sobre ${kw1}, apresentamos de forma detalhada os serviços jurídicos disponíveis para moradores de ${n}, organizados por área do Direito. Cada seção é elaborada considerando a realidade específica de ${n}/${uf}, oferecendo informações práticas e relevantes para quem busca um ${kw1} de confiança na região.`
    ],
    areaContent: {
      previdenciario: `O Direito Previdenciário é uma das áreas mais demandadas por quem busca um ${kw1}. Trabalhadores de ${n}/${uf}, tanto rurais quanto urbanos, frequentemente buscam orientação sobre aposentadoria, auxílio-doença e pensão por morte. A reforma da previdência (EC 103/2019) trouxe mudanças significativas, e contar com um ${kw1} especializado é essencial para garantir o melhor benefício.\n\nEm ${n}, a economia baseada em ${ecoE} gera diversas categorias de trabalhadores com necessidades previdenciárias específicas. A ${kw2} realiza análise completa do histórico contributivo, identificando possibilidades de antecipação ou majoração da aposentadoria. Se você precisa de um ${kw1} para questões previdenciárias, entre em contato conosco.`,
      
      trabalhista: `O Direito Trabalhista protege os direitos de trabalhadores e empregadores em ${n}/${uf}. Em uma cidade com economia baseada em ${ecoE}, as relações de trabalho apresentam características próprias. Um ${kw1} especializado é fundamental para garantir que seus direitos sejam respeitados.\n\nA ${kw2} atua em ${n} em verbas rescisórias, horas extras, FGTS, insalubridade, periculosidade, equiparação salarial, assédio moral e dano moral trabalhista. Se você procura um ${kw1} para questões trabalhistas, nossa equipe está preparada para oferecer a melhor orientação.`,
      
      civel: `O Direito Cível abrange as relações cotidianas em ${n}/${uf}. Contratos, indenizações, cobranças, usucapião e questões de propriedade são situações que surgem no dia a dia. Um ${kw1} competente é essencial para resolver essas questões com eficiência.\n\nA ${kw2} oferece assessoria completa em ${n} em todas as áreas do Direito Cível. Trabalhamos com elaboração e revisão de contratos, ações de cobrança, indenização por danos e todas as questões que envolvam o Código Civil.`,
      
      consumidor: `O Código de Defesa do Consumidor protege os moradores de ${n}/${uf} contra abusos. Em uma cidade com economia baseada em ${ecoE}, os conflitos consumeristas são frequentes. Um ${kw1} especializado em Direito do Consumidor é fundamental para fazer valer seus direitos.\n\nA ${kw2} atua em ${n} em casos de cobrança indevida, negativação injusta, produtos com defeito, negativas de planos de saúde e cláusulas abusivas. Se você precisa de um ${kw1} para questões consumeristas, entre em contato.`,
      
      familia: `O Direito de Família em ${n}/${uf} lida com questões sensíveis que afetam a vida das pessoas. Divórcios, guarda de filhos, pensão alimentícia, inventários e união estável demandam sensibilidade e competência. Um ${kw1} humanizado faz toda a diferença.\n\nA ${kw2} oferece atendimento personalizado em ${n} para todas as questões de Direito de Família. Nossa equipe trabalha com mediação familiar e acordos consensuais, sempre priorizando o bem-estar de todos os envolvidos.`,
      
      imobiliario: `O Direito Imobiliário regula questões de imóveis em ${n}/${uf}. Compra e venda, locação, usucapião e regularização fundiária são áreas que exigem conhecimento jurídico específico. Um ${kw1} especializado em Direito Imobiliário protege seus interesses em cada etapa.\n\nA ${kw2} oferece assessoria completa em ${n} para todas as questões imobiliárias, desde a análise de documentação até a resolução de conflitos possessórios e condominiais.`
    },
    exclusiva: `## Por Que Escolher a ${kw2}?\n\n**Experiência:** Mais de 15 anos de atuação como ${kw1} em todas as áreas do Direito.\n\n**Conhecimento Local:** Conhecemos as particularidades de ${n} e da região de ${d.nome}.\n\n**Atendimento Personalizado:** Cada caso é único e merece atenção individualizada.\n\n**Atuação Nacional:** Atendemos presencialmente em Palhoça/SC e por videoconferência em todo o Brasil.\n\n**Transparência:** Honorários claros, sem surpresas.`,
    
    diaADia: `## Como um ${kw1} Pode Ajudar no Dia a Dia\n\n**Prevenção:** Análise de contratos, planejamento previdenciário, regularização de imóveis.\n\n**Resolução Extrajudicial:** Muitos conflitos se resolvem sem ação judicial.\n\n**Emergência:** Atendimento prioritário para situações urgentes em ${n}.`,
    
    faqs: [
      {p:`Quem é o melhor ${kw1}?`,r:`A ${kw2} é referência em ${n}/${uf}, com mais de 15 anos de experiência e atuação em todas as áreas do Direito. Entre em contato para orientação jurídica.`},
      {p:`Como funciona o atendimento de um ${kw1}?`,r:`O primeiro atendimento é orientativo. Atendemos presencialmente em Palhoça/SC e por videoconferência para ${n}. Analisamos seu caso e definimos a melhor estratégia.`},
      {p:`Qual o prazo para ação trabalhista com um ${kw1}?`,r:`Até 2 anos após a extinção do contrato, mas pode cobrar verbas dos últimos 5 anos. Um ${kw1} em ${n} orienta sobre prazos e procedimentos.`},
      {p:`A ${kw2} atende ${n}?`,r:`Sim! Atendemos moradores de ${n} e toda a região de ${uf}, com o mesmo nível de dedicação e profissionalismo.`},
      {p:`Quais áreas um ${kw1} atende em ${n}?`,r:`Previdenciário, Trabalhista, Cível, do Consumidor, de Família e Imobiliário. A ${kw2} cobre todas essas áreas com excelência.`},
      {p:`Quanto custa um ${kw1} em ${n}?`,r:`Os honorários variam conforme o caso. Em muitos casos trabalhistas e previdenciários, trabalhamos com sucumbência. Entre em contato para orientação.`},
      {p:`É possível resolver sem tribunal com um ${kw1}?`,r:`Sim! Muitos conflitos se resolvem via negociação ou mediação. Um ${kw1} em ${n} busca soluções extrajudiciais quando possível.`},
      {p:`Um ${kw1} pode ajudar com INSS em ${n}?`,r:`Sim! A ${kw2} atua em aposentadorias, auxílios, pensões e revisões de benefícios do INSS para moradores de ${n}.`},
      {p:`Preciso ir ao escritório do ${kw1}?`,r:`Não necessariamente. Atendemos por videoconferência para todo o Brasil, incluindo ${n}. Mas também recebemos presencialmente em Palhoça/SC.`},
      {p:`Como um ${kw1} pode ajudar minha empresa em ${n}?`,r:`Consultoria trabalhista, contratos, questões societárias e tributárias. A ${kw2} oferece assessoria completa para empresas em ${n}.`},
    ],
    stats:{experiencia:'15+',clientes:'5000+',taxa:'98%',cidades:'5571'},
  }
}

// Fetch and generate
const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
const allMunicipios = await res.json()
const existing = new Set(readdirSync(contentDir).filter(f=>f.endsWith('.ts')).map(f=>f.replace('.ts','')))

let gerados = 0, pulados = 0
for (const m of allMunicipios) {
  const uf = m.microrregiao?.mesorregiao?.UF?.sigla
  if (!uf) continue
  const slug = `advogado-em-${slugify(m.nome)}`
  if (existing.has(slug)) { pulados++; continue }
  
  const conteudo = gerar(m.nome, uf)
  writeFileSync(join(contentDir, `${slug}.ts`), `export default ${JSON.stringify(conteudo, null, 2)}\n`)
  gerados++
  if (gerados % 500 === 0) console.log(`   ... ${gerados} ...`)
}

console.log(`\n📊 ${gerados} novos, ${pulados} existentes, ${pulados+gerados} total`)
