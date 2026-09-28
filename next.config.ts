import type { NextConfig } from "next";

/**
 * `output: 'export'` is deliberately NOT set. The page still prerenders at
 * build time, and leaving export off keeps a server action available for
 * the quote form (see src/lib/submit-quote.ts).
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
