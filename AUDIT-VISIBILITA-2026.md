# Audit Visibilità & Conversione — Residence Le Farfalle

_Data: 2026-09-10 · Focus: attrarre traffico + convertire, sfruttando le recensioni Booking._

Stack verificato: Next.js 16.1.6 (App Router), React 19, TS strict, Tailwind 4, next-intl (it/en/de), Vercel. Build **OK**. Lint: **1 errore + 6 warning**. Nessun `any`. Basi SEO solide; il vero potenziale non sfruttato è la **prova sociale** (recensioni + profili OTA).

---

## 0. Priorità (impatto vs sforzo)

| # | Azione | Impatto | Sforzo | Tipo |
|---|--------|:------:|:------:|------|
| 1 | Popolare `siteConfig.social` + `booking` (Booking, Google, TripAdvisor, IG/FB) e aggiungere `sameAs` al JSON-LD | ALTO | XS | SEO/E-E-A-T |
| 2 | Importare TUTTE le recensioni reali Booking/Google (non solo 6) | ALTO | S | Prova sociale/Rich result |
| 3 | Setup Google Business Profile + Search Console + link OTA nel footer/hero | ALTO | S | Local SEO/traffico |
| 4 | Tradurre heading sezione recensioni (ora hardcoded IT su EN/DE) | MEDIO | XS | i18n/conversione |
| 5 | Fix lint error `BandieraBluTopBanner` + pulizia warning | MEDIO | XS | Qualità/CWV |
| 6 | Blog/landing territoriali (contenuto = traffico organico) | ALTO | M | SEO contenuti |
| 7 | CTA diretta "Prenota su Booking" + preventivo diretto affiancati | MEDIO | S | Conversione |

---

## 1. Salute tecnica

**Build**: passa. 14 route statiche × 3 lingue + 4 camere × 3 = prerender completo (SSG). Ottimo per SEO e velocità.

**Lint** (`npm run lint`):
- ❌ **Error** — `src/components/ui/BandieraBluTopBanner.tsx:51` `react-hooks/set-state-in-effect`: `setState` sincrono dentro `useEffect` → cascading render. Fix: leggere `localStorage` con `useState(() => ...)` lazy init, oppure gate con `useSyncExternalStore`.
- ⚠️ 6 warning `no-unused-vars`: `PreventivoForm.tsx` (`locale`, `roomName`), `RoomDetail.tsx` (`Users`, `Button`), `RoomsHero.tsx` (`Link`), `HomeHero.tsx` (`whatsappUrl`). Rimuovere import/prop morti.

**TypeScript**: strict, zero `any`. ✅ Conforme regole progetto.

**Deviazioni regole progetto** (non bloccanti, coerenza interna):
- File > 200 righe: `ContactForm.tsx` (516), `territorio/page.tsx` (479), `page-metadata.ts` (386), `bandiera-blu-.../page.tsx` (358), `partners.ts` (257), `camere/[slug]/page.tsx` (249), `HeroSlider.tsx` (248), `faq/page.tsx` (234), `RoomDetail.tsx` (226). Candidati a split.
- Componenti usano **default export** (la regola chiede named export tranne page/layout). Convenzione ormai diffusa nel repo — decidere se uniformare o aggiornare la regola.

---

## 2. SEO on-page — cosa c'è già (buono)

- Metadata per pagina in 3 lingue (`src/lib/page-metadata.ts`): title, description, keywords mirate su "Isola di Capo Rizzuto / Capo Rizzuto / Crotone / Calabria ionica". ✅
- **hreflang + canonical** corretti (`src/lib/seo.ts` + layout) con `x-default` = it. ✅
- `sitemap.ts` completo (statiche + camere) e `robots.ts` con sitemap dichiarata. ✅
- OpenGraph + Twitter card con immagine camera 1536×1024. ✅
- Landing dedicata **Bandiera Blu 2026** = ottima intercettazione stagionale/local. ✅
- Redirect apex→www permanente (`next.config.ts`). ✅

## 2bis. SEO on-page — gap

- **`keywords` meta**: ignorata da Google, ok tenerla ma non è leva. Spostare energia sui contenuti.
- **OG image unica per tutte le lingue/pagine** interne: le camere ereditano OG senza immagine specifica (`camere/[slug]` OG non setta `images`). Aggiungere `openGraph.images` con la foto della camera.
- **Nessuna pagina di contenuto lungo** (guide, blog) → poche porte d'ingresso organiche. Vedi §6.
- **H1 hero da `next-intl`** ok, ma verificare che headline contenga keyword geo ("Isola di Capo Rizzuto") almeno una volta nel fold.

