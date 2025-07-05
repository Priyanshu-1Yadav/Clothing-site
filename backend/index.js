import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import path from 'path';

import Product from './models/products.js';
import { products } from './data/index.js';
import productsRoutes from './routes/product.js';
import authRoutes from './routes/auth.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';
import passwordRoutes from './routes/password.js';

//Admin Routes
import adminRoutes from './routes/admin.js';

const app = express();
dotenv.config(); // Load environment variables
app.use(express.json()); // Middleware to parse JSON
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });
app.use(cors());

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded files as static resources
app.use('/uploads', express.static('uploads'));

// Use product routes
app.use('/products', productsRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/password', passwordRoutes );

//Use Admin Routes
app.use('/admin', adminRoutes);


// Serve static files based on environment
if (process.env.NODE_MODE === "production") {
    // Serve static files from the React app in production
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
  } else {
    // Serve a message indicating the API is running in development
    app.get("/", (req, res) => {
      res.send("API is running in development mode.");
    });
  }


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log('Connected to MongoDB');

    // try {
    //     await Product.insertMany(products); // Use 'await' inside an async function
    //     console.log('Data imported');
    // } catch (error) {
    //     console.error('Error inserting data:', error.message);
    // }

}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
