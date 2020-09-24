<template>
  <div class="layout-route">

    <el-tabs type="card"
             v-model="checkPos">
      <el-tab-pane label="基础规则"
                   lazy>
        <IframeView checkNum="基础规则"></IframeView>
      </el-tab-pane>
      <el-tab-pane label="TNA规则"
                   lazy>
        <IframeView checkNum="TNA规则"></IframeView>
      </el-tab-pane>
      <el-tab-pane label="药品规则"
                   lazy>
        <IframeView checkNum="药品规则"></IframeView>
      </el-tab-pane>
      <el-tab-pane label="科室规则"
                   lazy>
        <IframeView checkNum="科室规则"></IframeView>
      </el-tab-pane>
      <el-tab-pane label="管理规则"
                   lazy>
        <IframeView checkNum="管理规则"></IframeView>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>


<script>
import IframeView from './components/IframeView'

export default {
  components: {
    IframeView
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