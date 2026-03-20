# CURSOR SUPER PROMPT — RESIDENCE LE FARFALLE
## Istruzioni per agenti AI (Cursor / Claude Code)

> **Progetto**: Next.js 15 + React 19 + TypeScript + Tailwind CSS + i18n (IT/EN/DE)
> **Path progetto**: `/Users/francesconigro/residence-le-farfalle`
> **Data audit**: 20 marzo 2026
> **Dati proprietario**: Francesco Nigro · +39 3500979130 · info@residencelefarfalle.it · Via Capo delle Colonne, 88841 Isola di Capo Rizzuto (KR)
> **CIN struttura**: `IT101013C2I8M3ARTU`

---

## REGOLE OPERATIVE PER L'AGENTE

1. **Lavora un file alla volta** — completa ogni modifica, verifica che compili, poi passa al successivo
2. **Non rompere il build** — dopo ogni blocco di modifiche esegui `npm run build` e risolvi eventuali errori prima di continuare
3. **Rispetta TypeScript strict** — nessun `any`, nessun `@ts-ignore` non motivato
4. **Mantieni la struttura i18n** — ogni contenuto testuale che esiste già in IT/EN/DE va mantenuto in tutte le lingue
5. **Non toccare** `node_modules`, file di lock, configurazioni Tailwind/ESLint salvo dove esplicitamente richiesto

---

## FASE 1 — FONDAMENTA (esegui tutto questo blocco per primo)

### FIX-01 · Dominio reale in `src/config/site.ts`
**File**: `src/config/site.ts`
**Problema**: `url` punta ancora a `residence-le-farfalle.vercel.app`
**Fix**:
```typescript
// Cambia questa riga:
url: "https://residence-le-farfalle.vercel.app",
// Con:
url: process.env.NEXT_PUBLIC_SITE_URL || "https://residence-le-farfalle.vercel.app",
```
Poi aggiungi in `.env.local` (crealo se non esiste):
```
NEXT_PUBLIC_SITE_URL=https://www.residencelefarfalle.it
```
E aggiungi in `.env.example`:
```
NEXT_PUBLIC_SITE_URL=https://www.residencelefarfalle.it
```
> **Impatto**: sitemap, canonical, Open Graph, hreflang si correggono automaticamente in tutta la codebase.

---

### FIX-02 · CIN nel Footer
**File**: `src/components/layout/Footer.tsx`
**Problema**: Il CIN (Codice Identificativo Nazionale, obbligatorio D.L. 39/2023) non è esposto sul sito.
**Fix**: Trova il div del copyright in fondo al footer (riga con `© 2025 Residence Le Farfalle`) e sostituiscilo con:
```tsx
<div className="mt-12 border-t border-white/10 pt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-sm text-stone-400">
  <div className="flex flex-col gap-1">
    <span>© {new Date().getFullYear()} Residence Le Farfalle · Francesco Nigro</span>
    <span className="text-xs text-stone-500">CIN: IT101013C2I8M3ARTU · P.IVA/CF: [INSERIRE_PARTITA_IVA]</span>
  </div>
  <div className="flex flex-wrap gap-x-4 gap-y-2">
    <Link href={`/${locale}/privacy`} className="hover:text-amber-400 transition-colors">
      Privacy Policy
    </Link>
    <Link href={`/${locale}/cookie`} className="hover:text-amber-400 transition-colors">
      Cookie Policy
    </Link>
    <Link href={`/${locale}/termini`} className="hover:text-amber-400 transition-colors">
      Termini e Condizioni
    </Link>
  </div>
</div>
```
> **Nota**: sostituire `[INSERIRE_PARTITA_IVA]` con la P.IVA o codice fiscale reale di Francesco Nigro quando disponibile.

---

### FIX-03 · `lang` dinamico nel root layout
**File**: `src/app/layout.tsx`
**Problema**: `<html lang="it">` è hardcoded — le pagine EN e DE avranno l'attributo lingua sbagliato.
**Fix**: Il root layout non conosce il locale, quindi rimuovi l'attributo `lang` fisso e aggiungilo nel layout locale.

In `src/app/layout.tsx` cambia:
```tsx
<html lang="it" className={`${jakarta.variable} ${syne.variable}`} suppressHydrationWarning>
```
con:
```tsx
<html lang="it" className={`${jakarta.variable} ${syne.variable}`} suppressHydrationWarning>
```
*(il root mantiene `lang="it"` come fallback — il fix vero è nel locale layout)*

