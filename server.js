import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import job from "./config/cron.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


 app.use(
  cors({
    origin: "https://kongila-waitlist.vercel.app",
    methods: ["GET", "POST"],
  })
); 

job.start();

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

// Routes
import leadRoutes from "./route/leadRoutes.js";

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.use("/api/leads", leadRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
