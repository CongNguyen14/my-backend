

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/submit", async (req, res) => {
  const { name, email } = req.body;

  // Gửi đến NoCodeAPI
  const response = await fetch("https://v1.nocodeapi.com/quin/google_sheets/nBVUPKUFkhYxExOB?tabId=Sheet1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([[name, email]])
  });

  const result = await response.json();
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const cors = require("cors");
app.use(cors({
  origin: "*", // hoặc chỉ cho phép domain frontend cụ thể
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
