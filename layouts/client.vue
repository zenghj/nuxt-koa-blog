<template>
  <div>
    <ClientHeader />
    <div>
      <nuxt />
    </div>
  </div>

</template>

<script>
  import ClientHeader from '../components/client/MyHeader.vue';
  export default {
    components: {
      ClientHeader
    }
  }
</script>