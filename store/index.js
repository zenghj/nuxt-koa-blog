import axios from '~/plugins/axios'
import {Message} from 'element-ui'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const mutations = {
  SET_ARTICLE_LIST(state, list) {
    list && (state.articleList = list)
  },
  SET_CUR_ARTICLE_INFO(state, articleItem) {
    articleItem && (state.curArticleInfo = articleItem)
  },
  SET_CATEGORY_LIST(state, list) {
    list && (state.categoryList = list)
  }
}

const actions = {
  FETCH_ARTICLE_LIST: async ({commit}, payload = {}) => {
    try {
      const {data} = await axios.get('/articles', {
        params: {
          ...payload,
          status: 1,
          page: 1,
          limit: 10000,
        }
      })
  
      if(data.state === 1) {
        commit(mutationsTypes.SET_ARTICLE_LIST, data.result.docs || [])
      } else {
        Message.error(data.msg || '获取列表失败')
      }
    } catch (err) {
      Message.error('获取列表失败')
    }

  },

  FETCH_ARTICLE_INFO: async ({commit}, payload) => {
    try {
      const {data = {}} = await axios.get(`/article/${payload.id}`)
      if(data.state === 1) {
        commit(mutationsTypes.SET_CUR_ARTICLE_INFO, data.result)
      } else {
        Message.error(data.msg || '获取文章信息失败')
      }
    } catch(err) {
      console.log(err);
      Message.error('获取文章信息失败')
    }
    
  },

  FETCH_CATEGORY_LIST: async ({commit}, payload) => {
    try {
      const {data} = await axios.get('/categories')
      if(data.state === 1) {
        commit(mutationsTypes.SET_CATEGORY_LIST, data.result.list)
      } else {
        Message.error(data.msg || '获取分类列表失败')
      }
    } catch (err) {
      Message.error('获取分类列表失败')
    }
    
  }
}

const store = () => new Vuex.Store({
  state: {
    articleList: [],
    curArticleInfo: {},
    categoryList: [],
  },
  mutations,
  actions,
})

export const mutationsTypes = {}
Object.keys(mutations).forEach(key => {
  mutationsTypes[key] = key;
})

export default store