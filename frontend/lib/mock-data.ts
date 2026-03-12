// Mock data for CAH website clone
// This provides fallback data when Payload CMS is not available

export const mockHomepageContent = {
  hero: {
    title: "Cards Against Humanity",
    subtitle: "A party game for horrible people.",
    description: "Unlike most of the party games you've played before, Cards Against Humanity is as despicable and awkward as you and your friends.",
    ctaText: "Shop Now",
    ctaLink: "/products",
    backgroundImage: "/images/hero-bg.jpg"
  },
  sections: [
    {
      id: "1",
      title: "What is Cards Against Humanity?",
      content: "Cards Against Humanity is a party game for horrible people. The game is simple. Each round, one player asks a question from a black card, and everyone else answers with their funniest white card.",
      image: "/images/section-1.jpg"
    },
    {
      id: "2",
      title: "How to Play",
      content: "One randomly chosen player reads a question from a black card, and everyone else answers with their funniest white card. The person who read the question picks their favorite, and whoever played it gets one Awesome Point.",
      image: "/images/section-2.jpg"
    }
  ]
}

export const mockProducts = [
  {
    id: "1",
    title: "Cards Against Humanity",
    slug: "cards-against-humanity-base-game",
    description: "The main game. Buy this first.",
    price: 2500,
    images: [
      { url: "https://images.unsplash.com/photo-1611195974226-ef7f1a8e4e4e?w=800&h=800&fit=crop", alt: "Cards Against Humanity Base Game" }
    ],
    category: "Base Game",
    inStock: true,
    featured: true
  },
  {
    id: "2",
    title: "Red Box",
    slug: "red-box-expansion",
    description: "300 more cards to mix into your game.",
    price: 1500,
    images: [
      { url: "https://images.unsplash.com/photo-1570303345338-e1f0eddf4946?w=800&h=800&fit=crop", alt: "Red Box Expansion" }
    ],
    category: "Expansion",
    inStock: true,
    featured: true
  },
  {
    id: "3",
    title: "Blue Box",
    slug: "blue-box-expansion",
    description: "300 more cards about dating, sex, and romance.",
    price: 1500,
    images: [
      { url: "https://images.unsplash.com/photo-1570303345610-7c6b9e2e7b5e?w=800&h=800&fit=crop", alt: "Blue Box Expansion" }
    ],
    category: "Expansion",
    inStock: true,
    featured: true
  },
  {
    id: "4",
    title: "Green Box",
    slug: "green-box-expansion",
    description: "300 more cards about money, business, and capitalism.",
    price: 1500,
    images: [
      { url: "https://images.unsplash.com/photo-1570303345511-5e8c8e5e5e5e?w=800&h=800&fit=crop", alt: "Green Box Expansion" }
    ],
    category: "Expansion",
    inStock: true,
    featured: true
  },
  {
    id: "5",
    title: "Absurd Box",
    slug: "absurd-box-expansion",
    description: "300 cards that are too absurd for the main game.",
    price: 1500,
    images: [
      { url: "https://images.unsplash.com/photo-1570303345338-e1f0eddf4946?w=800&h=800&fit=crop", alt: "Absurd Box" }
    ],
    category: "Expansion",
    inStock: true,
    featured: false
  },
  {
    id: "6",
    title: "Period Pack",
    slug: "period-pack",
    description: "30 cards about menstruation.",
    price: 500,
    images: [
      { url: "https://images.unsplash.com/photo-1570303345610-7c6b9e2e7b5e?w=800&h=800&fit=crop", alt: "Period Pack" }
    ],
    category: "Mini Pack",
    inStock: true,
    featured: false
  }
]

export const mockNavigation = {
  items: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ]
}

export const mockFooter = {
  description: "Cards Against Humanity is a party game for horrible people.",
  links: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact Us", href: "/contact" }
  ],
  social: [
    { platform: "Twitter", url: "https://twitter.com/cahgame" },
    { platform: "Facebook", url: "https://facebook.com/cardsagainsthumanity" },
    { platform: "Instagram", url: "https://instagram.com/cardsagainsthumanity" }
  ],
  copyright: "© 2024 Cards Against Humanity LLC. All rights reserved."
}
