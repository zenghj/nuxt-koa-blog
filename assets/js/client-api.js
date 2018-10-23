import axios from '~plugins/axios'
import {Message} from 'element-ui'

export function fetchArticles (payload) {
  return axios.get('/articles', {
    params: {
      ...payload,
      status: 1,
      page: 1,
      limit: 10000,
    }
  })
}

export function getArticleInfo (id) {
  return axios.get(`/article/${id}`)
}

export function getCategoryories () {
  return axios.get('/categories').catch(err => {
    Message.error(err.msg || '获取Categoryories失败')
  })
}
