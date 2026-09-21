import React from "react";
import { Star, ExternalLink } from "lucide-react";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import { realReviews, type Review } from "@/src/data/reviews/reviews";
import { siteConfig } from "@/src/config/site";
import { intlLocale, toLocale, type Locale } from "@/src/lib/i18n";

const copy = {
  it: {
    heading: "Cosa dicono gli ospiti",
    score: "su Booking.com",
    reviewsCount: (n: number) => `${n} recensioni verificate`,
    checked: (d: string) => `Punteggio rilevato il ${d}.`,
    selection: "Qui sotto una selezione di recensioni pubblicate su Booking.com e Google, riportate senza modifiche.",
    readAll: "Leggi tutte le recensioni su Booking.com",
    original: "Recensione originale",
    source: "Apri la fonte",
    outOf: (v: string, max: number) => `Voto ${v} su ${max}`,
  },
  en: {
    heading: "What our guests say",
    score: "on Booking.com",
    reviewsCount: (n: number) => `${n} verified reviews`,
    checked: (d: string) => `Score checked on ${d}.`,
    selection: "Below is a selection of reviews published on Booking.com and Google, quoted without edits.",
    readAll: "Read all reviews on Booking.com",
    original: "Original review",
    source: "Open the source",
    outOf: (v: string, max: number) => `Rated ${v} out of ${max}`,
  },
  de: {
    heading: "Das sagen unsere Gäste",
    score: "auf Booking.com",
    reviewsCount: (n: number) => `${n} verifizierte Bewertungen`,
    checked: (d: string) => `Stand der Bewertung: ${d}.`,
    selection: "Unten eine Auswahl von Bewertungen auf Booking.com und Google, unverändert wiedergegeben.",
    readAll: "Alle Bewertungen auf Booking.com lesen",
    original: "Originalbewertung",
    source: "Quelle öffnen",
    outOf: (v: string, max: number) => `Bewertung ${v} von ${max}`,
  },
} as const;

const langName: Record<Locale, Record<string, string>> = {
  it: { it: "italiano", en: "inglese", de: "tedesco", fr: "francese" },
  en: { it: "Italian", en: "English", de: "German", fr: "French" },
  de: { it: "Italienisch", en: "Englisch", de: "Deutsch", fr: "Französisch" },
};

function formatDate(iso: string, locale: Locale) {
  // timeZone UTC: la stessa stringa sul server e nel browser.
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(intlLocale[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

interface ReviewsSectionProps {
  locale?: string;
  maxItems?: number;
}

/**
 * Server component: una sola lista nel DOM (scorrimento orizzontale su mobile,
 * griglia su desktop). Prima esistevano due copie, carosello mobile e griglia
 * desktop, e ogni recensione compariva due volte nell'HTML.
 */
export default function ReviewsSection({ locale: rawLocale = "it", maxItems = 6 }: ReviewsSectionProps) {
  const locale = toLocale(rawLocale);
  const c = copy[locale];
  const { score, scale, reviewCount, checkedAt } = siteConfig.bookingScore;
  const scoreLabel = score.toLocaleString(intlLocale[locale], { minimumFractionDigits: 1 });

  // Prima le recensioni nella lingua della pagina, poi le altre (senza duplicati), più recenti prima.
  const byDate = [...realReviews].sort((a, b) => b.date.localeCompare(a.date));
  const list = [...byDate.filter((r) => r.lang === locale), ...byDate.filter((r) => r.lang !== locale)].slice(
    0,
    maxItems
  );

  return (
    <section className="bg-white py-16 md:py-20" aria-labelledby="reviews-heading">
      <Container>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 id="reviews-heading" className="font-display text-3xl font-bold text-stone-900 md:text-4xl">
            {c.heading}
          </h2>
          <p className="mt-4 text-3xl font-bold text-stone-900">
            {scoreLabel}
            <span className="text-stone-600">/{scale}</span>{" "}
            <span className="text-lg font-semibold text-stone-700">{c.score}</span>
          </p>
          <p className="mt-1 text-sm text-stone-700">
            {c.reviewsCount(reviewCount)} · {c.checked(formatDate(checkedAt, locale))}
          </p>
          <p className="mt-3 text-sm text-stone-600">{c.selection}</p>
          <a
            href={siteConfig.booking.booking_com}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 underline underline-offset-4"
          >
            {c.readAll}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>

        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
          {list.map((review) => (
            <li key={review.id} className="w-[85%] max-w-sm shrink-0 snap-start md:w-auto md:max-w-none">
              <ReviewCard review={review} locale={locale} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ReviewCard({ review, locale }: { review: Review; locale: Locale }) {
  const c = copy[locale];
  const max = review.source === "Google" ? 5 : 10;
  const stars = review.source === "Google" ? review.rating : review.rating / 2;
  const ratingLabel = review.rating.toLocaleString(intlLocale[locale]);

  return (
    <Card className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="flex items-center gap-1" role="img" aria-label={c.outOf(ratingLabel, max)}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Star
              key={i}
              aria-hidden
              className={i < Math.round(stars) ? "h-4 w-4 fill-amber-500 text-amber-500" : "h-4 w-4 text-stone-300"}
            />
          ))}
        </span>
        <time dateTime={review.date} className="text-xs text-stone-600">
          {formatDate(review.date, locale)}
        </time>
      </div>
      <blockquote className="flex-1" lang={review.lang}>
        <p className="text-base leading-relaxed text-stone-800">&ldquo;{review.text}&rdquo;</p>
      </blockquote>
      {review.lang !== locale ? (
        <p className="mt-2 text-xs text-stone-600">
          {c.original} ({langName[locale][review.lang] ?? review.lang})
        </p>
      ) : null}
      <footer className="mt-4 flex items-center justify-between gap-3 border-t border-stone-200 pt-4">
        <div>
          <p className="text-sm font-semibold text-stone-900">
            {review.authorName}
            {review.authorCountry ? <span className="font-normal text-stone-600"> ({review.authorCountry})</span> : null}
          </p>
          <p className="mt-0.5 text-xs font-semibold text-stone-700">
            {review.source} · {ratingLabel}/{max}
          </p>
        </div>
        {review.sourceUrl ? (
          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-stone-700 hover:bg-stone-100"
            aria-label={c.source}
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        ) : null}
      </footer>
    </Card>
  );
}
