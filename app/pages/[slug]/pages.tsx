import { notFound } from 'next/navigation'
import { getPage, getSection, getPages } from '../../../lib/content'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

interface PageDetailProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  const pages = getPages()
  return pages.map(page => ({
    slug: page.slug
  }))
}

export default async function PageDetail({ params }: PageDetailProps) {
  const { slug } = await params
  const page = getPage(slug)
  
  if (!page) {
    notFound()
  }

  const section = page.section ? getSection(page.section) : undefined

  return (
    <div>
      {section && (
        <nav>
          <Link href={`/sections/${section.slug}`}>
            ← Back to {section.title}
          </Link>
        </nav>
      )}
      
      <h1>{page.title}</h1>
      <ReactMarkdown>{page.content}</ReactMarkdown>
    </div>
  )
}