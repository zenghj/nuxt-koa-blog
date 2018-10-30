const pkg = require('./package')

const scrollBehavior = (to, from, savedPosition) => {
  // console.log('scrollBehavior invoke')
  // // if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }

  // // savedPosition 只有在 popstate 导航（如按浏览器的返回按钮）时可以获取。
  // if (savedPosition) {
  //   return savedPosition
  // } else {
  //   let position = {}
  //   // 目标页面子组件少于两个
  //   if (to.matched.length < 2) {
  //     // 滚动至页面顶部
  //     position = { x: 0, y: 0 }
  //   }
  //   else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
  //     // 如果目标页面子组件中存在配置了scrollToTop为true
  //     position = { x: 0, y: 0 }
  //   }
  //   // 如果目标页面的url有锚点,  则滚动至锚点所在的位置
  //   if (to.hash) {
  //     position = { selector: to.hash }
  //   }
  //   return position
  // }
  return {x: false, y: false}
}

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: "Julianzeng's blog",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Julianzeng's blog, front-end, javascript, html, css, nodejs, webpack, vue, react" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/ssr/blog/favicon.ico' }
    ]
  },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    {
      src: '@/assets/less/common.less',
      lang: 'less',
    }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    postcss: false, // yarn build 报错 https://github.com/nuxt/nuxt.js/issues/4143
    
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  },

  // 配置vue-router
  router: {
    base: '/ssr/blog',
    scrollBehavior,
  },

  // 配置进度条
  loading: {
    color: 'linear-gradient(to right, #CDDC39, #F44336)',
  },
}
