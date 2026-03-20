# 🦋 CURSOR AGENT INSTRUCTIONS — Residence Le Farfalle
> Versione: 2.0 — 2026-03-11
> **LEGGI INTERAMENTE PRIMA DI SCRIVERE UNA SOLA RIGA DI CODICE.**
> Questo documento è la fonte unica di verità. Nessuna deviazione è consentita.

---

## ⚠️ REGOLA ASSOLUTA N.1 — ISOLAMENTO PROGETTO

**NON modificare, leggere o fare riferimento ad altri progetti** (B&B Armenes, Villa Olimpia, ecc.).
Ogni file che crei o modifichi deve stare esclusivamente dentro `residence-le-farfalle/`.
Se trovi riferimenti ad altri progetti nel codice, **ignorali completamente**.

---

## 🚀 DEPLOY — CONFIGURA PRIMA DI TUTTO

### ❌ NON usare `vercel deploy`
È bloccato su Hobby plan. Non usarlo mai.

### ✅ Workflow corretto: `git push` → GitHub → Vercel (auto-deploy)

**Step 0 — Configura git author (una volta sola, obbligatorio):**
```bash
cd /path/to/residence-le-farfalle
git config user.email "bestiolinaferoce@gmail.com"
git config user.name "BestiolinaFeroce"
```
> ⚠️ CRITICO: l'email deve essere esattamente `bestiolinaferoce@gmail.com` altrimenti Vercel blocca il deploy con "git author could not be matched to a Vercel account".

**Step 1 — Setup remoto (prima volta):**
```bash
git remote add origin https://github.com/bestiolinaferoce-gif/residence-le-farfalle.git
git branch -M main
git push -u origin main
```

**Step 2 — Ogni deploy successivo:**
```bash
git add .
git commit -m "feat: descrizione modifica"
git push origin main
```

> Vercel rileva il push e deploya in ~2 minuti. Dashboard: https://vercel.com/bestiolinaferoces-projects

### 🔑 Credenziali repository
- GitHub: `bestiolinaferoce-gif/residence-le-farfalle` (privato)
- Branch produzione: `main`
- Dominio target: `residencelefarfalle.it` (da configurare in Vercel dopo primo deploy)

---

## 💰 PREZZI CAMERE — €90/NOTTE

**Aggiorna immediatamente `src/config/site.ts`:**
```typescript
// Trova la sezione rooms e imposta pricePerNight: 90 per TUTTE le 4 camere
// Esempio:
export const rooms: Room[] = [
  {
    id: 'camera-1',
    name: { it: 'Camera 1', en: 'Room 1', de: 'Zimmer 1' },
    pricePerNight: 90,   // ← €90 su tutte e 4
    // ... resto invariato
  },
  // ... stessa cosa per camera-2, camera-3, camera-4
];
```

**Formato visualizzazione prezzi — usa sempre questo pattern:**
```tsx
// Componente PriceTag — da usare in card camere, pagina prenota, ecc.
const PriceTag = ({ price = 90 }: { price?: number }) => (
  <div className="flex items-baseline gap-1">
    <span className="text-3xl font-bold text-butterfly-600">€{price}</span>
    <span className="text-sm text-neutral-500">/notte</span>
  </div>
);
```

**Testo SEO associato:** "a partire da €90 a notte" — usa questa stringa in meta description e structured data `priceRange`.

---

## 🎨 IDENTITÀ VISIVA — DESIGN SYSTEM OBBLIGATORIO

### ⚡ Principio guida
Il sito deve essere **vibrante, fluido e memorabile** — come una farfalla che vola.
**VIETATO** usare lo stesso stile di B&B Armenes (navy/teal/gold conservativo).
Questo sito è energia, colore e movimento. Target: ospiti 25-50 anni, sensibili al design.

### 🎨 Palette colori (implementa in `tailwind.config.ts`)

```typescript
// SOSTITUISCI COMPLETAMENTE l'intera sezione colors:
colors: {
  butterfly: {
    50:  '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',  // ← viola farfalla PRINCIPALE
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  coral: {
    50:  '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',  // ← coral SECONDARIO
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },
  lime: {
    50:  '#f7fee7',
    100: '#ecfccb',
    200: '#d9f99d',
    300: '#bef264',
    400: '#a3e635',
    500: '#84cc16',  // ← verde lime ACCENTO
    600: '#65a30d',
    700: '#4d7c0f',
    800: '#3f6212',
    900: '#365314',
  },
  amber: {
    50:  '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',  // ← ambra ACCENTO 2
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  sky: {
    50:  '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',  // ← azzurro mare
    600: '#0284c7',
  },
  neutral: {
    50:  '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
  },
  surface:   '#FEFBFF',    // bianco con sfumatura viola appena percettibile
  'surface-2': '#F5F0FF',  // bianco viola più marcato per sezioni alternate
}
```

### 🖋️ Tipografia

```typescript
fontFamily: {
  sans:    ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
  display: ['var(--font-syne)', 'var(--font-plus-jakarta)', 'sans-serif'],
  mono:    ['ui-monospace', 'monospace'],
},
```

**Font in `src/app/[locale]/layout.tsx`:**
```typescript
import { Plus_Jakarta_Sans, Syne } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['700', '800'],
});

// Nel <body>: className={`${jakarta.variable} ${syne.variable}`}
```

