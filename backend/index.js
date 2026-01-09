const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const UserRoute = require('./routes/User.route');
const CompanyRoute = require('./routes/Company.route');

// 1. Initialize Express app
const app = express();
const { connectDB, disconnectDB } = require('./config/db');


// 2. Middleware setup
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(cookieParser());
app.use('/public', express.static('uploads')); // Serve static files from 'uploads' directory

// 4. Define routes BEFORE starting the server
app.use('/users',UserRoute);
app.use('/company',CompanyRoute);

// 5. Connect to MongoDB and Start the server (using an IIFE for async/await)
(async () => {
  await connectDB();
  const port = process.env.PORT || 5000;
  // *** THIS IS THE ONLY app.listen() CALL ***
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
