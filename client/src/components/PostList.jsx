function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <article key={post.id} className="post-card">
          <div className="post-meta">
            <span>{post.author || "anonymous"}</span>
            <span>·</span>
            <span>
              {new Date(post.created_at).toLocaleString("zh-CN", {
                hour12: false,
              })}
            </span>
          </div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}

export default PostList;
