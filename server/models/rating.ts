import mongoose, { Document, Schema, Model, Types } from 'mongoose';

// Define the Rating document interface
export interface IRating extends Document {
  user: Types.ObjectId;
  product: Types.ObjectId;
  rating: number;
  comment?: string;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Rating schema
const RatingSchema: Schema<IRating> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: String,
    createdBy: String
  },
  {
    timestamps: true
  }
);

// Add compound index to prevent duplicate ratings from the same user for the same product
RatingSchema.index({ user: 1, product: 1 }, { unique: true });

// Export the Rating model
export const Rating: Model<IRating> = mongoose.model<IRating>('Rating', RatingSchema);