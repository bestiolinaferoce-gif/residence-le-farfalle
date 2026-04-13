# Audit sito Residence Le Farfalle — raggiungibilità, stato, task

**Data riferimento:** 13 aprile 2026. **Ambito:** solo repository `residence-le-farfalle`.

## 1. Perché il sito può risultare “non raggiungibile”

### Verifica applicativa (codice)

- `npm run build` completa con successo.
- In locale, `/` risponde con redirect verso la locale (es. `/it`); le pagine SSG si generano correttamente.
- **Conclusione:** non risulta un errore di build o di routing che da solo spiegherebbe un blackout totale in produzione.

### Cause probabili lato hosting / DNS (da controllare senza modificare il codice)

1. **Deploy Vercel**
   - Ultimo deploy fallito, progetto sospeso, piano o limite superato.
   - Branch collegato al dominio diverso da quello atteso.

2. **Variabili d’ambiente**
   - Mancanza di chiavi necessarie a runtime (raro per un sito statico/SSG, più rilevante per `/api/contact`).

3. **Dominio e redirect**
   - In `next.config.ts` è configurato redirect **301** da host `residencelefarfalle.com` → `https://www.residencelefarfalle.com/:path*`.
   - Se il DNS del **www** non punta a Vercel o il certificato SSL non è valido per `www`, gli utenti che usano solo il dominio scorretto possono vedere errori o loop apparenti.
   - Verificare su Vercel: dominio primario, redirect apex ↔ www, stato SSL.

4. **Test rapidi consigliati**
   - Aprire `https://www.residencelefarfalle.com/it` e `https://residencelefarfalle.com/it` dal browser e con `curl -I` per vedere catena di redirect e codici HTTP.
   - Confrontare con l’URL del deployment `.vercel.app` dal dashboard: se il `.vercel.app` funziona e il custom domain no, il problema è DNS/certificato.

---

## 2. Cosa funziona già (sintesi)

| Area | Stato |
|------|--------|
| Routing multilingua `/it`, `/en`, `/de` | OK (SSG) |
| Pagine camere, servizi, territorio, legali, partner, prenota | Presenti |
| SEO base | Metadata per pagina (`getPageMetadata`), alternates, sitemap/robots |
| Form contatto API | Route `/api/contact` (richiede env in produzione per invio reale) |
| Immagini camere / hero | Asset in `public/images/rooms/` |
| Territorio — foto reali | Copiate da `~/Desktop/foto-territorio` in `public/images/territorio/` e collegate nella griglia attrazioni (vedi sotto) |

---

## 3. Task da implementare (codice / contenuti nel repo)

Ordine suggerito, a basso rischio:

1. **Territorio — estensione**
   - Usare le altre JPG rimaste sul Desktop (es. Santa Severina 2/3, Spiagge Rosse aggiuntive, Lido Spiaggia Grande) in: `TerritorioTabs`, hero territorio, o galleria dedicata.
   - Ottimizzazione: export WebP/AVIF e dimensioni coerenti (opzionale: script di build o `next/image` già ottimizza a runtime).

2. **i18n completo**
   - Header/footer e pagina territorio: molto testo è ancora solo in italiano; allineare a `messages/*.json` o pattern già usato con `LocaleProvider`.

3. **Ridurre dipendenza da Unsplash**
   - Resta una immagine stock per “Sila” (non presente in `foto-territorio`); aggiungere foto Sila solo se disponibile e licenziata, oppure lasciare stock con alt chiaro.

4. **Form e email produzione**
   - Verificare `RESEND_*` (o provider scelto) e dominio mittente verificato in dashboard.

5. **Warning build `experimental.turbo`**
   - Se compare ancora: cercare la chiave in altri file di config o versione Next; non è bloccante ma va ripulito quando individuata la fonte.

---

## 4. Interventi utili senza toccare il codice

| Azione | Dove |
|--------|------|
| Ripristinare deploy / controllare log errori | Vercel → Deployments |
| Allineare DNS (A/CNAME) per apex e www | Registrar DNS + doc Vercel |
| Impostare `NEXT_PUBLIC_SITE_URL` (e altre env) come su altri progetti | Vercel → Environment Variables |
| Google Search Console: proprietà, sitemap | `https://www.residencelefarfalle.com/sitemap.xml` |
| Verificare mittente email e SPF/DKIM | Provider email / Resend |
| Analytics | ID GA o Plausible nel pannello, se previsto |

---

## 5. Contenuti territorio — origine file

Le immagini in `public/images/territorio/` sono copie rinominate da **`~/Desktop/foto-territorio`** (aprile 2026). Gli originali restano sul Mac; per aggiornare il sito, sostituire o aggiungere file in quella cartella e ricopiare nel repo con nomi senza spazi.

**File attualmente nel sito:**

- `area-marina-protetta.jpg`
- `le-castella-castello.jpg`, `le-castella-castello-2.jpg` (il secondo disponibile per future sezioni)
- `spiaggia-grande-capo-rizzuto.jpg`, `spiaggia-capopiccolo.jpg`, `spiagge-rosse.jpg`
- `tramonto-area-marina.jpg`, `tramonto-le-castella.jpg`
- `valli-cupe-1.jpg`, `valli-cupe-4.jpg`
- `santa-severina.jpg` (disponibile per future schede borghi / entroterra)

Nessun testo o branding è stato importato da altri siti proprietari: solo materiale geografico generico e foto del territorio.

---

## 6. Modifiche effettuate in questa sessione (riferimento)

- Import foto territorio in `public/images/territorio/`.
- Pagina `src/app/[locale]/territorio/page.tsx`: griglia attrazioni con path locali, campo `imageAlt` per accessibilità e SEO; Sila resta su Unsplash finché non c’è foto dedicata.
