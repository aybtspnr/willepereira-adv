     1|import type { ReactNode } from 'react'
     2|import Navbar from './Navbar'
     3|import Footer from './Footer'
     4|import ScrollProgress from './ScrollProgress'
     5|
     6|/* ═══ JSON-LD Structured Data ═══ */
     7|const structuredData = {
     8|  '@context': 'https://schema.org',
     9|  '@graph': [
    10|    {
    11|      '@type': 'Organization',
    12|      name: 'Will & Pereira Advocacia',
    13|      url: 'https://willepereira-adv.vercel.app',
    14|      logo: 'https://willepereira-adv.vercel.app/logo-horizontal.png',
    15|      description: 'Escritório de advocacia premium com mais de 15 anos de experiência em Palhoça/SC, atendendo todo o Brasil.',
    16|      contactPoint: {
    17|        '@type': 'ContactPoint',
    18|        telephone: '+5548988420867',
    19|        contactType: 'customer service',
    20|        email: 'contato@willepereira.adv.br',
    21|        availableLanguage: ['Portuguese'],
    22|      },
    23|      address: {
    24|        '@type': 'PostalAddress',
    25|        streetAddress: 'Rua Najla Carone Guedert, 1080',
    26|        addressLocality: 'Palhoça',
    27|        addressRegion: 'SC',
    28|        postalCode: '88132-150',
    29|        addressCountry: 'BR',
    30|      },
    31|    },
    32|    {
    33|      '@type': 'LegalService',
    34|      name: 'Will & Pereira Advocacia',
    35|      url: 'https://willepereira-adv.vercel.app',
    36|      image: 'https://willepereira-adv.vercel.app/logo-horizontal.png',
    37|      areaServed: 'BR',
    38|      description: 'Advocacia especializada em Direito Previdenciário, Trabalhista, Cível, Consumidor, Família e Imobiliário.',
    39|      foundingDate: '2011',
    40|      legalName: 'Will & Pereira Advocacia',
    41|      numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 5, maxValue: 20 },
    42|      priceRange: '$$',
    43|      telephone: '+5548988420867',
    44|      email: 'contato@willepereira.adv.br',
    45|      address: {
    46|        '@type': 'PostalAddress',
    47|        streetAddress: 'Rua Najla Carone Guedert, 1080',
    48|        addressLocality: 'Palhoça',
    49|        addressRegion: 'SC',
    50|        postalCode: '88132-150',
    51|        addressCountry: 'BR',
    52|      },
    53|      openingHoursSpecification: [
    54|        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    55|      ],
    56|    },
    57|  ],
    58|}
    59|
    60|export default function Layout({ children }: { children: ReactNode }) {
    61|  return (
    62|    <div className="min-h-screen flex flex-col" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    63|      <script
    64|        type="application/ld+json"
    65|        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    66|      />
    67|      <ScrollProgress />
    68|      <Navbar />
    69|      <main style={{ flex: 1 }}>{children}</main>
    70|      <Footer />
    71|    </div>
    72|  )
    73|}
    74|