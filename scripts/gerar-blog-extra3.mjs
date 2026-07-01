import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const blogDir = join(__dirname, '..', 'src', 'data', 'blog')

const maisPosts3 = [
  {cat:'previdenciario',slug:'aposentadoria-tempo-contribuicao-regras-transicao',title:'Aposentadoria por Tempo de Contribuição: Regras de Transição',desc:'Todas as regras de transição disponíveis para quem já contribuía antes da reforma.',content:`## Regras de transição\n\n### 1. Regra dos pontos\n- Idade + tempo de contribuição\n- 2025: 100 pontos (homens) / 90 (mulheres)\n- Aumento de 1 ponto por ano\n\n### 2. Idade mínima progressiva\n- Homens: 61 anos (2025)\n- Mulheres: 56 anos (2025)\n- Acréscimo de 6 meses por ano\n\n### 3. Pedágio de 50%\n- Para quem faltava até 2 anos\n- Paga 50% do tempo restante\n\n### 4. Pedágio de 100%\n- Para quem faltava até 4 anos\n- Paga 100% do tempo restante\n\n## Como escolher?\n\n1. **Consulte advogado** para simular\n2. **Compare** todas as regras\n3. **Verifique** seu CNIS\n4. **Analise** o valor estimado\n\n## Direito adquirido\n\n- Quem já tinha os requisitos antes da reforma\n- Regra anterior é mais vantajosa`},

  {cat:'previdenciario',slug:'cnis-erros-como-corrigir',title:'CNIS com Erros: Como Corrigir e Regularizar',desc:'Guia para identificar e corrigir erros no extrato previdenciário.',content:`## Tipos de erros\n\n- Vínculos não registrados\n- Períodos duplicados\n- Valores incorretos\n- Contribuições faltantes\n\n## Como identificar?\n\n1. **Acesse** o Meu INSS\n2. **Consulte** o CNIS\n3. **Compare** com carteiras de trabalho\n4. **Verifique** comprovantes de pagamento\n\n## Como corrigir?\n\n1. **Reúna** documentação comprobatória\n2. **Solicite** correção pelo Meu INSS\n3. **Protocolo** presencial se necessário\n4. **Aguarde** análise do INSS\n\n## Documentos\n\n- Carteiras de trabalho\n- Holerites\n- Comprovantes de contribuição\n- Contratos de trabalho\n\n## Prazos\n\n- Correção: 30 a 90 dias\n- Se negado: recurso em 30 dias\n\n## Importância\n\n- Erros podem reduzir aposentadoria\n- Períodos faltantes podem perder o direito\n- Contribuições em atraso precisam ser quitadas\n\n## Consulte advogado\n\nErros no CNIS podem ser complexos. Um advogado pode orientar sobre a melhor estratégia de correção.`},

  {cat:'trabalhista',slug:'adicionais-trabalhistas-quem-tem-direito',title:'Adicionais Trabalhistas: Quem Tem Direito e Como Calcular',desc:'Guia completo sobre adicionais de insalubridade, periculosidade e noturno.',content:`## Adicionais principais\n\n### Noturno (20%+)\n- Trabalho entre 22h e 5h\n- Hora ficta: 52min30s\n\n### Insalubridade (10-40%)\n- Condições nocivas à saúde\n- Base: salário mínimo\n\n### Periculosidade (30%)\n- Risco à vida ou integridade\n- Base: salário base\n\n## Acumulação\n\n- Insalubridade + Periculosidade: **NÃO** acumula\n- Noturno + Insalubridade: **SIM**\n- Noturno + Periculosidade: **SIM**\n\n## Como solicitar?\n\n1. **Identifique** o adicional aplicável\n2. **Reúna** documentação\n3. **Procure advogado** trabalhista\n4. **Ajuize** reclamação trabalhista\n\n## Prazo prescricional\n\n- 5 anos (durante o contrato)\n- 2 anos (após a extinção)\n\n## Documentos\n\n- PPP (perfil profissiográfico)\n- LTCAT (laudo técnico)\n- Laudos médicos\n- Comprovantes de jornada noturna`},

  {cat:'civel',slug:'contrato-prestacao-servicos-direitos',title:'Contrato de Prestação de Serviços: Direitos e Obrigações',desc:'Guia sobre contratos de prestação de serviços — elaboração, cláusulas e rescisão.',content:`## Cláusulas essenciais\n\n- Objeto do serviço\n- Prazo de execução\n- Valor e forma de pagamento\n- Obrigações de cada parte\n- Condições de rescisão\n\n## Direitos do contratante\n\n- Serviço conforme contratado\n- Prazo cumprido\n- Qualidade da prestação\n- Rescisão por inadimplência\n\n## Direitos do prestador\n\n- Pagamento pelo serviço\n- Reajuste contratual\n- Rescisão por inadimplência\n\n## Rescisão\n\n### Com justa causa\n- Inadimplemento de cláusula\n- Falta grave\n\n### Sem justa causa\n- Aviso prévio\n- Multa contratual\n\n## Cuidados\n\n1. **Leia** todas as cláusulas\n2. **Negocie** condições claras\n3. **Guarde** cópias\n4. **Consulte advogado** antes de assinar`},

  {cat:'consumidor',slug:'plano-saude-reajuste-abusivo-como-questinar',title:'Plano de Saúde: Reajuste Abusivo e Como Questionar',desc:'Como contestar reajustes abusivos em planos de saúde coletivos.',content:`## O que é reajuste abusivo?\n\nAumento que supera a inflação médica do período.\n\n## Planos coletivos\n\n- Não têm teto de reajuste\n- Podem aumentar 30-40% ao ano\n- Consumidor pode questionar judicialmente\n\n## Como questionar?\n\n1. **Verifique** o índice applied\n2. **Compare** com inflação médica\n3. **Notifique** a operadora\n4. **Se não resolver**, ação judicial\n\n## Critérios de avaliação\n\n- Sinistralidade do grupo\n- Inflação médica do período\n- Índice da ANS\n- Custo-benefício\n\n## Indenização\n\n- Danos materiais (diferença paga)\n- Danos morais (se abusivo)\n- Restituição de valores\n\n## Documentos\n\n- Contrato do plano\n- Comprovantes de pagamento\n- Índices de reajuste\n- Comparativo com inflação médica\n\n## Consulte advogado\n\nReajustes abusivos de planos de saúde coletivos podem ser questionados judicialmente. Um advogado pode avaliar a viabilidade da ação.`},

  {cat:'familia',slug:'guarda-unilateral-quando-se-aplica',title:'Guarda Unilateral: Quando é Aplicada e Quais os Direitos',desc:'Circunstâncias que levam à guarda unilateral e direitos do genitor não-guardião.',content:`## Quando se aplica?\n\n- Violência doméstica\n- Abuso de substâncias\n- Abandono\n- Incapacidade\n- Comportamento inadequado\n\n## Direitos do genitor não-guardião\n\n- Visitas regulares\n- Convivência com o filho\n- Participação em decisões\n- Pensão alimentícia\n\n## Obrigação do genitor guardião\n\n- Permitir visitas\n- Informar sobre o filho\n- Tomar decisões importantes\n- Manter contato\n\n## Alteração de guarda\n\n- Mudança de circunstâncias\n- Interesse do filho\n- Ação judicial\n\n## Documentos\n\n- Provas da inadequação\n- Laudos psicológicos\n- Testemunhas\n- Comprovantes de violência\n\n## Consulte advogado\n\nA guarda unilateral é exceção. Um advogado pode avaliar se há justificativa para a medida e orientar sobre os direitos do genitor.`},

  {cat:'imobiliario',slug:'compra-venda-lote-terreno-cuidados',title:'Compra de Lote ou Terreno: Cuidados Essenciais',desc:'O que verificar antes de comprar um terreno ou lote.',content:`## Documentos essenciais\n\n- Matrícula atualizada\n- Certidão negativa de ônus reais\n- IPTU pago\n- Certidão negativa de débitos\n- Alvará de construção (se houver)\n\n## Verificações\n\n1. **Zona urbanística** — permitido construir?\n2. **Área de preservação** — há restrição?\n3. **Infraestrutura** — água, esgoto, luz?\n4. **Acesso** — rua pavimentada?\n5. **Vizinhança** — conflitos?\n\n## Riscos\n\n- Terreno em área de risco\n- Falta de infraestrutura\n- Conflitos de limites\n- Débitos ocultos\n\n## Cuidados\n\n1. **Vistoria** presencial\n2. **Pesquisa** na prefeitura\n3. **Verificação** de vizinhos\n4. **Contratação** de advogado\n5. **Pagamento** em cartório\n\n## Dicas\n\n1. **Não compre** sem visitar\n2. **Verifique** tudo documentalmente\n3. **Contrate** advogado para revisão\n4. **Guarde** todos os comprovantes`},

  {cat:'geral',slug:'como-preparar-para-audiencia-trabalhista',title:'Como se Preparar para Audiência Trabalhista',desc:'Dicas práticas para audiência na Justiça do Trabalho.',content:`## O que esperar\n\n- Audiência de conciliação\n- Audiência de instrução\n- Julgamento\n\n## Preparação\n\n1. **Reúna** documentos\n2. **Organize** provas\n3. **Converse** com advogado\n4. **Planeje** depoimento\n\n## Na audiência\n\n- Chegue com antecedência\n- Vista-se adequadamente\n- Seja respeitoso\n- Responda com calma\n- Não interrompa\n\n## Depoimento\n\n- Seja honesto\n- Responda apenas o que foi perguntado\n- Não discuta com a parte contrária\n- Mantenha a calma\n\n## Documentos\n\n- RG e CPF\n- Carteira de trabalho\n- Holerites\n- Comprovantes\n- Testemunhas\n\n## Dicas\n\n1. **Chegue** 30 min antes\n2. **Leve** cópias de tudo\n3. **Não minta** — é crime\n4. **Responda** com precisão\n5. **Consulte advogado** antes`},

  {cat:'geral',slug:'direitos-idoso-legislacao',title:'Direitos do Idoso: Legislação e Proteção',desc:'Conheça os direitos garantidos pela Lei do Idoso (Lei 10.741/2003).',content:`## Direitos do idoso\n\n### Assistência social\n- BPC/LOAS\n- Programas governamentais\n\n### Saúde\n- Atendimento prioritário\n- Medicamentos gratuitos\n\n### Transporte\n- Tarifa zero (ônibus)\n- Prioridade em filas\n\n### Cultura\n- Ingressos com desconto\n- Atividades culturais\n\n## Proteção contra violência\n\n- Abandono\n- Violência física e psicológica\n- Exploração\n- Negligência\n\n## Como denunciar?\n\n- Disque 180\n- Delegacia de polícia\n- Ministério Público\n- Defensoria Pública\n\n## Penalties\n\n- Reclusão de 2 a 5 anos\n- Multa\n- Suspensão de direitos políticos\n\n## Dicas\n\n1. **Conheça** seus direitos\n2. **Documente** abusos\n3. **Denuncie** violências\n4. **Procure** ajuda jurídica`},
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

for (const post of maisPosts3) {
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
