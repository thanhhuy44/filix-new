import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import 'swiper/css';
import 'react-loading-skeleton/dist/skeleton.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className + ' bg-primary-1 text-white'}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
