import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  Scale, Shield, Heart, Clock, Users, FileText, Award,
  ArrowRight, CheckCircle, Phone, BookOpen,
  MapPin, Star, Quote, Gavel, Briefcase, Landmark,
  Calendar, TrendingUp, AlertCircle, RefreshCw,
  ChevronDown, ChevronRight, UserCheck, Baby, Lock,
  Activity, HelpCircle, Sparkles, BadgeCheck, Search,
  Bookmark, Layers, DollarSign, GitBranch
} from 'lucide-react'

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

/* ===== BENEFITS DATA ===== */
interface BenefitItem {
  icon: any
  title: string
  shortTitle: string
  summary: string
  content: string[]
  requirements: string[]
  highlights: string[]
  gradient: string
  iconBg: string
  borderColor: string
}

const beneficios: BenefitItem[] = [
  {
    icon: Calendar,
    title: 'Aposentadoria por Idade',
    shortTitle: 'Por Idade',
    summary: 'Benefício concedido ao trabalhador que atinge a idade mínima exigida por lei, cumprindo também o período de carência necessário.',
    content: [
      'A aposentadoria por idade é um dos benefícios mais solicitados junto ao INSS e passou por mudanças significativas com a Reforma da Previdência (EC 103/2019). Antes da reforma, os requisitos eram de 60 anos para mulheres e 65 para homens, com 180 contribuições. Após a reforma, foram estabelecidas regras de transição para quem já estava no mercado de trabalho.',
      'Para os homens, a idade mínima permaneceu em 65 anos. Para as mulheres, a idade passou a ser de 62 anos a partir de 2023, com direito ao benefício integral apenas com tempo superior de contribuição. A carência mínima exigida é de 180 contribuições mensais (15 anos), mas o valor do benefício é calculado com base na média de todos os salários de contribuição desde julho de 1994.',
      'Uma particularidade importante é a aposentadoria por idade rural, concedida aos trabalhadores do campo com idade reduzida em 5 anos (60 para homem, 55 para mulher), desde que comprovem o exercício de atividade rural no período de carência exigido. O trabalhador rural pode comprovar o tempo de serviço com documentos como contratos de arrendamento, notas de produtor, declaração do sindicato, entre outros.',
      'A análise do pedido de aposentadoria por idade requer atenção aos detalhes: o histórico de contribuições, os períodos de trabalho sem registro, as possíveis irregularidades no CNIS e a escolha da regra mais vantajosa entre o direito adquirido antes da reforma e as regras de transição aplicáveis. Cada caso deve ser cuidadosamente estudado para garantir o melhor benefício possível.'
    ],
    requirements: [
      '65 anos (homens) ou 62 anos (mulheres) — idade urbana',
      '60 anos (homens) ou 55 anos (mulheres) — idade rural',
      '180 contribuições mensais (15 anos) de carência',
      'Cálculo: 60% da média salarial + 2% por ano adicional de contribuição que exceder 20 anos (homens) ou 15 anos (mulheres)',
      'Possibilidade de regras de transição para quem já contribuía antes da EC 103/2019'
    ],
    highlights: [
      'Benefício mais requerido do INSS',
      'Regras diferenciadas para trabalhadores rurais',
      'Possibilidade de descarte de contribuições que reduzam o valor',
      'Direito ao benefício integral com maior tempo de contribuição'
    ],
    gradient: 'linear-gradient(135deg, #2563eb, #4f46e5)',
    iconBg: 'bg-blue-500/10',
    borderColor: 'border-blue-200'
  },
  {
    icon: TrendingUp,
    title: 'Aposentadoria por Tempo de Contribuição',
    shortTitle: 'Por Contribuição',
    summary: 'Destinada ao segurado que completa o tempo mínimo de contribuição exigido, independentemente da idade, com regras específicas pós-reforma.',
    content: [
      'A aposentadoria por tempo de contribuição foi profundamente impactada pela Reforma da Previdência de 2019. Antes da EC 103/2019, o benefício era concedido com 35 anos de contribuição para homens e 30 para mulheres, sem exigência de idade mínima. Após a reforma, essa modalidade foi extinta para novos segurados, mas mantida através de regras de transição para quem já contribuía.',
      'As principais regras de transição incluem: a regra dos pontos (soma da idade com tempo de contribuição), a regra da idade mínima progressiva, a regra do pedágio de 50% (para quem estava a menos de 2 anos de se aposentar), e a regra do pedágio de 100%. Cada uma possui requisitos específicos e formas de cálculo distintas.',
      'A regra dos pontos exige, em 2026, 101 pontos para homens (idade + 35 anos de contribuição) e 91 pontos para mulheres (idade + 30 anos de contribuição), com aumento progressivo de 1 ponto por ano até o limite de 105/100. Já a idade mínima progressiva parte de 56 anos para mulheres e 61 para homens, com acréscimo de 6 meses por ano até atingir 62/65 anos.',
      'O planejamento previdenciário é essencial neste contexto. A escolha entre as diferentes regras de transição — ou entre o direito adquirido com base na legislação anterior — pode representar uma diferença significativa no valor do benefício. É fundamental analisar o histórico contributivo completo, incluindo períodos especiais, tempo rural, tempo de serviço militar e outras peculiaridades que podem antecipar ou majorar o benefício.'
    ],
    requirements: [
      '35 anos (homens) ou 30 anos (mulheres) de contribuição',
      'Enquadramento em alguma regra de transição (para quem já contribuía antes da reforma)',
      'Empresário, contribuinte individual e facultativo também têm direito',
      'Possibilidade de utilizar tempo especial convertido para comum',
      'Períodos de trabalho rural, militar e licença-maternidade podem ser contados'
    ],
    highlights: [
      'Não exige idade mínima nas regras de pedágio',
      'Conversão de tempo especial aumenta o período contributivo',
      'Planejamento estratégico para escolha da regra mais vantajosa',
      'Possibilidade de aposentadoria antecipada em até 5 anos com pedágio'
    ],
    gradient: 'linear-gradient(135deg, #059669, #0d9488)',
    iconBg: 'bg-emerald-500/10',
    borderColor: 'border-emerald-200'
  },
  {
    icon: Shield,
    title: 'Aposentadoria Especial',
    shortTitle: 'Especial',
    summary: 'Concedida ao trabalhador exposto a agentes nocivos à saúde (físicos, químicos ou biológicos) durante a atividade profissional, com tempo reduzido de contribuição.',
    content: [
      'A aposentadoria especial é um dos benefícios mais valiosos do regime previdenciário brasileiro, pois permite a aposentadoria com 15, 20 ou 25 anos de exposição a agentes nocivos. O tempo de contribuição reduzido compensa o desgaste à saúde sofrido pelo trabalhador durante anos de exposição a condições insalubres ou perigosas.',
      'A Reforma da Previdência também trouxe alterações significativas para a aposentadoria especial. Antes da EC 103/2019, o benefício era integral e não exigia idade mínima. Após a reforma, passou a exigir idade mínima (55, 57 ou 60 anos, conforme a atividade) e o valor passou a ser calculado com base na média de todas as contribuições, limitado a 60% + 2% ao ano excedente.',
      'Para comprovar a exposição a agentes nocivos, é necessário apresentar o Perfil Profissiográfico Previdenciário (PPP), emitido pela empresa com base no Laudo Técnico das Condições Ambientais do Trabalho (LTCAT). Agentes como ruído acima do limite, calor, frio, radiação, agentes químicos, poeiras minerais, eletricidade e agentes biológicos podem dar direito ao benefício.',
      'A conversão de tempo especial em tempo comum é outro aspecto relevante. Mesmo que o trabalhador não complete o tempo mínimo para a aposentadoria especial, os períodos de exposição podem ser convertidos com multiplicadores (1,4 para homens e 1,2 para mulheres) para aumentar o tempo de contribuição comum. Uma análise criteriosa do histórico profissional e dos PPPs de todas as empresas onde o segurado trabalhou é fundamental para não perder nenhum direito.'
    ],
    requirements: [
      '25 anos de exposição a agentes nocivos de baixo risco (maioria dos casos)',
      '20 anos para agentes de médio risco (amianto, por exemplo)',
      '15 anos para agentes de alto risco (mineração subterrânea)',
      'Idade mínima: 60 anos (25 anos exposição), 58 anos (20 anos) ou 55 anos (15 anos) — pós-reforma',
      'PPP e LTCAT atualizados para comprovação da exposição'
    ],
    highlights: [
      'Tempo de contribuição reduzido — aposentadoria mais cedo',
      'Conversão de tempo especial para comum aumenta outros benefícios',
      'Possibilidade de direito adquirido antes da reforma (benefício integral)',
      'Reconhecimento judicial de exposição não documentada no PPP'
    ],
    gradient: 'linear-gradient(135deg, #d97706, #ea580c)',
    iconBg: 'bg-amber-500/10',
    borderColor: 'border-amber-200'
  },
  {
    icon: UserCheck,
    title: 'Aposentadoria da Pessoa com Deficiência',
    shortTitle: 'PCD',
    summary: 'Benefício destinado a pessoas com deficiência que comprovem impedimentos de longo prazo de natureza física, mental, intelectual ou sensorial.',
    content: [
      'A aposentadoria da pessoa com deficiência foi instituída pela Lei Complementar 142/2013 e representa um importante avanço na inclusão previdenciária. O benefício reconhece que a pessoa com deficiência enfrenta maiores dificuldades no mercado de trabalho e, por isso, merece requisitos diferenciados para se aposentar.',
      'Existem duas modalidades: a aposentadoria por tempo de contribuição (25 anos para homens, 20 para mulheres — deficiência grave; 29 anos para homens, 24 para mulheres — deficiência moderada; 33 anos para homens, 28 para mulheres — deficiência leve) e a aposentadoria por idade (60 anos para homens, 55 para mulheres, com mínimo de 15 anos de contribuição na condição de pessoa com deficiência).',
      'A avaliação da deficiência é realizada por perícia médica e por avaliação social do INSS, que consideram os impedimentos nas funções e estruturas do corpo, fatores socioambientais, limitação no desempenho de atividades e restrição de participação social. A deficiência deve ser de longo prazo (com duração mínima de 2 anos) e pode ser de natureza física, mental, intelectual ou sensorial.',
      'O planejamento para requerer este benefício exige preparo cuidadoso da documentação: laudos médicos detalhados, exames, relatórios de especialistas, histórico de tratamentos e, principalmente, a demonstração de que a deficiência impacta a capacidade de trabalho. A negativa administrativa é comum, sendo frequente a necessidade de buscar o benefício judicialmente com o auxílio de perícias judiciais.'
    ],
    requirements: [
      'Comprovação da deficiência por perícia médica e avaliação social',
      '25 a 33 anos (homens) ou 20 a 28 anos (mulheres) — tempo de contribuição',
      '60 anos (homens) ou 55 anos (mulheres) — aposentadoria por idade PCD',
      '15 anos de contribuição na condição de pessoa com deficiência (idade)',
      'Deficiência de longo prazo (mínimo 2 anos)'
    ],
    highlights: [
      'Requisitos reduzidos em comparação à aposentadoria comum',
      'Duas modalidades: idade e tempo de contribuição',
      'Não exige idade mínima na aposentadoria por tempo de contribuição',
      'Avaliação biopsicossocial considera múltiplos fatores'
    ],
    gradient: 'linear-gradient(135deg, #7c3aed, #9333ea)',
    iconBg: 'bg-violet-500/10',
    borderColor: 'border-violet-200'
  },
  {
    icon: Heart,
    title: 'Auxílio-Doença',
    shortTitle: 'Auxílio-Doença',
    summary: 'Benefício por incapacidade temporária pago ao segurado que fica temporariamente incapaz de trabalhar por motivo de doença ou acidente.',
    content: [
      'O auxílio-doença, oficialmente denominado "benefício por incapacidade temporária" desde a reforma administrativa, é concedido ao segurado do INSS que comprove estar temporariamente incapaz para o trabalho por mais de 15 dias consecutivos, seja por doença ou acidente de qualquer natureza.',
      'Para ter direito, o segurado precisa cumprir a carência de 12 contribuições mensais, exceto em casos de acidente de qualquer natureza, doença profissional ou doenças graves especificadas em lei (como tuberculose, hanseníase, neoplasia maligna, cegueira, entre outras). Além da carência, é indispensável a qualidade de segurado — ou seja, estar contribuindo ou dentro do período de graça (até 12 meses após parar de contribuir).',
      'O valor do auxílio-doença corresponde a 91% da média de todos os salários de contribuição, limitado à média dos 12 últimos salários. Não pode ser inferior a um salário mínimo nem superior à média dos 12 últimos salários de contribuição. Importante destacar que, após a reforma, o cálculo passou a considerar 100% das contribuições desde julho de 1994, o que pode reduzir o valor em alguns casos.',
      'A perícia médica do INSS é o ponto central da análise. O médico perito avaliará se a incapacidade é total e temporária, se há possibilidade de reabilitação para outra função, e qual o prazo estimado de recuperação. Contar com documentação médica robusta — laudos detalhados, exames de imagem, relatórios de especialistas e receituários — é essencial para o sucesso do pedido. Em caso de negativa, o recurso administrativo ou a via judicial podem reverter a decisão.'
    ],
    requirements: [
      '12 contribuições mensais de carência (dispensada em casos específicos)',
      'Qualidade de segurado no momento da incapacidade',
      'Incapacidade temporária comprovada por perícia médica',
      'Prazo mínimo de afastamento: 15 dias (os primeiros 15 dias são pagos pelo empregador)',
      'Documentação médica completa e atualizada'
    ],
    highlights: [
      'Benefício mais ágil para quem precisa se afastar do trabalho',
      'Isenção de carência para doenças graves e acidentes',
      'Possibilidade de prorrogação se a incapacidade persistir',
      'Conversão em aposentadoria por invalidez se a incapacidade se tornar permanente'
    ],
    gradient: 'linear-gradient(135deg, #e11d48, #db2777)',
    iconBg: 'bg-rose-500/10',
    borderColor: 'border-rose-200'
  },
  {
    icon: Activity,
    title: 'Aposentadoria por Invalidez',
    shortTitle: 'Por Invalidez',
    summary: 'Destinada ao segurado que, por doença ou acidente, é considerado permanentemente incapaz de exercer qualquer atividade laboral.',
    content: [
      'A aposentadoria por invalidez, hoje chamada de "aposentadoria por incapacidade permanente", é o benefício concedido ao segurado que não possui mais condições de se reabilitar para qualquer atividade profissional que garanta seu sustento. Diferentemente do auxílio-doença, a incapacidade aqui é total e permanente, sem perspectiva de recuperação.',
      'Os requisitos incluem a carência de 12 contribuições (dispensada em casos de acidente ou doenças graves) e a qualidade de segurado. A incapacidade deve ser total — o segurado não pode exercer nenhuma atividade laborativa — e permanente, sem possibilidade de reabilitação profissional. A perícia médica do INSS é rigorosa e exige demonstração cabal da incapacidade.',
      'Com a Reforma da Previdência, o valor da aposentadoria por invalidez foi alterado significativamente. Antes da EC 103/2019, o benefício era integral (100% da média salarial). Após a reforma, o valor passou a ser de 60% da média de todas as contribuições, acrescido de 2% para cada ano que exceder 20 anos de contribuição (homens) ou 15 anos (mulheres). A exceção ocorre quando a invalidez decorre de acidente de trabalho, doença profissional ou doença do trabalho — nestes casos, o valor é de 100% da média.',
      'O segurado aposentado por invalidez pode ser convocado a qualquer momento para novas perícias médicas (revisão periódica), exceto se tiver 60 anos ou mais, 55 anos com mais de 15 anos de concessão, ou se a incapacidade for decorrente de HIV/AIDS. A volta espontânea ao trabalho, mesmo que não comunicada ao INSS, pode levar à suspensão do benefício. Por isso, é fundamental manter o acompanhamento médico e a documentação atualizada.'
    ],
    requirements: [
      '12 contribuições de carência (dispensada em acidentes e doenças graves)',
      'Qualidade de segurado na data do início da incapacidade',
      'Incapacidade total e permanente comprovada por perícia médica',
      'Impossibilidade de reabilitação profissional',
      'Acidente de trabalho garante 100% do valor do benefício'
    ],
    highlights: [
      'Único benefício vitalício por incapacidade permanente',
      'Isenção de carência para acidentes e doenças especificadas',
      'Valor integral (100%) para acidente de trabalho',
      'Revisão periódica obrigatória (com exceções por idade e tempo de concessão)'
    ],
    gradient: 'from-red-600 to-rose-600',
    iconBg: 'bg-red-500/10',
    borderColor: 'border-red-200'
  },
  {
    icon: Users,
    title: 'Pensão por Morte',
    shortTitle: 'Pensão por Morte',
    summary: 'Benefício pago aos dependentes do segurado falecido, garantindo amparo financeiro à família após a perda do provedor.',
    content: [
      'A pensão por morte é um benefício previdenciário concedido aos dependentes de quem faleceu na condição de segurado do INSS. Diferentemente da maioria dos benefícios, não exige carência, mas é indispensável que o falecido mantenha a qualidade de segurado na data do óbito — salvo se já tiver direito acumulado a outro benefício (como aposentadoria).',
      'Os dependentes são divididos em classes: a classe 1 inclui cônjuge, companheiro(a) e filhos menores de 21 anos ou inválidos (qualquer idade). A classe 2 abrange pais que comprovem dependência econômica. A classe 3 inclui irmãos menores de 21 anos ou inválidos, também com dependência comprovada. A existência de dependentes de uma classe exclui os das classes seguintes.',
      'A duração da pensão por morte varia conforme a idade do cônjuge ou companheiro(a) na data do óbito e o tempo de contribuição do falecido. Cônjuges mais jovens (menos de 22 anos) recebem por apenas 3 anos, enquanto aqueles com mais de 45 anos podem receber vitaliciamente. Para os filhos, o benefício dura até os 21 anos, salvo invalidez ou deficiência.',
      'O valor da pensão por morte é de 50% do valor que o falecido recebia de aposentadoria ou teria direito se aposentado por invalidez, acrescido de 10% por dependente, limitado a 100%. Em caso de dependente inválido ou com deficiência intelectual, mental ou grave, o valor pode ser de 100%. Com a Reforma da Previdência, o benefício deixou de ser integral para a maioria dos casos, exceto quando há dependente com deficiência.'
    ],
    requirements: [
      'Óbito do segurado (qualquer causa) ou morte presumida (declarada judicialmente)',
      'Qualidade de segurado do falecido na data do óbito',
      'Comprovação da condição de dependente conforme a classe',
      'Para o cônjuge: comprovação de casamento ou união estável',
      'Prazo de até 90 dias do óbito para requerer (pagamento retroativo à data do óbito)'
    ],
    highlights: [
      'Não exige carência',
      'Pagamento retroativo à data do óbito se requerido em até 90 dias',
      'Duração vitalícia para cônjuges acima de 45 anos',
      'Cota familiar de 50% + 10% por dependente'
    ],
    gradient: 'from-sky-600 to-cyan-600',
    iconBg: 'bg-sky-500/10',
    borderColor: 'border-sky-200'
  },
  {
    icon: Lock,
    title: 'Auxílio-Reclusão',
    shortTitle: 'Auxílio-Reclusão',
    summary: 'Benefício pago aos dependentes do segurado de baixa renda que for preso em regime fechado ou semiaberto, durante o período de reclusão.',
    content: [
      'O auxílio-reclusão é um benefício previdenciário de natureza assistencial pago exclusivamente aos dependentes do segurado de baixa renda que se encontra recolhido à prisão em regime fechado ou semiaberto. Apesar de ser um dos benefícios menos conhecidos, seu objetivo é amparar a família do segurado durante o período de reclusão, evitando que a privação de liberade se converta em desamparo social.',
      'Para ter direito, o segurado preso deve estar na condição de baixa renda, ou seja, sua última remuneração (antes da prisão) deve ser igual ou inferior ao valor estipulado anualmente pelo INSS (cerca de R$ 1.754,18 em 2026). Além disso, é necessário que o segurado mantenha a qualidade de segurado na data da prisão e que o regime seja fechado ou semiaberto — o regime aberto não gera direito ao benefício.',
      'O valor do auxílio-reclusão é calculado da mesma forma que a pensão por morte: 50% do valor que o segurado teria direito se aposentado por invalidez, acrescido de 10% por dependente, limitado a 100%. O benefício é pago enquanto durar a prisão, com limite máximo de idade para os filhos (21 anos, salvo invalidez). Se o segurado for absolvido ou passar a cumprir pena em regime aberto, o benefício cessa.',
      'Um ponto importante é que o auxílio-reclusão não exige carência, mas exige a comprovação da prisão mediante documento oficial e a comprovação da condição de baixa renda. A solicitação deve ser feita pelos dependentes junto ao INSS, preferencialmente com auxílio de advogado especializado, pois a negativa administrativa é frequente devido à complexidade das comprovações exigidas.'
    ],
    requirements: [
      'Segurado preso em regime fechado ou semiaberto',
      'Última remuneração do segurado dentro do limite de baixa renda',
      'Qualidade de segurado na data da prisão',
      'Dependentes nas mesmas classes da pensão por morte',
      'Documentação comprobatória da prisão e da condição de dependência'
    ],
    highlights: [
      'Benefício exclusivo para famílias de baixa renda',
      'Não exige carência',
      'Valor calculado como pensão por morte',
      'Cessa com a soltura, regime aberto ou absolvição'
    ],
    gradient: 'from-slate-600 to-gray-600',
    iconBg: 'bg-slate-500/10',
    borderColor: 'border-slate-200'
  },
  {
    icon: Heart,
    title: 'BPC/LOAS — Benefício de Prestação Continuada',
    shortTitle: 'BPC/LOAS',
    summary: 'Benefício assistencial de um salário mínimo mensal pago a idosos com 65+ anos e pessoas com deficiência de qualquer idade, em situação de baixa renda.',
    content: [
      'O Benefício de Prestação Continuada (BPC), regulamentado pela Lei Orgânica da Assistência Social (LOAS — Lei 8.742/93), é um benefício assistencial que garante um salário mínimo mensal a idosos com 65 anos ou mais e a pessoas com deficiência de qualquer idade, que comprovem não possuir meios de prover a própria manutenção nem tê-la provida por sua família.',
      'Diferentemente dos benefícios previdenciários, o BPC não exige contribuições ao INSS. É um benefício de natureza assistencial, financiado pelo Fundo Nacional de Assistência Social e operacionalizado pelo INSS. A principal exigência é a comprovação de renda familiar per capita de até 1/4 do salário mínimo vigente.',
      'Para a pessoa com deficiência, é necessário comprovar impedimentos de longo prazo (mínimo 2 anos) de natureza física, mental, intelectual ou sensorial que a impossibilitem de participar plenamente da sociedade em igualdade de condições com as demais pessoas. A avaliação é biopsicossocial, realizada por equipe multiprofissional do INSS composta por médico perito e assistente social.',
      'O BPC não paga 13º salário, não gera pensão por morte e não pode ser acumulado com outros benefícios previdenciários ou assistenciais, salvo assistência médica. No entanto, o beneficiário do BPC tem direito ao desconto na conta de energia elétrica (Tarifa Social) e, em muitos casos, a programas habitacionais do governo. É fundamental manter o Cadastro Único (CadÚnico) atualizado para não ter o benefício suspenso.'
    ],
    requirements: [
      '65 anos ou mais (idoso) ou pessoa com deficiência (qualquer idade)',
      'Renda familiar per capita inferior a 1/4 do salário mínimo',
      'Avaliação biopsicossocial da deficiência (quando for o caso)',
      'Inscrição no Cadastro Único do Governo Federal',
      'Não receber outro benefício previdenciário ou assistencial'
    ],
    highlights: [
      'Benefício não contributivo — não exige pagamentos ao INSS',
      'Garantia constitucional de um salário mínimo mensal',
      'Avaliação biopsicossocial da deficiência',
      'Benefício revisado a cada 2 anos'
    ],
    gradient: 'linear-gradient(135deg, #0d9488, #059669)',
    iconBg: 'bg-teal-500/10',
    borderColor: 'border-teal-200'
  },
  {
    icon: Baby,
    title: 'Salário-Maternidade',
    shortTitle: 'Salário-Maternidade',
    summary: 'Benefício pago à segurada gestante ou adotante durante o período de afastamento do trabalho, garantindo estabilidade financeira no pós-parto.',
    content: [
      'O salário-maternidade é um benefício concedido à segurada do INSS que dá à luz, adota uma criança ou obtém guarda judicial para fins de adoção. O benefício garante o pagamento de 120 dias de afastamento remunerado, sem prejuízo do emprego e do salário, com início entre 28 dias antes do parto e a data do nascimento.',
      'Todas as seguradas do INSS têm direito ao salário-maternidade: empregadas (inclusive domésticas), trabalhadoras avulsas, contribuintes individuais, facultativas e seguradas especiais (trabalhadoras rurais). Para as empregadas, o benefício é pago diretamente pelo empregador (que compensa com a contribuição previdenciária). Para as demais, o INSS paga diretamente.',
      'A carência varia conforme a categoria: para empregadas e trabalhadoras avulsas, não há carência. Para contribuintes individuais, facultativas e seguradas especiais, são exigidas 10 contribuições mensais. Em caso de parto antecipado, o período de carência é reduzido ou dispensado.',
      'O valor do benefício corresponde à remuneração integral da segurada. Para empregadas, é o último salário; para contribuintes individuais e facultativas, é a média dos últimos 12 meses de contribuição. O salário-maternidade também é devido em caso de aborto não criminoso (espontâneo ou previsto em lei), com pagamento por 14 dias, e em caso de natimorto, com pagamento integral de 120 dias.'
    ],
    requirements: [
      'Parto, adoção ou guarda judicial para fins de adoção',
      'Qualidade de segurada na data do parto ou adoção',
      '10 contribuições mensais (para contribuintes individuais e facultativas)',
      'Início do benefício entre 28 dias antes do parto e a data do nascimento',
      'Documentação: certidão de nascimento, termo de adoção ou guarda'
    ],
    highlights: [
      '120 dias de afastamento com remuneração integral',
      'Estabilidade no emprego desde a confirmação da gravidez até 5 meses após o parto',
      'Direito mesmo em caso de adoção ou guarda judicial',
      'Pagamento integral em caso de natimorto'
    ],
    gradient: 'from-pink-600 to-rose-600',
    iconBg: 'bg-pink-500/10',
    borderColor: 'border-pink-200'
  },
  {
    icon: AlertCircle,
    title: 'Auxílio-Acidente',
    shortTitle: 'Auxílio-Acidente',
    summary: 'Indenização paga ao segurado que sofre acidente e fica com sequelas permanentes que reduzem sua capacidade de trabalho, mesmo que possa continuar trabalhando.',
    content: [
      'O auxílio-acidente é um benefício de natureza indenizatória concedido ao segurado que, após a consolidação das lesões decorrentes de acidente de qualquer natureza, apresenta sequelas permanentes que impliquem redução da capacidade para o trabalho habitualmente exercido.',
      'Diferentemente do auxílio-doença, o auxílio-acidente não exige afastamento do trabalho. O segurado continua trabalhando, mas recebe uma indenização mensal como compensação pela redução da capacidade laboral. Pode ser causado por acidente de trânsito, acidente de trabalho, acidente doméstico ou qualquer outro tipo de acidente.',
      'O valor do auxílio-acidente corresponde a 50% do salário de benefício (média de todas as contribuições) e é pago mensalmente até a véspera da aposentadoria. O benefício não é vitalício — cessa quando o segurado se aposenta, pois a aposentadoria já compensa a redução da capacidade laboral. O auxílio-acidente pode ser acumulado com o salário, mas não com auxílio-doença ou aposentadoria.',
      'A comprovação das sequelas é feita por perícia médica do INSS, que avaliará se há redução definitiva da capacidade de trabalho. A documentação médica é crucial: laudos detalhados, exames de imagem que demonstrem as sequelas, relatórios de especialistas e avaliações funcionais que comprovem a limitação. Muitas vezes, o INSS nega o benefício entendendo que não há redução da capacidade, sendo necessário recorrer ao Judiciário.'
    ],
    requirements: [
      'Acidente de qualquer natureza (não precisa ser de trabalho)',
      'Sequelas permanentes que reduzam a capacidade de trabalho',
      'Qualidade de segurado na data do acidente',
      'Consolidação das lesões (sequelas definitivas)',
      'Não pode ser cumulado com auxílio-doença ou aposentadoria'
    ],
    highlights: [
      'Indenização mensal sem necessidade de afastamento do trabalho',
      'Recebe o benefício junto com o salário normal',
      'Valor: 50% do salário de benefício',
      'Cessa apenas com a aposentadoria'
    ],
    gradient: 'linear-gradient(135deg, #d97706, #ca8a04)',
    iconBg: 'bg-amber-500/10',
    borderColor: 'border-amber-200'
  },
  {
    icon: RefreshCw,
    title: 'Revisão de Benefícios',
    shortTitle: 'Revisão',
    summary: 'Análise e correção de benefícios previdenciários concedidos com erros de cálculo, documentação incompleta ou aplicação incorreta da legislação.',
    content: [
      'A revisão de benefícios previdenciários é um dos serviços mais importantes prestados pela advocacia especializada. Milhares de benefícios são concedidos pelo INSS com erros de cálculo, aplicação incorreta das regras legais, desconsideração de períodos de contribuição ou utilização de índices de correção monetária equivocados. Esses erros podem representar prejuízos significativos ao segurado.',
      'Existem diversas modalidades de revisão, cada uma aplicável a situações específicas: revisão do valor inicial do benefício (quando o INSS erra no cálculo da renda mensal inicial), revisão de tempo de contribuição (quando períodos de trabalho não são reconhecidos), revisão pelo teto (para benefícios limitados ao teto previdenciário que deveriam ser maiores), revisão de conversão de tempo especial, e a famosa revisão da "vida toda" (Tema 1.102/STF).',
      'O prazo decadencial para revisão de benefício é de 10 anos a contar do primeiro pagamento. Após esse prazo, o direito de revisão decai, salvo casos de erro de fato (erro escusável) ou revisões fundadas em inconstitucionalidade de lei. É fundamental que o segurado, ao receber a carta de concessão do benefício, busque orientação especializada para verificar se o cálculo está correto.',
      'O planejamento previdenciário prévio à concessão do benefício é a melhor forma de evitar a necessidade de revisão. No entanto, para benefícios já concedidos, a revisão pode significar um aumento substancial no valor mensal e o pagamento de valores retroativos (diferenças vencidas nos últimos 5 anos). Cada caso deve ser analisado individualmente, com cálculo atuarial que demonstre a viabilidade e o potencial de ganho da revisão.'
    ],
    requirements: [
      'Benefício já concedido pelo INSS (aposentadoria, pensão, auxílio)',
      'Prazo decadencial de 10 anos a partir do primeiro pagamento',
      'Erro de cálculo, aplicação incorreta da lei ou falta de documentos',
      'Potencial de aumento comprovado por cálculo atuarial',
      'Documentação completa do processo administrativo de concessão'
    ],
    highlights: [
      'Pode representar aumento significativo do valor mensal',
      'Direito a receber diferenças retroativas dos últimos 5 anos',
      'Revisão da "vida toda" permite incluir contribuições anteriores a 1994',
      'Prazo de 10 anos para requerer'
    ],
    gradient: 'linear-gradient(135deg, #2563eb, #0891b2)',
    iconBg: 'bg-blue-500/10',
    borderColor: 'border-blue-200'
  },
  {
    icon: GitBranch,
    title: 'Planejamento Previdenciário',
    shortTitle: 'Planejamento',
    summary: 'Análise estratégica completa do histórico contributivo para identificar a melhor data e a modalidade mais vantajosa de aposentadoria.',
    content: [
      'O planejamento previdenciário é o processo de análise técnica do histórico contributivo do segurado para identificar a melhor estratégia de aposentadoria — ou seja, a data mais próxima e a modalidade mais vantajosa em termos de valor do benefício. É a ferramenta mais poderosa do direito previdenciário preventivo, permitindo ao segurado tomar decisões informadas sobre seu futuro.',
      'O planejamento começa com a obtenção do extrato previdenciário completo (CNIS) e a análise detalhada de todos os vínculos empregatícios, períodos de contribuição, possíveis lacunas e documentação complementar. Em seguida, são identificados e quantificados todos os períodos que podem ser reconhecidos: tempo rural, tempo de serviço militar, tempo especial (com conversão), períodos de auxílio-doença, licença-maternidade e outros.',
      'Com todos os períodos mapeados, são simuladas as diferentes regras de aposentadoria aplicáveis: direito adquirido antes da reforma, regras de transição (pontos, idade mínima progressiva, pedágio de 50%, pedágio de 100%), aposentadoria especial, aposentadoria por idade e aposentadoria da pessoa com deficiência. Cada simulação considera o valor estimado do benefício e a data prevista de concessão.',
      'O planejamento previdenciário não se limita à aposentadoria — também abrange o planejamento sucessório e a proteção dos dependentes. Através da análise cuidadosa do histórico e das projeções, é possível identificar contribuições em atraso que valem a pena ser pagas, períodos a serem complementados, e a melhor estratégia para maximizar o valor do benefício. É o investimento mais inteligente que um trabalhador pode fazer em seu futuro previdenciário.'
    ],
    requirements: [
      'Histórico contributivo completo (CNIS atualizado)',
      'Documentação complementar: carteiras de trabalho, contratos, certidões',
      'Identificação de períodos especiais, rurais, militares e outros',
      'Simulação de todas as regras de aposentadoria aplicáveis',
      'Definição de estratégia personalizada com projeções financeiras'
    ],
    highlights: [
      'Antecipação da aposentadoria em meses ou anos',
      'Aumento significativo do valor do benefício',
      'Identificação de períodos de contribuição não reconhecidos',
      'Tomada de decisão informada com base em dados concretos'
    ],
    gradient: 'from-indigo-600 to-violet-600',
    iconBg: 'bg-indigo-500/10',
    borderColor: 'border-indigo-200'
  }
]

