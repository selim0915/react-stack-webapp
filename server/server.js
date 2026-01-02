require('dotenv').config();

const path = require('path');
const https = require('https');
const express = require('express');
const cors = require('cors');

if (process.env.USE_DB === 'true') {
  // eslint-disable-next-line global-require
  require('./config/db');
}

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const { loadSSL } = require('./config/ssl');
const logger = require('./config/winston');
const setupWebSocket = require('./websocket');
const webpackConfig = require('../webpack.config');

const app = express();
const NODE_PORT = 4000;

const ROOT = path.resolve(__dirname, '../dist');
const IS_PROD = process.env.NODE_ENV === 'production';

// cors
app.use(cors());

// logger
app.use(logger.morganMiddleware);

app.use(express.json());
app.use(express.static(ROOT));

// API routes - MUST be before frontend catch-all
const routes = require('./routes/product');

routes.initialize(app);

// webpack & frontend catch-all
if (IS_PROD) {
  app.get('*', (_req, res, _next) => {
    res.sendFile(path.join(ROOT, 'index.html'), (err) => {
      if (err) {
        res.sendStatus(err.status).end();
      }
    });
  });
} else {
  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    }),
  );

  app.get('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
      return null;
    });
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
