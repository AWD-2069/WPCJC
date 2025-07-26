// import { Contact7 } from "@/components/contact7";
// import { Hero7 } from "@/components/hero7";
// import { InfoCard } from "@/components/InfoCard";

// export default function Home() {
//   return (
//     <div>
//       <Hero7 />
//       <InfoCard />
//       <Contact7 />
//     </div>
//   );
// }

import { getContentBySection } from '../lib/content'
import Link from 'next/link'

export default function HomePage() {
  const contentBySection = getContentBySection()

  return (
    <div>
      <h1>Content by Section</h1>
      {contentBySection.map(section => (
        <div key={section.slug}>
          <h2>
            <Link href={`/sections/${section.slug}`}>
              {section.title}
            </Link>
          </h2>
          {section.description && <p>{section.description}</p>}
          
          {section.pages.length > 0 && (
            <ul>
              {section.pages.map(page => (
                <li key={page.slug}>
                  <Link href={`/pages/${page.slug}`}>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
