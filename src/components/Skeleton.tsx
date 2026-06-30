export function SkeletonCard() {
  return (
    <div style={{
      background: 'var(--white)',
      borderRadius: '16px',
      padding: '32px',
      border: '1px solid rgba(26,38,52,0.04)',
    }}>
      <div className="skeleton-line" style={{ width: '40%', height: '12px', marginBottom: '16px' }} />
      <div className="skeleton-line" style={{ width: '100%', height: '16px', marginBottom: '8px' }} />
      <div className="skeleton-line" style={{ width: '80%', height: '16px', marginBottom: '16px' }} />
      <div className="skeleton-line" style={{ width: '60%', height: '12px' }} />
    </div>
  )
}

export function SkeletonHero() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--navy-dark)',
    }}>
      <div style={{ textAlign: 'center', width: '100%', maxWidth: '600px', padding: '0 24px' }}>
        <div className="skeleton-line" style={{ width: '120px', height: '12px', margin: '0 auto 24px', background: 'rgba(201,168,76,0.2)' }} />
        <div className="skeleton-line" style={{ width: '80%', height: '32px', margin: '0 auto 16px', background: 'rgba(255,255,255,0.1)' }} />
        <div className="skeleton-line" style={{ width: '60%', height: '32px', margin: '0 auto 24px', background: 'rgba(255,255,255,0.1)' }} />
        <div className="skeleton-line" style={{ width: '100%', height: '16px', margin: '0 auto 8px', background: 'rgba(255,255,255,0.05)' }} />
        <div className="skeleton-line" style={{ width: '90%', height: '16px', margin: '0 auto', background: 'rgba(255,255,255,0.05)' }} />
      </div>
    </div>
  )
}
