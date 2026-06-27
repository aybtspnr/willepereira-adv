import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'

const contatoInfo = [
  { icon: Phone, label: 'Telefone', value: '(48) 98842-0867', href: 'tel:+5548988420867' },
  { icon: Mail, label: 'Email', value: 'contato@willepereira.adv.br', href: 'mailto:contato@willepereira.adv.br' },
  { icon: MapPin, label: 'Endereço', value: 'Rua Najla Carone Guedert, 1080 - Palhoça, SC, 88132-150' },
  { icon: Clock, label: 'Horários', value: 'Seg-Sex: 9h às 18h' },
]

export default function ContatoPage() {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' })
  const [sent, setSent] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate sending
    await new Promise(r => setTimeout(r, 1500))
    setSent(true)
  }

  return (
    <div>
      <Helmet>
        <title>Contato | Will & Pereira Advocacia | Will & Pereira Advocacia</title>
        <meta name="description" content="Entre em contato com a Will & Pereira Advocacia. Agende uma orientação jurídica. Palhoça/SC." />
        <link rel="canonical" href="https://willepereira-adv.vercel.app/contato" />
        <meta property="og:title" content="Contato | Will & Pereira Advocacia" />
        <meta property="og:description" content="Entre em contato com a Will & Pereira Advocacia. Agende uma orientação jurídica. Palhoça/SC." />
        <meta property="og:url" content="https://willepereira-adv.vercel.app/contato" />
      </Helmet>
      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a2634_0%,_#0f1729_100%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-gold/15 text-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-4"
          >
            Entre em Contato
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4"
          >
            Fale Conosco
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Estamos prontos para ouvir seu caso. Entre em contato conosco.
          </motion.p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section ref={ref} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-4"
            >
              {contatoInfo.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-cream hover:bg-gold/5 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-1">{item.label}</h4>
                    {item.href ? (
                      <a href={item.href} className="text-navy font-medium hover:text-gold transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-navy font-medium">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-cream rounded-2xl p-12 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl text-navy mb-2">Mensagem Enviada!</h3>
                  <p className="text-gray-500">Entraremos em contato em até 24h úteis.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg shadow-navy/5 border border-gray-100 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Nome completo *</label>
                      <input
                        required
                        value={form.nome} onChange={e => setForm(p => ({ ...p, nome: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all text-sm"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Email *</label>
                      <input
                        required type="email"
                        value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all text-sm"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Telefone</label>
                      <input
                        value={form.telefone} onChange={e => setForm(p => ({ ...p, telefone: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all text-sm"
                        placeholder="(48) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Assunto *</label>
                      <select
                        required
                        value={form.assunto} onChange={e => setForm(p => ({ ...p, assunto: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all text-sm bg-white"
                      >
                        <option value="">Selecione...</option>
                        <option>Direito Previdenciário</option>
                        <option>Direito Trabalhista</option>
                        <option>Direito Cível</option>
                        <option>Direito do Consumidor</option>
                        <option>Direito de Família</option>
                        <option>Direito Imobiliário</option>
                        <option>Outro</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Mensagem *</label>
                    <textarea
                      required rows={5}
                      value={form.mensagem} onChange={e => setForm(p => ({ ...p, mensagem: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all text-sm resize-none"
                      placeholder="Descreva seu caso..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {sent ? <><CheckCircle size={18} /> Enviado!</> : 'Enviar Mensagem'}
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    Ao enviar, você concorda com nossa política de privacidade.
                    Seus dados estão protegidos.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
