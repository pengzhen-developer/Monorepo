<template>
  <div class="layout-route full-width flex">
    <div class="full-width bg-white ">
      <el-tabs v-model="activeName"
               type="card">
        <el-tab-pane label="项目字典"
                     name="first"
                     lazy>
          <ItemDictionary></ItemDictionary>
        </el-tab-pane>
        <el-tab-pane label="组套字典"
                     name="second"
                     lazy>
          <GroupDictionary></GroupDictionary>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import ItemDictionary from './components/ItemDictionary'
import GroupDictionary from './components/GroupDictionary'
export default {
  name: 'InspectionDictionary',
  components: { ItemDictionary, GroupDictionary },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__header {
  margin: 0;
  background: #f5f5f5;
}
</style>