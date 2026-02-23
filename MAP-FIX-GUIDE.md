# 🗺️ GUIDA DEFINITIVA: Correzione Posizione Mappa

## Problema
La mappa mostra una posizione sbagliata perché:
1. Le coordinate in `site.ts` potrebbero non corrispondere all'indirizzo reale
2. L'URL embed è costruito manualmente invece di usare quello ufficiale da Google Maps

## Soluzione Definitiva

### Opzione 1: Usare Embed URL Ufficiale (CONSIGLIATO)

1. **Apri il link Google Maps fornito**:
   ```
   https://maps.app.goo.gl/kCkqLkJk4kvJF8W77
   ```

2. **Ottieni l'URL embed ufficiale**:
   - Clicca su "Condividi" nella mappa Google Maps
   - Seleziona "Incorpora mappa"
   - Copia l'URL iframe completo (inizia con `https://www.google.com/maps/embed?pb=...`)

3. **Sostituisci l'URL nel componente** `LocationMap.tsx`

### Opzione 2: Estrarre Coordinate dal Link

Se il link punta alla posizione corretta, possiamo estrarre le coordinate:
- Apri il link in browser
- Clicca destro sulla mappa > "Cosa c'è qui?"
- Le coordinate appariranno nella barra degli indirizzi
- Aggiorna `site.ts` con le coordinate corrette

### Opzione 3: Verificare Indirizzo

L'indirizzo attuale è: **"Via Capo delle Colonne, 88841 Isola di Capo Rizzuto (KR)"**

Verifica che questo sia l'indirizzo corretto del residence. Se diverso, aggiorna in `src/config/site.ts`.

---

## Coordinate Attuali vs Corrette

**Attuali in `site.ts`**:
- Lat: 38.9547
- Lng: 17.1242

**Da verificare**: Aprire Google Maps e cercare "Via Capo delle Colonne, Isola di Capo Rizzuto" per ottenere coordinate esatte.

---

## File da Modificare

1. `src/config/site.ts` - Aggiornare coordinate se sbagliate
2. `src/components/common/LocationMap.tsx` - Usare embed URL ufficiale
3. `src/app/[locale]/territorio/page.tsx` - Aggiornare mappa
4. `src/components/sections/Location.tsx` - Aggiornare mappa

---

## Test Finale

Dopo le modifiche:
1. `npm run dev`
2. Visita `/it/contatti` e `/it/territorio`
3. Verifica che la mappa mostri la posizione corretta
4. Clicca "Apri su Google Maps" e verifica che apra la posizione corretta
