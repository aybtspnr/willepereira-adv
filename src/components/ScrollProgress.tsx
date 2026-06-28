import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="progress-bar"
      style={{ scaleX: scrollYProgress }}
    >
      <div style={{ height: '100%', background: 'linear-gradient(90deg, var(--gold), var(--gold-light))', transformOrigin: 'left' }} />
    </motion.div>
  )
}