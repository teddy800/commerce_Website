import axios from 'axios'

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_URL || 'http://localhost:9000'

const medusaClient = axios.create({
  baseURL: MEDUSA_URL,
  withCredentials: true,
})

export const medusaAPI = {
  // Products
  getProducts: async (params?: any) => {
    const response = await medusaClient.get('/store/products', { params })
    return response.data
  },

  getProduct: async (id: string) => {
    const response = await medusaClient.get(`/store/products/${id}`)
    return response.data
  },

  // Cart
  createCart: async () => {
    const response = await medusaClient.post('/store/carts')
    return response.data
  },

  getCart: async (cartId: string) => {
    const response = await medusaClient.get(`/store/carts/${cartId}`)
    return response.data
  },

  addToCart: async (cartId: string, variantId: string, quantity: number) => {
    const response = await medusaClient.post(`/store/carts/${cartId}/line-items`, {
      variant_id: variantId,
      quantity,
    })
    return response.data
  },

  removeFromCart: async (cartId: string, lineItemId: string) => {
    const response = await medusaClient.delete(`/store/carts/${cartId}/line-items/${lineItemId}`)
    return response.data
  },

  updateLineItem: async (cartId: string, lineItemId: string, quantity: number) => {
    const response = await medusaClient.post(`/store/carts/${cartId}/line-items/${lineItemId}`, {
      quantity,
    })
    return response.data
  },

  // Customers
  registerCustomer: async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await medusaClient.post('/store/customers', {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    })
    return response.data
  },

  loginCustomer: async (email: string, password: string) => {
    const response = await medusaClient.post('/store/auth', {
      email,
      password,
    })
    return response.data
  },

  getCustomer: async () => {
    const response = await medusaClient.get('/store/customers/me')
    return response.data
  },

  // Orders
  createOrder: async (cartId: string) => {
    const response = await medusaClient.post(`/store/carts/${cartId}/complete`)
    return response.data
  },

  getOrder: async (orderId: string) => {
    const response = await medusaClient.get(`/store/orders/${orderId}`)
    return response.data
  },
}

// Named exports for convenience
export const getMedusaProduct = medusaAPI.getProduct
export const getMedusaProducts = medusaAPI.getProducts

export { medusaClient }
export default medusaClient