**Gerarchia tipografica — usa SEMPRE queste classi:**
```
H1 hero:    font-display text-5xl md:text-7xl font-bold tracking-tight
H2 sezione: font-display text-3xl md:text-4xl font-bold
H3 card:    font-sans    text-xl font-semibold
Body:       font-sans    text-base text-neutral-700 leading-relaxed
Caption:    font-sans    text-sm  text-neutral-500
Price:      font-sans    text-3xl font-bold text-butterfly-600
```

### ✨ Keyframes e animazioni Tailwind

```typescript
keyframes: {
  flutter: {
    '0%, 100%': { transform: 'rotate(-8deg) scaleX(1)' },
    '50%':      { transform: 'rotate(8deg)  scaleX(0.92)' },
  },
  flutterFast: {
    '0%, 100%': { transform: 'rotate(-12deg) scaleX(1)' },
    '50%':      { transform: 'rotate(12deg)  scaleX(0.88)' },
  },
  meshGradient: {
    '0%':   { backgroundPosition: '0% 50%' },
    '50%':  { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
  shimmer: {
    '0%':   { backgroundPosition: '-200% 0' },
    '100%': { backgroundPosition:  '200% 0' },
  },
  blob: {
    '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
    '50%':      { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
  },
  revealUp: {
    '0%':   { clipPath: 'inset(100% 0 0 0)', opacity: '0' },
    '100%': { clipPath: 'inset(0% 0 0 0)',   opacity: '1' },
  },
  fadeIn: {
    '0%':   { opacity: '0', transform: 'translateY(16px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%':      { opacity: '0.5' },
  },
},
animation: {
  flutter:       'flutter 0.6s ease-in-out infinite',
  flutterFast:   'flutterFast 0.4s ease-in-out infinite',
  meshGradient:  'meshGradient 8s ease infinite',
  shimmer:       'shimmer 2s linear infinite',
  blob:          'blob 8s ease-in-out infinite',
  revealUp:      'revealUp 0.7s ease-out forwards',
  fadeIn:        'fadeIn 0.5s ease-out forwards',
  'pulse-slow':  'pulse 3s ease-in-out infinite',
},
```

### 🪟 Classi CSS globali (`src/app/globals.css`)

```css
/* ── Mesh gradient bg ─────────────────────────────────── */
.mesh-gradient {
  background:
    radial-gradient(ellipse at 15% 50%, rgba(217,70,239,0.18) 0%, transparent 55%),
    radial-gradient(ellipse at 85% 15%, rgba(244,63,94,0.14) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 85%, rgba(14,165,233,0.10) 0%, transparent 55%),
    radial-gradient(ellipse at 60% 40%, rgba(245,158,11,0.08) 0%, transparent 40%),
    #FEFBFF;
}

/* ── Glassmorphism card ───────────────────────────────── */
.glass-card {
  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(16px) saturate(1.6);
  -webkit-backdrop-filter: blur(16px) saturate(1.6);
  border: 1px solid rgba(217,70,239,0.14);
  box-shadow:
    0 4px 24px rgba(217,70,239,0.06),
    0 1px 0 rgba(255,255,255,0.8) inset;
}

.glass-card-dark {
  background: rgba(28,25,23,0.72);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  border: 1px solid rgba(255,255,255,0.08);
}

/* ── Gradient text ────────────────────────────────────── */
.gradient-text {
  background: linear-gradient(135deg, #d946ef 0%, #f43f5e 55%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-coral {
  background: linear-gradient(135deg, #f43f5e 0%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Pulsante con hover magnetico ─────────────────────── */
.btn-magnetic {
  transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1),
              box-shadow 0.22s ease;
}
.btn-magnetic:hover  { transform: scale(1.04) translateY(-2px); }
.btn-magnetic:active { transform: scale(0.97); }

/* ── Underline animato per link nav ───────────────────── */
.nav-link {
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0; height: 2px;
  background: linear-gradient(90deg, #d946ef, #f43f5e);
  transition: width 0.3s ease;
  border-radius: 1px;
}
.nav-link:hover::after,
.nav-link.active::after { width: 100%; }

/* ── Wave divider SVG wrapper ─────────────────────────── */
.wave-divider {
  overflow: hidden;
  line-height: 0;
  margin-bottom: -2px;
}

/* ── Card hover lift ──────────────────────────────────── */
.card-hover {
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
              box-shadow 0.3s ease;
}
.card-hover:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(217,70,239,0.15);
}

/* ── Shimmer loading skeleton ─────────────────────────── */
.skeleton {
  background: linear-gradient(90deg,
    #f0abfc 0%, #fde8ff 50%, #f0abfc 100%);
  background-size: 200% 100%;
  animation: shimmer 1.8s linear infinite;
}

/* ── Scroll snap per carousel ─────────────────────────── */
.snap-x-mandatory {
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.snap-start { scroll-snap-align: start; }
```

---

## 🦋 FARFALLE ANIMATE — IMPLEMENTAZIONE CRITICA

### ❌ SBAGLIATO (farfalle grigie statiche)
```tsx
// NO: opacità 0.15, colore grigio, solo CSS flutter
<ButterflyIcon className="text-neutral-300 opacity-15 animate-flutter" />
```

### ✅ GIUSTO — Farfalle COLORATE che VOLANO attraverso lo schermo

#### Componente `ButterflyIcon` con colori espliciti

