import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const links = [
  { path: '/', label: 'Início' },
  { path: '/servicos', label: 'Atuação' },
  { path: '/blog', label: 'Blog' },
  { path: '/contato', label: 'Contato' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        scrolled 
          ? 'glass-dark shadow-lg shadow-navy/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-premium">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo real */}
          <Link to="/" className="relative z-10 flex items-center">
            <img 
              src="/logo-horizontal.png" 
              alt="Will & Pereira Advocacia" 
              className={`h-8 md:h-10 w-auto transition-all duration-500 ${
                scrolled ? 'opacity-100' : 'opacity-100 brightness-0 invert'
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => setHovered(link.path)}
                onMouseLeave={() => setHovered(null)}
                className={`relative px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-gold'
                    : scrolled 
                      ? 'text-white/80 hover:text-gold' 
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-5 right-5 h-0.5 bg-gold rounded-full"
                  />
                )}
              </Link>
            ))}
            <Link
              to="/contato"
              className="ml-6 btn-primary"
            >
              Consulta Gratuita
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden relative z-10 p-2 transition-colors ${
              scrolled ? 'text-white' : 'text-white'
            }`}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden bg-navy-dark border-t border-white/10"
          >
            <div className="container-premium py-6 space-y-1">
              {links.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === link.path
                      ? 'bg-gold/10 text-gold'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contato"
                className="block mt-4 px-6 py-3.5 bg-gold text-navy font-semibold text-center rounded-xl text-sm"
              >
                Consulta Gratuita
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
