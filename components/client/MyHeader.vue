<template>
  <header id="client-header">
    <div class="header">
      <nuxt-link :to="{name: 'client'}" class="menu-item">Julianzeng's blog</nuxt-link>
    </div>
  </header>
</template>
<style lang="less" scoped>
@import '../../assets/less/vars.less';
#client-header {
  background: @primaryColor;
  color: #fff;
  height: 3em;
  line-height: 3em;
  padding: 0 1em;
}
</style>
