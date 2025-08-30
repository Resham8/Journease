import mongoose, { Schema } from 'mongoose';

const activitySchema = new Schema({
  tripId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Trip', 
    required: true 
  },
  dayNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: String,
  location: String,
  timeSlot: String,
  cost: { type: Number, default: 0 },
  category: String,
  duration: Number, // minutes
  order: { type: Number, default: 0 },
});

activitySchema.index({ tripId: 1, dayNumber: 1, order: 1 });

export default mongoose.models.Activity || mongoose.model('Activity', activitySchema);