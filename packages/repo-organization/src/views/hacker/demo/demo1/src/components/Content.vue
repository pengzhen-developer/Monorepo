<template>
  <peace-container>{{ injectData }}</peace-container>
</template>

<script>
export default {
  inject: ['provideData'],

  computed: {
    injectData() {
      return this.provideData()
    }
  }
}
</script>

<style>
</style>