"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

const ROUTE_ACCENT: { match: (p: string) => boolean; value: string }[] = [
  { match: (p) => p.startsWith("/ksk"), value: "amber" },
  { match: (p) => p.startsWith("/navody"), value: "blue" },
]

export default function AccentSync() {
  const pathname = usePathname()

  useEffect(() => {
    const found = ROUTE_ACCENT.find((r) => r.match(pathname))
    if (found) {
      document.documentElement.dataset.accent = found.value
    } else {
      delete document.documentElement.dataset.accent
    }
  }, [pathname])

  return null
}
