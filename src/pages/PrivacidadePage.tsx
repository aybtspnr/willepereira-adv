import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, Lock, Eye, UserCheck, FileText, Database, AlertCircle } from 'lucide-react'
import SEO from '../components/SEO'

function SectionTitle({ num, title, icon: Icon }: { num: string; title: string; icon: any }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(201,168,76,0.1)' }}>
        <Icon size={18} style={{ color: 'var(--gold)' }} />
      </span>
      <h2 className="font-serif text-xl md:text-2xl" style={{ color: 'var(--navy)' }}>{title}</h2>
    </div>
  )
}

export default function PrivacidadePage() {
  return (
    <div>
      <SEO
        title="Política de Privacidade | Will & Pereira Advocacia"
        description="Política de privacidade e proteção de dados da Will & Pereira Advocacia. LGPD."
        canonical="https://willepereira-adv.vercel.app/privacidade"
      />

      {/* HERO */}
      <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: 'var(--navy-dark)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(201,168,76,0.3) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="relative z-10 max-w-4xl text-center" style={{ maxWidth: 896, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest rounded-full mb-6"
            style={{ color: 'var(--gold)' }}
          >
            <span className="w-6 h-px" style={{ background: 'var(--gold)' }} />
            Legal
            <span className="w-6 h-px" style={{ background: 'var(--gold)' }} />
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4"
          >
            Política de Privacidade
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Como protegemos seus dados pessoais em conformidade com a LGPD.
          </motion.p>
        </div>
      </section>

      {/* LGPD BADGE */}
      <section className="py-8" style={{ background: 'var(--cream)' }}>
        <div className="max-w-4xl" style={{ maxWidth: 896, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <div className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(201,168,76,0.15)' }}>
              <Shield size={22} style={{ color: 'var(--gold)' }} />
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: 'var(--navy)' }}>Conformidade com a LGPD</p>
              <p className="text-sm" style={{ color: 'var(--gray-500)' }}>
                Esta política está em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24 md:py-28" style={{ background: 'var(--white)' }}>
        <div className="max-w-4xl" style={{ maxWidth: 896, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'var(--gray-400)' }}>
            <FileText size={16} style={{ color: 'var(--gold)' }} />
            Última atualização: Janeiro de 2025
          </div>

          <div className="space-y-10">
            <div>
              <SectionTitle num="01" title="Introdução" icon={Lock} />
              <p className="leading-relaxed pl-14" style={{ color: 'var(--gray-600)' }}>
                A Will & Pereira Advocacia está comprometida com a proteção da privacidade e dos dados pessoais dos usuários do nosso site. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </div>

            <div>
              <SectionTitle num="02" title="Dados Coletados" icon={Database} />
              <p className="leading-relaxed pl-14 mb-4" style={{ color: 'var(--gray-600)' }}>
                Podemos coletar os seguintes dados pessoais:
              </p>
              <div className="pl-14 space-y-3">
                {[
                  { label: 'Nome e sobrenome', desc: 'quando preenche o formulário de contato' },
                  { label: 'Email', desc: 'para retorno do contato' },
                  { label: 'Telefone', desc: 'para contato via WhatsApp ou ligação' },
                  { label: 'Mensagem', desc: 'informações sobre seu caso ou necessidade jurídica' },
                  { label: 'Dados de navegação', desc: 'IP, navegador, dispositivo (via analytics)' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: 'var(--gold)' }} />
                    <span style={{ color: 'var(--gray-600)' }}>
                      <strong style={{ color: 'var(--navy)' }}>{item.label}</strong> — {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionTitle num="03" title="Finalidade do Tratamento" icon={Eye} />
              <p className="leading-relaxed pl-14 mb-4" style={{ color: 'var(--gray-600)' }}>
                Seus dados são utilizados para:
              </p>
              <div className="pl-14 space-y-3">
                {[
                  'Responder a solicitações de contato e orientação jurídica',
                  'Enviar informações sobre serviços jurídicos solicitados',
                  'Cumprir obrigações legais e regulatórias',
                  'Melhorar a experiência de navegação no site',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: 'var(--gold)' }} />
                    <span style={{ color: 'var(--gray-600)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionTitle num="04" title="Base Legal para o Tratamento" icon={UserCheck} />
              <p className="leading-relaxed pl-14" style={{ color: 'var(--gray-600)' }}>
                O tratamento dos seus dados é realizado com base no consentimento (art. 7º, I, da LGPD) e na execução de contrato ou de procedimentos preliminares relacionados a contrato (art. 7º, V, da LGPD).
              </p>
            </div>

            <div>
              <SectionTitle num="05" title="Compartilhamento de Dados" icon={AlertCircle} />
              <p className="leading-relaxed pl-14" style={{ color: 'var(--gray-600)' }}>
                Seus dados pessoais não são compartilhados com terceiros, exceto: (a) quando necessário para cumprimento de obrigação legal; (b) com prestadores de serviços que nos auxiliam na operação do site (como hospedagem e formulários de contato), sob contrato de confidencialidade; (c) mediante sua autorização expressa.
              </p>
            </div>

            <div>
              <SectionTitle num="06" title="Sigilo Profissional" icon={Lock} />
              <p className="leading-relaxed pl-14" style={{ color: 'var(--gray-600)' }}>
                As informações enviadas ao escritório são tratadas com sigilo profissional, conforme o art. 7º, XI, da Lei 8.906/94 (Estatuto da OAB). O sigilo advocatício é inviolável, salvo em decorrência de ordem judicial ou quando houver dever legal de comunicação.
              </p>
            </div>

            <div>
              <SectionTitle num="07" title="Segurança dos Dados" icon={Shield} />
              <p className="leading-relaxed pl-14" style={{ color: 'var(--gray-600)' }}>
                Adotamos medidas técnicas e administrativas de segurança para proteger seus dados contra acessos não autorizados, situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou qualquer forma de tratamento inadequado ou ilícito.
              </p>
            </div>

            <div>
              <SectionTitle num="08" title="Retenção de Dados" icon={Database} />
              <p className="leading-relaxed pl-14" style={{ color: 'var(--gray-600)' }}>
                Seus dados pessoais serão mantidos pelo tempo necessário para cumprir as finalidades para as quais foram coletados, observados os prazos legais aplicáveis e o prazo de prescrição das ações judiciais.
              </p>
            </div>

            <div>
              <SectionTitle num="09" title="Seus Direitos" icon={UserCheck} />
              <p className="leading-relaxed pl-14 mb-4" style={{ color: 'var(--gray-600)' }}>
                De acordo com a LGPD, você tem direito a:
              </p>
              <div className="pl-14 grid sm:grid-cols-2 gap-3">
                {[
                  'Confirmação da existência de tratamento',
                  'Acesso aos seus dados pessoais',
                  'Correção de dados incompletos',
                  'Anonimização ou eliminação',
                  'Portabilidade dos dados',
                  'Informação sobre compartilhamento',
                  'Revogação do consentimento',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: 'var(--gold)' }} />
                    <span className="text-sm" style={{ color: 'var(--gray-600)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionTitle num="10" title="Cookies" icon={Eye} />
              <p className="leading-relaxed pl-14" style={{ color: 'var(--gray-600)' }}>
                O site pode utilizar cookies para melhorar a experiência de navegação. Cookies são pequenos arquivos armazenados no seu dispositivo que permitem reconhecer visitas recorrentes e melhorar o funcionamento do site. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar a funcionalidade do site.
              </p>
            </div>

            <div>
              <SectionTitle num="11" title="Alterações nesta Política" icon={FileText} />
              <p className="leading-relaxed pl-14" style={{ color: 'var(--gray-600)' }}>
                Esta Política de Privacidade pode ser atualizada a qualquer momento. Recomendamos a verificação periódica desta página para se manter informado sobre como protegemos seus dados.
              </p>
            </div>

            <div>
              <SectionTitle num="12" title="Contato" icon={Lock} />
              <p className="leading-relaxed pl-14 mb-4" style={{ color: 'var(--gray-600)' }}>
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política:
              </p>
              <div className="pl-14 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: 'var(--gold)' }} />
                  <span style={{ color: 'var(--gray-600)' }}>Email: advocacia@willepereira.adv.br</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: 'var(--gold)' }} />
                  <span style={{ color: 'var(--gray-600)' }}>Telefone: (48) 98458-4181</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: 'var(--gold)' }} />
                  <span style={{ color: 'var(--gray-600)' }}>Endereço: Rua Najla Carone Guedert, 1080 - Palhoça/SC</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--gray-200)' }}>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: 'var(--gold)' }}>
              <ArrowLeft size={16} /> Voltar para o site
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
