import type { Metadata } from "next"
import "./globals.css"
import { JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { LanguageProvider } from "./lib/useTranslation"
import { Analytics } from "@vercel/analytics/next"
import TerminalOverlay from "./components/TerminalOverlay"
import BootSequence from "./components/BootSequence"
import AccentSync from "./components/AccentSync"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lucasligas.com"),
  title: "Lucas Ligas | Cybersecurity Enthusiast",
  description:
    "Portfolio of Lucas Ligas — cybersecurity enthusiast with a frontend and product design background. Case studies, CTFs, and things I've shipped.",
  keywords: [
    "Lucas Ligas",
    "cybersecurity",
    "network security",
    "frontend developer",
    "portfolio",
    "Slovakia",
    "CTF",
    "IT admin",
  ],
  authors: [{ name: "Lucas Ligas", url: "https://www.lucasligas.com" }],
  creator: "Lucas Ligas",
  openGraph: {
    title: "Lucas Ligas | Cybersecurity Enthusiast",
    description:
      "Cybersecurity enthusiast with a frontend background. Case studies, CTFs, and things I've built.",
    url: "https://www.lucasligas.com",
    siteName: "Lucas Ligas",
    images: [
      {
        url: "/ogImage.png",
        width: 1200,
        height: 630,
        alt: "Lucas Ligas — cybersecurity enthusiast portfolio",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Ligas | Cybersecurity Enthusiast",
    description:
      "Cybersecurity enthusiast with a frontend background. Case studies, CTFs, and things I've built.",
    images: ["/ogImage.png"],
    creator: "@lucasligas",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            <AccentSync />
            <BootSequence />
            <Header />
            {children}
            <Footer />
            <TerminalOverlay />
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
