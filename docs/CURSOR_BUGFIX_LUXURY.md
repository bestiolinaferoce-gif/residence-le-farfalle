# 🚨 BUGFIX + LUXURY UPGRADE — Residence Le Farfalle
> Versione: 1.0 — 2026-03-11
> **ESEGUI IN ORDINE. OGNI STEP HA UNA VERIFICA. NON PROCEDERE SE LA VERIFICA FALLISCE.**
> Leggi anche `docs/CURSOR_AGENT_INSTRUCTIONS.md` per il design system completo.

---

## 🔴 DIAGNOSI DEI BUG ATTUALI (analisi da screenshot)

### BUG 1 — Farfalle grigie e statiche [CRITICO]
**Causa:** `ButterflyIcon` usa `fill="currentColor"` + opacity 0.15–0.20 = grigio invisibile.
In Hero.tsx le farfalle hanno solo CSS `animate-flutter` (vibrazione ali sul posto).
**Nessun movimento x/y attraverso il viewport.** Non volano — fluttuano sul posto.

### BUG 2 — Bottone "Prenota ora" invisibile [CRITICO]
**Causa:** In `siteConfig.contacts.whatsapp = "+39 XXX XXX XXXX"`.
Dopo `replace(/\D/g, "")` → `"39"` → lunghezza 2, non ≥ 10 → `hasWhatsApp = false`.
Perciò mostra il bottone "Contattaci" in `secondary` (outline nero), mentre
"Prenota ora" diventa quasi invisibile perché Tailwind JIT non ha generato
`shadow-butterfly-500/25` finché non c'è una classe concreta nel markup.

### BUG 3 — Header usa colori `primary` non definiti [ALTO]
**Causa:** `Header.tsx` usa `text-primary-500`, `text-primary-600` — palette non definita.
Risultato: link nav grigi, Sparkles grigio, nessun colore brand.

### BUG 4 — `roomsConfig` senza prezzi né descrizioni [ALTO]
**Causa:** `src/config/site.ts` ha solo id, name, capacity, size — mancano prezzo e testi.
Il sito non mostra €90/notte e le camere non hanno copy luxury.

### BUG 5 — Design home page non luxury [CRITICO]
La home appare come un sito amatoriale: bottoni senza stile, grafica infantile,
nessuna gerarchia visiva, tipografia piatta. Richiede redesign completo.

---

## ✅ FIX OBBLIGATORI — STEP BY STEP

---

### FIX 1 — ButterflyIcon con colori espliciti

**Sostituisci COMPLETAMENTE `src/components/ui/ButterflyIcon.tsx`:**

```tsx
// src/components/ui/ButterflyIcon.tsx
import React from "react";
import { cn } from "@/src/lib/utils";

interface ButterflyIconProps {
  className?: string;
  wingColor?: string;       // colore ali superiori (hex o rgb)
  wingColorInner?: string;  // colore ali inferiori
  bodyColor?: string;       // colore corpo e antenne
}

export function ButterflyIcon({
  className,
  wingColor    = "#d946ef",   // butterfly-500
  wingColorInner = "#f43f5e", // coral-500
  bodyColor    = "#701a75",   // butterfly-900
}: ButterflyIconProps) {
  return (
    <svg
      viewBox="0 0 100 72"
      className={cn("w-full h-auto", className)}
      aria-hidden="true"
      role="presentation"
    >
      {/* Ali superiori */}
      <ellipse cx="29" cy="27" rx="27" ry="20"
        fill={wingColor} opacity="0.88"
        transform="rotate(-18 29 27)" />
      <ellipse cx="71" cy="27" rx="27" ry="20"
        fill={wingColor} opacity="0.88"
        transform="rotate(18 71 27)" />
      {/* Ali inferiori */}
      <ellipse cx="26" cy="49" rx="19" ry="13"
        fill={wingColorInner} opacity="0.72"
        transform="rotate(12 26 49)" />
      <ellipse cx="74" cy="49" rx="19" ry="13"
        fill={wingColorInner} opacity="0.72"
        transform="rotate(-12 74 49)" />
      {/* Corpo */}
      <ellipse cx="50" cy="38" rx="3.5" ry="15" fill={bodyColor} opacity="0.90" />
      {/* Testa */}
      <circle cx="50" cy="22" r="3" fill={bodyColor} opacity="0.85" />
      {/* Antenne */}
      <path d="M50,20 Q44,12 39,7" stroke={bodyColor} strokeWidth="1.3"
        fill="none" opacity="0.70" strokeLinecap="round"/>
      <circle cx="39" cy="7" r="2" fill={bodyColor} opacity="0.70"/>
      <path d="M50,20 Q56,12 61,7" stroke={bodyColor} strokeWidth="1.3"
        fill="none" opacity="0.70" strokeLinecap="round"/>
      <circle cx="61" cy="7" r="2" fill={bodyColor} opacity="0.70"/>
    </svg>
  );
}
```

