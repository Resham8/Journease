import mongoose from 'mongoose';

const aiSessionSchema = new mongoose.Schema({
  tripId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Trip', 
    required: true,
    unique: true
  },
    
  prompt: { 
    type: String, 
    required: true 
  },
  rawResponse: { 
    type: String, 
    required: true 
  },
    
  model: { type: String, default: 'gpt' },
  tokens: {
    prompt: Number,
    completion: Number,
    total: Number
  },        
  version: { type: Number, default: 1 }, 
  
  createdAt: { type: Date, default: Date.now }
});

aiSessionSchema.index({ tripId: 1 });
export default mongoose.models.AISession || mongoose.model('AISession', aiSessionSchema);
