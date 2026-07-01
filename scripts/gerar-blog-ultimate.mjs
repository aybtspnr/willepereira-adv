import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const blogDir = join(__dirname, '..', 'src', 'data', 'blog')

const postsUltimos = [
  {cat:'previdenciario',slug:'beneficio-ncidencia-permanente-invalidez-como-obter',title:'Aposentadoria por Invalidez: Requisitos e Documentação',desc:'Guia completo para obter aposentadoria por incapacidade permanente.',content:`## Requisitos\n\n- 12 contribuições\n- Qualidade de segurado\n- Incapacidade total e permanente\n- Impossibilidade de reabilitação\n\n## Documentos\n\n- RG e CPF\n- Carteira de trabalho\n- Laudos médicos detalhados\n- Exames de imagem\n- Relatórios de especialistas\n\n## Procedimento\n\n1. Agendamento pelo Meu INSS\n2. Perícia médica\n3. Análise do quadro clínico\n4. Decisão do INSS\n\n## Valor\n\n- 60% da média + 2% por ano acima de 20/15 anos\n- Exceção: acidente de trabalho = 100%\n\n## Revisão\n\n- INSS pode convocar para nova perícia\n- Exceto se 60+ anos ou 15+ anos de concessão\n\n## Consulte advogado\n\nA aposentadoria por invalidez requer prova robusta da incapacidade. Um advogado pode orientar sobre a documentação necessária.`},

  {cat:'trabalhista',slug:'estabilidade-provisoria-acidente-trabalho',title:'Estabilidade Provisória: 12 Meses após Acidente de Trabalho',desc:'Conheça seus direitos quando retorna ao trabalho após afastamento por acidente.',content:`## O que é estabilidade?\n\nGarantia de emprego por 12 meses após retorno do afastamento por acidente.\n\n## Base legal\n\nArt. 118, Lei 8.213/91\n\n## Quem tem direito?\n\n- Trabalhadores afastados por B91\n- Acidente de qualquer natureza\n- Doença profissional/doença do trabalho\n\n## O que a empresa não pode fazer?\n\n- Demitir sem justa causa\n- Ameaçar demissão\n- Coagir pedido de demissão\n\n## Se a empresa demitir?\n\n- Reintegração\n- Salários do período\n- FGTS com multa de 40%\n- Indenização por danos morais\n\n## Como comprovar?\n\n- CAT emitida\n- Afastamento pelo INSS (B91)\n- Retorno ao trabalho\n- Comprovante de alta médica`},

  {cat:'civel',slug:'usucapiao-especial-urbana-5-anos',title:'Usucapião Especial Urbana: 5 Anos de Posse',desc:'Como adquirir imóvel urbano de até 250m² com 5 anos de posse.',content:`## Requisitos\n\n- Posse mansa, pacífica, contínua\n- Até 250m²\n- Para moradia\n- 5 anos de posse\n\n## Procedimento\n\n1. Requerimento ao cartório\n2. Instrução documental\n3. Manifestação dos confinantes\n4. Levantamento topográfico\n5. Registro da sentença\n\n## Documentos\n\n- Comprovantes de posse\n- Certidões negativas\n- Matrícula do imóvel\n- Documentos dos confinantes\n- Laudo topográfico\n\n## Vantagens\n\n- Mais rápido que judicial\n- Custo menor\n- Sem necessidade de juiz\n\n## Prazo\n\n- 6 a 12 meses\n\n## Consulte advogado\n\nA usucapião extrajudicial requer documentação específica. Um advogado pode orientar sobre os requisitos.`},

  {cat:'consumidor',slug:'compra-pela-internet-7-dias-arrependimento',title:'Compra Online: Direito de Arrependimento em 7 Dias',desc:'Conheça seu direito de devolver produtos comprados pela internet em até 7 dias.',content:`## Direito de arrependimento\n\n- **7 dias** para devolver\n- Sem necessidade de justificativa\n- Devolução do valor integral\n\n## Base legal\n\nArt. 49 do CDC\n\n## Como proceder\n\n1. **Notifique** o vendedor\n2. **Devoluta** o produto\n3. **Receba** o reembolso\n\n## Cuidados\n\n1. **Guarde** embalagem e acessórios\n2. **Documente** a compra\n3. **Não use** o produto\n4. **Devoluta** com todos os acessórios\n\n## Exceções\n\n- Produto personalizado\n- Produto perecível\n- Software aberto\n- Serviço já iniciado\n\n## Prazo de reembolso\n\n- Até **30 dias** após a devolução\n- Forma original de pagamento`},

  {cat:'familia',slug:'inventario-extrajudicial-como-funciona',title:'Inventário Extrajudicial: Como Funciona em Cartório',desc:'Guia para inventário rápido e econômico em cartório.',content:`## Requisitos\n\n- Todos os herdeiros capazes\n- Concordância na partilha\n- Ausência de testamento\n- Assessoria de advogado\n\n## Vantagens\n\n- Mais rápido (semanas)\n- Mais barato\n- Sem audiência judicial\n\n## Procedimento\n\n1. Escolha do cartório\n2. Documentação completa\n3. Escritura pública\n4. Registro no cartório de imóveis\n\n## Documentos\n\n- Certidão de óbito\n- Certidão de nascimento/casamento\n- Comprovantes de residência\n- Documentos dos bens\n- Testamento (se houver)\n- Última declaração de IR\n\n## ITCD\n\n- Imposto sobre transmissão causa mortis\n- Varia por estado (2% a 8%)\n- Deve ser pago antes da partilha\n\n## Prazos\n\n- Semanas a meses\n- Depende da complexidade\n\n## Consulte advogado\n\nO inventário extrajudicial exige orientação jurídica. Um advogado pode orientar sobre os requisitos e procedimentos.`},

  {cat:'imobiliario',slug:'compra-venda-imovel-construir-terreno',title:'Compra de Terreno para Construir: O que Verificar',desc:'Documentos e verificações antes de comprar terreno para construção.',content:`## Documentos essenciais\n\n- Matrícula atualizada\n- Certidão negativa de ônus reais\n- IPTU pago\n- Certidão negativa de débitos\n- Alvará de construção (se aplicável)\n\n## Verificações\n\n1. **Zona urbanística**\n2. **Área de preservação**\n3. **Infraestrutura**\n4. **Acesso**\n5. **Vizinhança**\n\n## Riscos\n\n- Terreno em área de risco\n- Falta de infraestrutura\n- Conflitos de limites\n- Débitos ocultos\n\n## Cuidados\n\n1. **Vistoria** presencial\n2. **Pesquisa** na prefeitura\n3. **Verificação** de vizinhos\n4. **Contratação** de advogado\n5. **Pagamento** em cartório\n\n## Dicas\n\n1. **Não compre** sem visitar\n2. **Verifique** tudo documentalmente\n3. **Contrate advogado** para revisão\n4. **Guarde** todos os comprovantes`},

  {cat:'geral',slug:'como-consultar-advogado-pela-primeira-vez',title:'Primeira Consulta com Advogado: O que Esperar',desc:'Guia para sua primeira consulta jurídica — o que levar e como se preparar.',content:`## O que levar?\n\n- RG e CPF\n- Documentos do caso\n- Comprovantes\n- Cronologia dos fatos\n\n## O que perguntar?\n\n- Viabilidade do caso\n- Estratégia jurídica\n- Prazos estimados\n- Honorários\n- Possibilidade de acordo\n\n## Como se preparar?\n\n1. **Organize** seus pensamentos\n2. **Escreva** os fatos cronologicamente\n3. **Leve** todos os documentos\n4. **Anote** suas dúvidas\n5. **Seja** honesto e completo\n\n## Duração\n\n- Geralmente: 30 a 60 minutos\n- Pode ser mais longo dependendo do caso\n\n## Honorários\n\n- Consulta pode ser paga\n- Alguns escritórios oferecem primeira consulta gratuita\n- Pergunte sobre valores antes da consulta\n\n## Dicas\n\n1. **Chegue** com antecedência\n2. **Seja** honesto com o advogado\n3. **Anote** as orientações\n4. **Não esconda** informações importantes\n5. **Pergunte** tudo que tiver dúvida`},

  {cat:'geral',slug:'direito-terceira-idade-idoso-direitos',title:'Direitos da Terceira Idade: Um Guia Completo',desc:'Conheça todos os direitos garantidos aos idosos pela legislação brasileira.',content:`## Direitos garantidos\n\n### Assistência social\n- BPC/LOAS\n- Programas governamentais\n\n### Saúde\n- Atendimento prioritário\n- Medicamentos gratuitos\n\n### Transporte\n- Tarifa zero (ônibus)\n- Prioridade em filas\n\n### Cultura\n- Ingressos com desconto\n- Atividades culturais\n\n### Trabalho\n- Proibição de discriminação por idade\n- Estabilidade no emprego\n\n## Proteção contra violência\n\n- Abandono\n- Violência física e psicológica\n- Exploração\n- Negligência\n\n## Como denunciar?\n\n- Disque 180\n- Delegacia de polícia\n- Ministério Público\n- Defensoria Pública\n\n## Penalties\n\n- Reclusão de 2 a 5 anos\n- Multa\n- Suspensão de direitos políticos\n\n## Dicas\n\n1. **Conheça** seus direitos\n2. **Documente** abusos\n3. **Denuncie** violências\n4. **Procure** ajuda jurídica`},

  {cat:'geral',slug:'como-funciona-processo-judicial-brasileiro',title:'Processo Judicial Brasileiro: Como Funciona',desc:'Visão geral do processo judicial no Brasil — etapas, prazos e recursos.',content:`## Etapas do processo\n\n1. **Petição inicial** — Ação judicial\n2. **Citação** — Notificação do réu\n3. **Defesa** — Contestação\n4. **Réplica** — Resposta do autor\n5. **Provas** — Perícias, testemunhas\n6. **Audiência** — Instrução e julgamento\n7. **Sentença** — Decisão do juiz\n8. **Recursos** — Apelação, agravo\n9. **Trânsito em julgado** — Decisão final\n10. **Execução** — Cumprimento da sentença\n\n## Prazos\n\n- Contestação: 15 dias\n- Réplica: 15 dias\n- Provas: 30 dias\n- Recursos: 15 dias\n\n## Custas\n\n- Taxa judiciária\n- Diligências\n- Perícias\n- Honorários de sucumbência\n\n## Justiça gratuita\n\n- Para quem não pode pagar\n- Renda inferior a 40% do salário mínimo\n\n## Dicas\n\n1. **Contrate advogado**\n2. **Organize** documentos\n3. **Documente** fatos\n4. **Seja** paciente\n5. **Não desista** facilmente`},
]

