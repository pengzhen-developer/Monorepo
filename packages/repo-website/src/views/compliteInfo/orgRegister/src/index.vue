/** 完善机构信息-机构入驻 */
<template>
  <el-container>
    <Header></Header>
    <el-main>
      <OrgRegister></OrgRegister>
    </el-main>
  </el-container>
</template>

<script>
import Header from '@src/views/compliteInfo/header'
import OrgRegister from './components/OrgRegister'
export default {
  name: 'org-register',
  components: {
    Header,
    OrgRegister
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
  overflow: auto;
  background-color: #fafafa;
  display: block;
}
</style>