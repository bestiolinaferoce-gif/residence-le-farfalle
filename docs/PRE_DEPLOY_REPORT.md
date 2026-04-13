# Report pre-deploy — Residence Le Farfalle

**Data:** 18 marzo 2026  
**Repository:** `residence-le-farfalle` (Next.js App Router, i18n IT/EN/DE)  
**Deploy:** si consiglia solo `git push origin main` (auto-deploy Vercel; **non** `vercel deploy` da CLI).

---

## 1. Riepilogo

Il sito è stato portato a uno stato **go-live ready** dal punto di vista tecnico (SEO di base, GDPR, tracking condizionale, JSON-LD, contenuti camere, FAQ, sitemap completa). Restano **solo dati da parte del titolare** (P.IVA esplicita se si vuole in chiaro, ID GA4 reale, URL social/OTA, eventuale revisione legale dei testi).

---

## 2. Configurazione e dominio

| Correzione | File / ambito |
|------------|----------------|
| URL del sito da variabile `NEXT_PUBLIC_SITE_URL` con fallback al dominio Vercel | `src/config/site.ts` |
| CIN struttura esposto e costante riutilizzabile `STRUCTURE_CIN` | `src/config/site.ts`, footer |
| Campo opzionale **`vatOrCf`** da `NEXT_PUBLIC_VAT_OR_CF`; in assenza il footer invita a richiedere i dati via email | `src/config/site.ts`, `Footer.tsx` |
| `.env.example` aggiornato con `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, hint Resend e (se presente) P.IVA | `.env.example` |

---

## 3. Layout, lingua e analytics

| Correzione | Dettaglio |
|------------|-----------|
| **`lang` dinamico** | Script in `src/app/[locale]/layout.tsx` che imposta `document.documentElement.lang` (it/en/de). Root `layout.tsx` mantiene fallback `lang="it"`. |
| **Google Analytics 4** | In `src/app/layout.tsx`, caricamento condizionale se `NEXT_PUBLIC_GA_ID` è definito. |
| **Rimozione meta `keywords`** dal layout locale | `src/app/[locale]/layout.tsx` (pulizia SEO) |
| **JSON-LD BedAndBreakfast** | Include **`aggregateRating`** derivato da `getReviewStats()` (fallback 9.7 / 6 recensioni). Rimossa la vecchia `starRating` ridondante. |

---

## 4. Metadata: canonical e hreflang

Helper **`pageAlternates(locale, segment)`** in `src/lib/seo.ts`, applicato a:

- Camere (lista e dettaglio slug), servizi, territorio, prenota, contatti  
- FAQ, privacy, cookie, termini, partner  
- (Layout locale: home per lingue)

---

## 5. Pagine camere e schema

| Correzione | File |
|------------|------|
| Descrizioni lunghe IT/EN/DE (~100+ parole) per tutte le camere | `src/data/rooms/rooms.ts` |
| Badge prezzo “da €…/notte” su anteprima e card | `RoomsPreview.tsx`, `RoomCard.tsx` |
| **JSON-LD `HotelRoom`** per ogni pagina camera | `src/app/[locale]/camere/[slug]/page.tsx` |
| Metadata Open Graph / description da contenuto camera | stesso file |
| **`RoomViewTracker`** (evento GA `room_view` al mount) | `src/components/rooms/RoomViewTracker.tsx` |

---

## 6. GDPR e testi legali

| Correzione | File |
|------------|------|
| **Privacy:** titolare struttura (minimo necessario), indirizzo, tel, email, **CIN** | `src/app/[locale]/privacy/page.tsx` |
| **Cookie policy** | `src/app/[locale]/cookie/page.tsx` (più `alternates`) |
| **Termini e condizioni:** sezione prenotazione/cancellazione **completata** (testo in chiaro + rimando alla conferma contrattuale del titolare); rimosso `TODO` | `src/app/[locale]/termini/page.tsx` |
| **Footer:** CIN, link Privacy / Cookie / **Termini**, copyright con anno dinamico | `src/components/layout/Footer.tsx` |
| **Cookie banner** | componente GDPR già integrato nel flusso layout (verificare in `AppWrapper` / layout) |

*Nota:* revisione da parte di un legale resta consigliata per testi privacy/termini definitivi.

---

## 7. FAQ e navigazione

- Nuova route **`/[locale]/faq`** con contenuti **IT/EN/DE**, **FAQPage** JSON-LD, SSG.  
- Voce **FAQ** nel menu (`navigation.ts`) con etichette per lingua; **Header** aggiornato.  
- Link FAQ anche nel **Footer** (quick links).  
- Testo **parcheggio** allineato (50 m, gratuito, alta stagione) in FAQ, callout **servizi** e griglia servizi localizzata per la voce parcheggio.

---

## 8. Servizi e partner

| Correzione | Dettaglio |
|------------|-----------|
| Callout parcheggio (IT/EN/DE) sopra la griglia servizi | `src/app/[locale]/servizi/page.tsx` |
| Voce “Parcheggio” in `ServiziGrid` con titolo/descrizione per locale | `src/components/servizi/ServiziGrid.tsx` |
| **Rimossi numeri telefono fittizi** (`+39 XXX…`) dai partner; testi che rimandano a verifiche in loco / struttura | `src/data/partners.ts` |

---

## 9. Tracking GA4 (eventi custom)

- Utility **`src/lib/analytics.ts`** con `trackEvent` e `GA_EVENTS`.  
- Componenti **`TrackedTel`**, **`TrackedMailto`**, **`TrackedWhatsapp`** (`src/components/analytics/TrackedLinks.tsx`).  
- Wire su: **Footer**, **Contatti**, **Prenota**, **Hero** (CTA + WhatsApp), **WhatsApp** floating, **ContactForm** (submit preventivo/contatto), **RoomCard** (WhatsApp).

---

## 10. Sitemap

- **Estesa** per includere: `faq`, `privacy`, `cookie`, `termini`, `partner` e **tutte le URL `/camere/[slug]`** per ogni lingua.  
- File: **`src/app/sitemap.ts`**.

---

## 11. Cosa configurare su Vercel (o `.env.local`)

| Variabile | Uso |
|-----------|-----|
| `NEXT_PUBLIC_SITE_URL` | Es. `https://www.residencelefarfalle.it` |
| `NEXT_PUBLIC_GA_ID` | ID misurazione GA4 (`G-…`) |
| `NEXT_PUBLIC_VAT_OR_CF` | Opzionale: mostra P.IVA/CF in footer |
| `RESEND_API_KEY` / email destinatario (se in uso) | Form contatto |

---

## 12. Azioni post-go-live (titolare)

1. Sostituire / confermare **P.IVA o C.F.** (`NEXT_PUBLIC_VAT_OR_CF` o revisione testo footer).  
2. Inserire **URL reali** social / OTA / Google Business in `src/config/site.ts` (blocco commentato FIX-17).  
3. Verificare **numeri farmacie di turno** e fornitori transfer se si desidera pubblicarli in chiaro in `partners.ts`.  
4. Validare **JSON-LD** su [validator.schema.org](https://validator.schema.org).  
5. Controllare **hreflang** e **canonical** su campione di pagine (IT/EN/DE).  
6. **Deploy:** commit + push su `main` (workflow definito in `AGENTS.md`).

---

## 13. Verifica build (eseguita in sviluppo)

```bash
npx tsc --noEmit
npm run lint
npm run build
```

*Lint:* possono rimanere **warning** preesistenti su file non critici; **0 error** in fase di consegna delle ultime modifiche.

---

*Fine report — pronto per review del titolare e push su `main`.*
