<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-position="right"
               label-suffix
               size="mini">
        <el-form-item label="处方号：">
          <el-input v-model.trim="model.prescriptionNo"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="处方来源：">
          <el-select v-model="model.prescriptionSource"
                     placeholder="不限"
                     clearable>
            <el-option label="不限"
                       value></el-option>
            <el-option v-for="(value, label) in source.SOURCE_STATUS"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科室：">
          <el-select v-model="model.deptCode"
                     placeholder="全部"
                     clearable
                     filterable>
            <el-option label="全部"
                       value></el-option>
            <el-option v-for="(item, index) in deptlist"
                       v-bind:key="index"
                       v-bind:label="item.MedicalDepartmentName"
                       v-bind:value="item.MedicalDepartmentCode">{{item.MedicalDepartmentName}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="智能审方结果：">
          <el-select v-model="model.actionMsg"
                     placeholder="全部"
                     clearable>
            <el-option label="全部"
                       value></el-option>
            <el-option v-for="(value, label) in source.ACTIONMSG_STATUS"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="患者姓名：">
          <el-input v-model.trim="model.patientName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="处方审核时间：">
          <peace-date-picker value-format="yyyy-MM-dd "
                             type="daterange"
                             v-model.trim="DateValue"></peace-date-picker>
        </el-form-item>
        <el-form-item label
                      label-width="0">
          <el-button type="primary"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="info row q-mb-10">
        <p>全部处方：{{statistic.totalCount}}</p>
        <p>通过：{{statistic.okCount}}</p>
        <p>禁用：{{statistic.dcount}}</p>
        <p>慎用：{{statistic.rcount}}</p>
        <p>提示：{{statistic.icount}}</p>
        <p>暂无结果：{{statistic.errCount}}</p>
      </div>
      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <el-table-column label="序号"
                         type="index"
                         align="center"
                         width="80px">
        </el-table-column>

        <el-table-column width="110px"
                         label="智能审方结果"
                         align="center"
                         prop="examineResult">

        </el-table-column>
        <el-table-column min-width="180px"
                         label="处方号"
                         prop="prescriptionNo"></el-table-column>
        <el-table-column min-width="160px"
                         label="处方审核时间"
                         prop="createTime"></el-table-column>
        <el-table-column min-width="90px"
                         label="患者姓名"
                         prop="patientName"></el-table-column>
        <el-table-column min-width="90px"
                         label="处方来源"
                         prop="prescriptionSource"></el-table-column>
        <el-table-column min-width="90px"
                         label="开方医生"
                         prop="doctorName"></el-table-column>
        <el-table-column min-width="100px"
                         label="科室"
                         prop="deptName"></el-table-column>
        <el-table-column min-width="80px"
                         align="center"
                         fixed="right"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="detail(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>
  </div>
</template>

<script>
import Service from './service'
import CONSTANT from './constant'
export default {
  name: 'OrderOverview',
  inject: ['provideAddTab', 'provideGetTab'],
  components: {},

  data() {
    return {
      DateValue: [],
      source: {
        SOURCE_STATUS: CONSTANT.SOURCE_STATUS,
        ACTIONMSG_STATUS: CONSTANT.ACTIONMSG_STATUS
      },
      deptlist: [],
      statistic: {},
      model: {
        startTime: '',
        endTime: '',
        actionMsg: '',
        deptCode: '',
        prescriptionNo: '',
        prescriptionSource: '',
        patientName: ''
      }
    }
  },
  watch: {
    DateValue(value) {
      this.model.startTime = value?.[0] ?? ''
      this.model.endTime = value?.[1] ?? ''
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      //获取科室列表
      Service.GetDepartment().then((res) => {
        this.deptlist = res.data.list
      })
      //处方统计
      const params = Peace.util.deepClone(this.model)
      Service.PrescriptionStatistics(params).then((res) => {
        this.statistic = res.data
      })
      //获取处方列表
      this.get()
    })
  },

  methods: {
    get() {
      //获取处方列表
      const fetch = Service.PrescriptionList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        return res.data.prescriptionVoList
      })
    },
    detail(row) {
      const menu = Peace.util.deepClone(this.provideGetTab('查看处方'))
      menu.menuPath = menu.menuPath + '?JZTClaimNo=' + row.jztClaimNo
      this.provideAddTab(menu)
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.info p {
  margin-right: 30px;
}
</style>