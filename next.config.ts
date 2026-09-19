import type { NextConfig } from 'next';

const svgr = {
  loader: '@svgr/webpack',
  options: {
    prettier: false,
    svgo: true,
    svgoConfig: {
      plugins: [{ name: 'preset-default', params: { override: { removeViewBox: false } } }],
    },
    titleProp: true,
  },
};

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'courses-top.ru' },
      { protocol: 'https', hostname: 'cdn-bucket.hb.bizmrg.com' },
    ],
  },
  turbopack: {
    rules: {
      '*.svg': { loaders: [svgr], as: '*.js' },
    },
  },
};

export default nextConfig;
