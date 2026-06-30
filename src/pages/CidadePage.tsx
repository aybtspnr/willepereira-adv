import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, MapPin, Phone, Mail, Building2, Heart, Briefcase, Shield, Users, Landmark, Scale, FileText, ChevronRight } from 'lucide-react'
import SEO from '../components/SEO'
import { getCidadeBySlug, type CidadeInfo } from '../data/cidades'

// ═══ VARIEDADE DE CONTEÚDO POR TIPO DE CIDADE ═══

type IntroTemplate = (cidade: CidadeInfo) => string
type SecaoTemplate = (cidade: CidadeInfo, variante: number) => string
type FaqTemplate = (cidade: CidadeInfo) => { pergunta: string; resposta: string }

// 5 variações de introdução
const introducoes: IntroTemplate[] = [
  (c) => `Se você está buscando um advogado em ${c.nome}, sabe que encontrar o profissional certo pode fazer toda a diferença no resultado do seu caso. Seja uma questão trabalhista, um problema com imóvel, uma ação de divórcio, ou uma orientação sobre direitos do consumidor, ter um advogado experiente e comprometido ao seu lado é essencial.

A Will & Pereira Advocacia, com mais de 15 anos de atuação e escritório em Palhoça/SC, atende clientes em todo o Brasil, incluindo ${c.nome} e região. Nossa equipe combina conhecimento técnico aprofundado com um atendimento humanizado, garantindo que você receba a orientação jurídica que merece.`,

  (c) => `Moradores de ${c.nome} que precisam de serviços jurídicos de qualidade encontram na Will & Pereira Advocacia a parceria ideal para resolver suas questões legais. Com mais de 15 anos de experiência e atuação em todas as áreas do Direito, nosso escritório está preparado para atender pessoas físicas e empresas com excelência e dedicação.

Não importa a complexidade do seu caso — nossa equipe multidisciplinar oferece soluções personalizadas, combinando estratégia jurídica inteligente com atendimento próximo e humanizado.`,

  (c) => `Quando surge um problema jurídico, a primeira decisão importante é escolher o advogado certo. Em ${c.nome}, a Will & Pereira Advocacia se destaca pelo compromisso com resultados e pela ética profissional. Nossa equipe, com sede em Palhoça/SC, atende clientes de toda a região há mais de 15 anos.

Seja para questões preventivas ou contenciosas, oferecemos assessoria completa em Direito Previdenciário, Trabalhista, Cível, do Consumidor, de Família e Imobiliário. Cada caso recebe a atenção personalizada que merece.`,

  (c) => `A Will & Pereira Advocacia é referência em atendimento jurídico para moradores de ${c.nome}. Nosso escritório, localizado em Palhoça/SC, combina experiência consolidada com inovação tecnológica para oferecer serviços jurídicos de alto padrão.

Entendemos que cada situação é única. Por isso, dedicamos tempo para ouvir, analisar e construir a melhor estratégia para cada cliente. Seja qual for sua necessidade jurídica, nossa equipe está pronta para ajudar com profissionalismo e empatia.`,

  (c) => `Precisando de um advogado em ${c.nome}? A Will & Pereira Advocacia oferece soluções jurídicas completas para pessoas físicas e empresas. Com mais de 15 anos de mercado e atuação em todo o Brasil, construímos uma sólida reputação baseada em resultados, transparência e compromisso com cada cliente.

Nossa equipe multidisciplinar cobre as principais áreas do Direito, garantindo que você encontre o profissional certo para sua necessidade, sem burocracia e com total dedicação.`,
]

// Variações de seção por área do Direito
const secoesPrevidenciario: SecaoTemplate[] = [
  (c, v) => `O Direito Previdenciário é uma das áreas mais buscadas por moradores de ${c.nome}. Nosso escritório oferece assessoria completa em benefícios do INSS, incluindo aposentadorias, pensões, auxílios e revisões. Com as constantes reformas na previdência, contar com um advogado especializado faz toda a diferença para garantir o melhor benefício possível.`,
  (c, v) => `Em ${c.nome}, muitos trabalhadores têm dúvidas sobre seus direitos previdenciários. A Will & Pereira Advocacia orienta clientes em todos os processos junto ao INSS: desde o planejamento da aposentadoria até recursos administrativos e ações judiciais contra negativas de benefícios.`,
  (c, v) => `A expertise da Will & Pereira Advocacia em Direito Previdenciário ajuda moradores de ${c.nome} a conquistarem aposentadorias mais vantajosas, auxílios-doença negados e revisões de benefícios. Cada caso é estudado individualmente para identificar a melhor estratégia.`,
]

