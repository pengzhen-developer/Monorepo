<template>
  <div>
    <peace-table ref="table"
                 pagination
                 size="mini">
      <el-table-column label="序号"
                       type="index"
                       align="center"
                       width="80px">
      </el-table-column>
      <el-table-column label="业务类型"
                       prop="bizType"
                       min-width="120px">
        <template slot-scope="scope">
          {{scope.row.bizType | getLabel(dictdata.bizTypeDict)}}
        </template>
      </el-table-column>
      <el-table-column label="同步状态"
                       prop="synStatus">
        <template slot-scope="scope">
          <div v-bind:class="scope.row.synStatus==0?'red':'grey'">
            {{scope.row.synStatus | getLabel(dictdata.synStatusDict)}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="同步方式"
                       prop="synMode">
        <template slot-scope="scope">
          {{scope.row.synMode | getLabel(dictdata.synModeDict)}}
        </template>
      </el-table-column>
      <el-table-column label="备注"
                       prop="remarks"
                       min-width="200px">
      </el-table-column>
      <el-table-column label="同步时间"
                       prop="synTime"
                       min-width="100px"></el-table-column>
    </peace-table>
  </div>
</template>

<script>
import Service from '../service'
export default {
  name: 'AbnormalDetails',
  props: {
    data: Object,
    dictdata: Object
  },
  watch: {
    data: {
      handler() {
        this.fetch()
      },
      immediate: true,
      deep: true
    }
  },
  filters: {
    getLabel: function(value, list) {
      return list.find((item) => item.value === value)?.label
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      const fetch = Service.exceptionMonitorDetails
      const params = Object.assign({}, this.data)
      this.$refs.table?.reloadData({ fetch, params })
    }
  }
}
</script>

<style lang="scss" scoped>
.red {
  color: #ed4014;
}
.grey {
  color: #333;
}
</style>