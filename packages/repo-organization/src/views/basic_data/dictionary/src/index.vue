<template>
  <div class="layout-route">

    <el-tabs type="card"
             v-model="checkPos">
      <el-tab-pane label="给药途径"
                   lazy>
        <ToDrugChannel></ToDrugChannel>
      </el-tab-pane>
      <el-tab-pane label="用药频次"
                   lazy>
        <ToDrugFrequency></ToDrugFrequency>
      </el-tab-pane>
      <el-tab-pane label="药品单位"
                   lazy>
        <DrugUnit></DrugUnit>
      </el-tab-pane>
      <el-tab-pane label="ICD-10"
                   lazy>
        <ICD10></ICD10>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>


<script>
import ToDrugChannel from './components/ToDrugChannel'
import ToDrugFrequency from './components/ToDrugFrequency'
import DrugUnit from './components/DrugUnit'
import ICD10 from './components/ICD10'

export default {
  components: {
    ToDrugChannel,
    ToDrugFrequency,
    DrugUnit,
    ICD10
  },
  data() {
    return {
      checkPos: '0'
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs {
  .el-tabs__header {
    margin: 0;
  }

  &.el-tabs--card > .el-tabs__header .el-tabs__item {
    border: 1px solid #fafafa;
    background: #fafafa;
    margin: 0 8px 0 0;
    border-radius: 8px 8px 0 0;
  }

  &.el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: 0;
  }

  &.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border: 1px solid #fff;
    background: #fff;
  }
}
</style>