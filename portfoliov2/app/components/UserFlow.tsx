import { ArrowRight } from "lucide-react"

export interface StepItem {
  title?: string
  desc?: string
  color?: string
  icon?: string | React.ReactNode
}

export default function Steps({
  list,
  base_color = "#325BAF",
}: {
  list: StepItem[]
  base_color?: string
}) {
  return (
    <div className="w-full px-4">
      <div className="w-[90%] mx-auto flex flex-col items-center justify-center gap-4 py-6 lg:flex-row">
        {list.map((v, idx) => (
          <div
            key={`step-${idx}`}
            className="flex w-auto flex-col items-center justify-center gap-10 lg:gap-0 lg:flex-row"
          >
            <div
              style={
                { "--icon-bg": v.color ?? base_color } as React.CSSProperties
              }
              className="flex w-fit flex-col items-center justify-center gap-2 text-center lg:w-[17vw]"
            >
              <div className="flex aspect-square size-16 w-fit items-center justify-center rounded-full bg-[var(--icon-bg)]/10 dark:bg-[var(--icon-bg)]/30 p-1 text-2xl text-[var(--icon-bg)] [&_svg]:size-7">
                {v.icon}
              </div>
              <div className="flex flex-col gap-0 leading-tight">
                <p className="font-bold text-foreground">{v.title}</p>
                <p>{v.desc}</p>
              </div>
            </div>
            {idx + 1 !== list.length && (
              <>
                <ArrowRight className="min-w-4 rotate-90 lg:rotate-0" />
                <div />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
