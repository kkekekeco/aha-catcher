# 💡 Aha! Catcher

A simple and elegant idea capture tool that ensures none of your "Aha!" moments slip away.

## 🎯 Product Vision

Capture those fleeting thoughts and curiosities with minimal friction, making idea recording an unconscious reflex.

**Use Case**: When you're walking, listening to a podcast, or having a conversation, and suddenly an interesting thought pops up, but you don't want to interrupt your current activity to type it out.

## ✨ Core Features

- 🎤 **Continuous Audio Buffer**: Automatically retains the last 30 seconds of audio
- ⚡ **One-Click Capture**: Capture ideas with a single button click
- 🤖 **AI Transcription**: Automatically converts speech to text
- 🔍 **Smart Summary**: AI automatically extracts core insights and provides relevant background information

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ 
- Modern browser (Chrome, Firefox, Edge, etc.)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/kkekekeco/aha-catcher.git
   cd aha-catcher
   ```

2. **Configure API Key**
   
   In the `web-mvp/index.html` file, find line ~596 and enter your API Key:
   ```javascript
   API_KEY: 'your_actual_api_key_here', // 👈 Enter your API Key here
   ```
   
   > 💡 Get your API Key from [AI Builder Platform](https://space.ai-builders.com/)

3. **Start the server**
   ```bash
   cd web-mvp
   node server.js
   ```

4. **Open your browser**
   
   Navigate to http://localhost:3000

### How to Use

1. Click the **"Start Recording"** button (allow microphone permissions)
2. Speak your thoughts (the app continuously records and retains the last 30 seconds)
3. When you want to capture an idea, click the **"Capture Aha!"** button
4. Wait for AI processing, then view the transcription and smart summary

## 📋 OKRs (Objectives and Key Results)

### Objective 1: Zero-Friction Capture
- ✅ **KR1**: Single gesture trigger (button click)
- ✅ **KR2**: No interruption to current activity

### Objective 2: Provide Valuable Follow-up
- ✅ **KR1**: Accurate speech transcription
- ✅ **KR2**: AI intelligently infers core ideas and provides background research
- ✅ **KR3**: Complete processing within 2 minutes

## 🏗️ Technical Architecture

```
┌──────────────────────────────────────────────────────┐
│  Browser (index.html)                                │
│  ├── Web Audio API (recording)                       │
│  ├── Rolling buffer (30 seconds)                     │
│  └── User interface                                  │
└────────────┬─────────────────────────────────────────┘
             │
             ↓ HTTP Request (/backend/*)
┌──────────────────────────────────────────────────────┐
│  Local Proxy Server (server.js)                      │
│  Solves CORS cross-origin restrictions               │
└────────────┬─────────────────────────────────────────┘
             │
             ↓ HTTPS Proxy
┌──────────────────────────────────────────────────────┐
│  AI Builder Platform                                 │
│  ├── /v1/audio/transcriptions (speech-to-text)       │
│  └── /v1/chat/completions (AI analysis)              │
└──────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
aha-catcher/
├── product_definition.md    # Product definition document
├── web-mvp/
│   ├── index.html           # Single-page application (HTML + CSS + JS)
│   └── server.js            # Node.js proxy server
├── .env.example             # API Key configuration template
├── .gitignore
└── README.md
```

## 🔐 Security Notes

- **Do NOT** commit `.env` files to Git
- **Do NOT** hardcode API Keys in `index.html` (for public repositories)
- Recommended: Use environment variables or server-side configuration for sensitive information

## 🛠️ Development Roadmap

- [ ] Support reading API Key from environment variables
- [ ] Add multi-language support (Chinese/English toggle)
- [ ] History management (local storage)
- [ ] Export to Markdown/TXT
- [ ] PWA support (offline usage)
- [ ] Apple Watch version (watchOS 11+)

## 📄 License

MIT License

## 🙏 Acknowledgments

- [AI Builder Platform](https://space.ai-builders.com/) - Provides AI transcription and analysis services
- Web Audio API - Native browser recording capabilities

---

**Made with ❤️ for capturing fleeting ideas**
