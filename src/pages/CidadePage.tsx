import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, MapPin, Phone } from 'lucide-react'
import SEO from '../components/SEO'
import { getCidadeBySlug, type CidadeInfo, getCidadeExtraBySlug, type CidadeExtra } from '../data/cidades'

// Import all pre-generated content files
const contentModules = import.meta.glob('../data/cidades-content/*.ts', { eager: true })

// Build a lookup map: slug -> content
const contentMap: Record<string, any> = {}
for (const path in contentModules) {
  // Extract slug from path like '../data/cidades-content/advogado-em-palhoca.ts'
  const match = path.match(/cidades-content\/(.+)\.ts$/)
  if (match) {
    contentMap[match[1]] = (contentModules[path] as any).default
  }
}

interface CityContent {
  heroTitle: string
  heroDescription: string
  introParagraphs: string[]
  areaContent: {
    previdenciario: string
    trabalhista: string
    civel: string
    consumidor: string
    familia: string
    imobiliario: string
  }
  exclusiva?: string
  diaADia?: string
  faqs: { pergunta: string; resposta: string }[]
  stats: { experiencia: string; clientes: string; taxa: string; cidades: string }
}

const areaLabels: Record<string, { title: string; icon: string; services: string[] }> = {
  previdenciario: {
    title: 'Direito Previdenciário',
    icon: '🛡️',
    services: [
      'Aposentadoria por Tempo de Contribuição e por Idade',
      'Aposentadoria Especial e da Pessoa com Deficiência',
      'Auxílio-Doença e Aposentadoria por Invalidez',
      'Pensão por Morte e Auxílio-Reclusão',
      'BPC/LOAS (Benefício de Prestação Continuada)',
      'Revisão de Benefícios e Recursos Administrativos',
      'Planejamento Previdenciário Personalizado',
    ],
  },
  trabalhista: {
    title: 'Direito Trabalhista',
    icon: '⚖️',
    services: [
      'Verbas Rescisórias e Direitos na Dispensa',
      'Horas Extras e Adicionais',
      'FGTS não Depositado',
      'Assédio Moral e Dano Moral',
      'Acidente de Trabalho e Estabilidade',
      'Equiparação Salarial',
      'Consultoria Trabalhista para Empresas',
    ],
  },
  civel: {
    title: 'Direito Cível',
    icon: '📋',
    services: [
      'Contratos — Elaboração, análise e revisão',
      'Responsabilidade Civil — Ações de indenização',
      'Cobranças — Ações judiciais e extrajudiciais',
      'Usucapião — Regularização de imóveis',
      'Direito de Vizinhança — Conflitos condominiais',
      'Sucessões — Planejamento sucessório e inventários',
    ],
  },
  consumidor: {
    title: 'Direito do Consumidor',
    icon: '🛒',
    services: [
      'Produtos com Defeito — Troca, devolução ou indenização',
      'Cobrança Indevida — Negativação injusta e abusos',
      'Planos de Saúde — Negativas e reajustes abusivos',
      'Serviços Bancários — Tarifas e juros excessivos',
      'Telefonia e Internet — Má prestação de serviços',
      'Cláusulas Abusivas — Contratos de adesão',
    ],
  },
  familia: {
    title: 'Direito de Família',
    icon: '👨‍👩‍👧‍👦',
    services: [
      'Divórcio Consensual e Litigioso',
      'Guarda de Filhos e Regulamentação de Visitas',
      'Pensão Alimentícia',
      'União Estável e Casamento',
      'Inventário e Partilha de Bens',
      'Alienação Parental',
      'Planejamento Sucessório',
    ],
  },
  imobiliario: {
    title: 'Direito Imobiliário',
    icon: '🏠',
    services: [
      'Compra e Venda — Análise de contratos e escrituras',
      'Financiamento Imobiliário',
      'Regularização de Imóveis',
      'Contratos de Aluguel',
      'Ações de Despejo',
      'Revisão de Aluguel',
      'Convenção Condominial',
    ],
  },
}

