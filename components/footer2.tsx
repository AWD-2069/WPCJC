import footerData from "@/content/navigation_links.json";
import Link from "next/link";
import Image from "next/image";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

const Footer2 = () => {
  const { logo, tagline, menuItems, copyright } = footerData;

  return (
    <section className="py-16 mt-24">
      <div className="container mx-auto">
        <footer className="p-8 md:p-12 xl:p-16 bg-background rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 xl:grid-cols-6">
            <div className="col-span-2 mb-8 xl:mb-0">
              <div className="flex items-center gap-2 xl:justify-start">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-10"
                  width={40}
                  height={40}
                />
                <h2 className="text-xl font-semibold">{logo.title}</h2>
              </div>
              <p className="mt-4 font-bold">{tagline}</p>
            </div>
            {menuItems.map((section: MenuItem, sectionIdx: number) => (
              <div key={sectionIdx} className="min-w-0">
                <h3 className="font-semibold break-words">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium">
                      <Link href={link.url} className="hover:text-primary">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-24 flex flex-col items-center gap-2 border-t pt-8 text-xl font-medium text-muted-foreground">
            <Image
              src="/uploads/AWD_logo.webp"
              alt="Armstrong Web Development Logo"
              width={150}
              height={150}
            />
            <p className="text-center">{copyright}</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
