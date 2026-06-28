import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  ArrowRight, Phone, Heart, Briefcase, Building2, Shield, Users, Landmark,
  Award, Globe, MessageSquare, Clock, Target, CheckCircle, BookOpen, ChevronRight
} from 'lucide-react'
import SEO from '../components/SEO'
import { getAllPosts } from '../data/blogPosts'

/* ═══ Reusable scroll reveal ═══ */
function Reveal({ children, delay = 0, className = '', style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ═══ Counter ═══ */
function Counter({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [n, setN] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let v = 0
    const step = Math.max(1, Math.ceil(end / 50))
    const t = setInterval(() => {
      v += step
      if (v >= end) { setN(end); clearInterval(t) }
      else setN(v)
    }, 30)
    return () => clearInterval(t)
  }, [started, end])

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-num">{n}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

/* ═══ TextReveal — SplitText effect ═══ */
function WordReveal({ text, tag: Tag = 'span', className = '' }: { text: string; tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const words = text.split(' ')
  return (
    <Tag className={className}>
      <span ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </Tag>
  )
}

/* ═══ Service cards ═══ */
const services = [
  { icon: Heart, title: 'Direito Previdenciário', desc: 'Aposentadorias, auxílio-doença, pensão por morte, BPC/LOAS e revisão de benefícios do INSS.', topics: ['Aposentadoria Urbana e Rural', 'Auxílio-Doença e Invalidez', 'Pensão por Morte', 'BPC/LOAS', 'Revisão de Benefícios'], path: '/previdenciario', num: '01' },
  { icon: Briefcase, title: 'Direito Trabalhista', desc: 'Reclamações trabalhistas, rescisões, horas extras, acidente de trabalho e assédio moral.', topics: ['Reclamações Trabalhistas', 'Rescisão Contratual', 'Horas Extras', 'Acidente de Trabalho', 'Assédio Moral'], path: '/trabalhista', num: '02' },
  { icon: Building2, title: 'Direito Cível', desc: 'Indenizações, contratos, cobranças, responsabilidade civil e direito imobiliário.', topics: ['Ações de Indenização', 'Contratos', 'Cobranças', 'Responsabilidade Civil', 'Direito Imobiliário'], path: '/civel', num: '03' },
  { icon: Shield, title: 'Direito do Consumidor', desc: 'Cobranças indevidas, negativação, vícios em produtos, planos de saúde e práticas abusivas.', topics: ['Cobranças Indevidas', 'Negativação Injusta', 'Vícios em Produtos', 'Planos de Saúde', 'Práticas Abusivas'], path: '/consumidor', num: '04' },
  { icon: Users, title: 'Direito de Família', desc: 'Divórcio, guarda, pensão alimentícia, inventário, união estável e planejamento sucessório.', topics: ['Divórcio', 'Guarda de Filhos', 'Pensão Alimentícia', 'Inventário', 'União Estável'], path: '/familia', num: '05' },
  { icon: Landmark, title: 'Direito Imobiliário', desc: 'Usucapião, contratos de compra e venda, regularização, ações possessórias e incorporação.', topics: ['Usucapião', 'Compra e Venda', 'Regularização', 'Ações Possessórias', 'Incorporação'], path: '/imobiliario', num: '06' },
]

/* ═══ Values ═══ */
const values = [
  { icon: Award, title: 'Expertise Consolidada', desc: 'Mais de 15 anos de atuação especializada em Direito Previdenciário e demais áreas.' },
  { icon: Globe, title: 'Atendimento Nacional', desc: 'Atendemos clientes em todo o Brasil, presencialmente em Palhoça/SC e online por videoconferência.' },
  { icon: MessageSquare, title: 'Comunicação Clara', desc: 'Explicamos cada etapa do processo em linguagem simples e acessível.' },
  { icon: Clock, title: 'Agilidade e Eficiência', desc: 'Tecnologia para acelerar processos sem abrir mão da qualidade.' },
  { icon: Shield, title: 'Ética e Transparência', desc: 'Honorários claros, sem surpresas. O cliente sempre sabe onde está investindo.' },
  { icon: Target, title: 'Atendimento Personalizado', desc: 'Cada caso é único e merece atenção individual. Construímos relações de confiança duradouras.' },
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const posts = getAllPosts()

  return (
    <div>
      <SEO
        title="Will & Pereira Advocacia | Escritório Jurídico Premium em Palhoça/SC"
        description="Escritório de advocacia premium com mais de 15 anos de experiência. Especializado em Direito Previdenciário, Trabalhista, Cível, Consumidor, Família e Imobiliário."
        canonical="https://willepereira-adv.vercel.app/"
      />

      {/* ═══════ HERO ═══════ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden" style={{ background: 'var(--navy-dark)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0f1729 0%, #1a2634 50%, #0f1729 100%)' }} />
        <div className="pattern-dots" />
        <div className="glow-gold" style={{ top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }} />

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0 flex items-center">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <span className="section-tag" style={{ color: 'rgba(201,168,76,0.8)' }}>Will & Pereira Advocacia</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="hero-title text-white"
              style={{ lineHeight: '0.92' }}
            >
              Advocacia<br />
              <span className="gold-text">que protege</span><br />
              seus direitos.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', maxWidth: '540px', marginTop: '24px', marginBottom: '40px', fontWeight: 300, lineHeight: 1.6 }}
            >
              Atendimento jurídico especializado em Direito Previdenciário, Trabalhista, Cível e Família.
              Presença em todo o Brasil com excelência e dedicação.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/contato" className="btn btn-gold">
                Fale Conosco <ArrowRight size={16} />
              </Link>
              <Link to="/servicos" className="btn btn-outline btn-outline-white">
                Nossas Áreas
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-wrap items-center gap-6"
              style={{ marginTop: '48px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)' }}
            >
              <span>Atendimento Nacional</span>
              <span className="w-px h-3" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <span>OAB/SC</span>
              <span className="w-px h-3" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <span>15+ Anos</span>
              <span className="w-px h-3" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <span>5.000+ Casos</span>
            </motion.div>
          </div>
        </motion.div>

        <div className="scroll-down">
          <div className="scroll-line" />
          <span className="scroll-text-sm">Scroll</span>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="stats-section">
        <div className="container">
          <Reveal>
            <div className="stats-grid">
              {[
                { end: 15, suffix: '+', label: 'Anos de Experiência' },
                { end: 5000, suffix: '+', label: 'Casos Atendidos' },
                { end: 27, suffix: '+', label: 'Cidades Atendidas' },
                { end: 100, suffix: '%', label: 'Dedicação ao Cliente' },
              ].map((stat, i) => (
                <div key={stat.label} className="stats-item">
                  <Counter end={stat.end} suffix={stat.suffix} label={stat.label} />
                  {i < 3 && <div className="stats-divider" />}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ SERVIÇOS ═══════ */}
      <section className="section section-cream">
        <div className="container">
          <Reveal className="text-center" style={{ marginBottom: '64px' }}>
            <span className="section-tag">Áreas de Atuação</span>
            <h2 className="section-title" style={{ marginBottom: '20px' }}>Soluções Jurídicas Completas</h2>
            <p className="section-sub mx-auto">
              Atuamos nas principais áreas do Direito brasileiro, com especial destaque para o Direito Previdenciário.
              Atendimento em todo o Brasil, presencial e online.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.title} delay={i * 0.08}>
                  <Link to={s.path} className="srv-card group" style={{ display: 'block', height: '100%' }}>
                    <div className="flex items-start justify-between mb-5">
                      <div className="srv-icon"><Icon size={22} /></div>
                      <span className="text-2xl font-serif" style={{ color: 'rgba(201,168,76,0.12)' }}>{s.num}</span>
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <ul className="srv-topics">
                      {s.topics.map(t => <li key={t}>{t}</li>)}
                    </ul>
                    <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold" style={{ color: 'var(--gold)' }}>
                      Saiba mais <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════ SOBRE ═══════ */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="section-tag">Quem Somos</span>
              <h2 className="section-title" style={{ marginBottom: '20px' }}>
                Seus Direitos em<br />
                <span className="gold-text">Mãos Experientes</span>
              </h2>
              <div className="gold-divider" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  A <strong style={{ color: 'var(--navy)' }}>Will & Pereira Advocacia</strong> nasceu da convicção de que o acesso à justiça
                  não deve ser um privilégio, mas um direito de todos os brasileiros. Fundado em 2011,
                  em Palhoça, Santa Catarina, nosso escritório cresceu guiado por valores sólidos:
                  ética, transparência e compromisso inabalável com cada cliente.
                </p>
                <p>
                  Ao longo de mais de 15 anos de atuação, construímos uma sólida reputação na defesa
                  dos direitos previdenciários, trabalhistas, cíveis e consumeristas. Já atendemos mais
                  de 5.000 clientes em 27 cidades brasileiras, sempre com a mesma dedicação.
                </p>
                <p>
                  Nossa equipe é formada por profissionais especializados e atualizados com as constantes
                  mudanças na legislação brasileira. Acreditamos que o conhecimento jurídico aliado a
                  um atendimento humanizado é a chave para resultados excepcionais.
                </p>
              </div>
              <Link to="/contato" className="btn btn-outline btn-outline-dark" style={{ marginTop: '32px' }}>
                Conheça Nossa Equipe <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════ FAQ RÁPIDO ═══════ */}
      <section className="section section-cream">
        <div className="container">
          <Reveal className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-tag">Dúvidas Comuns</span>
            <h2 className="section-title" style={{ marginBottom: '16px' }}>Perguntas Frequentes</h2>
            <p className="section-sub mx-auto">
              Respostas rápidas para as dúvidas mais comuns dos nossos clientes.
            </p>
          </Reveal>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {[
              {
                q: 'Como funciona a primeira orientação jurídica?',
                a: 'Após o contato, agendamos uma conversa para entender seu caso. Analisamos a situação detalhadamente e apresentamos as melhores alternativas legais para você.'
              },
              {
                q: 'Quais formas de pagamento são aceitas?',
                a: 'Trabalhamos com honorários flexíveis: honorários fixos, parcelados ou conforme o resultado do caso. Na primeira conversa, explicamos todos os valores de forma transparente.'
              },
              {
                q: 'Vocês atendem de todo o Brasil?',
                a: 'Sim! Atendemos clientes de todos os estados brasileiros, tanto presencialmente em Palhoça/SC, quanto online por videoconferência. Nosso atendimento é nacional.'
              },
              {
                q: 'Quanto tempo leva para resolver meu caso?',
                a: 'O prazo varia conforme a complexidade. Processos administrativos costumam ser mais rápidos; judiciais podem levar meses. Sempre mantemos o cliente informado sobre cada etapa.'
              },
            ].map((faq, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <details className="faq-item">
                  <summary>{faq.q}</summary>
                  <p style={{ color: 'var(--gray-600)', fontSize: '14px', lineHeight: '1.7', marginTop: '12px', paddingBottom: '4px' }}>
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="text-center" style={{ marginTop: '40px' }}>
              <Link to="/contato" className="btn btn-gold">
                Tire Suas Dúvidas <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ COMO FUNCIONA ═══════ */}
      <section className="section section-navy" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="pattern-dots" />
        <div className="glow-gold" style={{ top: '20%', right: '-10%', width: '400px', height: '400px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal className="text-center" style={{ marginBottom: '64px' }}>
            <span className="section-tag" style={{ color: 'var(--gold)' }}>Processo</span>
            <h2 className="section-title text-white" style={{ marginBottom: '16px' }}>Como Funciona</h2>
            <p className="section-sub mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Um processo simples, transparente e focado no seu resultado.
            </p>
          </Reveal>

          <div className="process-steps">
            {[
              {
                num: '01',
                title: 'Entre em Contato',
                desc: 'Fale conosco por telefone, WhatsApp ou formulário. Vamos entender sua necessidade.',
                icon: Phone,
              },
              {
                num: '02',
                title: 'Análise do Caso',
                desc: 'Avaliamos sua situação e documentação. Apresentamos as opções legais disponíveis.',
                icon: Target,
              },
              {
                num: '03',
                title: 'Estratégia Jurídica',
                desc: 'Definimos juntos a melhor abordagem. Você acompanha cada etapa do processo.',
                icon: Shield,
              },
              {
                num: '04',
                title: 'Resultado',
                desc: 'Trabalhamos até alcançar a solução. Seus direitos são nossos prioridade.',
                icon: Award,
              },
            ].map((step, i) => {
              const Icon = step.icon
              return (
                <Reveal key={step.num} delay={i * 0.12}>
                  <div className="process-step">
                    <div className="process-num">{step.num}</div>
                    <div className="process-icon">
                      <Icon size={24} />
                    </div>
                    <h3 className="process-title">{step.title}</h3>
                    <p className="process-desc">{step.desc}</p>
                    {i < 3 && <div className="process-line" />}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════ DIFERENCIAIS ═══════ */}
      <section className="section section-dark" style={{ position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal className="text-center" style={{ marginBottom: '64px' }}>
            <span className="section-tag" style={{ color: 'var(--gold)' }}>Diferenciais</span>
            <h2 className="section-title text-white" style={{ marginBottom: '20px' }}>Por Que nos Escolher</h2>
            <p className="section-sub mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Somos mais que advogados — somos parceiros na defesa dos seus direitos.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <Reveal key={v.title} delay={i * 0.08}>
                  <div className="val-card">
                    <div className="val-icon"><Icon size={28} /></div>
                    <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
                    <p className="val-desc text-sm" style={{ color: 'var(--gray-600)', lineHeight: 1.6 }}>{v.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════ BLOG PREVIEW ═══════ */}
      <section className="section section-cream">
        <div className="container">
          <Reveal className="text-center" style={{ marginBottom: '64px' }}>
            <span className="section-tag">Blog Jurídico</span>
            <h2 className="section-title" style={{ marginBottom: '20px' }}>Artigos e Notícias</h2>
            <p className="section-sub mx-auto">Informações jurídicas atualizadas para proteger seus direitos.</p>
          </Reveal>

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {posts.slice(0, 3).map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.08}>
                  <Link to={`/blog/${post.slug}`} className="blog-card group" style={{ display: 'block', height: '100%' }}>
                    <span className="blog-badge">{post.category}</span>
                    <h3 className="text-lg mb-2" style={{ color: 'var(--navy)' }}>{post.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-500)' }}>{post.description}</p>
                    <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold" style={{ color: 'var(--gold)' }}>
                      Ler mais <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="text-center" style={{ padding: '80px 0' }}>
              <BookOpen size={48} style={{ color: 'var(--gray-300)', margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '1.5rem', color: 'var(--navy)', marginBottom: '8px' }}>Artigos em Breve</h3>
              <p style={{ color: 'var(--gray-500)' }}>Estamos preparando conteúdo jurídico de qualidade para você.</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="section section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="glow-gold" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Reveal>
            <span className="section-tag" style={{ color: 'var(--gold)' }}>Entre em Contato</span>
            <h2 className="section-title text-white" style={{ marginBottom: '20px' }}>
              Pronto para Defender<br />
              <span className="gold-text">Seus Direitos?</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 40px', fontWeight: 300 }}>
              Entre em contato com nossa equipe especializada. Analisamos seu caso com a excelência que você merece.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contato" className="btn btn-gold">
                Fale Conosco <ArrowRight size={16} />
              </Link>
              <a href="tel:+5548984584181" className="btn btn-outline btn-outline-white">
                <Phone size={16} /> (48) 98458-4181
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
