# 💡 Aha! Catcher

一个简洁优雅的灵感捕捉工具，让你的每一个"Aha!"时刻都不会溜走。

## 🎯 产品愿景

抓住那些稍纵即逝的想法和好奇心，通过极低的捕捉摩擦，让记录灵感成为一种无意识的反射。

**适用场景**：当你在散步、听播客、与人交谈时，突然冒出一个有趣的想法，但又不想打断当前活动去打字记录。

## ✨ 核心功能

- 🎤 **持续录音缓冲**：自动保留最近 30 秒音频
- ⚡ **一键捕捉**：点击按钮即可捕获灵感
- 🤖 **AI 转录**：自动将语音转为文字
- 🔍 **智能摘要**：AI 自动提炼核心洞察并提供相关背景信息

## 🚀 快速开始

### 前置要求

- Node.js 14+ 
- 现代浏览器（Chrome、Firefox、Edge 等）

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/你的用户名/aha-catcher.git
   cd aha-catcher
   ```

2. **配置 API Key**
   
   在项目根目录创建 `.env` 文件（或复制 `.env.example`）：
   ```bash
   API_KEY=sk_your_actual_api_key_here
   ```
   
   > 💡 从 [AI Builder Platform](https://space.ai-builders.com/) 获取你的 API Key

3. **启动服务器**
   ```bash
   cd web-mvp
   node server.js
   ```

4. **打开浏览器**
   
   访问 http://localhost:3000

### 使用方法

1. 点击 **"开始录音"** 按钮（允许麦克风权限）
2. 说出你的想法（应用会持续录音并保留最近 30 秒）
3. 当你想捕捉灵感时，点击 **"捕捉 Aha!"** 按钮
4. 等待 AI 处理，查看转录文本和智能摘要

## 📋 OKR（目标与关键结果）

### 目标 1：零摩擦捕捉
- ✅ **KR1**：单一手势触发（点击按钮）
- ✅ **KR2**：无需打断当前活动

### 目标 2：提供有价值的跟进
- ✅ **KR1**：准确转录语音
- ✅ **KR2**：AI 智能推断核心想法并提供背景研究
- ✅ **KR3**：2 分钟内完成处理

## 🏗️ 技术架构

```
┌──────────────────────────────────────────────────────┐
│  浏览器 (index.html)                                  │
│  ├── Web Audio API (录音)                            │
│  ├── 滚动缓冲区 (30秒)                                │
│  └── 用户界面                                         │
└────────────┬─────────────────────────────────────────┘
             │
             ↓ HTTP Request (/backend/*)
┌──────────────────────────────────────────────────────┐
│  本地代理服务器 (server.js)                           │
│  解决 CORS 跨域限制                                   │
└────────────┬─────────────────────────────────────────┘
             │
             ↓ HTTPS Proxy
┌──────────────────────────────────────────────────────┐
│  AI Builder Platform                                 │
│  ├── /v1/audio/transcriptions (语音转文字)           │
│  └── /v1/chat/completions (AI 分析)                  │
└──────────────────────────────────────────────────────┘
```

## 📁 项目结构

```
aha-catcher/
├── product_definition.md    # 产品定义文档
├── web-mvp/
│   ├── index.html           # 单页应用（HTML + CSS + JS）
│   └── server.js            # Node.js 代理服务器
├── .env.example             # API Key 配置模板
├── .gitignore
└── README.md
```

## 🔐 安全说明

- **不要**将 `.env` 文件提交到 Git
- **不要**在 `index.html` 中硬编码 API Key
- 建议使用环境变量或服务器端配置管理敏感信息

## 🛠️ 开发计划

- [ ] 支持从环境变量读取 API Key
- [ ] 添加多语言支持（中文/英文切换）
- [ ] 历史记录管理（本地存储）
- [ ] 导出为 Markdown/TXT
- [ ] PWA 支持（离线使用）
- [ ] Apple Watch 版本（watchOS 11+）

## 📄 许可证

MIT License

## 🙏 致谢

- [AI Builder Platform](https://space.ai-builders.com/) - 提供 AI 转录和分析服务
- Web Audio API - 浏览器原生录音能力

---

**Made with ❤️ for capturing fleeting ideas**
