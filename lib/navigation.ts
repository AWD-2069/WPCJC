import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PageMeta {
  title: string;
  url: string;
  section: string;
}

export interface SectionMeta {
  title: string;
  order: number;
  slug: string;
  pages: PageMeta[];
}

export function getSectionsAndPages(): SectionMeta[] {
  const sectionsDir = path.join(process.cwd(), "content/sections");
  const pagesDir = path.join(process.cwd(), "content/pages");

  // Read sections
  const sectionFiles = fs.readdirSync(sectionsDir);
  const sections: Record<string, SectionMeta> = {};
  for (const file of sectionFiles) {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(sectionsDir, file);
    const { data } = matter(fs.readFileSync(fullPath, "utf8"));
    sections[slug] = {
      title: data.title,
      order: data.order ?? 0,
      slug,
      pages: [],
    };
  }

  // Read pages
  const pageFiles = fs.readdirSync(pagesDir);
  for (const file of pageFiles) {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(pagesDir, file);
    const { data } = matter(fs.readFileSync(fullPath, "utf8"));
    if (!data.section || !sections[data.section]) continue;
    sections[data.section].pages.push({
      title: data.title,
      url: `/pages/${slug}`,
      section: data.section,
    });
  }

  // Sort pages in each section (optional)
  Object.values(sections).forEach((section) => {
    section.pages.sort((a, b) => a.title.localeCompare(b.title));
  });

  // Return sorted sections
  return Object.values(sections).sort((a, b) => a.order - b.order);
}