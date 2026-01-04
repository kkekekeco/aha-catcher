# 上传到 GitHub 步骤

## 1. 配置 Git（首次使用需要）
```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱@example.com"
```

## 2. 提交代码
```bash
cd c:\GenAI-Builder\2026010-aha-catcher
git add .
git commit -m "Initial commit: Aha! Catcher Web MVP"
```

## 3. 在 GitHub 上创建仓库
1. 访问 https://github.com/new
2. Repository name: `aha-catcher`
3. Description: `💡 A simple web app to capture fleeting ideas with AI transcription`
4. Public 或 Private（你选择）
5. **不要**勾选 "Add a README file"（我们已经有了）
6. 点击 "Create repository"

## 4.将本地代码推送到 GitHub
```bash
# 添加远程仓库（替换成你的 GitHub 用户名）
git remote add origin https://github.com/你的用户名/aha-catcher.git

# 推送代码
git branch -M main
git push -u origin main
```

## ⚠️ 重要提醒

你的 **config.local.js** 文件（包含 API Key）已被排除，不会上传到 GitHub。

其他用户 clone 仓库后需要：
1. 在 `web-mvp/index.html` 的 `CONFIG.API_KEY` 中填入他们自己的 key
2. 或者创建自己的 `config.local.js` 文件

## 🎉 完成！

上传后你可以在 GitHub 仓库页面看到你的项目。
