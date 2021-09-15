<template>
  <div class="q-pa-md">
    <p class="h5">当前输入参数</p>
    <p class="text-primary">{{ $route.params }}</p>

    <q-separator class="q-my-lg"></q-separator>

    <p class="h5">当前访问路径</p>
    <p class="text-primary">{{ $route.path }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {}
}
</script>

<style>
</style>