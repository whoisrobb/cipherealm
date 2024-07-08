import { cn } from "@/lib/utils";
import { ReactNode } from "react"

interface ContentSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode,
  title: string,
  subtitle?: string,
}

const ContentShell = ({ children, title, subtitle, className }: ContentSectionProps) => {
  return (
    <div className={cn("space-y-6 min-h-[calc(100vh-5rem)] w-full my-4", className)}>
      <div className="">
        <h1 className="text-4xl font-bold capitalize">{title}</h1>
        {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

export default ContentShell;