/**
 * BandieraBluBadge
 * Badge informativo Bandiera Blu — riutilizzabile.
 * NON è il logo ufficiale FEE: comunica un dato pubblico verificabile.
 *
 * Variants: full (cerchio), compact (sticker), banner.
 */
import type { CSSProperties } from "react";

export type BandieraBluBadgeProps = {
  variant?: "full" | "compact" | "banner";
  size?: number;
  location?: string;
  year?: number;
  className?: string;
  style?: CSSProperties;
};

const DEFAULT_LOCATION = "Isola di Capo Rizzuto";

export function BandieraBluBadge({
  variant = "full",
  size,
  location = DEFAULT_LOCATION,
  year = 2026,
  className,
  style,
}: BandieraBluBadgeProps) {
  if (variant === "compact") return <CompactBadge size={size ?? 96} location={location} year={year} className={className} style={style} />;
  if (variant === "banner") return <BannerBadge size={size ?? 520} location={location} year={year} className={className} style={style} />;
  return <FullBadge size={size ?? 180} location={location} year={year} className={className} style={style} />;
}

function FullBadge({ size, location, year, className, style }: { size: number; location: string; year: number; className?: string; style?: CSSProperties }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360" width={size} height={size} className={className} style={style} role="img" aria-label={`Bandiera Blu ${year} — ${location}`}>
      <title>{`Bandiera Blu ${year} — ${location}`}</title>
      <defs>
        <radialGradient id="bbFullSea" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#0e5a8a" />
          <stop offset="60%" stopColor="#0a3d62" />
          <stop offset="100%" stopColor="#062a44" />
        </radialGradient>
        <linearGradient id="bbFullGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0c75a" />
          <stop offset="50%" stopColor="#d4a849" />
          <stop offset="100%" stopColor="#a87f2a" />
        </linearGradient>
        <filter id="bbFullShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.25" />
        </filter>
        <path id="bbFullArcTop" d="M 60 180 A 120 120 0 0 1 300 180" fill="none" />
        <path id="bbFullArcBottom" d="M 70 192 A 110 110 0 0 0 290 192" fill="none" />
      </defs>
      <circle cx="180" cy="180" r="170" fill="url(#bbFullSea)" filter="url(#bbFullShadow)" />
      <circle cx="180" cy="180" r="160" fill="none" stroke="url(#bbFullGold)" strokeWidth="3" />
      <circle cx="180" cy="180" r="142" fill="#0a4570" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.35" />
      <text fontFamily="Georgia, 'Times New Roman', serif" fontSize="20" fontWeight="700" fill="#f4d27a" letterSpacing="4">
        <textPath href="#bbFullArcTop" startOffset="50%" textAnchor="middle">★  BANDIERA  BLU  ★</textPath>
      </text>
      <g fill="#f4d27a">
        <polygon points="60,180 64,184 60,188 56,184" />
        <polygon points="300,180 304,184 300,188 296,184" />
      </g>
      <text x="180" y="178" fontFamily="Georgia, 'Times New Roman', serif" fontSize="62" fontWeight="800" fill="#ffffff" textAnchor="middle" letterSpacing="2">{year}</text>
      <text x="180" y="198" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="9" fontWeight="700" fill="#f4d27a" textAnchor="middle" letterSpacing="3">ZONA PREMIATA</text>
      <g stroke="#f4d27a" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M 130 218 q 12 -7 25 0 t 25 0 t 25 0 t 25 0" opacity="0.95" />
        <path d="M 138 230 q 10 -6 20 0 t 20 0 t 20 0 t 20 0" opacity="0.7" />
      </g>
      <text fontFamily="Georgia, 'Times New Roman', serif" fontSize="14" fontWeight="700" fill="#ffffff" letterSpacing="3">
        <textPath href="#bbFullArcBottom" startOffset="50%" textAnchor="middle">{location.toUpperCase()}  •  CALABRIA</textPath>
      </text>
    </svg>
  );
}

