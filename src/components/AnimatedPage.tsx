import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function AnimatedPage({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Trigger entrance animation on mount
    requestAnimationFrame(() => setVisible(true))
  }, [])

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }}
    >
      {children}
    </div>
  )
}
