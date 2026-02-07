# PROJECT RECAP - Residence Le Farfalle

**Data audit**: 2025-02-07  
**Branch**: audit-fixes

---

## STACK

| Tecnologia | Versione |
|------------|----------|
| Next.js | 16.1.6 |
| React | 19.2.3 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 |
| next-intl | ^3.9.0 |
| Framer Motion | ^11.0.0 |
| Lucide React | ^0.320.0 |
| Sharp | ^0.33.0 |

---

## STRUTTURA PROGETTO

```
residence-le-farfalle/
├── src/
│   ├── app/
│   │   ├── [locale]/           # Routing localizzato (it, en, de)
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── camere/         # /[locale]/camere
│   │   │   ├── servizi/        # /[locale]/servizi
│   │   │   ├── territorio/     # /[locale]/territorio
│   │   │   ├── prenota/        # /[locale]/prenota (client)
│   │   │   └── contatti/       # /[locale]/contatti
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Redirect / → /it
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── common/             # LocationMap
│   │   ├── home/               # HeroSlider
│   │   ├── layout/             # Header, Footer, AppWrapper
│   │   ├── reviews/            # ReviewsSection
│   │   ├── sections/           # Hero, Location, RoomsPreview, Services
│   │   ├── territorio/         # TerritorioGrid
│   │   └── ui/                 # Button, Card, Container, Skeleton
│   ├── config/                 # site.ts, navigation.ts
│   ├── data/                   # photos, reviews, territorio
│   ├── lib/                    # i18n, utils, calendar
│   └── types/
├── messages/                   # it.json, en.json, de.json
├── public/images/              # rooms, services (WebP)
├── middleware.ts               # next-intl
└── scripts/optimize-images.ts
```

---

## AVVIO PROGETTO

```bash
# Dev
npm run dev

# Build
npm run build

# Start (produzione)
npm start

# Lint
npm run lint

# Ottimizzazione immagini
npm run optimize-images
```

---

## ROUTING

| Route | Status | Note |
|-------|--------|------|
| / | 302 → /it | Redirect default |
| /it, /en, /de | 200 | Homepage |
| /[locale]/camere | 200 | SSG |
| /[locale]/servizi | 200 | SSG |
| /[locale]/territorio | 200 | SSG |
| /[locale]/prenota | 200 | Client (dynamic) |
| /[locale]/contatti | 200 | SSG |
| /sitemap.xml | 200 | Generato |
| /robots.txt | 200 | Generato |

---

## PROBLEMI NOTI

1. **next.config**: Warning `Unrecognized key(s): 'turbo' at "experimental"` (Next.js 16 / Turbopack – non bloccante)
2. **Contatti placeholder**: `site.ts` contiene `+39 XXX XXX XXXX` – da sostituire con numeri reali
3. **Social vuoti**: Facebook, Instagram, TripAdvisor placeholder – collegare o rimuovere
4. **Mancanza .env**: Nessun file `.env` – creare `.env.example` per variabili future

---

## TODO PRIORITIZZATI

### P0 (Bloccanti)
- [ ] Inserire numeri di telefono e WhatsApp reali in `src/config/site.ts`
- [ ] Verificare che l’immagine OG `/images/rooms/camera-generale.webp` esista e sia adeguata (1200x630 consigliato)

### P1 (Importanti)
- [ ] Collegare social (Facebook, Instagram, TripAdvisor) o nascondere link se non disponibili
- [ ] Sostituire recensioni placeholder in `src/data/reviews/reviews.json`
- [ ] Integrare backend/API per form prenotazione

### P2 (Miglioramenti)
- [ ] Newsletter: form footer attualmente solo UI
- [ ] Google Analytics 4
- [ ] Traduzione completa contenuti territorio (EN/DE)
