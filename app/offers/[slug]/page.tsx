import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVER_API_BASE, getStorefrontApiHeaders } from "@/lib/api/server-config";

type Product = { id:string; slug:string; name:string; price:number; discount:number; image?:{url:string;altText?:string|null}|null; available:number };
type OfferSet = { id:string; name:string; description?:string|null; benefits:string[]; discountType?:string|null; discountValue?:number|null; giftDescription?:string|null; closingMode:string; endsAt?:string|null; orderLimit?:number|null; paidOrders:number; products:Product[] };
type Campaign = { id:string; name:string; slug:string; headline:string; caption?:string|null; message?:string|null; announcementMode:string; imageUrl?:string|null; ctaLabel:string; endsAt?:string|null; offerSets:OfferSet[] };

async function getCampaign(slug:string):Promise<Campaign|null>{
  try {
    const response=await fetch(`${SERVER_API_BASE}/offers/${encodeURIComponent(slug)}`,{headers:getStorefrontApiHeaders(),cache:"no-store"});
    if(!response.ok)return null;
    const payload=await response.json();
    return payload?.data ?? payload?.result?.data ?? null;
  } catch { return null; }
}
const money=(value:number)=>new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(value);

export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const campaign=await getCampaign(slug);
  return {title:campaign?campaign.headline+" | Giftij Brandy":"Offer unavailable | Giftij Brandy",description:campaign?.message ?? campaign?.caption ?? "Explore Giftij Brandy offers."};
}

export default async function OfferLandingPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const campaign=await getCampaign(slug);
  if(!campaign) notFound();
  return <main className="min-h-screen bg-[#fbf8f2] text-[#243b32]">
    <section className="relative isolate overflow-hidden bg-[#173f35] text-[#f8f1df]">
      {campaign.imageUrl && <div className="absolute inset-0 -z-10"><Image src={campaign.imageUrl} alt="" fill priority sizes="100vw" className="object-cover opacity-35"/></div>}
      <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:py-24">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[.28em] text-[#dfc987]">{campaign.name}</p>
        <h1 className="mx-auto max-w-4xl font-display text-4xl leading-tight sm:text-6xl">{campaign.headline}</h1>
        {campaign.caption && <p className="mx-auto mt-5 max-w-2xl text-lg text-[#f5ebd4]">{campaign.caption}</p>}
        {campaign.message && <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/75">{campaign.message}</p>}
        <a href="#offer-sets" className="mt-8 inline-flex rounded-full bg-[#e3c46e] px-7 py-3 text-sm font-semibold text-[#173f35] transition hover:bg-[#f0d98f]">{campaign.ctaLabel || "Explore the offers"} <span aria-hidden="true" className="ml-2">→</span></a>
      </div>
    </section>
    <section id="offer-sets" className="mx-auto max-w-7xl space-y-14 px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center"><p className="text-xs font-semibold uppercase tracking-[.24em] text-[#a47d30]">Made for you</p><h2 className="mt-3 font-display text-3xl sm:text-4xl">Explore the offers</h2><p className="mt-3 text-sm leading-6 text-[#6b756f]">Choose from the product collections below. Each offer applies to the products shown in its section.</p></div>
      {campaign.offerSets.map((set,index)=><section key={set.id} className="scroll-mt-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-[#e8e0d2] pb-4">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#a47d30]">Offer {String(index+1).padStart(2,"0")}</p><h3 className="mt-2 font-display text-2xl sm:text-3xl">{set.name}</h3>{set.description&&<p className="mt-2 max-w-2xl text-sm text-[#6b756f]">{set.description}</p>}</div>
          <div className="flex flex-wrap gap-2">{set.benefits.includes("DISCOUNT")&&<span className="rounded-full bg-[#e8f0e9] px-3 py-1.5 text-xs font-semibold text-[#286047]">{set.discountType==="FIXED"?money(set.discountValue??0)+" off":(set.discountValue??0)+"% off"}</span>}{set.benefits.includes("FREE_DELIVERY")&&<span className="rounded-full bg-[#e8f0e9] px-3 py-1.5 text-xs font-semibold text-[#286047]">Free delivery</span>}{set.benefits.includes("FREE_GIFT")&&<span className="rounded-full bg-[#f5edda] px-3 py-1.5 text-xs font-semibold text-[#88651d]">Complimentary gift</span>}</div>
        </div>
        {set.benefits.includes("FREE_GIFT")&&set.giftDescription&&<p className="mb-4 text-sm text-[#6b756f]">Gift: {set.giftDescription}</p>}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {set.products.map(product=><article key={product.id} className="group overflow-hidden rounded-2xl bg-white shadow-[0_5px_24px_rgba(35,50,42,.05)]">
            <Link href={`/product/${product.slug}`} className="block">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f0ece4]">{product.image?.url?<Image src={product.image.url} alt={product.image.altText||product.name} fill sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw" className="object-cover transition duration-500 group-hover:scale-[1.04]"/>:<div className="flex h-full items-center justify-center text-xs text-[#9a9a8d]">Giftij Brandy</div>}
              {product.available<=0&&<span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold">Out of stock</span>}</div>
              <div className="p-3 sm:p-4"><h4 className="line-clamp-2 min-h-10 text-sm font-medium">{product.name}</h4><p className="mt-2 text-sm font-semibold">{money(product.price*(1-(product.discount||0)/100))}</p><span className="mt-3 inline-flex text-xs font-semibold text-[#9b762e]">View product →</span></div>
            </Link>
          </article>)}
        </div>
      </section>)}
      {campaign.offerSets.length===0&&<p className="rounded-2xl bg-white p-8 text-center text-sm text-[#6b756f]">This campaign has ended. Explore the shop for our latest collections.</p>}
      <div className="pt-4 text-center"><Link href="/shop" className="inline-flex rounded-full border border-[#c8b98e] px-7 py-3 text-sm font-semibold hover:bg-white">Continue shopping</Link></div>
    </section>
  </main>;
}
