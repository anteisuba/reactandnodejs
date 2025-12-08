import { useState } from "react";

// 投稿フォーム：入力値を管理し、親コンポーネントに送信する
function PostForm({ onSubmit, loading }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 入力値を渡し、成功時はフォームをリセット
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
        <span>タイトル</span>
        <input
          type="text"
          placeholder="例：React Hooks メモ"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className="field">
        <span>本文</span>
        <textarea
          rows="6"
          placeholder="アイデアを書き留めてください..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>

      <label className="field inline">
        <div className="stack">
          <span>作者（任意）</span>
          <input
            type="text"
            placeholder="未入力なら anonymous"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button className="primary" type="submit" disabled={loading}>
          {loading ? "投稿中..." : "投稿する"}
        </button>
      </label>
    </form>
  );
}

export default PostForm;
