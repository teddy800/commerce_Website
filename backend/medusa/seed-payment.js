const { Client } = require('pg')
require('dotenv').config()

async function seedPaymentProvider() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })

  try {
    await client.connect()
    console.log('Connected to database')

    // Check if payment provider already exists
    const checkQuery = `
      SELECT * FROM payment_provider 
      WHERE id = 'manual'
    `
    const checkResult = await client.query(checkQuery)

    if (checkResult.rows.length > 0) {
      console.log('Manual payment provider already exists')
      return
    }

    // Insert manual payment provider
    const insertQuery = `
      INSERT INTO payment_provider (id, is_installed)
      VALUES ('manual', true)
      ON CONFLICT (id) DO NOTHING
    `
    await client.query(insertQuery)
    console.log('✅ Manual payment provider added successfully')

  } catch (error) {
    console.error('Error seeding payment provider:', error)
    throw error
  } finally {
    await client.end()
  }
}

seedPaymentProvider()
  .then(() => {
    console.log('Seed completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exit(1)
  })
