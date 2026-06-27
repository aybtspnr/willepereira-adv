import { useEffect } from 'react'

export function useSEO(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} | Will & Pereira Advocacia`

    const meta = document.querySelector('meta[name="description"]') || (() => {
      const el = document.createElement('meta')
      el.name = 'description'
      document.head.appendChild(el)
      return el
    })()
    meta.content = description
  }, [title, description])
}
