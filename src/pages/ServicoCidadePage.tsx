import { useState, useRef, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  Scale, Shield, Heart, Clock, Users, FileText, Award,
  ArrowRight, CheckCircle, Phone, BookOpen,
  MapPin, Star, Quote, Gavel, Briefcase, Landmark,
  Calendar, TrendingUp, AlertCircle, RefreshCw,
  ChevronDown, ChevronRight, UserCheck, Baby, Lock,
  Activity, HelpCircle, Sparkles, BadgeCheck, Search,
  Bookmark, Layers, DollarSign, GitBranch, Building2,
  Home, Key, ClipboardList, UserPlus, Scissors,
  Globe, ChevronLeft
} from 'lucide-react'
import { useSEO } from '../hooks/useSEO'
import SEO from '../components/SEO'
import { getCidadeBySlug, type CidadeInfo } from '../data/cidades'

/* ═══════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════ */
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } } }
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } }

/* ═══════════════════════════════════════════════
   REUSABLE COMPONENTS
   ═══════════════════════════════════════════════ */
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
        light ? 'bg-gold/15 text-gold' : 'bg-gold/10 text-gold-dark'
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

/* ═══════════════════════════════════════════════
   AREA CONFIG — Content for each legal area
   ═══════════════════════════════════════════════ */
interface AreaConfig {
  areaNome: string
  areaSlug: string
  icon: any
  color: string
  description: string
  services: { title: string; paragraphs: string[]; highlights: string[] }[]
  faqs: { q: string; r: string }[]
}

