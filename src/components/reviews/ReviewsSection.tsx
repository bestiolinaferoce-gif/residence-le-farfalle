"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import { realReviews, getReviewStats } from "@/src/data/reviews/reviews";
import { siteConfig } from "@/src/config/site";

const SOURCE_LABELS: Record<string, string> = {
  Booking: "Booking.com",
  Google: "Google",
  Diretta: "Diretta",
};

function formatDate(dateStr: string, locale: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale === "it" ? "it-IT" : locale === "de" ? "de-DE" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

interface ReviewsSectionProps {
  locale?: string;
  maxItems?: number;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ locale = "it", maxItems = 6 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredReviews = useMemo(
    () => realReviews.filter((r) => r.lang === locale).slice(0, maxItems),
    [locale, maxItems]
  );

  const stats = getReviewStats();

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? Math.max(0, filteredReviews.length - 3) : prev - 3
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev >= filteredReviews.length - 3 ? 0 : prev + 3
    );
  };

  if (filteredReviews.length === 0) return null;

  const displayReviews =
    filteredReviews.length <= 3
      ? filteredReviews
      : filteredReviews.slice(currentIndex, currentIndex + 3);
  const showNavigation = filteredReviews.length > 3;

  return (
    <section
      className="py-20 bg-white"
      aria-labelledby="reviews-heading"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            id="reviews-heading"
            className="font-display text-display-sm md:text-display-md mb-4 text-neutral-900"
          >
            Cosa Dicono i Nostri Ospiti
          </h2>
          {stats && (
            <div className="flex items-center justify-center gap-2 mb-4" aria-hidden="true">
              <div className="flex items-center gap-1" role="img" aria-label={`Valutazione: ${stats.average} su 5 stelle`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 shrink-0 ${
                      i <= Math.round(stats.average)
                        ? "fill-amber-400 text-amber-400"
                        : "text-neutral-300"
                    }`}
                    aria-hidden
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-neutral-900">
                {stats.average}
              </span>
              <span className="text-neutral-500">({stats.count} recensioni)</span>
            </div>
          )}
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Le opinioni dei nostri ospiti sono importanti per noi
          </p>
        </motion.div>

        <div className="relative" role="region" aria-label="Recensioni clienti">
          <div className="overflow-hidden">
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[280px]"
              style={{ contentVisibility: "auto" }}
            >
              <AnimatePresence mode="wait">
                {displayReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex"
                  >
                    <Card className="h-full flex flex-col flex-1 min-h-[260px]">
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="flex items-center gap-1"
                          role="img"
                          aria-label={`${review.rating} stelle su 5`}
                        >
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 shrink-0 ${
                                i <= review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-neutral-300"
                              }`}
                              aria-hidden
                            />
                          ))}
                        </div>
                        <time
                          dateTime={review.date}
                          className="text-xs text-neutral-500"
                        >
                          {formatDate(review.date, locale)}
                        </time>
                      </div>
                      <blockquote className="mb-4 flex-1">
                        <p className="text-neutral-700 text-base leading-relaxed">
                          &ldquo;{review.text}&rdquo;
                        </p>
                      </blockquote>
                      <footer className="pt-4 border-t border-neutral-200 flex items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-neutral-900">
                            {review.authorName}
                            {review.authorCountry && (
                              <span className="font-normal text-neutral-600">
                                {" "}({review.authorCountry})
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            Fonte: {SOURCE_LABELS[review.source] ?? review.source}
                          </p>
                        </div>
                        {review.sourceUrl && (
                          <a
                            href={review.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 p-2 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            aria-label={`Vedi recensione su ${SOURCE_LABELS[review.source] ?? review.source}`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </footer>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {showNavigation && (
            <div
              className="flex items-center justify-center gap-4 mt-8"
              role="group"
              aria-label="Navigazione recensioni"
            >
              <button
                onClick={goToPrevious}
                className="p-3 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Recensione precedente"
                type="button"
              >
                <ChevronLeft className="h-5 w-5 text-neutral-700" aria-hidden />
              </button>
              <div className="flex gap-2" role="tablist">
                {Array.from({ length: Math.ceil(filteredReviews.length / 3) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i * 3)}
                    className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      Math.floor(currentIndex / 3) === i ? "w-8 bg-primary-600" : "w-2 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                    aria-label={`Recensione ${i + 1} di ${filteredReviews.length}`}
                    aria-selected={Math.floor(currentIndex / 3) === i}
                    role="tab"
                    type="button"
                  />
                ))}
              </div>
              <button
                onClick={goToNext}
                className="p-3 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Recensione successiva"
                type="button"
              >
                <ChevronRight className="h-5 w-5 text-neutral-700" aria-hidden />
              </button>
            </div>
          )}
        </div>

        {stats && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LodgingBusiness",
                "@id": `${siteConfig.url}/#reviews`,
                name: siteConfig.name,
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: stats.average,
                  reviewCount: stats.count,
                  bestRating: 5,
                  worstRating: 1,
                },
                review: filteredReviews.map((r) => ({
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: r.authorCountry ? `${r.authorName} (${r.authorCountry})` : r.authorName,
                  },
                  datePublished: r.date,
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: r.rating,
                    bestRating: 5,
                    worstRating: 1,
                  },
                  reviewBody: r.text,
                  publisher: {
                    "@type": "Organization",
                    name: "Booking.com",
                  },
                })),
              }),
            }}
          />
        )}
      </Container>
    </section>
  );
};

export default ReviewsSection;
