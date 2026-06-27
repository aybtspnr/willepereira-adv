import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  Scale, Shield, Heart, Users, Building2, FileText,
  ChevronRight, Quote, ArrowRight, CheckCircle, Phone,
  BookOpen, Gavel, Briefcase, Landmark
} from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

const servicos = [
  { icon: Heart, title: 'Direito Previdenciário', desc: 'Aposentadorias, pensões, auxílio-doença, BPC/LOAS e revisão de benefícios do INSS.', cor: 'from-rose-500/20 to-rose-600/10' },
  { icon: Briefcase, title: 'Direito Trabalhista', desc: 'Reclamações trabalhistas, rescisão contratual, horas extras, verbas rescisórias e acidente de trabalho.', cor: 'from-blue-500/20 to-blue-600/10' },
  { icon: Building2, title: 'Direito Cível', desc: 'Ações de indenização, cobranças, contratos, responsabilidade civil e obrigações.', cor: 'from-emerald-500/20 to-emerald-600/10' },
  { icon: Shield, title: 'Direito do Consumidor', desc: 'Defesa em relações de consumo, cobranças indevidas, vícios de produto e serviços.', cor: 'from-amber-500/20 to-amber-600/10' },
  { icon: Users, title: 'Direito de Família', desc: 'Divórcio, guarda de filhos, pensão alimentícia, inventário e partilha de bens.', cor: 'from-violet-500/20 to-violet-600/10' },
  { icon: Landmark, title: 'Direito Imobiliário', desc: 'Usucapião, contratos imobiliários, registro de imóveis e ações possessórias.', cor: 'from-teal-500/20 to-teal-600/10' },
]

const diferenciais = [
  { icon: Scale, title: 'Atendimento Personalizado', desc: 'Cada caso é único. Oferecemos atendimento dedicado e humanizado.' },
  { icon: Shield, title: 'Expertise Jurídica', desc: 'Anos de experiência nas principais áreas do direito brasileiro.' },
  { icon: Users, title: 'Presença Nacional', desc: 'Atendimento online em todo o Brasil, com sede em Palhoça, SC.' },
  { icon: FileText, title: 'Transparência Total', desc: 'Você acompanha cada etapa do seu processo com total clareza.' },
]

const blogPosts = [
  { title: 'Aposentadoria por Idade: Requisitos e Mudanças em 2026', slug: 'aposentadoria-por-idade-2026', category: 'Previdenciário', date: '25 Jun 2026' },
  { title: 'Direitos Trabalhistas na Rescisão: O Que Você Precisa Saber', slug: 'direitos-trabalhistas-rescisao', category: 'Trabalhista', date: '24 Jun 2026' },
  { title: 'Como Pedir Auxílio-Doença pelo INSS: Guia Passo a Passo', slug: 'como-pedir-auxilio-doenca-inss', category: 'Previdenciário', date: '23 Jun 2026' },
]

function ParallaxSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
          {subtitle || 'Nossas Especialidades'}
        </span>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-navy leading-tight">
          {title}
        </h2>
        <div className="gold-divider-center" />
      </motion.div>
    </div>
  )
}

function Counter({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const step = Math.ceil(end / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, end])
  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-4xl md:text-5xl text-gold font-bold">
        {count}{suffix}
      </div>
      <div className="text-navy-light text-sm mt-1 font-medium">{label}</div>
    </div>
  )
}

