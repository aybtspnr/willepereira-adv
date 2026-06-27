import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Briefcase, FileText, Clock, Shield, AlertTriangle,
  Heart, Scale, Users, ArrowRight, CheckCircle,
  ChevronRight, BookOpen, Gavel, Star, Search,
  DollarSign, UserCheck, UserX, Handshake,
  Laptop, Link2, HelpCircle, Phone
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
    icon: Gavel,
    title: 'Reclamações Trabalhistas',
    slug: 'reclamacoes-trabalhistas',
    paragraphs: [
      'A reclamação trabalhista é o instrumento processual pelo qual o trabalhador busca na Justiça do Trabalho a tutela de direitos violados ou não cumpridos pelo empregador durante a vigência ou após o término do contrato de trabalho. Trata-se do meio mais comum e eficaz para resolver conflitos individuais decorrentes da relação de emprego, abrangendo desde verbas salariais não pagas até indenizações por danos morais e materiais.',
      'O processo trabalhista brasileiro rege-se pelos princípios da celeridade, informalidade e proteção ao hipossuficiente, conforme estabelecido pela Consolidação das Leis do Trabalho (CLT) e pela Lei nº 13.467/2017 (Reforma Trabalhista). O rito ordinário é o mais utilizado, aplicando-se a todas as causas cujo valor ultrapasse quarenta salários mínimos, enquanto o rito sumaríssimo é destinado a causas de até quarenta salários mínimos, caracterizando-se por maior rapidez processual.',
      'As principais hipóteses de reclamação trabalhista incluem: verbas rescisórias não pagas ou pagas a menor, horas extras não quitadas, adicional de insalubridade/periculosidade, equiparação salarial, desvio de função, reintegração ao emprego, indenização por acidente de trabalho, assédio moral e dano moral decorrente da relação de emprego. A petição inicial deve indicar com clareza os fatos, os fundamentos jurídicos e o pedido, sob pena de indeferimento.',
      'É fundamental que o trabalhador esteja assistido por advogado especializado em direito trabalhista para a propositura da ação. Após o protocolo, o empregador é citado para apresentar defesa, designando-se audiência de conciliação, instrução e julgamento. Caso não haja acordo, o processo segue para sentença, podendo as partes recorrerem aos Tribunais Regionais do Trabalho (TRT) e, em casos específicos, ao Tribunal Superior do Trabalho (TST).',
    ],
    highlights: ['Prazo prescricional de 5 anos (limite de 2 anos após a demissão)', 'Prova documental e testemunhal são fundamentais', 'Possibilidade de acordo a qualquer momento do processo'],
  },
  {
    icon: FileText,
    title: 'Rescisão Contratual e Verbas Rescisórias',
    slug: 'rescisao-contratual',
    paragraphs: [
      'A rescisão contratual trabalhista é o ato jurídico que põe fim ao vínculo de emprego entre trabalhador e empregador, gerando uma série de direitos e obrigações recíprocas. O ordenamento jurídico brasileiro prevê diferentes modalidades de rescisão, cada qual com consequências específicas quanto às verbas devidas e aos prazos para pagamento. A correta classificação do tipo de rescisão é essencial para assegurar que o trabalhador receba todas as parcelas a que faz jus.',
      'Na dispensa sem justa causa — a modalidade mais comum — o empregado tem direito a: saldo de salário, aviso prévio indenizado ou trabalhado, férias vencidas e proporcionais acrescidas de 1/3 constitucional, 13º salário proporcional, saque do FGTS com multa de 40% sobre o saldo, e seguro-desemprego. Já na dispensa por justa causa, o trabalhador perde diversos direitos, recebendo apenas saldo de salário e férias vencidas, sendo essencial que o empregador comprove a falta grave.',
      'O pedido de demissão ocorre por iniciativa do empregado, que deverá conceder aviso prévio ao empregador ou indenizá-lo. Nessa modalidade, o trabalhador mantém direito a saldo de salário, férias vencidas e proporcionais com 1/3, 13º proporcional, e saque do FGTS (sem multa). Já na rescisão por acordo (art. 484-A da CLT), inserida pela Reforma Trabalhista, o empregado recebe metade do aviso prévio e da multa do FGTS (20%), podendo sacar até 80% do saldo do FGTS.',
      'O prazo para pagamento das verbas rescisórias é de até 10 dias corridos contados do término do contrato, sob pena de incorrer em multa equivalente ao salário do empregado (art. 477, §8º, CLT). É imprescindível que o trabalhador verifique atentamente os valores constantes do Termo de Rescisão do Contrato de Trabalho (TRCT) antes de assinar a quitação, e, em caso de dúvidas, consulte um advogado trabalhista para evitar a preclusão de direitos.',
    ],
    highlights: ['Multa de 40% do FGTS na dispensa sem justa causa', 'Aviso prévio proporcional ao tempo de serviço (até 90 dias)', 'Homologação pode ser feita no sindicato ou no Ministério do Trabalho'],
  },
  {
    icon: Clock,
    title: 'Horas Extras e Adicionais',
    slug: 'horas-extras',
    paragraphs: [
      'A jornada de trabalho no Brasil é constitucionalmente limitada a 8 horas diárias e 44 horas semanais, podendo ser reduzida por convenção ou acordo coletivo. Toda hora trabalhada que exceder esse limite configura hora extra, devendo ser remunerada com acréscimo mínimo de 50% sobre o valor da hora normal nos dias úteis e de 100% em domingos e feriados, salvo disposição mais benéfica prevista em norma coletiva.',
      'O controle da jornada de trabalho é obrigatório para empresas com mais de 20 empregados, podendo ser realizado por meio de sistemas manuais, mecânicos ou eletrônicos de ponto. A Reforma Trabalhista (Lei nº 13.467/2017) introduziu novas formas de controle, como o ponto por exceção (registro apenas de horas extraordinárias) e o teletrabalho sem controle de jornada, mas a jurisprudência tem consolidado o entendimento de que a ausência de controle não pode prejudicar o trabalhador.',
      'Além das horas extras propriamente ditas, a legislação trabalhista prevê diversos adicionais que majoram a remuneração do trabalhador em condições especiais. O adicional de periculosidade (30% sobre o salário base) é devido a trabalhadores que mantêm contato permanente com inflamáveis, explosivos ou energia elétrica. O adicional de insalubridade, graduado em 10%, 20% ou 40% sobre o salário mínimo, remunera o trabalho em condições nocivas à saúde, como agentes químicos, físicos ou biológicos.',
      'O adicional noturno é devido ao trabalho executado entre 22h e 5h, com acréscimo mínimo de 20% sobre a hora diurna e redução ficta da hora trabalhada para 52 minutos e 30 segundos. Já o adicional de transferência (25% do salário) é pago quando o empregado é transferido provisoriamente para outro município. É direito do trabalhador receber todos os adicionais a que faz jus de forma cumulativa quando preenchidos os requisitos legais para cada um deles.',
    ],
    highlights: ['Hora extra mínima de 50% (dias úteis) e 100% (domingos/feriados)', 'Adicional de periculosidade: 30% sobre o salário base', 'Adicional de insalubridade: 10%, 20% ou 40% conforme o grau'],
  },
  {
    icon: AlertTriangle,
    title: 'Acidente de Trabalho e Estabilidade',
    slug: 'acidente-trabalho',
    paragraphs: [
      'O acidente de trabalho é conceituado legalmente como aquele ocorrido pelo exercício do trabalho a serviço da empresa, provocando lesão corporal ou perturbação funcional que cause morte, perda ou redução da capacidade para o trabalho, permanente ou temporária. A legislação brasileira equipara ao acidente de trabalho as doenças profissionais (inerentes a determinada atividade) e as doenças do trabalho (adquiridas em razão das condições especiais em que o trabalho é realizado).',
      'O empregado acidentado no trabalho ou que adquire doença ocupacional goza de estabilidade provisória no emprego pelo prazo mínimo de 12 meses após a cessação do auxílio-doença acidentário, conforme art. 118 da Lei nº 8.213/91. Durante esse período, o trabalhador não pode ser dispensado sem justa causa, salvo se comprovada falta grave em inquérito judicial. Essa estabilidade visa proteger o trabalhador em momento de vulnerabilidade, garantindo sua subsistência e readaptação profissional.',
      'O estabelecimento do nexo causal entre a atividade laboral e a doença ou acidente é o ponto central para a caracterização do acidente de trabalho e a consequente estabilidade. A comunicação de acidente de trabalho (CAT) deve ser emitida pela empresa até o primeiro dia útil seguinte ao ocorrido, ou imediatamente em caso de morte. Na omissão do empregador, o próprio trabalhador, o sindicato ou o médico podem emitir a CAT, sendo fundamental para acessar os benefícios previdenciários acidentários.',
      'Além da estabilidade, o trabalhador acidentado tem direito ao auxílio-doença acidentário (espécie B91), que não exige carência e é pago pelo INSS a partir do 16º dia de afastamento. Em casos de redução da capacidade laboral, pode ser devida a reabilitação profissional e, se a sequela for definitiva, a aposentadoria por invalidez. O empregado também pode pleitear indenização por danos morais e materiais contra o empregador quando comprovada culpa ou dolo no acidente.',
    ],
    highlights: ['Estabilidade de 12 meses após retorno do auxílio-doença acidentário', 'CAT deve ser emitida pela empresa obrigatoriamente', 'Direito a indenização por danos morais e materiais em caso de culpa do empregador'],
  },
  {
    icon: Heart,
    title: 'Assédio Moral e Dano Moral',
    slug: 'assedio-moral',
    paragraphs: [
      'O assédio moral no trabalho é caracterizado pela exposição reiterada e prolongada do trabalhador a situações humilhantes, constrangedoras e degradantes durante a jornada de trabalho, com o objetivo de desestabilizá-lo emocional e profissionalmente. Pode manifestar-se de diversas formas: sobrecarga deliberada de tarefas, críticas constantes e infundadas, isolamento social, vigilância excessiva, sabotagem profissional, divulgação de boatos, atribuição de tarefas incompatíveis com a função, entre outras condutas abusivas.',
      'A caracterização do assédio moral exige a demonstração de reiteração da conduta — atos isolados, embora possam configurar dano moral, não caracterizam assédio moral propriamente dito. A jurisprudência trabalhista tem evoluído para reconhecer também o assédio moral organizacional, quando a própria estrutura e política da empresa incentivam práticas abusivas para alcançar metas, e o assédio moral vertical (superior hierárquico contra subordinado), horizontal (entre colegas) e ascendente (subordinados contra superior).',
      'O dano moral decorrente da relação de trabalho independe de prova do prejuízo (dano in re ipsa), bastando a demonstração do ato ilícito praticado pelo empregador e do sofrimento causado ao trabalhador. A indenização por dano moral tem caráter reparatório-compensatório e punitivo-pedagógico, visando não apenas compensar a vítima pelo sofrimento, mas também desestimular a reincidência da conduta lesiva por parte do empregador.',
      'O valor da indenização por dano moral trabalhista é fixado pelo juiz com base em critérios como a gravidade da lesão, o grau de culpa do agente, a condição socioeconômica das partes, a repercussão do dano e o caráter pedagógico da condenação. A Reforma Trabalhista introduziu parâmetros objetivos (art. 223-G da CLT) que limitam a indenização ao valor do último salário contratual, multiplicado por até 50 vezes para ofensas gravíssimas, mas a aplicação desse dispositivo tem sido relativizada pela jurisprudência.',
    ],
    highlights: ['Conduta reiterada é essencial para caracterização do assédio moral', 'Dano moral independe de prova do prejuízo (in re ipsa)', 'Indenização baseada na gravidade, culpa e condição das partes'],
  },
  {
    icon: Scale,
    title: 'Equiparação Salarial e Desvio de Função',
    slug: 'equiparacao-salarial',
    paragraphs: [
      'A equiparação salarial é o direito constitucionalmente assegurado ao trabalhador que exerce função idêntica à de outro colega de receber o mesmo salário, sem discriminação. O art. 461 da CLT estabelece os requisitos para a equiparação: identidade de função, trabalho de igual valor prestado ao mesmo empregador, na mesma localidade, e diferença de tempo de serviço inferior a quatro anos. A equiparação visa concretizar o princípio constitucional da isonomia e vedar a discriminação salarial injustificada.',
      'Para que a equiparação seja deferida, o paradigma (colega tomado como referência) deve exercer a mesma função com as mesmas responsabilidades, produtividade e perfeição técnica. A diferença de tempo de serviço não pode ultrapassar quatro anos no exercício da função, e a diferença de tempo na empresa não pode ser superior a dois anos entre os trabalhadores comparados. O empregador pode elidir a equiparação demonstrando a existência de plano de cargos e salários homologado, ou diferenças objetivas de produtividade e qualidade técnica.',
      'O desvio de função, por sua vez, ocorre quando o empregado é designado para exercer atribuições diversas e mais complexas do que aquelas previstas no cargo para o qual foi contratado, sem a correspondente contraprestação salarial. Diferentemente do acúmulo de função (quando o trabalhador exerce sua função original mais outras atividades), o desvio de função configura o exercício habitual de função diversa, gerando direito à equiparação salarial com o cargo efetivamente exercido.',
      'Tanto na equiparação quanto no desvio de função, o trabalhador deve buscar assistência jurídica especializada para instruir a reclamação trabalhista com provas robustas, como registros de ponto, holerites, testemunhas, organogramas da empresa e descrições de cargo. A Súmula 6 do TST consolida o entendimento jurisprudencial sobre o tema, estabelecendo os requisitos e as hipóteses de cabimento da ação de equiparação salarial.',
    ],
    highlights: ['Requisitos: mesma função, mesmo empregador, mesma localidade', 'Plano de cargos e salários pode impedir a equiparação', 'Desvio de função gera direito ao salário da função efetivamente exercida'],
  },
  {
    icon: Users,
    title: 'Trabalho Temporário e Terceirização',
    slug: 'trabalho-temporario',
    paragraphs: [
      'O trabalho temporário, regulado pela Lei nº 6.019/74, é a modalidade de contratação por prazo determinado destinada a atender à necessidade transitória de substituição de pessoal regular e permanente ou ao acréscimo extraordinário de serviços. A empresa de trabalho temporário (agência) contrata o trabalhador e o coloca à disposição da empresa tomadora de serviços, que arca com os custos mas não figura como empregadora formal. O contrato temporário tem prazo máximo de 180 dias, prorrogável por até 90 dias mediante autorização do Ministério do Trabalho.',
      'A terceirização de serviços, por sua vez, foi amplamente regulamentada pela Lei nº 13.429/2017 e pela Lei nº 13.467/2017 (Reforma Trabalhista), que autorizaram a terceirização da atividade-fim da empresa. Antes dessas alterações, a terceirização era admitida apenas para atividades-meio (serviços de vigilância, limpeza, conservação). Com a nova legislação, qualquer atividade pode ser terceirizada, ampliando significativamente o espectro de atuação das empresas prestadoras de serviços terceirizados.',
      'A terceirização lícita exige que a empresa prestadora de serviços tenha capacidade econômica compatível com sua atividade, não pode haver pessoalidade ou subordinação direta entre o trabalhador terceirizado e a empresa tomadora, e a prestadora deve assumir integralmente os riscos da atividade econômica. A inobservância desses requisitos pode caracterizar a fraude na terceirização e o reconhecimento do vínculo empregatício diretamente com a empresa tomadora dos serviços.',
      'O trabalhador terceirizado tem os mesmos direitos fundamentais dos empregados contratados diretamente pela tomadora: salário equitativo, jornada de trabalho, FGTS, férias, 13º salário, vale-transporte e condições dignas de trabalho. A administração pública também pode contratar serviços terceirizados, por meio de licitação, mas o vínculo com o ente público só se configura em caso de fraude comprovada, conforme entendimento consolidado do Supremo Tribunal Federal (ADPF 324 e RE 958.252).',
    ],
    highlights: ['Temporário: até 180 dias + 90 dias de prorrogação', 'Terceirização de atividade-fim é lícita (Reforma Trabalhista)', 'Vínculo empregatício direto se houver fraude na terceirização'],
  },
  {
    icon: Handshake,
    title: 'Acordo Extrajudicial Trabalhista',
    slug: 'acordo-extrajudicial',
    paragraphs: [
      'O acordo extrajudicial trabalhista, introduzido pela Reforma Trabalhista (art. 855-B a 855-E da CLT), é o instrumento pelo qual empregado e empregador, assistidos por advogados distintos, formalizam a resolução de conflitos decorrentes da relação de emprego sem a necessidade de propositura de ação judicial. O acordo é submetido à homologação judicial, na qual o juiz do trabalho analisa a regularidade do negócio jurídico e a voluntariedade das partes, podendo aprová-lo total ou parcialmente ou determinar diligências complementares.',
      'A principal vantagem do acordo extrajudicial é a segurança jurídica para ambas as partes. Para o empregado, garante o recebimento dos valores acordados de forma célere e com quitação ampla e irrestrita do contrato de trabalho. Para o empregador, elimina o risco de futuras reclamações trabalhistas sobre o mesmo objeto, desde que a quitação abranja todos os títulos decorrentes da relação de emprego. O acordo extrajudicial é particularmente útil em situações de rescisão contratual controvertida, valores residuais ou encerramento de empresas.',
      'A petição de acordo extrajudicial deve conter a qualificação completa das partes, o valor do acordo, a natureza das parcelas discriminadas (salariais, indenizatórias, verbas rescisórias) e a declaração de quitação. É requisito indispensável que empregado e empregador estejam representados por advogados distintos, sob pena de nulidade do acordo. As custas processuais são reduzidas (20% do valor arbitrado), e o juiz tem prazo de 15 dias para homologar ou não o acordo.',
      'Vale destacar que o acordo extrajudicial não pode conter cláusulas que violem direitos indisponíveis do trabalhador, como o salário mínimo legal ou as verbas de natureza alimentar. O juiz pode recusar a homologação se constatar vício de consentimento, fraude ou prejuízo manifesto ao trabalhador. Por isso, é fundamental que o trabalhador esteja assistido por advogado trabalhista de confiança, que possa orientá-lo sobre a adequação dos valores propostos e a extensão da quitação.',
    ],
    highlights: ['Assistência obrigatória de advogados distintos', 'Homologação judicial necessária para validade', 'Quitação ampla do contrato de trabalho'],
  },
  {
    icon: Laptop,
    title: 'Trabalho em Plataformas Digitais',
    slug: 'trabalho-plataformas-digitais',
    paragraphs: [
      'O trabalho mediado por plataformas digitais — como aplicativos de transporte, entrega, serviços domésticos e tarefas sob demanda — representa um dos maiores desafios contemporâneos do direito trabalhista brasileiro. A questão central é a definição do vínculo jurídico entre os trabalhadores que atuam por intermédio dessas plataformas e as empresas que as administram: trata-se de relação de emprego, protegida pela CLT, ou de relação autônoma, regida pelo direito civil ou pela legislação do trabalho autônomo?',
      'A jurisprudência brasileira ainda não consolidou um entendimento uniforme sobre o tema. Enquanto alguns Tribunais Regionais do Trabalho reconhecem o vínculo empregatício com fundamento na subordinação estrutural e algorítmica — pela qual o trabalhador se insere na dinâmica da atividade econômica da plataforma, que detém os meios de produção e o poder diretivo sobre o serviço —, outros negam o vínculo por entenderem que o trabalhador detém autonomia para definir seus horários, sua forma de atuação e a aceitação ou recusa de tarefas.',
      'Projetos de lei em tramitação no Congresso Nacional buscam criar uma regulamentação específica para o trabalho em plataformas digitais, estabelecendo direitos mínimos como remuneração horária, contribuição previdenciária, seguro contra acidentes e transparência algorítmica. O PLP 12/2024, por exemplo, propõe a criação de uma categoria intermediária entre o emprego celetista e o trabalho autônomo, com garantias como salário mínimo por hora efetivamente trabalhada e recolhimento de FGTS.',
      'Enquanto não houver regulamentação específica, a análise do vínculo empregatício no trabalho em plataformas continua sendo feita caso a caso, com base nos requisitos clássicos do art. 3º da CLT: pessoalidade, não eventualidade, onerosidade e subordinação jurídica. O trabalhador que se sentir prejudicado pela ausência de direitos trabalhistas básicos deve buscar orientação jurídica especializada para avaliar a viabilidade de uma ação declaratória de vínculo empregatício, especialmente nos casos em que a plataforma exerce controle excessivo sobre a atividade laboral.',
    ],
    highlights: ['Subordinação algorítmica como novo paradigma jurídico', 'Projetos de lei buscam regulamentação específica', 'Análise caso a caso dos requisitos do art. 3º da CLT'],
  },
  {
    icon: Link2,
    title: 'Vínculo Empregatício',
    slug: 'vinculo-empregaticio',
    paragraphs: [
      'O vínculo empregatício é o elemento central do Direito do Trabalho, definido pela presença simultânea dos cinco requisitos previstos nos arts. 2º e 3º da CLT: trabalho prestado por pessoa física, com pessoalidade, não eventualidade, onerosidade e subordinação jurídica ao empregador. A ausência de qualquer um desses elementos descaracteriza a relação de emprego, podendo configurar outras formas de prestação de serviços, como trabalho autônomo, eventual, voluntário ou cooperado.',
      'A subordinação jurídica é o requisito mais característico e debatido do vínculo empregatício. Consiste na sujeição do empregado ao poder diretivo, regulamentar, fiscalizatório e disciplinar do empregador. A subordinação pode ser clássica (ordens diretas do superior hierárquico), objetiva (inserção do trabalhador na dinâmica da atividade econômica do tomador) ou estrutural (integração à estrutura organizacional da empresa, independentemente de ordens diretas).',
      'A Reforma Trabalhista (Lei nº 13.467/2017) trouxe inovações significativas no campo do vínculo empregatício, como a figura do trabalhador autônomo exclusivo (art. 442-B da CLT), que permite a prestação de serviços com exclusividade sem descaracterizar a autonomia. Também foram regulamentadas as cooperativas de trabalho e o trabalho intermitente (art. 452-A), modalidade na qual o empregado é convocado para prestar serviços de forma não contínua, recebendo por período trabalhado.',
      'O reconhecimento do vínculo empregatício pode ser pleiteado judicialmente por qualquer trabalhador que preencha os requisitos legais, mesmo que tenha formalizado contrato de natureza diversa (pejotização, cooperativa fraudulenta, estágio irregular). A Súmula 331 do TST e a Súmula Vinculante 10 do STF estabelecem parâmetros importantes para o reconhecimento do vínculo, especialmente nos casos de terceirização fraudulenta e de contratação de servidores públicos sem concurso. A ação declaratória de vínculo empregatício é o meio processual adequado para buscar esse reconhecimento.',
    ],
    highlights: ['5 requisitos: pessoa física, pessoalidade, não eventualidade, onerosidade, subordinação', 'Pejotização fraudulenta gera direito ao reconhecimento do vínculo', 'Trabalho intermitente é modalidade contratual lícita (art. 452-A CLT)'],
  },
]

