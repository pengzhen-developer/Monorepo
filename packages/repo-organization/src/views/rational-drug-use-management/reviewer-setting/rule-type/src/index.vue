<template>
  <div class="layout-route flex column">
    <el-tabs v-model="activeName"
             type="card">
      <el-tab-pane label="规则类型设置"
                   name="first">
      </el-tab-pane>
      <el-tab-pane label="审方模式"
                   name="second">
      </el-tab-pane>
    </el-tabs>

    <div class="full-width bg-white col">
      <div v-if="activeName==='first'">
        <RuleTypeSet></RuleTypeSet>
      </div>
      <div v-loading="loading"
           v-else>
        <el-image v-bind:src="require('./assets/img/model_pic.png')"
                  class="full-width"
                  style="height:auto"
                  v-on:load="loadImage"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
import RuleTypeSet from './components/RuleTypeSet'
export default {
  name: 'RuleType',
  components: {
    RuleTypeSet
  },
  data() {
    return {
      activeName: 'first',
      loading: true
    }
  },
  methods: {
    loadImage() {
      this.loading = false
    }
  }
}
</script>

<style  lang="scss" scoped>
::v-deep .el-tabs {
  .el-tabs__header {
    margin: 0;
  }
}
</style>