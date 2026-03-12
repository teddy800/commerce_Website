import { CollectionConfig } from 'payload/types';

const Navigation: CollectionConfig = {
  slug: 'navigation',
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
      defaultValue: 'Main Navigation',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
  ],
};

export default Navigation;
