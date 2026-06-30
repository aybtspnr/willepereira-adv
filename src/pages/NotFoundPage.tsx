import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--navy-dark)' }}>
      <div className="container text-center px-4">
        <div style={{ marginBottom: '24px' }}>
          <span
            className="text-8xl font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
            }}
          >
            404
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: 'var(--cream)' }}>
          Página não encontrada
        </h1>

        <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'var(--gray-400)' }}>
          O link que você acessou pode ter sido removido, alterado ou está temporariamente indisponível.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn btn-gold inline-flex items-center justify-center gap-2"
          >
            <Home size={16} />
            Voltar ao Início
          </Link>
          <Link
            to="/contato"
            className="btn btn-outline inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Fale Conosco
          </Link>
        </div>
      </div>
    </div>
  )
}
