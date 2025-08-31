import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
//   preferences: {
//     budgetRange: String, // e.g., "low", "medium", "high"
//     foodType: String,   // e.g., "vegetarian", "local"
//     travelStyle: String, // e.g., "solo", "family"
//   },
  trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],
  createdAt: { type: Date, default: Date.now },
});

// userSchema.index({ email: 1 });

export default mongoose.models.User || mongoose.model('User', userSchema);