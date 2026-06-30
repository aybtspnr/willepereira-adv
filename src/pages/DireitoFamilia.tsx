import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Heart, Users, UserPlus, UserX, Baby, Shield,
  Scale, FileText, ArrowRight, CheckCircle,
  ChevronRight, BookOpen, Gavel, Star, HelpCircle,
  HeartHandshake, Home, Eye, UserCheck, AlertTriangle,
  GraduationCap, Clock, Phone, HandHeart,
  DollarSign, Search, Globe
} from 'lucide-react'
import { Link } from 'react-router-dom'

/* ===== ANIMATION VARIANTS ===== */
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } } }

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
    icon: HeartHandshake,
    title: 'Divórcio Consensual e Litigioso',
    slug: 'divorcio',
    paragraphs: [
      'O divórcio é o instrumento jurídico que põe fim ao casamento civil, dissolvendo o vínculo matrimonial e permitindo que os cônjuges restabeleçam seu estado civil de solteiros. Com a promulgação da Emenda Constitucional nº 66/2010, o divórcio passou a ser direito potestativo do cônjuge, não mais se exigindo os antigos requisitos de prévia separação judicial por mais de um ano ou comprovação de separação de fato por mais de dois anos. Hoje, o divórcio pode ser requerido a qualquer tempo, independentemente de culpa ou de prévia separação.',
      'O divórcio consensual é a modalidade mais célere e harmoniosa, ocorrendo quando ambos os cônjuges estão de acordo quanto à dissolução do casamento e a todos os seus efeitos: partilha de bens, guarda dos filhos, pensão alimentícia e regulamentação de visitas. Pode ser realizado pela via extrajudicial (em cartório de notas, por escritura pública) quando não há filhos menores ou incapazes e as partes estão assistidas por advogados. É a forma mais rápida, econômica e menos desgastante emocionalmente para todos os envolvidos, especialmente para os filhos.',
      'O divórcio litigioso, por sua vez, é a modalidade contenciosa que se instaura quando não há consenso entre os cônjuges sobre um ou mais aspectos da dissolução. Pode envolver disputas sobre a partilha de bens, a guarda dos filhos, o valor da pensão alimentícia, a regulamentação de visitas ou a alegação de atos ilícitos. Nesse caso, o processo tramita necessariamente pela via judicial, com a participação do Ministério Público quando há interesses de menores ou incapazes. O juiz decidirá as questões controversas com base nas provas produzidas e no melhor interesse da família.',
      'Em ambas as modalidades, é indispensável a assistência de advogado especializado em Direito de Família, que orientará os cônjuges sobre os efeitos jurídicos do divórcio, a melhor forma de partilha dos bens, as implicações fiscais e tributárias (ITBI, ITCMD) e as consequências para os filhos. A assessoria jurídica adequada evita que questões emocionais prejudiquem a tomada de decisões racionais e equilibradas, garantindo um divórcio justo e com o menor impacto negativo possível para toda a família.',
    ],
    highlights: ['Divórcio extrajudicial em cartório: mais rápido e econômico', 'Direito potestativo ao divórcio (EC 66/2010)', 'Advogado especializado é indispensável em ambas as modalidades'],
  },
  {
    icon: Baby,
    title: 'Guarda de Filhos',
    slug: 'guarda-de-filhos',
    paragraphs: [
      'A guarda de filhos é o instituto jurídico que define com quem a criança ou o adolescente residirá e quem será responsável por sua criação, educação, saúde e bem-estar. Após a separação dos pais, a definição da guarda é uma das questões mais sensíveis e importantes do Direito de Família, pois impacta diretamente o desenvolvimento emocional, psicológico e social dos filhos. O ordenamento jurídico brasileiro, em consonância com a Constituição Federal e o Estatuto da Criança e do Adolescente (ECA), consagra o princípio do melhor interesse da criança como norteador de todas as decisões judiciais sobre guarda.',
      'A Lei nº 13.058/2014 introduziu a guarda compartilhada como regra geral no Brasil, estabelecendo que, sempre que possível, a guarda será compartilhada entre os genitores, independentemente da distância entre as residências ou da opinião de um dos pais em contrário. Na guarda compartilhada, ambos os genitores mantêm o poder familiar e dividem as responsabilidades sobre a vida do filho, alternando períodos de convivência de forma equilibrada. A criança terá uma residência base (geralmente onde passa a maior parte do tempo), mas ambos os pais participam ativamente das decisões importantes sobre educação, saúde, lazer e formação moral.',
      'A guarda unilateral, por sua vez, é atribuída a apenas um dos genitores, que detém exclusivamente as responsabilidades parentais, cabendo ao outro o direito de supervisionar e fiscalizar a criação do filho. Essa modalidade é aplicada excepcionalmente quando um dos pais demonstra incapacidade, desinteresse ou conduta incompatível com o exercício saudável da parentalidade, ou quando há risco à integridade física ou psicológica da criança. O genitor que não detém a guarda terá direito a visitas amplas e à fiscalização dos atos da vida do filho.',
      'A guarda alternada (ou residência alternada), embora não prevista expressamente em lei como modalidade autônoma, é uma variação em que a criança alterna períodos iguais de residência com cada genitor, dividindo o tempo de forma equitativa. Essa modalidade exige alto grau de cooperação entre os pais, proximidade geográfica e maturidade emocional para ser implementada com sucesso. A doutrina e a jurisprudência têm debatido seus benefícios e riscos, sendo recomendada apenas quando atende ao melhor interesse da criança no caso concreto.',
    ],
    highlights: ['Guarda compartilhada é a regra (Lei 13.058/2014)', 'Melhor interesse da criança é o princípio fundamental', 'Guarda unilateral é exceção para casos específicos'],
  },
  {
    icon: Heart,
    title: 'Regulamentação de Visitas',
    slug: 'regulamentacao-de-visitas',
    paragraphs: [
      'A regulamentação de visitas é o instrumento processual que estabelece o regime de convivência entre o genitor não guardião (ou não residente) e seus filhos, assegurando o direito fundamental da criança e do adolescente à convivência familiar. O direito de visitas não é apenas um direito do genitor, mas, sobretudo, um direito da criança de manter vínculos afetivos saudáveis com ambos os pais e com os familiares, como avós, tios e irmãos. A visitação regular é essencial para o desenvolvimento emocional equilibrado e para a formação da identidade da criança.',
      'O regime de visitas pode ser livre (acordado entre os pais, sem necessidade de homologação judicial) ou fixado judicialmente quando não há consenso. Em geral, o regime contempla visitas em finais de semana alternados, metade das férias escolares, datas comemorativas alternadas (Natal, Ano Novo, Páscoa, Dia das Mães/Pais, aniversários) e convivência em dias específicos da semana. O juiz pode determinar visitas acompanhadas em centro de convivência familiar quando há risco de alienação parental, violência doméstica ou qualquer situação que possa colocar a criança em risco.',
      'A Lei nº 12.398/2011 alterou o Código Civil para assegurar ao genitor que não detém a guarda o direito de supervisionar a educação dos filhos, podendo visitá-los regularmente e fiscalizar sua criação. Além disso, a Lei da Alienação Parental (Lei nº 12.318/2010) reforça a importância da convivência familiar e estabelece medidas para coibir condutas que dificultem ou impeçam o contato da criança com um dos genitores. O descumprimento injustificado do regime de visitas pode configurar abandono afetivo e gerar responsabilidade civil.',
      'A regulamentação de visitas pode ser revista a qualquer tempo, por meio de ação revisional, sempre que houver mudança significativa nas circunstâncias de fato que justifique a alteração — como mudança de cidade, alteração na rotina escolar da criança, mudança na condição de trabalho dos pais ou qualquer fato que impacte o melhor interesse do menor. O ideal é que o regime de visitas seja construído com diálogo e foco no bem-estar da criança, evitando que conflitos entre os adultos prejudiquem o direito fundamental à convivência familiar.',
    ],
    highlights: ['Direito fundamental da criança à convivência familiar', 'Regime pode incluir avós e outros familiares', 'Revisão a qualquer tempo por alteração de circunstâncias'],
  },
  {
    icon: DollarSign,
    title: 'Pensão Alimentícia',
    slug: 'pensao-alimenticia',
    paragraphs: [
      'A pensão alimentícia é a obrigação legal de prover o sustento, a manutenção e o desenvolvimento de uma pessoa que não possui condições de prover a própria subsistência. No âmbito do Direito de Família, a obrigação alimentar é mais comumente devida entre pais e filhos, mas também pode ser exigida entre cônjuges (após o divórcio), entre ex-companheiros de união estável, entre ascendentes (filhos que devem alimentos aos pais idosos) e entre irmãos, em situações excepcionais. O fundamento jurídico encontra-se nos artigos 1.694 a 1.710 do Código Civil.',
      'O valor da pensão alimentícia é fixado com base no binômio necessidade-possibilidade: de um lado, a necessidade do alimentando (quem recebe) de receber o suficiente para sua subsistência digna — moradia, alimentação, saúde, educação, vestuário, lazer e transporte — e, de outro, a possibilidade do alimentante (quem paga) de arcar com o encargo sem comprometer seu próprio sustento. O valor é geralmente fixado em percentual sobre os rendimentos líquidos do alimentante (entre 15% e 35%, dependendo do número de beneficiários e das circunstâncias do caso), mas também pode ser fixado em valor fixo (em salários mínimos ou montante predeterminado).',
      'O Professor de Direito de Família e renomado jurista brasileiro, o entendimento consolidado é de que os alimentos devem abranger o necessário à mantença do alimentando de forma compatível com sua condição social e com os recursos do alimentante. A obrigação alimentar cobre despesas com moradia, alimentação, saúde (planos de saúde, medicamentos, tratamentos), educação (mensalidades escolares, material didático, cursos), vestuário, transporte, lazer e atividades extracurriculares. Despesas extraordinárias (como tratamentos médicos não cobertos por plano, cirurgias, aparelhos ortodônticos) são rateadas entre os genitores na proporção de suas possibilidades.',
      'O não pagamento da pensão alimentícia sujeita o devedor a medidas severas, como a prisão civil (regime fechado, de 1 a 3 meses, nos termos do artigo 528 do CPC), o protesto do título executivo, a inclusão do nome em cadastros de inadimplentes (SPC, Serasa), o desconto em folha de pagamento, a penhora de bens e a suspensão da CNH e do passaporte (conforme entendimento do STJ). A prisão civil por dívida alimentar é a única prisão civil admitida no ordenamento brasileiro, em razão do caráter alimentar e prioritário da obrigação.',
    ],
    highlights: ['Binômio necessidade-possibilidade para fixação do valor', 'Prisão civil por não pagamento (1 a 3 meses)', 'Revisão do valor por alteração na situação financeira'],
  },
  {
    icon: UserPlus,
    title: 'Investigação de Paternidade',
    slug: 'investigacao-de-paternidade',
    paragraphs: [
      'A investigação de paternidade é a ação judicial que tem por objetivo o reconhecimento jurídico do vínculo de filiação entre uma pessoa e seu suposto pai biológico. Trata-se de um direito personalíssimo, imprescritível e indisponível, que pode ser exercido a qualquer tempo pelo filho, inclusive após a morte do suposto pai (quando se dirige contra os herdeiros). A ação é fundamentada no direito fundamental à identidade, à origem genética e à filiação, todos consagrados na Constituição Federal e no Estatuto da Criança e do Adolescente.',
      'O principal meio de prova na investigação de paternidade é o exame de DNA (ácido desoxirribonucleico), que possui índice de precisão superior a 99,9%. O Código de Processo Civil (artigo 231) estabelece que, se o suposto pai recusar-se a submeter-se ao exame de DNA, tal recusa pode ser interpretada como presunção relativa de paternidade (juris tantum), autorizando o juiz a reconhecer a filiação com base no conjunto probatório. A recusa reiterada e injustificada pode configurar ato atentatório à dignidade da justiça e gerar multa processual.',
      'Em 2025, o avanço das técnicas de investigação genética e a massificação dos testes de DNA tornaram a investigação de paternidade cada vez mais acessível e célere. Além do exame de sangue tradicional, hoje é possível realizar o teste com amostra de saliva (coletada por swab bucal), com fio de cabelo (com bulbo capilar) ou mesmo com amostras post mortem (exumação ou análise de material biológico armazenado em hospitais). A Lei nº 8.560/92 regulamenta o reconhecimento voluntário de filhos havidos fora do casamento.',
      'A investigação de paternidade pode ser cumulada com pedido de alimentos, guarda, regulamentação de visitas e inclusão do nome do pai no registro de nascimento. Quando há falecimento do suposto pai, a ação é proposta contra o espólio ou os herdeiros, podendo o filho reconhecido ter direito à herança e ao recebimento de alimentos contra o espólio durante o processo de inventário. A Defensoria Pública e o Ministério Público podem atuar na propositura da ação quando o interessado é hipossuficiente econômico.',
    ],
    highlights: ['Direito imprescritível e indisponível', 'Exame de DNA com 99,9% de precisão', 'Recusa ao exame gera presunção de paternidade'],
  },
  {
    icon: Heart,
    title: 'União Estável',
    slug: 'uniao-estavel',
    paragraphs: [
      'A união estável é a entidade familiar reconhecida pela Constituição Federal de 1988 (artigo 226, §3º) como forma de constituição de família, ao lado do casamento. Caracteriza-se pela convivência pública, contínua, duradoura e com o objetivo de constituição familiar entre duas pessoas, independentemente do sexo. O reconhecimento da união estável como entidade familiar foi um marco histórico no Direito de Família brasileiro, que até então apenas reconhecia a família constituída pelo casamento civil.',
      'Os requisitos para a caracterização da união estável são: convivência notória e pública (não pode ser oculta ou secreta), contínua e duradoura (não eventual ou episódica), com ânimo de constituir família (affectio maritalis). Diferentemente do casamento, a união estável não exige cerimônia formal, registro prévio ou celebração solene. Pode ser formalizada por meio de contrato particular ou escritura pública declaratória de união estável no cartório de notas, que estabelece o regime de bens aplicável à relação.',
      'Os direitos e deveres decorrentes da união estável são similares aos do casamento: lealdade, respeito, assistência mútua, guarda e sustento dos filhos, e obrigação alimentar. O regime de bens na união estável, por omissão legal, é o da comunhão parcial de bens (comunicam-se os bens adquiridos onerosamente na constância da união), salvo estipulação em contrário em contrato escrito. A conversão da união estável em casamento pode ser feita a qualquer tempo, mediante requerimento ao oficial do registro civil.',
      'A união estável é dissolvida pelo falecimento de um dos companheiros ou por decisão de um ou ambos de pôr fim à convivência. O companheiro sobrevivente tem direito à herança nos mesmos termos do cônjuge no casamento, conforme as regras do artigo 1.790 do Código Civil (atualmente em discussão no STF quanto à eventual inconstitucionalidade da diferenciação). A dissolução da união estável pode ser feita extrajudicialmente (em cartório) quando consensual, sem filhos menores e com assistência de advogado.',
    ],
    highlights: ['Reconhecimento constitucional como entidade familiar', 'Regime de bens: comunhão parcial (por omissão)', 'Pode ser convertida em casamento a qualquer tempo'],
  },
  {
    icon: FileText,
    title: 'Casamento',
    slug: 'casamento',
    paragraphs: [
      'O casamento é o ato solene pelo qual duas pessoas estabelecem vínculo conjugal, constituindo família e assumindo reciprocamente os direitos e deveres previstos no Código Civil (artigos 1.511 a 1.590). É a forma mais tradicional de constituição familiar, caracterizada pela solenidade do ato, pela formalidade do registro e pela publicidade. O casamento civil produz efeitos imediatos quanto ao estado civil dos cônjuges, ao regime de bens, aos direitos sucessórios e à obrigação de mútua assistência.',
      'Antes do casamento, os nubentes podem optar por um dos regimes de bens previstos em lei: comunhão parcial de bens (regime legal, em que se comunicam os bês adquiridos onerosamente na constância do casamento), comunhão universal de bens (comunicação de todos os bens presentes e futuros), separação total de bens (obrigatória para maiores de 70 anos ou com causa justificadora) ou participação final nos aquestos (combinação entre separação e comunhão). O regime de bens pode ser escolhido livremente pelos nubentes mediante pacto antenupcial, formalizado por escritura pública antes do casamento.',
      'O casamento pode ser realizado na modalidade civil (em cartório ou em local designado pelo juiz de paz) ou religioso com efeitos civis (mediante prévia habilitação e posterior registro do termo). O processo de habilitação exige a apresentação de documentos pessoais, certidões de nascimento ou casamento anterior com averbação de divórcio ou óbito, declaração de duas testemunhas e comprovante de residência. O casamento é gratuito para pessoas hipossuficientes econômicos, nos termos da lei.',
      'A invalidade do casamento pode ser decretada por nulidade (casamentos contraídos com infringência de impedimentos absolutos, como parentesco próximo ou casamento anterior não dissolvido) ou anulabilidade (casamentos contraídos com vícios de consentimento, erro essencial sobre a pessoa do outro cônjuge, coação ou incapacidade relativa). A separação de corpos e a subsequente separação de fato são institutos que antecedem o divórcio, permitindo a suspensão dos deveres conjugais sem a dissolução do vínculo.',
    ],
    highlights: ['Regimes de bens: comunhão parcial, universal, separação total e participação final', 'Pacto antenupcial em escritura pública', 'Casamento religioso com efeitos civis é válido'],
  },
  {
    icon: AlertTriangle,
    title: 'Alienação Parental',
    slug: 'alienacao-parental',
    paragraphs: [
      'A alienação parental é um grave fenômeno psicológico e jurídico que ocorre quando um dos genitores — denominado genitor alienador — desenvolve condutas que interferem na formação psicológica da criança ou do adolescente, com o objetivo de afastá-lo do outro genitor, prejudicando o vínculo afetivo e a convivência familiar. A Lei nº 12.318/2010, que disciplina a alienação parental no Brasil, define como ato de alienação parental a interferência na formação psicológica da criança promovida ou induzida por um dos genitores, pelos avós ou por qualquer pessoa que tenha a criança sob sua autoridade, guarda ou vigilância.',
      'São formas típicas de alienação parental: realizar campanha de desqualificação da conduta do genitor no exercício da parentalidade; dificultar o exercício do direito de convivência familiar; omitir informações relevantes sobre a criança ao outro genitor; apresentar falsas denúncias contra o genitor, seus familiares ou companheiros; mudar de domicílio para local distante sem justificativa, visando dificultar a convivência; e, em casos extremos, criar memórias falsas ou distorcidas na criança sobre supostos abusos ou maus-tratos praticados pelo genitor alienado.',
      'As consequências da alienação parental são devastadoras para o desenvolvimento emocional da criança, que pode desenvolver a Síndrome da Alienação Parental (SAP) — quadro caracterizado por ansiedade, depressão, baixa autoestima, distúrbios de comportamento, dificuldades de relacionamento e, em casos graves, transtorno de identidade. A criança vítima de alienação parental tende a reproduzir o discurso do genitor alienador, rejeitando o genitor alienado de forma injustificada e muitas vezes agressiva, em um fenômeno que os psicólogos denominam "emissário do ódio".',
      'O judiciário brasileiro tem tratado a alienação parental com extremo rigor, podendo o juiz determinar, conforme a gravidade do caso: a advertência ao alienador, a ampliação do regime de convivência em favor do genitor alienado, a fixação cautelar de multa, a determinação de acompanhamento psicológico e, em casos extremos, a inversão da guarda em favor do genitor alienado ou a suspensão da autoridade parental do genitor alienador. O descumprimento das medidas judiciais de proteção pode configurar crime de desobediência e gerar a perda da guarda.',
    ],
    highlights: ['Lei 12.318/2010 disciplina a matéria', 'Consequências graves para o desenvolvimento infantil', 'Pode levar à inversão da guarda ou suspensão do poder familiar'],
  },
  {
    icon: Shield,
    title: 'Tutela e Curatela',
    slug: 'tutela-e-curatela',
    paragraphs: [
      'A tutela e a curatela são institutos do Direito de Família destinados à proteção de pessoas que não podem administrar sua própria vida e seus bens. A tutela é o instrumento jurídico aplicável a menores de 18 anos que não estão sob o poder familiar — seja pelo falecimento dos pais, pela suspensão ou perda do poder familiar, ou pela declaração de ausência dos genitores. O tutor assume a responsabilidade pela criação, educação, saúde e administração dos bens do menor, sob a supervisão do juiz e do Ministério Público.',
      'A curatela, por sua vez, é destinada a maiores de 18 anos que, por enfermidade, deficiência mental, desenvolvimento mental incompleto, dependência química ou outra causa transitória ou permanente, não têm plena capacidade para os atos da vida civil. Com a entrada em vigor do Estatuto da Pessoa com Deficiência (Lei nº 13.146/2015), o instituto da curatela foi profundamente reformado, adotando-se o modelo de tomada de decisão apoiada como regra e a curatela como exceção, limitada aos atos de natureza patrimonial e negocial. A pessoa com deficiência mantém plena capacidade para casar, constituir união estável, exercer direitos sexuais e reprodutivos, decidir sobre tratamentos de saúde e votar.',
      'A curatela é proporcional às necessidades e circunstâncias da pessoa curatelada, devendo ser fixada judicialmente com delimitação precisa dos atos para os quais o curador terá poderes. O juiz pode estabelecer curatela compartilhada (mais de um curador), curatela temporária (por prazo determinado) ou curatela específica (apenas para determinados atos). A nomeação do curador segue a ordem de preferência legal: cônjuge ou companheiro, ascendentes, descendentes e irmãos, mas o juiz pode nomear pessoa diversa se houver conflito de interesses ou se outra pessoa demonstrar maior aptidão para o cargo.',
      'Tanto a tutela quanto a curatela são exercidas sob a fiscalização do juiz e do Ministério Público, com a obrigação de prestar contas anualmente da administração dos bens do tutelado ou curatelado. O tutor ou curador deve apresentar ao juiz relatório detalhado da administração dos bens, com demonstrativo de receitas e despesas, sob pena de destituição do encargo e responsabilização civil e criminal por eventuais prejuízos causados ao patrimônio do tutelado ou curatelado.',
    ],
    highlights: ['Tutela: menores sem poder familiar', 'Curatela: maiores incapazes com delimitação judicial', 'Estatuto da Pessoa com Deficiência reformou a curatela'],
  },
  {
    icon: GraduationCap,
    title: 'Planejamento Sucessório',
    slug: 'planejamento-sucessorio',
    paragraphs: [
      'O planejamento sucessório é o conjunto de estratégias jurídicas, patrimoniais e tributárias adotadas em vida para organizar a transmissão de bens, direitos e obrigações aos herdeiros e sucessores, de forma eficiente, segura e economicamente vantajosa. Mais do que uma simples preocupação com o futuro, o planejamento sucessório é um ato de responsabilidade e afeto, que visa evitar conflitos familiares, reduzir custos processuais e tributários (ITCMD, ITBI), proteger o patrimônio e garantir que a vontade do titular seja respeitada após seu falecimento.',
      'Os principais instrumentos de planejamento sucessório incluem: o testamento (público, cerrado ou particular), que permite ao testador dispor de até 50% do seu patrimônio (parte disponível) conforme sua vontade, respeitada a legítima dos herdeiros necessários (descendentes, ascendentes e cônjuge); a doação com reserva de usufruto vitalício, pela qual o doador transfere a nua-propriedade dos bens aos herdeiros ainda em vida, mantendo o direito de usar e fruir dos bens até sua morte; e a holding familiar, estrutura societária que concentra o patrimônio familiar em uma pessoa jurídica, facilitando a gestão, a sucessão e o planejamento tributário.',
      'O planejamento sucessório é especialmente recomendado para: famílias com patrimônio significativo; empresas familiares (planejamento da sucessão empresarial); imóveis em múltiplas propriedades; famílias reconstituídas (casamentos com filhos de uniões anteriores); situações de conflito familiar preexistente; e pessoas que desejam proteger herdeiros com necessidades especiais ou com dificuldades de administrar bens. O planejamento deve ser feito com assessoria de advogado especializado e de contador, considerando as particularidades do caso concreto, a composição do patrimônio e os objetivos do titular.',
      'As vantagens do planejamento sucessório são numerosas: redução significativa dos custos do inventário (que pode cair de 8% a 12% do valor do patrimônio para valores muito inferiores); agilidade na transmissão dos bens (de anos para meses); prevenção de conflitos familiares que frequentemente surgem durante o inventário; proteção do patrimônio contra reivindicações de terceiros; continuidade dos negócios familiares; e, acima de tudo, tranquilidade para o titular e seus herdeiros quanto à destinação do patrimônio construído ao longo da vida.',
    ],
    highlights: ['Testamento, doação com usufruto e holding familiar', 'Redução de custos tributários (ITCMD) e processuais', 'Prevenção de conflitos familiares e proteção patrimonial'],
  },
]

