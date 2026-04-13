# Partner & sponsor — metodologia (Residence Le Farfalle)

## Dove vivono i dati

- **File sorgente:** `src/data/partners.ts`
- **Perché TS e non JSON grezzo:** tipi (`Partner`, `PartnerCategory`, `PartnerBadge`), autocomplete e validazione a compile-time; deploy simile a “config in repo” senza DB.

Alternative future (solo se serve):

- **CMS** (Sanity, Contentful): se i non-tecnici devono editare spesso o >30 voci.
- **JSON in `src/data/`**: ok per editorial semplici, ma si perdono i vantaggi dei tipi senza schema generator.

## Modello record (`Partner`)

| Campo | Obbligatorio | Note |
|-------|--------------|------|
| `id` | sì | Slug stabile (`farmacia-centro`), non cambiare dopo link esterni. |
| `name` | sì | Nome commerciale breve. |
| `category` | sì | Una delle chiavi `PartnerCategory`. |
| `description` | sì | Chiaro; evitare numeri di telefono non verificati. |
| `sortOrder` | sì | Intero crescente; ordine globale; i filtri categoria mantengono l’ordine relativo. |
| `badge` | no | `recommended` \| `useful` \| `experience` — etichette UX. |
| `phone`, `link`, `address` | no | Solo dati verificati. |
| `comingSoon` | no | Mostra “In arrivo”, disabilita azioni. |
| `logoSrc`, `logoAlt` | no | Path sotto `public`, es. `/images/partners/xyz.webp`. |

## Aggiungere un logo

1. Ottimizza immagine (WebP, sfondo trasparente o bianco, ~200–400px larghezza).
2. Salva in `public/images/partners/<nome>.webp`.
3. Nel record: `logoSrc: "/images/partners/nome.webp"`, `logoAlt: "Nome attività — breve"`.

## Editoriale

- **Sezione homepage:** testi in `partnerSectionCopy` (kicker, title, subtitle, pillars).
- **Filtri:** per categoria; evitare troppe voci per categoria (>8 → valuta sottocategorie o pagina dedicata).

## Componenti UI

- `PartnerCard`: presentazione uniforme.
- `PartnersSection`: strip homepage.
- `PartnersPage`: pagina `/[locale]/partner`.

Per una nuova sezione (es. “solo mare”), filtrare l’array lato pagina o aggiungere una `PartnerCategory` + tab.
