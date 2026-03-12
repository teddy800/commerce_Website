import { buildConfig } from 'payload/config';
import path from 'path';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { slateEditor } from '@payloadcms/richtext-slate';
import Products from './collections/Products';
import HomepageContent from './collections/HomepageContent';
import Navigation from './collections/Navigation';
import FooterContent from './collections/FooterContent';
import Media from './collections/Media';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  admin: {
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- CAH Store CMS',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  editor: slateEditor({}),
  collections: [
    Products,
    HomepageContent,
    Navigation,
    FooterContent,
    Media,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/cah-cms',
  }),
  cors: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  ].filter(Boolean),
  csrf: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  ].filter(Boolean),
});
