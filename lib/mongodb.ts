import mongoose from 'mongoose';

// MongoDB Atlas connection string
const MONGODB_URI = process.env.MONGODB_URI;

// Only throw error if we're not in build mode and the URI is missing
if (!MONGODB_URI && process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Return early if no MONGODB_URI is available (e.g., during build)
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect; 