const secoesTrabalhista: SecaoTemplate[] = [
  (c, v) => `O Direito Trabalhista protege as relações entre empregados e empregadores. Em ${c.nome}, oferecemos assessoria completa tanto para trabalhadores quanto para empresas, abrangendo verbas rescisórias, horas extras, FGTS, assédio moral, acidente de trabalho e defesa em reclamações trabalhistas.`,
  (c, v) => `Se você trabalha em ${c.nome} ou possui empresa na região, nossa equipe trabalhista está preparada para orientar sobre seus direitos e deveres. Atuamos em reclamações trabalhistas, acordos extrajudiciais, consultoria preventiva para empresas e defesa em ações judiciais.`,
  (c, v) => `A legislação trabalhista brasileira é complexa e está em constante mudança. Em ${c.nome}, a Will & Pereira Advocacia ajuda trabalhadores a receberem verbas rescisórias corretas, horas extras não pagas e indenizações por assédio moral, além de defender empresas em reclamações trabalhistas.`,
]

const secoesCivel: SecaoTemplate[] = [
  (c, v) => `O Direito Cível abrange as relações cotidianas entre pessoas e empresas. Em ${c.nome}, nossa equipe atua em contratos, indenizações, cobranças, usucapião, direito de vizinhança e questões de propriedade. Seja preventiva ou contenciosamente, buscamos a melhor solução para cada caso.`,
  (c, v) => `Problemas cíveis podem surgir a qualquer momento — um contrato mal elaborado, uma dívida não paga, um dano causado por terceiros. Em ${c.nome}, a Will & Pereira Advocacia oferece segurança jurídica em todas as questões cíveis, protegendo seus interesses com estratégia e conhecimento.`,
  (c, v) => `Nossa equipe de Direito Cível em ${c.nome} atende desde questões simples, como elaboração de contratos, até ações complexas de responsabilidade civil e usucapião. Trabalhamos para resolver conflitos de forma eficiente, priorizando soluções extrajudiciais quando possível.`,
]

const secoesConsumidor: SecaoTemplate[] = [
  (c, v) => `O Código de Defesa do Consumidor é um dos mais avançados do mundo. Em ${c.nome}, atendemos consumidores que tiveram direitos violados: produtos com defeito, cobranças indevidas, negativas de planos de saúde, problemas bancários e cláusulas abusivas em contratos.`,
  (c, v) => `Moradores de ${c.nome} que enfrentam problemas com empresas, planos de saúde ou bancos contam com a Will & Pereira Advocacia para fazer valer seus direitos. Atuamos em negociações extrajudiciais e ações judiciais contra práticas abusivas e descumprimento de obrigações.`,
  (c, v) => `Se você teve um direito do consumidor desrespeitado em ${c.nome}, nossa equipe está pronta para agir. Cobranças indevidas, negativação injusta, produtos defeituosos e publicidade enganosa são algumas das situações em que podemos ajudar a buscar indenização e reparação.`,
]

const secoesFamilia: SecaoTemplate[] = [
  (c, v) => `O Direito de Família lida com as questões mais sensíveis da vida. Em ${c.nome}, oferecemos atendimento acolhedor e sigiloso para divórcio, guarda de filhos, pensão alimentícia, união estável, inventário e testamentos. Nosso foco é proteger seus direitos e sua família com sensibilidade e ética.`,
  (c, v) => `Questões familiares exigem não apenas conhecimento jurídico, mas também sensibilidade humana. Em ${c.nome}, a Will & Pereira Advocacia oferece um ambiente seguro e acolhedor para tratar de divórcio, guarda de filhos, pensão alimentícia e planejamento sucessório.`,
  (c, v) => `A família é a base de tudo, e quando surgem conflitos, é fundamental ter apoio jurídico qualificado. Em ${c.nome}, nossa equipe de Direito de Família busca soluções que priorizem o bem-estar de todos os envolvidos, especialmente crianças e adolescentes.`,
]

