// Product Types
export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  heroImage: {
    url: string;
    alt?: string;
  };
  galleryImages?: Array<{
    url: string;
    alt?: string;
  }>;
  price: number;
  medusaProductId?: string;
  medusaVariantIds?: string[];
  category?: string;
  tags?: string[];
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Homepage Types
export interface HomepageContent {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: {
      url: string;
      alt?: string;
    };
    ctaText: string;
    ctaLink: string;
  };
  sections: ContentSection[];
  featuredProducts: Product[];
  footer: {
    links: Link[];
    socialLinks: Link[];
    copyright: string;
  };
  seo: SEO;
}

export interface ContentSection {
  id: string;
  type: 'hero' | 'text' | 'gallery' | 'cta' | 'products';
  title?: string;
  content?: string;
  images?: Array<{
    url: string;
    alt?: string;
  }>;
  cta?: {
    text: string;
    link: string;
  };
  order: number;
}

export interface Link {
  label: string;
  href: string;
}

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
}

// Medusa Types
export interface MedusaProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  variants: ProductVariant[];
  images: ProductImage[];
  metadata?: {
    cmsProductId?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  title: string;
  sku: string;
  barcode?: string;
  prices: Array<{
    amount: number;
    currency_code: string;
  }>;
  inventory_quantity: number;
  manage_inventory: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text?: string;
  order: number;
}

// Cart Types
export interface Cart {
  id: string;
  customer_id?: string;
  items: LineItem[];
  subtotal: number;
  tax_total: number;
  shipping_total: number;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface LineItem {
  id: string;
  cart_id: string;
  product_id: string;
  variant_id: string;
  title: string;
  thumbnail?: string;
  quantity: number;
  unit_price: number;
  total: number;
  variant?: ProductVariant;
}

// Order Types
export interface Order {
  id: string;
  customer_id: string;
  items: LineItem[];
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'awaiting' | 'captured' | 'refunded';
  fulfillment_status: 'not_fulfilled' | 'partially_fulfilled' | 'fulfilled';
  subtotal: number;
  tax_total: number;
  shipping_total: number;
  total: number;
  created_at: string;
  updated_at: string;
}

// Customer Types
export interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  addresses: Address[];
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  customer_id: string;
  first_name: string;
  last_name: string;
  street_1: string;
  street_2?: string;
  city: string;
  province: string;
  postal_code: string;
  country_code: string;
  is_default_billing: boolean;
  is_default_shipping: boolean;
}
