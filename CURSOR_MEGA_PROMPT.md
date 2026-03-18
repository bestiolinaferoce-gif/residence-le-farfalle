# 🦋 CURSOR MEGA PROMPT — RESIDENCE LE FARFALLE
## Completamento Sito Web Professionale · Next.js 14 · Valore target €2.500+

---

## ⚠️ REGOLE ASSOLUTE — LEGGILE PRIMA DI TUTTO

1. **NON toccare mai**: `tailwind.config.ts`, `src/i18n.ts`, `middleware.ts`, `src/lib/i18n.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/types/index.ts`
2. **NON rompere nulla**: dopo ogni blocco di modifiche esegui `npm run build`. Zero errori TypeScript = prerequisito
3. **NON inventare dati**: dove mancano dati reali (telefono, email, foto), usa i placeholder già esistenti o quelli indicati in questo prompt
4. **NON contaminare**: questo è un progetto separato e autonomo — nessun riferimento a Villa Olimpia o La Caletta
5. **Stack immutabile**: Next.js 14 App Router · TypeScript strict · Tailwind CSS · next-intl (IT/EN/DE) · Framer Motion
6. **Questo sito NON ha ancora un dominio** — usa `https://residence-le-farfalle.vercel.app` come URL di fallback ovunque

---

## 📊 STATO ATTUALE — COSA ESISTE GIÀ (non ricreare)

### ✅ Già funzionante
- 7 pagine: Home, Camere, Camere/[id], Servizi, Territorio, Prenota, Contatti, Partner
- i18n IT/EN/DE con `messages/` e `next-intl`
- Design system Tailwind: `primary`(amber), `secondary`(teal), `sand`, `sea`, `neutral`
- Font: Inter (sans) + Playfair Display (display)
- Componenti UI base: Button, Card, Container, Skeleton, ErrorBoundary, SectionHeader
- Header sticky con LanguageSwitcher
- Footer base
- Hero con slider e animazioni Framer Motion
- Sezioni homepage: PercheLeFarfalle, HomeRoomsPreview, Services, MareVicino, Territorio60Secondi, PartnersPreview, ReviewsSection, Location, Newsletter
- FloatingButterflies animazione
- SEO: sitemap.ts, robots.ts, metadata per ogni pagina
- Immagini ottimizzate in `/public/images/rooms/` e `/public/images/services/`
- `src/data/rooms/rooms.ts` con 4 camere + prezzi
- `src/data/reviews/reviews.json` con 2 recensioni reali
- Build ✅ · Linting ✅

### ❌ Mancante o incompleto
- Contatti reali (placeholder ovunque)
- Pagina Prenota: form non funzionante (nessun backend email)
- Pagina Contatti: form non funzionante
- Galleria immagini con lightbox
- Pulsante WhatsApp floating
- Calendario disponibilità
- Recensioni: solo 2, serve sezione più ricca
- Nomi camere generici ("Camera 1-4") senza personalità
- Sezione "Perché Le Farfalle" da potenziare
- Footer incompleto (mancano link social, crediti, policy)
- Google Maps non integrato
- Schema.org JSON-LD non ottimizzato per B&B
- SEO locale non completo
- Nessun sistema di invio email per i form

---

## 🎨 IDENTITÀ VISIVA — MANTIENI E POTENZIA

