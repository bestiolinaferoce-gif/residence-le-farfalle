import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { locales, type Locale } from "@/src/lib/i18n";
import { pageAlternates } from "@/src/lib/seo";
import { siteConfig } from "@/src/config/site";
import { guides, getGuide } from "@/src/data/guide/guides";
import Container from "@/src/components/ui/Container";
import BreadcrumbJsonLd from "@/src/components/ui/BreadcrumbJsonLd";

function resolveLocale(raw: string | undefined): Locale {
  return raw === "en" || raw === "de" ? raw : "it";
}

const ctaCopy: Record<Locale, { book: string; guides: string; breadcrumbHome: string; breadcrumbGuides: string }> = {
  it: { book: "Richiedi preventivo", guides: "Tutte le guide", breadcrumbHome: "Home", breadcrumbGuides: "Guide" },
  en: { book: "Request a quote", guides: "All guides", breadcrumbHome: "Home", breadcrumbGuides: "Guides" },
  de: { book: "Angebot anfragen", guides: "Alle Guides", breadcrumbHome: "Home", breadcrumbGuides: "Guides" },
};

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const guide of guides) {
      params.push({ locale, slug: guide.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = resolveLocale(locale);
  const guide = getGuide(slug);
  if (!guide) return { title: "Guida non trovata" };
  const c = guide.content[l];
  return {
    title: c.metaTitle,
    description: c.description,
    keywords: c.keywords,
    alternates: pageAlternates(l, `guida/${slug}`),
    openGraph: {
      type: "article",
      title: c.metaTitle,
      description: c.description,
      url: `${siteConfig.url}/${l}/guida/${slug}`,
      siteName: siteConfig.name,
      images: [{ url: `${siteConfig.url.replace(/\/$/, "")}${guide.image}`, alt: guide.imageAlt[l] }],
    },
  };
}

interface GuidePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { locale, slug } = await params;
  const l = resolveLocale(locale);
  const guide = getGuide(slug);
  if (!guide) notFound();

  const c = guide.content[l];
  const cta = ctaCopy[l];
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.h1,
    description: c.description,
    image: `${baseUrl}${guide.image}`,
    inLanguage: l,
    dateModified: guide.updated,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: `${baseUrl}/${l}`,
    },
    mainEntityOfPage: `${baseUrl}/${l}/guida/${slug}`,
  };

  return (
    <article className="min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: cta.breadcrumbHome, url: `${baseUrl}/${l}` },
          { name: cta.breadcrumbGuides, url: `${baseUrl}/${l}/guida` },
          { name: c.h1, url: `${baseUrl}/${l}/guida/${slug}` },
        ]}
      />

      <section className="relative h-[52vh] min-h-[380px] overflow-hidden bg-stone-900">
        <Image
          src={guide.image}
          alt={guide.imageAlt[l]}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        <Container className="relative flex h-full items-end pb-10">
          <h1 className="font-display text-3xl font-bold text-white md:text-5xl">{c.h1}</h1>
        </Container>
      </section>

      <Container className="max-w-3xl pt-10">
        <p className="text-lg leading-relaxed text-stone-700">{c.intro}</p>

        {c.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="font-display text-2xl font-bold text-stone-900">{section.heading}</h2>
            {section.body.map((p, i) => (
              <p key={i} className="mt-3 leading-relaxed text-stone-700">
                {p}
              </p>
            ))}
          </section>
        ))}

        <div className="mt-12 flex flex-wrap gap-4 border-t border-stone-200 pt-8">
          <Link
            href={`/${l}/prenota`}
            className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
          >
            {cta.book} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href={`/${l}/guida`}
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 font-semibold text-stone-800 transition-colors hover:bg-stone-100"
          >
            {cta.guides}
          </Link>
        </div>
      </Container>
    </article>
  );
}
