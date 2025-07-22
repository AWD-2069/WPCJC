import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getSections() {
  const dir = path.join(process.cwd(), "content/sections");
  const files = fs.readdirSync(dir);
  return files.map((file) => {
    const content = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(content);
    return {
      title: data.title,
      order: data.order,
      description: data.description,
    };
  });
}

export async function getPages() {
  const dir = path.join(process.cwd(), "content/pages");
  const files = fs.readdirSync(dir);
  return files.map((file) => {
    const content = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(content);
    return {
      title: data.title,
      slug: file.replace(/\.md$/, ""),
      section: data.section,
    };
  });
}