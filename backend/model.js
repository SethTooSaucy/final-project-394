import mongoose from 'mongoose';

const PokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Fighting', 'Dark', 'Dragon', 'Steel']
  }
});

export default mongoose.model('Pokemon', PokemonSchema);