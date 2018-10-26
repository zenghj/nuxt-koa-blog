module.exports = {
  apps : [{
    name: 'nuxt-blog',
    script: 'server/index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      key: '/Users/julianzeng/.ssh/id_rsa.pub',
      user : 'root',
      host : '45.62.111.182 -p 29183',
      ref  : 'origin/master',
      repo : 'git@github.com:zenghj/nuxt-koa-blog.git',
      path : '/apps/nuxt-koa-blog',
      // Pre-setup command or path to a script on your local machine
      // Post-setup commands or path to a script on the host machine
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      
    }
  }
};
