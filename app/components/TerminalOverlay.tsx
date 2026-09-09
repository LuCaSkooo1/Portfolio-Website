"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useTranslation } from "../lib/useTranslation"

type Line = { kind: "in" | "out" | "err" | "ok"; text: string }

const HELP_LINES = [
  "available commands:",
  "  help                 show this list",
  "  whoami               print current user",
  "  ls                   list pages",
  "  cd <page>            navigate to page (work|about|contact|ksk|navody|~)",
  "  open <page>          alias for cd",
  "  theme <dark|light>   switch color theme",
  "  lang <en|sk>         switch language",
  "  cv                   open CV pdf",
  "  contact              open contact page",
  "  social               list social links",
  "  clear                clear the screen",
  "  exit                 close terminal (Esc)",
]

const SOCIAL_LINES = [
  "  github    https://github.com/LuCaSkooo1",
  "  linkedin  https://linkedin.com/in/lucas-ligas-a6632b282/",
  "  email     lucasligas15@gmail.com",
]

const PAGES: Record<string, string> = {
  work: "/",
  "~": "/",
  home: "/",
  about: "/about",
  contact: "/contact",
  ksk: "/ksk",
  navody: "/navody",
}

export default function TerminalOverlay() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "lucas-terminal v1.0.0 — type `help` for commands." },
  ])
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const { setTheme } = useTheme()
  const { setLang, t } = useTranslation()

  // global hotkey
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((v) => !v)
        return
      }
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 20)
    }
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  function print(next: Line[]) {
    setLines((prev) => [...prev, ...next])
  }

  function run(raw: string) {
    const cmd = raw.trim()
    print([{ kind: "in", text: `lucas@portfolio:~$ ${cmd}` }])
    if (!cmd) return

    setHistory((h) => [...h, cmd])
    setHistoryIdx(null)

    const [name, ...args] = cmd.split(/\s+/)
    const arg = args.join(" ").trim()

    switch (name.toLowerCase()) {
      case "help":
        print(HELP_LINES.map((text) => ({ kind: "out", text })))
        return
      case "whoami":
        print([{ kind: "out", text: "lucas.ligas" }])
        return
      case "ls": {
        const items = Object.keys(PAGES)
          .filter((k) => k !== "~" && k !== "home")
          .map((k) => `  ${k}`)
        print([
          { kind: "out", text: "pages/" },
          ...items.map((text) => ({ kind: "out" as const, text })),
        ])
        return
      }
      case "cd":
      case "open": {
        const key = arg.replace(/^\//, "").toLowerCase()
        if (!key) {
          print([{ kind: "err", text: "usage: cd <page>" }])
          return
        }
        const dest = PAGES[key]
        if (!dest) {
          print([{ kind: "err", text: `cd: no such page: ${arg}` }])
          return
        }
        router.push(dest)
        print([{ kind: "ok", text: `→ ${dest}` }])
        setOpen(false)
        return
      }
      case "theme": {
        const v = arg.toLowerCase()
        if (v !== "dark" && v !== "light") {
          print([{ kind: "err", text: "usage: theme <dark|light>" }])
          return
        }
        setTheme(v)
        print([{ kind: "ok", text: `theme → ${v}` }])
        return
      }
      case "lang": {
        const v = arg.toLowerCase()
        if (v !== "en" && v !== "sk") {
          print([{ kind: "err", text: "usage: lang <en|sk>" }])
          return
        }
        setLang(v)
        print([{ kind: "ok", text: `lang → ${v}` }])
        return
      }
      case "cv": {
        const path = t("cv.path") ?? "/cv_en_web.pdf"
        window.open(path, "_blank")
        print([{ kind: "ok", text: `opening ${path}` }])
        return
      }
      case "contact":
        router.push("/contact")
        print([{ kind: "ok", text: "→ /contact" }])
        setOpen(false)
        return
      case "social":
        print([
          { kind: "out", text: "social/" },
          ...SOCIAL_LINES.map((text) => ({ kind: "out" as const, text })),
        ])
        return
      case "clear":
        setLines([])
        return
      case "exit":
        setOpen(false)
        return
      case "sudo":
        print([{ kind: "err", text: "lucas is not in the sudoers file. this incident will be reported." }])
        return
      case "rm":
        print([{ kind: "err", text: "rm: nice try." }])
        return
      default:
        print([{ kind: "err", text: `command not found: ${name} — try 'help'` }])
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    run(input)
    setInput("")
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length === 0) return
      const idx = historyIdx === null ? history.length - 1 : Math.max(0, historyIdx - 1)
      setHistoryIdx(idx)
      setInput(history[idx])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIdx === null) return
      const next = historyIdx + 1
      if (next >= history.length) {
        setHistoryIdx(null)
        setInput("")
      } else {
        setHistoryIdx(next)
        setInput(history[next])
      }
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 md:p-10 bg-black/40 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="terminal-window w-full max-w-3xl rounded-md overflow-hidden mt-16 md:mt-24"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 py-2 border-b border-current/30 bg-black/60">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs opacity-70">
            lucas@portfolio — /bin/curious — 80×24
          </span>
          <span className="ml-auto text-xs opacity-50">esc to close</span>
        </div>
        <div
          ref={scrollRef}
          className="h-[420px] md:h-[500px] overflow-y-auto p-4 text-sm leading-relaxed"
        >
          {lines.map((l, i) => (
            <div
              key={i}
              className={
                l.kind === "err"
                  ? "text-red-400"
                  : l.kind === "ok"
                  ? "text-[#00ff88]"
                  : l.kind === "in"
                  ? "text-white/90"
                  : "opacity-90"
              }
            >
              {l.text}
            </div>
          ))}
          <form onSubmit={onSubmit} className="flex items-center gap-2 mt-1">
            <span className="text-[#00ff88] shrink-0">lucas@portfolio:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onInputKey}
              autoComplete="off"
              spellCheck={false}
              className="flex-1 bg-transparent outline-none text-white caret-[#00ff88]"
            />
          </form>
        </div>
      </div>
    </div>
  )
}
