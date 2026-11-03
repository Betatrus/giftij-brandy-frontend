import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { createElement } from "react";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { fetchBlogPost, type BlogPost } from "@/lib/api/blog";
import { pageMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

type Props={params:Promise<{slug:string}>};
async function load(slug:string){return fetchBlogPost(slug);}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {slug}=await params; const result=await load(slug);
  if(!result)return pageMetadata({title:"Article Not Found",path:`/blog/${encodeURIComponent(slug)}`,noIndex:true});
  if("redirectTo" in result)return pageMetadata({title:"Article Moved",path:`/blog/${encodeURIComponent(slug)}`,noIndex:true});
  const post=result;
  return {
    ...pageMetadata({
      title:post.seoTitle?.trim()||post.title,
      description:post.seoDescription?.trim()||post.excerpt,
      path:`/blog/${encodeURIComponent(post.slug)}`,
      image:post.coverImageUrl||undefined,
      noIndex:!post.isIndexable,
    }),
    ...(post.canonicalUrl?{alternates:{canonical:post.canonicalUrl}}:{}),
  };
}
function renderInline(text:string){
  const parts=text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part,i)=>{
    if(part.startsWith("**")&&part.endsWith("**"))return createElement("strong",{key:i},part.slice(2,-2));
    if(part.startsWith("*")&&part.endsWith("*"))return createElement("em",{key:i},part.slice(1,-1));
    if(part.startsWith("`")&&part.endsWith("`"))return createElement("code",{key:i,className:"rounded bg-cream px-1"},part.slice(1,-1));
    return part;
  });
}
function ArticleBody({source}:{source:string}){
  const blocks=source.replace(/\r/g,"").split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
  return <div className="space-y-5 text-base leading-8 text-ink/80">{blocks.map((block,i)=>{
    if(/^#{1,3} /.test(block)){const level=block.match(/^#+/)?.[0].length??2;return createElement(level===3?"h3":"h2",{key:i,className:"pt-3 font-display text-2xl leading-tight text-ink"},renderInline(block.replace(/^#{1,3} /,"")));}
    const lines=block.split("\n");
    if(lines.every(line=>/^[-*] /.test(line)))return createElement("ul",{key:i,className:"list-disc space-y-2 pl-6"},lines.map((line,j)=>createElement("li",{key:j},renderInline(line.replace(/^[-*] /,"")))));
    if(lines.every(line=>/^\d+\. /.test(line)))return createElement("ol",{key:i,className:"list-decimal space-y-2 pl-6"},lines.map((line,j)=>createElement("li",{key:j},renderInline(line.replace(/^\d+\. /,"")))));
    if(block.startsWith("> "))return createElement("blockquote",{key:i,className:"border-l-2 border-[#b99a5a] pl-5 italic"},renderInline(block.replace(/^> /gm,"")));
    return createElement("p",{key:i},renderInline(block.replace(/\n/g," ")));
  })}</div>;
}
export default async function BlogArticlePage({params}:Props){
  const {slug}=await params; const result=await load(slug); if(!result)notFound();
  if("redirectTo" in result)permanentRedirect(`/blog/${result.redirectTo}`);
  const post=result as BlogPost;
  const canonical=post.canonicalUrl||absoluteUrl(`/blog/${post.slug}`);
  return <>
    <SiteNav theme="light" />
    <main className="mx-auto max-w-3xl px-6 py-14 md:py-20">
      <Link href="/blog" className="mb-8 inline-block text-sm text-[#9b7a35] hover:underline">← All articles</Link>
      <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#9b7a35]">{post.category?.name||"Giftij Journal"}</p>
      <h1 className="mb-5 font-display text-3xl leading-tight text-ink md:text-5xl">{post.title}</h1>
      <p className="mb-8 text-lg leading-8 text-ink/60">{post.excerpt}</p>
      {post.coverImageUrl&&<img src={post.coverImageUrl} alt={post.coverImageAlt||post.title} className="mb-10 aspect-[16/9] w-full rounded-2xl object-cover" />}
      <ArticleBody source={post.contentMarkdown} />
      <div className="mt-12 border-t border-cream pt-6 text-sm text-ink/50"><Link href="/blog" className="text-[#9b7a35] hover:underline">More from Giftij Journal</Link></div>
      <JsonLd data={{"@context":"https://schema.org","@type":"BlogPosting","headline":post.title,"description":post.seoDescription||post.excerpt,"image":post.coverImageUrl?[post.coverImageUrl]:undefined,"datePublished":post.publishedAt||undefined,"dateModified":post.updatedAt,"mainEntityOfPage":canonical,"author":{"@type":"Organization","name":"Giftij Brandy"},"publisher":{"@type":"Organization","name":"Giftij Brandy","url":absoluteUrl("/")}}} />
    </main>
    <SiteFooter />
  </>;
}
