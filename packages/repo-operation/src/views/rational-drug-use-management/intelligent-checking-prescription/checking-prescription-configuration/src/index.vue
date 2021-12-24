<template>
  <div class="layout-route">
    <template>
      <OrganizationList v-on:showConfigureDetail="showConfigureDetail"
                        v-on:showOperationLog="showOperationLog"></OrganizationList>
    </template>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="preConfigureModel.visible"
                  title="智能审方设置详情"
                  v-if="preConfigureModel.visible"
                  append-to-body
                  width="576px">
      <ConfigureDetail v-bind:data="preConfigureModel.data"></ConfigureDetail>
    </peace-dialog>

    <OperationLog v-if="logModel.visible"
                  v-bind:visible.sync="logModel.visible"
                  v-bind:data="logModel.data"></OperationLog>

  </div>
</template>

<script>
import OrganizationList from './components/OrganizationList'
import ConfigureDetail from './components/ConfigureDetail'
import OperationLog from './components/OperationLog'
export default {
  name: 'IntelligentCheckPreSet',
  components: {
    OrganizationList,
    ConfigureDetail,
    OperationLog
  },
  data() {
    return {
      preConfigureModel: {
        visible: false,
        data: {}
      },
      logModel: {
        visible: false,
        data: {}
      }
    }
  },
  methods: {
    showConfigureDetail(row) {
      this.preConfigureModel.visible = true
      this.preConfigureModel.data = row
    },
    showOperationLog(row) {
      this.logModel.visible = true
      this.logModel.data = row
    }
  }
}
</script>

<style>
</style>