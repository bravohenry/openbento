import { MetadataRoute } from 'next'

/**
 * [INPUT]: None - Static sitemap generation
 * [OUTPUT]: MetadataRoute.Sitemap - Sitemap configuration for SEO
 * [POS]: SEO optimization - Helps search engines discover and index all pages
 * 
 * [PROTOCOL]:
 * 1. Once routes are added or removed, update this sitemap immediately.
 * 2. After update, check if robots.txt needs updating.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://openbento.dev'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/bento`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bento/editor`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bento/widgets`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/showcase`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}
