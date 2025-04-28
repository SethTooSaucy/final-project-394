import express from 'express';
import cors from 'cors';
import Pokemon from './model.js';
import { connectDB,  } from './db.js';

const app = express();
const corsOptions = {
    origin: [
      'http://localhost:3000',          // Local development
      'https://final-project-394.vercel.app',  // Production frontend
    ],
    methods: ['GET', 'POST', 'DELETE'], // Only allow needed methods
    credentials: true,                  // If using cookies/auth
    optionsSuccessStatus: 200           // Legacy browser support
  };
  
  app.use(cors(corsOptions));

// Connect to MongoDB
await connectDB();

// Routes
app.get('/api/pokemon/:name', async (req, res) => {
    try {
        const pokemon = await Pokemon.findOne({ name: req.params.name });
        res.json(pokemon || { error: "Not found" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/pokemon', async (req, res) => {
    try {
        const { name, type } = req.body;
        await Pokemon.updateOne(
            { name },
            { $set: { type } },
            { upsert: true }
        );
        res.status(201).json({ name, type });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/pokemon/:name', async (req, res) => {
    try {
        await Pokemon.deleteOne({ name: req.params.name });
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));