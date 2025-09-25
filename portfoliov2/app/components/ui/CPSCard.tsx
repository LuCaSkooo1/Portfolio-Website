// CPSCard.tsx
import { useTranslation } from "@/app/lib/useTranslation"
import { HandCoins, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"

interface ProjectCardProps {
  variant: "client" | "problem" | "solution"
  title?: string
  description?: string
  actionText?: string
  actionHref?: string
  clientColor?: "blue" | "yellow" // NEW: only applies when variant is "client"
}

const iconMap = {
  client: HandCoins,
  problem: AlertTriangle,
  solution: CheckCircle,
}

const clientColorMap = {
  blue: {
    iconBg: "bg-[#E2EDFF] dark:bg-blue-900/20",
    iconColor: "text-[#325FAB] dark:text-blue-400",
  },
  yellow: {
    iconBg: "bg-[#FFF2D6] dark:bg-yellow-900/20",
    iconColor: "text-[#F59E0B] dark:text-yellow-400",
  },
}

const colorMap = {
  problem: {
    iconBg: "bg-red-100 dark:bg-red-900/20",
    iconColor: "text-red-600 dark:text-red-400",
  },
  solution: {
    iconBg: "bg-green-100 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
  },
}

export function CPSCard({
  variant,
  title,
  description,
  actionText,
  actionHref,
  clientColor = "blue", // default for client
}: ProjectCardProps) {
  const Icon = iconMap[variant]
  const colors =
    variant === "client" ? clientColorMap[clientColor] : colorMap[variant]

  const { t } = useTranslation()

  return (
    <div className="bg-white dark:bg-black dark:border dark:border-white/20 rounded-3xl p-8 flex flex-col h-full">
      <div
        className={`w-16 h-16 ${colors.iconBg} rounded-2xl flex items-center justify-center mb-6`}
      >
        <Icon className={`w-8 h-8 ${colors.iconColor}`} />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
        {description}
      </p>

      {actionText && actionHref ? (
        <div className="mt-auto">
          <a
            href={actionHref}
            target="_blank"
            className="flex items-center text-green-600 dark:text-green-400 font-medium group transition-all duration-300"
          >
            <span className="font-grotesk">{actionText}</span>
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
          </a>
        </div>
      ) : null}
    </div>
  )
}
