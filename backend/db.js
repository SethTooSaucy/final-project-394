const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('Pokemon').collection('Pokemons');
  } catch (err) {
    console.error('Connection failed:', err);
    process.exit(1);
  }
}

module.exports = { connectDB };