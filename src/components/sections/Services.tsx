"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Coffee,
  Wifi,
  Wind,
  Tv,
  Droplet,
  Plane,
  MapPin,
  UtensilsCrossed,
} from "lucide-react";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <Coffee className="h-8 w-8 text-primary-500" />,
    title: "Colazione inclusa",
    description: "Colazione continentale servita ogni mattina",
  },
  {
    icon: <Wifi className="h-8 w-8 text-primary-500" />,
    title: "WiFi superfast",
    description: "Connessione internet ad alta velocità gratuita",
  },
  {
    icon: <Wind className="h-8 w-8 text-primary-500" />,
    title: "Aria condizionata",
    description: "Climatizzazione in tutte le camere",
  },
  {
    icon: <Tv className="h-8 w-8 text-primary-500" />,
    title: "TV LED",
    description: "Smart TV in ogni camera",
  },
  {
    icon: <Droplet className="h-8 w-8 text-primary-500" />,
    title: "Bagno privato",
    description: "Ogni camera ha il proprio bagno completo",
  },
  {
    icon: <Plane className="h-8 w-8 text-primary-500" />,
    title: "Transfer aeroporto",
    description: "Servizio transfer su richiesta",
  },
  {
    icon: <MapPin className="h-8 w-8 text-primary-500" />,
    title: "Tour organizzati",
    description: "Escursioni e visite guidate",
  },
  {
    icon: <UtensilsCrossed className="h-8 w-8 text-primary-500" />,
    title: "Convenzioni ristoranti",
    description: "Sconti nei migliori ristoranti locali",
  },
];

const Services: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-display-sm md:text-display-md mb-4 text-neutral-900">
            I Nostri Servizi
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Tutto ciò di cui hai bisogno per un soggiorno indimenticabile
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="text-center h-full">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="font-semibold text-lg mb-2 text-neutral-900">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-600">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Services;
