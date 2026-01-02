/**
 * [INPUT]: GET request with ?url=... query parameter
 * [OUTPUT]: JSON response with website metadata (title, favicon, description)
 * [POS]: /src/app/api/link/metadata/route.ts - Fetch website metadata endpoint
 * 
 * [PROTOCOL]:
 * 1. Once metadata extraction logic changes, update this file immediately.
 * 2. After update, verify error handling and timeout behavior.
 */

import { NextResponse } from 'next/server'

interface MetadataResponse {
    title?: string
    favicon?: string
    description?: string
    image?: string
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const url = searchParams.get('url')

        if (!url) {
            return NextResponse.json(
                { error: 'URL parameter is required' },
                { status: 400 }
            )
        }

        // Validate URL
        let normalizedUrl: string
        try {
            const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
            normalizedUrl = urlObj.toString()
        } catch {
            return NextResponse.json(
                { error: 'Invalid URL format' },
                { status: 400 }
            )
        }

        // Fetch the HTML content
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

        try {
            const response = await fetch(normalizedUrl, {
                signal: controller.signal,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                },
            })

            clearTimeout(timeoutId)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const html = await response.text()
            const metadata = extractMetadata(html, normalizedUrl)

            return NextResponse.json({
                success: true,
                ...metadata,
            })
        } catch (error: any) {
            clearTimeout(timeoutId)
            if (error.name === 'AbortError') {
                return NextResponse.json(
                    { error: 'Request timeout' },
                    { status: 408 }
                )
            }
            throw error
        }
    } catch (error: any) {
        console.error('Metadata fetch error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch metadata', details: error.message },
            { status: 500 }
        )
    }
}

function extractMetadata(html: string, baseUrl: string): MetadataResponse {
    const metadata: MetadataResponse = {}

    // Extract title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    if (titleMatch) {
        metadata.title = titleMatch[1].trim()
    }

    // Extract Open Graph title (preferred)
    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i)
    if (ogTitleMatch) {
        metadata.title = ogTitleMatch[1].trim()
    }

    // Extract description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
    if (descMatch) {
        metadata.description = descMatch[1].trim()
    }

    // Extract Open Graph description (preferred)
    const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i)
    if (ogDescMatch) {
        metadata.description = ogDescMatch[1].trim()
    }

    // Extract favicon
    // Try multiple favicon sources
    const faviconPatterns = [
        /<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/i,
        /<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["']/i,
        /<link[^>]*rel=["']icon["'][^>]*href=["']([^"']+)["']/i,
    ]

    for (const pattern of faviconPatterns) {
        const match = html.match(pattern)
        if (match) {
            const faviconUrl = match[1]
            metadata.favicon = resolveUrl(faviconUrl, baseUrl)
            break
        }
    }

    // Fallback to default favicon location
    if (!metadata.favicon) {
        try {
            const baseUrlObj = new URL(baseUrl)
            metadata.favicon = `${baseUrlObj.protocol}//${baseUrlObj.host}/favicon.ico`
        } catch {
            // Ignore
        }
    }

    // Extract Open Graph image
    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
    if (ogImageMatch) {
        metadata.image = resolveUrl(ogImageMatch[1], baseUrl)
    }

    return metadata
}

function resolveUrl(url: string, baseUrl: string): string {
    try {
        // If URL is absolute, return as is
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url
        }

        // If URL starts with //, add protocol
        if (url.startsWith('//')) {
            const baseUrlObj = new URL(baseUrl)
            return `${baseUrlObj.protocol}${url}`
        }

        // Resolve relative URL
        const baseUrlObj = new URL(baseUrl)
        if (url.startsWith('/')) {
            return `${baseUrlObj.protocol}//${baseUrlObj.host}${url}`
        }

        // Relative path
        return new URL(url, baseUrl).toString()
    } catch {
        return url
    }
}
