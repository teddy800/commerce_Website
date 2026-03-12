# Card Game Store - Frontend

A modern e-commerce frontend built with Next.js, Tailwind CSS, and TypeScript for selling card games.

## Features

- **Homepage** - Hero section with featured products
- **Product Catalog** - Browse and search products
- **Product Details** - Detailed product pages with images and variants
- **Shopping Cart** - Add/remove items, adjust quantities
- **Checkout** - Multi-step checkout process
- **User Authentication** - Sign up and login
- **Responsive Design** - Mobile-first design for all devices
- **Performance Optimized** - Image optimization, code splitting, ISR
- **SEO Optimized** - Meta tags, structured data, sitemap

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Update environment variables
NEXT_PUBLIC_MEDUSA_URL=http://localhost:9000
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   └── account/           # User authentication
├── components/            # React components
│   ├── layout/            # Layout components
│   ├── homepage/          # Homepage components
│   ├── product/           # Product components
│   ├── cart/              # Cart components
│   └── common/            # Shared components
├── lib/                   # Utilities and helpers
│   ├── api/               # API clients
│   └── store/             # Zustand stores
├── public/                # Static assets
└── styles/                # Global styles
```

## API Integration

### Payload CMS

Fetches content for:
- Homepage hero and sections
- Product descriptions and metadata
- Navigation and footer

### Medusa.js

Handles:
- Product catalog and variants
- Shopping cart operations
- Order creation
- Customer authentication

## Performance

- **Lighthouse Score**: 90+
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## Deployment

### Vercel

```bash
# Connect GitHub repo to Vercel
# Set environment variables
# Deploy automatically on push
```

## Environment Variables

```
NEXT_PUBLIC_MEDUSA_URL=http://localhost:9000
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## License

MIT