/* ===== FAQ DATA ===== */
const faqItems = [
  {
    q: 'Qual a diferença entre divórcio consensual e litigioso?',
    a: 'O divórcio consensual ocorre quando ambos os cônjuges concordam com a dissolução do casamento e todos os seus efeitos (partilha de bens, guarda, pensão). Pode ser feito extrajudicialmente em cartório quando não há filhos menores. Já o divórcio litigioso é a via judicial necessária quando não há acordo entre as partes sobre um ou mais aspectos da separação, exigindo a decisão de um juiz sobre as questões controvertidas.',
  },
  {
    q: 'O que é guarda compartilhada e como funciona na prática?',
    a: 'A guarda compartilhada é a modalidade em que ambos os genitores dividem as responsabilidades e decisões sobre a vida do filho, mesmo que a criança resida predominantemente com um deles. Ambos participam igualmente das decisões importantes sobre educação, saúde, lazer e formação moral. É a regra no Brasil desde a Lei 13.058/2014, sendo aplicada mesmo quando os pais não moram na mesma cidade.',
  },
  {
    q: 'Como é calculado o valor da pensão alimentícia?',
    a: 'O valor é fixado com base no binômio necessidade-possibilidade: as necessidades comprovadas do alimentando (moradia, alimentação, saúde, educação, lazer) e a capacidade financeira do alimentante. Geralmente varia entre 15% e 35% dos rendimentos líquidos do pagador, mas pode ser fixado em valor fixo (em salários mínimos ou montante determinado). O valor pode ser revisto a qualquer tempo por alteração na situação financeira de qualquer das partes.',
  },
  {
    q: 'Pais que não pagam pensão alimentícia podem ser presos?',
    a: 'Sim. O não pagamento da pensão alimentícia sem justificativa legal sujeita o devedor à prisão civil por até 3 meses, em regime fechado. O débito alimentar é o único que admite prisão civil no Brasil. Além da prisão, o devedor pode ter o nome incluído em cadastros de inadimplentes, ter a CNH e o passaporte suspensos, e sofrer penhora de bens.',
  },
  {
    q: 'O que é alienação parental e como provar?',
    a: 'Alienação parental é a conduta do genitor ou familiar que interfere na formação psicológica da criança para afastá-la do outro genitor. Pode ser provada por relatórios psicológicos, testemunhas, mensagens, gravações, registros de redes sociais e avaliação psicossocial determinada pelo juiz. A lei prevê medidas como advertência, multa, ampliação do regime de visitas, acompanhamento psicológico e, em casos graves, inversão da guarda.',
  },
  {
    q: 'Como formalizar uma união estável?',
    a: 'A união estável não exige formalidade para existir, mas pode ser formalizada por contrato particular ou escritura pública em cartório de notas. A escritura pública declaratória de união estável é o instrumento mais seguro, pois estabelece o regime de bens e facilita a comprovação da relação em cartórios, órgãos públicos e no Judiciário. A conversão da união estável em casamento pode ser feita a qualquer momento.',
  },
  {
    q: 'Como funciona a investigação de paternidade?',
    a: 'A investigação de paternidade é uma ação judicial que pode ser proposta a qualquer tempo (direito imprescritível). O principal meio de prova é o exame de DNA, com precisão superior a 99,9%. Se o suposto pai recusar-se ao exame, o juiz pode presumir a paternidade. A ação pode ser cumulada com pedidos de alimentos, guarda e direitos sucessórios.',
  },
  {
    q: 'O que é planejamento sucessório e quando fazer?',
    a: 'Planejamento sucessório é o conjunto de estratégias para organizar a transmissão de bens em vida, reduzindo conflitos familiares, custos processuais e tributários. Deve ser feito preferencialmente quando o titular possui patrimônio significativo, empresa familiar, bens em múltiplas regiões ou família reconstituída. Instrumentos comuns incluem testamento, doação com usufruto vitalício e holding familiar. Recomenda-se iniciar o planejamento o quanto antes, independentemente da idade.',
  },
]

