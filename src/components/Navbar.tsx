     1|import { useState, useEffect } from 'react'
     2|import { Link, useLocation } from 'react-router-dom'
     3|import { motion, AnimatePresence } from 'framer-motion'
     4|import { Phone, ChevronDown, Menu, X, Mail, MapPin, ArrowRight } from 'lucide-react'
     5|
     6|const areas = [
     7|  { path: '/previdenciario', label: 'Direito Previdenciário' },
     8|  { path: '/trabalhista', label: 'Direito Trabalhista' },
     9|  { path: '/civel', label: 'Direito Cível' },
    10|  { path: '/consumidor', label: 'Direito do Consumidor' },
    11|  { path: '/familia', label: 'Direito de Família' },
    12|  { path: '/imobiliario', label: 'Direito Imobiliário' },
    13|]
    14|
    15|/* ═══ Mobile menu item — staggered animation ═══ */
    16|const menuItem = {
    17|  hidden: { opacity: 0, x: -20 },
    18|  visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: 0.05 * i, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }),
    19|  exit: { opacity: 0, x: -10, transition: { duration: 0.15 } },
    20|}
    21|
    22|export default function Navbar() {
    23|  const [scrolled, setScrolled] = useState(false)
    24|  const [mobileOpen, setMobileOpen] = useState(false)
    25|  const [dropdownOpen, setDropdownOpen] = useState(false)
    26|  const [mobileAreas, setMobileAreas] = useState(false)
    27|  const location = useLocation()
    28|
    29|  useEffect(() => {
    30|    const onScroll = () => setScrolled(window.scrollY > 60)
    31|    window.addEventListener('scroll', onScroll, { passive: true })
    32|    return () => window.removeEventListener('scroll', onScroll)
    33|  }, [])
    34|
    35|  useEffect(() => { setMobileOpen(false); setDropdownOpen(false) }, [location])
    36|
    37|  const isArea = areas.some(a => location.pathname === a.path)
    38|
    39|  /* ═══ Lock body scroll when mobile menu open ═══ */
    40|  useEffect(() => {
    41|    if (mobileOpen) document.body.style.overflow = 'hidden'
    42|    else document.body.style.overflow = ''
    43|    return () => { document.body.style.overflow = '' }
    44|  }, [mobileOpen])
    45|
    46|  return (
    47|    <>
    48|      {/* ═══ TOP BAR ═══ */}
    49|      <div className="top-bar" id="topbar">
    50|        <div className="container flex items-center justify-between">
    51|          <div className="flex items-center gap-6" id="topbar-contacts">
    52|            <a
    53|              href="tel:+5548988420867"
    54|              className="topbar-link"
    55|              aria-label="Ligar para (48) 98842-0867"
    56|            >
    57|              <Phone size={11} className="topbar-icon" />
    58|              <span>(48) 98842-0867</span>
    59|            </a>
    60|            <a
    61|              href="mailto:contato@willepereira.adv.br"
    62|              className="topbar-link"
    63|              aria-label="Enviar email para contato@willepereira.adv.br"
    64|            >
    65|              <Mail size={11} className="topbar-icon" />
    66|              <span>contato@willepereira.adv.br</span>
    67|            </a>
    68|          </div>
    69|          <div className="topbar-address">
    70|            <MapPin size={11} className="topbar-icon" />
    71|            <span>Rua Najla Carone Guedert, 1080 — Palhoça/SC</span>
    72|          </div>
    73|        </div>
    74|      </div>
    75|
    76|      {/* ═══ MAIN NAV ═══ */}
    77|      <nav className={`nav-wrap ${scrolled ? 'scrolled' : ''}`} aria-label="Navegação principal">
    78|        <div className="nav-inner">
    79|          {/* Logo */}
    80|          <Link to="/" className="nav-logo" aria-label="Ir para página inicial">
    81|            <img src="/logo-horizontal.png" alt="Will & Pereira Advocacia" className="nav-logo-img" />
    82|          </Link>
    83|
    84|          {/* Desktop nav */}
    85|          <div className="nav-desktop" id="desktop-nav">
    86|            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Início</Link>
    87|
    88|            {/* Dropdown desktop */}
    89|            <div
    90|              className="nav-dropdown-wrap"
    91|              onMouseEnter={() => setDropdownOpen(true)}
    92|              onMouseLeave={() => setDropdownOpen(false)}
    93|            >
    94|              <Link
    95|                to="/servicos"
    96|                className={`nav-link flex items-center gap-1 ${isArea || location.pathname === '/servicos' ? 'active' : ''}`}
    97|                aria-expanded={dropdownOpen}
    98|                aria-haspopup="true"
    99|              >
   100|                Atuação
   101|                <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} className="inline-flex">
   102|                  <ChevronDown size={12} />
   103|                </motion.span>
   104|              </Link>
   105|              <AnimatePresence>
   106|                {dropdownOpen && (
   107|                  <motion.div
   108|                    initial={{ opacity: 0, y: 8 }}
   109|                    animate={{ opacity: 1, y: 0 }}
   110|                    exit={{ opacity: 0, y: 8 }}
   111|                    transition={{ duration: 0.2 }}
   112|                    className="nav-dropdown"
   113|                    role="menu"
   114|                    aria-label="Áreas de atuação"
   115|                  >
   116|                    {areas.map(a => (
   117|                      <Link key={a.path} to={a.path} className={location.pathname === a.path ? 'active' : ''} role="menuitem">
   118|                        {a.label}
   119|                      </Link>
   120|                    ))}
   121|                  </motion.div>
   122|                )}
   123|              </AnimatePresence>
   124|            </div>
   125|
   126|            <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}>Blog</Link>
   127|            <Link to="/contato" className={`nav-link ${location.pathname === '/contato' ? 'active' : ''}`}>Contato</Link>
   128|            <Link to="/contato" className="btn btn-gold nav-cta-btn">
   129|              Fale Conosco
   130|            </Link>
   131|          </div>
   132|
   133|          {/* Mobile hamburger */}
   134|          <button
   135|            className="mobile-hamburger"
   136|            onClick={() => setMobileOpen(!mobileOpen)}
   137|            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
   138|            aria-controls="mobile-menu"
   139|            aria-expanded={mobileOpen}
   140|          >
   141|            <motion.div
   142|              animate={mobileOpen ? { rotate: 90 } : { rotate: 0 }}
   143|              transition={{ duration: 0.25 }}
   144|              className="flex items-center"
   145|            >
   146|              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
   147|            </motion.div>
   148|          </button>
   149|        </div>
   150|
   151|        {/* ═══ MOBILE MENU ═══ */}
   152|        <AnimatePresence>
   153|          {mobileOpen && (
   154|            <motion.div
   155|              id="mobile-menu"
   156|              className="mobile-menu"
   157|              initial={{ height: 0, opacity: 0 }}
   158|              animate={{ height: 'auto', opacity: 1 }}
   159|              exit={{ height: 0, opacity: 0 }}
   160|              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
   161|              role="menu"
   162|              aria-label="Menu de navegação mobile"
   163|            >
   164|              {/* Gold accent bar */}
   165|              <div className="mobile-menu-accent" />
   166|
   167|              <div className="mobile-menu-inner">
   168|                {[
   169|                  { label: 'Início', path: '/' },
   170|                  { label: 'Atuação', path: '/servicos', hasSubmenu: true },
   171|                  { label: 'Blog', path: '/blog' },
   172|                  { label: 'Contato', path: '/contato' },
   173|                ].map((item, i) =>
   174|                  item.hasSubmenu ? (
   175|                    <motion.div key={item.label} custom={i} variants={menuItem} initial="hidden" animate="visible" exit="exit">
   176|                      <button
   177|                        onClick={() => setMobileAreas(!mobileAreas)}
   178|                        className="mobile-menu-link mobile-menu-trigger"
   179|                        aria-expanded={mobileAreas}
   180|                        aria-controls="mobile-areas-list"
   181|                      >
   182|                        <span>{item.label}</span>
   183|                        <ChevronDown
   184|                          size={14}
   185|                          className="mobile-menu-chevron"
   186|                          style={{ transform: mobileAreas ? 'rotate(180deg)' : 'none' }}
   187|                        />
   188|                      </button>
   189|                      <AnimatePresence>
   190|                        {mobileAreas && (
   191|                          <motion.div
   192|                            id="mobile-areas-list"
   193|                            initial={{ height: 0, opacity: 0 }}
   194|                            animate={{ height: 'auto', opacity: 1 }}
   195|                            exit={{ height: 0, opacity: 0 }}
   196|                            className="mobile-submenu"
   197|                          >
   198|                            {areas.map(a => (
   199|                              <Link
   200|                                key={a.path}
   201|                                to={a.path}
   202|                                className="mobile-submenu-link"
   203|                                role="menuitem"
   204|                              >
   205|                                {a.label}
   206|                              </Link>
   207|                            ))}
   208|                          </motion.div>
   209|                        )}
   210|                      </AnimatePresence>
   211|                    </motion.div>
   212|                  ) : (
   213|                    <motion.div key={item.label} custom={i} variants={menuItem} initial="hidden" animate="visible" exit="exit">
   214|                      <Link to={item.path} className="mobile-menu-link" role="menuitem">
   215|                        {item.label}
   216|                      </Link>
   217|                    </motion.div>
   218|                  )
   219|                )}
   220|
   221|                {/* CTA button */}
   222|                <motion.div
   223|                  custom={4}
   224|                  variants={menuItem}
   225|                  initial="hidden"
   226|                  animate="visible"
   227|                  exit="exit"
   228|                  className="mobile-menu-cta"
   229|                >
   230|                  <Link to="/contato" className="mobile-cta-btn">
   231|                    Fale Conosco <ArrowRight size={16} />
   232|                  </Link>
   233|                </motion.div>
   234|
   235|                {/* Contact info */}
   236|                <motion.div
   237|                  custom={5}
   238|                  variants={menuItem}
   239|                  initial="hidden"
   240|                  animate="visible"
   241|                  exit="exit"
   242|                  className="mobile-menu-contact"
   243|                >
   244|                  <div className="mobile-menu-divider" />
   245|                  <a href="tel:+5548988420867" className="mobile-contact-link" aria-label="Ligar para (48) 98842-0867">
   246|                    <Phone size={13} className="mobile-contact-icon" />
   247|                    (48) 98842-0867
   248|                  </a>
   249|                  <a href="mailto:contato@willepereira.adv.br" className="mobile-contact-link" aria-label="Enviar email">
   250|                    <Mail size={13} className="mobile-contact-icon" />
   251|                    contato@willepereira.adv.br
   252|                  </a>
   253|                </motion.div>
   254|              </div>
   255|            </motion.div>
   256|          )}
   257|        </AnimatePresence>
   258|      </nav>
   259|    </>
   260|  )
   261|}
   262|