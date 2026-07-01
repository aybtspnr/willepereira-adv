import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, ChevronRight } from 'lucide-react'
import SEO from '../components/SEO'
import CTACard from '../components/CTACard'

function renderInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    // Bold **text**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) {
        parts.push(<span key={key++}>{remaining.slice(0, boldMatch.index)}</span>)
      }
      parts.push(<strong key={key++} style={{ color: 'var(--navy)', fontWeight: 600 }}>{boldMatch[1]}</strong>)
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length)
      continue
    }

    // Link [text](url)
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch && linkMatch.index !== undefined) {
      if (linkMatch.index > 0) {
        parts.push(<span key={key++}>{remaining.slice(0, linkMatch.index)}</span>)
      }
      parts.push(
        <a key={key++} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>
          {linkMatch[1]}
        </a>
      )
      remaining = remaining.slice(linkMatch.index + linkMatch[0].length)
      continue
    }

    // No more matches - push rest
    parts.push(<span key={key++}>{remaining}</span>)
    break
  }

  return parts
}

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
      <div style={{ paddingTop: 128, paddingBottom: 80, textAlign: 'center', color: 'var(--gray-400)' }}>
        <div className="gold-divider-center" style={{ animation: 'preAnim 1s ease infinite' }} />
        <p>Carregando...</p>
      </div>
    )
  }

  if (!post) {
    if (slug?.startsWith('advogado-em-')) {
      window.location.href = `/cidade/${slug}`
      return null
    }
    return (
      <div style={{ paddingTop: 128, paddingBottom: 80, textAlign: 'center' }}>
        <SEO
          title="Artigo não encontrado | Will & Pereira Advocacia"
          description="Artigo não encontrado."
          canonical="https://willepereira-adv.vercel.app/blog"
        />
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.875rem', color: 'var(--navy)', marginBottom: 16 }}>Artigo não encontrado</h1>
        <Link to="/blog" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>Voltar ao blog</Link>
      </div>
    )
  }

  const related = allPosts.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 3)
  const pageUrl = `https://willepereira-adv.vercel.app/blog/${post.slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "url": pageUrl,
    "datePublished": post.date,
    "author": { "@type": "Person", "name": post.author },
    "publisher": { "@type": "Organization", "name": "Will & Pereira Advocacia", "url": "https://willepereira-adv.vercel.app" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl }
  }

  // Parse content
  const renderContent = () => {
    const lines = post.content.split('\n')
    const elements: React.ReactNode[] = []
    let headingCount = 0
    let inTable = false
    let tableRows: string[][] = []

    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <div key={`table-${elements.length}`} style={{ overflowX: 'auto', margin: '16px 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr>
                  {tableRows[0].map((cell, ci) => (
                    <th key={ci} style={{ padding: '10px 16px', textAlign: 'left', borderBottom: '2px solid var(--gold)', color: 'var(--navy)', fontWeight: 600, background: 'rgba(201,168,76,0.05)' }}>
                      {renderInlineMarkdown(cell.trim())}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(2).map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{ padding: '10px 16px', borderBottom: '1px solid var(--gray-200)', color: 'var(--gray-600)' }}>
                        {renderInlineMarkdown(cell.trim())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
        tableRows = []
        inTable = false
      }
    }

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]

      // Strip leading + prefix
      if (line.startsWith('+')) {
        line = line.slice(1)
      }

      // Horizontal rule
      if (line.trim() === '---' || line.trim() === '***' || line.trim() === '___') {
        flushTable()
        elements.push(<hr key={i} style={{ border: 'none', borderTop: '1px solid var(--gray-200)', margin: '24px 0' }} />)
        continue
      }

      // Table row
      if (line.includes('|') && line.trim().startsWith('|')) {
        const cells = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
        // Check if separator row
        if (cells.every(c => c.trim().match(/^[-:]+$/))) {
          continue
        }
        if (!inTable) inTable = true
        tableRows.push(cells)
        continue
      } else if (inTable) {
        flushTable()
      }

      // Empty line
      if (line.trim() === '') {
        elements.push(<div key={i} style={{ height: 8 }} />)
        continue
      }

      // H2
      if (line.startsWith('## ')) {
        headingCount++
        const h2 = <h2 key={i} style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--navy)', marginTop: 40, marginBottom: 16 }}>{line.slice(3)}</h2>
        elements.push(h2)
        if (headingCount % 3 === 0) {
          elements.push(<CTACard key={`cta-${i}`} category={post.category} compact />)
        }
        continue
      }

      // H3
      if (line.startsWith('### ')) {
        headingCount++
        elements.push(
          <h3 key={i} style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--navy)', marginTop: 32, marginBottom: 12 }}>{line.slice(4)}</h3>
        )
        continue
      }

      // H4
      if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={i} style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--navy)', marginTop: 24, marginBottom: 8 }}>{line.slice(5)}</h4>
        )
        continue
      }

      // Bold line
      if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(
          <p key={i} style={{ fontWeight: 600, color: 'var(--navy)', marginTop: 16, marginBottom: 8 }}>{line.slice(2, -2)}</p>
        )
        continue
      }

      // List item
      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6, paddingLeft: 8 }}>
            <span style={{ color: 'var(--gold)', fontWeight: 700, marginTop: 2, flexShrink: 0 }}>•</span>
            <span style={{ color: 'var(--gray-600)', lineHeight: 1.6 }}>{renderInlineMarkdown(line.slice(2))}</span>
          </div>
        )
        continue
      }

      // Numbered list
      const numMatch = line.match(/^(\d+)\.\s+(.+)/)
      if (numMatch) {
        elements.push(
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8, paddingLeft: 8 }}>
            <span style={{ color: 'var(--gold)', fontWeight: 600, minWidth: 20, flexShrink: 0 }}>{numMatch[1]}.</span>
            <span style={{ color: 'var(--gray-600)', lineHeight: 1.6 }}>{renderInlineMarkdown(numMatch[2])}</span>
          </div>
        )
        continue
      }

      // Regular paragraph
      elements.push(
        <p key={i} style={{ color: 'var(--gray-600)', lineHeight: 1.75, marginBottom: 12 }}>{renderInlineMarkdown(line)}</p>
      )
    }

    flushTable()
    return elements
  }

  return (
    <>
      <SEO
        title={((): string => {
          const suffix = ' | Will & Pereira'
          const maxTitleLen = 60 - suffix.length
          const base = post.title.length > maxTitleLen
            ? post.title.substring(0, maxTitleLen).trimEnd()
            : post.title
          return base + suffix
        })()}
        description={post.description}
        canonical={`https://willepereira-adv.vercel.app/blog/${post.slug}`}
      />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      <div>
        {/* HERO */}
        <section style={{ position: 'relative', paddingTop: 128, paddingBottom: 64, background: 'var(--navy)', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 10, maxWidth: 896, margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--gold)', fontSize: '0.875rem', textDecoration: 'underline', marginBottom: 24 }}>
                <ArrowLeft size={14} /> Voltar ao Blog
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ padding: '4px 12px', background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 600, borderRadius: 9999 }}>
                  {post.category}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--gray-400)', fontSize: '0.75rem' }}>
                  <Calendar size={12} /> {post.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--gray-400)', fontSize: '0.75rem' }}>
                  <User size={12} /> {post.author}
                </span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.875rem, 4vw, 3rem)', color: 'white', lineHeight: 1.2 }}>
                {post.title}
              </h1>
              <p style={{ color: 'var(--gray-300)', marginTop: 16, maxWidth: 672 }}>{post.description}</p>
            </motion.div>
          </div>
        </section>

        {/* CONTENT */}
        <section style={{ padding: 48 }}>
          <div style={{ maxWidth: 896, margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)' }}>
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {renderContent()}
            </motion.article>

            {/* CTA */}
            <div style={{ marginTop: 48, background: 'var(--cream)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--navy)', marginBottom: 8 }}>Precisa de Ajuda Jurídica?</h3>
              <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Entre em contato com nossa equipe para orientação jurídica.</p>
              <Link
                to="/contato"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: 'var(--gold)', color: 'var(--navy-dark)', fontWeight: 600, borderRadius: 9999, textDecoration: 'none', boxShadow: '0 10px 15px -3px rgba(201,168,76,0.2)' }}
              >
                Fale Conosco <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* RELATED */}
        {related.length > 0 && (
          <section style={{ padding: 48, background: 'var(--cream)' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--navy)', marginBottom: 32 }}>Artigos Relacionados</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                {related.map(r => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    style={{ background: 'white', borderRadius: 12, padding: 24, textDecoration: 'none', transition: 'all 0.3s' }}
                  >
                    <span style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 600 }}>{r.category}</span>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--navy)', marginTop: 8, marginBottom: 8 }}>{r.title}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{r.date}</span>
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