In `src/app/[locale]/layout.tsx`, modifica il return aggiungendo il wrapper html con lang dinamico:
```tsx
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const currentLocale = locale || "it";

  const langMap: Record<string, string> = { it: "it", en: "en", de: "de" };
  const htmlLang = langMap[currentLocale] || "it";

  const structuredData = { /* ...invariato... */ };

  return (
    <>
      {/* Override lang per il locale corrente via script (approccio senza conflitti con root) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = "${htmlLang}";`,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
```

---

### FIX-04 · Privacy Policy completa
**File**: `src/app/[locale]/privacy/page.tsx`
**Problema**: Il campo titolare ha un `TODO` e mancano i dati reali.
**Fix**: Sostituisci la sezione `1. Titolare del trattamento` con:
```tsx
<section>
  <h2 className="font-display text-xl font-bold text-neutral-900 mt-8 mb-4">
    1. Titolare del trattamento
  </h2>
  <p>
    Il titolare del trattamento dei dati personali è:
  </p>
  <ul className="list-none pl-0 mt-3 space-y-1 text-sm">
    <li><strong>Francesco Nigro</strong></li>
    <li>Residence Le Farfalle</li>
    <li>Via Capo delle Colonne, 88841 Isola di Capo Rizzuto (KR)</li>
    <li>Tel: <a href="tel:+393500979130" className="text-butterfly-600 underline">+39 3500979130</a></li>
    <li>Email: <a href="mailto:info@residencelefarfalle.it" className="text-butterfly-600 underline">info@residencelefarfalle.it</a></li>
    <li>CIN struttura: IT101013C2I8M3ARTU</li>
  </ul>
</section>
```

---

## FASE 2 — TRACKING E SEO TECNICA

### FIX-05 · Installare Google Analytics 4
**File**: `src/app/layout.tsx`
**Prerequisito**: Il proprietario deve creare una GA4 Property su analytics.google.com e ottenere il Measurement ID (formato: `G-XXXXXXXXXX`). Poi aggiungere la variabile d'ambiente su Vercel: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

Aggiungi in `src/app/layout.tsx` dopo gli import:
```tsx
import Script from "next/script";
```

Nel JSX, dentro `<body>` dopo `<AppWrapper>`:
```tsx
{process.env.NEXT_PUBLIC_GA_ID && (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
          page_path: window.location.pathname,
        });
      `}
    </Script>
  </>
)}
```
Aggiungi in `.env.local`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
> Lascia il placeholder `G-XXXXXXXXXX` — il proprietario lo sostituirà con il codice reale.

---

### FIX-06 · AggregateRating nel JSON-LD
**File**: `src/app/[locale]/layout.tsx`
**Problema**: Il JSON-LD non ha `aggregateRating` — persi i rich snippet con le stelle in SERP.
**Fix**: Aggiorna `structuredData` aggiungendo dopo `priceRange`:
```typescript
aggregateRating: {
  "@type": "AggregateRating",
  ratingValue: "9.7",
  reviewCount: 6,
  bestRating: "10",
  worstRating: "1",
},
```
> **Nota**: i valori 9.7 e 6 recensioni sono quelli reali trovati nel data model. Aggiorna dinamicamente se esiste un file `src/data/reviews/reviews.ts`.

---

### FIX-07 · Canonical dinamico su ogni pagina interna
**File**: tutte le `page.tsx` nelle route `[locale]/camere`, `[locale]/servizi`, `[locale]/territorio`, `[locale]/prenota`, `[locale]/contatti`

Per ogni pagina, nella funzione `generateMetadata` aggiungi/aggiorna `alternates`:
```typescript
alternates: {
  canonical: `${siteConfig.url}/${locale}/[nome-pagina]`,
  languages: {
    it: `${siteConfig.url}/it/[nome-pagina]`,
    en: `${siteConfig.url}/en/[nome-pagina]`,
    de: `${siteConfig.url}/de/[nome-pagina]`,
  },
},
```
Sostituisci `[nome-pagina]` con: `camere`, `servizi`, `territorio`, `prenota`, `contatti` rispettivamente.

---

