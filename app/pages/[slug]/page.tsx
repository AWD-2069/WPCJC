import { notFound, redirect } from 'next/navigation'
import { getPage, getSection, getPages } from '../../../lib/content'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { Hero7 } from '@/components/hero7'
import { NavigationCards } from '@/components/NavigationCards'
import { Contact7 } from '@/components/contact7'
import { Faq1 } from '@/components/faq1'
import { LeadershipCard } from '@/components/LeadershipCard' // Add this import

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
  | { type: "hero"; heading: string; description: string; join_us: string; backgroundImage?: string; backgroundVideo?: string }
  | { type: "NavigationCards"; items: { title: string; image?: string; link?: string }[] }
  | { type: "contact"; email?: { email: string }[]; address?: { address: string }[]; phone?: { phone: string }[] }
  | { type: "faq"; items: { question: string; answer: string }[] }
  | { type: "markdown"; content: string }
  | { type: "leadership"; items: { name: string; role: string; image: string; description?: string }[] }; // Add leadership block

function renderBlock(block: PageBlock, i: number) {
  switch (block.type) {
    case "hero":
      return <Hero7 key={i} {...block} />
    case "NavigationCards":
      return <NavigationCards key={i} items={block.items} />
    case "contact":
      return <Contact7 key={i} email={block.email} address={block.address} phone={block.phone} />
    case "faq":
      return <Faq1 key={i} items={block.items} />
    case "markdown":
      return <div key={i} className="prose"><ReactMarkdown>{block.content}</ReactMarkdown></div>
    case "leadership":
      return (
        <div key={i} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {block.items.map((item, idx) => (
            <LeadershipCard
              key={item.name + idx}
              image={item.image}
              name={item.name}
              role={item.role}
              description={item.description}
            />
          ))}
        </div>
      )
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

  // Redirect if redirect_url is set
  if (page.redirect_url) {
    redirect(page.redirect_url)
  }

  const section = page.section ? getSection(page.section) : undefined

  return (
    <div>
      {Array.isArray(page.blocks)
        ? (
            <div>
              {page.blocks.map((block, i) => (
                <div key={i} className="mb-12 last:mb-0">
                  {renderBlock(block, i)}
                </div>
              ))}
            </div>
          )
        : <ReactMarkdown>{page.content}</ReactMarkdown>}
    </div>
  )
}