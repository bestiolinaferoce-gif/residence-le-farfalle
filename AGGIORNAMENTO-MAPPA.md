# ✅ Link Google Maps Aggiornato

## Nuovo Link Fornito
**https://maps.app.goo.gl/cF5jbGk4A8smeEWv7**

## ✅ Modifiche Applicate

1. **Aggiornato `LocationMap.tsx`** con il nuovo link Google Maps
2. Il componente ora usa il link corretto per il pulsante "Apri su Google Maps"

## 🔧 Prossimi Passi (Per Mappa Embed Corretta)

### Opzione 1: Usa URL Embed Ufficiale (CONSIGLIATO)

1. **Apri il nuovo link**: https://maps.app.goo.gl/cF5jbGk4A8smeEWv7
2. **Clicca "Condividi"** nella mappa Google Maps
3. **Seleziona "Incorpora mappa"**
4. **Copia l'URL iframe completo** (inizia con `https://www.google.com/maps/embed?pb=...`)

5. **Aggiorna `src/components/common/LocationMap.tsx`**:
   - Trova la riga 35 circa:
     ```typescript
     const googleMapsEmbedUrl = `https://www.google.com/maps?q=...`;
     ```
   - Sostituisci con l'URL embed ufficiale copiato

### Opzione 2: Estrai Coordinate dal Link

Se vuoi aggiornare anche le coordinate in `site.ts`:

1. Apri: https://maps.app.goo.gl/cF5jbGk4A8smeEWv7
2. Clicca destro sulla posizione esatta del residence
3. Seleziona "Cosa c'è qui?"
4. Le coordinate appariranno (formato: `38.XXXX, 17.XXXX`)
5. Aggiorna `src/config/site.ts` con le coordinate corrette

## 📝 File Modificati

- ✅ `src/components/common/LocationMap.tsx` - Link aggiornato

## ✅ Test

Dopo aver ottenuto l'URL embed ufficiale:

1. Aggiorna `LocationMap.tsx` con l'URL embed
2. Riavvia: `npm run dev`
3. Visita `/it/contatti` e verifica che la mappa mostri la posizione corretta

---

**Data aggiornamento**: 2025-02-04  
**Link precedente**: https://maps.app.goo.gl/kCkqLkJk4kvJF8W77  
**Link nuovo**: https://maps.app.goo.gl/cF5jbGk4A8smeEWv7
