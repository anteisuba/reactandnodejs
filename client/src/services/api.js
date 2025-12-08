import axios from "axios";

// API クライアント（環境変数のベース URL を使用）
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:4000/api",
  timeout: 8000,
});

// 投稿一覧を取得
export const fetchPosts = async () => {
  const { data } = await api.get("/posts");
  return data;
};

// 新規投稿を作成
export const createPost = async (payload) => {
  const { data } = await api.post("/posts", payload);
  return data;
};
