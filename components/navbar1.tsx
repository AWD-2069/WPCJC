import Image from "next/image";
import { Menu } from "lucide-react";
import navigationData from "@/content/navigation_links.json";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SubLink {
  text: string;
  url: string;
}

interface MenuSection {
  title: string;
  links: SubLink[];
}

const Navbar1 = () => {
  const { logo, menuItems } = navigationData;

  return (
    <section className="py-4">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <Image src={logo.src} className="max-h-8" alt={logo.alt} />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menuItems.map((section: MenuSection) =>
                    section.links && section.links.length > 0 ? (
                      <NavigationMenuItem key={section.title}>
                        <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-popover text-popover-foreground">
                          {section.links.map((link) => (
                            <NavigationMenuLink
                              asChild
                              key={link.text}
                              className="w-80"
                            >
                              <a
                                className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
                                href={link.url}
                              >
                                <div>
                                  <div className="text-sm font-semibold">{link.text}</div>
                                </div>
                              </a>
                            </NavigationMenuLink>
                          ))}
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    ) : null
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <Image src={logo.src} className="max-h-8" alt={logo.alt} />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <Image src={logo.src} className="max-h-8" alt={logo.alt} />
                      <span className="text-lg font-semibold tracking-tighter">
                        {logo.title}
                      </span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menuItems.map((section: MenuSection) =>
                      section.links && section.links.length > 0 ? (
                        <AccordionItem key={section.title} value={section.title} className="border-b-0">
                          <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                            {section.title}
                          </AccordionTrigger>
                          <AccordionContent className="mt-2">
                            {section.links.map((link) => (
                              <a
                                key={link.text}
                                href={link.url}
                                className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground text-sm font-semibold"
                              >
                                {link.text}
                              </a>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ) : null
                    )}
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar1 };
