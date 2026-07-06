import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    domains: ["x.com", "instagram.com", "linkedin.com", "twitter.com", "discord.gg", "dotesports.com"],
  },
};

export default withNextIntl(nextConfig);
