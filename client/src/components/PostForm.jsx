import { useState } from "react";

function PostForm({ onSubmit, loading }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await onSubmit({ title, content, author: author || undefined });
    if (ok) {
      setTitle("");
      setContent("");
      setAuthor("");
    }
  };

  return (
    <form className="stack" onSubmit={handleSubmit}>
      <label className="field">
        <span>标题</span>
        <input
          type="text"
          placeholder="如：React Hooks 笔记"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className="field">
        <span>内容</span>
        <textarea
          rows="6"
          placeholder="写下你的想法..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>

      <label className="field inline">
        <div className="stack">
          <span>作者（可选）</span>
          <input
            type="text"
            placeholder="默认 anonymous"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button className="primary" type="submit" disabled={loading}>
          {loading ? "发布中..." : "发布文章"}
        </button>
      </label>
    </form>
  );
}

export default PostForm;
