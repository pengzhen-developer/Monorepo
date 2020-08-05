/** 
 * 复诊续方预约详情
 */

<template>
  <div>
    <el-button class="full-width"
               size="large"
               type="primary"
               v-on:click="getReservationList">复诊预约</el-button>

    <peace-dialog title="复诊预约记录"
                  v-drag
                  v-bind:visible.sync="dialog.visible">
      <peace-table ref="table"
                   pagination
                   v-bind:data="dialog.data">
        <peace-table-column label="姓名"
                            width="80"
                            prop="familyName"></peace-table-column>
        <peace-table-column label="性别"
                            width="60"
                            prop="familyGenderText"></peace-table-column>
        <peace-table-column label="年龄"
                            width="60"
                            prop="familyAge"></peace-table-column>
        <peace-table-column label="复诊时间"
                            width="150px"
                            prop="returnVisitTime"></peace-table-column>
        <peace-table-column label="病情描述"
                            min-width="150px"
                            align="left"
                            prop="illDescription"></peace-table-column>

      </peace-table>
    </peace-dialog>
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