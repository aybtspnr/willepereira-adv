import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, ChevronRight } from 'lucide-react'
import SEO from '../components/SEO'
import CTACard from '../components/CTACard'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<import('../data/blogPosts').BlogPost | undefined>(undefined)
  const [allPosts, setAllPosts] = useState<import('../data/blogPosts').BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    import('../data/blogPosts').then(m => {
      if (cancelled) return
      return Promise.all([
        m.getPost(slug || ''),
        m.getAllPosts(),
      ]).then(([p, all]) => {
        if (!cancelled) {
          setPost(p)
          setAllPosts(all.filter(Boolean))
          setLoading(false)
        }
      })
    }).catch(() => {
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
  }, [slug])

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center" style={{ color: 'var(--gray-400)' }}>
        <div className="gold-divider-center" style={{ animation: 'preAnim 1s ease infinite' }} />
        <p>Carregando...</p>
      </div>
    )
  }

  if (!post) {
    // Check if it's a city page slug — redirect to /cidade/
    if (slug?.startsWith('advogado-em-')) {
      window.location.href = `/cidade/${slug}`
      return null
    }
    return (
      <div className="pt-32 pb-20 text-center">
        <SEO
        title="Artigo não encontrado | Will & Pereira Advocacia"
      />
      <h1 className="font-serif text-3xl text-navy mb-4">Artigo não encontrado</h1>
        <Link to="/blog" className="text-gold hover:underline">Voltar ao blog</Link>
      </div>
    )
  }

  const related = allPosts.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 3)
  const pageUrl = `https://willepereira-adv.vercel.app/blog/${post.slug}`
  const ogImage = `https://willepereira-adv.vercel.app/og-image.jpg`
  
  // JSON-LD BlogPosting schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "url": pageUrl,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Will & Pereira Advocacia",
      "url": "https://willepereira-adv.vercel.app"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    }
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        canonical={`https://willepereira-adv.vercel.app/blog/${post.slug}`}
      />
      <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>

      <div>
        {/* HERO */}
        <section className="relative pt-32 pb-16 bg-navy overflow-hidden">
          <div className="relative z-10 container max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link to="/blog" className="inline-flex items-center gap-1 text-gold text-sm hover:underline mb-6">
                <ArrowLeft size={14} /> Voltar ao Blog
              </Link>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-gold-15 text-gold text-xs font-semibold rounded-full">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-gray-400 text-xs">
                  <Calendar size={12} /> {post.date}
                </span>
                <span className="flex items-center gap-1 text-gray-400 text-xs">
                  <User size={12} /> {post.author}
                </span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                {post.title}
              </h1>
              <p className="text-gray-300 mt-4 max-w-2xl">{post.description}</p>
            </motion.div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-12">
          <div className="container max-w-4xl">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-navy prose-h2:text-2xl prose-h2:mt-10 prose-h3:text-xl prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-navy prose-ul:text-gray-600 prose-li:leading-relaxed"
            >
              {(() => {
                const lines = post.content.split('\n')
                const elements: React.ReactNode[] = []
                let headingCount = 0
                for (let i = 0; i < lines.length; i++) {
                  const line = lines[i]
                  let el: React.ReactNode = null
                  if (line.startsWith('## ')) {
                    headingCount++
                    el = <h2 key={i} className="font-serif text-2xl text-navy mt-10 mb-4">{line.slice(3)}</h2>
                    if (headingCount % 3 === 0) {
                      elements.push(el)
                      elements.push(<CTACard key={`cta-${i}`} category={post.category} compact />)
                      continue
                    }
                  } else if (line.startsWith('### ')) {
                    headingCount++
                    el = <h3 key={i} className="font-serif text-xl text-navy mt-8 mb-3">{line.slice(4)}</h3>
                    if (headingCount % 3 === 0) {
                      elements.push(el)
                      elements.push(<CTACard key={`cta-${i}`} category={post.category} compact />)
                      continue
                    }
                  } else if (line.startsWith('**') && line.endsWith('**')) {
                    el = <p key={i} className="font-semibold text-navy mt-4 mb-2">{line.slice(2, -2)}</p>
                  } else if (line.startsWith('- ')) {
                    el = <li key={i} className="text-gray-600 ml-4 mb-1">{line.slice(2)}</li>
                  } else if (line.trim() === '') {
                    el = <div key={i} className="h-2" />
                  } else {
                    el = <p key={i} className="text-gray-600 leading-relaxed mb-3">{line}</p>
                  }
                  if (el) elements.push(el)
                }
                return elements
              })()}
            </motion.article>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 bg-cream rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="font-serif text-2xl text-navy mb-2">Precisa de Ajuda Jurídica?</h3>
              <p className="text-gray-500 mb-6">Entre em contato com nossa equipe para orientação jurídica.</p>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 group"
              >
                Fale Conosco <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="py-12 bg-cream">
            <div className="container">
              <h2 className="font-serif text-2xl text-navy mb-8">Artigos Relacionados</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map(r => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className="bg-white rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="text-xs text-gold font-semibold">{r.category}</span>
                    <h3 className="font-serif text-lg text-navy mt-2 mb-2">{r.title}</h3>
                    <span className="text-xs text-gray-400">{r.date}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
