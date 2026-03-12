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
      required: true,
      defaultValue: 'Homepage',
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'headline',
          type: 'text',
          required: true,
        },
        {
          name: 'subheadline',
          type: 'textarea',
        },
        {
          name: 'ctaText',
          type: 'text',
          defaultValue: 'Shop Now',
        },
        {
          name: 'ctaLink',
          type: 'text',
          defaultValue: '/products',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'imagePosition',
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          defaultValue: 'right',
        },
        {
          name: 'backgroundColor',
          type: 'text',
          admin: {
            description: 'Hex color code (e.g., #000000)',
          },
        },
      ],
    },
    {
      name: 'featuredProducts',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Featured Products',
        },
        {
          name: 'products',
          type: 'relationship',
          relationTo: 'products',
          hasMany: true,
          admin: {
            description: 'Select products to feature on homepage',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        // Trigger revalidation of homepage
        if (process.env.FRONTEND_URL) {
          try {
            await fetch(`${process.env.FRONTEND_URL}/api/revalidate`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Revalidate-Secret': process.env.REVALIDATE_SECRET || '',
              },
              body: JSON.stringify({
                path: '/',
              }),
            });
          } catch (error) {
            req.payload.logger.error('Failed to revalidate homepage:', error);
          }
        }
      },
    ],
  },
};

export default HomepageContent;
