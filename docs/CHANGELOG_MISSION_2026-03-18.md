# Changelog — missione audit & fix (2026-03-18)

## File modificati / aggiunti

| File | Cosa | Perché |
|------|------|--------|
| `src/data/rooms/rooms.ts` | Ultime frasi IT (Limone, Vanessa) senza riferimento personale | Privacy / allineamento tono |
| `src/data/partners.ts` | Modello esteso (`sortOrder`, `badge`, `logoSrc`, `logoAlt`, copy editoriale, `getPartnersSorted`) | Metodologia sponsor scalabile |
| `src/components/partner/PartnerCard.tsx` | **Nuovo** — card premium con badge, logo opzionale, initial fallback | UI coerente homepage + pagina partner |
| `src/components/partner/PartnersSection.tsx` | Pillole editoriali, filtri categoria, ordine stabile, mesh background | Sezione “partner” meno “griglia anonima” |
| `src/components/partner/PartnersPage.tsx` | Stesso modello dati + card | Coerenza `/partner` |
| `src/components/forms/ContactForm.tsx` | Ridisegno completo: sezioni, trust, preferenza contatto → API, validazione date, stati UX | Conversione / fiducia |
| `src/app/[locale]/prenota/page.tsx` | Hero + layout aside, micro-copy posizionamento | Pagina preventivo più premium |
| `src/app/[locale]/contatti/page.tsx` | Rimossa card duplicata attorno al form | Evitare doppio container |
| `public/images/partners/.gitkeep` | Cartella per logo futuri | Asset sponsor |
| `proposta-ambra-agosto.html` | **Rimosso dalla repo** | Non faceva parte del progetto sito (preventivo esterno) |
| `docs/AUDIT_REPORT_2026-03-18.md` | Report audit | Deliverable |
| `docs/SPONSORS.md` | Guida editoriale / tecnica sponsor | Deliverable |
| `docs/CHANGELOG_MISSION_2026-03-18.md` | Questo file | Tracciamento |

## Preesistenti (sessioni precedenti — riepilogo)

- `src/config/site.ts` — `CONTACT_EMAIL` Gmail ufficiale.
- `src/app/api/contact/route.ts` — `preferredContact`, Resend, `HOST_EMAIL` fallback.
- Legal pages, footer, JSON-LD — email e titolare semplificato.

---

## Aggiornamento 2026-03-19 — task pianificate (SEO / env / alt)

| File | Cosa | Perché |
|------|------|--------|
| `src/lib/page-metadata.ts` | **Nuovo** — title/description/keywords IT/EN/DE per le pagine principali | Parità SEO multilingua |
| `src/app/[locale]/page.tsx` | Metadata da `getPageMetadata("home")`, OG alt immagine | Homepage per lingua |
| `src/app/[locale]/camere/page.tsx` | Idem `camere` + alt card listing | SEO + accessibilità |
| `src/app/[locale]/camere/[slug]/page.tsx` | Titolo meta con nome camera localizzato; alt hero e thumbnail “altre camere” | Fix titolo sempre in IT |
| `src/app/[locale]/servizi/page.tsx` (e analoghe: territorio, partner, prenota, contatti, privacy, cookie, termini) | Metadata localizzate | Parità /de e /en |
| `src/components/rooms/RoomCard.tsx` | Alt immagine più descrittivo | Alt coverage |
| `src/components/sections/HomeRoomsPreview.tsx` | Alt immagine più descrittivo | Alt coverage |
| `src/components/sections/Hero.tsx` | Alt hero più specifico | Alt coverage |
| `.env.example` | Note `RESEND_FROM`, `RESEND_API_KEY`, `HOST_EMAIL` | Deploy / operatività |

## Aggiornamento 2026-03-19 (b) — copy UI multilingua + JSON-LD

| File | Cosa | Perché |
|------|------|--------|
| `messages/it.json`, `en.json`, `de.json` | Testi homepage (hero, camere preview, perche, servizi, mare, territorio 60s, location, newsletter, footer, room card) | `/en` e `/de` coerenti col browser |
| `src/components/i18n/LocaleProvider.tsx` | **Nuovo** — `useLocaleStrings` + `raw()` senza `useTranslations` next-intl | Evita errore prerender “config file” con Next 16 |
| `src/app/[locale]/layout.tsx` | `LocaleProvider` + import JSON messaggi; JSON-LD `description`/`image`/`amenityFeature` per lingua | Provider + SEO locale |
| `src/data/partners.ts` | Etichette categorie/badge IT/EN/DE; `getPartnerSectionCopy`; `getPartnerCategoryLabel` | Partner anche in inglese/tedesco |
| `src/components/partner/*` | Preview/Section/Page allineati a `locale` | |
| `next.config.ts` | `createNextIntlPlugin()` senza path | Rileva `src/i18n/request.ts` |
| `src/i18n/request.ts` | Config next-intl (messaggi per middleware/plugin) | Mantenuto per stack next-intl |
| Componenti `Hero`, `HomeRoomsPreview`, `PercheLeFarfalle`, `Services`, `MareVicino`, `Territorio60Secondi`, `Location`, `Newsletter`, `HomeFooter`, `RoomCard` | Usano `useLocaleStrings` | i18n UI |
