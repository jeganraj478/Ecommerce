import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbURI = process.env.MONGO_URI;
if (!dbURI) {
    throw new Error('MONGO_DB_URI is not defined');
}
const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default connectDB;
