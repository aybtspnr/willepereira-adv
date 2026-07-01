import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, CheckCircle, Loader2, AlertCircle, ArrowRight, MessageSquare, Globe, Shield } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'

function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const contatoInfo = [
  { icon: Phone, label: 'Telefone', value: '(48) 98458-4181', href: 'tel:+5548984584181', desc: 'Seg-Sex: 9h às 18h' },
  { icon: Mail, label: 'Email', value: 'advocacia@willepereira.adv.br', href: 'mailto:advocacia@willepereira.adv.br', desc: 'Respondemos em até 24h' },
  { icon: MapPin, label: 'Escritório', value: 'Rua Najla Carone Guedert, 1080', href: 'https://maps.app.goo.gl/PM3XGkqih3sJE3696', desc: 'City Office Square, SL 206 - Palhoça/SC' },
]

const whatsappLinks = [
  { number: '(48) 98458-4181', url: 'https://wa.me/5548984584181', label: 'WhatsApp' },
]

const onlinePlatforms = [
  { name: 'Google Meet', icon: Globe },
  { name: 'Zoom', icon: Globe },
  { name: 'Microsoft Teams', icon: Globe },
]

const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = ''

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
        setStatus('error')
        setErrorMsg('Formulário temporariamente indisponível. Entre em contato pelo WhatsApp.')
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Erro de conexão. Tente novamente.')
    }
  }

  return (
    <div>
      <Breadcrumb />
        <SEO
        title="Contato Advocacia Will & Pereira Palhoça/SC Brasil"
        description="Entre em contato com a Will & Pereira Advocacia. Atendimento jurídico presencial em Palhoça/SC e online para todo o Brasil. Telefone e WhatsApp."
        canonical="https://willepereira-adv.vercel.app/contato"
      />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: 'var(--navy-dark)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(201,168,76,0.3) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 opacity-5" style={{ background: 'var(--gold)', filter: 'blur(120px)', borderRadius: '50%' }} />
        <div className="relative z-10 text-center" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest rounded-full mb-6"
            style={{ color: 'var(--gold)' }}
          >
            <span className="w-6 h-px" style={{ background: 'var(--gold)' }} />
            Contato
            <span className="w-6 h-px" style={{ background: 'var(--gold)' }} />
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
          >
            Fale Conosco
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg"
          >
            Estamos prontos para ouvir seu caso. Entre em contato e agende uma orientação jurídica.
          </motion.p>
        </div>
      </section>

      {/* INFO CARDS + FORM */}
      <section ref={ref} className="py-24 md:py-28" style={{ background: 'var(--white)' }}>
        <div className="" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>
                <span className="w-6 h-px" style={{ background: 'var(--gold)' }} />
                Informações
              </span>
              <h1 className="font-serif text-3xl mb-8" style={{ color: 'var(--navy)' }}>
                Canais de Atendimento
              </h1>

              <div className="space-y-4">
                {contatoInfo.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all group"
                          style={{ background: 'var(--cream)' }}
                        >
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors" style={{ background: 'rgba(201,168,76,0.1)' }}>
                            <Icon size={20} style={{ color: 'var(--gold)' }} />
                          </div>
                          <div>
                            <h4 className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--gray-400)' }}>{item.label}</h4>
                            <p className="font-medium mb-1" style={{ color: 'var(--navy)' }}>{item.value}</p>
                            <p className="text-sm" style={{ color: 'var(--gray-500)' }}>{item.desc}</p>
                          </div>
                          <ArrowRight size={16} className="ml-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--gold)' }} />
                        </a>
                      ) : (
                        <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100" style={{ background: 'var(--cream)' }}>
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(201,168,76,0.1)' }}>
                            <Icon size={20} style={{ color: 'var(--gold)' }} />
                          </div>
                          <div>
                            <h4 className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--gray-400)' }}>{item.label}</h4>
                            <p className="font-medium mb-1" style={{ color: 'var(--navy)' }}>{item.value}</p>
                            <p className="text-sm" style={{ color: 'var(--gray-500)' }}>{item.desc}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* WhatsApp */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="mt-6"
              >
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--gray-400)' }}>WhatsApp</p>
                <div className="space-y-3">
                  {whatsappLinks.map((wa) => (
                    <a
                      key={wa.number}
                      href={wa.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl transition-all group"
                      style={{ background: 'rgba(37,211,102,0.05)', border: '1px solid rgba(37,211,102,0.1)' }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#25d366' }}>
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ color: 'var(--navy)' }}>{wa.label}</p>
                        <p className="text-sm" style={{ color: 'var(--gray-500)' }}>{wa.number}</p>
                      </div>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#25d366' }} />
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Online */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="mt-6 p-5 rounded-2xl" style={{ background: 'var(--cream)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Shield size={18} style={{ color: 'var(--gold)' }} />
                  <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--gray-400)' }}>Atendimento Online</p>
                </div>
                <p className="text-sm mb-3" style={{ color: 'var(--gray-600)' }}>
                  Atendemos clientes de todo o Brasil via videoconferência:
                </p>
                <div className="flex flex-wrap gap-2">
                  {onlinePlatforms.map((p) => (
                    <span key={p.name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)' }}>
                      {p.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              {status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-3xl p-12 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  style={{ background: 'var(--cream)' }}
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.1)' }}>
                    <CheckCircle size={40} className="text-green-600" />
                  </div>
                  <h3 className="font-serif text-3xl mb-3" style={{ color: 'var(--navy)' }}>Mensagem Enviada!</h3>
                  <p className="text-lg mb-6" style={{ color: 'var(--gray-500)' }}>
                    Entraremos em contato em até 24h úteis.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' }) }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all"
                    style={{ background: 'var(--gold)', color: 'var(--navy-dark)' }}
                  >
                    Enviar outra mensagem
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-3xl p-8 md:p-10" aria-label="Formulário de contato" style={{ background: 'var(--cream)' }}>
                  <div className="flex items-center gap-3 mb-6">
                    <MessageSquare size={20} style={{ color: 'var(--gold)' }} />
                    <h3 className="font-serif text-2xl" style={{ color: 'var(--navy)' }}>Envie sua Mensagem</h3>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-start gap-3 p-4 rounded-xl mb-6" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.1)' }}>
                      <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-red-600">{errorMsg}</span>
                    </div>
                  )}

                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="nome" className="block text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>Nome completo *</label>
                        <input
                          id="nome"
                          required
                          type="text"
                          value={form.nome}
                          onChange={e => setForm({ ...form, nome: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all text-sm"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>Email *</label>
                        <input
                          id="email"
                          required
                          type="email"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all text-sm"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="telefone" className="block text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>Telefone</label>
                        <input
                          id="telefone"
                          type="tel"
                          value={form.telefone}
                          onChange={e => setForm({ ...form, telefone: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all text-sm"
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                      <div>
                        <label htmlFor="assunto" className="block text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>Assunto *</label>
                        <select
                          id="assunto"
                          required
                          value={form.assunto}
                          onChange={e => setForm({ ...form, assunto: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all text-sm"
                          style={{ background: 'var(--white)' }}
                        >
                          <option value="">Selecione...</option>
                          <option value="Previdenciário">Direito Previdenciário</option>
                          <option value="Trabalhista">Direito Trabalhista</option>
                          <option value="Cível">Direito Cível</option>
                          <option value="Consumidor">Direito do Consumidor</option>
                          <option value="Família">Direito de Família</option>
                          <option value="Imobiliário">Direito Imobiliário</option>
                          <option value="Outro">Outro assunto</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="mensagem" className="block text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>Mensagem *</label>
                      <textarea
                        id="mensagem"
                        required
                        rows={5}
                        value={form.mensagem}
                        onChange={e => setForm({ ...form, mensagem: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all text-sm resize-none"
                        placeholder="Descreva brevemente sua necessidade jurídica..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ background: 'var(--gold)', color: 'var(--navy-dark)' }}
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar Mensagem
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-center" style={{ color: 'var(--gray-400)' }}>
                      Suas informações são tratadas com sigilo profissional (art. 7º, XI, Estatuto da OAB).
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="py-24 md:py-28" style={{ background: 'var(--navy-dark)' }}>
        <div className="" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <ScrollReveal className="text-center mb-12">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>
              <span className="w-6 h-px" style={{ background: 'var(--gold)' }} />
              Localização
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Nosso Escritório</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Rua Najla Carone Guedert, 1080 — City Office Square, SL 206 — Palhoça/SC
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.8854!2d-48.6667!3d-27.6467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM4JzQ4LjEiUyA0OMKwNDAnMDAuMSJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0, filter: 'grayscale(0.3) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            {[
              { icon: MapPin, title: 'Endereço', text: 'Rua Najla Carone Guedert, 1080 - Palhoça/SC' },
              { icon: Clock, title: 'Horário', text: 'Seg-Sex: 9h às 18h' },
              { icon: Globe, title: 'Online', text: 'Atendimento nacional via videoconferência' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={item.title} delay={0.3 + i * 0.1}>
                  <div className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(201,168,76,0.1)' }}>
                      <Icon size={20} style={{ color: 'var(--gold)' }} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--gray-400)' }}>{item.title}</p>
                      <p className="text-sm text-white">{item.text}</p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