const areas: Record<string, AreaConfig> = {
  previdenciario: {
    areaNome: 'Previdenciário',
    areaSlug: 'previdenciario',
    icon: Shield,
    color: 'from-blue-600 to-indigo-600',
    description: 'Atuamos na concessão e revisão de benefícios previdenciários junto ao INSS, incluindo aposentadorias, pensões, auxílios e benefícios assistenciais.',
    services: [
      {
        title: 'Aposentadoria por Idade',
        paragraphs: [
          'A aposentadoria por idade é o benefício mais requerido do INSS, concedido ao trabalhador que atinge a idade mínima exigida por lei. Para os homens, a idade é de 65 anos; para as mulheres, 62 anos (após a Reforma da Previdência de 2019). Além da idade, é necessário cumprir a carência de 180 contribuições mensais (15 anos).',
          'O valor do benefício é calculado com base na média de todos os salários de contribuição desde julho de 1994, com aplicação do fator previdenciário quando mais vantajoso. Após a EC 103/2019, o cálculo passou a ser de 60% da média salarial, acrescido de 2% para cada ano que exceder 20 anos de contribuição (homens) ou 15 anos (mulheres).',
          'Existem regras de transição para quem já contribuía antes da reforma, como a regra dos pontos e a idade mínima progressiva. Cada caso deve ser analisado individualmente para identificar a regra mais vantajosa.',
          'O trabalhador rural tem requisitos reduzidos: 60 anos para homens e 55 para mulheres, com comprovação de atividade rural no período de carência. A documentação adequada é essencial para o reconhecimento do tempo rural.'
        ],
        highlights: ['65 anos (homem) ou 62 anos (mulher) — idade urbana', '180 contribuições (15 anos) de carência', 'Regras de transição pós-reforma', 'Redução de 5 anos para trabalhador rural']
      },
      {
        title: 'Aposentadoria por Tempo de Contribuição',
        paragraphs: [
          'A aposentadoria por tempo de contribuição exige 35 anos de contribuição para homens e 30 para mulheres, sem exigência de idade mínima. Este benefício foi extinto para novos segurados pela Reforma da Previdência, mas mantido através de regras de transição para quem já contribuía antes da EC 103/2019.',
          'As principais regras de transição incluem: a regra dos pontos (soma da idade com tempo de contribuição), que em 2026 exige 101 pontos para homens e 91 para mulheres; a regra da idade mínima progressiva; e as regras do pedágio de 50% e 100%.',
          'O planejamento previdenciário é essencial para identificar a melhor regra de transição aplicável ao caso concreto. A escolha entre as diferentes modalidades pode representar diferença significativa no valor do benefício e no tempo de espera.',
          'Períodos de trabalho especial, tempo rural, serviço militar e licença-maternidade podem ser computados para aumentar o tempo de contribuição, exigindo documentação específica para cada caso.'
        ],
        highlights: ['35 anos (homem) ou 30 anos (mulher)', 'Regras de transição disponíveis', 'Planejamento previdenciário recomendado', 'Possibilidade de conversão de tempo especial']
      },
      {
        title: 'Pensão por Morte',
        paragraphs: [
          'A pensão por morte é devida aos dependentes do segurado falecido, independentemente de carência. O benefício é pago a cônjuge, companheiro(a), filhos menores de 21 anos ou inválidos, e, na ausência destes, aos pais e irmãos que comprovem dependência econômica.',
          'O valor corresponde a 50% do valor da aposentadoria que o falecido recebia ou teria direito, acrescido de 10% por dependente, limitado a 100%. A duração varia conforme a idade do cônjuge na data do óbito, podendo ser vitalícia para os maiores de 45 anos.',
          'A qualidade de segurado do falecido na data do óbito é requisito essencial. O benefício deve ser requerido em até 90 dias para pagamento retroativo à data do óbito, ou até 180 dias para filhos menores.'
        ],
        highlights: ['Não exige carência', '50% + 10% por dependente', 'Vitalícia para cônjuges acima de 45 anos', 'Prazo de 90 dias para pagamento retroativo']
      },
      {
        title: 'Auxílio-Doença (Benefício por Incapacidade Temporária)',
        paragraphs: [
          'O auxílio-doença é concedido ao segurado que fica temporariamente incapaz para o trabalho por mais de 15 dias consecutivos. Exige carência de 12 contribuições (dispensada em casos de acidente ou doenças graves especificadas em lei) e qualidade de segurado.',
          'O valor corresponde a 91% da média de todos os salários de contribuição, limitado à média dos 12 últimos salários. A perícia médica do INSS é o ponto central da análise, sendo fundamental apresentar documentação médica robusta.',
          'Em caso de negativa administrativa, é possível recorrer ao Conselho de Recursos da Previdência Social ou ingressar com ação judicial. O auxílio-doença pode ser prorrogado se a incapacidade persistir e convertido em aposentadoria por invalidez se a incapacidade se tornar permanente.'
        ],
        highlights: ['12 contribuições de carência', '91% da média salarial', 'Perícia médica essencial', 'Possibilidade de prorrogação']
      },
      {
        title: 'BPC/LOAS — Benefício de Prestação Continuada',
        paragraphs: [
          'O BPC/LOAS é um benefício assistencial de um salário mínimo mensal pago a idosos com 65+ anos e pessoas com deficiência de qualquer idade, em situação de baixa renda (renda familiar per capita inferior a 1/4 do salário mínimo). Não exige contribuições ao INSS.',
          'Para a pessoa com deficiência, é necessário comprovar impedimentos de longo prazo (mínimo 2 anos) por meio de avaliação biopsicossocial realizada pelo INSS. O benefício não paga 13º salário nem gera pensão por morte.',
          'É fundamental manter o Cadastro Único (CadÚnico) atualizado. O BPC é revisto a cada 2 anos e pode ser suspenso se os requisitos deixarem de ser preenchidos.'
        ],
        highlights: ['Não exige contribuição ao INSS', 'Renda per capita até 1/4 do salário mínimo', 'Avaliação biopsicossocial', 'Revisão a cada 2 anos']
      },
      {
        title: 'Revisão de Benefícios e Planejamento Previdenciário',
        paragraphs: [
          'Milhares de benefícios são concedidos pelo INSS com erros de cálculo. A revisão pode significar aumento substancial do valor mensal e pagamento de diferenças retroativas. As principais modalidades incluem revisão do valor inicial, revisão de tempo de contribuição e revisão pelo teto.',
          'O planejamento previdenciário é a análise estratégica do histórico contributivo para identificar a melhor data e modalidade de aposentadoria. Inclui simulação de todas as regras aplicáveis e identificação de períodos de contribuição não reconhecidos.',
          'O prazo decadencial para revisão é de 10 anos a contar do primeiro pagamento. Cada caso deve ser analisado individualmente com cálculo atuarial para verificar a viabilidade da revisão.'
        ],
        highlights: ['Prazo decadencial de 10 anos', 'Diferenças retroativas dos últimos 5 anos', 'Planejamento personalizado', 'Revisão da "vida toda" (Tema 1.102/STF)']
      }
    ],
    faqs: [
      { q: 'O que é o CNIS e por que é importante?', r: 'O CNIS (Cadastro Nacional de Informações Sociais) é o extrato oficial do histórico de contribuições do segurado junto ao INSS. É o documento mais importante para análise previdenciária, pois é a partir dele que os benefícios são calculados. Erros no CNIS podem levar a cálculos equivocados e prejuízos ao segurado.' },
      { q: 'Qual a diferença entre carência e tempo de contribuição?', r: 'Carência é o número mínimo de contribuições mensais exigidas para ter direito ao benefício. Tempo de contribuição é o período efetivo de trabalho que será considerado no cálculo do valor do benefício. É possível ter carência cumprida mas tempo insuficiente, ou vice-versa.' },
      { q: 'Quanto tempo leva para o INSS analisar um pedido?', r: 'O prazo legal é de até 45 dias, prorrogável por mais 45 dias. Na prática, os prazos variam conforme a demanda da agência do INSS. Em caso de demora excessiva, é possível impetrar mandado de segurança para garantir a análise.' },
      { q: 'O que fazer se o INSS negar meu benefício?', r: 'Primeiro, é possível interpor recurso administrativo ao Conselho de Recursos da Previdência Social (CRPS). Se negado, a via judicial é a alternativa. Muitos benefícios negados na via administrativa são concedidos na Justiça.' },
      { q: 'Posso me aposentar e continuar trabalhando?', r: 'Sim, o aposentado por tempo de contribuição ou por idade pode continuar trabalhando. Já o aposentado por invalidez não pode retornar ao trabalho, exceto em atividades que não configurem exercício de atividade remunerada.' }
    ]
  },
  trabalhista: {
    areaNome: 'Trabalhista',
    areaSlug: 'trabalhista',
    icon: Briefcase,
    color: 'from-emerald-600 to-teal-600',
    description: 'Atuamos na defesa dos direitos de trabalhadores e empregadores, com excelência em reclamações trabalhistas, verbas rescisórias e indenizações.',
    services: [
      {
        title: 'Reclamações Trabalhistas',
        paragraphs: [
          'A reclamação trabalhista é o instrumento pelo qual o trabalhador busca na Justiça do Trabalho a tutela de direitos violados pelo empregador. O processo trabalhista rege-se pelos princípios da celeridade e proteção ao hipossuficiente, conforme a CLT e a Reforma Trabalhista (Lei 13.467/2017).',
          'As principais hipóteses incluem verbas rescisórias não pagas, horas extras não quitadas, adicional de insalubridade/periculosidade, equiparação salarial e indenização por danos morais. A petição inicial deve indicar com clareza os fatos, fundamentos jurídicos e o pedido.',
          'O trabalhador tem até 2 anos após a extinção do contrato para ajuizar a ação, podendo cobrar verbas dos últimos 5 anos. A assistência de advogado especializado é fundamental para o sucesso da demanda.'
        ],
        highlights: ['Prazo prescricional de 5 anos', '2 anos após a demissão para ajuizar', 'Prova documental e testemunhal são fundamentais', 'Possibilidade de acordo a qualquer momento']
      },
      {
        title: 'Verbas Rescisórias',
        paragraphs: [
          'Na dispensa sem justa causa, o empregado tem direito a: saldo de salário, aviso prévio indenizado ou trabalhado, férias vencidas e proporcionais com 1/3, 13º salário proporcional, saque do FGTS com multa de 40% e seguro-desemprego.',
          'Na dispensa por justa causa, o trabalhador perde diversos direitos, recebendo apenas saldo de salário e férias vencidas. No pedido de demissão, o trabalhador mantém direito a férias, 13º proporcional e saque do FGTS (sem multa).',
          'A rescisão por acordo (art. 484-A da CLT) permite o pagamento de metade do aviso prévio e da multa do FGTS (20%), com saque de até 80% do saldo do FGTS. O prazo para pagamento é de até 10 dias corridos.'
        ],
        highlights: ['Multa de 40% do FGTS (sem justa causa)', 'Aviso prévio proporcional até 90 dias', 'Prazo de 10 dias para pagamento', 'Homologação no sindicato ou MTE']
      },
      {
        title: 'Horas Extras e Adicionais',
        paragraphs: [
          'A jornada de trabalho é limitada a 8 horas diárias e 44 horas semanais. Horas extras devem ser remuneradas com acréscimo mínimo de 50% nos dias úteis e 100% em domingos e feriados.',
          'O adicional de periculosidade (30% sobre o salário base) é devido a trabalhadores expostos a inflamáveis, explosivos ou energia elétrica. O adicional de insalubridade varia de 10% a 40% conforme o grau de exposição a agentes nocivos.',
          'O adicional noturno (mínimo de 20%) é devido ao trabalho entre 22h e 5h, com redução ficta da hora para 52min30s. O controle de jornada é obrigatório para empresas com mais de 20 empregados.'
        ],
        highlights: ['Hora extra: 50% (dias úteis), 100% (domingos/feriados)', 'Periculosidade: 30%', 'Insalubridade: 10% a 40%', 'Noturno: 20% + hora reduzida']
      },
      {
        title: 'Acidente de Trabalho e Estabilidade',
        paragraphs: [
          'O acidente de trabalho é aquele ocorrido pelo exercício do trabalho a serviço da empresa, causando lesão ou perturbação funcional. Doenças profissionais e do trabalho também são equiparadas a acidente de trabalho.',
          'O empregado acidentado goza de estabilidade de 12 meses após a cessação do auxílio-doença acidentário. A CAT deve ser emitida pela empresa obrigatoriamente. Em caso de omissão, o próprio trabalhador pode emiti-la.',
          'Além da estabilidade, o trabalhador tem direito ao auxílio-doença acidentário (espécie B91) e, se comprovada culpa do empregador, indenização por danos morais e materiais.'
        ],
        highlights: ['Estabilidade de 12 meses', 'CAT obrigatória', 'Auxílio-doença acidentário sem carência', 'Indenização por danos morais']
      },
      {
        title: 'Assédio Moral e Dano Moral',
        paragraphs: [
          'O assédio moral é caracterizado pela exposição reiterada do trabalhador a situações humilhantes e degradantes. Pode manifestar-se como sobrecarga deliberada, críticas constantes, isolamento social ou vigilância excessiva.',
          'O dano moral independe de prova do prejuízo (dano in re ipsa), bastando a demonstração do ato ilícito. A indenização tem caráter reparatório e pedagógico, visando compensar a vítima e desestimular a reincidência.',
          'O valor é fixado pelo juiz com base na gravidade, culpa do agente e condição socioeconômica das partes. A Reforma Trabalhista introduziu parâmetros objetivos, mas a jurisprudência tem relativizado a aplicação desses limites.'
        ],
        highlights: ['Conduta reiterada é essencial', 'Dano moral in re ipsa', 'Caráter pedagógico da indenização', 'Prova testemunhal é fundamental']
      },
      {
        title: 'FGTS e Seguro-Desemprego',
        paragraphs: [
          'O FGTS (Fundo de Garantia do Tempo de Serviço) é um direito do trabalhador equivalente a 8% da remuneração mensal, depositado pelo empregador em conta vinculada. Na dispensa sem justa causa, o trabalhador pode sacar o saldo e receber multa de 40%.',
          'O seguro-desemprego é um benefício temporário pago ao trabalhador dispensado sem justa causa. O número de parcelas varia de 3 a 5, conforme o tempo trabalhado. O valor é calculado com base na média dos salários dos últimos 3 meses.',
          'O trabalhador que teve o FGTS não depositado ou depositado a menor pode exigir judicialmente os valores, com correção monetária e juros. A ação de exigir o FGTS é imprescritível, mas as diferenças de multa de 40% prescrevem em 5 anos.'
        ],
        highlights: ['8% de depósito mensal obrigatório', 'Multa de 40% na dispensa sem justa causa', 'Seguro-desemprego: 3 a 5 parcelas', 'Ação de FGTS é imprescritível']
      }
    ],
    faqs: [
      { q: 'Qual o prazo para entrar com reclamação trabalhista?', r: 'O trabalhador tem até 2 anos após a extinção do contrato para ajuizar a ação, podendo cobrar verbas dos últimos 5 anos. É o prazo prescricional previsto no art. 7º, XXIX, da Constituição Federal.' },
      { q: 'Como comprovar horas extras sem registro de ponto?', r: 'Na ausência de controle de jornada, a prova testemunhal é o principal meio de prova. Para empresas com mais de 20 empregados, o ônus da prova é do empregador (Súmula 338 do TST).' },
      { q: 'O que caracteriza assédio moral?', r: 'A exposição reiterada e prolongada a situações humilhantes e degradantes. Atos isolados não configuram assédio moral, mas podem gerar indenização por dano moral.' },
      { q: 'Quais os direitos do trabalhador terceirizado?', r: 'O trabalhador terceirizado tem direito a salário equitativo, FGTS, férias, 13º e todos os direitos da CLT. A empresa tomadora responde subsidiariamente pelos créditos trabalhistas.' },
      { q: 'Como funciona o acordo extrajudicial?', r: 'Empregado e empregador, assistidos por advogados distintos, podem formalizar acordo que é homologado pelo juiz do trabalho. Garante segurança jurídica e quitação ampla do contrato.' }
    ]
  },
  civel: {
    areaNome: 'Cível',
    areaSlug: 'civel',
    icon: Scale,
    color: 'from-violet-600 to-purple-600',
    description: 'Atuamos em Direito Cível, contratos, indenizações, usucapião e demais questões do direito civil brasileiro.',
    services: [
      {
        title: 'Direito Contratual',
        paragraphs: [
          'O Direito Contratual regula as relações entre particulares, abrangendo a elaboração, análise e revisão de contratos civis e empresariais. Um contrato bem redigido previne litígios e garante segurança jurídica às partes.',
          'Atuamos na elaboração de contratos de compra e venda, prestação de serviços, locação, parceria, franquia, distribuição, representação comercial e outros instrumentos contratuais. Cada contrato é personalizado às necessidades específicas do cliente.',
          'Na revisão contratual, analisamos cláusulas abusivas, desequilíbrio entre as partes e vícios do consentimento. A ação revisional pode ser proposta para adequar o contrato à realidade econômica e jurídica do momento.',
          'O descumprimento contratual gera direito à rescisão do contrato, com perdas e danos. A cláusula penal e os juros moratórios são instrumentos de garantia do cumprimento das obrigações.'
        ],
        highlights: ['Elaboração e revisão de contratos', 'Cláusulas abusivas e vícios do consentimento', 'Ação revisional de contrato', 'Rescisão contratual com perdas e danos']
      },
      {
        title: 'Indenizações e Responsabilidade Civil',
        paragraphs: [
          'A responsabilidade civil é o instituto jurídico que obriga o causador de um dano a repará-lo. Pode ser contratual (decorrente do descumprimento de contrato) ou extracontratual (decorrente de ato ilícito).',
          'Os danos podem ser materiais (danos emergentes e lucros cessantes), morais (lesão à honra, imagem, dignidade) e estéticos. A indenização deve ser integral, reparando todos os prejuízos sofridos pela vítima.',
          'Nos acidentes de trânsito, erros médicos, defeitos de produtos e serviços, a responsabilidade pode ser objetiva (independente de culpa) quando se aplica o Código de Defesa do Consumidor ou a teoria do risco.',
          'O prazo prescricional para a pretensão de reparação civil é de 3 anos (CC, art. 206, §3º, V), contados da data do conhecimento do dano e de sua autoria.'
        ],
        highlights: ['Danos materiais, morais e estéticos', 'Responsabilidade objetiva e subjetiva', 'Prazo prescricional de 3 anos', 'Reparação integral do dano']
      },
      {
        title: 'Usucapião',
        paragraphs: [
          'A usucapião é o modo de aquisição da propriedade pelo decurso do tempo, mediante o exercício da posse contínua e pacífica. É um instituto que regulariza a situação de quem possui imóvel como se fosse dono, mas não tem a documentação.',
          'Existem modalidades: usucapião extraordinário (15 anos de posse, reduzido para 10 anos se houver moradia ou obra), ordinário (10 anos com justo título e boa-fé), especial urbano (5 anos, imóvel até 250m², para moradia), especial rural (5 anos, imóvel até 50 hectares) e coletivo.',
          'A ação de usucapião é proposta no foro da situação do imóvel. Exige prova da posse prolongada, contínua e pacífica, com animus domini (intenção de ser dono). A sentença declaratória é registrada no cartório de imóveis.'
        ],
        highlights: ['Extraordinário: 15 anos', 'Ordinário: 10 anos', 'Especial urbano: 5 anos', 'Regularização fundiária']
      },
      {
        title: 'Direito de Família e Sucessões',
        paragraphs: [
          'O Direito de Família regula as relações pessoais e patrimoniais entre cônjuges, companheiros, pais e filhos. Inclui o casamento, união estável, divórcio, guarda de filhos, pensão alimentícia e reconhecimento de paternidade.',
          'O divórcio pode ser extrajudicial (em cartório, quando consensual e sem filhos menores) ou judicial. A partilha de bens segue o regime de bens adotado no casamento ou união estável.',
          'No Direito das Sucessões, atuamos no planejamento sucessório, inventário (judicial ou extrajudicial), testamento e doação. O planejamento sucessório é fundamental para evitar conflitos familiares e reduzir custos com impostos.'
        ],
        highlights: ['Divórcio consensual e litigioso', 'Guarda compartilhada', 'Pensão alimentícia', 'Planejamento sucessório']
      },
      {
        title: 'Obrigações e Títulos de Crédito',
        paragraphs: [
          'O Direito das Obrigações regula as relações jurídicas de crédito e débito entre particulares. Abrange contratos, pagamento, inadimplemento, arras, cláusula penal e extinção das obrigações.',
          'Títulos de crédito como nota promissória, cheque e duplicata são instrumentos de circulação de riqueza. A cobrança judicial ou extrajudicial de títulos inadimplidos é feita através da ação monitoria ou execução de título extrajudicial.',
          'A prescrição para cobrança de títulos de crédito varia conforme o título: 3 anos para a ação cambiária contra o emitente da nota promissória, 6 meses para o cheque (após o prazo de apresentação), e 3 anos para a duplicata.'
        ],
        highlights: ['Ação monitoria e execução', 'Títulos de crédito: nota promissória, cheque, duplicata', 'Prescrição de 3 a 5 anos', 'Cobrança extrajudicial eficiente']
      },
      {
        title: 'Propriedade e Vizinhança',
        paragraphs: [
          'O Direito de Propriedade assegura ao proprietário o direito de usar, gozar e dispor de seus bens. As limitações ao direito de propriedade incluem as regras de vizinhança, que regulam o uso anormal da propriedade, águas, limites entre prédios e passagem forçada.',
          'Conflitos de vizinhança são comuns e incluem: barulho excessivo, construção irregular, passagem de esgoto, águas pluviais, árvores limítrofes e muros divisórios. A solução pode ser amigável ou judicial.',
          'A ação possessória (reintegração de posse, manutenção de posse, interdito proibitório) protege o possuidor contra turbação ou esbulho. A prova da posse e do tempo de posse é essencial para o êxito da ação.'
        ],
        highlights: ['Direito de propriedade e limitações', 'Conflitos de vizinhança', 'Ações possessórias', 'Passagem forçada e direito de construir']
      }
    ],
    faqs: [
      { q: 'Qual o prazo para cobrar uma dívida?', r: 'O prazo prescricional varia conforme a natureza da dívida: 5 anos para dívidas civis em geral (CC, art. 205), 3 anos para reparação civil, 1 ano para seguradoras contra o segurado. Após a prescrição, a dívida continua existindo, mas não pode ser cobrada judicialmente.' },
      { q: 'Como funciona a usucapião?', r: 'A usucapião é a aquisição da propriedade pelo tempo de posse. Requer posse contínua, pacífica e com intenção de dono. O prazo varia de 5 a 15 anos conforme a modalidade. A ação é proposta no foro da situação do imóvel.' },
      { q: 'O que fazer em caso de acidente de trânsito?', r: 'Primeiro, garantir assistência às vítimas. Em seguida, registrar boletim de ocorrência, colher testemunhas, fotografar o local e buscar atendimento médico. O advogado avaliará a responsabilidade civil e o valor da indenização.' },
      { q: 'Qual a diferença entre divórcio consensual e litigioso?', r: 'No divórcio consensual, as partes concordam com todos os termos (partilha, guarda, pensão). Pode ser feito em cartório se não houver filhos menores. No litigioso, não há acordo e o juiz decide os termos.' }
    ]
  },
  consumidor: {
    areaNome: 'Consumidor',
    areaSlug: 'consumidor',
    icon: Heart,
    color: 'from-rose-600 to-pink-600',
    description: 'Defendemos os direitos dos consumidores contra abusos de empresas, planos de saúde, bancos e prestadores de serviços.',
    services: [
      {
        title: 'Direito do Consumidor — CDC',
        paragraphs: [
          'O Código de Defesa do Consumidor (Lei 8.078/90) é um dos mais avançados do mundo, estabelecendo direitos básicos como proteção da vida, saúde e segurança, educação para o consumo, informação adequada, proteção contra publicidade enganosa e reparação de danos.',
          'O CDC aplica-se a todas as relações de consumo: fornecimento de produtos e serviços por empresas a consumidores finais. A responsabilidade do fornecedor é objetiva (independente de culpa) na maioria dos casos, bastando a comprovação do dano e do nexo causal.',
          'São direitos básicos do consumidor: a proteção contra métodos comerciais coercitivos, a facilitação da defesa em juízo (inversão do ônus da prova), o acesso à justiça e a prevenção e reparação de danos patrimoniais e morais.'
        ],
        highlights: ['Responsabilidade objetiva do fornecedor', 'Inversão do ônus da prova', 'Prazo para reclamar: 30 dias (não duráveis) ou 90 dias (duráveis)', 'Direito ao arrependimento em 7 dias (compras fora do estabelecimento)']
      },
      {
        title: 'Produtos com Defeito',
        paragraphs: [
          'O fornecedor respobre pelos defeitos dos produtos independentemente de culpa. Produto com defeito de fabricação, montagem ou informação dá direito ao consumidor de exigir a substituição, restituição da quantia paga ou abatimento proporcional do preço.',
          'Para produtos não duráveis, o prazo para reclamar é de 30 dias. Para produtos duráveis, o prazo é de 90 dias. Estes prazos são contados a partir da entrega do produto ou do conhecimento do defeito.',
          'Produtos essenciais com defeito (como geladeira, fogão, máquina de lavar) geram direito à substituição imediata. O fornecedor tem prazo de 30 dias para sanar o defeito; se não o fizer, o consumidor pode exigir a substituição, restituição ou abatimento.'
        ],
        highlights: ['30 dias para produtos não duráveis', '90 dias para produtos duráveis', 'Substituição, restituição ou abatimento', 'Produtos essenciais têm prioridade']
      },
      {
        title: 'Planos de Saúde',
        paragraphs: [
          'Os planos de saúde são regulados pela Lei 9.656/98 e pela ANS. O consumidor tem direito à cobertura de todas as doenças listadas na CID, exceto as expressamente excluídas no contrato (com prazo de carência máximo de 180 dias para doenças preexistentes).',
          'As operadoras não podem: cancelar unilateralmente o contrato sem justa causa, negar cobertura para procedimentos de urgência/emergência, aplicar reajustes abusivos por faixa etária, ou limitar o tempo de internação.',
          'A negativa de cobertura é uma das situações mais comuns de abuso. Nesses casos, o consumidor pode buscar tutela de urgência na Justiça para garantir o tratamento, além de indenização por danos morais.',
          'O reajuste por sinistralidade (para planos coletivos) e o reajuste por faixa etária são frequentemente questionados judicialmente quando abusivos. A ANS estabelece limites e regras para esses reajustes.'
        ],
        highlights: ['Carência máxima de 180 dias (doenças preexistentes)', 'Cobertura para doenças da CID', 'Proibição de cancelamento unilateral injustificado', 'Tutela de urgência para negativa de cobertura']
      },
      {
        title: 'Serviços Bancários e Financeiros',
        paragraphs: [
          'As instituições financeiras estão sujeitas ao CDC, devendo fornecer informações claras sobre taxas, juros e encargos. São frequentes os abusos como cobrança de tarifas indevidas, juros excessivos, capitalização de juros (anatocismo) e venda casada de produtos.',
          'O consumidor tem direito à portabilidade bancária, à renegociação de dívidas e à informação prévia sobre todas as taxas. A ação revisional de contrato bancário pode questionar cláusulas abusivas, como taxas de juros acima da média de mercado.',
          'A repetição do indébito (devolução em dobro) é devida quando a cobrança indevida for comprovada, salvo engano justificável. A inversão do ônus da prova também se aplica nas relações bancárias com consumidores.'
        ],
        highlights: ['Portabilidade bancária', 'Ação revisional de contratos', 'Repetição do indébito em dobro', 'Proibição de venda casada']
      },
      {
        title: 'Telefonia, Internet e TV',
        paragraphs: [
          'Os serviços de telecomunicações são regulados pela Anatel e sujeitos ao CDC. O consumidor tem direito à qualidade adequada, continuidade do serviço, informação clara sobre planos e preços, e à reparação por danos causados por falhas na prestação.',
          'As principais reclamações incluem: cobrança por serviços não contratados, má qualidade do serviço de internet, descumprimento de ofertas, dificuldade de cancelamento e propaganda enganosa.',
          'O consumidor pode exigir o cancelamento imediato do serviço, o estorno de cobranças indevidas e a indenização por danos morais quando comprovado o abuso. A Anatel disponibiliza canais de reclamação que podem resolver extrajudicialmente.'
        ],
        highlights: ['Direito à qualidade e continuidade', 'Cancelamento imediato sem burocracia', 'Estorno de cobranças indevidas', 'Reclamação na Anatel e Procon']
      },
      {
        title: 'Compras Online e Direito de Arrependimento',
        paragraphs: [
          'Nas compras realizadas fora do estabelecimento comercial (internet, telefone, catálogo), o consumidor tem direito de arrependimento em 7 dias corridos, contados da data da compra ou do recebimento do produto, sem necessidade de justificativa.',
          'O fornecedor deve informar claramente o prazo de entrega, as condições de pagamento, as características do produto e as formas de contato. O descumprimento da oferta gera direito a exigir o cumprimento forçado ou a rescisão com perdas e danos.',
          'Produtos comprados online têm os mesmos direitos de garantia e proteção contra defeitos que as compras presenciais. O site deve disponibilizar o contrato e os termos de uso antes da finalização da compra.'
        ],
        highlights: ['Direito de arrependimento em 7 dias', 'Devolução integral do valor pago', 'Informação clara e prévia obrigatória', 'Mesma garantia das compras presenciais']
      }
    ],
    faqs: [
      { q: 'Qual o prazo para reclamar de um produto com defeito?', r: '30 dias para produtos não duráveis (alimentos, medicamentos) e 90 dias para produtos duráveis (eletrônicos, móveis), contados da entrega ou do conhecimento do defeito. A garantia legal se soma à garantia contratual.' },
      { q: 'O plano de saúde pode negar cobertura?', r: 'Não, exceto para procedimentos expressamente excluídos no contrato ou durante o prazo de carência. A negativa de cobertura para urgência/emergência ou doenças previstas na CID é abusiva e pode ser questionada judicialmente.' },
      { q: 'Como cancelar um serviço contratado?', r: 'O cancelamento deve ser imediato e sem burocracia. Se a empresa dificultar, registre reclamação no Procon, na Anatel (telefonia) ou na ouvidoria do banco. Guarde protocolos e gravações.' },
      { q: 'O que fazer em caso de cobrança indevida?', r: 'Exija a devolução em dobro do valor pago indevidamente, com correção monetária. Registre reclamação no Procon e, se necessário, ingresse com ação judicial. Guarde todos os comprovantes.' }
    ]
  },
  familia: {
    areaNome: 'Família',
    areaSlug: 'familia',
    icon: Heart,
    color: 'from-amber-600 to-orange-600',
    description: 'Atuamos em Direito de Família e Sucessões, com sensibilidade e expertise em divórcio, guarda, pensão alimentícia e planejamento sucessório.',
    services: [
      {
        title: 'Divórcio e Dissolução de União Estável',
        paragraphs: [
          'O divórcio é a dissolução do casamento civil, podendo ser consensual (quando há acordo entre as partes) ou litigioso (quando não há consenso). Desde a Emenda Constitucional 66/2010, não é mais necessária a separação prévia.',
          'O divórcio consensual sem filhos menores pode ser feito extrajudicialmente em cartório, com assistência de advogado. É mais rápido e econômico, resolvendo-se em poucos dias.',
          'No divórcio litigioso, o juiz decide sobre a partilha de bens, guarda dos filhos e pensão alimentícia. O processo pode ser demorado, mas é necessário quando não há acordo entre as partes.',
          'A união estável, reconhecida pela Constituição Federal (art. 226, §3º) e pelo Código Civil (arts. 1.723 a 1.727), tem os mesmos direitos do casamento quanto à partilha de bens e direitos sucessórios.'
        ],
        highlights: ['Divórcio consensual extrajudicial (cartório)', 'Divórcio litigioso judicial', 'Partilha de bens conforme regime', 'Reconhecimento e dissolução de união estável']
      },
      {
        title: 'Guarda de Filhos',
        paragraphs: [
          'A guarda dos filhos pode ser unilateral (um dos pais detém a guarda) ou compartilhada (ambos os pais exercem conjuntamente). A guarda compartilhada é a regra desde a Lei 13.058/2014, salvo quando um dos pais abrir mão ou não tiver condições.',
          'Na guarda compartilhada, as decisões importantes sobre a vida dos filhos (educação, saúde, moradia) são tomadas em conjunto. O tempo de convivência é dividido de forma equilibrada entre os pais.',
          'A guarda unilateral é determinada quando não há condições para a guarda compartilhada, geralmente atribuída ao genitor que demonstra melhores condições de exercê-la. O outro genitor tem direito a visitas e fiscalização.',
          'A alienação parental é grave violação dos direitos da criança, punida com advertência, multa ou até suspensão da autoridade parental. A Lei 12.318/2010 prevê medidas para coibir essa prática.'
        ],
        highlights: ['Guarda compartilhada é a regra', 'Guarda unilateral em caso de impossibilidade', 'Convivência equilibrada com ambos os pais', 'Combate à alienação parental']
      },
      {
        title: 'Pensão Alimentícia',
        paragraphs: [
          'A pensão alimentícia é devida entre parentes (pais e filhos, cônjuges, ex-cônjuges) que não têm condições de prover o próprio sustento. O valor é fixado com base no binômio necessidade-possibilidade: a necessidade de quem recebe e a possibilidade de quem paga.',
          'O valor é geralmente fixado em percentual sobre os rendimentos do alimentante (entre 15% e 30%, conforme o caso). Pode ser revista (revisional) ou extinta (exoneração) quando mudam as circunstâncias.',
          'O não pagamento da pensão pode levar à prisão civil do devedor (até 3 meses, em regime fechado). A execução de alimentos é um dos procedimentos mais céleres do direito brasileiro.',
          'A pensão para ex-cônjuges é temporária, destinada a permitir a readaptação do beneficiário ao mercado de trabalho. Já a pensão para filhos perdura até os 18 anos (ou 24 anos se cursando ensino superior).'
        ],
        highlights: ['Binômio necessidade-possibilidade', 'Percentual de 15% a 30% da renda', 'Prisão civil por inadimplemento', 'Ação revisional e de exoneração']
      },
      {
        title: 'Investigação e Reconhecimento de Paternidade',
        paragraphs: [
          'O reconhecimento de paternidade é o ato jurídico que estabelece o vínculo de filiação. Pode ser voluntário (em cartório) ou judicial (através de ação investigatória). O exame de DNA é o meio de prova mais utilizado.',
          'A ação de investigação de paternidade é imprescritível e pode ser proposta a qualquer tempo. O suposto pai pode ser citado para realizar o exame de DNA; a recusa gera presunção de paternidade.',
          'O reconhecimento da paternidade gera direitos: alimentos, herança, inclusão no nome e convivência familiar. Também é possível o reconhecimento socioafetivo, quando o vínculo afetivo substitui o biológico.',
          'A multiparentalidade, reconhecida pelo STF (RE 898.060), permite que a pessoa tenha mais de um pai ou mais de uma mãe registrados, considerando tanto o vínculo biológico quanto o afetivo.'
        ],
        highlights: ['Ação imprescritível', 'Exame de DNA como prova', 'Reconhecimento socioafetivo', 'Multiparentalidade (STF)']
      },
      {
        title: 'Inventário e Partilha de Bens',
        paragraphs: [
          'O inventário é o procedimento que apura os bens do falecido, paga as dívidas e divide o patrimônio entre os herdeiros. Pode ser judicial (quando há herdeiros incapazes ou testamento) ou extrajudicial (em cartório, quando todos são capazes e há acordo).',
          'Os herdeiros necessários são descendentes, ascendentes e o cônjuge, que têm direito a 50% do patrimônio (legítima). O testador pode dispor livremente dos outros 50% (parte disponível).',
          'O planejamento sucessório, através de testamento, doação ou holding familiar, permite organizar a transmissão do patrimônio, reduzir custos com impostos (ITCMD) e evitar conflitos entre herdeiros.',
          'O imposto de transmissão causa mortis (ITCMD) varia de 4% a 8% conforme o Estado. O planejamento sucessório pode reduzir significativamente essa carga tributária.'
        ],
        highlights: ['Inventário judicial e extrajudicial', 'Herdeiros necessários: 50% do patrimônio', 'Planejamento sucessório', 'Redução de ITCMD']
      },
      {
        title: 'Testamento e Doação',
        paragraphs: [
          'O testamento é o ato personalíssimo pelo qual o testador dispõe de seus bens para após a morte. Existem modalidades: público (em cartório, com 3 testemunhas), cerrado (escrito pelo testador e lacrado) e particular (escrito e assinado com 3 testemunhas).',
          'A doação é a transferência de bens em vida, podendo ser com cláusulas de usufruto, reversão ou incomunicabilidade. É uma forma de planejamento sucessório que antecipa a transmissão do patrimônio.',
          'Tanto o testamento quanto a doação devem respeitar a legítima dos herdeiros necessários. A doação inoficiosa (que excede a parte disponível) pode ser anulada pelos herdeiros.',
          'O testamento vital (diretivas antecipadas de vontade) não trata de bens, mas de cuidados médicos em caso de incapacidade. É instrumento importante para garantir a dignidade no fim da vida.'
        ],
        highlights: ['Testamento público, cerrado e particular', 'Doação com usufruto e cláusulas', 'Respeito à legítima dos herdeiros', 'Testamento vital (diretivas antecipadas)']
      }
    ],
    faqs: [
      { q: 'Quanto tempo leva um divórcio consensual?', r: 'O divórcio consensual extrajudicial (em cartório) pode ser resolvido em poucos dias. O judicial consensual leva de 1 a 3 meses. O litigioso pode levar de 6 meses a 2 anos, dependendo da complexidade.' },
      { q: 'Como é calculada a pensão alimentícia?', r: 'O juiz considera o binômio necessidade-possibilidade. Geralmente fixa-se entre 15% e 30% da renda do alimentante. O valor pode ser alterado se mudarem as circunstâncias (revisional) ou extinto (exoneração).' },
      { q: 'O que é guarda compartilhada?', r: 'É o modelo em que ambos os pais dividem as responsabilidades e decisões sobre a vida dos filhos. A convivência é equilibrada, podendo a criança ter residência fixa com um dos pais e passar períodos com o outro. É a regra desde 2014.' },
      { q: 'Preciso de advogado para fazer inventário?', r: 'Sim, o inventário exige assistência de advogado, tanto na via judicial quanto na extrajudicial (cartório). A única exceção é quando todos os herdeiros são maiores e capazes e há consenso sobre a partilha.' }
    ]
  },
  imobiliario: {
    areaNome: 'Imobiliário',
    areaSlug: 'imobiliario',
    icon: Building2,
    color: 'from-sky-600 to-cyan-600',
    description: 'Atuamos em Direito Imobiliário, compra e venda, locação, regularização de imóveis e condomínios.',
    services: [
      {
        title: 'Compra e Venda de Imóveis',
        paragraphs: [
          'A compra e venda de imóveis é regida pelo Código Civil e pela Lei de Registros Públicos. O contrato de compra e venda deve conter: qualificação das partes, descrição do imóvel, preço, forma de pagamento, prazo de entrega e penalidades.',
          'É essencial realizar a due diligence imobiliária antes da compra: verificar a documentação do vendedor, a matrícula do imóvel no cartório de registro de imóveis, certidões negativas de débitos, e a inexistência de ônus ou ações reipersecutórias.',
          'O ITBI (Imposto de Transmissão de Bens Imóveis) é devido ao município, geralmente de 2% a 3% do valor do imóvel. A base de cálculo é o valor venal, mas o município pode arbitrar valor diverso.',
          'A escritura pública é obrigatória para imóveis acima de 30 salários mínimos (Lei 7.433/85), lavrada em cartório de notas. O registro da escritura no cartório de imóveis é o ato que transfere a propriedade.'
        ],
        highlights: ['Due diligence imobiliária', 'ITBI: 2% a 3% do valor', 'Escritura pública obrigatória', 'Registro transfere a propriedade']
      },
      {
        title: 'Locação de Imóveis',
        paragraphs: [
          'A locação de imóveis é regida pela Lei do Inquilinato (Lei 8.245/91). O contrato de locação pode ser por prazo determinado (mínimo de 30 meses para garantia de retomada) ou indeterminado.',
          'O locador é responsável por: entregar o imóvel em condições de uso, realizar reparos estruturais, responder por vícios redibitórios e garantir o uso pacífico do imóvel. O locatário deve: pagar o aluguel em dia, realizar reparos de pequeno porte e devolver o imóvel no estado recebido.',
          'O reajuste do aluguel é annual, geralmente pelo IGP-M ou IPCA. A ação renovatória de contrato comercial garante ao empresário a renovação do contrato por igual período, desde que preenchidos os requisitos legais.',
          'A ação de despejo é o instrumento judicial para retomada do imóvel em casos de inadimplemento, término do contrato ou necessidade de uso pelo locador. O prazo para desocupação varia conforme a causa.'
        ],
        highlights: ['Lei do Inquilinato (Lei 8.245/91)', 'Reajuste anual pelo IGP-M ou IPCA', 'Ação renovatória (locação comercial)', 'Ação de despejo']
      },
      {
        title: 'Regularização de Imóveis',
        paragraphs: [
          'A regularização de imóveis envolve a obtenção de documentos e registros necessários para tornar o imóvel regular perante os órgãos públicos. Inclui a regularização fundiária, o desmembramento, o desdobro, a unificação de lotes e a averbação de construções.',
          'A regularização fundiária urbana (Reurb), regida pela Lei 13.465/2017, permite regularizar núcleos urbanos informais. Tem duas modalidades: Reurb-S (interesse social) e Reurb-E (interesse específico).',
          'A usucapião extrajudicial (Lei 13.465/2017) pode ser feita em cartório, sem necessidade de ação judicial, quando há acordo entre as partes e inexistência de litígio. Requer assistência de advogado.',
          'A averbação de construção no registro de imóveis é essencial para comprovar a área construída, obter financiamento e vender o imóvel. Exige o habite-se da prefeitura e a ART do engenheiro responsável.'
        ],
        highlights: ['Reurb — Regularização Fundiária Urbana', 'Usucapião extrajudicial em cartório', 'Averbação de construção', 'Desmembramento e desdobro de lotes']
      },
      {
        title: 'Direitos do Promitente Comprador',
        paragraphs: [
          'O promitente comprador (comprador de imóvel na planta ou em financiamento) tem direitos protegidos por lei. O contrato de promessa de compra e venda gera direito real à aquisição do imóvel, oponível contra terceiros, desde que registrado no cartório.',
          'Em caso de atraso na obra, o comprador pode: exigir o cumprimento do contrato com multa, rescindir o contrato com devolução integral dos valores pagos, ou ingressar com ação de perdas e danos.',
          'A distrato imobiliário (desistência da compra) é um dos temas mais controversos. A jurisprudência consolidada do STJ (REsp 1.551.951) garante a devolução de 75% a 90% dos valores pagos, com correção monetária, dependendo do caso.',
          'Na compra de imóvel na planta, o incorporador deve registrar o memorial de incorporação no cartório, fornecer o prospecto com informações completas e iniciar as obras no prazo estipulado.'
        ],
        highlights: ['Contrato de promessa de compra e venda', 'Atraso na obra: multa, rescisão ou perdas e danos', 'Distrato: devolução de 75% a 90%', 'Proteção do incorporador']
      },
      {
        title: 'Condomínios e Taxas',
        paragraphs: [
          'O condomínio edilício é regido pelo Código Civil (arts. 1.331 a 1.358) e pelo Código de Processo Civil. A convenção de condomínio e o regimento interno estabelecem as regras de convivência, rateio de despesas e uso das áreas comuns.',
          'A taxa condominial é obrigatória, independentemente do uso do imóvel. O inadimplemento gera ações de cobrança com juros, multa (até 2%) e correção monetária. A dívida condominial tem privilégio sobre o imóvel.',
          'O condômino pode questionar assembleias irregulares, rateios abusivos e obras desnecessárias. A ação anulatória de assembleia deve ser proposta no prazo de 60 dias (CC, art. 1.358, § único).',
          'As obras essenciais (como impermeabilização, estrutura, segurança) independem de aprovação em assembleia. Já as obras úteis e voluptuárias exigem quórum qualificado.'
        ],
        highlights: ['Convenção e regimento interno', 'Taxa condominial é obrigatória', 'Ação anulatória de assembleia: 60 dias', 'Obras essenciais independem de aprovação']
      },
      {
        title: 'Incorporação Imobiliária e Patrimônio de Afetação',
        paragraphs: [
          'A incorporação imobiliária (Lei 4.591/64) é a atividade de construir ou promover a construção de edificações para venda de unidades autônomas. O incorporador deve registrar o memorial de incorporação antes de anunciar ou comercializar as unidades.',
          'O patrimônio de afetação (Lei 10.931/2004) separa o patrimônio do incorporador do empreendimento, protegendo os compradores em caso de falência ou insolvência. Quando instituído, os recursos são destinados exclusivamente à obra.',
          'O contrato de incorporação deve conter: descrição do imóvel, prazo de entrega, características do empreendimento, forma de pagamento e penalidades. O atraso na entrega gera multa e indenização por lucros cessantes (aluguel do comprador).',
          'A Comissão de Corretagem (Sati) e a taxa de assessoria técnico-imobiliária (SATI) devem ser informadas previamente no contrato. A cobrança dessas taxas após a assinatura é considerada prática abusiva.'
        ],
        highlights: ['Incorporação: registro prévio obrigatório', 'Patrimônio de afetação protege compradores', 'Atraso na entrega gera multa e lucros cessantes', 'Taxas devem ser informadas previamente']
      }
    ],
    faqs: [
      { q: 'Quais os documentos necessários para comprar um imóvel?', r: 'Documentos pessoais (RG, CPF, comprovante de renda), certidão de casamento ou escritura de união estável, e do imóvel: matrícula atualizada, certidões negativas do vendedor, IPTU, e habite-se. Recomenda-se due diligence completa.' },
      { q: 'Como funciona o distrato imobiliário?', r: 'Quando o comprador desiste da compra de imóvel na planta, tem direito à devolução dos valores pagos, com correção monetária. O STJ consolidou a devolução de 75% a 90% dos valores, dependendo do estágio da obra e da culpa pelo distrato.' },
      { q: 'O que é usucapião extrajudicial?', r: 'É a regularização da propriedade diretamente em cartório, sem processo judicial. Exige: posse mansa e pacífica pelo prazo legal, assistência de advogado, concordância do proprietário registral e inexistência de litígio sobre o imóvel.' },
      { q: 'Como cobrar aluguel atrasado?', r: 'Inicialmente, notificação extrajudicial. Se não houver pagamento, ação de despejo por inadimplemento cumulada com cobrança dos aluguéis e encargos. O fiador ou a garantia locatícia podem ser acionados.' }
    ]
  }
}

