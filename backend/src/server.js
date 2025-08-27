// backend/src/server.js
import express from "express";
import dotenv from "dotenv";
import pool from "./db.js";
import documentsRouter from "./routes/documents.js";   // <-- add this

dotenv.config();

const app = express();
app.use(express.json());

// simple healthcheck
app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
});

app.get("/", (_req, res) => {
  res.send("AI Study Assistant API is running. Try GET /documents");
});


// mount /documents routes
app.use("/documents", documentsRouter);                // <-- and this

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
