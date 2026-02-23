/**
 * Type definitions per il progetto
 */

export interface Room {
  id: string;
  name: string;
  description: string;
  images: string[];
  capacity: number;
  features: string[];
  pricePerNight: number;
}

export interface ImageMetadata {
  original: string;
  webp: string;
  thumbnail: string;
  medium: string;
  width: number;
  height: number;
  size: number;
  alt: string;
  category: "rooms" | "services" | "territory" | "logo";
}

export interface Booking {
  checkIn: Date;
  checkOut: Date;
  roomId: string;
  guests: number;
  guestInfo: {
    name: string;
    email: string;
    phone: string;
  };
}
