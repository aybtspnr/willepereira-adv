import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Scale, Heart, Shield, Clock, MapPin, Phone, ArrowRight, Briefcase, Target, Globe, Star, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const values = [
  { icon: Scale, title: 'Excelência Jurídica', desc: 'Atuamos com rigor técnico e atualização constante para oferecer a melhor solução legal.' },
  { icon: Heart, title: 'Atendimento Humanizado', desc: 'Cada cliente é único. Escutamos, entendemos e agimos com empatia e dedicação.' },
  { icon: Shield, title: 'Ética e Transparência', desc: 'Honorários claros, sem surpresas. O cliente sempre sabe onde está investindo.' },
  { icon: Target, title: 'Foco em Resultados', desc: 'Nosso objetivo é alcançar a melhor solução jurídica para cada caso.' },
  { icon: Clock, title: 'Agilidade', desc: 'Processos otimizados com tecnologia para entregar resultados mais rápido.' },
  { icon: Globe, title: 'Atendimento Nacional', desc: 'Presencial em Palhoça/SC e online para todo o Brasil.' },
]

const areas = [
  { icon: Heart, title: 'Direito Previdenciário', desc: 'Aposentadorias, auxílio-doença, pensão por morte, BPC/LOAS e revisão de benefícios do INSS.' },
  { icon: Briefcase, title: 'Direito Trabalhista', desc: 'Reclamações trabalhistas, rescisões, horas extras, acidente de trabalho e assédio moral.' },
  { icon: Scale, title: 'Direito Cível', desc: 'Indenizações, contratos, cobranças, responsabilidade civil e direito imobiliário.' },
  { icon: Shield, title: 'Direito do Consumidor', desc: 'Cobranças indevidas, negativação, vícios em produtos, planos de saúde e práticas abusivas.' },
  { icon: Users, title: 'Direito de Família', desc: 'Divórcio, guarda, pensão alimentícia, inventário, união estável e planejamento sucessório.' },
  { icon: MapPin, title: 'Direito Imobiliário', desc: 'Usucapião, contratos de compra e venda, regularização, ações possessórias e incorporação.' },
]

const stats = [
  { num: '15+', label: 'Anos de Experiência' },
  { num: '5.000+', label: 'Casos Atendidos' },
  { num: '27+', label: 'Cidades Atendidas' },
  { num: '100%', label: 'Dedicação ao Cliente' },
]

const testimonials = [
  {
    text: 'Excelente atendimento! Resolveram meu caso previdenciário com muita competência e agilidade. Recomendo!',
    author: 'Maria S.',
    area: 'Direito Previdenciário',
  },
  {
    text: 'Profissionais sérios e comprometidos. Me senti segura durante todo o processo de divórcio.',
    author: 'Ana P.',
    area: 'Direito de Família',
  },
  {
    text: 'Equipe muito atenciosa e eficiente. Conquistaram minha confiança desde a primeira consulta.',
    author: 'Carlos M.',
    area: 'Direito Trabalhista',
  },
]

