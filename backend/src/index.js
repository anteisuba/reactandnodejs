require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initDb } = require("./db");
const postsRouter = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/posts", postsRouter);

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
