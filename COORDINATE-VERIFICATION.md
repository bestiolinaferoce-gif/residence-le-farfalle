# 🔍 Verifica Coordinate Residence Le Farfalle

## Indirizzo
**Via Capo delle Colonne, 88841 Isola di Capo Rizzuto (KR)**

## Coordinate Attuali in `site.ts`
- **Latitudine**: 38.9547
- **Longitudine**: 17.1242

## Come Verificare le Coordinate Corrette

### Metodo 1: Google Maps (Consigliato)
1. Apri Google Maps: https://www.google.com/maps
2. Cerca: "Via Capo delle Colonne, Isola di Capo Rizzuto"
3. Clicca destro sulla posizione esatta del residence
4. Le coordinate appariranno nel formato: `38.XXXX, 17.XXXX`
5. Aggiorna `src/config/site.ts` con queste coordinate

### Metodo 2: Dal Link Fornito
1. Apri: https://maps.app.goo.gl/kCkqLkJk4kvJF8W77
2. Clicca su "Condividi" > "Incorpora mappa"
3. L'URL embed contiene le coordinate corrette
4. Oppure: nella barra degli indirizzi, dopo aver aperto il link, cerca le coordinate

### Metodo 3: Geocoding API (se disponibile)
Usa un servizio di geocoding per convertire l'indirizzo in coordinate:
- Google Geocoding API
- OpenStreetMap Nominatim (gratuito)

## Se le Coordinate sono Sbagliate

1. **Trova le coordinate corrette** usando uno dei metodi sopra
2. **Aggiorna `src/config/site.ts`**:
   ```typescript
   coordinates: {
     lat: 38.XXXX, // Sostituisci con coordinate corrette
     lng: 17.XXXX, // Sostituisci con coordinate corrette
   },
   ```
3. **Riavvia il dev server**: `npm run dev`
4. **Verifica**: Visita `/it/contatti` e controlla che la mappa mostri la posizione corretta

## Link Google Maps Fornito
https://maps.app.goo.gl/kCkqLkJk4kvJF8W77

**Questo link DEVE aprire la posizione corretta del residence.**
Se non corrisponde, verifica l'indirizzo o chiedi le coordinate esatte.

---

**Data verifica**: 2025-02-04  
**Status**: ⚠️ Da verificare manualmente
