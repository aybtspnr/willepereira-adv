import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const blogDir = join(__dirname, '..', 'src', 'data', 'blog')

const maisPosts2 = [
  {cat:'previdenciario',slug:'auxilio-acidente-como-solicitar',title:'Auxílio-Acidente: Passo a Passo para Solicitar',desc:'Guia prático para solicitar auxílio-acidente junto ao INSS.',content:`## Passo a passo\n\n1. **Documentação médica** — laudos, exames, relatórios\n2. **Qualidade de segurado** — comprovante de contribuições\n3. **Agendamento** — pelo Meu INSS\n4. **Perícia médica** — avaliação da incapacidade\n5. **Resultado** — concessão ou negativa\n\n## Documentos\n\n- RG e CPF\n- Carteira de trabalho\n- Laudos médicos\n- Exames de imagem\n- Relatórios de especialistas\n\n## Prazos\n\n- Agendamento: imediato\n- Perícia: 15 a 30 dias\n- Resultado: 5 a 10 dias\n- Pagamento: após concessão\n\n## Se negado\n\n- Recurso administrativo: 30 dias\n- Ação judicial: 5 anos\n\n## Dicas\n\n1. **Documente** tudo\n2. **Não espere** as sequelas estabilizarem\n3. **Consulte advogado** antes de solicitar`},

  {cat:'previdenciario',slug:'aposentadoria-invalidez-como-obter',title:'Aposentadoria por Invalidez: Como Obter o Benefício',desc:'Requisitos, documentos e procedimento para aposentadoria por incapacidade permanente.',content:`## Requisitos\n\n- 12 contribuições (dispensadas em acidentes)\n- Qualidade de segurado\n- Incapacidade total e permanente\n- Impossibilidade de reabilitação\n\n## Documentos\n\n- RG e CPF\n- Carteira de trabalho\n- Laudos médicos detalhados\n- Exames de imagem\n- Relatórios de especialistas\n\n## Procedimento\n\n1. Agendamento pelo Meu INSS\n2. Perícia médica\n3. Análise do quadro clínico\n4. Decisão do INSS\n\n## Valor\n\n- 60% da média + 2% por ano acima de 20/15 anos\n- Exceção: acidente de trabalho = 100%\n\n## Revisão\n\n- INSS pode convocar para nova perícia\n- Exceto se 60+ anos ou 15+ anos de concessão\n\n## Consulte advogado\n\nA aposentadoria por invalidez requer prova robusta da incapacidade. Um advogado pode orientar sobre a documentação necessária.`},

  {cat:'trabalhista',slug:'equiparacao-salarial-como-calcula',title:'Equiparação Salarial: Como é Calculada a Diferença',desc:'Fórmula de cálculo da equiparação salarial e seus efeitos.',content:`## Fórmula\n\nDiferença = Salário do paradigma - Salário do equiparando\n\n## Exemplo\n\n- Paradigma: R$ 3.000\n- Equiparando: R$ 2.000\n- Diferença: R$ 1.000\n\n## Efeitos\n\n- Pagamento retroativo (5 anos)\n- Correção monetária\n- Juros legais\n- Honorários de sucumbência\n\n## Documentos\n\n- Holerites do paradigma\n- Descrição de funções\n- Organograma da empresa\n- Testemunhas\n\n## Prazo\n\n- 2 anos após a extinção do contrato\n- Cobrar últimos 5 anos\n\n## Consulte advogado\n\nA equiparação salarial requer prova de identidade de função. Um advogado pode avaliar a viabilidade e calcular o valor da diferença.`},

  {cat:'civel',slug:'acao-indenizacao-dano-moral-recisao',title:'Indenização por Dano Moral na Rescisão Contratual',desc:'Quando a rescisão contratual gera direito a indenização por danos morais.',content:`## Quando há dano moral?\n\n- Rescisão sem justa causa injustificada\n- Atraso no pagamento de verbas\n- Tratamento desrespeitoso\n- Assédio moral\n\n## Base legal\n\n- Art. 186 do Código Civil\n- Art. 927 do Código Civil\n- Súmulas do STJ\n\n## Cálculo\n\n- Gravidade da ofensa\n- Condição econômica das partes\n- Repercussão do dano\n- Caráter pedagógico\n\n## Documentos\n\n- Comprovantes de rescisão\n- Testemunhas\n- Documentos de tratamento (se houver)\n- Comprovantes de prejuízo\n\n## Prazo\n\n- 3 anos para ação de indenização\n- 5 anos para relações de consumo\n\n## Consulte advogado\n\nO dano moral na rescisão requer prova da conduta abusiva. Um advogado pode avaliar as chances de êxito e calcular o valor da indenização.`},

  {cat:'consumidor',slug:'guia-consumidor-compra-veiculo',title:'Compra de Veículo: Direitos do Consumidor',desc:'Conheça seus direitos ao comprar um carro — garantias, vícios e defeitos.',content:`## Garantia legal\n\n- **90 dias** para defeitos (CDC)\n- **30 dias** para vícios\n\n## Vícios vs Defeitos\n\n### Vício\n- Não funciona adequadamente\n- 30 dias para reclamar\n\n### Defeito\n- Risco à segurança\n- 90 dias para reclamar\n\n## Direitos do consumidor\n\n1. **Substituição** do veículo\n2. **Restituição** do valor pago\n3. **Abatimento** do preço\n4. **Indenização** por danos\n\n## Documentos\n\n- Nota fiscal\n- Contrato de compra\n- Laudo mecânico\n- Comprovantes de defeitos\n\n## Cuidados\n\n1. **Faça** vistoria antes da compra\n2. **Guarde** todos os documentos\n3. **Documente** os defeitos\n4. **Consulte advogado** se necessário`},

  {cat:'familia',slug:'pensao-alimenticia-ancestral-idoso',title:'Pensão Alimentícia para Pais Idosos',desc:'Quando filhos devem pagar pensão alimentícia para pais idosos.',content:`## Quando se aplica?\n\n- Pais idosos (60+ anos)\n- Doentes ou incapacitados\n- Sem condições de se sustentar\n\n## Requisitos\n\n- Dependência econômica\n- Impossibilidade de trabalhar\n- Necessidade comprovada\n\n## Quem paga?\n\n- Filhos (em ordem de proximidade)\n- Concorrentes entre si\n\n## Cálculo\n\n- Renda do alimentante\n- Necessidade do alimentado\n- Proporcionalidade\n\n## Exceções\n\n- Filho com renda insuficiente\n- Pais que abandonaram o filho\n- Violência doméstica\n\n## Procedimento\n\n1. **Tentativa** de acordo familiar\n2. **Ação judicial** (se necessário)\n3. **Audiência** de conciliação\n4. **Sentença**\n\n## Consulte advogado\n\nA pensão para pais idosos requer análise da dependência econômica. Um advogado pode orientar sobre os direitos e deveres.`},

  {cat:'imobiliario',slug:'compra-venda-imovel-dois-50',title:'Compra de Imóvel com 50% de Desconto: Cuidados',desc:'O que verificar antes de comprar um imóvel com desconto significativo.',content:`## Por que o desconto?\n\n- Execução judicial\n- Herança dispute\n- Pressa do vendedor\n- Vício oculto\n- Localização ruim\n\n## Cuidados essenciais\n\n1. **Verificar** a matrícula\n2. **Consultar** certidões negativas\n3. **Fazer** vistoria completa\n4. **Contratar** advogado\n5. **Verificar** débitos\n\n## Documentos\n\n- Matrícula atualizada\n- Certidões negativas\n- IPTU pago\n- Comprovantes de débitos\n- Laudo de vistoria\n\n## Riscos\n\n- Imóvel penhorado\n- Usucapião em andamento\n- Conflito de herança\n- Débitos ocultos\n\n## Dicas\n\n1. **Não assine** nada sem advogado\n2. **Verifique** tudo pessoalmente\n3. **Pague** sinal em cartório\n4. **Guarde** todos os comprovantes`},

  {cat:'geral',slug:'como-funciona-audiencia-judicial',title:'Audiência Judicial: Como Funciona e O que Esperar',desc:'Guia completo sobre audiências judiciais — o que esperar e como se preparar.',content:`## Tipos de audiência\n\n### Conciliação\n- Tentativa de acordo\n- Obrigatória em muitas ações\n\n### Instrução\n- Produção de provas\n- Oitiva de testemunhas\n\n### Julgamento\n- Decisão do juiz\n- Sentença oral ou escrita\n\n## Como se preparar\n\n1. **Chegue** com antecedência\n2. **Leve** todos os documentos\n3. **Vista** adequadamente\n4. **Seja** respeitoso\n5. **Responda** apenas o que for perguntado\n\n## Dicas\n\n1. **Chegue** 30 min antes\n2. **Leve** cópias de tudo\n3. **Não interrompa** o juiz\n4. **Responda** com calma\n5. **Não minta** — é crime\n\n## O que esperar\n\n- Entrada do juiz\n- Identificação das partes\n- Leitura da petição\n- Proposta de acordo\n- Produção de provas\n- Encerramento\n\n## Consulte advogado\n\nAntes de qualquer audiência, converse com seu advogado sobre o que esperar e como se comportar.`},

  {cat:'geral',slug:'como-ganhar-dinheiro-com-direito',title:'Como um Advogado Pode Ajudar a Economizar Dinheiro',desc:'Formas pelas quais um advogado pode ajudar a economizar em diversas situações.',content:`## Economia com advogado\n\n### Preventivo\n- Análise de contratos\n- Planejamento tributário\n- Regularização de imóveis\n\n### Contencioso\n- Evitar multas e penalidades\n- Recuperar valores pagos a mais\n- Indenizações\n\n## Situações comuns\n\n### Trabalhista\n- Horas extras não pagas\n- FGTS em atraso\n- Verbas rescisórias\n\n### Previdenciário\n- Aposentadoria maior\n- Benefício negado revertido\n- Revisão de valor\n\n### Consumerista\n- Cobrança indevida\n- Produto com defeito\n- Plano de saúde\n\n### Cível\n- Dívida prescrita\n- Contrato abusivo\n- Indenização\n\n## Cálculo de economia\n\n- Valor recuperado\n- Multas evitadas\n- Custos processuais\n- Honorários de sucumbência\n\n## Dicas\n\n1. **Consulte** antes de pagar multas\n2. **Verifique** cobranças indevidas\n3. **Analise** contratos antes de assinar\n4. **Consulte advogado** regularmente`},

  {cat:'geral',slug:'seguro-vida-indenizacao-acidente',title:'Seguro de Vida: Como Receber Indenização por Acidente',desc:'Guia para solicitar indenização de seguro de vida em caso de acidente.',content:`## O que é seguro de vida?\n\nContrato que garante pagamento de indenização em caso de morte ou incapacidade.\n\n## Tipos\n\n- Capital em caso de morte\n- Capital em caso de invalidez\n- Despesas médicas\n- Doenças graves\n\n## Como solicitar indenização?\n\n1. **Notifique** a seguradora\n2. **Apresente** documentação\n3. **Aguarde** análise\n4. **Receba** o pagamento\n\n## Documentos\n\n- Apólice do seguro\n- Certidão de óbito (morte)\n- Laudos médicos (invalidez)\n- Boletim de ocorrência (acidente)\n- Comprovantes de residência\n\n## Prazos\n\n- Notificação: imediata\n- Pagamento: 30 dias após documentação completa\n\n## Recusa\n\n- Se a seguradora negar\n- Ação judicial contra a seguradora\n- Prazo: 10 anos\n\n## Dicas\n\n1. **Guarde** a apólice em local seguro\n2. **Mantenha** dados atualizados\n3. **Notifique** imediatamente\n4. **Consulte advogado** se houver recusa`},
]

// Append
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

for (const post of maisPosts2) {
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
