import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Globe, ArrowUp } from 'lucide-react'

const areas = [
  { name: 'Direito Previdenciário', path: '/servicos' },
  { name: 'Direito Trabalhista', path: '/servicos' },
  { name: 'Direito Cível', path: '/servicos' },
  { name: 'Direito do Consumidor', path: '/servicos' },
  { name: 'Direito de Família', path: '/servicos' },
  { name: 'Direito Imobiliário', path: '/servicos' },
]

const contato = [
  { icon: Phone, label: 'Telefone', value: '(48) 99999-9999', href: 'tel:+5548999999999' },
  { icon: Mail, label: 'Email', value: 'contato@willepereira.adv.br', href: 'mailto:contato@willepereira.adv.br' },
  { icon: MapPin, label: 'Endereço', value: 'Palhoça, SC - Brasil' },
]

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-navy-dark relative">
      {/* CTA Bar */}
      <div className="relative border-b border-white/5">
        <div className="container-premium py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl text-white mb-1">Precisa de orientação jurídica?</h3>
              <p className="text-gray-400 text-sm">Agende sua consulta gratuita agora mesmo.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/contato" className="btn-primary">
                Fale Conosco <ArrowUp size={16} className="rotate-45" />
              </Link>
              <a href="tel:+5548999999999" className="btn-outline btn-outline-light">
                <Phone size={16} /> (48) 99999-9999
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-premium py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand - 4 cols */}
          <div className="lg:col-span-4">
            <img src="/logo-horizontal.png" alt="Will & Pereira Advocacia" className="h-8 brightness-0 invert mb-5" />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Advocacia especializada em Palhoça com atendimento em todo o Brasil. 
              Mais de 15 anos defendendo seus direitos com excelência e dedicação.
            </p>
            <div className="flex gap-3">
              {[Globe, Globe, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Areas - 3 cols */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-6">Áreas de Atuação</h4>
            <ul className="space-y-3">
              {areas.map(a => (
                <li key={a.name}>
                  <Link to={a.path} className="text-gray-400 hover:text-gold text-sm transition-colors duration-300">
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links - 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-6">Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-gold text-sm transition-colors">Início</Link></li>
              <li><Link to="/servicos" className="text-gray-400 hover:text-gold text-sm transition-colors">Serviços</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-gold text-sm transition-colors">Blog</Link></li>
              <li><Link to="/contato" className="text-gray-400 hover:text-gold text-sm transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Contact - 3 cols */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-6">Contato</h4>
            <ul className="space-y-4">
              {contato.map(c => (
                <li key={c.label}>
                  {c.href ? (
                    <a href={c.href} className="flex items-center gap-3 group">
                      <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                        <c.icon size={14} className="text-gold" />
                      </span>
                      <span className="text-gray-400 group-hover:text-white text-sm transition-colors">{c.value}</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <c.icon size={14} className="text-gold" />
                      </span>
                      <span className="text-gray-400 text-sm">{c.value}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="container-premium py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Will & Pereira Advocacia. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link to="/privacidade" className="hover:text-gold transition-colors">Privacidade</Link>
            <Link to="/termos" className="hover:text-gold transition-colors">Termos</Link>
            <span>OAB/SC</span>
          </div>
        </div>
      </div>

      <button
        onClick={scrollTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gold text-navy rounded-full flex items-center justify-center shadow-2xl shadow-gold/20 hover:bg-gold-light hover:shadow-gold/30 transition-all duration-300 z-50"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  )
}