---

### FIX 2 — FlyingButterfly: farfalle che VOLANO attraverso lo schermo

**Crea `src/components/ui/FlyingButterfly.tsx`:**

```tsx
// src/components/ui/FlyingButterfly.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ButterflyIcon } from "./ButterflyIcon";

// 5 farfalle con percorsi che ATTRAVERSANO il viewport
// startX/endX fuori dallo schermo (-15% e 115%) = entrano ed escono
const BUTTERFLIES = [
  {
    id: 1,
    size: 80,
    startX: "-15%", startY: "18%",
    midX: "50%",    midY: "30%",
    endX: "115%",   endY: "22%",
    duration: 22, delay: 0,
    wingColor: "#d946ef",       // viola
    wingColorInner: "#f0abfc",
    bodyColor: "#701a75",
    flutter: "0.55s",
  },
  {
    id: 2,
    size: 56,
    startX: "-12%", startY: "62%",
    midX: "45%",    midY: "48%",
    endX: "115%",   endY: "55%",
    duration: 28, delay: 5,
    wingColor: "#f43f5e",       // coral
    wingColorInner: "#fda4af",
    bodyColor: "#881337",
    flutter: "0.45s",
  },
  {
    id: 3,
    size: 96,
    startX: "115%",  startY: "25%",
    midX: "55%",     midY: "40%",
    endX: "-15%",    endY: "30%",
    duration: 32, delay: 9,
    wingColor: "#f59e0b",       // amber
    wingColorInner: "#fcd34d",
    bodyColor: "#92400e",
    flutter: "0.65s",
  },
  {
    id: 4,
    size: 48,
    startX: "-10%",  startY: "80%",
    midX: "40%",     midY: "55%",
    endX: "115%",    endY: "20%",
    duration: 26, delay: 13,
    wingColor: "#84cc16",       // lime
    wingColorInner: "#bef264",
    bodyColor: "#365314",
    flutter: "0.50s",
  },
  {
    id: 5,
    size: 68,
    startX: "115%",  startY: "70%",
    midX: "60%",     midY: "35%",
    endX: "-12%",    endY: "25%",
    duration: 24, delay: 18,
    wingColor: "#38bdf8",       // sky
    wingColorInner: "#7dd3fc",
    bodyColor: "#0284c7",
    flutter: "0.60s",
  },
];

// Keyframe CSS per battito ali — iniettato una sola volta
const FLUTTER_CSS = `
@keyframes bf-flutter {
  0%,100% { transform: scaleX(1)   rotate(-6deg); }
  50%      { transform: scaleX(0.88) rotate(6deg); }
}`;

export function FlyingButterflies({ count = 5 }: { count?: number }) {
  return (
    <>
      <style>{FLUTTER_CSS}</style>
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 2 }}
      >
        {BUTTERFLIES.slice(0, count).map((b) => (
          <motion.div
            key={b.id}
            className="absolute"
            style={{ width: b.size, height: b.size }}
            initial={{ left: b.startX, top: b.startY, opacity: 0 }}
            animate={{
              left:    [b.startX, b.midX, b.endX],
              top:     [b.startY, b.midY, b.endY],
              opacity: [0, 0.90, 0.90, 0],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
              opacity: { times: [0, 0.07, 0.93, 1] },
            }}
          >
            {/* Flutter CSS sovrapposto al movimento framer-motion */}
            <div style={{
              animation: `bf-flutter ${b.flutter} ease-in-out infinite alternate`,
              transformOrigin: "center",
              filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))",
            }}>
              <ButterflyIcon
                wingColor={b.wingColor}
                wingColorInner={b.wingColorInner}
                bodyColor={b.bodyColor}
                className="w-full h-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
```

