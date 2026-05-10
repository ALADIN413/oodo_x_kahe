import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true, index: true },
  destination: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  budget: { type: Number, required: true, min: 0 },
  interests: [{ type: String, trim: true }],
  headcount: { type: Number, required: true, min: 1 },
  tripType: { type: String, enum: ['adventure', 'relaxation', 'cultural', 'family', 'romantic', 'business', 'other'], default: 'other' },
  constraints: {
    vegetarian: { type: Boolean, default: false },
    kids: { type: Boolean, default: false },
    seniors: { type: Boolean, default: false },
    luxury: { type: Boolean, default: false },
    publicTransport: { type: Boolean, default: false },
  },
  questions: [{ question: String, answer: String }],
  aiPrompt: { type: String },
  aiPlanJson: { type: mongoose.Schema.Types.Mixed },
  recommendations: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

export const Trip = mongoose.model('Trip', tripSchema);
