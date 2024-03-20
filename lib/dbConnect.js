import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.development'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Using existing database connection...')
    return cached.conn
  }

  if (!cached.promise) {
    console.log('Creating new database connection...')
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('Database connected successfully!')
        return mongoose
      })
      .catch((error) => {
        console.error('Error connecting to the database:', error)
        throw error // Rethrow the error to propagate it further
      })
  }

  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch (error) {
    console.error('Error establishing database connection:', error)
    throw error // Rethrow the error to propagate it further
  }
}

export default dbConnect
