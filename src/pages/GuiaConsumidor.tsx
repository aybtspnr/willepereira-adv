import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, FileText, Scale, ChevronRight, ShoppingCart, AlertTriangle, CreditCard, Shield, Phone, Star } from 'lucide-react'
import SEO from '../components/SEO'

export default function GuiaConsumidor() {
  return (
    <div>
      <SEO
        title="Guia Completo de Direito do Consumidor | Will & Pereira Advocacia"
        description="Guia completo e atualizado sobre Direito do Consumidor: CDC, direitos básicos, produtos defeituosos, cobrança indevida, planos de saúde, comércio eletrônico e muito mais."
        canonical="https://willepereira-adv.vercel.app/consumidor/guia"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a2634_0%,_#0f1729_100%)]" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gold-5 rounded-full blur-[120px]" />
        <div className="relative z-10 container text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-gold-15 text-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-4"
          >
            Guia Completo
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
          >
            Direito do Consumidor
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-3xl mx-auto text-lg"
          >
            Tudo o que você precisa saber sobre seus direitos nas relações de consumo: CDC, produtos
            defeituosos, cobrança indevida, planos de saúde, compras online e muito mais. Guia
            atualizado com a legislação vigente.
          </motion.p>
        </div>
      </section>

      {/* Índice */}
      <section className="py-16 bg-cream">
        <div className="container max-w-4xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
            <h2 className="font-serif text-2xl text-navy mb-6">Neste Guia</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { href: '#cdc', label: 'O que é o Código de Defesa do Consumidor?' },
                { href: '#direitos-basicos', label: 'Direitos Básicos do Consumidor' },
                { href: '#produtos-defeituosos', label: 'Produtos Defeituosos e Vícios' },
                { href: '#cobranca-indevida', label: 'Cobrança Indevida e Abusiva' },
                { href: '#planos-saude', label: 'Planos de Saúde' },
                { href: '#comercio-eletronico', label: 'Comércio Eletrônico' },
                { href: '#publicidade-engenhosa', label: 'Publicidade Enganosa e Abusiva' },
                { href: '#credito', label: 'Crédito e Superendividamento' },
                { href: '#garantias', label: 'Garantias e Prazos' },
                { href: '#transporte', label: 'Direitos no Transporte' },
                { href: '#documentos', label: 'Documentos e Provas' },
                { href: '#faq', label: 'Perguntas Frequentes' },
              ].map(item => (
                <a key={item.href} href={item.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gold-5 transition-all group">
                  <ChevronRight size={16} className="text-gold shrink-0 group-hover:translate-x-1 transition-transform" />
                  <span className="text-sm text-navy font-medium">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          <div className="prose max-w-none">

            <h2 id="cdc" className="font-serif text-3xl text-navy mt-0">O que é o Código de Defesa do Consumidor?</h2>
            <p className="text-gray-600 leading-relaxed">
              O Código de Defesa do Consumidor (CDC), instituído pela Lei 8.078/1990, é o principal
              instrumento de proteção do consumidor no Brasil. Ele estabelece normas de ordem pública
              e interesse social, regulando as relações de consumo e garantindo direitos fundamentais
              a todo cidadão que adquire produtos ou serviços como destinatário final.
            </p>
            <p className="text-gray-600 leading-relaxed">
              O CDC é reconhecido internacionalmente como um dos códigos mais avançados do mundo,
              sendo aplicado em todas as relações de consumo, seja entre pessoas físicas ou jurídicas,
              sempre que uma delas atue como fornecedora e a outra como consumidora final.
            </p>

            <h3 className="font-serif text-xl text-navy mt-10 mb-4">Princípios Fundamentais do CDC</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              {[
                { icon: Shield, label: 'Vulnerabilidade', desc: 'O consumidor é a parte mais frágil na relação de consumo' },
                { icon: Scale, label: 'Hipossuficiência', desc: 'Facilitação da defesa do consumidor em juízo' },
                { icon: FileText, label: 'Transparência', desc: 'Informação clara e adequada sobre produtos e serviços' },
                { icon: Star, label: 'Boa-fé', desc: 'Lealdade e confiança nas relações contratuais' },
                { icon: AlertTriangle, label: 'Prevenção', desc: 'Responsabilidade objetiva do fornecedor' },
                { icon: ShoppingCart, label: 'Reparação', desc: 'Facilidade na reparação de danos sofridos' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-cream border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-gold-10 flex items-center justify-center shrink-0">
                    <item.icon size={22} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy text-sm mb-1">{item.label}</h4>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 id="direitos-basicos" className="font-serif text-3xl text-navy mt-16">Direitos Básicos do Consumidor</h2>
            <p className="text-gray-600 leading-relaxed">
              O artigo 6º do CDC elenca os direitos básicos do consumidor. Conhecer esses direitos é
              o primeiro passo para exercer a cidadania nas relações de consumo:
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Principais Direitos</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Proteção da vida, saúde e segurança contra riscos causados por produtos e serviços
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Educação e divulgação sobre o consumo adequado dos produtos e serviços
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Informação clara e adequada sobre quantidade, características, composição e preço
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Proteção contra publicidade enganosa e abusiva, métodos comerciais coercitivos
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Modificação de cláusulas contratuais que estabeleçam prestações desproporcionais
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Acesso facilitado aos órgãos judiciais e administrativos de defesa do consumidor
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Facilitação da defesa em juízo, inclusive com inversão do ônus da prova
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Direito de arrependimento (7 dias) para compras fora do estabelecimento comercial
                </li>
              </ul>
            </div>

            <h2 id="produtos-defeituosos" className="font-serif text-3xl text-navy mt-16">Produtos Defeituosos e Vícios</h2>
            <p className="text-gray-600 leading-relaxed">
              O CDC diferencia vício do produto (problemas de qualidade ou quantidade) de defeito do
              produto (quando o produto causa dano ao consumidor). Em ambos os casos, o fornecedor
              tem responsabilidade objetiva, ou seja, não precisa haver comprovação de culpa.
            </p>

            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Diferença entre Vício e Defeito</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">🛠️ Vício do Produto</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Produto não funciona adequadamente
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Quantidade inferior à contratada
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Prazo para reclamar: 30 dias (não durável) ou 90 dias (durável)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Direito de troca, abatimento ou rescisão
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">⚠️ Defeito do Produto</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Produto causa dano à saúde ou segurança
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Gera direito a indenização por danos materiais e morais
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Prazo prescricional: 5 anos
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Responsabilidade solidária de toda a cadeia de fornecedores
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gold-5 border border-gold-20 rounded-2xl p-8 my-10 not-prose">
              <h4 className="font-serif text-xl text-navy mb-4">🔧 Comprou um produto com defeito?</h4>
              <p className="text-gray-600 text-sm mb-6">
                O fornecedor tem até 30 dias para resolver o problema (vício). Se não resolver,
                você pode exigir a troca do produto, o abatimento proporcional do preço ou a
                rescisão do contrato com devolução do valor pago. Em casos de defeito que cause
                dano, você também pode pedir indenização.
              </p>
              <Link to="/contato" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all">
                Quero saber meus direitos <ArrowRight size={16} />
              </Link>
            </div>

            <h2 id="cobranca-indevida" className="font-serif text-3xl text-navy mt-16">Cobrança Indevida e Abusiva</h2>
            <p className="text-gray-600 leading-relaxed">
              A cobrança indevida é uma das situações mais comuns no Direito do Consumidor. O CDC
              protege o consumidor contra cobranças abusivas e garante o direito à repetição do
              indébito (devolução em dobro) quando o valor foi pago indevidamente.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">O que caracteriza cobrança abusiva?</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Cobrança de tarifas ou taxas não contratadas
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Inscrição indevida em cadastros de inadimplentes (SPC, Serasa)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Juros abusivos ou superiores ao contratado
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Cobrança de dívida já prescrita ou já paga
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Exposição pública do consumidor como devedor (constrangimento)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Ameaças, coação ou linguagem ofensiva na cobrança
                </li>
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Importante:</strong> Se você foi cobrado indevidamente e pagou, tem direito
              à devolução em dobro do valor pago acrescido de correção monetária e juros. Se houve
              inscrição indevida em cadastros de inadimplentes, você pode pleitear indenização por
              danos morais.
            </p>

            <h2 id="planos-saude" className="font-serif text-3xl text-navy mt-16">Planos de Saúde</h2>
            <p className="text-gray-600 leading-relaxed">
              Os planos de saúde são regulados pela Lei 9.656/98 e pela ANS (Agência Nacional de
              Saúde Suplementar), além do CDC. As operadoras devem cumprir uma série de obrigações
              e o consumidor tem direitos específicos:
            </p>
            <div className="grid md:grid-cols-2 gap-4 not-prose my-6">
              {[
                'Cobertura obrigatória para procedimentos do Rol ANS',
                'Garantia de internação conforme a necessidade do paciente',
                'Proibição de reajuste por mudança de faixa etária abusivo',
                'Atendimento de emergência sem carência em situações urgentes',
                'Portabilidade de carências entre operadoras',
                'Direito à segunda opinião médica',
                'Fornecimento de medicamento domiciliar (home care) quando indicado',
                'Reembolso em caso de atendimento fora da rede credenciada',
              ].map((direito, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-cream">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-sm text-navy">{direito}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Atenção:</strong> A negativa de cobertura pela operadora de plano de saúde é
              uma das principais causas de ações judiciais. Se o seu plano negar um procedimento
              prescrito pelo médico, procure imediatamente orientação jurídica. A Justiça tem
              reiteradamente garantido o direito à cobertura quando há prescrição médica.
            </p>

            <h2 id="comercio-eletronico" className="font-serif text-3xl text-navy mt-16">Comércio Eletrônico</h2>
            <p className="text-gray-600 leading-relaxed">
              As compras pela internet são regidas pelo CDC e pelo Decreto 7.962/2013, que
              regulamenta o comércio eletrônico. O consumidor online tem direitos específicos
              que garantem segurança e transparência nas transações virtuais.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Seus direitos nas compras online</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Direito de arrependimento:</strong> 7 dias para desistir da compra, sem
                  necessidade de justificativa, com devolução integral do valor pago
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Informação clara:</strong> Preço total, frete, prazo de entrega e
                  condições de pagamento devem estar visíveis
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Segurança:</strong> O site deve oferecer ambiente seguro para pagamento
                  e proteger seus dados pessoais
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Entrega:</strong> O produto deve ser entregue no prazo e nas condições
                  anunciadas, sob pena de multa e indenização
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Produto diferente:</strong> Se o produto chegar diferente do anunciado,
                  você pode exigir troca ou devolução
                </li>
              </ul>
            </div>

            <h2 id="publicidade-engenhosa" className="font-serif text-3xl text-navy mt-16">Publicidade Enganosa e Abusiva</h2>
            <p className="text-gray-600 leading-relaxed">
              O CDC proíbe expressamente a publicidade enganosa (que induz o consumidor ao erro) e
              a publicidade abusiva (que se aproveita da vulnerabilidade do consumidor). A
              responsabilidade é solidária entre o anunciante, a agência de publicidade e o veículo
              de comunicação.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Tipos de Publicidade Proibida</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">📢 Enganosa</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Informação falsa sobre o produto
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Omissão de informações essenciais
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Promessa de benefício inexistente
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Preço promocional fictício
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">🚫 Abusiva</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Que se aproveita de crianças
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Que estimula violência ou discriminação
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Que induz comportamento prejudicial
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Que desrespeita valores ambientais
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 id="credito" className="font-serif text-3xl text-navy mt-16">Crédito e Superendividamento</h2>
            <p className="text-gray-600 leading-relaxed">
              O crédito ao consumidor é regulado pelo CDC e, mais recentemente, pela Lei do
              Superendividamento (Lei 14.181/2021), que alterou o CDC para proteger consumidores
              que contraem dívidas de boa-fé e não conseguem pagar sem comprometer o sustento
              próprio e da família.
            </p>
            <h3 className="font-serif text-xl text-navy mt-8 mb-4">Direitos do Consumidor Endividado</h3>
            <div className="space-y-4 not-prose">
              {[
                { title: 'Direito à Informação Prévia', desc: 'Antes de contratar o crédito, o consumidor tem direito a informações claras sobre taxa de juros, CET (Custo Efetivo Total), valor das parcelas e consequências do inadimplemento.' },
                { title: 'Prevenção ao Superendividamento', desc: 'As instituições financeiras são obrigadas a avaliar a capacidade de pagamento do consumidor antes de conceder crédito, sob pena de responsabilidade.' },
                { title: 'Repactuação de Dívidas', desc: 'O consumidor superendividado pode propor um plano de repactuação judicial, com prazo de até 5 anos para pagamento, mantendo o mínimo existencial.' },
                { title: 'Proibição de Assédio', desc: 'É vedado aos credores assediar ou pressionar o consumidor para contratar crédito, bem como utilizar métodos coercitivos de cobrança.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-cream border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-gold-10 flex items-center justify-center shrink-0 text-gold font-semibold text-sm">{i + 1}</div>
                  <div>
                    <h4 className="font-semibold text-navy text-sm">{item.title}</h4>
                    <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 id="garantias" className="font-serif text-3xl text-navy mt-16">Garantias e Prazos</h2>
            <p className="text-gray-600 leading-relaxed">
              No Direito do Consumidor, existem diferentes prazos para reclamar de problemas com
              produtos e serviços. É fundamental conhecer cada um deles para não perder o direito
              de reclamar.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Prazos para Reclamar</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">📦 Garantia Legal</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Produtos não duráveis (alimentos, remédios): 30 dias
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Produtos duráveis (eletrônicos, móveis): 90 dias
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Prazo conta a partir da entrega do produto
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Pode ser combinada com garantia contratual
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">📝 Garantia Contratual</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Oferecida voluntariamente pelo fornecedor
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Deve constar em termo escrito e claro
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      A garantia legal não é substituída pela contratual
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      O prazo começa após o término da garantia legal
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 id="transporte" className="font-serif text-3xl text-navy mt-16">Direitos no Transporte</h2>
            <p className="text-gray-600 leading-relaxed">
              Os consumidores de serviços de transporte (aéreo, rodoviário, ferroviário e aquaviário)
              têm direitos específicos garantidos pelo CDC e por leis setoriais. Em caso de atrasos,
              cancelamentos, overbooking ou extravio de bagagem, o consumidor pode exigir
              indenização.
            </p>
            <div className="grid md:grid-cols-2 gap-4 not-prose my-6">
              {[
                'Atraso de voo: assistência material (água, alimentação, hospedagem)',
                'Overbooking: reacomodação ou indenização com compensação',
                'Extravio de bagagem: indenização por danos materiais e morais',
                'Cancelamento de voo: reembolso integral ou reacomodação',
                'Transporte rodoviário: passagem interestadual com direito a meia-entrada',
                'Ônibus atrasar: direito ao reembolso se atraso superior a 1 hora',
                'Bagagem danificada: indenização pelo dano causado',
                'Direito à informação: sobre atrasos e cancelamentos em tempo real',
              ].map((direito, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-cream">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-sm text-navy">{direito}</span>
                </div>
              ))}
            </div>

            <h2 id="documentos" className="font-serif text-3xl text-navy mt-16">Documentos e Provas</h2>
            <p className="text-gray-600 leading-relaxed">
              Para garantir seus direitos como consumidor, é essencial manter registros e
              documentos que comprovem a relação de consumo. Quanto mais provas você tiver, mais
              forte será sua reclamação ou ação judicial.
            </p>
            <div className="grid md:grid-cols-2 gap-3 not-prose my-6">
              {[
                'Nota fiscal ou cupom fiscal do produto',
                'Contrato de prestação de serviços',
                'Comprovantes de pagamento (recibos, extratos)',
                'E-mails e mensagens trocados com o fornecedor',
                'Prints de tela de sites e anúncios',
                'Fotos e vídeos do produto com defeito',
                'Protocolos de reclamação (SAC, Procon)',
                'Laudos técnicos (quando aplicável)',
                'Testemunhas do ocorrido',
                'Orçamentos e propostas comerciais',
                'Manuais e termos de garantia',
                'Comprovante de entrega do produto',
              ].map((doc, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-cream">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-sm text-navy">{doc}</span>
                </div>
              ))}
            </div>

            <div className="bg-gold-5 border border-gold-20 rounded-2xl p-8 my-10 not-prose">
              <h4 className="font-serif text-xl text-navy mb-4">📋 Guarde todos os documentos!</h4>
              <p className="text-gray-600 text-sm mb-6">
                A organização de documentos é fundamental para o sucesso de uma reclamação ou ação
                judicial. Mantenha um arquivo (físico ou digital) com todos os comprovantes
                relacionados à sua relação de consumo. O CDC estabelece a inversão do ônus da
                prova a favor do consumidor, mas ter provas robustas acelera o processo.
              </p>
              <Link to="/contato" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all">
                Preciso de orientação <ArrowRight size={16} />
              </Link>
            </div>

            <h2 id="faq" className="font-serif text-3xl text-navy mt-16">Perguntas Frequentes</h2>
            <div className="space-y-4 not-prose mt-6">
              {[
                { p: 'O que fazer quando um produto comprado online não chega?', r: 'Entre em contato com o fornecedor e registre reclamação no Procon. Se não resolvido, você pode exigir a devolução do valor pago com correção e juros, além de indenização por danos morais.' },
                { p: 'Quanto tempo tenho para trocar um produto com defeito?', r: 'Produtos não duráveis: 30 dias. Produtos duráveis: 90 dias. O prazo conta a partir da entrega do produto. Após esse período, ainda é possível reclamar na via judicial.' },
                { p: 'A empresa pode me negativar por uma dívida que contestei?', r: 'Sim, se a dívida for legítima. No entanto, se você contestou formalmente e a empresa não respondeu adequadamente, a negativação indevida pode gerar direito a indenização por danos morais.' },
                { p: 'Plano de saúde pode negar cobertura para tratamento prescrito pelo médico?', r: 'Não, se o tratamento estiver no rol da ANS ou tiver prescrição médica fundamentada. A negativa abusiva de cobertura é uma das principais causas de ações contra planos de saúde.' },
                { p: 'Tenho direito ao dinheiro de volta se desistir da compra em 7 dias?', r: 'Sim, o direito de arrependimento vale para compras feitas fora do estabelecimento comercial (internet, telefone, catálogo). Você tem 7 dias para desistir e receber o valor integral de volta, incluindo frete.' },
                { p: 'O que é superendividamento e como a lei me protege?', r: 'Superendividamento é quando o consumidor de boa-fé contrai dívidas que comprometem seu sustento. A Lei 14.181/2021 permite a repactuação judicial das dívidas com prazo de até 5 anos, mantendo o mínimo existencial.' },
              ].map((faq, i) => (
                <details key={i} className="faq-item group">
                  <summary className="cursor-pointer flex justify-between items-center py-4 text-navy font-medium">
                    {faq.p}
                    <ChevronRight size={16} className="faq-arrow text-gold transition-transform duration-200" />
                  </summary>
                  <p className="text-gray-600 text-sm pb-4">{faq.r}</p>
                </details>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Seções relacionadas */}
      <section className="py-16 bg-cream">
        <div className="container max-w-4xl">
          <h2 className="font-serif text-2xl text-navy text-center mb-10">Áreas Relacionadas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { to: '/civel', icon: Scale, title: 'Direito Cível', desc: 'Contratos, indenizações e responsabilidade civil' },
              { to: '/familia', icon: Heart, title: 'Direito de Família', desc: 'Divórcio, guarda, pensão e inventário' },
              { to: '/imobiliario', icon: FileText, title: 'Direito Imobiliário', desc: 'Compra e venda, locação e condomínio' },
            ].map((area, i) => (
              <Link key={i} to={area.to} className="bg-white rounded-xl p-6 border border-gray-100 hover:border-gold-30 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 rounded-xl bg-gold-10 flex items-center justify-center mb-4">
                  <area.icon size={22} className="text-gold" />
                </div>
                <h3 className="font-semibold text-navy mb-2">{area.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{area.desc}</p>
                <span className="text-gold text-sm font-medium group-hover:underline">Saiba mais →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contato" className="relative py-24 md:py-28 bg-gradient-to-b from-navy-dark via-navy to-navy text-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-5 rounded-full blur-[150px]" />
        </div>
        <div className="relative z-10 container max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4">
            Seus Direitos Merecem Proteção
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Nossa equipe de Direito do Consumidor está pronta para analisar seu caso e garantir
            que seus direitos sejam respeitados.
          </p>
          <Link to="/contato" className="group inline-flex items-center gap-3 px-10 py-4 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30">
            Fale com um Especialista <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-gray-500 text-sm mt-8">
            Atendimento em todo o Brasil • Presencial e Online • Sigilo Profissional
          </p>
        </div>
      </section>
    </div>
  )
}