export default function EscritorioPage() {
  return (
    <div>
      <SEO
        title="Escritório Advocacia Will & Pereira Palhoça/SC Brasil"
        description="Conheça o escritório Will & Pereira Advocacia. Mais de 15 anos de experiência em Palhoça/SC com atendimento jurídico personalizado em todo o Brasil."
        canonical="https://willepereira-adv.vercel.app/escritorio"
      />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: 'var(--navy-dark)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(201,168,76,0.3) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 opacity-5" style={{ background: 'var(--gold)', filter: 'blur(120px)', borderRadius: '50%' }} />
        <div className="relative z-10 text-center" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest rounded-full mb-6"
            style={{ color: 'var(--gold)' }}
          >
            <span className="w-6 h-px" style={{ background: 'var(--gold)' }} />
            Sobre Nós
            <span className="w-6 h-px" style={{ background: 'var(--gold)' }} />
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
          >
            Nosso Escritório
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg"
          >
            Conheça a equipe que cuida dos seus direitos com excelência e compromisso.
          </motion.p>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12" style={{ background: 'var(--navy-dark)' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-center py-6"
              >
                <div className="text-3xl md:text-4xl font-serif mb-2" style={{ color: 'var(--gold)' }}>{stat.num}</div>
                <div className="text-xs uppercase tracking-widest" style={{ color: 'var(--gray-400)' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="py-24 md:py-28" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: 'var(--gold)' }}>
                <span className="w-6 h-px" style={{ background: 'var(--gold)' }} />
                Quem Somos
              </span>
              <h1 className="font-serif text-3xl md:text-4xl leading-tight mb-6" style={{ color: 'var(--navy)' }}>
                Compromisso com a justiça desde 2011
              </h1>
              <div className="space-y-4" style={{ color: 'var(--gray-600)' }}>
                <p className="leading-relaxed">
                  O escritório <strong style={{ color: 'var(--navy)' }}>Will & Pereira Advocacia</strong> foi fundado com o propósito de oferecer serviços jurídicos de excelência, pautados pela ética, transparência e compromisso com os resultados dos nossos clientes.
                </p>
                <p className="leading-relaxed">
                  Com mais de <strong style={{ color: 'var(--navy)' }}>15 anos de atuação</strong>, construímos uma trajetória sólida no atendimento jurídico, com destaque para o Direito Previdenciário e demais áreas do Direito brasileiro.
                </p>
                <p className="leading-relaxed">
                  Nossa equipe é formada por profissionais especializados e constantemente atualizados com as mudanças na legislação. Acreditamos que o conhecimento jurídico aliado a um atendimento humanizado é a chave para resultados excepcionais.
                </p>
              </div>
              <Link to="/contato" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full font-semibold text-sm transition-all" style={{ background: 'var(--gold)', color: 'var(--navy-dark)' }}>
                Fale Conosco <ArrowRight size={16} />
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative rounded-3xl overflow-hidden p-8 md:p-10" style={{ background: 'var(--cream)' }}>
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--gold) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                <div className="relative z-10">
                  <h3 className="font-serif text-2xl mb-8" style={{ color: 'var(--navy)' }}>Nossos Valores</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {values.map((v) => {
                      const Icon = v.icon
                      return (
                        <div key={v.title} className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(201,168,76,0.1)' }}>
                            <Icon size={20} style={{ color: 'var(--gold)' }} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--navy)' }}>{v.title}</h4>
                            <p className="text-xs leading-relaxed" style={{ color: 'var(--gray-500)' }}>{v.desc}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-24 md:py-28" style={{ background: 'var(--navy-dark)' }}>
        <div className="container">
          <ScrollReveal className="text-center mb-12">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>
              <span className="w-6 h-px" style={{ background: 'var(--gold)' }} />
              Depoimentos
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">O que Dizem Nossos Clientes</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-8 rounded-3xl h-full" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <Quote size={32} className="mb-4 opacity-30" style={{ color: 'var(--gold)' }} />
                  <p className="text-gray-300 mb-6 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} fill="var(--gold)" style={{ color: 'var(--gold)' }} />
                    ))}
                  </div>
                  <p className="font-semibold text-white">{t.author}</p>
                  <p className="text-sm" style={{ color: 'var(--gray-400)' }}>{t.area}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ÁREAS DE ATUAÇÃO */}
      <section className="py-24 md:py-28" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <ScrollReveal className="text-center mb-12">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>
              <span className="w-6 h-px" style={{ background: 'var(--gold)' }} />
              Áreas de Atuação
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: 'var(--navy)' }}>Especialidades Jurídicas</h2>
            <p style={{ color: 'var(--gray-500)' }} className="max-w-2xl mx-auto">
              Atuamos nas principais áreas do Direito brasileiro, com atendimento presencial e online.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area, i) => {
              const Icon = area.icon
              return (
                <ScrollReveal key={area.title} delay={i * 0.08}>
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 hover:border-gold/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full group">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors" style={{ background: 'rgba(201,168,76,0.1)' }}>
                      <Icon size={24} style={{ color: 'var(--gold)' }} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--navy)' }}>{area.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-500)' }}>{area.desc}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-28" style={{ background: 'var(--navy-dark)' }}>
        <div className="absolute inset-0"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-5 rounded-full blur-[150px]" /></div>
        <div className="container max-w-4xl text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Pronto para Cuidar dos Seus Direitos?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Entre em contato e agende uma orientação jurídica. Estamos prontos para ajudar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contato" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 group" style={{ background: 'var(--gold)', color: 'var(--navy-dark)' }}>
                <Phone size={16} className="group-hover:translate-x-1 transition-transform" /> Fale Conosco
              </Link>
              <a href="https://wa.me/5548984584181" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm border transition-all hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
