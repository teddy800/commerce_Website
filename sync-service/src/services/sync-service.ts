import axios from 'axios';

const MEDUSA_API_URL = process.env.MEDUSA_API_URL || 'http://localhost:9000';
const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL || 'http://localhost:3001';
const MEDUSA_API_KEY = process.env.MEDUSA_API_KEY || '';

// CMS to Medusa sync
export async function syncProductToMedusa(cmsProduct: any, operation: string) {
  const medusaClient = axios.create({
    baseURL: MEDUSA_API_URL,
    headers: {
      'x-medusa-access-token': MEDUSA_API_KEY,
      'Content-Type': 'application/json',
    },
  });

  // Transform CMS product to Medusa format
  const medusaProduct = {
    title: cmsProduct.title,
    subtitle: cmsProduct.description,
    description: cmsProduct.longDescription,
    handle: cmsProduct.slug,
    is_giftcard: false,
    discountable: true,
    images: cmsProduct.images?.map((img: any) => ({
      url: `${PAYLOAD_API_URL}${img.image.url}`,
    })) || [],
    thumbnail: cmsProduct.images?.[0]?.image?.url 
      ? `${PAYLOAD_API_URL}${cmsProduct.images[0].image.url}` 
      : undefined,
    options: [
      {
        title: 'Default',
      },
    ],
    variants: cmsProduct.variants?.length > 0 
      ? cmsProduct.variants.map((variant: any) => ({
          title: variant.title,
          prices: [
            {
              amount: variant.price,
              currency_code: 'usd',
            },
          ],
          sku: variant.sku,
          inventory_quantity: variant.inventory || 0,
          manage_inventory: true,
        }))
      : [
          {
            title: 'Default',
            prices: [
              {
                amount: cmsProduct.price,
                currency_code: 'usd',
              },
            ],
            inventory_quantity: cmsProduct.inventory || 0,
            manage_inventory: true,
          },
        ],
  };

  try {
    if (operation === 'create' && !cmsProduct.medusaId) {
      // Create new product in Medusa
      const response = await medusaClient.post('/admin/products', medusaProduct);
      const medusaId = response.data.product.id;

      // Update CMS with Medusa ID
      await updateCmsProduct(cmsProduct.id, { medusaId });

      return { medusaId, action: 'created' };
    } else if (operation === 'update' && cmsProduct.medusaId) {
      // Update existing product in Medusa
      await medusaClient.post(`/admin/products/${cmsProduct.medusaId}`, medusaProduct);

      return { medusaId: cmsProduct.medusaId, action: 'updated' };
    }

    return { action: 'skipped' };
  } catch (error: any) {
    console.error('Medusa API error:', error.response?.data || error.message);
    throw error;
  }
}

// Medusa to CMS sync
export async function syncInventoryToCms(medusaData: any) {
  const payloadClient = axios.create({
    baseURL: PAYLOAD_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    // Find CMS product by Medusa ID
    const searchResponse = await payloadClient.get('/api/products', {
      params: {
        where: {
          medusaId: {
            equals: medusaData.id,
          },
        },
      },
    });

    if (searchResponse.data.docs.length === 0) {
      console.log('No matching CMS product found');
      return { action: 'skipped' };
    }

    const cmsProduct = searchResponse.data.docs[0];

    // Update inventory in CMS
    await payloadClient.patch(`/api/products/${cmsProduct.id}`, {
      inventory: medusaData.inventory_quantity || 0,
      inStock: (medusaData.inventory_quantity || 0) > 0,
    });

    return { action: 'updated', productId: cmsProduct.id };
  } catch (error: any) {
    console.error('Payload API error:', error.response?.data || error.message);
    throw error;
  }
}

// Helper function to update CMS product
async function updateCmsProduct(productId: string, data: any) {
  const payloadClient = axios.create({
    baseURL: PAYLOAD_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  await payloadClient.patch(`/api/products/${productId}`, data);
}
