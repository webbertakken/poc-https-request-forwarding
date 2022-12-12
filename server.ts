import next from 'next';
import { parse } from 'url';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import fs from 'fs';
import * as https from 'https';

// Config
export const port = parseInt(process.env.PORT || '3000', 10);
export const isDev = process.env.NODE_ENV !== 'production';
const key = fs.readFileSync('./ssl/localhost-key.pem');
const cert = fs.readFileSync('./ssl/localhost.pem');

// Next
const nextApp = next({ dev: isDev });
const handle = nextApp.getRequestHandler();

// Express, with Proxy
const app = express()
  .use(
    [`/gists/`, `/products/`],
    createProxyMiddleware({
      target: 'https://takken.io',
      changeOrigin: true,
      pathRewrite: {
        '^/products/': '/gists/',
      },
    }),
  )
  .get('*', (req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

// Https listener
const server = https.createServer({ key, cert }, app);
nextApp.prepare().then(() => {
  server.listen(port, () => {
    console.log(`> Ready on https://localhost:${port}`);
  });
});
