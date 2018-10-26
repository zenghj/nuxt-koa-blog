const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = require('./router')
const config = require('./config')
const {errorLog, httpLog} = require('./lib/logger')
require('./connectDB')
const port = 3000

app.use(bodyParser())

app.use(logger())

app.use(async (ctx, next) => {
  const {request} = ctx;
  httpLog('%s %s', request.method, request.originalUrl)
  await next();  
})

// app.use(koaStatic(config.paths.staticFilesPath, {
//   gzip: true,
//   maxage: 31536000000,
// }))

app.use(router.routes())

// app.use(async (ctx, next) => {
//   const {request, response} = ctx;
//   errorLog('%s %s %s', response.status, request.method, request.originalUrl)
//   ctx.status = 404;  
// })

app.listen(port, (err) => {
  if(err) {
    console.error(err)
  } else {
    console.log(`listening on http://127.0.0.1:${port}/blog/client`)
  }
})

app.on('error', (err, ctx) => {
  errorLog(err);
})
 
module.exports = app

