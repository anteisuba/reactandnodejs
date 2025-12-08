const express = require("express");
const { pool } = require("../db");

const router = express.Router();

// 投稿一覧を取得
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, content, author, created_at, updated_at FROM posts ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("[GET /posts] failed:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

// ID で単一投稿を取得
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, content, author, created_at, updated_at FROM posts WHERE id = ? LIMIT 1",
      [req.params.id]
    );
    if (!rows.length) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("[GET /posts/:id] failed:", error);
    res.status(500).json({ message: "Failed to fetch post" });
  }
});

// 新規投稿の作成
router.post("/", async (req, res) => {
  const { title, content, author = "anonymous" } = req.body || {};
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO posts (title, content, author) VALUES (?, ?, ?)",
      [title, content, author]
    );
    const [rows] = await pool.query(
      "SELECT id, title, content, author, created_at, updated_at FROM posts WHERE id = ? LIMIT 1",
      [result.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("[POST /posts] failed:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
});

// 投稿の部分更新
router.put("/:id", async (req, res) => {
  const { title, content, author } = req.body || {};
  if (!title && !content && !author) {
    return res
      .status(400)
      .json({
        message: "Nothing to update. Provide title, content or author.",
      });
  }

  try {
    const [result] = await pool.query(
      `
        UPDATE posts
        SET title = COALESCE(?, title),
            content = COALESCE(?, content),
            author = COALESCE(?, author)
        WHERE id = ?
      `,
      [title, content, author, req.params.id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ message: "Post not found" });
    }

    const [rows] = await pool.query(
      "SELECT id, title, content, author, created_at, updated_at FROM posts WHERE id = ? LIMIT 1",
      [req.params.id]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error("[PUT /posts/:id] failed:", error);
    res.status(500).json({ message: "Failed to update post" });
  }
});

// 投稿の削除
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM posts WHERE id = ?", [
      req.params.id,
    ]);
    if (!result.affectedRows) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("[DELETE /posts/:id] failed:", error);
    res.status(500).json({ message: "Failed to delete post" });
  }
});

module.exports = router;
