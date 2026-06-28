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

import { previdenciarioPosts } from './blog/posts-previdenciario'
import { trabalhistaPosts } from './blog/posts-trabalhista'
import { geralPosts } from './blog/posts-geral'

const posts: BlogPost[] = [
  ...previdenciarioPosts,
  ...trabalhistaPosts,
  ...geralPosts,
]

export function getAllPosts(): BlogPost[] {
  return posts
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug)
}
