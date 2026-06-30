import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, FileText, Scale, ChevronRight, FileSignature, Gavel, Handshake, Home, Shield, UserCheck } from 'lucide-react'
import SEO from '../components/SEO'

export default function GuiaCivel() {
  return (
    <div>
      <SEO
        title="Guia Completo de Direito Cível | Will & Pereira Advocacia"
        description="Guia completo e atualizado sobre Direito Cível: contratos, responsabilidade civil, indenizações, usucapião, direito das obrigações e muito mais."
        canonical="https://willepereira-adv.vercel.app/civel/guia"
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
            Direito Cível
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-3xl mx-auto text-lg"
          >
            Tudo o que você precisa saber sobre Direito Cível: contratos, responsabilidade civil, indenizações, 
            usucapião, obrigações, direito de vizinhança, propriedade e muito mais. Guia completo para proteger 
            seus direitos civis.
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
                { href: '#introducao', label: 'O que é o Direito Civil?' },
                { href: '#contratos', label: 'Contratos' },
                { href: '#responsabilidade-civil', label: 'Responsabilidade Civil' },
                { href: '#indenizacoes', label: 'Indenizações' },
                { href: '#usucapiao', label: 'Usucapião' },
                { href: '#obrigacoes', label: 'Direito das Obrigações' },
                { href: '#vizinhança', label: 'Direito de Vizinhança' },
                { href: '#propriedade', label: 'Propriedade' },
                { href: '#posse', label: 'Posse' },
                { href: '#prescricao', label: 'Prescrição e Decadência' },
                { href: '#documentos', label: 'Documentos Necessários' },
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

            <h2 id="introducao" className="font-serif text-3xl text-navy mt-0">O que é o Direito Civil?</h2>
            <p className="text-gray-600 leading-relaxed">
              O Direito Civil é o ramo mais abrangente do direito privado, responsável por disciplinar as relações 
              jurídicas entre pessoas físicas e jurídicas no âmbito patrimonial e existencial. É o conjunto de normas 
              que regulam a vida do cidadão desde o nascimento até a morte, abrangendo temas como a personalidade 
              jurídica, a capacidade civil, os direitos da personalidade, os bens, os fatos e atos jurídicos, os 
              contratos, a responsabilidade civil, os direitos reais, as obrigações, o direito de família e as sucessões.
            </p>
            <p className="text-gray-600 leading-relaxed">
              No Brasil, o Direito Civil é codificado no Código Civil (Lei 10.406/2002), que entrou em vigor em 2003 
              em substituição ao Código de 1916. A nova codificação trouxe importantes inovações, como a consagração 
              da função social do contrato e da propriedade, a boa-fé objetiva como princípio contratual e a 
              responsabilidade civil objetiva para atividades de risco.
            </p>

            <h3 className="font-serif text-xl text-navy mt-10 mb-4">Principais Ramos do Direito Civil</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              {[
                { icon: FileSignature, label: 'Direito dos Contratos', desc: 'Formação, execução e extinção de contratos civis e empresariais' },
                { icon: Gavel, label: 'Responsabilidade Civil', desc: 'Obrigação de reparar danos materiais e morais' },
                { icon: Scale, label: 'Direito das Coisas', desc: 'Propriedade, posse, usucapião e direitos reais' },
                { icon: Handshake, label: 'Direito das Obrigações', desc: 'Vínculos jurídicos entre credor e devedor' },
                { icon: Home, label: 'Direito Imobiliário', desc: 'Locação, condomínio e regularização fundiária' },
                { icon: Shield, label: 'Direito de Família e Sucessões', desc: 'Casamento, divórcio, inventário e herança' },
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

            <h2 id="contratos" className="font-serif text-3xl text-navy mt-16">Contratos</h2>
            <p className="text-gray-600 leading-relaxed">
              O Direito Contratual rege as relações jurídicas voluntariamente estabelecidas entre as partes, sendo 
              instrumento essencial para a segurança das relações econômicas e sociais. O Código Civil brasileiro 
              consagra princípios fundamentais como a autonomia da vontade, a obrigatoriedade dos contratos 
              (pacta sunt servanda), a boa-fé objetiva, a função social do contrato e o equilíbrio econômico 
              entre as partes.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Princípios Contratuais Essenciais</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Autonomia da vontade das partes
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Boa-fé objetiva e subjetiva
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Função social do contrato
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Obrigatoriedade das convenções
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Equilíbrio econômico entre as partes
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Revisão por onerosidade excessiva
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Importante:</strong> A elaboração cuidadosa de contratos é medida preventiva indispensável 
              para evitar litígios futuros. Contamos com ampla experiência na elaboração, análise e revisão de 
              contratos civis e empresariais, garantindo a segurança jurídica necessária para suas relações contratuais.
            </p>

            <h2 id="responsabilidade-civil" className="font-serif text-3xl text-navy mt-16">Responsabilidade Civil</h2>
            <p className="text-gray-600 leading-relaxed">
              A responsabilidade civil é o instituto jurídico que impõe a obrigação de reparar o dano causado a 
              outrem, seja por ação ou omissão, dolosa ou culposa. No ordenamento brasileiro, distingue-se entre 
              responsabilidade subjetiva (que exige a comprovação de culpa ou dolo do agente) e responsabilidade 
              objetiva (que prescinde da culpa, bastando o nexo de causalidade e o dano).
            </p>
            <p className="text-gray-600 leading-relaxed">
              O artigo 927 do Código Civil estabelece a obrigação de reparar o dano, e seu parágrafo único prevê 
              a responsabilidade objetiva quando a atividade normalmente desenvolvida pelo autor do dano implicar, 
              por sua natureza, risco para os direitos de outrem.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Elementos da Responsabilidade Civil</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Conduta humana (ação ou omissão)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Dano moral ou material sofrido pela vítima
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Nexo de causalidade entre a conduta e o dano
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Culpa ou dolo do agente (na responsabilidade subjetiva)
                </li>
              </ul>
            </div>

            <h2 id="indenizacoes" className="font-serif text-3xl text-navy mt-16">Indenizações</h2>
            <p className="text-gray-600 leading-relaxed">
              As ações de indenização por danos materiais e morais constituem um dos pilares do Direito Cível 
              brasileiro. Fundamentadas nos artigos 186 e 927 do Código Civil, permitem que a vítima de um ato 
              ilícito seja reparada integralmente pelos prejuízos sofridos.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Tipos de Danos Indenizáveis</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">📋 Danos Patrimoniais</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Danos emergentes: o que efetivamente se perdeu
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Lucros cessantes: o que se deixou de ganhar
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Perda de oportunidade (chance)
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">🧠 Danos Extrapatrimoniais</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Dano moral: honra, imagem, intimidade
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Dano estético: lesão à aparência física
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Dano existencial: comprometimento da vida social
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Dica importante:</strong> O prazo prescricional para a pretensão de reparação civil é de 3 anos 
              (art. 206, §3º, V do Código Civil). Para danos decorrentes de relação de consumo, o prazo é de 5 anos 
              (art. 27 do CDC). Busque orientação jurídica o mais breve possível.
            </p>

            <h2 id="usucapiao" className="font-serif text-3xl text-navy mt-16">Usucapião</h2>
            <p className="text-gray-600 leading-relaxed">
              A usucapião é o modo originário de aquisição da propriedade pelo decurso do tempo, aliado à posse 
              mansa, pacífica, contínua e com animus domini. O instituto encontra fundamento no Código Civil 
              (arts. 1.238 a 1.244) e na Constituição Federal, que prevê modalidades especiais.
            </p>
            <h3 className="font-serif text-xl text-navy mt-8 mb-4">Modalidades de Usucapião</h3>
            <div className="space-y-4 not-prose">
              {[
                { title: 'Usucapião Extraordinária', desc: '15 anos de posse, sem necessidade de justo título ou boa-fé. Reduzido para 10 anos se o possuidor estabelecer moradia ou realizar obras de natureza produtiva.' },
                { title: 'Usucapião Ordinária', desc: '10 anos de posse com justo título e boa-fé. Reduzido para 5 anos se o título foi adquirido por transmissão onerosa e registrado.' },
                { title: 'Usucapião Especial Urbana', desc: '5 anos de posse ininterrupta, imóvel de até 250m², utilizado para moradia do possuidor e sua família, desde que não seja proprietário de outro imóvel.' },
                { title: 'Usucapião Especial Rural', desc: '5 anos de posse, área de até 50 hectares, utilizada para moradia e cultivo, desde que não seja proprietário de outro imóvel.' },
                { title: 'Usucapião Familiar', desc: '2 anos de posse direta, com abandono do lar pelo cônjuge ou companheiro, imóvel de até 250m², desde que o possuidor não seja proprietário de outro imóvel.' },
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
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>Documentos essenciais:</strong> Para ação de usucapião são necessários documentos que 
              comprovem a posse, como contas de água, luz e IPTU em nome do possuidor, testemunhas, fotografias 
              ao longo do tempo, e certidão de registro de imóveis demonstrando a cadeia dominial.
            </p>

            <h2 id="obrigacoes" className="font-serif text-3xl text-navy mt-16">Direito das Obrigações</h2>
            <p className="text-gray-600 leading-relaxed">
              O Direito das Obrigações é o núcleo central do Direito Civil, disciplinando as relações jurídicas 
              de conteúdo patrimonial entre credor e devedor. Regulado pelos artigos 233 a 965 do Código Civil, 
              estabelece as regras sobre o nascimento, classificação, transmissão, adimplemento e extinção das 
              obrigações, bem como as consequências do inadimplemento.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Classificação das Obrigações</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Quanto ao objeto:</strong> obrigações de dar (coisa certa ou incerta), fazer e não fazer
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Quanto aos sujeitos:</strong> obrigações fracionárias, solidárias (ativa e passiva) e indivisíveis
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Quanto ao conteúdo:</strong> obrigações de meio, de resultado e de garantia
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Quanto ao modo de execução:</strong> obrigações simples, condicionais, modais e a termo
                </li>
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed">
              O inadimplemento obrigacional, seja absoluto ou relativo (mora), gera consequências jurídicas como 
              a incidência de juros, correção monetária, multa, cláusula penal, perdas e danos e, em casos 
              extremos, a resolução do contrato.
            </p>

            <h2 id="vizinhança" className="font-serif text-3xl text-navy mt-16">Direito de Vizinhança</h2>
            <p className="text-gray-600 leading-relaxed">
              O Direito de Vizinhança é o conjunto de normas que regulam as relações entre proprietários de 
              imóveis vizinhos, impondo limitações ao direito de propriedade em prol da convivência harmoniosa 
              e do bem-estar coletivo. Está previsto nos artigos 1.277 a 1.313 do Código Civil.
            </p>
            <p className="text-gray-600 leading-relaxed">
              As principais questões de direito de vizinhança envolvem uso anormal da propriedade (ruídos, 
              fumaça, odores, vibrações), árvores limítrofes, passagem forçada, águas pluviais, direito de 
              tapagem, construção e escavações, e limites entre prédios.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Principais Conflitos de Vizinhança</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Uso anormal da propriedade: ruídos excessivos, poluição sonora e atmosférica
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Passagem forçada: direito de acesso à via pública
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Águas pluviais e escoamento natural
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Árvores limítrofes e frutos caídos
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Direito de tapagem e muros divisórios
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Construções que prejudicam a segurança ou o sossego do vizinho
                </li>
              </ul>
            </div>

            <h2 id="propriedade" className="font-serif text-3xl text-navy mt-16">Propriedade</h2>
            <p className="text-gray-600 leading-relaxed">
              O direito de propriedade é garantido pelo artigo 5º, inciso XXII da Constituição Federal e 
              regulado pelos artigos 1.228 a 1.368 do Código Civil. A propriedade confere ao titular a 
              faculdade de usar, gozar, dispor e reaver a coisa de quem injustamente a possua ou detenha.
            </p>
            <p className="text-gray-600 leading-relaxed">
              A função social da propriedade é princípio fundamental que condiciona o exercício do direito 
              de propriedade ao cumprimento de sua finalidade social. O descumprimento pode levar à 
              desapropriação por interesse social ou à perda da propriedade por usucapião.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Atributos do Direito de Propriedade</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Usar (jus utendi): utilizar a coisa conforme sua natureza
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Gozar (jus fruendi): perceber os frutos e rendimentos
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Dispor (jus abutendi): alienar, gravar ou consumir a coisa
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Reaver (rei vindicatio): reivindicar de quem injustamente a possua
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 id="posse" className="font-serif text-3xl text-navy mt-16">Posse</h2>
            <p className="text-gray-600 leading-relaxed">
              A posse é um dos institutos mais importantes do Direito Civil, representando o exercício, pleno 
              ou não, de algum dos poderes inerentes à propriedade. Difere da propriedade por ser um fato 
              (relação de fato com a coisa) que produz efeitos jurídicos, enquanto a propriedade é um direito.
            </p>
            <p className="text-gray-600 leading-relaxed">
              O Código Civil classifica a posse em direta e indireta, justa e injusta, de boa-fé e de má-fé, 
              nova e velha. Cada classificação produz efeitos jurídicos distintos, especialmente quanto à 
              percepção de frutos, benfeitorias e à proteção possessória.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Ações Possessórias</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Reintegração de Posse:</strong> para quem foi esbulhado (perdeu a posse)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Manutenção de Posse:</strong> para quem está sofrendo turbação (perturbação da posse)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Interdito Proibitório:</strong> para prevenir ameaça de esbulho ou turbação
                </li>
              </ul>
            </div>

            <h2 id="prescricao" className="font-serif text-3xl text-navy mt-16">Prescrição e Decadência</h2>
            <p className="text-gray-600 leading-relaxed">
              Prescrição e decadência são institutos jurídicos que limitam o exercício de direitos no tempo, 
              visando à segurança jurídica e à estabilidade das relações sociais. Embora relacionados, possuem 
              naturezas e efeitos distintos.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Diferenças Principais</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">⏳ Prescrição</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Extingue a pretensão (ação)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Pode ser renunciada (após consumada)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Prazos variam de 1 a 10 anos
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Admite suspensão e interrupção
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">📅 Decadência</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Extingue o próprio direito
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Não admite renúncia
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Prazos fixados em lei (dias, meses ou anos)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Não admite suspensão ou interrupção
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 id="documentos" className="font-serif text-3xl text-navy mt-16">Documentos Necessários</h2>
            <p className="text-gray-600 leading-relaxed">
              Para dar entrada em ações cíveis ou realizar negócios jurídicos, tenha em mãos:
            </p>
            <div className="grid md:grid-cols-2 gap-3 not-prose my-6">
              {[
                'Documento de identidade (RG)',
                'CPF',
                'Comprovante de residência',
                'Certidão de nascimento ou casamento',
                'Contratos e documentos relacionados ao caso',
                'Comprovantes de pagamento e notas fiscais',
                'Fotografias e vídeos (quando aplicável)',
                'Laudos periciais e relatórios técnicos',
                'Certidão de matrícula do imóvel',
                'Extratos bancários e comprovantes de renda',
                'Procuração para representação jurídica',
                'Correspondências, e-mails e mensagens relacionadas',
              ].map((doc, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-cream">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-sm text-navy">{doc}</span>
                </div>
              ))}
            </div>

            <div className="bg-gold-5 border border-gold-20 rounded-2xl p-8 my-10 not-prose">
              <h4 className="font-serif text-xl text-navy mb-4">⚖️ Tem dúvidas sobre seus direitos civis?</h4>
              <p className="text-gray-600 text-sm mb-6">Seja para resolver um conflito contratual, buscar indenização, 
              regularizar um imóvel ou proteger seu patrimônio, a Will & Pereira Advocacia está pronta para ajudar. 
              Conte com nossa equipe especializada em Direito Cível.</p>
              <Link to="/contato" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all">
                Quero orientação jurídica <ArrowRight size={16} />
              </Link>
            </div>

            <h2 id="faq" className="font-serif text-3xl text-navy mt-16">Perguntas Frequentes</h2>
            <div className="space-y-4 not-prose mt-6">
              {[
                { p: 'Qual o prazo para entrar com uma ação de indenização?', r: 'O prazo prescricional para a pretensão de reparação civil é de 3 anos, conforme o artigo 206, §3º, inciso V do Código Civil. Para danos decorrentes de relação de consumo, o prazo é de 5 anos (art. 27 do CDC).' },
                { p: 'O que é usucapião e como funciona?', r: 'Usucapião é a forma de adquirir a propriedade de um imóvel pela posse prolongada e sem oposição do proprietário. As modalidades principais são extraordinária (15 anos), ordinária (10 anos), especial urbana (5 anos) e familiar (2 anos).' },
                { p: 'Qual a diferença entre posse e propriedade?', r: 'A posse é o exercício de fato dos poderes inerentes à propriedade (usar, gozar, dispor). A propriedade é o direito legal de ter a coisa como sua, registrado em cartório. É possível ter a posse sem ter a propriedade (ex.: locatário) e vice-versa.' },
                { p: 'O que fazer em caso de conflito de vizinhança?', r: 'Primeiro, tente uma solução amigável com o vizinho. Se não for possível, busque orientação jurídica. As principais medidas judiciais são ações de nunciação de obra nova, demolição, reparação de danos e as ações possessórias, dependendo do caso.' },
                { p: 'É obrigatório ter advogado para fazer um contrato?', r: 'Não é obrigatório por lei, mas a assistência de um advogado especializado é altamente recomendável. Um contrato bem redigido previne conflitos, estabelece claramente direitos e obrigações e garante segurança jurídica à relação contratual.' },
                { p: 'O que é dano moral e como é calculado?', r: 'Dano moral é a lesão a direitos da personalidade como honra, imagem, intimidade e dignidade. O valor é fixado pelo juiz com base em critérios como a gravidade do dano, a condição das partes e o caráter pedagógico da condenação, sem que haja enriquecimento sem causa.' },
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
              { to: '/consumidor', icon: Shield, title: 'Direito do Consumidor', desc: 'Proteção nas relações de consumo' },
              { to: '/familia', icon: UserCheck, title: 'Direito de Família', desc: 'Família, divórcio e sucessões' },
              { to: '/imobiliario', icon: Home, title: 'Direito Imobiliário', desc: 'Imóveis, locação e condomínios' },
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
            Nossa equipe de Direito Cível está pronta para analisar seu caso e proteger seus direitos com 
            excelência e dedicação.
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
