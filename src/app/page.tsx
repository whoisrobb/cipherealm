import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <>
    {process.env.DATABASE_URL}
      <ModeToggle />
    </>
  );
}
