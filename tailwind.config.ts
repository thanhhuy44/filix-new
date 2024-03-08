import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '12px',
          md: '16px',
          lg: '24px',
        },
      },
      colors: {
        primary: {
          1: '#0D1D21',
          2: '#142d33',
          3: '#0a171a',
        },
        secondary: {
          1: '#EDCC61',
          2: '#f0d378',
          3: '#eac54a',
        },
        grey: {
          light: '#6c6c6c',
          dark: '#343434',
        },
      },
    },
  },
  plugins: [],
};
export default config;
