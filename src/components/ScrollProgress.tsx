import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`
      }
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="progress-bar">
      <div
        ref={barRef}
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
        }}
      />
    </div>
  )
}