```tsx
// src/components/ui/ButterflyIcon.tsx
interface ButterflyIconProps {
  className?: string;
  colorWingOuter?: string;   // colore ali esterne
  colorWingInner?: string;   // colore ali inferiori
  colorBody?: string;        // colore corpo
}

export const ButterflyIcon = ({
  className,
  colorWingOuter = '#d946ef',   // butterfly-500 di default
  colorWingInner = '#f43f5e',   // coral-500 di default
  colorBody = '#701a75',        // butterfly-900 di default
}: ButterflyIconProps) => (
  <svg
    viewBox="0 0 100 72"
    className={className}
    aria-hidden="true"
    role="presentation"
  >
    {/* Ali superiori */}
    <ellipse cx="30" cy="28" rx="28" ry="20"
      fill={colorWingOuter} opacity="0.85"
      transform="rotate(-18 30 28)" />
    <ellipse cx="70" cy="28" rx="28" ry="20"
      fill={colorWingOuter} opacity="0.85"
      transform="rotate(18 70 28)" />
    {/* Ali inferiori */}
    <ellipse cx="26" cy="50" rx="20" ry="14"
      fill={colorWingInner} opacity="0.70"
      transform="rotate(12 26 50)" />
    <ellipse cx="74" cy="50" rx="20" ry="14"
      fill={colorWingInner} opacity="0.70"
      transform="rotate(-12 74 50)" />
    {/* Corpo */}
    <ellipse cx="50" cy="38" rx="3.5" ry="15"
      fill={colorBody} opacity="0.90" />
    {/* Testa */}
    <circle cx="50" cy="22" r="3" fill={colorBody} opacity="0.80" />
    {/* Antenne */}
    <path d="M50,20 Q44,12 40,8" stroke={colorBody} strokeWidth="1.2"
      fill="none" opacity="0.65" strokeLinecap="round"/>
    <circle cx="40" cy="8" r="1.8" fill={colorBody} opacity="0.65"/>
    <path d="M50,20 Q56,12 60,8" stroke={colorBody} strokeWidth="1.2"
      fill="none" opacity="0.65" strokeLinecap="round"/>
    <circle cx="60" cy="8" r="1.8" fill={colorBody} opacity="0.65"/>
  </svg>
);
```

#### Componente `FlyingButterfly` — vola ATTRAVERSO lo schermo

```tsx
// src/components/ui/FlyingButterfly.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ButterflyIcon } from './ButterflyIcon';

interface ButterflyConfig {
  id: number;
  size: number;         // px (40–100)
  startX: number;      // % del viewport width (-20% → inizia fuori schermo sx)
  startY: number;      // % del viewport height
  endX: number;        // % (110% → finisce fuori schermo dx)
  endY: number;
  duration: number;    // secondi
  delay: number;
  colorWingOuter: string;
  colorWingInner: string;
  colorBody: string;
  flutterSpeed: string; // CSS animation duration per il flutter delle ali
}

// Configurazione FISSA per 5 farfalle (non random al SSR — evita hydration mismatch)
const BUTTERFLIES: ButterflyConfig[] = [
  {
    id: 1, size: 72,
    startX: -15, startY: 20,
    endX: 115,   endY: 35,
    duration: 18, delay: 0,
    colorWingOuter: '#d946ef',   // butterfly viola
    colorWingInner: '#f0abfc',
    colorBody: '#701a75',
    flutterSpeed: '0.55s',
  },
  {
    id: 2, size: 52,
    startX: -12, startY: 60,
    endX: 112,   endY: 45,
    duration: 22, delay: 4,
    colorWingOuter: '#f43f5e',   // coral rosso
    colorWingInner: '#fda4af',
    colorBody: '#881337',
    flutterSpeed: '0.45s',
  },
  {
    id: 3, size: 88,
    startX: 110,  startY: 30,
    endX: -15,    endY: 55,
    duration: 26, delay: 8,
    colorWingOuter: '#f59e0b',   // amber
    colorWingInner: '#fcd34d',
    colorBody: '#92400e',
    flutterSpeed: '0.65s',
  },
  {
    id: 4, size: 44,
    startX: -10,  startY: 75,
    endX: 110,    endY: 20,
    duration: 20, delay: 12,
    colorWingOuter: '#84cc16',   // lime
    colorWingInner: '#bef264',
    colorBody: '#365314',
    flutterSpeed: '0.50s',
  },
  {
    id: 5, size: 64,
    startX: 112,  startY: 70,
    endX: -12,    endY: 25,
    duration: 24, delay: 16,
    colorWingOuter: '#38bdf8',   // sky azzurro
    colorWingInner: '#7dd3fc',
    colorBody: '#0284c7',
    flutterSpeed: '0.60s',
  },
];

// Ogni farfalla ha un percorso sinusoidale tramite keyframes
function ButterflyParticle({ b }: { b: ButterflyConfig }) {
  // Il percorso è dato da keyframes x/y con leggera sinusoide verticale
  const midY = (b.startY + b.endY) / 2 + (b.id % 2 === 0 ? -12 : 12);

  return (
    <motion.div
      key={b.id}
      className="absolute pointer-events-none select-none"
      style={{ width: b.size, height: b.size }}
      initial={{
        left: `${b.startX}%`,
        top: `${b.startY}%`,
        opacity: 0,
        rotate: b.startX < 0 ? 0 : 180,  // orientamento volo
      }}
      animate={{
        left:    [`${b.startX}%`, `${(b.startX+b.endX)/2}%`, `${b.endX}%`],
        top:     [`${b.startY}%`, `${midY}%`,                 `${b.endY}%`],
        opacity: [0, 0.85, 0.85, 0],
      }}
      transition={{
        duration: b.duration,
        delay: b.delay,
        repeat: Infinity,
        repeatDelay: b.delay * 0.5,
        ease: 'easeInOut',
        opacity: {
          duration: b.duration,
          times: [0, 0.08, 0.92, 1],
        },
      }}
    >
      {/* Flutter ali con CSS animation */}
      <div
        style={{
          animation: `flutter ${b.flutterSpeed} ease-in-out infinite alternate`,
          transformOrigin: 'center',
        }}
      >
        <ButterflyIcon
          colorWingOuter={b.colorWingOuter}
          colorWingInner={b.colorWingInner}
          colorBody={b.colorBody}
          className="w-full h-full drop-shadow-lg"
        />
      </div>
    </motion.div>
  );
}

export function FlyingButterflies({ count = 5 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {BUTTERFLIES.slice(0, count).map((b) => (
        <ButterflyParticle key={b.id} b={b} />
      ))}
    </div>
  );
}
```

