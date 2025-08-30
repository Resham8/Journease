import mongoose, { models, Schema } from "mongoose";

const tripSchema = new Schema({  
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  duration: { type: Number, required: true }, 
  travelers: { type: Number, required: true, min: 1 },
  travelType: {
    type: String,
    enum: ["solo", "couple", "family", "friends"],
    required: true,
  },
  budget: { type: Number, required: true, min: 50 },

  preferences: {
    interests: [String],
    accommodation: String,
    dietaryRestrictions: [String],
    accessibility: [String],
    additionalNotes: String,
  },
  
  totalCost: { type: Number, default: 0 },
  totalActivities: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// tripSchema.index({ userId: 1, createdAt: -1 });
// tripSchema.index({ destination: 1 });
// tripSchema.index({ status: 1 });

export default models.Trip || mongoose.model("Trip", tripSchema);
