import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./db/db.js";

// envConfig
dotenv.config();

// app
const app = express();

// Middleware to set CORS headers
app.use(cors({
    origin: 'https://note-app-frontend-umber.vercel.app',
    credentials: true,
    optionsSuccessStatus: 204
}))
app.use(express.json())
app.use(cookieParser())

// Routes
import auth from './routes/router.auth.js'
import task from './routes/router.note.js'
app.use("/api/auth", auth)
app.use("/api/note", task)

app.get("/", (req, res) => {
  res.send("Working Nice");
});

// Server listening
app.listen(process.env.PORT || 4000, async () => {
  await connectToDB();
  console.log(`App is listening on port ${process.env.PORT}`);
});