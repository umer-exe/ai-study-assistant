// backend/src/routes/documents.js
import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET /documents  -> list all documents
router.get("/", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM documents ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("GET /documents error:", err);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

// POST /documents  -> create a new document
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "title is required" });
    }
    const { rows } = await pool.query(
      "INSERT INTO documents (title) VALUES ($1) RETURNING *",
      [title.trim()]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("POST /documents error:", err);
    res.status(500).json({ error: "Failed to insert document" });
  }
});

export default router;