function ServiceCard({ icon: Icon, title, desc, cor, index }: { icon: any; title: string; desc: string; cor: string; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative bg-white rounded-2xl p-8 shadow-lg shadow-navy/5 border border-gray-100 hover:shadow-xl hover:shadow-gold/5 hover:border-gold/20 transition-all duration-500"
    >
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-7 h-7 text-navy" />
      </div>
      <h3 className="font-serif text-xl text-navy mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      <Link
        to="/contato"
        className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-gold hover:text-gold-light transition-colors"
      >
        Saiba mais <ChevronRight size={14} />
      </Link>
    </motion.div>
  )
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 100])

  return (
    <div>
      {/* ═══════════ HERO ═══════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] max-h-[900px] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-navy" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a2634_0%,_#0f1729_100%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c9a84c\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-transparent to-navy/50" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent" />

        {/* Decorative Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-96 h-96 border border-gold/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] border border-gold/5 rounded-full"
        />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 text-gold text-sm font-medium mb-6">
                  <Scale size={16} />
                  <span>Will & Pereira Advocacia</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6"
              >
                Seus Direitos{' '}
                <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                  Merecem Defesa
                </span>{' '}
                Especializada
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-gray-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
              >
                Advocacia em Palhoça com atendimento em todo o Brasil. 
                Soluções jurídicas em Direito Previdenciário, Trabalhista, 
                Cível e muito mais.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/contato"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all duration-300 hover:shadow-xl hover:shadow-gold/20"
                >
                  Consulta Gratuita
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/servicos"
                  className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  Nossos Serviços
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════ NUMBERS ═══════════ */}
      <ParallaxSection className="bg-cream py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Counter end={15} suffix="+" label="Anos de Experiência" />
            <Counter end={5000} suffix="+" label="Casos Atendidos" />
            <Counter end={98} suffix="%" label="Taxa de Sucesso" />
            <Counter end={27} suffix="+" label="Cidades Atendidas" />
          </div>
        </div>
      </ParallaxSection>

      {/* ═══════════ ABOUT ═══════════ */}
      <ParallaxSection className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
                Quem Somos
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-navy leading-tight mb-6">
                Advocacia que Protege<br />o Que é Seu
              </h2>
              <div className="gold-divider" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Na <strong>Will & Pereira Advocacia</strong>, acreditamos que o acesso à justiça 
                não deve ser um privilégio. Por isso, oferecemos um atendimento jurídico 
                humanizado, transparente e eficiente para todos os brasileiros.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Com sede em Palhoça, Santa Catarina, e atuação em todo o Brasil, nossa equipe 
                está preparada para defender seus direitos nas mais diversas áreas do Direito, 
                com especial destaque para o Direito Previdenciário.
              </p>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-full hover:bg-navy-light transition-all duration-300"
              >
                Agende uma Consulta <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-navy/20" />
                <div className="absolute inset-0 bg-navy/5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23c9a84c\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\'/%3E%3Cpath d=\'M20 0L0 20l20 20L40 20z\'/%3E%3C/g%3E%3C/svg%3E")' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Scale className="w-24 h-24 text-gold/30" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gold/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </ParallaxSection>

      {/* ═══════════ SERVICES ═══════════ */}
      <ParallaxSection className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Áreas de Atuação"
            subtitle="Nossas Especialidades"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {servicos.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/servicos"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-navy text-navy font-semibold rounded-full hover:bg-navy hover:text-white transition-all duration-300"
            >
              Ver Todos os Serviços <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ═══════════ DIFFERENTIALS ═══════════ */}
      <ParallaxSection className="bg-navy py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23c9a84c\' fill-opacity=\'1\'%3E%3Cpath d=\'M40 12L28 0l-12 12L4 0 0 4l12 12L0 28l4 4 12-12 12 12 4-4-12-12L40 12z\'/%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-gold/15 text-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
              Por que nos escolher
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              Seus Direitos em Boas Mãos
            </h2>
            <div className="w-14 h-0.5 bg-gold mx-auto mt-4" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {diferenciais.map((d, i) => (
              <motion.div
                key={d.title}
                variants={fadeUp}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/30 transition-all duration-300">
                  <d.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-xl text-white mb-3">{d.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ═══════════ BLOG ═══════════ */}
      <ParallaxSection className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Artigos Recentes"
            subtitle="Blog Jurídico"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl p-8 shadow-lg shadow-navy/5 border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-semibold rounded-full mb-3">
                  {post.category}
                </span>
                <span className="block text-xs text-gray-400 mb-2">{post.date}</span>
                <h3 className="font-serif text-lg text-navy mb-4 leading-relaxed group-hover:text-gold transition-colors">
                  {post.title}
                </h3>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-light transition-colors"
                >
                  Ler mais <ChevronRight size={14} />
                </Link>
              </motion.article>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy text-white rounded-full hover:bg-navy-light transition-all duration-300"
            >
              Ver Todos os Artigos <BookOpen size={16} />
            </Link>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ═══════════ CTA ═══════════ */}
      <ParallaxSection className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.08)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-gold/15 text-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
              Estamos Prontos para Ajudar
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
              Não Deixe Seus Direitos para Depois
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
          Agende uma consulta gratuita e descubra como podemos ajudar 
              você a resolver seu caso.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contato"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all duration-300 hover:shadow-xl hover:shadow-gold/20"
              >
                <Phone size={18} />
                Consulta Gratuita
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+5548999999999"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300"
              >
                (48) 99999-9999
              </a>
            </div>
          </motion.div>
        </div>
      </ParallaxSection>
    </div>
  )
}
