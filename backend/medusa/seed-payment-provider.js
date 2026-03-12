const { Client } = require('pg');
require('dotenv').config();

async function seedPaymentProvider() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Insert manual payment provider
    const result = await client.query(`
      INSERT INTO payment_provider (id, is_installed)
      VALUES ('manual', true)
      ON CONFLICT (id) DO UPDATE SET is_installed = true
      RETURNING *;
    `);

    console.log('Payment provider seeded:', result.rows[0]);
    console.log('✅ Success! You can now start Medusa.');
  } catch (error) {
    console.error('Error seeding payment provider:', error);
  } finally {
    await client.end();
  }
}

seedPaymentProvider();
