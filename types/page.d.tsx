export interface PageFrontmatter {
    title: string;
    description?: string;
    [key: string]: any;
}

export interface PageContent {
    content: string;
    data: PageFrontmatter;
}

// For generateStaticParams
export interface PageParams {
    slug: string[];
}