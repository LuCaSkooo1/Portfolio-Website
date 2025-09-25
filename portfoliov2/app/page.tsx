"use client"

import CaseStudies from "./components/CaseStudies"
import { useTranslation } from "./lib/useTranslation"
import { motion } from "framer-motion"
import FigmaProjects from "./components/FigmaProjects"

export default function Home() {
  const { t } = useTranslation()

  return (
    <div>
      <motion.div
        className="hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full flex flex-col justify-center items-center">
          <motion.h1
            className="text-3xl md:text-5xl mt-30 text-center font-extrabold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("work.hero.title")}
            <br />
            {t("work.hero.title2")}
          </motion.h1>

          <motion.p
            className="font-light mt-5 md:mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t("work.hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-row justify-center"
          >
            <CaseStudies />
          </motion.div>
        </div>
      </motion.div>
      <div className="w-full flex-col flex justify-center items-center mt-20">
        <motion.h1
          className="text-2xl md:text-3xl font-bold mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t("work.otherProjects")}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-row justify-center"
        >
          <FigmaProjects />
        </motion.div>
      </div>
    </div>
  )
}