> **IMPORTANTE:** importa con `dynamic({ ssr: false })` in qualsiasi Server Component.

---

### FIX 3 — Hero.tsx: sostituisci le farfalle statiche con FlyingButterflies

**Sostituisci COMPLETAMENTE `src/components/sections/Hero.tsx`:**

```tsx
// src/components/sections/Hero.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MapPin, Coffee, Snowflake, Waves, Wifi } from "lucide-react";
import Button from "@/src/components/ui/Button";
import Container from "@/src/components/ui/Container";

// SSR: false — evita hydration mismatch sulle posizioni random
const FlyingButterflies = dynamic(
  () => import("@/src/components/ui/FlyingButterfly").then((m) => m.FlyingButterflies),
  { ssr: false }
);

const trustItems = [
  { icon: Star,      label: "Verificato" },
  { icon: MapPin,    label: "Centro Isola di Capo Rizzuto" },
  { icon: Coffee,    label: "Colazione inclusa" },
  { icon: Snowflake, label: "A/C in ogni camera" },
  { icon: Wifi,      label: "WiFi superfast" },
];

interface HeroProps {
  locale?: string;
}

export default function Hero({ locale = "it" }: HeroProps) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero principale"
      style={{
        background: `
          radial-gradient(ellipse at 15% 50%, rgba(217,70,239,0.14) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 15%, rgba(244,63,94,0.11) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 85%, rgba(14,165,233,0.08) 0%, transparent 55%),
          #FEFBFF
        `,
      }}
    >
      {/* ── Farfalle COLORATE che volano ─────────────────────── */}
      <FlyingButterflies count={5} />

      {/* ── Blob decorativi sfumati ───────────────────────────── */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(217,70,239,0.10)", zIndex: 1 }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(244,63,94,0.08)", zIndex: 1 }}
      />

      {/* ── Contenuto principale ─────────────────────────────── */}
      <Container className="relative text-center py-32" style={{ zIndex: 10 }}>

        {/* Badge location */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 inline-flex"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5
                       text-sm font-medium text-butterfly-700"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(217,70,239,0.18)",
              boxShadow: "0 4px 20px rgba(217,70,239,0.08)",
            }}
          >
            📍 Isola di Capo Rizzuto · Calabria · Area Marina Protetta
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15 }}
          className="font-display font-bold tracking-tight text-neutral-900 mb-6"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)", lineHeight: 1.1 }}
        >
          La tua vacanza<br />
          <span
            style={{
              background: "linear-gradient(135deg, #d946ef 0%, #f43f5e 55%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            prende il volo.
          </span>
        </motion.h1>

        {/* Sottotitolo */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          4 camere indipendenti con bagno privato, colazione inclusa e WiFi superfast.
          Nel cuore di Isola di Capo Rizzuto, a pochi chilometri dall&apos;Area Marina Protetta.
        </motion.p>

        {/* Prezzo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          className="flex justify-center items-baseline gap-2 mb-10"
        >
          <span
            className="text-5xl font-bold"
            style={{ color: "#d946ef" }}
          >€90</span>
          <span className="text-neutral-500 text-lg">/notte</span>
          <span
            className="text-sm rounded-full px-3 py-1 ml-2 font-medium"
            style={{ background: "#fae8ff", color: "#a21caf" }}
          >colazione inclusa</span>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.52 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
        >
          <Link href={`/${locale}/prenota`}>
            <Button variant="primary" size="lg">
              🏖️ Prenota ora
            </Button>
          </Link>
          <Link href={`/${locale}/contatti`}>
            <Button variant="secondary" size="lg">
              ✉️ Contattaci
            </Button>
          </Link>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4"
        >
          {trustItems.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full
                         px-4 py-2 text-sm font-medium text-butterfly-700"
              style={{
                background: "rgba(253,244,255,0.85)",
                border: "1px solid rgba(217,70,239,0.15)",
              }}
            >
              <Icon className="h-4 w-4" style={{ color: "#d946ef" }} />
              {label}
            </span>
          ))}
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 10 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 text-neutral-400"
        >
          <div
            className="w-6 h-9 rounded-full border-2 flex items-start justify-center pt-1.5"
            style={{ borderColor: "rgba(217,70,239,0.4)" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#d946ef", animation: "pulse 2s infinite" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

> **VERIFICA DOPO FIX 3:**
> Ricarica `http://localhost:3000/it`. Devi vedere 5 farfalle colorate (viola, rosso, giallo, verde, azzurro) che si muovono lentamente attraverso lo schermo. Se non le vedi, apri DevTools → Console e cerca errori. Controlla anche che il bottone "Prenota ora" sia visibile con il gradiente viola→coral.

