import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
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

const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(corsOptions);

// Connect to DB and start server
connectDB();


// Routes
app.use('/', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});