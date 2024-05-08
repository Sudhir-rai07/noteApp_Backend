import jwt from 'jsonwebtoken'
export const geneateTokenAndSetCookies = (userId, res) =>{
    // Generate Token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "15d"})
    console.log(token)
    // Set cookies in browser
    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax"
    })
}