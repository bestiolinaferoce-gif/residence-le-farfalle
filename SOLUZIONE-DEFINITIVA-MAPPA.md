# 🗺️ SOLUZIONE DEFINITIVA: Mappa Posizione Corretta

## ⚠️ Problema
La mappa mostra una posizione sbagliata perché le coordinate in `site.ts` potrebbero non corrispondere all'indirizzo reale del residence.

## ✅ Soluzione Definitiva (3 Passi)

### PASSO 1: Ottieni l'URL Embed Ufficiale da Google Maps

1. **Apri il link fornito**:
   ```
   https://maps.app.goo.gl/kCkqLkJk4kvJF8W77
   ```

2. **Nella pagina Google Maps**:
   - Clicca sul pulsante **"Condividi"** (icona freccia in alto)
   - Seleziona la tab **"Incorpora mappa"**
   - Copia l'**URL iframe completo** (inizia con `https://www.google.com/maps/embed?pb=...`)

3. **Esempio di URL embed**:
   ```
   https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.123456789!2d17.123456!3d38.954789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDU3JzE2LjkiTiAxN8KwMDcnMjcuMSJF!5e0!3m2!1sit!2sit!4v1234567890123!5m2!1sit!2sit
   ```

### PASSO 2: Aggiorna il Componente LocationMap

1. Apri: `src/components/common/LocationMap.tsx`

2. Trova questa riga (circa riga 24):
   ```typescript
   const googleMapsEmbedUrl = `https://www.google.com/maps?q=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}&hl=it&z=15&output=embed`;
   ```

3. **Sostituisci con l'URL embed ufficiale** che hai copiato:
   ```typescript
   const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145..."; // Incolla qui l'URL completo
   ```

### PASSO 3: Verifica le Coordinate (Opzionale ma Consigliato)

Se vuoi anche aggiornare le coordinate in `site.ts` per coerenza:

1. **Dal link Google Maps**:
   - Apri il link: https://maps.app.goo.gl/kCkqLkJk4kvJF8W77
   - Clicca destro sulla posizione esatta del residence
   - Seleziona "Cosa c'è qui?"
   - Le coordinate appariranno nella barra degli indirizzi

2. **Oppure usa Google Maps Search**:
   - Cerca: "Via Capo delle Colonne, Isola di Capo Rizzuto"
   - Clicca destro sulla posizione > "Cosa c'è qui?"
   - Copia le coordinate (formato: `38.XXXX, 17.XXXX`)

3. **Aggiorna `src/config/site.ts`**:
   ```typescript
   coordinates: {
     lat: 38.XXXX, // Sostituisci con latitudine corretta
     lng: 17.XXXX, // Sostituisci con longitudine corretta
   },
   ```

---

## 🎯 Alternativa Rapida (Senza Modificare Codice)

Se non vuoi modificare il codice, puoi:

1. **Apri il link Google Maps fornito**: https://maps.app.goo.gl/kCkqLkJk4kvJF8W77
2. **Verifica che il link apra la posizione corretta**
3. Se il link è corretto, il problema è solo nelle coordinate usate per l'embed
4. Segui il **PASSO 2** sopra per usare l'URL embed ufficiale

---

## ✅ Test Finale

Dopo le modifiche:

1. **Riavvia il dev server**:
   ```bash
   npm run dev
   ```

2. **Visita le pagine con mappa**:
   - `/it/contatti` - Dovrebbe mostrare mappa corretta
   - `/it/territorio` - Dovrebbe mostrare mappa corretta

3. **Verifica**:
   - La mappa mostra la posizione corretta del residence
   - Il pulsante "Apri su Google Maps" apre la posizione corretta
   - Le coordinate corrispondono all'indirizzo

---

## 📝 File Modificati

- ✅ `src/components/common/LocationMap.tsx` - Usa Google Maps embed
- ✅ `src/app/[locale]/territorio/page.tsx` - Mappa aggiornata
- ✅ `src/components/sections/Location.tsx` - Già corretto

---

## 🔍 Se il Problema Persiste

1. **Verifica l'indirizzo**: È corretto "Via Capo delle Colonne, 88841 Isola di Capo Rizzuto (KR)"?
2. **Verifica il link Google Maps**: Apre la posizione corretta?
3. **Controlla la console del browser**: Ci sono errori JavaScript?
4. **Prova in modalità incognito**: Per escludere problemi di cache

---

**Ultimo aggiornamento**: 2025-02-04  
**Status**: ⚠️ Richiede URL embed ufficiale da Google Maps
