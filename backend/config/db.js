import Mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    const conn = await Mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.bold);
  } catch (err) {
    console.error(`Error:${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
