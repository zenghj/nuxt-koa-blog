const sessions = {}
const maxCacheNum = 100
const list = sessions.list = []


sessions.save = (session) => {
  if (list.length > maxCacheNum) {
    list.shift()
  }
  list.push(session)
}

sessions.isAuth = ({UN, PW}) => {
  console.log(list.length)
  return list.filter(session => {
    return session.UN === UN && session.PW === PW
  }).length > 0
}

module.exports = sessions