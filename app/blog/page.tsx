import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { pageMetadata, absoluteUrl } from "@/lib/seo";
import { fetchBlogPosts, fetchBlogSettings } from "@/lib/api/blog";
import { JsonLd } from "@/components/seo/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchBlogSettings();
  return pageMetadata({
    title: "Bags, Shoes & Fashion Guides in Nigeria",
    description: "Read practical handbag buying guides, shoe and slipper care advice, shopping tips and customer stories from Giftij Brandy, Port Harcourt.",
    path: "/blog", noIndex: !settings.blogIndexingEnabled,
  });
}
export const dynamic = "force-dynamic";
export default async function BlogPage() {
  const [posts, settings] = await Promise.all([fetchBlogPosts(), fetchBlogSettings()]);
  return <>
    <SiteNav theme="light" />
    <main className="mx-auto min-h-[55vh] max-w-6xl px-6 py-16 md:py-24">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#9b7a35]">The Giftij Journal</p>
      <h1 className="mb-4 font-display text-4xl leading-tight text-ink md:text-5xl">Bags, Shoes &amp; Fashion Guides in Nigeria</h1>
      <p className="mb-10 max-w-2xl text-base leading-8 text-ink/65">Practical advice for choosing bags, shoes and slippers, caring for your purchases and shopping with confidence.</p>
      {posts.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post=><article key={post.id} className="overflow-hidden rounded-2xl border border-cream bg-white">
          {post.coverImageUrl && <Link href={`/blog/${post.slug}`}><img src={post.coverImageUrl} alt={post.coverImageAlt || post.title} loading="lazy" className="aspect-[16/10] w-full object-cover" /></Link>}
          <div className="p-5"><p className="mb-2 text-xs uppercase tracking-wider text-[#9b7a35]">{post.category?.name || "Giftij Journal"}</p>
            <h2 className="mb-2 font-display text-xl text-ink"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
            <p className="mb-4 text-sm leading-6 text-ink/60">{post.excerpt}</p>
            <Link className="text-sm font-medium text-[#9b7a35] hover:underline" href={`/blog/${post.slug}`}>Read article</Link>
          </div>
        </article>)}
      </div> : <div className="rounded-2xl border border-cream bg-white px-6 py-12 text-center"><h2 className="font-display text-2xl text-ink">Helpful guides are coming soon</h2><p className="mt-2 text-sm text-ink/60">We are preparing original buying guides, product-care advice and customer stories.</p></div>}
      <JsonLd data={{"@context":"https://schema.org","@type":"Blog","name":"Giftij Brandy Journal","url":absoluteUrl("/blog"),"inLanguage":"en-NG","publisher":{"@type":"Organization","name":"Giftij Brandy","url":absoluteUrl("/")}}} />
      {!settings.blogIndexingEnabled && <p className="mt-8 text-xs text-ink/40">Search indexing is currently disabled while the editorial collection is being prepared.</p>}
    </main>
    <SiteFooter />
  </>;
}
