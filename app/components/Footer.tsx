"use client"

import { FileUser, Mail, Github, Linkedin } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslation } from "../lib/useTranslation"

export default function Footer() {
  const { t } = useTranslation()

  const socials = [
    {
      key: "github",
      href: "https://github.com/LuCaSkooo1",
      value: "LuCaSkooo1",
      icon: Github,
    },
    {
      key: "linkedin",
      href: "https://linkedin.com/in/lucas-ligas-a6632b282/",
      value: "lucas-ligas",
      icon: Linkedin,
    },
    {
      key: "cv",
      href: t("cv.path") || "/cv_en_web.pdf",
      value: (t("cv.path") || "/cv_en_web.pdf").replace(/^\//, ""),
      icon: FileUser,
    },
    {
      key: "email",
      href: "mailto:lucasligas15@gmail.com",
      value: "lucasligas15@gmail.com",
      icon: Mail,
    },
  ]

  const year = new Date().getFullYear()

  return (
    <footer className="w-full flex justify-center px-5 pt-16 pb-10">
      <motion.div
        className="w-full max-w-2xl rounded-md border border-[color:var(--accent-cyber)]/40 bg-white/60 dark:bg-black/60 backdrop-blur-sm font-mono overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Terminal chrome */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[color:var(--accent-cyber)]/30 bg-black/5 dark:bg-white/5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs opacity-60">~/footer.sh</span>
        </div>

        {/* Body */}
        <div className="p-4 md:p-5 text-sm">
          <div className="text-cyber opacity-80 mb-3">$ ls ~/socials</div>

          <div className="flex flex-col gap-1.5">
            {socials.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group hover:bg-[color:var(--accent-cyber)]/5 rounded px-1 -mx-1 py-0.5 transition-colors"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                >
                  <span className="text-cyber">▸</span>
                  <Icon size={14} className="text-cyber shrink-0" />
                  <span className="text-cyber min-w-[70px]">{s.key}</span>
                  <span className="opacity-40">→</span>
                  <span className="text-foreground opacity-90 group-hover:text-cyber transition-colors break-all">
                    {s.value}
                  </span>
                </motion.a>
              )
            })}
          </div>

          <div className="opacity-30 border-t border-current my-4" />

          <div className="text-cyber opacity-80">$ uptime</div>
          <div className="text-foreground2 opacity-80 ml-2">
            <span className="text-cyber mr-2">▸</span>
            made by lucas · © {year} · all systems operational
          </div>

          <div className="mt-2 text-cyber">
            $ <span className="caret-inline" />
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
