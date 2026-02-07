# Sezione Camere - Guida

**Branch**: feature/rooms-modern

---

## Struttura dati

Le camere sono definite in `src/data/rooms/rooms.ts`:

```typescript
export interface Room {
  id: number;
  name: { it: string; en: string; de: string };
  capacity: number;
  beds: number;           // numero camere da letto (1 = monolocale)
  size: number;
  amenities: string[];
  images: string[];
  priceFrom: number;
}
```

### Campi
| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | number | Identificativo univoco |
| `name` | object | Nome multilingua (it, en, de) |
| `capacity` | number | Numero massimo ospiti |
| `beds` | number | Numero camere da letto |
| `size` | number | Metri quadri |
| `amenities` | string[] | Chiavi: `private-bathroom`, `tv`, `ac`, `wifi`, `blackout` |
| `images` | string[] | Nomi file in `/public/images/rooms/` |
| `priceFrom` | number | Prezzo da (€/notte) |

---

## Come modificare

### Testi e prezzi
Apri `src/data/rooms/rooms.ts` e modifica l’array `rooms`.

### Foto
1. Inserisci i file in `/public/images/rooms/`
2. Usa nomi file in `images` (es. `camera-2-letto.webp`)
3. Formato consigliato: WebP

### Etichette amenity
Le etichette multilingua sono in `amenityLabels` nello stesso file.

---

## Componenti

| File | Ruolo |
|------|-------|
| `src/components/rooms/RoomsSection.tsx` | Sezione con filtri e griglia |
| `src/components/rooms/RoomCard.tsx` | Card singola camera |
| `src/components/sections/RoomsPreview.tsx` | Anteprima in homepage |

---

## Filtri

- **Capienza**: Tutte | 2 posti | 3-4 posti
- **Camere**: Tutte | 1 camera

I filtri si applicano in tempo reale sulla griglia.

---

## Cosa testare

- [ ] `/it/camere` carica correttamente
- [ ] Filtri capienza e camere funzionano
- [ ] Hover sulla card cambia immagine (se presenti ≥2 immagini)
- [ ] Link "Vedi dettagli" porta a `/prenota?camera=X`
- [ ] Link WhatsApp "Richiedi preventivo" apre chat (se numero valido)
- [ ] Layout mobile: 1 colonna, filtri in colonna
- [ ] Layout desktop: 4 colonne
- [ ] `npm run build` va a buon fine
- [ ] Nessun errore in console
