"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import { realReviews, getReviewStats, type Review } from "@/src/data/reviews/reviews";

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

function ratingToStars(source: string, rating: number) {
  if (source === "Google") return { value: 5, label: "5★" };
  const v = Math.max(0, Math.min(5, rating / 2));
  return { value: v, label: `${v}★` };
}

function StarRow({ value }: { value: number }) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const isFull = i < full;
        const isHalf = i === full && hasHalf;
        return (
          <span key={i} className="relative h-4 w-4">
            <Star className="absolute inset-0 h-4 w-4 text-stone-300" />
            {isFull ? (
              <Star className="absolute inset-0 h-4 w-4 fill-amber-400 text-amber-400" />
            ) : null}
            {isHalf ? (
              <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ locale = "it", maxItems = 6 }) => {
  const stats = getReviewStats();

  const filteredReviews = useMemo(() => {
    const exact = realReviews.filter((r) => r.lang === locale);
    const list = exact.length ? exact : realReviews.filter((r) => r.lang === "it");
    return list.slice(0, maxItems);
  }, [locale, maxItems]);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [dragBounds, setDragBounds] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const compute = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      const overflow = track.scrollWidth - viewport.clientWidth;
      setDragBounds({ left: -Math.max(0, overflow), right: 0 });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [filteredReviews.length]);

  if (filteredReviews.length === 0) return null;

  return (
    <section
      className="py-20 bg-white"
      aria-labelledby="reviews-heading"
    >
      <Container>
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <h2
            id="reviews-heading"
            className="font-display text-display-sm md:text-display-md mb-4 text-neutral-900"
          >
            Cosa Dicono i Nostri Ospiti
          </h2>
          <div className="text-3xl md:text-4xl font-bold text-stone-900">
            9.4 <span className="text-stone-500">/ 10</span> · <span className="text-amber-600">Eccellente</span>
          </div>
          {stats ? (
            <div className="mt-2 text-sm text-stone-600">{stats.count} recensioni</div>
          ) : null}
        </motion.div>

        {/* Mobile carousel (drag) */}
        <div className="md:hidden" ref={viewportRef}>
          <motion.div
            ref={trackRef}
            className="flex gap-4"
            drag="x"
            dragConstraints={dragBounds}
            dragElastic={0.08}
          >
            {filteredReviews.map((review) => (
              <div key={review.id} className="w-[86vw] max-w-sm shrink-0">
                <ReviewCard review={review} locale={locale} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} locale={locale} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ReviewsSection;

function ReviewCard({ review, locale }: { review: Review; locale: string }) {
  const badge =
    review.source === "Booking.com"
      ? "bg-blue-100 text-blue-700"
      : review.source === "Google"
        ? "bg-red-100 text-red-700"
        : "bg-stone-100 text-stone-700";

  const stars = ratingToStars(review.source, review.rating);

  return (
    <Card className="h-full flex flex-col min-h-[260px]">
      <div className="flex items-center justify-between mb-3">
        <StarRow value={stars.value} />
        <time dateTime={review.date} className="text-xs text-neutral-500">
          {formatDate(review.date, locale)}
        </time>
      </div>
      <blockquote className="mb-4 flex-1">
        <p className="text-neutral-700 text-base leading-relaxed">&ldquo;{review.text}&rdquo;</p>
      </blockquote>
      <footer className="pt-4 border-t border-neutral-200 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-neutral-900">
            {review.authorName}
            {review.authorCountry ? <span className="font-normal text-neutral-600"> ({review.authorCountry})</span> : null}
          </p>
          <div className="mt-1">
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${badge}`}>
              {review.source}
            </span>
          </div>
        </div>
        {review.sourceUrl ? (
          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Apri fonte"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
      </footer>
    </Card>
  );
}
