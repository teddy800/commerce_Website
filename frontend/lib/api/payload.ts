import axios from 'axios'
import { mockHomepageContent, mockProducts, mockNavigation, mockFooter } from '../mock-data'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'

const payloadClient = axios.create({
  baseURL: `${PAYLOAD_URL}/api`,
  timeout: 3000, // 3 second timeout
})

export const payloadAPI = {
  // Homepage Content
  getHomepageContent: async () => {
    if (USE_MOCK_DATA) {
      return mockHomepageContent
    }
    
    try {
      const response = await payloadClient.get('/homepage-content')
      return response.data
    } catch (error) {
      console.warn('Using mock homepage content due to API error')
      return mockHomepageContent
    }
  },

  // Products
  getProducts: async (params?: any) => {
    if (USE_MOCK_DATA) {
      return { docs: mockProducts }
    }
    
    try {
      const response = await payloadClient.get('/products', { params })
      return response.data
    } catch (error) {
      console.warn('Using mock products due to API error')
      return { docs: mockProducts }
    }
  },

  getProduct: async (slug: string) => {
    if (USE_MOCK_DATA) {
      return mockProducts.find(p => p.slug === slug) || null
    }
    
    try {
      const response = await payloadClient.get('/products', {
        params: { where: { slug: { equals: slug } } },
      })
      return response.data.docs[0] || null
    } catch (error) {
      console.warn('Using mock product due to API error')
      return mockProducts.find(p => p.slug === slug) || null
    }
  },

  // Navigation
  getNavigation: async () => {
    if (USE_MOCK_DATA) {
      return mockNavigation
    }
    
    try {
      const response = await payloadClient.get('/navigation')
      return response.data
    } catch (error) {
      console.warn('Using mock navigation due to API error')
      return mockNavigation
    }
  },

  // Footer
  getFooter: async () => {
    if (USE_MOCK_DATA) {
      return mockFooter
    }
    
    try {
      const response = await payloadClient.get('/footer')
      return response.data
    } catch (error) {
      console.warn('Using mock footer due to API error')
      return mockFooter
    }
  },
}

// Named exports for convenience
export const getHomepageContent = payloadAPI.getHomepageContent
export const getProducts = payloadAPI.getProducts
export const getProduct = payloadAPI.getProduct
export const getProductBySlug = payloadAPI.getProduct
export const getNavigation = payloadAPI.getNavigation
export const getFooter = payloadAPI.getFooter

export default payloadClient
