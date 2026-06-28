import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle, FileText, Scale, FileSignature, Landmark, Home, Key, BookOpen, Building2, Users, ClipboardList } from 'lucide-react'
import { Link } from 'react-router-dom'

/* ===== ANIMATION ===== */
function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } } }}
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

/* ===== DATA ===== */
const topicosCivel = [
  {
    icon: FileText,
    title: 'Ações de Indenização',
    gradient: 'from-emerald-600 to-teal-600',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    content: [
      'As ações de indenização por danos materiais e morais constituem um dos pilares do Direito Cível brasileiro. Fundamentadas nos artigos 186 e 927 do Código Civil, permitem que a vítima de um ato ilícito seja reparada integralmente pelos prejuízos sofridos. O dano material abrange tanto o que efetivamente se perdeu (danos emergentes) quanto o que se deixou de ganhar (lucros cessantes). Já o dano moral tutela a esfera extrapatrimonial da pessoa — sua honra, imagem, intimidade e dignidade —, sendo fixado em valor que busca compensar o sofrimento sem constituir enriquecimento sem causa.',
      'No âmbito da responsabilidade civil contratual e extracontratual, as ações indenizatórias podem envolver acidentes de trânsito, erros médicos, defeitos em produtos, violação de direitos de personalidade, danos ambientais, relações de consumo e conflitos entre vizinhos. Cada hipótese exige a demonstração do nexo causal entre a conduta do agente e o resultado danoso, além da comprovação do prejuízo. Nossa banca assessora clientes na propositura e defesa em ações indenizatórias, buscando sempre a reparação mais ampla possível dentro dos limites legais e jurisprudenciais.',
    ],
    topics: ['Danos Materiais e Lucros Cessantes', 'Danos Morais e Estéticos', 'Indenização por Acidente de Trânsito', 'Erro Médico e Responsabilidade Hospitalar', 'Dano Moral nas Relações de Consumo', 'Assédio Moral e Dano Existencial', 'Responsabilidade Civil nas Relações Familiares'],
  },
  {
    icon: FileSignature,
    title: 'Contratos',
    gradient: 'linear-gradient(135deg, #2563eb, #4f46e5)',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    content: [
      'O Direito Contratual rege as relações jurídicas voluntariamente estabelecidas entre as partes, sendo instrumento essencial para a segurança das relações econômicas e sociais. O Código Civil brasileiro consagra princípios fundamentais como a autonomia da vontade, a obrigatoriedade dos contratos (pacta sunt servanda), a boa-fé objetiva, a função social do contrato e o equilíbrio econômico entre as partes. A análise e elaboração cuidadosa de contratos é medida preventiva indispensável para evitar litígios futuros.',
      'Prestamos assessoria completa em contratos civis e empresariais: compra e venda, prestação de serviços, locação, empreitada, doação, mútuo, fiança, consórcio, franquia, parceria, distribuição, representação comercial, tecnologia, confidencialidade (NDA) e contratos eletrônicos. Também atuamos em revisões contratuais por onerosidade excessiva, resolução por inadimplemento, distratos e negociações complexas. Nosso objetivo é garantir que cada contrato reflita com precisão a vontade das partes e ofereça a segurança jurídica necessária para o desenvolvimento dos negócios.',
    ],
    topics: ['Elaboração e Análise de Contratos', 'Contratos de Compra e Venda', 'Contratos de Prestação de Serviços', 'Revisão e Rescisão Contratual', 'Contratos Eletrônicos e Digitais', 'Distrato e Cláusulas Penais', 'Onerosidade Excessiva e Resolução'],
  },
  {
    icon: ClipboardList,
    title: 'Cobranças e Execuções',
    gradient: 'linear-gradient(135deg, #d97706, #ea580c)',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    content: [
      'A cobrança judicial e extrajudicial de dívidas é área estratégica do Direito Cível, que envolve desde a notificação amigável do devedor até a execução forçada de títulos executivos judiciais e extrajudiciais. O processo de execução, regulado pelo Código de Processo Civil, permite ao credor valer-se de medidas como a penhora de bens, o bloqueio de valores via sistema BacenJud, a constrição de imóveis, veículos e ativos financeiros, além da inclusão do nome do devedor em cadastros de inadimplentes.',
      'Atuamos tanto na representação de credores buscando o recebimento de seus créditos quanto na defesa de devedores que enfrentam execuções indevidas ou abusivas. Oferecemos soluções extrajudiciais como negociação direta, acordos de parcelamento, renegociação de dívidas e mediação. No contencioso, manejamos ações monitoriais, execuções de título extrajudicial, embargos à execução, exceções de pré-executividade e incidentes de desconsideração da personalidade jurídica. Nosso trabalho busca equilibrar a eficiência na recuperação de créditos com o respeito aos direitos fundamentais do executado.',
    ],
    topics: ['Execução de Títulos Judiciais e Extrajudiciais', 'Ação Monitória', 'Penhora e Bloqueio de Ativos (BacenJud)', 'Embargos à Execução', 'Desconsideração da Personalidade Jurídica', 'Negociação e Acordo Extrajudicial', 'Defesa do Devedor'],
  },
  {
    icon: Scale,
    title: 'Responsabilidade Civil',
    gradient: 'linear-gradient(135deg, #e11d48, #db2777)',
    bgLight: 'bg-rose-50',
    borderColor: 'border-rose-200',
    content: [
      'A responsabilidade civil é o instituto jurídico que impõe a obrigação de reparar o dano causado a outrem, seja por ação ou omissão, dolosa ou culposa. No ordenamento brasileiro, distingue-se entre responsabilidade subjetiva (que exige a comprovação de culpa ou dolo do agente) e responsabilidade objetiva (que prescinde da culpa, bastando o nexo de causalidade e o dano, como nos casos de atividades de risco e nas relações de consumo). O Código Civil, em seu artigo 927, parágrafo único, estabelece a obrigação de reparar o dano independentemente de culpa quando a atividade normalmente desenvolvida pelo autor do dano implicar, por sua natureza, risco para os direitos de outrem.',
      'A responsabilidade civil pode decorrer de atos ilícitos (extracontratuais) ou do descumprimento de obrigações contratuais. Abrange desde acidentes pessoais e danos materiais até violações a direitos de personalidade, danos morais coletivos, responsabilidade profissional de médicos, advogados e engenheiros, responsabilidade civil do Estado, danos ambientais e responsabilidade civil nas relações familiares. Nossa equipe oferece assessoria especializada tanto na propositura de ações indenizatórias quanto na defesa em processos de responsabilidade civil, sempre com análise criteriosa das peculiaridades de cada caso.',
    ],
    topics: ['Responsabilidade Subjetiva e Objetiva', 'Responsabilidade por Atos Ilícitos', 'Responsabilidade Profissional', 'Responsabilidade Civil do Estado', 'Responsabilidade por Dano Ambiental', 'Responsabilidade nas Relações de Consumo', 'Excludentes de Responsabilidade'],
  },
  {
    icon: Landmark,
    title: 'Usucapião e Direitos Reais',
    gradient: 'from-emerald-600 to-teal-600',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    content: [
      'A usucapião é o modo originário de aquisição da propriedade pelo decurso do tempo, aliado à posse mansa, pacífica, contínua e com animus domini. O instituto encontra fundamento no Código Civil (arts. 1.238 a 1.244) e na Constituição Federal, que prevê modalidades especiais como a usucapião especial urbana (art. 183) e rural (art. 191). São modalidades de usucapião: extraordinária (15 anos, ou 10 anos com moradia ou obra), ordinária (10 anos, ou 5 anos com título e boa-fé), especial urbana (5 anos, imóvel de até 250m²), especial rural (5 anos, área de até 50 hectares) e familiar (2 anos, abandono do lar).',
      'Os direitos reais, regulados nos artigos 1.225 a 1.510 do Código Civil, compreendem a propriedade, a superfície, as servidões, o usufruto, o uso, a habitação, a enfiteuse, a anticrese, o penhor, a hipoteca e a propriedade fiduciária. Cada um desses direitos confere ao titular prerrogativas específicas sobre a coisa alheia ou própria. Assessoramos clientes em ações de usucapião judicial e extrajudicial (pela via administrativa em cartório, nos termos da Lei 13.465/2017), regularização fundiária, instituição e extinção de direitos reais sobre imóveis, além de consultoria preventiva para evitar conflitos possessórios.',
    ],
    topics: ['Usucapião Extraordinária e Ordinária', 'Usucapião Especial Urbana e Rural', 'Usucapião Familiar e Coletiva', 'Usucapião Extrajudicial em Cartório', 'Direito de Superfície e Servidão', 'Usufruto, Uso e Habitação', 'Propriedade Fiduciária e Hipoteca'],
  },
  {
    icon: BookOpen,
    title: 'Obrigações',
    gradient: 'linear-gradient(135deg, #7c3aed, #9333ea)',
    bgLight: 'bg-violet-50',
    borderColor: 'border-violet-200',
    content: [
      'O Direito das Obrigações é o núcleo central do Direito Civil, disciplinando as relações jurídicas de conteúdo patrimonial entre credor e devedor. Regulado pelos artigos 233 a 965 do Código Civil, estabelece as regras sobre o nascimento, classificação, transmissão, adimplemento e extinção das obrigações, bem como as consequências do inadimplemento. A doutrina clássica classifica as obrigações quanto ao objeto (positivas — dar e fazer — e negativas — não fazer), quanto aos sujeitos (simples, solidárias, divisíveis e indivisíveis) e quanto ao conteúdo (de meio, de resultado e de garantia).',
      'O inadimplemento obrigacional, seja absoluto (quando a prestação se tornou impossível ou sem utilidade ao credor) ou relativo (mora), gera consequências jurídicas como a incidência de juros, correção monetária, multa, cláusula penal, perdas e danos e, em casos extremos, a resolução do contrato. A boa-fé objetiva impõe deveres anexos de conduta, como lealdade, informação e cooperação, cuja violação pode configurar adimplemento substancial ou ensejar indenização autônoma. Oferecemos consultoria e contencioso em todas as matérias obrigacionais, incluindo cessão de crédito, assunção de dívida, fiança, arras, evicção e vícios redibitórios.',
    ],
    topics: ['Classificação das Obrigações', 'Adimplemento e Pagamento', 'Inadimplemento e Mora', 'Juros, Multa e Correção Monetária', 'Cláusula Penal e Arras', 'Cessão de Crédito e Assunção de Dívida', 'Evicção e Vícios Redibitórios'],
  },
  {
    icon: Key,
    title: 'Locação e Direito Imobiliário',
    gradient: 'linear-gradient(135deg, #0d9488, #0891b2)',
    bgLight: 'bg-teal-50',
    borderColor: 'border-teal-200',
    content: [
      'A locação de imóveis urbanos e rurais é regida pela Lei do Inquilinato (Lei 8.245/91), que estabelece os direitos e obrigações de locadores e locatários, prazos contratuais, reajustes de aluguel, benfeitorias, direito de preferência, retomada do imóvel, ação de despejo, renovatória, revisional de aluguel e consignação de chaves. A lei busca equilibrar a relação locatícia, protegendo o inquilino contra abusos sem desestimular a oferta de imóveis para locação. O contrato de locação pode ser residencial, comercial ou temporada, cada qual com regras específicas quanto à duração, garantia e forma de extinção.',
      'O Direito Imobiliário vai muito além da locação, abrangendo a compra e venda de imóveis, incorporação imobiliária, loteamento, condomínio edilício, direito de laje, regularização fundiária urbana (Reurb), licenciamento ambiental para empreendimentos imobiliários, contratos de permuta, dação em pagamento, direito de preferência do inquilino e ações possessórias (reintegração de posse, manutenção de posse e interdito proibitório). Assessoramos compradores, vendedores, incorporadoras, construtoras, condomínios e investidores em todas as etapas do negócio imobiliário, desde a due diligence até o registro em cartório.',
    ],
    topics: ['Contratos de Locação Residencial e Comercial', 'Ação de Despejo e Revisional de Aluguel', 'Compra e Venda de Imóveis', 'Incorporação e Loteamento', 'Condomínio Edilício e Taxas', 'Regularização Fundiária (Reurb)', 'Ações Possessórias'],
  },
  {
    icon: Users,
    title: 'Sucessões e Inventário',
    gradient: 'from-stone-600 to-amber-700',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    content: [
      'O Direito das Sucessões, regulado pelos artigos 1.784 a 2.027 do Código Civil, disciplina a transmissão do patrimônio do falecido aos seus herdeiros e legatários. Abrange a herança como um todo, a vocação hereditária, a aceitação e renúncia da herança, a exclusão por indignidade, a sucessão legítima (entre descendentes, ascendentes, cônjuges e colaterais), a sucessão testamentária e o inventário judicial e extrajudicial. A sucessão legítima é a forma mais comum, ocorrendo quando o falecido não deixou testamento ou quando este é parcial ou inválido.',
      'O inventário pode ser judicial (obrigatório quando há testamento, herdeiros incapazes ou conflito entre os herdeiros) ou extrajudicial (feito em cartório de notas, por escritura pública, quando todos os herdeiros são capazes, concordes e assistidos por advogado). O planejamento sucessório, por sua vez, é ferramenta preventiva que permite organizar a transmissão de bens em vida, reduzindo custos processuais, conflitos familiares e carga tributária (ITCMD). Instrumentos como testamento, doação com usufruto vitalício, holding familiar e seguro de vida são estrategicamente combinados para atender aos objetivos do titular do patrimônio. Prestamos assessoria completa em inventários judiciais e extrajudiciais, planejamento sucessório e testamentos.',
    ],
    topics: ['Inventário Judicial e Extrajudicial', 'Sucessão Legítima: Herdeiros Necessários', 'Sucessão Testamentária', 'Planejamento Sucessório e Holding Familiar', 'ITCMD e Tributação Sucessória', 'Doação com Usufruto Vitalício', 'Partilha de Bens e Colação'],
  },
]

