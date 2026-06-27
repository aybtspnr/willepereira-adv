import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  Scale, Shield, Heart, Users, Building2, FileText,
  ArrowRight, ChevronRight, CheckCircle, Phone, BookOpen,
  MapPin, Award, Star, Quote, Gavel, Briefcase, Landmark,
  Clock, Globe, MessageSquare, ExternalLink, Target
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

function Counter({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const step = Math.ceil(end / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, end])
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-display text-gradient-gold">{count}{suffix}</div>
      <div className="text-navy-light text-sm mt-2 font-medium">{label}</div>
    </div>
  )
}

const servicosData = [
  {
    icon: Heart, title: 'Direito Previdenciário',
    desc: 'Especialidade principal do escritório. Atuamos em todo o Brasil com excelência em benefícios do INSS, aposentadorias, pensões, auxílio-doença, BPC/LOAS e revisão de benefícios.',
    topics: ['Aposentadoria Urbana e Rural', 'Auxílio-Doença e Invalidez', 'Pensão por Morte', 'BPC/LOAS', 'Revisão de Benefícios'],
    gradient: 'from-rose-600 to-pink-600', bgLight: 'bg-rose-50', borderColor: 'border-rose-200',
  },
  {
    icon: Briefcase, title: 'Direito Trabalhista',
    desc: 'Defesa dos direitos dos trabalhadores em relações de emprego. Atuamos em reclamações trabalhistas, rescisões contratuais, horas extras, acidente de trabalho e equiparação salarial.',
    topics: ['Reclamações Trabalhistas', 'Rescisão Contratual', 'Horas Extras', 'Acidente de Trabalho', 'Equiparação Salarial'],
    gradient: 'from-blue-600 to-indigo-600', bgLight: 'bg-blue-50', borderColor: 'border-blue-200',
  },
  {
    icon: Building2, title: 'Direito Cível',
    desc: 'Soluções jurídicas abrangentes para conflitos civis, contratos, responsabilidade civil, indenizações, cobranças e obrigações. Assessoria preventiva e contenciosa.',
    topics: ['Ações de Indenização', 'Contratos', 'Cobranças', 'Responsabilidade Civil', 'Direito Imobiliário'],
    gradient: 'from-emerald-600 to-teal-600', bgLight: 'bg-emerald-50', borderColor: 'border-emerald-200',
  },
  {
    icon: Shield, title: 'Direito do Consumidor',
    desc: 'Proteção contra abusos nas relações de consumo. Defendemos seus direitos em casos de cobranças indevidas, negativação injusta, vícios de produtos e serviços, planos de saúde.',
    topics: ['Cobranças Indevidas', 'Negativação Injusta', 'Vícios em Produtos', 'Planos de Saúde', 'Revisão de Contratos'],
    gradient: 'from-amber-600 to-orange-600', bgLight: 'bg-amber-50', borderColor: 'border-amber-200',
  },
  {
    icon: Users, title: 'Direito de Família',
    desc: 'Atuação sensível em questões familiares. Divórcio, guarda, pensão alimentícia, inventário, união estável e planejamento sucessório com atendimento humanizado.',
    topics: ['Divórcio', 'Guarda de Filhos', 'Pensão Alimentícia', 'Inventário', 'União Estável'],
    gradient: 'from-violet-600 to-purple-600', bgLight: 'bg-violet-50', borderColor: 'border-violet-200',
  },
  {
    icon: Landmark, title: 'Direito Imobiliário',
    desc: 'Assessoria completa em direito imobiliário. Usucapião, contratos de compra e venda, regularização de imóveis, ações possessórias e incorporação imobiliária.',
    topics: ['Usucapião', 'Compra e Venda', 'Regularização', 'Ações Possessórias', 'Incorporação'],
    gradient: 'from-teal-600 to-cyan-600', bgLight: 'bg-teal-50', borderColor: 'border-teal-200',
  },
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 150])
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95])

  // Floating particles for hero
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 8 + 5,
  }))

  return (
    <div>
      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[650px] max-h-[1000px] flex items-center overflow-hidden bg-navy-dark">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-dark" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c9a84c\' fill-opacity=\'1\'%3E%3Cpath d=\'M40 0L0 40l40 40L80 40z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gold/3 rounded-full blur-[100px]" />

        {/* Floating particles */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-gold/20 rounded-full"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}

        {/* Hero content */}
        <motion.div style={{ opacity: heroOpacity, y: heroY, scale: heroScale }} className="relative z-10 w-full">
          <div className="container-premium">
            <div className="max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <div className="flex items-center gap-3 text-gold/80 text-sm font-medium mb-8 tracking-wide">
                  <Scale size={16} />
                  <span className="uppercase tracking-[0.15em]">Will & Pereira Advocacia</span>
                  <span className="w-8 h-px bg-gold/40" />
                  <span className="text-gold/60 text-xs">Desde 2011</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-8"
              >
                Advocacia que{' '}
                <span className="text-gradient-gold">protege</span>
                <br />
                seus direitos.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed mb-10"
              >
                Atendimento jurídico especializado em Direito Previdenciário, Trabalhista, Cível e Família. 
                Presença em todo o Brasil com excelência e dedicação.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/contato" className="btn-primary text-base px-8 py-4 group">
                  Consulta Gratuita
                  <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                </Link>
                <Link to="/servicos" className="btn-outline btn-outline-light text-base px-8 py-4">
                  Nossas Áreas
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="mt-12 flex flex-wrap items-center gap-6 text-gray-500 text-xs uppercase tracking-widest"
              >
                <span className="text-gray-600">Atendimento Nacional</span>
                <span className="w-px h-4 bg-white/10" />
                <span>OAB/SC</span>
                <span className="w-px h-4 bg-white/10" />
                <span>15+ Anos</span>
                <span className="w-px h-4 bg-white/10" />
                <span>5.000+ Casos</span>
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

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="relative -mt-16 z-20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl px-8 py-10 md:py-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Counter end={15} suffix="+" label="Anos de Experiência" />
              <Counter end={5000} suffix="+" label="Casos Atendidos" />
              <Counter end={98} suffix="%" label="Aprovação em Benefícios" />
              <Counter end={27} suffix="+" label="Cidades Atendidas" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ SOBRE ═══════════════ */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold-dark text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-5">
                Quem Somos
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-navy leading-tight mb-6">
                Seus Direitos em<br />
                <span className="text-gradient-gold">Mãos Experientes</span>
              </h2>
              <div className="gold-divider mb-6" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  A <strong>Will & Pereira Advocacia</strong> nasceu da convicção de que o acesso à justiça 
                  não deve ser um privilégio, mas um direito de todos os brasileiros. Fundado em 2011, 
                  em Palhoça, Santa Catarina, nosso escritório cresceu guiado por valores sólidos: 
                  ética, transparência e compromisso inabalável com cada cliente.
                </p>
                <p>
                  Ao longo de mais de 15 anos de atuação, construímos uma sólida reputação na defesa 
                  dos direitos previdenciários, trabalhistas, cíveis e consumeristas. Já atendemos mais 
                  de 5.000 clientes em 27 cidades brasileiras, sempre com a mesma dedicação: tratar 
                  cada caso como único e cada cliente como parte da nossa família.
                </p>
                <p>
                  Nossa equipe é formada por profissionais especializados e atualizados com as constantes 
                  mudanças na legislação brasileira. Acreditamos que o conhecimento jurídico aliado a 
                  um atendimento humanizado é a chave para resultados excepcionais. Por isso, investimos 
                  continuamente em capacitação e tecnologia para oferecer o melhor serviço jurídico 
                  do Brasil.
                </p>
              </div>
              <Link to="/contato" className="btn-outline btn-outline-dark mt-8">
                Conheça Nossa Equipe <ArrowRight size={16} />
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-cream">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-navy/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Scale className="w-20 h-20 text-gold/20 mx-auto mb-4" />
                      <p className="text-gray-300 text-sm">Will & Pereira Advocacia</p>
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 -right-6 bg-navy text-white rounded-2xl p-6 shadow-2xl max-w-[200px]"
                >
                  <Award className="text-gold mb-2" size={24} />
                  <p className="text-sm font-medium">Mais de 15 anos defendendo seus direitos</p>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>

          {/* Values */}
          <ScrollReveal className="mt-20">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Target, title: 'Excelência', desc: 'Profissionais especializados e atualizados com as constantes mudanças legislativas para oferecer a melhor estratégia jurídica.' },
                { icon: Heart, title: 'Humanização', desc: 'Atendimento acolhedor e personalizado. Cada cliente é tratado com respeito, dignidade e atenção às suas necessidades específicas.' },
                { icon: Shield, title: 'Transparência', desc: 'Comunicação clara e honesta em todas as etapas do processo. Você acompanha cada passo e entende cada decisão.' },
              ].map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-cream rounded-2xl p-8 hover-lift"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center mb-4">
                    <v.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════ SERVIÇOS ═══════════════ */}
      <section className="section-padding bg-cream">
        <div className="container-premium">
          <SectionHeading
            label="Áreas de Atuação"
            title="Soluções Jurídicas Completas"
            subtitle="Atuamos nas principais áreas do Direito brasileiro, com especial destaque para o Direito Previdenciário. Atendimento em todo o Brasil, presencial e online."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicosData.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-2xl hover:shadow-navy/10 transition-all duration-500"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.gradient} bg-opacity-10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl mb-3">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <div className="space-y-1.5 mb-5">
                    {s.topics.map(t => (
                      <div key={t} className="flex items-center gap-2 text-xs text-gray-500">
                        <CheckCircle size={12} className="text-gold shrink-0" />
                        {t}
                      </div>
                    ))}
                  </div>
                  <Link to="/contato" className="inline-flex items-center gap-1 text-sm font-medium text-gold-dark hover:text-gold transition-colors">
                    Saiba mais <ChevronRight size={14} />
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <ScrollReveal className="text-center mt-12">
            <Link to="/servicos" className="btn-outline btn-outline-dark px-8 py-3.5">
              Ver Todas as Áreas <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════ WHY US ═══════════════ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,168,76,0.06)_0%,_transparent_60%)]" />
        <div className="relative z-10 container-premium">
          <SectionHeading
            label="Diferenciais"
            title="Por Que nos Escolher"
            subtitle="Somos mais que advogados — somos parceiros na defesa dos seus direitos. Conheça nossos diferenciais."
            light
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Award, title: 'Expertise Consolidada', desc: 'Mais de 15 anos de atuação especializada em Direito Previdenciário e demais áreas. Centenas de benefícios concedidos e causas vencidas.' },
              { icon: Globe, title: 'Atendimento Nacional', desc: 'Atendemos clientes em todo o Brasil, tanto presencialmente em nossa sede em Palhoça/SC quanto online por videoconferência.' },
              { icon: MessageSquare, title: 'Comunicação Clara', desc: 'Explicamos cada etapa do processo em linguagem simples e acessível. Você nunca fica sem saber o que está acontecendo.' },
              { icon: Clock, title: 'Agilidade e Eficiência', desc: 'Utilizamos tecnologia para acelerar processos sem abrir mão da qualidade. Resultados mais rápidos sem comprometer a excelência.' },
              { icon: Shield, title: 'Ética e Transparência', desc: 'Atuamos com total transparência na condução dos casos. Honorários claros, sem surpresas. O cliente sempre sabe onde está investindo.' },
              { icon: Users, title: 'Atendimento Personalizado', desc: 'Cada caso é único e merece atenção individual. Não tratamos clientes como números — construímos relações de confiança duradouras.' },
            ].map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-5 p-6 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <d.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-lg text-white mb-1">{d.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT MORE ═══════════════ */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal className="order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-navy/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <img src="/logo-icon.png" alt="WP" className="w-24 h-24 mx-auto mb-4 opacity-30" />
                    <p className="text-gray-300 text-sm">Compromisso com a justiça desde 2011</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="order-1 lg:order-2">
              <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold-dark text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-5">
                Nossa Filosofia
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-navy leading-tight mb-6">
                Justiça com<br />
                <span className="text-gradient-gold">Excelência</span>
              </h2>
              <div className="gold-divider mb-6" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Na Will & Pereira Advocacia, acreditamos que o Direito é uma ferramenta de transformação 
                  social. Cada causa que abraçamos representa uma história, um sonho, uma necessidade real 
                  de alguém que busca seus direitos. É com esse entendimento que conduzimos nosso trabalho 
                  diário.
                </p>
                <p>
                  Nossa atuação em Direito Previdenciário é reconhecida pela excelência. Já ajudamos 
                  centenas de brasileiros a conquistarem suas aposentadorias, pensões e benefícios 
                  assistenciais. Conhecemos profundamente a legislação previdenciária e as nuances do 
                  INSS, o que nos permite oferecer estratégias jurídicas eficientes para cada caso.
                </p>
                <p>
                  Além do Previdenciário, nossa equipe está preparada para enfrentar desafios nas áreas 
                  Trabalhista, Cível, Consumidor, Família e Imobiliário. Seja qual for sua necessidade 
                  jurídica, você encontra na Will & Pereira um time comprometido com a solução.
                </p>
                <p>
                  Estamos prontos para ouvir seu caso. Não importa onde você esteja no Brasil — nosso 
                  atendimento online leva a expertise do nosso escritório até você, com a mesma qualidade 
                  e dedicação do atendimento presencial.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ BLOG ═══════════════ */}
      <section className="section-padding bg-cream">
        <div className="container-premium">
          <SectionHeading
            label="Blog Jurídico"
            title="Artigos e Atualizações"
            subtitle="Informações jurídicas atualizadas para ajudar você a entender e proteger seus direitos."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Aposentadoria por Idade: Guia Atualizado 2026', slug: 'aposentadoria-por-idade-2026', cat: 'Previdenciário', date: '25 Jun 2026' },
              { title: 'Direitos do Trabalhador na Rescisão: O Que Não Te Contam', slug: 'direitos-trabalhistas-rescisao', cat: 'Trabalhista', date: '24 Jun 2026' },
              { title: 'Como Pedir Auxílio-Doença: Passo a Passo Completo', slug: 'como-pedir-auxilio-doenca-inss', cat: 'Previdenciário', date: '23 Jun 2026' },
            ].map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-gold/10 text-gold-dark text-xs font-semibold rounded-full">
                    {post.cat}
                  </span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-lg mb-3 leading-snug group-hover:text-gold-dark transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-gold-dark hover:text-gold transition-colors">
                  Ler artigo <ChevronRight size={14} />
                </Link>
              </motion.article>
            ))}
          </div>

          <ScrollReveal className="text-center mt-12">
            <Link to="/blog" className="btn-outline btn-outline-dark px-8 py-3.5">
              <BookOpen size={16} /> Todos os Artigos
            </Link>
          </ScrollReveal>
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
              Não Deixe Seus Direitos<br />
              <span className="text-gradient-gold">Para Depois</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Agende uma consulta gratuita e descubra como podemos ajudar você 
              a resolver seu caso com a excelência que você merece.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contato" className="btn-primary text-base px-8 py-4">
                <Phone size={18} /> Consulta Gratuita
              </Link>
              <a href="tel:+5548999999999" className="btn-outline btn-outline-light text-base px-8 py-4">
                (48) 99999-9999
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
