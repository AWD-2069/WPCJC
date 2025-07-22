import Link from "next/link";
import Image from "next/image";
import { getSections, getPages } from "@/lib/content"; // Use the same helpers as navbar

interface Section {
  title: string;
  order?: number;
  description?: string;
}

interface Page {
  title: string;
  slug: string;
  section?: string;
}

const Footer2 = async () => {
  // Fetch sections and pages
  const sections: Section[] = await getSections();
  const pages: Page[] = await getPages();

  // Group pages by section
  const sectionMap: Record<string, Page[]> = {};
  const unsectionedPages: Page[] = [];

  pages.forEach((page) => {
    if (page.section) {
      if (!sectionMap[page.section]) sectionMap[page.section] = [];
      sectionMap[page.section].push(page);
    } else {
      unsectionedPages.push(page);
    }
  });

  // Sort sections by order if needed
  const sortedSections = [...sections].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Footer branding info (customize as needed)
  const logo = {
    src: "/uploads/AWD_logo.webp",
    alt: "Armstrong Web Development Logo",
    title: "Armstrong Web Development",
  };
  const tagline = "Your tagline here";
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
                <span className="text-xl font-semibold">{logo.title}</span>
              </div>
              <p className="mt-4 font-bold">{tagline}</p>
            </div>
            {sortedSections.map((section, sectionIdx) => (
              <div key={sectionIdx} className="min-w-0">
                <span className="font-semibold break-words">{section.title}</span>
                <ul className="space-y-4 text-muted-foreground">
                  {(sectionMap[section.title] ?? []).map((page, linkIdx) => (
                    <li key={linkIdx} className="font-medium">
                      <Link href={`/pages/${page.slug}`} className="hover:text-primary">
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {unsectionedPages.length > 0 && (
              <div className="min-w-0">
                <span className="font-semibold break-words">Other</span>
                <ul className="space-y-4 text-muted-foreground">
                  {unsectionedPages.map((page, linkIdx) => (
                    <li key={linkIdx} className="font-medium">
                      <Link href={`/pages/${page.slug}`} className="hover:text-primary">
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-24 flex flex-col items-center gap-2 border-t pt-8 text-xl font-medium text-muted-foreground">
            <Image
              src={logo.src}
              alt={logo.alt}
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
