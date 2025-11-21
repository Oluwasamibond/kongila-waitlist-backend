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
job.start()

app.use(
  cors({
    origin: "https://kongila-pre-frontend.vercel.app", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // only if you use cookies or auth headers
  })
);

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

// Routes
import leadRoutes from "./route/leadRoutes.js"
import adminRoutes from "./route/adminRoutes.js";

app.use("/api/leads", leadRoutes)
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
