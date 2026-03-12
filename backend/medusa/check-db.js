const { Client } = require('pg')
require('dotenv').config()

async function checkDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })

  try {
    await client.connect()
    console.log('Connected to database\n')

    // Check payment providers
    const ppQuery = 'SELECT * FROM payment_provider'
    const ppResult = await client.query(ppQuery)
    console.log('Payment Providers:', ppResult.rows)

    // Check if we can delete them
    const deleteQuery = 'DELETE FROM payment_provider'
    await client.query(deleteQuery)
    console.log('\n✅ Deleted all payment providers')

  } catch (error) {
    console.error('Error:', error.message)
  } finally {
    await client.end()
  }
}

checkDatabase()
