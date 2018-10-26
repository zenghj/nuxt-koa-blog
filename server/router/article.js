const fs = require('fs')
const os = require('os')
const path = require('path')
const Router = require('koa-router');
const {Article} = require('../db');
const checkAuth = require('../middlewares/checkAuth')
const {createCatchErrFn} = require('./utils')

const router = new Router();

router.use(async (ctx, next) => {
  await next();
})
router.get('/test', async (ctx, next, x) => {
  ctx.body = 'hello world';
  console.log(ctx)
})

/**
 * 创建文章： 发布 & 存草稿
 * ctx.request.body
 */ 
router.post('/article', checkAuth, async (ctx, next, xx) => {
  await Article.$create({
    ...ctx.request.body
  })
  .then(doc => {
    console.log(doc)
    ctx.body = {
      state: 1,
      msg: '创建成功',
      result: doc,
    }
  })
  .catch(createCatchErrFn(ctx, '创建失败'))
})

/**
 * 获取文章详细内容
 * ctx.params.id
 */
router.get('/article/:id', async (ctx, next) => {
  await Article.$readById(ctx.params.id)
    .then(doc => {
      ctx.body = {
        state: doc ? 1 : -1,
        result: doc,
      }
    })
    .catch(createCatchErrFn(ctx, '获取失败'))
})

/**
 * 获取文章列表
 */
router.get('/articles', async (ctx, next) => {
  await Article.$readList(ctx.query)
    .then(result => {
      ctx.body = {
        state: result ? 1 : -1,
        result,
      }
    })
    .catch(createCatchErrFn(ctx))
})

/**
 * 更新文章
 * ctx.params.id
 * ctx.request.body
 */
router.put('/article/:id', checkAuth, async (ctx, next) => {
  await Article.$update({
    id: ctx.params.id,
    ...ctx.request.body
  })
  .then(result => {
    ctx.body = {
      state: 1,
      result,
    }
  }).catch(err => {
    console.error(err)
    ctx.body = {
      state: -1,
      msg: err.msg,
    }
  })
})


// 移入回收站
// router.post('/article/:id', async (ctx, next) => {

// })
/**
 * 删除文章
 */
router.delete('/article/:id', checkAuth, async (ctx, next) => {
  await Article.$delete(ctx.params.id)
    .then((result) => {
      ctx.body = {
        state: 1,
        result
      }
    })
    .catch(createCatchErrFn(ctx))
})

module.exports = router
