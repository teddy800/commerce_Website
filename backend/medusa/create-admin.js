const { MedusaContainer } = require('@medusajs/medusa/dist/loaders/helpers/resolve-plugins')
const { asValue } = require('awilix')

async function createAdminUser() {
  const container = require('@medusajs/medusa/dist/loaders/index').default({
    directory: __dirname,
    expressApp: require('express')(),
  })

  const userService = container.resolve('userService')

  try {
    const user = await userService.create({
      email: 'admin@medusa.com',
      password: 'admin123',
      role: 'admin',
    }, 'admin123')

    console.log('✅ Admin user created successfully!')
    console.log('   Email: admin@medusa.com')
    console.log('   Password: admin123')
    console.log('\n🎉 You can now login at http://localhost:7001')
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log('ℹ️  Admin user already exists')
      console.log('   Email: admin@medusa.com')
      console.log('   Password: admin123')
    } else {
      console.error('❌ Error creating admin user:', error.message)
    }
  }

  process.exit(0)
}

createAdminUser()
