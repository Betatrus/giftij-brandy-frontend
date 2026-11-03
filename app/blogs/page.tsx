import { permanentRedirect } from "next/navigation"

export default function LegacyBlogsRedirectPage() {
  permanentRedirect("/blog")
}
