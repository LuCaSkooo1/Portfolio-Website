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
  }

  const timelineData: TimelineItem[] = [
    { title: "Košický S. Kraj", role: "UI UX Consultant", period: "2024-2025" },
    { title: "Incomodum", role: "Designer / Dev", period: "2022~" },
    { title: "Wezeo", role: "Dev Internship", period: "2020-2025" },
    {
      title: t("about.highschool"),
      role: t("about.highschoolName"),
      period: "",
      label: t("about.foundation"),
    },
  ]

  // Animation variants with proper TypeScript types
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const slideUpVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  }

  const slideLeftVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  }

  const slideRightVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  }

  const scaleUpVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const timelineCardVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      scale: 1.02,
      x: 10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  // Card component inside the same file
  const TimelineCard: React.FC<Omit<TimelineItem, "label">> = ({
    title,
    role,
    period,
  }) => (
    <motion.div
      className="rounded-full bg-[#FFD287] dark:bg-black dark:border dark:border-white/20 flex flex-row justify-between items-center p-4 px-7 mb-3"
      variants={timelineCardVariants}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col">
        <p className="font-bold leading-tight">{title}</p>
        <p className="text-sm leading-tight">{role}</p>
      </div>
      <p className="text-xl font-bold">{period}</p>
    </motion.div>
  )

  // Reset animation flag on component mount
  useEffect(() => {
    hasAnimatedRef.current = false
  }, [])

  return (
    <>
      <div className="hero">
        <motion.div
          className="w-full flex flex-col justify-center items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-3xl md:text-5xl mt-30 text-center font-extrabold"
            variants={slideUpVariants}
          >
            {t("about.hero.title")}
          </motion.h1>
        </motion.div>

        <motion.div
          className="container flex flex-col lg:flex-row justify-center gap-10 md:gap-20 items-center mx-auto mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div
            className="overflow-clip h-fit flex flex-row justify-center items-baseline rounded-t-full w-[90%] lg:w-[35%]"
            variants={scaleUpVariants}
          >
            <Image
              src={meImage}
              alt="ja fotka"
              width={2731}
              height={4096}
              className="w-full h-auto object-cover object-top aspect-square rounded-b-md "
              priority
              placeholder="blur"
            />
          </motion.div>

          <motion.div
            className="flex flex-col w-[90%] lg:max-w-[40%] h-full"
            variants={slideUpVariants}
          >
            <motion.h2
              className="text-2xl md:text-3xl font-bold"
              variants={slideUpVariants}
            >
              {t("about.about.title")}
            </motion.h2>
            <div className="h-auto grow" />
            <motion.p className="mt-10" variants={slideUpVariants}>
              {t("about.about.description")}
            </motion.p>
            <motion.p className="mt-10" variants={slideUpVariants}>
              {t("about.about.description2")}
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          className="container flex flex-col-reverse lg:flex-row justify-center gap-10 md:gap-20 items-center mx-auto mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div
            className="flex flex-col w-[90%] lg:max-w-[40%] h-full"
            variants={slideRightVariants}
          >
            <motion.h2
              className="text-2xl md:text-3xl font-bold"
              variants={slideUpVariants}
            >
              {t("about.experience.title")}
            </motion.h2>
            <div className="h-auto grow" />
            <motion.p className="mt-10" variants={slideUpVariants}>
              {t("about.experience.description")}
            </motion.p>
            <motion.p className="mt-10" variants={slideUpVariants}>
              {t("about.experience.description2")}
            </motion.p>
            <motion.p className="mt-10" variants={slideUpVariants}>
              {t("about.experience.description3")}
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
                    className="text-center mb-3 uppercase"
                    variants={slideUpVariants}
                  >
                    {item.label}
                  </motion.p>
                )}
                <TimelineCard
                  title={item.title}
                  role={item.role}
                  period={item.period}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
