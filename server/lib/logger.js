const MiniLogger = require('mini-logger')
const config = require('../config')

const miniLogger = MiniLogger({
  dir: config.paths.logDir,
  categories: [ 'http'],
  format: 'YYYY-MM-DD-[{category}][.log]',
  timestamp: true,
})

exports.errorLog = (...args) => {
  miniLogger.error(...args);
}

exports.httpLog = (...args) => {
  miniLogger.http(...args);
}

exports.resErrorLog = (ctx, err) => {
  try {
    const time = Date.now()
    err.data = time
    miniLogger.error(err)
    ctx.set('RESPONSE_TIME', time)
  } catch(err) {
    console.error(err)
  }
}

