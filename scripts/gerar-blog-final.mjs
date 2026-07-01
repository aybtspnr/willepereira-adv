import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const blogDir = join(__dirname, '..', 'src', 'data', 'blog')

const postsFinais = [
  {cat:'previdenciario',slug:'beneficio-ncidencia-temporaria-auxilio-doenca-como-funciona',title:'Auxílio-Doença (B31): Como Funciona e Quando Solicitar',desc:'Guia completo sobre o benefício por incapacidade temporária.',content:`## O que é auxílio-doença?\n\nBenefício pago ao segurado que fica temporariamente incapacitado para o trabalho.\n\n## Requisitos\n\n- 12 contribuições mensais\n- Qualidade de segurado\n- Incapacidade temporária\n\n## Valor\n\n- 91% da média de contribuições\n- Limitado à média dos 12 últimos salários\n\n## Duração\n\n- Enquanto durar a incapacidade\n- Pode ser convertido em aposentadoria por invalidez\n\n## Como solicitar\n\n1. Afastamento médico\n2. Comunicação ao empregador\n3. Agendamento no INSS\n4. Perícia médica\n\n## Prazos\n\n- Primeiros 15 dias: empregador paga\n- A partir do 16º dia: INSS paga\n\n## Documentos\n\n- Atestado médico\n- Comprovantes de contribuição\n- CPF e RG\n- Carteira de trabalho`},

  {cat:'trabalhista',slug:'terceirizacao-licita-ilegal-diferencas',title:'Terceirização Lícita e Ilícita: Diferenças e Consequências',desc:'Como distinguir terceirização lícita de ilegal e seus efeitos jurídicos.',content:`## Terceirização lícita\n\n- Empresa prestadora assumes riscos\n- Não há subordinação direta\n- Capacidade econômica compatível\n\n## Terceirização ilícita\n\n- Pessoalidade\n- Subordinação direta\n- Falta de capacidade econômica\n\n## Consequências da ilicitude\n\n- Reconhecimento de vínculo com tomadora\n- Pagamento de todas as verbas\n- FGTS com multa de 40%\n\n## Como provar?\n\n- Testemunhas\n- Documentos de subordinação\n- E-mails e mensagens\n- Registro de ponto\n\n## Consulte advogado\n\nA terceirização ilícita gera direitos trabalhistas. Um advogado pode avaliar se há irregularidade e conduzir o processo.`},

  {cat:'civel',slug:'acao-monitoria-como-funciona',title:'Ação Monitoria: Como Cobrar Dívidas com Títulos',desc:'Guia sobre ação monitoria — para que serve e como funciona.',content:`## Para que serve?\n\nCobrar dívidas com prova escrita de forma mais rápida.\n\n## Títulos aceitos\n\n- Nota promissória\n- Duplicata\n- Cheque\n- Contrato com cláusula de exigibilidade\n\n## Procedimento\n\n1. Petição com o título\n2. Mandado de citação\n3. Devedor paga ou impugna\n4. Se não impugnar: título executivo\n5. Execução forçada\n\n## Vantagens\n\n- Mais rápido\n- Custo menor\n- Possibilidade de liminar\n\n## Prazos\n\n- Citação: 15 dias\n- Impugnação: 15 dias\n- Execução: imediata\n\n## Consulte advogado\n\nA ação monitoria requer técnica processual específica. Um advogado pode avaliar a viabilidade e conduzir o processo corretamente.`},

  {cat:'consumidor',slug:'servico-tecnico-celular-computador-defeito',title:'Serviço Técnico com Defeito: Direitos do Consumidor',desc:'O que fazer quando o conserto do celular ou computador não resolve o problema.',content:`## Prazos\n\n- **30 dias** para sanar o vício\n- **90 dias** para serviços duráveis\n\n## Direitos\n\n1. **Conserto** do equipamento\n2. **Restituição** do valor pago\n3. **Troca** do equipamento\n4. **Indenização** por danos\n\n## Como proceder\n\n1. **Comunique** o defeito por escrito\n2. **Guarde** o comprovante\n3. **Documente** o problema\n4. **Aguarde** 30 dias\n5. **Se não resolver**, procure advogado\n\n## Documentos\n\n- Nota fiscal\n- Contrato de serviço\n- Comprovante de pagamento\n- Fotos dos defeitos\n\n## Dicas\n\n1. **Documente** tudo\n2. **Não descarte** o equipamento\n3. **Guarde** comprovantes\n4. **Consulte advogado** se necessário`},

  {cat:'familia',slug:'pensao-alimenticia-desconto-folha',title:'Pensão Alimentícia com Desconto em Folha',desc:'Como funciona o desconto de pensão alimentícia em folha de pagamento.',content:`## Como funciona?\n\n- Desconto direto na folha de pagamento\n- Valor fixado pelo juiz\n- Empregador repassa ao alimentado\n\n## Quem pode?\n\n- Empregados com carteira assinada\n- Servidores públicos\n\n## Procedimento\n\n1. Sentença judicial\n2. Cópia para o empregador\n3. Desconto mensal\n4. Repasse ao alimentado\n\n## Vantagens\n\n- Pagamento garantido\n- Sem necessidade de cobrar\n- Regularidade\n\n## Inadimplemento\n\n- Multa de 2% por atraso\n- Desconto obrigatório\n- Execução forçada\n\n## Documentos\n\n- Sentença judicial\n- Cópia para o empregador\n- Comprovantes de pagamento`},

  {cat:'imobiliario',slug:'compra-venda-imovel-habitacional-popular',title:'Compra de Imóvel Habitacional Popular: Programas Governamentais',desc:'Conheça os programas de financiamento habitacional popular.',content:`## Programas\n\n### Minha Casa Minha Vida\n- Renda até R$ 7.000\n- Subsídio do governo\n- Taxas reduzidas\n\n### Carta de Crédito\n- Financiamento pelo banco\n- Garantia do FGTS\n- Taxas regulamentadas\n\n## Requisitos\n\n- Renda familiar\n- Primeira moradia\n- Imóvel residencial\n- Cidade com programa ativo\n\n## Vantagens\n\n- Subsídio\n- Taxas menores\n- Prazo maior\n- FGTS como entrada\n\n## Documentos\n\n- RG e CPF\n- Comprovantes de renda\n- Extrato do FGTS\n- Certidão de nascimento/casamento\n\n## Cuidados\n\n1. **Verifique** se atende aos requisitos\n2. **Compare** propostas de bancos\n3. **Contrate advogado** para revisão\n4. **Leia** todas as cláusulas`},

  {cat:'geral',slug:'como-evitar-golpes-juridicos',title:'Como Evitar Golpes Jurídicos',desc:'Dicas para não cair em golpes e fraudes no meio jurídico.',content:`## Golpes comuns\n\n- Falsos advogados\n- Sites fraudulentos\n- Promessas de resultado\n- Cobranças indevidas\n\n## Como identificar?\n\n- Verifique o registro na OAB\n- Não aceite promessas de resultado\n- Consulte a OAB local\n- Pesquise na internet\n\n## Cuidados\n\n1. **Verifique** sempre o advogado\n2. **Não pague** sem contrato\n3. **Guarde** comprovantes\n4. **Denuncie** golpes\n\n## Onde denunciar?\n\n- OAB local\n- Ministério Público\n- Delegacia de polícia\n- PROCON\n\n## Dicas\n\n1. **Desconfie** de promessas\n2. **Verifique** tudo\n3. **Consulte** mais de um profissional\n4. **Guarde** documentação`},

  {cat:'geral',slug:'como-funciona-justica-gratuita',title:'Justiça Gratuita: Como Solicitar e Quem Tem Direito',desc:'Guia completo sobre justiça gratuita — requisitos e procedimento.',content:`## O que é justiça gratuita?\n\nIsenção de custas processuais para quem não pode pagar.\n\n## Quem tem direito?\n\n- Renda inferior a 40% do salário mínimo\n- Beneficiários do BPC/LOAS\n- Segurados do INSS com renda baixa\n- Desempregados\n\n## Como solicitar\n\n1. **Requerimento** na inicial\n2. **Declaração** de pobreza\n3. **Comprovantes** de renda\n4. **Decisão** do juiz\n\n## Documentos\n\n- Comprovantes de renda\n- Declaração de imposto de renda\n- Extrato do FGTS\n- Comprovante de desemprego\n\n## Abrangência\n\n- Custas judiciais\n- Diligências\n- Perícias\n- Honorários de advogado (em alguns casos)\n\n## Revogação\n\n- Se a parte perder o processo\n- Se a parte melhorar de vida\n- A qualquer tempo\n\n## Dicas\n\n1. **Solicite** desde o início\n2. **Documente** sua renda\n3. **Mantenha** informações atualizadas\n4. **Consulte advogado** para orientação`},
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

for (const post of postsFinais) {
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
