import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://urlshortner_api:vVhyijd0e1rhSf0X@database-node.tegul.mongodb.net/urlshortener?retryWrites=true&w=majority&appName=database-node");
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
};

export default connectDB;
