#!/usr/bin/env node
/**
 * Gerador de Posts do Blog
 * 
 * Gera posts únicos para cada categoria do blog.
 * Uso: node scripts/gerar-posts-blog.mjs [--count 10] [--category todos]
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { randomBytes } from 'crypto'

const CATEGORIES = ['Previdenciario', 'Trabalhista', 'Civel', 'Consumidor', 'Familia', 'Imobiliario', 'Geral']

const CATEGORY_FILES = {
  'Previdenciario': 'posts-previdenciario.ts',
  'Trabalhista': 'posts-trabalhista.ts',
  'Civel': 'posts-civel.ts',
  'Consumidor': 'posts-consumidor.ts',
  'Familia': 'posts-familia.ts',
  'Imobiliario': 'posts-imobiliario.ts',
  'Geral': 'posts-geral.ts',
}

const CATEGORY_EXPORT = {
  'Previdenciario': 'previdenciarioPosts',
  'Trabalhista': 'trabalhistaPosts',
  'Civel': 'civelPosts',
  'Consumidor': 'consumidorPosts',
  'Familia': 'familiaPosts',
  'Imobiliario': 'imobiliarioPosts',
  'Geral': 'geralPosts',
}

const POSTS_DIR = new URL('../src/data/blog/', import.meta.url)

// Templates de post por categoria
const TEMPLATES = {
  'Geral': [
    { titleTag: 'Direitos', descTag: 'direitos dos cidadãos', estrutura: (cidade) => `## ${['Entenda','Guia Completo','Tudo que Você Precisa Saber Sobre','Você Sabia?'][Math.floor(Math.random()*4)]} ${['Direitos','Deveres','Obrigações','Garantias'][Math.floor(Math.random()*4)]} dos Cidadãos

Você já parou para pensar quantos direitos possui no dia a dia e muitas vezes não sabe? A Will & Pereira Advocacia preparou este guia completo para orientá-lo sobre os principais direitos dos cidadãos brasileiros.

${['Muitas pessoas desconhecem','Poucos sabem que','É comum não saber que','Você sabia que'][Math.floor(Math.random()*4)]} a legislação brasileira oferece diversas proteções aos cidadãos que vão muito além do que imaginamos.

${['Neste artigo completo, vamos explorar','A seguir, apresentamos','Confira neste guia','Preparamos um conteúdo especial sobre'][Math.floor(Math.random()*4)]} os principais direitos que todo cidadão deve conhecer para se proteger e garantir o cumprimento da lei.

## O que diz a Legislação Brasileira

A Constituição Federal de 1988, conhecida como Constituição Cidadã, estabelece diversos direitos fundamentais que protegem os brasileiros. Entre eles, destacam-se os direitos individuais, os direitos sociais e os direitos difusos.

${['É fundamental entender que','É importante ressaltar que','Vale destacar que','Cabe mencionar que'][Math.floor(Math.random()*4)]} o conhecimento desses direitos é o primeiro passo para exercê-los plenamente.

## Direitos Individuais

Os direitos individuais são aqueles que garantem a liberdade, a igualdade e a dignidade de cada pessoa. Eles incluem:

• Direito à vida e à integridade física
• Direito à liberdade de expressão e pensamento
• Direito à igualdade perante a lei
• Direito à propriedade privada
• Direito à segurança jurídica
• Direito à privacidade e intimidade
• Direito de reunião e associação
• Direito ao devido processo legal

## Direitos Sociais

Os direitos sociais são aqueles que garantem condições mínimas de dignidade aos cidadãos. Entre eles, estão:

• Direito à educação de qualidade
• Direito à saúde pública e universal
• Direito ao trabalho digno e à previdência social
• Direito à moradia adequada
• Direito ao lazer e ao descanso
• Direito à alimentação adequada
• Direito à assistência aos desamparados

## Como um Advogado Pode Ajudar

Muitas pessoas acreditam que só precisam de advogado quando enfrentam um processo judicial. No entanto, o acompanhamento jurídico preventivo é essencial para evitar problemas e garantir que seus direitos sejam respeitados.

Na Will & Pereira Advocacia, oferecemos orientação jurídica personalizada para ajudar você a entender e exercer seus direitos. Nossa equipe está preparada para atuar em todas as áreas do Direito, sempre com foco na melhor solução para cada caso.

**Orientações preventivas comuns:**
• Análise de contratos antes da assinatura
• Verificação de cláusulas trabalhistas
• Planejamento previdenciário
• Regularização de imóveis
• Elaboração de testamentos

**Resolução extrajudicial de conflitos:**
Nem todo problema precisa ir para a Justiça. Muitas questões podem ser resolvidas por meio de negociação, mediação ou conciliação, economizando tempo e recursos.

## Importância da Assessoria Jurídica

Ter um advogado de confiança é como ter um médico de família — você pode não precisar todos os dias, mas quando precisa, faz toda a diferença. A assessoria jurídica preventiva evita problemas antes que eles aconteçam.

${['A Will & Pereira Advocacia','Nosso escritório','Nossa equipe jurídica'][Math.floor(Math.random()*3)]} está à disposição para orientar você em todas as questões legais do seu dia a dia.

## Conclusão

Conhecer seus direitos é o primeiro passo para exercê-los. A Will & Pereira Advocacia está pronta para ajudar você a entender e proteger seus direitos em todas as situações.

📞 Entre em contato: (48) 98842-0867
🌐 Acesse: willepereira-adv.vercel.app

Não deixe seus direitos de lado. Conte com quem entende do assunto.` },
  ],
  'Previdenciario': [
    { titleTag: 'Aposentadoria', descTag: 'guia completo de aposentadoria', estrutura: () => `## ${['Guia Completo','Tudo sobre','Passo a Passo da','Entenda a'][Math.floor(Math.random()*4)]} ${['Aposentadoria','Aposentadoria por Tempo de Contribuição','Aposentadoria por Idade','Aposentadoria Especial','Aposentadoria da Pessoa com Deficiência','Reforma da Previdência'][Math.floor(Math.random()*6)]}

A previdência social brasileira passou por diversas mudanças nos últimos anos. A Reforma da Previdência (EC 103/2019) alterou significativamente as regras para concessão de benefícios. Neste guia completo, a Will & Pereira Advocacia explica tudo o que você precisa saber.

## Quem Tem Direito

Para ter direito aos benefícios previdenciários, é necessário ser segurado do INSS. São considerados segurados:

• Trabalhadores com carteira assinada (empregados)
• Trabalhadores avulsos
• Contribuintes individuais (autônomos e empresários)
• Trabalhadores rurais
• Segurados especiais (pescadores artesanais, indígenas)
• Facultativos (donas de casa, estudantes)

## Tipos de Aposentadoria

### Aposentadoria por Idade
A aposentadoria por idade é um dos benefícios mais comuns do INSS. Para ter direito, é necessário cumprir os seguintes requisitos:

**Homens:** 65 anos de idade + 20 anos de contribuição (após a reforma)
**Mulheres:** 62 anos de idade + 15 anos de contribuição (após a reforma)

### Aposentadoria por Tempo de Contribuição
Com a Reforma da Previdência, a aposentadoria por tempo de contribuição deixou de existir para novos segurados. No entanto, quem já estava no mercado de trabalho antes da reforma pode ter direito adquirido ou se enquadrar nas regras de transição.

**Regras de transição principais:**
• Sistema de pontos (idade + tempo de contribuição)
• Pedágio 50% (para quem faltava até 2 anos para se aposentar)
• Pedágio 100% (para quem faltava mais de 2 anos)
• Idade mínima progressiva

### Aposentadoria Especial
A aposentadoria especial é destinada a trabalhadores que exercem atividades com exposição a agentes nocivos à saúde (ruído, calor, agentes químicos, etc.).

**Requisitos:**
• 25 anos de atividade especial (para a maioria dos casos)
• 20 anos (para atividades de alto risco, como mineração subterrânea)
• 15 anos (para atividades de risco extremo)

### Aposentadoria da Pessoa com Deficiência
Pessoas com deficiência têm direito a regras especiais de aposentadoria, com requisitos reduzidos:

**Por idade:** 60 anos (homens) ou 55 anos (mulheres), com 15 anos de contribuição
**Por tempo:** 25 anos (homens) ou 20 anos (mulheres) para deficiência grave

## Documentos Necessários

Para solicitar qualquer benefício previdenciário, é necessário apresentar:

• Documento de identificação com foto (RG, CNH)
• CPF
• Carteira de Trabalho
• Comprovante de residência
• Extrato CNIS (Cadastro Nacional de Informações Sociais)
• PPP (Perfil Profissiográfico Previdenciário) para aposentadoria especial
• Laudos médicos, se houver
• Certidão de nascimento/casamento

## Como Solicitar

O pedido de aposentadoria pode ser feito:
• Pelo site Meu INSS (meu.inss.gov.br)
• Pelo aplicativo Meu INSS
• Pela central 135
• Presencialmente em uma agência do INSS (mediante agendamento)

## Conclusão

Planejar a aposentadoria com antecedência é fundamental para garantir um benefício justo e adequado. A Will & Pereira Advocacia oferece assessoria completa em planejamento previdenciário e concessão de benefícios.

📞 Entre em contato: (48) 98842-0867
📧 Email: contato@willepereira.adv.br` },
  ],
  'Trabalhista': [
    { titleTag: 'Direitos Trabalhistas', descTag: 'direitos dos trabalhadores', estrutura: () => `## ${['Direitos Trabalhistas','Guia dos Direitos do Trabalhador','Reforma Trabalhista','Verbas Rescisórias'][Math.floor(Math.random()*4)]}: ${['Tudo que Você Precisa Saber','Guia Completo','Entenda Seus Direitos','Passo a Passo'][Math.floor(Math.random()*4)]}

A Consolidação das Leis do Trabalho (CLT) completa mais de 80 anos de existência e continua sendo a principal norma que rege as relações trabalhistas no Brasil. Com a Reforma Trabalhista de 2017, muitas mudanças significativas ocorreram.

A Will & Pereira Advocacia preparou este guia completo para ajudar trabalhadores e empregadores a entenderem seus direitos e deveres nas relações de trabalho.

## Principais Direitos dos Trabalhadores

### Jornada de Trabalho
A jornada de trabalho padrão no Brasil é de 8 horas diárias e 44 horas semanais. Horas extras devem ser pagas com adicional mínimo de 50% sobre o valor da hora normal (dias úteis) e 100% (domingos e feriados).

**Controle de jornada:** Empresas com mais de 20 funcionários são obrigadas a manter controle de ponto, seja manual, mecânico ou eletrônico.

### Férias
Todo trabalhador tem direito a 30 dias de férias a cada 12 meses de trabalho (período aquisitivo). O pagamento das férias deve ser feito em dobro caso o empregador não conceda as férias dentro do período concessivo (12 meses após o período aquisitivo).

**Abono de férias:** O trabalhador pode converter até 1/3 do período de férias em abono pecuniário (vender 10 dias de férias).

### 13º Salário
O décimo terceiro salário é pago em duas parcelas:
• Primeira parcela: até 30 de novembro (metade do salário)
• Segunda parcela: até 20 de dezembro (metade do salário, com descontos)

### FGTS
O Fundo de Garantia do Tempo de Serviço (FGTS) corresponde a 8% do salário do trabalhador, depositado mensalmente pelo empregador em conta vinculada na Caixa Econômica Federal.

### Verbas Rescisórias
Ao ser demitido, o trabalhador tem direito a:
• Saldo de salário
• Aviso prévio (trabalhado ou indenizado)
• Férias vencidas e proporcionais (com 1/3)
• 13º salário proporcional
• FGTS do mês da rescisão
• Multa de 40% sobre o FGTS (dispensa sem justa causa)
• Seguro-desemprego

## Reforma Trabalhista

A Reforma Trabalhista (Lei 13.467/2017) trouxe mudanças significativas:

**O que mudou:**
• Negociado sobre o legislado em diversos temas
• Contribuição sindical deixou de ser obrigatória
• Criação do contrato de trabalho intermitente
• Possibilidade de acordo extrajudicial trabalhista
• Fim da obrigatoriedade do imposto sindical

## Conclusão

A legislação trabalhista brasileira é complexa e está em constante evolução. Ter o apoio de um advogado especializado é fundamental para garantir seus direitos.

A Will & Pereira Advocacia atua tanto na defesa de trabalhadores quanto na consultoria preventiva para empresas.

📞 Entre em contato: (48) 98842-0867
🌐 willepereira-adv.vercel.app` },
  ],
  'Civel': [
    { titleTag: 'Direito Cível', descTag: 'guia de direito civil', estrutura: () => `## ${['Guia Completo de Direito Cível','Direito Cível para Leigos','Entenda o Direito Cível','Tudo sobre Direito Cível'][Math.floor(Math.random()*4)]}

O Direito Cível é o ramo do Direito que regula as relações entre pessoas físicas e jurídicas no cotidiano. Desde contratos até indenizações, passando por questões de propriedade e família, o Direito Cível está presente em praticamente todos os aspectos da vida.

A Will & Pereira Advocacia preparou este guia completo para explicar os principais conceitos do Direito Cível e como eles afetam sua vida.

## Contratos

Os contratos são acordos de vontades que criam, modificam ou extinguem direitos e obrigações. No Direito Cível, os contratos são regidos por princípios como:

**Princípios contratuais:**
• Autonomia da vontade: as partes são livres para contratar
• Boa-fé objetiva: as partes devem agir com honestidade e lealdade
• Função social do contrato: o contrato não pode prejudicar terceiros
• Obrigatoriedade: o contrato faz lei entre as partes

## Responsabilidade Civil

A responsabilidade civil é a obrigação de reparar danos causados a terceiros. Pode ser:

**Contratual:** quando decorre do descumprimento de um contrato
**Extracontratual:** quando decorre de ato ilícito ou abuso de direito

## Usucapião

A usucapião é a forma de aquisição de propriedade pela posse prolongada e contínua. Existem várias modalidades:

**Usucapião extraordinária:** 15 anos de posse (10 anos se houver moradia)
**Usucapião ordinária:** 10 anos de posse com justo título e boa-fé
**Usucapião especial urbana:** 5 anos de posse de imóvel urbano até 250m²
**Usucapião especial rural:** 5 anos de posse de imóvel rural até 50 hectares

## Direito de Vizinhança

O Direito de Vizinhança regula as relações entre proprietários de imóveis vizinhos. Os principais temas incluem:

• Uso anormal da propriedade (ruídos, fumaça, odores)
• Árvores e plantas limítrofes
• Passagem forçada
• Águas e construções

## Conclusão

O Direito Cível é fundamental para a vida em sociedade. Se você tem dúvidas sobre contratos, indenizações, propriedade ou qualquer outra questão cível, a Will & Pereira Advocacia está pronta para ajudar.

📞 (48) 98842-0867
🌐 willepereira-adv.vercel.app` },
  ],
  'Consumidor': [
    { titleTag: 'Direitos do Consumidor', descTag: 'guia do Código de Defesa do Consumidor', estrutura: () => `## ${['Guia do Consumidor','Seus Direitos como Consumidor','Código de Defesa do Consumidor','Proteção ao Consumidor'][Math.floor(Math.random()*4)]}

O Código de Defesa do Consumidor (Lei 8.078/90) completa mais de 30 anos como um dos marcos legais mais importantes do Brasil. Considerado um dos mais avançados do mundo, o CDC protege os consumidores em suas relações com fornecedores de produtos e serviços.

## Seus Principais Direitos

### Produtos com Defeito
Se um produto apresenta defeito, o consumidor tem direito a:
• Troca do produto por outro igual
• Devolução do valor pago (com correção)
• Abatimento proporcional no preço
• Produto equivalente (se o modelo original não estiver disponível)

### Cobrança Indevida
Cobranças indevidas são mais comuns do que se imagina. Se você recebeu uma cobrança por um serviço não contratado ou um valor incorreto, saiba que:

• A empresa pode ser obrigada a pagar indenização por danos morais
• A cobrança deve ser cancelada e o nome retirado dos órgãos de proteção ao crédito
• Você tem direito à devolução em dobro do valor pago indevidamente

### Planos de Saúde
Os planos de saúde são uma das maiores fontes de reclamação nos órgãos de defesa do consumidor. Os principais problemas incluem:

• Negativa de cobertura para procedimentos previstos no rol da ANS
• Reajustes abusivos por faixa etária
• Rescisão unilateral do contrato
• Carência excessiva
• Exclusão de doenças pré-existentes

### Serviços Bancários
Bancos e instituições financeiras também estão sujeitos ao CDC:

• Tarifas abusivas e não autorizadas
• Juros excessivos e capitalização
• Descontos indevidos em conta corrente
• Produtos bancários vendidos sem informação adequada

## Como Reclamar

Se seus direitos foram violados, siga estes passos:

**1. Tente resolver diretamente:** Entre em contato com o SAC da empresa
**2. Registre reclamação:** Procon, Reclame Aqui ou Consumidor.gov.br
**3. Busque orientação jurídica:** Um advogado especializado pode avaliar seu caso

## Conclusão

Conhecer seus direitos como consumidor é essencial para não ser lesado nas relações de consumo. A Will & Pereira Advocacia oferece assessoria completa em Direito do Consumidor.

📞 (48) 98842-0867
🌐 willepereira-adv.vercel.app` },
  ],
  'Familia': [
    { titleTag: 'Direito de Família', descTag: 'guia de direito de família', estrutura: () => `## ${['Guia de Direito de Família','Direito de Família para Leigos','Entenda o Direito de Família','Tudo sobre Direito de Família'][Math.floor(Math.random()*4)]}

O Direito de Família é um dos ramos mais sensíveis do Direito, pois lida com as relações mais íntimas e importantes da vida das pessoas: casamento, união estável, filiação, guarda de filhos, pensão alimentícia e sucessão.

A Will & Pereira Advocacia oferece um atendimento acolhedor e sigiloso para todas as questões de Direito de Família, sempre buscando a melhor solução para todas as partes envolvidas.

## Divórcio

O divórcio é a dissolução do casamento. Pode ser:

**Divórcio consensual:** quando ambas as partes concordam com a separação e com todas as condições (partilha de bens, guarda de filhos, pensão)
**Divórcio litigioso:** quando não há acordo entre as partes sobre algum aspecto

### Divórcio em Cartório
Desde 2007, o divórcio consensual pode ser realizado em cartório, sem necessidade de ação judicial, desde que:
• Não haja filhos menores ou incapazes
• As partes estejam de acordo com todas as condições

## Guarda de Filhos

A guarda dos filhos pode ser:
**Guarda unilateral:** um dos pais detém a guarda e o outro tem direito de visitas
**Guarda compartilhada:** ambos os pais dividem a responsabilidade sobre os filhos

Desde 2014, a guarda compartilhada é a regra no Brasil, salvo quando um dos pais não tem condições de exercê-la.

## Pensão Alimentícia

A pensão alimentícia é devida quando a pessoa não tem condições de prover seu próprio sustento. Pode ser paga para:
• Filhos menores de idade
• Cônjuges ou ex-cônjuges que comprovem necessidade
• Filhos maiores que estejam estudando (até 24 anos)
• Pais que necessitem de auxílio

## União Estável

A união estável é reconhecida como entidade familiar desde a Constituição de 1988. Para ser caracterizada, precisa de:
• Convivência pública (notória)
• Contínua e duradoura
• Objetivo de constituir família

## Conclusão

Questões de Direito de Família exigem não apenas conhecimento jurídico, mas também sensibilidade e discrição. A Will & Pereira Advocacia está preparada para ajudar você a resolver suas questões familiares com respeito e profissionalismo.

📞 (48) 98842-0867
🌐 willepereira-adv.vercel.app` },
  ],
  'Imobiliario': [
    { titleTag: 'Direito Imobiliário', descTag: 'guia de direito imobiliário', estrutura: () => `## ${['Guia de Direito Imobiliário','Direito Imobiliário para Leigos','Tudo sobre Direito Imobiliário','Entenda o Direito Imobiliário'][Math.floor(Math.random()*4)]}

O Direito Imobiliário regula as relações envolvendo bens imóveis — desde a compra e venda até a locação, passando por questões como usucapião, financiamento e condomínio.

## Compra e Venda de Imóveis

A compra de um imóvel é um dos negócios mais importantes da vida. Para garantir segurança jurídica, é essencial:

**Antes da compra:**
• Verificar a matrícula atualizada do imóvel no cartório de registro
• Checar certidões negativas do vendedor (fiscais, trabalhistas, cíveis)
• Analisar o contrato de compra e venda com atenção
• Verificar a existência de ônus ou gravames sobre o imóvel

**Durante a compra:**
• Assinar contrato de promessa de compra e venda
• Pagar o Imposto de Transmissão de Bens Imóveis (ITBI)
• Registrar a compra no cartório de registro de imóveis

## Financiamento Imobiliário

O financiamento imobiliário é uma das formas mais comuns de adquirir um imóvel. Antes de contratar, é importante:

• Comparar taxas de juros entre diferentes bancos
• Verificar o Custo Efetivo Total (CET)
• Entender as cláusulas de reajuste
• Avaliar o seguro habitacional obrigatório
• Verificar a possibilidade de amortização

## Locação de Imóveis

A locação de imóveis é regida pela Lei do Inquilinato (Lei 8.245/91). Tanto locadores quanto locatários têm direitos e deveres:

**Direitos do locatário:**
• Utilizar o imóvel conforme o contrato
• Receber o imóvel em boas condições
• Ter a privacidade garantida
• Receber a devolução do depósito caução ao final do contrato

**Deveres do locatário:**
• Pagar o aluguel em dia
• Realizar pequenos reparos
• Comunicar problemas estruturais ao locador
• Devolver o imóvel nas condições em que recebeu

## Condomínio

A vida em condomínio exige respeito às regras da convenção condominial:
• Participar das assembleias
• Pagar as taxas condominiais em dia
• Respeitar as áreas comuns
• Não causar transtornos aos vizinhos

## Conclusão

Questões imobiliárias podem ser complexas e exigem assessoria jurídica especializada. A Will & Pereira Advocacia oferece segurança jurídica em todas as transações imobiliárias.

📞 (48) 98842-0867
🌐 willepereira-adv.vercel.app` },
  ],
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function generateSlug(title) {
  let slug = slugify(title)
  // Truncate to reasonable length
  if (slug.length > 80) slug = slug.slice(0, 80).replace(/-$/, '')
  return slug
}

function generateDate() {
  const now = new Date()
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`
}

// Generate a unique post
function generatePost(category, templates, existingSlugs, idx) {
  const template = templates[idx % templates.length]
  const baseTitle = `${template.titleTag} — ${['Guia Completo','Passo a Passo','Tudo que Você Precisa Saber','Guia Definitivo','Manual Prático'][Math.floor(Math.random()*5)]}`
  
  let title = `${baseTitle} | Will & Pereira Advocacia`
  let slug = generateSlug(baseTitle)
  
  // Ensure unique slug
  if (existingSlugs.has(slug)) {
    slug = slug + '-' + randomBytes(3).toString('hex')
  }
  
  const desc = `${template.descTag} — ${['Guia completo atualizado','Tudo que você precisa saber','Informações essenciais','Guia prático'][Math.floor(Math.random()*4)]}. Will & Pereira Advocacia.`
  
  const content = template.estrutura()
  
  existingSlugs.add(slug)
  
  return {
    slug,
    title,
    description: desc,
    category,
    date: generateDate(),
    author: 'Will & Pereira Advocacia',
    content,
  }
}

function formatEntry(post) {
  return `  {
    slug: '${post.slug}',
    title: '${post.title.replace(/'/g, "\\'")}',
    description: '${post.description.replace(/'/g, "\\'")}',
    category: '${post.category}',
    date: '${post.date}',
    author: '${post.author}',
    content: \`${post.content}\`,
  },`
}

function getExistingSlugs() {
  const slugs = new Set()
  for (const cat of CATEGORIES) {
    const fileName = CATEGORY_FILES[cat]
    const filePath = new URL(fileName, POSTS_DIR)
    try {
      const content = readFileSync(filePath, 'utf-8')
      const found = [...content.matchAll(/slug: '([^']+)'/g)].map(m => m[1])
      found.forEach(s => slugs.add(s))
    } catch {
      // File may not exist
    }
  }
  return slugs
}

function main() {
  const args = process.argv.slice(2)
  let count = 10
  let targetCategory = 'all'
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--count') count = parseInt(args[i+1]) || 10
    if (args[i] === '--category') targetCategory = args[i+1] || 'all'
  }
  
  const existingSlugs = getExistingSlugs()
  const categories = targetCategory === 'all' ? CATEGORIES : [targetCategory]
  
  let totalGenerated = 0
  let postsPerCategory = Math.ceil(count / categories.length)
  
  for (const cat of categories) {
    const templates = TEMPLATES[cat]
    if (!templates) continue
    
    const posts = []
    for (let i = 0; i < postsPerCategory; i++) {
      const post = generatePost(cat, templates, existingSlugs, i)
      posts.push(post)
      totalGenerated++
    }
    
    // Append to file
    const fileName = CATEGORY_FILES[cat]
    const exportName = CATEGORY_EXPORT[cat]
    const filePath = new URL(fileName, POSTS_DIR)
    
    try {
      let content = readFileSync(filePath, 'utf-8')
      // Find the insert point (before closing `]`)
      const insertIdx = content.lastIndexOf(']')
      if (insertIdx !== -1) {
        const newEntries = posts.map(formatEntry).join('\n\n')
        const newContent = content.slice(0, insertIdx) + '\n' + newEntries + '\n' + content.slice(insertIdx)
        writeFileSync(filePath, newContent, 'utf-8')
        console.log(`✅ ${posts.length} posts adicionados a ${fileName} (${exportName})`)
      }
    } catch (err) {
      console.error(`Erro ao processar ${fileName}: ${err.message}`)
    }
  }
  
  console.log(`\n📊 Total: ${totalGenerated} posts gerados`)
  console.log(`📁 Categorias: ${categories.join(', ')}`)
}

main()
