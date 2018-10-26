const Router = require('koa-router');
const {Category} = require('../db')
const {createCatchErrFn} = require('./utils')

const router = new Router()

router.get('/categories', async function categories (ctx, next) {
  try {
    const docs = await Category.$readList()
    ctx.body = {
      state: 1,
      result: {
        list: docs ? docs : []
      }
    }
  } catch (err) {
    createCatchErrFn(ctx)(err)
  }
})

router.delete('/category', async (ctx, next) => {
  try {
    let result = await Category.$delete(ctx.request.body)
    ctx.body = {
      state: 1,
      result,
    }
  } catch (err) {
    createCatchErrFn(ctx)(err)
  }
})

router.post('/category', async (ctx, next) => {
  try {
    let {name} = ctx.request.body
    let doc = await Category.$create({
      name,
    })
    ctx.body = {
      state: 1,
      result: {
        doc,
      }
    }
  } catch (err) {
    createCatchErrFn(ctx)(err)
  }
})
module.exports = router
