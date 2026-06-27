import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, ChevronRight } from 'lucide-react'
import { getPost, getAllPosts } from '../data/blogPosts'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = getPost(slug || '')
  const allPosts = getAllPosts()

  if (!post) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-serif text-3xl text-navy mb-4">Artigo não encontrado</h1>
        <Link to="/blog" className="text-gold hover:underline">Voltar ao blog</Link>
      </div>
    )
  }

  const related = allPosts.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 3)

  return (
    <div>
      {/* HERO */}
      <section className="relative pt-32 pb-16 bg-navy overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/blog" className="inline-flex items-center gap-1 text-gold text-sm hover:underline mb-6">
              <ArrowLeft size={14} /> Voltar ao Blog
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gold/15 text-gold text-xs font-semibold rounded-full">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-navy prose-h2:text-2xl prose-h2:mt-10 prose-h3:text-xl prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-navy prose-ul:text-gray-600 prose-li:leading-relaxed"
          >
            {/* Parse simple markdown - we'll use basic formatting */}
            {post.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i} className="font-serif text-2xl text-navy mt-10 mb-4">{line.slice(3)}</h2>
              if (line.startsWith('### ')) return <h3 key={i} className="font-serif text-xl text-navy mt-8 mb-3">{line.slice(4)}</h3>
              if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-semibold text-navy mt-4 mb-2">{line.slice(2, -2)}</p>
              if (line.startsWith('- ')) return <li key={i} className="text-gray-600 ml-4 mb-1">{line.slice(2)}</li>
              if (line.trim() === '') return <div key={i} className="h-2" />
              return <p key={i} className="text-gray-600 leading-relaxed mb-3">{line}</p>
            })}
          </motion.article>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-cream rounded-2xl p-8 text-center"
          >
            <h3 className="font-serif text-2xl text-navy mb-2">Precisa de Ajuda Jurídica?</h3>
            <p className="text-gray-500 mb-6">Agende uma consulta gratuita com nossa equipe.</p>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all"
            >
              Fale Conosco <ChevronRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="py-12 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl text-navy mb-8">Artigos Relacionados</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map(r => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow"
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
  )
}
