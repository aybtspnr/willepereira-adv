import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { FileText, Scale, Building, Key, Map, ArrowRight, MapPin, Gavel, Shield, Search, ChevronDown, BadgeCheck, Award, Phone, FileSignature, Layers, Receipt, ClipboardCheck, Users } from 'lucide-react'

/* ===== ANIMATION VARIANTS ===== */
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } } }
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } } }
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
interface TopicItem {
  icon: any
  title: string
  shortTitle: string
  summary: string
  content: string[]
  highlights: string[]
  gradient: string
  iconBg: string
  borderColor: string
}

const topicos: TopicItem[] = [
  {
    icon: Layers,
    title: 'Usucapião — Todas as Modalidades',
    shortTitle: 'Usucapião',
    summary: 'Forma originária de aquisição da propriedade pelo exercício prolongado da posse, com todos os requisitos legais. Modalidades urbana, rural, extraordinária, ordinária, especial e coletiva.',
    content: [
      'A usucapião é um dos institutos mais relevantes do Direito Imobiliário brasileiro, constituindo modo originário de aquisição da propriedade mediante o exercício continuado e incontestado da posse por determinado período de tempo, com observância dos requisitos legais. Fundamentada no princípio da função social da propriedade e no reconhecimento de que a posse prolongada e produtiva deve ser premiada com o direito de propriedade, a usucapião está prevista nos artigos 1.238 a 1.244 do Código Civil e em legislações especiais.',
      'A usucapião extraordinária (art. 1.238 do CC) é a modalidade mais abrangente, exigindo posse ininterrupta e pacífica por 15 anos, independentemente de justo título ou boa-fé. O prazo pode ser reduzido para 10 anos se o possuidor tiver estabelecido moradia habitual ou realizado obras ou serviços de caráter produtivo no imóvel. Já a usucapião ordinária (art. 1.242 do CC) exige posse por 10 anos, com justo título e boa-fé, prazo reduzido para 5 anos se o título tiver sido registrado no Cartório de Registro de Imóveis.',
      'A usucapião especial urbana, prevista no art. 183 da Constituição Federal e regulamentada pelo Estatuto da Cidade (Lei 10.257/2001), exige posse por 5 anos ininterruptos e sem oposição, área urbana de até 250m², utilização para moradia do possuidor ou de sua família, e que o possuidor não seja proprietário de outro imóvel urbano ou rural. A usucapião especial rural (art. 191 da CF e art. 1.239 do CC) também exige 5 anos de posse, área rural de até 50 hectares, e que o possuidor nela resida e a torne produtiva com seu trabalho.',
      'A usucapião coletiva (art. 10 do Estatuto da Cidade) é instrumento de regularização fundiária de interesse social, aplicável a áreas urbanas ocupadas por população de baixa renda onde não seja possível identificar os terrenos individualizados de cada possuidor. A usucapião familiar (art. 1.240-A do CC) permite ao cônjuge abandonado que permanece no imóvel após a separação ou abandono do lar adquirir a propriedade após 2 anos de posse exclusiva e ininterrupta. Cada modalidade exige análise criteriosa dos requisitos específicos e a propositura da ação de usucapião com a documentação adequada.',
    ],
    highlights: [
      'Usucapião extraordinária: 15 anos de posse (10 anos com moradia ou obras)',
      'Usucapião ordinária: 10 anos com justo título e boa-fé (5 anos com registro)',
      'Usucapião especial urbana: 5 anos, área até 250m², para moradia',
      'Usucapião especial rural: 5 anos, área até 50 hectares, com produção',
      'Usucapião coletiva e familiar: instrumentos de regularização fundiária',
    ],
    gradient: 'linear-gradient(135deg, #d97706, #ea580c)',
    iconBg: 'bg-amber-500/10',
    borderColor: 'border-amber-200',
  },
  {
    icon: FileSignature,
    title: 'Contratos de Compra e Venda de Imóveis',
    shortTitle: 'Compra e Venda',
    summary: 'Instrumentos jurídicos que formalizam a transferência da propriedade imobiliária, abrangendo promessas de compra e venda, escrituras públicas, cláusulas contratuais e due diligence.',
    content: [
      'O contrato de compra e venda de imóvel é o ato jurídico bilateral pelo qual o proprietário (vendedor) se obriga a transferir a propriedade de um bem imóvel ao comprador, mediante o pagamento de determinado preço. No Direito Imobiliário brasileiro, a transferência da propriedade imóvel somente se aperfeiçoa com o registro do título aquisitivo no Cartório de Registro de Imóveis competente, conforme determina o art. 1.227 do Código Civil.',
      'A promessa de compra e venda (ou compromisso de compra e venda) é o instrumento mais utilizado no mercado imobiliário, especialmente em lançamentos de incorporação imobiliária. Trata-se de contrato preliminar pelo qual as partes se comprometem a celebrar futuramente o contrato definitivo. Quando devidamente registrada no Cartório de Registro de Imóveis, a promessa confere ao promitente comprador direito real à aquisição do imóvel, oponível contra terceiros.',
      'A escritura pública é obrigatória para a validade do negócio jurídico que transfira a propriedade de imóvel de valor superior a 30 salários mínimos (art. 108 do CC). A escritura deve ser lavrada no Tabelionato de Notas e conter todos os elementos essenciais do negócio: qualificação das partes, descrição do imóvel, preço, condições de pagamento e demais cláusulas. A due diligence imobiliária — verificação da situação jurídica, fiscal e cadastral do imóvel — é etapa indispensável antes da assinatura de qualquer contrato.',
      'Cláusulas contratuais relevantes incluem: condição suspensiva (sujeição do negócio à obtenção de financiamento), cláusula de arrependimento (com fixação de multa), cláusula de vigência (para contratos com prazo determinado), e convenção de condomínio (para unidades autônomas). A assessoria jurídica especializada na elaboração e análise de contratos imobiliários é fundamental para prevenir litígios e assegurar a segurança jurídica da transação.',
    ],
    highlights: [
      'Registro no Cartório de Imóveis é essencial para aquisição da propriedade',
      'Escritura pública obrigatória para imóveis acima de 30 salários mínimos',
      'Promessa de compra e venda registrada confere direito real',
      'Due diligence imobiliária previne riscos jurídicos e fiscais',
    ],
    gradient: 'linear-gradient(135deg, #2563eb, #4f46e5)',
    iconBg: 'bg-blue-500/10',
    borderColor: 'border-blue-200',
  },
  {
    icon: ClipboardCheck,
    title: 'Regularização de Imóveis',
    shortTitle: 'Regularização',
    summary: 'Procedimentos jurídicos e administrativos para sanear a situação documental e registral de imóveis irregulares, clandestinos ou com pendências cartorárias.',
    content: [
      'A regularização de imóveis é o conjunto de medidas jurídicas, administrativas e registrais destinadas a sanear a situação de imóveis que se encontram em desconformidade com a legislação urbanística, ambiental ou registral. Estima-se que milhões de imóveis no Brasil carecem de regularização, o que impede o acesso ao crédito, a transferência segura da propriedade e o pleno exercício dos direitos de propriedade.',
      'A regularização fundiária urbana (Reurb) é hoje o principal instrumento de regularização de núcleos urbanos informais, instituída pela Lei 13.465/2017 e regulamentada pelo Decreto 9.310/2018. A Reurb abrange tanto a regularização de interesse social (Reurb-S — para ocupações de população de baixa renda) quanto a regularização de interesse específico (Reurb-E — para demais ocupações). O procedimento envolve a aprovação do projeto de regularização pelo município e o registro dos títulos no Cartório de Imóveis.',
      'A regularização de imóveis também abrange situações como: averbação de construção (quando a edificação não consta na matrícula do imóvel), regularização de áreas comuns em condomínios, desmembramento e remembramento de lotes, retificação de área (correção da metragem no registro), e instituição de condomínio edilício. Cada caso requer procedimento específico junto ao Registro de Imóveis e, muitas vezes, à Prefeitura Municipal.',
      'A regularização fiscal é igualmente relevante: quitação de débitos de IPTU, ITBI, taxas de licença e contribuições de melhoria. Imóveis com débitos fiscais não podem ser transferidos regularmente, e a responsabilidade pelos tributos pode recair sobre o adquirente em determinadas circunstâncias. A assessoria jurídica especializada em regularização imobiliária conduz todo o processo, desde o levantamento da situação documental até o registro final dos títulos.',
    ],
    highlights: [
      'Reurb é o principal instrumento de regularização fundiária urbana',
      'Regularização documental e registral assegura a propriedade',
      'Averbação de construção e retificação de área são procedimentos comuns',
      'Regularização fiscal é etapa indispensável para a transferência',
    ],
    gradient: 'linear-gradient(135deg, #059669, #0d9488)',
    iconBg: 'bg-emerald-500/10',
    borderColor: 'border-emerald-200',
  },
  {
    icon: Gavel,
    title: 'Ações Possessórias',
    shortTitle: 'Ações Possessórias',
    summary: 'Instrumentos processuais para proteção da posse contra turbação, esbulho ou ameaça. Incluem reintegração, manutenção e interdito proibitório.',
    content: [
      'As ações possessórias são os meios processuais pelos quais o possuidor busca proteger sua posse contra agressões ou ameaças. Fundamentadas no art. 1.210 do Código Civil e nos arts. 554 a 568 do Código de Processo Civil, essas ações se dividem em três modalidades principais: reintegração de posse (para esbulho — perda total da posse), manutenção de posse (para turbação — interferência parcial no exercício da posse) e interdito proibitório (para ameaça iminente de esbulho ou turbação).',
      'O possuidor tem o direito de ser mantido ou reintegrado na posse em caso de turbação ou esbulho, desde que a ação seja proposta dentro do prazo de ano e dia da agressão. Dentro desse prazo, a ação possui caráter de força nova, permitindo o julgamento liminar com base na prova documental da posse e da agressão. Após ano e dia, a ação passa a ser de força velha, exigindo procedimento ordinário com dilação probatória.',
      'A tutela possessória é caracterizada pelo princípio da fungibilidade entre as três modalidades de ações possessórias, ou seja, o juiz pode conhecer de pedido possessório e outorgar a proteção correspondente ao tipo de agressão comprovada, ainda que o autor tenha proposto a ação inadequada. Também é admissível o caráter dúplice das ações possessórias, permitindo que o réu formule pedido contrário sem necessidade de reconvenção.',
      'A prova da posse é elemento central na ação possessória. Documentos como contratos de locação, contas de consumo, IPTU, fotografias, registros de ocorrência policial e testemunhas são meios de prova admissíveis. O possuidor direto (locatário, comodatário) pode valer-se das ações possessórias contra terceiros e até contra o possuidor indireto (proprietário), sendo indispensável a assistência de advogado especializado em direito imobiliário para o manejo adequado da ação.',
    ],
    highlights: [
      'Reintegração de posse: esbulho (perda total)',
      'Manutenção de posse: turbação (interferência)',
      'Interdito proibitório: ameaça iminente',
      'Prazo de ano e dia para ação de força nova com liminar',
    ],
    gradient: 'from-red-600 to-rose-600',
    iconBg: 'bg-red-500/10',
    borderColor: 'border-red-200',
  },
  {
    icon: Building,
    title: 'Incorporação Imobiliária',
    shortTitle: 'Incorporação',
    summary: 'Atividade empresarial de construção e comercialização de unidades autônomas, regida pela Lei 4.591/1964, abrangendo loteamentos, condomínios edilícios e empreendimentos imobiliários.',
    content: [
      'A incorporação imobiliária é a atividade exercida pelo incorporador com o objetivo de promover e realizar a construção de edificações compostas por unidades autônomas para alienação total ou parcial. Regulada pela Lei 4.591/1964, a incorporação imobiliária é um dos setores mais dinâmicos da economia brasileira e exige rigoroso cumprimento de requisitos legais para a segurança dos adquirentes e a viabilidade do empreendimento.',
      'O incorporador deve registrar o memorial de incorporação no Cartório de Registro de Imóveis, antes de iniciar as vendas. Esse registro deve conter: descrição do terreno, certidões de propriedade e ônus reais, projeto aprovado pela Prefeitura, cálculo das frações ideais, minuta da convenção de condomínio, prazo de construção, garantias oferecidas e memorial descritivo das unidades. A ausência de registro caracteriza a incorporação irregular.',
      'As garantias na incorporação imobiliária são múltiplas: patrimônio de afetação (que separa o patrimônio do empreendimento do patrimônio do incorporador, protegendo os adquirentes), seguro de construção, garantia bancária e caução. O patrimônio de afetação, instituído pela Lei 10.931/2004, é instrumento que confere maior segurança aos compradores, pois impede que o empreendimento seja atingido por dívidas alheias do incorporador.',
      'O contrato de compra e venda de unidade em incorporação deve observar o regime legal aplicável, incluindo as normas de proteção ao consumidor quando aplicáveis. A entrega do imóvel deve ocorrer no prazo estipulado, e o atraso pode gerar indenização ao adquirente. A assessoria jurídica tanto do incorporador quanto dos adquirentes é indispensável para garantir a regularidade do empreendimento e a segurança da aquisição.',
    ],
    highlights: [
      'Registro do memorial de incorporação é obrigatório antes das vendas',
      'Patrimônio de afetação protege os adquirentes',
      'Garantias: seguro construção, fiança bancária, caução',
      'Prazo de entrega e multa por atraso são cláusulas essenciais',
    ],
    gradient: 'linear-gradient(135deg, #7c3aed, #9333ea)',
    iconBg: 'bg-violet-500/10',
    borderColor: 'border-violet-200',
  },
  {
    icon: Users,
    title: 'Condomínio e Taxas',
    shortTitle: 'Condomínio',
    summary: 'Regime jurídico do condomínio edilício, direitos e deveres dos condôminos, cobrança de taxas condominiais, assembleias e convenção de condomínio.',
    content: [
      'O condomínio edilício, regido pelos arts. 1.331 a 1.358 do Código Civil e pela Lei 4.591/1964, é a forma de propriedade em que coexistem partes exclusivas (unidades autônomas — apartamentos, salas, lojas) e partes comuns do edifício (terreno, halls, elevadores, áreas de lazer, telhado). Cada condômino é proprietário exclusivo de sua unidade e coproprietário das áreas comuns, na proporção de sua fração ideal.',
      'A convenção de condomínio é o documento que institui o condomínio edilício e estabelece as regras de convivência, uso das áreas comuns, rateio das despesas e administração. Deve ser registrada no Cartório de Registro de Imóveis e tem eficácia para todos os condôminos, inclusive para os proprietários que não participaram de sua elaboração. O regimento interno complementa a convenção com normas de detalhamento do dia a dia.',
      'As taxas condominiais são a contribuição devida por cada condômino para fazer face às despesas de conservação, manutenção e administração do condomínio. As despesas ordinárias (água, luz, limpeza, salários, seguros) são rateadas conforme a fração ideal de cada unidade, salvo disposição diversa da convenção. As despesas extraordinárias (obras, reformas, benfeitorias) exigem aprovação em assembleia pelo quórum estabelecido na convenção.',
      'A inadimplência das taxas condominiais é uma das questões mais recorrentes no direito imobiliário. O condomínio pode cobrar judicialmente as taxas atrasadas, com correção monetária e juros, e requerer a penhora do imóvel do condômino inadimplente. A assembleia de condôminos é o órgão soberano do condomínio, competente para eleger o síndico, aprovar o orçamento anual, deliberar sobre obras e reformas, e aplicar penalidades pelo descumprimento das regras.',
    ],
    highlights: [
      'Condomínio edilício: partes exclusivas + áreas comuns',
      'Convenção e regimento interno regem a vida condominial',
      'Taxas ordinárias e extraordinárias rateadas conforme fração ideal',
      'Inadimplência permite cobrança judicial e penhora do imóvel',
    ],
    gradient: 'from-sky-600 to-cyan-600',
    iconBg: 'bg-sky-500/10',
    borderColor: 'border-sky-200',
  },
  {
    icon: Receipt,
    title: 'ITBI e Registro de Imóveis',
    shortTitle: 'ITBI e Registro',
    summary: 'Imposto sobre Transmissão de Bens Imóveis (ITBI) e o serviço de registro imobiliário, etapas essenciais para a validade e eficácia da transferência da propriedade.',
    content: [
      'O ITBI — Imposto sobre Transmissão de Bens Imóveis (ou ITIV — Imposto sobre Transmissão Inter Vivos) — é tributo de competência municipal incidente sobre as transmissões onerosas de bens imóveis, inter vivos, a título oneroso. Sua base de cálculo é o valor venal do imóvel transmitido, e as alíquotas variam conforme o município, geralmente entre 2% e 4% do valor do imóvel. O pagamento do ITBI é condição para o registro da transmissão no Cartório de Registro de Imóveis.',
      'A base de cálculo do ITBI tem sido objeto de intensa controvérsia jurídica. O Supremo Tribunal Federal, no Tema 1.113 (RE 1.257.165), firmou a tese de que a base de cálculo do ITBI é o valor do imóvel declarado pelo contribuinte, presumindo-se que esse valor corresponde ao valor venal, salvo se o município demonstre, mediante procedimento administrativo contraditório, que o valor declarado não condiz com o valor de mercado. Essa decisão protege o contribuinte contra cobranças abusivas.',
      'O Registro de Imóveis é o serviço público delegado, exercido em caráter privado por oficial de registro, que tem por finalidade a publicidade, autenticidade, segurança e eficácia dos atos jurídicos relativos a imóveis. O registro é o ato que atribui eficácia real ao negócio jurídico imobiliário, ou seja, sem o registro não há transferência de propriedade perante terceiros. O Cartório de Registro de Imóveis é o órgão competente para o registro de escrituras, contratos, hipotecas, usufrutos e demais direitos reais.',
      'A matrícula do imóvel é o assento individualizado que contém toda a história jurídica do imóvel: origem da propriedade, transmissões, ônus, hipotecas, ações reais e pessoais reipersecutórias. A certidão de matrícula atualizada é o instrumento essencial para a due diligence imobiliária, pois revela a situação jurídica do imóvel e eventuais restrições que possam inviabilizar a transação.',
    ],
    highlights: [
      'ITBI: imposto municipal sobre transmissão onerosa de imóveis',
      'Base de cálculo: valor venal, com proteção contra cobrança abusiva (Tema 1.113/STF)',
      'Registro no Cartório de Imóveis é indispensável para adquirir a propriedade',
      'Matrícula do imóvel contém o histórico jurídico completo',
    ],
    gradient: 'from-indigo-600 to-blue-600',
    iconBg: 'bg-indigo-500/10',
    borderColor: 'border-indigo-200',
  },
  {
    icon: Layers,
    title: 'Direito de Laje e Superfície',
    shortTitle: 'Laje e Superfície',
    summary: 'Direitos reais sobre coisa alheia que permitem a utilização do espaço aéreo ou superficial de imóvel de terceiro, com aplicação na regularização de moradias e no aproveitamento urbanístico.',
    content: [
      'O direito de laje e o direito de superfície são direitos reais sobre imóvel alheio que conferem ao seu titular a faculdade de utilizar o espaço aéreo ou a superfície de terreno de propriedade de terceiro. Ambos os institutos foram introduzidos ou aprimorados no ordenamento jurídico brasileiro com o objetivo de ampliar as possibilidades de aproveitamento dos imóveis urbanos e promover a regularização fundiária.',
      'O direito de laje, inserido no art. 1.225, XIII, do Código Civil pela Lei 13.465/2017, é o direito real de uso do espaço aéreo acima de uma construção já existente, permitindo a edificação de nova unidade imobiliária sobre laje, terraço ou cobertura de imóvel de terceiro. Trata-se de inovação legislativa que visa regularizar a situação de milhares de famílias que constroem moradias sobre a laje de imóveis de parentes ou terceiros, especialmente em comunidades e áreas urbanas densamente ocupadas.',
      'O direito de superfície, previsto nos arts. 1.369 a 1.377 do Código Civil, autoriza o proprietário a conceder a terceiro o direito de construir ou plantar em seu terreno, por tempo determinado, mediante remuneração ou gratuitamente. O superficiário adquire a propriedade superficiária das construções ou plantações, mantendo-se o proprietário do solo (nu-proprietário). Ao final do prazo, a propriedade superficiária se extingue, revertendo ao proprietário do solo o que foi construído ou plantado.',
      'A diferença fundamental entre os dois institutos é que o direito de laje pressupõe a existência de edificação prévia sobre a qual se construirá nova unidade autônoma, enquanto o direito de superfície pode ser constituído sobre terreno nu para construção ou plantio. Ambos são registráveis no Cartório de Registro de Imóveis e conferem ao titular a faculdade de alienar, hipotecar e transmitir o direito a seus herdeiros, dentro dos limites do título constitutivo.',
    ],
    highlights: [
      'Direito de laje: construção sobre edificação existente (Lei 13.465/2017)',
      'Direito de superfície: construir ou plantar em terreno alheio por prazo determinado',
      'Ambos são direitos reais registráveis no Cartório de Imóveis',
      'Instrumentos de regularização fundiária e aproveitamento urbanístico',
    ],
    gradient: 'linear-gradient(135deg, #0d9488, #059669)',
    iconBg: 'bg-teal-500/10',
    borderColor: 'border-teal-200',
  },
  {
    icon: Map,
    title: 'REURB — Regularização Fundiária Urbana',
    shortTitle: 'Reurb',
    summary: 'Procedimento jurídico, urbanístico e registral para incorporação de núcleos urbanos informais ao ordenamento territorial, com titulação de ocupantes.',
    content: [
      'A Regularização Fundiária Urbana (Reurb), instituída pela Lei 13.465/2017, é o conjunto de medidas jurídicas, urbanísticas, ambientais e sociais destinadas à incorporação dos núcleos urbanos informais ao ordenamento territorial urbano e à titulação de seus ocupantes. A Reurb representa o mais avançado marco legal da regularização fundiária no Brasil, substituindo e consolidando instrumentos anteriores de forma mais eficiente e abrangente.',
      'A Reurb se divide em duas modalidades principais. A Reurb de Interesse Social (Reurb-S) é aplicável a núcleos urbanos informais ocupados predominantemente por população de baixa renda, com procedimento simplificado e custos reduzidos. A Reurb de Interesse Específico (Reurb-E) abrange os demais núcleos urbanos informais, com procedimento mais complexo e exigências urbanísticas mais rigorosas. Em ambas as modalidades, o município é o ente federativo competente para processar e aprovar a regularização.',
      'Os instrumentos da Reurb incluem: a legitimação fundiária (ato administrativo de reconhecimento da aquisição originária do direito real de propriedade sobre unidade imobiliária), a legitimação de posse (ato que reconhece a posse do ocupante para posterior conversão em propriedade), o projeto de regularização fundiária (PRF — conjunto de plantas, memoriais e documentos técnicos), e o registro da regularização no Cartório de Registro de Imóveis.',
      'A Reurb confere aos ocupantes diversos benefícios: acesso à titulação da propriedade, possibilidade de obtenção de financiamento imobiliário, valorização do imóvel, acesso a serviços públicos e infraestrutura, e segurança jurídica para si e para seus herdeiros. O procedimento exige a participação de profissionais do direito, engenharia e assistência social, sendo a assessoria jurídica especializada fundamental para conduzir o processo desde o diagnóstico fundiário até o registro final.',
    ],
    highlights: [
      'Lei 13.465/2017: marco legal da regularização fundiária urbana',
      'Reurb-S: interesse social (baixa renda) e Reurb-E: interesse específico',
      'Instrumentos: legitimação fundiária, legitimação de posse, PRF',
      'Benefícios: titulação, financiamento, valorização e segurança jurídica',
    ],
    gradient: 'from-green-600 to-emerald-600',
    iconBg: 'bg-green-500/10',
    borderColor: 'border-green-200',
  },
  {
    icon: Key,
    title: 'Locação Comercial e Residencial',
    shortTitle: 'Locação',
    summary: 'Contratos de aluguel de imóveis urbanos, regidos pela Lei do Inquilinato (Lei 8.245/1991), abrangendo locações residenciais, comerciais, prazos, garantias, revisão de aluguel e despejo.',
    content: [
      'A locação de imóvel urbano, disciplinada pela Lei 8.245/1991 (Lei do Inquilinato), é o contrato pelo qual uma pessoa (locador) se obriga a ceder a outra (locatário ou inquilino), por tempo determinado ou indeterminado, o uso e gozo de imóvel, mediante retribuição (aluguel). A lei distingue a locação residencial, destinada à moradia do locatário, da locação não residencial (comercial), destinada ao exercício de atividade empresarial, profissional ou institucional.',
      'A locação residencial pode ser contratada por prazo determinado (mínimo de 30 meses sem possibilidade de denúncia antecipada pelo locador) ou indeterminado (denunciável a qualquer tempo). Na locação por prazo determinado, o locador não pode retomar o imóvel antes do fim do contrato, salvo por infração contratual do locatário. Já o locatário pode devolver o imóvel a qualquer tempo, pagando a multa proporcional estabelecida no contrato.',
      'A locação comercial (não residencial) possui características próprias, destacando-se o direito de renovação compulsória do contrato (ação renovatória), previsto nos arts. 51 a 58 da Lei do Inquilinato. O locatário commercial que exerce a mesma atividade no imóvel por prazo ininterrupto de no mínimo 5 anos tem direito à renovação do contrato, assegurando a continuidade do negócio. Esse direito é fundamental para a proteção do fundo de comércio e do ponto empresarial.',
      'As garantias locatícias são instrumentos que asseguram ao locador o pagamento dos aluguéis e demais obrigações contratuais. As principais são: caução em dinheiro, fiança (aval), seguro de fiança locatícia e cessão fiduciária de direitos creditícios. A ação de despejo é o remédio jurídico para a retomada do imóvel em casos de inadimplemento, infração contratual, denúncia do contrato ou necessidade de uso próprio pelo locador. A assessoria jurídica especializada em locação é indispensável tanto para locadores quanto para inquilinos na elaboração de contratos, cobrança de aluguéis e defesa em ações de despejo.',
    ],
    highlights: [
      'Lei do Inquilinato (Lei 8.245/1991) rege as locações urbanas',
      'Locação residencial: prazo mínimo de 30 meses sem denúncia',
      'Locação comercial: direito de renovação compulsória (5 anos)',
      'Garantias: caução, fiança, seguro fiança e cessão fiduciária',
    ],
    gradient: 'linear-gradient(135deg, #e11d48, #db2777)',
    iconBg: 'bg-rose-500/10',
    borderColor: 'border-rose-200',
  },
]

