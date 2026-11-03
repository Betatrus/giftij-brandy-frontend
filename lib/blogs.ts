export interface BlogSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export interface BlogPost {
  slug: string
  title: string
  seoTitle: string
  description: string
  excerpt: string
  category: string
  readTime: string
  sections: BlogSection[]
  relatedLinks: { label: string; href: string }[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-choose-an-everyday-handbag",
    title: "How to Choose an Everyday Handbag That Works for Your Lifestyle",
    seoTitle: "How to Choose an Everyday Handbag in Nigeria | Giftij Brandy",
    description: "A practical guide to choosing an everyday handbag in Nigeria, from size and compartments to comfort, versatility and personal style.",
    excerpt: "The right everyday bag should fit your routine, carry what you need and feel like you. Here are the details worth checking before you buy.",
    category: "Handbag Guides",
    readTime: "5 min read",
    sections: [
      {
        heading: "Start with what you carry every day",
        paragraphs: [
          "Before choosing a colour or design, think about the things that usually leave the house with you. Your phone, purse, keys, small beauty essentials, notebook or tablet all take up space. A bag that looks beautiful but cannot comfortably hold your everyday items may spend more time in your wardrobe than on your shoulder.",
          "Choose a size that fits your real routine. A compact bag can work for quick outings, while a roomier tote may suit longer days when you carry more."
        ]
      },
      {
        heading: "Check the compartments and closure",
        paragraphs: [
          "A useful interior makes it easier to find small items without emptying the whole bag. Look for pockets that suit the things you reach for often, and check whether the main compartment closes in a way that feels practical for your day."
        ],
        bullets: [
          "Check that your essentials fit without forcing the zip or clasp.",
          "Look for an easy-to-reach pocket for frequently used items.",
          "Consider whether you prefer a zip, magnetic snap or another closure."
        ]
      },
      {
        heading: "Think about comfort and versatility",
        paragraphs: [
          "If you will carry the bag for several hours, strap length and handle comfort matter. Consider how it sits when worn and whether you can carry it comfortably with the outfits you wear most often.",
          "Neutral colours can be easy to coordinate, while a bold colour or distinctive shape can make a simple outfit feel more expressive. Choose based on your wardrobe and the occasions you actually attend."
        ]
      },
      {
        heading: "Inspect the details before ordering",
        paragraphs: [
          "Review the product photos, dimensions, material information and available colour options. If a measurement is not shown or something in the listing is unclear, ask the store before placing your order. Product photos help you understand the design, but dimensions are the better guide to real-life capacity."
        ]
      }
    ],
    relatedLinks: [
      { label: "Explore bags", href: "/shop?category=bags" },
      { label: "Browse the full collection", href: "/shop" }
    ]
  },
  {
    slug: "choosing-shoes-online-in-nigeria",
    title: "What to Check Before Buying Shoes Online in Nigeria",
    seoTitle: "Buying Shoes Online in Nigeria: What to Check | Giftij Brandy",
    description: "Use this practical checklist before buying shoes online in Nigeria: sizing, fit, product details, occasion and the information to confirm with a store.",
    excerpt: "A few checks before checkout can help you choose shoes with more confidence, especially when you cannot try them on first.",
    category: "Shopping Guides",
    readTime: "4 min read",
    sections: [
      {
        heading: "Know your foot measurements",
        paragraphs: [
          "Shoe sizes can vary between styles and manufacturers, so do not rely only on the size printed inside a pair you already own. Measure both feet while standing, and use the larger measurement when comparing with a store's size guide.",
          "Check whether the product listing provides a size chart and follow the measurement instructions shown there. If the chart is missing, ask the store to confirm the fit guidance before ordering."
        ]
      },
      {
        heading: "Match the shoe to the way you will use it",
        paragraphs: [
          "Think about where and how long you plan to wear the shoes. A pair for everyday errands may need a different balance of support and flexibility from a pair chosen for an event. Consider the heel height, fastening, sole and how secure the shoe feels."
        ],
        bullets: [
          "Check the heel height and sole design.",
          "Look at the fastening and how the shoe stays on your foot.",
          "Consider the surfaces and occasions where you expect to wear it."
        ]
      },
      {
        heading: "Read the product details carefully",
        paragraphs: [
          "Review every available photo and the description for material, colour, sizing and design details. If you need a particular shade or fit, confirm that the selected option matches what you want before paying."
        ]
      },
      {
        heading: "Ask questions before checkout",
        paragraphs: [
          "If you are unsure about sizing, availability or delivery details, contact the store before completing your order. Keep your order confirmation and payment reference after checkout so you can easily follow up if you need help."
        ]
      }
    ],
    relatedLinks: [
      { label: "Explore shoes", href: "/shop?category=shoes" },
      { label: "Explore slippers", href: "/shop?category=slippers" }
    ]
  },
  {
    slug: "simple-care-tips-for-bags-and-shoes",
    title: "Simple Care Tips to Help Your Bags and Shoes Last Longer",
    seoTitle: "How to Care for Bags and Shoes: Simple Everyday Tips | Giftij Brandy",
    description: "Learn simple everyday habits for caring for handbags and shoes, including cleaning, drying, storage and checking material-specific care instructions.",
    excerpt: "Small care habits can help keep your favourite accessories looking their best. Start with gentle cleaning, sensible drying and proper storage.",
    category: "Care & Style",
    readTime: "4 min read",
    sections: [
      {
        heading: "Clean gently and follow the material",
        paragraphs: [
          "Different materials need different care. Start by checking any care instructions supplied with the item. For routine dust, a soft dry cloth is a sensible first step. Avoid applying strong cleaners, solvents or excessive water unless the material's care guidance specifically allows it.",
          "When trying a cleaning product, test it on a small, hidden area first and stop if the colour or surface changes."
        ]
      },
      {
        heading: "Let items dry naturally",
        paragraphs: [
          "If a bag or pair of shoes gets damp, gently remove surface moisture and allow it to air-dry in a well-ventilated place. Keep it away from direct heat, which can affect some finishes, adhesives and materials. Do not store an item while it is still damp."
        ]
      },
      {
        heading: "Store bags so they keep their shape",
        paragraphs: [
          "Empty your bag before storing it. If the shape allows, lightly support it with clean, dry tissue or a soft cloth. Keep it in a clean space away from prolonged direct sunlight, moisture and anything that could scratch or stain the surface."
        ]
      },
      {
        heading: "Give shoes time to rest",
        paragraphs: [
          "Allow shoes to air between wears, and remove loose dirt before it becomes harder to clean. Store pairs in a dry place where they are not crushed under heavier items. Use care products only when they are suitable for the shoe's specific material."
        ]
      }
    ],
    relatedLinks: [
      { label: "Explore bags", href: "/shop?category=bags" },
      { label: "Explore shoes", href: "/shop?category=shoes" }
    ]
  }
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug)
}
