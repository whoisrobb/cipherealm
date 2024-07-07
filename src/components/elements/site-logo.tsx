import { cn } from "@/lib/utils";
import Link from "next/link";
import { HTMLAttributes } from "react";

const SiteLogo = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <Link href={'/'} className={cn('font-bold text-xl', className)}>Cipherealm</Link>
  )
}

export default SiteLogo
