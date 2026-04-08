import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// Set NEXT_PUBLIC_SITE_URL in GitHub Actions (repo variable SITE_URL) or .env to your custom domain (e.g. Google/Squarespace)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://parulkudtarkar.com'

export const metadata: Metadata = {
  title: 'Parul Kudtarkar - ML & Genomics Researcher',
  description: 'Harvard, Caltech & UCSD trained AI/genomics researcher. Led $12.5M NIH diabetes project, 15+ publications, pioneer in metabolic disease research & drug discovery.',
  metadataBase: new URL(siteUrl),
  referrer: 'strict-origin-when-cross-origin',
  openGraph: {
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
        sizes: '32x32',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
        sizes: '32x32',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* GitHub Pages cannot set HTTP headers; these meta tags provide equivalent protection where supported */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      </head>
      <body className={`font-sans antialiased`}>
        <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
          <div className="site-ambient-mesh" />
          <div className="site-ambient-noise" />
        </div>
        {children}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
