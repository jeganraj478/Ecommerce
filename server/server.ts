// server.ts
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import corsOptions from './config/cors';
import connectDB from './config/db';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';

// Load environment variables
dotenv.config();

// Create Express application
const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(corsOptions);

// Connect to DB
connectDB();

// Routes
app.use('/', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);



// Export the Express app
export default app;