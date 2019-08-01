<template>
  <div>
    <div class="header">
      <el-button @click="back" class="btn" type="primary">返回</el-button>
      <el-radio-group size="small" v-model="type">
        <el-radio-button :label="1">血压数据</el-radio-button>
        <el-radio-button :label="2">分析报告</el-radio-button>
        <el-radio-button :label="3">历史数据</el-radio-button>
      </el-radio-group>
      <div class="btn"></div>
    </div>
    <div class="content">
      <template v-if="type === 2">
        <peace-table key="table2" pagination ref="table2">
          <peace-table-column label="报告名称" prop="contact"></peace-table-column>
          <peace-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="showDetail(scope.row)" type="text">查看详情</el-button>
            </template>
          </peace-table-column>
        </peace-table>
      </template>
      <template v-if="type === 3">
        <peace-table key="table3" pagination ref="table3">
          <peace-table-column label="收缩压（mmHg）" prop="contact"></peace-table-column>
          <peace-table-column label="舒张压（mmHg）" prop="contact"></peace-table-column>
          <peace-table-column label="平均动脉压（mmHg）" prop="contact"></peace-table-column>
          <peace-table-column label="脉率" prop="contact"></peace-table-column>
          <peace-table-column label="分析结果" prop="contact"></peace-table-column>
          <peace-table-column label="检测时间" prop="contact"></peace-table-column>
          <peace-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="showDetail(scope.row)" type="text">查看详情</el-button>
            </template>
          </peace-table-column>
        </peace-table>
      </template>
    </div>
  </div>
</template>
<script>
import peace from '@src/library'

export default {
  name: 'PatientHealthData',
  data() {
    return {
      type: 1,
      view: {
        model: {
          patientId: this.$route.params.id
        }
      }
    }
  },
  methods: {
    get() {
      const fetch = peace.service.health.getPatientReport
      const params = this.view.model

      this.$refs.table.loadData({ fetch, params })
    },

    back() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn {
    width: 88px;
  }
  /deep/ .el-radio-button__inner {
    border-color: $--color-primary;
    font-weight: normal;
  }
}
</style>
