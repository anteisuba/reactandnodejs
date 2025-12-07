# React + Node.js 个人博客项目

基于 React (Vite) 前端、Express + MySQL 后端的简易博客。后端负责文章 CRUD，前端提供写作与浏览界面，默认使用本地 MySQL。

## 目录结构

- `backend/`：Express API，连接 MySQL（`posts` 表启动时自动创建）
- `client/`：React 前端（Vite）

## 环境要求

- Node.js 18+
- 本地 MySQL（默认 `blog_db` 数据库，`utf8mb4`）

## 后端运行

```bash
cd backend
cp .env.example .env  # 根据本地 MySQL 修改
# 如需新建数据库：mysql -u root -p -e "CREATE DATABASE blog_db CHARACTER SET utf8mb4;"
npm install
npm run dev   # 开发模式，4000 端口
# npm start   # 生产运行
```

主要 API：

- `GET /api/health` 健康检查
- `GET /api/posts` 获取文章列表
- `GET /api/posts/:id` 获取单篇
- `POST /api/posts` 新建文章（`title`, `content`, `author?`）
- `PUT /api/posts/:id` 更新文章
- `DELETE /api/posts/:id` 删除文章

## 前端运行

```bash
cd client
cp .env.example .env  # 如后端端口或域名不同可修改 VITE_API_BASE
npm install
npm run dev  # 默认 5173 端口
```

访问 `http://localhost:5173`。

## 备注

- 当前未安装依赖（网络受限时需自行执行 `npm install`）。安装完成后即可按上面步骤启动。
- `backend/src/db.js` 在启动时自动确保 `posts` 表存在，但不会创建数据库本身。

## 页面预览

![博客首页截图](client/assets/blog-home.jpeg)
