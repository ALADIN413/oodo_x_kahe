import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true, index: true },
  destination: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  budget: { type: Number, required: true, min: 0 },
  interests: [{ type: String, trim: true }],
  headcount: { type: Number, required: true, min: 1 },
  aiPrompt: { type: String },
  aiPlanJson: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

export const Trip = mongoose.model('Trip', tripSchema);
