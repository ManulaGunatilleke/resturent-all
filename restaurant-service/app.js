const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

app.use(cors());
// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
const restaurantRoutes = require('./routes/restaurantRoutes');
app.use('/api', restaurantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
