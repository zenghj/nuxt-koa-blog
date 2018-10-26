const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const articleRouter = require('./article')
const categoryRouter = require('./category')
const checkAuth = require('../middlewares/checkAuth')
const {paths} = require('../config')


router = new Router()
// router.get(paths.admin, checkAuth, async ctx => {
//   ctx.type = 'html';
//   ctx.body = fs.createReadStream(paths.adminHtml);
// })
// router.get(paths.client, async ctx => {
//   ctx.type = 'html';
//   ctx.body = fs.createReadStream(paths.clientHtml)
// })
router.use(paths.apiPrefix, articleRouter.routes())

router.use(paths.apiPrefix, categoryRouter.routes())

module.exports = router
