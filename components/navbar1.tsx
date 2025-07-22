import React from "react";
import Link from "next/link";

// Replace with your actual data fetching logic
import { getSections, getPages } from "@/lib/content"; // You need to implement these

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

const Navbar1 = async () => {
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

  return (
    <nav>
      <ul>
        {sortedSections.map((section) => (
          <li key={section.title}>
            <span>{section.title}</span>
            <ul>
              {sectionMap[section.title]?.map((page) => (
                <li key={page.slug}>
                  <Link href={`/pages/${page.slug}`}>{page.title}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
        {unsectionedPages.map((page) => (
          <li key={page.slug}>
            <Link href={`/pages/${page.slug}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { Navbar1 };
