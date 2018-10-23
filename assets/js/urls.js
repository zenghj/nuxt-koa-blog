import {getGlobal} from './global'
const location = window.location
const host = location.host
const protocol = location.protocol
const urlPrefix = `${protocol}//${host}/blog`
// const apiPrefix = `${urlPrefix}/api`
const globalServicePrefix = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:2333/service' : 'http://47.95.13.52/service'

const URLS = {
  client: `${urlPrefix}/client`,
  admin: `${urlPrefix}/admin`,
  uploadImgApi: `${globalServicePrefix}/upload/img`,
  tj: `${globalServicePrefix}/tj`,
}

const isHashMode = getGlobal('isHashMode', false)

URLS.getClientArticleUrl = id => {
  return isHashMode ? `${URLS.client}#/articles/${id}`
    : `${URLS.client}/articles/${id}`
}

URLS.getClientArticleListUrl = () => {
  return isHashMode ? `${URLS.client}#/articles` : `${URLS.client}/articles`
}

export default URLS
