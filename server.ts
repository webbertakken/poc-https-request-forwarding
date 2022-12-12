import next from 'next';
import { parse } from 'url';
import express from 'express';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';

// Config
export const port = parseInt(process.env.PORT || '3000', 10);
export const isDev = process.env.NODE_ENV !== 'production';

// Next
const nextApp = next({ dev: isDev });
const handle = nextApp.getRequestHandler();

// Express
const app = express()
  .use(morgan('dev'))
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

nextApp.prepare().then(() => {
  app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
