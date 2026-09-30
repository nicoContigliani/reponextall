import { Inter, Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
});

export const nuwaveSans = localFont({
  src: [
    {
      path: '../styles/fonts/NuwaveSans-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../styles/fonts/NuwaveSans-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-nuwave',
  display: 'swap'
});

export const fonts = { inter, robotoMono, nuwaveSans };
