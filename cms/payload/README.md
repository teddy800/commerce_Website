# Payload CMS - Card Game Store

Payload CMS for managing all content including products, homepage sections, navigation, and footer.

## Features

- Product content management
- Homepage sections and hero
- Navigation menu management
- Footer content management
- Media library with image optimization
- Webhook support for Medusa sync
- REST API for frontend

## Tech Stack

- **CMS**: Payload CMS
- **Database**: MongoDB
- **Language**: TypeScript/JavaScript

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB 5+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update environment variables
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cah_cms
PAYLOAD_SECRET=your-secret-key
```

### Development

```bash
npm run dev
```

Admin panel runs on http://localhost:3001/admin

### Build

```bash
npm run build
npm start
```

## Project Structure

```
cms/payload/
├── src/
│   ├── collections/         # Content collections
│   │   ├── Products.ts
│   │   ├── HomepageContent.ts
│   │   ├── Navigation.ts
│   │   └── Footer.ts
│   ├── globals/             # Global settings
│   ├── access/              # Access control
│   ├── hooks/               # Lifecycle hooks
│   ├── endpoints/           # Custom endpoints
│   └── payload.config.ts    # Configuration
└── package.json
```

## Collections

### Products
- Title, slug, description
- Hero image and gallery
- Price (synced from Medusa)
- Variants and inventory
- SEO metadata
- Related products

### Homepage Content
- Hero section (title, subtitle, image, CTA)
- Content sections (text, images, CTAs)
- Featured products
- Footer content

### Navigation
- Menu items with links
- Nested navigation support
- Order/priority

### Footer
- Links and social media
- Copyright text
- Contact information

## API Endpoints

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `POST /api/products` - Create product
- `PATCH /api/products/:id` - Update product

### Homepage Content
- `GET /api/homepage-content` - Get homepage
- `PATCH /api/homepage-content/:id` - Update homepage

### Navigation
- `GET /api/navigation` - Get navigation
- `PATCH /api/navigation/:id` - Update navigation

### Footer
- `GET /api/footer` - Get footer
- `PATCH /api/footer/:id` - Update footer

## Webhooks

Send webhooks to Medusa on:
- Product created
- Product updated
- Product deleted

## Environment Variables

```
NODE_ENV=development
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cah_cms
PAYLOAD_SECRET=your-secret-key
MEDUSA_WEBHOOK_SECRET=your-medusa-secret
MEDUSA_URL=http://localhost:9000
```

## Deployment

### Vercel

1. Create new project on Vercel
2. Connect GitHub repository
3. Set environment variables
4. Deploy

## License

MIT
