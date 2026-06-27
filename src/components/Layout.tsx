import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'

/* ═══ JSON-LD Structured Data ═══ */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Will & Pereira Advocacia',
      url: 'https://willepereira-adv.vercel.app',
      logo: 'https://willepereira-adv.vercel.app/logo-horizontal.png',
      description: 'Escritório de advocacia premium com mais de 15 anos de experiência em Palhoça/SC, atendendo todo o Brasil.',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+5548988420867',
        contactType: 'customer service',
        email: 'contato@willepereira.adv.br',
        availableLanguage: ['Portuguese'],
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua Najla Carone Guedert, 1080',
        addressLocality: 'Palhoça',
        addressRegion: 'SC',
        postalCode: '88132-150',
        addressCountry: 'BR',
      },
    },
    {
      '@type': 'LegalService',
      name: 'Will & Pereira Advocacia',
      url: 'https://willepereira-adv.vercel.app',
      image: 'https://willepereira-adv.vercel.app/logo-horizontal.png',
      areaServed: 'BR',
      description: 'Advocacia especializada em Direito Previdenciário, Trabalhista, Cível, Consumidor, Família e Imobiliário.',
      foundingDate: '2011',
      legalName: 'Will & Pereira Advocacia',
      numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 5, maxValue: 20 },
      priceRange: '$$',
      telephone: '+5548988420867',
      email: 'contato@willepereira.adv.br',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua Najla Carone Guedert, 1080',
        addressLocality: 'Palhoça',
        addressRegion: 'SC',
        postalCode: '88132-150',
        addressCountry: 'BR',
      },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
      ],
    },
  ],
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ScrollProgress />
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  )
}
