import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, ChevronDown, Menu, X, Mail, MapPin, ArrowRight } from 'lucide-react'

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
<a href="tel:+554984584181" className="topbar-link" aria-label="Ligar para (48) 98458-4181">
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
            <img src="/logo-horizontal.webp" alt="Will & Pereira Advocacia" className="nav-logo-img" />
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
                <span
                  className="inline-flex transition-transform duration-200"
                  style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <ChevronDown size={12} />
                </span>
              </Link>
              <div
                className="nav-dropdown"
                role="menu"
                aria-label="Áreas de atuação"
                style={{
                  opacity: dropdownOpen ? 1 : 0,
                  visibility: dropdownOpen ? 'visible' : 'hidden',
                  transform: dropdownOpen ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0.2s',
                }}
              >
                {areas.map(a => (
                  <Link key={a.path} to={a.path} className={location.pathname === a.path ? 'active' : ''} role="menuitem">
                    {a.label}
                  </Link>
                ))}
              </div>
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
            <span
              className="flex items-center transition-transform duration-200"
              style={{ transform: mobileOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </span>
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          id="mobile-menu"
          className="mobile-menu"
          role="menu"
          aria-label="Menu de navegação mobile"
          style={{
            maxHeight: mobileOpen ? '80vh' : '0',
            opacity: mobileOpen ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.35s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.3s ease',
          }}
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
                <div
                  key={item.label}
                  style={{
                    opacity: mobileOpen ? 1 : 0,
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `opacity 0.3s ease ${0.05 * i}s, transform 0.3s ease ${0.05 * i}s`,
                  }}
                >
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
                      style={{ transform: mobileAreas ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
                    />
                  </button>
                  <div
                    id="mobile-areas-list"
                    className="mobile-submenu"
                    style={{
                      maxHeight: mobileAreas ? '400px' : '0',
                      opacity: mobileAreas ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease, opacity 0.2s ease',
                    }}
                  >
                    {areas.map(a => (
                      <Link key={a.path} to={a.path} className="mobile-submenu-link" role="menuitem">
                        {a.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  key={item.label}
                  style={{
                    opacity: mobileOpen ? 1 : 0,
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `opacity 0.3s ease ${0.05 * i}s, transform 0.3s ease ${0.05 * i}s`,
                  }}
                >
                  <Link to={item.path} className="mobile-menu-link" role="menuitem">
                    {item.label}
                  </Link>
                </div>
              )
            )}
            <div
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.3s ease 0.2s, transform 0.3s ease 0.2s',
              }}
              className="mobile-menu-cta"
            >
              <Link to="/contato" className="mobile-cta-btn">
                Fale Conosco <ArrowRight size={16} />
              </Link>
            </div>
            <div
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.3s ease 0.25s, transform 0.3s ease 0.25s',
              }}
              className="mobile-menu-contact"
            >
              <div className="mobile-menu-divider" />
              <a href="tel:+554984584181" className="mobile-contact-link" aria-label="Ligar para (48) 98458-4181">
                <Phone size={13} className="mobile-contact-icon" />
                (48) 98458-4181
              </a>
              <a href="mailto:advocacia@willepereira.adv.br" className="mobile-contact-link" aria-label="Enviar email">
                <Mail size={13} className="mobile-contact-icon" />
                advocacia@willepereira.adv.br
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
