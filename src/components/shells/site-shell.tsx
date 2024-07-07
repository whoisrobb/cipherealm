import { ReactNode } from "react";

interface SiteShellProps {
  children: ReactNode
}

const SiteShell: React.FC<SiteShellProps> = ({ children }) => {
  return (
    <div className={"px-2 lg:px-4 grid place-items-center"}>
      <div className="w-full max-w-[1400px]">
        {children}
      </div>
    </div>
  )
}

export default SiteShell;