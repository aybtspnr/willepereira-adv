import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: number
  color?: string
  text?: string
}

export function LoadingSpinner({ size = 40, color = 'var(--gold)', text }: LoadingSpinnerProps) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: 48,
      gap: 16,
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{
          width: size,
          height: size,
          border: `3px solid rgba(201,168,76,0.2)`,
          borderTopColor: color,
          borderRadius: '50%',
        }}
      />
      {text && (
        <p style={{ 
          color: 'var(--gray-500)', 
          fontSize: '0.875rem',
          marginTop: 8,
        }}>
          {text}
        </p>
      )}
    </div>
  )
}

interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: number
  style?: React.CSSProperties
}

export function Skeleton({ width = '100%', height = 20, borderRadius = 8, style }: SkeletonProps) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, var(--gray-200) 25%, var(--gray-100) 50%, var(--gray-200) 75%)',
        backgroundSize: '200% 100%',
        ...style,
      }}
    />
  )
}

export function CardSkeleton() {
  return (
    <div style={{
      background: 'var(--white)',
      borderRadius: 16,
      padding: 24,
      border: '1px solid var(--gray-200)',
    }}>
      <Skeleton height={180} borderRadius={12} style={{ marginBottom: 16 }} />
      <Skeleton width="60%" height={16} style={{ marginBottom: 8 }} />
      <Skeleton width="100%" height={14} style={{ marginBottom: 8 }} />
      <Skeleton width="80%" height={14} />
    </div>
  )
}

export function PageLoader() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--cream)',
      zIndex: 9999,
    }}>
      <LoadingSpinner size={48} text="Carregando..." />
    </div>
  )
}
