import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import AnimatedPage from './components/AnimatedPage'

const HomePage = lazy(() => import('./pages/HomePage'))
const ServicosPage = lazy(() => import('./pages/ServicosPage'))
const DireitoPrevidenciario = lazy(() => import('./pages/DireitoPrevidenciario'))
const DireitoTrabalhista = lazy(() => import('./pages/DireitoTrabalhista'))
const DireitoCivelPage = lazy(() => import('./pages/DireitoCivel'))
const DireitoImobiliario = lazy(() => import('./pages/DireitoImobiliario'))
const DireitoFamilia = lazy(() => import('./pages/DireitoFamilia'))
const DireitoConsumidor = lazy(() => import('./pages/DireitoConsumidor'))
const ContatoPage = lazy(() => import('./pages/ContatoPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))

function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', color: 'var(--gray-400)', fontSize: '14px'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div className="gold-divider-center" style={{ animation: 'preAnim 1s ease infinite' }} />
        <p>Carregando...</p>
      </div>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
            <Route path="/servicos" element={<AnimatedPage><ServicosPage /></AnimatedPage>} />
            <Route path="/previdenciario" element={<AnimatedPage><DireitoPrevidenciario /></AnimatedPage>} />
            <Route path="/trabalhista" element={<AnimatedPage><DireitoTrabalhista /></AnimatedPage>} />
            <Route path="/civel" element={<AnimatedPage><DireitoCivelPage /></AnimatedPage>} />
            <Route path="/familia" element={<AnimatedPage><DireitoFamilia /></AnimatedPage>} />
            <Route path="/consumidor" element={<AnimatedPage><DireitoConsumidor /></AnimatedPage>} />
            <Route path="/imobiliario" element={<AnimatedPage><DireitoImobiliario /></AnimatedPage>} />
            <Route path="/contato" element={<AnimatedPage><ContatoPage /></AnimatedPage>} />
            <Route path="/blog" element={<AnimatedPage><BlogPage /></AnimatedPage>} />
            <Route path="/blog/:slug" element={<AnimatedPage><BlogPostPage /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Layout>
  )
}