/* ===== FAQ DATA ===== */
const faqItems = [
  {
    q: 'Qual o prazo para entrar com uma reclamação trabalhista após a demissão?',
    a: 'O trabalhador tem até 2 anos após a extinção do contrato de trabalho para ajuizar uma reclamação trabalhista, mas somente poderá cobrar verbas dos últimos 5 anos da relação de emprego. Esse é o chamado prazo prescricional quinquenal previsto no art. 7º, XXIX, da Constituição Federal. Ultrapassados esses marcos, o direito de ação prescreve e o trabalhador não poderá mais exigir judicialmente os créditos trabalhistas.',
  },
  {
    q: 'Como comprovar horas extras sem registro de ponto?',
    a: 'Na ausência de controle de jornada, a jurisprudência trabalhista admite todos os meios de prova em direito admitidos, com destaque para a prova testemunhal. O ônus da prova é do empregador quanto às empresas com mais de 20 empregados (Súmula 338 do TST). Na prática, recomenda-se que o trabalhador mantenha registros próprios (agenda, e-mails, mensagens), busque testemunhas que confirmem a jornada e reúna documentos que indiquem o horário de trabalho, como bilhetes de transporte, registros de acesso ou câmeras de segurança.',
  },
  {
    q: 'O que caracteriza assédio moral no ambiente de trabalho?',
    a: 'O assédio moral caracteriza-se pela exposição reiterada e prolongada do trabalhador a situações humilhantes, constrangedoras e degradantes. Atos isolados, por mais graves que sejam, não configuram assédio moral propriamente dito, mas podem ensejar indenização por dano moral. Exemplos comuns incluem: críticas constantes e públicas, isolamento deliberado, sobrecarga de trabalho com prazos impossíveis, vigilância excessiva e atribuição de tarefas incompatíveis com a função.',
  },
  {
    q: 'É possível fazer acordo extrajudicial sem ação trabalhista?',
    a: 'Sim. A Reforma Trabalhista (Lei nº 13.467/2017) introduziu a possibilidade de homologação de acordo extrajudicial (arts. 855-B a 855-E da CLT), permitindo que empregado e empregador formalizem a resolução de conflitos com assistência de advogados distintos e submetam o acordo à homologação do juiz do trabalho. É uma alternativa célere e segura para ambas as partes, pois confere quitação ampla do contrato de trabalho e evita futuras demandas judiciais.',
  },
  {
    q: 'Quais os direitos do trabalhador terceirizado?',
    a: 'O trabalhador terceirizado tem direito a salário equitativo, jornada de trabalho limitada, FGTS, férias com 1/3, 13º salário, vale-transporte, condições dignas de trabalho e todos os demais direitos previstos na CLT. O empregador (empresa prestadora de serviços) é o responsável direto pelo cumprimento dessas obrigações, mas a empresa tomadora responde subsidiariamente pelos créditos trabalhistas não adimplidos pela prestadora, desde que tenha participado da relação processual.',
  },
  {
    q: 'O que fazer em caso de acidente de trabalho?',
    a: 'Imediatamente após o acidente, o trabalhador deve: (1) comunicar o fato à empresa; (2) buscar atendimento médico para emissão do atestado; (3) solicitar a emissão da CAT (Comunicação de Acidente de Trabalho) pela empresa; (4) guardar todos os documentos médicos e registros do ocorrido. Se a empresa se recusar a emitir a CAT, o próprio trabalhador, o sindicato ou o médico assistente podem fazê-lo. O afastamento superior a 15 dias gera direito ao auxílio-doença acidentário (espécie B91) junto ao INSS.',
  },
  {
    q: 'Quem trabalha em aplicativos tem vínculo empregatício?',
    a: 'A questão é controvertida na jurisprudência brasileira. Alguns tribunais reconhecem o vínculo empregatício de motoristas e entregadores de aplicativos com fundamento na subordinação algorítmica e estrutural, enquanto outros negam por entender que o trabalhador detém autonomia para organizar sua atividade. A análise é sempre casuística, dependendo do grau de controle exercido pela plataforma. Projetos de lei em tramitação buscam regulamentar a matéria com uma categoria intermediária.',
  },
  {
    q: 'Qual a diferença entre desvio de função e acúmulo de função?',
    a: 'O desvio de função ocorre quando o empregado exerce atribuições diversas e mais complexas do que as previstas no cargo contratado, sem a correspondente contraprestação salarial. Já o acúmulo de função acontece quando o trabalhador exerce sua função original mais outras atividades, também sem o devido acréscimo salarial. Em ambos os casos, o empregado tem direito ao salário correspondente à função efetivamente exercida (equiparação) ou a um plus salarial pelo acúmulo.',
  },
]

