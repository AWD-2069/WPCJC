import { notFound } from 'next/navigation'
import { getPage, getSection, generatePageParams } from '../../../lib/content'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

interface PageDetailProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return generatePageParams()
}

export default function PageDetail({ params }: PageDetailProps) {
  const page = getPage(params.slug)
  
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