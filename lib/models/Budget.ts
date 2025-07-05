import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Create a compound index for category and month to ensure uniqueness
budgetSchema.index({ category: 1, month: 1 }, { unique: true });

// Prevent multiple model initialization in development
export default mongoose.models.Budget || mongoose.model('Budget', budgetSchema); 