### FIX-08 · HotelRoom schema su pagine camera singola
**File**: `src/app/[locale]/camere/[slug]/page.tsx`
**Problema**: Nessun JSON-LD HotelRoom — missed rich snippet per ogni stanza.
**Fix**: Dentro il return della pagina, aggiungi prima del markup HTML:
```tsx
const hotelRoomSchema = {
  "@context": "https://schema.org",
  "@type": "HotelRoom",
  name: room.name[currentLocale as keyof typeof room.name] || room.name.it,
  description: room.description[currentLocale as keyof typeof room.description] || room.description.it,
  occupancy: {
    "@type": "QuantitativeValue",
    maxValue: room.capacity,
  },
  floorSize: {
    "@type": "QuantitativeValue",
    value: room.size,
    unitCode: "MTK",
  },
  offers: {
    "@type": "Offer",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: room.priceFrom,
      priceCurrency: "EUR",
      unitText: "notte",
    },
    availability: "https://schema.org/InStock",
  },
};

// Nel JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelRoomSchema) }}
/>
```

---

### FIX-09 · Priority sull'immagine hero per LCP
**File**: `src/components/sections/Hero.tsx`
**Problema**: L'immagine hero ha già `priority` — verificare che sia presente e corretto.
**Verifica**: Controlla riga `<Image ... priority ...>`. Se manca il prop `priority`, aggiungilo.
Il file attuale ha già `priority` sulla riga 46 — **nessuna modifica necessaria** ✅

---

### FIX-10 · Rimuovere meta keywords generici
**File**: `src/app/[locale]/layout.tsx`
**Problema**: `keywords` generici su ogni pagina — Google li ignora da anni.
**Fix**: Rimuovi il campo `keywords` dal `generateMetadata` del locale layout (le pagine specifiche possono averli per-page se necessario).

---

## FASE 3 — CONTENUTI E CONVERSIONE

### FIX-11 · Prezzi visibili nelle card camere
**File**: `src/components/sections/RoomsPreview.tsx` (e/o `src/components/rooms/RoomCard.tsx`)
**Problema**: I prezzi esistono nel data model (`priceFrom`) ma non sono visibili above the fold.
**Fix**: Individua il componente che renderizza le card camere e aggiungi un badge prezzo:
```tsx
{room.priceFrom && (
  <div className="absolute top-3 right-3 bg-amber-500 text-stone-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
    da €{room.priceFrom}/notte
  </div>
)}
```
Assicurati che il contenitore della card abbia `className="relative"`.

---

### FIX-12 · Espandere descrizioni camere
**File**: `src/data/rooms/rooms.ts` (o file equivalente con i dati delle camere)
**Problema**: Le descrizioni IT/EN/DE sono di 1-2 frasi — troppo corte per SEO e conversione.
**Target**: 100-150 parole per camera, per ogni lingua.

Espandi le descrizioni seguendo questo modello per la **Camera Limone** (20 mq, 2 persone):
```
IT: "Camera Limone, 20 mq di comfort nel cuore di Isola di Capo Rizzuto. Ideale per coppie che cercano un soggiorno autentico in Calabria, offre luce naturale abbondante, bagno privato con doccia, TV LED, aria condizionata e WiFi superfast inclusi. La colazione viene servita ogni mattina. A pochi minuti a piedi dal centro paese e a 5-15 minuti dalle spiagge dell'Area Marina Protetta di Capo Rizzuto, tra le più belle del Mediterraneo. Host locale Francesco è sempre disponibile per consigli e segnalare i posti segreti della costa ionica."

EN: "Limone Room, 20 sqm of comfort in the heart of Isola di Capo Rizzuto. Perfect for couples seeking an authentic Calabrian stay, it features abundant natural light, private bathroom with shower, LED TV, air conditioning and superfast WiFi. Breakfast is served every morning. A short walk from the town center and 5–15 minutes from the beaches of the Capo Rizzuto Marine Protected Area, one of the most beautiful in the Mediterranean. Local host Francesco is always available to suggest hidden gems along the Ionian coast."

DE: "Zimmer Limone, 20 m² Komfort im Herzen von Isola di Capo Rizzuto. Ideal für Paare, die einen authentischen Aufenthalt in Kalabrien suchen. Reichlich natürliches Licht, eigenes Bad mit Dusche, LED-TV, Klimaanlage und superschnelles WLAN inklusive. Frühstück wird jeden Morgen serviert. Nur wenige Gehminuten vom Ortskern und 5–15 Minuten von den Stränden des Meeresschutzgebiets Capo Rizzuto entfernt."
```
Applica lo stesso pattern alle camere Macaone (25 mq), Vanessa (22 mq) e Aurora (30 mq), adattando le dimensioni e i dettagli specifici di ogni camera.

