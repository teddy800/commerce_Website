const dotenv = require('dotenv')

dotenv.config()

// Minimal configuration to avoid provider initialization bugs
module.exports = {
  projectConfig: {
    jwtSecret: process.env.JWT_SECRET || 'supersecret',
    cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
    database_url: process.env.DATABASE_URL,
    database_type: 'postgres',
    store_cors: process.env.STORE_CORS || 'http://localhost:3000',
    admin_cors: process.env.ADMIN_CORS || 'http://localhost:7000,http://localhost:7001',
  },
  plugins: [
    {
      resolve: '@medusajs/admin',
      options: {
        autoRebuild: false, // Disable auto-rebuild to avoid issues
        develop: false,
      },
    },
  ],
}
