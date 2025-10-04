"use client"
import { FileUser, Mail } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTranslation } from "../lib/useTranslation"

export default function Footer() {
  const { lang, t } = useTranslation()
  return (
    <div className="w-full flex flex-row justify-center">
      <div className="flex flex-col justify-center">
        <motion.footer
          className="flex flex-row justify-between items-center p-5 w-[375px] mx-auto mt-10 md:mt-20 text-black dark:text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            {
              href: "https://github.com/LuCaSkooo1",
              icon: (
                <>
                  <Image
                    src="/github-mark.svg"
                    alt="GitHub Logo"
                    width={24}
                    height={24}
                    className="dark:hidden"
                  />
                  <Image
                    src="/github-mark-white.svg"
                    alt="GitHub Logo"
                    width={24}
                    height={24}
                    className="hidden dark:block"
                  />
                </>
              ),
            },
            {
              href: "https://linkedin.com/in/lucas-ligas-a6632b282/",
              icon: (
                <>
                  <Image
                    src="/InBug-Black.png"
                    alt="LinkedIn Logo"
                    width={24}
                    height={24}
                    className="dark:hidden"
                  />
                  <Image
                    src="/InBug-White.png"
                    alt="LinkedIn Logo"
                    width={24}
                    height={24}
                    className="hidden dark:block"
                  />
                </>
              ),
            },
            {
              href: t("cv.path") || "/cv_en_web.pdf", // fallback
              icon: <FileUser size={24} />,
            },
            { href: "mailto:lucasligas15@gmail.com", icon: <Mail size={24} /> },
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:scale-110 transition-all duration-300"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              {item.icon}
            </motion.a>
          ))}
        </motion.footer>

        <motion.p
          className="text-center mt-10 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          made by Lucas.
        </motion.p>
      </div>
    </div>
  )
}
