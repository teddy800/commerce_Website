# System Architecture Guide

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                     http://localhost:3000                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                        │
│                     Port: 3000                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  • Homepage (CAH Clone)                              │  │
│  │  • Product Pages                                     │  │
│  │  • Cart & Checkout                                   │  │
│  │  • User Authentication                               │  │
│  └──────────────────────────────────────────────────────┘  │
└───────┬─────────────────────────────────┬──────────────────┘
        │                                 │
        │ API Calls                       │ API Calls
        ▼                                 ▼
┌──────────────────────┐         ┌──────────────────────┐
│   PAYLOAD CMS        │◄───────►│   MEDUSA.JS          │
│   Port: 3001         │  Sync   │   Port: 9000         │
│                      │         │                      │
│  • Content Mgmt      │         │  • Products          │
│  • Products          │         │  • Cart              │
│  • Images            │         │  • Orders            │
│  • Pages             │         │  • Customers         │
│  • Admin Panel       │         │  • Payments          │
└──────┬───────────────┘         └──────┬───────────────┘
       │                                │
       │ MongoDB                        │ PostgreSQL
       ▼                                ▼
┌──────────────────────┐         ┌──────────────────────┐
│   MONGODB            │         │   POSTGRESQL         │
│   Port: 27017        │         │   Port: 5432         │
│                      │         │                      │
│  • CMS Data          │         │  • Commerce Data     │
│  • Content           │         │  • Products          │
│  • Media             │         │  • Orders            │
└──────────────────────┘         └──────────────────────┘
```

## 🔄 Data Flow

### 1. Content Management Flow

```
Admin → Payload CMS → MongoDB → Sync Service → Medusa → PostgreSQL
                                                    ↓
                                              Frontend (Display)
```

### 2. E-commerce Flow

```
User → Frontend → Medusa API → PostgreSQL
                      ↓
                  Cart/Orders
```

### 3. Two-Way Sync Flow

```
Payload CMS ←→ Sync Service ←→ Medusa.js
     ↓                              ↓
  MongoDB                      PostgreSQL
```

## 📊 Service Details

### Frontend (Next.js)
- **Port**: 3000
- **Purpose**: User-facing website
- **Tech**: Next.js 14, React, Tailwind CSS
- **Features**:
  - Server-side rendering
  - Static generation
  - API routes
  - Image optimization

### Payload CMS
- **Port**: 3001
- **Purpose**: Content management
- **Tech**: Payload CMS, Node.js, MongoDB
- **Features**:
  - Admin panel
  - Content collections
  - Media management
  - Webhooks

### Medusa.js
- **Port**: 9000
- **Purpose**: E-commerce backend
- **Tech**: Medusa.js, Node.js, PostgreSQL
- **Features**:
  - Product management
  - Cart functionality
  - Order processing
  - Customer management
  - Payment integration

### Sync Service
- **Port**: 4000
- **Purpose**: Keep CMS and Commerce in sync
- **Tech**: Express.js, Node.js
- **Features**:
  - Webhook handlers
  - Data transformation
  - Bi-directional sync

## 🔌 API Endpoints

### Frontend API Routes
```
/api/cart              - Cart operations
/api/checkout          - Checkout process
/api/auth/login        - User login
/api/auth/register     - User registration
/api/revalidate        - Cache revalidation
```

### Payload CMS API
```
/api/products          - Product CRUD
/api/homepage-content  - Homepage data
/api/navigation        - Navigation data
/api/footer            - Footer data
/api/media             - Media uploads
```

### Medusa API
```
/store/products        - Get products
/store/carts           - Cart operations
/store/customers       - Customer management
/store/orders          - Order management
/store/auth            - Authentication
```

### Sync Service API
```
/sync/cms-to-medusa    - Sync CMS → Medusa
/sync/medusa-to-cms    - Sync Medusa → CMS
/webhooks/payload      - Payload webhooks
/webhooks/medusa       - Medusa webhooks
```

## 🔐 Authentication Flow

```
1. User enters credentials
   ↓
2. Frontend sends to /api/auth/login
   ↓
3. API calls Medusa /store/auth
   ↓
4. Medusa validates credentials
   ↓
5. Returns JWT token
   ↓
6. Frontend stores token
   ↓
7. Token sent with subsequent requests
```

## 🛒 Cart & Checkout Flow

```
1. User adds product to cart
   ↓
2. Frontend calls /api/cart (POST)
   ↓
3. API creates/updates cart in Medusa
   ↓
4. Cart ID stored in cookie
   ↓
5. User proceeds to checkout
   ↓
6. Frontend calls /api/checkout
   ↓
7. Medusa creates order
   ↓
8. Payment processed (dummy)
   ↓
9. Order confirmation
```

## 📝 Content Update Flow

```
1. Admin updates product in Payload CMS
   ↓
2. Payload triggers webhook
   ↓
3. Sync Service receives webhook
   ↓
4. Sync Service updates Medusa
   ↓
5. Frontend revalidates cache
   ↓
6. Updated content displayed
```

## 🗄️ Database Schema

### MongoDB (Payload CMS)

```javascript
// Products Collection
{
  _id: ObjectId,
  title: String,
  slug: String,
  description: RichText,
  price: Number,
  heroImage: Media,
  galleryImages: [Media],
  medusaProductId: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}

