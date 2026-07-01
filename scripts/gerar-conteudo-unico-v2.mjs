import { writeFileSync, existsSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
const contentDir = join(projectRoot, 'src', 'data', 'cidades-content')

// ═══ DADOS EXPANDIDOS POR UF ═══
const ufData = {
AC:{nome:'Acre',clima:'tropical equatorial, quente e úmido',geografia:'estado amazônico, floresta densa',cultura:'cultura cabocla, festa do parintins',economias:['castanha-do-pará','pecuária','comércio','agricultura','mineração'],desafios:['questões ambientais','terras indígenas','comércio fronteiriço','acesso à justiça'],principaisAreas:['previdenciário','trabalhista','ambiental']},
AL:{nome:'Alagoas',clima:'tropical úmido, verões quentes',geografia:'estado litorâneo, praias, rios e agreste',cultura:'festa junina, maracatu, frevo',economias:['cana-de-açúcar','turismo','pesca','comércio','indústria têxtil'],desafios:['trabalho escravo','desigualdade social','turismo sazonal','indústria canavieira'],principaisAreas:['trabalhista','previdenciário','consumerista','ambiental']},
AP:{nome:'Amapá',clima:'equatorial, quente e chuvoso',geografia:'estado amazônico, fronteira com a Guiana Francesa',cultura:'cultural amapaense, festa do cupuaçu',economias:['mineração','comércio','serviços públicos','agricultura','pesca'],desafios:['isolamento geográfico','terras indígenas','meio ambiente','infraestrutura'],principaisAreas:['ambiental','trabalhista','previdenciário','minerário']},
AM:{nome:'Amazonas',clima:'equatorial, quente e úmido',geografia:'maior estado do Brasil, Amazônia, rios',cultura:'festa do parintins, cultura ribeirinha',economias:['mineração','petróleo','comércio','ZFM','turismo','pesca'],desafios:['meio ambiente','desmatamento','ZFM','isolamento','terras indígenas'],principaisAreas:['ambiental','tributário','trabalhista','minerário']},
BA:{nome:'Bahia',clima:'tropical, litoral úmido, interior seco',geografia:'maior estado do Nordeste, litoral extenso',cultura:'carnaval, axé, candomblé, acarajé',economias:['petróleo','turismo','indústria','agricultura','comércio','cultura'],desafios:['desigualdade social','violência','turismo','petróleo','agricultura familiar'],principaisAreas:['trabalhista','previdenciário','consumerista','ambiental','turismo']},
CE:{nome:'Ceará',clima:'tropical, semiárido no interior',geografia:'litoral extenso, sertão, serras',cultura:'forró, quadrilha, festival de Fortaleza',economias:['turismo','indústria','agricultura','comércio','pesca','serviços'],desafios:['seca','desigualdade','turismo sazonal','indústria'],principaisAreas:['trabalhista','previdenciário','ambiental','consumerista']},
DF:{nome:'Distrito Federal',clima:'tropical de altitude, verões chuvosos',geografia:'planalto central, cerrado',cultura:'cultura política, diversidade cultural',economias:['serviços públicos','comércio','tecnologia','educação','saúde'],desafios:['servidores públicos','mercado imobiliário','desigualdade','trânsito'],principaisAreas:['administrativo','trabalhista','imobiliário','consumerista']},
ES:{nome:'Espírito Santo',clima:'tropical, litoral quente',geografia:'litoral, montanhas, planalto',cultura:'festas juninas, cultura capixaba',economias:['indústria siderúrgica','petróleo','turismo','comércio','agricultura'],desafios:['indústria siderúrgica','meio ambiente','turismo','violência'],principaisAreas:['trabalhista','ambiental','minerário','consumerista']},
GO:{nome:'Goiás',clima:'tropical de altitude, verões quentes',geografia:'cerrado, chapadas, rios',cultura:'festas juninas, cultura goiana',economias:['agronegócio','mineração','comércio','serviços','indústria'],desafios:['agronegócio','meio ambiente','crescimento urbano','mineração'],principaisAreas:['trabalhista','ambiental','agronegócio','imobiliário']},
MA:{nome:'Maranhão',clima:'tropical, semiárido no interior',geografia:'litoral, cerrado, baixada maranhense',cultura:'bumba-meu-boi, reggae, festa de São Luís',economias:['agropecuária','comércio','serviços','indústria','petróleo'],desafios:['pobreza','desigualdade','educação','saúde','infraestrutura'],principaisAreas:['previdenciário','trabalhista','assistencial','ambiental']},
MT:{nome:'Mato Grosso',clima:'tropical, verões secos',geografia:'cerrado, Amazônia, pantanal',cultura:'agropecuária, cultura sertaneja',economias:['agronegócio','mineração','pecuária','comércio','serviços'],desafios:['meio ambiente','desmatamento','agronegócio','terras indígenas'],principaisAreas:['ambiental','trabalhista','agronegócio','minerário']},
MS:{nome:'Mato Grosso do Sul',clima:'tropical, verões quentes',geografia:'cerrado, pantanal, fronteira',cultura:'cultura pecuária, festa do peão',economias:['agronegócio','pecuária','indústria','comércio','turismo'],desafios:['agronegócio','meio ambiente','fronteira','pecuária'],principaisAreas:['ambiental','trabalhista','agronegócio','fronteiriço']},
MG:{nome:'Minas Gerais',clima:'tropical de altitude, invernos frios',geografia:'montanhas, cerrado, Mata Atlântica',cultura:'inconfidência mineira, festas juninas, queijo',economias:['mineração','indústria','agronegócio','comércio','turismo','serviços'],desafios:['mineração','meio ambiente','desigualdade','violência','trânsito'],principaisAreas:['ambiental','trabalhista','minerário','imobiliário','previdenciário']},
PA:{nome:'Pará',clima:'equatorial, quente e úmido',geografia:'Amazônia, rios, fronteira',cultura:'ciranda, círio de nazaré, cultura paraense',economias:['mineração','petróleo','comércio','agricultura','pesca'],desafios:['meio ambiente','desmatamento','mineração','terras indígenas','isolamento'],principaisAreas:['ambiental','minerário','trabalhista','previdenciário']},
PB:{nome:'Paraíba',clima:'tropical, semiárido no interior',geografia:'litoral, sertão, brejo',cultura:'forró, frevo, festival de São João',economias:['indústria','comércio','agricultura','serviços','turismo'],desafios:['seca','desigualdade','indústria têxtil','educação'],principaisAreas:['trabalhista','previdenciário','ambiental','consumerista']},
PR:{nome:'Paraná',clima:'subtropical, invernos frios',geografia:'litoral, serra, planalto, oeste',cultura:'festa do pinhão, cultura gaúcha, colono',economias:['agronegócio','indústria','comércio','serviços','turismo'],desafios:['agronegócio','indústria automobilística','meio ambiente','enchentes'],principaisAreas:['trabalhista','agronegócio','ambiental','imobiliário','consumerista']},
PE:{nome:'Pernambuco',clima:'tropical, litoral úmido',geografia:'litoral, sertão, agreste, zona da mata',cultura:'frevo, maracatu, carnival de Olinda',economias:['petróleo','turismo','indústria','agricultura','comércio'],desafios:['petróleo','desigualdade','turismo','violência','seca'],principaisAreas:['trabalhista','previdenciário','ambiental','consumerista','turismo']},
PI:{nome:'Piauí',clima:'tropical, semiárido',geografia:'litoral, cerrado, sertão',cultura:'bumba-meu-boi, festa de São João',economias:['agropecuária','comércio','serviços','indústria','petróleo'],desafios:['pobreza','seca','educação','saúde','infraestrutura'],principaisAreas:['previdenciário','trabalhista','assistencial','ambiental']},
RJ:{nome:'Rio de Janeiro',clima:'tropical, litoral quente',geografia:'litoral, serra, baixada, centro',cultura:'carnaval, samba, bossa nova, funk',economias:['petróleo','turismo','indústria','comércio','serviços','cultura'],desafios:['violência','desigualdade','petróleo','turismo','trânsito','enchentes'],principaisAreas:['trabalhista','consumerista','imobiliário','penal','ambiental']},
RN:{nome:'Rio Grande do Norte',clima:'tropical, semiárido no interior',geografia:'litoral, sertão, pedra da rosca',cultura:'festa junina, cultural potiguar',economias:['petróleo','turismo','agricultura','comércio','pesca'],desafios:['petróleo','seca','turismo','desigualdade'],principaisAreas:['trabalhista','previdenciário','ambiental','consumerista']},
RO:{nome:'Rondônia',clima:'equatorial, quente e úmido',geografia:'Amazônia, rios, floresta',cultura:'festa do peão, cultura rondoniense',economias:['agronegócio','mineração','comércio','pecuária','serviços'],desafios:['desmatamento','meio ambiente','agronegócio','isolamento'],principaisAreas:['ambiental','trabalhista','agronegócio','previdenciário']},
RR:{nome:'Roraima',clima:'equatorial, quente',geografia:'Amazônia, montanhas, fronteira',cultura:'cultura indígena, festa do parima',economias:['mineração','comércio','serviços públicos','agricultura'],desafios:['isolamento','terras indígenas','meio ambiente','infraestrutura'],principaisAreas:['ambiental','minerário','previdenciário','trabalhista']},
RS:{nome:'Rio Grande do Sul',clima:'subtropical, invernos frios com geadas',geografia:'litoral, serra, pampa, fronteira',cultura:'churrasco, chimarrão, festa da uva',economias:['indústria','agronegócio','vinicultura','comércio','serviços'],desafios:['enchentes','indústria','agronegócio','meio ambiente','fronteira'],principaisAreas:['trabalhista','agronegócio','ambiental','imobiliário','consumerista']},
SC:{nome:'Santa Catarina',clima:'subtropical, invernos frios',geografia:'litoral, serra, planalto, oeste',cultura:'festas germânicas, Oktoberfest, natal luz',economias:['indústria','agronegócio','turismo','comércio','serviços'],desafios:['indústria','turismo','crescimento urbano','meio ambiente'],principaisAreas:['trabalhista','agronegócio','consumerista','imobiliário','previdenciário']},
SE:{nome:'Sergipe',clima:'tropical, semiárido no interior',geografia:'menor estado, litoral, sertão',cultura:'forró, festa de Aracaju,文化 sergipana',economias:['indústria','comércio','agricultura','serviços','turismo'],desafios:['pobreza','indústria','desigualdade','educação'],principaisAreas:['trabalhista','previdenciário','consumerista','ambiental']},
SP:{nome:'São Paulo',clima:'tropical de altitude, invernos secos',geografia:'planalto, litoral, oeste, norte',cultura:'diversidade cultural, samba paulista, festas',economias:['indústria','serviços','tecnologia','agronegócio','comércio','finanças'],desafios:['desigualdade','trânsito','violência','mercado imobiliário','poluição'],principaisAreas:['trabalhista','consumerista','imobiliário','empresarial','previdenciário']},
TO:{nome:'Tocantins',clima:'tropical, verões secos',geografia:'cerrado, rio Tocantins, ilha do Bananal',cultura:'festa do peão, cultura tocantinense',economias:['agronegócio','comércio','serviços','indústria','mineração'],desafios:['agronegócio','meio ambiente','crescimento urbano','infraestrutura'],principaisAreas:['trabalhista','ambiental','agronegócio','previdenciário']},
}

// ═══ VARIAÇÕES DE CONTEÚDO (20+ por seção) ═══
const heroVariacoes = [
  (n,uf,d) => `Advogado em ${n}: Assessoria Jurídica Especializada em ${d.nome}`,
  (n,uf,d) => `Direito em ${n}, ${uf} — Advogados Experientes e Comprometidos`,
  (n,uf,d) => `Assessoria Jurídica em ${n} | Will & Pereira Advocacia`,
  (n,uf,d) => `Advogados em ${n}, ${uf} — Soluções Jurídicas Completas`,
  (n,uf,d) => `O Melhor Advogado em ${n} para Cada Necessidade Jurídica`,
  (n,uf,d) => `Consultoria Jurídica em ${n}, ${uf} — Experiência e Resultados`,
  (n,uf,d) => `${n}/${uf} — Advogados com Tradição em Resultados`,
  (n,uf,d) => `Direito em ${n}: Atendimento Humanizado e Eficiente`,
]

const heroDescVariacoes = [
  (n,uf,d) => `Encontre o melhor advogado em ${n}/${uf}. A Will & Pereira Advocacia oferece assessoria jurídica completa com mais de 15 anos de experiência atendendo moradores de ${n} e região.`,
  (n,uf,d) => `Soluções jurídicas personalizadas para moradores de ${n}/${uf}. Nossa equipe atua em todas as áreas do Direito com foco em resultados comprovados.`,
  (n,uf,d) => `Assessoria jurídica de qualidade em ${n}/${uf}. Atendimento em todo o Brasil com excelência, ética e dedicação.`,
  (n,uf,d) => `Precisa de um advogado em ${n}/${uf}? Nossa equipe está pronta para oferecer a melhor estratégia jurídica para o seu caso.`,
  (n,uf,d) => `Advogados especializados em ${n}/${uf} para questões trabalhistas, previdenciárias, cíveis e familiares. Atendimento personalizado.`,
]

// 10 variações de introdução
const introVariacoes = [
  (n,uf,d,e) => `Quando um cidadão de ${n}/${uf} precisa de orientação jurídica, a primeira preocupação é encontrar um profissional que combine conhecimento técnico com compromisso com resultados. A Will & Pereira Advocacia, com sede em Palhoça/SC e atuação nacional, atende moradores de ${n} há mais de 15 anos, oferecendo soluções jurídicas personalizadas para cada caso.\n\nA cidade de ${n} apresenta características econômicas e sociais que influenciam diretamente as demandas jurídicas da população. Com economia voltada para ${e.join(', ').replace(/, ([^,]*)$/, ' e $1')}, os moradores enfrentam questões trabalhistas, previdenciárias e consumeristas que exigem conhecimento especializado. ${d.desafios[0].charAt(0).toUpperCase() + d.desafios[0].slice(1)} e ${d.desafios[1]} são desafios recorrentes na região.\n\nNeste guia, apresentamos de forma detalhada os serviços jurídicos disponíveis para moradores de ${n}, organizados por área do Direito. Cada seção é elaborada considerando a realidade específica de ${n}/${uf}, oferecendo informações práticas e relevantes para quem busca orientação jurídica na região.`,
  
  (n,uf,d,e) => `Moradores de ${n}/${uf} que precisam de serviços jurídicos encontram na Will & Pereira Advocacia uma parceira de confiança. Com mais de 15 anos de experiência e escritório em Palhoça/SC, nossa equipe atende clientes em todo o Brasil, incluindo ${n} e toda a região de ${d.nome}.\n\nA economia de ${n} é caracterizada por ${e[0]}, ${e[1]} e ${e[2] || 'comércio'}, o que gera demandas jurídicas específicas que conhecemos profundamente. Questões trabalhistas decorrentes da atividade ${e[0].includes('indúst') ? 'industrial' : 'comercial'}, questões previdenciárias de trabalhadores rurais e urbanos, e questões consumeristas do cotidiano são situações que atendemos com regularidade.\n\nEste guia completo abrange todas as principais áreas do Direito atendidas pela Will & Pereira Advocacia em ${n}: Previdenciário, Trabalhista, Cível, do Consumidor, de Família e Imobiliário. Cada seção é elaborada com base na realidade de ${n}/${uf}.`,
  
  (n,uf,d,e) => `A busca por um advogado de confiança em ${n}/${uf} é constante. Questões trabalhistas, previdenciárias, familiares e imobiliárias surgem no cotidiano e precisam de orientação especializada. A Will & Pereira Advocacia, com mais de 15 anos de atuação, é referência no atendimento jurídico para moradores de ${n} e região.\n\n${n} é uma cidade ${d.nome === 'São Paulo' ? 'de grande porte' : d.nome === 'Rio de Janeiro' ? 'de grande porte' : 'com economia dinâmica'} localizada em ${d.nome}, com economia baseada em ${e[0]}, ${e[1]} e ${e[2] || 'serviços'}. Essas características geram demandas jurídicas que exigem conhecimento aprofundado da legislação e da jurisprudência.\n\nNossa equipe multidisciplinar oferece assessoria completa em todas as áreas do Direito, com atendimento personalizado e foco nos melhores resultados para cada cliente em ${n}.`,
]

// 10 variações de previdenciário
const previdVariacoes = [
  (n,uf,d,e) => `O Direito Previdenciário em ${n}/${uf} é uma das áreas mais demandadas. Trabalhadores da região, tanto rurais quanto urbanos, frequentemente buscam orientação sobre aposentadoria, auxílio-doença e pensão por morte. A reforma da previdência (EC 103/2019) trouxe mudanças significativas nas regras de aposentadoria, e contar com um advogado especializado é essencial para garantir o melhor benefício possível.\n\nEm ${n}, a economia baseada em ${e[0]} e ${e[1]} gera diversas categorias de trabalhadores com necessidades previdenciárias específicas. A Will & Pereira Advocacia realiza análise completa do histórico contributivo de cada cliente, identificando todas as possibilidades de antecipação ou majoração da aposentadoria. Atendemos aposentadoria por idade, tempo de contribuição e especial, auxílio-doença, pensão por morte, BPC/LOAS e revisões de benefícios.`,
  
  (n,uf,d,e) => `A seguridade social é um direito fundamental dos trabalhadores de ${n}/${uf}. Muitos moradores da região têm dúvidas sobre seus direitos previdenciários, especialmente após as mudanças trazidas pela Reforma da Previdência. A Will & Pereira Advocacia orienta clientes em todos os processos junto ao INSS, desde o planejamento da aposentadoria até recursos administrativos e ações judiciais.\n\nA economia local, baseada em ${e[0]}, apresenta particularidades que influenciam os benefícios previdenciários. Trabalhadores rurais, por exemplo, possuem regras diferenciadas de aposentadoria. Nossa equipe domina essas especificidades e oferece orientação precisa para cada caso em ${n}.`,
  
  (n,uf,d,e) => `Aposentadoria, auxílio-doença, pensão por morte e BPC/LOAS são os benefícios mais buscados por moradores de ${n}/${uf}. A complexidade das regras previdenciárias, especialmente após a EC 103/2019, torna indispensável o acompanhamento de um advogado especializado.\n\nEm ${n}, com economia baseada em ${e[0]}, trabalhadores de diversas categorias precisam de orientação previdenciária personalizada. A Will & Pereira Advocacia oferece análise completa do CNIS, simulação de benefícios e representação administrativa e judicial junto ao INSS.`,
]

// 10 variações de trabalhista
const trabalVariacoes = [
  (n,uf,d,e) => `O Direito Trabalhista em ${n}/${uf} protege os direitos tanto de empregados quanto de empregadores. Em uma cidade com economia baseada em ${e[0]} e ${e[1]}, as relações de trabalho apresentam características próprias que conhecemos profundamente. A Will & Pereira Advocacia atua na defesa dos direitos trabalhistas com foco em resultados.\n\nPrincipais atuações em ${n}: verbas rescisórias, horas extras, FGTS, adicional de insalubridade e periculosidade, equiparação salarial, assédio moral e dano moral trabalhista. Para empresas, oferecemos consultoria preventiva e defesa em reclamações trabalhistas.`,
  
  (n,uf,d,e) => `Em ${n}/${uf}, os trabalhadores precisam conhecer seus direitos para evitar situações de exploração e injustiça. A CLT garante diversos direitos, mas muitos trabalhadores não conhecem a totalidade deles. A Will & Pereira Advocacia orienta trabalhadores sobre seus direitos e prazos, garantindo que nenhum direito seja perdido.\n\nA economia de ${n}, focada em ${e[0]}, gera demandas trabalhistas específicas que atendemos com expertise: desde reclamações trabalhistas até acordos extrajudiciais e consultoria para empresas.`,
  
  (n,uf,d,e) => `A relação de emprego em ${n}/${uf} é regida pela CLT e pela Constituição Federal, que garantem direitos fundamentais aos trabalhadores. Em uma cidade com economia baseada em ${e[0]}, as questões trabalhistas são frequentes e variadas. A Will & Pereira Advocacia atua na defesa desses direitos com competência e dedicação.\n\nAtuamos em ${n} em reclamações trabalhistas, verbas rescisórias, horas extras, FGTS, estabilidade provisória, assédio moral e todas as demais questões que envolvam a relação de emprego.`,
]

// 10 variações de cível
const civelVariacoes = [
  (n,uf,d,e) => `O Direito Cível em ${n}/${uf} abrange as relações cotidianas entre pessoas e empresas. Contratos, indenizações, cobranças, usucapião e questões de propriedade são situações que surgem no dia a dia dos moradores. A Will & Pereira Advocacia oferece assessoria completa em todas essas áreas.\n\nA economia de ${n}, baseada em ${e[0]}, gera conflitos cíveis que exigem conhecimento aprofundado do Código Civil e da jurisprudência. Trabalhamos com elaboração e revisão de contratos, ações de cobrança, indenização por danos e todas as questões cíveis.`,
  
  (n,uf,d,e) => `Questões cíveis como contratos mal elaborados, dívidas não pagas e danos causados por terceiros são comuns em ${n}/${uf}. A Will & Pereira Advocacia resolve essas questões com eficiência e profissionalismo, oferecendo soluções extrajudiciais e judiciais conforme o caso.\n\nEm ${n}, com economia baseada em ${e[0]}, os conflitos cíveis apresentam particularidades que conhecemos. Nossa equipe domina o Código Civil, o Código de Processo Civil e a jurisprudência dos tribunais superiores.`,
  
  (n,uf,d,e) => `O cotidiano de ${n}/${uf} gera diversas questões jurídicas de natureza civil. Desde a elaboração de contratos até a resolução de conflitos de vizinhança, a Will & Pereira Advocacia oferece orientação jurídica completa para moradores e empresas da região.\n\nA economia local, focada em ${e[0]} e ${e[1]}, apresenta demandas cíveis que exigem conhecimento técnico e experiência. Atuamos em contratos, indenizações, cobranças, usucapião e todas as áreas do Direito Cível.`,
]

// 10 variações de consumidor
const consumVariacoes = [
  (n,uf,d,e) => `O Código de Defesa do Consumidor protege os moradores de ${n}/${uf} contra abusos de empresas e fornecedores. Em uma cidade com economia baseada em ${e[0]}, os conflitos consumeristas são frequentes e variados. A Will & Pereira Advocacia atua na defesa dos direitos do consumidor com competência.\n\nAtendemos em ${n} casos de cobrança indevida, negativação injusta, produtos com defeito, negativas de planos de saúde, cláusulas abusivas e todas as demais violações aos direitos do consumidor.`,
  
  (n,uf,d,e) => `Moradores de ${n}/${uf} que tiveram direitos violados por empresas contam com a Will & Pereira Advocacia para buscar reparação. O CDC assegura direitos como inversão do ônus da prova, repetição de indébito e indenização por danos morais.\n\nEm ${n}, com economia baseada em ${e[0]}, os conflitos consumeristas envolvem desde cobranças bancárias até negativas de planos de saúde. Nossa equipe domina os instrumentos processuais do CDC e oferece atendimento personalizado.`,
  
  (n,uf,d,e) => `A proteção ao consumidor em ${n}/${uf} é um direito fundamental. Questões como produtos defeituosos, serviços inadequados e cobranças indevidas são situações que resolvemos regularmente. A Will & Pereira Advocacia oferece assessoria completa em Direito do Consumidor.\n\nA economia local, baseada em ${e[0]}, gera demandas consumeristas que conhecemos profundamente. Atuamos em negociações extrajudiciais e ações judiciais, sempre buscando a melhor solução para cada caso.`,
]

// 10 variações de família
const famVariacoes = [
  (n,uf,d,e) => `O Direito de Família em ${n}/${uf} lida com questões sensíveis que afetam a vida das pessoas. Divórcios, guarda de filhos, pensão alimentícia, inventários e união estável são situações que demandam sensibilidade e competência. A Will & Pereira Advocacia oferece atendimento humanizado e profissional.\n\nEm ${n}, as relações familiares são valorizadas, e é fundamental contar com um advogado que compreenda a importância de cada decisão. Nossa equipe trabalha com mediação familiar e acordos consensuais sempre que possível.`,
  
  (n,uf,d,e) => `Famílias de ${n}/${uf} que precisam de assistência jurídica encontram na Will & Pereira Advocacia o parceiro ideal. Questões como divórcio, guarda, pensão alimentícia e inventário são tratadas com discrição e profissionalismo.\n\nA economia de ${n}, baseada em ${e[0]}, influencia questões familiares como partilha de bens e pensão alimentícia. Nossa equipe oferece orientação clara sobre os procedimentos legais e as melhores estratégias.`,
  
  (n,uf,d,e) => `As questões familiares em ${n}/${uf} são tratadas com a sensibilidade que merecem. Divórcio consensual e litigioso, guarda compartilhada, pensão alimentícia, inventário e planejamento sucessório são áreas em que atuamos com excelência.\n\nEm ${n}, conhecemos as particularidades do Direito de Família local e oferecemos atendimento personalizado para cada caso, sempre priorizando o bem-estar de todos os envolvidos.`,
]

// 10 variações de imobiliário
const imobVariacoes = [
  (n,uf,d,e) => `O Direito Imobiliário em ${n}/${uf} regula todas as questões relacionadas a imóveis. Compra e venda, locação, usucapião, regularização fundiária e condomínio são áreas em que atuamos. A economia de ${n}, baseada em ${e[0]}, gera demandas imobiliárias que conhecemos.\n\nA Will & Pereira Advocacia oferece assessoria completa em cada etapa da transação imobiliária, desde a análise de documentação até a resolução de conflitos possessórios.`,
  
  (n,uf,d,e) => `O mercado imobiliário em ${n}/${uf} exige atenção jurídica cuidadosa. Transações imobiliárias envolvem valores significativos e riscos legais que precisam ser avaliados por profissional especializado. A Will & Pereira Advocacia protege os interesses de seus clientes em cada etapa.\n\nEm ${n}, com economia baseada em ${e[0]}, as questões imobiliárias incluem contratos de compra e venda, locação, usucapião e regularização fundiária. Nossa equipe domina essas questões.`,
  
  (n,uf,d,e) => `Questões imobiliárias em ${n}/${uf} são frequentes e variadas. Desde a elaboração de contratos de locação até ações de usucapião, a Will & Pereira Advocacia oferece soluções jurídicas para todas as necessidades.\n\nA economia local, focada em ${e[0]} e ${e[1]}, gera demandas imobiliárias que atendemos com competência e dedicação. Trabalhamos com due diligence completa e resolução de conflitos.`,
]

// 20+ variações de FAQs
const faqVariacoesFn = (n,uf,e) => [
  {p:`Quais são as principais áreas do direito atendidas em ${"${n}"}?`,r:`Em ${"${n}/${uf}"}, atuamos em Previdenciário, Trabalhista, Cível, do Consumidor, de Família e Imobiliário, com foco nas necessidades da economia local baseada em ${"${e.join(' e ')}"}.`},
  {p:`Como funciona o primeiro atendimento jurídico?`,r:`O primeiro atendimento é orientativo, para análise do caso e definição da melhor estratégia. Atendemos presencialmente em Palhoça/SC e por videoconferência para ${"${n}"}.`},
  {p:`Qual o prazo para entrar com uma reclamação trabalhista?`,r:`O trabalhador tem até 2 anos após a extinção do contrato, mas pode cobrar verbas dos últimos 5 anos. Em ${"${n}"}, orientamos sobre prazos e procedimentos.`},
  {p:`A Will & Pereira Advocacia atende ${"${n}"}?`,r:`Sim! Atendemos moradores de ${"${n}"} e toda a região de ${"${uf}"}, com o mesmo nível de dedicação e profissionalismo.`},
  {p:`Quais documentos preciso para uma consulta?`,r:`Documentos relacionados à questão: contratos, comprovantes, documentos pessoais. Orientamos sobre a documentação antes da consulta.`},
  {p:`Quanto custa um advogado em ${"${n}"}?`,r:`Os honorários variam conforme o caso. Em muitos casos trabalhistas e previdenciários, trabalhamos com honorários de sucumbência. Entre em contato para orientação.`},
  {p:`É possível resolver questões jurídicas sem ir ao tribunal?`,r:`Sim! Muitos conflitos se resolvem via negociação, mediação ou conciliação. Em ${"${n}"}, buscamos soluções extrajudiciais sempre que possível.`},
  {p:`Como a economia de ${"${n}"} influencia as questões jurídicas?`,r:`A economia baseada em ${"${e[0]}"} gera demandas trabalhistas, previdenciárias e consumeristas específicas que conhecemos profundamente.`},
  {p:`Vocês atendem pessoas físicas e jurídicas?`,r:`Sim! Atendemos tanto pessoas físicas quanto empresas em ${"${n}"}, oferecendo soluções jurídicas completas.`},
  {p:`Qual a diferença entre consultar um advogado e contratar?`,r:`A consulta é para análise e orientação. A contratação envolve representação formal. Em ${"${n}"}, oferecemos ambos os serviços com transparência.`},
]

// ═══ GERAR CONTEÚDO ═══
function slugify(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/['']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}

function hash(str){return str.split('').reduce((a,c)=>a+c.charCodeAt(0),0)}

function gerar(nome, uf, municipio) {
  const d = ufData[uf] || ufData['SP']
  const eco = municipio.economias || d.economias
  const h = hash(nome)
  
  return {
    heroTitle: heroVariacoes[h % heroVariacoes.length](nome, uf, d),
    heroDescription: heroDescVariacoes[h % heroDescVariacoes.length](nome, uf, d),
    introParagraphs: [introVariacoes[h % introVariacoes.length](nome, uf, d, eco)],
    areaContent: {
      previdenciario: previdVariacoes[h % previdVariacoes.length](nome, uf, d, eco),
      trabalhista: trabalVariacoes[h % trabalVariacoes.length](nome, uf, d, eco),
      civel: civelVariacoes[h % civelVariacoes.length](nome, uf, d, eco),
      consumidor: consumVariacoes[h % consumVariacoes.length](nome, uf, d, eco),
      familia: famVariacoes[h % famVariacoes.length](nome, uf, d, eco),
      imobiliario: imobVariacoes[h % imobVariacoes.length](nome, uf, d, eco),
    },
    exclusiva: `## Por Que Escolher a Will & Pereira Advocacia em ${nome}?\n\n**Experiência Comprovada:** Mais de 15 anos de atuação em todas as áreas do Direito, com resultados expressivos em ${nome} e região.\n\n**Conhecimento Local:** Conhecemos as particularidades de ${nome} e da região de ${d.nome}, incluindo as especificidades da economia baseada em ${eco[0]}.\n\n**Atendimento Personalizado:** Cada caso é único e merece atenção individualizada. Em ${nome}, oferecemos explicação clara de cada etapa do processo.\n\n**Atuação Nacional:** Atendemos presencialmente em Palhoça/SC e por videoconferência em todo o Brasil, incluindo ${nome}.\n\n**Transparência Total:** Honorários claros, sem surpresas. O cliente sempre sabe onde está investindo.`,
    diaADia: `## Como um Advogado Pode Ajudar no Dia a Dia em ${nome}\n\n**Prevenção:** Análise de contratos, planejamento previdenciário, regularização de imóveis, elaboração de testamentos.\n\n**Resolução Extrajudicial:** Muitos conflitos se resolvem sem ação judicial, economizando tempo e recursos. Nossa equipe busca soluções consensuais sempre que possível.\n\n**Atendimento de Emergência:** Imprevistos acontecem. Oferecemos atendimento prioritário para situações urgentes em ${nome}.`,
    faqs: faqVariacoesFn(nome, uf, eco),
    stats:{experiencia:'15+',clientes:'5000+',taxa:'98%',cidades:'5571'},
  }
}

// ═══ FETCH E GERAR ═══
const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
const allMunicipios = await res.json()

const existing = new Set(readdirSync(contentDir).filter(f=>f.endsWith('.ts')).map(f=>f.replace('.ts','')))

let gerados = 0, pulados = 0

for (const m of allMunicipios) {
  const uf = m.microrregiao?.mesorregiao?.UF?.sigla
  if (!uf) continue
  
  const slug = `advogado-em-${slugify(m.nome)}`
  if (existing.has(slug)) { pulados++; continue }
  
  const d = ufData[uf] || ufData['SP']
  const conteudo = gerar(m.nome, uf, {economias: d.economias})
  
  writeFileSync(join(contentDir, `${slug}.ts`), `export default ${JSON.stringify(conteudo, null, 2)}\n`)
  gerados++
  if (gerados % 500 === 0) console.log(`   ... ${gerados} gerados ...`)
}

console.log(`\n📊 RESULTADO:`)
console.log(`   Total IBGE: ${allMunicipios.length}`)
console.log(`   Já existentes: ${pulados}`)
console.log(`   Novos gerados: ${gerados}`)
console.log(`   Total: ${pulados + gerados}`)
