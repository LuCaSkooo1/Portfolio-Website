"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem } from "./ui/Carousel"
import type { CarouselApi } from "./ui/Carousel"
import { useTranslation } from "../lib/useTranslation"

interface PortfolioImage {
  id: string
  src: string
  alt?: string
  title?: string
  position: {
    top: string
    left: string
    width: string
    height: string
  }
}

const useKSKImages = (): PortfolioImage[] => {
  const { t } = useTranslation()

  return [
    {
      id: "landing-page",
      src: "/landingKSK.png",
      alt: t("work.ksk.designSolution.components.landing.subtitle"),
      title: t("work.ksk.designSolution.components.landing.title"),
      position: { top: "10%", left: "5%", width: "25%", height: "25%" },
    },
    {
      id: "logo-page",
      src: "/logoKSK.png",
      alt: t("work.ksk.designSolution.components.logo.subtitle"),
      title: t("work.ksk.designSolution.components.logo.title"),
      position: { top: "40%", left: "5%", width: "20%", height: "20%" },
    },
    {
      id: "data-page",
      src: "/dataKSK.png",
      alt: t("work.ksk.designSolution.components.data.subtitle"),
      title: t("work.ksk.designSolution.components.data.title"),
      position: { top: "5%", left: "35%", width: "30%", height: "30%" },
    },
    {
      id: "news-page",
      src: "/newsKSK.png",
      alt: t("work.ksk.designSolution.components.news.subtitle"),
      title: t("work.ksk.designSolution.components.news.title"),
      position: { top: "18%", left: "70%", width: "25%", height: "25%" },
    },
    {
      id: "maptool-page",
      src: "/maptoolKSK.png",
      alt: t("work.ksk.designSolution.components.mapTool.subtitle"),
      title: t("work.ksk.designSolution.components.mapTool.title"),
      position: { top: "40%", left: "35%", width: "30%", height: "30%" },
    },
  ]
}

const usePortfolioImages = (): PortfolioImage[] => {
  const { t } = useTranslation()

  return [
    {
      id: "form-page",
      src: "/pdf.png",
      alt: t("work.navody.designSolution.components.pdf.subtitle"),
      title: t("work.navody.designSolution.components.pdf.title"),
      position: { top: "5%", left: "5%", width: "20%", height: "40%" },
    },
    {
      id: "logo-page",
      src: "/logo2.png",
      alt: t("work.navody.designSolution.components.brand.subtitle"),
      title: t("work.navody.designSolution.components.brand.title"),
      position: { top: "50%", left: "5%", width: "20%", height: "20%" },
    },
    {
      id: "header",
      src: "/header.png",
      alt: t("work.navody.designSolution.components.header.subtitle"),
      title: t("work.navody.designSolution.components.header.title"),
      position: { top: "5%", left: "30%", width: "40%", height: "8%" },
    },
    {
      id: "main-page",
      src: "/main.png",
      alt: t("work.navody.designSolution.components.main.subtitle"),
      title: t("work.navody.designSolution.components.main.title"),
      position: { top: "18%", left: "65%", width: "30%", height: "30%" },
    },
    {
      id: "steps-page",
      src: "/guide.png",
      alt: t("work.navody.designSolution.components.steps.subtitle"),
      title: t("work.navody.designSolution.components.steps.title"),
      position: { top: "18%", left: "30%", width: "30%", height: "30%" },
    },
    {
      id: "footer",
      src: "/footer.png",
      alt: t("work.navody.designSolution.components.footer.subtitle"),
      title: t("work.navody.designSolution.components.footer.title"),
      position: { top: "55%", left: "65%", width: "30%", height: "15%" },
    },
    {
      id: "survey",
      src: "/survey.png",
      alt: t("work.navody.designSolution.components.survey.subtitle"),
      title: t("work.navody.designSolution.components.survey.title"),
      position: { top: "52%", left: "30%", width: "30%", height: "30%" },
    },
  ]
}

// Props for the gallery components
interface GalleryProps {
  images?: PortfolioImage[] | "ksk" | "portfolio"
}

