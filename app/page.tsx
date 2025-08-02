// import { Contact7 } from "@/components/contact7";
// import { Hero7 } from "@/components/hero7";
// import { NavigationCards } from "@/components/NavigationCards";

// export default function Home() {
//   return (
//     <div>
//       <Hero7 />
//       <NavigationCards />
//       <Contact7 />
//     </div>
//   );
// }

import { getPage } from '../lib/content'
import ReactMarkdown from 'react-markdown'
import { Hero7 } from '@/components/hero7'
import { NavigationCards } from '@/components/NavigationCards'
import { Contact7 } from '@/components/contact7'
import { Faq1 } from '@/components/faq1'
import { LeadershipCard } from '@/components/LeadershipCard'

function renderBlock(block, i) {
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

export default function HomePage() {
  const page = getPage('home')

  if (!page) {
    return <div>Home page not found.</div>
  }

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
