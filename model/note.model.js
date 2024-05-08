import mongoose, { mongo } from "mongoose";

const note_schema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", note_schema);

export default Note;
