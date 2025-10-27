import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import pushNotification from "./routes/pushNotification.route";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api/pushNotification", pushNotification);

app.listen(PORT, () => {
  console.log("Server running on Port:", PORT);
});
