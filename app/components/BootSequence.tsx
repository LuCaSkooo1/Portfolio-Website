"use client"

import { useEffect, useMemo, useState } from "react"

const STORAGE_KEY = "boot-seen-v2"

type Kind = "kernel" | "ok" | "fail" | "starting" | "info" | "blank" | "welcome"

type BootLine = { text: string; kind: Kind; delay: number }

// Roughly imitates a systemd boot log with a couple of early kernel lines,
// followed by service starts. Timing is stylized, not realistic.
const LINES: BootLine[] = [
  { kind: "kernel", text: "Booting portfolio (linux-cyber 6.6.0-lucas)...", delay: 40 },
  { kind: "kernel", text: "[    0.000000] Command line: BOOT_IMAGE=/vmlinuz root=UUID=lucas.ligas ro quiet", delay: 40 },
  { kind: "kernel", text: "[    0.041302] Memory: 16384M available / 3200M reserved", delay: 60 },
  { kind: "kernel", text: "[    0.128441] CPU: 12-core curiosity @ 4.2GHz", delay: 60 },
  { kind: "kernel", text: "[    0.244190] pci 0000:00:1f.2: initialized", delay: 40 },
  { kind: "blank", text: "", delay: 60 },

  { kind: "ok", text: "Reached target Local File Systems.", delay: 80 },
  { kind: "ok", text: "Reached target Swap.", delay: 40 },
  { kind: "ok", text: "Started D-Bus System Message Bus.", delay: 90 },
  { kind: "ok", text: "Started Journal Service.", delay: 50 },
  { kind: "starting", text: "Starting Load/Save Random Seed...", delay: 90 },
  { kind: "ok", text: "Started Load/Save Random Seed.", delay: 70 },
  { kind: "ok", text: "Started Network Manager.", delay: 90 },
  { kind: "ok", text: "Reached target Network.", delay: 60 },
  { kind: "starting", text: "Starting OpenSSH Daemon...", delay: 100 },
  { kind: "ok", text: "Started OpenSSH Daemon.", delay: 80 },
  { kind: "starting", text: "Starting Curiosity Engine...", delay: 90 },
  { kind: "ok", text: "Started Curiosity Engine.", delay: 60 },
  { kind: "starting", text: "Starting Cybersecurity Enthusiasm Daemon...", delay: 120 },
  { kind: "ok", text: "Started Cybersecurity Enthusiasm Daemon.", delay: 80 },
  { kind: "fail", text: "Failed to start impostor-syndrome.service — ignoring.", delay: 100 },
  { kind: "ok", text: "Started CTF Playtime Service.", delay: 70 },
  { kind: "ok", text: "Started Coffee Delivery Bus.", delay: 60 },
  { kind: "starting", text: "Starting Portfolio Web Service...", delay: 140 },
  { kind: "ok", text: "Started Portfolio Web Service.", delay: 90 },
  { kind: "ok", text: "Authenticated session for lucas.ligas.", delay: 80 },
  { kind: "ok", text: "Reached target Multi-User System.", delay: 60 },
  { kind: "ok", text: "Reached target Graphical Interface.", delay: 60 },
  { kind: "blank", text: "", delay: 200 },
  { kind: "welcome", text: "welcome. loading portfolio...", delay: 100 },
]

function StatusTag({ kind }: { kind: Kind }) {
  if (kind === "ok") {
    return (
      <span className="text-[#00ff88]">
        [<span className="mx-2">OK</span>]
      </span>
    )
  }
  if (kind === "fail") {
    return (
      <span className="text-red-500">
        [<span className="mx-1">FAILED</span>]
      </span>
    )
  }
  if (kind === "starting") {
    return (
      <span className="text-yellow-400">
        [<span className="mx-2">**</span>]
      </span>
    )
  }
  return null
}

export default function BootSequence() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [shown, setShown] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window === "undefined") return
    const seen = window.localStorage.getItem(STORAGE_KEY)
    if (seen) return
    setVisible(true)
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  useEffect(() => {
    if (!visible) return
    if (shown >= LINES.length) return
    const t = setTimeout(() => setShown((s) => s + 1), LINES[shown].delay)
    return () => clearTimeout(t)
  }, [visible, shown])

  useEffect(() => {
    if (!visible) return

    function dismiss() {
      if (fading) return
      setFading(true)
      window.localStorage.setItem(STORAGE_KEY, "1")
      setTimeout(() => {
        setVisible(false)
        document.body.style.overflow = ""
      }, 500)
    }

    const onKey = () => dismiss()
    const onClick = () => dismiss()
    window.addEventListener("keydown", onKey)
    window.addEventListener("click", onClick)

    let auto: number | undefined
    if (shown >= LINES.length) {
      auto = window.setTimeout(dismiss, 900)
    }
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("click", onClick)
      if (auto) clearTimeout(auto)
    }
  }, [visible, shown, fading])

  const visibleLines = useMemo(() => LINES.slice(0, shown), [shown])

  if (!mounted || !visible) return null

  return (
    <div
      className={`fixed inset-0 z-[200] bg-black text-white font-mono overflow-hidden scanlines transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="w-full h-full p-4 md:p-8 overflow-y-auto text-[11px] md:text-sm leading-[1.5]">
        {visibleLines.map((l, i) => {
          if (l.kind === "blank") return <div key={i}>&nbsp;</div>
          if (l.kind === "kernel") {
            return (
              <div key={i} className="text-white/60">
                {l.text}
              </div>
            )
          }
          if (l.kind === "welcome") {
            return (
              <div key={i} className="mt-2 text-[#00ff88]">
                {l.text}
              </div>
            )
          }
          return (
            <div key={i} className="whitespace-pre">
              <StatusTag kind={l.kind} />
              <span className="ml-2 text-white/90">{l.text}</span>
            </div>
          )
        })}
        {shown < LINES.length && (
          <div className="text-white/80">
            <span className="caret-inline" />
          </div>
        )}
        <div className="fixed bottom-3 right-4 text-[10px] md:text-xs text-white/40">
          press any key to skip
        </div>
      </div>
    </div>
  )
}
