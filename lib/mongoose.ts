import mongoose from "mongoose";

// const MONGODB_URI ='mongodb://localhost:27017/port3';
let MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI && MONGODB_URI.includes("?freshcuts=Cluster0")) {
  MONGODB_URI = MONGODB_URI.replace(
    "?freshcuts=Cluster0",
    "freshcuts?retryWrites=true&w=majority"
  );
}

if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in environment variables.");

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Prevent multiple connections in dev (Next hot reload)
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!)
      .then((m) => m);
  }


  cached.conn = await cached.promise;

  return cached.conn;
}

