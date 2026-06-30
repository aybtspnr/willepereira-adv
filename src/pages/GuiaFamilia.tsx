import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, FileText, Heart, ChevronRight, Users, Baby, Home, Scale, Shield, UserCheck } from 'lucide-react'
import SEO from '../components/SEO'

export default function GuiaFamilia() {
  return (
    <div>
      <SEO
        title="Guia Completo de Direito de Família | Will & Pereira Advocacia"
        description="Guia completo e atualizado sobre Direito de Família: divórcio, guarda de menores, pensão alimentícia, união estável, inventário, adoção e muito mais."
        canonical="https://willepereira-adv.vercel.app/familia/guia"
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
            Direito de Família
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-3xl mx-auto text-lg"
          >
            Tudo o que você precisa saber sobre divórcio, guarda de filhos, pensão alimentícia, união estável,
            inventário, adoção e demais questões de Direito de Família. Guia completo com orientações atualizadas.
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
                { href: '#introducao', label: 'O que é o Direito de Família?' },
                { href: '#divorcio', label: 'Divórcio' },
                { href: '#guarda', label: 'Guarda de Menores' },
                { href: '#pensão-alimenticia', label: 'Pensão Alimentícia' },
                { href: '#uniao-estavel', label: 'União Estável' },
                { href: '#casamento', label: 'Casamento' },
                { href: '#inventario', label: 'Inventário e Partilha' },
                { href: '#reconhecimento-paternidade', label: 'Reconhecimento de Paternidade' },
                { href: '#adocao', label: 'Adoção' },
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

            <h2 id="introducao" className="font-serif text-3xl text-navy mt-0">O que é o Direito de Família?</h2>
            <p className="text-gray-600 leading-relaxed">
              O Direito de Família é o ramo do Direito Civil que regula as relações familiares, incluindo o casamento,
              a união estável, o divórcio, a filiação, a guarda de filhos, a pensão alimentícia, o reconhecimento de
              paternidade, a adoção, o inventário e a partilha de bens. É regido principalmente pelo Código Civil
              (Lei 10.406/2002) e pela Constituição Federal.
            </p>
            <p className="text-gray-600 leading-relaxed">
              As questões de família envolvem emoções intensas e exigem sensibilidade, ética e expertise jurídica.
              Contar com um advogado especializado em Direito de Família é fundamental para proteger seus direitos
              e de seus familiares, buscando sempre a melhor solução para cada caso.
            </p>

            <h3 className="font-serif text-xl text-navy mt-10 mb-4">Principais Áreas do Direito de Família</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              {[
                { icon: Heart, label: 'Divórcio', desc: 'Dissolução do casamento consensual ou litigioso' },
                { icon: Users, label: 'Guarda de Menores', desc: 'Definição da guarda e convivência familiar' },
                { icon: FileText, label: 'Pensão Alimentícia', desc: 'Fixação, revisão e execução de alimentos' },
                { icon: Home, label: 'União Estável', desc: 'Reconhecimento e dissolução da união estável' },
                { icon: Scale, label: 'Inventário', desc: 'Partilha de bens e regularização patrimonial' },
                { icon: UserCheck, label: 'Reconhecimento de Paternidade', desc: 'Investigação e regularização de filiação' },
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

            <h2 id="divorcio" className="font-serif text-3xl text-navy mt-16">Divórcio</h2>
            <p className="text-gray-600 leading-relaxed">
              O divórcio é a dissolução legal do casamento civil. Desde a Emenda Constitucional 66/2010, não é mais
              exigida a separação judicial prévia nem o cumprimento de prazos mínimos para requerer o divórcio. O
              divórcio pode ser consensual (quando há acordo entre as partes) ou litigioso (quando não há acordo).
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Tipos de Divórcio</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">Divórcio Consensual</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Ambas as partes concordam com todos os termos
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Pode ser feito em cartório (se não houver filhos menores)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Mais rápido e econômico
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">Divórcio Litigioso</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Não há acordo entre as partes
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Necessária a intervenção do juiz
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Pode envolver disputa de guarda, pensão e partilha
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Importante:</strong> No divórcio consensual, as partes devem definir todos os termos: partilha
              de bens, guarda dos filhos, pensão alimentícia e uso do nome de casado. Um advogado é obrigatório em
              ambos os tipos de divórcio, podendo ser o mesmo para ambos os cônjuges no consensual.
            </p>

            <h2 id="guarda" className="font-serif text-3xl text-navy mt-16">Guarda de Menores</h2>
            <p className="text-gray-600 leading-relaxed">
              A guarda de menores é o direito e o dever dos pais de cuidar, proteger e educar os filhos. Com a
              separação ou divórcio, é necessário definir como será exercida a guarda. A Lei 13.058/2014 estabeleceu
              a guarda compartilhada como regra no Brasil.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Modalidades de Guarda</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Guarda Compartilhada:</strong> Responsabilidades e decisões divididas entre os pais, com tempo de convivência equilibrado
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Guarda Unilateral:</strong> Apenas um dos pais detém a guarda, cabendo ao outro o direito de visitas
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Guarda Alternada:</strong> Os filhos alternam períodos de residência com cada genitor (menos comum)
                </li>
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Dica importante:</strong> A guarda compartilhada é prioritária porque garante a participação
              ativa de ambos os pais na vida dos filhos. Mesmo na guarda compartilhada, pode ser fixada uma pensão
              alimentícia proporcional à renda de cada genitor. A Will & Pereira Advocacia atua para garantir o
              melhor interesse da criança em todos os processos.
            </p>

            <h2 id="pensão-alimenticia" className="font-serif text-3xl text-navy mt-16">Pensão Alimentícia</h2>
            <p className="text-gray-600 leading-relaxed">
              A pensão alimentícia é uma obrigação legal de prover o sustento de quem não pode mantê-lo por conta
              própria. Pode ser devida entre cônjuges, ex-cônjuges, pais e filhos, e entre parentes. O valor é
              fixado com base no binômio necessidade-possibilidade: a necessidade de quem recebe e a possibilidade
              de quem paga.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Aspectos Importantes</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Fixacão:</strong> Pode ser estabelecida por acordo entre as partes ou por decisão judicial
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Revisão:</strong> O valor pode ser revisto se houver mudança na situação financeira de qualquer das partes
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Execução:</strong> O não pagamento pode levar à prisão civil do devedor
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Exoneração:</strong> A obrigação cessa quando o beneficiário atinge a maioridade ou se torna autossuficiente
                </li>
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed">
              A pensão alimentícia inclui alimentação, moradia, saúde, educação, lazer e vestuário. O valor é
              geralmente fixado em percentual sobre os rendimentos líquidos do alimentante, variando entre 15% e
              30% conforme o caso.
            </p>

            <h2 id="uniao-estavel" className="font-serif text-3xl text-navy mt-16">União Estável</h2>
            <p className="text-gray-600 leading-relaxed">
              A união estável é a entidade familiar reconhecida pela Constituição Federal formada pela convivência
              pública, contínua e duradoura entre duas pessoas, com o objetivo de constituir família. É regida pelos
              artigos 1.723 a 1.727 do Código Civil.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Requisitos para Reconhecimento</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Convivência pública e notória',
                  'Relação contínua e duradoura',
                  'Objetivo de constituir família',
                  'Ausência de impedimentos para o casamento',
                  'Não ser casado ou estar separado de fato',
                  'Tratamento mútuo como companheiros',
                ].map((req, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-cream">
                    <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                    <span className="text-sm text-navy">{req}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Direitos dos companheiros:</strong> A união estável confere direitos semelhantes ao casamento,
              incluindo direito à herança, partilha de bens, pensão por morte do INSS, inclusão em plano de saúde
              e declaração conjunta de Imposto de Renda. Para formalizar, é possível fazer uma escritura pública
              declaratória de união estável em cartório.
            </p>

            <h2 id="casamento" className="font-serif text-3xl text-navy mt-16">Casamento</h2>
            <p className="text-gray-600 leading-relaxed">
              O casamento civil é a formalização da união entre duas pessoas, com direitos e deveres previstos em
              lei. O regime de bens escolhido no casamento define como os bens adquiridos serão administrados e
              partilhados em caso de separação ou falecimento.
            </p>
            <div className="grid md:grid-cols-2 gap-4 not-prose my-6">
              {[
                { title: 'Comunhão Parcial de Bens', desc: 'Regra legal padrão. Comunicam-se os bens adquiridos na constância do casamento. Bens anteriores e heranças são excluídos.' },
                { title: 'Comunhão Universal de Bens', desc: 'Todos os bens, presentes e futuros, são comuns ao casal, inclusive os adquiridos antes do casamento.' },
                { title: 'Separação Total de Bens', desc: 'Nenhum bem se comunica. Cada cônjuge administra seus bens com exclusividade. Obrigatório para maiores de 70 anos.' },
                { title: 'Participação Final nos Aquestos', desc: 'Durante o casamento, cada um administra seus bens separadamente. Na dissolução, divide-se o que foi adquirido na constância.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-cream border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-gold-10 flex items-center justify-center shrink-0 text-gold font-semibold text-sm">{i + 1}</div>
                  <div>
                    <h4 className="font-semibold text-navy text-sm">{item.title}</h4>
                    <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Atenção:</strong> A escolha do regime de bens é uma das decisões mais importantes do casamento
              e deve ser feita com orientação jurídica. O pacto antenupcial, feito por escritura pública, é
              obrigatório para regimes diferentes da comunhão parcial.
            </p>

            <h2 id="inventario" className="font-serif text-3xl text-navy mt-16">Inventário e Partilha</h2>
            <p className="text-gray-600 leading-relaxed">
              O inventário é o processo de levantamento de todos os bens, direitos e dívidas deixados por uma
              pessoa falecida, para posterior partilha entre os herdeiros. Pode ser feito de forma judicial ou
              extrajudicial (em cartório).
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Inventário Extrajudicial vs Judicial</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">Inventário Extrajudicial</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Feito em cartório de notas
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Exige acordo entre todos os herdeiros
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Não pode haver testamento
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Todos os herdeiros devem ser maiores e capazes
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">Inventário Judicial</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Feito na Justiça Estadual
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Obrigatório quando há testamento
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Necessário se houver herdeiro incapaz
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Pode ser necessário quando não há acordo
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Prazo:</strong> O inventário deve ser aberto dentro de 60 dias do falecimento. O não
              cumprimento pode gerar multa sobre o ITCMD (Imposto de Transmissão Causa Mortis e Doação).
            </p>

            <h2 id="reconhecimento-paternidade" className="font-serif text-3xl text-navy mt-16">Reconhecimento de Paternidade</h2>
            <p className="text-gray-600 leading-relaxed">
              O reconhecimento de paternidade é o ato jurídico que estabelece o vínculo de filiação entre o pai
              e o filho. Pode ser feito voluntariamente ou por meio de ação judicial de investigação de paternidade.
              A Lei 12.004/2009 e a Lei 13.112/2015 facilitaram esse processo.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Formas de Realização</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Voluntário:</strong> O pai reconhece espontaneamente o filho, em cartório ou durante o registro de nascimento
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Judicial:</strong> Ação de investigação de paternidade com exame de DNA para comprovação
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Administrativo:</strong> Pelo programa Pai Presente do CNJ, com audiência no cartório
                </li>
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Direitos após o reconhecimento:</strong> O filho passa a ter direito ao nome do pai, à
              herança, à pensão alimentícia, à inclusão em plano de saúde e a todos os direitos inerentes à
              filiação. O reconhecimento de paternidade é irrevogável.
            </p>

            <h2 id="adocao" className="font-serif text-3xl text-navy mt-16">Adoção</h2>
            <p className="text-gray-600 leading-relaxed">
              A adoção é o ato jurídico pelo qual uma pessoa passa a ser considerada filha de outra, com todos os
              direitos e deveres da filiação biológica. É regida pelo Estatuto da Criança e do Adolescente (Lei
              8.069/90) e pelo Código Civil.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Requisitos para Adoção</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Idade mínima de 18 anos',
                  'Diferença mínima de 16 anos entre adotante e adotado',
                  'Estabilidade familiar comprovada',
                  'Inscrição no Cadastro Nacional de Adoção (CNA)',
                  'Participação em curso preparatório',
                  'Avaliação psicossocial favorável',
                ].map((req, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-cream">
                    <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                    <span className="text-sm text-navy">{req}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              A adoção é uma medida excepcional e irrevogável, sempre buscando o melhor interesse da criança ou
              adolescente. O processo é conduzido pela Vara da Infância e Juventude e inclui estágio de
              convivência antes da decisão final. A adoção confere todos os direitos da filiação biológica,
              incluindo direito à herança.
            </p>

            <div className="bg-gold-5 border border-gold-20 rounded-2xl p-8 my-10 not-prose">
              <h4 className="font-serif text-xl text-navy mb-4"> Precisa de Orientação Jurídica?</h4>
              <p className="text-gray-600 text-sm mb-6">
                As questões de Direito de Família envolvem emoções e decisões que impactam profundamente sua vida
                e de seus familiares. Conte com uma advocacia humanizada e especializada para proteger seus direitos.
              </p>
              <Link to="/contato" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all">
                Quero orientação jurídica <ArrowRight size={16} />
              </Link>
            </div>

            <h2 id="documentos" className="font-serif text-3xl text-navy mt-16">Documentos Necessários</h2>
            <p className="text-gray-600 leading-relaxed">
              Para dar entrada em processos de Direito de Família, tenha em mãos:
            </p>
            <div className="grid md:grid-cols-2 gap-3 not-prose my-6">
              {[
                'Documento de identidade (RG)',
                'CPF',
                'Certidão de casamento (atualizada)',
                'Certidão de nascimento dos filhos',
                'Comprovante de residência',
                'Comprovante de renda',
                'Declaração de Imposto de Renda',
                'Extratos bancários',
                'Escritura de imóveis',
                'Contrato de trabalho e holerites',
                'Certidão de óbito (se for o caso)',
                'Pacto antenupcial (se houver)',
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
                { p: 'Preciso de advogado para dar entrada no divórcio?', r: 'Sim, o divórcio judicial exige advogado. No divórcio extrajudicial (em cartório), também é obrigatória a assistência de um advogado, que pode ser o mesmo para ambos os cônjuges no caso consensual.' },
                { p: 'Como funciona a guarda compartilhada?', r: 'Na guarda compartilhada, ambos os pais dividem as responsabilidades e decisões sobre a vida dos filhos. A residência pode ser fixada com um dos genitores, mas o tempo de convivência deve ser equilibrado sempre que possível.' },
                { p: 'Até quando devo pagar pensão alimentícia?', r: 'Em regra, até os 18 anos do filho. No entanto, se o filho estiver cursando ensino superior ou técnico, a obrigação pode se estender até os 24 anos. Também cessa se o filho se tornar economicamente independente.' },
                { p: 'O que fazer se o ex-cônjuge não pagar a pensão?', r: 'É possível ingressar com ação de execução de alimentos. O não pagamento pode levar à prisão civil do devedor por até 3 meses, além de penhora de bens e desconto em folha de pagamento.' },
                { p: 'União estável tem os mesmos direitos do casamento?', r: 'Sim, a Constituição Federal equipara a união estável ao casamento para fins de proteção familiar. Os companheiros têm direito à herança, partilha de bens, pensão por morte e inclusão em plano de saúde.' },
                { p: 'Quanto tempo leva um processo de adoção?', r: 'O prazo varia conforme a complexidade do caso e a fila do Cadastro Nacional de Adoção. Em média, pode levar de 6 meses a 2 anos, incluindo o estágio de convivência e as avaliações psicossociais.' },
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
              { to: '/consumidor', icon: Shield, title: 'Direito do Consumidor', desc: 'Proteção nas relações de consumo' },
              { to: '/imobiliario', icon: Home, title: 'Direito Imobiliário', desc: 'Imóveis, locação e usucapião' },
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
            Precisa de Orientação Jurídica?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Nossa equipe de Direito de Família está pronta para ajudar você e sua família com
            sensibilidade, ética e expertise jurídica.
          </p>
          <Link to="/contato" className="group inline-flex items-center gap-3 px-10 py-4 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30">
            Fale com um Especialista <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-gray-500 text-sm mt-8">
            Atendimento em todo o Brasil • Presencial e Online • Sigilo Profissional
          </p>
          <div className="mt-4 text-gray-500 text-sm">
            <a href="tel:+5548988420867" className="hover:text-gold transition-colors">(48) 98842-0867</a> • contato@willepereira.adv.br
          </div>
        </div>
      </section>
    </div>
  )
}
