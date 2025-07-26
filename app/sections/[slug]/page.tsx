import { notFound } from 'next/navigation'
import { getSection, getPagesBySection, generateSectionParams } from '../../../lib/content'
import Link from 'next/link'

interface SectionPageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return generateSectionParams()
}

export default function SectionPage({ params }: SectionPageProps) {
  const section = getSection(params.slug)
  
  if (!section) {
    notFound()
  }

  const pages = getPagesBySection(params.slug)

  return (
    <div>
      <h1>{section.title}</h1>
      {section.description && <p>{section.description}</p>}
      
      <h2>Pages in this section:</h2>
      {pages.length > 0 ? (
        <ul>
          {pages.map(page => (
            <li key={page.slug}>
              <Link href={`/pages/${page.slug}`}>
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pages in this section yet.</p>
      )}
    </div>
  )
}