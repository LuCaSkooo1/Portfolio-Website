"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "../lib/useTranslation"
import Link from "next/link"
import type { CSSProperties } from "react"

type Study = {
  href: string
  title: string
  filePath: string
  descriptionKey: "work.cards.subtitle" | "work.cards.subtitle2"
  logoLight: string
  logoDark: string
  accent: string
  accentDark: string
}

const STUDIES: Study[] = [
  {
    href: "/navody",
    title: "navody.slovensko.sk",
    filePath: "~/case/navody.md",
    descriptionKey: "work.cards.subtitle",
    logoLight: "/slovak-logo.png",
    logoDark: "/slovak-logo-dark.png",
    accent: "#325FAB",
    accentDark: "#3E86FF",
  },
  {
    href: "/ksk",
    title: "kosice-invest.sk",
    filePath: "~/case/ksk.md",
    descriptionKey: "work.cards.subtitle2",
    logoLight: "/kosice-logo.png",
    logoDark: "/kosice-logo-dark.png",
    accent: "#FFC03B",
    accentDark: "#FFD166",
  },
]

export default function CaseStudies() {
  const { t } = useTranslation()

  return (
    <div className="w-[90%] md:w-auto flex flex-col md:flex-row justify-center gap-8 mt-10">
      {STUDIES.map((s) => {
        const filename = s.filePath.split("/").pop() ?? ""
        return (
          <Link
            key={s.href}
            href={s.href}
            className="flex flex-row justify-center"
          >
            <div
              className="card-term group relative w-full max-w-md rounded-md border overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_var(--card-accent-dim)] cursor-pointer bg-white/80 dark:bg-black/80 backdrop-blur-sm font-mono"
              style={
                {
                  "--card-accent": s.accent,
                  "--card-accent-d": s.accentDark,
                  "--card-accent-dim": `${s.accent}33`,
                } as CSSProperties
              }
            >
              {/* Terminal chrome */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-[color:var(--card-accent-dim)] bg-black/5 dark:bg-white/5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs opacity-60">{s.filePath}</span>
              </div>

              {/* Logo */}
              <div className="flex justify-center pt-4">
                <Image
                  src={s.logoLight}
                  alt={s.title}
                  width={600}
                  height={191}
                  className="flex dark:hidden"
                />
                <Image
                  src={s.logoDark}
                  alt={s.title}
                  width={600}
                  height={191}
                  className="hidden dark:flex"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-xs opacity-60 mb-2 card-term-accent">
                  <span>$ </span>
                  <span className="opacity-90 text-foreground">
                    cat {filename}
                  </span>
                </div>
                <h3 className="text-foreground font-bold text-lg mb-3">
                  {s.title}
                </h3>
                <p className="text-sm mb-5 opacity-90">
                  {t(s.descriptionKey)}
                </p>
                <div className="flex items-center font-medium card-term-accent">
                  <span>$ ./open</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
