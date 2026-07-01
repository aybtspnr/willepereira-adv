import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const blogDir = join(__dirname, '..', 'src', 'data', 'blog')

const postsLast = [
  {cat:'previdenciario',slug:'aposentadoria-especial-25-anos-como-conseguir',title:'Aposentadoria Especial: Como Conseguir os 25 Anos de Exposição',desc:'Estratégias para comprovar 25 anos de exposição a agentes nocivos.',content:`## Estratégias\n\n1. **PPP de todas as empresas**\n2. **LTCAT atualizado**\n3. **Documentação médica**\n4. **Testemunhas**\n\n## Documentos essenciais\n\n- PPP de cada empresa\n- LTCAT\n- Laudos médicos\n- Fichas de registro\n- Contratos de trabalho\n\n## Dicas\n\n- **Guarde tudo** desde o primeiro emprego\n- **Solicite PPP** ao sair de cada empresa\n- **Consulte advogado** antes de solicitar\n- **Não desista** se negado — recorra`},

  {cat:'trabalhista',slug:'rescisao-pedido-demissao-direitos',title:'Pedido de Demissão: Quais Direitos Você Tem',desc:'Conheça seus direitos quando pede demissão.',content:`## Direitos\n\n- Saldo de salário\n- Férias vencidas + 1/3\n- Férias proporcionais + 1/3\n- 13º proporcional\n- Saque do FGTS (sem multa 40%)\n\n## Não tem direito\n\n- Aviso prévio indenizado\n- Multa de 40% do FGTS\n- Seguro-desemprego\n\n## Aviso prévio\n\n- Deve trabalhar 30 dias\n- ou indenizar o empregador\n\n## Cuidados\n\n1. **Verifique** se há férias a vender\n2. **Calcule** todas as verbas\n3. **Guarde** comprovantes\n4. **Consulte advogado** se necessário`},

  {cat:'civel',slug:'acao-declaratoria-inexistencia-divida',title:'Ação Declaratória de Inexistência de Dívida',desc:'Como provar que não deve nada e limpar seu nome.',content:`## Quando usar?\n\n- Dívida já paga\n- Dívida prescrita\n- Dívida inexistente\n- Negativação injusta\n\n## Procedimento\n\n1. **Documente** a inexistência\n2. **Notifique** o credor\n3. **Se não resolver**, ação judicial\n4. **Juiz** declara a inexistência\n\n## Efeitos\n\n- Exclusão do nome dos cadastros\n- Correção de informações\n- Indenização por danos morais\n\n## Documentos\n\n- Comprovantes de pagamento\n- Certidões negativas\n- Testemunhas\n- Contratos originais\n\n## Prazo\n\n- 5 anos para ação judicial\n- 3 anos para indenização`},

  {cat:'consumidor',slug:'guia-reclamacao-procon-como-funciona',title:'Reclamação no PROCON: Como Funciona e Quando Usar',desc:'Guia completo para reclamar no PROCON — quando, como e o que esperar.',content:`## Quando usar o PROCON?\n\n- Produto com defeito\n- Cobrança indevida\n- Publicidade enganosa\n- Serviço inadequado\n- Negativa de direitos\n\n## Como reclamar?\n\n1. **Registre** reclamação no site\n2. **Apresente** documentação\n3. **Aguarde** análise\n4. **Compareça** à audiência\n\n## Documentos\n\n- RG e CPF\n- Nota fiscal\n- Comprovantes\n- Prints de tela\n- Contratos\n\n## Prazos\n\n- Análise: 30 dias\n- Audiência: agendada pelo PROCON\n- Resolução: variável\n\n## Dicas\n\n1. **Documente** tudo\n2. **Seja** objetivo\n3. **Guarde** protocolos
4. **Consulte advogado** se necessário`},

  {cat:'familia',slug:'pensao-alimenticia-revisao-rendimento',title:'Revisão de Pensão Alimentícia por Mudança de Rendimento',desc:'Como solicitar revisão quando a renda do alimentante muda.',content:`## Quando revisar?\n\n- Aumento da renda do alimentante\n- Diminuição da renda do alimentante\n- Mudança das necessidades do alimentado\n\n## Procedimento\n\n1. **Documente** a mudança\n2. **Tente acordo** com o alimentante\n3. **Se não houver**, ação revisional\n4. **Juiz** decidirá o novo valor\n\n## Critérios\n\n- Renda atual do alimentante\n- Necessidades atuais do alimentado\n- Proporcionalidade\n\n## Documentos\n\n- Comprovantes de renda atual\n- Comprovantes de despesas\n- Holerites\n- Contratos de trabalho\n\n## Prazo\n\n- Ação: imediata\n- Decisão: 30 a 60 dias\n- Vigência: 12 meses após a ação`},

  {cat:'imobiliario',slug:'compra-venda-imovel-fgts-como-usar',title:'Usar o FGTS na Compra de Imóvel: Como Funciona',desc:'Guia para usar saldo do FGTS na compra de imóvel residencial.',content:`## Quem pode usar?\n\n- Comprador da primeira moradia\n- Imóvel residencial\n- Não ter outro imóvel financiado\n\n## Requisitos\n\n- Saldo disponível no FGTS\n- Trabalhar com carteira assinada\n- Imóvel residencial\n- Localidade com programa ativo\n\n## Como usar?\n\n1. **Verifique** saldo no FGTS\n2. **Escolha** o imóvel\n3. **Contrate** financiamento\n4. **Solicite** uso do FGTS\n5. **Aguarde** análise\n\n## Vantagens\n\n- Entrada maior\n- Parcelas menores\n- Prazo maior\n\n## Limitações\n\n- Até 80% do valor do imóvel\n- Para imóvel residencial\n- Primeira moradia\n\n## Dicas\n\n1. **Verifique** saldo regularmente\n2. **Consulte** o banco antes\n3. **Contrate advogado** para revisão
4. **Leia** todas as condições`},

  {cat:'geral',slug:'como-funciona-sentenca-judicial',title:'Sentença Judicial: O que é e Como Funciona',desc:'Entenda o que é uma sentença judicial e seus efeitos.',content:`## O que é sentença?\n\nDecisão do juiz que resolve o mérito da causa.\n\n## Tipos\n\n### Procedente\n- Pedido do autor é acolhido\n- Réu é condenado\n\n### Improcedente\n- Pedido do autor é rejeitado\n- Réu é absolvido\n\n### Parcialmente procedente\n- Pedido é parcialmente acolhido\n\n## Efeitos\n\n- Coisa julgada (após trânsito em julgado)\n- Obrigação de cumprir\n- Possibilidade de execução\n\n## Recursos\n\n- Apelação: 15 dias\n- Agravo de instrumento: 8 dias\n- Recurso especial: 15 dias\n- Recurso extraordinário: 15 dias\n\n## Trânsito em julgado\n\n- Quando não cabe mais recurso\n- Torna a sentença definitiva\n- Permite execução\n\n## Dicas\n\n1. **Leia** atentamente\n2. **Consulte advogado** sobre recursos\n3. **Não desista** se injusta\n4. **Documente** tudo`},

  {cat:'geral',slug:'direitos-pessoas-deficiencia-lei-brasil',title:'Direitos das Pessoas com Deficiência: Lei Brasileira',desc:'Conheça os direitos garantidos pela Lei Brasileira de Inclusão (LBI).',content:`## Direitos garantidos\n\n### Educação\n- Escola inclusiva\n- Adaptações razoáveis\n\n### Trabalho\n- Cota de 2-5% em empresas públicas\n- Proibição de discriminação\n\n### Saúde\n- Atendimento prioritário\n- Órteses e próteses\n\n### Transporte\n- Tarifa zero (ônibus)\n- Vaga prioritária\n\n### Cultura\n- Acessibilidade cultural\n- Atividades inclusivas\n\n## Adaptações razoáveis\n\n- Rampas de acesso\n- Elevadores\n- Sinalização em braile\n- Tradução em Libras\n\n## Como solicitar?\n\n1. **Documente** a deficiência\n2. **Solicite** adaptações\n3. **Registre** reclamação se negado\n4. **Procure** Defensoria Pública\n\n## Penalties por discriminação\n\n- Multa\n- Reclusão\n- Indenização por danos morais`},

  {cat:'geral',slug:'como-evitar-golpes-financeiros',title:'Como Evitar Golpes Financeiros e Fraudes',desc:'Dicas para proteger seu dinheiro de golpes e fraudes comuns.',content:`## Golpes comuns\n\n- Empréstimos consignados fraudulentos\n- Investimentos falsos\n- Clonagem de cartão\n- Phishing\n- Falsos profissionais\n\n## Como se proteger?\n\n1. **Verifique** fontes confiáveis\n2. **Não clique** em links suspeitos\n3. **Não informe** dados bancários por telefone\n4. **Desconfie** de promessas de lucro fácil\n\n## Se caiu em golpe\n\n1. **Registre** boletim de ocorrência\n2. **Notifique** o banco\n3. **Cancele** cartões\n4. **Procure advogado**\n5. **Denuncie** aos órgãos competentes\n\n## Onde denunciar?\n\n- Polícia Civil\n- Banco Central\n- Procon\n- Ministério Público\n\n## Dicas\n\n1. **Não compartilhe** dados bancários\n2. **Use** senhas fortes\n3. **Ative** verificação em duas etapas\n4. **Monitore** suas contas regularmente`},
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

for (const post of postsLast) {
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
