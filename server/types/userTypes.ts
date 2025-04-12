// types.ts - Shared type definitions
import { Document, Types } from 'mongoose';

export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export type UserRole = 'customer' | 'admin' | 'seller';

// Base interface for user data (used in API requests/responses)
export interface IUserBase {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  address: IAddress[];
}

// Interface for user registration
export interface IUserRegistration {
  username: string;
  email: string;
  password: string;
}

// Interface for user login
export interface IUserLogin {
  email: string;
  password: string;
}

// Interface for login response
export interface ILoginResponse {
  token: string;
  user: {
    id: string; // Changed from unknown to string
    email: string;
    role: UserRole;
  }
}

// MongoDB document interface (extends the base with Document properties)
export interface IUserDocument extends IUserBase, Document {
  password: string;
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
}