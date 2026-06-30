import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ChevronRight, Search } from 'lucide-react'
import SEO from '../components/SEO'

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [posts, setPosts] = useState<import('../data/blogPosts').BlogPost[]>([])

  useEffect(() => {
    import('../data/blogPosts').then(m => m.getAllPosts()).then(all => setPosts(all.filter(Boolean)))
  }, [])

  const categories = ['Todas', ...new Set(posts.map(p => p.category))]

  const filtered = posts.filter(p => {
    if (category !== 'Todas' && p.category !== category) return false
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div>
      <SEO
        title="Blog Jurídico | Will & Pereira Advocacia"
        description="Artigos e informações sobre Direito Previdenciário, Trabalhista, Cível, Consumidor, Família e Imobiliário. Conteúdo jurídico atualizado pela Will & Pereira Advocacia."
        canonical="https://willepereira-adv.vercel.app/blog"
      />
      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a2634_0%,_#0f1729_100%)]" />
        <div className="relative z-10 text-center" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-gold-15 text-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-4"
          >
            Blog Jurídico
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl text-white leading-tight mb-4"
          >
            Artigos e Notícias
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Informações jurídicas atualizadas para proteger seus direitos.
          </motion.p>
        </div>
      </section>

      {/* SEARCH + FILTERS */}
      <section className="py-8 bg-cream sticky top-24 z-30">
        <div className="" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                    category === cat
                      ? 'bg-gold text-navy'
                      : 'bg-white text-navy hover:bg-gold-10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar artigos..."
                className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* POSTS */}
      <section className="py-12">
        <div className="" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              Nenhum artigo encontrado para sua busca.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-8 shadow-lg shadow-navy/5 border border-gray-100 hover:shadow-xl hover:border-gold/20 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-gold-10 text-gold text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={12} /> {post.date}
                    </span>
                  </div>
                  <h1 className="font-serif text-xl text-navy mb-3 leading-snug group-hover:text-gold transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h1>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <User size={12} /> {post.author}
                    </span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-light transition-colors"
                    >
                      Ler mais <ChevronRight size={14} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
