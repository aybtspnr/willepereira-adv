import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ChevronDown, Menu, X, Mail, MapPin, ArrowRight } from 'lucide-react'

const areas = [
  { path: '/previdenciario', label: 'Direito Previdenciário' },
  { path: '/trabalhista', label: 'Direito Trabalhista' },
  { path: '/civel', label: 'Direito Cível' },
  { path: '/consumidor', label: 'Direito do Consumidor' },
  { path: '/familia', label: 'Direito de Família' },
  { path: '/imobiliario', label: 'Direito Imobiliário' },
]

const menuItem = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: 0.05 * i, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }),
  exit: { opacity: 0, x: -10, transition: { duration: 0.15 } },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileAreas, setMobileAreas] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setDropdownOpen(false) }, [location])

  const isArea = areas.some(a => location.pathname === a.path)

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* TOP BAR — desktop only */}
      <div className="top-bar" id="topbar">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-6">
<a href="tel:+5548984584181" className="topbar-link" aria-label="Ligar para (48) 98458-4181">
              <Phone size={11} className="topbar-icon" />
              <span>(48) 98458-4181</span>
            </a>
            <a href="mailto:advocacia@willepereira.adv.br" className="topbar-link" aria-label="Enviar email">
              <Mail size={11} className="topbar-icon" />
              <span>advocacia@willepereira.adv.br</span>
            </a>
          </div>
          <div className="topbar-address">
            <MapPin size={11} className="topbar-icon" />
            <span>Rua Najla Carone Guedert, 1080 — Palhoça/SC</span>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav className={`nav-wrap ${scrolled ? 'scrolled' : ''}`} aria-label="Navegação principal">
        <div className="nav-inner">
          <Link to="/" className="nav-logo" aria-label="Ir para página inicial">
            <img src="/logo-horizontal.png" alt="Will & Pereira Advocacia" className="nav-logo-img" />
          </Link>

          {/* Desktop nav */}
          <div className="nav-desktop">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Início</Link>
            <div
              className="nav-dropdown-wrap"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                to="/servicos"
                className={`nav-link flex items-center gap-1 ${isArea || location.pathname === '/servicos' ? 'active' : ''}`}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                Atuação
                <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} className="inline-flex">
                  <ChevronDown size={12} />
                </motion.span>
              </Link>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="nav-dropdown"
                    role="menu"
                    aria-label="Áreas de atuação"
                  >
                    {areas.map(a => (
                      <Link key={a.path} to={a.path} className={location.pathname === a.path ? 'active' : ''} role="menuitem">
                        {a.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}>Blog</Link>
            <Link to="/contato" className={`nav-link ${location.pathname === '/contato' ? 'active' : ''}`}>Contato</Link>
            <Link to="/contato" className="btn btn-gold nav-cta-btn">Fale Conosco</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
          >
            <motion.div
              animate={mobileOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              className="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              role="menu"
              aria-label="Menu de navegação mobile"
            >
              <div className="mobile-menu-accent" />
              <div className="mobile-menu-inner">
                {[
                  { label: 'Início', path: '/' },
                  { label: 'Atuação', path: '/servicos', hasSubmenu: true },
                  { label: 'Blog', path: '/blog' },
                  { label: 'Contato', path: '/contato' },
                ].map((item, i) =>
                  item.hasSubmenu ? (
                    <motion.div key={item.label} custom={i} variants={menuItem} initial="hidden" animate="visible" exit="exit">
                      <button
                        onClick={() => setMobileAreas(!mobileAreas)}
                        className="mobile-menu-link mobile-menu-trigger"
                        aria-expanded={mobileAreas}
                        aria-controls="mobile-areas-list"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={14}
                          className="mobile-menu-chevron"
                          style={{ transform: mobileAreas ? 'rotate(180deg)' : 'none' }}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileAreas && (
                          <motion.div
                            id="mobile-areas-list"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mobile-submenu"
                          >
                            {areas.map(a => (
                              <Link key={a.path} to={a.path} className="mobile-submenu-link" role="menuitem">
                                {a.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div key={item.label} custom={i} variants={menuItem} initial="hidden" animate="visible" exit="exit">
                      <Link to={item.path} className="mobile-menu-link" role="menuitem">
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                )}
                <motion.div custom={4} variants={menuItem} initial="hidden" animate="visible" exit="exit" className="mobile-menu-cta">
                  <Link to="/contato" className="mobile-cta-btn">
                    Fale Conosco <ArrowRight size={16} />
                  </Link>
                </motion.div>
                <motion.div custom={5} variants={menuItem} initial="hidden" animate="visible" exit="exit" className="mobile-menu-contact">
                  <div className="mobile-menu-divider" />
                  <a href="tel:+5548984584181" className="mobile-contact-link" aria-label="Ligar para (48) 98458-4181">
                    <Phone size={13} className="mobile-contact-icon" />
                    (48) 98458-4181
                  </a>
                  <a href="mailto:advocacia@willepereira.adv.br" className="mobile-contact-link" aria-label="Enviar email">
                    <Mail size={13} className="mobile-contact-icon" />
                    advocacia@willepereira.adv.br
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
