import { permanentRedirect } from "next/navigation"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function LegacyBlogArticleRedirectPage({ params }: PageProps) {
  await params
  permanentRedirect("/blog")
}
