/**
 * Foto della struttura Residence Le Farfalle
 * Usate per lo slideshow Hero nella homepage
 */

export interface HeroPhoto {
  src: string;
  alt: string;
  priority?: boolean; // Solo per la prima immagine (LCP)
}

export const heroPhotos: HeroPhoto[] = [
  {
    src: "/images/rooms/le-farfalle-matrimoniale-03.png",
    alt: "Camera matrimoniale moderna con testiera colorata e decorazioni farfalle — Residence Le Farfalle",
    priority: true,
  },
  {
    src: "/images/rooms/le-farfalle-matrimoniale-01.png",
    alt: "Camera luminosa con letto matrimoniale e dettagli farfalle — Residence Le Farfalle",
  },
  {
    src: "/images/rooms/le-farfalle-bagno.png",
    alt: "Bagno privato moderno — Residence Le Farfalle",
  },
  {
    src: "/images/rooms/camera-generale.webp",
    alt: "Residence Le Farfalle - Vista generale delle camere",
  },
  {
    src: "/images/rooms/camera-2-interno.webp",
    alt: "Camera confortevole con arredi moderni",
  },
  {
    src: "/images/rooms/camera-3-interno.webp",
    alt: "Camera spaziosa e accogliente",
  },
  {
    src: "/images/rooms/camera-4-interno.webp",
    alt: "Camera elegante con vista",
  },
  {
    src: "/images/rooms/dettagli-interni.webp",
    alt: "Dettagli interni del residence",
  },
  {
    src: "/images/rooms/camera-2-letto.webp",
    alt: "Camera con letto matrimoniale",
  },
];
