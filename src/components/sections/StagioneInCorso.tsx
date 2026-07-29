"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sun, Waves, Leaf } from "lucide-react";
import { getReviewStats } from "@/src/data/reviews/reviews";
import { siteConfig } from "@/src/config/site";

/**
 * Stagione in corso — agosto, settembre, ottobre.
 *
 * Contenuti volutamente generici sul periodo (mare, affluenza, cosa si visita):
 * nessuna data di sagra o evento inventata, perché un evento sbagliato in pagina
 * fa più danno di una sezione assente. Il mese corrente viene evidenziato da solo.
 */

type Mese = {
  chiave: "agosto" | "settembre" | "ottobre";
  /** getMonth(): 7 = agosto */
  indice: number;
  titolo: string;
  occhiello: string;
  testo: string;
  punti: string[];
  icona: typeof Sun;
};

const MESI: Mese[] = [
  {
    chiave: "agosto",
    indice: 7,
    titolo: "Agosto",
    occhiello: "Alta stagione",
    testo:
      "Il mese più pieno: mare caldo, giornate lunghe e paese vivo fino a tardi. È anche il periodo in cui le camere si esauriscono prima, spesso con settimane di anticipo.",
    punti: [
      "Mare al suo massimo nell'Area Marina Protetta",
      "Colazione presto per guadagnare la spiaggia libera",
      "Conviene bloccare le date appena decise",
    ],
    icona: Sun,
  },
  {
    chiave: "settembre",
    indice: 8,
    titolo: "Settembre",
    occhiello: "Il mese che consigliamo",
    testo:
      "Il mare resta caldo perché lo Ionio si raffredda con lentezza, ma spiagge e strade si svuotano. Per molti ospiti è il compromesso migliore fra clima e tranquillità.",
    punti: [
      "Acqua ancora calda, molta meno gente",
      "Le Castella e Capo Colonna senza fila",
      "Giornate piene senza l'afa di agosto",
    ],
    icona: Waves,
  },
  {
    chiave: "ottobre",
    indice: 9,
    titolo: "Ottobre",
    occhiello: "Fuori stagione",
    testo:
      "Temperature miti e luce bassa: è il periodo giusto se venite per il territorio più che per la spiaggia, tra borghi, siti archeologici e natura dell'entroterra.",
    punti: [
      "Ideale per Santa Severina e le Valli Cupe",
      "Camminate e visite senza caldo",
      "Il centro paese torna ai suoi ritmi",
    ],
    icona: Leaf,
  },
];

interface StagioneInCorsoProps {
  locale?: string;
}

export default function StagioneInCorso({ locale = "it" }: StagioneInCorsoProps) {
  const meseOggi = new Date().getMonth();
  /**
   * Evidenzia il mese corrente se rientra nella stagione, altrimenti il primo
   * che deve ancora arrivare: fuori da agosto-ottobre nessuna scheda risulterebbe
   * attiva e la sezione perderebbe il suo riferimento temporale.
   */
  const meseEvidenziato =
    MESI.find((m) => m.indice === meseOggi)?.indice ??
    MESI.find((m) => m.indice > meseOggi)?.indice ??
    null;
  const stats = getReviewStats();

  return (
    <section className="py-20" aria-labelledby="stagione-titolo">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">
            Quando venire
          </p>
          <h2
            id="stagione-titolo"
            className="mt-3 font-display text-3xl font-bold text-neutral-900 md:text-4xl"
          >
            Agosto, settembre, ottobre
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">
            Tre mesi molto diversi tra loro. Ecco cosa aspettarsi, così scegliete il periodo
            che fa per voi invece di scoprirlo dopo.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {MESI.map((mese, i) => {
            const attuale = mese.indice === meseEvidenziato;
            const Icona = mese.icona;
            return (
              <motion.article
                key={mese.chiave}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`flex flex-col rounded-2xl border p-6 ${
                  attuale
                    ? "border-amber-400 bg-amber-50/60 shadow-lg shadow-amber-500/10"
                    : "border-neutral-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-amber-700">
                    <Icona className="h-4 w-4 shrink-0" aria-hidden />
                    {mese.occhiello}
                  </span>
                  {attuale && (
                    <span className="rounded-full bg-amber-500 px-2.5 py-1 text-xs font-bold text-white">
                      {mese.indice === meseOggi ? "In corso" : "Prossimo"}
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-display text-2xl font-bold text-neutral-900">
                  {mese.titolo}
                </h3>
                <p className="mt-3 leading-relaxed text-neutral-600">{mese.testo}</p>

                <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                  {mese.punti.map((punto) => (
                    <li key={punto} className="flex gap-2">
                      <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      {punto}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-neutral-900 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div>
            <p className="font-display text-xl font-bold text-white">
              Camere da € {siteConfig.pricing.fromEur},00 a notte, colazione inclusa
            </p>
            <p className="mt-1 text-neutral-300">
              {stats
                ? `${stats.average10}/10 su ${stats.count} recensioni tra Booking.com e Google · prenotando qui niente commissioni`
                : "Prenotando direttamente non paghi commissioni di intermediazione"}
            </p>
          </div>
          <Link
            href={`/${locale}/prenota`}
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-amber-400 px-6 py-3 font-semibold text-stone-900 transition hover:bg-amber-300"
          >
            Verifica le date
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
