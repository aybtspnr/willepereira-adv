import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

interface TextRevealProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
  stagger?: number
  mode?: 'words' | 'chars' | 'lines'
}

const lineVariants: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: 0.1 + i * 0.04,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

const wordVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.1 + i * 0.03,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

const charVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 0.05 + i * 0.015,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

const Tag = ({ as, children, className }: { as: string; children: React.ReactNode; className?: string }) => {
  const TagName = as as keyof JSX.IntrinsicElements
  return <TagName className={className}>{children}</TagName>
}

export default function TextReveal({ text, as = 'p', className = '', delay = 0, mode = 'words' }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  if (mode === 'lines') {
    const lines = text.split('\n')
    return (
      <div ref={ref} className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              custom={i}
              variants={lineVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              style={{ display: 'block' }}
            >
              {line || '\u00A0'}
            </motion.span>
          </span>
        ))}
      </div>
    )
  }

  if (mode === 'chars') {
    const chars = text.split('')
    return (
      <Tag as={as} className={className}>
        <span ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
          {chars.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={charVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
      </Tag>
    )
  }

  // Words mode (default)
  const words = text.split(' ')
  return (
    <Tag as={as} className={className}>
      <span ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </Tag>
  )
}
