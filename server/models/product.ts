import mongoose, { Document, Schema, Model, Types } from 'mongoose';

// Define the Product document interface
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  brand?: string;
  stock: number;
  images: string[];
  tags: string[];
  specifications: Map<string, string>;
  averageRating: number;
  ratingCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Product schema
const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: String,
    brand: String,
    stock: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    specifications: {
      type: Map,
      of: String,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

// Add indexes
ProductSchema.index({ category: 1 });
ProductSchema.index({ tags: 1 });

// Export the Product model
export const Product: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);