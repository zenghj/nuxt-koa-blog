const path = require('path')

exports.urls = {
  auth: 'http://45.62.111.182/service/account/user/auth',
  // auth: 'http://127.0.0.1:2333/api/account/user/auth',
  appUrl: ''
}

exports.paths = {
  logDir: '/Users/julianzeng/Desktop/git/fed/lop/Project/blog/nuxt-koa-blog/server/log',
  staticFilesPath: '/Users/julianzeng/Desktop/git/fed/lop/Project/blog/nuxt-koa-blog/server/web/dist/static',
  admin: /^\/blog\/admin(\/)?.*/,
  client: /^\/blog\/client(\/)?.*/,
  apiPrefix: '/blog/api',
}

exports.DBHost = 'mongodb://localhost:27017/my-blog'

exports.app = {
  host: '127.0.0.1',
  port: 3000,
  apiPrefix: '/blog/api',
}


// console.log(exports.paths);