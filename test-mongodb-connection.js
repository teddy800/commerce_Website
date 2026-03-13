const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://admin:admin123@cluster0.w4kkhaz.mongodb.net/payload-cms?retryWrites=true&w=majority';

async function testConnection() {
  console.log('Testing MongoDB Atlas connection...');
  console.log('URI:', uri.replace(/admin123/, '***'));
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    const db = client.db('payload-cms');
    const collections = await db.listCollections().toArray();
    console.log('📦 Database collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    await client.close();
  }
}

testConnection();
