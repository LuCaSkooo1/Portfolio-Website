"use client"
import { TextBadge } from "../components/ui/TextBadge"
import { CPSCard } from "../components/ui/CPSCard"

import { useTranslation } from "../lib/useTranslation"
import {
  ArrowRight,
  CircleCheck,
  MapPin,
  MessageCircle,
  Search,
  User,
  Users,
} from "lucide-react"
import Steps from "../components/UserFlow"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../components/ui/Carousel"
import { UserPersona } from "../components/ui/UserPersona"
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
      title: t("work.ksk.userFlow.step1.title"),
      desc: t("work.ksk.userFlow.step1.subtitle"),
      icon: <Search />,
    },
    {
      title: t("work.ksk.userFlow.step2.title"),
      desc: t("work.ksk.userFlow.step2.subtitle"),
      icon: <MapPin />,
    },
    {
      title: t("work.ksk.userFlow.step2.title"),
      desc: t("work.ksk.userFlow.step2.subtitle"),
      icon: <MessageCircle />,
    },
    {
      title: t("work.ksk.userFlow.step2.title"),
      desc: t("work.ksk.userFlow.step2.subtitle"),
      icon: <CircleCheck />,
      color: "#369F32",
    },
  ]

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="hero hero-ksk">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl md:text-5xl mt-30 text-center font-extrabold w-[95%] leading-normal">
              {t("work.ksk.hero.title")}
            </h1>
            <p className="font-light mt-5 md:mt-10 w-[90%] lg:w-[40%] text-center">
              {t("work.ksk.hero.subtitle")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mt-5 px-5">
            <TextBadge variant="yellow">
              {t("work.ksk.textBadges.type")}
            </TextBadge>
            <TextBadge variant="yellow">
              {t("work.ksk.textBadges.live")}
            </TextBadge>
            <TextBadge variant="yellow">
              {t("work.ksk.textBadges.duration")}
            </TextBadge>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch mt-15 px-5">
            <div className="w-full lg:max-w-[25%]">
              <CPSCard
                clientColor="yellow"
                variant="client"
                title={t("work.ksk.CPSCards.client.title")}
                description={t("work.ksk.CPSCards.client.description")}
              />
            </div>
            <div className="w-full lg:max-w-[25%]">
              <CPSCard
                variant="problem"
                title={t("work.ksk.CPSCards.problem.title")}
                description={t("work.ksk.CPSCards.problem.description")}
              />
            </div>
            <div className="w-full lg:max-w-[25%]">
              <CPSCard
                variant="solution"
                title={t("work.ksk.CPSCards.solution.title")}
                description={t("work.ksk.CPSCards.solution.description")}
                // actionText={t("work.actionButton")}
                // actionHref="#"
              />
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mt-20">
          {t("work.roleTitle")}
        </h2>
        <div className="flex flex-wrap gap-2 justify-center mt-5 px-5">
          <TextBadge variant="yellow">Product Designer</TextBadge>
          <TextBadge variant="yellow">UX Consultant</TextBadge>
          <TextBadge variant="yellow">Lead Idea Creator</TextBadge>
        </div>
        <p className="text-center md:w-[30%] mt-5 px-5">
          {t("work.ksk.role.description1")}
          <br /> <br />
          {t("work.ksk.role.description2")}
          <br /> <br />
          {t("work.ksk.role.description3")}
        </p>
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
                  title={t("work.ksk.userPersonas.persona2.title")}
                  description={t("work.ksk.userPersonas.persona2.subtitle")}
                  age="40–60"
                  needs={t("work.ksk.userPersonas.persona2.needs")}
                  painpoints={t("work.ksk.userPersonas.persona2.painPoints")}
                  goals={t("work.ksk.userPersonas.persona2.goals")}
                />
              </div>
            </CarouselItem>
            <CarouselItem className="pl-0 md:basis-1/2 flex justify-center md:max-w-[600px] items-center">
              <div className="px-5 flex h-full">
                <UserPersona
                  variant="investor"
                  title={t("work.ksk.userPersonas.persona1.title")}
                  description={t("work.ksk.userPersonas.persona1.subtitle")}
                  age="40–60"
                  needs={t("work.ksk.userPersonas.persona1.needs")}
                  painpoints={t("work.ksk.userPersonas.persona1.painPoints")}
                  goals={t("work.ksk.userPersonas.persona1.goals")}
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
              className="size-2 rounded-full bg-gray-400 transition-colors dark:bg-gray-700 aria-selected:bg-[#F59E0B] dark:aria-selected:bg-[#F59E0B"
              aria-selected={current === idx}
            />
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mt-40">
          {t("work.userFlowTitle")}
        </h2>
        <div className="mt-10">
          <Steps base_color="#F59E0B" list={UserFlow} />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mt-40">
          {t("work.designSolutionTitle")}
        </h2>
        <p className="text-center mt-5 px-5">
          {t("work.navody.designSolution.subtitle")}
        </p>
        <PortfolioGallery images="ksk" />
        <h2 className="text-2xl md:text-3xl font-bold">
          {t("work.reflectionTitle")}
        </h2>
        <ul className="font-grotesk mt-10 md:w-[50%] px-5">
          <li className="flex flex-row gap-1 mb-3">
            <span>• </span>
            <p>{t("work.ksk.reflection.bulletPoint1")}</p>
          </li>
          <li className="flex flex-row gap-1 mb-3">
            <span>• </span>
            <p>{t("work.ksk.reflection.bulletPoint2")}</p>
          </li>
          <li className="flex flex-row gap-1 mb-3">
            <span>• </span>
            <p>{t("work.ksk.reflection.bulletPoint3")}</p>
          </li>
          <li className="flex flex-row gap-1 mb-3">
            <span>• </span>
            <p>{t("work.ksk.reflection.bulletPoint4")}</p>
          </li>
        </ul>
        {/* <button className="justify-center w-[90%] md:w-fit cursor-pointer mt-10 px-5 py-3 bg-[#F59E0B] text-white rounded-full font-grotesk flex-row flex gap-1.5 hover:gap-3 transition-all duration-300 items-center">
          {t("work.actionButton")}
          <ArrowRight className="size-4" />
        </button> */}
      </div>
    </div>
  )
}
