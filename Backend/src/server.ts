import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";

dotenv.config();
console.log("MONGO_URI =", process.env.MONGO_URI); 
const app = express();

app.use(cors({ origin: "http://localhost:5174", credentials: true,}));
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use("/api/auth", authRoutes);
app.get("/", (req, res)=>{
    res.send("Todo server is running properly")
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

