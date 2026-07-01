import { useLocation, Link } from 'react-router-dom'

/* ═══ Route label map ═══ */
const routeLabels: Record<string, string> = {
  '/': 'Início',
  '/servicos': 'Serviços',
  '/previdenciario': 'Direito Previdenciário',
  '/trabalhista': 'Direito Trabalhista',
  '/civel': 'Direito Cível',
  '/consumidor': 'Direito do Consumidor',
  '/familia': 'Direito de Família',
  '/imobiliario': 'Direito Imobiliário',
  '/contato': 'Contato',
  '/blog': 'Blog',
  '/escritorio': 'Escritório',
  '/termos': 'Termos de Uso',
  '/privacidade': 'Política de Privacidade',
}

interface BreadcrumbProps {
  /** Optional custom items — overrides auto-detection */
  items?: Array<{ label: string; path: string }>
  /** City name for /cidade/:slug pages */
  cityName?: string
  /** Blog post title */
  postTitle?: string
}

export default function Breadcrumb({ items, cityName, postTitle }: BreadcrumbProps) {
  const { pathname } = useLocation()

  /* Build breadcrumb items from current path */
  const crumbs = items || buildCrumbs(pathname, cityName, postTitle)

  if (crumbs.length <= 1) return null // Don't show on home

  /* ═══ Schema JSON-LD ═══ */
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      item: `https://willepereira-adv.vercel.app${crumb.path}`,
    })),
  }

  return (
    <>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Visual breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        style={{
          padding: '12px 0',
          background: 'var(--cream)',
          borderBottom: '1px solid rgba(201,168,76,0.1)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 clamp(24px, 5vw, 48px)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.8rem',
            color: 'var(--gray-500)',
            flexWrap: 'wrap',
          }}
        >
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1
            return (
              <span key={crumb.path} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {i > 0 && (
                  <span style={{ color: 'var(--gray-400)', fontSize: '0.7rem' }}>›</span>
                )}
                {isLast ? (
                  <span style={{ color: 'var(--navy)', fontWeight: 500 }}>{crumb.label}</span>
                ) : (
                  <Link
                    to={crumb.path}
                    style={{
                      color: 'var(--gold)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-light)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--gold)')}
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            )
          })}
        </div>
      </nav>
    </>
  )
}

/* ═══ Build crumbs from pathname ═══ */
function buildCrumbs(
  pathname: string,
  cityName?: string,
  postTitle?: string,
): Array<{ label: string; path: string }> {
  const crumbs: Array<{ label: string; path: string }> = [
    { label: 'Início', path: '/' },
  ]

  const segments = pathname.split('/').filter(Boolean)

  if (segments[0] === 'cidade' && cityName) {
    crumbs.push({ label: 'Cidades', path: '/blog' })
    crumbs.push({ label: cityName, path: pathname })
  } else if (segments[0] === 'blog' && segments.length > 1 && postTitle) {
    crumbs.push({ label: 'Blog', path: '/blog' })
    crumbs.push({ label: postTitle.length > 40 ? postTitle.substring(0, 40) + '...' : postTitle, path: pathname })
  } else if (segments[0] === 'blog') {
    crumbs.push({ label: 'Blog', path: '/blog' })
  } else {
    const path = '/' + segments[0]
    const label = routeLabels[path]
    if (label) {
      crumbs.push({ label, path })
    }
  }

  return crumbs
}
