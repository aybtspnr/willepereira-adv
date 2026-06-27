     1|     1|import { useState, useEffect, useRef } from 'react'
     2|     2|import { Link } from 'react-router-dom'
     3|     3|import { motion, useScroll, useTransform, useInView } from 'framer-motion'
     4|     4|import {
     5|     5|  ArrowRight, Phone, Heart, Briefcase, Building2, Shield, Users, Landmark,
     6|     6|  Award, Globe, MessageSquare, Clock, Target, CheckCircle, BookOpen, ChevronRight
     7|     7|} from 'lucide-react'
     8|     8|import SEO from '../components/SEO'
     9|     9|import { getAllPosts } from '../data/blogPosts'
    10|    10|
    11|    11|/* ═══ Reusable scroll reveal ═══ */
    12|    12|function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
    13|    13|  const ref = useRef(null)
    14|    14|  const inView = useInView(ref, { once: true, margin: '-60px' })
    15|    15|  return (
    16|    16|    <motion.div
    17|    17|      ref={ref}
    18|    18|      initial={{ opacity: 0, y: 40 }}
    19|    19|      animate={inView ? { opacity: 1, y: 0 } : {}}
    20|    20|      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    21|    21|      className={className}
    22|    22|    >
    23|    23|      {children}
    24|    24|    </motion.div>
    25|    25|  )
    26|    26|}
    27|    27|
    28|    28|/* ═══ Counter ═══ */
    29|    29|function Counter({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
    30|    30|  const ref = useRef(null)
    31|    31|  const inView = useInView(ref, { once: true })
    32|    32|  const [n, setN] = useState(0)
    33|    33|  useEffect(() => {
    34|    34|    if (!inView) return
    35|    35|    let v = 0
    36|    36|    const t = setInterval(() => {
    37|    37|      v += Math.ceil(end / 40)
    38|    38|      if (v >= end) { setN(end); clearInterval(t) }
    39|    39|      else setN(v)
    40|    40|    }, 30)
    41|    41|    return () => clearInterval(t)
    42|    42|  }, [inView, end])
    43|    43|  return (
    44|    44|    <div className="stat-item">
    45|    45|      <div className="stat-num">{n}{suffix}</div>
    46|    46|      <div className="stat-label">{label}</div>
    47|    47|    </div>
    48|    48|  )
    49|    49|}
    50|    50|
    51|    51|/* ═══ TextReveal — SplitText effect ═══ */
    52|    52|function WordReveal({ text, tag: Tag = 'span', className = '' }: { text: string; tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'; className?: string }) {
    53|    53|  const ref = useRef(null)
    54|    54|  const inView = useInView(ref, { once: true, margin: '-60px' })
    55|    55|  const words = text.split(' ')
    56|    56|  return (
    57|    57|    <Tag className={className}>
    58|    58|      <span ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
    59|    59|        {words.map((word, i) => (
    60|    60|          <motion.span
    61|    61|            key={i}
    62|    62|            initial={{ y: 30, opacity: 0 }}
    63|    63|            animate={inView ? { y: 0, opacity: 1 } : {}}
    64|    64|            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
    65|    65|            style={{ display: 'inline-block', marginRight: '0.25em' }}
    66|    66|          >
    67|    67|            {word}
    68|    68|          </motion.span>
    69|    69|        ))}
    70|    70|      </span>
    71|    71|    </Tag>
    72|    72|  )
    73|    73|}
    74|    74|
    75|    75|/* ═══ Service cards ═══ */
    76|    76|const services = [
    77|    77|  { icon: Heart, title: 'Direito Previdenciário', desc: 'Aposentadorias, auxílio-doença, pensão por morte, BPC/LOAS e revisão de benefícios do INSS.', topics: ['Aposentadoria Urbana e Rural', 'Auxílio-Doença e Invalidez', 'Pensão por Morte', 'BPC/LOAS', 'Revisão de Benefícios'], path: '/previdenciario', num: '01' },
    78|    78|  { icon: Briefcase, title: 'Direito Trabalhista', desc: 'Reclamações trabalhistas, rescisões, horas extras, acidente de trabalho e assédio moral.', topics: ['Reclamações Trabalhistas', 'Rescisão Contratual', 'Horas Extras', 'Acidente de Trabalho', 'Assédio Moral'], path: '/trabalhista', num: '02' },
    79|    79|  { icon: Building2, title: 'Direito Cível', desc: 'Indenizações, contratos, cobranças, responsabilidade civil e direito imobiliário.', topics: ['Ações de Indenização', 'Contratos', 'Cobranças', 'Responsabilidade Civil', 'Direito Imobiliário'], path: '/civel', num: '03' },
    80|    80|  { icon: Shield, title: 'Direito do Consumidor', desc: 'Cobranças indevidas, negativação, vícios em produtos, planos de saúde e práticas abusivas.', topics: ['Cobranças Indevidas', 'Negativação Injusta', 'Vícios em Produtos', 'Planos de Saúde', 'Práticas Abusivas'], path: '/consumidor', num: '04' },
    81|    81|  { icon: Users, title: 'Direito de Família', desc: 'Divórcio, guarda, pensão alimentícia, inventário, união estável e planejamento sucessório.', topics: ['Divórcio', 'Guarda de Filhos', 'Pensão Alimentícia', 'Inventário', 'União Estável'], path: '/familia', num: '05' },
    82|    82|  { icon: Landmark, title: 'Direito Imobiliário', desc: 'Usucapião, contratos de compra e venda, regularização, ações possessórias e incorporação.', topics: ['Usucapião', 'Compra e Venda', 'Regularização', 'Ações Possessórias', 'Incorporação'], path: '/imobiliario', num: '06' },
    83|    83|]
    84|    84|
    85|    85|/* ═══ Values ═══ */
    86|    86|const values = [
    87|    87|  { icon: Award, title: 'Expertise Consolidada', desc: 'Mais de 15 anos de atuação especializada em Direito Previdenciário e demais áreas.' },
    88|    88|  { icon: Globe, title: 'Atendimento Nacional', desc: 'Atendemos clientes em todo o Brasil, presencialmente em Palhoça/SC e online por videoconferência.' },
    89|    89|  { icon: MessageSquare, title: 'Comunicação Clara', desc: 'Explicamos cada etapa do processo em linguagem simples e acessível.' },
    90|    90|  { icon: Clock, title: 'Agilidade e Eficiência', desc: 'Tecnologia para acelerar processos sem abrir mão da qualidade.' },
    91|    91|  { icon: Shield, title: 'Ética e Transparência', desc: 'Honorários claros, sem surpresas. O cliente sempre sabe onde está investindo.' },
    92|    92|  { icon: Target, title: 'Atendimento Personalizado', desc: 'Cada caso é único e merece atenção individual. Construímos relações de confiança duradouras.' },
    93|    93|]
    94|    94|
    95|    95|export default function HomePage() {
    96|    96|  const heroRef = useRef<HTMLDivElement>(null)
    97|    97|  const { scrollYProgress } = useScroll({ target: heroRef })
    98|    98|  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
    99|    99|  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
   100|   100|  const posts = getAllPosts()
   101|   101|
   102|   102|  return (
   103|   103|    <div>
   104|   104|      <SEO
   105|   105|        title="Will & Pereira Advocacia | Escritório Jurídico Premium em Palhoça/SC"
   106|   106|        description="Escritório de advocacia premium com mais de 15 anos de experiência. Especializado em Direito Previdenciário, Trabalhista, Cível, Consumidor, Família e Imobiliário."
   107|   107|        canonical="https://willepereira-adv.vercel.app/"
   108|   108|      />
   109|   109|
   110|   110|      {/* ═══════ HERO ═══════ */}
   111|   111|      <section ref={heroRef} className="relative h-screen overflow-hidden" style={{ background: 'var(--navy-dark)' }}>
   112|   112|        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0f1729 0%, #1a2634 50%, #0f1729 100%)' }} />
   113|   113|        <div className="pattern-dots" />
   114|   114|        <div className="glow-gold" style={{ top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }} />
   115|   115|
   116|   116|        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0 flex items-center">
   117|   117|          <div className="container">
   118|   118|            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
   119|   119|              <span className="section-tag" style={{ color: 'rgba(201,168,76,0.8)' }}>Will & Pereira Advocacia</span>
   120|   120|            </motion.div>
   121|   121|
   122|   122|            <motion.h1
   123|   123|              initial={{ opacity: 0, y: 30 }}
   124|   124|              animate={{ opacity: 1, y: 0 }}
   125|   125|              transition={{ duration: 0.9, delay: 0.4 }}
   126|   126|              className="hero-title text-white"
   127|   127|              style={{ lineHeight: '0.92' }}
   128|   128|            >
   129|   129|              Advocacia<br />
   130|   130|              <span className="gold-text">que protege</span><br />
   131|   131|              seus direitos.
   132|   132|            </motion.h1>
   133|   133|
   134|   134|            <motion.p
   135|   135|              initial={{ opacity: 0, y: 20 }}
   136|   136|              animate={{ opacity: 1, y: 0 }}
   137|   137|              transition={{ duration: 0.8, delay: 0.6 }}
   138|   138|              style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', maxWidth: '540px', marginTop: '24px', marginBottom: '40px', fontWeight: 300, lineHeight: 1.6 }}
   139|   139|            >
   140|   140|              Atendimento jurídico especializado em Direito Previdenciário, Trabalhista, Cível e Família.
   141|   141|              Presença em todo o Brasil com excelência e dedicação.
   142|   142|            </motion.p>
   143|   143|
   144|   144|            <motion.div
   145|   145|              initial={{ opacity: 0, y: 20 }}
   146|   146|              animate={{ opacity: 1, y: 0 }}
   147|   147|              transition={{ duration: 0.8, delay: 0.8 }}
   148|   148|              className="flex flex-wrap gap-4"
   149|   149|            >
   150|   150|              <Link to="/contato" className="btn btn-gold">
   151|   151|                Fale Conosco <ArrowRight size={16} />
   152|   152|              </Link>
   153|   153|              <Link to="/servicos" className="btn btn-outline btn-outline-white">
   154|   154|                Nossas Áreas
   155|   155|              </Link>
   156|   156|            </motion.div>
   157|   157|
   158|   158|            <motion.div
   159|   159|              initial={{ opacity: 0 }}
   160|   160|              animate={{ opacity: 1 }}
   161|   161|              transition={{ duration: 1, delay: 1.2 }}
   162|   162|              className="flex flex-wrap items-center gap-6"
   163|   163|              style={{ marginTop: '48px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)' }}
   164|   164|            >
   165|   165|              <span>Atendimento Nacional</span>
   166|   166|              <span className="w-px h-3" style={{ background: 'rgba(255,255,255,0.1)' }} />
   167|   167|              <span>OAB/SC</span>
   168|   168|              <span className="w-px h-3" style={{ background: 'rgba(255,255,255,0.1)' }} />
   169|   169|              <span>15+ Anos</span>
   170|   170|              <span className="w-px h-3" style={{ background: 'rgba(255,255,255,0.1)' }} />
   171|   171|              <span>5.000+ Casos</span>
   172|   172|            </motion.div>
   173|   173|          </div>
   174|   174|        </motion.div>
   175|   175|
   176|   176|        <div className="scroll-down">
   177|   177|          <div className="scroll-line" />
   178|   178|          <span className="scroll-text-sm">Scroll</span>
   179|   179|        </div>
   180|   180|      </section>
   181|   181|
   182|   182|      {/* ═══════ STATS ═══════ */}
   183|   183|      <section className="relative z-20" style={{ marginTop: '-80px' }}>
   184|   184|        <div className="container">
   185|   185|          <Reveal>
   186|   186|            <div className="glass-card">
   187|   187|              <div className="grid md:grid-cols-4">
   188|   188|                <Counter end={15} suffix="+" label="Anos" />
   189|   189|                <Counter end={5000} suffix="+" label="Casos" />
   190|   190|                <Counter end={27} suffix="+" label="Cidades" />
   191|   191|                <Counter end={100} suffix="%" label="Dedicação" />
   192|   192|              </div>
   193|   193|            </div>
   194|   194|          </Reveal>
   195|   195|        </div>
   196|   196|      </section>
   197|   197|
   198|   198|      {/* ═══════ SERVIÇOS ═══════ */}
   199|   199|      <section className="section section-cream">
   200|   200|        <div className="container">
   201|   201|          <Reveal className="text-center" style={{ marginBottom: '64px' }}>
   202|   202|            <span className="section-tag">Áreas de Atuação</span>
   203|   203|            <h2 className="section-title" style={{ marginBottom: '20px' }}>Soluções Jurídicas Completas</h2>
   204|   204|            <p className="section-sub mx-auto">
   205|   205|              Atuamos nas principais áreas do Direito brasileiro, com especial destaque para o Direito Previdenciário.
   206|   206|              Atendimento em todo o Brasil, presencial e online.
   207|   207|            </p>
   208|   208|          </Reveal>
   209|   209|
   210|   210|          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
   211|   211|            {services.map((s, i) => {
   212|   212|              const Icon = s.icon
   213|   213|              return (
   214|   214|                <Reveal key={s.title} delay={i * 0.08}>
   215|   215|                  <Link to={s.path} className="srv-card group" style={{ display: 'block', height: '100%' }}>
   216|   216|                    <div className="flex items-start justify-between mb-5">
   217|   217|                      <div className="srv-icon"><Icon size={22} /></div>
   218|   218|                      <span className="text-2xl font-serif" style={{ color: 'rgba(201,168,76,0.12)' }}>{s.num}</span>
   219|   219|                    </div>
   220|   220|                    <h3>{s.title}</h3>
   221|   221|                    <p>{s.desc}</p>
   222|   222|                    <ul className="srv-topics">
   223|   223|                      {s.topics.map(t => <li key={t}>{t}</li>)}
   224|   224|                    </ul>
   225|   225|                    <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold" style={{ color: 'var(--gold)' }}>
   226|   226|                      Saiba mais <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
   227|   227|                    </span>
   228|   228|                  </Link>
   229|   229|                </Reveal>
   230|   230|              )
   231|   231|            })}
   232|   232|          </div>
   233|   233|        </div>
   234|   234|      </section>
   235|   235|
   236|   236|      {/* ═══════ SOBRE ═══════ */}
   237|   237|      <section className="section">
   238|   238|        <div className="container">
   239|   239|          <div className="grid lg:grid-cols-2 gap-16 items-center">
   240|   240|            <Reveal>
   241|   241|              <span className="section-tag">Quem Somos</span>
   242|   242|              <h2 className="section-title" style={{ marginBottom: '20px' }}>
   243|   243|                Seus Direitos em<br />
   244|   244|                <span className="gold-text">Mãos Experientes</span>
   245|   245|              </h2>
   246|   246|              <div className="gold-divider" />
   247|   247|              <div className="space-y-4 text-gray-600 leading-relaxed">
   248|   248|                <p>
   249|   249|                  A <strong style={{ color: 'var(--navy)' }}>Will & Pereira Advocacia</strong> nasceu da convicção de que o acesso à justiça
   250|   250|                  não deve ser um privilégio, mas um direito de todos os brasileiros. Fundado em 2011,
   251|   251|                  em Palhoça, Santa Catarina, nosso escritório cresceu guiado por valores sólidos:
   252|   252|                  ética, transparência e compromisso inabalável com cada cliente.
   253|   253|                </p>
   254|   254|                <p>
   255|   255|                  Ao longo de mais de 15 anos de atuação, construímos uma sólida reputação na defesa
   256|   256|                  dos direitos previdenciários, trabalhistas, cíveis e consumeristas. Já atendemos mais
   257|   257|                  de 5.000 clientes em 27 cidades brasileiras, sempre com a mesma dedicação.
   258|   258|                </p>
   259|   259|                <p>
   260|   260|                  Nossa equipe é formada por profissionais especializados e atualizados com as constantes
   261|   261|                  mudanças na legislação brasileira. Acreditamos que o conhecimento jurídico aliado a
   262|   262|                  um atendimento humanizado é a chave para resultados excepcionais.
   263|   263|                </p>
   264|   264|              </div>
   265|   265|              <Link to="/contato" className="btn btn-outline btn-outline-dark" style={{ marginTop: '32px' }}>
   266|   266|                Conheça Nossa Equipe <ArrowRight size={16} />
   267|   267|              </Link>
   268|   268|            </Reveal>
   269|   269|
   270|   270|            <Reveal delay={0.2}>
   271|   271|              <div className="relative overflow-hidden rounded-2xl" style={{ background: 'var(--navy-dark)', aspectRatio: '4/5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   272|   272|                <div className="pattern-dots" />
   273|   273|                <div className="glow-gold" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '400px' }} />
   274|   274|                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
   275|   275|                  <div className="serif gold-text" style={{ fontSize: 'clamp(8rem, 20vw, 14rem)', lineHeight: 1 }}>WP</div>
   276|   276|                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '16px' }}>
   277|   277|                    Compromisso com a justiça desde 2011
   278|   278|                  </p>
   279|   279|                </div>
   280|   280|              </div>
   281|   281|            </Reveal>
   282|   282|          </div>
   283|   283|        </div>
   284|   284|      </section>
   285|   285|
   286|   286|      {/* ═══════ DIFERENCIAIS ═══════ */}
   287|   287|      <section className="section section-dark" style={{ position: 'relative' }}>
   288|   288|        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
   289|   289|          <Reveal className="text-center" style={{ marginBottom: '64px' }}>
   290|   290|            <span className="section-tag" style={{ color: 'var(--gold)' }}>Diferenciais</span>
   291|   291|            <h2 className="section-title text-white" style={{ marginBottom: '20px' }}>Por Que nos Escolher</h2>
   292|   292|            <p className="section-sub mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
   293|   293|              Somos mais que advogados — somos parceiros na defesa dos seus direitos.
   294|   294|            </p>
   295|   295|          </Reveal>
   296|   296|
   297|   297|          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
   298|   298|            {values.map((v, i) => {
   299|   299|              const Icon = v.icon
   300|   300|              return (
   301|   301|                <Reveal key={v.title} delay={i * 0.08}>
   302|   302|                  <div className="val-card">
   303|   303|                    <div className="val-icon"><Icon size={28} /></div>
   304|   304|                    <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
   305|   305|                    <p className="val-desc text-sm" style={{ color: 'var(--gray-600)', lineHeight: 1.6 }}>{v.desc}</p>
   306|   306|                  </div>
   307|   307|                </Reveal>
   308|   308|              )
   309|   309|            })}
   310|   310|          </div>
   311|   311|        </div>
   312|   312|      </section>
   313|   313|
   314|   314|      {/* ═══════ BLOG PREVIEW ═══════ */}
   315|   315|      <section className="section section-cream">
   316|   316|        <div className="container">
   317|   317|          <Reveal className="text-center" style={{ marginBottom: '64px' }}>
   318|   318|            <span className="section-tag">Blog Jurídico</span>
   319|   319|            <h2 className="section-title" style={{ marginBottom: '20px' }}>Artigos e Notícias</h2>
   320|   320|            <p className="section-sub mx-auto">Informações jurídicas atualizadas para proteger seus direitos.</p>
   321|   321|          </Reveal>
   322|   322|
   323|   323|          {posts.length > 0 ? (
   324|   324|            <div className="grid md:grid-cols-3 gap-6">
   325|   325|              {posts.slice(0, 3).map((post, i) => (
   326|   326|                <Reveal key={post.slug} delay={i * 0.08}>
   327|   327|                  <Link to={`/blog/${post.slug}`} className="blog-card group" style={{ display: 'block', height: '100%' }}>
   328|   328|                    <span className="blog-badge">{post.category}</span>
   329|   329|                    <h3 className="text-lg mb-2" style={{ color: 'var(--navy)' }}>{post.title}</h3>
   330|   330|                    <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-500)' }}>{post.description}</p>
   331|   331|                    <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold" style={{ color: 'var(--gold)' }}>
   332|   332|                      Ler mais <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
   333|   333|                    </span>
   334|   334|                  </Link>
   335|   335|                </Reveal>
   336|   336|              ))}
   337|   337|            </div>
   338|   338|          ) : (
   339|   339|            <Reveal className="text-center" style={{ padding: '80px 0' }}>
   340|   340|              <BookOpen size={48} style={{ color: 'var(--gray-300)', margin: '0 auto 16px' }} />
   341|   341|              <h3 style={{ fontSize: '1.5rem', color: 'var(--navy)', marginBottom: '8px' }}>Artigos em Breve</h3>
   342|   342|              <p style={{ color: 'var(--gray-500)' }}>Estamos preparando conteúdo jurídico de qualidade para você.</p>
   343|   343|            </Reveal>
   344|   344|          )}
   345|   345|        </div>
   346|   346|      </section>
   347|   347|
   348|   348|      {/* ═══════ CTA ═══════ */}
   349|   349|      <section className="section section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
   350|   350|        <div className="glow-gold" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px' }} />
   351|   351|        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
   352|   352|          <Reveal>
   353|   353|            <span className="section-tag" style={{ color: 'var(--gold)' }}>Entre em Contato</span>
   354|   354|            <h2 className="section-title text-white" style={{ marginBottom: '20px' }}>
   355|   355|              Pronto para Defender<br />
   356|   356|              <span className="gold-text">Seus Direitos?</span>
   357|   357|            </h2>
   358|   358|            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 40px', fontWeight: 300 }}>
   359|   359|              Entre em contato com nossa equipe especializada. Analisamos seu caso com a excelência que você merece.
   360|   360|            </p>
   361|   361|            <div className="flex flex-wrap justify-center gap-4">
   362|   362|              <Link to="/contato" className="btn btn-gold">
   363|   363|                Fale Conosco <ArrowRight size={16} />
   364|   364|              </Link>
   365|   365|              <a href="tel:+5548988420867" className="btn btn-outline btn-outline-white">
   366|   366|                <Phone size={16} /> (48) 98842-0867
   367|   367|              </a>
   368|   368|            </div>
   369|   369|          </Reveal>
   370|   370|        </div>
   371|   371|      </section>
   372|   372|    </div>
   373|   373|  )
   374|   374|}
   375|   375|