---

### FIX 4 — Header luxury con colori butterfly

**Sostituisci i riferimenti a `primary-` con `butterfly-` in `src/components/layout/Header.tsx`:**

```tsx
// Sostituzioni da fare (find & replace):
// "text-primary-500"  →  sostituisci con lo stile inline:  color: '#d946ef'
// "text-primary-600"  →  sostituisci con: color: '#c026d3'
// "hover:text-primary-500" → classe Tailwind: hover:text-butterfly-500

// Logo — sostituisci Sparkles con ButterflyIcon:
import { ButterflyIcon } from "@/src/components/ui/ButterflyIcon";
// ...
<Link href={`/${locale}`} className="flex items-center gap-2.5 group">
  <div className="w-9 h-9 transition-transform duration-300 group-hover:scale-110">
    <ButterflyIcon
      wingColor="#d946ef"
      wingColorInner="#f43f5e"
      bodyColor="#701a75"
    />
  </div>
  <span className="text-xl font-display font-bold text-neutral-900">
    Le Farfalle
  </span>
</Link>

// Header scrollato — sostituisci:
// "bg-white/95 backdrop-blur-md shadow-soft"
// con stile inline per glassmorphism corretto:
style={isScrolled ? {
  background: "rgba(255,255,255,0.88)",
  backdropFilter: "blur(20px) saturate(1.6)",
  WebkitBackdropFilter: "blur(20px) saturate(1.6)",
  boxShadow: "0 1px 40px rgba(217,70,239,0.08), 0 1px 0 rgba(255,255,255,0.6) inset",
  borderBottom: "1px solid rgba(217,70,239,0.10)",
} : {
  background: "rgba(254,251,255,0.60)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
}}

// Nav links — aggiungi underline animato butterfly:
// Per ogni nav link, usa la classe CSS .nav-link (già in globals.css) oppure:
className={cn(
  "text-sm font-medium transition-colors relative nav-link",
  isActive
    ? "text-butterfly-600 font-semibold"
    : "text-neutral-700 hover:text-butterfly-600"
)}

// Bottone header:
<Button variant="primary" size="sm">
  Prenota ora
</Button>
```

---

### FIX 5 — roomsConfig con prezzi e contenuti luxury

**Sostituisci COMPLETAMENTE la sezione `roomsConfig` in `src/config/site.ts`:**

