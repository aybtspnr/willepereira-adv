import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileText } from 'lucide-react'
import SEO from '../components/SEO'

function SectionTitle({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-semibold" style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)' }}>
        {num}
      </span>
      <h2 className="font-serif text-xl md:text-2xl" style={{ color: 'var(--navy)' }}>{title}</h2>
    </div>
  )
}

export default function TermosPage() {
  return (
    <div>
      <SEO
        title="Termos de Uso | Will & Pereira Advocacia"
        description="Termos e condições de uso do site da Will & Pereira Advocacia."
        canonical="https://willepereira-adv.vercel.app/termos"
      />

      {/* HERO */}
      <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: 'var(--navy-dark)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(201,168,76,0.3) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="relative z-10 container max-w-4xl text-center">
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
            Termos de Uso
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Condições gerais de uso do site da Will & Pereira Advocacia.
          </motion.p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24 md:py-28" style={{ background: 'var(--white)' }}>
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'var(--gray-400)' }}>
            <FileText size={16} style={{ color: 'var(--gold)' }} />
            Última atualização: Janeiro de 2025
          </div>

          <div className="space-y-10">
            <div>
              <SectionTitle num="01" title="Aceitação dos Termos" />
              <p className="leading-relaxed pl-14" style={{ color: 'var(--gray-600)' }}>
                Ao acessar e utilizar o site da Will & Pereira Advocacia (willepereira-adv.vercel.app), você concorda com estes Termos de Uso. Caso não concorde com algum dos termos, recomendamos que não utilize o site.
              </p>
            </div>

            <div>
              <SectionTitle num="02" title="Sobre o Site" />
              <p className="leading-relaxed pl-14" style={{ color: 'var(--gray-600)' }}>
                O site da Will & Pereira Advocacia tem caráter exclusivamente informativo e educacional. O conteúdo disponibilizado não constitui assessoria jurídica, consultoria ou representação legal de qualquer espécie.
              </p>
            </div>

            <div>
              <SectionTitle num="03" title="Informações Jurídicas" />
              <p className="leading-relaxed pl-14" style={{ color: 'var(--gray-600)' }}>
                As informações publicadas neste site são baseadas na legislação brasileira vigente na data de publicação. As leis podem mudar, e as informações podem não refletir as alterações mais recentes. Recomendamos sempre a consulta a um advogado para orientação específica sobre seu caso.
              </p>
            </div>

            <div>
              <SectionTitle num="04" title="Relação Advocatícia" />
              <p className="leading-relaxed pl-14" style={{ color: 'var(--gray-600)' }}>
                O uso do site não estabelece relação advocatícia entre o usuário e o escritório Will & Pereira Advocacia. Para que se estabeleça uma relação profissional, é necessário o cumprimento de todos os requisitos previstos no Estatuto da OAB e no Código de Ética e Disciplina.
              </p>
            </div>

            <div>
              <SectionTitle num="05" title="Formulário de Contato" />
              <p className="leading-relaxed pl-14" style={{ color: 'var(--gray-600)' }}>
                As informações enviadas através do formulário de contato são tratadas com sigilo profissional, conforme o sigilo advocatício previsto no art. 7º, XI, da Lei 8.906/94 (Estatuto da OAB). No entanto, o envio de informações pelo site não garante sigilo absoluto.
              </p>
            </div>

            <div>
              <SectionTitle num="06" title="Propriedade Intelectual" />
              <p className="leading-relaxed pl-14" style={{ color: 'var(--gray-600)' }}>
                Todo o conteúdo do site, incluindo textos, imagens, logotipos, ícones e design, é protegido por direitos autorais e pertence ao escritório Will & Pereira Advocacia. É proibida a reprodução, distribuição ou modificação sem autorização prévia.
              </p>
            </div>

            <div>
              <SectionTitle num="07" title="Links Externos" />
              <p className="leading-relaxed pl-14" style={{ color: 'var(--gray-600)' }}>
                O site pode conter links para sites de terceiros. O escritório não se responsabiliza pelo conteúdo, políticas de privacidade ou práticas de sites externos.
              </p>
            </div>

            <div>
              <SectionTitle num="08" title="Isenção de Responsabilidade" />
              <p className="leading-relaxed pl-14" style={{ color: 'var(--gray-600)' }}>
                O escritório Will & Pereira Advocacia não se responsabiliza por eventuais danos diretos ou indiretos decorrentes do uso das informações disponibilizadas no site. O usuário é responsável pelo uso das informações obtidas.
              </p>
            </div>

            <div>
              <SectionTitle num="09" title="Alterações nos Termos" />
              <p className="leading-relaxed pl-14" style={{ color: 'var(--gray-600)' }}>
                O escritório reserva-se o direito de alterar estes Termos de Uso a qualquer momento, sem aviso prévio. As alterações entram em vigor imediatamente após a publicação no site.
              </p>
            </div>

            <div>
              <SectionTitle num="10" title="Contato" />
              <p className="leading-relaxed pl-14 mb-4" style={{ color: 'var(--gray-600)' }}>
                Em caso de dúvidas sobre estes Termos de Uso, entre em contato conosco:
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
