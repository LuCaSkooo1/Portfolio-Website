"use client"

import CaseStudies from "./components/CaseStudies"
import { useTranslation } from "./lib/useTranslation"
import { motion } from "framer-motion"
import FigmaProjects from "./components/FigmaProjects"
import { useEffect, useState } from "react"

function TypedLine({
  text,
  delay = 0,
  speed = 22,
  prefix = "",
  onDone,
}: {
  text: string
  delay?: number
  speed?: number
  prefix?: string
  onDone?: () => void
}) {
  const [shown, setShown] = useState("")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (shown.length >= text.length) {
      onDone?.()
      return
    }
    const t = setTimeout(() => {
      setShown(text.slice(0, shown.length + 1))
    }, speed)
    return () => clearTimeout(t)
  }, [shown, started, text, speed, onDone])

  return (
    <span>
      {prefix}
      {shown}
    </span>
  )
}

export default function Home() {
  const { t } = useTranslation()
  const [step, setStep] = useState(0)

  const prompt = t("work.hero.prompt") ?? "$ whoami"
  const line1 = t("work.hero.line1") ?? ""
  const subtitle = t("work.hero.subtitle") ?? ""

  return (
    <div>
      <motion.div
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full flex flex-col justify-center items-center px-5">
          <div className="w-full max-w-[928px]">
            <div className="mt-32 text-left font-mono">
              <div className="text-cyber text-sm md:text-base mb-4 opacity-70">
                lucas@portfolio:~$
              </div>
              <div className="text-2xl md:text-4xl font-bold text-foreground min-h-[3rem]">
                <TypedLine
                  text={prompt.replace(/^\$ /, "")}
                  prefix="$ "
                  speed={40}
                  onDone={() => setStep((s) => Math.max(s, 1))}
                />
                {step === 0 && <span className="caret-inline" />}
              </div>
              <div className="text-xl md:text-3xl font-semibold text-foreground mt-3 min-h-[2.5rem]">
                {step >= 1 && (
                  <>
                    <TypedLine
                      text={line1}
                      prefix="> "
                      speed={30}
                      delay={200}
                      onDone={() => setStep((s) => Math.max(s, 2))}
                    />
                    {step === 1 && <span className="caret-inline" />}
                  </>
                )}
              </div>
              <div className="mt-6 text-sm text-foreground2/70 min-h-[1.25rem]">
                {step >= 2 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {subtitle}
                    <span className="caret-inline" />
                  </motion.span>
                )}
              </div>
            </div>

            <div className="w-full">
              <CaseStudies />
            </div>
          </div>
        </div>
      </motion.div>
      <div className="w-full flex-col flex justify-center items-center mt-20">
        <motion.h2
          className="text-2xl md:text-3xl font-bold mt-10 font-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("work.otherProjects")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-row justify-center"
        >
          <FigmaProjects />
        </motion.div>
      </div>
    </div>
  )
}