---

## 3. Dati strutturati / Rich results

Presenti e ben fatti:
- `BedAndBreakfast` globale (layout) con `address`, `geo`, `amenityFeature`, `priceRange`, `makesOffer`, e **`aggregateRating` solo se recensioni reali** (scelta corretta, niente rating inventati). ✅
- `FAQPage` (10 Q&A × 3 lingue) → eleggibile a rich result FAQ. ✅
- `HotelRoom` + `Offer` per ogni camera. ✅
- `BreadcrumbList` su faq e camere. ✅

Gap ad alto valore:
- ❌ **`sameAs` assente**: `siteConfig.social`/`booking` sono vuoti (tutti TODO). Con i profili reali → aggiungere `sameAs: [booking, google, tripadvisor, instagram, facebook]` all'oggetto `BedAndBreakfast`. Segnale forte E-E-A-T e collega l'entità ai profili con recensioni.
- ⚠️ **`aggregateRating` su LocalBusiness/BedAndBreakfast**: Google ha ristretto i rating "self-serving" per LocalBusiness. Il rating potrebbe non mostrarsi come stella in SERP. La reputazione stella arriva soprattutto da **Google Business Profile** e dalle pagine OTA → priorità §5.
- Aggiungere `hasMap`, `openingHours`/check-in, `image` con più foto, `currenciesAccepted`, `paymentAccepted` per arricchire l'entità.

---

## 4. Recensioni & prova sociale — IL punto centrale

Stato attuale: **solo 6 recensioni** hardcoded in `src/data/reviews/reviews.json` (5 Booking/Google + 1 FR). `getReviewStats()` calcola media/conteggio; hero e sezione mostrano il dato reale. Architettura pulita (no placeholder in prod). Ma 6 è pochissimo rispetto a quanto avete su Booking.

Azioni:
1. **Importare tutte le recensioni reali Booking + Google** nel JSON (campi già pronti: `source`, `authorName`, `authorCountry`, `rating`, `date`, `text`, `lang`, `sourceUrl`). Più volume → hero "9.x/10 · N recensioni" più credibile e `reviewCount` più alto.
2. **Diversificare le lingue** delle card: oggi la sezione filtra per `locale` e fa fallback a IT. Con più recensioni EN/DE reali, l'utente straniero vede prova sociale nella sua lingua → conversione.
3. **`sourceUrl` reale** su ogni card (link alla recensione/portale) → credibilità + referral.
4. **Badge "Eccellente su Booking.com"** con punteggio per-fonte: la funzione `getReviewStatsBySource("Booking.com")` esiste già — usarla in un blocco hero/CTA ("9.4/10 su Booking, N recensioni").
5. **NON** inventare recensioni (regola già nel file, rispettata). Il rich result stella è rischioso self-serving: la leva vera è linkare i profili con recensioni verificate (§5).

Gap i18n recensioni:
- ❌ `ReviewsSection.tsx` heading **"Cosa Dicono i Nostri Ospiti"** e "Eccellente"/"recensioni" sono **hardcoded in italiano** → un tedesco/inglese vede titolo IT. Spostare in `messages/*.json` (chiave `reviews.*`) e usare `useLocaleStrings`. Anche label "da €/notte", "Colazione inclusa", "Richiedi Preventivo", "Tutte le camere", "Galleria", "Servizi", "Altre camere" in `camere/[slug]` sono hardcoded IT.

---

## 5. Local SEO & off-page (dove nasce il traffico reale)

Questa è la leva #1 per una struttura ricettiva. Stato: **profili non collegati**.

