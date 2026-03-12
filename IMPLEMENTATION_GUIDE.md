# Complete Implementation Guide

This guide will walk you through setting up and running the entire e-commerce platform step by step.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Frontend Setup](#frontend-setup)
3. [CMS Setup](#cms-setup)
4. [Backend Setup](#backend-setup)
5. [Sync Service Setup](#sync-service-setup)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Loom Video Guide](#loom-video-guide)

## Prerequisites

### Required Software
- **Node.js**: Version 18 or higher
- **npm** or **yarn**: Package manager
- **Git**: Version control
- **MongoDB**: For Payload CMS (or use MongoDB Atlas)
- **PostgreSQL**: For Medusa.js (or use Render's database)

### Accounts Needed
- GitHub account (for code hosting)
- Vercel account (for frontend + CMS deployment)
- Render account (for backend deployment)
- MongoDB Atlas account (for CMS database)

## Frontend Setup

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Create Environment File
Create `frontend/.env.local`:
```env
NEXT_PUBLIC_MEDUSA_URL=http://localhost:9000
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATION_SECRET=your-secret-key-here
```

### Step 3: Run Development Server
```bash
npm run dev
```

The frontend will be available at http://localhost:3000

### Step 4: Verify Installation
- Open http://localhost:3000 in your browser
- You should see the homepage (may show placeholder content initially)

## CMS Setup

### Step 1: Create CMS Directory
```bash
mkdir cms
cd cms
```

### Step 2: Initialize Payload CMS
```bash
npx create-payload-app@latest .
```

Choose the following options:
- Template: blank
- Database: MongoDB (or PostgreSQL)
- TypeScript: Yes

### Step 3: Install Additional Dependencies
```bash
npm install @payloadcms/plugin-cloud-storage
```

### Step 4: Create Collections

Create `cms/src/collections/Products.ts`:
```typescript
import { CollectionConfig } from 'payload/types';

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'galleryImages',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'medusaProductId',
      type: 'text',
    },
    {
      name: 'medusaVariantIds',
      type: 'array',
      fields: [
        {
          name: 'variantId',
          type: 'text',
        },
      ],
    },
    {
      name: 'category',
      type: 'text',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // Trigger sync to Medusa
        if (operation === 'create' || operation === 'update') {
          // Call sync service
          await fetch('http://localhost:3002/sync/cms-to-medusa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product: doc }),
          });
        }
      },
    ],
  },
};

export default Products;
```

Create `cms/src/collections/HomepageContent.ts`:
```typescript
import { CollectionConfig } from 'payload/types';

const HomepageContent: CollectionConfig = {
  slug: 'homepage-content',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Homepage',
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'ctaText',
          type: 'text',
        },
        {
          name: 'ctaLink',
          type: 'text',
        },
      ],
    },
    {
      name: 'featuredProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'sections',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Gallery', value: 'gallery' },
            { label: 'CTA', value: 'cta' },
          ],
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'content',
          type: 'richText',
        },
        {
          name: 'images',
          type: 'array',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
            },
            {
              name: 'link',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
};

export default HomepageContent;
```

### Step 5: Update Payload Config

Edit `cms/payload.config.ts`:
```typescript
import { buildConfig } from 'payload/config';
import path from 'path';
import Products from './collections/Products';
import HomepageContent from './collections/HomepageContent';
import Users from './collections/Users';
import Media from './collections/Media';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Products,
    HomepageContent,
    Media,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
```

### Step 6: Create Environment File
Create `cms/.env`:
```env
DATABASE_URI=mongodb://localhost:27017/payload-cms
PAYLOAD_SECRET=your-secret-key-here
MEDUSA_WEBHOOK_SECRET=your-webhook-secret
PORT=3001
```

### Step 7: Run CMS
```bash
npm run dev
```

The CMS will be available at http://localhost:3001/admin

### Step 8: Create Admin User
- Open http://localhost:3001/admin
- Create your first admin user
- Log in to the CMS

## Backend Setup (Medusa.js)

### Step 1: Create Backend Directory
```bash
mkdir backend
cd backend
```

### Step 2: Initialize Medusa
```bash
npx create-medusa-app@latest
```

Choose the following options:
- Starter: Default
- Database: PostgreSQL

### Step 3: Create Environment File
Create `backend/.env`:
```env
DATABASE_URL=postgresql://localhost:5432/medusa-db
JWT_SECRET=your-jwt-secret-here
COOKIE_SECRET=your-cookie-secret-here
PAYLOAD_WEBHOOK_SECRET=your-webhook-secret
PORT=9000
```

### Step 4: Run Migrations
```bash
npx medusa migrations run
```

### Step 5: Seed Database (Optional)
```bash
npm run seed
```

### Step 6: Run Backend
```bash
npm run dev
```

The backend will be available at http://localhost:9000

### Step 7: Create Admin User
```bash
npx medusa user -e admin@example.com -p supersecret
```

### Step 8: Access Admin Dashboard
- Open http://localhost:9000/app
- Log in with your admin credentials

## Sync Service Setup

### Step 1: Create Sync Service Directory
```bash
mkdir sync-service
cd sync-service
npm init -y
```

### Step 2: Install Dependencies
```bash
npm install express axios dotenv
npm install -D typescript @types/express @types/node ts-node nodemon
```

### Step 3: Create Sync Service

Create `sync-service/src/index.ts`:
```typescript
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PAYLOAD_URL = process.env.PAYLOAD_URL || 'http://localhost:3001';
const MEDUSA_URL = process.env.MEDUSA_URL || 'http://localhost:9000';

// CMS → Medusa Sync
app.post('/sync/cms-to-medusa', async (req, res) => {
  try {
    const { product } = req.body;

    // Transform CMS product to Medusa format
    const medusaProduct = {
      title: product.title,
      description: product.description,
      handle: product.slug,
      metadata: {
        cmsProductId: product.id,
      },
    };

    // Create or update in Medusa
    if (product.medusaProductId) {
      await axios.put(
        `${MEDUSA_URL}/admin/products/${product.medusaProductId}`,
        medusaProduct
      );
    } else {
      const response = await axios.post(
        `${MEDUSA_URL}/admin/products`,
        medusaProduct
      );
      
      // Update CMS with Medusa ID
      await axios.patch(
        `${PAYLOAD_URL}/api/products/${product.id}`,
        { medusaProductId: response.data.product.id }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ error: 'Sync failed' });
  }
});

// Medusa → CMS Sync
app.post('/sync/medusa-to-cms', async (req, res) => {
  try {
    const { product } = req.body;

    // Find CMS product by Medusa ID
    const cmsResponse = await axios.get(
      `${PAYLOAD_URL}/api/products?where[medusaProductId][equals]=${product.id}`
    );

    if (cmsResponse.data.docs.length > 0) {
      const cmsProduct = cmsResponse.data.docs[0];

      // Update inventory and pricing
      await axios.patch(
        `${PAYLOAD_URL}/api/products/${cmsProduct.id}`,
        {
          price: product.variants[0]?.prices[0]?.amount || cmsProduct.price,
        }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ error: 'Sync failed' });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Sync service running on port ${PORT}`);
});
```

### Step 4: Create Environment File
Create `sync-service/.env`:
```env
PAYLOAD_URL=http://localhost:3001
MEDUSA_URL=http://localhost:9000
PORT=3002
```

### Step 5: Add Scripts to package.json
```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

### Step 6: Run Sync Service
```bash
npm run dev
```

## Testing

### 1. Test Frontend
- Open http://localhost:3000
- Navigate through pages
- Test responsive design (resize browser)

### 2. Test CMS
- Log in to http://localhost:3001/admin
- Create a product
- Upload images
- Verify product appears in frontend

### 3. Test Backend
- Log in to http://localhost:9000/app
- View products
- Test cart functionality

### 4. Test Sync
- Create product in CMS
- Verify it appears in Medusa
- Update inventory in Medusa
- Verify it updates in CMS

### 5. Run Lighthouse Audit
```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

## Deployment

### Deploy Frontend to Vercel

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Next.js
   - Root Directory: frontend
   - Environment Variables: Add all from `.env.local`
6. Click "Deploy"

### Deploy CMS to Vercel

1. In Vercel, create another project
2. Import same repository
3. Configure:
   - Framework Preset: Other
   - Root Directory: cms
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: Add all from `.env`
4. Click "Deploy"

### Deploy Backend to Render

1. Go to [Render](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Name: medusa-backend
   - Root Directory: backend
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`
   - Environment Variables: Add all from `.env`
5. Create PostgreSQL database in Render
6. Update `DATABASE_URL` with Render's database URL
7. Click "Create Web Service"

## Loom Video Guide

### What to Include in Your Loom Video

1. **Introduction** (30 seconds)
   - Your name
   - Project overview
   - Tech stack used

2. **Code Structure** (2 minutes)
   - Show project directory structure
   - Explain frontend, CMS, backend organization
   - Highlight key files

3. **Frontend Demo** (3 minutes)
   - Show homepage
   - Navigate to product page
   - Demonstrate cart functionality
   - Show checkout flow
   - Test responsive design

4. **CMS Demo** (2 minutes)
   - Log in to CMS admin
   - Show product collection
   - Create/edit a product
   - Show how content updates frontend

5. **Backend Demo** (2 minutes)
   - Log in to Medusa admin
   - Show products
   - Demonstrate sync functionality

6. **Lighthouse Score** (1 minute)
   - Run Lighthouse audit
   - Show 90+ scores
   - Explain optimizations

7. **Deployment** (1 minute)
   - Show live URLs
   - Demonstrate production site

8. **Conclusion** (30 seconds)
   - Summarize achievements
   - Thank reviewers

### Recording Tips
- Use clear audio
- Show your face (optional but recommended)
- Keep it under 12 minutes
- Practice before recording
- Use annotations to highlight important points

## Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
# Kill process on port 3000
npx kill-port 3000
```

**Database Connection Error:**
- Verify MongoDB/PostgreSQL is running
- Check connection strings in `.env`

**Module Not Found:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build Errors:**
- Check TypeScript errors: `npm run type-check`
- Check linting: `npm run lint`

## Next Steps

1. ✅ Complete all setup steps
2. ✅ Test locally
3. ✅ Deploy to production
4. ✅ Run Lighthouse audit
5. ✅ Record Loom video
6. ✅ Submit via Google Form

## Support

If you encounter issues:
1. Check this guide thoroughly
2. Review error messages carefully
3. Search for solutions online
4. Contact via email (only for assignment questions)

Good luck with your internship submission! 🚀
