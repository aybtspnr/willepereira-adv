#!/usr/bin/env node
/**
 * Gerador de Landing Pages para Cidades
 * 
 * Uso: node scripts/gerar-cidades.mjs [batch|all|check]
 * - batch: gera 30 cidades (padrão)
 * - all: gera todas as cidades restantes
 * - check: mostra quantas faltam
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { cidadesSC, capitaisData, regioesSC, cidadesConhecidas, porteInfo } from './cidades-data.js'

const POSTS_DIR = new URL('../src/data/blog/', import.meta.url)
const POSTS_FILE = new URL('../src/data/blog/posts-cidades.ts', import.meta.url)

function slugify(name) {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function getCityInfo(name, regiao) {
  if (cidadesConhecidas[name]) return cidadesConhecidas[name]
  
  // Inferir porte pelo tamanho aproximado
  let porte = 'pequena'
  if (['Joinville','Florianópolis','Blumenau','São José','Criciúma','Chapecó','Itajaí','Jaraguá do Sul','Balneário Camboriú'].includes(name)) {
    porte = 'grande'
  } else if (['Lages','Tubarão','Brusque','Caçador','Concórdia','Rio do Sul','Mafra','São Bento do Sul','Indaial','Videira','Canoinhas','São Miguel do Oeste','Araranguá','Laguna','Curitibanos','Navegantes','Biguaçu'].includes(name)) {
    porte = 'media'
  }
  
  const reg = regioesSC[regiao]
  const pi = porteInfo[porte]
  const economia = reg ? reg.economiaPadrao : 'Comércio, Serviços e Agricultura'
  const comarca = `${name} está localizada na ${reg ? reg.desc : 'região catarinense'}`
  
  return { porte, economia, comarca }
}

function gerarPost(name, slug, regiao, isCapital = false, estado = '', estadoRegiao = '') {
  const info = getCityInfo(name, regiao)
  const pi = porteInfo[info.porte]
  const reg = isCapital ? null : regioesSC[regiao]
  
  const estadoNome = estado || 'Santa Catarina'
  const siglaEstado = estado ? estado : 'SC'
  const economia = info.economia
  const descLocal = isCapital 
    ? `${name}, capital do ${estadoNome}, está localizada na região ${estadoRegiao} do Brasil`
    : `${name} está localizada na ${reg ? reg.desc : 'região catarinense'}`
  const cidadeTipo = pi ? pi.tipo : 'cidade'
  
  // Distância aproximada (simulada para evitar dados incorretos)
  const distanciaMsg = isCapital 
    ? `${name} está localizada a uma distância considerável de nossa sede em Palhoça/SC, mas oferecemos atendimento online para todo o Brasil`
    : `Nossa equipe atende clientes de ${name} tanto presencialmente (mediante agendamento) quanto de forma online`
  
  // Informação de comarca
  const comarcaMsg = info.comarca
  
  // Info demográfica
  const popMsg = pi ? `população estimada em ${pi.pop}` : 'população diversificada'
  
  // Título e descrição SEO
  const titlePrefix = isCapital ? `${name} - ${estadoNome}` : name
  const title = `Advogado em ${titlePrefix} | Will & Pereira Advocacia`
  const desc = `Advocacia em ${name} — Will & Pereira Advocacia. Especialistas em Direito Previdenciário, Trabalhista, Cível, Consumidor, Família e Imobiliário. Atendimento em todo o ${isCapital ? 'Brasil' : estadoNome}.`
  
  // Seções específicas por região/economia
  let secaoEspecifica = ''
  if (info.porte === 'grande' || isCapital) {
    secaoEspecifica = `### 7. Atendimento Especializado em Grandes Centros
    
Atuar em ${name} exige conhecimento aprofundado da dinâmica local e dos tribunais da região. Nossa equipe está preparada para lidar com a complexidade das demandas jurídicas dos grandes centros, oferecendo:

• **Agilidade processual** — Acompanhamento próximo de cada etapa do processo
• **Conhecimento local** — Familiaridade com a jurisprudência dos tribunais da região
• **Estrutura completa** — Equipe multidisciplinar para atender demandas complexas
• **Atendimento personalizado** — Cada caso recebe a atenção que merece

Se você está em ${name} e precisa de um advogado que entenda as particularidades da região, conte com a Will & Pereira Advocacia.`
  } else if (info.porte === 'pequena') {
    secaoEspecifica = `### 7. Atendimento Personalizado para Cidades do Interior

Entendemos que moradores de cidades do interior como ${name} muitas vezes enfrentam dificuldades para encontrar advogados especializados. Nossa equipe supera essa barreira oferecendo:

• **Atendimento remoto** — Consultas por videoconferência sem sair de casa
• **Deslocamento programado** — Visitas presenciais quando necessário
• **Tecnologia a seu favor** — Acompanhamento online do andamento do processo
• **Relação de confiança** — Construímos uma parceria duradoura com cada cliente

Moradores de ${name} não precisam se deslocar para grandes centros para ter acesso a serviços jurídicos de excelência. A Will & Pereira Advocacia leva a advocacia de qualidade até você.`
  }

  const content = `## Advogado em ${titlePrefix} — ${isCapital ? 'Atendimento em Todo o Brasil' : cidadeTipo}

Se você está buscando um **advogado em ${name}**, sabe que encontrar o profissional certo pode fazer toda a diferença no resultado do seu caso. Seja uma questão trabalhista, um problema com imóvel, uma ação de divórcio, ou uma orientação sobre direitos do consumidor, ter um advogado experiente e comprometido ao seu lado é essencial.

A **Will & Pereira Advocacia**, com mais de 15 anos de atuação e escritório em Palhoça/SC, atende clientes em todo o ${isCapital ? 'Brasil' : estadoNome}, incluindo ${name} e região. Nossa equipe combina conhecimento técnico aprofundado com um atendimento humanizado, garantindo que você receba a orientação jurídica que merece, sem burocracia e com total transparência.

Neste artigo completo, vamos apresentar tudo o que você precisa saber sobre nossos serviços advocatícios em ${name}, as principais áreas do Direito que atuamos, e como podemos ajudar a resolver o seu caso com eficiência e dedicação.

## Áreas de Atuação da Will & Pereira Advocacia em ${name}

Na Will & Pereira Advocacia, oferecemos assessoria jurídica completa para moradores e empresas de ${name}. Nossa equipe multidisciplinar cobre as principais áreas do Direito, garantindo que você encontre exatamente o profissional certo para sua necessidade.

${isCapital ? `Como capital do ${estadoNome}, ${name} concentra uma grande diversidade de demandas jurídicas. Nossa equipe está preparada para atender desde questões simples do dia a dia até causas de alta complexidade, sempre com o mesmo padrão de excelência.` : `Com uma economia baseada em ${economia}, ${name} apresenta demandas jurídicas específicas que nossa equipe conhece profundamente.`}


### 1. Direito Previdenciário em ${name}

O **Direito Previdenciário** é uma das áreas mais buscadas por moradores de ${name}. Nosso escritório oferece assessoria completa em todos os benefícios do INSS, incluindo:

• **Aposentadoria por Tempo de Contribuição** — Para quem já contribuiu por tempo suficiente ao INSS
• **Aposentadoria por Idade** — Direito de trabalhadores urbanos e rurais
• **Aposentadoria por Invalidez** — Para quem se tornou permanentemente incapaz para o trabalho
• **Auxílio-Doença** — Benefício temporário para quem está temporariamente incapacitado
• **Pensão por Morte** — Proteção para dependentes em caso de falecimento do segurado
• **BPC-LOAS** — Benefício assistencial para idosos e pessoas com deficiência em situação de vulnerabilidade
• **Revisões de Benefícios** — Análise de revisões que podem aumentar o valor do seu benefício
• **Planejamento Previdenciário** — Estudo personalizado para garantir a melhor aposentadoria possível

Com as constantes mudanças na legislação previdenciária, contar com um advogado especializado em ${name} é essencial para garantir seus direitos junto ao INSS e evitar erros que podem comprometer seu benefício.

### 2. Direito Trabalhista em ${name}

O **Direito Trabalhista** protege as relações entre empregados e empregadores. Em ${name}, onde o mercado de trabalho é dinâmico, oferecemos assessoria completa em questões trabalhistas, tanto para empregados quanto para empresas:

**Para empregados:**
• **Verbas Rescisórias** — Cálculo e cobrança de direitos na rescisão do contrato de trabalho
• **Horas Extras** — Cobrança de horas extras não pagas ou pagas incorretamente
• **FGTS** — Verificação e cobrança de depósitos não realizados
• **Assédio Moral** — Ações contra assédio moral e psicológico no ambiente de trabalho
• **Acidente de Trabalho** — Direitos em caso de acidentes e doenças ocupacionais
• **Equiparação Salarial** — Direito ao mesmo salário para mesma função
• **Danos Morais** — Indenização por danos sofridos no ambiente laboral

**Para empresas:**
• **Consultoria Trabalhista** — Orientação preventiva para evitar passivos trabalhistas
• **Defesa em Reclamações Trabalhistas** — Representação judicial especializada
• **Acordos e Negociações** — Busca de soluções consensuais para conflitos trabalhistas
• **Due Diligence Trabalhista** — Análise de riscos em processos de fusão e aquisição

A complexidade da legislação trabalhista brasileira exige um advogado verdadeiramente especializado. Em ${name}, conte com nossa equipe para proteger seus direitos trabalhistas.

### 3. Direito Cível em ${name}

O **Direito Cível** abrange uma ampla gama de questões jurídicas do cotidiano. Em ${name}, oferecemos assessoria completa nas seguintes áreas:

• **Contratos** — Elaboração, análise e revisão de contratos civis e empresariais
• **Responsabilidade Civil** — Ações de indenização por danos materiais e morais
• **Cobranças** — Ações de cobrança judicial e extrajudicial
• **Usucapião** — Regularização de imóveis por meio de usucapião
• **Direito de Vizinhança** — Conflitos entre vizinhos e questões condominiais
• **Obrigações** — Questões envolvendo obrigações contratuais e legais
• **Sucessões** — Planejamento sucessório e inventários
• **Propriedade** — Questões envolvendo propriedade e posse de bens

Nossa equipe de Direito Cível em ${name} está preparada para orientar você em qualquer questão, seja de forma preventiva ou contenciosa, sempre buscando a melhor solução para seu caso.

### 4. Direito do Consumidor em ${name}

O **Código de Defesa do Consumidor** é um dos mais avançados do mundo, e conhecer seus direitos faz toda a diferença. Em ${name}, atendemos consumidores que tiveram seus direitos violados em diversas situações:

• **Produtos com Defeito** — Troca, devolução ou indenização por produtos defeituosos
• **Cobrança Indevida** — Cobranças abusivas e inexigibilidade de débitos
• **Planos de Saúde** — Negativas de cobertura, reajustes abusivos e rescisão unilateral
• **Serviços Bancários** — Tarifas abusivas, juros excessivos e descontos indevidos
• **Telefonia e Internet** — Cobranças indevidas, má prestação de serviços
• **Compras Online** — Problemas com delivery, arrependimento de compra, produtos não entregues
• **Transporte Aéreo** — Cancelamento de voos, overbooking, extravio de bagagem (${isCapital ? `especialmente relevante em ${name} por ser capital` : 'comum em todo o Brasil'})
• **Cláusulas Abusivas** — Identificação e combate a cláusulas contratuais abusivas

Se você teve algum direito do consumidor violado em ${name}, nossa equipe está pronta para ajudar, seja através de notificações extrajudiciais, acordos diretos ou ações judiciais.

### 5. Direito de Família em ${name}

O **Direito de Família** lida com as questões mais sensíveis da vida das pessoas. Em ${name}, oferecemos um atendimento acolhedor e sigiloso para questões familiares, sempre com foco na melhor solução para todas as partes envolvidas:

• **Divórcio** — Divórcio consensual e litigioso, com ou sem partilha de bens
• **Guarda de Filhos** — Guarda unilateral, compartilhada e direito de visitas
• **Pensão Alimentícia** — Fixação, revisão e execução de pensão alimentícia
• **União Estável** — Reconhecimento, dissolução e formalização de união estável
• **Inventário e Partilha** — Divisão de bens em caso de falecimento
• **Testamentos** — Elaboração e contestação de testamentos
• **Alienação Parental** — Ações para proteger crianças e adolescentes
• **Investigação de Paternidade** — Reconhecimento de paternidade e maternidade

Entendemos que questões de Direito de Família exigem sensibilidade e discrição. Por isso, nosso atendimento em ${name} é pautado pelo respeito, pela ética e pela busca de soluções que protejam seus direitos e sua família.

### 6. Direito Imobiliário em ${name}

O mercado **imobiliário em ${name}** é dinâmico e contar com assessoria jurídica especializada é fundamental para evitar problemas e garantir negócios seguros:

**Para compradores e vendedores:**
• **Compra e Venda** — Análise de contratos, escrituras e documentação de imóveis
• **Financiamento Imobiliário** — Análise de contratos bancários e taxas
• **Regularização de Imóveis** — Usucapião, averbação e registro de imóveis
• **ITBI** — Verificação e contestação de cálculo do imposto de transmissão

**Para locadores e locatários:**
• **Contratos de Locação** — Elaboração e revisão de contratos de aluguel
• **Ações de Despejo** — Despejo por falta de pagamento, término de contrato
• **Revisão de Aluguel** — Ações revisionais e renovatórias
• **Cobrança de Aluguéis** — Ações de cobrança de aluguéis atrasados

**Questões condominiais:**
• **Convenção de Condomínio** — Elaboração e alteração de convenções
• **Assembleias** — Assessoria para assembleias condominiais
• **Cobrança de Taxas** — Ações de cobrança de taxas condominiais atrasadas

Seja qual for sua demanda imobiliária em ${name}, nossa equipe oferece a segurança jurídica que você precisa para realizar negócios com tranquilidade.

${secaoEspecifica}

## Nossa Experiência a Seu Favor em ${name}

Com mais de 15 anos de atuação no Direito, a Will & Pereira Advocacia construiu uma reputação sólida baseada em:

• **Conhecimento aprofundado** da legislação e da jurisprudência dos tribunais ${isCapital ? 'brasileiros' : 'catarinenses'}
• **Relações de confiança** com clientes de todo o ${isCapital ? 'Brasil' : estadoNome}
• **Capacidade de negociação** para buscar acordos favoráveis sempre que possível
• **Postura firme em juízo** quando a via judicial é necessária
• **Inovação e tecnologia** aplicadas à prática jurídica para maior eficiência

Quando você contrata a Will & Pereira Advocacia, você não está apenas contratando um advogado — você está fazendo uma parceria com um escritório que realmente se importa com o seu caso.


## Sobre ${name} — Informações Locais

${descLocal} e possui ${popMsg}. ${isCapital ? `Como capital do ${estadoNome}, ${name} é o centro político, econômico e administrativo do estado.` : `A economia local é impulsionada principalmente por ${economia}, o que gera demandas jurídicas específicas nestes setores.`}

${comarcaMsg}. A Will & Pereira Advocacia, com sede em Palhoça/SC, oferece atendimento presencial e online para moradores de ${name}.

${distanciaMsg}. Seja para questões imobiliárias, trabalhistas, previdenciárias ou de família, a Will & Pereira Advocacia oferece o suporte jurídico completo que você merece.

## Como um Advogado Pode Ajudar Moradores de ${name} no Dia a Dia

Muitas pessoas acreditam que só precisam de advogado quando enfrentam um processo judicial. No entanto, o acompanhamento jurídico preventivo pode evitar problemas maiores e garantir tranquilidade em diversas situações do cotidiano.

**Orientações preventivas:** Antes de assinar um contrato de compra e venda de imóvel, firmar uma sociedade empresarial ou até mesmo antes de se aposentar, a orientação de um advogado especializado pode evitar dores de cabeça futuras. Em ${name}, muitos moradores têm buscado assessoria jurídica preventiva para:

• Analisar contratos de financiamento imobiliário antes da assinatura
• Verificar cláusulas em contratos de prestação de serviços
• Orientar-se sobre direitos trabalhistas antes de pedir demissão ou aceitar uma proposta de trabalho
• Planejar a aposentadoria com antecedência
• Regularizar documentação de imóveis
• Elaborar testamentos e planejar a sucessão familiar

**Resolução extrajudicial de conflitos:** Nem todo problema jurídico precisa ir parar na Justiça. Muitas questões podem ser resolvidas de forma extrajudicial, por meio de negociações, mediação ou conciliação. Isso economiza tempo, recursos financeiros e desgaste emocional. Nossa equipe está preparada para buscar soluções consensuais sempre que possível, recorrendo ao judiciário apenas quando necessário.

**Atendimento de emergência:** Imprevistos acontecem. Seja uma prisão em flagrante, uma notificação judicial urgente ou um prazo processual prestes a vencer, a Will & Pereira Advocacia oferece atendimento prioritário para situações de emergência, garantindo a melhor resposta possível nos momentos mais críticos.

## Atendimento para Pessoas Físicas e Empresas em ${name}

Na Will & Pereira Advocacia, atendemos tanto pessoas físicas quanto jurídicas em ${name}. Cada tipo de cliente tem necessidades específicas, e nossa equipe está preparada para oferecer soluções adequadas para cada perfil.

**Para pessoas físicas:** Oferecemos assessoria completa em questões pessoais e familiares, incluindo divórcio, guarda de filhos, pensão alimentícia, defesa do consumidor, questões trabalhistas, planejamento previdenciário e muito mais. Nosso objetivo é proteger seus direitos e oferecer tranquilidade em momentos de vulnerabilidade.

**Para empresas:** Prestamos consultoria empresarial preventiva e contenciosa, abrangendo direito trabalhista (defesa em reclamações trabalhistas, consultoria preventiva), direito contratual (elaboração e revisão de contratos), direito do consumidor (defesa em ações consumeristas) e assessoria em questões societárias.

**Atendimento familiar:** Muitas vezes, uma única demanda jurídica envolve múltiplos membros de uma família. Nossa equipe está preparada para atender famílias inteiras, oferecendo soluções integradas que consideram as necessidades de cada membro.

## Como Solicitar Nossos Serviços em ${name}

Solicitar nossos serviços jurídicos em ${name} é muito simples:

📞 **Telefone/WhatsApp**: (48) 98842-0867
🌐 **Site**: willepereira-adv.vercel.app
📍 **Endereço**: Rua Najla Carone Guedert, 1080 — Palhoça/SC

Entre em contato e agende uma orientação jurídica. Nossa equipe está pronta para ouvir você e oferecer a melhor solução para o seu caso.


## Dúvidas Comuns sobre Serviços Jurídicos em ${name}

### Quanto tempo de experiência vocês têm?
A Will & Pereira Advocacia atua há mais de 15 anos no mercado jurídico, com milhares de casos já conduzidos com sucesso.

### Como faço para contratar os serviços?
Basta entrar em contato pelo telefone (48) 98842-0867 ou pelo site. Agendaremos uma conversa para entender seu caso e apresentar nossa proposta.

### Vocês atendem causas trabalhistas para empresas?
Sim. Atendemos tanto empregados quanto empregadores em questões trabalhistas, sempre com foco na melhor solução para cada caso.

### Posso acompanhar o andamento do meu processo?
Sim. Mantemos nossos clientes informados sobre cada etapa do processo, seja por telefone, WhatsApp ou e-mail.

### Vocês atendem presencialmente em ${name}?
${isCapital ? `Sim, mediante agendamento prévio. Nosso escritório em Palhoça/SC também recebe clientes de todo o Brasil.` : `Sim, mediante agendamento. Nosso escritório em Palhoça/SC está preparado para receber clientes de ${name} e região.`}

### Quanto custa uma orientação jurídica?
Trabalhamos com condições de pagamento acessíveis, sempre combinadas previamente com cada cliente.

### Como sei se tenho direito a algum benefício?
Entre em contato conosco para uma avaliação. Analisaremos sua situação e informaremos se você tem direito ao benefício pretendido.


## Fale Conosco — Advocacia em ${titlePrefix}

A **Will & Pereira Advocacia** está à disposição para atender você em ${name}. Seja qual for sua necessidade jurídica, nossa equipe especializada está pronta para oferecer a melhor solução.

📞 **Ligue agora**: (48) 98842-0867
💬 **WhatsApp**: (48) 98842-0867
📍 **Endereço**: Rua Najla Carone Guedert, 1080 — Palhoça/SC

Entre em contato e agende sua orientação jurídica. Estamos prontos para ajudar você!`

  return { content, title, desc }
}

function gerarEntry(name, slug, title, desc, content) {
  return `  {
    slug: '${slug}',
    title: "${title}",
    description: "${desc}",
    category: 'Cidades',
    date: '${new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ de /g, ' ')}',
    author: 'Will & Pereira Advocacia',
    content: \`${content}\`,
  },`
}

function getExistingSlugs() {
  try {
    const content = readFileSync(POSTS_FILE, 'utf-8')
    const slugs = [...content.matchAll(/slug: '([^']+)'/g)].map(m => m[1])
    return new Set(slugs)
  } catch {
    return new Set()
  }
}

function getPendingCities(existingSlugs) {
  const pending = []
  
  // SC cities
  for (const [regiao, cidades] of Object.entries(cidadesSC)) {
    for (const name of cidades) {
      const slug = `advogado-em-${slugify(name)}`
      if (!existingSlugs.has(slug)) {
        pending.push({ name, slug, regiao, isCapital: false })
      }
    }
  }
  
  // Capitals
  for (const [name, slugBase, estado, regiao] of capitaisData) {
    const slug = `advogado-em-${slugify(slugBase)}`
    if (!existingSlugs.has(slug) && !existingSlugs.has(`advogado-em-${slugify(name)}`)) {
      pending.push({ name, slug, regiao, isCapital: true, estado: `${estado}` })
    }
  }
  
  return pending
}

function formatDate() {
  return new Date().toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric'
  }).replace(/ de /g, ' ')
}

function main() {
  const cmd = process.argv[2] || 'batch'
  const existingSlugs = getExistingSlugs()
  const pending = getPendingCities(existingSlugs)
  
  if (cmd === 'check') {
    console.log(`Cidades existentes: ${existingSlugs.size}`)
    console.log(`Cidades pendentes: ${pending.length}`)
    console.log(`\nPrimeiras 10 pendentes:`)
    pending.slice(0, 10).forEach(c => console.log(`  - ${c.name} (${c.isCapital ? 'Capital' : c.regiao})`))
    return
  }
  
  if (pending.length === 0) {
    console.log('✅ Todas as cidades já foram geradas!')
    return
  }
  
  const batchSize = cmd === 'all' ? pending.length : Math.min(30, pending.length)
  const batch = pending.slice(0, batchSize)
  
  console.log(`Gerando ${batch.length} cidades (${pending.length - batch.length} restantes)...`)
  
  // Read existing file
  let existingContent = ''
  try {
    existingContent = readFileSync(POSTS_FILE, 'utf-8')
  } catch {
    console.error('Arquivo posts-cidades.ts não encontrado!')
    process.exit(1)
  }
  
  // Generate entries
  const entries = batch.map(({ name, slug, regiao, isCapital, estado }) => {
    const { content, title, desc } = gerarPost(name, slug, regiao, isCapital, estado || '')
    return gerarEntry(name, slug, title, desc, content)
  })
  
  // Append before the closing `]`
  const insertIndex = existingContent.lastIndexOf(']')
  const newContent = existingContent.slice(0, insertIndex) + '\n' + entries.join('\n\n') + '\n' + existingContent.slice(insertIndex)
  
  writeFileSync(POSTS_FILE, newContent, 'utf-8')
  
  console.log(`✅ ${batch.length} cidades adicionadas com sucesso!`)
  console.log(`📁 Arquivo: src/data/blog/posts-cidades.ts`)
  console.log(`📊 Total: ${existingSlugs.size + batch.length} cidades (${pending.length - batch.length} restantes)`)
}

main()
