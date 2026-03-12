import { CollectionConfig } from 'payload/types';

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'price', 'medusaId', 'updatedAt'],
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
      admin: {
        description: 'URL-friendly version of the title',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'longDescription',
      type: 'richText',
      admin: {
        description: 'Detailed product description with formatting',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Price in cents (e.g., 2500 = $25.00)',
      },
    },
    {
      name: 'compareAtPrice',
      type: 'number',
      min: 0,
      admin: {
        description: 'Original price for showing discounts (in cents)',
      },
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        description: 'Product category (e.g., "Card Games", "Expansions")',
      },
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
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this product on the homepage',
      },
    },
    {
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'inventory',
      type: 'number',
      min: 0,
      admin: {
        description: 'Current inventory count',
      },
    },
    {
      name: 'medusaId',
      type: 'text',
      admin: {
        description: 'Medusa product ID for sync',
        readOnly: true,
      },
    },
    {
      name: 'variants',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'sku',
          type: 'text',
        },
        {
          name: 'inventory',
          type: 'number',
          min: 0,
        },
        {
          name: 'medusaVariantId',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'keywords',
          type: 'text',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // Trigger webhook to sync with Medusa
        if (process.env.SYNC_SERVICE_URL) {
          try {
            await fetch(`${process.env.SYNC_SERVICE_URL}/sync/cms-to-medusa`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Payload-Secret': process.env.PAYLOAD_WEBHOOK_SECRET || '',
              },
              body: JSON.stringify({
                operation,
                doc,
                collection: 'products',
              }),
            });
          } catch (error) {
            req.payload.logger.error('Failed to trigger sync webhook:', error);
          }
        }
      },
    ],
  },
};

export default Products;
