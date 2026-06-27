import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Scale, Menu, X } from 'lucide-react'

const links = [
  { path: '/', label: 'Início' },
  { path: '/servicos', label: 'Serviços' },
  { path: '/blog', label: 'Blog' },
  { path: '/contato', label: 'Contato' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-navy/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <Scale className={`w-7 h-7 transition-colors duration-300 ${
              scrolled ? 'text-gold' : 'text-gold'
            }`} />
            <div>
              <span className={`font-serif text-lg font-bold transition-colors ${
                scrolled ? 'text-navy' : 'text-white'
              }`}>
                Will & Pereira
              </span>
              <span className={`block text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${
                scrolled ? 'text-navy-light' : 'text-gray-300'
              }`}>
                Advocacia
              </span>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  location.pathname === link.path
                    ? scrolled ? 'text-gold' : 'text-gold'
                    : scrolled ? 'text-navy hover:text-gold' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold"
                  />
                )}
              </Link>
            ))}
            <Link
              to="/contato"
              className="ml-4 px-6 py-2.5 bg-gold text-navy font-semibold text-sm rounded-full hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              Consulta Gratuita
            </Link>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-navy' : 'text-white'
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-2">
              {links.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'bg-gold/10 text-gold font-semibold'
                      : 'text-navy hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contato"
                className="block mt-4 px-6 py-3 bg-gold text-navy font-semibold text-center rounded-full"
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