const secoesImobiliario: SecaoTemplate[] = [
  (c, v) => `O mercado imobiliário em ${c.nome} exige assessoria jurídica especializada para garantir negócios seguros. Atuamos em compra e venda de imóveis, financiamento, regularização, contratos de locação, ações de despejo, revisão de aluguel e questões condominiais.`,
  (c, v) => `Comprar, vender ou alugar um imóvel em ${c.nome} envolve questões jurídicas importantes. A Will & Pereira Advocacia oferece segurança em todas as etapas: análise de contratos, regularização de documentos, financiamento imobiliário e ações possessórias.`,
  (c, v) => `Questões imobiliárias em ${c.nome} podem ser complexas — desde a verificação de documentação até ações judiciais. Nossa equipe orienta compradores, vendedores, locadores e locatários para garantir que cada transação seja segura e dentro da lei.`,
]

// FAQ variadas por tipo de cidade
const faqsPorTipo: Record<string, FaqTemplate[]> = {
  capital: [
    (c) => ({ pergunta: 'Como funciona o atendimento para ${c.nome}?', resposta: 'Oferecemos atendimento presencial mediante agendamento e consultas online por videoconferência. Nossa equipe está preparada para atender clientes de ${c.nome} com a mesma qualidade e dedicação.' }),
    (c) => ({ pergunta: 'Vocês conhecem a legislação local de ${c.nome}?', resposta: 'Sim. Nossa equipe acompanha a jurisprudência dos tribunais locais e tem experiência com as particularidades jurídicas de ${c.nome}.' }),
  ],
  'grande-centro': [
    (c) => ({ pergunta: 'Atendem causas de grande porte em ${c.nome}?', resposta: 'Sim. Nossa equipe está preparada para atuar em causas complexas e de alto valor em ${c.nome}, incluindo ações coletivas e litígios empresariais.' }),
    (c) => ({ pergunta: 'Qual o prazo médio para uma ação trabalhista?', resposta: 'O prazo varia conforme a complexidade e a vara trabalhista. Em geral, ações trabalhistas em ${c.nome} podem levar de 6 meses a 2 anos para conclusão.' }),
  ],
  'polo-regional': [
    (c) => ({ pergunta: 'Vocês atendem empresas em ${c.nome}?', resposta: 'Sim. Oferecemos consultoria empresarial preventiva e contenciosa para empresas de ${c.nome}, incluindo defesa trabalhista, contratual e consumerista.' }),
    (c) => ({ pergunta: 'Fazem visitas presenciais em ${c.nome}?', resposta: 'Sim, realizamos visitas programadas a ${c.nome} para atendimento presencial, além de consultas online regulares.' }),
  ],
  'cidade-pequena': [
    (c) => ({ pergunta: 'Como faço para contratar mesmo morando longe?', resposta: 'Nosso atendimento online permite que você contrate e acompanhe seu caso sem sair de casa. Basta entrar em contato pelo WhatsApp (48) 98842-0867.' }),
    (c) => ({ pergunta: 'Vocês conhecem a realidade de ${c.nome}?', resposta: 'Sim. Atendemos clientes de diversas cidades do interior e conhecemos as particularidades e desafios enfrentados por moradores de ${c.nome}.' }),
  ],
  turistica: [
    (c) => ({ pergunta: 'Atendem turistas que tiveram problemas em ${c.nome}?', resposta: 'Sim. Atendemos visitantes que enfrentaram problemas como acidentes, golpes ou violações de direitos durante sua estadia em ${c.nome}.' }),
    (c) => ({ pergunta: 'Questões imobiliárias em áreas turísticas?', respost: 'Trabalhamos com regularização de imóveis, contratos de aluguel por temporada e questões envolvendo propriedades em áreas de interesse turístico.' }),
  ],
  industrial: [
    (c) => ({ pergunta: 'Atendem sindicatos e associações em ${c.nome}?', resposta: 'Sim. Prestamos assessoria jurídica para entidades sindicais e associativas em ${c.nome}, incluindo negociações coletivas e defesa de direitos.' }),
    (c) => ({ pergunta: 'Trabalham com direito sindical?', resposta: 'Sim. Oferecemos assessoria em direito sindical, incluindo negociações coletivas, dissídios e representação de entidades sindicais.' }),
  ],
  agroindustrial: [
    (c) => ({ pergunta: 'Atendem produtores rurais em ${c.nome}?', resposta: 'Sim. Oferecemos assessoria jurídica especializada para produtores rurais, incluindo questões trabalhistas rurais, contratos agrários e direito ambiental.' }),
  ],
  serrana: [
    (c) => ({ pergunta: 'Atendem casos de acidentes em áreas rurais?', respost: 'Sim. Orientamos sobre direitos em caso de acidentes de trabalho no campo e questões previdenciárias para trabalhadores rurais.' }),
  ],
}

