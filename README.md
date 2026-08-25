# xushen · Code & Notes

这是 xushen 的个人博客，主要记录计算机科学学习、课程笔记、项目复盘，以及 Python、Java、LLM 与 Agent 开发实践。

仓库地址：<https://github.com/xushen666/xushen-code-notes>

## 技术栈

- [Astro](https://astro.build/)：静态站点构建
- TypeScript：配置与组件类型
- Markdown / MDX：文章内容
- Pagefind：静态站内搜索
- Vercel：生产部署
- [Mizuki](https://github.com/LyraVoid/Mizuki)：博客界面与基础能力

## 本地运行

需要 Node.js 22.12.0 或更高版本，以及 pnpm。

```powershell
corepack enable
pnpm install
pnpm dev
```

开发服务器默认运行于 <http://localhost:3000>。

## 内容维护

- 文章：`src/content/posts/`
- 关于页：`src/content/spec/about.md`
- 站点配置：`src/config/`
- 项目数据：`src/data/projects.ts`
- 技能数据：`src/data/skills.ts`
- 友链数据：`src/data/friends.ts`
- 图片与其他静态资源：`src/assets/`、`public/`

新建文章：

```powershell
pnpm new-post -- article-name
```

## 质量检查

```powershell
pnpm test
pnpm type-check
pnpm check
pnpm build
```

生产构建输出位于 `dist/`。

## 部署

本项目使用 Vercel 部署，配置位于 `vercel.json`：

- 安装命令：`pnpm install`
- 构建命令：`pnpm build`
- 输出目录：`dist`

获得正式部署地址后，需要同步更新 `src/config/siteConfig.ts` 中的 `siteURL`。

## 致谢与许可证

本博客基于 [LyraVoid/Mizuki](https://github.com/LyraVoid/Mizuki) 定制。Mizuki 本身延续自 Fuwari 等开源项目；原项目和依赖的版权归各自作者所有。

仓库保留原项目提供的 `LICENSE` 与 `LICENSE.MIT`。使用或再分发代码前，请阅读并遵守对应许可证。
