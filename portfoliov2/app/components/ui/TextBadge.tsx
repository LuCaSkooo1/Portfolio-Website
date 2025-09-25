import type React from "react"
import { cn } from "../../lib/utils"

interface TextBadgeProps {
  children: React.ReactNode
  className?: string
  variant?: "blue" | "yellow"
}

export function TextBadge({
  children,
  className,
  variant = "blue",
}: TextBadgeProps) {
  const variants = {
    blue: "bg-[#E2EDFF] text-[#325FAB] border border-[#325FAB] dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-300",
    yellow:
      "bg-[#FFF2D6] text-[#F59E0B] border border-[#F59E0B] dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-300",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-5 py-1 rounded-full text-sm font-medium font-grotesk",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
