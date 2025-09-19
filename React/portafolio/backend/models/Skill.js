import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: String,
  level: Number,
  color: String
});

export default mongoose.model('Skill', skillSchema);
