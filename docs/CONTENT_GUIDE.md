# 📖 Guida alla Gestione Contenuti
## Residence Le Farfalle

Questa guida spiega come modificare e aggiungere contenuti al sito senza dover modificare il codice.

---

## 📸 Come Cambiare le Foto dello Slider Hero

### Posizione File
Le foto dello slider sono definite in: `src/data/lefarfalle/photos.ts`

### Procedura
1. Apri il file `src/data/lefarfalle/photos.ts`
2. Modifica l'array `heroPhotos`:
   ```typescript
   export const heroPhotos: HeroPhoto[] = [
     {
       src: "/images/rooms/camera-generale.webp", // Path relativo da /public
       alt: "Descrizione immagine",
       priority: true, // Solo per la prima immagine
     },
     // Aggiungi altre foto...
   ];
   ```
3. Assicurati che le immagini siano in formato WebP e salvate in `/public/images/rooms/`
4. La prima immagine deve avere `priority: true` per ottimizzare il LCP

### Note
- Formato consigliato: WebP (ottimizzato)
- Dimensioni: max 1920px larghezza
- La prima immagine viene caricata con priority per performance

---

## 🗺️ Come Aggiungere Item Territorio

### Posizione File
I contenuti territorio sono in: `src/data/territorio/items.ts`

### Procedura
1. Apri il file `src/data/territorio/items.ts`
2. Aggiungi un nuovo oggetto all'array `territorioItems`:
   ```typescript
   {
     slug: "nome-univoco",
     title: "Titolo Attrazione",
     excerpt: "Breve descrizione (2 righe max)",
     image: "/images/territory/nome-file.webp",
     sourceUrl: "https://...", // URL sorgente immagine
     license: "CC BY-SA 4.0", // Licenza immagine
     author: "Nome Autore",
     category: "beach" | "history" | "nature" | "culture" | "activity",
     distance: "X km", // Opzionale
     time: "X min", // Opzionale
   }
   ```
3. **IMPORTANTE**: Prima di aggiungere l'immagine:
   - Scarica immagine con licenza riutilizzabile (CC0, CC BY, CC BY-SA)
   - Salva in `/public/images/territory/` come WebP
   - Aggiorna `ATTRIBUTIONS.md` con:
     - Nome file
     - URL sorgente
     - Autore
     - Licenza
     - Data accesso

### Fonti Consigliate per Immagini
- **Wikimedia Commons**: https://commons.wikimedia.org/
  - Filtra per "commercial use allowed" e "modify allowed"
- **Openverse**: https://openverse.org/
  - Cerca e filtra per licenze permissive
- **Unsplash** (se CC0): https://unsplash.com/
- **Pexels** (se CC0): https://www.pexels.com/

### ⚠️ ATTENZIONE Copyright
- **NON** usare immagini da Google Images senza licenza chiara
- **NON** usare immagini da blog/siti senza permesso
- **SEMPRE** verificare la licenza prima di usare un'immagine
- **SEMPRE** aggiornare `ATTRIBUTIONS.md`

---

## ⭐ Come Aggiungere Recensioni

### Posizione File
Le recensioni sono in: `src/data/reviews/reviews.json`

### Procedura
1. Apri il file `src/data/reviews/reviews.json`
2. Aggiungi un nuovo oggetto all'array:
   ```json
   {
     "id": "unique-id",
     "source": "Booking",
     "authorName": "Nome",
     "authorCountry": "Italia",
     "rating": 5,
     "date": "2024-01-15",
     "text": "Testo recensione...",
     "lang": "it",
     "sourceUrl": "https://..."
   }
   ```
   Per Booking.com usare `source: "Booking"` (verrà mostrato come "Fonte: Booking.com").

### ⚠️ REGOLE IMPORTANTI
- **NON inventare recensioni**: Usa solo recensioni reali
- **NON scrivere "verificato"**: Non usare questo termine
- **NON copiare da Booking senza permesso**: Verifica i termini di servizio
- **Placeholder**: Se usi placeholder, marca con `"isPlaceholder": true` e label "Esempio (da sostituire)"

### Come Ottenere Recensioni
1. **Da Booking.com**: Esporta o copia manualmente (verifica ToS)
2. **Da Google**: Copia manualmente dalla pagina Google My Business
3. **Dirette**: Chiedi ai clienti di lasciare recensioni

### Formato Data
Usa formato ISO: `YYYY-MM-DD` (es: "2024-01-15")

### Rimuovere Placeholder
Quando aggiungi recensioni reali, rimuovi i placeholder dal file JSON.

---

## 🗺️ Come Modificare la Mappa

### Posizione
La mappa è nel componente: `src/components/common/LocationMap.tsx`

### Link Google Maps
Il link è hardcoded nel componente:
```typescript
const googleMapsLink = "https://maps.app.goo.gl/kCkqLkJk4kvJF8W77";
```

### Coordinate
Le coordinate sono in: `src/config/site.ts`
```typescript
coordinates: {
  lat: 38.9547,
  lng: 17.1242,
}
```

### Per Cambiare Posizione
1. Aggiorna coordinate in `src/config/site.ts`
2. Aggiorna `googleMapsLink` in `LocationMap.tsx` con nuovo link Google Maps

---

## 📝 Checklist Prima di Pubblicare

### Immagini Territorio
- [ ] Tutte le immagini hanno attribuzione in `ATTRIBUTIONS.md`
- [ ] Licenze verificate (CC0, CC BY, CC BY-SA)
- [ ] Immagini salvate in `/public/images/territory/` come WebP

### Recensioni
- [ ] Nessun placeholder in produzione
- [ ] Tutte le recensioni sono reali
- [ ] Nessuna claim "verificato"
- [ ] Date in formato corretto (YYYY-MM-DD)

### Contatti
- [ ] Numero telefono reale in `src/config/site.ts`
- [ ] Email reale
- [ ] WhatsApp reale (se disponibile)

### SEO
- [ ] Meta title e description aggiornati
- [ ] OpenGraph image presente
- [ ] Structured data corretti

---

## 🆘 Domande Frequenti

### Q: Posso usare immagini da Instagram?
**A**: Solo se hai il permesso esplicito del proprietario. Non assumere che le immagini su Instagram siano libere da copyright.

### Q: Come esporto recensioni da Booking?
**A**: Booking.com non fornisce export diretto. Devi copiare manualmente (verifica i ToS di Booking prima).

### Q: Le recensioni placeholder sono visibili?
**A**: Sì, ma hanno un badge giallo "Esempio (da sostituire)". Rimuovile prima di pubblicare.

### Q: Come ottimizzare le immagini?
**A**: Usa lo script `npm run optimize-images` o converti manualmente in WebP con tool come Squoosh.

---

**Ultimo aggiornamento**: 2025-02-04
