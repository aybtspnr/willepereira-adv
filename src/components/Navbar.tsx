     1|import { useState, useEffect } from 'react'
     2|import { Link, useLocation } from 'react-router-dom'
     3|import { motion, AnimatePresence } from 'framer-motion'
     4|import { Phone, Mail, MapPin, ChevronDown, Menu, X } from 'lucide-react'
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
    15|export default function Navbar() {
    16|  const [scrolled, setScrolled] = useState(false)
    17|  const [mobileOpen, setMobileOpen] = useState(false)
    18|  const [dropdownOpen, setDropdownOpen] = useState(false)
    19|  const [mobileAreas, setMobileAreas] = useState(false)
    20|  const location = useLocation()
    21|
    22|  useEffect(() => {
    23|    const onScroll = () => setScrolled(window.scrollY > 60)
    24|    window.addEventListener('scroll', onScroll, { passive: true })
    25|    return () => window.removeEventListener('scroll', onScroll)
    26|  }, [])
    27|
    28|  useEffect(() => { setMobileOpen(false); setDropdownOpen(false) }, [location])
    29|
    30|  const isArea = areas.some(a => location.pathname === a.path)
    31|
    32|  return (
    33|    <>
    34|      {/* Top bar */}
    35|      <div className="top-bar" id="topbar">
    36|        <div className="container flex items-center justify-between">
    37|          <div className="flex items-center gap-6">
    38|            <a href="tel:+5548988420867" className="flex items-center gap-2" style={{ fontSize: '12px', color: 'var(--gray-400)' }} aria-label="Ligar para (48) 98842-0867">
    39|              <Phone size={12} style={{ color: 'var(--gold)' }} /> (48) 98842-0867
    40|            </a>
    41|            <a href="mailto:contato@willepereira.adv.br" className="flex items-center gap-2" style={{ fontSize: '12px', color: 'var(--gray-400)' }} aria-label="Enviar email para contato@willepereira.adv.br">
    42|              <Mail size={12} style={{ color: 'var(--gold)' }} /> contato@willepereira.adv.br
    43|            </a>
    44|          </div>
    45|          <div className="flex items-center gap-2" style={{ fontSize: '12px', color: 'var(--gray-500)' }}>
    46|            <MapPin size={12} style={{ color: 'var(--gold)' }} /> Rua Najla Carone Guedert, 1080 — Palhoça/SC
    47|          </div>
    48|        </div>
    49|      </div>
    50|
    51|      {/* Main nav */}
    52|      <nav className={`nav-wrap ${scrolled ? 'scrolled' : ''}`} aria-label="Navegação principal">
    53|        <div className="container flex items-center justify-between" style={{ height: '64px' }}>
    54|          {/* Logo */}
    55|          <Link to="/" className="flex items-center" aria-label="Ir para página inicial">
    56|            <img src="/logo-horizontal.png" alt="Will & Pereira Advocacia" style={{ height: '28px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
    57|          </Link>
    58|
    59|          {/* Desktop links */}
    60|          <div className="md:flex" style={{ alignItems: 'center', gap: '4px' }} id="desktop-nav">
    61|            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Início</Link>
    62|
    63|            {/* Dropdown */}
    64|            <div
    65|              style={{ position: 'relative' }}
    66|              onMouseEnter={() => setDropdownOpen(true)}
    67|              onMouseLeave={() => setDropdownOpen(false)}
    68|            >
    69|              <Link
    70|                to="/servicos"
    71|                className={`nav-link flex items-center gap-1 ${isArea || location.pathname === '/servicos' ? 'active' : ''}`}
    72|                aria-expanded={dropdownOpen}
    73|                aria-haspopup="true"
    74|              >
    75|                Atuação
    76|                <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} style={{ display: 'inline-flex' }}>
    77|                  <ChevronDown size={12} />
    78|                </motion.span>
    79|              </Link>
    80|              <AnimatePresence>
    81|                {dropdownOpen && (
    82|                  <motion.div
    83|                    initial={{ opacity: 0, y: 8 }}
    84|                    animate={{ opacity: 1, y: 0 }}
    85|                    exit={{ opacity: 0, y: 8 }}
    86|                    transition={{ duration: 0.2 }}
    87|                    className="nav-dropdown"
    88|                    role="menu"
    89|                    aria-label="Áreas de atuação"
    90|                  >
    91|                    {areas.map(a => (
    92|                      <Link
    93|                        key={a.path}
    94|                        to={a.path}
    95|                        className={location.pathname === a.path ? 'active' : ''}
    96|                        role="menuitem"
    97|                      >
    98|                        {a.label}
    99|                      </Link>
   100|                    ))}
   101|                  </motion.div>
   102|                )}
   103|              </AnimatePresence>
   104|            </div>
   105|
   106|            <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}>Blog</Link>
   107|            <Link to="/contato" className={`nav-link ${location.pathname === '/contato' ? 'active' : ''}`}>Contato</Link>
   108|            <Link to="/contato" className="btn btn-gold" style={{ marginLeft: '16px', padding: '10px 24px', fontSize: '13px' }}>
   109|              Fale Conosco
   110|            </Link>
   111|          </div>
   112|
   113|          {/* Mobile hamburger */}
   114|          <button
   115|            className="md:hidden"
   116|            onClick={() => setMobileOpen(!mobileOpen)}
   117|            style={{ color: 'white', display: 'block' }}
   118|            id="mobile-btn"
   119|            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
   120|            aria-controls="mobile-menu"
   121|            aria-expanded={mobileOpen}
   122|          >
   123|            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
   124|          </button>
   125|        </div>
   126|
   127|        {/* Mobile menu */}
   128|        <AnimatePresence>
   129|          {mobileOpen && (
   130|            <motion.div
   131|              initial={{ height: 0, opacity: 0 }}
   132|              animate={{ height: 'auto', opacity: 1 }}
   133|              exit={{ height: 0, opacity: 0 }}
   134|              transition={{ duration: 0.3 }}
   135|              style={{ overflow: 'hidden', background: 'var(--navy-dark)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
   136|              id="mobile-menu"
   137|              role="menu"
   138|              aria-label="Menu de navegação mobile"
   139|            >
   140|              <div className="container" style={{ padding: '16px 24px' }}>
   141|                <Link to="/" className="nav-link" style={{ display: 'block', padding: '12px 0' }} role="menuitem">Início</Link>
   142|                <button
   143|                  onClick={() => setMobileAreas(!mobileAreas)}
   144|                  className="nav-link flex items-center justify-between w-full"
   145|                  style={{ padding: '12px 0', width: '100%' }}
   146|                  aria-expanded={mobileAreas}
   147|                  aria-controls="mobile-areas-list"
   148|                >
   149|                  Atuação
   150|                  <ChevronDown size={14} style={{ transform: mobileAreas ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
   151|                </button>
   152|                <AnimatePresence>
   153|                  {mobileAreas && (
   154|                    <motion.div
   155|                      initial={{ height: 0, opacity: 0 }}
   156|                      animate={{ height: 'auto', opacity: 1 }}
   157|                      exit={{ height: 0, opacity: 0 }}
   158|                      style={{ overflow: 'hidden', paddingLeft: '16px' }}
   159|                      id="mobile-areas-list"
   160|                    >
   161|                      {areas.map(a => (
   162|                        <Link key={a.path} to={a.path} className="nav-link" style={{ display: 'block', padding: '8px 0', fontSize: '13px' }} role="menuitem">
   163|                          {a.label}
   164|                        </Link>
   165|                      ))}
   166|                    </motion.div>
   167|                  )}
   168|                </AnimatePresence>
   169|                <Link to="/blog" className="nav-link" style={{ display: 'block', padding: '12px 0' }} role="menuitem">Blog</Link>
   170|                <Link to="/contato" className="nav-link" style={{ display: 'block', padding: '12px 0' }} role="menuitem">Contato</Link>
   171|                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '12px', paddingTop: '12px' }}>
   172|                  <a href="tel:+5548988420867" className="flex items-center gap-2" style={{ fontSize: '12px', color: 'var(--gray-400)', padding: '6px 0' }} aria-label="Ligar para (48) 98842-0867">
   173|                    <Phone size={12} style={{ color: 'var(--gold)' }} /> (48) 98842-0867
   174|                  </a>
   175|                  <a href="mailto:contato@willepereira.adv.br" className="flex items-center gap-2" style={{ fontSize: '12px', color: 'var(--gray-400)', padding: '6px 0' }} aria-label="Enviar email para contato@willepereira.adv.br">
   176|                    <Mail size={12} style={{ color: 'var(--gold)' }} /> contato@willepereira.adv.br
   177|                  </a>
   178|                </div>
   179|              </div>
   180|            </motion.div>
   181|          )}
   182|        </AnimatePresence>
   183|      </nav>
   184|    </>
   185|  )
   186|}
   187|