import Image from "next/image";
import { Menu } from "lucide-react";
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
import { SectionMeta } from "@/lib/navigation";

interface Navbar1Props {
  sections: SectionMeta[];
  logo?: {
    src: string;
    alt: string;
    title: string;
    url: string;
  };
}

const defaultLogo = {
  src: "/uploads/WPCJC_logo.webp",
  alt: "Westminster Presbyterian Church in Johnson City, TN Logo",
  title: "Westminster Presbyterian Church",
  url: "https://www.wpcjc.org",
};

const Navbar1 = ({ sections, logo = defaultLogo }: Navbar1Props) => {
  return (
    <header className="py-4">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                className="max-h-8"
                alt={logo.alt}
                width={40}
                height={40}
                style={{ width: 40, height: 40, objectFit: "contain" }}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {sections.map((section) =>
                    section.pages && section.pages.length > 0 ? (
                      <NavigationMenuItem key={section.slug}>
                        <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-popover text-popover-foreground">
                          {section.pages.map((page) => (
                            <NavigationMenuLink
                              asChild
                              key={page.url}
                              className="w-80"
                            >
                              <a
                                className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
                                href={page.url}
                              >
                                <div>
                                  <div className="text-sm font-semibold">{page.title}</div>
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
              <Image
                src={logo.src}
                className="max-h-8"
                alt={logo.alt}
                width={40}
                height={40}
                style={{ width: 40, height: 40, objectFit: "contain" }}
              />
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
                      <Image
                        src={logo.src}
                        className="max-h-8"
                        alt={logo.alt}
                        width={40}
                        height={40}
                        style={{ width: 40, height: 40, objectFit: "contain" }}
                      />
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
                    {sections.map((section) =>
                      section.pages && section.pages.length > 0 ? (
                        <AccordionItem key={section.slug} value={section.slug} className="border-b-0">
                          <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                            {section.title}
                          </AccordionTrigger>
                          <AccordionContent className="mt-2">
                            {section.pages.map((page) => (
                              <a
                                key={page.url}
                                href={page.url}
                                className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground text-sm font-semibold"
                              >
                                {page.title}
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
    </header>
  );
};

export { Navbar1 };
