// lib/content.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

// Type definitions
export interface Section {
  slug: string
  title: string
  description?: string
  order?: number
}

export interface Page {
  slug: string
  title: string
  content: string
  section?: string
}

export interface SectionWithPages extends Section {
  pages: Page[]
}

// Load all sections
export function getSections(): Section[] {
  const sectionsDirectory = path.join(contentDirectory, 'sections')
  
  if (!fs.existsSync(sectionsDirectory)) {
    return []
  }
  
  const filenames = fs.readdirSync(sectionsDirectory)
  const sections = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const fullPath = path.join(sectionsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      const slug = name.replace(/\.md$/, '')
      
      return {
        slug,
        title: data.title || '',
        description: data.description,
        order: data.order || 0
      } as Section
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0))
  
  return sections
}

// Load a single section by slug
export function getSection(slug: string): Section | undefined {
  const sections = getSections()
  return sections.find(section => section.slug === slug)
}

// Load all pages
export function getPages(): Page[] {
  const pagesDirectory = path.join(contentDirectory, 'pages')
  
  if (!fs.existsSync(pagesDirectory)) {
    return []
  }
  
  const filenames = fs.readdirSync(pagesDirectory)
  const pages = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const fullPath = path.join(pagesDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const slug = name.replace(/\.md$/, '')
      
      return {
        slug,
        title: data.title || '',
        content,
        section: data.section
      } as Page
    })
  
  return pages
}

// Load a single page by slug
export function getPage(slug: string): Page | undefined {
  const pages = getPages()
  return pages.find(page => page.slug === slug)
}

// Load pages by section
export function getPagesBySection(sectionSlug: string): Page[] {
  const pages = getPages()
  return pages.filter(page => page.section === sectionSlug)
}

// Load all content organized by sections
export function getContentBySection(): SectionWithPages[] {
  const sections = getSections()
  const pages = getPages()
  
  return sections.map(section => ({
    ...section,
    pages: pages.filter(page => page.section === section.slug)
  }))
}