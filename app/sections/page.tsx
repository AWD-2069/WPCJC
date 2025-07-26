import { getSections } from '../../lib/content'
import Link from 'next/link'

export default function SectionsPage() {
  const sections = getSections()

  return (
    <div>
      <h1>All Sections</h1>
      {sections.map(section => (
        <div key={section.slug}>
          <h2>
            <Link href={`/sections/${section.slug}`}>
              {section.title}
            </Link>
          </h2>
          {section.description && <p>{section.description}</p>}
        </div>
      ))}
    </div>
  )
}