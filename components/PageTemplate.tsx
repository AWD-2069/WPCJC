import Head from 'next/head'; // Head is a client component in App Router, import from 'next/head'
import React, { ReactNode } from 'react';

interface PageTemplateProps {
    children: ReactNode;
    title?: string;
    description?: string;
}

export default function PageTemplate({
    children,
    title,
    description,
}: PageTemplateProps) {
    return (
        <>
            {/* Head is a Client Component, so it's fine here */}
            <Head>
                <title>{title || 'WPCJC'}</title>
                {description && <meta name="description" content={description} />}
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>{children}</main>
        </>
    );
}