```typescript
export const roomsConfig = [
  {
    id: 1,
    slug: "camera-1",
    pricePerNight: 90,
    name: {
      it: "Camera Glicine",
      en: "Wisteria Room",
      de: "Glyzinie Zimmer",
    },
    tagline: {
      it: "Eleganza e luce naturale",
      en: "Elegance and natural light",
      de: "Eleganz und natürliches Licht",
    },
    description: {
      it: "Camera matrimoniale con arredi moderni in legno chiaro, illuminazione calda e bagno privato con doccia walk-in. La luce naturale entra da ampie finestre che si affacciano sul giardino interno.",
      en: "Double room with modern light wood furniture, warm lighting and private bathroom with walk-in shower. Natural light comes in through large windows overlooking the inner garden.",
      de: "Doppelzimmer mit modernen Möbeln aus hellem Holz, warmem Licht und eigenem Bad mit begehbarer Dusche. Natürliches Licht fällt durch große Fenster mit Blick auf den Innengarten.",
    },
    capacity: 2,
    size: 20,
    accentColor: "from-butterfly-500 to-coral-500",
    badgeColor: { bg: "#fae8ff", text: "#a21caf" },
    amenities: [
      "Bagno privato con doccia",
      "Smart TV 40\"",
      "Aria condizionata inverter",
      "WiFi 100 Mbps",
      "Tende oscuranti",
      "Asciugacapelli",
      "Cuscini memory foam",
    ],
    images: ["camera-2-letto-medium.webp", "camera-2-interno.webp", "camera-2-bagno.webp"],
  },
  {
    id: 2,
    slug: "camera-2",
    pricePerNight: 90,
    name: {
      it: "Camera Corallo",
      en: "Coral Room",
      de: "Korallen Zimmer",
    },
    tagline: {
      it: "Calore mediterraneo",
      en: "Mediterranean warmth",
      de: "Mediterranes Flair",
    },
    description: {
      it: "La camera più spaziosa (25 mq) con palette cromatica ispirata al mare calabrese. Letto matrimoniale king-size, bagno con doccia e dettagli in ceramica locale. Perfetta per coppie che cercano comfort extra.",
      en: "The most spacious room (25 sqm) with a color palette inspired by the Calabrian sea. King-size double bed, bathroom with shower and local ceramic details. Perfect for couples seeking extra comfort.",
      de: "Das geräumigste Zimmer (25 qm) mit einer Farbpalette, inspiriert vom kalabrischen Meer. King-Size-Doppelbett, Bad mit Dusche und Keramikdetails aus der Region. Perfekt für Paare.",
    },
    capacity: 2,
    size: 25,
    accentColor: "from-coral-500 to-amber-500",
    badgeColor: { bg: "#fff1f2", text: "#be123c" },
    amenities: [
      "Bagno privato con doccia",
      "Smart TV 43\"",
      "Aria condizionata inverter",
      "WiFi 100 Mbps",
      "Tende oscuranti",
      "Asciugacapelli",
      "Minibar",
    ],
    images: ["camera-3-letto-medium.webp", "camera-3-interno.webp"],
  },
  {
    id: 3,
    slug: "camera-3",
    pricePerNight: 90,
    name: {
      it: "Camera Ambra",
      en: "Amber Room",
      de: "Bernstein Zimmer",
    },
    tagline: {
      it: "Il calore del sole di Calabria",
      en: "The warmth of Calabrian sunshine",
      de: "Die Wärme der kalabrischen Sonne",
    },
    description: {
      it: "Arredata con tonalità calde ambra e terracotta, questa camera crea un'atmosfera avvolgente e mediterranea. Bagno privato con doccia e finiture di pregio. Ideale per chi ama il calore autentico del Sud.",
      en: "Furnished in warm amber and terracotta tones, this room creates a welcoming Mediterranean atmosphere. Private bathroom with shower and quality finishes. Ideal for lovers of authentic Southern Italian warmth.",
      de: "In warmen Bernstein- und Terrakottatönen eingerichtet, schafft dieses Zimmer eine einladende mediterrane Atmosphäre mit Bad und hochwertigen Oberflächen.",
    },
    capacity: 2,
    size: 22,
    accentColor: "from-amber-500 to-lime-600",
    badgeColor: { bg: "#fffbeb", text: "#b45309" },
    amenities: [
      "Bagno privato con doccia",
      "Smart TV 40\"",
      "Aria condizionata inverter",
      "WiFi 100 Mbps",
      "Tende oscuranti",
      "Asciugacapelli",
    ],
    images: ["camera-4-interno-medium.webp", "camera-5-interno.webp"],
  },
  {
    id: 4,
    slug: "camera-4",
    pricePerNight: 90,
    name: {
      it: "Camera Lime",
      en: "Lime Room",
      de: "Limette Zimmer",
    },
    tagline: {
      it: "Freschezza e natura",
      en: "Freshness and nature",
      de: "Frische und Natur",
    },
    description: {
      it: "La camera più grande (30 mq), ispirata ai colori della macchia mediterranea calabrese. Arredi minimalisti in legno naturale, ampio bagno privato con doccia. Un rifugio di pace a pochi minuti dalle spiagge dell'Area Marina Protetta.",
      en: "The largest room (30 sqm), inspired by the colors of Calabrian Mediterranean scrubland. Minimalist natural wood furniture, large private bathroom with shower. A peaceful retreat minutes from the Marine Protected Area beaches.",
      de: "Das größte Zimmer (30 qm), inspiriert von der kalabrischen Macchia. Minimalistisches Naturholzmobiliar, großes Privatbad mit Dusche. Eine ruhige Oase nahe den Stränden des Meeresschutzgebiets.",
    },
    capacity: 2,
    size: 30,
    accentColor: "from-sky-500 to-butterfly-500",
    badgeColor: { bg: "#f0f9ff", text: "#0284c7" },
    amenities: [
      "Bagno privato con doccia",
      "Smart TV 43\"",
      "Aria condizionata inverter",
      "WiFi 100 Mbps",
      "Tende oscuranti",
      "Asciugacapelli",
      "Scrivania lavoro",
    ],
    images: ["camera-generale-medium.webp", "dettagli-interni-medium.webp"],
  },
] as const;
```

