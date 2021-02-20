<template>
  <div class="layout-route">
    <div class="bg-white  q-px-lg q-py-sm">
      <el-tabs v-model="activeName"
               class="element-ui-default">
        <el-tab-pane label="审核模板"
                     name="first">
          <AuditTemplate class="q-pb-mb"></AuditTemplate>
        </el-tab-pane>
        <el-tab-pane label="点评模板"
                     name="second">
          <CommentTemplate class="q-pb-mb"></CommentTemplate>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AuditTemplate from './components/AuditTemplate'
import CommentTemplate from './components/CommentTemplate'
export default {
  name: 'MessageTemplate',
  components: {
    AuditTemplate,
    CommentTemplate
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__header {
  margin: 0 0 20px;
}
</style>