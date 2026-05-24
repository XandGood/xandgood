# Xandgood

个人博客系统，基于 Next.js 和 Supabase 构建。

> 本项目全部代码由 AI 生成，旨在实践 AI Coding 的最佳工作流。

## 技术栈

- **框架**: Next.js 15 (App Router) + React 19 + TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **后端**: Supabase (Auth / Database / Storage)
- **部署**: Vercel

## 本地运行

1. 创建 Supabase 项目并获取 API 配置

2. 复制 `.env.example` 为 `.env.local`，填入以下变量：

   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
   ```

3. 安装依赖并启动：

   ```bash
   npm install
   npm run dev
   ```

4. 访问 [localhost:3000](http://localhost:3000)
