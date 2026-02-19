
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-AFONEOLX.js",
      "chunk-U2W2W7J3.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2FDZDPMG.js",
      "chunk-U2W2W7J3.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-OMIB7Y3T.js",
      "chunk-U2W2W7J3.js"
    ],
    "route": "/register-driver-1"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-CCNGMBRN.js",
      "chunk-U2W2W7J3.js"
    ],
    "route": "/register-driver-2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-SIOSINPX.js",
      "chunk-KTAY5R4Z.js",
      "chunk-IBTXRLNE.js",
      "chunk-OHFGESWH.js",
      "chunk-U2W2W7J3.js"
    ],
    "route": "/buttons"
  },
  {
    "renderMode": 1,
    "redirectTo": "/admin/relatorios",
    "route": "/admin"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-IWGKZEI5.js"
    ],
    "route": "/admin/relatorios"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RRZH7UVK.js",
      "chunk-JMVF53DM.js",
      "chunk-OHFGESWH.js",
      "chunk-U2W2W7J3.js"
    ],
    "route": "/admin/motoristas"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-754OGYTT.js",
      "chunk-U2W2W7J3.js"
    ],
    "route": "/admin/clientes"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-HVRPMXM4.js",
      "chunk-IBTXRLNE.js",
      "chunk-JMVF53DM.js"
    ],
    "route": "/admin/aprovar-motoristas"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TSLF34AF.js",
      "chunk-KTAY5R4Z.js",
      "chunk-IBTXRLNE.js",
      "chunk-U2W2W7J3.js"
    ],
    "route": "/home"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XQR2NZ5Q.js"
    ],
    "route": "/viagens"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-Y5SCRWH4.js"
    ],
    "route": "/motorista"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 959, hash: 'eebcf9d0a7aaa36cbf7a9efe660e60e3c4b42940fb53fb3ba01740629fedc687', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1499, hash: '2f623ffd647a0441161a852de57def0d6f4ebf0a529e72947aa2509931170d2e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 4223, hash: 'b77695ad2ff5a1f1aff2359ed00cd536abb03fb036a7f81b31fec3821cdea57f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 7787, hash: '2a4db9da5a1eb74b2dd1095cec2356215b0ae9386316f39fb21daa4f6e456c29', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 5545, hash: 'e781398b6dcabbc769faa455c8ae24e1e0150531d61ba838bed113726132ec27', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register-driver-2/index.html': {size: 276, hash: 'bccecf9b4112905d4dabd0ad44df9d587704028579d7278a4a451285ee31ae6a', text: () => import('./assets-chunks/register-driver-2_index_html.mjs').then(m => m.default)},
    'register-driver-1/index.html': {size: 6957, hash: 'd66d0475772e0f08bf3dc8b8c5ff3a552a43734ed459ca47ffae6e800a7dff8d', text: () => import('./assets-chunks/register-driver-1_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 32049, hash: '54e5ed785f0fd4a425c09705bde9e23d02631696808dfc54cfd6add8129e37bf', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'buttons/index.html': {size: 29328, hash: 'e12b80cf2cea87c3c84b0792f30d156fdb10bd1d519408fc4930295c9592450a', text: () => import('./assets-chunks/buttons_index_html.mjs').then(m => m.default)}
  },
};
