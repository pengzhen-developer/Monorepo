<!--
 * @Description: 组件模板
-->

<template>
  <div class="demo"
       v-loading="loading">
    <span>{{ internalData }}</span>
  </div>
</template>

<script>
export default {
  name: 'PeaceDemoComponent',

  props: {
    data: [Object, Array, Function]
  },

  data() {
    return {
      loading: false,
      internalData: {}
    }
  },

  watch: {
    data: {
      async handler() {
        this.loading = true
        this.internalData = await this.fetch()
        this.loading = false
      },
      immediate: true
    }
  },

  methods: {
    async fetch() {
      return typeof this.data === 'function' ? await this.data() : this.data
    }
  }
}
</script>


<style lang="scss" scoped>
span {
  font-size: 16px;
}
</style>

<style scoped lang="scss" src="./index.scss">