---

### FIX 6 — Navigation luxury con tabs moderni

**Aggiorna `src/config/navigation.ts`** (o dove è definito `navigation.main`):

```typescript
export const navigation = {
  main: [
    { name: "Home",           href: "/",          icon: "🏠" },
    { name: "Le Camere",      href: "/camere",     icon: "🛏️" },
    { name: "Il Territorio",  href: "/territorio", icon: "🗺️" },
    { name: "Servizi",        href: "/servizi",    icon: "✨" },
    { name: "Contatti",       href: "/contatti",   icon: "✉️" },
  ],
  legal: [
    { name: "Privacy Policy",   href: "/privacy" },
    { name: "Cookie Policy",    href: "/cookie" },
    { name: "Termini",          href: "/termini" },
  ],
};
```

**In `Header.tsx` — nav desktop con indicatore attivo pill:**

```tsx
// Sostituisci il mapping nav con questo pattern:
<nav className="hidden md:flex items-center gap-1 bg-white/60 rounded-2xl px-2 py-1.5"
     style={{ border: "1px solid rgba(217,70,239,0.12)" }}>
  {navItems.map((item) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
    return (
      <Link
        key={item.href}
        href={item.href}
        className="relative px-4 py-2 rounded-xl text-sm font-medium
                   transition-all duration-200"
        style={isActive ? {
          background: "linear-gradient(135deg, #d946ef22, #f43f5e18)",
          color: "#c026d3",
        } : {
          color: "#44403c",
        }}
      >
        {isActive && (
          <motion.div
            layoutId="nav-pill"
            className="absolute inset-0 rounded-xl"
            style={{ background: "linear-gradient(135deg, rgba(217,70,239,0.12), rgba(244,63,94,0.10))" }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
          />
        )}
        <span className="relative z-10">{item.name}</span>
      </Link>
    );
  })}
</nav>
```

---

## 🏆 UPGRADE LUXURY — HOME PAGE COMPLETA

### Struttura home (`src/app/[locale]/page.tsx`)

La home deve avere ESATTAMENTE queste sezioni nell'ordine:

```
1. <Hero />              — già aggiornata sopra
2. <StatsBar />          — nuovo: 4 numeri chiave in pillole
3. <RoomsPreview />      — aggiornata con prezzi €90 e nomi luxury
4. <WhyUs />             — 4 card colorate con accento diverso
5. <ColazioneFarfalle /> — sezione colazione con foto e copy luxury
6. <AreaMarina />        — territorio: mappa + highlights
7. <ReviewsCarousel />   — recensioni con stelle animate
8. <CTAFinal />          — banner finale gradient + prezzo + bottone grande
```

### Nuova sezione `StatsBar` (crea `src/components/sections/StatsBar.tsx`)

```tsx
// Cifre che costruiscono autorevolezza immediata
const stats = [
  { value: "4",    label: "Camere indipendenti",  icon: "🛏️", color: "#d946ef" },
  { value: "€90",  label: "Per notte, tutto incluso", icon: "💶", color: "#f43f5e" },
  { value: "100%", label: "Bagno privato",         icon: "🚿", color: "#f59e0b" },
  { value: "5★",   label: "Recensioni verificate", icon: "⭐", color: "#84cc16" },
];
// Layout: flex row, gap-8, ogni stat in una card glass-card, numero grande font-display
// Sfondo: bg-butterfly-50/50, py-12
```

### Sezione `ColazioneFarfalle` (crea `src/components/sections/ColazioneFarfalle.tsx`)

