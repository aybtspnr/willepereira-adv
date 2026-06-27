import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Shield, AlertTriangle, DollarSign, CreditCard, Heart,
  Package, Ban, Megaphone, Users, TrendingDown,
  ArrowRight, CheckCircle, ChevronRight, BookOpen,
  Gavel, Scale, Search, Star, Phone, HelpCircle,
  FileText, XCircle, RefreshCw, Percent
} from 'lucide-react'
import { Link } from 'react-router-dom'

/* ===== ANIMATION VARIANTS ===== */
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } }

/* ===== COMPONENTS ===== */
function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ label, title, subtitle, light = false }: { label: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className={`text-center mb-16 md:mb-20 ${light ? 'text-white' : ''}`}>
      <span className={`inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-5 ${
        light ? 'bg-gold-15 text-gold' : 'bg-gold-10 text-gold-dark'
      }`}>
        {label}
      </span>
      <h2 className={`text-3xl md:text-4xl lg:text-5xl leading-tight ${light ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      <div className={`gold-divider-center mt-5 ${light ? 'opacity-70' : ''}`} />
      {subtitle && (
        <p className={`mt-5 max-w-2xl mx-auto text-base md:text-lg leading-relaxed ${
          light ? 'text-gray-300' : 'text-gray-500'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

/* ===== TOPIC DATA ===== */
interface TopicCard {
  icon: any
  title: string
  slug: string
  paragraphs: string[]
  highlights: string[]
}

const topicCards: TopicCard[] = [
  {
    icon: DollarSign,
    title: 'Cobranças Indevidas',
    slug: 'cobrancas-indevidas',
    paragraphs: [
      'A cobrança indevida é uma das práticas mais lesivas e recorrentes nas relações de consumo brasileiras. O Código de Defesa do Consumidor (Lei nº 8.078/90), em seu artigo 42, parágrafo único, estabelece que o consumidor cobrado em quantia indevida tem direito à repetição do indébito (devolução) por valor igual ao dobro do que pagou em excesso, acrescido de correção monetária e juros legais, salvo hipótese de engano justificável. Essa proteção legal visa coibir abusos por parte de fornecedores que utilizam a cobrança como instrumento de pressão ilegítima sobre o consumidor.',
      'As hipóteses mais comuns de cobrança indevida incluem: tarifas bancárias não contratadas ou sem previsão legal, taxas de serviço cobradas após o término do contrato, encargos moratórios abusivos (juros remuneratórios acima da taxa média de mercado), multa contratual superior a 2% sobre o valor da prestação (limite legal do CDC para multa moratória), cobrança de serviços não solicitados ou não prestados, taxas de religação de serviços essenciais (água, luz, telefonia) em valor excessivo, e inclusão de despesas administrativas sem respaldo contratual.',
      'O consumidor que receber cobrança indevida deve imediatamente: (1) registrar formalmente a reclamação junto ao fornecedor por escrito, preferencialmente com protocolo; (2) guardar todos os comprovantes, extratos, faturas e documentos que demonstrem a irregularidade; (3) buscar os órgãos de defesa do consumidor (PROCON, consumidor.gov.br); (4) em casos de reiteração ou dano moral, ajuizar ação judicial com pedido de indenização. A jurisprudência do STJ firmou entendimento de que a cobrança indevida reiterada configura dano moral in re ipsa, dispensando a comprovação do prejuízo.',
    ],
    highlights: ['Repetição em dobro do valor pago (CDC art. 42)', 'Dano moral independente de prova em cobranças reiteradas', 'Multa contratual limitada a 2% no CDC'],
  },
  {
    icon: XCircle,
    title: 'Negativação Injusta',
    slug: 'negativacao-injusta',
    paragraphs: [
      'A negativação injusta ocorre quando o nome do consumidor é inserido indevidamente em cadastros restritivos de crédito, como SPC, Serasa, CCF (Cadastro de Emitentes de Cheques sem Fundos) ou cadastros internos de instituições financeiras. O Código de Defesa do Consumidor assegura ao consumidor, em seu artigo 43, o direito de não ser incluído em cadastros de inadimplentes sem prévia comunicação escrita, bem como o direito à imediata correção de informações inexatas. A ausência de notificação prévia por escrito é a irregularidade mais frequente nesses casos.',
      'O Superior Tribunal de Justiça consolidou o entendimento de que o protesto indevido de título cambial e a inscrição irregular em cadastros de proteção ao crédito geram dano moral presumido (dano in re ipsa), independentemente de prova do prejuízo concreto. A Súmula 385 do STJ estabelece que "da anotação irregular em cadastro de proteção ao crédito, não cabe indenização por dano moral, quando preexistente legítima anotação, ressalvado o agravamento". Isso significa que, se o consumidor já possuía negativação válida, a inclusão indevida não gera dano moral autônomo, salvo se agravar sua situação.',
      'As hipóteses mais comuns de negativação indevida abrangem: dívida já quitada mas não baixada no sistema, valor incorreto da dívida, dívida prescrita (não pode ser cobrada judicialmente nem negativada após 5 anos da data do vencimento), ausência de notificação prévia, erro de homonímia (consumidor com nome igual ao do devedor real), contratação fraudulenta por terceiros (golpe), e inscrição durante período de contestação administrativa. O consumidor tem direito à exclusão imediata do nome dos cadastros e à indenização por danos morais.',
    ],
    highlights: ['Notificação prévia por escrito é obrigatória', 'Dano moral presumido (Súmula 385 STJ)', 'Exclusão imediata após pagamento ou decisão judicial'],
  },
  {
    icon: Package,
    title: 'Vícios de Produto e Serviço',
    slug: 'vicio-produto-servico',
    paragraphs: [
      'O vício do produto ou serviço é um dos institutos centrais do Direito do Consumidor, disciplinado nos artigos 18 a 25 do CDC. Diferencia-se do defeito porque o vício está relacionado à inadequação do produto ou serviço ao fim a que se destina — ou seja, não funciona adequadamente, apresenta qualidade inferior à esperada ou difere das indicações do fornecedor. O defeito, por sua vez, envolve risco à saúde e segurança do consumidor. O CDC estabelece prazos para reclamação: 30 dias para produtos não duráveis (alimentos, medicamentos) e 90 dias para produtos duráveis (eletrodomésticos, veículos, móveis), contados da entrega efetiva do produto ou do término da prestação do serviço.',
      'Quando o fornecedor é informado do vício, dispõe do prazo máximo de 30 dias para solucioná-lo. Se o prazo não for cumprido ou o vício não for sanado, o consumidor pode exigir, alternativamente e à sua escolha: (I) a substituição do produto por outro da mesma espécie e em perfeitas condições de uso; (II) a restituição imediata da quantia paga, monetariamente atualizada, sem prejuízo de perdas e danos; (III) o abatimento proporcional do preço. Essa tríplice opção do consumidor é uma das garantias mais poderosas do CDC, assegurando-lhe o poder de escolha diante do descumprimento contratual pelo fornecedor.',
      'No caso de serviços, o vício de qualidade pode manifestar-se como: serviço não executado conforme contratado, execução imperfeita, prazo de validade descumprido, informação inadequada sobre o serviço, ou impossibilidade de realização do serviço contratado. Exemplos comuns incluem serviços de telefonia (falhas na prestação), serviços bancários (taxas indevidas), serviços de transporte (atrasos e cancelamentos), serviços de saúde (negativas de cobertura), e serviços educacionais (qualidade inferior à divulgada). A inversão do ônus da prova em favor do consumidor, determinada pelo artigo 6º, VIII, do CDC, é aplicada nesses casos por ser o consumidor a parte hipossuficiente da relação.',
    ],
    highlights: ['Vício = inadequação ao fim; Defeito = risco à segurança', '30 ou 90 dias para reclamar (não duráveis / duráveis)', 'Tríplice opção: substituição, restituição ou abatimento'],
  },
  {
    icon: RefreshCw,
    title: 'Revisão de Contratos Bancários',
    slug: 'revisao-contratos-bancarios',
    paragraphs: [
      'A revisão de contratos bancários é uma das áreas mais demandadas do Direito do Consumidor, especialmente em momentos de crise econômica. O CDC, em seu artigo 6º, inciso V, assegura ao consumidor o direito à modificação de cláusulas contratuais que estabeleçam prestações desproporcionais ou que sejam excessivamente onerosas, também chamado de revisão contratual por onerosidade excessiva. No âmbito bancário, essa proteção é frequentemente invocada para questionar taxas de juros abusivas, capitalização de juros (anatocismo), tarifas indevidas e cláusulas contratuais abusivas.',
      'A jurisprudência do STJ (Súmulas 379 a 382 e 450 a 472) estabelece parâmetros importantes para a revisão de contratos bancários: (1) a capitalização de juros em periodicidade inferior a um ano é vedada para contratos anteriores ao ano 2000 e permitida para contratos posteriores desde que expressamente pactuada; (2) as taxas de juros remuneratórios podem ser revisadas se demonstrada abusividade em relação à taxa média de mercado divulgada pelo Banco Central; (3) a comissão de permanência é ilícita quando cumulada com correção monetária, juros remuneratórios e multa contratual; (4) as tarifas bancárias devem observar a regulamentação do Banco Central (Resolução CMN nº 3.919/10 e normativos posteriores).',
      'As ações revisionais podem abranger: contratos de empréstimo pessoal, financiamento de veículos, crédito consignado, cartão de crédito rotativo, cheque especial, crédito imobiliário, financiamento rural e cédulas de crédito bancário. É fundamental que o consumidor reúna toda a documentação contratual, extratos e demonstrativos de débito para instruir a ação revisional. O ajuizamento da ação revisional não exonera o consumidor do pagamento das parcelas vincendas, que devem continuar sendo pagas nos valores originais ou depositadas judicialmente, sob pena de configuração de mora.',
    ],
    highlights: ['Revisão por onerosidade excessiva (art. 6º, V, CDC)', 'Taxas de juros comparadas à taxa média do BACEN', 'Capitalização de juros exige pactuação expressa'],
  },
  {
    icon: Heart,
    title: 'Plano de Saúde: Cobertura e Reajustes',
    slug: 'plano-saude-cobertura-reajustes',
    paragraphs: [
      'Os planos de saúde privados são regulados no Brasil pela Lei nº 9.656/98 e pela Agência Nacional de Saúde Suplementar (ANS), mas o CDC aplica-se subsidiariamente para proteger o consumidor contra abusos e cláusulas abusivas. A negativa de cobertura assistencial é o principal litígio na área, ocorrendo quando a operadora se recusa a autorizar procedimentos médicos, exames, cirurgias, internações ou tratamentos prescritos pelo médico assistente, sob alegações como: carência não cumprida, doença preexistente, exclusão contratual, limite de dias de internação, ou falta de previsão no rol de procedimentos da ANS.',
      'O STJ firmou jurisprudência consolidada de que o rol de procedimentos da ANS é taxativo (obrigatório), mas admite coberturas extraordinárias quando o tratamento prescrito não está no rol mas é a única alternativa eficaz para a doença (RESP 1.889.704/SP, Tema 1032 dos Recursos Repetitivos). Essa decisão equilibrou a proteção do consumidor com a sustentabilidade do setor, permitindo a cobertura de terapias não listadas apenas quando comprovada a necessidade clínica excepcional. A negativa de cobertura considerada abusiva gera dano moral in re ipsa, conforme Súmula 209 do TJSP e jurisprudência consolidada do STJ.',
      'Os reajustes de mensalidades também são fonte frequente de conflitos. Os planos individuais/familiares têm reajuste anual regulado pela ANS, com índice máximo divulgado anualmente. Já os planos coletivos (empresariais e por adesão) não sofrem regulação de teto de reajuste, o que tem gerado aumentos abusivos que chegam a 30%, 40% ou mais. O consumidor pode questionar judicialmente reajustes que não observem a metodologia atuarial da ANS, não sejam justificados pela sinistralidade do grupo, ou que superem desproporcionalmente a inflação médica do período. A ação revisional de plano de saúde visa restabelecer o equilíbrio contratual e evitar a exclusão do beneficiário por impossibilidade de pagamento.',
    ],
    highlights: ['Rol da ANS é taxativo, com exceções por necessidade clínica', 'Negativa abusiva gera dano moral presumido', 'Reajustes abusivos podem ser questionados judicialmente'],
  },
  {
    icon: AlertTriangle,
    title: 'Produtos com Defeito',
    slug: 'produtos-com-defeito',
    paragraphs: [
      'O produto com defeito (ou acidente de consumo) distingue-se do produto com vício porque envolve risco efetivo ou potencial à saúde e segurança do consumidor. O CDC, nos artigos 12 a 14, estabelece a responsabilidade objetiva do fornecedor pelo fato do produto — ou seja, independentemente de culpa. Basta que o consumidor demonstre o defeito, o dano sofrido e o nexo causal entre eles. O fabricante, o produtor, o importador e o comerciante respondem solidariamente pelos danos causados, cabendo ao consumidor escolher contra quem demandar.',
      'Exemplos clássicos de defeitos de produto incluem: eletrodomésticos que superaquecem ou explodem, alimentos contaminados ou com corpo estranho, medicamentos com efeitos colaterais não informados, brinquedos com partes pequenas que apresentam risco de asfixia, veículos com defeito de fabricação que causam acidentes, equipamentos elétricos sem isolamento adequado, produtos inflamáveis sem advertência, e cosméticos que provocam reações alérgicas graves. O fornecedor que coloca no mercado de consumo produto defeituoso responde civilmente pelos danos materiais e morais causados, podendo ainda responder criminalmente nos casos de dolo ou culpa grave.',
      'O prazo prescricional para ajuizar ação de indenização por fato do produto é de 5 anos, conforme artigo 27 do CDC, contado do conhecimento do dano e de sua autoria. Para produtos duráveis com prazo de garantia contratual superior, predomina a garantia contratual, mas sem excluir a responsabilidade objetiva pelo defeito. É essencial que o consumidor documente o ocorrido com fotos, vídeos, laudos técnicos, testemunhas e registros de atendimento, além de comunicar imediatamente o fornecedor para prevenir o agravamento do dano e preservar seu direito de regresso.',
    ],
    highlights: ['Responsabilidade objetiva do fornecedor (independe de culpa)', 'Defeito = risco à saúde e segurança do consumidor', 'Prazo de 5 anos para ação indenizatória (art. 27 CDC)'],
  },
  {
    icon: Ban,
    title: 'Práticas Abusivas',
    slug: 'praticas-abusivas',
    paragraphs: [
      'As práticas abusivas são condutas vedadas pelo CDC que violam a boa-fé objetiva e o equilíbrio nas relações de consumo, ainda que não expressamente tipificadas. O artigo 39 do CDC traz um rol exemplificativo de práticas abusivas, que inclui: condicionar o fornecimento de produto ou serviço ao fornecimento de outro (venda casada), recusar atendimento às demandas dos consumidores na exata medida de suas disponibilidades de estoque e capacidade de prestação do serviço, enviar produto ou serviço sem solicitação prévia (venda por telemarketing agressivo), exigir do consumidor vantagem manifestamente excessiva, elevar o preço de produtos ou serviços sem justa causa (aumento abusivo em eventos sazonais ou situações de emergência).',
      'A venda casada é uma das práticas abusivas mais combatidas, ocorrendo quando o fornecedor condiciona a aquisição de um produto ou serviço à compra de outro. Exemplos comuns: instituições financeiras que exigem a contratação de seguro ou título de capitalização para conceder financiamento; operadoras de telefonia que condicionam a venda do aparelho à contratação de plano pós-pago; escolas que condicionam a matrícula à compra de material didático de editora específica ou uniforme de fornecedor determinado. O CADE (Conselho Administrativo de Defesa Econômica) e os PROCONs atuam na repressão administrativa dessas práticas.',
      'Outras práticas abusivas recorrentes incluem: exigência de caução ou garantia excessiva para locação de imóveis, cobrança de taxa de cadastro para contratação de serviços essenciais, limitação quantitativa de produtos em promoção sem justificativa, recusa de venda por quantidade inferior ao mínimo estabelecido (quando o consumidor deseja adquirir menor quantidade), envio de produto não solicitado ao consumidor sem que este possa ser cobrado (considerado amostra grátis nos termos do art. 39, parágrafo único do CDC), e publicidade que explora a inexperiência ou credulidade do consumidor, especialmente crianças e idosos.',
    ],
    highlights: ['Venda casada é expressamente proibida (art. 39, I, CDC)', 'Elevação de preço sem justa causa é abusiva', 'Produto não solicitado é considerado amostra grátis'],
  },
  {
    icon: Megaphone,
    title: 'Publicidade Enganosa',
    slug: 'publicidade-enganosa',
    paragraphs: [
      'A publicidade enganosa é aquela capaz de induzir o consumidor a erro quanto à natureza, características, qualidade, quantidade, propriedades, origem, preço ou quaisquer outros dados relevantes do produto ou serviço. O CDC, em seu artigo 37, proíbe expressamente toda publicidade enganosa ou abusiva, considerando enganosa qualquer modalidade de informação ou comunicação de caráter publicitário, inteira ou parcialmente falsa, ou por omissão, capaz de induzir em erro o consumidor. A publicidade pode ser enganosa por ação (quando veicula informação falsa) ou por omissão (quando deixa de informar dado essencial).',
      'A publicidade enganosa por omissão é particularmente grave porque o consumidor toma a decisão de consumo sem ter acesso a informações críticas. Exemplos: anúncios de planos de saúde que destacam coberturas amplas mas omitem carências e exclusões contratuais; ofertas de crédito que divulgam apenas o valor das parcelas sem informar a taxa de juros efetiva (CET); propagandas de alimentos que destacam propriedades nutricionais positivas mas omitem altos teores de açúcar, sódio ou gordura; anúncios imobiliários que não informam sobre ônus ou restrições do imóvel.',
      'O consumidor vítima de publicidade enganosa tem direito: (I) ao cumprimento forçado da oferta nos exatos termos veiculados (art. 35 do CDC); (II) à indenização por perdas e danos materiais e morais; (III) à anulação do contrato com restituição dos valores pagos. A oferta publicitária vincula o fornecedor e integra o contrato que vier a ser celebrado (art. 30 do CDC). Em caso de descumprimento, o consumidor pode exigir o cumprimento da oferta, aceitar outro produto equivalente ou rescindir o contrato com devolução das quantias pagas. O PROCON e o Ministério Público podem atuar administrativa e judicialmente para coibir a publicidade enganosa.',
    ],
    highlights: ['Publicidade enganosa por ação ou omissão é proibida', 'Oferta vincula o fornecedor e integra o contrato', 'Consumidor pode exigir cumprimento forçado da oferta'],
  },
  {
    icon: Users,
    title: 'Ações Coletivas de Consumo',
    slug: 'acoes-coletivas-consumo',
    paragraphs: [
      'As ações coletivas de consumo são instrumentos processuais de extrema relevância para a tutela de direitos difusos, coletivos e individuais homogêneos dos consumidores. Reguladas pelo CDC (artigos 81 a 104) e pela Lei da Ação Civil Pública (Lei nº 7.347/85), essas ações permitem que lesões de massa sejam reparadas em um único processo, conferindo eficiência ao sistema de Justiça e ampliando o acesso do consumidor à tutela jurisdicional. Os legitimados para a propositura são: o Ministério Público, a Defensoria Pública, a União, os Estados, os Municípios, o Distrito Federal, a ANS, o PROCON e as associações civis constituídas há pelo menos um ano.',
      'As ações coletivas de consumo abrangem: (I) direitos difusos — transindividuais, de natureza indivisível, cujos titulares são pessoas indeterminadas ligadas por circunstâncias de fato (ex.: propaganda enganosa veiculada em âmbito nacional; produto defeituoso colocado no mercado de consumo); (II) direitos coletivos — transindividuais, de natureza indivisível, pertencentes a um grupo, categoria ou classe de pessoas ligadas entre si ou com a parte contrária por uma relação jurídica base (ex.: reajuste abusivo aplicado a todos os beneficiários de um plano de saúde coletivo); (III) direitos individuais homogêneos — decorrentes de origem comum, divisíveis, cujos titulares são determinados ou determináveis (ex.: consumidores que adquiriram o mesmo produto defeituoso e sofreram danos semelhantes).',
      'A sentença em ação coletiva tem eficácia erga omnes (para todos) nos casos de direitos difusos e coletivos, e ultra partes (para a categoria) nos casos de direitos individuais homogêneos. O consumidor que não participou do processo pode liquidar e executar individualmente a sentença coletiva, valendo-se do título executivo judicial obtido pelo legitimado coletivo. A coisa julgada, no processo coletivo, é secundum eventum litis — ou seja, se a ação for julgada improcedente por insuficiência de provas, qualquer legitimado pode propor nova ação com prova nova. Esse sistema visa fortalecer a proteção do consumidor, permitindo que lesões de massa sejam enfrentadas de forma estruturada e eficiente.',
    ],
    highlights: ['Protegem direitos difusos, coletivos e individuais homogêneos', 'MP, DP, PROCON e associações são legitimados', 'Eficácia erga omnes permite execução individual da sentença'],
  },
  {
    icon: TrendingDown,
    title: 'Superendividamento',
    slug: 'superendividamento',
    paragraphs: [
      'O superendividamento é a impossibilidade global de o consumidor pessoa física, de boa-fé, pagar a totalidade de suas dívidas não profissionais, líquidas e certas, sem comprometer seu mínimo existencial. A Lei nº 14.181/2021 (Lei do Superendividamento) alterou o CDC para introduzir um microsistema de prevenção e tratamento do superendividamento, reconhecendo que o excesso de dívidas não é apenas um problema individual, mas uma questão de saúde pública e de dignidade da pessoa humana. A lei estabelece mecanismos para que o consumidor superendividado possa renegociar suas dívidas de forma global e extrajudicial, com a participação de todos os credores.',
      'O procedimento de repactuação de dívidas previsto no CDC (artigos 104-A a 104-C) inicia-se com a requerimento do consumidor ao juiz, que designa audiência conciliatória com a presença de todos os credores. Durante a audiência, o consumidor apresenta uma proposta de plano de pagamento com prazo máximo de 5 anos, preservando o mínimo existencial (montante que garanta a subsistência digna do devedor e de sua família). O juiz pode homologar o acordo, que tem força de título executivo judicial e obriga todos os credores signatários. A lei veda expressamente cláusulas que imponham ao consumidor renúncia a direitos fundamentais ou que estabeleçam garantias excessivas.',
      'A Lei do Superendividamento também introduziu o dever de informação e prevenção: os fornecedores de crédito são obrigados a informar previamente o consumidor sobre o custo efetivo total da operação, a taxa de juros, os encargos moratórios e as consequências do inadimplemento. A publicidade de crédito ao consumidor deve conter advertência sobre os riscos do superendividamento. Ofertas de crédito para aposentados e pensionistas devem observar regras especiais de proteção. O consumidor superendividado tem direito a até 5% de sua renda mensal destinada ao pagamento mínimo das dívidas, garantindo o sustento básico enquanto busca a reestruturação financeira.',
    ],
    highlights: ['Lei 14.181/2021 criou sistema de prevenção e tratamento', 'Repactuação judicial com até 5 anos de prazo', 'Preservação do mínimo existencial do consumidor'],
  },
]

/* ===== FAQ DATA ===== */
const faqItems = [
  {
    q: 'Qual o prazo para contestar uma cobrança indevida no cartão de crédito?',
    a: 'O consumidor tem o prazo de 90 dias para contestar cobranças indevidas em fatura de cartão de crédito, contados do vencimento da fatura contestada, conforme regulamentação do Banco Central. No entanto, o prazo para ajuizar ação de repetição de indébito (devolução em dobro) é de 5 anos, contados do pagamento indevido, com fundamento no art. 27 do CDC combinado com o art. 42, parágrafo único. Recomenda-se registrar a reclamação imediatamente ao identificar o erro, preferencialmente por escrito e com protocolo de atendimento.',
  },
  {
    q: 'Quando uma negativação no SPC/Serasa é considerada injusta?',
    a: 'A negativação é considerada injusta em diversas hipóteses: (1) quando o consumidor não foi notificado previamente por escrito sobre a inclusão do nome no cadastro; (2) quando a dívida já foi paga mas o registro não foi baixado; (3) quando o valor da dívida está incorreto; (4) quando a dívida já prescreveu (5 anos da data do vencimento); (5) quando há erro de homonímia (homônimo); (6) quando a dívida decorre de fraude ou golpe. Em todos esses casos, o consumidor tem direito à exclusão imediata do nome dos cadastros e à indenização por danos morais.',
  },
  {
    q: 'Como funciona o prazo de 30 dias para conserto de produto com vício?',
    a: 'O CDC determina que, ao ser informado do vício, o fornecedor tem o prazo máximo de 30 dias para solucioná-lo. Esse prazo conta-se da data em que o consumidor entregou o produto ao fornecedor ou da comunicação formal do vício. Se o prazo não for cumprido ou o vício não for sanado adequadamente, o consumidor pode exigir: substituição do produto, restituição da quantia paga com correção monetária, ou abatimento proporcional do preço. O consumidor deve sempre formalizar a reclamação por escrito e guardar o protocolo como prova do início do prazo.',
  },
  {
    q: 'É possível revisar contrato bancário com juros acima da taxa média de mercado?',
    a: 'Sim. O STJ consolidou o entendimento de que as taxas de juros remuneratórios podem ser revisadas judicialmente quando demonstrada abusividade em relação à taxa média de mercado divulgada pelo Banco Central para a mesma modalidade de operação. A abusividade é reconhecida quando a taxa contratada supera em mais de 50% a taxa média de mercado (Súmula 382 do STJ). Além dos juros, é possível questionar a capitalização (juros sobre juros), tarifas indevidas, comissão de permanência e outras cláusulas abusivas.',
  },
  {
    q: 'Plano de saúde pode negar cobertura de tratamento prescrito pelo médico?',
    a: 'A negativa de cobertura é lícita quando o procedimento não está previsto no rol da ANS e não há necessidade clínica excepcional comprovada. No entanto, a jurisprudência do STJ (Tema 1032) admite a cobertura extraordinária quando: (1) o tratamento prescrito é a única alternativa eficaz para a doença; (2) há comprovação médica da eficácia do tratamento; (3) o tratamento não é experimental. A negativa abusiva (recusa de cobertura prevista no contrato ou no rol) gera dano moral presumido, podendo o beneficiário requerer autorização judicial liminar para realizar o procedimento.',
  },
  {
    q: 'Como funciona a ação coletiva de consumo e como posso me beneficiar?',
    a: 'A ação coletiva de consumo é proposta por entidades como Ministério Público, Defensoria Pública, PROCON ou associações de consumidores, em defesa de um grupo de pessoas que sofreram danos semelhantes (ex.: todos os consumidores que adquiriram um produto defeituoso). Se a ação for julgada procedente, a sentença beneficia todos os consumidores na mesma situação, mesmo que não tenham participado do processo. Para receber a indenização, o consumidor deve habilitar-se na fase de liquidação e execução da sentença, comprovando que se enquadra na situação definida na decisão judicial.',
  },
  {
    q: 'O que é a Lei do Superendividamento e como ela me protege?',
    a: 'A Lei nº 14.181/2021 (Lei do Superendividamento) alterou o CDC para criar mecanismos de prevenção e tratamento do endividamento excessivo. Ela permite que o consumidor de boa-fé, pessoa física, que não consiga pagar suas dívidas sem comprometer o mínimo existencial, solicite ao juiz a repactuação global de todas as dívidas. O procedimento é realizado em audiência conciliatória com todos os credores, onde se propõe um plano de pagamento com prazo máximo de 5 anos. Durante o processo, o consumidor tem garantida a preservação de renda mínima para sua subsistência e de sua família.',
  },
  {
    q: 'A publicidade enganosa dá direito a cancelamento do contrato e devolução dos valores?',
    a: 'Sim. A publicidade enganosa (que induz o consumidor a erro) viola o direito à informação adequada e à transparência nas relações de consumo. O CDC assegura ao consumidor vítima de publicidade enganosa as seguintes opções: (I) exigir o cumprimento forçado da oferta nos exatos termos veiculados; (II) aceitar outro produto ou serviço equivalente; (III) rescindir o contrato com a devolução integral das quantias pagas, monetariamente atualizadas, sem prejuízo de indenização por perdas e danos. Recomenda-se guardar provas da publicidade (capturas de tela, gravações, anúncios impressos) para instrução do pedido.',
  },
]

/* ===== PAGE COMPONENT ===== */
import SEO from '../components/SEO'

export default function DireitoConsumidor() {
return (
    <div>
      <SEO
        title="Direito do Consumidor | Will & Pereira Advocacia"
        description="Proteção dos direitos do consumidor: CDC, produtos defeituosos, cobrança indevida e planos de saúde."
        canonical="https://willepereira-adv.vercel.app/consumidor"
      />
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-32 pb-24 md:pb-32 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a2634_0%,_#0f1729_100%)]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c9a84c\' fill-opacity=\'1\'%3E%3Cpath d=\'M40 0L0 40l40 40L80 40z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gold-5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gold-3 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 text-gold/80 text-sm font-medium mb-6 tracking-wide">
              <Shield size={16} />
              <span className="uppercase tracking-[0.15em]">Área de Atuação</span>
              <span className="w-8 h-px bg-gold-40" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
          >
            Direito do <span className="text-gradient-gold">Consumidor</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed mb-8"
          >
            Atuamos na proteção dos direitos dos consumidores contra abusos, 
            cobranças indevidas, negativações injustas, vícios de produtos e serviços, 
            questões com planos de saúde e demais práticas lesivas nas relações de consumo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/contato" className="btn-primary text-base px-8 py-4 group">
              Fale Conosco
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <a href="#topics" className="btn-outline btn-outline-light text-base px-8 py-4">
              Ver Conteúdo
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex flex-wrap items-center gap-6 text-gray-500 text-xs uppercase tracking-widest"
          >
            <span className="flex items-center gap-2">
              <Scale size={14} className="text-gold" /> CDC e Legislação
            </span>
            <span className="w-px h-4 bg-white/10" />
            <span>PROCON</span>
            <span className="w-px h-4 bg-white/10" />
            <span>Direitos e Garantias</span>
            <span className="w-px h-4 bg-white/10" />
            <span>Defesa Judicial</span>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ INTRODUÇÃO ═══════════════ */}
      <section id="topics" className="section-padding">
        <div className="container-premium">
          <SectionHeading
            label="Guia Completo"
            title="Direito do Consumidor em Detalhes"
            subtitle="Conteúdo jurídico aprofundado sobre os principais temas do Direito do Consumidor. Informações técnicas para consumidores, empresas e profissionais do Direito."
          />

          {/* Overview cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Gavel, count: '10+', label: 'Anos de Atuação Consumerista' },
              { icon: FileText, count: '600+', label: 'Casos de Consumo Atendidos' },
              { icon: Star, count: 'Nacional', label: 'Atendimento em Todo o Brasil' },
              { icon: Scale, count: 'CDC', label: 'Especialização no Código de Defesa do Consumidor' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-cream rounded-2xl p-6 text-center hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-gold" />
                </div>
                <div className="text-2xl font-display text-gradient-gold">{stat.count}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Introductory text */}
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-gray-600 leading-relaxed space-y-6">
              <p className="text-lg text-navy font-medium">
                O Direito do Consumidor é o ramo jurídico destinado a proteger a parte mais vulnerável 
                nas relações de consumo — o consumidor — estabelecendo regras e princípios que equilibram 
                a relação com fornecedores de produtos e serviços. Instituído pelo Código de Defesa do 
                Consumidor (Lei nº 8.078/90), é considerado um dos mais avançados sistemas de proteção 
                consumerista do mundo.
              </p>
              <p>
                O CDC completa mais de três décadas de vigência como um microssistema jurídico que integra 
                normas de direito civil, processual civil, administrativo e penal, todos voltados à tutela 
                do consumidor. Seus princípios basilares incluem o reconhecimento da vulnerabilidade do 
                consumidor no mercado, a boa-fé objetiva nas relações contratuais, a transparência e 
                informação adequada, a proteção contra práticas abusivas e publicidade enganosa, a 
                facilitação da defesa dos direitos do consumidor (com inversão do ônus da prova) e o 
                acesso à justiça, inclusive por meio de ações coletivas.
              </p>
              <p>
                A Lei nº 14.181/2021 (Lei do Superendividamento) e as constantes atualizações 
                jurisprudenciais dos tribunais superiores demonstram que o Direito do Consumidor está em 
                permanente evolução, acompanhando as transformações do mercado e as novas modalidades de 
                consumo, como o comércio eletrônico, os serviços digitais e as fintechs. Compreender esses 
                direitos é essencial para evitar abusos e buscar a reparação adequada quando seus direitos 
                forem violados.
              </p>
              <p>
                A seguir, apresentamos um guia completo e aprofundado sobre os principais temas do Direito 
                do Consumidor brasileiro, organizado por áreas específicas para facilitar a consulta e o 
                entendimento. Cada tópico aborda aspectos legais, jurisprudenciais e práticos fundamentais 
                para a orientação de consumidores e profissionais do Direito.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════ TÓPICOS DETALHADOS ═══════════════ */}
      <section className="section-padding bg-cream">
        <div className="container-premium">
          <SectionHeading
            label="Conteúdo Detalhado"
            title="Todos os Temas do Direito do Consumidor"
            subtitle="Análise técnica e aprofundada de cada área do Direito Consumerista, com fundamentação legal e jurisprudencial."
          />

          <div className="space-y-20">
            {topicCards.map((topic, idx) => {
              const Icon = topic.icon
              return (
                <motion.article
                  key={topic.slug}
                  id={topic.slug}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`grid lg:grid-cols-5 gap-10 items-start ${
                    idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Icon and highlights sidebar */}
                  <div className={`lg:col-span-2 ${idx % 2 === 1 ? 'lg:col-start-4' : ''}`}>
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-lg shadow-navy/5 sticky top-28">
                      <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center mb-5">
                        <Icon className="w-7 h-7 text-gold" />
                      </div>
                      <h3 className="font-serif text-2xl text-navy mb-4">{topic.title}</h3>
                      <div className="space-y-3">
                        {topic.highlights.map(h => (
                          <div key={h} className="flex items-start gap-2.5">
                            <CheckCircle size={16} className="text-gold mt-0.5 shrink-0" />
                            <span className="text-sm text-gray-600">{h}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <Link
                          to="/contato"
                          className="inline-flex items-center gap-2 text-sm font-medium text-gold-dark hover:text-gold transition-colors"
                        >
                          Consultar Advogado <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className={`lg:col-span-3 space-y-5 ${idx % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    {topic.paragraphs.map((p, pi) => (
                      <motion.p
                        key={pi}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + pi * 0.1 }}
                        className="text-gray-600 leading-relaxed"
                      >
                        {p}
                      </motion.p>
                    ))}
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ IMPORTÂNCIA DO ADVOGADO ═══════════════ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="relative z-10 container-premium">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 bg-gold-15 text-gold text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-5">
                Por Que Contratar um Advogado
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-6">
                Defesa Técnica e<br />
                <span className="text-gradient-gold">Estratégica</span>
              </h2>
              <div className="w-16 h-px bg-gold-50 mb-6" />
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  O Direito do Consumidor é uma área técnica e complexa, que exige conhecimento aprofundado 
                  do CDC, da jurisprudência consolidada dos tribunais superiores e das regulamentações 
                  administrativas dos órgãos de defesa do consumidor. Um advogado especializado é fundamental 
                  para orientar o consumidor sobre a viabilidade de sua demanda, reunir as provas adequadas 
                  e conduzir a estratégia processual mais eficiente.
                </p>
                <p>
                  Cada caso de consumo apresenta particularidades que demandam análise cuidadosa: prazos 
                  prescricionais, ônus da prova, responsabilidade solidária dos fornecedores, possibilidade 
                  de inversão do ônus probatório, cabimento de dano moral, viabilidade de tutela de urgência 
                  e adequação da via processual (individual ou coletiva). Uma atuação técnica e 
                  especializada faz toda a diferença no resultado da demanda.
                </p>
                <p>
                  Nossa equipe está preparada para atender consumidores em todo o Brasil, tanto 
                  presencialmente quanto por videoconferência. Oferecemos atendimento personalizado, 
                  com comunicação clara e transparente em todas as fases do processo.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-xl">
                  <h3 className="font-serif text-2xl text-navy mb-6">Nossa Atuação</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Search, text: 'Análise criteriosa de cada caso com fundamentação legal' },
                      { icon: Shield, text: 'Estratégia processual personalizada e transparente' },
                      { icon: Heart, text: 'Atendimento humanizado com comunicação clara' },
                      { icon: Star, text: 'Acompanhamento integral até a solução do caso' },
                    ].map(item => (
                      <div key={item.text} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-gold" />
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed pt-2">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-4 -right-4 bg-navy text-white rounded-xl p-4 shadow-xl max-w-[180px]"
                >
                  <Gavel className="text-gold mb-1" size={20} />
                  <p className="text-xs font-medium">Defesa dos seus direitos de consumo</p>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="section-padding">
        <div className="container-premium max-w-4xl">
          <SectionHeading
            label="FAQ"
            title="Perguntas Frequentes"
            subtitle="Esclarecemos as principais dúvidas sobre Direito do Consumidor. Se você não encontrar sua pergunta aqui, entre em contato conosco."
          />

          <div className="space-y-3">
            {faqItems.map((item, i) => {
              const FaqIcon = i % 2 === 0 ? HelpCircle : FileText
              return (
                <motion.details
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-navy/5 transition-all duration-300"
                >
                  <summary className="flex items-center gap-3 p-5 md:p-6 cursor-pointer list-none">
                    <div className="w-9 h-9 rounded-lg bg-gold-10 flex items-center justify-center shrink-0">
                      <FaqIcon className="w-4 h-4 text-gold" />
                    </div>
                    <span className="font-display text-base md:text-lg text-navy flex-1 pr-4">
                      {item.q}
                    </span>
                    <motion.div
                      animate={{ rotate: 0 }}
                      className="text-gold shrink-0 group-open:rotate-180 transition-transform duration-300"
                    >
                      <ChevronRight size={18} />
                    </motion.div>
                  </summary>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 md:px-6 pb-5 md:pb-6"
                  >
                    <div className="w-full h-px bg-gray-100 mb-4" />
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {item.a}
                    </p>
                  </motion.div>
                </motion.details>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        
        <div className="relative z-10 container-premium text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-gold-15 text-gold text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-5">
              Estamos Prontos para Ajudar
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-6">
              Proteja Seus Direitos<br />
              <span className="text-gradient-gold">de Consumidor</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Entre em contato com nossa equipe especializada em Direito do Consumidor. 
              Analisamos seu caso com a excelência e dedicação que você merece.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contato" className="btn-primary text-base px-8 py-4">
                <Phone size={18} /> Fale Conosco
              </Link>
              <a href="#topics" className="btn-outline btn-outline-light text-base px-8 py-4">
                <BookOpen size={18} /> Ver Todos os Temas
              </a>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              Atendimento em todo o Brasil • Presencial e Online • Equipe Especializada
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
