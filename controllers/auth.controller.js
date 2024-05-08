import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
  try {
    let success = false;
    const { username, password, confirmPassword, email, gender } = req.body;

    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "User already exists", success });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Match passwords", success });

    const salt = await bcrypt.genSalt(10);
    const hashedPassWord = await bcrypt.hash(password, salt);
    
   const newUser = await User.create({
      username,
      password: hashedPassWord,
      email,
      gender,
    });
  // generate token and set cookie
  const data = {
    user:{
      id: newUser.id
    }
  }
    // Generate Token
    const token = jwt.sign({data}, process.env.JWT_SECRET, {expiresIn: "15d"})
    console.log(token)
    // Set cookies in browser
    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax"
    })
    success = true;
    res
      .status(201)
      .json({ message: "User Created successfully", token: token});
  } catch (error) {
    console.log("An error occured", error);
    res
      .status(400)
      .json({ message: "Internal error occured in SignUp controller" });
  }
};

export const login = async (req, res) => {
  try {
    let success = false;
    const { email, password } = req.body;
    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found", success });

    const comparePassWord = await bcrypt.compare(password, user.password);
    if (!comparePassWord)
      return res
        .status(400)
        .json({ message: "Try login with valid credentials", success });

     // generate token and set cookie
     const data = {
      user:{
        id: user._id
      }
    }
    // Generate Token
    const token = jwt.sign({data}, process.env.JWT_SECRET, {expiresIn: "15d"})
    console.log(token)
    // Set cookies in browser
    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax"
    })
    success = true;

    res
      .status(200)
      .json({
        token: token,
        message: "Logged in successfully",
      });
  } catch (error) {
    console.log("An error occured", error);
    res
      .status(400)
      .json({ message: "Internal error occured in Login controller" });
  }
};

export const logout = async (req, res) => {
  try {
    let success = false;
    await res.clearCookie("token", {
      sameSite: "none",
      secure: true,
    });
    success = true;
    res.status(200).json({ message: "Logged out successfully", success });
  } catch (error) {
    console.log("An error occured", error.message);
    res
      .status(400)
      .json({ error: "Internal error occured in Logout controller" });
  }
};

export const userData = async (req, res) => {
 try {
  const {_id} = req.user;
  const existingUser = await User.findById(_id).select("-password")
  if(!existingUser) return res.status(401).json({message: "Unauthenticated"})

  res.status(200).json(existingUser)
 } catch (error) {
  res.status(500).json(error.message)
 }
};
