import { notFound } from 'next/navigation'
import { getPage, getSection, getPages } from '../../../lib/content'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { Hero7 } from '@/components/hero7'
import { InfoCard } from '@/components/InfoCard'
import { Contact7 } from '@/components/contact7'

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

type PageBlock =
  | { type: "hero"; heading: string; description: string; join_us: string; backgroundImage?: string }
  | { type: "infoCard" }
  | { type: "contact" }
  | { type: "markdown"; content: string };

function renderBlock(block: PageBlock, i: number) {
  switch (block.type) {
    case "hero":
      return <Hero7 key={i} {...block} />
    case "infoCard":
      return <InfoCard key={i} />
    case "contact":
      return <Contact7 key={i} />
    case "markdown":
      return <div key={i} className="prose"><ReactMarkdown>{block.content}</ReactMarkdown></div>
    default:
      return null
  }
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
      {Array.isArray(page.blocks)
        ? page.blocks.map(renderBlock)
        : <ReactMarkdown>{page.content}</ReactMarkdown>}
    </div>
  )
}