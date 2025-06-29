import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());

// Route POST - gửi dữ liệu lên Google Sheet
app.post("/submit", async (req, res) => {
  const { name, email, result } = req.body;
  const response = await fetch(`https://v1.nocodeapi.com/quin/google_sheets/${process.env.NOCODE_API_KEY}?tabId=Sheet1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify([[name, email, result]])
  });

  const data = await response.json();
  res.json(data);
});

// Route GET - lấy dữ liệu từ Google Sheet
app.get("/data", async (req, res) => {
  try {
    const apiKey = process.env.NOCODE_API_KEY;
    const url = `https://v1.nocodeapi.com/quin/google_sheets/${apiKey}?tabId=Sheet1&perPage=100&page=1&fields=Name,Email`;

    const response = await fetch(url);
    const data = await response.json();

    console.log("Trạng thái:", response.status);
    console.log("Dữ liệu:", data);

    if (response.status !== 200) {
      throw new Error(data.info || "Lỗi không xác định");
    }

    res.json(data);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ Google Sheets:", error);
    res.status(500).json({ error: "Không lấy được dữ liệu từ Google Sheets" });
  }
});




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
