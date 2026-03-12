import axios from 'axios'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'

const payloadClient = axios.create({
  baseURL: `${PAYLOAD_URL}/api`,
})

export const payloadAPI = {
  // Homepage Content
  getHomepageContent: async () => {
    try {
      const response = await payloadClient.get('/homepage-content')
      return response.data
    } catch (error) {
      console.error('Error fetching homepage content:', error)
      return null
    }
  },

  // Products
  getProducts: async (params?: any) => {
    try {
      const response = await payloadClient.get('/products', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching products:', error)
      return { docs: [] }
    }
  },

  getProduct: async (slug: string) => {
    try {
      const response = await payloadClient.get('/products', {
        params: { where: { slug: { equals: slug } } },
      })
      return response.data.docs[0] || null
    } catch (error) {
      console.error('Error fetching product:', error)
      return null
    }
  },

  // Navigation
  getNavigation: async () => {
    try {
      const response = await payloadClient.get('/navigation')
      return response.data
    } catch (error) {
      console.error('Error fetching navigation:', error)
      return null
    }
  },

  // Footer
  getFooter: async () => {
    try {
      const response = await payloadClient.get('/footer')
      return response.data
    } catch (error) {
      console.error('Error fetching footer:', error)
      return null
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
