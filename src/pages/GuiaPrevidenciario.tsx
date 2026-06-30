import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Calendar, Clock, FileText, Heart, Shield, BookOpen, Briefcase, Scale, ChevronRight } from 'lucide-react'
import SEO from '../components/SEO'

export default function GuiaPrevidenciario() {
  return (
    <div>
      <SEO
        title="Guia Completo de Direito Previdenciário | Will & Pereira Advocacia"
        description="Guia completo e atualizado sobre Direito Previdenciário: aposentadorias, pensões, auxílio-doença, BPC-LOAS, planejamento previdenciário e muito mais."
        canonical="https://willepereira-adv.vercel.app/previdenciario/guia"
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
            Direito Previdenciário
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-3xl mx-auto text-lg"
          >
            Tudo o que você precisa saber sobre aposentadorias, pensões, benefícios do INSS e planejamento previdenciário. Guia atualizado com as regras da Reforma da Previdência.
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
                { href: '#introducao', label: 'O que é o Direito Previdenciário?' },
                { href: '#aposentadoria-idade', label: 'Aposentadoria por Idade' },
                { href: '#aposentadoria-tempo', label: 'Aposentadoria por Tempo de Contribuição' },
                { href: '#aposentadoria-especial', label: 'Aposentadoria Especial' },
                { href: '#auxilio-doenca', label: 'Auxílio-Doença e Aposentadoria por Invalidez' },
                { href: '#pensao-morte', label: 'Pensão por Morte' },
                { href: '#bpc-loas', label: 'BPC/LOAS' },
                { href: '#revisoes', label: 'Revisões de Benefícios' },
                { href: '#planejamento', label: 'Planejamento Previdenciário' },
                { href: '#documentos', label: 'Documentos Necessários' },
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

            <h2 id="introducao" className="font-serif text-3xl text-navy mt-0">O que é o Direito Previdenciário?</h2>
            <p className="text-gray-600 leading-relaxed">
              O Direito Previdenciário é o ramo do Direito que regula a seguridade social, ou seja, o conjunto de direitos que garantem proteção aos trabalhadores e seus dependentes em situações de incapacidade, desemprego, idade avançada, maternidade e morte. É regido principalmente pela Lei 8.213/91 (Plano de Benefícios da Previdência Social) e pela Constituição Federal.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Com a Reforma da Previdência (Emenda Constitucional 103/2019), muitas regras foram alteradas. Por isso, contar com um advogado especializado é essencial para garantir o melhor benefício possível.
            </p>

            <h3 className="font-serif text-xl text-navy mt-10 mb-4">Principais Benefícios do INSS</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              {[
                { icon: Calendar, label: 'Aposentadorias', desc: 'Por idade, tempo de contribuição, especial, da pessoa com deficiência' },
                { icon: Heart, label: 'Auxílio-Doença', desc: 'Benefício por incapacidade temporária' },
                { icon: Shield, label: 'Pensão por Morte', desc: 'Proteção para dependentes' },
                { icon: FileText, label: 'BPC/LOAS', desc: 'Benefício assistencial para idosos e PCDs' },
                { icon: Clock, label: 'Salário-Maternidade', desc: 'Benefício para gestantes e adotantes' },
                { icon: BookOpen, label: 'Revisões', desc: 'Revisão de benefícios para aumentar o valor' },
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

            <h2 id="aposentadoria-idade" className="font-serif text-3xl text-navy mt-16">Aposentadoria por Idade</h2>
            <p className="text-gray-600 leading-relaxed">
              A aposentadoria por idade é um dos benefícios mais comuns do INSS. Após a Reforma da Previdência (EC 103/2019), os requisitos são:
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Requisitos Atuais</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">👨 Homens</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      65 anos de idade
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      20 anos de contribuição (pós-reforma)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      180 meses de carência
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">👩 Mulheres</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      62 anos de idade
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      15 anos de contribuição (pós-reforma)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      180 meses de carência
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Importante:</strong> Para quem já era segurado antes da Reforma, existem regras de transição que podem ser mais vantajosas. O cálculo do valor do benefício também mudou: agora é calculado com base em 100% das contribuições desde julho de 1994, com alíquota de 60% + 2% para cada ano que exceder o tempo mínimo de contribuição.
            </p>

            <h2 id="aposentadoria-tempo" className="font-serif text-3xl text-navy mt-16">Aposentadoria por Tempo de Contribuição</h2>
            <p className="text-gray-600 leading-relaxed">
              A aposentadoria por tempo de contribuição foi extinta para novos segurados com a Reforma de 2019. No entanto, quem já era segurado antes da Reforma pode ter direito por meio das regras de transição.
            </p>
            <h3 className="font-serif text-xl text-navy mt-8 mb-4">Regras de Transição</h3>
            <div className="space-y-4 not-prose">
              {[
                { title: 'Sistema de Pontos', desc: 'Soma da idade + tempo de contribuição. Em 2024: 101 pontos (homens) e 91 pontos (mulheres), com aumento de 1 ponto por ano.' },
                { title: 'Pedágio 50%', desc: 'Para quem faltava até 2 anos para se aposentar em 13/11/2019. É preciso cumprir 50% de pedágio sobre o tempo que faltava.' },
                { title: 'Pedágio 100%', desc: 'Idade mínima de 60 anos (homens) e 57 anos (mulheres) + pedágio de 100% sobre o tempo que faltava em 13/11/2019.' },
                { title: 'Idade Mínima Progressiva', desc: 'Idade mínima de 63 anos (homens) e 58 anos (mulheres) em 2024, com aumento de 6 meses por ano até o limite.' },
              ].map((regra, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-cream border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-gold-10 flex items-center justify-center shrink-0 text-gold font-semibold text-sm">{i + 1}</div>
                  <div>
                    <h4 className="font-semibold text-navy text-sm">{regra.title}</h4>
                    <p className="text-gray-500 text-xs mt-1">{regra.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 id="aposentadoria-especial" className="font-serif text-3xl text-navy mt-16">Aposentadoria Especial</h2>
            <p className="text-gray-600 leading-relaxed">
              A aposentadoria especial é destinada a trabalhadores expostos a agentes nocivos à saúde (ruído, calor, agentes químicos, biológicos, etc.). Após a Reforma, além do tempo de atividade especial, é exigida idade mínima.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Requisitos (pós-reforma)</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  55 anos de idade + 15 anos de atividade especial (risco extremo)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  58 anos de idade + 20 anos de atividade especial (alto risco)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  60 anos de idade + 25 anos de atividade especial (risco moderado)
                </li>
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Documento essencial:</strong> PPP (Perfil Profissiográfico Previdenciário) e LTCAT (Laudo Técnico das Condições Ambientais do Trabalho) são obrigatórios para comprovar a atividade especial.
            </p>

            <h2 id="auxilio-doenca" className="font-serif text-3xl text-navy mt-16">Auxílio-Doença e Aposentadoria por Invalidez</h2>
            <p className="text-gray-600 leading-relaxed">
              O auxílio-doença (agora chamado de benefício por incapacidade temporária) é pago ao segurado que fica temporariamente incapaz para o trabalho. Já a aposentadoria por invalidez (benefício por incapacidade permanente) é para casos de incapacidade total e permanente.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Documentos necessários:</strong> Atestados médicos, exames, receitas, laudos, relatórios médicos detalhados. O INSS realiza perícia médica para avaliar a incapacidade.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Dica importante:</strong> Se o INSS negar seu auxílio-doença, não desista. Muitas negativas são revertidas na via judicial. A Will & Pereira Advocacia tem ampla experiência em reverter negativas de benefícios por incapacidade.
            </p>

            <h2 id="pensao-morte" className="font-serif text-3xl text-navy mt-16">Pensão por Morte</h2>
            <p className="text-gray-600 leading-relaxed">
              A pensão por morte é paga aos dependentes do segurado falecido. Após a Reforma da Previdência, o valor do benefício mudou:
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Cota de 50% do valor da aposentadoria + 10% por dependente
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Se houver 1 dependente: 60%; 2 dependentes: 70%; e assim por diante
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Valor mínimo: 1 salário mínimo
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Duração varia conforme idade e tipo de dependente
                </li>
              </ul>
            </div>

            <h2 id="bpc-loas" className="font-serif text-3xl text-navy mt-16">BPC/LOAS</h2>
            <p className="text-gray-600 leading-relaxed">
              O Benefício de Prestação Continuada (BPC/LOAS) é um benefício assistencial pago a idosos (65+) e pessoas com deficiência que comprovem não ter meios de prover a própria manutenção. Diferente dos benefícios previdenciários, o BPC não exige contribuição ao INSS.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Requisitos</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Renda familiar per capita inferior a 1/4 do salário mínimo
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  65 anos ou mais (idoso) ou deficiência comprovada (PCD)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Não receber outro benefício do INSS (exceto assistência médica)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Estar inscrito no CadÚnico
                </li>
              </ul>
            </div>

            <h2 id="revisoes" className="font-serif text-3xl text-navy mt-16">Revisões de Benefícios</h2>
            <p className="text-gray-600 leading-relaxed">
              Muitos beneficiários do INSS recebem valores menores do que têm direito. As revisões de benefícios são ações judiciais que buscam corrigir erros no cálculo da aposentadoria ou pensão. As principais revisões incluem:
            </p>
            <div className="grid md:grid-cols-2 gap-4 not-prose my-6">
              {[
                'Revisão do Buraco Negro (ações anteriores a 1999)',
                'Revisão do Fator Previdenciário',
                'Revisão da Vida Toda (melhor benefício)',
                'Revisão de Atividade Especial',
                'Revisão de Atividade Rural',
                'Revisão de Tempo de Serviço Militar',
                'Revisão de Salário-Maternidade como contribuição',
                'Revisão de Auxílio-Doença como tempo de contribuição',
              ].map((rev, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-cream">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-sm text-navy">{rev}</span>
                </div>
              ))}
            </div>

            <div className="bg-gold-5 border border-gold-20 rounded-2xl p-8 my-10 not-prose">
              <h4 className="font-serif text-xl text-navy mb-4">💰 Já pensou que você pode estar recebendo menos do que tem direito?</h4>
              <p className="text-gray-600 text-sm mb-6">Milhares de aposentados e pensionistas têm direito à revisão do seu benefício, mas não sabem. Uma revisão bem-feita pode aumentar significativamente o valor da sua aposentadoria.</p>
              <Link to="/contato" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all">
                Quero saber se tenho direito <ArrowRight size={16} />
              </Link>
            </div>

            <h2 id="planejamento" className="font-serif text-3xl text-navy mt-16">Planejamento Previdenciário</h2>
            <p className="text-gray-600 leading-relaxed">
              O planejamento previdenciário é o estudo personalizado da vida contributiva do trabalhador para identificar a melhor data e a melhor forma de se aposentar. Com as constantes mudanças na legislação, o planejamento se tornou essencial.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Benefícios do planejamento previdenciário:</strong>
            </p>
            <ul className="space-y-2 not-prose my-4">
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                Identificar a modalidade de aposentadoria mais vantajosa
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                Calcular o momento ideal para se aposentar
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                Verificar contribuições em atraso que podem ser regularizadas
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                Identificar períodos especiais que podem reduzir o tempo de contribuição
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                Simular diferentes cenários de aposentadoria
              </li>
            </ul>

            <h2 id="documentos" className="font-serif text-3xl text-navy mt-16">Documentos Necessários</h2>
            <p className="text-gray-600 leading-relaxed">
              Para solicitar qualquer benefício no INSS, tenha em mãos:
            </p>
            <div className="grid md:grid-cols-2 gap-3 not-prose my-6">
              {[
                'Documento de identidade (RG)',
                'CPF',
                'Carteira de Trabalho (CTPS)',
                'Extrato CNIS',
                'Comprovante de residência',
                'Certidão de nascimento/casamento',
                'PPP (para atividade especial)',
                'Laudos e exames médicos',
                'Carnês de contribuição',
                'Certidão de tempo de contribuição',
                'CTPS rural (para trabalhador rural)',
                'Certidão de óbito (pensão por morte)',
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
                { p: 'Qual o valor mínimo da aposentadoria?', r: 'O valor mínimo é o salário mínimo vigente. O valor máximo é o teto do INSS, que em 2025 é de R$ 8.157,41.' },
                { p: 'Posso me aposentar e continuar trabalhando?', r: 'Sim, é possível continuar trabalhando após se aposentar, exceto em algumas modalidades como a aposentadoria especial e a aposentadoria por invalidez.' },
                { p: 'O que fazer se o INSS negar meu benefício?', r: 'Primeiro, entre com recurso administrativo no próprio INSS. Se negado novamente, busque a via judicial com um advogado especializado.' },
                { p: 'Quanto tempo leva para o INSS pagar o benefício?', r: 'O INSS tem até 45 dias para analisar o pedido. Se ultrapassar, é possível solicitar judicialmente o pagamento dos atrasados.' },
                { p: 'Aposentadoria por invalidez tem carência?', r: 'Sim, 12 contribuições mensais, exceto em casos de acidente de qualquer natureza ou doença grave especificada em lei.' },
                { p: 'Trabalhador rural tem direito à aposentadoria?', r: 'Sim, com requisitos reduzidos: 55 anos (mulher) e 60 anos (homem), com 180 meses de atividade rural comprovada.' },
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
              { to: '/trabalhista', icon: Briefcase, title: 'Direito Trabalhista', desc: 'Proteção dos direitos do trabalhador' },
              { to: '/civel', icon: Scale, title: 'Direito Cível', desc: 'Contratos, indenizações e obrigações' },
              { to: '/consumidor', icon: Shield, title: 'Direito do Consumidor', desc: 'Proteção nas relações de consumo' },
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
            Precisa de Ajuda com seu Benefício?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Nossa equipe de Direito Previdenciário está pronta para analisar seu caso e garantir o melhor benefício para você.
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
