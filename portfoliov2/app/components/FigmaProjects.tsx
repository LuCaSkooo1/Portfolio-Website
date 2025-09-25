import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "../lib/useTranslation"
import Link from "next/link"

export default function FigmaProjects() {
  const { t } = useTranslation()

  return (
    <div className="w-[90%] lg:w-[842px] flex flex-col md:flex-row justify-between gap-10 mt-10">
      <Link
        href="https://www.figma.com/design/TuJ4kLxLiYKRT4YeU3MGiy/Traffi?node-id=18-56&t=GajlKCG9XNdzg32v-1"
        target="_blank"
        className="flex flex-row justify-center"
      >
        <div className="group relative w-full max-w-md bg-white dark:bg-black dark:border dark:border-[#ffffff]/20 rounded-4xl transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer overflow-hidden">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/traffi.png"
              alt="traffi Logo"
              width={600}
              height={191}
              className="flex dark:hidden"
            />
            <Image
              src="/traffiDark.png"
              alt="traffi Logo"
              width={600}
              height={191}
              className="dark:flex hidden"
            />
          </div>
          <div className="p-7">
            <div className="flex items-center text-[#c32828] dark:text-[#c32828] dark:group-hover:text-[#c32828] font-medium group-hover:text-[#c32828] transition-colors duration-300">
              <span className="font-grotesk">{t("work.openFigma")}</span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
      <Link
        href="https://www.figma.com/design/NgadmsNlY1sW83W2QOERUE/Sportuj-too?node-id=0-1&t=zTqemJCsg8gCNQZX-1"
        className="flex flex-row justify-center"
        target="_blank"
      >
        <div className="group relative w-full max-w-md bg-white dark:bg-black dark:border dark:border-[#ffffff]/20 rounded-4xl transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer overflow-hidden">
          <div className="flex justify-center">
            <Image
              src="/sportujToo.png"
              alt="sportuj too logo"
              width={600}
              height={191}
              className="flex dark:hidden"
            />
            <Image
              src="/sportujTooDark.png"
              alt="sportuj too logo"
              width={600}
              height={191}
              className="dark:flex hidden"
            />
          </div>
          <div className="p-7">
            <div className="flex items-center text-[#03b303] dark:text-[#03b303] font-medium transition-colors duration-300">
              <span className="font-grotesk">{t("work.openFigma")}</span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
      <Link
        href="https://www.figma.com/design/PA67GfL3BIYikQXtxB99OI/Incomodum-app?node-id=0-1&t=yZ7egJvf04AXZkYV-1"
        target="_blank"
        className="flex flex-row justify-center"
      >
        <div className="group relative w-full max-w-md bg-white dark:bg-black dark:border dark:border-[#ffffff]/20 rounded-4xl transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer overflow-hidden">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/incomodumApp.png"
              alt="incomodum logo"
              width={600}
              height={191}
              className="flex dark:hidden"
            />
            <Image
              src="/incomodumAppDark.png"
              alt="incomodum logo"
              width={600}
              height={191}
              className="hidden dark:flex"
            />
          </div>
          <div className="p-7">
            {/* Subheading */}

            {/* Learn more link */}
            <div className="flex items-center text-[#FFC03B] font-medium group-hover:text-[#FFC03B] transition-colors duration-300">
              <span className="font-grotesk"> {t("work.openFigma")}</span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
