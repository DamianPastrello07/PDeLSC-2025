import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  text: String,
  image: String,
  details: String
});

export default mongoose.model('About', aboutSchema);
