import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search, Phone, MessageCircle, BookOpen, Scale, Users, Building2 } from 'lucide-react'

const quickLinks = [
  { path: '/previdenciario', label: 'Direito Previdenciário', icon: Scale },
  { path: '/trabalhista', label: 'Direito Trabalhista', icon: Users },
  { path: '/civel', label: 'Direito Cível', icon: BookOpen },
  { path: '/consumidor', label: 'Direito do Consumidor', icon: Building2 },
  { path: '/familia', label: 'Direito de Família', icon: Users },
  { path: '/imobiliario', label: 'Direito Imobiliário', icon: Building2 },
]

export default function NotFoundPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.05,
        backgroundImage: 'radial-gradient(circle at 2px 2px, var(--gold) 1px, transparent 0)',
        backgroundSize: '48px 48px',
      }} />

      <div style={{ 
        maxWidth: 800, 
        margin: '0 auto', 
        padding: '0 clamp(24px, 5vw, 48px)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* 404 Number */}
        <div style={{ marginBottom: 32 }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(6rem, 15vw, 10rem)',
            fontWeight: 400,
            lineHeight: 1,
            background: 'linear-gradient(135deg, var(--gold), var(--gold-light), var(--gold-dark))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            404
          </span>
        </div>

        {/* Title */}
        <h1 style={{ 
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: 'var(--cream)',
          marginBottom: 16,
          fontWeight: 400,
        }}>
          Página não encontrada
        </h1>

        {/* Description */}
        <p style={{ 
          fontSize: '1rem',
          color: 'var(--gray-400)',
          marginBottom: 40,
          maxWidth: 500,
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          O link que você acessou pode ter sido removido, alterado ou está temporariamente indisponível.
        </p>

        {/* Search suggestion */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 12,
          padding: '16px 24px',
          marginBottom: 40,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          maxWidth: 400,
          margin: '0 auto 40px',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <Search size={18} style={{ color: 'var(--gray-400)' }} />
          <span style={{ color: 'var(--gray-400)', fontSize: '0.9rem' }}>
            Procure no site ou volte ao início
          </span>
        </div>

        {/* Quick Links */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
            Links Úteis
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            {quickLinks.map(link => {
              const Icon = link.icon
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 16px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 8,
                    color: 'var(--cream)',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(201,168,76,0.1)'
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  }}
                >
                  <Icon size={14} style={{ color: 'var(--gold)' }} />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', sm: 'row', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '14px 32px',
              background: 'var(--gold)',
              color: 'var(--navy-dark)',
              borderRadius: 9999,
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(201,168,76,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <Home size={16} />
            Voltar ao Início
          </Link>
          
          <Link
            to="/contato"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '14px 32px',
              background: 'transparent',
              color: 'var(--white)',
              borderRadius: 9999,
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              border: '1.5px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--gold)'
              e.currentTarget.style.color = 'var(--gold)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              e.currentTarget.style.color = 'var(--white)'
            }}
          >
            <ArrowLeft size={16} />
            Fale Conosco
          </Link>
        </div>

        {/* Contact info */}
        <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          <a href="tel:+5548984584181" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--gray-400)', fontSize: '0.85rem', textDecoration: 'none' }}>
            <Phone size={14} style={{ color: 'var(--gold)' }} />
            (48) 98458-4181
          </a>
          <a href="https://wa.me/5548984584181" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--gray-400)', fontSize: '0.85rem', textDecoration: 'none' }}>
            <MessageCircle size={14} style={{ color: '#25D366' }} />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
