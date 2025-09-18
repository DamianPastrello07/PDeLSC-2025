import mongoose from "mongoose";

const componentSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true,
    enum: ['hero', 'about', 'skills', 'projects', 'contact', 'custom']
  },
  title: { type: String, required: true },
  content: { type: String },
  data: { type: mongoose.Schema.Types.Mixed }, // Para datos estructurados
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  icon: { type: String }, // Para iconos personalizados
  windowConfig: {
    width: { type: Number, default: 400 },
    height: { type: Number, default: 300 },
    position: {
      x: { type: Number, default: 100 },
      y: { type: Number, default: 100 }
    }
  }
}, { timestamps: true });

export default mongoose.model("Component", componentSchema);
