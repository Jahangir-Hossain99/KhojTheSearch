const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.DB_URI;
  const dbName = process.env.DB_NAME || undefined;

  if (!uri) throw new Error('DB_URI is missing in .env');

  mongoose.set('strictQuery', true);

  try {
    const conn = await mongoose.connect(uri, {
      dbName,
      autoIndex: process.env.NODE_ENV !== 'production',
      maxPoolSize: 10,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

async function disconnectDB() {
  try {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed.');
  } catch (err) {
    console.error('❌ Error closing MongoDB connection:', err.message);
  }
}

module.exports = { connectDB, disconnectDB };