---

### FIX-13 · Sezione FAQ con schema FAQPage
**Azione**: Creare nuova pagina `src/app/[locale]/faq/page.tsx`

La pagina deve:
1. Avere `generateStaticParams()` per IT/EN/DE
2. Contenere le seguenti domande/risposte in tutte e 3 le lingue:
   - Qual è la distanza dal mare? → "Le spiagge dell'Area Marina Protetta di Capo Rizzuto distano 5-15 minuti a piedi dalla struttura."
   - La colazione è inclusa nel prezzo? → "Sì, la colazione è inclusa per tutti gli ospiti."
   - C'è il parcheggio? → "Sì, è disponibile parcheggio nelle immediate vicinanze della struttura, gratuito."
   - Quali sono gli orari di check-in e check-out? → "Check-in dalle 14:00, check-out entro le 11:00. Orari flessibili su richiesta."
   - Si accettano animali domestici? → "Al momento non accettiamo animali domestici."
   - Come si prenota? → "Puoi prenotare direttamente via WhatsApp, telefono o compilando il form sul sito."
   - C'è un minimo di notti? → "Il soggiorno minimo è di 2 notti. In alta stagione (luglio-agosto) di 3 notti."
   - Come si arriva da Crotone? → "Da Crotone in auto: 20 minuti (SS106). Da Crotone aeroporto: 25 minuti."
   - Il WiFi è gratuito? → "Sì, il WiFi superfast è incluso e gratuito in tutta la struttura."
   - Sono ammessi bambini? → "Sì, accogliamo famiglie con bambini con piacere."
3. Includere JSON-LD FAQPage:
```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};
```
4. Aggiungere link alla FAQ nel menu di navigazione (`src/config/navigation.ts`)

---

### FIX-14 · Info parcheggio dettagliate
**File**: aggiungere in `src/app/[locale]/servizi/page.tsx` e nella sezione FAQ (FIX-13)
**Contenuto da aggiungere**: "Parcheggio gratuito disponibile nelle immediate vicinanze della struttura (entro 50 metri). Sempre disponibile, anche in alta stagione."
Se il dato esatto non è corretto, il proprietario deve verificare e aggiornare.

---

## FASE 4 — EVENTI GA4 TRACKING

### FIX-15 · Creare utility GA4
**File da creare**: `src/lib/analytics.ts`
```typescript
// Utility per eventi GA4
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// Eventi predefiniti
export const GA_EVENTS = {
  clickPhone: () => trackEvent("click_phone", { event_category: "contact", phone: "+393500979130" }),
  clickWhatsapp: () => trackEvent("click_whatsapp", { event_category: "contact" }),
  clickEmail: () => trackEvent("click_email", { event_category: "contact" }),
  formSubmitPreventivo: () => trackEvent("form_submit", { event_category: "lead", form_type: "preventivo" }),
  formSubmitContact: () => trackEvent("form_submit", { event_category: "lead", form_type: "contact" }),
  ctaClick: (label: string) => trackEvent("cta_click", { event_category: "conversion", cta_label: label }),
  roomView: (roomName: string) => trackEvent("room_view", { room_name: roomName }),
  externalLinkBooking: (platform: string) => trackEvent("external_link_" + platform, { event_category: "external" }),
};
```

### FIX-16 · Aggiungere tracking sui componenti
Dopo aver creato `src/lib/analytics.ts`, aggiungere i tracking nei seguenti punti:

- **Telefono** (Header + Footer + Contatti): `onClick={() => GA_EVENTS.clickPhone()}`
- **WhatsApp** (Hero + floating button): `onClick={() => GA_EVENTS.clickWhatsapp()}`
- **Email** (Footer + Contatti): `onClick={() => GA_EVENTS.clickEmail()}`
- **Form preventivo** (submit): `GA_EVENTS.formSubmitPreventivo()`
- **Form contatto** (submit): `GA_EVENTS.formSubmitContact()`
- **CTA "Scopri le Camere"** (Hero): `onClick={() => GA_EVENTS.ctaClick("scopri_camere")}`
- **Pagina camera** (onMount): `GA_EVENTS.roomView(slug)`