- **Google Business Profile (GBP)**: verificare/rivendicare la scheda, categoria "Bed & breakfast", foto, orari, link al sito, rispondere a TUTTE le recensioni. È la fonte principale di stelle in SERP e di traffico "near me". → poi valorizzare `siteConfig.social.google_business`.
- **Booking.com / Airbnb**: inserire URL reali in `siteConfig.booking`. Aggiungere nel footer/hero un pulsante "Vedi su Booking" (fiducia) accanto al preventivo diretto (margine). Collegarli in `sameAs`.
- **TripAdvisor**: il footer già supporta il link (`Footer.tsx:132`) ma `social.tripadvisor` è vuoto → popolarlo.
- **Instagram/Facebook**: pubblicare, linkare, aggiungere a `sameAs`. Contenuto social = segnale di attività + traffico.
- **Google Search Console + Bing Webmaster**: registrare la property, inviare `sitemap.xml`, monitorare query/impression. (Non risulta traccia di verifica nel repo — aggiungere `verification` in metadata o file.)
- **Citazioni NAP** coerenti (Nome-Indirizzo-Telefono) su directory turistiche Calabria/Crotone.

---

## 6. Contenuti = traffico organico (medio termine)

Poche pagine informative → poche keyword intercettate. Proposte (usare struttura territorio esistente):
- Guide long-form: "Spiagge Bandiera Blu Isola di Capo Rizzuto", "Le Castella cosa vedere", "Cosa fare a Capo Rizzuto in 3 giorni", "Come arrivare da aeroporti (Lamezia/Crotone)".
- FAQ già ottima base → espandere con domande a coda lunga.
- Ogni guida: metadata dedicati + immagini ottimizzate + link interni a camere/prenota → distribuisce autorità e crea funnel.
- Contenuto stagionale (Bandiera Blu è il modello giusto): replicare per eventi/estate.

---

## 7. Performance (impatta ranking + conversione)

- `next/image` usato ovunque con `sizes`, `priority` sull'hero, `loading="lazy"` sulle preview. ✅
- `next.config.ts`: formats webp/avif, deviceSizes/imageSizes sensati, qualities [75,90]. ✅
- `framer-motion` su molte sezioni (hero, recensioni, ecc.): è client-side JS. Verificare che le animazioni above-the-fold non peggiorino LCP/INP; valutare `dynamic()` per sezioni pesanti sotto il fold (es. `HeroSlider` 248 righe, mappa).
- Suggerito: girare **Lighthouse/PageSpeed** in produzione e controllare LCP (immagine hero), CLS (badge/animazioni), INP. Non eseguito in questo audit statico.
- `react-compiler` (babel-plugin) attivo → buon default per memoizzazione.

---

## 8. Conversione / UX

- Hero con **AvailabilityWidget** + trust badges (rating reale) + CTA contatti = buon fold. ✅
- Doppio canale: preventivo diretto + WhatsApp/telefono. ✅
- Migliorie:
  - Affiancare CTA "Prenota diretto (miglior prezzo)" e "Vedi su Booking" → cattura sia chi si fida degli OTA sia il margine diretto.
  - Sticky CTA mobile "Richiedi preventivo / WhatsApp".
  - Mostrare punteggio Booking vicino alla CTA di prenotazione (riduce attrito).
  - Newsletter già presente → usarla per remarketing stagionale.

---

## 9. Misurazione

- `@vercel/analytics` installato + `src/lib/analytics.ts` + `RoomViewTracker`. ✅
- Aggiungere: GA4 (o confermare eventi Vercel), event tracking su submit preventivo/WhatsApp/click OTA per misurare conversioni.
- Collegare GSC per query organiche reali.

---

## 10. Piano d'azione consigliato

**Quick win (oggi, < 1h ciascuno)**
1. Popolare `siteConfig.social` + `siteConfig.booking` con URL reali; aggiungere `sameAs` al JSON-LD in `layout.tsx`.
2. Fix lint error `BandieraBluTopBanner` + rimuovere 6 unused vars.
3. Tradurre heading/label recensioni e camere (IT→messages, en/de).

**Settimana 1**
4. Importare tutte le recensioni reali Booking/Google in `reviews.json` (+ `sourceUrl`).
5. GBP rivendicato/ottimizzato; GSC + sitemap inviata; Bing Webmaster.
6. CTA "Vedi su Booking" + badge punteggio per-fonte in hero.

**Mese 1-2**
7. 3-4 guide territoriali long-form (traffico organico) con link interni.
8. Lighthouse in prod → ottimizzare LCP/INP; `dynamic()` per componenti pesanti.
9. Event tracking conversioni + report.

---

_Note: audit statico su codice (nessun test su sito live). Le voci performance (Lighthouse) e la resa reale dei rich result vanno verificate in produzione con GSC + PageSpeed._
