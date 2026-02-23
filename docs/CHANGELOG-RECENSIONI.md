# Changelog – Sezione Recensioni

**Data**: 2025-02-07

---

## Modifiche effettuate

### 1. Dati recensioni (`src/data/reviews/reviews.json`)
- Sostituite tutte le recensioni placeholder con 2 recensioni reali da Booking.com:
  1. **Francesca (Italia)**: «Giovanni gentilissimo e pronto ad esaudire le nostre richieste. Camera pulita, tutto perfettamente funzionante.»
  2. **Elisabetta (Italia)**: «La struttura ottima e pulita. Host cordiale e disponibile. Tutto perfetto!!! Consiglio»
- Rimosse le 6 recensioni esempio.

### 2. Interfaccia Review (`src/data/reviews/reviews.ts`)
- Aggiunto campo opzionale `authorCountry` per visualizzare nome e paese separati.

### 3. Componente `ReviewsSection` (`src/components/reviews/ReviewsSection.tsx`)
- Uso esclusivo di recensioni reali (`realReviews` invece di `reviews`).
- Nome e paese evidenziati: `Francesca (Italia)`, `Elisabetta (Italia)`.
- Fonte indicata come «Fonte: Booking.com».
- `blockquote` semantico per il testo della recensione.
- Date formattate (es. «15 giugno 2024»).
- Schema.org LodgingBusiness con `aggregateRating` e `review`.
- Miglioramenti accessibilità: `aria-labelledby`, `aria-label`, `role`, `time[dateTime]`, `focus:ring`.
- Layout stabile con `min-h-[280px]` e `min-h-[260px]` per ridurre il CLS.
- `content-visibility: auto` per lazy rendering.
- Navigazione a pagine con indici (dots) solo se ci sono più di 3 recensioni.

### 4. Guida contenuti (`docs/CONTENT_GUIDE.md`)
- Aggiunto `authorCountry` e nota su uso di «Fonte: Booking.com» per Booking.

---

## Verifica

```bash
npm run build
npm run dev
```

Controllare la homepage (`/it`) → sezione «Cosa Dicono i Nostri Ospiti».
