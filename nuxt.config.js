const pkg = require('./package')

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
      { rel: 'icon', type: 'image/x-icon', href: '/blog/favicon.ico' }
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
    base: '/ssr/blog'
  },

  // 配置进度条
  loading: {
    color: 'linear-gradient(to right, #CDDC39, #F44336)',
  },
}
