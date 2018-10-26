const {resErrorLog} = require('../../lib/logger')

function createCatchErrFn(ctx, msg) {
  return err => {
    resErrorLog(ctx, err)
    ctx.body = {
      state: -1,
      msg: msg || err.message || '接口响应失败',
    }
  }
}

module.exports = {
  createCatchErrFn,
}