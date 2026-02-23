# Report: Pattern mareverdevacanze.it replicati in Residence Le Farfalle

## Cosa è stato replicato e dove

### 1) Menu conversion-oriented (da mareverdevacanze)
**Pattern**: Navigazione chiara Ospitalità / Esperienze / Servizi / Prenota  
**Implementato in**: `src/config/navigation.ts`, `src/components/layout/Header.tsx`

| Menu attuale | Route | Note |
|--------------|-------|------|
| Home | / | |
| Camere | /camere | Catalogo ospitalità |
| Territorio | /territorio | Esperienze e notizie utili |
| Servizi & Partner | /servizi | Servizi + Partner utili (unificato) |
| Richiedi Preventivo | /prenota | CTA conversione principale |
| Contatti | /contatti | |

### 2) Catalogo camere (stile Ospitalità)
**Pattern**: Cards con foto, titolo, micro-descrizione, icone servizi, badge, CTA  
**Implementato in**: `src/components/rooms/RoomCard.tsx`, `src/components/rooms/RoomsSection.tsx`

- Foto con hover swap
- Badge "Nel centro paese" + "Tutto incluso"
- 3 icone servizi (Bagno, TV, AC, WiFi...)
- CTA "Vedi dettagli" → `/camere/[id]`
- CTA secondaria "Richiedi preventivo" (WhatsApp)

### 3) Pagina dettaglio camera completa
**Pattern**: Blocchi standard obbligatori  
**Implementato in**: `src/app/[locale]/camere/[id]/page.tsx`, `src/components/rooms/RoomDetail.tsx`

| Blocco | Implementato |
|--------|--------------|
| Servizi presenti (lista puntata) | ✅ |
| Posizione (indirizzo + "in centro paese") | ✅ |
| Come arrivare / come muoversi | ✅ |
| Fotogallery (grid/slider) | ✅ |
| Richiedi un preventivo (form) | ✅ `PreventivoForm.tsx` |
| Altre camere consigliate (cross-sell) | ✅ |

### 4) Lead capture - Newsletter
**Pattern**: Sezione Newsletter in fondo alle pagine chiave  
**Implementato in**: `src/components/sections/Newsletter.tsx`

- Home: ✅
- Territorio: ✅
- Camere: ✅
- Servizi: ✅

---

## TASK A — Home restyling

- Hero: titolo + sottotitolo centro paese + spiagge Area Marina Protetta
- CTA: "Vedi Camere" + "Richiedi Preventivo"
- Perché Le Farfalle: 5 card con micro-animazioni
- Camere: preview catalogo con cards
- Territorio in 60 secondi: 6 card (spiagge, area marina, borghi, eventi, escursioni, food)
- Servizi & Partner: 6 cards + CTA "Vedi tutti"
- Newsletter (utility-based)
- FloatingButterflies: farfalle SVG, drift + oscillazione, prefers-reduced-motion

---

## TASK B — Pagina Territorio

- Tab: Spiagge, Servizi, Esperienze
- Centro paese: tutto a portata di mano
- Spiagge top a pochi minuti
- Area Marina Protetta: perché è speciale
- Consigli pratici
- Esperienze in cards

---

## TASK C — Servizi & Partner

- Pagina unificata `/servizi` con servizi + partner
- Data layer: `src/data/partners.ts` (`{ name, category, description, phone?, url?, address? }`)
- Categorie: Farmacie, Numeri utili, Supermarket, Ristoranti, Transfer, Noleggio, Escursioni
- Filtri per categoria
- Home: preview 6 cards + CTA

---

## TASK D — QA

- Tipografia, spacing, SectionHeader, Card, Button coerenti
- Responsività mobile-first
- Routing e build verificati
- Farfalla decorativa su Servizi e Territorio
- prefers-reduced-motion rispettato

---

## File creati

| File | Descrizione |
|------|-------------|
| `src/components/sections/Territorio60Secondi.tsx` | 6 card territorio |
| `src/components/sections/Newsletter.tsx` | Lead capture |
| `src/components/rooms/RoomDetail.tsx` | Dettaglio camera |
| `src/components/rooms/PreventivoForm.tsx` | Form preventivo sidebar |
| `src/components/partner/PartnersSection.tsx` | Sezione partner in servizi |
| `src/app/[locale]/camere/[id]/page.tsx` | Route dettaglio camera |

## File modificati

| File | Modifiche |
|------|-----------|
| `src/config/navigation.ts` | Menu: Servizi & Partner, Richiedi Preventivo |
| `src/components/sections/HomeHero.tsx` | CTA "Richiedi Preventivo" |
| `src/app/[locale]/page.tsx` | Territorio60Secondi, Newsletter, CTA |
| `src/components/rooms/RoomCard.tsx` | Badge, 3 icone, link a /camere/[id] |
| `src/app/[locale]/servizi/page.tsx` | PartnersSection, Newsletter |
| `src/app/[locale]/territorio/page.tsx` | Newsletter |
| `src/app/[locale]/camere/page.tsx` | Newsletter, CTA Richiedi Preventivo |
| `src/components/layout/Header.tsx` | Pulsante "Richiedi Preventivo" |
| `src/components/partner/PartnersPreview.tsx` | Link a /servizi#partner |
| `src/components/servizi/ServiziHero.tsx` | Farfalla decorativa |
| `src/components/territorio/TerritorioHero.tsx` | Farfalla decorativa |

---

## Come testare localmente

1. `npm run dev` – avvia il server
2. `npm run build` – verifica build
3. **Home** `/it` – Hero, farfalle, Perché, Camere, Territorio 60s, Servizi&Partner, Newsletter
4. **Camere** `/it/camere` – Catalogo cards, badge, CTA
5. **Dettaglio camera** `/it/camere/1` – Servizi, posizione, form preventivo, altre camere
6. **Territorio** `/it/territorio` – Tab, blocchi, Newsletter
7. **Servizi** `/it/servizi` – Servizi + Partner, filtri, Newsletter
8. **Richiedi Preventivo** `/it/prenota` – Form prenotazione
9. **Mobile** – Layout responsive, menu hamburger
