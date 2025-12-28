const { Pool } = require('pg');
const mongoose = require('mongoose');

// PostgreSQL Connection Pool
const pgPool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB || 'cipher_sql_sandbox',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Test PostgreSQL connection
pgPool.on('connect', () => {
  console.log('✅ PostgreSQL connected');
});

pgPool.on('error', (err) => {
  console.error('❌ PostgreSQL connection error:', err);
});

// MongoDB Connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cipher_sql_studio', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

connectMongoDB();

module.exports = { pgPool, mongoose };