// Homepage Content Collection
{
  _id: ObjectId,
  hero: {
    title: String,
    subtitle: String,
    backgroundImage: Media,
    ctaText: String,
    ctaLink: String
  },
  featuredProducts: [Relationship],
  sections: [ContentSection],
  footer: Object
}
```

### PostgreSQL (Medusa)

```sql
-- Products Table
CREATE TABLE product (
  id VARCHAR PRIMARY KEY,
  title VARCHAR,
  description TEXT,
  handle VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Product Variants Table
CREATE TABLE product_variant (
  id VARCHAR PRIMARY KEY,
  product_id VARCHAR REFERENCES product(id),
  title VARCHAR,
  sku VARCHAR,
  inventory_quantity INTEGER,
  prices JSONB
);

-- Carts Table
CREATE TABLE cart (
  id VARCHAR PRIMARY KEY,
  customer_id VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Orders Table
CREATE TABLE order (
  id VARCHAR PRIMARY KEY,
  customer_id VARCHAR,
  status VARCHAR,
  total INTEGER,
  created_at TIMESTAMP
);
```

## 🔄 Sync Mechanism

### CMS → Commerce Sync

```javascript
// When product created/updated in Payload
1. Payload webhook fires
2. Sync service receives data
3. Transform CMS data to Medusa format
4. Create/update product in Medusa
5. Store medusaProductId in Payload
```

### Commerce → CMS Sync

```javascript
// When product updated in Medusa
1. Medusa webhook fires
2. Sync service receives data
3. Transform Medusa data to CMS format
4. Update product in Payload
5. Maintain data consistency
```

## 🚀 Deployment Architecture

### Development
```
Local Machine
├── Frontend (localhost:3000)
├── Payload CMS (localhost:3001)
├── Medusa (localhost:9000)
├── Sync Service (localhost:4000)
├── MongoDB (localhost:27017)
└── PostgreSQL (localhost:5432)
```

### Production
```
Vercel (Frontend)
├── Next.js App
└── Edge Functions

Vercel (Payload CMS)
├── Payload App
└── MongoDB Atlas

Render (Medusa)
├── Medusa App
└── PostgreSQL (Render)

Render (Sync Service)
└── Express App
```

## 📦 Environment Variables Flow

```
Frontend (.env.local)
├── NEXT_PUBLIC_MEDUSA_URL → Points to Medusa
├── NEXT_PUBLIC_PAYLOAD_URL → Points to Payload
└── NEXT_PUBLIC_SYNC_SERVICE_URL → Points to Sync

Payload (.env)
├── MONGODB_URI → MongoDB connection
├── MEDUSA_URL → Medusa API
└── SYNC_SERVICE_URL → Sync service

Medusa (.env)
├── DATABASE_URL → PostgreSQL connection
├── STORE_CORS → Frontend URL
└── SYNC_SERVICE_URL → Sync service

Sync Service (.env)
├── MEDUSA_URL → Medusa API
└── PAYLOAD_URL → Payload API
```

## 🔍 Request Flow Example

### User Views Product Page

```
1. User navigates to /products/product-slug
   ↓
2. Next.js SSR fetches data
   ↓
3. Calls Payload API: /api/products?slug=product-slug
   ↓
4. Payload returns product data from MongoDB
   ↓
5. Next.js renders page with data
   ↓
6. Page sent to browser
   ↓
7. Client-side hydration
   ↓
8. Interactive page ready
```

### User Adds to Cart

```
1. User clicks "Add to Cart"
   ↓
2. Frontend calls /api/cart (POST)
   ↓
3. API checks for cart ID in cookies
   ↓
4. If no cart, create new cart in Medusa
   ↓
5. Add item to cart via Medusa API
   ↓
6. Store cart ID in cookie
   ↓
7. Return updated cart to frontend
   ↓
8. Update UI (cart count, etc.)
```

## 🎯 Performance Optimization

### Frontend
- Static generation for product pages
- Image optimization with Next.js Image
- Code splitting
- Lazy loading
- CDN caching

### Backend
- Database indexing
- Query optimization
- Caching layer (Redis)
- Connection pooling

### API
- Response compression
- Rate limiting
- API caching
- Efficient queries

## 🔒 Security Measures

### Frontend
- HTTPS only
- CSRF protection
- XSS prevention
- Secure cookies

### Backend
- JWT authentication
- Password hashing
- SQL injection prevention
- Input validation

### API
- CORS configuration
- Rate limiting
- API key authentication
- Request validation

## 📊 Monitoring & Logging

### What to Monitor
- API response times
- Error rates
- Database performance
- User sessions
- Cart abandonment
- Order completion

### Logging
- Application logs
- Error logs
- Access logs
- Audit logs

## 🎓 Key Concepts

### Server-Side Rendering (SSR)
- Pages rendered on server
- Better SEO
- Faster initial load

### Static Site Generation (SSG)
- Pages pre-built at build time
- Fastest performance
- Revalidation for updates

### API Routes
- Backend logic in Next.js
- Serverless functions
- Easy deployment

### Headless CMS
- Content separate from presentation
- API-first approach
- Flexible frontend

### Headless Commerce
- Commerce logic separate from frontend
- API-driven
- Customizable checkout

## 🚀 Scaling Considerations

### Horizontal Scaling
- Multiple frontend instances
- Load balancer
- Database replication

### Vertical Scaling
- Increase server resources
- Optimize queries
- Add caching

### CDN
- Static assets
- Edge caching
- Global distribution

This architecture provides a solid foundation for a modern, scalable e-commerce application! 🎉
