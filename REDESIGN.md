# Redesign da Titanium — estado da discussão

Documento de handoff. Sessão de **21/07/2026**, feita no computador do trabalho.
**Nenhum arquivo de código-fonte foi alterado** — o `main` está intacto no commit `8ab8128`.
Só este arquivo foi criado.

---

## 1. Protótipos no ar (abrir no navegador, são privados)

| # | O que é | Link |
|---|---|---|
| v3 | Hero azul chapado + desenho técnico + portfólio em lista | https://claude.ai/code/artifact/045743ad-8b4a-44ec-8e40-39cffe73e6e6 |
| — | **Teste de paletas** — mesmo hero em 4 cores | https://claude.ai/code/artifact/ed5e6c9b-dffe-42b5-84d3-f56e054eb859 |
| v4 | **Planta que vira estrutura** (a direção escolhida) | https://claude.ai/code/artifact/bbdc3db3-1f29-425e-800a-e6bab39a1706 |

---

## 2. O diagnóstico central

Foram quatro tentativas de hero até descobrir que **o problema não era o layout, era a paleta**.
Eu vinha fazendo layouts diferentes e aplicando sempre marinho + dourado.

O que os 5 sites de referência que você mandou (elephant-skin, visualidentity.studio, cantor8.io,
specia1ne.com, sdipresence.com) têm em comum:

- **O tipo é o herói, o gráfico é ambiente.** Títulos de 100–115px dominando a tela.
- **Gráficos de linha e ponto**, delicados. Nunca objeto sólido brilhante grande.
- **Fundo chapado** — preto, creme, ou uma cor saturada. Sem névoa, vinheta ou glow.
- **Micro-tipografia técnica com dado real** (o Specia1ne mostra a hora local ao vivo).
- **3 dos 5 não usam WebGL nenhum.** Dois usam canvas 2D simples.

Você parou na paleta **clara editorial** do teste.

---

## 3. A direção escolhida (v4)

### Conceito: planta → construído

Desenho técnico tem duas vistas: **planta** (frontal, chapada, no papel) e **isométrica**
(girada, construída). A rolagem leva de uma à outra, e o fundo vai de creme ao marinho no
mesmo movimento, **terminando exatamente na cor da seção seguinte**.

Isso resolve a sua dúvida sobre "o hero claro combina com o resto do site azul?":
o creme não é uma segunda identidade — é a fase de projeto. O azul é a obra de pé.

### Paleta

```
--paper     #f2f1eb   fundo do hero (fase planta)
--ink       #101014   texto sobre papel
--navy      #0b1030   fundo do resto do site (fase construído)
--blue      #1f3fe0   acento sobre papel
--blue-lift #7da2ff   acento sobre navy
```

O **dourado `#e0af46` sai.** Marinho + dourado é vocabulário de prestígio clássico
(advocacia, hotelaria, banco privado), não de tecnologia. Nenhuma das 5 referências usa dourado.

> Correção honesta: eu afirmei que dourado sobre marinho dava contraste de 3,2:1 — está errado,
> medi e é 4,4:1 sobre o azul do hero e ~8:1 sobre o marinho escuro. O argumento técnico contra o
> dourado **não se sustenta**; o que sobra é o argumento cultural, que é mais fraco e discutível.
> Você pode legitimamente discordar.

### Tipografia

Mantida: **Clash Display** (display) + **General Sans** (corpo), que já são as do site.
Mudança: título vai para **~105–112px** no desktop (hoje está em 86px máx).
Micro-tipografia em monoespaçada de sistema (`ui-monospace, SF Mono, Menlo, Consolas`) — sem fonte extra.

---

## 4. Armadilhas técnicas já descobertas (não repetir)

### 4.1 Interpolar fundo e texto ao mesmo tempo destrói o contraste
Fazer o fundo ir de creme→marinho **e** o texto de preto→branco simultaneamente faz os dois se
cruzarem no meio: o contraste vai literalmente a zero e o texto some. **Não existe curva que conserte.**

Solução aplicada: o texto **nunca é interpolado**. Ele escolhe sempre o lado de maior contraste
(via luminância do fundo), e **se ausenta da tela durante a inversão** (opacidade 0 entre 40% e 52%
da rolagem). Vira uma batida cinematográfica em vez de um bug.

Verificado: varri a rolagem em 51 pontos medindo contraste real texto×fundo.
**Pior caso com texto visível: 10.97:1** (mínimo recomendado é 4.5:1).

### 4.2 `shadowBlur` no canvas mata a performance
Custou 6,7 FPS com CPU 4x throttled. Removido → 40,5 FPS. Se precisar de brilho, usar
gradiente CSS por trás (composto na GPU), não `shadowBlur` por partícula.

### 4.3 Dois loops de `requestAnimationFrame` vivos ao mesmo tempo
`cancelAnimationFrame` só cancela o último id. Ter um único dono do loop (`play()`/`pause()`
com guarda `if (raf) return`), e pausar via `IntersectionObserver` quando o hero sai da tela.

### 4.4 Teste mobile com `isMobile: true` sem `<meta viewport>` mente
O Chromium emulando mobile adota viewport de layout de **980px** e só encolhe a imagem.
Todos os screenshots mobile de metade da sessão estavam errados por isso.
Em teste local, usar viewport puro (sem `isMobile`) ou garantir a meta tag.

### 4.5 Contexto de canvas
O `index.html` do site atual **já tem** `<meta name="viewport">` — o problema era só do arquivo de protótipo.

---

## 5. Decisões de conteúdo já tomadas