/* ===== FAQ DATA ===== */
interface FAQItem {
  q: string
  r: string
}

const faqData: FAQItem[] = [
  {
    q: 'O que é o CNIS e por que ele é tão importante?',
    r: 'O CNIS (Cadastro Nacional de Informações Sociais) é o extrato oficial que reúne todo o histórico de vínculos empregatícios, contribuições e remunerações do segurado junto ao INSS. É o documento mais importante para qualquer análise previdenciária, pois é a partir dele que o INSS calcula o valor dos benefícios. Manter o CNIS atualizado e verificar se todos os períodos de trabalho estão corretamente registrados é essencial. Erros no CNIS — como vínculos não registrados, contribuições em valor incorreto ou períodos ausentes — podem levar a cálculos equivocados e prejuízos ao segurado.'
  },
  {
    q: 'Qual a diferença entre carência e tempo de contribuição?',
    r: 'Carência é o número mínimo de contribuições mensais exigidas para o segurado ter direito a determinado benefício. É um requisito genérico, contado em número de pagamentos ao INSS, independentemente dos valores. Tempo de contribuição, por sua vez, é o período efetivo de trabalho ou contribuição que será considerado no cálculo do valor do benefício. Por exemplo, para a aposentadoria por idade são exigidos 180 meses de carência (15 anos), mas o valor do benefício será calculado com base em todo o tempo de contribuição do segurado. É possível ter carência cumprida mas tempo de contribuição insuficiente, ou vice-versa.'
  },
  {
    q: 'Posso trabalhar depois de me aposentar?',
    r: 'Sim, é possível continuar trabalhando após a aposentadoria, mas existem regras específicas dependendo do tipo de benefício. O aposentado por tempo de contribuição ou por idade pode trabalhar normalmente, mas estará sujeito à contribuição previdenciária sobre sua remuneração (a chamada "contribuição do aposentado"). Já o aposentado por invalidez não pode retornar ao trabalho, exceto em atividades que não configurem exercício de atividade remunerada. O aposentado especial também enfrenta restrições: se retornar a atividade exposta a agentes nocivos, pode ter o benefício suspenso.'
  },
  {
    q: 'O que acontece se o INSS negar meu pedido de benefício?',
    r: 'A negativa administrativa é comum e não significa o fim do processo. Primeiro, é possível interpor recurso administrativo ao Conselho de Recursos da Previdência Social (CRPS), que pode reverter a decisão em até 3 instâncias. Se o recurso for negado, a via judicial é a alternativa. O segurado pode ingressar com ação judicial contra o INSS, que será analisada pela Justiça Federal (ou Juizado Especial Federal, para causas de até 60 salários mínimos). O processo judicial permite a produção de provas complementares, perícias judiciais independentes e a discussão aprofundada do direito. Muitos benefícios negados administrativamente são concedidos na Justiça.'
  },
  {
    q: 'Como é calculado o valor da aposentadoria após a Reforma da Previdência?',
    r: 'Após a Reforma da Previdência (EC 103/2019), o cálculo do valor dos benefícios sofreu alterações significativas. De forma geral, o valor é calculado com base na média de todos os salários de contribuição desde julho de 1994 (100% das contribuições, sem descarte dos 20% menores como antes). Dessa média, o segurado recebe 60% acrescido de 2% para cada ano de contribuição que exceder 20 anos (homens) ou 15 anos (mulheres). Para atingir 100% da média, o homem precisa de 40 anos de contribuição e a mulher de 35 anos. Existem exceções, como a aposentadoria por invalidez decorrente de acidente de trabalho (100%) e a aposentadoria especial com direito adquirido antes da reforma (integral).'
  },
  {
    q: 'O que é o período de graça e como ele funciona?',
    r: 'O período de graça é o intervalo de tempo após a perda da qualidade de segurado durante o qual o trabalhador ainda mantém seus direitos perante o INSS, mesmo sem estar contribuindo. Em regra, o período de graça é de 12 meses após o fim das contribuições. Esse prazo pode ser prorrogado: para quem já contribuiu por mais de 10 anos, são acrescidos mais 12 meses (totalizando 24 meses); para quem é segurado desempregado involuntário, podem ser acrescidos mais 12 meses (totalizando até 36 meses). Durante o período de graça, o trabalhador mantém direito a todos os benefícios previdenciários, incluindo auxílio-doença, aposentadoria por invalidez e pensão por morte.'
  }
]

