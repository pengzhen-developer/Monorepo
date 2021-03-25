/** 
 * 复诊续方预约详情
 */

<template>
  <div class="text-center q-mt-lg">
    <el-button size="large"
               type="text"
               v-on:click="getReservationList">查看预约记录</el-button>

    <PeaceDialog title="复诊预约记录"
                 v-bind:visible.sync="dialog.visible">
      <PeaceTable ref="table"
                  v-bind:data="dialog.data">
        <PeaceTableColumn label="姓名"
                          width="80"
                          prop="familyName"></PeaceTableColumn>
        <PeaceTableColumn label="性别"
                          width="60"
                          prop="familyGenderText"></PeaceTableColumn>
        <PeaceTableColumn label="年龄"
                          width="60"
                          prop="familyAge"></PeaceTableColumn>
        <PeaceTableColumn label="复诊时间"
                          width="160px"
                          prop="returnVisitTime"></PeaceTableColumn>
        <PeaceTableColumn label="病情描述"
                          min-width="150px"
                          prop="illDescription"></PeaceTableColumn>

      </PeaceTable>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './../service'

export default {
  data() {
    return {
      dialog: {
        visible: false,
        data: []
      }
    }
  },

  methods: {
    getReservationList() {
      this.dialog.visible = true
      this.dialog.data = []

      const fetch = Service.getReservationList
      const params = {}

      this.$nextTick().then(() => {
        this.$refs.table.loadData({
          fetch,
          params
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.accordion {
  &.el-collapse {
    border-top: none;
  }

  /deep/ .el-collapse-item__header {
    border-bottom: 1px solid #f2f2f2;
  }

  /deep/ .el-icon-arrow-right {
    display: none;
  }

  /deep/ .el-collapse-item__wrap {
    border-bottom: none;
  }
}
</style>