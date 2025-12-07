const express = require("express");
const { pool } = require("../db");

const router = express.Router();

// 获取文章列表
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

// 获取单篇文章
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

// 新建文章
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

// 更新文章（部分字段）
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

// 删除文章
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM posts WHERE id = ?", [
      req.params.id,
    ]);
    if (!result.affectedRows) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(404).send();
  } catch (error) {
    console.error("[DELETE /posts/:id] failed:", error);
    res.status(500).json({ message: "Failed to delete post" });
  }
});

module.exports = router;
