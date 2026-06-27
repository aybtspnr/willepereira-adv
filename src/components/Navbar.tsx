import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, ChevronDown, Menu, X } from 'lucide-react'

const areas = [
  { path: '/previdenciario', label: 'Direito Previdenciário' },
  { path: '/trabalhista', label: 'Direito Trabalhista' },
  { path: '/civel', label: 'Direito Cível' },
  { path: '/consumidor', label: 'Direito do Consumidor' },
  { path: '/familia', label: 'Direito de Família' },
  { path: '/imobiliario', label: 'Direito Imobiliário' },
]

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

  return (
    <>
      {/* Top bar */}
      <div className="top-bar" id="topbar">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+5548988420867" className="flex items-center gap-2" style={{ fontSize: '12px', color: 'var(--gray-400)' }} aria-label="Ligar para (48) 98842-0867">
              <Phone size={12} style={{ color: 'var(--gold)' }} /> (48) 98842-0867
            </a>
            <a href="mailto:contato@willepereira.adv.br" className="flex items-center gap-2" style={{ fontSize: '12px', color: 'var(--gray-400)' }} aria-label="Enviar email para contato@willepereira.adv.br">
              <Mail size={12} style={{ color: 'var(--gold)' }} /> contato@willepereira.adv.br
            </a>
          </div>
          <div className="flex items-center gap-2" style={{ fontSize: '12px', color: 'var(--gray-500)' }}>
            <MapPin size={12} style={{ color: 'var(--gold)' }} /> Rua Najla Carone Guedert, 1080 — Palhoça/SC
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`nav-wrap ${scrolled ? 'scrolled' : ''}`} style={{ position: 'sticky', top: 0, zIndex: 100 }} aria-label="Navegação principal">
        <div className="container flex items-center justify-between" style={{ height: '64px' }}>
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="Ir para página inicial">
            <img src="/logo-horizontal.png" alt="Will & Pereira Advocacia" style={{ height: '28px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
          </Link>

          {/* Desktop links */}
          <div className="md:flex" style={{ alignItems: 'center', gap: '4px' }} id="desktop-nav">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Início</Link>

            {/* Dropdown */}
            <div
              style={{ position: 'relative' }}
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
                <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} style={{ display: 'inline-flex' }}>
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
                      <Link
                        key={a.path}
                        to={a.path}
                        className={location.pathname === a.path ? 'active' : ''}
                        role="menuitem"
                      >
                        {a.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}>Blog</Link>
            <Link to="/contato" className={`nav-link ${location.pathname === '/contato' ? 'active' : ''}`}>Contato</Link>
            <Link to="/contato" className="btn btn-gold" style={{ marginLeft: '16px', padding: '10px 24px', fontSize: '13px' }}>
              Fale Conosco
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: 'white', display: 'block' }}
            id="mobile-btn"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden', background: 'var(--navy-dark)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
              id="mobile-menu"
              role="menu"
              aria-label="Menu de navegação mobile"
            >
              <div className="container" style={{ padding: '16px 24px' }}>
                <Link to="/" className="nav-link" style={{ display: 'block', padding: '12px 0' }} role="menuitem">Início</Link>
                <button
                  onClick={() => setMobileAreas(!mobileAreas)}
                  className="nav-link flex items-center justify-between w-full"
                  style={{ padding: '12px 0', width: '100%' }}
                  aria-expanded={mobileAreas}
                  aria-controls="mobile-areas-list"
                >
                  Atuação
                  <ChevronDown size={14} style={{ transform: mobileAreas ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <AnimatePresence>
                  {mobileAreas && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden', paddingLeft: '16px' }}
                      id="mobile-areas-list"
                    >
                      {areas.map(a => (
                        <Link key={a.path} to={a.path} className="nav-link" style={{ display: 'block', padding: '8px 0', fontSize: '13px' }} role="menuitem">
                          {a.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                <Link to="/blog" className="nav-link" style={{ display: 'block', padding: '12px 0' }} role="menuitem">Blog</Link>
                <Link to="/contato" className="nav-link" style={{ display: 'block', padding: '12px 0' }} role="menuitem">Contato</Link>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '12px', paddingTop: '12px' }}>
                  <a href="tel:+5548988420867" className="flex items-center gap-2" style={{ fontSize: '12px', color: 'var(--gray-400)', padding: '6px 0' }} aria-label="Ligar para (48) 98842-0867">
                    <Phone size={12} style={{ color: 'var(--gold)' }} /> (48) 98842-0867
                  </a>
                  <a href="mailto:contato@willepereira.adv.br" className="flex items-center gap-2" style={{ fontSize: '12px', color: 'var(--gray-400)', padding: '6px 0' }} aria-label="Enviar email para contato@willepereira.adv.br">
                    <Mail size={12} style={{ color: 'var(--gold)' }} /> contato@willepereira.adv.br
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
