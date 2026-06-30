import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

const areas = [
  { name: 'Direito Previdenciário', path: '/previdenciario' },
  { name: 'Direito Trabalhista', path: '/trabalhista' },
  { name: 'Direito Cível', path: '/civel' },
  { name: 'Direito do Consumidor', path: '/consumidor' },
  { name: 'Direito de Família', path: '/familia' },
  { name: 'Direito Imobiliário', path: '/imobiliario' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* CTA Bar */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container flex flex-col sm:flex-row items-center justify-between" style={{ paddingTop: '48px', paddingBottom: '48px', gap: '32px' }}>
          <div className="text-center sm:text-left">
            <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 600, marginBottom: '4px' }}>
              Precisa de orientação jurídica?
            </h3>
            <p style={{ color: 'var(--gray-400)', fontSize: '14px' }}>
              Entre em contato e descubra como podemos ajudar.
            </p>
          </div>
          <Link to="/contato" className="btn btn-gold">
            Fale Conosco <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="container" style={{ paddingTop: '48px', paddingBottom: '40px' }}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-10">
          {/* Brand */}
          <div>
            <img
              src="/logo-horizontal.webp"
              alt="Will & Pereira Advocacia"
              style={{ height: '28px', width: 'auto', filter: 'brightness(0) invert(1)', marginBottom: '20px' }}
            />
            <p style={{ color: 'var(--gray-400)', fontSize: '14px', lineHeight: 1.7, maxWidth: '320px' }}>
              Advocacia especializada em Palhoça/SC com atendimento em todo o Brasil.
              Mais de 15 anos defendendo seus direitos com excelência e dedicação.
            </p>
          </div>

          {/* Areas */}
          <div className="footer-col">
            <h4>Áreas de Atuação</h4>
            {areas.map(a => (
              <Link key={a.path} to={a.path} className="footer-link">{a.name}</Link>
            ))}
          </div>

          {/* Institucional */}
          <div className="footer-col">
            <h4>Institucional</h4>
            <Link to="/escritorio" className="footer-link">Nosso Escritório</Link>
            <Link to="/contato" className="footer-link">Contato</Link>
            <Link to="/blog" className="footer-link">Blog</Link>
            <Link to="/termos" className="footer-link">Termos de Uso</Link>
            <Link to="/privacidade" className="footer-link">Política de Privacidade</Link>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contato</h4>
            <div className="flex flex-col gap-4">
              <a href="tel:+5548984584181" className="flex items-center gap-3">
                <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={14} style={{ color: 'var(--gold)' }} />
                </span>
                <span style={{ color: 'var(--gray-400)', fontSize: '14px' }}>(48) 98458-4181</span>
              </a>
              <a href="mailto:advocacia@willepereira.adv.br" className="flex items-center gap-3">
                <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={14} style={{ color: 'var(--gold)' }} />
                </span>
                <span style={{ color: 'var(--gray-400)', fontSize: '14px' }}>advocacia@willepereira.adv.br</span>
              </a>
              <div className="flex items-center gap-3">
                <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={14} style={{ color: 'var(--gold)' }} />
                </span>
                <span style={{ color: 'var(--gray-400)', fontSize: '14px' }}>Rua Najla Carone Guedert, 1080 — Palhoça/SC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <p style={{ color: 'var(--gray-500)', fontSize: '13px' }}>
                © {new Date().getFullYear()} Will & Pereira Advocacia. Todos os direitos reservados.
              </p>
              <div className="flex items-center gap-4">
                <Link to="/termos" style={{ color: 'var(--gray-500)', fontSize: '13px', textDecoration: 'none' }}>Termos de Uso</Link>
                <Link to="/privacidade" style={{ color: 'var(--gray-500)', fontSize: '13px', textDecoration: 'none' }}>Privacidade</Link>
              </div>
            </div>
            <span style={{ color: 'var(--gray-500)', fontSize: '13px' }}>OAB/SC</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
