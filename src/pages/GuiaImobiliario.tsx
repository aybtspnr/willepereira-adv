import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, FileText, Home, ChevronRight, Building2, Key, FileSignature, Scale, Shield, MapPin } from 'lucide-react'
import SEO from '../components/SEO'

export default function GuiaImobiliario() {
  return (
    <div>
      <SEO
        title="Guia Completo de Direito Imobiliário | Will & Pereira Advocacia"
        description="Guia completo e atualizado sobre Direito Imobiliário: compra e venda, locação, financiamento, condomínio, usucapião, registro de imóveis, ITBI, incorporação imobiliária e muito mais."
        canonical="https://willepereira-adv.vercel.app/imobiliario/guia"
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
            Direito Imobiliário
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-3xl mx-auto text-lg"
          >
            Tudo o que você precisa saber sobre compra e venda de imóveis, locação, financiamento,
            usucapião, registros, ITBI e muito mais. Guia completo para proteger seu patrimônio.
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
                { href: '#introducao', label: 'O que é o Direito Imobiliário?' },
                { href: '#compra-venda', label: 'Compra e Venda de Imóveis' },
                { href: '#locacao', label: 'Contratos de Locação' },
                { href: '#financiamento', label: 'Financiamento Imobiliário' },
                { href: '#condominio', label: 'Direito Condominial' },
                { href: '#usucapiao', label: 'Usucapião' },
                { href: '#registro-imoveis', label: 'Registro de Imóveis' },
                { href: '#itbi', label: 'ITBI — Imposto de Transmissão' },
                { href: '#incorporacao', label: 'Incorporação Imobiliária' },
                { href: '#direito-laje', label: 'Direito de Laje' },
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

            <h2 id="introducao" className="font-serif text-3xl text-navy mt-0">O que é o Direito Imobiliário?</h2>
            <p className="text-gray-600 leading-relaxed">
              O Direito Imobiliário é o ramo do Direito que regula as relações jurídicas envolvendo
              bens imóveis — terrenos, casas, apartamentos, edifícios comerciais e qualquer
              propriedade imobiliária. Ele abrange desde a aquisição e transferência de propriedade
              até contratos de locação, financiamento, usucapião e questões condominiais.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Com o crescimento do mercado imobiliário brasileiro e a complexidade das leis que regem
              o setor, contar com um advogado especializado é essencial para evitar problemas
              jurídicos e garantir a segurança das suas transações imobiliárias.
            </p>

            <h3 className="font-serif text-xl text-navy mt-10 mb-4">Principais Áreas do Direito Imobiliário</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              {[
                { icon: Home, label: 'Compra e Venda', desc: 'Contratos, financiamento e transferência de propriedade' },
                { icon: Key, label: 'Locação', desc: 'Contratos de aluguel residencial e comercial' },
                { icon: FileSignature, label: 'Usucapião', desc: 'Aquisição da propriedade pelo tempo de posse' },
                { icon: Building2, label: 'Condomínios', desc: 'Assembleias, multas e convenções condominiais' },
                { icon: MapPin, label: 'Registro de Imóveis', desc: 'Matrícula, averbação e registro de títulos' },
                { icon: Scale, label: 'ITBI e Tributos', desc: 'Impostos na transmissão de bens imóveis' },
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

            <h2 id="compra-venda" className="font-serif text-3xl text-navy mt-16">Compra e Venda de Imóveis</h2>
            <p className="text-gray-600 leading-relaxed">
              A compra e venda de imóveis é a transação mais comum do Direito Imobiliário. O processo
              envolve desde a negociação inicial até o registro da escritura no Cartório de Registro
              de Imóveis. Cada etapa exige atenção para garantir a segurança jurídica do negócio.
            </p>
            <h3 className="font-serif text-xl text-navy mt-8 mb-4">Etapas Essenciais</h3>
            <div className="space-y-4 not-prose">
              {[
                { title: '1. Análise da Documentação', desc: 'Verificação da matrícula do imóvel, certidões negativas do vendedor,IPTU, certidão da matrícula e regularidade do imóvel.' },
                { title: '2. Contrato de Promessa de Compra e Venda', desc: 'Instrumento preliminar que define as condições do negócio: preço, prazo, forma de pagamento, multas e responsabilidades.' },
                { title: '3. Escritura Pública', desc: 'Ato formal realizado em Cartório de Notas (Tabelionato), obrigatório para imóveis acima de 30 salários mínimos.' },
                { title: '4. Registro no Cartório de Imóveis', desc: 'Última etapa, que transfere efetivamente a propriedade para o comprador. Sem registro, a propriedade não é legalmente transferida.' },
              ].map((etapa, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-cream border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-gold-10 flex items-center justify-center shrink-0 text-gold font-semibold text-sm">{i + 1}</div>
                  <div>
                    <h4 className="font-semibold text-navy text-sm">{etapa.title}</h4>
                    <p className="text-gray-500 text-xs mt-1">{etapa.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-600 leading-relaxed mt-6">
              <strong>Atenção:</strong> Nunca adquira um imóvel sem realizar uma due diligence completa.
              Verifique se há dívidas, penhoras, usufrutos, hipotecas ou qualquer ônus sobre o imóvel
              antes de assinar o contrato.
            </p>

            <h2 id="locacao" className="font-serif text-3xl text-navy mt-16">Contratos de Locação</h2>
            <p className="text-gray-600 leading-relaxed">
              A locação de imóveis é regida pela Lei do Inquilinato (Lei 8.245/91), que estabelece
              direitos e deveres tanto para locadores quanto para locatários. O contrato de aluguel
              pode ser residencial, comercial ou por temporada, cada um com regras específicas.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Direitos e Deveres</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">Proprietário (Locador)</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Receber o aluguel em dia
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Exigir garantias locatícias (caução, fiador, seguro-fiança)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Reaver o imóvel ao final do contrato
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Realizar vistorias periódicas
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy mb-2">Inquilino (Locatário)</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Usar o imóvel de forma adequada
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Pagar aluguel, condomínio e tributos no prazo
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Realizar pequenos reparos (Lei 12.112/2009)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      Devolver o imóvel nas mesmas condições
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Importante:</strong> O contrato de locação por temporada (curta duração,
              como AirBnB) possui regras próprias e não segue integralmente a Lei do Inquilinato.
              Consulte um advogado especializado para adequar seu contrato à modalidade correta.
            </p>

            <h2 id="financiamento" className="font-serif text-3xl text-navy mt-16">Financiamento Imobiliário</h2>
            <p className="text-gray-600 leading-relaxed">
              O financiamento imobiliário é a principal forma de aquisição da casa própria no Brasil.
              Regulado pela Lei 10.931/2004 e pelo SFH (Sistema Financeiro da Habitação), o
              financiamento pode ser contratado com as principais instituições bancárias do país.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Modalidades Comuns</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>SFH (Sistema Financeiro da Habitação):</strong> Taxas reguladas, até R$ 1,5 milhão de avaliação
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>SFI (Sistema Financeiro Imobiliário):</strong> Imóveis de alto padrão, taxas de mercado
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Minha Casa Minha Vida / Casa Verde e Amarela:</strong> Condições especiais para baixa renda
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <strong>Consórcio Imobiliário:</strong> Autofinanciamento sem juros, com taxa de administração
                </li>
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>Dica importante:</strong> Antes de contratar um financiamento, simule diferentes
              bancos e compare as taxas de juros, o Custo Efetivo Total (CET) e as condições de
              amortização (Tabela Price vs SAC). Um advogado pode analisar o contrato e identificar
              cláusulas abusivas.
            </p>

            <h2 id="condominio" className="font-serif text-3xl text-navy mt-16">Direito Condominial</h2>
            <p className="text-gray-600 leading-relaxed">
              O Direito Condominial regula a convivência em condomínios edilícios (prédios e
              conjuntos residenciais). É regido pelo Código Civil (arts. 1.331 a 1.358) e pela
              convenção do condomínio. As questões mais comuns envolvem assembleias, multas,
              inadimplência e uso das áreas comuns.
            </p>
            <h3 className="font-serif text-xl text-navy mt-8 mb-4">Principais Temas Condominiais</h3>
            <div className="grid md:grid-cols-2 gap-3 not-prose my-6">
              {[
                'Convenção de condomínio e regimento interno',
                'Assembleias ordinárias e extraordinárias',
                'Cobrança de cotas condominiais atrasadas',
                'Multas por infrações e obras irregulares',
                'Uso de áreas comuns e vagas de garagem',
                'Animais de estimação em condomínio',
                'Rateio de despesas extraordinárias',
                'Ações de danos materiais entre condôminos',
              ].map((tema, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-cream">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-sm text-navy">{tema}</span>
                </div>
              ))}
            </div>

            <h2 id="usucapiao" className="font-serif text-3xl text-navy mt-16">Usucapião</h2>
            <p className="text-gray-600 leading-relaxed">
              Usucapião é o meio de aquisição da propriedade pelo decurso do tempo de posse
              contínua, pacífica e com animus domini (intenção de ser dono). Existem várias
              modalidades previstas no Código Civil e na Constituição Federal.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Modalidades de Usucapião</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-gray-100">
                  <p className="text-sm font-semibold text-navy mb-2">Usucapião Extraordinário</p>
                  <p className="text-xs text-gray-500">15 anos de posse (ou 10 anos se houver obras/moradia)</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-100">
                  <p className="text-sm font-semibold text-navy mb-2">Usucapião Ordinário</p>
                  <p className="text-xs text-gray-500">10 anos de posse com justo título e boa-fé</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-100">
                  <p className="text-sm font-semibold text-navy mb-2">Usucapião Especial Urbano</p>
                  <p className="text-xs text-gray-500">5 anos de posse, imóvel de até 250 m², sem outro imóvel (CF/88)</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-100">
                  <p className="text-sm font-semibold text-navy mb-2">Usucapião Especial Rural</p>
                  <p className="text-xs text-gray-500">5 anos de posse, imóvel de até 50 hectares, sem outro imóvel</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-100">
                  <p className="text-sm font-semibold text-navy mb-2">Usucapião Familiar</p>
                  <p className="text-xs text-gray-500">2 anos de posse direta após abandono do lar (EC 81/2014)</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-100">
                  <p className="text-sm font-semibold text-navy mb-2">Usucapião Coletivo</p>
                  <p className="text-xs text-gray-500">Para áreas urbanas ocupadas por população de baixa renda</p>
                </div>
              </div>
            </div>

            <h2 id="registro-imoveis" className="font-serif text-3xl text-navy mt-16">Registro de Imóveis</h2>
            <p className="text-gray-600 leading-relaxed">
              O Cartório de Registro de Imóveis é o órgão responsável por dar publicidade, segurança
              e eficácia aos atos jurídicos que envolvem imóveis. É no registro que se formaliza
              a transferência de propriedade, a instituição de hipotecas, usufrutos e outros direitos reais.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Princípios do Registro de Imóveis:</strong>
            </p>
            <ul className="space-y-2 not-prose my-4">
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                <strong>Princípio da Continuidade:</strong> O registro deve formar uma cadeia ininterrupta de proprietários
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                <strong>Princípio da Especialidade:</strong> O imóvel deve ser perfeitamente individualizado na matrícula
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                <strong>Princípio da Prioridade:</strong> A prioridade do registro define a preferência entre direitos concorrentes
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                <strong>Princípio da Publicidade:</strong> Qualquer pessoa pode consultar a matrícula do imóvel
              </li>
            </ul>

            <h2 id="itbi" className="font-serif text-3xl text-navy mt-16">ITBI — Imposto de Transmissão</h2>
            <p className="text-gray-600 leading-relaxed">
              O ITBI (Imposto de Transmissão de Bens Imóveis) é um imposto municipal incidente sobre
              a compra e venda de imóveis. Cada município possui sua própria alíquota, que geralmente
              varia entre 2% e 4% do valor do imóvel.
            </p>
            <div className="bg-navy-5 rounded-xl p-6 not-prose my-6">
              <h4 className="font-semibold text-navy mb-3">Pontos Importantes sobre o ITBI</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  O pagamento do ITBI é condição para o registro da escritura
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  A base de cálculo é o valor venal do imóvel (ou valor de mercado, conforme o município)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  É possível questionar judicialmente a base de cálculo quando muito superior ao valor venal
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                  Imóveis financiados pelo SFH podem ter alíquota reduzida em alguns municípios
                </li>
              </ul>
            </div>

            <h2 id="incorporacao" className="font-serif text-3xl text-navy mt-16">Incorporação Imobiliária</h2>
            <p className="text-gray-600 leading-relaxed">
              A incorporação imobiliária é a atividade de promover e realizar a construção de
              edificações para venda de unidades autônomas (apartamentos, salas comerciais, lojas).
              É regida pela Lei 4.591/64 e exige o registro do memorial de incorporação no Cartório
              de Registro de Imóveis.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Documentos obrigatórios da incorporação:</strong>
            </p>
            <ul className="space-y-2 not-prose my-4">
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                Projeto aprovado pela Prefeitura e licença ambiental
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                Memorial de incorporação registrado no Cartório
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                Contrato-padrão de compra e venda de unidades
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                Quadro de áreas, frações ideais e especificações técnicas
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                Garantias contratuais (patrimônio de afetação, seguro)
              </li>
            </ul>

            <h2 id="direito-laje" className="font-serif text-3xl text-navy mt-16">Direito de Laje</h2>
            <p className="text-gray-600 leading-relaxed">
              O Direito de Laje é um instituto jurídico recente, previsto no Estatuto da Cidade
              (Lei 10.257/2001) e regulamentado pela Lei 13.465/2017. Ele permite que o proprietário
              de um imóvel ceda a terceiros o direito de construir sobre sua laje, criando uma
              unidade autônoma independente.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Características do Direito de Laje:</strong>
            </p>
            <ul className="space-y-2 not-prose my-4">
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                Cria uma unidade imobiliária autônoma com matrícula própria
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                Pode ser objeto de compra, venda, locação e financiamento
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                Exige autorização do proprietário do imóvel e registro no Cartório
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                Muito utilizado em comunidades e áreas urbanas consolidadas
              </li>
            </ul>

            <div className="bg-gold-5 border border-gold-20 rounded-2xl p-8 my-10 not-prose">
              <h4 className="font-serif text-xl text-navy mb-4"> Proteja seu Patrimônio Imobiliário</h4>
              <p className="text-gray-600 text-sm mb-6">
                Seja na compra de um imóvel, na assinatura de um contrato de locação ou em uma
                questão condominial, ter orientação jurídica especializada faz toda a diferença.
                Na Will & Pereira Advocacia, analisamos cada detalhe para garantir seus direitos.
              </p>
              <Link to="/contato" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all">
                Quero orientação jurídica <ArrowRight size={16} />
              </Link>
            </div>

            <h2 id="documentos" className="font-serif text-3xl text-navy mt-16">Documentos Necessários</h2>
            <p className="text-gray-600 leading-relaxed">
              Para realizar qualquer transação imobiliária, é fundamental ter em mãos a documentação
              correta. Abaixo, os principais documentos exigidos:
            </p>
            <div className="grid md:grid-cols-2 gap-3 not-prose my-6">
              {[
                'Matrícula atualizada do imóvel',
                'Certidão de ônus reais',
                'Certidão de ações cíveis e executivas fiscais',
                'Certidão de protestos e falências',
                'Certidão de débitos municipais (IPTU)',
                'Certidão de débitos condominiais',
                'RG e CPF do comprador e vendedor',
                'Certidão de casamento (se for o caso)',
                'Comprovante de residência',
                'Declaração de Imposto de Renda',
                'Contrato de financiamento (se aplicável)',
                'Habite-se (para imóveis novos)',
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
                { p: 'Preciso de escritura pública para comprar um imóvel?', r: 'Sim, para imóveis com valor acima de 30 salários mínimos a escritura pública é obrigatória (Lei 7.433/85). Abaixo desse valor, é possível fazer contrato particular.' },
                { p: 'Qual a diferença entre posse e propriedade?', r: 'A posse é o exercício do domínio sobre o imóvel (usar, morar, cultivar). A propriedade é o direito legal, formalizado pelo registro no Cartório de Imóveis. É possível ter posse sem propriedade e vice-versa.' },
                { p: 'O fiador pode desistir da fiança?', r: 'Sim, mas a desistência só vale para renovações futuras. Durante a vigência do contrato, o fiador permanece responsável até a entrega das chaves ou a substituição por outro fiador.' },
                { p: 'Quanto tempo leva um processo de usucapião?', r: 'O prazo varia de 1 a 4 anos, dependendo da complexidade do caso e da vara onde tramita. A usucapião extrajudicial (via cartório) é mais rápida que a judicial.' },
                { p: 'O que é o patrimônio de afetação nas incorporações?', r: 'É a separação do patrimônio da incorporação do patrimônio da construtora. Isso protege os compradores em caso de falência ou problemas financeiros da empresa.' },
                { p: 'É obrigatório pagar ITBI na compra de imóvel?', r: 'Sim, o ITBI é devido sempre que há transmissão onerosa de imóvel. O pagamento é condição para o registro da escritura. A alíquota varia conforme o município, geralmente entre 2% e 4%.' },
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
              { to: '/familia', icon: FileText, title: 'Direito de Família', desc: 'Divórcio, guarda e partilha de bens' },
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
            Precisa de Ajuda com seu Imóvel?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Nossa equipe de Direito Imobiliário está pronta para analisar seu caso e proteger
            seu patrimônio com segurança jurídica.
          </p>
          <Link to="/contato" className="group inline-flex items-center gap-3 px-10 py-4 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30">
            Fale com um Especialista <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-gray-500 text-sm mt-8">
            (48) 98842-0867 • Atendimento em todo o Brasil • Presencial e Online • Sigilo Profissional
          </p>
        </div>
      </section>
    </div>
  )
}
