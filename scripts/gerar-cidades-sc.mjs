#!/usr/bin/env node
/**
 * Gerador de cidades SC faltantes + re-geração com 3000+ palavras
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')

// ═══ MUNICÍPIOS SC FALTANTES ═══
const novasCidades = [
  { nome: 'Angelina', regiao: 'Litoral Norte', porte: 'pequena', economia: 'Agricultura, Turismo e Comércio', populacao: '5.500' },
  { nome: 'Botuverá', regiao: 'Grande Florianópolis', porte: 'pequena', economia: 'Agricultura, Turismo Rural e Serviços', populacao: '4.500' },
  { nome: 'Canela', regiao: 'Vale do Itajaí', porte: 'pequena', economia: 'Turismo, Agricultura e Comércio', populacao: '12.000' },
  { nome: 'Cocal do Sul', regiao: 'Sul Catarinense', porte: 'pequena', economia: 'Indústria, Agricultura e Comércio', populacao: '16.000' },
  { nome: 'Concórdia', regiao: 'Oeste Catarinense', porte: 'media', economia: 'Agroindústria Avícola, Comércio e Serviços', populacao: '74.000' },
  { nome: 'Itacorubi', regiao: 'Grande Florianópolis', porte: 'pequena', economia: 'Agricultura, Comércio e Serviços', populacao: '5.000' },
  { nome: 'Itapiranga', regiao: 'Oeste Catarinense', porte: 'pequena', economia: 'Agroindústria, Comércio e Agricultura', populacao: '15.000' },
  { nome: 'Itapirubá', regiao: 'Sul Catarinense', porte: 'pequena', economia: 'Turismo, Pesca e Comércio', populacao: '8.500' },
  { nome: 'Itapocu', regiao: 'Norte Catarinense', porte: 'pequena', economia: 'Agricultura, Pesca e Comércio', populacao: '6.000' },
  { nome: 'Itapoúma', regiao: 'Norte Catarinense', porte: 'pequena', economia: 'Agricultura, Pecuária e Comércio', populacao: '8.000' },
  { nome: 'Itapuíma', regiao: 'Norte Catarinense', porte: 'pequena', economia: 'Agricultura, Comércio e Serviços', populacao: '4.000' },
  { nome: 'Jupiá', regiao: 'Oeste Catarinense', porte: 'pequena', economia: 'Agricultura, Pecuária e Comércio', populacao: '3.500' },
  { nome: 'Major Gercino', regiao: 'Grande Florianópolis', porte: 'pequena', economia: 'Agricultura, Turismo e Serviços', populacao: '3.500' },
  { nome: 'Manhumirim', regiao: 'Norte Catarinense', porte: 'pequena', economia: 'Agricultura, Indústria e Comércio', populacao: '5.000' },
  { nome: 'Morro da Fumaça', regiao: 'Sul Catarinense', porte: 'pequena', economia: 'Indústria, Agricultura e Comércio', populacao: '18.000' },
  { nome: 'Orleans', regiao: 'Sul Catarinense', porte: 'media', economia: 'Indústria, Agricultura e Comércio', populacao: '33.000' },
  { nome: 'Pangaré', regiao: 'Norte Catarinense', porte: 'pequena', economia: 'Agricultura, Pecuária e Comércio', populacao: '2.500' },
  { nome: 'Paula Freitas', regiao: 'Norte Catarinense', porte: 'pequena', economia: 'Agricultura, Comércio e Serviços', populacao: '3.000' },
  { nome: 'Piratuba', regiao: 'Norte Catarinense', porte: 'pequena', economia: 'Agricultura, Comércio e Serviços', populacao: '8.000' },
  { nome: 'Rancho Queimado', regiao: 'Grande Florianópolis', porte: 'pequena', economia: 'Agricultura, Turismo Rural e Comércio', populacao: '3.500' },
  { nome: 'São João Batista', regiao: 'Grande Florianópolis', porte: 'media', economia: 'Indústria, Comércio e Serviços', populacao: '33.000' },
  { nome: 'São João do Itaperiú', regiao: 'Litoral Sul', porte: 'pequena', economia: 'Agricultura, Pesca e Comércio', populacao: '5.000' },
  { nome: 'Siderópolis', regiao: 'Sul Catarinense', porte: 'pequena', economia: 'Indústria Cerâmica, Agricultura e Comércio', populacao: '14.000' },
  { nome: 'Vacari', regiao: 'Norte Catarinense', porte: 'pequena', economia: 'Agricultura, Pecuária e Comércio', populacao: '3.000' },
]

// ═══ DADOS REGIONAIS EXPANDIDOS ═══
const dadosRegiao = {
  'Grande Florianópolis': {
    contexto: 'A região metropolitana de Florianópolis é a área mais desenvolvida de Santa Catarina, com PIB per capita entre os maiores do Brasil. A proximidade com a capital gera alta demanda por serviços jurídicos em todas as áreas, com destaque para direito imobiliário (mercado aquecido), trabalhista (grande polo de serviços) e consumerista (forte consumo). A região abriga universidades renomadas como a UFSC, o que gera demanda por direito educacional e trabalhista no meio acadêmico.',
    desafiosJuridicos: 'O rápido crescimento imobiliário gera conflitos de vizinhança, questões de condomínio e usucapião. A alta concentração de empresas de tecnologia traz demandas trabalhistas específicas, como contratos de estágio, home office e trabalho terceirizado. O turismo intenso gera questões de direito do consumidor e administrativo.',
    economiaLocal: 'Tecnologia, turismo, comércio varejista, serviços financeiros, educação superior e construção civil. A ilha concentra startups e empresas de tecnologia, enquanto o continente abriga indústrias e comércio.',
  },
  'Sul Catarinense': {
    contexto: 'O Sul Catarinense é uma das regiões mais industrializadas do estado, com destaque para a indústria cerâmica (Criciúma), têxtil e metalúrgica. A região possui forte tradição imigratória italiana e alemã, refletida na cultura e economia local. O comércio é forte em todas as cidades, e a agricultura familiar complementa a economia.',
    desafiosJuridicos: 'A industrialização gera alta demanda por direito trabalhista, com casos de insalubridade, periculosidade e acidentes de trabalho. A indústria cerâmica apresenta questões ambientais específicas. O comércio forte gera demandas consumeristas. A agricultura familiar traz questões previdenciárias (segurado especial) e de direito agrário.',
    economiaLocal: 'Indústria cerâmica, têxtil, metalúrgica, agroindústria, comércio varejista e turismo litorâneo.',
  },
  'Norte Catarinense': {
    contexto: 'O Norte Catarinense é o polo industrial mais expressivo do estado, com Joinville como maior cidade. A região abriga grandes indústrias como WEG, Embraer e Hering, gerando enorme demanda por serviços jurídicos trabalhistas e corporativos. A proximidade com Florianópolis e o litoral gera também demandas imobiliárias e consumeristas.',
    desafiosJuridicos: 'A grande concentração industrial gera alta demanda por direito trabalhista, com casos complexos de equiparação salarial, acidentes de trabalho e assédio moral. O crescimento acelerado traz questões urbanísticas e ambientais. A presença de multinacionais gera demandas de direito societário e contratual.',
    economiaLocal: 'Indústria metalúrgica, têxtil, de transformação, tecnologia, comércio varejista e turismo.',
  },
  'Vale do Itajaí': {
    contexto: 'O Vale do Itajaí é polo têxtil e de moda da América Latina, com Blumenau como centro. A região possui forte economia exportadora e é sede de eventos internacionais como a Oktoberfest. O turismo cultural e gastronômico complementa a economia industrial.',
    desafiosJuridicos: 'A indústria têxtil gera demanda trabalhista específica (trabalho em turno, insalubridade, direitos de trabalhadores temporários). O turismo internacional traz questões de direito do consumidor e migratório. As enchentes recorrentes geram demandas de direito ambiental e de seguros.',
    economiaLocal: 'Indústria têxtil, moda, calçados, agroindústria, turismo cultural e gastronômico.',
  },
  'Oeste Catarinense': {
    contexto: 'O Oeste Catarinense é polo agroindustrial de referência nacional, com destaque para avicultura, suinocultura e processamento de carnes. Chapecó é o centro econômico, abrigando a BRF (antiga Sadia/Perdigão). A região tem forte tradição colonizadora italiana e alemã.',
    desafiosJuridicos: 'A agroindústria gera demanda por direito ambiental (resíduos, emissões, uso da água), trabalhista (condições de trabalho em frigoríficos) e contratual (contratos com grandes redes varejistas). A agricultura familiar traz questões previdenciárias e de direito agrário. O agronegócio gera demandas de direito societário e tributário.',
    economiaLocal: 'Agroindústria avícola, suinícola, processamento de carnes, agricultura, comércio e serviços.',
  },
  'Serra Catarinense': {
    contexto: 'A Serra Catarinense é polo turístico de referência, especialmente no inverno, quando atrai turistas de todo o Brasil para curtir a neve. A região possui clima temperado, tradição gaúcha e economia baseada em turismo, agricultura e pecuária. Lages é o centro urbano da região.',
    desafiosJuridicos: 'O turismo sazonal gera demanda trabalhista (contratos temporários, intermitência) e consumerista (reclamações de turistas). A pecuária bovina traz questões ambientais e trabalhistas. A remoteização do trabalho traz novas demandas de direito trabalhista digital.',
    economiaLocal: 'Turismo de inverno e rural, pecuária bovina, agricultura, comércio e serviços.',
  },
  'Meio-Oeste': {
    contexto: 'O Meio-Oeste catarinense possui economia diversificada, com destaque para agricultura, indústria de pequeno porte e comércio. A região é marcada por cidades de porte médio com boa infraestrutura e qualidade de vida.',
    desafiosJuridicos: 'A economia diversificada gera demanda por todas as áreas do direito, desde trabalhista (indústrias locais) até previdenciário (agricultores familiares). O comércio local gera demandas consumeristas. As questões imobiliárias são crescentes com o desenvolvimento regional.',
    economiaLocal: 'Agricultura (milho, feijão, soja), indústria alimentícia, madeireira, comércio e serviços.',
  },
  'Planalto Norte': {
    contexto: 'O Planalto Norte possui economia agropecuária com destaque para pecuária leiteira, avicultura e agricultura de subsistência. A região é marcada por cidades pequenas com forte comunidade e tradição rural.',
    desafiosJuridicos: 'A economia agropecuária gera demanda por direito rural (INCRA, terras devolutas), previdenciário (segurado especial, aposentadoria rural) e ambiental (reservas legais, áreas de preservação). O comércio local gera questões consumeristas básicas.',
    economiaLocal: 'Pecuária leiteira, avicultura, agricultura, comércio varejista e serviços.',
  },
  'Litoral Norte': {
    contexto: 'O Litoral Norte catarinense é região de Porto União e cidades costeiras, com economia baseada em turismo, pesca e comércio. A proximidade com o Paraná gera influência econômica bidirecional.',
    desafiosJuridicos: 'O turismo litorâneo gera demanda consumerista (reclamações de turistas, questões hoteleiras). A pesca artesanal traz questões ambientais e trabalhistas. As áreas de preservação permanentes geram conflitos com atividades econômicas.',
    economiaLocal: 'Turismo litorâneo, pesca, comércio, agricultura e serviços.',
  },
  'Litoral Sul': {
    contexto: 'O Litoral Sul catarinense compreende cidades costeiras como Laguna, Imbituba e Pescaria Brava, com economia baseada em turismo, pesca e comércio. A região possui praias preservadas e patrimônio histórico.',
    desafiosJuridicos: 'O turismo ecológico e de praia gera demanda consumerista e ambiental. A pesca artesanal enfrenta questões de sustentabilidade e licenciamento. O patrimônio histórico gera demandas de direito cultural e urbanístico.',
    economiaLocal: 'Turismo, pesca, comércio, agricultura e serviços.',
  },
}

// ═══ CONTEÚDO ÚNICO POR CIDADE (3000+ palavras) ═══
function gerarConteudo3000(cidade, regiao) {
  const r = dadosRegiao[regiao] || dadosRegiao['Grande Florianópolis']
  const hash = cidade.nome.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  
  // Helpers para variar conteúdo
  const nomes = [cidade.nome, 'esta cidade', 'a região de ' + cidade.nome, 'o município de ' + cidade.nome]
  const nomes2 = ['Em ' + cidade.nome, 'Na região de ' + cidade.nome, 'No município de ' + cidade.nome, 'Para moradores de ' + cidade.nome]
  const nome = () => nomes[hash % nomes.length]
  const nome2 = () => nomes2[(hash + 1) % nomes2.length]
  
  const heroTitles = [
    `Advogado em ${cidade.nome}: Assessoria Jurídica Especializada em SC`,
    `Direito em ${cidade.nome} — Advogados com Experiência e Compromisso`,
    `Assessoria Jurídica em ${cidade.nome} — Will & Pereira Advocacia`,
    `Advogados em ${cidade.nome} para Todas as Áreas do Direito`,
  ]
  
  const heroDescs = [
    `Encontre o melhor advogado em ${cidade.nome}. A Will & Pereira Advocacia oferece assessoria jurídica completa em ${r.economiaLocal.split(',')[0]}, com mais de 15 anos de experiência atendendo moradores de ${cidade.nome} e região.`,
    `Soluções jurídicas personalizadas para moradores de ${cidade.nome}. Nossa equipe atua em todas as áreas do Direito, oferecendo atendimento humanizado e resultados comprovados.`,
    `Assessoria jurídica de qualidade em ${cidade.nome}. Com escritório em Palhoça/SC, atendemos clientes em todo o Brasil, incluindo ${cidade.nome}.`,
  ]
  
  // ═══ INTRODUÇÃO (3 parágrafos, ~300 palavras) ═══
  const intros = [
    `Quando se fala em assessoria jurídica de qualidade em ${cidade.nome}, a primeira questão que surge é encontrar um profissional que conheça profundamente as particularidades locais e que esteja preparado para oferecer soluções eficazes. A Will & Pereira Advocacia, com mais de 15 anos de atuação e escritório em Palhoça/SC, é referência no atendimento jurídico para moradores de ${cidade.nome} e de toda a região de ${regiao}. Nossa equipe multidisciplinar combina conhecimento técnico aprofundado com um atendimento humanizado, garantindo que cada cliente receba a orientação jurídica que merece.\n\n${nome2()}, com ${cidade.populacao} habitantes e economia baseada em ${cidade.economia}, apresenta características únicas que influenciam diretamente as demandas jurídicas da região. ${r.contexto} Esses fatores fazem com que a busca por um advogado especializado seja constante, seja para questões preventivas ou para resolução de conflitos já existentes. A Will & Pereira Advocacia compreende essas particularidades e está preparada para oferecer a melhor solução em cada caso.\n\nEste guia apresenta um panorama completo dos serviços jurídicos disponíveis para moradores de ${cidade.nome}, abrangendo todas as principais áreas do Direito: Previdenciário, Trabalhista, Cível, do Consumidor, de Família e Imobiliário. Cada seção é elaborada com base na realidade específica de ${cidade.nome}, oferecendo informações práticas e relevantes para quem busca orientação jurídica na região. Nossa equipe está pronta para atender pessoalmente ou por videoconferência, garantindo acesso à justiça independentemente da localização do cliente.`,
    
    `Moradores de ${cidade.nome} que precisam de serviços jurídicos de qualidade encontram na Will & Pereira Advocacia a parceria ideal para resolver suas questões legais. Com mais de 15 anos de experiência em todas as áreas do Direito, nosso escritório está preparado para atender pessoas físicas e empresas com excelência e dedicação. ${r.contexto}\n\nA necessidade de um advogado capacitado em ${cidade.nome} é constante. Questões trabalhistas, familiares, consumeristas e imobiliárias surgem no cotidiano e precisam de orientação especializada. Não importa a complexidade do caso — nossa equipe multidisciplinar oferece soluções personalizadas, combinando estratégia jurídica inteligente com atendimento próximo e humanizado. Em ${cidade.nome}, onde a economia gira em torno de ${cidade.economia}, as relações jurídicas apresentam particularidades que conhecemos profundamente.\n\n${nome2()}, a Will & Pereira Advocacia se destaca pelo compromisso com resultados e pela ética profissional. Nossa equipe, com sede em Palhoça/SC, atende clientes de toda a região há mais de 15 anos, construindo uma sólida reputação baseada em transparência, competência e dedicação a cada caso. Seja para questões preventivas ou contenciosas, oferecemos assessoria completa com foco nos melhores resultados para nossos clientes.`,
  ]
  
  // ═══ PREVIDENCIÁRIO (~500 palavras) ═══
  const previdTemplates = [
    `O Direito Previdenciário é uma das áreas mais demandadas em ${cidade.nome}. Muitos trabalhadores da região têm dúvidas sobre aposentadoria, auxílio-doença, pensão por morte e outros benefícios do INSS. A reforma da previdência (EC 103/2019) trouxe mudanças significativas, e contar com um advogado especializado é essencial para garantir o melhor benefício possível.\n\nEm ${cidade.nome}, onde a economia se baseia em ${cidade.economia}, trabalhadores de diversas categorias precisam de orientação previdenciária. Trabalhadores rurais, domésticos, autônomos e contribuintes individuais possuem regras específicas que muitas vezes não são bem explicadas pelo próprio INSS. A Will & Pereira Advocacia realiza análise completa do histórico contributivo de cada cliente, identificando todas as possibilidades de antecipação ou majoração da aposentadoria.\n\nOs principais benefícios previdenciários atendidos pela nossa equipe em ${cidade.nome} incluem: aposentadoria por idade (65 anos para homens, 62 para mulheres), aposentadoria por tempo de contribuição (com regras de transição), aposentadoria especial (para trabalhadores expostos a agentes nocivos), auxílio-doença (benefício por incapacidade temporária), aposentadoria por invalidez (incapacidade permanente), pensão por morte (para dependentes do segurado falecido), auxílio-acidente (indenização por sequelas), salário-maternidade e BPC/LOAS (benefício assistencial para idosos e deficientes de baixa renda).\n\nA revisão de benefícios é outro serviço essencial. Muitos benefícios são concedidos pelo INSS com erros de cálculo, e o segurado pode estar recebendo menos do que tem direito. Em ${cidade.nome}, nossa equipe já ajudou centenas de trabalhadores a conquistarem valores maiores através de revisões administrativas e judiciais. O prazo para solicitar revisão é de 10 anos a partir do primeiro pagamento do benefício.\n\nO planejamento previdenciário preventivo é igualmente importante. Antes de se aposentar, é fundamental verificar se o trabalhador está na melhor regra possível, considerando todas as opções de direito adquirido e regras de transição. Em ${cidade.nome}, oferecemos consultoria previdenciária completa, incluindo simulações de benefícios e orientações sobre a melhor estratégia de aposentadoria para cada caso.`,
    
    `A busca por benefícios previdenciários em ${cidade.nome} é constante, refletindo a necessidade da população de ter acesso a aposentadorias justas, auxílios-doença e pensões que garantam sustento e dignidade. A Will & Pereira Advocacia atua em todas as modalidades de benefício previdenciário, oferecendo assessoria completa desde a análise do extrato CNIS até ações judiciais contra negativas do INSS.\n\nEm ${cidade.populacao} habitantes, ${cidade.nome} é uma cidade ${cidade.porte === 'grande' ? 'expressiva' : cidade.porte === 'media' ? 'de porte intermediário' : 'de pequeno porte'} em ${regiao}, onde a atividade econômica gira em torno de ${cidade.economia}. ${r.contexto} Essas características geram demandas previdenciárias específicas que nossa equipe conhece profundamente.\n\nTrabalhadores rurais de ${cidade.nome} possuem direitos diferenciados, como aposentadoria por idade reduzida (60 anos para homens, 55 para mulheres) e possibilidade de comprovação de tempo de serviço através de documentos alternativos. Trabalhadores urbanos que exercem atividades insalubres ou perigosas podem ter direito à aposentadoria especial com tempo reduzido de contribuição.\n\nNossa equipe também atua em recursos administrativos ao Conselho de Recursos da Previdência Social (CRPS) e em ações judiciais na Justiça Federal. Em ${cidade.nome}, já revertemos diversas negativas de benefício, garantindo a nossos clientes o direito a aposentadorias, auxílios e pensões que lhes eram devidos. A análise prévia do caso é gratuita, e trabalhamos com honorários de sucumbência quando possível.`,
  ]
  
  // ═══ TRABALHISTA (~500 palavras) ═══
  const trabalTemplates = [
    `O Direito Trabalhista protege as relações entre empregados e empregadores. Em ${cidade.nome}, oferecemos assessoria completa tanto para trabalhadores quanto para empresas, abrangendo verbas rescisórias, horas extras, FGTS, assédio moral, acidente de trabalho e defesa em reclamações trabalhistas. ${r.desafiosJuridicos}\n\nTrabalhadores de ${cidade.nome} que foram demitidos sem justa causa, não receberam horas extras ou sofreram acidente de trabalho podem contar com a Will & Pereira Advocacia para buscar reparação. A CLT garante diversos direitos, mas muitos trabalhadores não conhecem a totalidade deles. Nossa equipe esclarece dúvidas e conduz o processo trabalhista com foco no melhor resultado possível para o cliente.\n\nAs principais causas trabalhistas atendidas em ${cidade.nome} incluem: verbas rescisórias (saldo de salário, aviso prévio, férias proporcionais, 13º proporcional, multa de 40% do FGTS), horas extras (com adicional mínimo de 50% em dias úteis e 100% em domingos e feriados), adicional de insalubridade (10%, 20% ou 40% sobre o salário mínimo), adicional de periculosidade (30% sobre o salário base), equiparação salarial (mesmo salário para mesma função), desvio de função, assédio moral e dano moral trabalhista.\n\nPara empresas de ${cidade.nome}, oferecemos consultoria trabalhista preventiva, ajudando a evitar passivos trabalhistas e adequar práticas de gestão à legislação. Atuamos na elaboração de contratos de trabalho, acordos coletivos, due diligence trabalhista em operações de compra e venda de empresas, e defesa em reclamações trabalhistas.\n\nA Reforma Trabalhista (Lei 13.467/2017) trouxe mudanças significativas, como a possibilidade de acordo extrajudicial homologado pelo juiz, o trabalho intermitente e a regulamentação do teletrabalho. Em ${cidade.nome}, nossa equipe está atualizada com todas as alterações legislativas e jurisprudenciais, oferecendo orientação adequada para cada situação.`,
    
    `Em ${cidade.nome}, as relações de trabalho são regidas pela CLT e pela Constituição Federal, que garantem direitos fundamentais aos trabalhadores. A Will & Pereira Advocacia atua na defesa desses direitos, oferecendo assessoria trabalhista completa para moradores de ${cidade.nome} e região.\n\n${nome2()}, ${r.contexto} Essas características geram demandas trabalhistas específicas que nossa equipe conhece profundamente. Desde trabalhadores da indústria até profissionais liberais, oferecemos orientação jurídica personalizada para cada caso.\n\nOs principais direitos trabalhistas que defendemos em ${cidade.nome} incluem: pagamento correto de horas extras e adicionais, verbas rescisórias integralizadas, depósito regular do FGTS, estabilidade provisória para acidentados, respeito à jornada de trabalho e combate ao assédio moral e sexual. Quando esses direitos são violados, ingressamos com reclamação trabalhista na Justiça do Trabalho, buscando a reparação mais adequada para cada caso.\n\nO prazo prescricional trabalhista é de 2 anos após a extinção do contrato para entrar com ação, mas os direitos dos últimos 5 anos podem ser cobrados. Em ${cidade.nome}, orientamos trabalhadores sobre seus direitos e prazos, garantindo que nenhum direito seja perdido por descuido processual. Nosso atendimento é personalizado, com explicação clara de cada etapa do processo.`,
  ]
  
  // ═══ CÍVEL (~500 palavras) ═══
  const civelTemplates = [
    `O Direito Cível abrange as relações cotidianas entre pessoas e empresas. Em ${cidade.nome}, nossa equipe atua em contratos, indenizações, cobranças, usucapião, direito de vizinhança e questões de propriedade. ${r.contexto} A Will & Pereira Advocacia oferece assessoria completa em todas as áreas do Direito Cível, com foco nos resultados e atendimento personalizado.\n\nEm ${cidade.nome}, com economia baseada em ${cidade.economia}, os conflitos cíveis são variados e exigem conhecimento aprofundado do Código Civil e da jurisprudência. Trabalhamos com elaboração e revisão de contratos para prevenir futuros litígios. Quando o litígio é inevitável, ingressamos com ações judiciais de cobrança, indenização, despejo, usucapião e demais medidas cabíveis.\n\nA assessoria cível preventiva é especialmente importante para empresas de ${cidade.nome}, que precisam de contratos adequados para evitar prejuízos futuros. Nossa equipe analisa cada situação e apresenta as melhores alternativas para o caso. Atuamos em contratos de compra e venda, prestação de serviços, locação, empreitada, mandato, comodato e todos os demais tipos contratuais previstos no Código Civil.\n\nEm ${cidade.nome}, também atuamos em ações de indenização por danos materiais e morais, responsabilidade civil (subjetiva e objetiva), usucapião (extraordinária, ordinária e especial), ações possessórias (reintegração de posse, manutenção de posse e interdito proibitório), divórcio com partilha de bens, inventário e partilha, e todas as demais questões cíveis que possam surgir no cotidiano dos moradores de ${cidade.nome}.`,
    
    `Questões cíveis surgem no cotidiano de qualquer cidadão, e em ${cidade.nome} não é diferente. Contratos mal elaborados, cobranças indevidas, danos causados por terceiros e conflitos de vizinhança são situações que exigem orientação jurídica especializada. A Will & Pereira Advocacia atende moradores de ${cidade.nome} em todas as questões cíveis, oferecendo soluções eficazes e personalizadas.\n\n${nome2()}, a economia gira em torno de ${cidade.economia}, gerando demandas cíveis específicas que conhecemos profundamente. ${r.desafiosJuridicos} Nossa equipe está preparada para atuar em cada uma dessas situações, oferecendo assessoria preventiva e contenciosa com foco nos melhores resultados.\n\nOs principais serviços cíveis oferecidos em ${cidade.nome} incluem: elaboração e revisão de contratos, ações de cobrança judicial e extrajudicial, ações de indenização por danos morais e materiais, usucapião e regularização fundiária, ações de despejo e revisão de aluguel, inventário judicial e extrajudicial, divórcio consensual e litigioso, e consultoria jurídica preventiva para empresas e pessoas físicas.`,
  ]
  
  // ═══ CONSUMIDOR (~500 palavras) ═══
  const consumTemplates = [
    `O Código de Defesa do Consumidor protege moradores de ${cidade.nome} contra abusos de empresas e fornecedores. Atendemos consumidores que tiveram direitos violados: produtos com defeito, cobranças indevidas, negativas de planos de saúde, problemas bancários e cláusulas abusivas em contratos. ${r.desafiosJuridicos}\n\nEm ${cidade.nome}, com economia vinculada a ${cidade.economia}, o consumo é parte fundamental da vida cotidiana e, por isso, os conflitos consumeristas são frequentes. Nossa equipe atua na defesa dos direitos do consumidor, desde negociações amigáveis até ações judiciais complexas.\n\nO CDC assegura direitos importantes como inversão do ônus da prova (quando o consumidor não consegue provar o defeito, o fornecedor deve provar que o produto/serviço estava adequado), repetição de indébito em dobro (devolução do valor pago em excesso, multiplicado por dois), indenização por danos morais (mesmo sem prova de prejuízo concreto em casos de cobrança indevida reiterada) e proibição de práticas abusivas (venda casada, publicidade enganosa, cláusulas abusivas).\n\nEm ${cidade.nome}, já ajudamos diversos consumidores a resolverem problemas com bancos, planos de saúde, empresas de telefonia, fornecedores locais e grandes redes varejistas. Nossa equipe domina os instrumentos processuais do CDC, incluindo tutela de urgência (liminar para autorizar procedimento ou suspender cobrança), ação civil pública (quando a violação atinge um grupo de consumidores) e execução de título extrajudicial (quando há acordo homologado).`,
    
    `Moradores de ${cidade.nome} que enfrentam problemas com empresas, planos de saúde ou bancos contam com a Will & Pereira Advocacia para fazer valer seus direitos. O CDC é uma das legislações mais protetivas do mundo, e nossa equipe está preparada para utilizar todos os seus instrumentos em defesa dos consumidores de ${cidade.nome}.\n\n${nome2()}, o comércio é ${cidade.porte === 'grande' ? 'expressivo e diversificado' : 'diversificado e ativo'}, e com isso surgem conflitos consumeristas que precisam de solução rápida e eficaz. Desde reclamações simples até ações complexas, oferecemos atendimento personalizado e orientação clara sobre os direitos do consumidor.\n\nOs principais temas consumeristas atendidos em ${cidade.nome} incluem: cobrança indevida e repetição de indébito, negativação injusta no SPC/Serasa, vícios de produto (troca, devolução ou indenização), vícios de serviço (correção ou rescisão contratual), negativa de cobertura de plano de saúde, revisão de contratos bancários (juros abusivos, capitalização), publicidade enganosa e práticas abusivas (venda casada, cobrança de serviço não solicitado).`,
  ]
  
  // ═══ FAMÍLIA (~500 palavras) ═══
  const famTemplates = [
    `O Direito de Família lida com questões sensíveis que afetam a vida das pessoas. Em ${cidade.nome}, atendemos em divórcios, guarda de filhos, pensão alimentícia, inventários e união estável. Cada caso é tratado com discrição e profissionalismo, buscando soluções que preservem os vínculos familiares quando possível.\n\n${nome2()}, as relações familiares são valorizadas, e é fundamental contar com um advogado que compreenda a importância de cada decisão. A Will & Pereira Advocacia oferece assessoria completa em Direito de Família, trabalhando com mediação familiar, acordos consensuais e, quando necessário, litígios para proteger os direitos dos clientes.\n\nOs principais serviços de Direito de Família oferecidos em ${cidade.nome} incluem: divórcio consensual (em cartório, quando não há filhos menores ou bens a partilhar) e litigioso (quando há conflito sobre guarda, pensão ou partilha), guarda compartilhada (decisão conjunta sobre educação e saúde dos filhos) e unilateral (quando um dos genitores não pode ou não quer compartilhar), pensão alimentícia (cálculo com base na renda do alimentante e necessidade do alimentado), investigação de paternidade (com exame de DNA), união estável (reconhecimento de relaciónamento establecido por tempo indeterminado), inventário judicial (quando há testamento, herdeiros menores ou conflito) e extrajudicial (em cartório, quando todos são capazes e concordes), e planejamento sucessório (testamento, doação com usufruto, holding familiar).\n\nEm ${cidade.nome}, a mediação familiar é uma alternativa eficaz ao litígio, permitindo que as partes encontrem soluções consensuais com a ajuda de um profissional qualificado. Nossa equipe é treinada em mediação e negociação, oferecendo um ambiente seguro e construtivo para resolução de conflitos familiares.`,
    
    `Famílias de ${cidade.nome} que precisam de assistência jurídica em questões como divórcio, guarda, pensão alimentícia ou inventário encontram na Will & Pereira Advocacia o parceiro ideal. Nossa equipe atua com sensibilidade e competência, buscando soluções que protejam os interesses de todos os envolvidos, especialmente das crianças.\n\n${nome2()}, a economia gira em torno de ${cidade.economia}. ${r.contexto} Questões familiares como inventário de propriedades rurais, pensão alimentícia baseada em renda variável (agronegócio) e divórcio com partilha de empresas familiares são comuns na região e demandam conhecimento especializado.\n\nNossa equipe oferece orientação clara sobre os procedimentos legais e as melhores estratégias para cada caso. Trabalhamos com transparência e dedicação, garantindo que cada cliente compreenda seus direitos e deveres. O atendimento é personalizado, com explicação detalhada de cada etapa do processo e previsão de custos e prazos.`,
  ]
  
  // ═══ IMOBILIÁRIO (~500 palavras) ═══
  const imobTemplates = [
    `O Direito Imobiliário regula todas as questões relacionadas a imóveis. Em ${cidade.nome}, atuamos em compra e venda, locação, usucapião, regularização fundiária e condomínio. ${r.contexto} A Will & Pereira Advocacia oferece assessoria completa em Direito Imobiliário, protegendo seus interesses em cada etapa da transação.\n\nEm ${cidade.nome}, com economia baseada em ${cidade.economia}, o mercado imobiliário apresenta características próprias que demandam conhecimento especializado. Trabalhamos com due diligence imobiliária completa, verificando matrícula, certidões negativas (débitos, ações reais e pessoais reipersecutórias, ônus reais) e situação fiscal dos imóveis.\n\nOs principais serviços imobiliários oferecidos em ${cidade.nome} incluem: elaboração e revisão de contratos de compra e venda (com verificação de nexo causal, cláusulas penais e condições suspensivas), contratos de locação residencial e comercial (com cláusulas de reajuste, garantia e rescisão), ações de despejo (por inadimplência, necessidade própria ou falta de pagamento de condomínio), revisão de aluguel (quando o valor de mercado é inferior ao contratado), usucapião judicial e extrajudicial (para regularização de imóveis possuídos há tempo), regularização fundiária (urbanização e rural), ações possessórias (reintegração de posse, manutenção de posse e interdito proibitório), questões condominiais (convenção, assembleias, cobrança de taxas), e planejamento imobiliário preventivo.\n\nEm ${cidade.nome}, o crescimento urbano gera demanda crescente por serviços jurídicos imobiliários. A verificação prévia de qualquer transação é essencial para evitar problemas futuros. Nossa equipe está preparada para analisar cada situação e oferecer a melhor solução jurídica.`,
    
    `O mercado imobiliário em ${cidade.nome} exige atenção jurídica cuidadosa. Compra, venda, locação e usucapião são operações que envolvem valores significativos e riscos legais. A Will & Pereira Advocacia atende moradores de ${cidade.nome} em todas as questões imobiliárias, oferecendo segurança e tranquilidade em cada transação.\n\n${nome2()}, ${r.contexto} Isso gera demanda por serviços jurídicos imobiliários, desde elaboração de contratos até resolução de conflitos possessórios e condominiais.\n\nNossa equipe domina as peculiaridades do mercado imobiliário de ${cidade.nome} e está preparada para oferecer assessoria completa. Trabalhamos com transparência e dedicação, garantindo que cada transação seja segura e juridicamente válida. O planejamento preventivo é essencial — antes de qualquer transação, conte com orientação jurídica especializada.`,
  ]
  
  // ═══ SEÇÃO EXCLUSIVA (sobre a cidade + razões para escolher) (~400 palavras) ═══
  const secaoExclusiva = `## Por Que Escolher a Will & Pereira Advocacia em ${cidade.nome}?\n\nEscolher o advogado certo é uma decisão que impacta diretamente o resultado de qualquer questão jurídica. Em ${cidade.nome}, a Will & Pereira Advocacia se destaca por diversos fatores que fazem a diferença na hora de buscar orientação jurídica.\n\n**Experiência Comprovada:** Com mais de 15 anos de atuação, nossa equipe possui experiência consolidada em todas as principais áreas do Direito. Já atendemos milhares de clientes em todo o Brasil, incluindo moradores de ${cidade.nome}, conquistando resultados expressivos em causas trabalhistas, previdenciárias, cíveis, consumeristas, familiares e imobiliárias.\n\n**Conhecimento Local:** Embora nosso escritório seja sediado em Palhoça/SC, conhecemos profundamente as particularidades de ${cidade.nome} e da região de ${regiao}. ${r.contexto} Esse conhecimento local é fundamental para oferecer orientação jurídica adequada a cada caso.\n\n**Atendimento Personalizado:** Cada caso é único e merece atenção individualizada. Em ${cidade.nome}, oferecemos atendimento personalizado, com explicação clara de cada etapa do processo, previsão de custos e prazos, e acompanhamento constante do andamento da causa.\n\n**Atuação Nacional:** Nossa equipe atende clientes em todo o Brasil, tanto presencialmente em Palhoça/SC quanto por videoconferência. Isso significa que moradores de ${cidade.nome} podem contar com nossa assessoria jurídica independentemente da localização.\n\n**Transparência Total:** Honorários claros, sem surpresas. O cliente sempre sabe onde está investindo e quais são as possibilidades de êxito. Trabalhamos com transparência em todas as fases do atendimento.\n\n**Resultados Comprovados:** Nossa taxa de sucesso reflete o compromisso com a qualidade do trabalho jurídico. Em ${cidade.nome}, já ajudamos centenas de clientes a conquistarem seus direitos, desde aposentadorias do INSS até indenizações por danos morais.\n\nSe você precisa de um advogado em ${cidade.nome}, entre em contato conosco. Oferecemos orientação jurídica inicial para análise do caso, sem compromisso. Nossa equipe está pronta para ajudar você a encontrar a melhor solução para sua situação jurídica.`
  
  // ═══ CÓMO AJUDA NO DIA A DIA (~300 palavras) ═══
  const diaADia = `## Como um Advogado Pode Ajudar no Dia a Dia em ${cidade.nome}\n\nMuitas pessoas acreditam que só precisam de advogado quando enfrentam um processo judicial. No entanto, o acompanhamento preventivo evita problemas maiores e pode economizar tempo e dinheiro a longo prazo.\n\n**Orientações preventivas comuns em ${cidade.nome}:**\n• Análise de contratos antes da assinatura (compra, venda, locação, prestação de serviços)\n• Verificação de cláusulas trabalhistas em contratos de employment\n• Planejamento previdenciário antes da aposentadoria\n• Regularização de imóveis (matrícula, certidões, situação fiscal)\n• Elaboração de testamentos e planejamento sucessório\n• Revisão de cobranças bancárias e planos de saúde\n• Orientação sobre direitos do consumidor em compras e contratos\n\n**Resolução extrajudicial:** Muitos conflitos podem ser resolvidos sem ação judicial, economizando tempo e recursos. Nossa equipe busca soluções consensuais sempre que possível, através de negociação direta, mediação ou conciliação.\n\n**Atendimento de emergência:** Imprevistos acontecem. Oferecemos atendimento prioritário para situações urgentes, como impedimento de acesso a imóvel, cobrança indevida iminente, ou necessidade de liminar judicial.\n\nEm ${cidade.nome}, a prevenção é sempre a melhor estratégia. Conte com a Will & Pereira Advocacia para orientá-lo em cada etapa da vida jurídica.`
  
  // ═══ FAQs (~200 palavras) ═══
  const faqs = [
    {
      pergunta: `Quais áreas do direito são mais comuns em ${cidade.nome}?`,
      resposta: `Em ${cidade.nome}, as áreas mais demandadas são Direito Trabalhista (devido à ${r.economiaLocal.split(',')[0].toLowerCase()} da região), Direito Previdenciário (com muitos trabalhadores buscando aposentadorias e benefícios do INSS) e Direito do Consumidor (com questões envolvendo empresas e fornecedores locais). A Will & Pereira Advocacia atua em todas essas áreas com excelência e dedicação.`
    },
    {
      pergunta: `Como funciona o atendimento da Will & Pereira Advocacia para moradores de ${cidade.nome}?`,
      resposta: `A Will & Pereira Advocacia atende moradores de ${cidade.nome} de forma integral, tanto presencialmente em nosso escritório em Palhoça/SC quanto por videoconferência. Nossa equipe está preparada para oferecer orientação jurídica de qualidade, independentemente da localização do cliente. O primeiro atendimento é orientativo, para análise do caso e definição da melhor estratégia jurídica.`
    },
    {
      pergunta: `Qual o prazo para entrar com uma ação trabalhista em ${cidade.nome}?`,
      resposta: `O trabalhador tem até 2 anos após a extinção do contrato para ajuizar reclamação trabalhista, mas só pode cobrar verbas dos últimos 5 anos. Em ${cidade.nome}, a Will & Pereira Advocacia orienta trabalhadores sobre seus direitos e prazos, garantindo que nenhum direito seja perdido por descuido processual.`
    },
    {
      pergunta: `A Will & Pereira Advocacia atende cidades pequenas como ${cidade.nome}?`,
      resposta: `Sim! A Will & Pereira Advocacia atende moradores de ${cidade.nome} e toda a região, independentemente do porte da cidade. Nossa equipe está preparada para oferecer assessoria jurídica de qualidade, com o mesmo nível de dedicação e profissionalismo que oferecemos em grandes centros urbanos.`
    },
    {
      pergunta: `Quais documentos são necessários para uma consulta jurídica em ${cidade.nome}?`,
      resposta: `Para uma orientação jurídica em ${cidade.nome}, é recomendável trazer documentos relacionados à questão, como contratos, comprovantes, documentos pessoais e qualquer correspondência recebida. A Will & Pereira Advocacia orienta o cliente sobre a documentação necessária antes da primeira consulta, garantindo que o atendimento seja produtivo e eficiente.`
    },
    {
      pergunta: `Quanto custa um advogado em ${cidade.nome}?`,
      resposta: `Os honorários variam conforme a complexidade do caso e a área do direito. A Will & Pereira Advocacia oferece transparência total nos valores, com proposta detalhada antes do início do atendimento. Em muitos casos trabalhistas e previdenciários, trabalhamos com honorários de sucumbência (pagos pela parte contrária em caso de vitória). Entre em contato para uma orientação inicial.`
    },
  ]
  
  // Montar conteúdo final (~3000+ palavras)
  const intro = intros[hash % intros.length]
  const previd = previdTemplates[hash % previdTemplates.length]
  const trabal = trabalTemplates[hash % trabalTemplates.length]
  const civel = civelTemplates[hash % civelTemplates.length]
  const consum = consumTemplates[hash % consumTemplates.length]
  const fam = famTemplates[hash % famTemplates.length]
  const imob = imobTemplates[hash % imobTemplates.length]
  
  return {
    heroTitle: heroTitles[hash % heroTitles.length],
    heroDescription: heroDescs[hash % heroDescs.length],
    introParagraphs: intro.split('\n\n'),
    areaContent: {
      previdenciario: previd,
      trabalhista: trabal,
      civel: civel,
      consumidor: consum,
      familia: fam,
      imobiliario: imob,
    },
    exclusiva: secaoExclusiva,
    diaADia: diaADia,
    faqs,
    stats: { experiencia: '15+', clientes: '5000+', taxa: '98%', cidades: '295' },
  }
}

// ═══ GERAR ARQUIVOS ═══
const contentDir = join(projectRoot, 'src', 'data', 'cidades-content')
if (!existsSync(contentDir)) mkdirSync(contentDir, { recursive: true })

let gerados = 0
let erros = 0

for (const cidade of novasCidades) {
  try {
    const slug = `advogado-em-${cidade.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/['']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
    
    const conteudo = gerarConteudo3000(cidade, cidade.regiao)
    
    const fileContent = `export default ${JSON.stringify(conteudo, null, 2)}\n`
    
    const filePath = join(contentDir, `${slug}.ts`)
    writeFileSync(filePath, fileContent)
    
    // Word count check
    const allText = JSON.stringify(conteudo)
    const wordCount = allText.split(/\s+/).length
    
    console.log(`✅ ${cidade.nome} (${slug}) — ~${wordCount} palavras`)
    gerados++
  } catch (err) {
    console.log(`❌ ${cidade.nome}: ${err.message}`)
    erros++
  }
}

console.log(`\n📊 Resultado: ${gerados} gerados, ${erros} erros`)
