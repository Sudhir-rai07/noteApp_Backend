import Note from "../model/note.model.js";
import User from "../model/user.model.js";

export const allnotes = async (req, res) => {
  try {
    const { _id } = req.user;
    const getAllNotes = await Note.find({ user: _id }).select("-user");
    if (!getAllNotes) return res.send("Error");
    res.status(200).json(getAllNotes);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const addnote = async (req, res) => {
  try {
    let success = false;
    const { title, description } = req.body;
    const { _id } = req.user;
    const exictingUser = await User.findById(_id);
    const newNote = await Note.create({
      title,
      description,
      user: _id,
    });

    await exictingUser.list.push(newNote._id);
    await exictingUser.save();

    success = true;
    res.status(200).json({ message: "Note successfully added", success });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ err: error.message });
  }
};

export const deletenote = async (req, res) => {
  try {
    const { id: noteId } = req.params;
    const { _id: userId } = req.user;
    await User.findOneAndUpdate(userId, { $pull: { list: noteId } });
    await Note.findByIdAndDelete(noteId)
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

export const updatenote = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { id: noteId } = req.params;
    const { title, description } = req.body;
 const updateNote =  await Note.findByIdAndUpdate(noteId, { title, description });
    res.status(200).json({ message: "Note Updated Successfully", updateNote });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
