import { useEffect, useMemo, useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import NavBar from "./components/NavBar";
import { createPost, fetchPosts } from "./services/api";

// メインアプリ：投稿の取得・作成を行い、一覧とフォームを描画する
function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);

  // 作成日時の降順でソートした投稿
  const sortedPosts = useMemo(
    () =>
      [...posts].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    [posts]
  );

  // API から投稿一覧を取得
  const loadPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError("投稿を読み込めません。API が起動しているか確認してください。");
    } finally {
      setLoading(false);
    }
  };

  // 投稿作成後にローカル状態へ即時反映
  const handleCreate = async (payload) => {
    setCreating(true);
    setError("");
    try {
      const created = await createPost(payload);
      setPosts((prev) => [created, ...prev]);
      return true;
    } catch (err) {
      console.error(err);
      setError("投稿の作成に失敗しました。後でもう一度お試しください。");
      return false;
    } finally {
      setCreating(false);
    }
  };

  // 初回レンダー時に一覧を取得
  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="page">
      <NavBar />
      <header className="hero">
        <p className="eyebrow">Personal Blog</p>
        <h1 id="top">アイデアとメモを記録する</h1>
        <p className="lede">シンプルな執筆フローで、ひらめきや学習メモを記事にまとめます。</p>
        <div className="hero-actions">
          <button className="primary" onClick={loadPosts} disabled={loading}>
            {loading ? "更新中..." : "記事を更新"}
          </button>
          <span className="meta">
            API ベース URL：{import.meta.env.VITE_API_BASE || "http://localhost:4000/api"}
          </span>
        </div>
      </header>

      <main className="layout">
        <section className="panel" id="new">
          <div className="panel-header">
            <h2>新規投稿</h2>
            <span className="hint">タイトルと本文を入れるだけで公開</span>
          </div>
          <PostForm onSubmit={handleCreate} loading={creating} />
        </section>

        <section className="panel" id="posts">
          <div className="panel-header">
            <h2>投稿一覧</h2>
            <span className="hint">新しい順で表示</span>
          </div>

          {error && <div className="notice error">{error}</div>}
          {loading && <div className="notice">投稿を読み込み中...</div>}
          {!loading && !sortedPosts.length && <div className="notice">まだ投稿がありません。書いてみましょう！</div>}
          {!loading && sortedPosts.length > 0 && (
            <PostList posts={sortedPosts} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