function getFaqs(cidade: CidadeInfo): { pergunta: string; resposta: string }[] {
  const templates = faqsPorTipo[cidade.tipoLocal] || faqsPorTipo['cidade-pequena']
  const faqs = templates.map(fn => fn(cidade))
  
  // FAQ fixas para todas as cidades
  faqs.push(
    { pergunta: `Quanto tempo de experiência a Will & Pereira Advocacia tem?`, resposta: `Atuamos há mais de 15 anos no mercado jurídico, com milhares de casos conduzidos com sucesso em todo o Brasil.` },
    { pergunta: `Como faço para contratar os serviços?`, resposta: `Basta entrar em contato pelo telefone (48) 98842-0867 ou pelo site. Agendaremos uma conversa para entender seu caso.` },
    { pergunta: `Vocês atendem causas de outras regiões?`, resposta: `Sim. Atendemos clientes de todo o Brasil, tanto presencialmente quanto por meio de consultas online.` },
    { pergunta: `Como sei se tenho direito a algum benefício?`, resposta: `Entre em contato conosco para uma avaliação gratuita da sua situação. Analisaremos seu caso e informaremos seus direitos.` },
  )
  
  return faqs
}

// Seção específica por tipo de cidade
function secaoEspecifica(cidade: CidadeInfo): string {
  switch (cidade.tipoLocal) {
    case 'capital':
      return `### 7. Atendimento Especializado em ${cidade.nome}

Como capital, ${cidade.nome} concentra uma grande diversidade de demandas jurídicas, desde questões simples do dia a dia até causas de alta complexidade que envolvem grandes empresas e questões constitucionais.

Nossa equipe está preparada para atuar em todos os tribunais da região, com conhecimento aprofundado da jurisprudência local e das particularidades do Direito na capital.

• **Agilidade processual** — Acompanhamento próximo de cada etapa do processo
• **Conhecimento local** — Familiaridade com a jurisprudência dos tribunais
• **Estrutura completa** — Equipe multidisciplinar para demandas complexas
• **Atendimento personalizado** — Cada caso recebe a atenção que merece`
    
    case 'grande-centro':
      return `### 7. Atendimento em Grandes Centros

${cidade.nome} é um importante centro urbano, com demandas jurídicas diversificadas que exigem conhecimento atualizado e estrutura adequada.

• **Equipe especializada** — Advogados dedicados a cada área do Direito
• **Atendimento ágil** — Respostas rápidas para questões urgentes
• **Tecnologia** — Sistema de acompanhamento online de processos
• **Presença local** — Atendimento presencial e online`
    
    case 'cidade-pequena':
      return `### 7. Atendimento Personalizado para Cidades do Interior

Entendemos que moradores de cidades do interior como ${cidade.nome} muitas vezes têm dificuldade para encontrar advogados especializados. Nossa equipe supera essa barreira:

• **Atendimento remoto** — Consultas por videoconferência sem sair de casa
• **Deslocamento programado** — Visitas presenciais quando necessário
• **Acompanhamento online** — Acompanhe o andamento pelo WhatsApp
• **Relação de confiança** — Parceria duradoura com cada cliente`
    
    case 'turistica':
      return `### 7. Direito Aplicado ao Turismo

${cidade.nome} é um destino turístico que atrai visitantes de todo o Brasil. Oferecemos assessoria especializada para questões relacionadas ao turismo:

• **Direito do Consumidor** — Problemas com serviços turísticos
• **Direito Imobiliário** — Compra e venda de imóveis na região
• **Aluguel por Temporada** — Contratos e questões locatícias
• **Acidentes** — Indenizações para turistas e moradores`
    
    default:
      return `### 7. Compromisso com Resultados em ${cidade.nome}

A Will & Pereira Advocacia trata cada caso com a dedicação que ele merece. Nossa equipe trabalha incansavelmente para oferecer a melhor solução jurídica para moradores de ${cidade.nome}.

• **Transparência total** — Você sabe exatamente o que está sendo feito
• **Comunicação constante** — Atualizações regulares sobre o andamento
• **Estratégia personalizada** — Cada caso é único, cada solução também
• **Resultados reais** — Nosso histórico fala por si`
  }
}

