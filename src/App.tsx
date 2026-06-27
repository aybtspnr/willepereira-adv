import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import AnimatedPage from './components/AnimatedPage'
import HomePage from './pages/HomePage'
import ServicosPage from './pages/ServicosPage'
import DireitoPrevidenciario from './pages/DireitoPrevidenciario'
import DireitoTrabalhista from './pages/DireitoTrabalhista'
import DireitoCivelPage from './pages/DireitoCivel'
import DireitoImobiliario from './pages/DireitoImobiliario'
import DireitoFamilia from './pages/DireitoFamilia'
import DireitoConsumidor from './pages/DireitoConsumidor'
import ContatoPage from './pages/ContatoPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'

export default function App() {
  const location = useLocation()

  return (
    <Layout>
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
    </Layout>
  )
}
