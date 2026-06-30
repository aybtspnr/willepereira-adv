import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Calendar, Clock, FileText, Heart, Briefcase, Scale, ChevronRight, AlertTriangle, Users, Building2 } from 'lucide-react'
import SEO from '../components/SEO'

export default function GuiaTrabalhista() {
  return (
    <div>
      <SEO
        title="Guia Completo de Direito Trabalhista | Will & Pereira Advocacia"
        description="Guia completo e atualizado sobre Direito Trabalhista: direitos básicos, verbas rescisórias, horas extras, FGTS, assédio moral, estabilidade e muito mais."
        canonical="https://willepereira-adv.vercel.app/trabalhista/guia"
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
            Direito Trabalhista
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-3xl mx-auto text-lg"
          >
            Tudo o que você precisa saber sobre direitos trabalhistas, verbas rescisórias, horas extras, FGTS e proteção ao trabalhador. Guia completo e atualizado com a legislação vigente.
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
                { href: '#introducao', label: 'O que é o Direito Trabalhista?' },
                { href: '#direitos-basicos', label: 'Direitos Básicos do Trabalhador' },
                { href: '#verbas-rescisorias', label: 'Verbas Rescisórias' },
                { href: '#horas-extras', label: 'Horas Extras e Jornada de Trabalho' },
                { href: '#fgts', label: 'FGTS — Fundo de Garantia' },
                { href: '#assedio-moral', label: 'Assédio Moral e Assédio Sexual' },
                { href: '#estabilidade', label: 'Estabilidade no Emprego' },
                { href: '#trabalho-escravo', label: 'Trabalho Escravo e Condições Degradantes' },
                { href: '#justa-causa', label: 'Justa Causa e Rescisão Indireta' },
                { href: '#seguranca-trabalho', label: 'Segurança e Saúde no Trabalho' },
                { href: '#documentos', label: 'Documentos Trabalhistas' },
                { href: '#faq', label: 'Perguntas Frequentes' },
                { href: '#contato', label: 'Fale com um Especialista' },
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

            <h2 id="introducao" className="font-serif text-3xl text-navy mt-0">O que é o Direito Trabalhista?</h2>
            <p className="text-gray-600 leading-relaxed">
              O Direito Trabalhista é o ramo do Direito que regula as relações entre empregados e empregadores, estabelecendo direitos e deveres para ambas as partes. É regido principalmente pela Consolidação das Leis do Trabalho (CLT — Decreto-Lei 5.452/43), pela Constituição Federal de 1988 e por diversas leis esparsas que protegem o trabalhador.
            </p>
            <p className="text-gray-600 leading-relaxed">
              A CLT completa mais de 80 anos e passou por diversas reformas, sendo a mais significativa a Reforma Trabalhista (Lei 13.467/2017), que alterou profundamente as relações de trabalho no Brasil. Contar com um advogado especializado é essencial para garantir o cumprimento dos seus direitos.
            </p>

            <h3 className="font-serif text-xl text-navy mt-10 mb-4">Principais Direitos dos Trabalhadores</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              {[
                { icon: FileText, label: 'Carteira Assinada', desc: 'Registro em CTPS desde o primeiro dia de trabalho' },
                { icon: Calendar, label: 'Férias', desc: '30 dias de descanso remunerado a cada 12 meses + 1/3' },
                { icon: Clock, label: '13º Salário', desc: 'Gratificação natalina paga em duas parcelas' },
                { icon: Heart, label: 'FGTS', desc: 'Fundo de Garantia depositado mensalmente pelo empregador' },
                { icon: Briefcase, label: 'Horas Extras', desc: 'Hora extra com adicional mínimo de 50% (dias úteis)' },
                { icon: Building2, label: 'Aviso Prévio', desc: 'Aviso prévio proporcional ao tempo de serviço' },
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

            <h2 id="direitos-basicos" className="font-serif text-3xl text-navy mt-16">Direitos Básicos do Trabalhador</h2>
            <p className="text-gray-600 leading-relaxed">
              Todo trabalhador registrado em regime CLT possui um conjunto de direitos fundamentais garantidos pela Constituição Federal e pela CLT. Conhecer esses direitos é o primeiro passo para garantir uma relação de trabalho justa e digna.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Direitos Fundamentais</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">📋 Garantias Contratuais</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Registro em CTPS desde o primeiro dia
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Salário mínimo ou piso da categoria
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Jornada de 8h diárias / 44h semanais
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Intervalo intrajornada (almoço/descanso)
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">💰 Remuneração e Benefícios</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Salário pago até o 5º dia útil do mês
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Adicional noturno (20% sobre a hora diurna)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Adicional de periculosidade (30%) ou insalubridade (10 a 40%)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Vale-transporte e vale-alimentação (quando previsto)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 id="verbas-rescisorias" className="font-serif text-3xl text-navy mt-16">Verbas Rescisórias</h2>
            <p className="text-gray-600 leading-relaxed">
              Quando o contrato de trabalho é encerrado, o empregado tem direito a receber as verbas rescisórias, que variam conforme o tipo de dispensa (sem justa causa, com justa causa, pedido de demissão, acordo ou rescisão indireta).
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Verbas em cada tipo de rescisão</h4>
              <div className="space-y-4">
                {[
                  { title: 'Dispensa sem Justa Causa', items: ['Saldo de salário', 'Aviso prévio (indenizado ou trabalhado)', 'Férias vencidas e proporcionais + 1/3', '13º salário proporcional', 'Multa de 40% sobre o FGTS', 'Saque do FGTS', 'Seguro-desemprego'] },
                  { title: 'Pedido de Demissão', items: ['Saldo de salário', 'Férias vencidas e proporcionais + 1/3', '13º salário proporcional', 'Aviso prévio (trabalhado ou indenizado pelo empregado)', 'Não tem direito à multa de 40% do FGTS', 'Não pode sacar o FGTS'] },
                  { title: 'Rescisão por Acordo (CLT 484-A)', items: ['Saldo de salário', 'Férias vencidas e proporcionais + 1/3', '13º salário proporcional', 'Aviso prévio (50% indenizado)', 'Multa de 20% sobre o FGTS', 'Saque de 80% do FGTS', 'Não tem direito ao seguro-desemprego'] },
                ].map((tipo, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-gray-100">
                    <h5 className="font-semibold text-navy text-sm mb-2">{tipo.title}</h5>
                    <ul className="space-y-1">
                      {tipo.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Importante:</strong> A Reforma Trabalhista (Lei 13.467/2017) criou a possibilidade de rescisão por acordo entre empregado e empregador, com regras específicas diferentes da dispensa sem justa causa tradicional.
            </p>

            <h2 id="horas-extras" className="font-serif text-3xl text-navy mt-16">Horas Extras e Jornada de Trabalho</h2>
            <p className="text-gray-600 leading-relaxed">
              A jornada de trabalho padrão no Brasil é de 8 horas diárias e 44 horas semanais. Qualquer trabalho além desse limite deve ser pago como hora extra, salvo exceções previstas em acordo coletivo ou convenção coletiva de trabalho.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Regras para Horas Extras</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Adicional mínimo de 50% sobre a hora normal (dias úteis)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Adicional de 100% sobre a hora normal (domingos e feriados)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  No máximo 2 horas extras por dia
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Banco de horas pode substituir o pagamento (acordo individual ou coletivo)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Compensação de jornada pode ser feita por acordo individual (desde a Reforma de 2017)
                </li>
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Dica importante:</strong> Guarde todos os comprovantes de horário — cartões de ponto, e-mails, mensagens ou qualquer registro que comprove a jornada trabalhada além do horário contratual. Em caso de processo, o empregador tem o ônus de provar a jornada do empregado.
            </p>

            <h2 id="fgts" className="font-serif text-3xl text-navy mt-16">FGTS — Fundo de Garantia do Tempo de Serviço</h2>
            <p className="text-gray-600 leading-relaxed">
              O FGTS é um direito do trabalhador criado para protegê-lo em caso de demissão sem justa causa. O empregador deposita mensalmente 8% do salário do empregado em uma conta vinculada na Caixa Econômica Federal.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Situações em que o FGTS pode ser sacado</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Dispensa sem justa causa (saque total + multa de 40% paga pelo empregador)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Aposentadoria
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Compra da casa própria (programa Minha Casa Minha Vida ou SFH)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Doenças graves (câncer, HIV, estágio terminal)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Saque-aniversário (modalidade opcional com regras específicas)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Calamidade pública (mediante decreto do governo federal)
                </li>
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Atenção:</strong> Muitos trabalhadores não sabem, mas o FGTS também rende juros e pode ser objeto de revisão judicial em casos de expurgos inflacionários (planos econômicos). Se você teve saldo no FGTS entre 1990 e 1993, pode ter direito a uma correção maior.
            </p>

            <div className="bg-gold-5 border border-gold-20 rounded-2xl p-8 my-10 not-prose">
              <h4 className="font-serif text-xl text-navy mb-4">🔍 Seus direitos trabalhistas estão sendo respeitados?</h4>
              <p className="text-gray-600 text-sm mb-6">Muitos trabalhadores têm direitos violados diariamente sem saber. Horas extras não pagas, assédio moral, falta de registro em CTPS, condições degradantes de trabalho. A Will & Pereira Advocacia pode ajudar você a garantir seus direitos.</p>
              <Link to="/contato" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all">
                Quero saber se tenho direito <ArrowRight size={16} />
              </Link>
            </div>

            <h2 id="assedio-moral" className="font-serif text-3xl text-navy mt-16">Assédio Moral e Assédio Sexual no Trabalho</h2>
            <p className="text-gray-600 leading-relaxed">
              O assédio moral no trabalho é a exposição do trabalhador a situações humilhantes, constrangedoras e repetitivas durante a jornada de trabalho. Já o assédio sexual consiste em condutas de conotação sexual indesejadas que constrangem a vítima e afetam sua condição de trabalho.
            </p>
            <div className="grid md:grid-cols-2 gap-4 not-prose my-6">
              {[
                { title: 'Assédio Moral', items: ['Críticas constantes e humilhações públicas', 'Sobrecarga de trabalho intencional', 'Isolamento do trabalhador', 'Atribuição de tarefas impossíveis', 'Prazos irrealistas e pressão psicológica', 'Ridicularização em público'] },
                { title: 'Assédio Sexual', items: ['Propostas indecentes com ameaças veladas', 'Toques e aproximações não consentidos', 'Piadas e comentários de cunho sexual', 'Chantagem envolvendo promoção/emprego', 'Exposição a conteúdo pornográfico', 'Retaliação após recusa'] },
              ].map((tipo, i) => (
                <div key={i} className="p-5 rounded-xl bg-cream border border-gray-100">
                  <h4 className="font-semibold text-navy text-sm mb-3">{tipo.title}</h4>
                  <ul className="space-y-1">
                    {tipo.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>O que fazer:</strong> Documente todas as ocorrências (datas, horários, testemunhas, gravações, e-mails), comunite ao setor de RH (se houver) e procure um advogado trabalhista. O assédio moral e sexual podem gerar indenização por danos morais e rescisão indireta do contrato de trabalho.
            </p>

            <h2 id="estabilidade" className="font-serif text-3xl text-navy mt-16">Estabilidade no Emprego</h2>
            <p className="text-gray-600 leading-relaxed">
              A estabilidade no emprego é a garantia que o trabalhador tem de não ser demitido sem justa causa durante determinado período. Existem diversos tipos de estabilidade previstos em lei:
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <span><strong>Gestante:</strong> Estabilidade desde a confirmação da gravidez até 5 meses após o parto (STF ampliou para estabilidade mesmo em contratos temporários)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <span><strong>Acidentado:</strong> Garantia de emprego por 12 meses após o retorno ao trabalho (acidente de trabalho ou doença ocupacional)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <span><strong>Dirigente Sindical:</strong> Estabilidade desde o registro da candidatura até 1 ano após o fim do mandato</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <span><strong>Membro da CIPA:</strong> Estabilidade desde o registro da candidatura até 1 ano após o fim do mandato</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <span><strong>Pré-aposentadoria:</strong> Garantia prevista em convenções coletivas (geralmente 12 a 24 meses antes da aposentadoria)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <span><strong>Empregado eleito para comissão de conciliação:</strong> Estabilidade prevista em algumas convenções coletivas</span>
                </li>
              </ul>
            </div>

            <h2 id="trabalho-escravo" className="font-serif text-3xl text-navy mt-16">Trabalho Escravo e Condições Degradantes</h2>
            <p className="text-gray-600 leading-relaxed">
              O trabalho escravo contemporâneo é uma realidade no Brasil, apesar de ser crime previsto no art. 149 do Código Penal. Caracteriza-se pela submissão do trabalhador a condições degradantes de trabalho, jornada exaustiva, servidão por dívida e cerceamento da liberdade de locomoção.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Sinais de Alerta 🚨</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Trabalho sem registro em CTPS e sem contrato formal',
                  'Alojamentos precários, sem água potável ou saneamento básico',
                  'Alimentação insuficiente ou de má qualidade',
                  'Jornadas exaustivas sem descanso adequado',
                  'Retenção de documentos pessoais pelo empregador',
                  'Vigilância armada e restrição de locomoção',
                  'Dívidas crescentes com o empregador (servidão por dívida)',
                  'Ameaças e violência física ou psicológica',
                ].map((sinal, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-white border border-gray-100">
                    <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-navy">{sinal}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Denuncie:</strong> Se você ou alguém que conhece está em situação de trabalho escravo, denuncie ao Ministério Público do Trabalho (MPT), ao Ministério do Trabalho e Emprego (MTE) ou pela Central de Atendimento 158 (Disk Direitos Humanos).
            </p>

            <h2 id="justa-causa" className="font-serif text-3xl text-navy mt-16">Justa Causa e Rescisão Indireta</h2>
            <p className="text-gray-600 leading-relaxed">
              A justa causa é a rescisão do contrato de trabalho por falta grave cometida pelo empregado. Já a rescisão indireta é o oposto: ocorre quando o empregador comete falta grave que torna insustentável a continuidade da relação de trabalho, e o empregado pode pedir a rescisão como se tivesse sido demitido sem justa causa.
            </p>
            <div className="grid md:grid-cols-2 gap-4 not-prose my-6">
              {[
                { title: 'Justa Causa (Art. 482 CLT)', items: ['Ato de improbidade (furtos, fraudes)', 'Insubordinação ou indisciplina', 'Desídia no desempenho das funções', 'Embriaguez habitual ou em serviço', 'Violação de segredo da empresa', 'Abandono de emprego', 'Ofensas físicas ou morais no trabalho', 'Condenação criminal (se não houver suspensão)'] },
                { title: 'Rescisão Indireta (Art. 483 CLT)', items: ['Exigência de serviços além das forças', 'Tratamento rigoroso ou degradante', 'Redução ilegal do salário', 'Descumprimento de obrigações contratuais', 'Assédio moral ou sexual', 'Atraso no pagamento de salários', 'Risco grave de acidente de trabalho', 'Restrição da liberdade de locomoção'] },
              ].map((tipo, i) => (
                <div key={i} className="p-5 rounded-xl bg-cream border border-gray-100">
                  <h4 className="font-semibold text-navy text-sm mb-3">{tipo.title}</h4>
                  <ul className="space-y-1">
                    {tipo.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h2 id="seguranca-trabalho" className="font-serif text-3xl text-navy mt-16">Segurança e Saúde no Trabalho</h2>
            <p className="text-gray-600 leading-relaxed">
              Todo trabalhador tem direito a um ambiente de trabalho seguro e saudável. As Normas Regulamentadoras (NRs) do Ministério do Trabalho estabelecem os requisitos mínimos de segurança e saúde ocupacional que as empresas devem cumprir.
            </p>
            <div className="grid md:grid-cols-2 gap-4 not-prose my-6">
              {[
                { icon: AlertTriangle, label: 'EPIs e EPCs', desc: 'Equipamentos de proteção individual e coletiva fornecidos gratuitamente' },
                { icon: FileText, label: 'PCMSO', desc: 'Programa de Controle Médico de Saúde Ocupacional' },
                { icon: FileText, label: 'PPRA/PGR', desc: 'Programa de Prevenção de Riscos Ambientais / Gerenciamento' },
                { icon: Users, label: 'CIPA', desc: 'Comissão Interna de Prevenção de Acidentes (NR-5)' },
                { icon: Building2, label: 'SESMT', desc: 'Serviço Especializado em Engenharia de Segurança (NR-4)' },
                { icon: Heart, label: 'CAT', desc: 'Comunicação de Acidente de Trabalho (obrigatória até em acidente fatal)' },
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
            <p className="text-gray-600 leading-relaxed">
              <strong>Você sabia?</strong> Se você sofreu um acidente de trabalho ou adquiriu uma doença ocupacional, pode ter direito à estabilidade de 12 meses após o retorno ao trabalho, além de indenização por danos materiais e morais, e eventual pensão vitalícia se houver redução da capacidade laboral.
            </p>

            <h2 id="documentos" className="font-serif text-3xl text-navy mt-16">Documentos Trabalhistas</h2>
            <p className="text-gray-600 leading-relaxed">
              Para ingressar com uma ação trabalhista ou verificar seus direitos, separe os seguintes documentos:
            </p>
            <div className="grid md:grid-cols-2 gap-3 not-prose my-6">
              {[
                'Carteira de Trabalho (CTPS) — todas as páginas',
                'Contrato de trabalho e aditivos',
                'Cartões de ponto ou controle de jornada',
                'Holerites (contracheques) de todo o período',
                'Termo de Rescisão de Contrato (TRCT)',
                'Extrato do FGTS (pode ser obtido no site da Caixa)',
                'Comprovantes de pagamento de salário',
                'Convenção ou acordo coletivo da categoria',
                'Comunicado de Acidente de Trabalho (CAT)',
                'Atestados médicos e exames admissionais/demissionais',
                'E-mails, mensagens ou gravações que comprovem assédio',
                'Comprovante de residência e documentos pessoais (RG/CPF)',
              ].map((doc, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-cream">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-sm text-navy">{doc}</span>
                </div>
              ))}
            </div>

            <h2 id="faq" className="font-serif text-3xl text-navy mt-16">Perguntas Frequentes</h2>
            <div className="space-y-4 not-prose mt-6">
              {[
                { p: 'Quanto tempo tenho para processar a empresa depois de sair?', r: 'O prazo prescricional é de 5 anos para trabalhadores urbanos (contados da data da dispensa) e até 2 anos após o fim do contrato para ajuizar a ação. Já o trabalhador rural tem prazo de 5 anos após a dispensa.' },
                { p: 'O que fazer se a empresa não pagar as verbas rescisórias?', r: 'A empresa tem até 10 dias corridos após o fim do contrato para pagar as verbas rescisórias. Se não pagar, procure um advogado trabalhista imediatamente. Você pode ter direito a multa pelo atraso.' },
                { p: 'Trabalho de carteira assinada pode ser PJ?', r: 'Não. Se você tem horário, subordinação, habitualidade e pessoalidade (requisitos da relação de emprego), o vínculo deve ser CLT. O chamado "PJ fraudado" é uma prática ilegal que pode ser questionada na Justiça do Trabalho.' },
                { p: 'Estagiário tem direito a férias e 13º?', r: 'Sim, estagiários têm direito a férias remuneradas de 30 dias a cada 12 meses e recesso remunerado (proporcional ao 13º salário). Esses direitos são garantidos pela Lei do Estágio (Lei 11.788/2008).' },
                { p: 'A reforma trabalhista acabou com as horas in itinere?', r: 'Sim, a Reforma Trabalhista (2017) acabou com o direito às horas in itinere (tempo de deslocamento até o trabalho). No entanto, se houver previsão em acordo ou convenção coletiva, o direito pode ser mantido.' },
                { p: 'MEI pode ser contratado como funcionário CLT?', r: 'Sim, desde que preenchidos os requisitos da relação de emprego. A empresa pode contratar um MEI como CLT normalmente. No entanto, a contratação de um MEI para substituir um CLT (pejotização) é ilegal.' },
                { p: 'Quanto tempo a empresa tem para pagar o FGTS?', r: 'O FGTS deve ser depositado mensalmente até o dia 7 do mês seguinte ao trabalhado. Se a empresa não depositar, o trabalhador pode cobrar judicialmente e pedir a rescisão indireta do contrato.' },
                { p: 'O que é dano moral trabalhista?', r: 'É a indenização devida ao trabalhador que sofreu humilhação, constrangimento, assédio, discriminação ou qualquer violação à sua dignidade no ambiente de trabalho. O valor varia conforme a gravidade do dano e o porte da empresa.' },
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
              { to: '/civel', icon: Scale, title: 'Direito Cível', desc: 'Contratos, indenizações e obrigações' },
              { to: '/consumidor', icon: AlertTriangle, title: 'Direito do Consumidor', desc: 'Proteção nas relações de consumo' },
              { to: '/familia', icon: Heart, title: 'Direito de Família', desc: 'Divórcio, guarda e pensão alimentícia' },
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
            Precisa de Ajuda com seus Direitos Trabalhistas?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Nossa equipe de Direito Trabalhista está pronta para analisar seu caso e garantir o respeito aos seus direitos como trabalhador.
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
