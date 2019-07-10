<template>
  <div>
    <h4>home</h4>
    <van-button @click="redirectDetailPage" type="default">点我跳医生列表</van-button>
  </div>
</template>

<script>
export default {
  methods: {
    redirectDetailPage() {
      this.$router.push('/home/doctorList')
    }
  }
}
</script>

<style>
</style>
