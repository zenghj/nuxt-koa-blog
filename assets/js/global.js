import {isUndefiend} from './utils'

const global = {}
export function setGlobal (key, obj) {
  global[key] = obj
}

export function getGlobal (key, defaultVal) {
  return isUndefiend(global[key]) ? defaultVal : global[key]
}

export function initGlobal (opt = {}) {
  Object.keys(opt).forEach(key => {
    setGlobal(key, opt[key])
  })
}
