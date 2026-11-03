import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteNav } from "@/components/layout/site-nav"
import { SiteFooter } from "@/components/layout/site-footer"
import { JsonLd } from "@/components/seo/json-ld"
import { BLOG_POSTS, getBlogPost } from "@/lib/blogs"
import { pageMetadata, SITE_URL } from "@/lib/seo"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) {
    return pageMetadata({ title: "Article Not Found", path: `/blogs/${encodeURIComponent(slug)}`, noIndex: true })
  }
  return pageMetadata({
    title: post.seoTitle,
    description: post.description,
    path: `/blogs/${post.slug}`,
  })
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const articleUrl = `${SITE_URL}/blogs/${post.slug}`

  return (
    <>
      <SiteNav theme="light" />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        mainEntityOfPage: articleUrl,
        url: articleUrl,
        author: { "@type": "Organization", name: "Giftij Brandy", url: SITE_URL },
        publisher: { "@type": "Organization", name: "Giftij Brandy", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/Logo.jpg` } },
        articleSection: post.category,
        inLanguage: "en-NG",
      }} />
      <main style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px 88px" }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: "#756b61", marginBottom: 32 }}>
          <Link href="/">Home</Link> / <Link href="/blogs">Blogs</Link> / <span>{post.category}</span>
        </nav>
        <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#82776b", marginBottom: 14 }}>{post.category} · {post.readTime}</p>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(36px, 6vw, 56px)", lineHeight: 1.14, marginBottom: 20 }}>{post.title}</h1>
        <p style={{ fontSize: 18, lineHeight: 1.8, color: "#625b54", marginBottom: 44 }}>{post.excerpt}</p>
        <div>
          {post.sections.map((section) => (
            <section key={section.heading} style={{ marginBottom: 34 }}>
              <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: 28, lineHeight: 1.25, marginBottom: 14 }}>{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} style={{ lineHeight: 1.9, color: "#4f4943", marginBottom: 14 }}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul style={{ paddingLeft: 22, lineHeight: 1.9, color: "#4f4943", marginTop: 12 }}>
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>
        <aside style={{ borderTop: "1px solid #d8d0c6", paddingTop: 24, marginTop: 44 }}>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: 25, marginBottom: 16 }}>Explore the collection</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
            {post.relatedLinks.map((link) => <Link key={link.href} href={link.href} style={{ textDecoration: "underline", textUnderlineOffset: 5 }}>{link.label}</Link>)}
          </div>
        </aside>
        <p style={{ marginTop: 40 }}><Link href="/blogs" style={{ textDecoration: "underline", textUnderlineOffset: 5 }}>← Back to all guides</Link></p>
      </main>
      <SiteFooter />
    </>
  )
}
