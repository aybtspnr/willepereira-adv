export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  category: string
  date: string
  author: string
  image?: string
}

let _posts: BlogPost[] | null = null

async function loadPosts(): Promise<BlogPost[]> {
  if (_posts) return _posts
  const [previdenciario, trabalhista, geral, civil, consumidor, familia, imobiliario, cidades] = await Promise.all([
    import('./blog/posts-previdenciario'),
    import('./blog/posts-trabalhista'),
    import('./blog/posts-geral'),
    import('./blog/posts-civel'),
    import('./blog/posts-consumidor'),
    import('./blog/posts-familia'),
    import('./blog/posts-imobiliario'),
    import('./blog/posts-cidades'),
  ])
  _posts = [
    ...previdenciario.previdenciarioPosts,
    ...trabalhista.trabalhistaPosts,
    ...geral.geralPosts,
    ...civil.civelPosts,
    ...consumidor.consumidorPosts,
    ...familia.familiaPosts,
    ...imobiliario.imobiliarioPosts,
    ...cidades.cidadesPosts,
  ].filter(Boolean)
  return _posts
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return loadPosts()
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await loadPosts()
  return posts.find(p => p.slug === slug)
}