function sobreCidade(cidade: CidadeInfo): string {
  const pop = (cidade.porte === 'grande' || cidade.isCapital)
    ? `${cidade.populacao} habitantes` 
    : cidade.porte === 'media' 
      ? 'população entre 50 e 200 mil habitantes'
      : 'população acolhedora do interior'
  
  if (cidade.isCapital) {
    return `### Sobre ${cidade.nome}

${cidade.nome} é a capital de ${cidade.estado === 'SC' ? 'Santa Catarina' : cidade.regiao} e possui aproximadamente ${pop}. Como centro político e econômico do estado, concentra órgãos públicos, empresas e uma intensa atividade comercial e de serviços.

A economia de ${cidade.nome} é diversificada, com destaque para ${cidade.economia}. Essa característica influencia diretamente as demandas jurídicas mais comuns na região.`
  }
  
  const detalhesLocal = {
    'Grande Florianópolis': 'fazendo parte da região metropolitana da capital catarinense',
    'Sul Catarinense': 'sendo um importante polo da região sul catarinense',
    'Norte Catarinense': 'integrando a dinâmica região norte do estado',
    'Vale do Itajaí': 'situada no movimentado Vale do Itajaí',
    'Oeste Catarinense': 'localizada na pujante região oeste do estado',
    'Serra Catarinense': 'em meio às paisagens da serra catarinense',
    'Meio-Oeste': 'na região meio-oeste de Santa Catarina',
    'Planalto Norte': 'no planalto norte catarinense',
  }
  
  return `### Sobre ${cidade.nome}

${cidade.nome} está localizada na ${cidade.regiao} de Santa Catarina, ${detalhesLocal[cidade.regiao] || ''}. A cidade possui aproximadamente ${pop}.

A economia local é impulsionada principalmente por ${cidade.economia}, o que gera demandas jurídicas específicas nestes setores. A Will & Pereira Advocacia conhece profundamente a realidade de ${cidade.nome} e está preparada para atender suas necessidades jurídicas.`
}

function ctaSection(cidade: CidadeInfo): string {
  return `A **Will & Pereira Advocacia** está à disposição para atender você em ${cidade.nome}. Seja qual for sua necessidade jurídica, nossa equipe especializada está pronta para oferecer a melhor solução.

📞 **Ligue agora**: (48) 98842-0867
💬 **WhatsApp**: (48) 98842-0867
📍 **Endereço**: Rua Najla Carone Guedert, 1080 — Palhoça/SC
🌐 **Site**: willepereira-adv.vercel.app

Entre em contato e agende sua orientação jurídica. Estamos prontos para ajudar você!`
}

// ═══ COMPONENTE ═══

