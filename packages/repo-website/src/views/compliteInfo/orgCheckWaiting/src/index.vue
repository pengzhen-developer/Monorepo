/** 完善机构信息-等待审核 */
<template>
  <el-container>
    <Header></Header>
    <el-main>
      <ChackWaiting></ChackWaiting>
    </el-main>
  </el-container>
</template>

<script>
import Header from '@src/views/compliteInfo/header'
import ChackWaiting from './components/CheckWaiting'
export default {
  name: 'org-check-waiting',
  components: {
    Header,
    ChackWaiting
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  padding: 0;
  flex-direction: column;
}
.el-main {
  padding: 20px;
  width: 100%;
  height: calc(100vh - 64px);
  background-color: #fafafa;
  display: block;
}
</style>