const postsExistentes = {
  previdenciario: readFileSync(join(blogDir, 'posts-previdenciario.ts'), 'utf8'),
  trabalhista: readFileSync(join(blogDir, 'posts-trabalhista.ts'), 'utf8'),
  civel: readFileSync(join(blogDir, 'posts-civel.ts'), 'utf8'),
  consumidor: readFileSync(join(blogDir, 'posts-consumidor.ts'), 'utf8'),
  familia: readFileSync(join(blogDir, 'posts-familia.ts'), 'utf8'),
  imobiliario: readFileSync(join(blogDir, 'posts-imobiliario.ts'), 'utf8'),
  geral: readFileSync(join(blogDir, 'posts-geral.ts'), 'utf8'),
}

const existingSlugs = new Set()
for (const [cat, content] of Object.entries(postsExistentes)) {
  const matches = content.match(/slug:\s*'([^']+)'/g)
  if (matches) matches.forEach(m => existingSlugs.add(m.replace(/slug:\s*'/, '').replace(/'/, '')))
}

let gerados = 0, pulados = 0
const postsPorCat = {}

for (const post of postsUltimos) {
  if (existingSlugs.has(post.slug)) { pulados++; continue }
  if (!postsPorCat[post.cat]) postsPorCat[post.cat] = []
  postsPorCat[post.cat].push(post)
  gerados++
}

for (const [cat, posts] of Object.entries(postsPorCat)) {
  if (posts.length === 0) continue
  const filePath = join(blogDir, `posts-${cat}.ts`)
  let content = readFileSync(filePath, 'utf8')
  const lastBrace = content.lastIndexOf(']')
  const newEntries = posts.map(p => `  {\n    slug: '${p.slug}',\n    title: '${p.title.replace(/'/g, "\\'")}',\n    excerpt: '${p.desc.replace(/'/g, "\\'")}',\n    date: '2025-01-15',\n    category: '${cat}',\n    readTime: '5 min',\n    content: \`${p.content.replace(/`/g, '\\`')}\`,\n  },`).join('\n')
  content = content.slice(0, lastBrace) + newEntries + '\n]'
  writeFileSync(filePath, content)
  console.log(`✅ ${cat}: +${posts.length}`)
}

console.log(`\n📊 +${gerados} novos, ${pulados} existentes`)
