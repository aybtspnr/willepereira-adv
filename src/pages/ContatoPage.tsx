import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import SEO from '../components/SEO'

const contatoInfo = [
  { icon: Phone, label: 'Telefone', value: '(48) 98842-0867', href: 'tel:+5548988420867' },
  { icon: Mail, label: 'Email', value: 'contato@willepereira.adv.br', href: 'mailto:contato@willepereira.adv.br' },
  { icon: MapPin, label: 'Endereço', value: 'Rua Najla Carone Guedert, 1080 - Palhoça, SC, 88132-150' },
  { icon: Clock, label: 'Horários', value: 'Seg-Sex: 9h às 18h' },
]

const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = '' // <-- Preencha com sua chave do web3forms.com (gratuito)

export default function ContatoPage() {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      if (ACCESS_KEY) {
        // Web3Forms API
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: ACCESS_KEY,
            subject: `Contato Site - ${form.assunto}`,
            from_name: form.nome,
            email: form.email,
            phone: form.telefone,
            message: form.mensagem,
          }),
        })
        const data = await res.json()
        if (data.success) {
          setStatus('sent')
        } else {
          throw new Error(data.message || 'Erro ao enviar')
        }
      } else {
        // Fallback: simulação (exibe msg de configuração)
        await new Promise(r => setTimeout(r, 1500))
        setStatus('error')
        setErrorMsg('Configure a chave do Web3Forms (gratuito) em ContatoPage.tsx')
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Erro de conexão. Tente novamente.')
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all text-sm"

  return (
    <div>
      <SEO
        title="Contato | Will & Pereira Advocacia"
        description="Entre em contato com a Will & Pereira Advocacia. Agende uma orientação jurídica. Palhoça/SC."
        canonical="https://willepereira-adv.vercel.app/contato"
      />
      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a2634_0%,_#0f1729_100%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-gold-15 text-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-4"
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
                  className="flex items-start gap-4 p-5 rounded-xl bg-cream hover:bg-gold-5 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-10 flex items-center justify-center shrink-0">
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
              {status === 'sent' ? (
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
                  {/* Error banner */}
                  {status === 'error' && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-navy mb-1.5">Nome completo *</label>
                      <input
                        id="nome"
                        required
                        value={form.nome} onChange={e => setForm(p => ({ ...p, nome: e.target.value }))}
                        className={inputClass}
                        placeholder="Seu nome"
                        disabled={status === 'sending'}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">Email *</label>
                      <input
                        id="email"
                        required type="email"
                        value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        className={inputClass}
                        placeholder="seu@email.com"
                        disabled={status === 'sending'}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="telefone" className="block text-sm font-medium text-navy mb-1.5">Telefone</label>
                      <input
                        id="telefone"
                        value={form.telefone} onChange={e => setForm(p => ({ ...p, telefone: e.target.value }))}
                        className={inputClass}
                        placeholder="(48) 99999-9999"
                        disabled={status === 'sending'}
                      />
                    </div>
                    <div>
                      <label htmlFor="assunto" className="block text-sm font-medium text-navy mb-1.5">Assunto *</label>
                      <select
                        id="assunto"
                        required
                        value={form.assunto} onChange={e => setForm(p => ({ ...p, assunto: e.target.value }))}
                        className={`${inputClass} bg-white`}
                        disabled={status === 'sending'}
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
                    <label htmlFor="mensagem" className="block text-sm font-medium text-navy mb-1.5">Mensagem *</label>
                    <textarea
                      id="mensagem"
                      required rows={5}
                      value={form.mensagem} onChange={e => setForm(p => ({ ...p, mensagem: e.target.value }))}
                      className={`${inputClass} resize-none`}
                      placeholder="Descreva seu caso..."
                      disabled={status === 'sending'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300 ${
                      status === 'sending'
                        ? 'bg-gold/60 text-navy/70 cursor-not-allowed'
                        : 'bg-gold text-navy hover:bg-gold-light'
                    }`}
                  >
                    {status === 'sending' ? (
                      <><Loader2 size={18} className="animate-spin" /> Enviando...</>
                    ) : (
                      'Enviar Mensagem'
                    )}
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
