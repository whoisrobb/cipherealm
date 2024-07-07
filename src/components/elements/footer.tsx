import Link from "next/link";
import { ModeToggle } from "../themes/mode-toggle";

const Footer = () => {
  return (
    <div className="w-full flex justify-between border-t py-2 max-h-24">
        <div className="lg:flex lg:items-center gap-2">
          <p>Built by <Link href={'#'} className="underline" target="_blank">Robbie</Link>.</p>
          <p>Source code available on <Link href={'https://github.com/whoisrobb/cipherealm'} target="_blank" className="underline">GitHub</Link>.</p>
        </div>
        <ModeToggle />
    </div>
  )
}

export default Footer;