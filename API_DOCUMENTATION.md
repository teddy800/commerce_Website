# API Documentation

Complete API reference for the Cards Against Humanity E-commerce Platform.

## Base URLs

### Development
- **Frontend**: `http://localhost:3000`
- **Payload CMS**: `http://localhost:3001`
- **Medusa Backend**: `http://localhost:9000`
- **Sync Service**: `http://localhost:3002`

### Production
- **Frontend**: `https://your-frontend.vercel.app`
- **Payload CMS**: `https://your-cms.vercel.app`
- **Medusa Backend**: `https://your-backend.onrender.com`
- **Sync Service**: `https://your-sync.onrender.com`

---

## Frontend API Routes

### Cart API

#### Get Cart
```http
GET /api/cart
```

**Response**:
```json
{
  "cart": {
    "id": "cart_123",
    "items": [...],
    "total": 5000
  }
}
```

#### Add to Cart
```http
POST /api/cart
Content-Type: application/json

{
  "variantId": "variant_123",
  "quantity": 1
}
```

**Response**:
```json
{
  "cart": {
    "id": "cart_123",
    "items": [...],
    "total": 5000
  }
}
```

#### Update Cart Item
```http
PATCH /api/cart
Content-Type: application/json

{
  "lineItemId": "item_123",
  "quantity": 2
}
```

#### Remove from Cart
```http
DELETE /api/cart?lineItemId=item_123
```

### Authentication API

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response**:
```json
{
  "customer": {
    "id": "cus_123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "customer": {
    "id": "cus_123",
    "email": "user@example.com"
  },
  "token": "jwt_token_here"
}
```

### Checkout API

#### Create Order
```http
POST /api/checkout/create-order
Content-Type: application/json

{
  "cartId": "cart_123",
  "shipping": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "US"
  },
  "billing": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "US"
  },
  "payment": {
    "provider": "stripe",
    "data": {
      "token": "tok_visa"
    }
  }
}
```

#### Complete Checkout
```http
POST /api/checkout/complete
Content-Type: application/json

{
  "cartId": "cart_123"
}
```

**Response**:
```json
{
  "order": {
    "id": "order_123",
    "total": 5000,
    "status": "pending"
  }
}
```

### Revalidation API

#### Revalidate Path
```http
POST /api/revalidate
Content-Type: application/json
X-Revalidate-Secret: your-secret

{
  "path": "/"
}
```

---

## Payload CMS API

### Products

#### Get All Products
```http
GET /api/products
```

**Query Parameters**:
- `limit`: Number of products (default: 10)
- `page`: Page number (default: 1)
- `where[featured][equals]`: Filter by featured status
- `where[inStock][equals]`: Filter by stock status

**Response**:
```json
{
  "docs": [
    {
      "id": "prod_123",
      "title": "Product Name",
      "slug": "product-name",
      "description": "Product description",
      "price": 2500,
      "images": [...],
      "inStock": true,
      "featured": false
    }
  ],
  "totalDocs": 10,
  "limit": 10,
  "page": 1,
  "totalPages": 1
}
```

#### Get Single Product
```http
GET /api/products/:id
```

**Response**:
```json
{
  "id": "prod_123",
  "title": "Product Name",
  "slug": "product-name",
  "description": "Product description",
  "longDescription": "...",
  "price": 2500,
  "compareAtPrice": 3000,
  "images": [
    {
      "image": {
        "url": "/media/image.jpg",
        "alt": "Product image"
      }
    }
  ],
  "category": "Card Games",
  "tags": ["funny", "party"],
  "inStock": true,
  "inventory": 100,
  "featured": false,
  "medusaId": "prod_medusa_123",
  "variants": [...]
}
```

#### Create Product (Admin)
```http
POST /api/products
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "New Product",
  "slug": "new-product",
  "description": "Product description",
  "price": 2500,
  "images": [...],
  "inStock": true
}
```

#### Update Product (Admin)
```http
PATCH /api/products/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "price": 2000,
  "inventory": 50
}
```

### Homepage Content

#### Get Homepage Content
```http
GET /api/homepage-content
```

**Response**:
```json
{
  "docs": [
    {
      "id": "home_123",
      "title": "Homepage",
      "hero": {
        "headline": "Welcome",
        "subheadline": "Shop now",
        "ctaText": "Shop Now",
        "ctaLink": "/products",
        "backgroundImage": {...}
      },
      "sections": [...],
      "featuredProducts": {
        "title": "Featured Products",
        "products": [...]
      }
    }
  ]
}
```

### Navigation

#### Get Navigation
```http
GET /api/navigation
```

**Response**:
```json
{
  "docs": [
    {
      "id": "nav_123",
      "title": "Main Navigation",
      "items": [
        {
          "label": "Home",
          "url": "/",
          "openInNewTab": false,
          "order": 0
        },
        {
          "label": "Products",
          "url": "/products",
          "openInNewTab": false,
          "order": 1
        }
      ]
    }
  ]
}
```

### Footer Content

#### Get Footer Content
```http
GET /api/footer-content
```

**Response**:
```json
{
  "docs": [
    {
      "id": "footer_123",
      "title": "Footer",
      "columns": [...],
      "socialMedia": [...],
      "copyright": "© 2024 Company"
    }
  ]
}
```

### Media

