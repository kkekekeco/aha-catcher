// Aha! Catcher - 本地代理服务器
// 解决 CORS 跨域问题

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = 3000;
const API_BASE = 'https://space.ai-builders.com';

// MIME types
const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
};

// 代理请求到 AI Builder API
function proxyRequest(req, res, targetPath) {
    const targetUrl = new URL(targetPath, API_BASE);
    
    console.log(`[PROXY] ${req.method} ${targetPath}`);
    
    // 收集请求体
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
        body = Buffer.concat(body);
        
        const options = {
            hostname: targetUrl.hostname,
            port: 443,
            path: targetUrl.pathname + targetUrl.search,
            method: req.method,
            headers: { ...req.headers },
        };
        
        // 修正 headers
        delete options.headers['host'];
        delete options.headers['origin'];
        delete options.headers['referer'];
        options.headers['host'] = targetUrl.hostname;
        
        // 如果是 multipart/form-data，需要保留 content-length
        if (req.headers['content-type']?.includes('multipart/form-data')) {
            options.headers['content-length'] = body.length;
        }

        const proxyReq = https.request(options, proxyRes => {
            console.log(`[PROXY] Response: ${proxyRes.statusCode}`);
            
            // 设置 CORS headers
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            
            // 转发响应 headers
            Object.keys(proxyRes.headers).forEach(key => {
                if (!['transfer-encoding', 'connection'].includes(key.toLowerCase())) {
                    res.setHeader(key, proxyRes.headers[key]);
                }
            });
            
            res.statusCode = proxyRes.statusCode;
            proxyRes.pipe(res);
        });

        proxyReq.on('error', err => {
            console.error(`[PROXY ERROR] ${err.message}`);
            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Proxy error', detail: err.message }));
        });

        if (body.length > 0) {
            proxyReq.write(body);
        }
        proxyReq.end();
    });
}

// 提供静态文件
function serveStatic(req, res, filePath) {
    const fullPath = path.join(__dirname, filePath === '/' ? 'index.html' : filePath);
    
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
            return;
        }
        
        const ext = path.extname(fullPath);
        const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
        
        res.setHeader('Content-Type', mimeType);
        res.end(data);
    });
}

// 创建服务器
const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${url.pathname}`);
    
    // 处理 CORS 预检请求
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.statusCode = 204;
        res.end();
        return;
    }
    
    // API 代理路径
    if (url.pathname.startsWith('/backend/')) {
        proxyRequest(req, res, url.pathname + url.search);
        return;
    }
    
    // 静态文件
    serveStatic(req, res, url.pathname);
});

server.listen(PORT, () => {
    console.log('');
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║     🚀 Aha! Catcher 本地代理服务器已启动              ║');
    console.log('╠═══════════════════════════════════════════════════════╣');
    console.log(`║  📍 地址: http://localhost:${PORT}                       ║`);
    console.log('║  📡 API 代理: /backend/* → space.ai-builders.com      ║');
    console.log('╚═══════════════════════════════════════════════════════╝');
    console.log('');
});
