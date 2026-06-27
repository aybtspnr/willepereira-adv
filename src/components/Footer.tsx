import { Link } from 'react-router-dom'
import { Scale, Phone, Mail, MapPin, Globe, MessageSquareShare, ExternalLink, ArrowUp } from 'lucide-react'

const areas = [
  'Direito Previdenciário', 'Direito Trabalhista', 'Direito Cível',
  'Direito do Consumidor', 'Direito de Família', 'Direito Imobiliário',
]

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-navy text-white">
      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative">
          <h2 className="font-serif text-3xl md:text-4xl text-gold mb-4">
            Precisa de Orientação Jurídica?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Estamos prontos para ajudar. Entre em contato e agende uma consulta com nossa equipe.
          </p>
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
          >
            Falar com Advogado
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-gold" />
                <div>
                  <span className="font-serif text-lg font-bold">Will & Pereira</span>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-400">Advocacia</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Advocacia especializada em Palhoça com atendimento em todo o Brasil.
                Soluções jurídicas eficientes para pessoas físicas e empresas.
              </p>
            </div>

            {/* Areas */}
            <div>
              <h4 className="font-serif text-gold mb-4">Áreas de Atuação</h4>
              <ul className="space-y-2">
                {areas.map(area => (
                  <li key={area}>
                    <Link to="/servicos" className="text-gray-400 hover:text-gold text-sm transition-colors">
                      {area}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif text-gold mb-4">Contato</h4>
              <ul className="space-y-3">
                <li>
                  <a href="tel:+5548999999999" className="flex items-center gap-2 text-gray-400 hover:text-gold text-sm transition-colors">
                    <Phone size={14} /> (48) 99999-9999
                  </a>
                </li>
                <li>
                  <a href="mailto:contato@willepereira.adv.br" className="flex items-center gap-2 text-gray-400 hover:text-gold text-sm transition-colors">
                    <Mail size={14} /> contato@willepereira.adv.br
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-gold text-sm transition-colors">
                    <MapPin size={14} /> Palhoça, SC
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-serif text-gold mb-4">Redes Sociais</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300">
                  <Globe size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300">
                  <MessageSquareShare size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300">
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Will & Pereira Advocacia. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link to="/privacidade" className="hover:text-gold transition-colors">Privacidade</Link>
            <Link to="/termos" className="hover:text-gold transition-colors">Termos</Link>
          </div>
        </div>
      </div>

      {/* Scroll Top */}
      <button
        onClick={scrollTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gold text-navy rounded-full flex items-center justify-center shadow-lg hover:shadow-gold/30 hover:bg-gold-light transition-all duration-300 z-50"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  )
}
