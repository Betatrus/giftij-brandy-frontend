/**
 * Social links, ported verbatim (URLs + SVG artwork) from the
 * approved static site. These were present in both the footer
 * and the mobile drawer of the original design.
 */

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/Official_giftij_brandybags/",
  tiktok: "https://www.tiktok.com/@bagvendorinportharcourt",
  facebook: "https://web.facebook.com/giftijbrandy",
  whatsapp: "https://wa.me/2349023021320",
}

export const CONTACT_EMAIL = "jacobsgift3@gmail.com"

function InstagramIcon({ size = 16, gradientId }: { size?: number; gradientId: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={gradientId} cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" fill={`url(#${gradientId})`} />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="white" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="white" />
    </svg>
  )
}

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.63c.28 0 .54.04.79.1V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.69a6.34 6.34 0 0 0 12.67.39V8.69a8.18 8.18 0 0 0 4.76 1.52V6.76a4.84 4.84 0 0 1-1-.07z" />
    </svg>
  )
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.004 0C5.374 0 0 5.374 0 12.004c0 2.138.567 4.147 1.549 5.89L.057 23.998l6.256-1.643a11.95 11.95 0 0 0 5.691 1.653c6.626 0 11.996-5.374 11.996-12.004C24 5.374 18.63 0 12.004 0zm0 21.888a9.9 9.9 0 0 1-5.307-1.44l-.38-.226-3.938 1.033 1.05-3.836-.248-.394a9.86 9.86 0 0 1-1.551-5.021c0-5.724 4.652-10.374 10.374-10.374 5.724 0 10.374 4.65 10.374 10.374 0 5.724-4.65 10.374-10.374 10.374z" />
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51z" />
    </svg>
  )
}

/** Footer variant (small icons on the dark footer). */
export function FooterSocials() {
  return (
    <div className="gb-footer-social">
      <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <InstagramIcon gradientId="igGradFooter" />
      </a>
      <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
        <TikTokIcon />
      </a>
      <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <FacebookIcon />
      </a>
      <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <WhatsAppIcon />
      </a>
    </div>
  )
}

/** Drawer variant (larger icons inside the slide-out menu). */
export function DrawerSocials() {
  return (
    <div className="gb-socials">
      <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <InstagramIcon size={22} gradientId="igGradDrawer" />
      </a>
      <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
        <TikTokIcon size={22} />
      </a>
      <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <FacebookIcon size={22} />
      </a>
    </div>
  )
}
