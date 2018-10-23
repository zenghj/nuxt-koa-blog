<template>
  <section class="article markdown-body" >
    <!-- <my-header></my-header> -->
    <h1>{{article.title}} <span class="small">{{formatTime(article.createAt)}}
      <router-link v-if="article.category" :to="{name: 'client', query: {category: article.category}}">[{{article.category}}]</router-link></span></h1>
    <div ref="articleContent" v-html="article.content" class=""></div>
  </section>
</template>

<script>
import 'highlight.js/styles/default.css'
import '~/assets/less/markdown.less'
import '~/assets/less/category.less'
import formatTime from '~/assets/js/timeHelper.js'
import { mapActions, mapState } from 'vuex';
export default {
  props: ['id'],
  created() {
  },
  fetch({store, params}) {
    return store.dispatch('FETCH_ARTICLE_INFO', params)
  },
  data () {
    return {
      
    }
  },
  computed: {
    ...mapState({
      article: state => state.curArticleInfo,
    }),
  },
  methods: {
    formatTime,
  }
}
</script>

<style scoped lang="less">
@import '../../../assets/less/vars.less';
.small {
  font-size: @smallFont;
  color: @gray;
}
</style>

