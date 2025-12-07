import { useEffect, useMemo, useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import { createPost, fetchPosts } from "./services/api";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);

  const sortedPosts = useMemo(
    () =>
      [...posts].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    [posts]
  );

  const loadPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError("无法加载文章，请确认后端服务已启动。");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (payload) => {
    setCreating(true);
    setError("");
    try {
      const created = await createPost(payload);
      setPosts((prev) => [created, ...prev]);
      return true;
    } catch (err) {
      console.error(err);
      setError("创建文章失败，请稍后重试。");
      return false;
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Personal Blog</p>
        <h1>记录想法与笔记</h1>
        <p className="lede">
          通过简单的写作流程，把灵感、学习记录和日常感悟整理成文章。
        </p>
        <div className="hero-actions">
          <button className="primary" onClick={loadPosts} disabled={loading}>
            {loading ? "刷新中..." : "刷新文章"}
          </button>
          <span className="meta">
            API 地址：{import.meta.env.VITE_API_BASE || "http://localhost:4000/api"}
          </span>
        </div>
      </header>

      <main className="layout">
        <section className="panel">
          <div className="panel-header">
            <h2>新建文章</h2>
            <span className="hint">填入标题与内容即可发布</span>
          </div>
          <PostForm onSubmit={handleCreate} loading={creating} />
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>文章列表</h2>
            <span className="hint">按时间倒序展示</span>
          </div>

          {error && <div className="notice error">{error}</div>}
          {loading && <div className="notice">正在加载文章...</div>}
          {!loading && !sortedPosts.length && (
            <div className="notice">暂无文章，写一篇试试！</div>
          )}
          {!loading && sortedPosts.length > 0 && (
            <PostList posts={sortedPosts} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
