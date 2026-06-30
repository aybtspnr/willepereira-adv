import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'

interface CTACardProps {
  category?: string
  compact?: boolean
}

const ctaContent: Record<string, { title: string; desc: string; slug: string }> = {
  Previdenciário: {
    title: 'Precisa de ajuda com Direito Previdenciário?',
    desc: 'Nossa equipe especializada analisa seu caso e garante seus direitos junto ao INSS.',
    slug: '/previdenciario',
  },
  Trabalhista: {
    title: 'Precisa de ajuda com Direito Trabalhista?',
    desc: 'Defendemos seus direitos trabalhistas com excelência e dedicação.',
    slug: '/trabalhista',
  },
  Cível: {
    title: 'Precisa de ajuda com Direito Cível?',
    desc: 'Soluções jurídicas completas em conflitos civis, contratos e obrigações.',
    slug: '/civel',
  },
  Consumidor: {
    title: 'Teve um direito do consumidor violado?',
    desc: 'Protegemos seus direitos contra abusos e práticas lesivas.',
    slug: '/consumidor',
  },
  Família: {
    title: 'Precisa de ajuda com Direito de Família?',
    desc: 'Atuação sensível e dedicada em questões familiares e sucessórias.',
    slug: '/familia',
  },
  Imobiliário: {
    title: 'Precisa de ajuda com Direito Imobiliário?',
    desc: 'Assessoria completa em questões imobiliárias, da compra à regularização.',
    slug: '/imobiliario',
  },
  Geral: {
    title: 'Fale com um advogado especialista',
    desc: 'Agende uma orientação jurídica e descubra como podemos ajudar.',
    slug: '/contato',
  },
  Cidades: {
    title: 'Advocacia em todo Santa Catarina',
    desc: 'Atendemos sua cidade com excelência em todas as áreas do Direito.',
    slug: '/contato',
  },
}

export default function CTACard({ category, compact = false }: CTACardProps) {
  const content = ctaContent[category || ''] || ctaContent.Geral

  if (compact) {
    return (
      <div className="my-8 bg-gradient-to-br from-navy to-navy-dark rounded-2xl p-6 md:p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gold-5 rounded-full blur-[80px]" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-white font-serif text-lg md:text-xl mb-1">{content.title}</h4>
            <p className="text-gray-400 text-sm">{content.desc}</p>
          </div>
          <Link
            to={content.slug}
            className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy text-sm font-semibold rounded-full hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 shrink-0"
          >
            Fale Conosco <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="my-10 md:my-12 bg-gradient-to-br from-navy to-navy-dark rounded-3xl p-8 md:p-10 relative overflow-hidden group">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gold-5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>
      <div className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-10 text-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-5 border border-gold/20">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          Will & Pereira Advocacia
        </div>
        <h3 className="text-white font-serif text-2xl md:text-3xl mb-3">{content.title}</h3>
        <p className="text-gray-300 max-w-xl mx-auto mb-6 text-base leading-relaxed">{content.desc}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={content.slug}
            className="group/btn inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
          >
            Solicitar Atendimento <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          <a
            href="tel:+5548984584181"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300"
          >
            <Phone size={16} /> (48) 98458-4181
          </a>
        </div>
        <p className="text-gray-500 text-xs mt-4">
          Atendimento em todo o Brasil • Presencial e Online • Sigilo Profissional
        </p>
      </div>
    </div>
  )
}
