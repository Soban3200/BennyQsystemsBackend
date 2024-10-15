const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/connectDatabase');
const products = require('./routes/product'); // PC product routes
const orders = require('./routes/order'); // Assuming you have an order route
const cctvProducts = require('./routes/cctvProductRoutes'); // CCTV product routes
const cors = require('cors');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const app = express();

connectDatabase();

// CORS middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/v1', products); // PC product routes
app.use('/api/v1', orders); // Order routes
app.use('/api/v1', cctvProducts); // CCTV product routes

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// Catch-all route to serve index.html for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

// Default route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});