#### Utilizzo nella Hero

```tsx
// In Hero.tsx — posiziona PRIMA del contenuto (z-0 per stare sotto il testo)
<section className="relative min-h-screen flex items-center mesh-gradient overflow-hidden">
  {/* Farfalle COLORATE che volano — full opacity, completamente visibili */}
  <FlyingButterflies count={5} />

  {/* Contenuto hero — z-10 per stare sopra le farfalle */}
  <div className="relative z-10 container mx-auto px-6 text-center">
    {/* ... titolo, CTA, ecc. */}
  </div>
</section>
```

> **IMPORTANTE:** `FlyingButterflies` deve essere importato con `dynamic` per evitare SSR mismatch:
> ```typescript
> const FlyingButterflies = dynamic(
>   () => import('@/components/ui/FlyingButterfly').then(m => m.FlyingButterflies),
>   { ssr: false }
> );
> ```

---

## 🔘 SISTEMA BOTTONI

```typescript
// src/components/ui/Button.tsx
const variants = {
  primary: `
    bg-gradient-to-r from-butterfly-500 to-coral-500
    text-white font-semibold
    shadow-lg shadow-butterfly-500/30
    hover:shadow-xl hover:shadow-butterfly-500/40
    hover:scale-[1.04] hover:-translate-y-1
    active:scale-[0.97]
    transition-all duration-200 ease-out
    rounded-2xl
  `,
  secondary: `
    bg-white border-2 border-butterfly-400
    text-butterfly-600 font-semibold
    hover:bg-butterfly-50 hover:border-butterfly-500
    hover:scale-[1.04] hover:-translate-y-1
    transition-all duration-200 ease-out
    rounded-2xl
  `,
  ghost: `
    bg-transparent text-butterfly-600
    hover:bg-butterfly-50 hover:text-butterfly-700
    transition-all duration-150
    rounded-xl
  `,
  whatsapp: `
    bg-gradient-to-r from-[#25D366] to-[#128C7E]
    text-white font-semibold
    shadow-lg shadow-green-500/30
    hover:shadow-xl hover:scale-[1.04] hover:-translate-y-1
    transition-all duration-200
    rounded-2xl
  `,
  outline: `
    border-2 border-white/70 text-white
    hover:bg-white/10 hover:border-white
    transition-all duration-200
    rounded-2xl backdrop-blur-sm
  `,
};

const sizes = {
  sm:  'px-4 py-2 text-sm gap-1.5',
  md:  'px-6 py-3 text-base gap-2',
  lg:  'px-8 py-4 text-lg gap-2.5',
  xl:  'px-10 py-5 text-xl gap-3',
};
```

---

## 🦋 HERO SECTION

### Struttura completa

```tsx
// src/components/sections/Hero.tsx
'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/config/site';

const FlyingButterflies = dynamic(
  () => import('@/components/ui/FlyingButterfly').then(m => m.FlyingButterflies),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center mesh-gradient overflow-hidden">

      {/* ── Farfalle che volano (z-0, dietro il testo) ───── */}
      <FlyingButterflies count={5} />

      {/* ── Blob decorativi sfumati (z-1) ────────────────── */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96
                      bg-butterfly-400/20 rounded-full blur-3xl animate-blob pointer-events-none z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80
                      bg-coral-400/15 rounded-full blur-3xl animate-blob [animation-delay:4s] pointer-events-none z-[1]" />

      {/* ── Contenuto principale (z-10) ───────────────────── */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">

        {/* Badge Capo Rizzuto */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-card
                     px-4 py-2 rounded-full text-sm font-medium
                     text-butterfly-700 mb-8"
        >
          <span>📍</span>
          <span>Isola di Capo Rizzuto · Calabria · Area Marina Protetta</span>
        </motion.div>

        {/* Titolo H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-6xl md:text-8xl font-bold tracking-tight mb-6 text-neutral-900"
        >
          La tua vacanza<br />
          <span className="gradient-text">prende il volo.</span>
        </motion.h1>

        {/* Sottotitolo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          4 camere indipendenti con bagno privato, colazione inclusa
          e WiFi superfast. Nel cuore di Isola di Capo Rizzuto,
          porta d'accesso all'Area Marina Protetta di Capo Rizzuto.
        </motion.p>

        {/* Prezzo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center items-baseline gap-2 mb-8"
        >
          <span className="text-4xl font-bold text-butterfly-600">€90</span>
          <span className="text-neutral-500">/notte</span>
          <span className="text-sm text-neutral-400 ml-2">colazione inclusa</span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <Button variant="primary" size="lg" href={`#camere`}>
            🏖️ Prenota ora
          </Button>
          <Button variant="whatsapp" size="lg"
            href={`https://wa.me/${SITE_CONFIG.whatsapp}`} external>
            💬 WhatsApp
          </Button>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-6 text-sm text-neutral-500"
        >
          {[
            { icon: '⭐', label: 'Verificato Booking.com' },
            { icon: '🏖️', label: 'Area Marina Protetta' },
            { icon: '☕', label: 'Colazione inclusa' },
            { icon: '❄️', label: 'Aria condizionata' },
            { icon: '📶', label: 'WiFi superfast' },
          ].map(({ icon, label }) => (
            <span key={label} className="flex items-center gap-1.5">
              <span>{icon}</span>
              <span>{label}</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 border-2 border-butterfly-400/50 rounded-full
                        flex items-start justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-butterfly-500 rounded-full animate-pulse-slow" />
        </div>
      </motion.div>
    </section>
  );
}
```

---

## 💎 QUALITÀ PERCEPITA — DETTAGLI PREMIUM

### Micro-interazioni obbligatorie

**Card camere — hover lift + overlay gradiente:**
```tsx
<div className="group relative overflow-hidden rounded-3xl card-hover cursor-pointer">
  {/* Immagine con zoom su hover */}
  <div className="overflow-hidden aspect-[4/3]">
    <Image
      className="w-full h-full object-cover
                 transition-transform duration-700 ease-out
                 group-hover:scale-[1.08]"
      ...
    />
  </div>

  {/* Overlay gradiente che appare su hover */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

  {/* Badge colore per camera (ogni camera ha badge diverso) */}
  <div className="absolute top-4 left-4">
    <span className="px-3 py-1 rounded-full text-xs font-bold text-white
                     bg-gradient-to-r from-butterfly-500 to-coral-500">
      Camera 1
    </span>
  </div>

  {/* Prezzo che emerge su hover */}
  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100
                  transition-all duration-300 translate-y-2 group-hover:translate-y-0">
    <span className="glass-card-dark px-3 py-1 rounded-full text-white font-bold text-sm">
      €90/notte
    </span>
  </div>
</div>
```

**Colori badge per le 4 camere:**
```typescript
const cameraColors = {
  1: 'from-butterfly-500 to-coral-500',   // viola → coral
  2: 'from-coral-500 to-amber-500',       // coral → amber
  3: 'from-amber-500 to-lime-600',        // amber → lime
  4: 'from-sky-500 to-butterfly-500',     // sky → viola
};
```

**Sezione "Perché Le Farfalle" — 4 card con accento colore diverso:**
```tsx
const features = [
  {
    icon: '🏖️',
    title: 'Centro di Isola',
    desc: 'Nel cuore di Isola di Capo Rizzuto, vicino a tutto.',
    accent: 'sky-500',
    bg:    'from-sky-50 to-sky-100/50',
    border:'border-sky-200',
  },
  {
    icon: '☕',
    title: 'Colazione inclusa',
    desc: 'Ogni mattina prodotti freschi e locali.',
    accent: 'amber-500',
    bg:    'from-amber-50 to-amber-100/50',
    border:'border-amber-200',
  },
  {
    icon: '🦋',
    title: 'Design unico',
    desc: 'Ambienti moderni e curati nei dettagli.',
    accent: 'butterfly-500',
    bg:    'from-butterfly-50 to-butterfly-100/50',
    border:'border-butterfly-200',
  },
  {
    icon: '🌿',
    title: 'Natura incontaminata',
    desc: 'Area Marina Protetta, acque cristalline.',
    accent: 'lime-600',
    bg:    'from-lime-50 to-lime-100/50',
    border:'border-lime-200',
  },
];
```

### Spaziatura e whitespace — regole tipografiche

```
Sezione (section): py-24 md:py-32
Container:         max-w-6xl mx-auto px-6
Gap tra sezioni:   space-y-20 o gap-20
Card padding:      p-6 md:p-8
H2 margin bottom:  mb-12 md:mb-16
Sottotitolo:       text-lg text-neutral-500 max-w-xl mx-auto text-center mb-16
```

### Transizioni pagina (framer-motion layout)

```tsx
// src/components/layout/PageWrapper.tsx
'use client';
import { motion } from 'framer-motion';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

### Sezione recensioni — stelle animate

```tsx
// Stelle con fill animato in sequenza
function AnimatedStars({ score }: { score: number }) {
  const stars = score / 2; // 9/10 → 4.5 stelle
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
          className={i <= Math.floor(stars) ? 'text-amber-400' : 'text-neutral-300'}
          style={{ fontSize: '1.25rem' }}
        >
          {i <= Math.floor(stars) || (i === Math.ceil(stars) && stars % 1 !== 0)
            ? '★' : '☆'}
        </motion.span>
      ))}
    </div>
  );
}
```

---

## 📸 PREPARAZIONE NUOVE FOTO — SISTEMA PLACEHOLDER

Quando arrivano nuove foto, ogni camera deve avere slot espliciti. Struttura da implementare:

```typescript
// src/config/rooms.ts
export interface RoomPhoto {
  filename: string;
  alt: string;
  placeholder: boolean;  // true = foto non ancora disponibile
  category: 'main' | 'bathroom' | 'detail' | 'view';
}

export const roomsConfig = [
  {
    id: 'camera-1',
    name: { it: 'Camera 1', en: 'Room 1', de: 'Zimmer 1' },
    pricePerNight: 90,
    maxGuests: 2,
    sqm: 22,
    amenities: ['Bagno privato', 'A/C', 'WiFi', 'TV', 'Colazione inclusa'],
    accentColor: 'from-butterfly-500 to-coral-500',
    photos: [
      {
        filename: 'camera-2-letto-medium.webp',
        alt: 'Camera 1 - letto matrimoniale con vista giardino',
        placeholder: false,
        category: 'main',
      },
      {
        filename: 'camera-2-bagno.webp',
        alt: 'Camera 1 - bagno privato con doccia',
        placeholder: false,
        category: 'bathroom',
      },
      // SLOT VUOTI — verranno sostituiti con nuove foto
      // Aggiungi nuove voci con placeholder: true quando le foto arrivano
    ],
  },
  // ... camera-2, camera-3, camera-4 stesso pattern
];
```

**Componente immagine con fallback placeholder:**
```tsx
function RoomImage({ photo }: { photo: RoomPhoto }) {
  if (photo.placeholder) {
    // Placeholder colorato mentre la foto non è disponibile
    return (
      <div className="w-full aspect-[4/3] bg-gradient-to-br
                      from-butterfly-100 to-coral-100 rounded-2xl
                      flex items-center justify-center text-butterfly-400">
        <span className="text-4xl">📷</span>
        {/* TODO: sostituire con <Image> quando la foto è disponibile */}
      </div>
    );
  }
  return (
    <Image
      src={`/images/rooms/${photo.filename}`}
      alt={photo.alt}
      width={800} height={600}
      loading="lazy"
      className="w-full h-full object-cover"
    />
  );
}
```

**Per aggiungere nuove foto:** basta mettere il file in `/public/images/rooms/`, aggiornare `filename` in `roomsConfig` e mettere `placeholder: false`. **Zero refactoring necessario.**

---

## 🧩 HEADER — Navbar scroll-aware

```tsx
// src/components/layout/Header.tsx
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const handler = () => setScrolled(window.scrollY > 80);
  window.addEventListener('scroll', handler, { passive: true });
  return () => window.removeEventListener('scroll', handler);
}, []);
```

**Stile:**
- **Sopra l'80px**: `bg-transparent`, logo bianco/colorato, link bianchi
- **Dopo l'80px**: `glass-card`, logo colorato, link scuri
- Transizione: `transition-all duration-300`
- Logo: `<ButterflyIcon />` (w-8 h-8) + "Le Farfalle" in font-display
- Mobile: menu hamburger → overlay full-screen `bg-gradient-to-b from-butterfly-900 to-coral-900`

---

## 🗺️ FOOTER

```
Sfondo: bg-gradient-to-br from-butterfly-950/95 to-coral-950/95
        oppure bg-neutral-900 se i colori non sono definiti nella palette
3 colonne:
  Col 1: ButterflyIcon + "Residence Le Farfalle" + claim + social icons (placeholder)
  Col 2: Navigazione rapida (Home, Camere, Servizi, Territorio, Prenota, Contatti)
  Col 3: Contatti (telefono, email, WhatsApp, indirizzo)
Strip copyright:
  © 2025 Residence Le Farfalle · Privacy Policy · Cookie Policy · Termini
```

---

## 📐 STRUTTURA PAGINE

### Homepage (`/[locale]/page.tsx`)

```
1. <Hero />           full screen, farfalle volanti COLORATE, gradient text
2. <TrustBar />       strip bg-butterfly-50, 5 USP con icone
3. <RoomsPreview />   grid 2×2 desktop, card glassmorphism + hover lift + prezzo €90
4. <WhyUs />          4 card con accento colore diverso (sky/amber/butterfly/lime)
5. <Services />       icone colorate, grid 3 colonne
6. <Reviews />        carousel stelle animate, bg-surface-2
7. <Location />       embed mappa + info territorio
8. <CTABanner />      gradient full-width butterfly→coral, CTA grande
```

### Camere (`/[locale]/camere`)

- Card per ogni camera con: immagine (zoom hover), badge colore, servizi come pill, prezzo €90, CTA
- Lightbox su click immagine
- `roomsConfig` come sorgente dati unica

### Prenotazione (`/[locale]/prenota`)

- Form: nome, cognome, email, telefono, check-in, check-out, num. ospiti, camera preferita, note
- Prezzo estimato dinamico calcolato dal config (€90 × notti)
- Checkbox privacy obbligatorio
- Submit: email `mailto:` o form action (configura in env)

---

## 📋 TASK LIST — ORDINE DI ESECUZIONE

Esegui i task IN QUESTO ORDINE. Non passare al successivo senza completare il precedente.

### TASK 0 — Preparazione immediata
- [ ] Configura git author: `git config user.email "bestiolinaferoce@gmail.com"`
- [ ] Aggiorna prezzi in `src/config/site.ts`: `pricePerNight: 90` per tutte le camere
- [ ] `npm run build` — verifica che parta senza errori prima di modificare

### TASK 1 — Design system base
- [ ] Aggiorna `tailwind.config.ts`: palette butterfly/coral/lime/amber + keyframes
- [ ] Aggiorna `globals.css`: tutte le classi elencate sopra
- [ ] Aggiorna font in `layout.tsx`: Plus Jakarta Sans + Syne
- [ ] Ridisegna `src/components/ui/Button.tsx`: 5 varianti
- [ ] Crea `src/components/ui/ButterflyIcon.tsx` con props colore
- [ ] Crea `src/components/ui/FlyingButterfly.tsx` con configurazione 5 farfalle colorate

### TASK 2 — Hero section
- [ ] Ridisegna `src/components/sections/Hero.tsx`
  - FlyingButterflies con farfalle COLORATE (viola, coral, amber, lime, sky)
  - H1 con gradient-text
  - Prezzo €90/notte prominente
  - CTA doppio (Prenota + WhatsApp)
  - Trust bar con 5 USP
  - Scroll indicator animato
- [ ] Verifica su localhost che le farfalle siano visibili e colorate

### TASK 3 — Componenti riutilizzabili
- [ ] Crea `src/components/ui/Lightbox.tsx`
- [ ] Crea `src/components/ui/AnimatedStars.tsx`
- [ ] Crea `src/components/ui/WaveDivider.tsx`
- [ ] Crea `src/components/layout/PageWrapper.tsx` (transizione pagina)
- [ ] Crea `src/components/sections/TrustBar.tsx`
- [ ] Crea `src/components/sections/WhyUs.tsx` (4 card colorate)
- [ ] Crea `src/components/sections/CTABanner.tsx`
- [ ] Crea `src/config/rooms.ts` con `roomsConfig` + slot foto placeholder

### TASK 4 — Header e Footer
- [ ] Aggiorna `Header.tsx`: scroll-aware glassmorphism + ButterflyIcon logo
- [ ] Aggiorna `Footer.tsx`: 3 colonne + strip copyright + link GDPR

### TASK 5 — Pagine
- [ ] Homepage: tutti gli 8 blocchi
- [ ] `/camere`: card + lightbox + €90 per ogni camera
- [ ] `/servizi`: layout a grid, icone colorate
- [ ] `/territorio`: mappa + card attrazioni
- [ ] `/prenota`: form moderno + prezzo stimato
- [ ] `/contatti`: info + form + mappa embed

### TASK 6 — GDPR (OBBLIGATORIO)
- [ ] Crea `src/components/gdpr/CookieBanner.tsx`
- [ ] Crea `src/app/[locale]/privacy/page.tsx`
- [ ] Crea `src/app/[locale]/cookie/page.tsx`
- [ ] Crea `src/app/[locale]/termini/page.tsx`
- [ ] Integra cookie banner nel layout root
- [ ] Aggiungi Google Analytics condizionale (solo con consenso analytics)

### TASK 7 — SEO
- [ ] Structured data JSON-LD `LodgingBusiness` in layout
- [ ] `generateMetadata` completo su ogni page.tsx
- [ ] Open Graph + Twitter Card
- [ ] hreflang IT/EN/DE in `<head>`
- [ ] Verifica sitemap.ts
- [ ] `og-image.jpg` 1200×630 in `/public/images/`

### TASK 8 — QA e Deploy
- [ ] `npm run build` → 0 errori, 0 warning critici
- [ ] Test su mobile (320px, 375px, 414px)
- [ ] Verifica farfalle visibili e animate su tutti i browser
- [ ] Push su main → deploy Vercel verde
- [ ] Configura dominio `residencelefarfalle.it` su Vercel

---

## 🛡️ GDPR — IMPLEMENTAZIONE COMPLETA

### Cookie Banner

```typescript
// localStorage key: 'le-farfalle-cookie-consent'
interface CookieConsent {
  necessary: true;
  analytics: boolean;   // Google Analytics (solo con consenso)
  marketing: boolean;
  timestamp: number;
  version: '1.0';
}
```

**Requisiti:**
- Fixed bottom, glassmorphism style
- 3 pulsanti: "Accetta tutti" | "Solo necessari" | "Preferenze ▸"
- Preferenze → drawer/modal con toggle separati per analytics e marketing
- NON pre-selezionare analytics o marketing
- Links: `/privacy` e `/cookie`

### Pagine GDPR
- `/[locale]/privacy` — Privacy Policy completa (testo in italiano professionale)
- `/[locale]/cookie`  — Cookie Policy con tabella
- `/[locale]/termini` — Termini e Condizioni

### Form e consenso (obbligatorio in prenota e contatti)

```tsx
<label className="flex gap-2 items-start cursor-pointer">
  <input type="checkbox" required name="privacy-consent" className="mt-0.5" />
  <span className="text-sm text-neutral-600">
    Ho letto e accetto la{' '}
    <Link href={`/${locale}/privacy`} className="text-butterfly-600 underline">
      Privacy Policy
    </Link>.
    Acconsento al trattamento dei miei dati personali.
  </span>
</label>
```

---

## 🔍 SEO — REQUISITI OBBLIGATORI

### Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Residence Le Farfalle",
  "description": "4 camere indipendenti con bagno privato a Isola di Capo Rizzuto, Calabria. Colazione inclusa, WiFi superfast, aria condizionata. Da €90/notte.",
  "url": "https://residencelefarfalle.it",
  "telephone": "+39XXXXXXXXXX",
  "email": "info@residencelefarfalle.it",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Via Capo delle Colonne",
    "addressLocality": "Isola di Capo Rizzuto",
    "addressRegion": "KR",
    "postalCode": "88841",
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.96171494411169,
    "longitude": 17.09162398176466
  },
  "numberOfRooms": 4,
  "priceRange": "€€",
  "checkinTime": "14:00",
  "checkoutTime": "10:00",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "WiFi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Colazione inclusa", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Aria condizionata", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Bagno privato", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Parcheggio", "value": true }
  ]
}
```

### Modello generateMetadata (copia su ogni page.tsx)

```typescript
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Titolo | Residence Le Farfalle - Isola di Capo Rizzuto',
    description: 'Descrizione max 155 caratteri...',
    alternates: {
      canonical: `https://residencelefarfalle.it/${locale}/pagina`,
      languages: {
        'it': `https://residencelefarfalle.it/it/pagina`,
        'en': `https://residencelefarfalle.it/en/pagina`,
        'de': `https://residencelefarfalle.it/de/pagina`,
      },
    },
    openGraph: {
      title: '...',
      description: '...',
      images: [{ url: 'https://residencelefarfalle.it/images/og-image.jpg', width: 1200, height: 630 }],
      locale: locale === 'it' ? 'it_IT' : locale === 'en' ? 'en_US' : 'de_DE',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', images: ['https://residencelefarfalle.it/images/og-image.jpg'] },
  };
}
```

---

## 📸 IMMAGINI — REGOLE CRITICHE

### Disponibili in `/public/images/rooms/`
Ogni immagine esiste in 3 varianti:
- `nome.webp` — full (lightbox)
- `nome-medium.webp` — card principale
- `nome-thumb.webp` — thumbnail

### Mappatura camere
```typescript
camera1: ['camera-2-letto', 'camera-2-interno', 'camera-2-arredi', 'camera-2-bagno']
camera2: ['camera-3-letto', 'camera-3-interno']
camera3: ['camera-4-interno', 'camera-5-interno']
camera4: ['camera-generale', 'dettagli-interni']
```

### Attributi HTML obbligatori
```tsx
<Image
  src={`/images/rooms/${filename}`}
  alt="descrizione specifica della stanza"
  width={800} height={600}
  loading="lazy"           // "eager" + fetchPriority="high" SOLO per hero
  className="object-cover w-full h-full"
