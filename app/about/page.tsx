"use client"

import { useTranslation } from "../lib/useTranslation"
import Image from "next/image"
import meImage from "@/public/ja.png"
import { motion, Variants } from "framer-motion"
import { useEffect, useRef } from "react"

export default function About() {
  const { t } = useTranslation()
  const hasAnimatedRef = useRef(false)

  interface TimelineItem {
    title?: string
    role?: string
    period: string
    label?: string
    href?: string
  }

  const timelineData: TimelineItem[] = [
    {
      title: "Ekvia",
      role: "IT Admin",
      period: "2025~",
      href: "https://ekvia.sk",
    },
    {
      title: "Košický S. Kraj",
      role: "UI UX Consultant",
      period: "2024-2025",
      href: "https://www.kosickazupa.sk/",
    },
    {
      title: "Incomodum",
      role: "Designer / Dev",
      period: "2023~",
      href: "https://incomodum.com",
    },
    {
      title: "Wezeo",
      role: "Dev Internship",
      period: "2020-2025",
      href: "https://wezeo.com",
    },
    {
      title: t("about.highschool"),
      role: t("about.highschoolName"),
      period: "",
      label: t("about.foundation"),
      href: "https://spsehalova.sk/",
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const slideUpVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const slideRightVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  }

  const scaleUpVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const timelineCardVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
    hover: {
      scale: 1.02,
      x: 10,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  }

  const TimelineCard: React.FC<Omit<TimelineItem, "label">> = ({
    title,
    role,
    period,
    href,
  }) => {
    const inner = (
      <>
        <div className="flex flex-col">
          <p className="font-bold leading-tight text-foreground">
            <span className="text-[#00d97e] mr-2">▸</span>
            {title}
          </p>
          <p className="text-sm leading-tight opacity-70">{role}</p>
        </div>
        <p className="text-xl font-bold opacity-60">{period}</p>
      </>
    )
    const className =
      "rounded-md bg-white dark:bg-black border border-[#00d97e]/40 dark:border-[#00ff88]/30 hover:border-[#00d97e] dark:hover:border-[#00ff88] flex flex-row justify-between items-center p-4 px-5 mb-3 font-mono"

    if (href) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${className} cursor-pointer`}
          variants={timelineCardVariants}
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
          initial="hidden"
          animate="visible"
        >
          {inner}
        </motion.a>
      )
    }
    return (
      <motion.div
        className={className}
        variants={timelineCardVariants}
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        initial="hidden"
        animate="visible"
      >
        {inner}
      </motion.div>
    )
  }

  useEffect(() => {
    hasAnimatedRef.current = false
  }, [])

  return (
    <>
      <div className="hero">
        <motion.div
          className="w-full flex flex-col justify-center items-center px-5"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-2xl md:text-4xl mt-32 text-center font-bold font-mono w-full max-w-4xl text-cyber"
            variants={slideUpVariants}
          >
            {t("about.hero.title")}
            <span className="caret-inline" />
          </motion.h1>
        </motion.div>

        {/* $ cat bio.md */}
        <motion.div
          className="container flex flex-col lg:flex-row justify-center gap-10 md:gap-20 items-start mx-auto mt-16 px-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div
            className="overflow-clip h-fit flex flex-row justify-center items-baseline rounded-md w-[90%] lg:w-[35%] border border-[#00d97e]/30 dark:border-[#00ff88]/20 p-1"
            variants={scaleUpVariants}
          >
            <Image
              src={meImage}
              alt="ja fotka"
              width={2731}
              height={4096}
              className="w-full h-auto object-cover object-top aspect-square rounded-sm grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
              priority
              placeholder="blur"
            />
          </motion.div>

          <motion.div
            className="flex flex-col w-[90%] lg:max-w-[40%] h-full font-mono"
            variants={slideUpVariants}
          >
            <motion.div
              className="text-cyber text-sm mb-2 opacity-80"
              variants={slideUpVariants}
            >
              $ cat bio.md
            </motion.div>
            <motion.h2
              className="text-xl md:text-2xl font-bold text-foreground"
              variants={slideUpVariants}
            >
              {t("about.about.title")}
            </motion.h2>
            <motion.p className="mt-6 opacity-90" variants={slideUpVariants}>
              {t("about.about.description")}
            </motion.p>
            <motion.p className="mt-4 opacity-90" variants={slideUpVariants}>
              {t("about.about.description2")}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* history --experience */}
        <motion.div
          className="container flex flex-col-reverse lg:flex-row justify-center gap-10 md:gap-20 items-start mx-auto mt-16 px-5 pb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div
            className="flex flex-col w-[90%] lg:max-w-[40%] h-full font-mono"
            variants={slideRightVariants}
          >
            <motion.div
              className="text-cyber text-sm mb-2 opacity-80"
              variants={slideUpVariants}
            >
              $ history --experience
            </motion.div>
            <motion.h2
              className="text-xl md:text-2xl font-bold text-foreground"
              variants={slideUpVariants}
            >
              {t("about.experience.title")}
            </motion.h2>
            <motion.p className="mt-6 opacity-90" variants={slideUpVariants}>
              {t("about.experience.description")}
            </motion.p>
            <motion.p className="mt-4 opacity-90" variants={slideUpVariants}>
              {t("about.experience.description2")}
            </motion.p>
            <motion.p className="mt-4 opacity-90" variants={slideUpVariants}>
              {t("about.experience.description3")}
            </motion.p>
            <motion.p className="mt-4 opacity-90" variants={slideUpVariants}>
              {t("about.experience.description4")}
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center w-[90%] lg:w-[35%] text-foreground"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                variants={containerVariants}
                custom={index}
              >
                {item.label && (
                  <motion.p
                    className="text-center mb-3 opacity-60 font-mono text-sm"
                    variants={slideUpVariants}
                  >
                    {item.label}
                  </motion.p>
                )}
                <TimelineCard
                  title={item.title}
                  role={item.role}
                  period={item.period}
                  href={item.href}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