```tsx
// Split layout: immagine sinistra, testo destra (o viceversa su mobile: stack)
// Immagine: usa "dettagli-interni.webp" come placeholder (sostituire con foto colazione)
// Testo:
// H2: "Colazione inclusa"  (gradient-text)
// Sottotitolo: "Ogni mattina ti aspettiamo con prodotti freschi del territorio calabrese:
// marmellate artigianali, cornetti caldi, formaggi DOP e succhi biologici."
// Lista: caffè espresso · cappuccino · succhi freschi · cornetti · torte fatte in casa · formaggi locali
// CTA: "Scopri le camere →"
```

### Aggiorna `WhyUs` / `PercheLeFarfalle`

Apri `src/components/sections/PercheLeFarfalle.tsx` e aggiorna con contenuti corretti:

```typescript
const features = [
  {
    icon: "🏛️",
    title: "Centro storico",
    desc: "Siamo nel cuore di Isola di Capo Rizzuto, a pochi passi da ristoranti, bar e negozi. Tutto raggiungibile a piedi.",
    accentBg:     "rgba(14,165,233,0.08)",
    accentBorder: "rgba(14,165,233,0.20)",
    accentText:   "#0284c7",
  },
  {
    icon: "☕",
    title: "Colazione inclusa",
    desc: "Prodotti freschi e locali ogni mattina: cornetti, torte fatte in casa, marmellate artigianali e caffè espresso.",
    accentBg:     "rgba(245,158,11,0.08)",
    accentBorder: "rgba(245,158,11,0.20)",
    accentText:   "#d97706",
  },
  {
    icon: "🦋",
    title: "Design curato",
    desc: "Ogni camera è arredata con gusto e attenzione al dettaglio. Materiali di qualità, illuminazione morbida, relax garantito.",
    accentBg:     "rgba(217,70,239,0.08)",
    accentBorder: "rgba(217,70,239,0.20)",
    accentText:   "#c026d3",
  },
  {
    icon: "🌊",
    title: "Area Marina Protetta",
    desc: "A pochi chilometri le spiagge dell'Area Marina Protetta di Capo Rizzuto: acque cristalline, fondali ricchi, natura incontaminata.",
    accentBg:     "rgba(132,204,22,0.08)",
    accentBorder: "rgba(132,204,22,0.25)",
    accentText:   "#65a30d",
  },
];
```

### Card camere con nomi luxury

In `src/components/sections/RoomsPreview.tsx` (o `HomeRoomsPreview.tsx`), leggi da `roomsConfig` e mostra:
- Nome camera luxury (Camera Glicine, Corallo, Ambra, Lime)
- Prezzo €90/notte
- Tagline
- Badge colorato con `badgeColor` da config
- Hover lift + overlay
- Bottone "Scopri di più →" in ghost

---

## 🎯 VERIFICA FINALE OBBLIGATORIA

Prima del commit, controlla questi punti su `http://localhost:3000/it`:

- [ ] 5 farfalle COLORATE (non grigie) che si MUOVONO attraverso lo schermo
- [ ] Bottone "Prenota ora" visibile con gradiente viola→coral
- [ ] Header: logo con ButterflyIcon colorata, nav con pill animato sull'attivo
- [ ] Prezzo €90 visibile in hero, in ogni card camera
- [ ] Nomi camere luxury: Glicine, Corallo, Ambra, Lime
- [ ] Nessun riferimento a "200m dal mare" in tutto il sito
- [ ] Home non sembra un sito amatoriale — si vede la qualità luxury

Poi:
```bash
git add .
git commit -m "fix: farfalle colorate volanti, header luxury, contenuti premium, prezzi €90"
git push origin main
```

---

## 🚫 COSE DA NON FARE

- NON lasciare `fill="currentColor"` nel ButterflyIcon senza passare i colori come props
- NON usare `opacity-[0.15]` sulle farfalle — devono essere visibili (opacity 0.85–0.90)
- NON usare `text-primary-*` — non è definito nella palette, usa `butterfly-*`
- NON scrivere "200m dal mare" — siamo in centro paese
- NON lasciare i nomi "Camera 1, 2, 3, 4" — usare i nomi luxury dal config
- NON deployare se le farfalle sono ancora grigie/statiche

---

*Questo documento corregge i bug specifici e applica l'upgrade luxury alla home page.*
*Riferimento design system completo: `docs/CURSOR_AGENT_INSTRUCTIONS.md`*