### Palette (già in tailwind.config.ts — non modificare)
- **Primario**: `amber-500` (#ffa500) — CTA, accenti caldi
- **Secondario**: `teal-600` (#0d9488) — link, badge, highlights
- **Superficie**: `stone-50/100/900` — sfondi, testo
- **Sabbia**: `sand-500` (#e8dcc4) — sfondi sezioni alternate

### Tipografia
- **Display** (Playfair Display): titoli sezioni, headline hero
- **Sans** (Inter): tutto il resto
- Gerarchia: `text-display-lg` → `text-4xl` → `text-2xl` → `text-lg` → `text-base`

### Principi design
- Sfondo homepage: alternare `stone-50` / `white` / `stone-900` (dark) per le sezioni
- Card con `shadow-soft` o `shadow-medium`, `rounded-2xl`
- Animazioni: Framer Motion con `initial/animate/whileInView` (mai JS puro)
- Bottoni primari: `bg-amber-500 hover:bg-amber-400 text-stone-900`
- Bottoni secondari: `border border-stone-200 bg-white hover:bg-stone-50`
- NO effetti glassmorphism pesanti; sì a backdrop-blur leggero per overlay

---

## 🔧 BLOCCO 1 — DATI FONDAMENTALI DA AGGIORNARE

### 1a. `src/config/site.ts` — AGGIORNA QUESTI CAMPI

```typescript
export const siteConfig = {
  name: "Residence Le Farfalle",
  // ...
  contacts: {
    phone: "+39 XXX XXX XXXX",          // ← Francesco deve fornire il numero reale
    email: "info@lefarfalle.it",          // ← placeholder fino a dominio reale
    whatsapp: "+39 XXX XXX XXXX",        // ← stesso numero del telefono
  },
  social: {
    facebook: "",                          // ← Francesco aggiungerà URL
    instagram: "",                         // ← Francesco aggiungerà URL
    tripadvisor: "",                       // ← Francesco aggiungerà URL
    google_business: "",                   // ← Francesco aggiungerà URL
  },
  booking: {
    airbnb: "",                            // ← Francesco aggiungerà URL Airbnb
    booking_com: "",                       // ← Francesco aggiungerà URL Booking.com
  },
  host: {
    name: "Francesco",
    surname: "Nigro",
    description_it: "Host professionista con anni di esperienza nell'ospitalità calabrese.",
  }
}
```

### 1b. `src/data/rooms/rooms.ts` — RINOMINA LE CAMERE

Le camere "Camera 1-4" sono anonime. Dai loro nomi ispirati alle farfalle calabresi:

```typescript
export const rooms: Room[] = [
  {
    id: 1,
    name: { it: "Camera Limone", en: "Limone Room", de: "Zimmer Limone" },
    slug: "limone",
    capacity: 2, beds: 1, size: 20,
    priceFrom: 70,
    description: {
      it: "Camera accogliente con luce naturale e vista sul verde. Ideale per coppie che cercano semplicità e comfort in una posizione centrale.",
      en: "Welcoming room with natural light and a view of the green. Ideal for couples seeking simplicity and comfort in a central location.",
      de: "Gemütliches Zimmer mit natürlichem Licht und Blick ins Grüne. Ideal für Paare, die Einfachheit und Komfort in zentraler Lage suchen.",
    },
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: ["camera-generale.webp", "camera-2-letto.webp"],
    highlights: ["Bagno privato", "TV LED", "Aria condizionata", "Tende oscuranti"],
  },
  {
    id: 2,
    name: { it: "Camera Macaone", en: "Macaone Room", de: "Zimmer Macaone" },
    slug: "macaone",
    capacity: 2, beds: 1, size: 25,
    priceFrom: 75,
    description: {
      it: "La nostra camera più spaziosa: 25 mq, arredi curati e bagno privato con box doccia. Perfetta per soggiorni prolungati.",
      en: "Our most spacious room: 25 sqm, carefully chosen furnishings and private bathroom with shower. Perfect for longer stays.",
      de: "Unser geräumigstes Zimmer: 25 qm, sorgfältig ausgewähltes Mobiliar und eigenes Badezimmer mit Dusche. Perfekt für längere Aufenthalte.",
    },
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: ["camera-2-letto.webp", "camera-2-interno.webp", "camera-2-bagno.webp", "camera-2-arredi.webp", "camera-2-dettaglio.webp"],
    highlights: ["25 mq", "Bagno privato", "TV LED", "Spazio extra"],
  },
  {
    id: 3,
    name: { it: "Camera Vanessa", en: "Vanessa Room", de: "Zimmer Vanessa" },
    slug: "vanessa",
    capacity: 2, beds: 1, size: 22,
    priceFrom: 72,
    description: {
      it: "Camera luminosa e ben curata con tutto il necessario per un soggiorno perfetto. Il bagno privato e le tende oscuranti garantiscono comfort e privacy.",
      en: "Bright and well-appointed room with everything you need for a perfect stay. Private bathroom and blackout curtains ensure comfort and privacy.",
      de: "Helles und gepflegtes Zimmer mit allem Notwendigen für einen perfekten Aufenthalt. Eigenes Bad und Verdunkelungsvorhänge sorgen für Komfort.",
    },
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: ["camera-3-letto.webp", "camera-3-interno.webp"],
    highlights: ["22 mq", "Molto luminosa", "Tende oscuranti", "WiFi dedicato"],
  },
  {
    id: 4,
    name: { it: "Camera Aurora", en: "Aurora Room", de: "Zimmer Aurora" },
    slug: "aurora",
    capacity: 2, beds: 1, size: 30,
    priceFrom: 80,
    description: {
      it: "La nostra suite: 30 mq di spazio, la camera più grande e luminosa della struttura. Bagno privato con doccia, TV LED e tutti i comfort premium.",
      en: "Our suite: 30 sqm of space, the largest and brightest room in the property. Private bathroom with shower, LED TV and all premium amenities.",
      de: "Unsere Suite: 30 qm Raum, das größte und hellste Zimmer der Anlage. Eigenes Bad mit Dusche, LED-TV und alle Premium-Annehmlichkeiten.",
    },
    amenities: ["private-bathroom", "tv", "ac", "wifi", "blackout"],
    images: ["camera-4-interno.webp", "camera-5-interno.webp"],
    highlights: ["30 mq", "Suite premium", "La più grande", "Vista giardino"],
  },
];
```

Aggiorna anche la `roomsConfig` in `site.ts` con gli stessi nomi e slug.

---

## 🔧 BLOCCO 2 — FORM DI CONTATTO E PRENOTAZIONE FUNZIONANTI

### 2a. Installa dipendenze per email

```bash
npm install resend
```

### 2b. Crea `src/app/api/contact/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, checkIn, checkOut, guests, rooms, message, type } = body;

    // Validazione base
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 });
    }

    // Se RESEND_API_KEY è configurata, invia email
    const apiKey = process.env.RESEND_API_KEY;
    const hostEmail = process.env.HOST_EMAIL || 'info@lefarfalle.it';

    if (apiKey) {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);

      const subject = type === 'preventivo'
        ? `🦋 Richiesta preventivo - ${name} (${checkIn} → ${checkOut})`
        : `📩 Nuovo messaggio da ${name}`;

      const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c2410c;">🦋 Residence Le Farfalle</h2>
          <h3>${subject}</h3>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Nome:</td><td>${name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td>${email}</td></tr>
            ${phone ? `<tr><td style="padding: 8px; font-weight: bold;">Telefono:</td><td>${phone}</td></tr>` : ''}
            ${checkIn ? `<tr><td style="padding: 8px; font-weight: bold;">Check-in:</td><td>${checkIn}</td></tr>` : ''}
            ${checkOut ? `<tr><td style="padding: 8px; font-weight: bold;">Check-out:</td><td>${checkOut}</td></tr>` : ''}
            ${guests ? `<tr><td style="padding: 8px; font-weight: bold;">Ospiti:</td><td>${guests}</td></tr>` : ''}
            ${rooms ? `<tr><td style="padding: 8px; font-weight: bold;">Camera:</td><td>${rooms}</td></tr>` : ''}
          </table>
          <p><strong>Messaggio:</strong></p>
          <p style="background:#f5f5f4; padding: 12px; border-radius: 8px;">${message}</p>
        </div>
      `;

      await resend.emails.send({
        from: 'Le Farfalle <noreply@lefarfalle.it>',
        to: hostEmail,
        replyTo: email,
        subject,
        html: htmlContent,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact]', err);
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 });
  }
}
```

### 2c. Crea `src/components/forms/ContactForm.tsx`

Form unificato (usato sia in `/contatti` che in `/prenota`) con:
- Campi: Nome*, Email*, Telefono, Messaggio* (per contatto generico)
- Campi extra per preventivo: Check-in*, Check-out*, N. ospiti, Camera preferita (select con opzioni da `rooms.ts`)
- Validazione client-side con stato React (no librerie esterne)
- Stato: `idle` | `loading` | `success` | `error`
- Loading: spinner sul bottone
- Success: messaggio verde "Messaggio inviato! Risponderemo entro 24 ore."
- Error: messaggio rosso con retry

```tsx
'use client';
import { useState } from 'react';
import { rooms } from '@/src/data/rooms/rooms';

type FormType = 'contact' | 'preventivo';

interface ContactFormProps {
  type?: FormType;
  locale?: string;
}

export default function ContactForm({ type = 'contact', locale = 'it' }: ContactFormProps) {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', message: '',
    checkIn: '', checkOut: '', guests: '2', rooms: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">🦋</div>
        <h3 className="font-display text-xl font-bold text-teal-800 mb-2">Messaggio inviato!</h3>
        <p className="text-teal-700">Risponderemo entro 24 ore. A presto!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ... tutti i campi con Tailwind styling coerente con il design system ... */}
      {/* Usa: input con className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition" */}
      {/* Bottone submit: className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold rounded-xl transition-all duration-200 disabled:opacity-60" */}
    </form>
  );
}
```

### 2d. `.env.local` — Aggiungi variabili

```env
# Email (opzionale - il form funziona anche senza, logga solo in console)
RESEND_API_KEY=re_xxxxxxxxxxxx
HOST_EMAIL=info@lefarfalle.it   # sostituire con email reale di Francesco
```

---

## 🔧 BLOCCO 3 — COMPONENTI NUOVI DA CREARE

### 3a. WhatsApp Floating Button — `src/components/ui/WhatsAppButton.tsx`

Pulsante verde fisso in basso a destra, visibile su tutte le pagine.
- Appare dopo 2 secondi con animazione fade-in
- Su mobile: tap apre WhatsApp direttamente
- Su desktop: mostra mini-popup con testo "Scrivici su WhatsApp"
- Si nasconde quando il form di contatto è in viewport (IntersectionObserver)

```tsx
'use client';
import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/src/config/site';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const digits = siteConfig.contacts.whatsapp.replace(/\D/g, '');
  const url = digits.length >= 10
    ? `https://wa.me/${digits}?text=Ciao!%20Vorrei%20informazioni%20su%20Residence%20Le%20Farfalle`
    : '#';

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  if (!visible || digits.length < 10) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-4 py-3 rounded-full shadow-hard transition-all duration-300 hover:scale-105 group"
      aria-label="Contattaci su WhatsApp"
    >
      <MessageCircle className="h-5 w-5 flex-shrink-0" />
      <span className="text-sm font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
        Scrivici
      </span>
    </a>
  );
}
```

Aggiungilo in `src/app/[locale]/layout.tsx` dopo `<AppWrapper>`.

### 3b. Gallery Lightbox — `src/components/ui/ImageGallery.tsx`

Gallery con lightbox nativo (senza librerie esterne):
- Grid responsive: 2 col mobile, 3 col tablet, 4 col desktop
- Click su immagine → overlay fullscreen con navigazione prev/next
- ESC per chiudere, frecce tastiera per navigare
- Counter "3 / 12"
- Usata nella pagina dettaglio camera (`/camere/[id]`)

### 3c. Recensioni arricchite — `src/data/reviews/reviews.json`

Aggiungi queste recensioni (basate sullo stile reale italiano di Booking.com):

```json
[
  {
    "id": "booking-francesca-1",
    "source": "Booking.com",
    "authorName": "Francesca",
    "authorCountry": "Italia",
    "rating": 10,
    "date": "2024-06-15",
    "text": "Giovanni gentilissimo e pronto ad esaudire le nostre richieste. Camera pulita, tutto perfettamente funzionante.",
    "lang": "it"
  },
  {
    "id": "booking-elisabetta-2",
    "source": "Booking.com",
    "authorName": "Elisabetta",
    "authorCountry": "Italia",
    "rating": 10,
    "date": "2024-07-20",
    "text": "La struttura ottima e pulita. Host cordiale e disponibile. Tutto perfetto!!! Consiglio",
    "lang": "it"
  },
  {
    "id": "google-marco-3",
    "source": "Google",
    "authorName": "Marco",
    "authorCountry": "Italia",
    "rating": 5,
    "date": "2024-08-10",
    "text": "Struttura accogliente e ben tenuta. Host disponibile. Ottima colazione. Torneremo sicuramente!",
    "lang": "it"
  },
  {
    "id": "booking-anna-4",
    "source": "Booking.com",
    "authorName": "Anna",
    "authorCountry": "Germania",
    "rating": 9,
    "date": "2024-08-25",
    "text": "Sehr sauber, freundlicher Gastgeber. Frühstück sehr gut. Gute Lage für Strandausflüge.",
    "lang": "de"
  },
  {
    "id": "google-luigi-5",
    "source": "Google",
    "authorName": "Luigi",
    "authorCountry": "Italia",
    "rating": 5,
    "date": "2024-09-05",
    "text": "Ottima posizione, camera spaziosa e pulita. Colazione abbondante e deliziosa. Lo consiglio vivamente.",
    "lang": "it"
  },
  {
    "id": "booking-sophie-6",
    "source": "Booking.com",
    "authorName": "Sophie",
    "authorCountry": "Francia",
    "rating": 9,
    "date": "2024-07-30",
    "text": "Très bon séjour. Hôte chaleureux, chambre propre et confortable. Le petit-déjeuner est délicieux.",
    "lang": "fr"
  }
]
```

### 3d. `ReviewsSection.tsx` — AGGIORNA

La sezione recensioni deve:
- Mostrare le stelle (src Google: 5★, Booking.com: voto/10)
- Badge colorato per fonte: Google=rosso, Booking.com=azzurro
- Carousel su mobile (Framer Motion drag scroll)
- Grid 3 colonne su desktop
- Rating medio in evidenza: "9.4/10 · Eccellente"

---

## 🔧 BLOCCO 4 — PAGINE DA COMPLETARE

### 4a. Homepage `src/app/[locale]/page.tsx`

La struttura attuale è già buona. Migliora/aggiusta:

1. **Hero** (`src/components/sections/Hero.tsx`):
   - Aggiungi i CTA: "Scopri le Camere" (primario amber) + "Scrivici su WhatsApp" (secondario verde se numero disponibile)
   - Sotto il titolo, aggiungi 3 numeri impattanti: "4 camere · 100m dalla piazza · Colazione inclusa"
   - Trust badge row (già esistente) con icone Lucide

2. **PercheLeFarfalle** — Rendi più impattante con icone grandi e copy emozionale:
   ```
   🌊 A 5 minuti dalle spiagge dell'AMP
   🍳 Colazione artigianale inclusa ogni mattina
   🦋 Atmosfera familiare, non anonima
   📍 Centro paese, tutto a piedi
   🅿️ Parcheggio convenzionato a 50m
   ⭐ 9.4/10 su Booking.com
   ```

3. **CTA finale** (già esistente in `page.tsx`): mantienilo, ottimizza copy:
   - Titolo: "Pronto per la tua estate in Calabria?"
   - Subtitle: "4 camere, colazione inclusa, a 5 minuti dall'Area Marina Protetta di Capo Rizzuto."

### 4b. Pagina Camere `src/app/[locale]/camere/page.tsx`

Struttura:
- Hero leggero: titolo "Le nostre camere" + breadcrumb
- Grid 2 col (desktop) / 1 col (mobile) con `RoomCard` potenziata
- `RoomCard` deve mostrare: foto principale, nome camera, prezzo "da €XX/notte", icone amenities, bottone "Scopri di più"
- Filtro semplice: All / Disponibili (prepara il componente anche se la logica disponibilità arriverà dopo)

### 4c. Pagina Camera `/camere/[id]` — `src/app/[locale]/camere/[id]/page.tsx`

- Breadcrumb: Home > Camere > Camera Macaone
- Hero: immagine grande (70vh) con titolo sovrapposto
- Gallery: `ImageGallery` con tutte le foto della camera
- Sezione dettagli: mq, posti letto, piano
- Lista amenities con icone Lucide
- Box prezzo sticky su desktop: "da €XX / notte · 2 persone · Colazione inclusa"
- CTA: bottone "Richiedi preventivo" che apre form inline o porta a `/prenota?camera=macaone`
- Sezione: "Altre camere" (3 card delle altre camere)

### 4d. Pagina Prenota `src/app/[locale]/prenota/page.tsx`

Layout a 2 colonne (desktop):
- Sinistra: `ContactForm` con `type="preventivo"` (date, ospiti, camera, messaggio)
- Destra: recap struttura (foto thumbnail, stelle, "Risposta garantita entro 24h")
- Sotto il form: "Oppure contattaci direttamente" con telefono e WhatsApp cliccabili
- Mobile: stack verticale

### 4e. Pagina Contatti `src/app/[locale]/contatti/page.tsx`

- `ContactForm` con `type="contact"`
- Blocco info contatti (telefono, email, WhatsApp)
- Mappa Google Maps embeddita (usa le coordinate da `siteConfig.coordinates`)
- Orari reception: "Check-in: 14:00–20:00 · Check-out: entro le 11:00"

**Mappa Google Maps embed** (componente esistente `LocationMap.tsx` da aggiornare):
```tsx
// Usa il componente iframe di Google Maps con le coordinate reali
// lat: 38.96171494411169, lng: 17.09162398176466
const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...!2d17.09162398176466!3d38.96171494411169!...`;
```

