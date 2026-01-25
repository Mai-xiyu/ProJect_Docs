# 📦 OneKeyMiner 文档部署指南

## ✅ 已完成的配置

1. ✅ 创建了 GitHub Actions 工作流 (`.github/workflows/deploy.yml`)
2. ✅ 配置了 Astro 站点设置
3. ✅ 设置了多语言路由和重定向

## 🚀 部署步骤

### 1. 添加远程仓库

如果你的 GitHub 仓库地址是 `https://github.com/Mai-xiyu/OneKeyMiner_Docs`，运行：

```bash
cd ~/下载/OneKeyMiner_Docs-main
git remote add origin https://github.com/Mai-xiyu/OneKeyMiner_Docs.git
```

或者使用 SSH：

```bash
git remote add origin git@github.com:Mai-xiyu/OneKeyMiner_Docs.git
```

### 2. 推送代码到 GitHub

```bash
git push -u origin master --force
```

### 3. 启用 GitHub Pages

1. 访问你的 GitHub 仓库
2. 进入 **Settings** → **Pages**
3. 在 **Build and deployment** 部分
4. **Source** 选择：**GitHub Actions**
5. 保存设置

### 4. 等待部署完成

- 推送后，GitHub Actions 会自动运行
- 访问 **Actions** 标签查看部署状态
- 部署成功后，网站将发布到：
  - 主地址：`https://mai-xiyu.github.io/OneKeyMiner_Docs/`
  - 中文：`https://mai-xiyu.github.io/OneKeyMiner_Docs/zh-cn/`
  - 英文：`https://mai-xiyu.github.io/OneKeyMiner_Docs/en/`

## 📝 配置说明

### Astro 配置 (`astro.config.mjs`)

```javascript
export default defineConfig({
  site: 'https://mai-xiyu.github.io',
  base: '/OneKeyMiner_Docs',  // 你的仓库名
  // ... 其他配置
})
```

**重要提示：**
- `site`: 你的 GitHub Pages 域名
- `base`: 必须与你的仓库名称匹配
- 如果仓库名不同，请修改 `base` 值

### 工作流配置 (`.github/workflows/deploy.yml`)

工作流会在以下情况下自动运行：
- ✅ 推送到 `master` 或 `main` 分支
- ✅ 手动触发（在 Actions 标签页）

部署流程：
1. 📥 检出代码
2. 📦 安装依赖 (`yarn install`)
3. 🏗️ 构建网站 (`yarn build`)
4. 🚀 部署到 GitHub Pages

## 🔧 常见问题

### Q: 部署失败怎么办？

检查以下几点：
1. GitHub Pages 是否已启用（Settings → Pages）
2. 仓库权限是否正确（Settings → Actions → General）
3. 查看 Actions 日志了解具体错误

### Q: 如何自定义域名？

1. 在 GitHub 仓库 Settings → Pages 中添加自定义域名
2. 修改 `astro.config.mjs` 中的 `site` 值
3. 将 `base: '/OneKeyMiner_Docs'` 改为 `base: '/'`

### Q: 如何更新网站？

只需提交并推送代码：
```bash
git add .
git commit -m "更新文档"
git push origin master
```

GitHub Actions 会自动重新部署！

## 🎉 功能特性

- ✅ 自动语言检测和重定向
- ✅ 中英文双语支持
- ✅ 响应式设计
- ✅ 深色模式
- ✅ 搜索功能
- ✅ 侧边栏导航
- ✅ 自动部署

---

**祝部署顺利！** 🚀
