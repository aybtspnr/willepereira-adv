import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

// Hide preloader when app mounts
const preloader = document.getElementById('preloader')
if (preloader) {
  setTimeout(() => {
    preloader.classList.add('hidden')
    setTimeout(() => preloader.remove(), 800)
  }, 2000)
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