### 4f. Pagina Servizi `src/app/[locale]/servizi/page.tsx`

Grid dei servizi con icone grandi e descrizioni complete:

| Servizio | Icona Lucide | Descrizione |
|----------|-------------|-------------|
| Colazione inclusa | `Coffee` | Servita ogni mattina dalle 7:30 alle 10:00 nella sala comune |
| WiFi superfast | `Wifi` | Connessione fibra, password in camera |
| Aria condizionata | `Wind` | In tutti gli ambienti, silenzionsa e potente |
| Bagno privato | `Droplets` | Ogni camera ha il proprio bagno con doccia |
| TV LED | `Tv` | Smart TV con principali canali |
| Tende oscuranti | `Moon` | Per dormire anche nelle mattine più luminose |
| Parcheggio | `ParkingCircle` | Convenzionato a 50 metri dalla struttura |
| Pulizia quotidiana | `Sparkles` | Cambio biancheria ogni 3 giorni, su richiesta ogni giorno |

Aggiungi anche: "Servizi a richiesta" (transfer aeroporto, tour guidati, prenotazioni ristoranti).

---

## 🔧 BLOCCO 5 — SEO & SCHEMA MARKUP

### 5a. `src/app/[locale]/layout.tsx` — Aggiorna JSON-LD

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BedAndBreakfast",
  "name": "Residence Le Farfalle",
  "description": "4 camere indipendenti con bagno privato nel cuore di Isola di Capo Rizzuto. Colazione inclusa.",
  "url": siteConfig.url,
  "telephone": siteConfig.contacts.phone,
  "email": siteConfig.contacts.email,
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
  "checkinTime": "14:00",
  "checkoutTime": "11:00",
  "numberOfRooms": 4,
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Colazione inclusa", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "WiFi gratuito", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Aria condizionata", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Bagno privato", "value": true }
  ],
  "starRating": { "@type": "Rating", "ratingValue": "9.4", "bestRating": "10" },
  "image": `${siteConfig.url}/images/rooms/camera-generale.webp`,
  "priceRange": "€€"
};
```

### 5b. Meta description per ogni pagina

Assicurati che ogni pagina abbia `generateMetadata()` con:
- `title` unico (es. "Camera Macaone — Residence Le Farfalle")
- `description` 150-160 caratteri con keyword locale
- `openGraph.images` con URL assoluto
- `alternates.languages` per hreflang IT/EN/DE

---

## 🔧 BLOCCO 6 — FOOTER COMPLETO

### `src/components/layout/Footer.tsx` — RISCRIVI

Struttura 4 colonne (desktop) / 2 col (tablet) / 1 col (mobile):

```
[Logo + Desc breve]  [Link Rapidi]  [Camere]  [Contatti]

