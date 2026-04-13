import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/** Percorso richiesto da next-intl v3+: `src/i18n/request.ts` (rilevazione automatica se senza argomenti) */
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "residencelefarfalle.com" }],
        destination: "https://www.residencelefarfalle.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
