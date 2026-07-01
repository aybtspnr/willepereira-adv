import { useState, useEffect } from 'react'
import { Phone, MessageCircle } from 'lucide-react'

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        background: 'linear-gradient(to top, rgba(26,38,52,0.98), rgba(26,38,52,0.92))',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(201,168,76,0.3)',
        padding: '12px clamp(16px, 4vw, 32px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        animation: 'slideUp 0.3s ease-out',
      }}
    >
      <span
        style={{
          color: 'var(--cream)',
          fontSize: '0.85rem',
          fontWeight: 500,
          display: 'none',
        }}
        className="sticky-cta-text"
      >
        Precisa de orientação jurídica?
      </span>

      <a
        href="https://wa.me/5548984584181?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica."
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: '#25D366',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: 8,
          fontSize: '0.85rem',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.03)'
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,211,102,0.4)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <MessageCircle size={16} />
        WhatsApp
      </a>

      <a
        href="tel:+5548984584181"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--gold)',
          color: 'var(--navy)',
          padding: '10px 20px',
          borderRadius: 8,
          fontSize: '0.85rem',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.03)'
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,168,76,0.4)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <Phone size={16} />
        Ligar Agora
      </a>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (min-width: 768px) {
          .sticky-cta-text { display: inline !important; }
        }
      `}</style>
    </div>
  )
}