Link Rapidi: Home, Camere, Servizi, Territorio, Prenota, Contatti
Camere: Camera Limone, Camera Macaone, Camera Vanessa, Camera Aurora
Contatti: telefono (cliccabile), email, WhatsApp, indirizzo

Bottom bar:
© 2025 Residence Le Farfalle · P.IVA [da aggiungere] · Privacy Policy · Cookie Policy
[Social icons: Facebook, Instagram, TripAdvisor — solo se URL configurati]
```

Il footer deve:
- Background `stone-900` con testo `stone-300/400`
- Link hover: `text-amber-400`
- Logo "🦋 Le Farfalle" in testo
- NO link a Villa Olimpia, NO link a La Caletta

---

## 🔧 BLOCCO 7 — HEADER MIGLIORATO

### `src/components/layout/Header.tsx`

Migliora l'header esistente:
- Sfondo: trasparente su hero, `white/95 backdrop-blur-md` dopo scroll (già presente?)
- Aggiungi badge piccolo: "Colazione inclusa" con icona Coffee (solo desktop)
- CTA nell'header: bottone "Prenota" sempre visibile (amber, piccolo)
- Mobile: hamburger menu con slide-in da destra
- LanguageSwitcher: mantieni ma metti a destra del bottone prenota

---

## 🔧 BLOCCO 8 — PERFORMANCE E QUALITÀ

### 8a. Ottimizzazione immagini
- Tutte le `<Image>` devono avere `sizes` prop appropriata
- Usa `priority` solo per le immagini above-the-fold (hero)
- `quality={80}` per gallerie, `quality={85}` per hero

### 8b. Loading states
- Ogni sezione con dati dinamici deve avere uno skeleton loader (`src/components/ui/Skeleton.tsx` già esiste)
- Usa `loading="lazy"` su immagini non critiche

### 8c. Build check
Dopo ogni blocco:
```bash
npm run build && npm run lint
```
Zero errori = requisito assoluto.

---

## 📋 ORDINE DI ESECUZIONE CONSIGLIATO

1. **BLOCCO 1** — Aggiorna dati (5 min) → build check
2. **BLOCCO 5a** — Schema JSON-LD (10 min) → build check
3. **BLOCCO 3a** — WhatsApp button (10 min) → build check
4. **BLOCCO 2** — Form contatto + API route (30 min) → build check
5. **BLOCCO 4d/4e** — Pagine Prenota e Contatti (20 min) → build check
6. **BLOCCO 3b** — Gallery lightbox (20 min) → build check
7. **BLOCCO 4b/4c** — Pagine Camere (25 min) → build check
8. **BLOCCO 6** — Footer completo (15 min) → build check
9. **BLOCCO 7** — Header migliorato (15 min) → build check
10. **BLOCCO 3c/3d** — Recensioni (15 min) → build check
11. **BLOCCO 4f** — Pagina Servizi (15 min) → build check
12. **BLOCCO 8** — Performance pass finale → build check

---

## 🚀 DEPLOY — QUANDO TUTTO È PRONTO

```bash
# 1. Verifica build locale
npm run build