/* ===== FAQ DATA ===== */
interface FAQItem {
  q: string
  r: string
}

const faqData: FAQItem[] = [
  {
    q: 'Qual a diferença entre usucapião e regularização fundiária (Reurb)?',
    r: 'A usucapião é um instituto jurídico pelo qual o possuidor adquire a propriedade de um imóvel pelo exercício prolongado da posse, mediante ação judicial (usucapião judicial) ou procedimento administrativo (usucapião extrajudicial). A Reurb, por sua vez, é um procedimento administrativo de regularização fundiária urbana que abrange desde a aprovação de projetos urbanísticos até a titulação dos ocupantes, utilizando instrumentos como a legitimação fundiária e a legitimação de posse. Enquanto a usucapião exige o preenchimento de requisitos temporais específicos, a Reurb pode ser aplicada independentemente do tempo de ocupação, desde que atendidos os requisitos urbanísticos e legais.',
  },
  {
    q: 'O que é necessário para registrar um imóvel no Cartório de Registro de Imóveis?',
    r: 'Para registrar um imóvel é necessário apresentar ao Cartório de Registro de Imóveis: o título aquisitivo (escritura pública de compra e venda, carta de arrematação, formal de partilha, etc.), certidões negativas fiscais municipais, comprovante de pagamento do ITBI, certidão de quitação de débitos condominiais (quando aplicável), e a matrícula atualizada do imóvel. No caso de imóvel novo, exige-se também o habite-se e a averbação da construção. Cada ato registral possui requisitos específicos, sendo recomendável a consulta a um advogado especializado para orientar o procedimento.',
  },
  {
    q: 'Quais são os prazos da usucapião?',
    r: 'Os prazos variam conforme a modalidade: usucapião extraordinária: 15 anos de posse (reduzido para 10 anos se houver moradia ou obras produtivas); usucapião ordinária: 10 anos com justo título e boa-fé (reduzido para 5 anos se o título foi registrado); usucapião especial urbana: 5 anos de posse ininterrupta, área de até 250m², para moradia; usucapião especial rural: 5 anos, área de até 50 hectares, com trabalho e moradia; usucapião familiar: 2 anos de posse exclusiva após abandono do lar pelo cônjuge; e usucapião coletiva: 5 anos, em área urbana de ocupação consolidada.',
  },
  {
    q: 'O que fazer se estou com dificuldades no pagamento das taxas condominiais?',
    r: 'O condômino que enfrenta dificuldades financeiras deve, primeiramente, buscar o diálogo com o síndico e a administradora do condomínio para negociar o parcelamento dos débitos. Muitos condomínios permitem acordos de parcelamento com juros reduzidos. Caso não haja acordo, o condomínio pode ajuizar ação de cobrança, e o débito pode levar à penhora do imóvel. É importante não ignorar as cobranças, pois os juros e a correção monetária podem elevar substancialmente o valor devido. A assessoria jurídica pode auxiliar na negociação e, se necessário, na defesa em ação judicial.',
  },
  {
    q: 'Como funciona a ação de despejo?',
    r: 'A ação de despejo é o instrumento processual pelo qual o locador busca a retomada do imóvel locado. As hipóteses mais comuns são: inadimplemento do aluguel e encargos (com prazo de 15 dias para purgação da mora), infração contratual, denúncia do contrato (em locação por prazo indeterminado), necessidade de uso próprio do locador, e realização de obras no imóvel. O prazo para desocupação varia conforme o fundamento da ação, podendo ser de 15 a 30 dias. A ação de despejo tramita nas Varas Cíveis ou nos Juizados Especiais, dependendo do valor da causa.',
  },
  {
    q: 'O que é o direito de laje e como ele pode beneficiar minha família?',
    r: 'O direito de laje é um direito real previsto no art. 1.225, XIII, do Código Civil, que permite ao proprietário de uma construção ceder o espaço aéreo acima dela para que outra pessoa edifique sua moradia. Esse instituto foi criado pela Lei 13.465/2017 para regularizar a situação de milhares de famílias que constroem suas casas sobre a laje de imóveis de parentes. Com o direito de laje registrado, o morador da laje passa a ter um título de propriedade registrado em cartório, podendo vender, alugar ou deixar o imóvel como herança.',
  },
]