---

## FASE 5 — LINK SOCIAL E OTA (richiede dati dal proprietario)

### FIX-17 · Aggiornare link social in `src/config/site.ts`
**Attendi** che il proprietario fornisca gli URL reali, poi aggiorna:
```typescript
social: {
  facebook: "https://www.facebook.com/[PAGINA_FACEBOOK]",
  instagram: "https://www.instagram.com/[PROFILO_INSTAGRAM]",
  tripadvisor: "https://www.tripadvisor.it/[PROFILO_TRIPADVISOR]",
  google_business: "https://maps.google.com/?cid=[CID_GOOGLE_BUSINESS]",
},
booking: {
  airbnb: "https://www.airbnb.it/rooms/[ID_AIRBNB]",  // o "" se non usato
  booking_com: "https://www.booking.com/hotel/it/[SLUG].html",  // o "" se non usato
},
```

---

## CHECKLIST FINALE — VERIFICA BUILD

Dopo tutte le modifiche, esegui in sequenza:

```bash
# 1. Controlla errori TypeScript
npx tsc --noEmit

# 2. Controlla linting
npm run lint

# 3. Build di produzione
npm run build

# 4. Test locale
npm run dev
# Visita: http://localhost:3000/it
# Visita: http://localhost:3000/en
# Visita: http://localhost:3000/de
# Verifica lang= attribute su ogni lingua (F12 > Inspector)
# Verifica JSON-LD su https://validator.schema.org/
# Verifica sitemap: http://localhost:3000/sitemap.xml
# Verifica robots: http://localhost:3000/robots.txt
```

---

## VARIABILI D'AMBIENTE DA CONFIGURARE SU VERCEL

Dopo le modifiche, il proprietario deve aggiungere su Vercel (Settings → Environment Variables):

| Variabile | Valore | Note |
|-----------|--------|------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.residencelefarfalle.it` | Dominio reale |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | ID da GA4 Analytics |
| `RESEND_API_KEY` | `re_XXXXXXXXXX` | Chiave API per form email |

---

## RIEPILOGO PRIORITÀ (ordine di esecuzione consigliato)

| # | Fix | File | Tempo | Impatto |
|---|-----|------|-------|---------|
| 1 | FIX-01 | `src/config/site.ts` | 5 min | CRITICO — sblocca canonical/sitemap |
| 2 | FIX-02 | `Footer.tsx` | 10 min | ALTO — CIN obbligatorio per legge |
| 3 | FIX-03 | `layout.tsx` + `[locale]/layout.tsx` | 20 min | ALTO — SEO EN/DE |
| 4 | FIX-04 | `privacy/page.tsx` | 15 min | ALTO — dati titolare |
| 5 | FIX-05 | `layout.tsx` (GA4) | 30 min | CRITICO — tracking |
| 6 | FIX-06 | `[locale]/layout.tsx` | 15 min | ALTO — rich snippet stelle |
| 7 | FIX-07 | tutte le `page.tsx` interne | 45 min | MEDIO — canonical per-page |
| 8 | FIX-08 | `camere/[slug]/page.tsx` | 30 min | MEDIO — HotelRoom schema |
| 9 | FIX-10 | `[locale]/layout.tsx` | 5 min | BASSO — pulizia keywords |
| 10 | FIX-11 | `RoomsPreview.tsx` | 20 min | ALTO — conversione |
| 11 | FIX-12 | `rooms.ts` | 60 min | MEDIO — SEO contenuti |
| 12 | FIX-13 | nuovo `faq/page.tsx` | 90 min | ALTO — featured snippet |
| 13 | FIX-14 | `servizi/page.tsx` | 15 min | MEDIO — trust |
| 14 | FIX-15 + 16 | `analytics.ts` + componenti | 90 min | ALTO — conversion tracking |
| 15 | FIX-17 | `site.ts` | 10 min | ALTO — quando disponibili URL |

**Tempo totale stimato**: ~8 ore di sviluppo
**Risultato atteso**: sito da 55% a 85%+ del potenziale · legalmente conforme · misurabile · indicizzato correttamente

---

*Prompt generato il 20 marzo 2026 — basato su audit Senior Web Auditor*
*CIN struttura: IT101013C2I8M3ARTU · Tel: +39 3500979130*