#### Upload Media (Admin)
```http
POST /api/media
Content-Type: multipart/form-data
Authorization: Bearer <token>

file: <image-file>
alt: "Image description"
```

---

## Medusa Backend API

### Products

#### Get All Products
```http
GET /store/products
```

**Query Parameters**:
- `limit`: Number of products
- `offset`: Pagination offset
- `q`: Search query

**Response**:
```json
{
  "products": [
    {
      "id": "prod_123",
      "title": "Product Name",
      "handle": "product-name",
      "description": "Product description",
      "thumbnail": "https://...",
      "images": [...],
      "variants": [...],
      "options": [...]
    }
  ],
  "count": 10,
  "offset": 0,
  "limit": 10
}
```

#### Get Single Product
```http
GET /store/products/:id
```

### Cart

#### Create Cart
```http
POST /store/carts
Content-Type: application/json

{
  "region_id": "reg_123"
}
```

**Response**:
```json
{
  "cart": {
    "id": "cart_123",
    "items": [],
    "region": {...},
    "total": 0
  }
}
```

#### Get Cart
```http
GET /store/carts/:id
```

#### Add Line Item
```http
POST /store/carts/:id/line-items
Content-Type: application/json

{
  "variant_id": "variant_123",
  "quantity": 1
}
```

#### Update Line Item
```http
POST /store/carts/:id/line-items/:line_id
Content-Type: application/json

{
  "quantity": 2
}
```

#### Delete Line Item
```http
DELETE /store/carts/:id/line-items/:line_id
```

### Customers

#### Create Customer
```http
POST /store/customers
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe"
}
```

#### Authenticate Customer
```http
POST /store/auth
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "customer": {
    "id": "cus_123",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

### Orders

#### Get Customer Orders
```http
GET /store/customers/me/orders
Authorization: Bearer <token>
```

#### Get Single Order
```http
GET /store/orders/:id
```

### Checkout

#### Add Shipping Address
```http
POST /store/carts/:id/shipping-address
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "address_1": "123 Main St",
  "city": "New York",
  "province": "NY",
  "postal_code": "10001",
  "country_code": "us"
}
```

#### Add Shipping Method
```http
POST /store/carts/:id/shipping-methods
Content-Type: application/json

{
  "option_id": "so_123"
}
```

#### Complete Cart
```http
POST /store/carts/:id/complete
```

**Response**:
```json
{
  "type": "order",
  "data": {
    "id": "order_123",
    "status": "pending",
    "total": 5000,
    "items": [...]
  }
}
```

---

## Sync Service API

### CMS to Medusa Sync

#### Sync Product
```http
POST /sync/cms-to-medusa
Content-Type: application/json
X-Payload-Secret: your-secret

{
  "operation": "create",
  "doc": {
    "id": "prod_123",
    "title": "Product Name",
    "slug": "product-name",
    "price": 2500,
    ...
  },
  "collection": "products"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Product create synced successfully",
  "result": {
    "medusaId": "prod_medusa_123",
    "action": "created"
  }
}
```

### Medusa to CMS Sync

#### Sync Inventory
```http
POST /sync/medusa-to-cms
Content-Type: application/json
X-Medusa-Secret: your-secret

{
  "event": "product.updated",
  "data": {
    "id": "prod_medusa_123",
    "inventory_quantity": 50
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Inventory synced to CMS",
  "result": {
    "action": "updated",
    "productId": "prod_123"
  }
}
```

---

## Error Responses

### Standard Error Format
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

### Common Error Codes

#### 400 Bad Request
```json
{
  "error": "Invalid request data",
  "code": "INVALID_DATA"
}
```

#### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "code": "UNAUTHORIZED"
}
```

#### 404 Not Found
```json
{
  "error": "Resource not found",
  "code": "NOT_FOUND"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "code": "INTERNAL_ERROR"
}
```

---

## Rate Limiting

### Development
- No rate limiting

### Production
- **Frontend API**: 100 requests/minute per IP
- **Payload CMS**: 60 requests/minute per IP
- **Medusa Backend**: 100 requests/minute per IP
- **Sync Service**: 30 requests/minute per IP

---

## Authentication

### JWT Tokens
- **Expiry**: 24 hours
- **Refresh**: Not implemented (use re-login)
- **Storage**: httpOnly cookies

### API Keys
- **Medusa Admin**: Use admin JWT token
- **Payload Admin**: Use admin JWT token
- **Sync Service**: Use webhook secrets

---

## Webhooks

### Payload CMS Webhooks

#### Product Created/Updated
```json
{
  "operation": "create",
  "doc": {...},
  "collection": "products"
}
```

### Medusa Webhooks

#### Product Updated
```json
{
  "event": "product.updated",
  "data": {...}
}
```

#### Inventory Updated
```json
{
  "event": "product-variant.updated",
  "data": {...}
}
```

---

## Testing

### Test Credentials

#### Stripe Test Cards
```
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
```

#### Test User
```
Email: test@example.com
Password: Test123!
```

---

## Postman Collection

Import this collection to test all APIs:

```json
{
  "info": {
    "name": "CAH E-commerce API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [...]
}
```

---

## Support

For API issues:
1. Check error response
2. Verify authentication
3. Check request format
4. Review API documentation
5. Check service logs

---

**Last Updated**: March 2024