/* ═══════════════════════════════════════════════
   CONTENT VARIATIONS BY CITY ATTRIBUTES
   ═══════════════════════════════════════════════ */
function getCityContent(cidade: Cidade, area: string): { introVariation: string; stats: { icon: any; value: string; label: string }[] } {
  const baseStats = {
    previdenciario: [
      { icon: Award, value: '15+', label: 'Anos de Experiência' },
      { icon: Users, value: '5.000+', label: 'Clientes Atendidos' },
      { icon: BadgeCheck, value: '98%', label: 'Benefícios Concedidos' },
      { icon: MapPin, value: '330+', label: 'Cidades Atendidas' },
    ],
    trabalhista: [
      { icon: Briefcase, value: '10+', label: 'Anos de Atuação' },
      { icon: FileText, value: '800+', label: 'Casos Trabalhistas' },
      { icon: Star, value: '95%', label: 'Satisfação' },
      { icon: MapPin, value: '330+', label: 'Cidades Atendidas' },
    ],
    consumidor: [
      { icon: Heart, value: '2.000+', label: 'Consumidores Defendidos' },
      { icon: Gavel, value: '92%', label: 'Casos Ganhos' },
      { icon: Shield, value: 'R$ 15M+', label: 'Recuperados' },
      { icon: MapPin, value: '330+', label: 'Cidades Atendidas' },
    ],
    familia: [
      { icon: Heart, value: '12+', label: 'Anos de Atuação' },
      { icon: Users, value: '1.500+', label: 'Famílias Atendidas' },
      { icon: Star, value: '97%', label: 'Satisfação' },
      { icon: MapPin, value: '330+', label: 'Cidades Atendidas' },
    ],
    imobiliario: [
      { icon: Building2, value: '10+', label: 'Anos de Atuação' },
      { icon: FileText, value: '1.200+', label: 'Contratos Analisados' },
      { icon: Shield, value: '98%', label: 'Segurança Jurídica' },
      { icon: MapPin, value: '330+', label: 'Cidades Atendidas' },
    ],
    civel: [
      { icon: Scale, value: '15+', label: 'Anos de Atuação' },
      { icon: FileText, value: '3.000+', label: 'Casos Atendidos' },
      { icon: Star, value: '96%', label: 'Satisfação' },
      { icon: MapPin, value: '330+', label: 'Cidades Atendidas' },
    ],
  }

  // Intro variations by city porte
  const porteIntros: Record<string, Record<string, string>> = {
    grande: {
      previdenciario: `Como um dos principais centros urbanos do ${cidade.estado}, ${cidade.nome} possui uma população economicamente ativa numerosa e diversificada. Nossa atuação previdenciária abrange desde o planejamento de aposentadoria para profissionais de diferentes setores até a concessão de benefícios assistenciais para a população mais vulnerável.`,
      trabalhista: `${cidade.nome} é um importante polo econômico com milhares de trabalhadores formais e informais. Nossa atuação trabalhista visa proteger os direitos dos trabalhadores e orientar empresas nas complexas relações de trabalho.`,
      consumidor: `Em uma cidade do porte de ${cidade.nome}, as relações de consumo são intensas e diversificadas. Milhares de consumidores enfrentam diariamente problemas com planos de saúde, bancos, telefonia e produtos defeituosos.`,
      familia: `${cidade.nome} reúne uma comunidade diversa de famílias com diferentes configurações e necessidades jurídicas. Nosso escritório oferece suporte completo em questões de Direito de Família e Sucessões.`,
      imobiliario: `O mercado imobiliário de ${cidade.nome} é dinâmico e aquecido, com centenas de transações mensais. Nossa assessoria jurídica garante segurança em compras, vendas, locações e regularizações.`,
      civel: `${cidade.nome} possui um dos maiores volumes de negócios e relações civis do estado. Nossa equipe oferece assessoria completa em contratos, indenizações e demais questões do direito civil.`,
    },
    medio: {
      previdenciario: `${cidade.nome} é uma cidade em pleno crescimento, com uma população que busca cada vez mais seus direitos previdenciários. Atuamos de forma próxima e personalizada para garantir o melhor benefício a cada cliente.`,
      trabalhista: `Em ${cidade.nome}, acompanhamos de perto as relações de trabalho locais, oferecendo assessoria jurídica trabalhista tanto para trabalhadores quanto para empresas da região.`,
      consumidor: `Os consumidores de ${cidade.nome} merecem respeito e proteção em suas relações de consumo. Defendemos seus direitos contra abusos de empresas de todos os portes.`,
      familia: `Cada família de ${cidade.nome} tem sua história e suas necessidades específicas. Oferecemos um atendimento humanizado e personalizado em todas as questões de Direito de Família.`,
      imobiliario: `${cidade.nome} vive um momento de expansão imobiliária, com novos empreendimentos e transações imobiliárias crescentes. Nossa assessoria garante negócios seguros.`,
      civel: `Em ${cidade.nome}, oferecemos assessoria civil completa, desde contratos comerciais até ações de indenização, sempre com proximidade e atenção personalizada.`,
    },
    pequeno: {
      previdenciario: `Em ${cidade.nome}, conhecemos de perto as necessidades da comunidade. Oferecemos assessoria previdenciária completa, do planejamento à concessão de benefícios.`,
      trabalhista: `As relações de trabalho em ${cidade.nome} merecem atenção especializada. Defendemos os direitos dos trabalhadores e orientamos empresas locais.`,
      consumidor: `Os consumidores de ${cidade.nome} contam com nossa defesa especializada contra abusos e práticas lesivas. Atendimento próximo e eficiente.`,
      familia: `Em ${cidade.nome}, cada caso é tratado com a sensibilidade e atenção que as questões familiares merecem. Assessoria completa em divórcio, guarda e pensão.`,
      imobiliario: `Acompanhamos de perto o mercado imobiliário de ${cidade.nome}, oferecendo segurança jurídica em compras, vendas e regularizações.`,
      civel: `Oferecemos assessoria civil completa em ${cidade.nome}, com atendimento personalizado e conhecimento da realidade local.`,
    },
  }

  const areaStats = baseStats[area as keyof typeof baseStats] || baseStats.previdenciario
  const porteKey = cidade.porte || 'medio'
  const intro = porteIntros[porteKey]?.[area] || `Atendemos em ${cidade.nome} com excelência em Direito ${areas[area]?.areaNome || 'Jurídico'}.`

  return { introVariation: intro, stats: areaStats }
}