- **Fundir** Sobre + Diferenciais numa seção só (hoje dizem a mesma coisa).
- **Manter** o bloco Missão/Visão/Valores (você quis preservar). Como o MVV duplica os 3 cards de
  Diferenciais, são **os cards** que precisam sair ou virar concretos
  (ex.: "Resposta em 2h", "Escopo fechado, sem surpresa", "Suporte depois do lançamento").
- **Reduzir 6 serviços para 3 blocos**:
  - Sites & Lojas ← Sites/Landing + E-commerce
  - Sistemas & Automação ← SaaS + Gestão + Automação
  - Conteúdo & Presença ← Instagram
- **Portfólio**: lista tipográfica com preview seguindo o cursor (já prototipado e aprovado),
  + links ao vivo + criar o case do **Eletroser** (tem depoimento no site mas não tem card).
- **CTA principal** do hero passa a ser "Falar com a Titanium" (hoje o botão de maior destaque
  leva ao portfólio, o que contraria o objetivo de gerar lead).
- Ordem do menu **não bate** com a ordem real das seções: DOM é início→serviços→depoimentos→
  portfólio→sobre→diferenciais→contato, mas o menu lista depoimentos em penúltimo.
- Portfólio deveria vir **antes** de depoimentos (mostra o trabalho, depois alguém fala bem dele).

### Repetição de vocabulário
As palavras *clareza*, *consistência*, *direção* e *proximidade* aparecem **mais de 25 vezes**
no site. Precisa de poda — vira ruído e faz o texto parecer enrolação.

O campo "Resultado típico" nos serviços entrega adjetivo ("Clareza de proposta") onde promete
resultado. Ou vira número real, ou muda o rótulo, ou sai.

---

## 6. Pendências — só você pode resolver

1. **URLs ao vivo** de NGF Racing, AAAU e Eletroser.
2. **Captura do Eletroser** (ou a URL, que dá pra capturar e converter pra WebP).
3. **Números reais** de resultado de qualquer projeto (aumento de contato, vendas, membros).
4. **Confirmar se são verdade**: "3 projetos no ar" e "resposta em até 2h" — estão escritos na
   tela como fato nos protótipos.
5. **O ícone precisa ser refeito.** O `src/assets/icone-t.png` é um T 3D cromado com bisel e
   brilho, e o fundo azul está **chapado dentro do PNG** (não é transparente). Ele nunca vai
   assentar sobre a paleta clara. Precisa virar **SVG vetorial chapado, fundo transparente**.
   Bônus: hoje são 82KB para um ícone exibido a 32–52px.

---

## 7. Backlog de correções da auditoria (ainda não aplicado)

Lighthouse no build de produção: **Performance 70 desktop / 54 mobile**, Acessibilidade 97/95,
Best Practices 100, SEO 100. Mobile: FCP 4.9s, LCP 6.2s, TBT 450ms, CLS 0.

**Crítico**
- Marca d'água da **Runway** visível no canto inferior direito de `public/videos/hero-light-beam.mp4`.
  (Some sozinho se o hero novo entrar — o vídeo deixa de existir.)
- `LoadingScreen` bloqueia a montagem do `<main>` por **~2,7s fixos** (timers em `LoadingScreen.jsx`
  + gate em `App.jsx`). É a causa nº1 do LCP de 6,2s.

**Alto**
- H2 de "Serviços" **some no mobile**: `.services-sticky` tem `display:none` abaixo de 768px e leva
  o `<h2>` junto (`ServicesSection.css`) — quebra heading-order e leitor de tela.
- Imagens do portfólio: `aaau.png` 776KB + `ngf-racing.png` 586KB → converter para WebP/AVIF com `srcset`.
- Fontes via `<link>` externo síncrono (api.fontshare.com) no `index.html` → self-host com `font-display: swap`.

**Médio**
- GTM (166KB) no topo do `<head>`, antes da meta charset → mover para o fim do body / idle.
- Contraste 4,22:1 nas pills `.sdp-tag` (`#747583` sobre `#050a30`) — mínimo é 4,5:1.
- CTA "Ver portfólio" com `aria-label` que substitui o texto visível (`HeroSection.jsx`) →
  quebra controle por voz.

**Baixo**
- 32% de JS não usado no bundle inicial.
- `cursor: none` global no `globals.css` antes do `CustomCursor` montar.

---

## 8. O custo honesto da animação de scroll

A transição planta→estrutura prende a rolagem por **cerca de 1,5 tela** antes do conteúdo começar.
Num site cujo objetivo é gerar lead, é tempo que o visitante gasta sem ler proposta nenhuma.

Vale se o efeito impressionar de verdade. Se achar arrastado, dá pra encurtar a zona
(`.scroll-zone { height: 260vh }` → menos) ou acelerar a transição. É parâmetro, muda em uma linha.

---

## 9. Próximo passo

Implementar a direção v4 nos componentes React de verdade, **numa branch separada**
(`git checkout -b redesign-v4`), mantendo o `main` intacto para rollback.

Ordem sugerida:
1. Trocar a paleta nos tokens de `src/styles/globals.css`.
2. Refazer o `HeroSection` com o canvas do desenho técnico + transição de scroll.
3. Matar o `LoadingScreen` (ganho de LCP imediato).
4. Refazer o `PortfolioSection` como lista tipográfica + links ao vivo.
5. Fundir Sobre + Diferenciais; reduzir serviços de 6 para 3.
6. Rodar o resto do backlog da auditoria.

O código dos protótipos está nas páginas publicadas — dá pra abrir o fonte de cada uma
(canvas 2D puro, sem dependência nova; nada de Three.js).
