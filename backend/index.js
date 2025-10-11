// 1. Import necessary modules and initialize Express app
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const { connectDB,disconnectDB } = require('./config/db');
const PORT = process.env.PORT || 5000;

// 2. Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Connect to MongoDB



(async () => {
  await connectDB();
  const port = process.env.PORT || 5000;
  const server = app.listen(port, () => console.log(`🚀 Server running on port ${port}`));

  // Graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\nSIGINT received. Closing server...');
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
  });

  process.on('SIGTERM', async () => {
    console.log('\nSIGTERM received. Closing server...');
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
  });
})();



// 4. Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 5. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});