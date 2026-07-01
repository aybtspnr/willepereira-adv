import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calculator, ArrowRight, Clock, DollarSign, Scale, TrendingUp } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'

const calculadoras = [
  {
    id: 'fgts',
    title: 'FGTS',
    description: 'Calcule sua multa rescisória do FGTS',
    icon: DollarSign,
    color: '#10b981',
  },
  {
    id: 'horas-extras',
    title: 'Horas Extras',
    description: 'Calcule o valor das suas horas extras',
    icon: Clock,
    color: '#3b82f6',
  },
  {
    id: 'descontos',
    title: 'Descontos Salariais',
    description: 'Verifique se seus descontos estão corretos',
    icon: TrendingUp,
    color: '#8b5cf6',
  },
  {
    id: 'indenizacao',
    title: 'Indenização Trabalhista',
    description: 'Estime sua indenização por demissão',
    icon: Scale,
    color: '#f59e0b',
  },
]

export default function CalculadorasPage() {
  const [activeCalc, setActiveCalc] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    if (activeCalc === 'fgts') {
      const salario = parseFloat(formData.salario || '0')
      const meses = parseInt(formData.meses || '0')
      const multa = salario * meses * 0.4
      setResult(multa)
    } else if (activeCalc === 'horas-extras') {
      const salario = parseFloat(formData.salario || '0')
      const horas = parseFloat(formData.horas || '0')
      const valorHora = salario / 220
      const valorHoraExtra = valorHora * 1.5
      setResult(horas * valorHoraExtra)
    } else if (activeCalc === 'descontos') {
      const salario = parseFloat(formData.salario || '0')
      const descontos = parseFloat(formData.descontos || '0')
      const inss = salario * 0.075
      const irpf = salario > 1903.98 ? salario * 0.075 : 0
      const totalDescontos = inss + irpf
      const diferenca = descontos - totalDescontos
      setResult(diferenca)
    } else if (activeCalc === 'indenizacao') {
      const salario = parseFloat(formData.salario || '0')
      const meses = parseInt(formData.meses || '0')
      const aviso = formData.aviso === 'sim' ? 1 : 0
      const indenizacao = (salario * meses) + (aviso * salario)
      setResult(indenizacao)
    }
  }

  const resetCalc = () => {
    setFormData({})
    setResult(null)
  }

  return (
    <div>
      <SEO
        title="Calculadoras Jurídicas | Will & Pereira Advocacia"
        description="Calcule FGTS, horas extras, descontos salariais e indenizações trabalhistas. Ferramentas jurídicas gratuitas da Will & Pereira Advocacia."
        canonical="https://willepereira-adv.vercel.app/calculadoras"
      />
      <Breadcrumb />

      {/* Hero */}
      <section style={{ 
        padding: '120px 0 60px', 
        background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          backgroundImage: 'radial-gradient(circle at 2px 2px, var(--gold) 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 12,
              fontSize: '0.75rem', 
              fontWeight: 600, 
              letterSpacing: '0.2em',
              textTransform: 'uppercase', 
              color: 'var(--gold)',
              marginBottom: 16,
            }}>
              <Calculator size={14} />
              Ferramentas Jurídicas
            </span>
            <h1 style={{ 
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--cream)',
              marginBottom: 16,
              lineHeight: 1.1,
            }}>
              Calculadoras Jurídicas
            </h1>
            <p style={{ 
              color: 'var(--gray-400)', 
              fontSize: '1.1rem',
              maxWidth: 600,
              margin: '0 auto',
            }}>
              Ferramentas gratuitas para estimar seus direitos trabalhistas e previdenciários.
            </p>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section style={{ padding: '80px 0', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {calculadoras.map((calc) => {
              const Icon = calc.icon
              const isActive = activeCalc === calc.id
              return (
                <motion.button
                  key={calc.id}
                  onClick={() => { setActiveCalc(isActive ? null : calc.id); resetCalc(); }}
                  whileHover={{ y: -4 }}
                  style={{
                    background: 'var(--white)',
                    borderRadius: 16,
                    padding: 32,
                    border: `2px solid ${isActive ? calc.color : 'rgba(26,38,52,0.06)'}`,
                    boxShadow: isActive ? `0 12px 32px ${calc.color}20` : '0 2px 8px rgba(0,0,0,0.02)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s',
                  }}
                >
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${calc.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}>
                    <Icon size={24} style={{ color: calc.color }} />
                  </div>
                  <h3 style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    color: 'var(--navy)',
                    marginBottom: 8,
                  }}>
                    {calc.title}
                  </h3>
                  <p style={{ 
                    color: 'var(--gray-500)', 
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                  }}>
                    {calc.description}
                  </p>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Calculator Form */}
      {activeCalc && (
        <section style={{ padding: '60px 0', background: 'var(--white)' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)' }}>
            <div style={{
              background: 'var(--cream)',
              borderRadius: 16,
              padding: 32,
              border: '1px solid rgba(201,168,76,0.2)',
            }}>
              <h2 style={{ 
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                color: 'var(--navy)',
                marginBottom: 24,
                textAlign: 'center',
              }}>
                {calculadoras.find(c => c.id === activeCalc)?.title}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {activeCalc === 'fgts' && (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: 8 }}>
                        Salário Mensal (R$)
                      </label>
                      <input
                        type="number"
                        value={formData.salario || ''}
                        onChange={e => setFormData({ ...formData, salario: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          border: '1px solid var(--gray-200)',
                          borderRadius: 12,
                          fontSize: '1rem',
                        }}
                        placeholder="Ex: 3000"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: 8 }}>
                        Meses Trabalhados
                      </label>
                      <input
                        type="number"
                        value={formData.meses || ''}
                        onChange={e => setFormData({ ...formData, meses: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          border: '1px solid var(--gray-200)',
                          borderRadius: 12,
                          fontSize: '1rem',
                        }}
                        placeholder="Ex: 24"
                      />
                    </div>
                  </>
                )}

                {activeCalc === 'horas-extras' && (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: 8 }}>
                        Salário Mensal (R$)
                      </label>
                      <input
                        type="number"
                        value={formData.salario || ''}
                        onChange={e => setFormData({ ...formData, salario: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          border: '1px solid var(--gray-200)',
                          borderRadius: 12,
                          fontSize: '1rem',
                        }}
                        placeholder="Ex: 3000"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: 8 }}>
                        Horas Extras no Mês
                      </label>
                      <input
                        type="number"
                        value={formData.horas || ''}
                        onChange={e => setFormData({ ...formData, horas: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          border: '1px solid var(--gray-200)',
                          borderRadius: 12,
                          fontSize: '1rem',
                        }}
                        placeholder="Ex: 20"
                      />
                    </div>
                  </>
                )}

                {activeCalc === 'descontos' && (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: 8 }}>
                        Salário Bruto (R$)
                      </label>
                      <input
                        type="number"
                        value={formData.salario || ''}
                        onChange={e => setFormData({ ...formData, salario: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          border: '1px solid var(--gray-200)',
                          borderRadius: 12,
                          fontSize: '1rem',
                        }}
                        placeholder="Ex: 5000"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: 8 }}>
                        Total Descontado (R$)
                      </label>
                      <input
                        type="number"
                        value={formData.descontos || ''}
                        onChange={e => setFormData({ ...formData, descontos: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          border: '1px solid var(--gray-200)',
                          borderRadius: 12,
                          fontSize: '1rem',
                        }}
                        placeholder="Ex: 800"
                      />
                    </div>
                  </>
                )}

                {activeCalc === 'indenizacao' && (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: 8 }}>
                        Salário Mensal (R$)
                      </label>
                      <input
                        type="number"
                        value={formData.salario || ''}
                        onChange={e => setFormData({ ...formData, salario: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          border: '1px solid var(--gray-200)',
                          borderRadius: 12,
                          fontSize: '1rem',
                        }}
                        placeholder="Ex: 3000"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: 8 }}>
                        Meses Trabalhados
                      </label>
                      <input
                        type="number"
                        value={formData.meses || ''}
                        onChange={e => setFormData({ ...formData, meses: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          border: '1px solid var(--gray-200)',
                          borderRadius: 12,
                          fontSize: '1rem',
                        }}
                        placeholder="Ex: 36"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: 8 }}>
                        Aviso Prévio Indenizado?
                      </label>
                      <select
                        value={formData.aviso || ''}
                        onChange={e => setFormData({ ...formData, aviso: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          border: '1px solid var(--gray-200)',
                          borderRadius: 12,
                          fontSize: '1rem',
                          background: 'var(--white)',
                        }}
                      >
                        <option value="">Selecione</option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                      </select>
                    </div>
                  </>
                )}

                <button
                  onClick={calculate}
                  style={{
                    width: '100%',
                    padding: '14px 32px',
                    background: 'var(--gold)',
                    color: 'var(--navy-dark)',
                    borderRadius: 9999,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <Calculator size={16} />
                  Calcular
                </button>
              </div>

              {/* Result */}
              {result !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: 24,
                    padding: 24,
                    background: activeCalc === 'descontos' && result < 0 
                      ? 'rgba(239,68,68,0.1)' 
                      : 'rgba(16,185,129,0.1)',
                    borderRadius: 12,
                    textAlign: 'center',
                  }}
                >
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--gray-500)',
                    marginBottom: 8,
                  }}>
                    {activeCalc === 'descontos' 
                      ? (result < 0 ? 'Descontos indevidos estimados' : 'Descontos corretos')
                      : 'Valor estimado'
                    }
                  </p>
                  <p style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    color: activeCalc === 'descontos' && result < 0 ? '#ef4444' : '#10b981',
                    fontWeight: 400,
                  }}>
                    R$ {result.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Disclaimer */}
            <p style={{ 
              marginTop: 24, 
              fontSize: '0.75rem', 
              color: 'var(--gray-400)',
              textAlign: 'center',
              lineHeight: 1.6,
            }}>
              * Cálculos estimados para fins informativos. Para orientação jurídica personalizada, entre em contato.
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ 
        padding: '80px 0', 
        background: 'var(--navy-dark)',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          background: 'radial-gradient(circle at 50% 50%, var(--gold), transparent)',
        }} />
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: 'var(--cream)',
            marginBottom: 16,
          }}>
            Precisa de orientação jurídica?
          </h2>
          <p style={{ color: 'var(--gray-400)', marginBottom: 32, fontSize: '1.1rem' }}>
            Nossa equipe está pronta para analisar seu caso.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/contato"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 32px',
                background: 'var(--gold)',
                color: 'var(--navy-dark)',
                borderRadius: 9999,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Fale Conosco <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/5548984584181"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 32px',
                background: 'transparent',
                color: 'var(--white)',
                borderRadius: 9999,
                fontWeight: 600,
                border: '1.5px solid rgba(255,255,255,0.2)',
                textDecoration: 'none',
              }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
