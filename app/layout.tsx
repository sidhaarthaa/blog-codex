import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import { ThemeToggle } from '@/components/theme-toggle';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'Minimal Journal',
    template: '%s | Minimal Journal'
  },
  description: 'A premium minimalist blog powered by Markdown and static generation.',
  openGraph: {
    title: 'Minimal Journal',
    description: 'A premium minimalist blog powered by Markdown and static generation.',
    type: 'website',
    url: 'https://example.com'
  },
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: 'Minimal Journal RSS' }]
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <header className="site-header">
          <Link href="/" className="logo">
            Minimal Journal
          </Link>
          <nav>
            <Link href="/">Home</Link>
            <a href="/rss.xml">RSS</a>
            <ThemeToggle />
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
