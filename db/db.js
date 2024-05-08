import mongoose from "mongoose";

const connectToDB = async () => {
  await mongoose.connect(process.env.URI + "Note");
  console.log("Database connected!");
  
};

export default connectToDB;
