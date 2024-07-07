"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useSiteConfig } from "@/app/(storefront)/_config/useSiteConfig";
import Link from "next/link";
import { useState } from "react";


export const dashboardNavConfig = [
  {
    title: 'account',
    href: '/dashboard/account'
  },
  {
    title: 'site',
    href: '/dashboard/site'
  },
  {
    title: 'stores',
    href: '/dashboard/stores'
  },
  {
    title: 'blog',
    href: '/dashboard/blog'
  },
]

const MobileNav = () => {
  const { siteConfig } = useSiteConfig();
  const [isOpen, setIsOpen] = useState(false);

return (
  <div className="lg:hidden">
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Button variant={'outline'} size={'icon'}><HamburgerMenuIcon /></Button>
      </SheetTrigger>

      {siteConfig &&
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{siteConfig!.name}</SheetTitle>
            <SheetDescription>
            </SheetDescription>
          </SheetHeader>
          <div className="h-[calc(100vh-4rem)] overflow-y-scroll overflow-x-hidden">
            <Accordion type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger className="capitalize text-secondary-foreground">{siteConfig!.siteNav.title}</AccordionTrigger>
                {siteConfig!.siteNav.items.map((nav, index) => (
                <div className="" key={index}>
                  <AccordionContent>
                    <Link href={nav.href} onClick={() => setIsOpen(false)} className="text-muted-foreground focus:text-secondary-foreground">
                      {nav.title}
                    </Link>
                  </AccordionContent>
                </div>))}
              </AccordionItem>

              <AccordionItem value="item-2" className="md:hidden">
                <AccordionTrigger className="capitalize text-secondary-foreground">my account</AccordionTrigger>
                {dashboardNavConfig.map((nav) => (
                  <AccordionContent key={nav.title}>
                    <Link href={nav.href} onClick={() => setIsOpen(false)} className="text-muted-foreground focus:text-secondary-foreground capitalize">
                      {nav.title}
                    </Link>
                  </AccordionContent>
                ))}
              </AccordionItem>

              {siteConfig!.mainNav.map((nav, index) => (
              <AccordionItem value={`item-${index+3}`} key={index}>
                <AccordionTrigger className="capitalize text-secondary-foreground">{nav.title}</AccordionTrigger>
                {nav.items.map((nav, index) => (
                <div className="" key={index}>
                  <AccordionContent>
                    <Link href={nav.href} onClick={() => setIsOpen(false)} className="text-muted-foreground focus:text-secondary-foreground">
                      {nav.title}
                    </Link>
                  </AccordionContent>
                </div>))}
              </AccordionItem>))}
            </Accordion>
          </div>
        </SheetContent>}
      </Sheet>
  </div>
)
}

export default MobileNav;