import SEO from '../components/SEO'

export default function DireitoFamilia() {
return (
    <div>
      <SEO
        title="Direito de Família | Will & Pereira Advocacia"
        description="Advocacia especializada em Direito de Família: divórcio, guarda, pensão alimentícia e união estável."
        canonical="https://willepereira-adv.vercel.app/familia"
      />
      {/* ═══════════════ HERO ═══════════════ */}
<section className="relative pt-32 pb-20 overflow-hidden" role="region" aria-label="Hero Direito de Família">
 <div className="absolute inset-0 " style={{ background: 'radial-gradient(ellipse at top right, #1a2634 0%, #0f1729 100%)' }} />
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gold-5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gold-3 rounded-full blur-[100px]" />

        <div className="relative z-10" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 text-gold/80 text-sm font-medium mb-6 tracking-wide">
              <Heart size={16} />
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
            Direito de <span className="text-gradient-gold">Família</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed mb-8"
          >
            Assessoria jurídica especializada nas questões mais sensíveis da vida familiar — divórcio, 
            guarda de filhos, pensão alimentícia, união estável, casamento, investigação de paternidade, 
            alienação parental, tutela e curatela, e planejamento sucessório. Atuamos com ética, 
            discrição e compromisso com o bem-estar das famílias.
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
              <Scale size={14} className="text-gold" /> Código Civil
            </span>
            <span className="w-px h-4 bg-white/10" />
            <span>Proteção da Família</span>
            <span className="w-px h-4 bg-white/10" />
            <span>Direitos e Garantias</span>
            <span className="w-px h-4 bg-white/10" />
            <span>Defesa Judicial</span>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ INTRODUÇÃO ═══════════════ */}
      <section id="topics" className="section-padding">
        <div className="" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <SectionHeading
            label="Guia Completo"
            title="Direito de Família em Detalhes"
            subtitle="Conteúdo jurídico aprofundado sobre os principais temas do Direito de Família. Informações técnicas para famílias, advogados e estagiários de Direito."
          />

          {/* Overview cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Heart, count: '10+', label: 'Anos de Atuação em Família' },
              { icon: Users, count: '600+', label: 'Casos Familiares Atendidos' },
              { icon: Star, count: '97%', label: 'Índice de Satisfação' },
              { icon: Globe, count: 'Nacional', label: 'Atendimento em Todo o Brasil' },
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
                O Direito de Família é o ramo do Direito Civil que regula as relações jurídicas 
                decorrentes da constituição, organização e dissolução da entidade familiar. 
                Abrange temas profundamente humanos e emocionais, que impactam diretamente a vida 
                das pessoas em seus aspectos mais íntimos — casamento, filiação, parentesco, 
                alimentos, guarda de filhos e sucessão patrimonial.
              </p>
              <p>
                O Código Civil Brasileiro (Lei nº 10.406/2002) dedica o Livro IV ao Direito de 
                Família, nos artigos 1.511 a 1.783, tratando do casamento, das relações de parentesco, 
                da filiação, da união estável, da autoridade parental, dos alimentos, do bem de família, 
                da tutela e da curatela. A Constituição Federal de 1988, em seu artigo 226, elevou a 
                família à condição de base da sociedade, com proteção especial do Estado, reconhecendo 
                como entidades familiares o casamento, a união estável e a família monoparental 
                (formada por um dos pais e seus descendentes).
              </p>
              <p>
                A evolução social das últimas décadas transformou profundamente o Direito de Família 
                brasileiro. O reconhecimento da união estável como entidade familiar, a igualdade 
                entre homens e mulheres na sociedade conjugal, a equiparação dos filhos havidos fora 
                do casamento aos filhos legítimos, o divórcio direto sem prévia separação, a guarda 
                compartilhada como regra, a criminalização da alienação parental e o respeito à 
                autonomia das pessoas com deficiência são conquistas que refletem uma sociedade mais 
                justa, igualitária e plural.
              </p>
              <p>
                A seguir, apresentamos um guia completo e detalhado sobre cada um dos temas do 
                Direito de Família em que atuamos, com fundamentação legal, doutrinária e 
                jurisprudencial, para que você compreenda seus direitos e obrigações em cada 
                situação. Cada tópico foi elaborado com rigor técnico e sensibilidade humana, 
                características que norteiam nossa atuação na Will & Pereira Advocacia.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════ TÓPICOS DETALHADOS ═══════════════ */}
      <section className="section-padding bg-cream">
        <div className="" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <SectionHeading
            label="Conteúdo Detalhado"
            title="Todos os Temas do Direito de Família"
            subtitle="Análise técnica e aprofundada de cada área do Direito de Família, com fundamentação legal, doutrinária e jurisprudencial."
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
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-lg shadow-navy/5 sticky top-28 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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
 <div className="absolute inset-0 " style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 60%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="relative z-10" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 bg-gold-15 text-gold text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-5">
                Por Que Contratar um Advogado
              </span>
              <h1 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-6">
                Assessoria Jurídica<br />
                <span className="text-gradient-gold">Humanizada e Estratégica</span>
              </h1>
              <div className="w-16 h-px bg-gold-50 mb-6" />
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  O Direito de Família lida com as questões mais sensíveis e emocionais da vida 
                  das pessoas — a dissolução de um casamento, a disputa pela guarda dos filhos, 
                  o reconhecimento de uma paternidade, o planejamento da sucessão patrimonial. 
                  Cada caso é único e exige não apenas conhecimento jurídico, mas também 
                  sensibilidade, discrição e capacidade de mediação de conflitos.
                </p>
                <p>
                  Um advogado especializado em Direito de Família é essencial para orientar as 
                  partes sobre seus direitos e deveres, propor soluções equilibradas e evitar 
                  que conflitos emocionais se transformem em litígios prolongados e desgastantes. 
                  Nosso compromisso é buscar a melhor solução para cada família, seja por meio 
                  da conciliação e do diálogo, seja pela defesa técnica e contundente dos 
                  interesses de nossos clientes em juízo.
                </p>
                <p>
                  Nossa equipe está preparada para atender famílias em todo o Brasil, tanto 
                  presencialmente quanto por videoconferência. Oferecemos atendimento 
                  personalizado, com comunicação clara, transparente e respeitosa em todas 
                  as fases do processo. Conte conosco para proteger o que é mais importante 
                  para você e sua família.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <h3 className="font-serif text-2xl text-navy mb-6">Nossa Atuação</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Search, text: 'Análise criteriosa de cada caso com fundamentação legal' },
                      { icon: HandHeart, text: 'Atendimento humanizado com sensibilidade familiar' },
                      { icon: Shield, text: 'Estratégia processual personalizada e transparente' },
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
                  <Heart className="text-gold mb-1" size={20} />
                  <p className="text-xs font-medium">Protegendo famílias há mais de 10 anos</p>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="section-padding">
        <div className="max-w-4xl" style={{ maxWidth: 896, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <SectionHeading
            label="FAQ"
            title="Perguntas Frequentes"
            subtitle="Esclarecemos as principais dúvidas sobre Direito de Família. Se você não encontrar sua pergunta aqui, entre em contato conosco."
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
 <div className="absolute inset-0 " style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 60%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute inset-0"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-5 rounded-full blur-[150px]" /></div>
        
        <div className="relative z-10 text-center" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-gold-15 text-gold text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-5">
              Estamos Prontos para Ajudar
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-6">
              Proteja Sua Família<br />
              <span className="text-gradient-gold">Com Quem Entende</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Entre em contato com nossa equipe especializada em Direito de Família. 
              Analisamos seu caso com a excelência e a sensibilidade que você e sua 
              família merecem.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contato" className="btn-primary text-base px-8 py-4 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 group">
                <Phone size={18} className="group-hover:translate-x-1 transition-transform" /> Fale Conosco
              </Link>
              <a href="#topics" className="btn-outline btn-outline-light text-base px-8 py-4">
                <BookOpen size={18} /> Ver Todos os Temas
              </a>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              Atendimento em todo o Brasil • Presencial e Online • Equipe Especializada em Direito de Família
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
