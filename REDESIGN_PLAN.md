# Plano de Redesign — Will & Pereira Advocacia

## Análise ARIO Law (ario.law)

### Tecnologias detectadas:
- **GSAP + ScrollTrigger** — animações de scroll
- **Barba.js** — transições de página (SPA)
- **SplitText** — divide texto em chars/words/lines para animar
- Sem imagens — design 100% tipográfico
- Cores: preto `#020202` + branco `#fff` + cinza `#ececec`
- Fonte: Helvetica (custom woff)
- Layout: vw-based (viewport width units)

### Padrões visuais do ARIO:
1. **Preloader** — logo "ARIO" gigante em serif, fade out
2. **Hero** — Texto único "We enjoy the law..." pequeno, sem título massivo
3. **Stats** — Cards quadrados com números enormes (10+, 30+) + labels
4. **Practices** — Lista numerada (01, 02, 03...) com "Head of Practice" e "Team"
5. **Recognition** — Carousel de prêmios
6. **News** — Cards de artigos minimalistas
7. **Footer** — Form de newsletter + widgets expansíveis
8. **Transições** — GSAP scroll pin, split text reveal, line animations

### O que copiar do ARIO:
- Animações de scroll com useScroll/useTransform (framer-motion = GSAP equivalente)
- SplitText effect (texto que aparece linha por linha)
- Cards com bordas finas e hover sutil
- Stats com números grandes em serif
- Section labels com linhas decorativas
- Scroll progress bar

## Plano de Implementação

### Fase 1: CSS Foundation (index.css)
- Variáveis CSS com cores do logo
- Sistema de tipografia (serif + sans)
- Classes utilitárias (sem Tailwind)
- Componentes CSS: cards, buttons, sections
- Animaciones: fade-up, reveal-line, clip-reveal

### Fase 2: Componentes Base
- ScrollProgress (barra dourada no topo)
- Navbar com top bar (contato) + nav main (dropdown)
- Footer (3 colunas + bottom bar)
- Layout (wrapper)

### Fase 3: Homepage
- Hero: full-screen, tipografia massiva, parallax
- Stats: glass card overlapping, counter animation
- Servicos: 6 cards com gold border hover
- Sobre: 2-column, tipografia + texto
- Diferenciais: 6 val-cards, navy bg
- Blog Preview: 3 cards
- CTA: navy section com contato

### Fase 4: Páginas Internas
- ServicosPage
- ContatoPage
- BlogPage + BlogPostPage
- 6 páginas de área (já existem, precisam de CSS fix)

### Fase 5: Deploy
- Build
- Vercel --prod --force --yes