function CompactBadge({ size, location, year, className, style }: { size: number; location: string; year: number; className?: string; style?: CSSProperties }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width={size} height={size} className={className} style={style} role="img" aria-label={`Bandiera Blu ${year}`}>
      <title>{`Bandiera Blu ${year}`}</title>
      <defs>
        <radialGradient id="bbCpSea" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#0e5a8a" />
          <stop offset="60%" stopColor="#0a3d62" />
          <stop offset="100%" stopColor="#062a44" />
        </radialGradient>
        <linearGradient id="bbCpGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0c75a" />
          <stop offset="100%" stopColor="#a87f2a" />
        </linearGradient>
        <path id="bbCpArcTop" d="M 28 80 A 52 52 0 0 1 132 80" fill="none" />
        <path id="bbCpArcBottom" d="M 32 86 A 48 48 0 0 0 128 86" fill="none" />
      </defs>
      <circle cx="80" cy="80" r="76" fill="url(#bbCpSea)" />
      <circle cx="80" cy="80" r="70" fill="none" stroke="url(#bbCpGold)" strokeWidth="2" />
      <circle cx="80" cy="80" r="62" fill="#0a4570" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.35" />
      <text fontFamily="Georgia, serif" fontSize="9" fontWeight="700" fill="#f4d27a" letterSpacing="1.5">
        <textPath href="#bbCpArcTop" startOffset="50%" textAnchor="middle">★ BANDIERA BLU ★</textPath>
      </text>
      <text x="80" y="84" fontFamily="Georgia, serif" fontSize="28" fontWeight="800" fill="#ffffff" textAnchor="middle">{year}</text>
      <g stroke="#f4d27a" strokeWidth="1.2" fill="none" strokeLinecap="round">
        <path d="M 56 100 q 6 -3 12 0 t 12 0 t 12 0 t 12 0" />
      </g>
      <text fontFamily="Georgia, serif" fontSize="6.5" fontWeight="700" fill="#ffffff" letterSpacing="1">
        <textPath href="#bbCpArcBottom" startOffset="50%" textAnchor="middle">{location.toUpperCase()}</textPath>
      </text>
    </svg>
  );
}

function BannerBadge({ size, location, year, className, style }: { size: number; location: string; year: number; className?: string; style?: CSSProperties }) {
  const height = (size / 520) * 120;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width={size} height={height} className={className} style={style} role="img" aria-label={`Soggiorni in zona Bandiera Blu ${year} — ${location}`}>
      <title>{`Bandiera Blu ${year} — Banner`}</title>
      <defs>
        <linearGradient id="bbBnSea2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#062a44" />
          <stop offset="50%" stopColor="#0a3d62" />
          <stop offset="100%" stopColor="#0e5a8a" />
        </linearGradient>
        <linearGradient id="bbBnGold2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0c75a" />
          <stop offset="100%" stopColor="#a87f2a" />
        </linearGradient>
        <radialGradient id="bbBnBadgeSea2" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#0e5a8a" />
          <stop offset="100%" stopColor="#062a44" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="520" height="120" rx="60" fill="url(#bbBnSea2)" />
      <rect x="3" y="3" width="514" height="114" rx="57" fill="none" stroke="url(#bbBnGold2)" strokeWidth="1.5" />
      <g stroke="#f4d27a" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.18">
        <path d="M 130 90 q 14 -8 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0" />
        <path d="M 130 100 q 12 -6 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0" />
      </g>
      <g transform="translate(60,60)">
        <circle r="46" fill="url(#bbBnBadgeSea2)" />
        <circle r="42" fill="none" stroke="url(#bbBnGold2)" strokeWidth="1.5" />
        <text y="-12" fontFamily="Georgia, serif" fontSize="7.5" fontWeight="700" fill="#f4d27a" textAnchor="middle" letterSpacing="1.5">★ BANDIERA BLU ★</text>
        <text y="10" fontFamily="Georgia, serif" fontSize="22" fontWeight="800" fill="#ffffff" textAnchor="middle">{year}</text>
        <path d="M -22 22 q 5 -3 11 0 t 11 0 t 11 0 t 11 0" stroke="#f4d27a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>
      <text x="130" y="50" fontFamily="Georgia, 'Times New Roman', serif" fontSize="20" fontWeight="700" fill="#ffffff">
        Soggiorni in zona <tspan fill="#f4d27a" fontWeight="800">Bandiera Blu</tspan>
      </text>
      <text x="130" y="76" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="13" fontWeight="500" fill="#e6e9ee" letterSpacing="0.4">
        {location} • Calabria 2° in Italia • 27 spiagge premiate
      </text>
    </svg>
  );
}

export default BandieraBluBadge;
