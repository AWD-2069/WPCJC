// app/[...slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

// Import your custom types
import { PageContent, PageFrontmatter, PageParams } from '@/types/page.d';

// Your common page layout component
import PageTemplate from '@/components/PageTemplate';
import { parseLeadershipStaff } from "@/lib/parseLeadershipStaff";
import { LeadershipCard } from "@/components/LeadershipCard";
import { Hero7 } from "@/components/hero7";

const contentDirectory = path.join(process.cwd(), 'content');

// Helper function to recursively get all markdown file paths
function getAllMarkdownFilePaths(dir: string): string[] {
    let filePaths: string[] = [];
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            filePaths = filePaths.concat(getAllMarkdownFilePaths(fullPath));
        } else if (file.endsWith('.md')) {
            filePaths.push(fullPath);
        }
    });

    return filePaths;
}

// Function to read and parse a single markdown file
async function getPageContent(slugPath: string[]): Promise<PageContent | null> {
    let filePath: string;

    if (slugPath.length === 0) {
        // Handle the root 'index.md' case (e.g., / )
        filePath = path.join(contentDirectory, 'index.md');
    } else {
        filePath = path.join(contentDirectory, ...slugPath) + '.md';
    }

    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        return {
            content,
            data: data as PageFrontmatter, // Type assertion
        };
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return null;
    }
}

// generateStaticParams replaces getStaticPaths
export async function generateStaticParams(): Promise<PageParams[]> {
    const filePaths = getAllMarkdownFilePaths(contentDirectory);

    const params = filePaths.map((filePath) => {
        // Remove 'content/' prefix and '.md' extension
        // Then split by '/' to get the slug array
        const slug = filePath
            .replace(contentDirectory + path.sep, '')
            .replace(/\.md$/, '')
            .split(path.sep);

        // If it's the root 'index.md', its slug should be an empty array
        // Next.js will handle this as the root route '/'
        if (slug.length === 1 && slug[0] === 'index') {
            return { slug: [] };
        }

        return { slug };
    });

    return params;
}

// page.tsx components in the App Router are Server Components by default
// Data fetching happens directly inside them using async/await
export default async function DynamicPage(props: { params: Promise<PageParams> }) {
    const { slug = [] } = await props.params;
    const pageContent = await getPageContent(slug);

    if (!pageContent) {
        // Next.js will automatically render a not-found.tsx if it exists
        // or a generic 404 page if not.
        return (
            <PageTemplate title="Page Not Found" description="The page you requested could not be found.">
                <h1>404 - Page Not Found</h1>
                <p>Sorry, we can&apos;t find that page.</p>
            </PageTemplate>
        );
    }

    // Check if this is the leadership-staff page
    const isLeadershipStaff = slug.join("/") === "about-us/leadership-staff";
    let leadershipGroups = null;
    if (isLeadershipStaff && pageContent?.data) {
      leadershipGroups = {
        staff: pageContent.data.staff || [],
        elders: pageContent.data.elders || [],
        deacons: pageContent.data.deacons || [],
      };
    }

    return (
        <PageTemplate title={pageContent.data.title} description={pageContent.data.description}>
          {pageContent.data.hero && (
            <Hero7 {...pageContent.data.hero} />
          )}
          {isLeadershipStaff && leadershipGroups ? (
            <>
              <h2 className="text-2xl font-bold mt-8 mb-4">Staff</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {leadershipGroups.staff.map((person) => (
                  <LeadershipCard key={person.name} {...person} />
                ))}
              </div>
              <h2 className="text-2xl font-bold mt-8 mb-4">Elders</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {leadershipGroups.elders.map((person) => (
                  <LeadershipCard key={person.name} {...person} />
                ))}
              </div>
              <h2 className="text-2xl font-bold mt-8 mb-4">Deacons</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {leadershipGroups.deacons.map((person) => (
                  <LeadershipCard key={person.name} {...person} />
                ))}
              </div>
            </>
          ) : (
            <div className="page-content">
              <ReactMarkdown>{pageContent.content}</ReactMarkdown>
            </div>
          )}
        </PageTemplate>
    );
}

// Optional: Revalidation for ISR-like behavior
export const revalidate = 3600; // Revalidate every hour