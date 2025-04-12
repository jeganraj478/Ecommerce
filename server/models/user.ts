// models/user.ts
import mongoose, { Schema, Model } from 'mongoose';
import { IUserDocument, IUserBase, UserRole, IAddress } from '../types/userTypes';

// Create the User Schema
const AddressSchema = new Schema<IAddress>({
  street: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
}, { _id: false });

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    role: {
      type: String,
      enum: ['customer', 'admin', 'seller'],
      default: 'customer',
    },
    address: [AddressSchema],
  },
  {
    timestamps: true,
  }
);

// Export the User model
export const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', UserSchema);