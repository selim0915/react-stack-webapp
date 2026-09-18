const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const https = require('https');
const express = require('express');
const cors = require('cors');

if (process.env.USE_DB === 'true') {
  // eslint-disable-next-line global-require
  require('./config/db');
}

const IS_PROD = process.env.NODE_ENV === 'production';
const { loadSSL } = require('./config/ssl');
const logger = require('./config/winston');
const setupWebSocket = require('./websocket');

const app = express();
const NODE_PORT = 4000;

const ROOT = path.resolve(__dirname, '../dist');

// cors
app.use(cors());

// logger
app.use(logger.morganMiddleware);

app.use(express.json());
app.use(express.static(ROOT));

// API routes - MUST be before frontend catch-all
const routes = require('./routes/product');

routes.initialize(app);

// 프론트엔드 라우팅 (SPA 지원)
// 개발 시에는 webpack-dev-server(포트 4002)를 사용하므로, 
// 여기서는 프로덕션 빌드(dist) 파일만 제공하면 됩니다.
if (IS_PROD) {
  app.get('*', (_req, res, _next) => {
    res.sendFile(path.join(ROOT, 'index.html'), (err) => {
      if (err) {
        res.sendStatus(err.status).end();
      }
    });
  });
} else {
  // 개발 환경에서는 API 서버 역할만 수행하며 프론트엔드는 제공하지 않음
  app.get('/', (req, res) => {
    res.send('API Server is running in development mode. Please use Webpack Dev Server (port 4002) for the frontend.');
  });
}

// webSocket
setupWebSocket();

// HTTPS Server
const server = https.createServer(loadSSL(), app);

server.listen(NODE_PORT, () => {
  console.log(`Listening on ${NODE_PORT}`);
});

module.exports = app;