export default function CidadePage() {
  const { slug } = useParams<{ slug: string }>()
  const cidade = slug ? getCidadeBySlug(slug) : undefined
  
  if (!cidade) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-navy mb-4">Cidade não encontrada</h1>
          <Link to="/" className="text-gold hover:underline">Voltar ao início</Link>
        </div>
      </div>
    )
  }
  
  // Escolher variações de conteúdo baseadas no nome da cidade (determinístico)
  const seed = cidade.nome.length + cidade.regiao.length
  const introIdx = seed % introducoes.length
  const prevIdx = seed % secoesPrevidenciario.length
  const trabIdx = (seed + 1) % secoesTrabalhista.length
  const civIdx = (seed + 2) % secoesCivel.length
  const consIdx = (seed + 3) % secoesConsumidor.length
  const famIdx = (seed + 4) % secoesFamilia.length
  const imbIdx = (seed + 5) % secoesImobiliario.length
  
  const content = `${introducoes[introIdx](cidade)}

## Áreas de Atuação em ${cidade.nome}

Na Will & Pereira Advocacia, oferecemos assessoria jurídica completa para moradores e empresas de ${cidade.nome}. Nossa equipe multidisciplinar cobre as principais áreas do Direito.

${cidade.isCapital ? `Como capital, ${cidade.nome} concentra grande diversidade de demandas jurídicas — desde questões cotidianas até causas de alta complexidade envolvendo empresas e órgãos públicos.` : `Com economia baseada em ${cidade.economia}, ${cidade.nome} apresenta demandas jurídicas específicas que nossa equipe conhece profundamente.`}


### 1. Direito Previdenciário em ${cidade.nome}

${secoesPrevidenciario[prevIdx](cidade, prevIdx)}

**Principais serviços:**
• Aposentadoria por Tempo de Contribuição e por Idade
• Aposentadoria Especial e da Pessoa com Deficiência
• Auxílio-Doença e Aposentadoria por Invalidez
• Pensão por Morte e Auxílio-Reclusão
• BPC/LOAS (Benefício de Prestação Continuada)
• Revisão de Benefícios e Recursos Administrativos
• Planejamento Previdenciário Personalizado

As constantes reformas na previdência tornam essencial o acompanhamento de um advogado especializado. Em ${cidade.nome}, conte com nossa equipe para garantir seus direitos junto ao INSS.


### 2. Direito Trabalhista em ${cidade.nome}

${secoesTrabalhista[trabIdx](cidade, trabIdx)}

**Para empregados:**
• Verbas Rescisórias e Direitos na Dispensa
• Horas Extras e Adicionais
• FGTS não Depositado
• Assédio Moral e Dano Moral
• Acidente de Trabalho e Estabilidade
• Equiparação Salarial

**Para empresas:**
• Consultoria Trabalhista Preventiva
• Defesa em Reclamações Trabalhistas
• Acordos e Negociações
• Due Diligence Trabalhista

A legislação trabalhista brasileira é complexa e está em constante mudança. Ter um advogado especializado em ${cidade.nome} pode evitar prejuízos e garantir seus direitos.


### 3. Direito Cível em ${cidade.nome}

${secoesCivel[civIdx](cidade, civIdx)}

• Contratos — Elaboração, análise e revisão
• Responsabilidade Civil — Ações de indenização
• Cobranças — Ações judiciais e extrajudiciais
• Usucapião — Regularização de imóveis
• Direito de Vizinhança — Conflitos condominiais
• Sucessões — Planejamento sucessório e inventários


### 4. Direito do Consumidor em ${cidade.nome}

${secoesConsumidor[consIdx](cidade, consIdx)}

• Produtos com Defeito — Troca, devolução ou indenização
• Cobrança Indevida — Negativação injusta e abusos
• Planos de Saúde — Negativas e reajustes abusivos
• Serviços Bancários — Tarifas e juros excessivos
• Telefonia e Internet — Má prestação de serviços
• Cláusulas Abusivas — Contratos de adesão


### 5. Direito de Família em ${cidade.nome}

${secoesFamilia[famIdx](cidade, famIdx)}

• Divórcio Consensual e Litigioso
• Guarda de Filhos e Regulamentação de Visitas
• Pensão Alimentícia
• União Estável e Casamento
• Inventário e Partilha de Bens
• Alienação Parental
• Planejamento Sucessório


### 6. Direito Imobiliário em ${cidade.nome}

${secoesImobiliario[imbIdx](cidade, imbIdx)}

**Compra e Venda:**
• Análise de contratos e escrituras
• Financiamento Imobiliário
• Regularização de Imóveis

**Locação:**
• Contratos de Aluguel
• Ações de Despejo
• Revisão de Aluguel

**Condomínio:**
• Convenção Condominial
• Assembleias
• Cobrança de Taxas


${secaoEspecifica(cidade)}

## Nossa Experiência a Seu Favor

Com mais de 15 anos de atuação, a Will & Pereira Advocacia construiu uma reputação sólida baseada em:

• **Conhecimento aprofundado** da legislação e jurisprudência
• **Relações de confiança** com clientes de todo o Brasil
• **Capacidade de negociação** para acordos favoráveis
• **Postura firme em juízo** quando necessário
• **Inovação e tecnologia** aplicadas ao Direito


${sobreCidade(cidade)}

## Como um Advogado Pode Ajudar no Dia a Dia

Muitas pessoas acreditam que só precisam de advogado quando enfrentam um processo. No entanto, o acompanhamento preventivo evita problemas maiores.

**Orientações preventivas comuns em ${cidade.nome}:**
• Análise de contratos antes da assinatura
• Verificação de cláusulas trabalhistas
• Planejamento previdenciário
• Regularização de imóveis
• Elaboração de testamentos

**Resolução extrajudicial:** Muitos conflitos podem ser resolvidos sem ação judicial, economizando tempo e recursos. Nossa equipe busca soluções consensuais sempre que possível.

**Atendimento de emergência:** Imprevistos acontecem. Oferecemos atendimento prioritário para situações urgentes.


## Dúvidas Frequentes

${getFaqs(cidade).map(faq => `### ${faq.pergunta}\n\n${faq.resposta}`).join('\n\n')}


