const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // ✅ chỉ cần khai báo ở đây
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());

app.post("/submit", async (req, res) => {
  const { name, email } = req.body;
  const response = await fetch("https://v1.nocodeapi.com/quin/google_sheets/nBVUPKUFkhYxExOB?tabId=Sheet1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify([[name, email]])
  });

  const result = await response.json();
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
