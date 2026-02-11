import type { Metadata } from 'next';
import Link from 'next/link';
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import { ThemeToggle } from '@/components/theme-toggle';
import './globals.css';

const body = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-body' });
const heading = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-heading' });

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
    <html lang="en" data-theme="light" className={`${body.variable} ${heading.variable}`}>
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
