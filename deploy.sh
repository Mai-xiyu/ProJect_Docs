#!/bin/bash

# OneKeyMiner 文档快速部署脚本

echo "🚀 OneKeyMiner 文档部署脚本"
echo "================================"
echo ""

# 检查是否已配置远程仓库
if ! git remote get-url origin &> /dev/null; then
    echo "❌ 错误：尚未配置远程仓库"
    echo ""
    echo "请先运行以下命令添加远程仓库："
    echo ""
    echo "  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
    echo ""
    echo "或使用 SSH："
    echo "  git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git"
    echo ""
    exit 1
fi

echo "📋 远程仓库信息："
git remote -v
echo ""

# 检查当前状态
echo "📊 当前状态："
git status --short
echo ""

# 询问是否继续
read -p "是否要提交并推送所有更改？(y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 已取消部署"
    exit 0
fi

# 获取提交信息
read -p "请输入提交信息 (默认: Update documentation): " commit_msg
commit_msg=${commit_msg:-"Update documentation"}

# 添加所有文件
echo "📦 添加文件..."
git add .

# 提交
echo "💾 提交更改..."
git commit -m "$commit_msg"

# 推送
echo "🚀 推送到远程仓库..."
git push --force origin master

echo ""
echo "✅ 部署完成！"
echo ""
echo "请访问 GitHub Actions 查看部署状态："
echo "https://github.com/YOUR_USERNAME/YOUR_REPO/actions"
echo ""
echo "部署成功后，网站将发布到："
echo "https://YOUR_USERNAME.github.io/YOUR_REPO/"
