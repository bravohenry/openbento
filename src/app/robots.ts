import { MetadataRoute } from 'next'

/**
 * [INPUT]: None - Static robots.txt generation
 * [OUTPUT]: MetadataRoute.Robots - Robots.txt configuration for SEO
 * [POS]: SEO optimization - Controls search engine crawler access
 * 
 * [PROTOCOL]:
 * 1. Once sitemap URL changes, update this file immediately.
 * 2. After update, verify sitemap.ts is in sync.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://openbento.dev'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