/>
```

---

## ⚡ PERFORMANCE

- Hero image: `loading="eager"` + `fetchPriority="high"` (è la LCP)
- Tutte le altre immagini: `loading="lazy"`
- `FlyingButterflies`: importato con `dynamic({ ssr: false })` — nessun hydration mismatch
- Animazioni Framer Motion: `viewport={{ once: true }}` su tutti i `whileInView`
- Font: `display: 'swap'` su tutti i Google Fonts
- `npm run build` deve completare senza errori

---

## 🔧 VARIABILI D'AMBIENTE

```bash
# .env.local (non committare)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://residencelefarfalle.it
NEXT_PUBLIC_WHATSAPP=+39XXXXXXXXXX      # TODO: numero reale
NEXT_PUBLIC_PHONE=+39XXXXXXXXXX         # TODO: numero reale
NEXT_PUBLIC_EMAIL=info@residencelefarfalle.it
```

---

## 🚨 ERRORI COMUNI — DA EVITARE

1. **Farfalle grigie/trasparenti** — NON usare `text-neutral`, NON usare `opacity-[0.15]`. Le farfalle devono essere COLORATE e VISIBILI
2. **Farfalle statiche** — NON usare solo CSS flutter. Devono VOLARE attraverso lo schermo con framer-motion (x, y animati)
3. **Prezzi sbagliati** — il prezzo è €90/notte. Controlla OGNI punto del sito
4. **NON usare `vercel deploy`** — solo `git push origin main`
5. **Email git sbagliata** — deve essere `bestiolinaferoce@gmail.com` altrimenti Vercel blocca
6. **GDPR mancante** — il sito NON può andare online senza cookie banner e pagine legali
7. **NON usare `<img>` raw** — sempre `next/image`
8. **Colori B&B Armenes** — VIETATI: navy `#1B2B4B`, teal `#0d9488`, gold `#E8C97A`
9. **`loading="eager"` su tutte le immagini** — solo sull'hero
10. **Mancanza di `generateStaticParams()`** — obbligatorio in ogni page.tsx con params dinamici

---

## ✅ DEFINIZIONE DI DONE

Il task è completato quando:
- [ ] `npm run build` → 0 errori
- [ ] `npm run lint` → 0 warning
- [ ] Sito a `http://localhost:3000/it`
- [ ] Farfalle COLORATE e ANIMATE che volano visibilmente attraverso la hero
- [ ] Prezzo €90/notte visibile in hero, card camere e pagina prenotazione
- [ ] Tutte le 7+ pagine navigabili
- [ ] Cookie banner appare al primo accesso
- [ ] Privacy, Cookie, Termini accessibili dal footer
- [ ] Structured data JSON-LD presente
- [ ] Open Graph funzionante
- [ ] Push su `main` → deploy Vercel verde
- [ ] Nessun testo placeholder visibile sul sito

---

*Questo documento è la fonte unica di verità per il progetto Residence Le Farfalle.*
*Versione 2.0 — aggiornata con farfalle colorate volanti, prezzi €90/notte, sistema foto placeholder e dettagli qualità premium.*