/* ===== PAGE COMPONENT ===== */
import { Helmet } from 'react-helmet-async'

export default function DireitoTrabalhistaPage() {
return (
    <div>
      <Helmet>
        <title>Direito Trabalhista | Will & Pereira Advocacia</title>
        <meta name="description" content="Advocacia Trabalhista especializada em verbas rescisórias, horas extras, FGTS e direitos do trabalhador." />
        <link rel="canonical" href="https://willepereira-adv.vercel.app/trabalhista" />
        <meta property="og:title" content="Direito Trabalhista | Will & Pereira Advocacia" />
        <meta property="og:description" content="Advocacia Trabalhista especializada em verbas rescisórias, horas extras, FGTS e direitos do trabalhador." />
        <meta property="og:url" content="https://willepereira-adv.vercel.app/trabalhista" />
      </Helmet>
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
              <Briefcase size={16} />
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
            Direito <span className="text-gradient-gold">Trabalhista</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed mb-8"
          >
            Atuamos na defesa dos direitos dos trabalhadores e empregadores nas relações de emprego, 
            com excelência em reclamações trabalhistas, rescisões contratuais, horas extras, 
            acidentes de trabalho, equiparação salarial e demais questões da legislação trabalhista brasileira.
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
              <Scale size={14} className="text-gold" /> CLT e Legislação
            </span>
            <span className="w-px h-4 bg-white/10" />
            <span>Justiça do Trabalho</span>
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
            title="Direito Trabalhista em Detalhes"
            subtitle="Conteúdo jurídico aprofundado sobre os principais temas trabalhistas. Informações técnicas para trabalhadores, empregadores e profissionais do Direito."
          />

          {/* Overview cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Gavel, count: '10+', label: 'Anos de Atuação Trabalhista' },
              { icon: FileText, count: '800+', label: 'Casos Trabalhistas Atendidos' },
              { icon: Star, count: '95%', label: 'Índice de Satisfação' },
              { icon: Users, count: 'Nacional', label: 'Atendimento em Todo o Brasil' },
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
                O Direito Trabalhista é o ramo jurídico que regula as relações entre empregados e empregadores, 
                estabelecendo direitos e obrigações para ambas as partes com o objetivo de proteger o trabalhador 
                — parte hipossuficiente da relação — e garantir condições dignas de trabalho.
              </p>
              <p>
                O Brasil possui uma das legislações trabalhistas mais avançadas do mundo, consolidada na 
                Consolidação das Leis do Trabalho (CLT), promulgada em 1943, e em dezenas de leis complementares 
                que disciplinam matérias específicas. A Constituição Federal de 1988 elevou os direitos trabalhistas 
                ao patamar de direitos fundamentais, assegurando garantias mínimas ao trabalhador que não podem 
                ser suprimidas nem mesmo por vontade das partes.
              </p>
              <p>
                A Reforma Trabalhista (Lei nº 13.467/2017) promoveu alterações significativas na CLT, 
                modernizando as relações de trabalho, flexibilizando certas obrigações e criando novas modalidades 
                contratuais. Compreender essas mudanças é essencial para a defesa eficaz dos direitos trabalhistas, 
                seja na esfera administrativa ou judicial.
              </p>
              <p>
                A seguir, apresentamos um guia completo e aprofundado sobre os principais temas do Direito 
                Trabalhista brasileiro, organizado por áreas específicas para facilitar a consulta e o 
                entendimento. Cada tópico aborda aspectos legais, jurisprudenciais e práticos fundamentais 
                para a orientação de trabalhadores e empregadores.
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
            title="Todos os Temas Trabalhistas"
            subtitle="Análise técnica e aprofundada de cada área do Direito Trabalhista, com fundamentação legal e jurisprudencial."
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
                  O Direito Trabalhista é uma área técnica e complexa, que exige conhecimento aprofundado 
                  da CLT, da jurisprudência consolidada dos Tribunais do Trabalho e das súmulas do TST. 
                  Um advogado especializado é fundamental para orientar o trabalhador sobre a viabilidade 
                  de sua demanda, reunir as provas adequadas e conduzir a estratégia processual mais eficiente.
                </p>
                <p>
                  Além da atuação contenciosa (reclamações trabalhistas), o advogado trabalhista presta 
                  serviços essenciais de consultoria preventiva: elaboração e revisão de contratos de trabalho, 
                  análise de risco trabalhista em operações de fusão e aquisição, assessoria em processos 
                  de demissão coletiva e planejamento de remuneração estratégica.
                </p>
                <p>
                  O Direito Trabalhista é uma área em constante evolução, com mudanças legislativas e 
                  jurisprudenciais frequentes. Manter-se atualizado é essencial para uma atuação eficaz 
                  na defesa dos direitos trabalhistas. Conte com a expertise da nossa equipe para orientar 
                  você em cada etapa do processo.
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
                <p className="text-xs font-medium">Defesa dos seus direitos trabalhistas</p>
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
            subtitle="Esclarecemos as principais dúvidas sobre Direito Trabalhista. Se você não encontrar sua pergunta aqui, entre em contato conosco."
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
              <span className="text-gradient-gold">Trabalhistas</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Entre em contato com nossa equipe especializada em Direito Trabalhista. 
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
