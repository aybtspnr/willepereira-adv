/**
 * Post-build prerender script
 * Generates static HTML for each route to improve PageSpeed Insights scores.
 * Each page gets its own HTML file with full content prerendered.
 * 
 * Usage: node scripts/prerender.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '../dist')

// Read the base index.html
const baseHtml = readFileSync(resolve(distDir, 'index.html'), 'utf-8')

// Route configs with unique SEO content
const routes = {
  '/': {
    title: 'Will & Pereira Advocacia | Escritório Jurídico Premium em Palhoça/SC',
    description: 'Escritório de advocacia premium com mais de 15 anos de experiência. Especializado em Direito Previdenciário, Trabalhista, Cível, Consumidor, Família e Imobiliário.',
    h1: 'Will & Pereira Advocacia',
    subtitle: 'Escritório Jurídico Premium em Palhoça/SC',
    body: `
      <section style="background:linear-gradient(135deg,#0f1729 0%,#1a2634 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:120px 24px 80px;">
        <div style="text-align:center;max-width:800px;">
          <span style="display:inline-block;padding:6px 16px;background:rgba(201,168,76,0.15);color:#c9a84c;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;border-radius:20px;margin-bottom:24px;">+15 Anos de Experiência</span>
          <h1 style="font-family:Georgia,serif;font-size:clamp(36px,6vw,64px);color:#faf8f5;line-height:1.1;margin:0 0 20px;">Defendendo Seus Direitos com Excelência</h1>
          <p style="color:#9ca3af;font-size:18px;line-height:1.7;margin:0 0 40px;max-width:600px;margin-left:auto;margin-right:auto;">Escritório especializado em Direito Previdenciário, Trabalhista, Cível, Consumidor, Família e Imobiliário. Atendimento em Palhoça/SC e todo o Brasil.</p>
          <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
            <a href="/contato" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#c9a84c,#d4b96a);color:#1a2634;font-weight:600;font-size:14px;border-radius:24px;text-decoration:none;">Fale Conosco</a>
            <a href="/servicos" style="display:inline-block;padding:14px 32px;border:1px solid rgba(201,168,76,0.3);color:#c9a84c;font-weight:600;font-size:14px;border-radius:24px;text-decoration:none;">Nossas Áreas</a>
          </div>
        </div>
      </section>
      <section style="padding:80px 24px;background:#faf8f5;">
        <div style="max-width:1000px;margin:0 auto;text-align:center;">
          <h2 style="font-family:Georgia,serif;font-size:28px;color:#1a2634;margin:0 0 16px;">Áreas de Atuação</h2>
          <p style="color:#6b7280;margin:0 0 48px;">Especializados em diversas áreas do direito para melhor atender você.</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">
            <div style="padding:32px;background:white;border-radius:16px;border:1px solid rgba(26,38,52,0.06);">
              <h3 style="font-family:Georgia,serif;color:#1a2634;margin:0 0 8px;">Direito Previdenciário</h3>
              <p style="color:#6b7280;font-size:14px;margin:0;">Aposentadorias, pensões, auxílio-doença, BPC-LOAS e revisões.</p>
            </div>
            <div style="padding:32px;background:white;border-radius:16px;border:1px solid rgba(26,38,52,0.06);">
              <h3 style="font-family:Georgia,serif;color:#1a2634;margin:0 0 8px;">Direito Trabalhista</h3>
              <p style="color:#6b7280;font-size:14px;margin:0;">Verbas rescisórias, horas extras, FGTS, assédio moral.</p>
            </div>
            <div style="padding:32px;background:white;border-radius:16px;border:1px solid rgba(26,38,52,0.06);">
              <h3 style="font-family:Georgia,serif;color:#1a2634;margin:0 0 8px;">Direito Cível</h3>
              <p style="color:#6b7280;font-size:14px;margin:0;">Contratos, indenizações, responsabilidade civil, usucapião.</p>
            </div>
            <div style="padding:32px;background:white;border-radius:16px;border:1px solid rgba(26,38,52,0.06);">
              <h3 style="font-family:Georgia,serif;color:#1a2634;margin:0 0 8px;">Direito do Consumidor</h3>
              <p style="color:#6b7280;font-size:14px;margin:0;">CDC, produtos defeituosos, cobrança indevida, planos de saúde.</p>
            </div>
            <div style="padding:32px;background:white;border-radius:16px;border:1px solid rgba(26,38,52,0.06);">
              <h3 style="font-family:Georgia,serif;color:#1a2634;margin:0 0 8px;">Direito de Família</h3>
              <p style="color:#6b7280;font-size:14px;margin:0;">Divórcio, guarda, pensão alimentícia, união estável.</p>
            </div>
            <div style="padding:32px;background:white;border-radius:16px;border:1px solid rgba(26,38,52,0.06);">
              <h3 style="font-family:Georgia,serif;color:#1a2634;margin:0 0 8px;">Direito Imobiliário</h3>
              <p style="color:#6b7280;font-size:14px;margin:0;">Compra e venda, locação, financiamento, condomínio.</p>
            </div>
          </div>
        </div>
      </section>
      <section style="padding:80px 24px;background:#1a2634;">
        <div style="max-width:600px;margin:0 auto;text-align:center;">
          <h2 style="font-family:Georgia,serif;font-size:28px;color:#faf8f5;margin:0 0 16px;">Entre em Contato</h2>
          <p style="color:#9ca3af;margin:0 0 32px;">Estamos prontos para ajudá-lo. Agende sua orientação jurídica.</p>
          <a href="/contato" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#c9a84c,#d4b96a);color:#1a2634;font-weight:600;font-size:14px;border-radius:24px;text-decoration:none;">Fale Conosco</a>
        </div>
      </section>`
  },
  '/servicos': {
    title: 'Áreas de Atuação | Will & Pereira Advocacia',
    description: 'Conheça todas as áreas de atuação da Will & Pereira Advocacia: Previdenciário, Trabalhista, Cível, Consumidor, Família e Imobiliário.',
    h1: 'Áreas de Atuação',
    subtitle: 'Especialização jurídica para proteger seus direitos',
    body: `<section style="background:linear-gradient(135deg,#0f1729 0%,#1a2634 100%);min-height:50vh;display:flex;align-items:center;justify-content:center;padding:120px 24px 60px;">
      <div style="text-align:center;max-width:600px;">
        <span style="display:inline-block;padding:6px 16px;background:rgba(201,168,76,0.15);color:#c9a84c;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;border-radius:20px;margin-bottom:24px;">Nossas Especialidades</span>
        <h1 style="font-family:Georgia,serif;font-size:clamp(32px,5vw,48px);color:#faf8f5;line-height:1.1;margin:0 0 16px;">Áreas de Atuação</h1>
        <p style="color:#9ca3af;font-size:16px;margin:0;">Atuamos em diversas áreas do direito para oferecer a melhor solução jurídica.</p>
      </div>
    </section>
    <section style="padding:80px 24px;background:#faf8f5;">
      <div style="max-width:1000px;margin:0 auto;">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:32px;">
          <a href="/previdenciario" style="padding:40px 32px;background:white;border-radius:16px;border:1px solid rgba(26,38,52,0.06);text-decoration:none;transition:all 0.3s;">
            <h2 style="font-family:Georgia,serif;color:#1a2634;margin:0 0 8px;font-size:22px;">Direito Previdenciário</h2>
            <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0;">Aposentadorias, pensões, auxílio-doença, BPC-LOAS e revisões de benefício.</p>
          </a>
          <a href="/trabalhista" style="padding:40px 32px;background:white;border-radius:16px;border:1px solid rgba(26,38,52,0.06);text-decoration:none;transition:all 0.3s;">
            <h2 style="font-family:Georgia,serif;color:#1a2634;margin:0 0 8px;font-size:22px;">Direito Trabalhista</h2>
            <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0;">Verbas rescisórias, horas extras, FGTS, assédio moral e mais.</p>
          </a>
          <a href="/civel" style="padding:40px 32px;background:white;border-radius:16px;border:1px solid rgba(26,38,52,0.06);text-decoration:none;transition:all 0.3s;">
            <h2 style="font-family:Georgia,serif;color:#1a2634;margin:0 0 8px;font-size:22px;">Direito Cível</h2>
            <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0;">Contratos, indenizações, responsabilidade civil, usucapião.</p>
          </a>
          <a href="/consumidor" style="padding:40px 32px;background:white;border-radius:16px;border:1px solid rgba(26,38,52,0.06);text-decoration:none;transition:all 0.3s;">
            <h2 style="font-family:Georgia,serif;color:#1a2634;margin:0 0 8px;font-size:22px;">Direito do Consumidor</h2>
            <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0;">CDC, produtos defeituosos, cobrança indevida, planos de saúde.</p>
          </a>
          <a href="/familia" style="padding:40px 32px;background:white;border-radius:16px;border:1px solid rgba(26,38,52,0.06);text-decoration:none;transition:all 0.3s;">
            <h2 style="font-family:Georgia,serif;color:#1a2634;margin:0 0 8px;font-size:22px;">Direito de Família</h2>
            <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0;">Divórcio, guarda, pensão alimentícia, união estável.</p>
          </a>
          <a href="/imobiliario" style="padding:40px 32px;background:white;border-radius:16px;border:1px solid rgba(26,38,52,0.06);text-decoration:none;transition:all 0.3s;">
            <h2 style="font-family:Georgia,serif;color:#1a2634;margin:0 0 8px;font-size:22px;">Direito Imobiliário</h2>
            <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0;">Compra e venda, locação, financiamento, condomínio.</p>
          </a>
        </div>
      </div>
    </section>`
  },
  '/contato': {
    title: 'Contato | Will & Pereira Advocacia',
    description: 'Entre em contato com a Will & Pereira Advocacia. Atendimento presencial em Palhoça/SC e online para todo o Brasil.',
    h1: 'Entre em Contato',
    subtitle: 'Estamos prontos para ajudá-lo',
    body: `<section style="background:linear-gradient(135deg,#0f1729 0%,#1a2634 100%);min-height:50vh;display:flex;align-items:center;justify-content:center;padding:120px 24px 60px;">
      <div style="text-align:center;max-width:600px;">
        <h1 style="font-family:Georgia,serif;font-size:clamp(32px,5vw,48px);color:#faf8f5;line-height:1.1;margin:0 0 16px;">Entre em Contato</h1>
        <p style="color:#9ca3af;font-size:16px;margin:0;">Agende sua orientação jurídica conosco.</p>
      </div>
    </section>
    <section style="padding:80px 24px;background:#faf8f5;">
      <div style="max-width:600px;margin:0 auto;text-align:center;">
        <div style="display:flex;flex-direction:column;gap:24px;align-items:center;">
          <a href="tel:+5548984584181" style="font-size:24px;color:#1a2634;text-decoration:none;font-weight:600;">📞 (48) 98458-4181</a>
          <a href="https://wa.me/5548984584181" style="font-size:18px;color:#25D366;text-decoration:none;font-weight:600;">💬 WhatsApp</a>
          <a href="mailto:advocacia@willepereira.adv.br" style="font-size:16px;color:#6b7280;text-decoration:none;">✉️ advocacia@willepereira.adv.br</a>
          <p style="color:#6b7280;font-size:14px;margin:0;">📍 Rua Najla Carone Guedert, 1080 — Palhoça/SC</p>
        </div>
      </div>
    </section>`
  },
  '/blog': {
    title: 'Blog Jurídico | Will & Pereira Advocacia',
    description: 'Artigos e informações sobre Direito Previdenciário, Trabalhista, Cível, Consumidor, Família e Imobiliário.',
    h1: 'Blog Jurídico',
    subtitle: 'Artigos e Notícias',
    body: `<section style="background:linear-gradient(135deg,#0f1729 0%,#1a2634 100%);min-height:50vh;display:flex;align-items:center;justify-content:center;padding:120px 24px 60px;">
      <div style="text-align:center;max-width:600px;">
        <h1 style="font-family:Georgia,serif;font-size:clamp(32px,5vw,48px);color:#faf8f5;line-height:1.1;margin:0 0 16px;">Blog Jurídico</h1>
        <p style="color:#9ca3af;font-size:16px;margin:0;">Informações jurídicas atualizadas para proteger seus direitos.</p>
      </div>
    </section>
    <section style="padding:80px 24px;background:#faf8f5;">
      <div style="max-width:1000px;margin:0 auto;text-align:center;">
        <p style="color:#6b7280;font-size:16px;">Carregando artigos...</p>
      </div>
    </section>`
  },
}

// Generate prerendered HTML for each route
function generatePrerenderedHtml(route, config) {
  const { title, description, h1, subtitle, body } = config
  
  let html = baseHtml
    // Replace <title>
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    // Replace meta description
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${description}"`)
    // Replace og:title
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`)
    // Replace og:description
    .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${description}"`)
    // Replace canonical
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="https://willepereira-adv.vercel.app${route}"`)
    // Remove duplicate og tags that were added before </head>
    .replace(/<meta property="og:title"[^>]*>\n<meta property="og:description"[^>]*>\n<title>[^<]*<\/title>\n<\/head>/, '</head>')
  
  // Add prerender content before root div
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"><div id="prerender" style="opacity:1;transition:opacity 0.5s ease-out;">${body}</div></div>
    <script>
    // Hide prerender after React mounts
    window.__PRERENDER_VISIBLE__ = true;
    setTimeout(function() {
      var el = document.getElementById('prerender');
      if (el) { el.style.opacity = '0'; setTimeout(function() { el.remove(); }, 500); }
    }, 3000);
    </script>`
  )
  
  return html
}

// Routes to prerender
const prerenderRoutes = [
  { path: '/', config: routes['/'] },
  { path: '/servicos', config: routes['/servicos'] },
  { path: '/contato', config: routes['/contato'] },
  { path: '/blog', config: routes['/blog'] },
  { path: '/previdenciario', config: { title: 'Direito Previdenciário | Will & Pereira Advocacia', description: 'Assessoria especializada em aposentadorias, pensões, auxílio-doença e benefícios do INSS.', h1: 'Direito Previdenciário', body: '<section style="background:linear-gradient(135deg,#0f1729 0%,#1a2634 100%);min-height:60vh;display:flex;align-items:center;justify-content:center;padding:120px 24px 60px;"><div style="text-align:center;max-width:600px;"><h1 style="font-family:Georgia,serif;font-size:clamp(32px,5vw,48px);color:#faf8f5;margin:0 0 16px;">Direito Previdenciário</h1><p style="color:#9ca3af;font-size:16px;margin:0;">Assessoria completa em benefícios previdenciários do INSS.</p></div></section>' }},
  { path: '/trabalhista', config: { title: 'Direito Trabalhista | Will & Pereira Advocacia', description: 'Assessoria trabalhista: verbas rescisórias, horas extras, FGTS, assédio moral e mais.', h1: 'Direito Trabalhista', body: '<section style="background:linear-gradient(135deg,#0f1729 0%,#1a2634 100%);min-height:60vh;display:flex;align-items:center;justify-content:center;padding:120px 24px 60px;"><div style="text-align:center;max-width:600px;"><h1 style="font-family:Georgia,serif;font-size:clamp(32px,5vw,48px);color:#faf8f5;margin:0 0 16px;">Direito Trabalhista</h1><p style="color:#9ca3af;font-size:16px;margin:0;">Proteção dos direitos do trabalhador em todas as instâncias.</p></div></section>' }},
  { path: '/civel', config: { title: 'Direito Cível | Will & Pereira Advocacia', description: 'Assessoria cível: contratos, indenizações, responsabilidade civil, usucapião.', h1: 'Direito Cível', body: '<section style="background:linear-gradient(135deg,#0f1729 0%,#1a2634 100%);min-height:60vh;display:flex;align-items:center;justify-content:center;padding:120px 24px 60px;"><div style="text-align:center;max-width:600px;"><h1 style="font-family:Georgia,serif;font-size:clamp(32px,5vw,48px);color:#faf8f5;margin:0 0 16px;">Direito Cível</h1><p style="color:#9ca3af;font-size:16px;margin:0;">Soluções jurídicas para questões civis e contratuais.</p></div></section>' }},
  { path: '/consumidor', config: { title: 'Direito do Consumidor | Will & Pereira Advocacia', description: 'Defesa dos direitos do consumidor: CDC, produtos defeituosos, cobrança indevida.', h1: 'Direito do Consumidor', body: '<section style="background:linear-gradient(135deg,#0f1729 0%,#1a2634 100%);min-height:60vh;display:flex;align-items:center;justify-content:center;padding:120px 24px 60px;"><div style="text-align:center;max-width:600px;"><h1 style="font-family:Georgia,serif;font-size:clamp(32px,5vw,48px);color:#faf8f5;margin:0 0 16px;">Direito do Consumidor</h1><p style="color:#9ca3af;font-size:16px;margin:0;">Proteção integral dos seus direitos como consumidor.</p></div></section>' }},
  { path: '/familia', config: { title: 'Direito de Família | Will & Pereira Advocacia', description: 'Assessoria em divórcio, guarda, pensão alimentícia, união estável.', h1: 'Direito de Família', body: '<section style="background:linear-gradient(135deg,#0f1729 0%,#1a2634 100%);min-height:60vh;display:flex;align-items:center;justify-content:center;padding:120px 24px 60px;"><div style="text-align:center;max-width:600px;"><h1 style="font-family:Georgia,serif;font-size:clamp(32px,5vw,48px);color:#faf8f5;margin:0 0 16px;">Direito de Família</h1><p style="color:#9ca3af;font-size:16px;margin:0;">Acolhimento e solução em questões familiares.</p></div></section>' }},
  { path: '/imobiliario', config: { title: 'Direito Imobiliário | Will & Pereira Advocacia', description: 'Assessoria imobiliária: compra e venda, locação, financiamento.', h1: 'Direito Imobiliário', body: '<section style="background:linear-gradient(135deg,#0f1729 0%,#1a2634 100%);min-height:60vh;display:flex;align-items:center;justify-content:center;padding:120px 24px 60px;"><div style="text-align:center;max-width:600px;"><h1 style="font-family:Georgia,serif;font-size:clamp(32px,5vw,48px);color:#faf8f5;margin:0 0 16px;">Direito Imobiliário</h1><p style="color:#9ca3af;font-size:16px;margin:0;">Segurança nas suas transações imobiliárias.</p></div></section>' }},
  { path: '/escritorio', config: { title: 'Sobre o Escritório | Will & Pereira Advocacia', description: 'Conheça a Will & Pereira Advocacia: mais de 15 anos de experiência em Palhoça/SC.', h1: 'Sobre o Escritório', body: '<section style="background:linear-gradient(135deg,#0f1729 0%,#1a2634 100%);min-height:60vh;display:flex;align-items:center;justify-content:center;padding:120px 24px 60px;"><div style="text-align:center;max-width:600px;"><h1 style="font-family:Georgia,serif;font-size:clamp(32px,5vw,48px);color:#faf8f5;margin:0 0 16px;">Sobre o Escritório</h1><p style="color:#9ca3af;font-size:16px;margin:0;">Conheça nossa história e equipe.</p></div></section>' }},
  { path: '/termos', config: { title: 'Termos de Uso | Will & Pereira Advocacia', description: 'Termos de uso do site da Will & Pereira Advocacia.', h1: 'Termos de Uso', body: '<section style="background:linear-gradient(135deg,#0f1729 0%,#1a2634 100%);min-height:40vh;display:flex;align-items:center;justify-content:center;padding:120px 24px 60px;"><div style="text-align:center;max-width:600px;"><h1 style="font-family:Georgia,serif;font-size:clamp(32px,5vw,48px);color:#faf8f5;margin:0 0 16px;">Termos de Uso</h1></div></section>' }},
  { path: '/privacidade', config: { title: 'Política de Privacidade | Will & Pereira Advocacia', description: 'Política de privacidade da Will & Pereira Advocacia.', h1: 'Política de Privacidade', body: '<section style="background:linear-gradient(135deg,#0f1729 0%,#1a2634 100%);min-height:40vh;display:flex;align-items:center;justify-content:center;padding:120px 24px 60px;"><div style="text-align:center;max-width:600px;"><h1 style="font-family:Georgia,serif;font-size:clamp(32px,5vw,48px);color:#faf8f5;margin:0 0 16px;">Política de Privacidade</h1></div></section>' }},
]

console.log('🔨 Generating prerendered HTML for', prerenderRoutes.length, 'routes...')

for (const { path, config } of prerenderRoutes) {
  const html = generatePrerenderedHtml(path, config)
  const filePath = resolve(distDir, path === '/' ? 'index.html' : path.slice(1) + '/index.html')
  
  // Create directory if needed
  const dir = dirname(filePath)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  
  writeFileSync(filePath, html)
  console.log(`  ✅ ${path}`)
}

console.log('\n🎉 Prerender complete! Generated', prerenderRoutes.length, 'HTML files.')
