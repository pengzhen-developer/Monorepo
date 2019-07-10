<template>
  <div>
    <h4>home</h4>
    <van-button @click="redirectDetailPage" type="default">点我跳详情</van-button>
  </div>
</template>

<script>
export default {
  methods: {
    redirectDetailPage() {
      this.$router.push('/home/detail')
    }
  }
}
</script>

<style>
</style>
