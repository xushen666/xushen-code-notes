# 上线前收尾设计

## 目标

在不连接远程仓库、不提交、不推送、不部署的前提下，完成个人博客上线前第 3～8 步收尾，使仓库首页、构建环境和自动化行为与 `xushen · Code & Notes` 的定位一致。

## README

将根目录 `README.md` 重写为精简中文个人 README，包含：

- 博客定位与当前内容方向；
- Astro、TypeScript、Mizuki 等核心技术；
- 安装、开发、测试和生产构建命令；
- 文章、个人资料、项目和技能的主要维护位置；
- Vercel 静态部署说明；
- 对 Mizuki 及其上游项目的明确致谢和许可证说明。

保留 `README.zh.md`、`README.ja.md`、`README.tw.md`，作为 Mizuki 上游功能和配置参考，不在本轮逐一重写。

## 许可证与署名

- 不修改或删除 `LICENSE` 与 `LICENSE.MIT`；
- 不修改页脚中指向 `LyraVoid/Mizuki` 的版本署名；
- 在新 `README.md` 中说明本博客基于 Mizuki 定制，并链接原项目；
- 不把原模板的作者身份改写为博客作者身份。

## 自动化与运行环境

- 删除 `.github/workflows/deploy.yml`，避免使用 Vercel 后仍触发 GitHub Pages 部署；
- 保留 `.github/workflows/lint.yml`；
- 在 `package.json` 增加 `engines.node: ">=22.12.0"`，与当前 Astro 版本要求一致；
- 不改动现有 pnpm 版本约束、构建命令和 `vercel.json`。

## favicon 与社交预览

- 本轮继续使用 `public/favicon/favicon.ico` 作为占位 favicon；
- 不生成或伪造个人 favicon；
- GitHub 社交预览图属于仓库网页设置，待用户准备素材后单独上传，不在本轮代码改动范围内。

## 回归保护

在现有个性化测试中增加上线前仓库约束，验证：

- Node.js 版本下限已声明；
- GitHub Pages 部署工作流不存在；
- README 包含个人博客名称、个人仓库地址、本地运行命令、Vercel 和 Mizuki 致谢；
- 两份许可证和占位 favicon 仍存在；
- 页脚仍保留 Mizuki 上游链接。

测试采用先失败、再实施、再通过的顺序。

## 验证与完成标准

依次运行：

```powershell
pnpm test
pnpm type-check
pnpm check
pnpm build
git diff --check
```

完成标准：所有命令退出码为 0；生产构建成功；现有 favicon、许可证和上游署名未丢失；没有连接远程、提交、推送或部署。
