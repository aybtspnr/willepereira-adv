# Will & Pereira Advocacia — CLAUDE.md

## Stack
- **Framework**: React 19 + TypeScript 6
- **Build**: Vite 8.1 via pnpm
- **Animações**: Framer Motion
- **SEO**: react-helmet-async
- **Ícones**: Lucide React
- **Estilo**: CSS custom (`index.css`) — sem Tailwind
- **Roteamento**: React Router v7
- **Deploy**: Vercel

## Comandos Essenciais
```bash
pnpm dev          # Servidor de desenvolvimento
pnpm build        # Build de produção
pnpm preview      # Preview do build
pnpm lint         # Oxlint
```

## Estrutura do Projeto
```
/src
  /components/     # Componentes reutilizáveis
    Layout.tsx     # Wrapper com Navbar + Footer + ScrollProgress
    Navbar.tsx     # Top bar + sticky nav + dropdown + mobile menu
    Footer.tsx     # CTA bar + 3 colunas + bottom bar
    AnimatedPage.tsx   # Transições de página
    ScrollProgress.tsx # Barra dourada de progresso
  /pages/          # Páginas do site
    HomePage.tsx         # Home com hero, stats, serviços, sobre, diferenciais, blog, CTA
    ServicosPage.tsx     # Lista completa de áreas de atuação
    ContatoPage.tsx      # Formulário de contato + informações
    BlogPage.tsx         # Blog com filtro e busca
    BlogPostPage.tsx     # Post individual com schema JSON-LD
    DireitoPrevidenciario.tsx  # Área: Previdenciário
    DireitoTrabalhista.tsx     # Área: Trabalhista
    DireitoCivel.tsx           # Área: Cível
    DireitoConsumidor.tsx      # Área: Consumidor
    DireitoFamilia.tsx         # Área: Família
    DireitoImobiliario.tsx     # Área: Imobiliário
  /data/blog/      # Dados do blog por categoria
  /hooks/
    useSEO.ts      # Hook de SEO (usar Helmet em vez deste)
  index.css        # CSS custom com todo o design system
  App.tsx          # Rotas
  main.tsx         # Entry point
/public            # Assets estáticos (logos, favicon)
```

## Design System (CSS custom — index.css)

### Cores
```css
--navy: #1a2634;        --navy-dark: #0f1729;
--gold: #c9a84c;        --gold-light: #d4b96a;
--cream: #faf8f5;       --gray-400: #9ca3af;
--gray-500: #6b7280;    --gray-600: #4a5568;
```

### Classes de Componentes
- `.btn`, `.btn-gold`, `.btn-outline`, `.btn-primary`, `.btn-outline-light`
- `.srv-card` — service card com gold hover border
- `.val-card` — value card com hover escuro
- `.blog-card` — blog post card
- `.glass-card` — glassmorphism container
- `.nav-link`, `.nav-dropdown` — navegação
- `.section-tag` — labels de seção
- `.hero-title`, `.section-title` — tipografia
- `.stat-item`, `.stat-num`, `.stat-label` — contadores

### Classes Utilitárias (grid, spacing, typography)
- Grid: `.grid`, `.grid-cols-2/3`, `.md:grid-cols-2/3/4`, `.lg:grid-cols-2/3`
- Gap: `.gap-2/3/4/6/8/10/12/16`
- Width/Height: `.w-full`, `.w-8/12/16/20/40/48/64/80/96`, `.h-3/4/5/8/9/12/16/20/40/48/64/80/96`
- Spacing: `.py-sm/md/lg`, `.px-lg`, `.pb-24`
- Typography: `.text-sm/xs/lg/xl/2xl/3xl/4xl/5xl`, `.font-serif/semibold/medium`, `.tracking-wide/wider/widest`
- Effects: `.reveal-line`, `.clip-reveal`, `.fade-up`, `.blur-hero/sm`, `.shadow-card`
- Posição: `.sticky`, `.top-0/20/24`, `.bottom-8`

## Padrões de Desenvolvimento

### Páginas
- Toda página usa `<Helmet>` de `react-helmet-async` para SEO
- Título: `Nome da Página | Will & Pereira Advocacia` (sem duplicação)
- Descrição meta relevante para SEO
- Link canônico apontando para `https://willepereira-adv.vercel.app/<rota>`
- OG tags: title, description, url

### Animações
- Uso de `framer-motion` para animações de scroll com `useInView`
- `AnimatedPage` para transições entre rotas
- `ScrollProgress` para barra de progresso dourada
- `TextReveal` component (em components/TextReveal.tsx) para split-text effects

### Contato
- Telefone: `(48) 98842-0867` / `+5548988420867`
- Email: `contato@willepereira.adv.br`
- Endereço: Rua Najla Carone Guedert, 1080 — Palhoça/SC
- Usar `orientação jurídica` em vez de `consulta gratuita` (regras OAB)

### Observações Técnicas
- Usar **pnpm** (npm é lento no D: drive)
- Working copy em `/home/nuh_tapinar/advocacia-v1/` — sincronizado com `/mnt/d/advocacia v1/`
- Git remote: `https://github.com/aybtspnr/willepereira-adv.git`
- Classes Tailwind com `/` ou `.` não funcionam sem Tailwind configurado — usar inline styles
- Build: `pnpm build` gera em `dist/`
