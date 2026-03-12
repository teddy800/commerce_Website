const dotenv = require('dotenv')

let ENV_FILE_NAME = '.env'
if (process.env.NODE_ENV === 'production') {
  ENV_FILE_NAME = '.env.production'
}

dotenv.config({ path: ENV_FILE_NAME })

const ADMIN_CORS =
  process.env.ADMIN_CORS || 'http://localhost:7000,http://localhost:7001'
const AUTH_CORS = process.env.AUTH_CORS || 'http://localhost:3000'
const STORE_CORS = process.env.STORE_CORS || 'http://localhost:3000'

const DATABASE_URL =
  process.env.DATABASE_URL || 'postgres://localhost/medusa-store'
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'

// Redis is optional for development - comment out if not using Redis
const modules = {
  // eventBus: {
  //   resolve: '@medusajs/medusa/dist/services/event-bus-service',
  //   options: {
  //     redisUrl: REDIS_URL,
  //   },
  // },
  // cacheService: {
  //   resolve: '@medusajs/medusa/dist/services/cache',
  //   options: {
  //     redisUrl: REDIS_URL,
  //   },
  // },
}

module.exports = {
  projectConfig: {
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    database_database: process.env.DB_NAME,
    database_type: 'postgres',
    database_url: DATABASE_URL,
    // redis_url: REDIS_URL, // Commented out - Redis is optional for development
  },
  admin: {
    cors: ADMIN_CORS,
  },
  auth: {
    cors: AUTH_CORS,
  },
  store: {
    cors: STORE_CORS,
  },
  modules,
  plugins: [
    {
      resolve: '@medusajs/admin',
      options: {
        autoRebuild: true,
        develop: process.env.NODE_ENV === 'development',
        outDir: 'dist',
      },
    },
  ],
}
