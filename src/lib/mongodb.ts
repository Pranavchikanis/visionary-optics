import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose_v2;

if (!cached) {
  cached = (global as any).mongoose_v2 = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  let finalUri = MONGODB_URI;

  if (finalUri && finalUri.includes('localhost')) {
    finalUri = finalUri.replace('localhost', '127.0.0.1');
  }

  if (!finalUri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(finalUri, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
