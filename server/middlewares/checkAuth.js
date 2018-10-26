const axios = require('axios')
const {urls} = require('../config')
const {errorLog} = require('../lib/logger')
const sessions = require('../lib/sessions')
function unAuthRes (ctx) {
  ctx.set('WWW-Authenticate', 'Basic realm="Secure Area"')
  ctx.response.status = 401
}

module.exports = async function checkAuth (ctx, next) {
  try {
    const {request} = ctx
    const auth = request.get('authorization') || '';
    const parts =  auth.split(' ');
    const method = parts[0] || '';
    const encoded = parts[1] || '';
    const [UN, PW] = new Buffer(encoded, 'base64').toString('utf-8').split(':');
    const session = {UN, PW}
    try {
      if(sessions.isAuth(session)) {
        await next()
      } else {
        const res = await axios.post(urls.auth, {...session})
        if(res.data.success) {
          sessions.save(session)
          await next()
        } else {
          unAuthRes(ctx)
        }
      }
    } catch (err) {
      unAuthRes(ctx)
    }
  } catch (err) {
    errorLog(err)
    ctx.status = 500
  }
}