/* ===== PAGE ===== */
import SEO from '../components/SEO'

export default function DireitoPrevidenciarioPage() {
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

  // Active benefit filter
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const handleToggleFAQ = (idx: number) => {
    setOpenFAQ(openFAQ === idx ? null : idx)
  }

  // Filter benefits
  const filteredBeneficios = activeFilter === 'all'
    ? beneficios
    : beneficios.filter(b => {
        const categories: Record<string, string[]> = {
          aposentadoria: ['Aposentadoria por Idade', 'Aposentadoria por Tempo de Contribuição', 'Aposentadoria Especial', 'Aposentadoria da Pessoa com Deficiência', 'Aposentadoria por Invalidez'],
          auxilio: ['Auxílio-Doença', 'Auxílio-Acidente', 'Auxílio-Reclusão'],
          familiar: ['Pensão por Morte', 'Salário-Maternidade'],
          assistencial: ['BPC/LOAS'],
          revisao: ['Revisão de Benefícios', 'Planejamento Previdenciário'],
        }
        return categories[activeFilter]?.includes(b.title) ?? false
      })

  return (
    <div>
      <SEO
        title="Direito Previdenciário | Will & Pereira Advocacia"
        description="Especialistas em Direito Previdenciário: aposentadorias, pensões, auxílios e benefícios do INSS."
        canonical="https://willepereira-adv.vercel.app/previdenciario"
      />
      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[650px] max-h-[1000px] flex items-center overflow-hidden bg-navy-dark">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-dark" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c9a84c\' fill-opacity=\'1\'%3E%3Cpath d=\'M40 0L0 40l40 40L80 40z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
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
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <div className="flex items-center gap-3 text-gold/80 text-sm font-medium mb-8 tracking-wide">
                  <Scale size={16} />
                  <span className="uppercase tracking-[0.15em]">Will & Pereira Advocacia</span>
                  <span className="w-8 h-px bg-gold-40" />
                  <span className="text-gold/60 text-xs">Especialidade Principal</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-8"
              >
                Direito{' '}
                <span className="text-gradient-gold">Previdenciário</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-10"
              >
                Atuamos com excelência em todo o Brasil na concessão e revisão de benefícios 
                previdenciários. Aposentadorias, pensões, auxílios e planejamento previdenciário 
                com a expertise de quem mais entende do assunto.
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
                <a href="#beneficios" className="btn-outline btn-outline-light text-base px-8 py-4">
                  Ver Benefícios
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
                <span>Especialistas INSS</span>
                <span className="w-px h-4 bg-white/10" />
                <span>Planejamento Estratégico</span>
                <span className="w-px h-4 bg-white/10" />
                <span>Recursos e Ações</span>
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-navy leading-tight mb-6">
                Direito<br />
                <span className="text-gradient-gold">Previdenciário</span>
              </h2>
              <div className="gold-divider mb-6" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  O <strong>Direito Previdenciário</strong> é o ramo do Direito Público que regula a 
                  relação jurídica entre o cidadão e o sistema de seguridade social brasileiro. 
                  Engloba o conjunto de normas e princípios que disciplinam a concessão, manutenção 
                  e revisão dos benefícios previdenciários e assistenciais administrados pelo 
                  Instituto Nacional do Seguro Social (INSS).
                </p>
                <p>
                  Mais do que um campo de atuação jurídica, o Direito Previdenciário é um 
                  instrumento de proteção social. Através dele, milhões de brasileiros têm acesso 
                  a direitos fundamentais como aposentadoria digna, amparo em caso de doença ou 
                  acidente, suporte à família em momentos de perda e assistência social às 
                  populações mais vulneráveis.
                </p>
                <p>
                  A Will & Pereira Advocacia construiu sua reputação na excelência do atendimento 
                  previdenciário. Nossa equipe domina as complexidades da legislação previdenciária 
                  — incluindo as profundas transformações trazidas pela Reforma da Previdência 
                  (EC 103/2019) — e utiliza esse conhecimento para garantir que cada cliente 
                  receba o melhor benefício possível, no menor tempo viável.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-cream">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-navy/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Scale className="w-20 h-20 text-gold/20 mx-auto mb-4" />
                      <p className="text-gray-300 text-sm">Proteção social e dignidade</p>
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
                  <p className="text-sm font-medium">Mais de 15 anos em Direito Previdenciário</p>
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
              <div className="flex flex-wrap justify-center gap-1 md:gap-3">
              {[
                { key: 'all', label: 'Todos' },
                { key: 'aposentadoria', label: 'Aposentadorias' },
                { key: 'auxilio', label: 'Auxílios' },
                { key: 'familiar', label: 'Benefícios Familiares' },
                { key: 'assistencial', label: 'Assistenciais' },
                { key: 'revisao', label: 'Revisão e Planejamento' },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`px-3 md:px-5 py-2 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
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

      {/* ═══════════════ BENEFÍCIOS ═══════════════ */}
      <section id="beneficios" className="section-padding">
        <div className="container-premium">
          <SectionHeading
            label="Benefícios Previdenciários"
            title="Conheça Seus Direitos"
            subtitle="Cada benefício possui requisitos específicos e regras próprias de concessão. Entenda cada um deles e descubra qual se aplica ao seu caso."
          />

          <div className="space-y-24-mobile-16 space-y-24">
            {filteredBeneficios.map((beneficio, idx) => {
              const Icon = beneficio.icon
              return (
                <motion.div
                  key={beneficio.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7 }}
                >
                  <div className={`grid lg:grid-cols-5 gap-8 lg:gap-12 ${idx % 2 === 1 ? '' : ''}`}>
                    {/* Left panel */}
                    <div className="lg:col-span-2">
                      <div className={`sticky top-24 rounded-2xl p-8 border ${beneficio.borderColor} bg-white shadow-sm hover:shadow-lg transition-shadow duration-300`}>
                        <div className={`w-16 h-16 rounded-xl ${beneficio.iconBg} flex items-center justify-center mb-5`}>
                          <Icon className="w-8 h-8 text-navy" />
                        </div>
                        <h3 className="font-serif text-2xl md:text-3xl text-navy mb-3">{beneficio.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">{beneficio.summary}</p>

                        {/* Highlights */}
                        <div className="space-y-2 mb-6">
                          {beneficio.highlights.map(h => (
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

                    {/* Right panel — full content */}
                    <div className="lg:col-span-3 space-y-6">
                      {beneficio.content.map((paragraph, pi) => (
                        <p key={pi} className="text-gray-600 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}

                      {/* Requirements box */}
                      <div className="bg-cream rounded-xl p-6 mt-6 border border-gray-200">
                        <h4 className="text-lg font-serif text-navy mb-4 flex items-center gap-2">
                          <FileText size={18} className="text-gold" />
                          Requisitos Principais
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {beneficio.requirements.map((r, ri) => (
                            <div key={ri} className="flex items-start gap-2 text-sm">
                              <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                              <span className="text-navy/80">{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA inline */}
                      <div className="flex items-center gap-3 pt-2">
                        <Link
                          to="/contato"
                          className="inline-flex items-center gap-1 text-sm font-medium text-gold-dark hover:text-gold transition-colors"
                        >
                          Saiba mais sobre {beneficio.shortTitle.toLowerCase()} <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Divider between benefits */}
                  {idx < filteredBeneficios.length - 1 && (
                    <div className="mt-16 border-t border-gray-100" />
                  )}
                </motion.div>
              )
            })}
          </div>

          {filteredBeneficios.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Nenhum benefício encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ IMPORTÂNCIA ═══════════════ */}
      <section className="section-padding bg-cream">
        <div className="container-premium">
          <SectionHeading
            label="Por Que é Essencial"
            title="A Importância da Advocacia Especializada"
            subtitle="O Direito Previdenciário é complexo e está em constante transformação. A orientação de um advogado especializado faz toda a diferença."
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Search,
                title: 'Análise Técnica Aprofundada',
                desc: 'Cada benefício possui dezenas de requisitos, regras de transição e formas de cálculo. Um advogado especializado identifica a melhor estratégia para cada caso, evitando erros que podem custar anos de espera e benefícios reduzidos.'
              },
              {
                icon: FileText,
                title: 'Documentação e Provas',
                desc: 'A concessão de benefícios depende de documentação específica e complexa. Desde a obtenção do CNIS correto até a preparação de laudos médicos, PPPs e provas de atividade rural, a assessoria jurídica garante que nada seja deixado de lado.'
              },
              {
                icon: Gavel,
                title: 'Recursos e Ações Judiciais',
                desc: 'Mais da metade dos pedidos de benefícios são negados pelo INSS na via administrativa. O advogado especializado sabe como interpor recursos administrativos eficientes e, se necessário, ingressar com ação judicial para garantir o direito do segurado.'
              },
              {
                icon: RefreshCw,
                title: 'Revisão de Benefícios',
                desc: 'Milhares de benefícios concedidos pelo INSS contêm erros de cálculo que reduzem o valor mensal. A revisão pode significar aumento imediato do benefício e pagamento de diferenças retroativas dos últimos 5 anos.'
              },
              {
                icon: GitBranch,
                title: 'Planejamento Previdenciário',
                desc: 'O planejamento é a ferramenta mais poderosa para quem ainda não se aposentou. Permite identificar a data ideal e a modalidade mais vantajosa, além de apontar contribuições em atraso que valem a pena e períodos a serem regularizados.'
              },
              {
                icon: Shield,
                title: 'Proteção dos Direitos',
                desc: 'A legislação previdenciária muda constantemente. Manter-se atualizado sobre as alterações legislativas, jurisprudenciais e administrativas é fundamental para não perder direitos. A advocacia especializada oferece essa proteção contínua.'
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
            title="Direito Previdenciário em Perguntas e Respostas"
            subtitle="Esclareça as principais dúvidas sobre benefícios do INSS, aposentadoria e planejamento previdenciário."
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
      <section className="py-16 md:py-20 bg-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_60%)]" />
        <div className="relative z-10 container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Award, end: 15, suffix: '+', label: 'Anos de Experiência Previdenciária' },
              { icon: Users, end: 5000, suffix: '+', label: 'Clientes Atendidos' },
              { icon: BadgeCheck, end: 98, suffix: '%', label: 'Benefícios Concedidos' },
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
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-10 flex items-center justify-center mx-auto mb-4">
                    <StatIcon className="w-6 h-6 text-gold" />
                  </div>
                  <div className="text-3xl md:text-4xl font-display text-gradient-gold">
                    {stat.end}{stat.suffix}
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
            <h2 className="text-3xl md:text-5xl text-white leading-tight mb-6">
              Seu Direito Previdenciário<br />
              <span className="text-gradient-gold">Merece um Especialista</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Não arrisque seu futuro. Conte com quem entende profundamente de Direito 
              Previdenciário e está comprometido com a melhor solução para o seu caso.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contato" className="btn-primary text-base px-8 py-4">
                <Phone size={18} /> Agende uma Conversa
              </Link>
              <a href="tel:+5548988420867" className="btn-outline btn-outline-light text-base px-8 py-4">
                (48) 98842-0867
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
