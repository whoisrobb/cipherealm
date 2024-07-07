"use client";

import React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useSiteConfig } from "../_config/useSiteConfig";
  

const NavElement = () => {
    const { siteConfig } = useSiteConfig();
  return (
    <div className="hidden lg:block">
        {siteConfig &&
        <NavigationMenu>
          <NavigationMenuList>
              <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-muted-foreground text-lg">{siteConfig!.siteNav.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <li className="row-span-3">
                              <NavigationMenuLink asChild>
                              <a
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                  href="/"
                              >
                                  <div className="mb-2 mt-4 text-lg font-medium">
                                      {siteConfig!.name}
                                  </div>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                      {siteConfig!.description}
                                  </p>
                              </a>
                              </NavigationMenuLink>
                          </li>
                          {siteConfig && siteConfig.siteNav.items.map((component) => (
                              <ListItem
                                  key={component.title}
                                  title={component.title}
                                  href={component.href}
                              >
                                  {component.description}
                              </ListItem>
                          ))}
                      </ul>
                  </NavigationMenuContent>
              </NavigationMenuItem>

              {siteConfig && siteConfig.mainNav.map((nav, index) => (
              <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger className="text-muted-foreground text-lg capitalize">{nav.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                          {nav.items.map((component) => (
                              <ListItem
                                  key={component.title}
                                  title={component.title}
                                  href={component.href}
                              >
                                  {component.description}
                              </ListItem>
                          ))}
                      </ul>
                  </NavigationMenuContent>
              </NavigationMenuItem>))}

          </NavigationMenuList>
      </NavigationMenu>}
    </div>
  )
}

export default NavElement;


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"