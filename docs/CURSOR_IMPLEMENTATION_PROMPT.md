# 🚀 PROMPT DI IMPLEMENTAZIONE — Residence Le Farfalle
> Da incollare direttamente nella chat di Cursor Agent **insieme** a `CURSOR_AGENT_INSTRUCTIONS.md`.
> Versione: 1.0 — 2026-03-11

---

Sei un agente Cursor esperto in Next.js 16, React 19, Tailwind CSS v4 e Framer Motion.
Stai lavorando sul progetto **Residence Le Farfalle**, un sito web per una struttura ricettiva in Calabria.

## 📋 REGOLE ASSOLUTE (non derogabili)

1. Leggi INTERAMENTE `docs/CURSOR_AGENT_INSTRUCTIONS.md` prima di scrivere qualsiasi codice.
2. Lavora SOLO dentro la cartella `residence-le-farfalle/`. Zero contaminazioni con altri progetti.
3. Prima di ogni commit: `git config user.email "bestiolinaferoce@gmail.com"`.
4. Deploy SOLO tramite `git push origin main`. Mai `vercel deploy`.
5. Dopo ogni task: `npm run build` deve passare con 0 errori.

---

## 🎯 OBIETTIVO DELLA SESSIONE

Implementa il design system e le animazioni descritte in `docs/CURSOR_AGENT_INSTRUCTIONS.md`.
Priorità assoluta: **farfalle colorate che volano sullo schermo** e **qualità percepita premium**.

---

## ⚡ ESEGUI I TASK IN QUESTO ORDINE ESATTO

### STEP 1 — Prezzi (5 minuti)

Apri `src/config/site.ts`.
Trova ogni occorrenza di `pricePerNight` (o equivalente campo prezzo) e imposta il valore a `90`.
Questo vale per **tutte e 4 le camere**, nessuna eccezione.
Verifica che il prezzo appaia correttamente su `http://localhost:3000/it/camere`.

---

### STEP 2 — Design system (20 minuti)

**2a. Tailwind config** (`tailwind.config.ts`):
- Sostituisci COMPLETAMENTE la sezione `colors` con la palette butterfly/coral/lime/amber/sky/neutral da `CURSOR_AGENT_INSTRUCTIONS.md`.
- Sostituisci la sezione `keyframes` e `animation` con flutter, flutterFast, meshGradient, shimmer, blob, revealUp, fadeIn, pulse-slow.

**2b. Font** (`src/app/[locale]/layout.tsx`):
- Importa `Plus_Jakarta_Sans` e `Syne` da `next/font/google`.
- Aggiungi le variabili CSS `--font-plus-jakarta` e `--font-syne` al `<body>`.

**2c. CSS globali** (`src/app/globals.css`):
- Aggiungi le classi: `.mesh-gradient`, `.glass-card`, `.glass-card-dark`, `.gradient-text`, `.gradient-text-coral`, `.btn-magnetic`, `.nav-link`, `.wave-divider`, `.card-hover`, `.skeleton`, `.snap-x-mandatory`, `.snap-start`.
- Copia il codice CSS esatto da `CURSOR_AGENT_INSTRUCTIONS.md` sezione "Classi CSS globali".

**2d. Button** (`src/components/ui/Button.tsx`):
- Ridisegna con 5 varianti: `primary`, `secondary`, `ghost`, `whatsapp`, `outline`.
- Copia le classi Tailwind esatte da `CURSOR_AGENT_INSTRUCTIONS.md` sezione "SISTEMA BOTTONI".

---

### STEP 3 — Farfalle (PRIORITÀ MASSIMA — 30 minuti)

Questo è il punto centrale della sessione. Le farfalle DEVONO essere colorate e volare.

**3a. Crea `src/components/ui/ButterflyIcon.tsx`**

Il componente accetta tre props colore: `colorWingOuter`, `colorWingInner`, `colorBody`.
Le ali devono avere fill con colore esplicito (non `currentColor`).
Copia il codice SVG esatto da `CURSOR_AGENT_INSTRUCTIONS.md` sezione "ButterflyIcon con colori espliciti".

**3b. Crea `src/components/ui/FlyingButterfly.tsx`**

Contiene 5 farfalle con questi colori ESATTI:
- Farfalla 1: viola `#d946ef` / `#f0abfc` — vola da sinistra a destra
- Farfalla 2: coral `#f43f5e` / `#fda4af` — vola da sinistra a destra
- Farfalla 3: amber `#f59e0b` / `#fcd34d` — vola da destra a sinistra
- Farfalla 4: lime `#84cc16` / `#bef264` — vola da sinistra a destra diagonale
- Farfalla 5: sky `#38bdf8` / `#7dd3fc` — vola da destra a sinistra diagonale

Ogni farfalla usa `framer-motion` con:
- `animate` su `left` e `top` — percorso che ATTRAVERSA tutto il viewport (da fuori schermo a fuori schermo)
- `repeat: Infinity` con `delay` scaglionato
- `opacity: [0, 0.85, 0.85, 0]` per fade in/out ai bordi
- Le ali battono con CSS animation `flutter` sovrapposta al movimento

Importa con `dynamic({ ssr: false })` per evitare errori di hydration.

**Copia il codice completo da `CURSOR_AGENT_INSTRUCTIONS.md` sezione "FlyingButterfly — vola ATTRAVERSO lo schermo".**

**3c. Aggiorna Hero** (`src/components/sections/Hero.tsx`):

Sostituisci le farfalle statiche con `<FlyingButterflies count={5} />` (importato dinamicamente).
Le farfalle vanno DENTRO la hero, posizionate con `z-0`, il contenuto testo a `z-10`.