/* ===== PAGE ===== */
import SEO from '../components/SEO'

export default function DireitoImobiliario() {
const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 150])
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95])

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 8 + 5,
  }))

  // FAQ accordion state
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  // Active topic filter
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const handleToggleFAQ = (idx: number) => {
    setOpenFAQ(openFAQ === idx ? null : idx)
  }

  // Filter topics
  const filteredTopicos = activeFilter === 'all'
    ? topicos
    : topicos.filter(t => {
        const categories: Record<string, string[]> = {
          aquisicao: ['Usucapião — Todas as Modalidades', 'Direito de Laje e Superfície', 'REURB — Regularização Fundiária Urbana'],
          contratos: ['Contratos de Compra e Venda de Imóveis', 'Locação Comercial e Residencial'],
          regularizacao: ['Regularização de Imóveis', 'REURB — Regularização Fundiária Urbana'],
          possessorias: ['Ações Possessórias'],
          incorporacao: ['Incorporação Imobiliária'],
          condominio: ['Condomínio e Taxas'],
          fiscal: ['ITBI e Registro de Imóveis'],
        }
        return categories[activeFilter]?.includes(t.title) ?? false
      })

  return (
    <div>
      <SEO
        title="Advocacia Direito Imobiliário Will & Pereira Palhoça"
        description="Assessoria jurídica em Direito Imobiliário: compra e venda, locação, financiamento, usucapião e regularização de imóveis. Will & Pereira Advocacia."
        canonical="https://willepereira-adv.vercel.app/imobiliario"
      />
      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[650px] max-h-[1000px] flex items-center overflow-hidden bg-navy-dark" role="region" aria-label="Hero Direito Imobiliário">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-dark" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold-5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gold-3 rounded-full blur-[100px]" />

        {/* Floating particles */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-gold-20 rounded-full"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}

        <motion.div style={{ opacity: heroOpacity, y: heroY, scale: heroScale }} className="relative z-10 w-full">
          <div className="container-premium">
            <div className="max-w-4xl">
              

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-8"
              >
                Direito{' '}
                <span className="text-gradient-gold">Imobiliário</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-10"
              >
                Assessoria jurídica completa em direito imobiliário. Usucapião, 
                contratos, regularização de imóveis, incorporação, condomínios, 
                ações possessórias e locação com a excelência que sua propriedade merece.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/contato" className="btn-primary text-base px-8 py-4 group">
                  Fale Conosco
                  <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                </Link>
                <a href="#topicos" className="btn-outline btn-outline-light text-base px-8 py-4">
                  Ver Todos os Temas
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="mt-12 flex flex-wrap items-center gap-6 text-gray-500 text-xs uppercase tracking-widest"
              >
                <span className="text-gray-600">Atendimento Nacional</span>
                <span className="w-px h-4 bg-white/10" />
                <span>Regularização de Imóveis</span>
                <span className="w-px h-4 bg-white/10" />
                <span>Usucapião e Ações Possessórias</span>
                <span className="w-px h-4 bg-white/10" />
                <span>Contratos e Incorporação</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-9 rounded-full border-2 border-white/15 flex justify-center pt-2">
            <div className="w-1 h-2.5 bg-gold rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ INTRODUÇÃO ═══════════════ */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 bg-gold-10 text-gold-dark text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-5">
                O que é
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-navy leading-tight mb-6">
                Direito<br />
                <span className="text-gradient-gold">Imobiliário</span>
              </h1>
              <div className="gold-divider mb-6" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  O <strong>Direito Imobiliário</strong> é o ramo do Direito Privado que regula 
                  as relações jurídicas envolvendo bens imóveis, desde a aquisição da propriedade 
                  até a sua transferência, passando pela posse, uso, gozo e disposição do bem. 
                  Engloba um conjunto amplo e complexo de normas que disciplinam direitos reais, 
                  contratos imobiliários, registros públicos, tributos e responsabilidades.
                </p>
                <p>
                  Mais do que um campo de atuação técnica, o Direito Imobiliário é essencial 
                  para a segurança das relações patrimoniais e para o desenvolvimento urbano 
                  e econômico do país. Seja na compra da casa própria, na regularização de um 
                  terreno, na administração de um condomínio ou na locação de um imóvel comercial, 
                  o conhecimento jurídico especializado é indispensável para prevenir conflitos 
                  e garantir a proteção dos direitos.
                </p>
                <p>
                  A Will & Pereira Advocacia oferece assessoria completa em Direito Imobiliário, 
                  com atuação em todo o Brasil. Nossa equipe domina as complexidades da legislação 
                  imobiliária — incluindo o Código Civil, a Lei do Inquilinato, a Lei de 
                  Incorporações, o Estatuto da Cidade e a Lei da Regularização Fundiária — 
                  e utiliza esse conhecimento para oferecer soluções jurídicas seguras e eficientes 
                  para cada cliente.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-cream">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-navy/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Building className="w-20 h-20 text-gold/20 mx-auto mb-4" />
                      <p className="text-gray-300 text-sm">Propriedade e segurança jurídica</p>
                    </div>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 -right-6 bg-navy text-white rounded-2xl p-6 shadow-2xl max-w-[200px]"
                >
                  <Award className="text-gold mb-2" size={24} />
                  <p className="text-sm font-medium">Expertise em Direito Imobiliário</p>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ FILTER TABS ═══════════════ */}
      <section className="pb-0">
        <div className="container-premium">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {[
                { key: 'all', label: 'Todos' },
                { key: 'aquisicao', label: 'Aquisição e Posse' },
                { key: 'contratos', label: 'Contratos' },
                { key: 'regularizacao', label: 'Regularização' },
                { key: 'possessorias', label: 'Ações Possessórias' },
                { key: 'incorporacao', label: 'Incorporação' },
                { key: 'condominio', label: 'Condomínio' },
                { key: 'fiscal', label: 'Fiscal e Registral' },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
                    activeFilter === f.key
                      ? 'bg-navy text-gold shadow-lg shadow-navy/20'
                      : 'bg-cream text-navy/60 hover:bg-navy/5 hover:text-navy'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════ TÓPICOS ═══════════════ */}
      <section id="topicos" className="section-padding">
        <div className="container-premium">
          <SectionHeading
            label="Áreas de Atuação"
            title="Direito Imobiliário em Detalhes"
            subtitle="Cada tema do Direito Imobiliário possui requisitos, procedimentos e implicações jurídicas específicas. Conheça cada área e descubra como podemos ajudar."
          />

          <div className="space-y-24">
            {filteredTopicos.map((topico, idx) => {
              const Icon = topico.icon
              return (
                <motion.div
                  key={topico.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Left panel */}
                    <div className="lg:col-span-2">
                      <div className={`sticky top-24 rounded-2xl p-8 border ${topico.borderColor} bg-white shadow-sm hover:shadow-lg transition-shadow duration-300`}>
                        <div className={`w-16 h-16 rounded-xl ${topico.iconBg} flex items-center justify-center mb-5`}>
                          <Icon className="w-8 h-8 text-navy" />
                        </div>
                        <h3 className="font-serif text-2xl md:text-3xl text-navy mb-3">{topico.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">{topico.summary}</p>

                        {/* Highlights */}
                        <div className="space-y-2 mb-6">
                          {topico.highlights.map(h => (
                            <div key={h} className="flex items-start gap-2">
                              <BadgeCheck size={15} className="text-gold mt-0.5 shrink-0" />
                              <span className="text-xs text-navy/70">{h}</span>
                            </div>
                          ))}
                        </div>

                        <Link
                          to="/contato"
                          className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-navy text-white text-sm rounded-full hover:bg-navy-light transition-all duration-300"
                        >
                          Analisar Meu Caso <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>

                    {/* Right panel — full content */}
                    <div className="lg:col-span-3 space-y-6">
                      {topico.content.map((paragraph, pi) => (
                        <p key={pi} className="text-gray-600 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}

                      {/* CTA inline */}
                      <div className="flex items-center gap-3 pt-2">
                        <Link
                          to="/contato"
                          className="inline-flex items-center gap-1 text-sm font-medium text-gold-dark hover:text-gold transition-colors"
                        >
                          Saiba mais sobre {topico.shortTitle.toLowerCase()} <ChevronDown size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Divider between topics */}
                  {idx < filteredTopicos.length - 1 && (
                    <div className="mt-16 border-t border-gray-100" />
                  )}
                </motion.div>
              )
            })}
          </div>

          {filteredTopicos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Nenhum tema encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ IMPORTÂNCIA ═══════════════ */}
      <section className="section-padding bg-cream">
        <div className="container-premium">
          <SectionHeading
            label="Por Que é Essencial"
            title="A Importância da Advocacia Especializada em Imóveis"
            subtitle="O Direito Imobiliário é técnico, dinâmico e repleto de particularidades. A orientação de um advogado especializado faz toda a diferença na segurança do seu patrimônio."
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Search,
                title: 'Due Diligence e Segurança',
                desc: 'Antes de adquirir um imóvel, é fundamental verificar sua situação jurídica completa: matrícula, ônus, hipotecas, ações judiciais, débitos fiscais e condominiais. A due diligence imobiliária evita surpresas desagradáveis e prejuízos financeiros.',
              },
              {
                icon: FileText,
                title: 'Contratos e Documentação',
                desc: 'A elaboração e análise de contratos imobiliários — compra e venda, locação, incorporação, permuta — exige conhecimento técnico para assegurar cláusulas equilibradas, evitar litígios e garantir a segurança jurídica da transação.',
              },
              {
                icon: Gavel,
                title: 'Ações Judiciais Imobiliárias',
                desc: 'Usucapião, reintegração de posse, despejo, cobrança de aluguéis, ação renovatória, nunciação de obra nova, embargos de terceiro — cada ação possui ritos, prazos e requisitos específicos que demandam atuação especializada.',
              },
              {
                icon: Building,
                title: 'Regularização Fundiária',
                desc: 'A regularização de imóveis irregulares ou clandestinos, incluindo a Reurb, exige assessoria jurídica multidisciplinar para conduzir o processo administrativo e registral, garantindo a titulação dos ocupantes e a valorização dos imóveis.',
              },
              {
                icon: Shield,
                title: 'Planejamento Patrimonial e Sucessório',
                desc: 'O Direito Imobiliário é peça-chave no planejamento patrimonial. A escolha do regime de bens, a doação de imóveis, a instituição de usufruto e a elaboração de testamentos podem reduzir custos tributários e evitar conflitos sucessórios.',
              },
              {
                icon: Users,
                title: 'Condomínios e Relações de Vizinhança',
                desc: 'A administração condominial, a cobrança de taxas, as ações de dano contra o condomínio ou entre condôminos, e as questões de vizinhança exigem assessoria jurídica preventiva e contenciosa especializada.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="section-padding">
        <div className="container-premium max-w-3xl">
          <SectionHeading
            label="Perguntas Frequentes"
            title="Direito Imobiliário em Perguntas e Respostas"
            subtitle="Esclareça as principais dúvidas sobre usucapião, contratos, regularização, locação e temas relacionados."
          />

          <div className="space-y-3">
            {faqData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 ${
                  openFAQ === idx
                    ? 'border-gold/30 bg-cream shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => handleToggleFAQ(idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-navy font-medium text-base pr-4">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-gold shrink-0 transition-transform duration-300 ${
                      openFAQ === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === idx ? 'auto' : 0,
                    opacity: openFAQ === idx ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-4">
                    {item.r}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ NÚMEROS ═══════════════ */}
      <section className="py-28 md:py-32 bg-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_60%)]" />
        <div className="relative z-10" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 max-w-5xl mx-auto">
            {[
              { icon: Award, end: 15, suffix: '+', label: 'Anos de Experiência' },
              { icon: Building, end: 3000, suffix: '+', label: 'Imóveis Regularizados' },
              { icon: BadgeCheck, end: 97, suffix: '%', label: 'Casos de Sucesso' },
              { icon: MapPin, end: 27, suffix: '+', label: 'Cidades Atendidas' },
            ].map((stat, i) => {
              const StatIcon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center py-4 md:py-6"
                >
                  <div className="w-14 h-14 rounded-xl bg-gold-10 flex items-center justify-center mx-auto mb-5">
                    <StatIcon className="w-7 h-7 text-gold" />
                  </div>
                  <div className="text-4xl md:text-5xl font-display text-gradient-gold mb-2">
                    {stat.end}{stat.suffix}
                  </div>
                  <div className="text-navy-light text-sm mt-2 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
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
        <div className="absolute inset-0"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-5 rounded-full blur-[150px]" /></div>
        
        <div className="relative z-10 text-center" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-gold-15 text-gold text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-5">
              Estamos Prontos para Ajudar
            </span>
            <h2 className="text-3xl md:text-5xl text-white leading-tight mb-6">
              Seu Imóvel<br />
              <span className="text-gradient-gold">Merece Segurança Jurídica</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Conte com a expertise da Will & Pereira Advocacia para proteger seu patrimônio 
              imobiliário. Assessoria completa em todo o Brasil.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contato" className="btn-primary text-base px-8 py-4 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 group">
                <Phone size={18} className="group-hover:translate-x-1 transition-transform" /> Agende uma Conversa
              </Link>
              <a href="tel:+5548984584181" className="btn-outline btn-outline-light text-base px-8 py-4">
                (48) 98458-4181
              </a>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              Atendimento em todo o Brasil • Presencial e Online
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
