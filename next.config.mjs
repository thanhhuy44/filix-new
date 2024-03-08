import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/5712c57ea7/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: 'https://api.themoviedb.org/3',
    TMDB_API_KEY: '5a9466f9f3e1b71f6818d6fa94720a69',
    TMDB_API_TOKEN:
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTk0NjZmOWYzZTFiNzFmNjgxOGQ2ZmE5NDcyMGE2OSIsInN1YiI6IjYyN2NlMDUxZjY1OTZmMTZiYzY5NDBmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aEVLDzdUH47Syh1ZuLQY7PjkPNTadc1R1QYQlPK9bJk',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/*/**',
      },
    ],
  },
};

export default nextConfig;
