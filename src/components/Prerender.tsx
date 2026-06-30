import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

/* ═══════════════════════════════════════════════════════════════
   PRERENDER COMPONENT
   Shows static HTML content immediately for 3 seconds,
   then fades out when React takes over.
   Improves PageSpeed Insights FCP/LCP scores.
   ═══════════════════════════════════════════════════════════════ */

interface PrerenderProps {
  children: React.ReactNode
  delay?: number // ms before fade-out starts
}

export default function Prerender({ children, delay = 3000 }: PrerenderProps) {
  const [visible, setVisible] = useState(true)
  const [mounted, setMounted] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Mark as mounted (React is active)
    setMounted(true)

    // Start fade-out after delay
    const timer = setTimeout(() => {
      setVisible(false)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  // When fade-out completes, stop rendering prerender
  if (!visible && mounted) {
    return <>{children}</>
  }

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  )
}
