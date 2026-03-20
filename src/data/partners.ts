/**
 * Partner e servizi utili - Residence Le Farfalle
 * Modificabile facilmente per aggiornare contatti e categorie
 */

export type PartnerCategory =
  | "farmacie"
  | "guardie-mediche"
  | "supermarket"
  | "ristoranti"
  | "transfer"
  | "noleggio"
  | "escursioni";

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  description: string;
  phone?: string;
  link?: string;
  address?: string;
  comingSoon?: boolean;
}

export const partnerCategories: Record<
  PartnerCategory,
  { it: string; icon: string }
> = {
  farmacie: { it: "Farmacie", icon: "pill" },
  "guardie-mediche": { it: "Guardie mediche / Numeri utili", icon: "phone" },
  supermarket: { it: "Supermarket / Alimentari", icon: "shopping-cart" },
  ristoranti: { it: "Ristoranti consigliati", icon: "utensils" },
  transfer: { it: "Transfer / NCC / Taxi", icon: "car" },
  noleggio: { it: "Noleggio", icon: "bike" },
  escursioni: { it: "Escursioni / Diving / Boat", icon: "compass" },
};

export const partners: Partner[] = [
  {
    id: "farmacia-1",
    name: "Farmacie di zona",
    category: "farmacie",
    description:
      "Elenco farmacie e turno: verificare in loco o sui canali del Comune / ASL. La struttura non pubblica numeri di terzi non verificati.",
    address: "Isola di Capo Rizzuto - Centro",
  },
  {
    id: "guardia-medica",
    name: "Guardia medica",
    category: "guardie-mediche",
    description: "Servizio guardie mediche territoriale",
    phone: "118",
  },
  {
    id: "carabinieri",
    name: "Carabinieri",
    category: "guardie-mediche",
    description: "Stazione Carabinieri Isola di Capo Rizzuto",
    phone: "+39 0962 799010",
  },
  {
    id: "supermarket-1",
    name: "Supermercato",
    category: "supermarket",
    description: "Supermercato a pochi minuti a piedi",
    address: "Isola di Capo Rizzuto - Centro",
  },
  {
    id: "ristorante-1",
    name: "Coming soon",
    category: "ristoranti",
    description: "Ristoranti consigliati in arrivo",
    comingSoon: true,
  },
  {
    id: "transfer-1",
    name: "Transfer aeroporto",
    category: "transfer",
    description:
      "Servizio NCC / taxi su prenotazione (es. Lamezia Terme, Crotone). Contattare la struttura per referenze aggiornate.",
    comingSoon: true,
  },
  {
    id: "noleggio-1",
    name: "Noleggio bici / scooter",
    category: "noleggio",
    description: "Noleggio mezzi su richiesta",
    comingSoon: true,
  },
  {
    id: "escursioni-1",
    name: "Boat tour Area Marina",
    category: "escursioni",
    description: "Gite in barca, snorkeling, escursioni guidate",
    comingSoon: true,
  },
];
