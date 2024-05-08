import jwt from "jsonwebtoken"
import User from "../model/user.model.js"

export const protectRoute = async (req, res, next)=>{
    try {

        let token = req.headers['authorization']
        token = token.split(" ")[1]
       if(!token) return res.status(401).json({message: "Unauthorised : Token not found"})

       const decoded = jwt.verify(token, process.env.JWT_SECRET)
       if(!decoded) return res.status(401).json({message: "Unauthorised : invalid token"})
        console.log(decoded)

       const user = await User.findById(decoded.user._id).select("-password")
       if(!user) return res.status(401).json({message: "User not found"})

       req.user = user;
     
        next()
    } catch (error) {
        console.log(error.message)
        console.log("object")
        res.status(400).json({err: error.message})
    }
}