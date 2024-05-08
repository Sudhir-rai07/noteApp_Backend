import mongoose, { mongo } from "mongoose";

const user_schema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    minLength : 6
  },
  gender: {
    type: String,
    require: true,
    // enum: ["male", "female"]
  },
  list: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
}, {timestamps: true});


const User = mongoose.model("User", user_schema)

export default User