**VERIFICA VISIVA OBBLIGATORIA:** Apri `http://localhost:3000/it` e controlla che:
- Ci siano 5 farfalle visibili con colori diversi (viola, rosso, giallo, verde, azzurro)
- Si muovano attraverso lo schermo, non solo vibrino sul posto
- Appaiano e scompaiano ai bordi con fade

Se le farfalle non sono visibili o sono grigie, **NON passare allo step successivo**.

---

### STEP 4 — Hero completa (20 minuti)

Ridisegna `Hero.tsx` seguendo esattamente la struttura in `CURSOR_AGENT_INSTRUCTIONS.md`:

1. Background `mesh-gradient` + blob decorativi sfumati
2. `<FlyingButterflies count={5} />` (z-0)
3. Badge pill glassmorphism: "📍 Isola di Capo Rizzuto · Calabria · Area Marina Protetta"
4. H1: "La tua vacanza / **prende il volo.**" — con `.gradient-text` su "prende il volo."
5. Sottotitolo: "4 camere indipendenti... Nel cuore di Isola di Capo Rizzuto, a pochi chilometri dall'Area Marina Protetta."
6. Prezzo prominente: **€90 / notte** (colazione inclusa)
7. CTA: bottone `primary` "🏖️ Prenota ora" + bottone `whatsapp` "💬 WhatsApp"
8. Trust bar: ⭐ Verificato · 🏖️ Area Marina Protetta · ☕ Colazione inclusa · ❄️ A/C · 📶 WiFi
9. Scroll indicator animato (freccia che bounce in loop)

---

### STEP 5 — Qualità percepita (25 minuti)

**5a. Card camere** (`src/app/[locale]/camere/page.tsx` e componenti correlati):
- Ogni card: hover lift (`card-hover`), zoom immagine su hover (`group-hover:scale-[1.08]`)
- Overlay gradiente che emerge su hover
- Badge colore diverso per ogni camera (butterfly/coral/amber/sky)
- Prezzo **€90/notte** visibile su ogni card (emerge su hover come pill glassmorphism)

**5b. Sezione "Perché Le Farfalle"** (crea o aggiorna `src/components/sections/WhyUs.tsx`):
- 4 card, ognuna con sfondo e bordo del suo colore accento
- Animazione `whileInView` con `viewport={{ once: true }}`
- Card 1 sky: "Nel cuore di Isola" — "Servizi e spiagge a pochi minuti"
- Card 2 amber: "Colazione inclusa" — "Ogni mattina prodotti freschi e locali"
- Card 3 butterfly: "Design unico" — "Ambienti moderni e curati nei dettagli"
- Card 4 lime: "Natura incontaminata" — "Area Marina Protetta, acque cristalline"

**5c. Header scroll-aware** (`src/components/layout/Header.tsx`):
- Trasparente sopra gli 80px, `glass-card` dopo lo scroll
- Logo: `<ButterflyIcon />` + "Le Farfalle" in `font-display`
- Link con `.nav-link` (underline animato gradient su hover)

---

### STEP 6 — GDPR (obbligatorio, 20 minuti)

Crea tutti i file GDPR come descritto in `CURSOR_AGENT_INSTRUCTIONS.md`:
- `src/components/gdpr/CookieBanner.tsx` — fixed bottom, glass-card, 3 pulsanti
- `src/app/[locale]/privacy/page.tsx`
- `src/app/[locale]/cookie/page.tsx`
- `src/app/[locale]/termini/page.tsx`
- Integra il banner nel layout root

---

### STEP 7 — SEO e build (15 minuti)

- Verifica structured data JSON-LD in layout (aggiorna `priceRange` con "€90")
- `generateMetadata` con Open Graph su tutte le pagine
- `npm run build` → 0 errori (se ci sono errori, risolvili prima di procedere)
- `npm run lint` → 0 warning

---

### STEP 8 — Deploy

```bash
git add .
git commit -m "feat: design system butterfly, farfalle animate colorate, prezzi €90/notte"
git push origin main
```

Verifica che Vercel faccia il deploy in verde.

---

## 🔑 INFORMAZIONI TECNICHE CHIAVE

- **Framework:** Next.js 16 (App Router), React 19, TypeScript strict
- **Stile:** Tailwind CSS v4 + classi globali custom in `globals.css`
- **Animazioni:** Framer Motion (già installato) + CSS keyframes per flutter
- **i18n:** `next-intl` — locales: `it`, `en`, `de` — parametro `locale` è sempre `Promise<{locale: string}>`
- **Pattern params:** `const { locale } = await params;` — MAI distrutturation sincrona
- **Prezzo:** €90/notte su TUTTE le camere — aggiorna `src/config/site.ts`
- **Posizione:** Isola di Capo Rizzuto (centro paese) — NON "200m dal mare"
- **Git email:** `bestiolinaferoce@gmail.com` — obbligatorio per deploy Vercel

## 🚫 COSE DA NON FARE MAI

- NON scrivere "200m dal mare" o "200 metri dal mare" — la struttura è in paese, non sul mare
- NON usare farfalle grigie (`text-neutral`, `text-gray`, `opacity-[0.15]`)
- NON usare `vercel deploy`
- NON committare con altra email che non sia `bestiolinaferoce@gmail.com`
- NON copiare colori da altri progetti (niente navy, teal `#0d9488`, gold)
- NON usare `<img>` raw — solo `next/image`

---

*Questo prompt è il piano di esecuzione sessione per sessione.*
*Per le specifiche complete di ogni componente, riferisciti a `docs/CURSOR_AGENT_INSTRUCTIONS.md`.*
