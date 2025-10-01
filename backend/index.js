// 1. Import necessary modules and initialize Express app
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const PORT = 3000; // Define the port

// 2. Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Connect to MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// 4. Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 5. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});