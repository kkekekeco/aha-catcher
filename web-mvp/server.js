// Aha! Catcher - Local Proxy Server
// Solves CORS cross-origin issues

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

// Proxy requests to AI Builder API
function proxyRequest(req, res, targetPath) {
    const targetUrl = new URL(targetPath, API_BASE);

    console.log(`[PROXY] ${req.method} ${targetPath}`);

    // Collect request body
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

        // Fix headers
        delete options.headers['host'];
        delete options.headers['origin'];
        delete options.headers['referer'];
        options.headers['host'] = targetUrl.hostname;

        // For multipart/form-data, preserve content-length
        if (req.headers['content-type']?.includes('multipart/form-data')) {
            options.headers['content-length'] = body.length;
        }

        const proxyReq = https.request(options, proxyRes => {
            console.log(`[PROXY] Response: ${proxyRes.statusCode}`);

            // Set CORS headers
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

            // Forward response headers
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

// Serve static files
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

// Create server
const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);

    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${url.pathname}`);

    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.statusCode = 204;
        res.end();
        return;
    }

    // API proxy paths
    if (url.pathname.startsWith('/backend/')) {
        proxyRequest(req, res, url.pathname + url.search);
        return;
    }

    // Static files
    serveStatic(req, res, url.pathname);
});

server.listen(PORT, () => {
    console.log('');
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║     🚀 Aha! Catcher Local Proxy Server Started       ║');
    console.log('╠═══════════════════════════════════════════════════════╣');
    console.log(`║  📍 Address: http://localhost:${PORT}                    ║`);
    console.log('║  📡 API Proxy: /backend/* → space.ai-builders.com     ║');
    console.log('╚═══════════════════════════════════════════════════════╝');
    console.log('');
});
