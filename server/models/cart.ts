import mongoose, { Document, Schema, Model, Types } from 'mongoose';

// Cart Item Interface
interface ICartItem {
    product: Types.ObjectId;
    quantity: number;
    price: number;
}

// Cart Document Interface
export interface ICart extends Document {
    user: Types.ObjectId;
    items: ICartItem[];
    createdAt: Date;
    updatedAt: Date;
}

// Cart Schema
const CartSchema: Schema<ICart> = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Export the Cart model
export const Cart: Model<ICart> = mongoose.model<ICart>('Cart', CartSchema);
