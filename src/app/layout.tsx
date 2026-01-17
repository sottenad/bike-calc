import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bike-calc.vercel.app'),
  title: {
    default: 'Cycling Climb Calculator - Estimate Time, Power & Gearing',
    template: '%s | Cycling Climb Calculator'
  },
  description: 'Free cycling climb calculator. Estimate your climb time based on power, weight, and gradient. Analyze optimal gearing for famous climbs like Alpe d\'Huez, Mont Ventoux, and more.',
  keywords: ['cycling climb calculator', 'bike climb time', 'power to weight ratio', 'cycling gearing calculator', 'Alpe d\'Huez time', 'cycling watts per kg', 'bike gear ratio calculator', 'cycling power calculator', 'bike climb speed'],
  authors: [{ name: 'Cycling Climb Calculator' }],
  creator: 'Cycling Climb Calculator',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bike-calc.vercel.app',
    siteName: 'Cycling Climb Calculator',
    title: 'Cycling Climb Calculator - Estimate Time, Power & Gearing',
    description: 'Free tool to estimate cycling climb times based on your power output and weight. Includes famous climbs and gearing analysis.',
  },
  twitter: {
    card: 'summary',
    title: 'Cycling Climb Calculator',
    description: 'Estimate your cycling climb time based on power, weight, and gradient.',
  },
  alternates: {
    canonical: 'https://bike-calc.vercel.app'
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚴</text></svg>',
    apple: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚴</text></svg>'
  }
};

// JSON-LD Structured Data for SEO/AEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Cycling Climb Calculator',
  description: 'Calculate cycling climb times based on power output, rider weight, bike weight, and gradient. Includes famous climbs and gearing analysis.',
  url: 'https://bike-calc.vercel.app',
  applicationCategory: 'SportsApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  featureList: [
    'Climb time estimation based on power and weight',
    'Power-to-weight ratio calculation',
    'Gearing analysis for optimal cadence',
    'Famous climb database including Alpe d\'Huez, Mont Ventoux, and more',
    'Custom climb input with distance, elevation, and gradient'
  ]
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is cycling climb time calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Climb time is calculated using physics-based formulas that account for power output, total mass (rider + bike), gradient, and resistive forces including gravity, rolling resistance, and air drag. The formula solves for velocity where power equals the sum of forces times speed.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is a good power-to-weight ratio for cycling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Power-to-weight ratios vary by fitness level: Recreational riders typically produce 2-3 W/kg, trained amateur cyclists 3-4 W/kg, competitive amateurs 4-5 W/kg, and professional cyclists 5-7 W/kg. Elite Tour de France climbers can sustain over 6 W/kg on major climbs.'
      }
    },
    {
      '@type': 'Question',
      name: 'What gear ratio is best for climbing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The ideal climbing gear depends on your speed and preferred cadence (70-95 RPM is optimal for most cyclists). For steep climbs, compact chainrings (50/34) paired with wide-range cassettes (11-34 or larger) provide easier gearing options.'
      }
    },
    {
      '@type': 'Question',
      name: 'What are gear inches in cycling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gear inches is a traditional measure of bicycle gearing that represents the equivalent diameter of a directly-driven wheel (like a penny-farthing). It is calculated as (Chainring teeth / Cog teeth) x Wheel diameter. Lower gear inches mean easier pedaling for climbing.'
      }
    }
  ]
};

// Script to prevent flash of wrong theme
const themeScript = `
  (function() {
    const saved = localStorage.getItem('theme');
    const theme = saved || 'dark';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-slate-900 transition-colors`}
      >
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
