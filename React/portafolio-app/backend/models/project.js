import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  link: String,
  image: String
});

export default mongoose.model("Project", projectSchema);
