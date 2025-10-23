import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Serever running on Port:", PORT);
});
