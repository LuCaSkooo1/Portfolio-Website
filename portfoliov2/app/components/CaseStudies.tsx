import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "../lib/useTranslation"
import Link from "next/link"

export default function CaseStudies() {
  const { t } = useTranslation()

  return (
    <div className="w-[90%] flex flex-col md:flex-row justify-between gap-10 mt-10">
      <Link href="/navody" className="flex flex-row justify-center">
        <div className="group relative w-full max-w-md bg-white dark:bg-black dark:border dark:border-[#ffffff]/20 rounded-4xl transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer overflow-hidden">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/slovak-logo.png"
              alt="Slovak Flag Logo"
              width={600}
              height={191}
              className="flex dark:hidden"
            />
            <Image
              src="/slovak-logo-dark.png"
              alt="Slovak Flag Logo"
              width={600}
              height={191}
              className="dark:flex hidden"
            />
          </div>
          <div className="p-7">
            {/* Subheading */}
            <h3 className="text-foreground font-bold text-lg mb-4">
              navody.slovensko.sk
            </h3>

            {/* Description */}
            <p className="mb-6">{t("work.cards.subtitle")}</p>

            {/* Learn more link */}
            <div className="flex items-center text-[#325FAB] dark:text-[#3E86FF] dark:group-hover:text-[#3E86FF] font-medium group-hover:text-[#325FAB] transition-colors duration-300">
              <span className="font-grotesk">
                {t("work.cards.actionButton")}
              </span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
      <Link href="ksk" className="flex flex-row justify-center">
        <div className="group relative w-full max-w-md bg-white dark:bg-black dark:border dark:border-[#ffffff]/20 rounded-4xl transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer overflow-hidden">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/kosice-logo.png"
              alt="Kosice Region Logo"
              width={600}
              height={191}
              className="flex dark:hidden"
            />
            <Image
              src="/kosice-logo-dark.png"
              alt="Kosice Region Logo"
              width={600}
              height={191}
              className="hidden dark:flex"
            />
          </div>
          <div className="p-7">
            {/* Subheading */}
            <h3 className="text-foreground font-bold text-lg mb-4">
              Regionálny rozvojový portál
            </h3>

            {/* Description */}
            <p className="mb-6">{t("work.cards.subtitle2")}</p>

            {/* Learn more link */}
            <div className="flex items-center text-[#FFC03B] font-medium group-hover:text-[#FFC03B] transition-colors duration-300">
              <span className="font-grotesk">
                {" "}
                {t("work.cards.actionButton")}
              </span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
