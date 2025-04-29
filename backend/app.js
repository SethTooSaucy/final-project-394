import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:3000','https://final-project-394.vercel.app'] 
}));

app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');

// GET Pokémon by name
app.get('/api/Pokemon/:name', async (req, res) => {
  try {
    const db = client.db('Pokemon');
    const pokemon = await db.collection('Pokemons').findOne({ name: req.params.name });
    res.json(pokemon || { error: "Pokémon not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Add/Update Pokémon by name
app.post('/api/Pokemon', async (req, res) => {
  try {
    const db = client.db('Pokemon');
    const { name, type } = req.body;
    
    if (!name || !type) {
      return res.status(400).json({ error: "Name and type are required" });
    }

    await db.collection('Pokemons').updateOne(
      { name }, 
      { $set: { type } },  
      { upsert: true }
    );
    
    res.status(201).json({ name, type });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE Pokémon by name
app.delete('/api/Pokemon/:name', async (req, res) => {
  try {
    const db = client.db('Pokemon');
    const result = await db.collection('Pokemons').deleteOne({ name: req.params.name });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Pokémon not found" });
    }
    
    res.status(200).json({ message: "Pokémon deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
client.connect().then(() => {
  app.listen(5000, () => console.log('Pokémon API running on port 5000'));
});