/* ═══════════════════════════════════════════════
   SCHEMA BUILDER
   ═══════════════════════════════════════════════ */
function buildLegalServiceSchema(area: string, cidade: Cidade, areaNome: string) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `Will & Pereira Advocacia - Advogado ${areaNome} em ${cidade.nome}/${cidade.uf}`,
    description: `Advocacia especializada em Direito ${areaNome} em ${cidade.nome}, ${cidade.estado}. Atendimento presencial e online.`,
    url: `https://willepereira-adv.vercel.app/servico/${area}/cidade/${cidade.slug}`,
    telephone: '+554899999999',
    areaServed: {
      '@type': 'City',
      name: cidade.nome,
      sameAs: `https://pt.wikipedia.org/wiki/${cidade.nome.replace(/ /g, '_')}`
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: cidade.nome,
      addressRegion: cidade.uf,
      addressCountry: 'BR'
    },
    priceRange: '$$',
    image: 'https://willepereira-adv.vercel.app/og-image.jpg',
    sameAs: [
      'https://www.instagram.com/willepereiraadv/',
      'https://www.facebook.com/willepereiraadv'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Serviços de Direito ${areaNome}`,
      itemListElement: areas[area]?.services.map((s, i) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.highlights.join('. ')
        },
        position: i + 1
      })) || []
    }
  }
  return JSON.stringify(schema, null, 2)
}

/* ═══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════ */
export default function ServicoCidadePage() {
  const { area, slug } = useParams<{ area: string; slug: string }>()
  const cidade = slug ? getCidadeBySlug(slug) : undefined
  const areaConfig = area ? areas[area] : undefined

  // 404 if city or area not found
  const notFound = !cidade || !areaConfig

  // City-dependent content
  const cityContent = cidade && area ? getCityContent(cidade, area) : null

  // SEO
  const pageTitle = cidade && areaConfig
    ? `Advogado ${areaConfig.areaNome} em ${cidade.nome} | Will & Pereira Advocacia`
    : 'Página Não Encontrada | Will & Pereira Advocacia'
  const pageDescription = cidade && areaConfig
    ? `Advocacia especializada em Direito ${areaConfig.areaNome} em ${cidade.nome}/${cidade.uf}. ${areaConfig.description.substring(0, 100)} Agende uma consulta.`
    : 'Página não encontrada.'

  useSEO(pageTitle, pageDescription)

  // Dados locais
  const dadosLocais = cidade ? getDadosLocais(cidade.nome) : undefined

  // FAQ accordion
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  // Hero ref for parallax
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 150])

  // Particles
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 5,
    })), []
  )

  // ===== 404 Page =====
  if (notFound) {
    return (
      <div>
        <SEO title="Página Não Encontrada" description="Página não encontrada." />
        <section className="relative pt-32 pb-24 min-h-screen flex items-center bg-navy overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a2634_0%,_#0f1729_100%)]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block px-4 py-1.5 bg-gold/15 text-gold text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-6">
                {!areaConfig && !cidade ? 'Serviço e Cidade' : !areaConfig ? 'Serviço' : 'Cidade'}
              </span>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
                Página{' '}
                <span className="text-gradient-gold">Não Encontrada</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
                {!areaConfig && !cidade
                  ? 'O serviço jurídico e a cidade informados não foram encontrados.'
                  : !areaConfig
                    ? `O serviço "${area}" não foi encontrado. Verifique se a área de atuação está correta.`
                    : `A cidade "${slug}" não foi encontrada em nossa base de dados.`
                }
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/" className="btn-primary text-base px-8 py-4">
                  <ChevronLeft size={18} /> Voltar ao Início
                </Link>
                <Link to="/contato" className="btn-outline btn-outline-light text-base px-8 py-4">
                  Fale Conosco
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    )
  }

  // TypeScript narrow
  if (!cidade || !areaConfig || !cityContent) return null

  const Icon = areaConfig.icon
  const cidadeAdjective = cidade.tipoLocal === 'capital' ? 'na capital' : cidade.tipoLocal === 'litoral' ? 'no litoral' : 'em'
  const canonical = `https://willepereira-adv.vercel.app/servico/${area}/cidade/${slug}`

  return (
    <div>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={canonical}
      />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildLegalServiceSchema(area!, cidade, areaConfig.areaNome) }}
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[650px] max-h-[1000px] flex items-center overflow-hidden bg-navy-dark">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-dark" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c9a84c\' fill-opacity=\'1\'%3E%3Cpath d=\'M40 0L0 40l40 40L80 40z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gold/3 rounded-full blur-[100px]" />

        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-gold/20 rounded-full"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 w-full">
          <div className="container-premium">
            <div className="max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <div className="flex items-center gap-3 text-gold/80 text-sm font-medium mb-8 tracking-wide">
                  <MapPin size={16} />
                  <span className="uppercase tracking-[0.15em]">{cidade.nome}, {cidade.uf}</span>
                  <span className="w-8 h-px bg-gold/40" />
                  <span className="text-gold/60 text-xs">{cidade.regiao === 'sul' ? 'Região Sul' : cidade.regiao === 'sudeste' ? 'Região Sudeste' : cidade.regiao === 'centro-oeste' ? 'Região Centro-Oeste' : cidade.regiao === 'nordeste' ? 'Região Nordeste' : 'Região Norte'}</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-8"
              >
                Advogado{' '}
                <span className="text-gradient-gold">{areaConfig.areaNome}</span>
                <br />
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">em {cidade.nome}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-10"
              >
                {areaConfig.description}
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
                <a href="#servicos" className="btn-outline btn-outline-light text-base px-8 py-4">
                  Ver Serviços
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
                <span>Especialistas</span>
                <span className="w-px h-4 bg-white/10" />
                <span>Presencial e Online</span>
                <span className="w-px h-4 bg-white/10" />
                <span>Resultados Reais</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

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
              <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold-dark text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-5">
                Advogado {areaConfig.areaNome} em {cidade.nome}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-navy leading-tight mb-6">
                Direito{' '}
                <span className="text-gradient-gold">{areaConfig.areaNome}</span>
                <br />
                em {cidade.nome}
              </h2>
              <div className="gold-divider mb-6" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  A <strong>Will & Pereira Advocacia</strong> oferece assessoria jurídica especializada 
                  em <strong>Direito {areaConfig.areaNome}</strong> para clientes em <strong>{cidade.nome}</strong> 
                  e região. Nossa equipe de advogados experientes está preparada para atender 
                  suas necessidades com excelência, ética e dedicação.
                </p>
                <p>
                  {cityContent.introVariation}
                </p>
                <p>
                  Seja qual for sua necessidade jurídica na área de Direito {areaConfig.areaNome}, 
                  conte com nossa expertise para encontrar a melhor solução. Atendemos tanto 
                  presencialmente em nosso escritório quanto de forma online, garantindo 
                  comodidade e segurança jurídica para todos os clientes.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-cream">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-navy/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Icon className="w-20 h-20 text-gold/20 mx-auto mb-4" />
                      <p className="text-gray-300 text-sm">Advocacia especializada em {cidade.nome}</p>
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
                  <p className="text-sm font-medium">Expertise em Direito {areaConfig.areaNome}</p>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {cityContent.stats.map((stat, i) => {
              const StatIcon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <StatIcon className="w-6 h-6 text-gold" />
                  </div>
                  <div className="text-3xl md:text-4xl font-display text-gradient-gold">
                    {stat.value}
                  </div>
                  <div className="text-navy-light text-xs mt-2 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVIÇOS ═══════════════ */}
      <section id="servicos" className="section-padding">
        <div className="container-premium">
          <SectionHeading
            label="Nossos Serviços"
            title={`Direito ${areaConfig.areaNome} em ${cidade.nome}`}
            subtitle={`Conheça todos os serviços que oferecemos na área de Direito ${areaConfig.areaNome}. Cada caso é analisado individualmente por nossa equipe especializada.`}
          />

          <div className="space-y-24">
            {areaConfig.services.map((servico, idx) => {
              const ServiceIcon = areaConfig.icon
              return (
                <motion.div
                  key={servico.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Left panel - sticky card */}
                    <div className="lg:col-span-2">
                      <div className="sticky top-24 rounded-2xl p-8 border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <div className="w-16 h-16 rounded-xl bg-navy/5 flex items-center justify-center mb-5">
                          <ServiceIcon className="w-8 h-8 text-navy" />
                        </div>
                        <h3 className="font-serif text-2xl md:text-3xl text-navy mb-4">{servico.title}</h3>
                        <div className="space-y-2 mb-6">
                          {servico.highlights.map(h => (
                            <div key={h} className="flex items-start gap-2">
                              <BadgeCheck size={15} className="text-gold mt-0.5 shrink-0" />
                              <span className="text-xs text-navy/70">{h}</span>
                            </div>
                          ))}
                        </div>
                        <Link
                          to="/contato"
                          className="inline-flex items-center gap-2 px-6 py-2.5 bg-navy text-white text-sm rounded-full hover:bg-navy-light transition-all duration-300"
                        >
                          Analisar Meu Caso <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>

                    {/* Right panel - content */}
                    <div className="lg:col-span-3 space-y-6">
                      {servico.paragraphs.map((paragraph, pi) => (
                        <p key={pi} className="text-gray-600 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                      <div className="pt-2">
                        <Link
                          to="/contato"
                          className="inline-flex items-center gap-1 text-sm font-medium text-gold-dark hover:text-gold transition-colors"
                        >
                          Saiba mais sobre {servico.title.toLowerCase()} <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {idx < areaConfig.services.length - 1 && (
                    <div className="mt-16 border-t border-gray-100" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ DADOS LOCAIS ═══════════════ */}
      {dadosLocais && (
        <section className="section-padding bg-cream">
          <div className="container-premium">
            <SectionHeading
              label="Informações Locais"
              title={`Justiça em ${cidade.nome}`}
              subtitle={`Principais órgãos judiciais e informações relevantes para sua cidade.`}
            />
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-lg shadow-navy/5">
                <div className="grid gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center shrink-0">
                      <Landmark className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">Comarca de {dadosLocais.comarca}</h4>
                      {dadosLocais.foro && <p className="text-sm text-gray-500">{dadosLocais.foro}</p>}
                      {dadosLocais.forum && <p className="text-sm text-gray-500">{dadosLocais.forum}</p>}
                    </div>
                  </div>
                  {dadosLocais.varaTrabalho && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center shrink-0">
                        <Gavel className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy mb-1">Justiça do Trabalho</h4>
                        <p className="text-sm text-gray-500">{dadosLocais.varaTrabalho}</p>
                      </div>
                    </div>
                  )}
                  {dadosLocais.justicaFederal && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy mb-1">Justiça Federal</h4>
                        <p className="text-sm text-gray-500">{dadosLocais.justicaFederal}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ POR QUE CONTRATAR ═══════════════ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="relative z-10 container-premium">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 bg-gold/15 text-gold text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-5">
                Por Que Contratar um Advogado Especializado
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-6">
                Defesa Técnica e<br />
                <span className="text-gradient-gold">Estratégica</span>
              </h2>
              <div className="w-16 h-px bg-gold/50 mb-6" />
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  O Direito {areaConfig.areaNome} é uma área complexa que exige conhecimento 
                  aprofundado da legislação, jurisprudência e procedimentos. Um advogado 
                  especializado é fundamental para garantir a melhor estratégia para o seu caso.
                </p>
                <p>
                  Na Will & Pereira Advocacia, cada caso é tratado com a atenção e o cuidado 
                  que ele merece. Nossa equipe realiza uma análise criteriosa da situação, 
                  identifica a melhor solução jurídica e acompanha cada etapa do processo.
                </p>
                <p>
                  Atendemos clientes em {cidade.nome} e em todo o Brasil, tanto presencialmente 
                  quanto por meio de consultas online. Nossa prioridade é oferecer um serviço 
                  jurídico de excelência, com transparência, ética e resultados efetivos.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-xl">
                  <h3 className="font-serif text-2xl text-navy mb-6">Nossa Atuação em {cidade.nome}</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Search, text: 'Análise criteriosa de cada caso com fundamentação legal' },
                      { icon: Shield, text: 'Estratégia processual personalizada e transparente' },
                      { icon: Heart, text: 'Atendimento humanizado com comunicação clara' },
                      { icon: Star, text: 'Acompanhamento integral até a solução do caso' },
                      { icon: MapPin, text: `Presença ativa em ${cidade.nome} e região` },
                      { icon: Globe, text: 'Atendimento online para todo o Brasil' },
                    ].map(item => (
                      <div key={item.text} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center shrink-0">
                          <item.icon size={16} className="text-gold" />
                        </div>
                        <p className="text-sm text-gray-600">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ IMPORTÂNCIA ═══════════════ */}
      <section className="section-padding bg-cream">
        <div className="container-premium">
          <SectionHeading
            label="Por Que é Essencial"
            title={`A Importância do Direito ${areaConfig.areaNome}`}
            subtitle={`Entenda por que contar com um advogado especializado em Direito ${areaConfig.areaNome} faz toda a diferença no resultado do seu caso.`}
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Search,
                title: 'Análise Técnica Aprofundada',
                desc: `Cada caso de Direito ${areaConfig.areaNome} possui particularidades que exigem análise técnica detalhada. Identificamos a melhor estratégia para cada situação.`
              },
              {
                icon: FileText,
                title: 'Documentação e Provas',
                desc: 'A preparação correta da documentação e a produção de provas adequadas são fundamentais para o sucesso do seu caso. Nossa equipe cuida de cada detalhe.'
              },
              {
                icon: Gavel,
                title: 'Atuação Judicial e Administrativa',
                desc: `Atuamos tanto na esfera administrativa quanto judicial, garantindo a defesa dos seus direitos em todas as instâncias.`
              },
              {
                icon: Clock,
                title: 'Agilidade e Eficiência',
                desc: 'Com conhecimento técnico e experiência, otimizamos prazos e procedimentos para alcançar resultados mais rápidos e eficientes para nossos clientes.'
              },
              {
                icon: Shield,
                title: 'Segurança Jurídica',
                desc: 'Todo ato jurídico é praticado com observância das normas legais e da jurisprudência consolidada, garantindo segurança e previsibilidade.'
              },
              {
                icon: Heart,
                title: 'Atendimento Humanizado',
                desc: 'Sabemos que cada caso envolve pessoas e histórias. Oferecemos atendimento acolhedor, com linguagem clara e suporte emocional adequado.'
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
            title={`Direito ${areaConfig.areaNome} em ${cidade.nome}`}
            subtitle={`Esclareça as principais dúvidas sobre Direito ${areaConfig.areaNome} e nossos serviços em ${cidade.nome}.`}
          />

          <div className="space-y-3">
            {areaConfig.faqs.map((item, idx) => (
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
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
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

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        
        <div className="relative z-10 container-premium text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-gold/15 text-gold text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-5">
              Estamos Prontos para Ajudar
            </span>
            <h2 className="text-3xl md:text-5xl text-white leading-tight mb-6">
              Advogado {areaConfig.areaNome} em {cidade.nome}<br />
              <span className="text-gradient-gold">Sua Causa Merece um Especialista</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Não arrisque seus direitos. Conte com quem entende profundamente 
              de Direito {areaConfig.areaNome} e está comprometido com a melhor 
              solução para o seu caso em {cidade.nome} e região.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contato" className="btn-primary text-base px-8 py-4">
                <Phone size={18} /> Agende uma Conversa
              </Link>
              <a href="tel:+554899999999" className="btn-outline btn-outline-light text-base px-8 py-4">
                (48) 99999-9999
              </a>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              Atendimento em {cidade.nome} e em todo o Brasil • Presencial e Online
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
