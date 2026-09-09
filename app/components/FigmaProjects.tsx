"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "../lib/useTranslation"
import Link from "next/link"
import type { CSSProperties } from "react"

type FigmaProject = {
  href: string
  name: string
  filePath: string
  logoLight: string
  logoDark: string
  accent: string
  accentDark: string
}

const PROJECTS: FigmaProject[] = [
  {
    href: "https://www.figma.com/design/TuJ4kLxLiYKRT4YeU3MGiy/Traffi?node-id=18-56&t=GajlKCG9XNdzg32v-1",
    name: "traffi",
    filePath: "~/figma/traffi.fig",
    logoLight: "/traffi.png",
    logoDark: "/traffiDark.png",
    accent: "#c32828",
    accentDark: "#ff5a5a",
  },
  {
    href: "https://www.figma.com/design/NgadmsNlY1sW83W2QOERUE/Sportuj-too?node-id=0-1&t=zTqemJCsg8gCNQZX-1",
    name: "sportuj-too",
    filePath: "~/figma/sportuj-too.fig",
    logoLight: "/sportujToo.png",
    logoDark: "/sportujTooDark.png",
    accent: "#03b303",
    accentDark: "#3dff3d",
  },
  {
    href: "https://www.figma.com/design/PA67GfL3BIYikQXtxB99OI/Incomodum-app?node-id=0-1&t=yZ7egJvf04AXZkYV-1",
    name: "incomodum",
    filePath: "~/figma/incomodum.fig",
    logoLight: "/incomodumApp.png",
    logoDark: "/incomodumAppDark.png",
    accent: "#FFC03B",
    accentDark: "#FFD166",
  },
]

export default function FigmaProjects() {
  const { t } = useTranslation()

  return (
    <div className="w-[90%] lg:w-auto flex flex-col md:flex-row justify-center gap-6 mt-10">
      {PROJECTS.map((p) => (
        <Link
          key={p.href}
          href={p.href}
          target="_blank"
          className="flex flex-row justify-center"
        >
          <div
            className="card-term group relative w-full max-w-sm rounded-md border overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_var(--card-accent-dim)] cursor-pointer bg-white/80 dark:bg-black/80 backdrop-blur-sm font-mono"
            style={
              {
                "--card-accent": p.accent,
                "--card-accent-d": p.accentDark,
                "--card-accent-dim": `${p.accent}33`,
              } as CSSProperties
            }
          >
            {/* Terminal chrome */}

            {/* Logo */}
            <div className="flex justify-center pt-0">
              <Image
                src={p.logoLight}
                alt={`${p.name} logo`}
                width={600}
                height={191}
                className="flex dark:hidden"
              />
              <Image
                src={p.logoDark}
                alt={`${p.name} logo`}
                width={600}
                height={191}
                className="hidden dark:flex"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="text-xs opacity-60 mb-3">
                <span className="card-term-accent">$ </span>
                <span className="text-foreground">figma open {p.name}</span>
              </div>
              <div className="flex items-center font-medium card-term-accent">
                <span>{t("work.openFigma")}</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
