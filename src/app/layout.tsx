import type { Metadata } from 'next';
import { Genos } from 'next/font/google';
import './globals.css';
import ThirdwebClient from './thirdweb-provider';
import ScrollToTopButton from '../hooks/ScrollToTopButton';

const genos = Genos({
  subsets: ['latin'],
  weight: '400'
});

export const metadata: Metadata = {
  title: 'PrimalFi',
  description: 'PrimalFi is a liquid staking and indexed liquidity protocol built on ApeChain. Deposit APE, receive prAPE, and gain exposure to protocol-wide liquidity growth through a fully on-chain Liquidity Index system.',
  keywords: ['ApeChain', 'ApeCoin', 'Staking'],

  metadataBase: new URL('https://primalfi.xyz'),
  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'PrimalFi',
    description: 'PrimalFi is a liquid staking and indexed liquidity protocol built on ApeChain. Deposit APE, receive prAPE, and gain exposure to protocol-wide liquidity growth through a fully on-chain Liquidity Index system.',
    url: 'https://primalfi.xyz',
    siteName: 'PrimalFi',
    images: [
      {
        url: '/social-icon.png',
        width: 1200,
        height: 630,
        alt: 'PrimalFi',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@primalfi_xyz',
    creator: '@OutlawsDT29',
    title: 'PrimalFi',
    description: 'PrimalFi is a liquid staking and indexed liquidity protocol built on ApeChain. Deposit APE, receive prAPE, and gain exposure to protocol-wide liquidity growth through a fully on-chain Liquidity Index system.',
    images: ['/social-icon.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body className={`${genos.className} overflow-x-hidden`}>
        <ThirdwebClient>
          <ScrollToTopButton />
          {children}
        </ThirdwebClient>
      </body>
    </html>
  );
}