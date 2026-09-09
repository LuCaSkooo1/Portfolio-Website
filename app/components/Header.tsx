"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useTranslation } from "../lib/useTranslation"

import { Sun, Moon, TerminalSquare } from "lucide-react"

export default function Header() {
  const { lang, setLang, t } = useTranslation()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

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
    path,
    label,
  }: {
    href: string
    path: string
    label: string
  }) {
    const active =
      href === "/"
        ? pathname === "/" ||
          (pathname.startsWith("/") &&
            !pathname.startsWith("/about") &&
            !pathname.startsWith("/contact"))
        : pathname.startsWith(href)
    return (
      <Link
        href={href}
        aria-selected={active}
        className="z-10 w-auto min-w-fit grow rounded-md border border-transparent px-2 py-2 text-center font-mono transition-colors aria-selected:border-[color:var(--accent-cyber)]/50 aria-selected:bg-[color:var(--accent-cyber)]/10 aria-selected:text-[color:var(--accent-cyber)] hover:text-[color:var(--accent-cyber)] sm:grow-0 sm:px-3"
      >
        <span className="opacity-50">~/</span>
        <span>{label || path}</span>
      </Link>
    )
  }

  return (
    <div className="absolute z-50 flex w-full flex-row justify-center">
      <div className="fixed top-0 left-0 flex w-full flex-col items-end md::items-center justify-center gap-2 p-5 sm:left-auto sm:w-auto sm:flex-row">
        <nav
          data-scrolled={isScrolled}
          className="flex h-14 w-full justify-center rounded-md border border-transparent bg-transparent p-2 backdrop-blur-sm transition-all duration-300 data-[scrolled=true]:border-[color:var(--accent-cyber)]/30 data-[scrolled=true]:bg-white/70 dark:data-[scrolled=true]:bg-black/70 sm:w-auto"
        >
          <div className="relative flex w-full items-center gap-1 font-mono text-foreground text-sm">
            <TerminalSquare
              size={16}
              className="text-[color:var(--accent-cyber)] mr-1 hidden sm:block"
            />
            <LinkButton href="/" path="work" label={t("nav.work") ?? "work"} />
            <LinkButton
              href="/about"
              path="about"
              label={t("nav.about") ?? "about"}
            />
            <LinkButton
              href="/contact"
              path="contact"
              label={t("nav.contact") ?? "contact"}
            />

            <button
              type="button"
              onClick={() => setLang(lang === "sk" ? "en" : "sk")}
              className="z-10 shrink-0 rounded-md border border-transparent px-1.5 py-2 sm:px-3 font-mono uppercase text-xs hover:border-[color:var(--accent-cyber)]/30 hover:text-[color:var(--accent-cyber)] transition-colors"
              title="Toggle language"
            >
              <span className="hidden sm:inline">lang=</span>
              {lang}
            </button>
          </div>
        </nav>
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          data-scrolled={isScrolled}
          className="flex size-14 min-w-14 flex-row items-center justify-center rounded-md border border-transparent bg-transparent px-4 py-2 backdrop-blur-sm transition-all duration-300 data-[scrolled=true]:border-[color:var(--accent-cyber)]/30 data-[scrolled=true]:bg-white/70 dark:data-[scrolled=true]:bg-black/70 text-foreground hover:text-[color:var(--accent-cyber)] cursor-pointer"
        >
          <Sun className="dark:-rotate-90 absolute rotate-0 scale-100 transition-all dark:scale-0" />
          <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
    </div>
  )
}