## Fale Conosco — Advocacia em ${cidade.nome}

${ctaSection(cidade)}`

  return (
    <div>
      <SEO
        title={`Advogado em ${cidade.nome}${cidade.isCapital ? ` - ${cidade.regiao}` : ' - SC'} | Will & Pereira Advocacia`}
        description={`Advocacia em ${cidade.nome}. Mais de 15 anos de experiência em Direito Previdenciário, Trabalhista, Cível, Consumidor, Família e Imobiliário. Atendimento em todo o Brasil.`}
        canonical={`https://willepereira-adv.vercel.app/blog/${cidade.slug}`}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a2634_0%,_#0f1729_100%)]" />
        <div className="relative z-10 container text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-gold-15 text-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-4"
          >
            Advocacia em {cidade.nome} • {cidade.isCapital ? 'Capital' : cidade.regiao}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4"
          >
            Advogado em {cidade.nome}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg"
          >
            {cidade.isCapital 
              ? `Atendimento jurídico especializado em ${cidade.nome}, capital de ${cidade.estado === 'SC' ? 'Santa Catarina' : cidade.regiao}.`
              : `Soluções jurídicas completas para moradores de ${cidade.nome} e região.`}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Link
              to="/contato"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
            >
              Fale Conosco <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="prose max-w-none">
            {content.split('\n').map((line, i) => {
              if (line.startsWith('### ')) {
                return (
                  <h3 key={i} className="font-serif text-2xl text-navy mt-12 mb-4">
                    {line.replace('### ', '')}
                  </h3>
                )
              }
              if (line.startsWith('## ')) {
                return (
                  <h2 key={i} className="font-serif text-3xl text-navy mt-16 mb-6">
                    {line.replace('## ', '')}
                  </h2>
                )
              }
              if (line.startsWith('**')) {
                const match = line.match(/\*\*(.+?)\*\*/)
                if (match) {
                  return (
                    <p key={i} className="text-navy font-semibold mt-6 mb-3">
                      <strong>{match[1]}</strong>{line.replace(/\*\*(.+?)\*\*/, '')}
                    </p>
                  )
                }
              }
              if (line.startsWith('• ')) {
                return (
                  <div key={i} className="flex items-start gap-3 ml-4 my-1">
                    <CheckCircle size={16} className="text-gold mt-1 shrink-0" />
                    <span className="text-gray-600">{line.replace('• ', '')}</span>
                  </div>
                )
              }
              if (line.startsWith('📞') || line.startsWith('💬') || line.startsWith('📍') || line.startsWith('🌐')) {
                return (
                  <div key={i} className="flex items-center gap-3 ml-4 my-2">
                    <span className="text-lg">{line}</span>
                  </div>
                )
              }
              if (line.trim() === '') {
                return <div key={i} className="h-4" />
              }
              return <p key={i} className="text-gray-600 leading-relaxed mb-4">{line}</p>
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-24 md:py-28 bg-gradient-to-b from-navy-dark via-navy to-navy text-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-5 rounded-full blur-[150px]" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)' }} />
        <div className="relative z-10 container max-w-3xl pb-16 md:pb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-10 text-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Fale Conosco
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4">
            Precisa de um Advogado em {cidade.nome}?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Entre em contato. Analisamos cada situação individualmente com atenção e dedicação.
          </p>
          <Link
            to="/contato"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
          >
            Fale Conosco <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-gray-500 text-sm mt-8">
            Atendimento em todo o Brasil • Presencial e Online • Sigilo Profissional
          </p>
        </div>
      </section>
    </div>
  )
}
