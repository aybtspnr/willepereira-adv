import type { ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as any } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
}

export default function AnimatedPage({ children }: { children: ReactNode }) {
  const location = useLocation()
  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  )
}
