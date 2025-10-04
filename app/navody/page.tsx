"use client"

import { TextBadge } from "../components/ui/TextBadge"
import { CPSCard } from "../components/ui/CPSCard"
import { UserPersona } from "../components/ui/UserPersona"
import { useTranslation } from "../lib/useTranslation"
import {
  ArrowRight,
  CircleCheck,
  ClipboardListIcon,
  House,
  MapPin,
  Users,
} from "lucide-react"
import Steps from "../components/UserFlow"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../components/ui/Carousel"
import { useEffect, useState } from "react"
import { PortfolioGallery } from "../components/GalleryNavody"

export default function Home() {
  const [api, setApi] = useState<CarouselApi>()
  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  function scrollToCard(idx: number) {
    api?.scrollTo(idx)
  }

  const UserFlow = [
    {
      title: t("work.navody.userFlow.step1.title"),
      desc: t("work.navody.userFlow.step1.subtitle"),
      icon: <House />,
    },
    {
      title: t("work.navody.userFlow.step2.title"),
      desc: t("work.navody.userFlow.step2.subtitle"),
      icon: <ClipboardListIcon />,
    },
    {
      title: t("work.navody.userFlow.step3.title"),
      desc: t("work.navody.userFlow.step3.subtitle"),
      icon: <MapPin />,
    },
    {
      title: t("work.navody.userFlow.step4.title"),
      desc: t("work.navody.userFlow.step4.subtitle"),
      icon: <CircleCheck />,
      color: "#369F32",
    },
  ]

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="hero hero-guides">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl md:text-5xl mt-30 text-center font-extrabold w-[95%] leading-normal">
              {t("work.navody.hero.title")}
            </h1>
            <p className="font-light mt-5 md:mt-10 w-[90%] lg:w-[40%] text-center">
              {t("work.navody.hero.subtitle")}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-5 px-5">
            <TextBadge variant="blue">
              {t("work.navody.textBadges.type")}
            </TextBadge>
            <TextBadge variant="blue">
              {t("work.navody.textBadges.live")}
            </TextBadge>
            <TextBadge variant="blue">
              {t("work.navody.textBadges.duration")}
            </TextBadge>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch mt-15 px-5">
            <div className="w-full lg:max-w-[25%]">
              <CPSCard
                clientColor="blue"
                variant="client"
                title={t("work.navody.CPSCards.client.title")}
                description={t("work.navody.CPSCards.client.description")}
                clientHref="https://mirri.gov.sk/"
              />
            </div>
            <div className="w-full lg:max-w-[25%]">
              <CPSCard
                variant="problem"
                title={t("work.navody.CPSCards.problem.title")}
                description={t("work.navody.CPSCards.problem.description")}
              />
            </div>
            <div className="w-full lg:max-w-[25%]">
              <CPSCard
                variant="solution"
                title={t("work.navody.CPSCards.solution.title")}
                description={t("work.navody.CPSCards.solution.description")}
                actionText={t("work.actionButton")}
                actionHref="https://navody.slovensko.sk/en"
              />
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mt-40">
          {t("work.roleTitle")}
        </h2>
        <div className="flex flex-wrap gap-2 justify-center mt-5 px-5">
          <TextBadge variant="blue">Frontend developer</TextBadge>
          <TextBadge variant="blue">UX Researcher</TextBadge>
          <TextBadge variant="blue">Lead Idea Creator</TextBadge>
        </div>
        <div className="text-center lg:w-[50%] mt-5 px-5">
          <p>{t("work.navody.role.description1")}</p>
          <br />
          <p>{t("work.navody.role.description2")}</p>
          <br /> <p>{t("work.navody.role.description3")}</p>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mt-40">
          {t("work.navody.research.title")}
        </h2>
        <p className="flex flex-row gap-1 mt-5">
          <Users className="text-[#325FAB] dark:text-blue-300" />
          {t("work.navody.research.subtitle")}
        </p>
        <div className="flex flex-col lg:flex-row gap-5 mt-10 justify-center items-center lg:items-baseline px-5">
          <div className="bg-[#E2EDFF] text-[#325FAB] border border-[#325FAB] dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-300 rounded-2xl w-full md:max-w-[50%] lg:max-w-[30%] p-5">
            <p>
              "{t("work.navody.research.answer")}"
              <br />
              <br /> {t("work.navody.research.name")}
            </p>
          </div>
          <ul className="leading-loose font-grotesk">
            <li> {t("work.navody.research.bulletPoint1")}</li>
            <li>{t("work.navody.research.bulletPoint2")}</li>
            <li>{t("work.navody.research.bulletPoint3")}</li>
          </ul>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mt-40">
          {t("work.userPersonaTitle")}
        </h2>
        <Carousel
          className="mt-10 w-full"
          setApi={setApi}
          opts={{
            loop: true,
            breakpoints: {
              "(min-width: 768px)": { active: false },
            },
          }}
        >
          <CarouselContent className="ml-0 md:justify-center">
            <CarouselItem className="pl-0 md:basis-1/2 flex justify-center md:max-w-[600px] items-center">
              <div className="px-5 flex h-full">
                <UserPersona
                  variant="investor"
                  title={t("work.navody.userPersonas.persona1.title")}
                  description={t("work.navody.userPersonas.persona1.subtitle")}
                  age={t("work.navody.userPersonas.persona1.age")}
                  needs={t("work.navody.userPersonas.persona1.needs")}
                  painpoints={t("work.navody.userPersonas.persona1.painPoints")}
                  goals={t("work.navody.userPersonas.persona1.goals")}
                />
              </div>
            </CarouselItem>
            <CarouselItem className="pl-0 md:basis-1/2 flex justify-center md:max-w-[600px] items-center">
              <div className="px-5 flex h-full">
                <UserPersona
                  variant="couple"
                  title={t("work.navody.userPersonas.persona2.title")}
                  description={t("work.navody.userPersonas.persona2.subtitle")}
                  age={t("work.navody.userPersonas.persona2.age")}
                  needs={t("work.navody.userPersonas.persona2.needs")}
                  painpoints={t("work.navody.userPersonas.persona2.painPoints")}
                  goals={t("work.navody.userPersonas.persona2.goals")}
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <div className="w-full flex md:hidden justify-center items-center gap-2 mt-4">
          {new Array(2).fill(0).map((_, idx) => (
            <button
              key={`dots-${idx}`}
              onClick={() => scrollToCard(idx)}
              type="button"
              className="size-2 rounded-full bg-gray-400 transition-colors dark:bg-gray-700 aria-selected:bg-[#325FAB] dark:aria-selected:bg-[#325FAB]"
              aria-selected={current === idx}
            />
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mt-40">
          {t("work.userFlowTitle")}
        </h2>
        <div className="mt-10">
          <Steps list={UserFlow} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mt-40">
          {t("work.designSolutionTitle")}
        </h2>
        <p className="text-center mt-5 px-5">
          {t("work.navody.designSolution.subtitle")}
          <a
            href="https://idsk.gov.sk/"
            target="_blank"
            className="text-blue-500 underline"
          >
            {t("work.navody.designSolution.link")}
          </a>
        </p>
        <PortfolioGallery />
        <h2 className="text-2xl md:text-3xl font-bold">
          {t("work.reflectionTitle")}
        </h2>

        <ul className="font-grotesk mt-10 md:w-fit px-10">
          <li className="flex flex-row gap-1 mb-3">
            <span>• </span>
            <p>{t("work.navody.reflection.bulletPoint1")}</p>
          </li>
          <li className="flex flex-row gap-1 mb-3">
            <span>• </span>
            <p>{t("work.navody.reflection.bulletPoint2")}</p>
          </li>
          <li className="flex flex-row gap-1 mb-3">
            <span>• </span>
            <p>{t("work.navody.reflection.bulletPoint3")}</p>
          </li>
        </ul>
        <a
          href="https://navody.slovensko.sk/en"
          target="_blank"
          className="w-full flex flex-row justify-center items-center"
        >
          <button className="justify-center w-[90%] md:w-fit cursor-pointer mt-10 px-5 py-3 bg-[#325FAB] text-white rounded-full font-grotesk flex-row flex gap-1.5 hover:gap-3 transition-all duration-300 items-center">
            {t("work.actionButton")}
            <ArrowRight className="size-4" />
          </button>
        </a>
      </div>
    </div>
  )
}
