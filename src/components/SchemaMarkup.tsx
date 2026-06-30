/**
 * Schema Markup — Will & Pereira Advocacia
 * Gera JSON-LD estruturado para todas as páginas
 */
export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Will & Pereira Advocacia",
    "url": "https://willepereira-adv.vercel.app",
    "telephone": "+5548988420867",
    "email": "contato@willepereira.adv.br",
    "description": "Advocacia especializada em Direito Previdenciário, Trabalhista, Cível, Consumidor, Família e Imobiliário. Mais de 15 anos de experiência.",
    "foundingDate": "2010",
    "numberOfEmployees": "5",
    "areaServed": [
      { "@type": "Country", "name": "Brasil" },
      { "@type": "State", "name": "Santa Catarina" }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Najla Carone Guedert, 1080",
      "addressLocality": "Palhoça",
      "addressRegion": "SC",
      "postalCode": "88130-000",
      "addressCountry": "BR"
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    "image": "https://willepereira-adv.vercel.app/og-image.jpg",
    "sameAs": [
      "https://willepereira-adv.vercel.app"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços Jurídicos",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Direito Previdenciário",
            "description": "Aposentadorias, pensões, auxílio-doença, BPC-LOAS, revisões e planejamento previdenciário."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Direito Trabalhista",
            "description": "Verbas rescisórias, horas extras, FGTS, assédio moral, acidente de trabalho e defesa empresarial."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Direito Cível",
            "description": "Contratos, indenizações, cobranças, usucapião, responsabilidade civil e sucessões."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Direito do Consumidor",
            "description": "Produtos com defeito, cobrança indevida, planos de saúde, serviços bancários e cláusulas abusivas."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Direito de Família",
            "description": "Divórcio, guarda de filhos, pensão alimentícia, união estável, inventário e planejamento sucessório."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Direito Imobiliário",
            "description": "Compra e venda, locação, financiamento, regularização de imóveis e questões condominiais."
          }
        }
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  )
}
