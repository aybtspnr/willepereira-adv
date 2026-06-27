     1|     1|import type { ReactNode } from 'react'
     2|     2|import Navbar from './Navbar'
     3|     3|import Footer from './Footer'
     4|     4|import ScrollProgress from './ScrollProgress'
     5|     5|
     6|     6|/* ═══ JSON-LD Structured Data ═══ */
     7|     7|const structuredData = {
     8|     8|  '@context': 'https://schema.org',
     9|     9|  '@graph': [
    10|    10|    {
    11|    11|      '@type': 'Organization',
    12|    12|      name: 'Will & Pereira Advocacia',
    13|    13|      url: 'https://willepereira-adv.vercel.app',
    14|    14|      logo: 'https://willepereira-adv.vercel.app/logo-horizontal.png',
    15|    15|      description: 'Escritório de advocacia premium com mais de 15 anos de experiência em Palhoça/SC, atendendo todo o Brasil.',
    16|    16|      contactPoint: {
    17|    17|        '@type': 'ContactPoint',
    18|    18|        telephone: '+5548988420867',
    19|    19|        contactType: 'customer service',
    20|    20|        email: 'contato@willepereira.adv.br',
    21|    21|        availableLanguage: ['Portuguese'],
    22|    22|      },
    23|    23|      address: {
    24|    24|        '@type': 'PostalAddress',
    25|    25|        streetAddress: 'Rua Najla Carone Guedert, 1080',
    26|    26|        addressLocality: 'Palhoça',
    27|    27|        addressRegion: 'SC',
    28|    28|        postalCode: '88132-150',
    29|    29|        addressCountry: 'BR',
    30|    30|      },
    31|    31|    },
    32|    32|    {
    33|    33|      '@type': 'LegalService',
    34|    34|      name: 'Will & Pereira Advocacia',
    35|    35|      url: 'https://willepereira-adv.vercel.app',
    36|    36|      image: 'https://willepereira-adv.vercel.app/logo-horizontal.png',
    37|    37|      areaServed: 'BR',
    38|    38|      description: 'Advocacia especializada em Direito Previdenciário, Trabalhista, Cível, Consumidor, Família e Imobiliário.',
    39|    39|      foundingDate: '2011',
    40|    40|      legalName: 'Will & Pereira Advocacia',
    41|    41|      numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 5, maxValue: 20 },
    42|    42|      priceRange: '$$',
    43|    43|      telephone: '+5548988420867',
    44|    44|      email: 'contato@willepereira.adv.br',
    45|    45|      address: {
    46|    46|        '@type': 'PostalAddress',
    47|    47|        streetAddress: 'Rua Najla Carone Guedert, 1080',
    48|    48|        addressLocality: 'Palhoça',
    49|    49|        addressRegion: 'SC',
    50|    50|        postalCode: '88132-150',
    51|    51|        addressCountry: 'BR',
    52|    52|      },
    53|    53|      openingHoursSpecification: [
    54|    54|        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    55|    55|      ],
    56|    56|    },
    57|    57|  ],
    58|    58|}
    59|    59|
    60|    60|export default function Layout({ children }: { children: ReactNode }) {
    61|    61|  return (
    62|    62|    <div className="min-h-screen flex flex-col" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    63|    63|      <script
    64|    64|        type="application/ld+json"
    65|    65|        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    66|    66|      />
    67|    67|      <ScrollProgress />
    68|    68|      <Navbar />
    69|    69|      <main style={{ flex: 1 }}>{children}</main>
    70|    70|      <Footer />
    71|    71|    </div>
    72|    72|  )
    73|    73|}
    74|    74|