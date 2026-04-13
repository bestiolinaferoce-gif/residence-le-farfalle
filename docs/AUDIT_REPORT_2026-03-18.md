# Residence Le Farfalle — Audit tecnico / UX / SEO / compliance (2026-03-18)

**Ambito:** solo repository `residence-le-farfalle`. Nessun contenuto reimportato da altri siti ospitalità.

---

## A. Brand / positioning

| Priorità | Issue | Nota |
|----------|--------|------|
| Media | Tone of voice | Copy principali orientati a Capo Rizzuto / Area Marina; continuare a evitare formule generiche nelle pagine ancora “template”. |
| Bassa | Palette / classi | In uso `mesh-gradient`, `glass-card`, accenti amber/secondary; allineamento ok con linee guida progetto. |

## B. UX / UI

| Priorità | Issue | Stato |
|----------|--------|-------|
| Critica (precedente) | Form preventivo debole | **Ridisegnato** — gerarchia sezioni, trust microcopy, preferenza canale, validazione date, stato successo premium. |
| Media | Pagina Prenota | **Rinforzata** — hero editoriale, trust chips, aside con mappa testuale + CTA tel/WhatsApp. |
| Bassa | Contatti | Card doppia sul form **rimossa** — il form porta già container “glass”. |

## C. Contenuti

| Priorità | Issue | Stato |
|----------|--------|-------|
| Alta | Nome titolare in eccesso | Mitigato in privacy/footer/copy camere; `rooms.ts` IT Limone/Vanessa **rettificati**. |
| Media | Email | Uniformata a `lefarfallecaporizzuto@gmail.com` in config, API, pagine legali dove applicabile. |
| Bassa | Documentazione dev (CURSOR*.md) | Ancora riferimenti storici a vecchia email/nome — solo interni, non serviti dal sito. |

## Aggiornamento (2026-03-19)

- **Metadata IT/EN/DE** centralizzate in `src/lib/page-metadata.ts` e collegate alle route principali (homepage, camere, servizi, territorio, partner, prenota, contatti, privacy, cookie, termini). La FAQ era già multilingua.
- **Titolo SEO pagina camera**: usa il nome camera nella lingua della route (non più sempre l’italiano).
- **Alt immagini**: migliorati su listing camere, dettaglio camera, card homepage, `RoomCard`, hero.
- **`.env.example`**: note per Resend (`RESEND_FROM`, ecc.).

## D. SEO / Google readiness (verificabile da repo)

| Elemento | Esito |
|----------|--------|
| `robots.txt` (`src/app/robots.ts`) | Allow `/`, disallow `/api/`, `/_next/`; `sitemap` punta a `${siteConfig.url}/sitemap.xml`. |
| `sitemap.xml` (`src/app/sitemap.ts`) | Locale × segmenti statici + camere; **ok struttura**. |
| Canonical / hreflang | `pageAlternates()` imposta canonical per `/{locale}/…` + `languages` it/en/de. |
| **Dominio produzione** | `siteConfig.url` usa `NEXT_PUBLIC_SITE_URL` o fallback `https://residence-le-farfalle.vercel.app`. **In produzione impostare URL definitivo** (es. dominio custom) su Vercel. |
| Metadata pagine | Presente su route principali; audit manuale pagina-per-pagina consigliato per DE/EN parità. |
| JSON-LD | Layout locale: verificare allineamento `email` a `siteConfig` (già aggiornato in sessione). |
| Search Console | **Non verificabile offline**: serve property URL-prefix o dominio + verifica DNS/HTML. |
| noindex | Nessun `noindex` globale rilevato nel flusso standard; controllare eventuali bozze per route. |

## E. Performance / codice

| Priorità | Issue | Nota |
|----------|--------|------|
| Bassa | `next.config.ts` | Build segnala chiave `experimental.turbo` non riconosciuta — ripulire config quando possibile. |
| Media | Immagini | Già uso `next/image` in punti chiave; valutare `sizes`/`priority` su LCP homepage. |
| Bassa | Dead code | Grep periodico su componenti non importati. |

## F. Legal / trust

| Priorità | Issue | Stato |
|----------|--------|-------|
| Alta | Identità titolare privacy | Titolare trattato come **Residence Le Farfalle** + CIN dove richiesto; riferimenti personali non necessari ridotti. |
| Media | Cookie / informative | Pagine GDPR presenti; riviste fuori ambito patch singola. |
| Operativo | Email transazionale | API contact usa **Resend**: configurare `RESEND_API_KEY`, **`RESEND_FROM` verificato** (dominio mittente), opzionale `HOST_EMAIL`. |

---

## Piano d’azione

### Immediato (fatto o da deploy)

1. Deploy con `NEXT_PUBLIC_SITE_URL` = URL canonicale reale.
2. Vercel: `RESEND_API_KEY`, `RESEND_FROM` verificato, eventuale `HOST_EMAIL`.
3. Search Console: sottomissione sitemap, controllo copertura.

### Breve termine

1. Parità metadata EN/DE dove mancante.
2. Audit alt text su tutte le immagini pubbliche.
3. Loghi partner reali in `public/images/partners/` + campi `logoSrc` / `logoAlt`.

### Medio termine

1. Core Web Vitals su dominio reale (PageSpeed + CrUX).
2. Structured data aggiuntivo (es. `LodgingBusiness` se coerente con dati verificati).
3. Eventuale CMS/headless se i partner superano decine di voci.

---

## Ipotesi / punti aperti

- **Dominio finale** e property GSC non deducibili dal codice.
- **P.IVA / CF** opzionale via `NEXT_PUBLIC_VAT_OR_CF`.
- **Contenuti partner** con numeri di terzi: policy attuale evita numeri non verificati (corretto editorialmente).