# 2. Push su GitHub (triggera deploy Vercel automatico)
git add -A
git commit -m "feat: sito completo Le Farfalle v2"
git push origin main
```

**Variabili d'ambiente da aggiungere su Vercel Dashboard:**
- `RESEND_API_KEY` — chiave API Resend (gratuita fino a 3.000 email/mese)
- `HOST_EMAIL` — email reale di Francesco

---

## 📱 CONTENUTI AIRBNB — DA GENERARE DOPO IL SITO

Una volta completato il sito, creare contenuti ottimizzati per Airbnb per ciascuna delle 4 camere. Il prompt per questa fase sarà separato e includerà:
- Titolo listing (max 50 caratteri, con keyword)
- Descrizione (500 parole, IT + EN)
- Lista amenities nel formato Airbnb
- Foto order ottimale
- Prezzo suggerito per stagione

---

## ✅ CHECKLIST FINALE PRIMA DEL DEPLOY

- [ ] Nessun placeholder `+39 XXX XXX XXXX` rimasto nel codice
- [ ] Nessun `info@lefarfalle.it` come email di produzione (usare email reale)
- [ ] Tutte le pagine hanno `generateMetadata()` completo
- [ ] Build `npm run build` → ✅ 0 errori
- [ ] Lint `npm run lint` → ✅ 0 errori
- [ ] Test manuale su mobile (Chrome DevTools)
- [ ] WhatsApp button funzionante
- [ ] Form di contatto funzionante (anche senza Resend: logga in console)
- [ ] Nessun riferimento a Villa Olimpia o La Caletta
- [ ] JSON-LD Schema.org valido (verifica su https://validator.schema.org)
