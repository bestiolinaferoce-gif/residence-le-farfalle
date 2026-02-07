# CHANGES LOG - Audit 2025-02-07

**Branch**: audit-fixes

---

## Correzioni Applicate

### 1. HeroSlider – WhatsApp CTA
- **File**: `src/components/home/HeroSlider.tsx`
- **Modifica**: Il pulsante WhatsApp viene mostrato solo se il numero ha almeno 10 cifre (es. placeholder `+39 XXX XXX XXXX` non mostra il pulsante)
- **Test**: Con numeri placeholder il pulsante non appare; inserire numero reale per vederlo

### 2. Location – Mappa unificata
- **File**: `src/components/sections/Location.tsx`
- **Modifica**: La sezione territorio in homepage usa `LocationMap` al posto dell’iframe locale, garantendo la stessa posizione corretta
- **Test**: Homepage → sezione "Il Territorio" → mappa deve mostrare Residence Le Farfalle

### 3. Root layout – SEO / OpenGraph
- **File**: `src/app/layout.tsx`
- **Modifica**: Aggiunti `metadataBase`, `openGraph.siteName`, `openGraph.type` per URL assoluti e sharing
- **Test**: Condivisione link su social → preview corretta

### 4. `.env.example`
- **File**: `.env.example`
- **Modifica**: Creato con variabili placeholder per URL, Analytics, API
- **Test**: Copiare in `.env` e valorizzare se necessario

---

## Documenti Creati

| File | Descrizione |
|------|-------------|
| `docs/PROJECT_RECAP.md` | Stack, struttura, avvio, problemi, TODO P0/P1/P2 |
| `docs/SWOT.md` | Strengths, Weaknesses, Opportunities, Threats |
| `docs/CHANGES_LOG.md` | Questo file |

---

## Come Testare

```bash
# Build
npm run build

# Dev
npm run dev
```

### Checklist

- [ ] `/` → redirect a `/it`
- [ ] `/it`, `/en`, `/de` → homepage con Hero slider
- [ ] `/it/camere` → pagina camere
- [ ] `/it/servizi` → pagina servizi
- [ ] `/it/territorio` → pagina territorio con mappa
- [ ] `/it/prenota` → form prenotazione
- [ ] `/it/contatti` → contatti + mappa
- [ ] Homepage sezione territorio → mappa corretta
- [ ] Console browser senza errori critici

---

## Note

- **Warning next.config**: `Unrecognized key: turbo` è un warning di Next.js 16/Turbopack, non bloccante
- **Script typecheck**: Aggiungere in `package.json` se utile: `"typecheck": "tsc --noEmit"`
