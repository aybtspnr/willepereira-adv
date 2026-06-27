     1|     1|import { useState, useRef } from 'react'
     2|     2|import { motion, useInView } from 'framer-motion'
     3|     3|import { Phone, Mail, MapPin, Clock, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
     4|     4|import SEO from '../components/SEO'
     5|     5|
     6|     6|const contatoInfo = [
     7|     7|  { icon: Phone, label: 'Telefone', value: '(48) 98842-0867', href: 'tel:+5548988420867' },
     8|     8|  { icon: Mail, label: 'Email', value: 'contato@willepereira.adv.br', href: 'mailto:contato@willepereira.adv.br' },
     9|     9|  { icon: MapPin, label: 'Endereço', value: 'Rua Najla Carone Guedert, 1080 - Palhoça, SC, 88132-150' },
    10|    10|  { icon: Clock, label: 'Horários', value: 'Seg-Sex: 9h às 18h' },
    11|    11|]
    12|    12|
    13|    13|const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
    14|    14|const ACCESS_KEY = '' // <-- Preencha com sua chave do web3forms.com (gratuito)
    15|    15|
    16|    16|export default function ContatoPage() {
    17|    17|  const [form, setForm] = useState({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' })
    18|    18|  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
    19|    19|  const [errorMsg, setErrorMsg] = useState('')
    20|    20|  const ref = useRef(null)
    21|    21|  const isInView = useInView(ref, { once: true })
    22|    22|
    23|    23|  const handleSubmit = async (e: React.FormEvent) => {
    24|    24|    e.preventDefault()
    25|    25|    setStatus('sending')
    26|    26|    setErrorMsg('')
    27|    27|
    28|    28|    try {
    29|    29|      if (ACCESS_KEY) {
    30|    30|        // Web3Forms API
    31|    31|        const res = await fetch(FORM_ENDPOINT, {
    32|    32|          method: 'POST',
    33|    33|          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    34|    34|          body: JSON.stringify({
    35|    35|            access_key: ACCESS_KEY,
    36|    36|            subject: `Contato Site - ${form.assunto}`,
    37|    37|            from_name: form.nome,
    38|    38|            email: form.email,
    39|    39|            phone: form.telefone,
    40|    40|            message: form.mensagem,
    41|    41|          }),
    42|    42|        })
    43|    43|        const data = await res.json()
    44|    44|        if (data.success) {
    45|    45|          setStatus('sent')
    46|    46|        } else {
    47|    47|          throw new Error(data.message || 'Erro ao enviar')
    48|    48|        }
    49|    49|      } else {
    50|    50|        // Fallback: simulação (exibe msg de configuração)
    51|    51|        await new Promise(r => setTimeout(r, 1500))
    52|    52|        setStatus('error')
    53|    53|        setErrorMsg('Configure a chave do Web3Forms (gratuito) em ContatoPage.tsx')
    54|    54|      }
    55|    55|    } catch (err) {
    56|    56|      setStatus('error')
    57|    57|      setErrorMsg(err instanceof Error ? err.message : 'Erro de conexão. Tente novamente.')
    58|    58|    }
    59|    59|  }
    60|    60|
    61|    61|  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all text-sm"
    62|    62|
    63|    63|  return (
    64|    64|    <div>
    65|    65|      <SEO
    66|    66|        title="Contato | Will & Pereira Advocacia"
    67|    67|        description="Entre em contato com a Will & Pereira Advocacia. Agende uma orientação jurídica. Palhoça/SC."
    68|    68|        canonical="https://willepereira-adv.vercel.app/contato"
    69|    69|      />
    70|    70|      {/* HERO */}
    71|    71|      <section className="relative pt-32 pb-20 bg-navy overflow-hidden">
    72|    72|        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a2634_0%,_#0f1729_100%)]" />
    73|    73|        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    74|    74|          <motion.span
    75|    75|            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    76|    76|            className="inline-block px-4 py-1.5 bg-gold-15 text-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-4"
    77|    77|          >
    78|    78|            Entre em Contato
    79|    79|          </motion.span>
    80|    80|          <motion.h1
    81|    81|            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
    82|    82|            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4"
    83|    83|          >
    84|    84|            Fale Conosco
    85|    85|          </motion.h1>
    86|    86|          <motion.p
    87|    87|            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
    88|    88|            className="text-gray-300 max-w-2xl mx-auto"
    89|    89|          >
    90|    90|            Estamos prontos para ouvir seu caso. Entre em contato conosco.
    91|    91|          </motion.p>
    92|    92|        </div>
    93|    93|      </section>
    94|    94|
    95|    95|      {/* FORM + INFO */}
    96|    96|      <section ref={ref} className="py-20">
    97|    97|        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    98|    98|          <div className="grid lg:grid-cols-5 gap-12">
    99|    99|            {/* Info Cards */}
   100|   100|            <motion.div
   101|   101|              initial={{ opacity: 0, x: -30 }}
   102|   102|              animate={isInView ? { opacity: 1, x: 0 } : {}}
   103|   103|              transition={{ duration: 0.5 }}
   104|   104|              className="lg:col-span-2 space-y-4"
   105|   105|            >
   106|   106|              {contatoInfo.map((item, i) => (
   107|   107|                <motion.div
   108|   108|                  key={item.label}
   109|   109|                  initial={{ opacity: 0, y: 20 }}
   110|   110|                  animate={isInView ? { opacity: 1, y: 0 } : {}}
   111|   111|                  transition={{ delay: 0.2 + i * 0.1 }}
   112|   112|                  className="flex items-start gap-4 p-5 rounded-xl bg-cream hover:bg-gold-5 transition-colors"
   113|   113|                >
   114|   114|                  <div className="w-12 h-12 rounded-xl bg-gold-10 flex items-center justify-center shrink-0">
   115|   115|                    <item.icon className="w-5 h-5 text-gold" />
   116|   116|                  </div>
   117|   117|                  <div>
   118|   118|                    <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-1">{item.label}</h4>
   119|   119|                    {item.href ? (
   120|   120|                      <a href={item.href} className="text-navy font-medium hover:text-gold transition-colors">
   121|   121|                        {item.value}
   122|   122|                      </a>
   123|   123|                    ) : (
   124|   124|                      <p className="text-navy font-medium">{item.value}</p>
   125|   125|                    )}
   126|   126|                  </div>
   127|   127|                </motion.div>
   128|   128|              ))}
   129|   129|            </motion.div>
   130|   130|
   131|   131|            {/* Form */}
   132|   132|            <motion.div
   133|   133|              initial={{ opacity: 0, x: 30 }}
   134|   134|              animate={isInView ? { opacity: 1, x: 0 } : {}}
   135|   135|              transition={{ duration: 0.5, delay: 0.2 }}
   136|   136|              className="lg:col-span-3"
   137|   137|            >
   138|   138|              {status === 'sent' ? (
   139|   139|                <motion.div
   140|   140|                  initial={{ opacity: 0, scale: 0.95 }}
   141|   141|                  animate={{ opacity: 1, scale: 1 }}
   142|   142|                  className="bg-cream rounded-2xl p-12 text-center"
   143|   143|                >
   144|   144|                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
   145|   145|                    <CheckCircle className="w-8 h-8 text-green-600" />
   146|   146|                  </div>
   147|   147|                  <h3 className="font-serif text-2xl text-navy mb-2">Mensagem Enviada!</h3>
   148|   148|                  <p className="text-gray-500">Entraremos em contato em até 24h úteis.</p>
   149|   149|                </motion.div>
   150|   150|              ) : (
   151|   151|                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg shadow-navy/5 border border-gray-100 space-y-5">
   152|   152|                  {/* Error banner */}
   153|   153|                  {status === 'error' && (
   154|   154|                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
   155|   155|                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
   156|   156|                      <span>{errorMsg}</span>
   157|   157|                    </div>
   158|   158|                  )}
   159|   159|
   160|   160|                  <div className="grid sm:grid-cols-2 gap-5">
   161|   161|                    <div>
   162|   162|                      <label htmlFor="nome" className="block text-sm font-medium text-navy mb-1.5">Nome completo *</label>
   163|   163|                      <input
   164|   164|                        id="nome"
   165|   165|                        required
   166|   166|                        value={form.nome} onChange={e => setForm(p => ({ ...p, nome: e.target.value }))}
   167|   167|                        className={inputClass}
   168|   168|                        placeholder="Seu nome"
   169|   169|                        disabled={status === 'sending'}
   170|   170|                      />
   171|   171|                    </div>
   172|   172|                    <div>
   173|   173|                      <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">Email *</label>
   174|   174|                      <input
   175|   175|                        id="email"
   176|   176|                        required type="email"
   177|   177|                        value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
   178|   178|                        className={inputClass}
   179|   179|                        placeholder="seu@email.com"
   180|   180|                        disabled={status === 'sending'}
   181|   181|                      />
   182|   182|                    </div>
   183|   183|                  </div>
   184|   184|                  <div className="grid sm:grid-cols-2 gap-5">
   185|   185|                    <div>
   186|   186|                      <label htmlFor="telefone" className="block text-sm font-medium text-navy mb-1.5">Telefone</label>
   187|   187|                      <input
   188|   188|                        id="telefone"
   189|   189|                        value={form.telefone} onChange={e => setForm(p => ({ ...p, telefone: e.target.value }))}
   190|   190|                        className={inputClass}
   191|   191|                        placeholder="(48) 99999-9999"
   192|   192|                        disabled={status === 'sending'}
   193|   193|                      />
   194|   194|                    </div>
   195|   195|                    <div>
   196|   196|                      <label htmlFor="assunto" className="block text-sm font-medium text-navy mb-1.5">Assunto *</label>
   197|   197|                      <select
   198|   198|                        id="assunto"
   199|   199|                        required
   200|   200|                        value={form.assunto} onChange={e => setForm(p => ({ ...p, assunto: e.target.value }))}
   201|   201|                        className={`${inputClass} bg-white`}
   202|   202|                        disabled={status === 'sending'}
   203|   203|                      >
   204|   204|                        <option value="">Selecione...</option>
   205|   205|                        <option>Direito Previdenciário</option>
   206|   206|                        <option>Direito Trabalhista</option>
   207|   207|                        <option>Direito Cível</option>
   208|   208|                        <option>Direito do Consumidor</option>
   209|   209|                        <option>Direito de Família</option>
   210|   210|                        <option>Direito Imobiliário</option>
   211|   211|                        <option>Outro</option>
   212|   212|                      </select>
   213|   213|                    </div>
   214|   214|                  </div>
   215|   215|                  <div>
   216|   216|                    <label htmlFor="mensagem" className="block text-sm font-medium text-navy mb-1.5">Mensagem *</label>
   217|   217|                    <textarea
   218|   218|                      id="mensagem"
   219|   219|                      required rows={5}
   220|   220|                      value={form.mensagem} onChange={e => setForm(p => ({ ...p, mensagem: e.target.value }))}
   221|   221|                      className={`${inputClass} resize-none`}
   222|   222|                      placeholder="Descreva seu caso..."
   223|   223|                      disabled={status === 'sending'}
   224|   224|                    />
   225|   225|                  </div>
   226|   226|                  <button
   227|   227|                    type="submit"
   228|   228|                    disabled={status === 'sending'}
   229|   229|                    className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300 ${
   230|   230|                      status === 'sending'
   231|   231|                        ? 'bg-gold/60 text-navy/70 cursor-not-allowed'
   232|   232|                        : 'bg-gold text-navy hover:bg-gold-light'
   233|   233|                    }`}
   234|   234|                  >
   235|   235|                    {status === 'sending' ? (
   236|   236|                      <><Loader2 size={18} className="animate-spin" /> Enviando...</>
   237|   237|                    ) : (
   238|   238|                      'Enviar Mensagem'
   239|   239|                    )}
   240|   240|                  </button>
   241|   241|                  <p className="text-xs text-gray-400 text-center">
   242|   242|                    Ao enviar, você concorda com nossa política de privacidade.
   243|   243|                    Seus dados estão protegidos.
   244|   244|                  </p>
   245|   245|                </form>
   246|   246|              )}
   247|   247|            </motion.div>
   248|   248|          </div>
   249|   249|        </div>
   250|   250|      </section>
   251|   251|    </div>
   252|   252|  )
   253|   253|}
   254|   254|