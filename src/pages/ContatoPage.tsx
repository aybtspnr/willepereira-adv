     1|import { useState, useRef } from 'react'
     2|import { motion, useInView } from 'framer-motion'
     3|import { Phone, Mail, MapPin, Clock, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
     4|import SEO from '../components/SEO'
     5|
     6|const contatoInfo = [
     7|  { icon: Phone, label: 'Telefone', value: '(48) 98842-0867', href: 'tel:+5548988420867' },
     8|  { icon: Mail, label: 'Email', value: 'contato@willepereira.adv.br', href: 'mailto:contato@willepereira.adv.br' },
     9|  { icon: MapPin, label: 'Endereço', value: 'Rua Najla Carone Guedert, 1080 - Palhoça, SC, 88132-150' },
    10|  { icon: Clock, label: 'Horários', value: 'Seg-Sex: 9h às 18h' },
    11|]
    12|
    13|const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
    14|const ACCESS_KEY = '' // <-- Preencha com sua chave do web3forms.com (gratuito)
    15|
    16|export default function ContatoPage() {
    17|  const [form, setForm] = useState({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' })
    18|  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
    19|  const [errorMsg, setErrorMsg] = useState('')
    20|  const ref = useRef(null)
    21|  const isInView = useInView(ref, { once: true })
    22|
    23|  const handleSubmit = async (e: React.FormEvent) => {
    24|    e.preventDefault()
    25|    setStatus('sending')
    26|    setErrorMsg('')
    27|
    28|    try {
    29|      if (ACCESS_KEY) {
    30|        // Web3Forms API
    31|        const res = await fetch(FORM_ENDPOINT, {
    32|          method: 'POST',
    33|          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    34|          body: JSON.stringify({
    35|            access_key: ACCESS_KEY,
    36|            subject: `Contato Site - ${form.assunto}`,
    37|            from_name: form.nome,
    38|            email: form.email,
    39|            phone: form.telefone,
    40|            message: form.mensagem,
    41|          }),
    42|        })
    43|        const data = await res.json()
    44|        if (data.success) {
    45|          setStatus('sent')
    46|        } else {
    47|          throw new Error(data.message || 'Erro ao enviar')
    48|        }
    49|      } else {
    50|        // Fallback: simulação (exibe msg de configuração)
    51|        await new Promise(r => setTimeout(r, 1500))
    52|        setStatus('error')
    53|        setErrorMsg('Configure a chave do Web3Forms (gratuito) em ContatoPage.tsx')
    54|      }
    55|    } catch (err) {
    56|      setStatus('error')
    57|      setErrorMsg(err instanceof Error ? err.message : 'Erro de conexão. Tente novamente.')
    58|    }
    59|  }
    60|
    61|  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all text-sm"
    62|
    63|  return (
    64|    <div>
    65|      <SEO
    66|        title="Contato | Will & Pereira Advocacia"
    67|        description="Entre em contato com a Will & Pereira Advocacia. Agende uma orientação jurídica. Palhoça/SC."
    68|        canonical="https://willepereira-adv.vercel.app/contato"
    69|      />
    70|      {/* HERO */}
    71|      <section className="relative pt-32 pb-20 bg-navy overflow-hidden">
    72|        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a2634_0%,_#0f1729_100%)]" />
    73|        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    74|          <motion.span
    75|            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    76|            className="inline-block px-4 py-1.5 bg-gold-15 text-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-4"
    77|          >
    78|            Entre em Contato
    79|          </motion.span>
    80|          <motion.h1
    81|            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
    82|            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4"
    83|          >
    84|            Fale Conosco
    85|          </motion.h1>
    86|          <motion.p
    87|            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
    88|            className="text-gray-300 max-w-2xl mx-auto"
    89|          >
    90|            Estamos prontos para ouvir seu caso. Entre em contato conosco.
    91|          </motion.p>
    92|        </div>
    93|      </section>
    94|
    95|      {/* FORM + INFO */}
    96|      <section ref={ref} className="py-20">
    97|        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    98|          <div className="grid lg:grid-cols-5 gap-12">
    99|            {/* Info Cards */}
   100|            <motion.div
   101|              initial={{ opacity: 0, x: -30 }}
   102|              animate={isInView ? { opacity: 1, x: 0 } : {}}
   103|              transition={{ duration: 0.5 }}
   104|              className="lg:col-span-2 space-y-4"
   105|            >
   106|              {contatoInfo.map((item, i) => (
   107|                <motion.div
   108|                  key={item.label}
   109|                  initial={{ opacity: 0, y: 20 }}
   110|                  animate={isInView ? { opacity: 1, y: 0 } : {}}
   111|                  transition={{ delay: 0.2 + i * 0.1 }}
   112|                  className="flex items-start gap-4 p-5 rounded-xl bg-cream hover:bg-gold-5 transition-colors"
   113|                >
   114|                  <div className="w-12 h-12 rounded-xl bg-gold-10 flex items-center justify-center shrink-0">
   115|                    <item.icon className="w-5 h-5 text-gold" />
   116|                  </div>
   117|                  <div>
   118|                    <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-1">{item.label}</h4>
   119|                    {item.href ? (
   120|                      <a href={item.href} className="text-navy font-medium hover:text-gold transition-colors">
   121|                        {item.value}
   122|                      </a>
   123|                    ) : (
   124|                      <p className="text-navy font-medium">{item.value}</p>
   125|                    )}
   126|                  </div>
   127|                </motion.div>
   128|              ))}
   129|            </motion.div>
   130|
   131|            {/* Form */}
   132|            <motion.div
   133|              initial={{ opacity: 0, x: 30 }}
   134|              animate={isInView ? { opacity: 1, x: 0 } : {}}
   135|              transition={{ duration: 0.5, delay: 0.2 }}
   136|              className="lg:col-span-3"
   137|            >
   138|              {status === 'sent' ? (
   139|                <motion.div
   140|                  initial={{ opacity: 0, scale: 0.95 }}
   141|                  animate={{ opacity: 1, scale: 1 }}
   142|                  className="bg-cream rounded-2xl p-12 text-center"
   143|                >
   144|                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
   145|                    <CheckCircle className="w-8 h-8 text-green-600" />
   146|                  </div>
   147|                  <h3 className="font-serif text-2xl text-navy mb-2">Mensagem Enviada!</h3>
   148|                  <p className="text-gray-500">Entraremos em contato em até 24h úteis.</p>
   149|                </motion.div>
   150|              ) : (
   151|                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg shadow-navy/5 border border-gray-100 space-y-5">
   152|                  {/* Error banner */}
   153|                  {status === 'error' && (
   154|                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
   155|                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
   156|                      <span>{errorMsg}</span>
   157|                    </div>
   158|                  )}
   159|
   160|                  <div className="grid sm:grid-cols-2 gap-5">
   161|                    <div>
   162|                      <label htmlFor="nome" className="block text-sm font-medium text-navy mb-1.5">Nome completo *</label>
   163|                      <input
   164|                        id="nome"
   165|                        required
   166|                        value={form.nome} onChange={e => setForm(p => ({ ...p, nome: e.target.value }))}
   167|                        className={inputClass}
   168|                        placeholder="Seu nome"
   169|                        disabled={status === 'sending'}
   170|                      />
   171|                    </div>
   172|                    <div>
   173|                      <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">Email *</label>
   174|                      <input
   175|                        id="email"
   176|                        required type="email"
   177|                        value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
   178|                        className={inputClass}
   179|                        placeholder="seu@email.com"
   180|                        disabled={status === 'sending'}
   181|                      />
   182|                    </div>
   183|                  </div>
   184|                  <div className="grid sm:grid-cols-2 gap-5">
   185|                    <div>
   186|                      <label htmlFor="telefone" className="block text-sm font-medium text-navy mb-1.5">Telefone</label>
   187|                      <input
   188|                        id="telefone"
   189|                        value={form.telefone} onChange={e => setForm(p => ({ ...p, telefone: e.target.value }))}
   190|                        className={inputClass}
   191|                        placeholder="(48) 99999-9999"
   192|                        disabled={status === 'sending'}
   193|                      />
   194|                    </div>
   195|                    <div>
   196|                      <label htmlFor="assunto" className="block text-sm font-medium text-navy mb-1.5">Assunto *</label>
   197|                      <select
   198|                        id="assunto"
   199|                        required
   200|                        value={form.assunto} onChange={e => setForm(p => ({ ...p, assunto: e.target.value }))}
   201|                        className={`${inputClass} bg-white`}
   202|                        disabled={status === 'sending'}
   203|                      >
   204|                        <option value="">Selecione...</option>
   205|                        <option>Direito Previdenciário</option>
   206|                        <option>Direito Trabalhista</option>
   207|                        <option>Direito Cível</option>
   208|                        <option>Direito do Consumidor</option>
   209|                        <option>Direito de Família</option>
   210|                        <option>Direito Imobiliário</option>
   211|                        <option>Outro</option>
   212|                      </select>
   213|                    </div>
   214|                  </div>
   215|                  <div>
   216|                    <label htmlFor="mensagem" className="block text-sm font-medium text-navy mb-1.5">Mensagem *</label>
   217|                    <textarea
   218|                      id="mensagem"
   219|                      required rows={5}
   220|                      value={form.mensagem} onChange={e => setForm(p => ({ ...p, mensagem: e.target.value }))}
   221|                      className={`${inputClass} resize-none`}
   222|                      placeholder="Descreva seu caso..."
   223|                      disabled={status === 'sending'}
   224|                    />
   225|                  </div>
   226|                  <button
   227|                    type="submit"
   228|                    disabled={status === 'sending'}
   229|                    className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300 ${
   230|                      status === 'sending'
   231|                        ? 'bg-gold/60 text-navy/70 cursor-not-allowed'
   232|                        : 'bg-gold text-navy hover:bg-gold-light'
   233|                    }`}
   234|                  >
   235|                    {status === 'sending' ? (
   236|                      <><Loader2 size={18} className="animate-spin" /> Enviando...</>
   237|                    ) : (
   238|                      'Enviar Mensagem'
   239|                    )}
   240|                  </button>
   241|                  <p className="text-xs text-gray-400 text-center">
   242|                    Ao enviar, você concorda com nossa política de privacidade.
   243|                    Seus dados estão protegidos.
   244|                  </p>
   245|                </form>
   246|              )}
   247|            </motion.div>
   248|          </div>
   249|        </div>
   250|      </section>
   251|    </div>
   252|  )
   253|}
   254|