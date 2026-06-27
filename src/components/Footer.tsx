     1|import { Link } from 'react-router-dom'
     2|import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
     3|
     4|const areas = [
     5|  { name: 'Direito Previdenciário', path: '/previdenciario' },
     6|  { name: 'Direito Trabalhista', path: '/trabalhista' },
     7|  { name: 'Direito Cível', path: '/civel' },
     8|  { name: 'Direito do Consumidor', path: '/consumidor' },
     9|  { name: 'Direito de Família', path: '/familia' },
    10|  { name: 'Direito Imobiliário', path: '/imobiliario' },
    11|]
    12|
    13|export default function Footer() {
    14|  return (
    15|    <footer className="site-footer">
    16|      {/* CTA Bar */}
    17|      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
    18|        <div className="container flex items-center justify-between flex-wrap" style={{ padding: '40px 0', gap: '24px' }}>
    19|          <div>
    20|            <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 600, marginBottom: '4px' }}>
    21|              Precisa de orientação jurídica?
    22|            </h3>
    23|            <p style={{ color: 'var(--gray-400)', fontSize: '14px' }}>
    24|              Entre em contato e descubra como podemos ajudar.
    25|            </p>
    26|          </div>
    27|          <Link to="/contato" className="btn btn-gold">
    28|            Fale Conosco <ArrowRight size={16} />
    29|          </Link>
    30|        </div>
    31|      </div>
    32|
    33|      {/* Main footer */}
    34|      <div className="container" style={{ padding: '64px 0' }}>
    35|        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
    36|          {/* Brand */}
    37|          <div>
    38|            <img
    39|              src="/logo-horizontal.png"
    40|              alt="Will & Pereira Advocacia"
    41|              style={{ height: '28px', width: 'auto', filter: 'brightness(0) invert(1)', marginBottom: '16px' }}
    42|            />
    43|            <p style={{ color: 'var(--gray-400)', fontSize: '14px', lineHeight: 1.7, maxWidth: '320px' }}>
    44|              Advocacia especializada em Palhoça/SC com atendimento em todo o Brasil.
    45|              Mais de 15 anos defendendo seus direitos com excelência e dedicação.
    46|            </p>
    47|          </div>
    48|
    49|          {/* Areas */}
    50|          <div className="footer-col">
    51|            <h4>Áreas de Atuação</h4>
    52|            {areas.map(a => (
    53|              <Link key={a.path} to={a.path} className="footer-link">{a.name}</Link>
    54|            ))}
    55|          </div>
    56|
    57|          {/* Contact */}
    58|          <div className="footer-col">
    59|            <h4>Contato</h4>
    60|            <div className="flex flex-col gap-4">
    61|              <a href="tel:+5548988420867" className="flex items-center gap-3">
    62|                <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    63|                  <Phone size={14} style={{ color: 'var(--gold)' }} />
    64|                </span>
    65|                <span style={{ color: 'var(--gray-400)', fontSize: '14px' }}>(48) 98842-0867</span>
    66|              </a>
    67|              <a href="mailto:contato@willepereira.adv.br" className="flex items-center gap-3">
    68|                <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    69|                  <Mail size={14} style={{ color: 'var(--gold)' }} />
    70|                </span>
    71|                <span style={{ color: 'var(--gray-400)', fontSize: '14px' }}>contato@willepereira.adv.br</span>
    72|              </a>
    73|              <div className="flex items-center gap-3">
    74|                <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    75|                  <MapPin size={14} style={{ color: 'var(--gold)' }} />
    76|                </span>
    77|                <span style={{ color: 'var(--gray-400)', fontSize: '14px' }}>Rua Najla Carone Guedert, 1080 — Palhoça/SC</span>
    78|              </div>
    79|            </div>
    80|          </div>
    81|        </div>
    82|      </div>
    83|
    84|      {/* Bottom */}
    85|      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
    86|        <div className="container flex items-center justify-between flex-wrap" style={{ padding: '24px 0', gap: '12px' }}>
    87|          <p style={{ color: 'var(--gray-500)', fontSize: '13px' }}>
    88|            © {new Date().getFullYear()} Will & Pereira Advocacia. Todos os direitos reservados.
    89|          </p>
    90|          <span style={{ color: 'var(--gray-500)', fontSize: '13px' }}>OAB/SC</span>
    91|        </div>
    92|      </div>
    93|    </footer>
    94|  )
    95|}