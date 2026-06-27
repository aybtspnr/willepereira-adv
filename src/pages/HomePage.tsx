     1|import { useState, useEffect, useRef } from 'react'
     2|import { Link } from 'react-router-dom'
     3|import { motion, useScroll, useTransform, useInView } from 'framer-motion'
     4|import {
     5|  ArrowRight, Phone, Heart, Briefcase, Building2, Shield, Users, Landmark,
     6|  Award, Globe, MessageSquare, Clock, Target, CheckCircle, BookOpen, ChevronRight
     7|} from 'lucide-react'
     8|import SEO from '../components/SEO'
     9|import { getAllPosts } from '../data/blogPosts'
    10|
    11|/* ═══ Reusable scroll reveal ═══ */
    12|function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
    13|  const ref = useRef(null)
    14|  const inView = useInView(ref, { once: true, margin: '-60px' })
    15|  return (
    16|    <motion.div
    17|      ref={ref}
    18|      initial={{ opacity: 0, y: 40 }}
    19|      animate={inView ? { opacity: 1, y: 0 } : {}}
    20|      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    21|      className={className}
    22|    >
    23|      {children}
    24|    </motion.div>
    25|  )
    26|}
    27|
    28|/* ═══ Counter ═══ */
    29|function Counter({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
    30|  const ref = useRef(null)
    31|  const inView = useInView(ref, { once: true })
    32|  const [n, setN] = useState(0)
    33|  useEffect(() => {
    34|    if (!inView) return
    35|    let v = 0
    36|    const t = setInterval(() => {
    37|      v += Math.ceil(end / 40)
    38|      if (v >= end) { setN(end); clearInterval(t) }
    39|      else setN(v)
    40|    }, 30)
    41|    return () => clearInterval(t)
    42|  }, [inView, end])
    43|  return (
    44|    <div className="stat-item">
    45|      <div className="stat-num">{n}{suffix}</div>
    46|      <div className="stat-label">{label}</div>
    47|    </div>
    48|  )
    49|}
    50|
    51|/* ═══ TextReveal — SplitText effect ═══ */
    52|function WordReveal({ text, tag: Tag = 'span', className = '' }: { text: string; tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'; className?: string }) {
    53|  const ref = useRef(null)
    54|  const inView = useInView(ref, { once: true, margin: '-60px' })
    55|  const words = text.split(' ')
    56|  return (
    57|    <Tag className={className}>
    58|      <span ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
    59|        {words.map((word, i) => (
    60|          <motion.span
    61|            key={i}
    62|            initial={{ y: 30, opacity: 0 }}
    63|            animate={inView ? { y: 0, opacity: 1 } : {}}
    64|            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
    65|            style={{ display: 'inline-block', marginRight: '0.25em' }}
    66|          >
    67|            {word}
    68|          </motion.span>
    69|        ))}
    70|      </span>
    71|    </Tag>
    72|  )
    73|}
    74|
    75|/* ═══ Service cards ═══ */
    76|const services = [
    77|  { icon: Heart, title: 'Direito Previdenciário', desc: 'Aposentadorias, auxílio-doença, pensão por morte, BPC/LOAS e revisão de benefícios do INSS.', topics: ['Aposentadoria Urbana e Rural', 'Auxílio-Doença e Invalidez', 'Pensão por Morte', 'BPC/LOAS', 'Revisão de Benefícios'], path: '/previdenciario', num: '01' },
    78|  { icon: Briefcase, title: 'Direito Trabalhista', desc: 'Reclamações trabalhistas, rescisões, horas extras, acidente de trabalho e assédio moral.', topics: ['Reclamações Trabalhistas', 'Rescisão Contratual', 'Horas Extras', 'Acidente de Trabalho', 'Assédio Moral'], path: '/trabalhista', num: '02' },
    79|  { icon: Building2, title: 'Direito Cível', desc: 'Indenizações, contratos, cobranças, responsabilidade civil e direito imobiliário.', topics: ['Ações de Indenização', 'Contratos', 'Cobranças', 'Responsabilidade Civil', 'Direito Imobiliário'], path: '/civel', num: '03' },
    80|  { icon: Shield, title: 'Direito do Consumidor', desc: 'Cobranças indevidas, negativação, vícios em produtos, planos de saúde e práticas abusivas.', topics: ['Cobranças Indevidas', 'Negativação Injusta', 'Vícios em Produtos', 'Planos de Saúde', 'Práticas Abusivas'], path: '/consumidor', num: '04' },
    81|  { icon: Users, title: 'Direito de Família', desc: 'Divórcio, guarda, pensão alimentícia, inventário, união estável e planejamento sucessório.', topics: ['Divórcio', 'Guarda de Filhos', 'Pensão Alimentícia', 'Inventário', 'União Estável'], path: '/familia', num: '05' },
    82|  { icon: Landmark, title: 'Direito Imobiliário', desc: 'Usucapião, contratos de compra e venda, regularização, ações possessórias e incorporação.', topics: ['Usucapião', 'Compra e Venda', 'Regularização', 'Ações Possessórias', 'Incorporação'], path: '/imobiliario', num: '06' },
    83|]
    84|
    85|/* ═══ Values ═══ */
    86|const values = [
    87|  { icon: Award, title: 'Expertise Consolidada', desc: 'Mais de 15 anos de atuação especializada em Direito Previdenciário e demais áreas.' },
    88|  { icon: Globe, title: 'Atendimento Nacional', desc: 'Atendemos clientes em todo o Brasil, presencialmente em Palhoça/SC e online por videoconferência.' },
    89|  { icon: MessageSquare, title: 'Comunicação Clara', desc: 'Explicamos cada etapa do processo em linguagem simples e acessível.' },
    90|  { icon: Clock, title: 'Agilidade e Eficiência', desc: 'Tecnologia para acelerar processos sem abrir mão da qualidade.' },
    91|  { icon: Shield, title: 'Ética e Transparência', desc: 'Honorários claros, sem surpresas. O cliente sempre sabe onde está investindo.' },
    92|  { icon: Target, title: 'Atendimento Personalizado', desc: 'Cada caso é único e merece atenção individual. Construímos relações de confiança duradouras.' },
    93|]
    94|
    95|export default function HomePage() {
    96|  const heroRef = useRef<HTMLDivElement>(null)
    97|  const { scrollYProgress } = useScroll({ target: heroRef })
    98|  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
    99|  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
   100|  const posts = getAllPosts()
   101|
   102|  return (
   103|    <div>
   104|      <SEO
   105|        title="Will & Pereira Advocacia | Escritório Jurídico Premium em Palhoça/SC"
   106|        description="Escritório de advocacia premium com mais de 15 anos de experiência. Especializado em Direito Previdenciário, Trabalhista, Cível, Consumidor, Família e Imobiliário."
   107|        canonical="https://willepereira-adv.vercel.app/"
   108|      />
   109|
   110|      {/* ═══════ HERO ═══════ */}
   111|      <section ref={heroRef} className="relative h-screen overflow-hidden" style={{ background: 'var(--navy-dark)' }}>
   112|        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0f1729 0%, #1a2634 50%, #0f1729 100%)' }} />
   113|        <div className="pattern-dots" />
   114|        <div className="glow-gold" style={{ top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }} />
   115|
   116|        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0 flex items-center">
   117|          <div className="container">
   118|            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
   119|              <span className="section-tag" style={{ color: 'rgba(201,168,76,0.8)' }}>Will & Pereira Advocacia</span>
   120|            </motion.div>
   121|
   122|            <motion.h1
   123|              initial={{ opacity: 0, y: 30 }}
   124|              animate={{ opacity: 1, y: 0 }}
   125|              transition={{ duration: 0.9, delay: 0.4 }}
   126|              className="hero-title text-white"
   127|              style={{ lineHeight: '0.92' }}
   128|            >
   129|              Advocacia<br />
   130|              <span className="gold-text">que protege</span><br />
   131|              seus direitos.
   132|            </motion.h1>
   133|
   134|            <motion.p
   135|              initial={{ opacity: 0, y: 20 }}
   136|              animate={{ opacity: 1, y: 0 }}
   137|              transition={{ duration: 0.8, delay: 0.6 }}
   138|              style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', maxWidth: '540px', marginTop: '24px', marginBottom: '40px', fontWeight: 300, lineHeight: 1.6 }}
   139|            >
   140|              Atendimento jurídico especializado em Direito Previdenciário, Trabalhista, Cível e Família.
   141|              Presença em todo o Brasil com excelência e dedicação.
   142|            </motion.p>
   143|
   144|            <motion.div
   145|              initial={{ opacity: 0, y: 20 }}
   146|              animate={{ opacity: 1, y: 0 }}
   147|              transition={{ duration: 0.8, delay: 0.8 }}
   148|              className="flex flex-wrap gap-4"
   149|            >
   150|              <Link to="/contato" className="btn btn-gold">
   151|                Fale Conosco <ArrowRight size={16} />
   152|              </Link>
   153|              <Link to="/servicos" className="btn btn-outline btn-outline-white">
   154|                Nossas Áreas
   155|              </Link>
   156|            </motion.div>
   157|
   158|            <motion.div
   159|              initial={{ opacity: 0 }}
   160|              animate={{ opacity: 1 }}
   161|              transition={{ duration: 1, delay: 1.2 }}
   162|              className="flex flex-wrap items-center gap-6"
   163|              style={{ marginTop: '48px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)' }}
   164|            >
   165|              <span>Atendimento Nacional</span>
   166|              <span className="w-px h-3" style={{ background: 'rgba(255,255,255,0.1)' }} />
   167|              <span>OAB/SC</span>
   168|              <span className="w-px h-3" style={{ background: 'rgba(255,255,255,0.1)' }} />
   169|              <span>15+ Anos</span>
   170|              <span className="w-px h-3" style={{ background: 'rgba(255,255,255,0.1)' }} />
   171|              <span>5.000+ Casos</span>
   172|            </motion.div>
   173|          </div>
   174|        </motion.div>
   175|
   176|        <div className="scroll-down">
   177|          <div className="scroll-line" />
   178|          <span className="scroll-text-sm">Scroll</span>
   179|        </div>
   180|      </section>
   181|
   182|      {/* ═══════ STATS ═══════ */}
   183|      <section className="relative z-20" style={{ marginTop: '-80px' }}>
   184|        <div className="container">
   185|          <Reveal>
   186|            <div className="glass-card">
   187|              <div className="grid md:grid-cols-4">
   188|                <Counter end={15} suffix="+" label="Anos" />
   189|                <Counter end={5000} suffix="+" label="Casos" />
   190|                <Counter end={27} suffix="+" label="Cidades" />
   191|                <Counter end={100} suffix="%" label="Dedicação" />
   192|              </div>
   193|            </div>
   194|          </Reveal>
   195|        </div>
   196|      </section>
   197|
   198|      {/* ═══════ SERVIÇOS ═══════ */}
   199|      <section className="section section-cream">
   200|        <div className="container">
   201|          <Reveal className="text-center" style={{ marginBottom: '64px' }}>
   202|            <span className="section-tag">Áreas de Atuação</span>
   203|            <h2 className="section-title" style={{ marginBottom: '20px' }}>Soluções Jurídicas Completas</h2>
   204|            <p className="section-sub mx-auto">
   205|              Atuamos nas principais áreas do Direito brasileiro, com especial destaque para o Direito Previdenciário.
   206|              Atendimento em todo o Brasil, presencial e online.
   207|            </p>
   208|          </Reveal>
   209|
   210|          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
   211|            {services.map((s, i) => {
   212|              const Icon = s.icon
   213|              return (
   214|                <Reveal key={s.title} delay={i * 0.08}>
   215|                  <Link to={s.path} className="srv-card group" style={{ display: 'block', height: '100%' }}>
   216|                    <div className="flex items-start justify-between mb-5">
   217|                      <div className="srv-icon"><Icon size={22} /></div>
   218|                      <span className="text-2xl font-serif" style={{ color: 'rgba(201,168,76,0.12)' }}>{s.num}</span>
   219|                    </div>
   220|                    <h3>{s.title}</h3>
   221|                    <p>{s.desc}</p>
   222|                    <ul className="srv-topics">
   223|                      {s.topics.map(t => <li key={t}>{t}</li>)}
   224|                    </ul>
   225|                    <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold" style={{ color: 'var(--gold)' }}>
   226|                      Saiba mais <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
   227|                    </span>
   228|                  </Link>
   229|                </Reveal>
   230|              )
   231|            })}
   232|          </div>
   233|        </div>
   234|      </section>
   235|
   236|      {/* ═══════ SOBRE ═══════ */}
   237|      <section className="section">
   238|        <div className="container">
   239|          <div className="grid lg:grid-cols-2 gap-16 items-center">
   240|            <Reveal>
   241|              <span className="section-tag">Quem Somos</span>
   242|              <h2 className="section-title" style={{ marginBottom: '20px' }}>
   243|                Seus Direitos em<br />
   244|                <span className="gold-text">Mãos Experientes</span>
   245|              </h2>
   246|              <div className="gold-divider" />
   247|              <div className="space-y-4 text-gray-600 leading-relaxed">
   248|                <p>
   249|                  A <strong style={{ color: 'var(--navy)' }}>Will & Pereira Advocacia</strong> nasceu da convicção de que o acesso à justiça
   250|                  não deve ser um privilégio, mas um direito de todos os brasileiros. Fundado em 2011,
   251|                  em Palhoça, Santa Catarina, nosso escritório cresceu guiado por valores sólidos:
   252|                  ética, transparência e compromisso inabalável com cada cliente.
   253|                </p>
   254|                <p>
   255|                  Ao longo de mais de 15 anos de atuação, construímos uma sólida reputação na defesa
   256|                  dos direitos previdenciários, trabalhistas, cíveis e consumeristas. Já atendemos mais
   257|                  de 5.000 clientes em 27 cidades brasileiras, sempre com a mesma dedicação.
   258|                </p>
   259|                <p>
   260|                  Nossa equipe é formada por profissionais especializados e atualizados com as constantes
   261|                  mudanças na legislação brasileira. Acreditamos que o conhecimento jurídico aliado a
   262|                  um atendimento humanizado é a chave para resultados excepcionais.
   263|                </p>
   264|              </div>
   265|              <Link to="/contato" className="btn btn-outline btn-outline-dark" style={{ marginTop: '32px' }}>
   266|                Conheça Nossa Equipe <ArrowRight size={16} />
   267|              </Link>
   268|            </Reveal>
   269|
   270|            <Reveal delay={0.2}>
   271|              <div className="relative overflow-hidden rounded-2xl" style={{ background: 'var(--navy-dark)', aspectRatio: '4/5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   272|                <div className="pattern-dots" />
   273|                <div className="glow-gold" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '400px' }} />
   274|                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
   275|                  <div className="serif gold-text" style={{ fontSize: 'clamp(8rem, 20vw, 14rem)', lineHeight: 1 }}>WP</div>
   276|                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '16px' }}>
   277|                    Compromisso com a justiça desde 2011
   278|                  </p>
   279|                </div>
   280|              </div>
   281|            </Reveal>
   282|          </div>
   283|        </div>
   284|      </section>
   285|
   286|      {/* ═══════ DIFERENCIAIS ═══════ */}
   287|      <section className="section section-dark" style={{ position: 'relative' }}>
   288|        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
   289|          <Reveal className="text-center" style={{ marginBottom: '64px' }}>
   290|            <span className="section-tag" style={{ color: 'var(--gold)' }}>Diferenciais</span>
   291|            <h2 className="section-title text-white" style={{ marginBottom: '20px' }}>Por Que nos Escolher</h2>
   292|            <p className="section-sub mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
   293|              Somos mais que advogados — somos parceiros na defesa dos seus direitos.
   294|            </p>
   295|          </Reveal>
   296|
   297|          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
   298|            {values.map((v, i) => {
   299|              const Icon = v.icon
   300|              return (
   301|                <Reveal key={v.title} delay={i * 0.08}>
   302|                  <div className="val-card">
   303|                    <div className="val-icon"><Icon size={28} /></div>
   304|                    <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
   305|                    <p className="val-desc text-sm" style={{ color: 'var(--gray-600)', lineHeight: 1.6 }}>{v.desc}</p>
   306|                  </div>
   307|                </Reveal>
   308|              )
   309|            })}
   310|          </div>
   311|        </div>
   312|      </section>
   313|
   314|      {/* ═══════ BLOG PREVIEW ═══════ */}
   315|      <section className="section section-cream">
   316|        <div className="container">
   317|          <Reveal className="text-center" style={{ marginBottom: '64px' }}>
   318|            <span className="section-tag">Blog Jurídico</span>
   319|            <h2 className="section-title" style={{ marginBottom: '20px' }}>Artigos e Notícias</h2>
   320|            <p className="section-sub mx-auto">Informações jurídicas atualizadas para proteger seus direitos.</p>
   321|          </Reveal>
   322|
   323|          {posts.length > 0 ? (
   324|            <div className="grid md:grid-cols-3 gap-6">
   325|              {posts.slice(0, 3).map((post, i) => (
   326|                <Reveal key={post.slug} delay={i * 0.08}>
   327|                  <Link to={`/blog/${post.slug}`} className="blog-card group" style={{ display: 'block', height: '100%' }}>
   328|                    <span className="blog-badge">{post.category}</span>
   329|                    <h3 className="text-lg mb-2" style={{ color: 'var(--navy)' }}>{post.title}</h3>
   330|                    <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-500)' }}>{post.description}</p>
   331|                    <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold" style={{ color: 'var(--gold)' }}>
   332|                      Ler mais <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
   333|                    </span>
   334|                  </Link>
   335|                </Reveal>
   336|              ))}
   337|            </div>
   338|          ) : (
   339|            <Reveal className="text-center" style={{ padding: '80px 0' }}>
   340|              <BookOpen size={48} style={{ color: 'var(--gray-300)', margin: '0 auto 16px' }} />
   341|              <h3 style={{ fontSize: '1.5rem', color: 'var(--navy)', marginBottom: '8px' }}>Artigos em Breve</h3>
   342|              <p style={{ color: 'var(--gray-500)' }}>Estamos preparando conteúdo jurídico de qualidade para você.</p>
   343|            </Reveal>
   344|          )}
   345|        </div>
   346|      </section>
   347|
   348|      {/* ═══════ CTA ═══════ */}
   349|      <section className="section section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
   350|        <div className="glow-gold" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px' }} />
   351|        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
   352|          <Reveal>
   353|            <span className="section-tag" style={{ color: 'var(--gold)' }}>Entre em Contato</span>
   354|            <h2 className="section-title text-white" style={{ marginBottom: '20px' }}>
   355|              Pronto para Defender<br />
   356|              <span className="gold-text">Seus Direitos?</span>
   357|            </h2>
   358|            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 40px', fontWeight: 300 }}>
   359|              Entre em contato com nossa equipe especializada. Analisamos seu caso com a excelência que você merece.
   360|            </p>
   361|            <div className="flex flex-wrap justify-center gap-4">
   362|              <Link to="/contato" className="btn btn-gold">
   363|                Fale Conosco <ArrowRight size={16} />
   364|              </Link>
   365|              <a href="tel:+5548988420867" className="btn btn-outline btn-outline-white">
   366|                <Phone size={16} /> (48) 98842-0867
   367|              </a>
   368|            </div>
   369|          </Reveal>
   370|        </div>
   371|      </section>
   372|    </div>
   373|  )
   374|}
   375|