import Image from "next/image";
import Link from "next/link";
import { SectionMeta } from "@/lib/navigation";

interface Footer2Props {
  sections: SectionMeta[];
}

const Footer2 = ({ sections }: Footer2Props) => {
  // You can hardcode logo/tagline or pass as props as well
  const logo = {
    src: "/uploads/WPCJC_logo.webp",
    alt: "Westminster Presbyterian Church in Johnson City, TN Logo",
    title: "Westminster Presbyterian Church",
    url: "https://www.wpcjc.org",
  };
  const tagline = "A church family grounded in truth and growing in Christ.";
  const copyright = "© 2025 Armstrong Web Development";

  return (
    <section className="py-16 mt-24">
      <div className="container mx-auto">
        <footer className="p-8 md:p-12 xl:p-16 bg-background rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:grid-cols-6">
            <div className="cols-1 md:col-span-2 mb-8 xl:mb-0">
              <div className="flex items-center gap-2 xl:justify-start">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-10"
                  width={40}
                  height={40}
                />
                <span className="text-md font-semibold">{logo.title}</span>
              </div>
              <p className="mt-4 text-sm font-bold">{tagline}</p>
            </div>
            {sections.map((section) => (
              <div key={section.slug} className="min-w-0">
                <span className="font-semibold break-words">{section.title}</span>
                <ul className="space-y-4 text-muted-foreground">
                  {section.pages.map((page) => (
                    <li key={page.url} className="text-sm">
                      <Link href={page.url} className="text-sm hover:text-primary">
                        {page.title}
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
              width={250}
              height={250}
            />
            <p className="text-center">{copyright}</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
