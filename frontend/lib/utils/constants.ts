/**
 * API URLs
 */
export const API_URLS = {
  MEDUSA: process.env.NEXT_PUBLIC_MEDUSA_URL || 'http://localhost:9000',
  PAYLOAD: process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001',
  SITE: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
}

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
}

/**
 * Cache durations (in seconds)
 */
export const CACHE_DURATIONS = {
  SHORT: 60,
  MEDIUM: 300,
  LONG: 3600,
  VERY_LONG: 86400,
}

/**
 * Product categories
 */
export const PRODUCT_CATEGORIES = [
  'Strategy',
  'Party',
  'Adventure',
  'Classic',
  'New Releases',
  'Best Sellers',
]

/**
 * Shipping methods
 */
export const SHIPPING_METHODS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    price: 0,
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    price: 15,
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day',
    price: 30,
  },
]

/**
 * Payment methods
 */
export const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card' },
  { id: 'paypal', name: 'PayPal' },
  { id: 'apple_pay', name: 'Apple Pay' },
  { id: 'google_pay', name: 'Google Pay' },
]

/**
 * Order statuses
 */
export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
}

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please try again.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  WEAK_PASSWORD: 'Password must be at least 8 characters.',
  PASSWORDS_DONT_MATCH: 'Passwords do not match.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_FORM: 'Please check your form and try again.',
}

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  ADDED_TO_CART: 'Item added to cart!',
  REMOVED_FROM_CART: 'Item removed from cart.',
  ACCOUNT_CREATED: 'Account created successfully!',
  LOGGED_IN: 'Logged in successfully!',
  LOGGED_OUT: 'Logged out successfully!',
  ORDER_PLACED: 'Order placed successfully!',
}

/**
 * Regex patterns
 */
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\d\s\-\+\(\)]+$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
  CARD_NUMBER: /^\d{13,19}$/,
}

/**
 * Local storage keys
 */
export const LOCAL_STORAGE_KEYS = {
  CART_ID: 'cart_id',
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  PREFERENCES: 'preferences',
}
