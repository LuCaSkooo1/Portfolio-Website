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
  title: "Lucas Ligas| Portfolio",
  description:
    "Designer & Developer portfolio showcasing web apps, design projects, and creative work.",
  openGraph: {
    title: "Lucas Ligas | Portfolio",
    description:
      "Explore my portfolio: web development, UI/UX, and creative projects.",
    url: "https://www.lucasligas.com",
    siteName: "Lucas Ligas Portfolio",
    images: [
      {
        url: "https://www.lucasligas.com/ogImage.png",
        width: 1200,
        height: 630,
        alt: "Lucas Ligas – Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Ligas | Portfolio",
    description:
      "Explore my portfolio: web development, UI/UX, and creative projects.",
    images: ["https://lucasligas.com/ogImage.png"],
    creator: "@lucasligas",
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
