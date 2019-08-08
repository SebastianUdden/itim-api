import mongoose from "mongoose";

import User from "./user";

const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
};

const models = { User };
export { connectDb };

export default models;
