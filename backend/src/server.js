require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 })); // basic rate limit

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log('Mongo connected'))
  .catch(err => { console.error(err); process.exit(1); });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// error handler (simple)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Backend running on ${PORT}`));
