"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";
import LocationMap from "@/src/components/common/LocationMap";
import Link from "next/link";

interface Attraction {
  name: string;
  distance: string;
  time: string;
  description: string;
}

const attractions: Attraction[] = [
  {
    name: "Area Marina Protetta Capo Rizzuto",
    distance: "2 km",
    time: "5 min",
    description: "Riserva marina con acque cristalline",
  },
  {
    name: "Spiagge Le Castella",
    distance: "8 km",
    time: "15 min",
    description: "Spiagge dorate e mare turchese",
  },
  {
    name: "Crotone centro storico",
    distance: "12 km",
    time: "20 min",
    description: "Città antica con storia millenaria",
  },
  {
    name: "Parco archeologico Capo Colonna",
    distance: "15 km",
    time: "25 min",
    description: "Tempio di Hera Lacinia",
  },
];

interface LocationProps {
  locale?: string;
}

const Location: React.FC<LocationProps> = ({ locale = "it" }) => {
  return (
    <section className="py-20 bg-neutral-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-display-sm md:text-display-md mb-4 text-neutral-900">
            Il Territorio
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Scopri le meraviglie della Calabria ionica
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Mappa */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <LocationMap showTitle={false} />
          </motion.div>

          {/* Attrazioni */}
          <div className="space-y-4">
            {attractions.map((attraction, index) => (
              <motion.div
                key={attraction.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-100 rounded-lg flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 text-neutral-900">
                        {attraction.name}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-2">
                        {attraction.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{attraction.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{attraction.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href={`/${locale}/territorio`}>
            <Button variant="primary" size="lg">
              Scopri il territorio
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default Location;