import SEO from '../components/SEO'

export default function DireitoCivel() {
return (
    <div>
      <SEO
        title="Direito Cível | Will & Pereira Advocacia"
        description="Assessoria jurídica em Direito Cível: contratos, indenizações, responsabilidade civil e obrigações."
        canonical="https://willepereira-adv.vercel.app/civel"
      />
      {/* ═══════ HERO ═══════ */}
      <section className="relative pt-32 pb-20 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a2634_0%,_#0f1729_100%)]" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-emerald-500/3 rounded-full blur-[100px]" />
        <div className="relative z-10 container text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-emerald-500/15 text-emerald-400 text-xs font-semibold uppercase tracking-widest rounded-full mb-4"
          >
            Direito Cível
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4"
          >
            Soluções em Direito Cível
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-3xl mx-auto text-base md:text-lg leading-relaxed"
          >
            Assessoria especializada nas mais diversas áreas do Direito Cível — de ações de indenização e contratos 
            a sucessões e inventário. Atuamos na defesa dos seus direitos com excelência, ética e compromisso.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Link to="/contato" className="btn-primary text-base px-8 py-4">
              Fale Conosco <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════ INTRODUÇÃO ═══════ */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-700 text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-5">
                Visão Geral
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-navy leading-tight mb-6">
                O Que é o <span className="text-gradient-gold">Direito Cível</span>
              </h2>
              <div className="gold-divider mb-6" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="space-y-5 text-gray-600 leading-relaxed text-base md:text-lg">
                <p>
                  O Direito Cível é o ramo mais abrangente do direito privado, responsável por disciplinar as relações 
                  jurídicas entre pessoas físicas e jurídicas no âmbito patrimonial e existencial. Também conhecido como 
                  Direito Civil, é o conjunto de normas que regulam a vida do cidadão desde o nascimento até a morte, 
                  abrangendo temas como a personalidade jurídica, a capacidade civil, os direitos da personalidade, 
                  os bens, os fatos e atos jurídicos, os contratos, a responsabilidade civil, os direitos reais, 
                  as obrigações, o direito de família e as sucessões.
                </p>
                <p>
                  No Brasil, o Direito Civil é codificado no Código Civil (Lei 10.406/2002), que entrou em vigor em 
                  2003 em substituição ao Código de 1916. A nova codificação trouxe importantes inovações, como a 
                  consagração da função social do contrato e da propriedade, a boa-fé objetiva como princípio 
                  contratual, a responsabilidade civil objetiva para atividades de risco, o reconhecimento da união 
                  estável como entidade familiar, a igualdade entre homens e mulheres na chefia familiar e a 
                  simplificação do regime de bens no casamento. O CC/2002 é estruturado em Parte Geral e Parte Especial, 
                  que se subdivide em cinco livros: Direito das Obrigações, Direito de Empresa, Direito das Coisas, 
                  Direito de Família e Direito das Sucessões.
                </p>
                <p>
                  A <strong>Will & Pereira Advocacia</strong> possui vasta experiência na condução de causas cíveis, 
                  atuando tanto em consultoria preventiva quanto em contencioso estratégico. Nossa equipe está preparada 
                  para enfrentar os desafios mais complexos do Direito Cível, sempre com abordagem personalizada e 
                  compromisso com os melhores resultados para nossos clientes. Abaixo, detalhamos cada uma das áreas 
                  em que atuamos.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════ ÁREAS EM DESTAQUE ═══════ */}
      <section className="section-padding bg-gradient-to-b from-cream to-warm">
        <div className="container-premium">
          <SectionHeading
            label="Nossa Atuação"
            title="Áreas do Direito Cível"
            subtitle="Conheça em detalhes cada uma das áreas do Direito Cível em que oferecemos assessoria jurídica completa."
          />

          <div className="space-y-20">
            {topicosCivel.map((area, idx) => (
              <TopicBlock key={area.title} area={area} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="relative py-20 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(16,185,129,0.06)_0%,_transparent_60%)]" />
        <div className="relative z-10 container-premium text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-emerald-500/15 text-emerald-400 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
              Atendimento Personalizado
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4">
              Precisa de Ajuda com <span className="text-gradient-gold">Direito Cível</span>?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-base md:text-lg">
              Nossa equipe está pronta para analisar seu caso e oferecer a melhor estratégia jurídica. 
              Entre em contato e agende uma consulta.
            </p>
            <Link to="/contato" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all duration-300">
              Solicitar Atendimento <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ DIFERENCIAIS ═══════ */}
      <section className="section-padding">
        <div className="container-premium">
          <SectionHeading
            label="Por Que nos Escolher"
            title="Nossos Diferenciais no Direito Cível"
            subtitle="Anos de experiência e dedicação nos credenciam como referência em causas cíveis."
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Scale, title: 'Expertise Técnica', desc: 'Conhecimento aprofundado do Código Civil, da jurisprudência consolidada e das súmulas dos tribunais superiores para fundamentar cada estratégia jurídica.' },
              { icon: Building2, title: 'Atendimento Personalizado', desc: 'Cada caso cível é único. Analisamos minuciosamente as particularidades da sua situação antes de propor qualquer medida judicial ou extrajudicial.' },
              { icon: Users, title: 'Equipe Especializada', desc: 'Advogados dedicados ao Direito Cível, com formação continuada e experiência em negociações complexas, mediação, arbitragem e contencioso estratégico.' },
              { icon: FileText, title: 'Consultoria Preventiva', desc: 'Atuamos preventivamente na elaboração de contratos, planejamento sucessório e regularização imobiliária para evitar litígios dispendiosos.' },
              { icon: Landmark, title: 'Atuação Nacional', desc: 'Atendemos clientes em todo o Brasil, tanto presencialmente em nossa sede em Palhoça/SC quanto por plataformas online.' },
              { icon: BookOpen, title: 'Transparência Total', desc: 'Comunicação clara e objetiva sobre honorários, prazos, riscos e chances de êxito. Você participa de cada decisão importante do seu processo.' },
            ].map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:shadow-navy/5 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <d.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg text-navy mb-2">{d.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="section-padding bg-cream">
        <div className="container-premium">
          <SectionHeading
            label="Dúvidas Frequentes"
            title="Perguntas Sobre Direito Cível"
            subtitle="Esclarecemos as principais dúvidas sobre nossas áreas de atuação cível."
          />

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'Qual o prazo para entrar com uma ação de indenização por danos morais?',
                a: 'O prazo prescricional para a pretensão de reparação civil é de 3 anos, conforme o artigo 206, §3º, inciso V do Código Civil. Esse prazo conta-se da data em que o titular do direito teve ciência do dano e de quem seja o seu autor. Para danos decorrentes de relação de consumo, o prazo é de 5 anos (art. 27 do CDC). É fundamental buscar orientação jurídica o mais breve possível para não perder o prazo legal.',
              },
              {
                q: 'Como funciona o inventário extrajudicial?',
                a: 'O inventário extrajudicial é realizado por escritura pública em cartório de notas, sem necessidade de processo judicial. É permitido quando todos os herdeiros são capazes, estão de acordo com a partilha e são assistidos por advogado. Não pode ser utilizado quando há testamento ou herdeiro incapaz (menor de idade ou interdito). É mais rápido e econômico que o inventário judicial, podendo ser concluído em semanas.',
              },
              {
                q: 'O que é usucapião e quais os requisitos?',
                a: 'Usucapião é a forma de adquirir a propriedade de um imóvel pela posse prolongada, sem oposição do proprietário. Os requisitos variam conforme a modalidade: usucapião extraordinária (15 anos de posse, sem necessidade de título ou boa-fé), ordinária (10 anos com justo título e boa-fé), especial urbana (5 anos, imóvel de até 250m² para moradia), especial rural (5 anos, área de até 50 hectares) e familiar (2 anos, abandono do lar).',
              },
              {
                q: 'Qual a diferença entre dano moral e dano material?',
                a: 'O dano material (ou patrimonial) atinge o patrimônio da vítima, subdividindo-se em danos emergentes (o que efetivamente se perdeu) e lucros cessantes (o que se deixou de ganhar). Já o dano moral atinge direitos da personalidade, como honra, imagem, intimidade e dignidade, não tendo natureza patrimonial. Ambos podem ser cumulados numa mesma ação indenizatória, desde que decorrentes do mesmo fato.',
              },
              {
                q: 'Preciso de advogado para fazer um contrato de locação?',
                a: 'Embora não seja obrigatório por lei, a assistência de um advogado especializado na elaboração ou revisão de contratos de locação é altamente recomendável. Um contrato bem redigido previne conflitos, estabelece claramente direitos e obrigações, define regras para reajuste, benfeitorias e rescisão, e garante a segurança jurídica da relação entre locador e locatário.',
              },
              {
                q: 'O que é planejamento sucessório e quando fazer?',
                a: 'O planejamento sucessório é o conjunto de estratégias jurídicas para organizar a transmissão de bens e patrimônio de forma eficiente, reduzindo conflitos familiares, custos processuais e carga tributária (ITCMD). Deve ser feito preferencialmente em vida, por meio de testamentos, doações com usufruto vitalício, holding familiar ou seguros de vida. É recomendado para qualquer pessoa que possua patrimônio e deseje garantir sua vontade quanto à destinação dos bens.',
              },
            ].map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group bg-white rounded-xl border border-gray-100 overflow-hidden open:shadow-lg open:shadow-navy/5 transition-all duration-300"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none text-navy font-medium hover:bg-gray-50 transition-colors">
                  <span className="pr-4">{faq.q}</span>
                  <motion.span
                    className="text-gold shrink-0"
                    whileOpen={{ rotate: 180 }}
                  >
                    <ArrowRight size={16} className="group-open:rotate-90 transition-transform duration-300" />
                  </motion.span>
                </summary>
                <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="py-16 bg-navy-dark">
        <div className="container-premium text-center">
          <p className="text-gray-400 text-sm mb-4">
            Will & Pereira Advocacia — Especialistas em Direito Cível
          </p>
          <p className="text-gray-500 text-xs">
            OAB/SC • Atendimento em todo o Brasil • (48) 98458-4181
          </p>
        </div>
      </section>
    </div>
  )
}

/* ===== TOPIC BLOCK ===== */
function TopicBlock({ area, idx }: { area: typeof topicosCivel[0]; idx: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = area.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        {/* Main content */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: area.gradient }}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-navy">{area.title}</h3>
          </div>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            {area.content.map((paragraph, pi) => (
              <p key={pi}>{paragraph}</p>
            ))}
          </div>
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 mt-5 px-6 py-2.5 bg-navy text-white text-sm rounded-full hover:bg-navy-light transition-all duration-300"
          >
            Consultar Advogado <ArrowRight size={14} />
          </Link>
        </div>

        {/* Topics sidebar */}
        <div className={`lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-navy/5 ${idx % 2 === 0 ? 'lg:order-last' : ''}`}>
          <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-semibold">Principais Serviços</h4>
          <div className="space-y-2">
            {area.topics.map(topic => (
              <div key={topic} className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-emerald-50 transition-colors">
                <CheckCircle size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                <span className="text-sm text-navy leading-snug">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider between sections */}
      {idx < topicosCivel.length - 1 && (
        <div className="mt-16 border-t border-gray-200/70" />
      )}
    </motion.div>
  )
}