// Desktop Component
function DesktopGallery({ images = "portfolio" }: GalleryProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(
    null
  )

  // Determine which images to use
  const portfolioImages = useImageSource(images)

  const handleImageClick = (image: PortfolioImage) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <>
      <div className="hidden md:block relative w-full h-screen overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
        </div>

        {/* Images */}
        {portfolioImages.map((image) => (
          <div
            key={image.id}
            className={`absolute cursor-pointer transition-all duration-500 ease-out ${
              hoveredId === image.id
                ? "z-40 scale-110 shadow-2xl"
                : hoveredId && hoveredId !== image.id
                ? "z-10 scale-95 opacity-70"
                : "z-20 hover:z-30"
            }`}
            style={image.position}
            onMouseEnter={() => setHoveredId(image.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleImageClick(image)}
          >
            <div className="relative w-full h-full group">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-lg shadow-lg border border-white/20 transition-all duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Overlay with title */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg transition-opacity duration-300 ${
                  hoveredId === image.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-sm md:text-base mb-1">
                    {image.title}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm">
                    {image.alt}
                  </p>
                </div>
              </div>

              <div
                className={`absolute -inset-1 rounded-lg blur-sm transition-opacity duration-300 ${
                  hoveredId === image.id ? "opacity-30" : "opacity-0"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      <Modal selectedImage={selectedImage} closeModal={closeModal} />
    </>
  )
}

// Mobile Carousel Component
function MobileCarousel({ images = "portfolio" }: GalleryProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(
    null
  )

  // Determine which images to use
  const portfolioImages = useImageSource(images)

  const scrollToCard = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  const handleSelect = useCallback(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
  }, [api])

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())
    api.on("select", handleSelect)

    return () => {
      api.off("select", handleSelect)
    }
  }, [api, handleSelect])

  const handleImageClick = (image: PortfolioImage) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <>
      <div className="md:hidden w-full max-w-full mx-auto px-5 py-8 flex flex-col justify-center items-center">
        <Carousel
          className="w-full"
          setApi={setApi}
          opts={{
            loop: true,
            align: "center",
            breakpoints: {
              "(min-width: 768px)": { active: false },
            },
          }}
        >
          <CarouselContent className="ml-0 -mr-4">
            {portfolioImages.map((image, index) => (
              <CarouselItem key={image.id} className="pl-0 pr-4 basis-full">
                <div className="px-2 flex justify-center">
                  <div
                    className="relative w-full h-80 cursor-pointer group"
                    onClick={() => handleImageClick(image)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover rounded-lg shadow-lg border border-white/20 transition-transform duration-300"
                      sizes="(max-width: 768px) 90vw, 80vw"
                    />

                    {/* Overlay with title - always visible on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {image.title}
                        </h3>
                        <p className="text-white/80 text-sm">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Carousel Indicators */}
        <div className="w-full flex md:hidden justify-center items-center gap-2 mt-6">
          {portfolioImages.map((_, idx) => (
            <button
              key={`dots-${idx}`}
              onClick={() => scrollToCard(idx)}
              type="button"
              className="size-2 rounded-full bg-gray-400 transition-colors dark:bg-gray-700 aria-selected:bg-[#325FAB] dark:aria-selected:bg-[#325FAB]"
              aria-selected={current === idx}
            />
          ))}
        </div>
      </div>

      <Modal selectedImage={selectedImage} closeModal={closeModal} />
    </>
  )
}

// Shared Modal Component
function Modal({
  selectedImage,
  closeModal,
}: {
  selectedImage: PortfolioImage | null
  closeModal: () => void
}) {
  if (!selectedImage) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <div
        className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-colors duration-200"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="relative w-full h-full max-w-5xl max-h-[70vh]">
          <Image
            src={selectedImage.src || "/placeholder.svg"}
            alt={selectedImage.alt}
            fill
            className="object-contain rounded-lg"
            sizes="100vw"
            priority
          />
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-center">
          <h2 className="text-white text-2xl font-bold mb-2">
            {selectedImage.title}
          </h2>
          <p className="text-white/80 text-lg">{selectedImage.alt}</p>
        </div>
      </div>
    </div>
  )
}

// Custom hook to determine image source
function useImageSource(
  images: PortfolioImage[] | "ksk" | "portfolio"
): PortfolioImage[] {
  const kskImages = useKSKImages()
  const portfolioImages = usePortfolioImages()

  if (Array.isArray(images)) {
    return images
  }

  return images === "ksk" ? kskImages : portfolioImages
}

// Main Component with configurable image source
interface PortfolioGalleryProps extends GalleryProps {
  // You can add more props here if needed
}

export function PortfolioGallery({
  images = "portfolio",
}: PortfolioGalleryProps) {
  return (
    <>
      <DesktopGallery images={images} />
      <MobileCarousel images={images} />
    </>
  )
}

// Alternative export for individual components if needed
export { DesktopGallery, MobileCarousel }
