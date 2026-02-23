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
    src: "/images/rooms/camera-generale.webp",
    alt: "Residence Le Farfalle - Vista generale delle camere",
    priority: true, // Prima immagine per LCP
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
