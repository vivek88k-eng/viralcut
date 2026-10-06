
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 587, hash: '7d2874dd653b04844ee1ac229b7f402f24d712958585bc9d37021a6ec652be0a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: 'f9309c5f28c387014a755a8bdb87937ce1b2d04804031ead8a4a6ba7161ea7c2', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 23699, hash: 'aced8ec4f428168e1c73e8f8f5acf6e11f728806e139276160bf8b2fa1769b2c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-OXW2MAEB.css': {size: 29, hash: 'fxngjyxXs5g', text: () => import('./assets-chunks/styles-OXW2MAEB_css.mjs').then(m => m.default)}
  },
};
