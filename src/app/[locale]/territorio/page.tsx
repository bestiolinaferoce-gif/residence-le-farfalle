import React from "react";
import Image from "next/image";
import { MapPin, Clock, Waves, Umbrella, Camera, Compass } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import TerritorioHero from "@/src/components/territorio/TerritorioHero";
import TerritorioTabs from "@/src/components/territorio/TerritorioTabs";
import Newsletter from "@/src/components/sections/Newsletter";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import { pageAlternates } from "@/src/lib/seo";
import { getPageMetadata } from "@/src/lib/page-metadata";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale || "it";
  const m = getPageMetadata("territorio", currentLocale);
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: pageAlternates(currentLocale, "territorio"),
  };
}

interface Attraction {
  name: string;
  distance: string;
  time: string;
  description: string;
  category: "beach" | "history" | "nature" | "culture";
  image: string;
  /** Testo alternativo descrittivo per SEO e accessibilità */
  imageAlt: string;
}

/** Immagini reali del territorio (import da Desktop/foto-territorio → public/images/territorio) */
const attractions: Attraction[] = [
  {
    name: "Area Marina Protetta Capo Rizzuto",
    distance: "2 km",
    time: "5 min",
    description:
      "Una delle più grandi e belle riserve marine d'Italia. Le acque cristalline e i fondali ricchi di vita marina rendono questo luogo un paradiso per snorkeling e immersioni. Consigliamo di visitarla al mattino presto per godere della calma e della trasparenza dell'acqua.",
    category: "nature",
    image: "/images/territorio/area-marina-protetta.jpg",
    imageAlt: "Area Marina Protetta di Capo Rizzuto, mare turchese e costa — vicino al Residence Le Farfalle",
  },
  {
    name: "Spiagge Le Castella",
    distance: "8 km",
    time: "15 min",
    description:
      "Spiagge dorate e mare turchese con il caratteristico isolotto e il castello aragonese che si specchia nelle acque. Una delle più belle spiagge della Calabria, perfetta per famiglie. Il borgo offre anche ottimi ristoranti di pesce fresco.",
    category: "beach",
    image: "/images/territorio/spiaggia-capopiccolo.jpg",
    imageAlt: "Spiaggia e mare vicino a Le Castella e Capo Rizzuto — Calabria ionica",
  },
  {
    name: "Crotone centro storico",
    distance: "12 km",
    time: "20 min",
    description:
      "Città antica con storia millenaria, dal periodo magno-greco ai giorni nostri. Il Museo Archeologico Nazionale custodisce reperti unici. Passeggiare per le vie del centro è un viaggio nel tempo. Consigliamo una visita al pomeriggio, quando il caldo si attenua.",
    category: "history",
    image: "/images/territorio/spiaggia-grande-capo-rizzuto.jpg",
    imageAlt: "Costa ionica in provincia di Crotone — mare vicino a Crotone e Isola di Capo Rizzuto",
  },
  {
    name: "Parco archeologico Capo Colonna",
    distance: "15 km",
    time: "25 min",
    description:
      "Sito archeologico con il tempio di Hera Lacinia, uno dei più importanti santuari della Magna Grecia. La colonna superstite si staglia contro il cielo con una vista mozzafiato sul mare. Il tramonto qui è spettacolare. Ideale per una mezza giornata.",
    category: "history",
    image: "/images/territorio/tramonto-area-marina.jpg",
    imageAlt: "Tramonto sul mare in Area Marina Protetta Capo Rizzuto — atmosfera vicina a Capo Colonna",
  },
  {
    name: "Spiaggia di Soverato",
    distance: "45 km",
    time: "50 min",
    description:
      "Chiamata la 'Perla dello Ionio', Soverato offre una delle spiagge più lunghe e attrezzate della Calabria. Sabbia fine, mare pulito e servizi completi. Perfetta per chi cerca relax e comodità. Il lungomare è ideale per passeggiate serali.",
    category: "beach",
    image: "/images/territorio/spiagge-rosse.jpg",
    imageAlt: "Spiagge rosse e scogliera sulla costa ionica calabrese — giornata mare verso Soverato",
  },
  {
    name: "Sila e Parco Nazionale",
    distance: "60 km",
    time: "1h 15min",
    description:
      "Il grande altopiano della Sila con foreste secolari, laghi cristallini e sentieri naturalistici. Perfetto per escursioni e trekking. In estate offre frescura e panorami mozzafiato. Consigliamo una giornata intera per esplorare i laghi e i borghi montani.",
    category: "nature",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80",
    imageAlt: "Foresta e sentiero — escursione in montagna (Sila, Calabria)",
  },
  {
    name: "Le Castella - Borgo marinaro",
    distance: "8 km",
    time: "15 min",
    description:
      "Pittoresco borgo di pescatori con ristoranti tipici che servono pesce appena pescato, bar caratteristici e negozi di artigianato locale. L'atmosfera autentica e la tradizione culinaria rendono questo luogo imperdibile. Ideale per cena al tramonto.",
    category: "culture",
    image: "/images/territorio/le-castella-castello.jpg",
    imageAlt: "Castello Aragonese di Le Castella visto dal mare — Isola di Capo Rizzuto",
  },
  {
    name: "Riserva Naturale Valli Cupe",
    distance: "70 km",
    time: "1h 20min",
    description:
      "Canyon spettacolari, cascate nascoste e sentieri nella natura incontaminata. Un'esperienza unica per gli amanti del trekking e della fotografia. Le cascate sono più spettacolari in primavera. Consigliamo scarpe comode e almeno mezza giornata.",
    category: "nature",
    image: "/images/territorio/valli-cupe-4.jpg",
    imageAlt: "Riserva naturale Valli Cupe, canyon e vegetazione — escursione giornaliera dalla costa",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  beach: <Waves className="h-5 w-5" />,
  history: <Camera className="h-5 w-5" />,
  nature: <Compass className="h-5 w-5" />,
  culture: <Umbrella className="h-5 w-5" />,
};

interface TerritorioPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TerritorioPage({ params }: TerritorioPageProps) {
  const { locale } = await params;
  const currentLocale = locale || "it";

  return (
    <div className="min-h-screen pt-20">
      <TerritorioHero />

      {/* Blocchi strutturati con tab */}
      <TerritorioTabs />

      {/* Area Marina Protetta - perché è speciale */}
      <section className="py-20 bg-secondary-50">
        <Container>
          <h2 className="font-display text-3xl font-bold text-center mb-8 text-neutral-900">
            Area Marina Protetta: perché è speciale
          </h2>
          <p className="max-w-3xl mx-auto text-center text-neutral-600 leading-relaxed">
            Una delle più grandi riserve marine d&apos;Italia. Acque cristalline, fondali ricchi di vita,
            snorkeling e immersioni a pochi minuti. Un tesoro naturale da vivere e rispettare.
          </p>
        </Container>
      </section>

      {/* Location Map */}
      <section className="py-20 bg-white">
        <Container>
          <div className="mb-12">
            <h2 className="font-display text-3xl font-bold text-center mb-4 text-neutral-900">
              La Nostra Posizione
            </h2>
            <p className="text-center text-neutral-600 max-w-2xl mx-auto">
              {siteConfig.address}
            </p>
          </div>
          <div className="h-96 rounded-xl overflow-hidden shadow-medium">
            <iframe
              src={`https://maps.google.com/maps?q=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}&hl=it&z=14&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mappa Residence Le Farfalle - Isola di Capo Rizzuto"
              className="w-full h-full"
            />
          </div>
        </Container>
      </section>

      {/* Attractions Grid */}
      <section className="py-20 bg-neutral-50">
        <Container>
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-neutral-900">
            Attrazioni e Luoghi da Visitare
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((attraction) => (
              <Card key={attraction.name} hover className="h-full flex flex-col overflow-hidden group">
                {/* Immagine Territorio */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={attraction.image}
                    alt={attraction.imageAlt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg">
                    <span className="text-primary-600">
                      {categoryIcons[attraction.category] || <MapPin className="h-5 w-5" />}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg mb-2 text-neutral-900">
                    {attraction.name}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4 flex-1">{attraction.description}</p>
                  <div className="flex items-center gap-4 text-sm text-neutral-500 pt-4 border-t border-neutral-200">
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
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Mini-Itinerari */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-neutral-900">
            Itinerari Consigliati
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mezza Giornata */}
            <Card hover className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-neutral-900">Mezza Giornata</h3>
              </div>
              <p className="text-neutral-600 mb-4">
                <strong className="text-neutral-900">Mattina:</strong> Area Marina Protetta Capo Rizzuto per snorkeling (2 km, 5 min)
              </p>
              <p className="text-neutral-600 mb-4">
                <strong className="text-neutral-900">Pomeriggio:</strong> Le Castella - spiaggia e borgo marinaro (8 km, 15 min)
              </p>
              <p className="text-sm text-neutral-500">
                Ideale per chi vuole combinare mare e cultura senza stress
              </p>
            </Card>

            {/* 1 Giorno */}
            <Card hover className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-neutral-900">1 Giorno</h3>
              </div>
              <p className="text-neutral-600 mb-2">
                <strong className="text-neutral-900">Mattina:</strong> Parco Archeologico Capo Colonna (15 km, 25 min)
              </p>
              <p className="text-neutral-600 mb-2">
                <strong className="text-neutral-900">Pranzo:</strong> Ristorante tipico a Le Castella
              </p>
              <p className="text-neutral-600 mb-2">
                <strong className="text-neutral-900">Pomeriggio:</strong> Spiaggia Le Castella e borgo
              </p>
              <p className="text-neutral-600 mb-4">
                <strong className="text-neutral-900">Sera:</strong> Cena a Crotone centro storico (12 km, 20 min)
              </p>
              <p className="text-sm text-neutral-500">
                Perfetto per immergersi nella storia e nel mare calabrese
              </p>
            </Card>

            {/* 2 Giorni */}
            <Card hover className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-neutral-900">2 Giorni</h3>
              </div>
              <p className="text-neutral-600 mb-2">
                <strong className="text-neutral-900">Giorno 1:</strong> Area Marina Protetta, Le Castella, Crotone
              </p>
              <p className="text-neutral-600 mb-2">
                <strong className="text-neutral-900">Giorno 2:</strong> Sila e Parco Nazionale (60 km, 1h15min) - escursione giornaliera
              </p>
              <p className="text-neutral-600 mb-4">
                Oppure: Spiaggia di Soverato (45 km) + Riserva Valli Cupe (70 km)
              </p>
              <p className="text-sm text-neutral-500">
                L&apos;itinerario completo per scoprire mare, storia e montagna
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Esperienze Consigliate */}
      <section className="py-20 bg-neutral-50">
        <Container>
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-neutral-900">
            Esperienze da Non Perdere
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card hover className="p-6">
              <h3 className="font-semibold text-xl mb-3 text-neutral-900">🌅 Tramonto a Capo Colonna</h3>
              <p className="text-neutral-600 mb-2">
                Il momento più magico della giornata. La colonna del tempio di Hera si staglia contro il cielo colorato mentre il sole tramonta sul mare. Un&apos;esperienza indimenticabile.
              </p>
              <p className="text-sm text-neutral-500">Consigliato: estate, ore 19:00-20:30</p>
            </Card>
            <Card hover className="p-6">
              <h3 className="font-semibold text-xl mb-3 text-neutral-900">🐠 Snorkeling nell&apos;Area Marina</h3>
              <p className="text-neutral-600 mb-2">
                Le acque cristalline dell&apos;Area Marina Protetta sono perfette per osservare la vita sottomarina. Porta la maschera e scopri un mondo colorato a pochi metri dalla riva.
              </p>
              <p className="text-sm text-neutral-500">Consigliato: mattina presto, mare calmo</p>
            </Card>
            <Card hover className="p-6">
              <h3 className="font-semibold text-xl mb-3 text-neutral-900">🍝 Cena di Pesce a Le Castella</h3>
              <p className="text-neutral-600 mb-2">
                I ristoranti del borgo servono pesce pescato il giorno stesso. Pasta con le vongole, frittura di paranza, polpo alla griglia. La tradizione culinaria calabrese al suo meglio.
              </p>
              <p className="text-sm text-neutral-500">Consigliato: prenotazione serale, vista mare</p>
            </Card>
            <Card hover className="p-6">
              <h3 className="font-semibold text-xl mb-3 text-neutral-900">🏛️ Museo Archeologico di Crotone</h3>
              <p className="text-neutral-600 mb-2">
                Una collezione straordinaria di reperti magno-greci che racconta la storia di questa terra. Il diadema aureo e le statue sono capolavori assoluti. Imperdibile per gli appassionati di storia.
              </p>
              <p className="text-sm text-neutral-500">Consigliato: pomeriggio, 2-3 ore</p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Consigli Pratici */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-neutral-900">
            Consigli Pratici da Host Locali
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="font-semibold text-xl mb-4 text-neutral-900">⏰ Quando Andare</h3>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 font-bold">•</span>
                  <span><strong>Maggio-Giugno:</strong> Clima perfetto, meno affollato, mare già piacevole</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 font-bold">•</span>
                  <span><strong>Luglio-Agosto:</strong> Alta stagione, mare caldo, spiagge più affollate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 font-bold">•</span>
                  <span><strong>Settembre:</strong> Ottimo compromesso, clima mite, meno turisti</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 font-bold">•</span>
                  <span><strong>Ottobre:</strong> Perfetto per escursioni e cultura, mare ancora balneabile</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-4 text-neutral-900">🚗 Come Muoversi</h3>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 font-bold">•</span>
                  <span><strong>Auto:</strong> Essenziale per raggiungere le attrazioni. Parcheggio gratuito disponibile.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 font-bold">•</span>
                  <span><strong>Distanze brevi:</strong> Area Marina (2 km), Le Castella (8 km) - 5-15 minuti</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 font-bold">•</span>
                  <span><strong>Mezza giornata:</strong> Crotone (12 km), Capo Colonna (15 km) - 20-25 minuti</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 font-bold">•</span>
                  <span><strong>Giornata intera:</strong> Sila (60 km), Soverato (45 km) - 50 minuti - 1h15</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-4 text-neutral-900">💡 Suggerimenti Utili</h3>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 font-bold">•</span>
                  <span>Porta sempre crema solare e cappello - il sole calabrese è intenso</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 font-bold">•</span>
                  <span>Prenota i ristoranti a Le Castella in alta stagione</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 font-bold">•</span>
                  <span>Le spiagge migliori sono al mattino presto o tardo pomeriggio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 font-bold">•</span>
                  <span>Per la Sila, porta abbigliamento a strati - in montagna fa più fresco</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-4 text-neutral-900">📞 Assistenza</h3>
              <p className="text-neutral-700 mb-4">
                Siamo qui per aiutarti a organizzare la tua vacanza perfetta. Chiedici consigli su ristoranti, spiagge nascoste, orari migliori per le visite. La nostra conoscenza del territorio è a tua disposizione.
              </p>
              <p className="text-sm text-neutral-500">
                Contattaci via WhatsApp o email per consigli personalizzati durante il tuo soggiorno.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* About Isola di Capo Rizzuto */}
      <section className="py-20 bg-neutral-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-center mb-8 text-neutral-900">
              Isola di Capo Rizzuto: La Nostra Terra
            </h2>
            <div className="prose prose-lg max-w-none text-neutral-700 space-y-4">
              <p>
                Isola di Capo Rizzuto è una perla della Calabria ionica, situata nella provincia di Crotone. Il suo nome deriva dall&apos;omonimo promontorio che si protende nel mare Ionio, creando un paesaggio unico e suggestivo che abbiamo la fortuna di chiamare casa.
              </p>
              <p>
                La località è famosa per le sue spiagge dorate, il mare cristallino e l&apos;Area Marina Protetta di Capo Rizzuto, una delle più grandi e importanti d&apos;Italia. Le acque limpide e i fondali ricchi di vita marina rendono questa zona un paradiso per gli amanti dello snorkeling e delle immersioni. Viviamo qui da anni e ogni giorno scopriamo qualcosa di nuovo da condividere con i nostri ospiti.
              </p>
              <p>
                Oltre al mare, il territorio offre anche interessanti siti storici e archeologici, come il Parco Archeologico di Capo Colonna con il tempio di Hera Lacinia, e la possibilità di esplorare l&apos;entroterra calabrese con i suoi borghi caratteristici e le tradizioni culinarie che fanno parte della nostra identità.
              </p>
              <p>
                Il clima mediterraneo, con estati calde e inverni miti, rende Isola di Capo Rizzuto una meta ideale per le vacanze durante tutto l&apos;anno. La stagione estiva è magica, quando il mare raggiunge temperature perfette per il bagno, ma anche primavera e autunno offrono momenti indimenticabili con meno affollamento e clima perfetto per esplorare.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Newsletter variant="light" />
    </div>
  );
}
