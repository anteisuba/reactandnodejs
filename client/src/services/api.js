import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:4000/api",
  timeout: 8000,
});

export const fetchPosts = async () => {
  const { data } = await api.get("/posts");
  return data;
};

export const createPost = async (payload) => {
  const { data } = await api.post("/posts", payload);
  return data;
};
