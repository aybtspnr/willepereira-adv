import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

interface AreaProps {
  area: {
    icon: any
    title: string
    desc: string
    topics: string[]
    cor: string
    iconBg: string
  }
  idx: number
}

function ServiceArea({ area, idx }: AreaProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`grid md:grid-cols-2 gap-10 lg:gap-14 items-center ${idx % 2 === 1 ? '' : ''}`}
    >
      <div className={`rounded-2xl p-8 lg:p-10 ${idx % 2 === 1 ? 'md:order-2' : ''} relative group transition-all duration-500 hover:shadow-2xl hover:-translate-y-1`} style={{ background: `linear-gradient(135deg, ${area.cor}, white)`, border: '1px solid ' + (area.cor + '80') }}>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-gold/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        <div className="relative">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110`} style={{ background: area.iconBg }}>
            <area.icon className="w-8 h-8 text-navy" />
          </div>
          <h1 className="font-serif text-2xl md:text-3xl text-navy mb-4">{area.title}</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">{area.desc}</p>
          <Link
            to="/contato"
            className="group/btn inline-flex items-center gap-2 px-6 py-2.5 bg-navy text-white text-sm rounded-full hover:bg-navy-light transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Consultar Advogado <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      <div className={`grid sm:grid-cols-2 gap-3 ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
        {area.topics.map(topic => (
          <div key={topic} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100/50 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 group/topic">
            <CheckCircle size={16} className="text-gold mt-0.5 shrink-0 group-hover/topic:scale-110 transition-transform" />
            <span className="text-sm text-navy font-medium">{topic}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const areas = [
  {
    icon: 'Heart', title: 'Direito Previdenciário',
    desc: 'Especialidade principal do escritório. Atuamos em todo o Brasil com excelência em benefícios do INSS.',
    topics: [
      'Aposentadoria por Idade e Tempo de Contribuição',
      'Aposentadoria Especial e da Pessoa com Deficiência',
      'Auxílio-Doença e Aposentadoria por Invalidez',
      'Pensão por Morte e Auxílio-Reclusão',
      'BPC/LOAS (Benefício de Prestação Continuada)',
      'Revisão de Benefícios e Recurso Administrativo',
      'Salário-Maternidade e Auxílio-Acidente',
      'Planejamento Previdenciário',
    ],
    cor: '#fce4ec', iconBg: 'rgba(244, 67, 54, 0.1)',
  },
  {
    icon: 'Briefcase', title: 'Direito Trabalhista',
    desc: 'Defesa dos direitos dos trabalhadores e empregadores nas relações de trabalho.',
    topics: [
      'Reclamações Trabalhistas na Justiça do Trabalho',
      'Rescisão Contratual e Verbas Rescisórias',
      'Horas Extras e Adicionais',
      'Acidente de Trabalho e Estabilidade',
      'Assédio Moral e Dano Moral',
      'Equiparação Salarial e Desvio de Função',
      'Trabalho Temporário e Terceirização',
      'Acordo Extrajudicial e Homologação',
    ],
    cor: '#e3f2fd', iconBg: 'rgba(33, 150, 243, 0.1)',
  },
  {
    icon: 'Building2', title: 'Direito Cível',
    desc: 'Soluções jurídicas em conflitos civis, contratos e obrigações.',
    topics: [
      'Ações de Indenização por Danos',
      'Cobranças e Execuções',
      'Contratos em Geral',
      'Responsabilidade Civil',
      'Usucapião e Direitos Reais',
      'Obrigações e Inadimplemento',
      'Locação e Direito Imobiliário',
      'Sucessões e Inventário',
    ],
    cor: '#e8f5e9', iconBg: 'rgba(76, 175, 80, 0.1)',
  },
  {
    icon: 'Shield', title: 'Direito do Consumidor',
    desc: 'Proteção dos direitos dos consumidores contra abusos e práticas lesivas.',
    topics: [
      'Cobranças Indevidas e Negativação Injusta',
      'Vícios de Produto e Serviço',
      'Revisão de Contratos Bancários',
      'Plano de Saúde: Cobertura e Reajustes',
      'Produtos com Defeito e Devolução',
      'Práticas Abusivas e Publicidade Enganosa',
      'Ações Coletivas de Consumo',
      'Superendividamento',
    ],
    cor: '#fff8e1', iconBg: 'rgba(255, 193, 7, 0.1)',
  },
  {
    icon: 'Users', title: 'Direito de Família',
    desc: 'Atuação sensível e dedicada em questões familiares e sucessórias.',
    topics: [
      'Divórcio Consensual e Litigioso',
      'Guarda de Filhos e Regulamentação de Visitas',
      'Pensão Alimentícia',
      'Investigação de Paternidade',
      'União Estável e Casamento',
      'Alienação Parental',
      'Tutela e Curatela',
      'Planejamento Sucessório',
    ],
    cor: '#f3e5f5', iconBg: 'rgba(156, 39, 176, 0.1)',
  },
  {
    icon: 'Landmark', title: 'Direito Imobiliário',
    desc: 'Assessoria completa em questões imobiliárias, da compra à regularização.',
    topics: [
      'Usucapião Extraordinária e Especial',
      'Contratos de Compra e Venda',
      'Regularização de Imóveis',
      'Ações Possessórias',
      'Incorporação Imobiliária',
      'Condomínio e Taxas',
      'ITBI e Registro de Imóveis',
      'Direito de Laje e Superfície',
    ],
    cor: '#e0f2f1', iconBg: 'rgba(0, 150, 136, 0.1)',
  },
]

import { Heart, Briefcase, Building2, Shield, Users, Landmark } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'

const iconMap: Record<string, any> = { Heart, Briefcase, Building2, Shield, Users, Landmark }

export default function ServicosPage() {
  return (
    <div>
      <Breadcrumb />
        <SEO
        title="Serviços Jurídicos Will & Pereira Advocacia Palhoça"
        description="Conheça nossos serviços jurídicos especializados em Previdenciário, Trabalhista, Cível, Consumidor, Família e Imobiliário. Will & Pereira Advocacia."
        canonical="https://willepereira-adv.vercel.app/servicos"
      />
      <section className="relative pt-32 pb-20 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a2634_0%,_#0f1729_100%)]" />
        <div className="relative z-10 text-center" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-gold-15 text-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-4"
          >
            Nossas Especialidades
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4"
          >
            Áreas de Atuação
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Soluções jurídicas completas para pessoas físicas e empresas.
          </motion.p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="space-y-24 lg:space-y-28" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          {areas.map((area, idx) => (
            <ServiceArea key={area.title} area={{ ...area, icon: iconMap[area.icon] }} idx={idx} />
          ))}
        </div>
      </section>
    </div>
  )
}
