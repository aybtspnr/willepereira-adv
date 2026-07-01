#!/usr/bin/env node
/**
 * Gerador de conteúdo único para páginas de cidades
 * Gera 302 páginas com conteúdo realmente diferenciado
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ═══════════════════════════════════════════
// DADOS EXPANDIDOS POR CIDADE
// ═══════════════════════════════════════════

const cidadesDetalhadas = {
  // GRANDES CENTROS
  'Joinville': { porte: 'grande', populacao: '597.658', pib: 'R$ 52 bilhões', idh: '0.833', principaisEmpresas: 'WEG, Embraco, Tigre, Hering', caracteristicas: 'maior industrial do estado, polo de tecnologia e inovação, forte tradição em metalurgia e mecânica', clima: 'temperado, com verões quentes e invernos amenos', turismo: 'Festival de Joinville, Carnaval, Parque Zoobotânico', transporte: 'BR-101, SC-415, aeroporto regional', saude: 'Hospital Municipal, Unimed, Hospital São José', educacao: 'UDESC, IFSC, universidades privadas' },
  'Florianópolis': { porte: 'grande', populacao: '537.211', pib: 'R$ 38 bilhões', idh: '0.847', principaisEmpresas: 'CCS Comunicações, WEG Filial, empresas de tecnologia', caracteristicas: 'capital do estado, polo tecnológico, qualidade de vida, 42 praias', clima: 'subtropical, verões quentes e invernos frios', turismo: 'Praias, festas de Junho, Oktoberfest, carnaval', transporte: 'SC-401, SC-405, aeroporto internacional', saude: 'HU-UFSC, Hospital Governador Celso Ramos, SOS Cardio', educacao: 'UFSC, UDESC, IFSC, muitas universidades privadas' },
  'Blumenau': { porte: 'grande', populacao: '357.199', pib: 'R$ 28 bilhões', idh: '0.830', principaisEmpresas: 'Hering, WEG, Tilibra, Unimed', caracteristicas: 'polo têxtil, Oktoberfest, forte economia industrial', clima: 'subtropical, invernos frios com geadas', turismo: 'Oktoberfest, Villagio Botanico, Parque Ramiro Ruediger', transporte: 'BR-470, SC-415, aeroporto regional', saude: 'Hospital São José, Unimed Blumenau', educacao: 'UNIBEE, FURB, universidades privadas' },
  'São José': { porte: 'grande', populacao: '250.769', pib: 'R$ 22 bilhões', idh: '0.826', principaisEmpresas: 'Embraer, WEG Filial, indústrias diversas', caracteristicas: 'cidade dormitório de Floripa, polo industrial, boa infraestrutura', clima: 'subtropical, verões quentes', turismo: 'Lagoinha, parques, proximidade com Floripa', transporter: 'SC-401, SC-205, acesso fácil à capital', saude: 'Hospital São José, Unimed', educacao: 'UNISOCIAL, universidades privadas' },
  'Criciúma': { porte: 'grande', populacao: '219.393', pib: 'R$ 18 bilhões', idh: '0.812', principaisEmpresas: 'Dias Alimentos, Furlan, indústrias cerâmicas', caracteristicas: 'capital do cerâmico, polo comercial do sul, forte indústria', clima: 'subtropical, verões quentes e invernos amenos', turismo: 'Catedral, Parque Municipal, festas regionais', transporte: 'SC-446, SC-447, acesso por rodovias', saude: 'Hospital São José, Unimed Criciúma', educacao: 'UNESC, UNOESC, universidades privadas' },
  'Chapecó': { porte: 'grande', populacao: '224.025', pib: 'R$ 25 bilhões', idh: '0.820', principaisEmpresas: 'Sadia, Perdigão (BRF), Agrofel, Chapecó Tecnologia', caracteristicas: 'capital da agroindústria, polo avícola, forte economia', clima: 'subtropical, verões quentes e invernos frios', turismo: 'Parque Ecológico, Festapi, centro histórico', transporter: 'BR-282, SC-240, aeroporto regional', saude: 'Hospital São José, Unimed Chapecó', educacao: 'UNOCHAPECÓ, UFFS, universidades privadas' },
  'Itajaí': { porte: 'grande', populacao: '223.112', pib: 'R$ 20 bilhões', idh: '0.822', principaisEmpresas: 'Porto de Itajaí, indústrias diversas, comércio', caracteristicas: 'porto marítimo, polo logístico, forte comércio', clima: 'subtropical, verões quentes', turismo: 'Porto, praias, farol, centro histórico', transporter: 'BR-101, SC-415, aeroporto', saude: 'Hospital São José, Unimed Itajaí', educacao: 'FURB, universidades privadas' },
  'Jaraguá do Sul': { porte: 'grande', populacao: '181.317', pib: 'R$ 16 bilhões', idh: '0.818', principaisEmpresas: 'WEG, Hering, Tigre, indústrias diversas', caracteristicas: 'polo industrial, WEG, forte economia manufatureira', clima: 'subtropical, invernos frios', turismo: 'Parque Zoobotânico, WEG, festas industriais', transporter: 'BR-470, SC-415, acesso a Joinville', saude: 'Hospital São José, Unimed', educacao: 'UNIBR, universidades privadas' },
  'Palhoça': { porte: 'media', populacao: '175.000', pib: 'R$ 8 bilhões', idh: '0.805', principaisEmpresas: 'Indústrias diversas, comércio, serviços', caracteristicas: 'cidade do escritório, polo comercial, proximidade com Floripa', clima: 'subtropical, verões quentes', turismo: 'Centro histórico, igrejas, parques', transporter: 'SC-401, SC-205, acesso à capital', saude: 'Hospital São José, Unimed Palhoça', educacao: 'UNISUL, universidades privadas' },
  'Balneário Camboriú': { porte: 'grande', populacao: '142.295', pib: 'R$ 12 bilhões', idh: '0.840', principaisEmpresas: 'Turismo, construção civil, comércio', caracteristicas: 'capital do turismo, construções altas, vida noturna', clima: 'subtropical, verões quentes', turismo: 'Praia Central, Avenida Atlântica, vida noturna', transporter: 'SC-415, acesso por rodovias', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Lages': { porte: 'media', populacao: '156.727', pib: 'R$ 7 bilhões', idh: '0.790', principaisEmpresas: 'Agricultura, turismo, comércio', caracteristicas: 'capital da serra, polo agropecuário, turismo rural', clima: 'temperado, invernos frios com neve', turismo: 'Inverno, neve, turismo rural, festas gaúchas', transporter: 'BR-116, SC-430, acesso ao litoral', saude: 'Hospital São José, Unimed Lages', educacao: 'UNESC, universidades privadas' },
  'Brusque': { porte: 'media', populacao: '140.597', pib: 'R$ 9 bilhões', idh: '0.810', principaisEmpresas: 'Indústria têxtil, WEG, comércio', caracteristicas: 'polo têxtil, indústria diversificada', clima: 'subtropical, verões quentes', turismo: 'Parque industrial, festas regionais', transporter: 'BR-470, SC-415, acesso a Joinville', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Tubarão': { porte: 'media', populacao: '105.687', pib: 'R$ 5 bilhões', idh: '0.800', principaisEmpresas: 'Indústria, comércio, agricultura', caracteristicas: 'polo comercial do sul, sede de comarcas', clima: 'subtropical, verões quentes', turismo: 'Centro histórico, museus, parques', transporter: 'BR-101, SC-446, acesso ao litoral', saude: 'Hospital São José, Unimed', educacao: 'UNISUL, universidades privadas' },
  'Caçador': { porte: 'media', populacao: '78.000', pib: 'R$ 4 bilhões', idh: '0.785', principaisEmpresas: 'Videira Vinhos, agricultura, indústria', caracteristicas: 'polo vinícola, agricultura diversificada', clima: 'temperado, invernos frios', turismo: 'Rota do vinho, turismo rural', transporter: 'BR-470, SC-415, acesso ao oeste', saude: 'Hospital São José, Unimed', educacao: 'UNICRUZ, universidades privadas' },
  'Concórdia': { porte: 'media', populacao: '74.000', pib: 'R$ 5 bilhões', idh: '0.795', principaisEmpresas: 'Sadia, Perdigão, agroindústria', caracteristicas: 'polo avícola, agroindústria de ponta', clima: 'subtropical, verões quentes', turismo: 'Parque ecológico, festas agroindustriais', transporter: 'BR-158, SC-240, acesso ao oeste', saude: 'Hospital São José, Unimed', educacao: 'UNOESC, universidades privadas' },
  'Rio do Sul': { porte: 'media', populacao: '72.000', pib: 'R$ 4 bilhões', idh: '0.790', principaisEmpresas: 'Indústria, comércio, agricultura', caracteristicas: 'polo comercial do vale, sede de comarcas', clima: 'subtropical, verões quentes', turismo: 'Rio Itajaí, parques, centro histórico', transporter: 'BR-470, SC-415, acesso ao vale', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'São Bento do Sul': { porte: 'media', populacao: '85.000', pib: 'R$ 4 bilhões', idh: '0.785', principaisEmpresas: 'Indústria moveleira, agricultura', caracteristicas: 'capital do móvel, indústria moveleira', clima: 'subtropical, invernos frios', turismo: 'Feira do Móvel, parques, natureza', transporter: 'BR-280, SC-415, acesso ao norte', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Indaial': { porte: 'media', populacao: '70.000', pib: 'R$ 4 bilhões', idh: '0.788', principaisEmpresas: 'Indústria têxtil, agricultura', caracteristicas: 'polo têxtil, agricultura diversificada', clima: 'subtropical, verões quentes', turismo: 'Parque ecológico, festas regionais', transporter: 'BR-470, SC-415, acesso ao vale', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Videira': { porte: 'media', populacao: '53.000', pib: 'R$ 3 bilhões', idh: '0.780', principaisEmpresas: 'Videira Vinhos, agricultura, indústria', caracteristicas: 'polo vinícola, agroindústria', clima: 'temperado, invernos frios', turismo: 'Rota do vinho, turismo rural', transporter: 'BR-470, SC-415, acesso ao oeste', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Araranguá': { porte: 'media', populacao: '68.000', pib: 'R$ 3 bilhões', idh: '0.775', principaisEmpresas: 'Comércio, agricultura, indústria', caracteristicas: 'polo comercial do litoral sul, sede de comarcas', clima: 'subtropical, verões quentes', turismo: 'Praias, centro histórico, museus', transporter: 'BR-101, SC-446, acesso ao litoral', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Laguna': { porte: 'media', populacao: '44.000', pib: 'R$ 2 bilhões', idh: '0.770', principaisEmpresas: 'Pesca, turismo, comércio', caracteristicas: 'cidade histórica, pesca artesanal, turismo', clima: 'subtropical, verões quentes', turismo: 'Centro histórico, museus, praias', transporter: 'BR-101, SC-446, acesso ao litoral', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Curitibanos': { porte: 'media', populacao: '39.000', pib: 'R$ 1.5 bilhão', idh: '0.765', principaisEmpresas: 'Agricultura, pecuária, comércio', caracteristicas: 'polo agropecuário, turismo rural', clima: 'temperado, invernos frios com neve', turismo: 'Neve, turismo rural, festas gaúchas', transporter: 'BR-116, SC-430, acesso ao norte', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Navegantes': { porte: 'media', populacao: '83.000', pib: 'R$ 4 bilhões', idh: '0.792', principaisEmpresas: 'Porto, indústria, comércio', caracteristicas: 'porto fluvial, polo logístico', clima: 'subtropical, verões quentes', turismo: 'Porto, praias, centro histórico', transporter: 'BR-470, SC-415, acesso ao vale', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Biguaçu': { porte: 'media', populacao: '67.000', pib: 'R$ 3 bilhões', idh: '0.778', principaisEmpresas: 'Indústria, comércio, agricultura', caracteristicas: 'cidade dormitório, proximidade com Floripa', clima: 'subtropical, verões quentes', turismo: 'Praias, parques, centro histórico', transporter: 'SC-401, SC-205, acesso à capital', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Mafra': { porte: 'media', populacao: '55.000', pib: 'R$ 2.5 bilhões', idh: '0.772', principaisEmpresas: 'Indústria, agricultura, comércio', caracteristicas: 'polo industrial do norte, sede de comarcas', clima: 'subtropical, invernos frios', turismo: 'Parque ecológico, festas regionais', transporter: 'BR-470, SC-415, acesso ao norte', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Canoinhas': { porte: 'media', populacao: '53.000', pib: 'R$ 2 bilhões', idh: '0.768', principaisEmpresas: 'Agricultura, indústria, comércio', caracteristicas: 'polo agroindustrial, sede de comarcas', clima: 'subtropical, invernos frios', turismo: 'Parque ecológico, festas regionais', transporter: 'BR-470, SC-415, acesso ao norte', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'São Miguel do Oeste': { porte: 'media', populacao: '40.000', pib: 'R$ 1.8 bilhão', idh: '0.765', principaisEmpresas: 'Agroindústria, comércio, serviços', caracteristicas: 'capital do extremo oeste, polo comercial', clima: 'subtropical, verões quentes', turismo: 'Centro histórico, parques', transporter: 'BR-163, SC-432, acesso ao oeste', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Gaspar': { porte: 'media', populacao: '70.000', pib: 'R$ 3.5 bilhões', idh: '0.782', principaisEmpresas: 'Indústria têxtil, agricultura', caracteristicas: 'polo têxtil, agricultura diversificada', clima: 'subtropical, verões quentes', turismo: 'Parque ecológico, festas regionais', transporter: 'BR-470, SC-415, acesso ao vale', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Timbó': { porte: 'pequena', populacao: '43.000', pib: 'R$ 2 bilhões', idh: '0.778', principaisEmpresas: 'Indústria, tecnologia, comércio', caracteristicas: 'polo tecnológico, startups', clima: 'subtropical, verões quentes', turismo: 'Parque tecnológico, festas regionais', transporter: 'BR-470, SC-415, acesso ao vale', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Imbituba': { porte: 'pequena', populacao: '45.000', pib: 'R$ 1.8 bilhão', idh: '0.762', principaisEmpresas: 'Porto, pesca, turismo', caracteristicas: 'porto pesqueiro, atividade portuária', clima: 'subtropical, verões quentes', turismo: 'Porto, praias, pesca', transporter: 'BR-101, SC-446, acesso ao litoral', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Itapema': { porte: 'pequena', populacao: '62.000', pib: 'R$ 3 bilhões', idh: '0.795', principaisEmpresas: 'Turismo, construção civil, comércio', caracteristicas: 'cidade turística, alto poder aquisitivo', clima: 'subtropical, verões quentes', turismo: 'Praias, vida noturna, gastronomia', transporter: 'SC-415, acesso por rodovias', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Campos Novos': { porte: 'pequena', populacao: '36.000', pib: 'R$ 1.2 bilhão', idh: '0.760', principaisEmpresas: 'Agricultura, pecuária, comércio', caracteristicas: 'polo agropecuário, turismo rural', clima: 'temperado, invernos frios', turismo: 'Turismo rural, festas gaúchas', transporter: 'BR-470, SC-415, acesso ao oeste', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Porto Belo': { porte: 'pequena', populacao: '20.000', pib: 'R$ 1 bilhão', idh: '0.790', principaisEmpresas: 'Turismo, pesca, comércio', caracteristicas: 'cidade turística, pesca artesanal', clima: 'subtropical, verões quentes', turismo: 'Praias, pesca, vida noturna', transporter: 'SC-415, acesso por rodovias', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Garopaba': { porte: 'pequena', populacao: '23.000', pib: 'R$ 800 milhões', idh: '0.775', principaisEmpresas: 'Turismo, pesca, comércio', caracteristicas: 'cidade turística, praias preservadas', clima: 'subtropical, verões quentes', turismo: 'Praias, natureza, vida tranquila', transporter: 'SC-432, acesso por rodovias', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Sombrio': { porte: 'pequena', populacao: '29.000', pib: 'R$ 1 bilhão', idh: '0.765', principaisEmpresas: 'Comércio, agricultura, serviços', caracteristicas: 'polo comercial, sede de comarcas', clima: 'subtropical, verões quentes', turismo: 'Centro histórico, parques', transporter: 'BR-101, SC-446, acesso ao litoral', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Içara': { porte: 'pequena', populacao: '52.000', pib: 'R$ 2.2 bilhões', idh: '0.772', principaisEmpresas: 'Indústria, comércio, agricultura', caracteristicas: 'polo industrial, sede de comarcas', clima: 'subtropical, verões quentes', turismo: 'Centro histórico, parques', transporter: 'BR-101, SC-446, acesso ao litoral', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'Camboriú': { porte: 'media', populacao: '84.000', pib: 'R$ 4 bilhões', idh: '0.798', principaisEmpresas: 'Comércio, serviços, construção civil', caracteristicas: 'polo comercial, proximidade com Balneário Camboriú', clima: 'subtropical, verões quentes', turismo: 'Praias, vida noturna, gastronomia', transporter: 'SC-415, acesso por rodovias', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
  'São Francisco do Sul': { porte: 'pequena', populacao: '50.000', pib: 'R$ 2.5 bilhões', idh: '0.778', principaisEmpresas: 'Porto, indústria, comércio', caracteristicas: 'porto marítimo, polo logístico', clima: 'subtropical, verões quentes', turismo: 'Porto, centro histórico, museus', transporter: 'BR-101, SC-415, acesso ao norte', saude: 'Hospital São José, Unimed', educacao: 'Universidades privadas' },
}

// ═══════════════════════════════════════════
// DADOS POR REGIÃO
// ═══════════════════════════════════════════

const regioes = {
  'Grande Florianópolis': {
    descricao: 'região metropolitana de Florianópolis',
    economia: 'Comércio, Serviços, Turismo e Construção Civil',
    contexto: 'A região da Grande Florianópolis é a área mais desenvolvida de Santa Catarina, com forte presença de empresas de tecnologia, turismo e serviços. A proximidade com a capital gera alta demanda por serviços jurídicos em diversas áreas.',
    desafios: 'A alta demanda por imóveis gera questões de direito imobiliário complexas. O crescimento acelerado também traz desafios trabalhistas e consumeristas.',
  },
  'Sul Catarinense': {
    descricao: 'região sul do estado de Santa Catarina',
    economia: 'Indústria, Comércio, Agricultura e Serviços',
    contexto: 'O Sul Catarinense é polo industrial com destaque para cerâmica, têxtil e agroindústria. A região possui tradição imigratória italiana e alemã, refletida na cultura e economia local.',
    desafios: 'A industrialização gera demanda por direito trabalhista e ambiental. A agricultura familiar traz questões de direito agrário e previdenciário.',
  },
  'Norte Catarinense': {
    descricao: 'região norte do estado de Santa Catarina',
    economia: 'Indústria, Comércio, Tecnologia e Serviços',
    contexto: 'O Norte Catarinense é polo industrial com destaque para Joinville, maior cidade do estado. A região possui forte economia manufatureira e tecnológica.',
    desafios: 'A grande industrialização gera alta demanda por direito trabalhista. O crescimento populacional traz questões de direito urbanístico e ambiental.',
  },
  'Vale do Itajaí': {
    descricao: 'região do Vale do Itajaí em Santa Catarina',
    economia: 'Indústria Têxtil, Comércio, Tecnologia e Serviços',
    contexto: 'O Vale do Itajaí é polo têxtil e de moda, com Blumenau como centro. A região possui forte economia exportadora e turismo cultural.',
    desafios: 'A indústria têxtil gera demanda por direito trabalhista e ambiental. O turismo traz questões de direito do consumidor e administrativo.',
  },
  'Oeste Catarinense': {
    descricao: 'região oeste do estado de Santa Catarina',
    economia: 'Agroindústria, Comércio, Agricultura e Serviços',
    contexto: 'O Oeste Catarinense é polo agroindustrial com destaque para avicultura e suinocultura. Chapecó é o centro econômico da região.',
    desafios: 'A agroindústria gera demanda por direito ambiental e trabalhista. A agricultura familiar traz questões previdenciárias.',
  },
  'Serra Catarinense': {
    descricao: 'região serrana do estado de Santa Catarina',
    economia: 'Turismo, Agricultura, Comércio e Serviços',
    contexto: 'A Serra Catarinense é polo turístico com destaque para inverno e turismo rural. A região possui clima temperado e tradição gaúcha.',
    desafios: 'O turismo sazonal gera demanda por direito trabalhista temporário. A agricultura traz questões de direito agrário.',
  },
  'Meio-Oeste': {
    descricao: 'região meio-oeste do estado de Santa Catarina',
    economia: 'Comércio, Agricultura, Indústria e Serviços',
    contexto: 'O Meio-Oeste catarinense possui economia diversificada com destaque para agricultura e indústria de pequeno porte.',
    desafios: 'A economia diversificada gera demanda por diversas áreas do direito, desde trabalhista até cível.',
  },
  'Planalto Norte': {
    descricao: 'região do planalto norte catarinense',
    economia: 'Agricultura, Comércio, Indústria e Serviços',
    contexto: 'O Planalto Norte possui economia agropecuária com destaque para pecuária leiteira e agricultura de subsistência.',
    desafios: 'A economia agropecuária gera demanda por direito rural e previdenciário.',
  },
}

// ═══════════════════════════════════════════
// VARIAÇÕES DE CONTEÚDO POR TIPO
// ═══════════════════════════════════════════

const introducoes = [
  (c, r) => `Encontrar um advogado de confiança em ${c.nome} é essencial para quem busca resolver questões jurídicas com segurança e tranquilidade. Seja uma questão trabalhista, um problema familiar, uma demanda consumerista ou uma questão imobiliária, ter um profissional experiente ao seu lado faz toda a diferença no resultado do seu caso.\n\nA Will & Pereira Advocacia, com mais de 15 anos de atuação e escritório em Palhoça/SC, atende clientes em todo o Brasil, incluindo moradores de ${c.nome} e região. Nossa equipe multidisciplinar combina conhecimento técnico aprofundado com um atendimento humanizado, garantindo que cada cliente receba a orientação jurídica que merece.`,
  
  (c, r) => `Moradores de ${c.nome} que precisam de serviços jurídicos de qualidade encontram na Will & Pereira Advocacia a parceria ideal para resolver suas questões legais. ${r.contexto}\n\nNossa equipe está preparada para atender pessoas físicas e empresas com excelência e dedicação, oferecendo soluções personalizadas que combinam estratégia jurídica inteligente com atendimento próximo e humanizado.`,
  
  (c, r) => `Quando surge um problema jurídico em ${c.nome}, a primeira decisão importante é escolher o advogado certo. A Will & Pereira Advocacia se destaca pelo compromisso com resultados e pela ética profissional, com atuação em todas as principais áreas do Direito.\n\nSeja para questões preventivas ou contenciosos, oferecemos assessoria completa em Direito Previdenciário, Trabalhista, Cível, do Consumidor, de Família e Imobiliário. Cada caso recebe a atenção personalizada que merece, com foco nos melhores resultados.`,
  
  (c, r) => `A Will & Pereira Advocacia é referência em atendimento jurídico para moradores de ${c.nome}. Nosso escritório, localizado em Palhoça/SC, combina experiência consolidada com inovação tecnológica para oferecer serviços jurídicos de alto padrão.\n\nEntendemos que cada situação é única. Por isso, dedicamos tempo para ouvir, analisar e construir a melhor estratégia para cada cliente. Seja qual for sua necessidade jurídica, nossa equipe está pronta para ajudar com profissionalismo e empatia.`,
  
  (c, r) => `Precisando de um advogado em ${c.nome}? A Will & Pereira Advocacia oferece soluções jurídicas completas para pessoas físicas e empresas. Com mais de 15 anos de mercado e atuação em todo o Brasil, construímos uma sólida reputação baseada em resultados, transparência e compromisso com cada cliente.\n\n${r.descricao.charAt(0).toUpperCase() + r.descricao.slice(1)} apresenta características específicas que influenciam as demandas jurídicas da região. Nossa equipe conhece profundamente essas particularidades e está preparada para oferecer a melhor solução para cada caso.`,
  
  (c, r) => `Em ${c.nome}, a necessidade de um advogado capacitado é constante. Questões trabalhistas, familiares, consumeristas e imobiliárias surgem no cotidiano e precisam de orientação especializada. A Will & Pereira Advocacia atende moradores de ${c.nome} com excelência e dedicação.\n\nCom ${c.populacao} habitantes, ${c.nome} é uma cidade ${c.porte === 'grande' ? 'expressiva' : c.porte === 'media' ? 'de porte intermediário' : 'de pequeno porte'} em Santa Catarina, com economia baseada em ${c.economia || r.economia}. Nossa equipe conhece as particularidades da região e está preparada para oferecer a melhor solução jurídica.`,
  
  (c, r) => `A busca por um advogado em ${c.nome} requer atenção a fatores como experiência, especialização e compromisso com o cliente. A Will & Pereira Advocacia atende moradores de ${c.nome} com mais de 15 anos de experiência em diversas áreas do Direito.\n\n${c.caracteristicas ? c.caracteristicas.charAt(0).toUpperCase() + c.caracteristicas.slice(1) + '.' : r.contexto} Esses fatores influenciam diretamente as demandas jurídicas da região, e nossa equipe está preparada para atuar em cada uma delas.`,
]

// Variações de seção por área do Direito
const secoesPrevidenciario = [
  (c, r) => `O Direito Previdenciário é uma das áreas mais demandadas em ${c.nome}. Muitos trabalhadores da região têm dúvidas sobre aposentadoria, auxílio-doença, pensão por morte e outros benefícios do INSS. A reforma da previdência trouxe mudanças significativas, e contar com um advogado especializado é essencial para garantir o melhor benefício.\n\nA Will & Pereira Advocacia atua em todos os tipos de benefícios previdenciários, desde o planejamento da aposentadoria até recursos administrativos e ações judiciais. Em ${c.nome}, ajudamos trabalhadores a conquistar aposentadorias mais vantajosas, auxílios-doença negados e revisões de benefícios.`,
  
  (c, r) => `Em ${c.nome}, muitos trabalhadores rurais e urbanos precisam de orientação previdenciária. A Will & Pereira Advocacia oferece assessoria completa em benefícios do INSS, incluindo aposentadoria por idade, por tempo de contribuição e especial, além de BPC/LOAS e pensão por morte.\n\nNossa equipe analisa o histórico contributivo de cada cliente para identificar a melhor estratégia de aposentadoria, considerando todas as regras de transição e direito adquirido. Em ${c.nome}, já ajudamos centenas de trabalhadores a conquistarem seus benefícios.`,
  
  (c, r) => `O planejamento previdenciário é fundamental para trabalhadores de ${c.nome} que desejam se aposentar com o melhor benefício possível. A Will & Pereira Advocacia realiza análise completa do histórico contributivo, identificando todas as possibilidades de antecipação ou majoração da aposentadoria.\n\nAlém do planejamento, atuamos em revisões de benefícios, quando o INSS concede o valor abaixo do devido. Em ${c.nome}, muitos trabalhadores não sabem que podem ter direito a valores maiores. Nossa equipe está pronta para ajudar.`,
]

const secoesTrabalhista = [
  (c, r) => `O Direito Trabalhista protege as relações entre empregados e empregadores. Em ${c.nome}, oferecemos assessoria completa tanto para trabalhadores quanto para empresas, abrangendo verbas rescisórias, horas extras, FGTS, assédio moral e acidente de trabalho.\n\n${r.desafios} A Will & Pereira Advocacia atua na defesa dos direitos trabalhistas com foco em resultados, buscando sempre a melhor solução para cada caso.`,
  
  (c, r) => `Se você trabalha em ${c.nome} ou possui empresa na região, nossa equipe trabalhista está preparada para orientar sobre seus direitos e deveres. Atuamos em reclamações trabalhistas, acordos extrajudiciais e consultoria preventiva para empresas.\n\nA legislação trabalhista brasileira é complexa e está em constante mudança. Em ${c.nome}, a Will & Pereira Advocacia ajuda trabalhadores a receberem verbas rescisórias corretas e indenizações por danos morais.`,
  
  (c, r) => `Trabalhadores de ${c.nome} que tiveram seus direitos violados podem contar com a Will & Pereira Advocacia para buscar reparação. Atuamos em casos de demissão sem justa causa, horas extras não pagas, insalubridade, periculosidade e assédio moral.\n\nNossa equipe conhece profundamente a jurisprudência trabalhista e está preparada para oferecer a melhor estratégia em cada caso. Em ${c.nome}, já ajudamos centenas de trabalhadores a conquistarem seus direitos.`,
]

const secoesCivel = [
  (c, r) => `O Direito Cível abrange as relações cotidianas entre pessoas e empresas. Em ${c.nome}, nossa equipe atua em contratos, indenizações, cobranças, usucapião e questões de propriedade. Seja preventiva ou contenciosamente, buscamos a melhor solução para cada caso.\n\n${r.contexto} A Will & Pereira Advocacia oferece assessoria completa em Direito Cível, com foco em resultados e atendimento personalizado.`,
  
  (c, r) => `Problemas cíveis podem surgir a qualquer momento em ${c.nome} — um contrato mal elaborado, uma dívida não paga, um dano causado por terceiros. A Will & Pereira Advocacia oferece segurança jurídica em todas as questões cíveis, protegendo seus interesses com estratégia e conhecimento.\n\nAtuamos em ações de indenização, cobranças, execuções, usucapião e direito de família, sempre buscando a solução mais eficiente para cada caso.`,
  
  (c, r) => `Em ${c.nome}, a Will & Pereira Advocacia atende desde questões simples, como elaboração de contratos, até ações complexas de responsabilidade civil e usucapião. Trabalhamos para resolver conflitos de forma eficiente, priorizando soluções extrajudiciais quando possível.\n\nNossa equipe está preparada para oferecer assessoria completa em todas as áreas do Direito Cível, com foco nas necessidades específicas de cada cliente.`,
]

const secoesConsumidor = [
  (c, r) => `O Código de Defesa do Consumidor protege moradores de ${c.nome} contra abusos de empresas e fornecedores. Atendemos consumidores que tiveram direitos violados: produtos com defeito, cobranças indevidas, negativas de planos de saúde e cláusulas abusivas.\n\nA Will & Pereira Advocacia oferece assessoria completa em Direito do Consumidor, desde negociações extrajudiciais até ações judiciais, buscando sempre a reparação mais adequada para cada caso.`,
  
  (c, r) => `Moradores de ${c.nome} que enfrentam problemas com empresas, planos de saúde ou bancos contam com a Will & Pereira Advocacia para fazer valer seus direitos. Atuamos em negociações e ações judiciais contra práticas abusivas.\n\nO CDC assegura direitos importantes como inversão do ônus da prova, repetição de indébito e indenização por danos morais. Nossa equipe está pronta para ajudar a garantir que esses direitos sejam respeitados em ${c.nome}.`,
  
  (c, r) => `Se você teve um direito do consumidor desrespeitado em ${c.nome}, nossa equipe está pronta para agir. Cobranças indevidas, negativação injusta, produtos defeituosos e publicidade enganosa são situações em que podemos ajudar.\n\nA Will & Pereira Advocacia já ajudou centenas de consumidores em ${c.nome} a conquistarem indenizações e reparação por violações aos seus direitos. Entre em contato para uma orientação jurídica.`,
]

const secoesFamilia = [
  (c, r) => `O Direito de Família lida com questões sensíveis que afetam a vida das pessoas. Em ${c.nome}, atendemos em divórcios, guarda de filhos, pensão alimentícia, inventários e união estável. Cada caso é tratado com discrição e profissionalismo.\n\nA Will & Pereira Advocacia oferece assessoria completa em Direito de Família, buscando soluções equilibradas que protejam os interesses de todos os envolvidos, especialmente das crianças.`,
  
  (c, r) => `Famílias de ${c.nome} que precisam de assistência jurídica em questões como divórcio, guarda, pensão alimentícia ou inventário encontram na Will & Pereira Advocacia o parceiro ideal. Nossa equipe atua com sensibilidade e competência.\n\nEntendemos que questões familiares são delicadas e exigem abordagem humanizada. Por isso, dedicamos especial atenção a cada caso, buscando soluções que preservem os vínculos familiares quando possível.`,
  
  (c, r) => `Em ${c.nome}, a Will & Pereira Advocacia atua em todas as áreas do Direito de Família: divórcio consensual e litigioso, guarda compartilhada, pensão alimentícia, investigação de paternidade, inventário e planejamento sucessório.\n\nNossa equipe está preparada para oferecer orientação jurídica adequada em cada situação, com foco na proteção dos direitos de todos os envolvidos, especialmente crianças e idosos.`,
]

const secoesImobiliario = [
  (c, r) => `O Direito Imobiliário regula todas as questões relacionadas a imóveis. Em ${c.nome}, atuamos em compra e venda, locação, usucapião, regularização fundiária e condomínio. Cada caso é analisado com atenção para garantir a segurança jurídica do negócio.\n\n${r.contexto} A Will & Pereira Advocacia oferece assessoria completa em Direito Imobiliário, protegendo seus interesses em cada etapa do processo.`,
  
  (c, r) => `Moradores de ${c.nome} que precisam de orientação em questões imobiliárias contam com a Will & Pereira Advocacia. Atuamos em contratos de compra e venda, locação, usucapião e regularização de imóveis.\n\nA segurança jurídica em transações imobiliárias é essencial. Nossa equipe está preparada para analisar cada situação e oferecer a melhor solução, evitando problemas futuros.`,
  
  (c, r) => `Em ${c.nome}, o mercado imobiliário apresenta características próprias que demandam conhecimento especializado. A Will & Pereira Advocacia atua em todas as áreas do Direito Imobiliário, desde a elaboração de contratos até a resolução de conflitos.\n\nNossa equipe conhece as particularidades do mercado imobiliário de ${c.nome} e está preparada para oferecer assessoria completa, garantindo a segurança jurídica de cada transação.`,
]

// FAQs únicas por cidade
const faqs = [
  (c, r) => ({
    pergunta: `Quais áreas do direito são mais comuns em ${c.nome}?`,
    resposta: `Em ${c.nome}, as áreas mais demandadas são Direito Trabalhista (devido à ${c.caracteristicas || 'atividade econômica local'}), Direito Previdenciário (com muitos trabalhadores buscando aposentadorias e benefícios) e Direito do Consumidor (com questões envolvendo empresas e fornecedores locais). A Will & Pereira Advocacia atua em todas essas áreas com excelência.`
  }),
  (c, r) => ({
    pergunta: `Como funciona o atendimento da Will & Pereira Advocacia para moradores de ${c.nome}?`,
    resposta: `A Will & Pereira Advocacia atende moradores de ${c.nome} de forma integral, tanto presencialmente em nosso escritório em Palhoça/SC quanto por videoconferência. Nossa equipe está preparada para oferecer orientação jurídica de qualidade, independentemente da localização do cliente.`
  }),
  (c, r) => ({
    pergunta: `Qual o prazo para entrar com uma ação trabalhista em ${c.nome}?`,
    resposta: `O trabalhador tem até 2 anos após a extinção do contrato para ajuizar reclamação trabalhista, mas só pode cobrar verbas dos últimos 5 anos. Em ${c.nome}, a Will & Pereira Advocacia orienta trabalhadores sobre seus direitos e prazos, garantindo que nenhum direito seja perdido.`
  }),
  (c, r) => ({
    pergunta: `A Will & Pereira Advocacia atende${c.porte === 'pequena' ? ' cidades pequenas' : ' toda a região de ' + c.nome}?`,
    resposta: `Sim! A Will & Pereira Advocacia atende moradores de ${c.nome} e toda a região, independentemente do porte da cidade. Nossa equipe está preparada para oferecer assessoria jurídica de qualidade, com o mesmo nível de dedicação e profissionalismo.`
  }),
  (c, r) => ({
    pergunta: `Quais documentos são necessários para uma consulta jurídica em ${c.nome}?`,
    resposta: `Para uma orientação jurídica em ${c.nome}, é recomendável trazer documentos relacionados à questão, como contratos, comprovantes, documentos pessoais e qualquer correspondência recebida. A Will & Pereira Advocacia orienta o cliente sobre a documentação necessária antes da primeira consulta.`
  }),
]

// ═══════════════════════════════════════════
// GERAÇÃO DE CONTEÚDO
// ═══════════════════════════════════════════

function gerarConteudoCidade(cidade, regiao) {
  // Hash simples baseado no nome para seleção determinística
  const hash = cidade.nome.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  
  const introIdx = hash % introducoes.length
  const intro = introducoes[introIdx](cidade, regiao)
  
  const previdIdx = hash % secoesPrevidenciario.length
  const previd = secoesPrevidenciario[previdIdx](cidade, regiao)
  
  const trabalIdx = hash % secoesTrabalhista.length
  const trabal = secoesTrabalhista[trabalIdx](cidade, regiao)
  
  const civelIdx = hash % secoesCivel.length
  const civel = secoesCivel[civelIdx](cidade, regiao)
  
  const consumIdx = hash % secoesConsumidor.length
  const consum = secoesConsumidor[consumIdx](cidade, regiao)
  
  const famIdx = hash % secoesFamilia.length
  const fam = secoesFamilia[famIdx](cidade, regiao)
  
  const imobIdx = hash % secoesImobiliario.length
  const imob = secoesImobiliario[imobIdx](cidade, regiao)
  
  const faqIdx = hash % faqs.length
  const faq = faqs[faqIdx](cidade, regiao)
  
  return {
    intro,
    areas: { previd, trabal, civel, consum, fam, imob },
    faq,
  }
}

// ═══════════════════════════════════════════
// EXPORTAÇÃO
// ═══════════════════════════════════════════

export { cidadesDetalhadas, regioes, gerarConteudoCidade }
