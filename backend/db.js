import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('pokemon').collection('pokemons');
  } catch (err) {
    console.error('Connection failed:', err);
    process.exit(1);
  }
}

// Only export connectDB
export { connectDB };