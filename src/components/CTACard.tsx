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
      <div style={{ margin: '32px 0', background: 'linear-gradient(135deg, #1a2634, #0f1729)', borderRadius: 16, padding: '24px 32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 192, height: 192, background: 'rgba(201,168,76,0.05)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h4 style={{ color: 'white', fontFamily: 'var(--font-serif)', fontSize: '1.125rem', marginBottom: 4 }}>{content.title}</h4>
            <p style={{ color: 'var(--gray-400)', fontSize: '0.875rem' }}>{content.desc}</p>
          </div>
          <Link
            to={content.slug}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--gold)', color: 'var(--navy-dark)', fontSize: '0.875rem', fontWeight: 600, borderRadius: 9999, textDecoration: 'none', transition: 'all 0.3s', boxShadow: '0 10px 15px -3px rgba(201,168,76,0.2)', flexShrink: 0 }}
          >
            Fale Conosco <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ margin: '40px 0', background: 'linear-gradient(135deg, #1a2634, #0f1729)', borderRadius: 24, padding: '32px 40px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '33%', width: 256, height: 256, background: 'rgba(201,168,76,0.05)', borderRadius: '50%', filter: 'blur(100px)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }} />
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(201,168,76,0.1)', color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: 9999, marginBottom: 20, border: '1px solid rgba(201,168,76,0.2)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', animation: 'pulse 2s infinite' }} />
          Will & Pereira Advocacia
        </div>
        <h3 style={{ color: 'white', fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: 12 }}>{content.title}</h3>
        <p style={{ color: 'var(--gray-300)', maxWidth: 576, margin: '0 auto 24px', fontSize: '1rem', lineHeight: 1.6 }}>{content.desc}</p>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to={content.slug}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: 'var(--gold)', color: 'var(--navy-dark)', fontWeight: 600, borderRadius: 9999, textDecoration: 'none', transition: 'all 0.3s', boxShadow: '0 10px 15px -3px rgba(201,168,76,0.2)' }}
          >
            Solicitar Atendimento <ArrowRight size={18} />
          </Link>
          <a
            href="tel:+5548984584181"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', border: '1.5px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: 600, borderRadius: 9999, textDecoration: 'none', transition: 'all 0.3s' }}
          >
            <Phone size={16} /> (48) 98458-4181
          </a>
        </div>
        <p style={{ color: 'var(--gray-500)', fontSize: '0.75rem', marginTop: 16 }}>
          Atendimento em todo o Brasil • Presencial e Online • Sigilo Profissional
        </p>
      </div>
    </div>
  )
}