export default function CidadePage() {
  const { slug } = useParams<{ slug: string }>()
  const cidade = getCidadeBySlug(slug || '') || getCidadeExtraBySlug(slug || '')

  if (!cidade) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-navy mb-4">Cidade não encontrada</h1>
          <Link to="/" className="text-gold hover:underline">Voltar ao início</Link>
        </div>
      </div>
    )
  }

  const content: CityContent | undefined = contentMap[cidade.slug]

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-navy mb-4">Conteúdo não disponível</h1>
          <p className="text-gray-500 mb-4">O conteúdo para {cidade.nome} ainda está sendo preparado.</p>
          <Link to="/" className="text-gold hover:underline">Voltar ao início</Link>
        </div>
      </div>
    )
  }

  const areaKeys = ['previdenciario', 'trabalhista', 'civel', 'consumidor', 'familia', 'imobiliario'] as const

  return (
    <div>
      <SEO
        title={`Advogado em ${cidade.nome}${cidade.estado === 'SC' ? ' - SC' : ` - ${cidade.estado}`} | Will & Pereira Advocacia`}
        description={`${content.heroDescription} Atendimento jurídico em ${cidade.nome} com mais de 15 anos de experiência.`}
        canonical={`https://willepereira-adv.vercel.app/cidade/${cidade.slug}`}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a2634_0%,_#0f1729_100%)]" />
        <div className="relative z-10 text-center" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-gold-15 text-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-4"
          >
            Advocacia em {cidade.nome} • {cidade.regiao}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4"
          >
            {content.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg"
          >
            {content.heroDescription}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Link
              to="/contato"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
            >
              Fale Conosco <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6 bg-cream border-b border-gray-100">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-navy">{content.stats.experiencia}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-navy">{content.stats.clientes}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Clientes Atendidos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-navy">{content.stats.taxa}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Taxa de Sucesso</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-navy">{content.stats.cidades}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Cidades Atendidas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24">
        <div style={{ maxWidth: 896, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          {content.introParagraphs.map((p, i) => (
            <p key={i} className="text-gray-600 leading-relaxed mb-6 text-lg">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Áreas de Atuação */}
      {areaKeys.map((areaKey, idx) => {
        const area = areaLabels[areaKey]
        const text = content.areaContent[areaKey]
        if (!text) return null

        return (
          <section key={areaKey} className={`py-16 md:py-20 ${idx % 2 === 1 ? 'bg-cream' : ''}`}>
            <div style={{ maxWidth: 896, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{area.icon}</span>
                <h2 className="font-serif text-2xl md:text-3xl text-navy">{area.title} em {cidade.nome}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-8">{text}</p>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Principais Serviços</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {area.services.map(service => (
                    <div key={service} className="flex items-start gap-2.5">
                      <CheckCircle size={16} className="text-gold mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-600">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Seção Exclusiva */}
      {content.exclusiva && (
        <section className="py-16 md:py-20 bg-cream">
          <div style={{ maxWidth: 896, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
            <div className="prose max-w-none">
              {content.exclusiva.split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return <h2 key={i} className="font-serif text-2xl md:text-3xl text-navy mt-8 mb-4">{line.replace('## ', '')}</h2>
                }
                if (line.startsWith('**')) {
                  const match = line.match(/\*\*(.+?)\*\*/)
                  if (match) return <p key={i} className="text-navy font-semibold mt-4 mb-2"><strong>{match[1]}</strong></p>
                }
                if (line.startsWith('• ')) {
                  return (
                    <div key={i} className="flex items-start gap-2.5 ml-4 my-1">
                      <CheckCircle size={16} className="text-gold mt-0.5 shrink-0" />
                      <span className="text-gray-600">{line.replace('• ', '')}</span>
                    </div>
                  )
                }
                if (line.trim() === '') return <div key={i} className="h-3" />
                return <p key={i} className="text-gray-600 leading-relaxed mb-3">{line}</p>
              })}
            </div>
          </div>
        </section>
      )}

      {/* Como Ajudar no Dia a Dia */}
      {content.diaADia && (
        <section className="py-16 md:py-20">
          <div style={{ maxWidth: 896, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
            <div className="prose max-w-none">
              {content.diaADia.split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return <h2 key={i} className="font-serif text-2xl md:text-3xl text-navy mt-8 mb-4">{line.replace('## ', '')}</h2>
                }
                if (line.startsWith('**')) {
                  const match = line.match(/\*\*(.+?)\*\*/)
                  if (match) return <p key={i} className="text-navy font-semibold mt-4 mb-2"><strong>{match[1]}</strong></p>
                }
                if (line.startsWith('• ')) {
                  return (
                    <div key={i} className="flex items-start gap-2.5 ml-4 my-1">
                      <CheckCircle size={16} className="text-gold mt-0.5 shrink-0" />
                      <span className="text-gray-600">{line.replace('• ', '')}</span>
                    </div>
                  )
                }
                if (line.trim() === '') return <div key={i} className="h-3" />
                return <p key={i} className="text-gray-600 leading-relaxed mb-3">{line}</p>
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-cream">
        <div style={{ maxWidth: 896, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <h2 className="font-serif text-2xl md:text-3xl text-navy mb-8 text-center">
            Dúvidas Frequentes em {cidade.nome}
          </h2>
          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden group">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none text-navy font-medium hover:bg-gray-50 transition-colors">
                  <span className="pr-4">{faq.pergunta}</span>
                  <ArrowRight size={16} className="text-gold shrink-0 group-open:rotate-90 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {faq.resposta}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-24 md:py-28 bg-gradient-to-b from-navy-dark via-navy to-navy text-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-5 rounded-full blur-[150px]" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)' }} />
        <div className="relative z-10 max-w-3xl pb-16 md:pb-20" style={{ maxWidth: 768, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-10 text-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Fale Conosco
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4">
            Precisa de um Advogado em {cidade.nome}?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Entre em contato. Analisamos cada situação individualmente com atenção e dedicação.
          </p>
          <Link
            to="/contato"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
          >
            Fale Conosco <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-gray-500 text-sm mt-8">
            Atendimento em todo o Brasil • Presencial e Online • Sigilo Profissional
          </p>
        </div>
      </section>
    </div>
  )
}
