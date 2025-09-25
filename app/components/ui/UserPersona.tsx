import { useTranslation } from "../../lib/useTranslation"

interface UserPersonaProps {
  variant: "investor" | "couple" | "eldery"
  title?: string
  description?: string
  age?: string
  painpoints?: string
  goals?: string
  needs?: string // NEW: only applies when variant is "client"
}

const iconMap = {
  investor: "💼",
  couple: "🤵🏼👰🏼‍♀️",
  eldery: "👵🏼",
}

const colorMap = {
  investor: {
    iconBg: "bg-[#EFDFD2] dark:bg-[#B29782]/30",
  },
  couple: {
    iconBg: "bg-[#EDEDED] dark:bg-[#949494]/30",
  },
  eldery: {
    iconBg: "bg-[#FFFCC4]",
  },
}

export function UserPersona({
  variant,
  title,
  description,
  age,
  needs,
  painpoints,
  goals,
}: UserPersonaProps) {
  const Icon = iconMap[variant]
  const colors = colorMap[variant]
  const { t } = useTranslation()

  return (
    <div className="bg-white dark:bg-black dark:border dark:border-white/20 flex grow flex-col rounded-3xl w-full p-8 h-full">
      <div
        className={`w-16 h-16 ${colors.iconBg} rounded-2xl flex items-center justify-center mb-6`}
      >
        <p className="text-2xl">{Icon}</p>
      </div>

      <h3 className="text-2xl font-bold text-foreground w-fit">{title} </h3>

      <p className="mt-5 min-w-0 w-fit">{description}</p>
      <div className="text-foreground leading-loose mt-5 *:min-w-0">
        <p>
          <span className="font-bold">{t("work.attributes.att1")}</span>
          {age}
        </p>
        <p>
          <span className="font-bold">{t("work.attributes.att2")}</span>
          {needs}
        </p>
        <p>
          <span className="font-bold">{t("work.attributes.att3")}</span>
          {painpoints}
        </p>
        <p>
          <span className="font-bold">{t("work.attributes.att4")}</span>
          {goals}
        </p>
      </div>
      <div className="h-auto flex-grow" />
    </div>
  )
}
