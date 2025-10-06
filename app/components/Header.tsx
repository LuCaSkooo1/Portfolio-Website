"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useTranslation } from "../lib/useTranslation"

import { Sun, Moon } from "lucide-react"

export default function Header() {
  const { lang, setLang, t } = useTranslation()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  if (!mounted) return null

  function LinkButton({
    href,
    children,
  }: {
    href: string
    children: React.ReactNode
  }) {
    const active =
      href === "/"
        ? pathname.startsWith("/") &&
          !pathname.startsWith("/about") &&
          !pathname.startsWith("/contact")
        : pathname.startsWith(href)
    return (
      <Link
        href={href}
        aria-selected={active}
        className="z-10 w-auto min-w-fit grow rounded-full border border-transparent px-0.5 py-2 text-center font-medium transition-colors aria-selected:border-[#ffffff]/20 aria-selected:bg-[#ffffff] sm:grow-0 sm:px-4 aria-selected:dark:bg-black"
      >
        {children}
      </Link>
    )
  }

  return (
    <div className="absolute z-50 flex w-full flex-row justify-center">
      <div className="fixed top-0 left-0 flex w-full flex-col items-end md::items-center justify-center gap-2 p-5 sm:left-auto sm:w-auto sm:flex-row">
        <nav
          data-scrolled={isScrolled}
          className="flex h-14 w-full justify-center rounded-full border border-transparent bg-transparent p-2 backdrop-blur-sm transition-all duration-300 data-[scrolled=true]:border-white/20 data-[scrolled=true]:bg-[#fbfbfb]/70 sm:w-auto data-[scrolled=true]:dark:bg-black/70"
        >
          <div className="relative flex w-full items-center gap-2 font-bold font-grotesk text-foreground text-sm">
            {/* Nav Links */}
            <LinkButton href="/">{t("nav.work")}</LinkButton>
            <LinkButton href="/about">{t("nav.about")}</LinkButton>
            <LinkButton href="/contact">{t("nav.contact")}</LinkButton>

            {/* Language Button */}
            <button
              type="button"
              onClick={() => setLang(lang === "sk" ? "en" : "sk")}
              className="z-10 rounded-full border border-transparent px-4 py-2 font-medium active:border-[#ffffff]/20 active:bg-[#ffffff] active:dark:bg-black"
            >
              {lang === "sk" ? "SK" : "EN"}
            </button>
          </div>
        </nav>
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          data-scrolled={isScrolled}
          className="flex size-14 min-w-14 flex-row items-center justify-center rounded-full border border-transparent bg-transparent px-4 py-2 backdrop-blur-sm transition-all duration-300 data-[scrolled=true]:border-white/20 data-[scrolled=true]:bg-[#fbfbfb]/70 data-[scrolled=true]:dark:bg-black/70 text-foreground cursor-pointer"
        >
          <Sun className="dark:-rotate-90 absolute rotate-0 scale-100 transition-all dark:scale-0" />
          <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
    </div>
  )
}
