<template>
  <div class="flex full-width">
    <div class="layout-route full-width">
      <template v-if="returnVisitIsOpen === true">

        <div class="card card-search q-mb-md">
          <el-form inline
                   label-width="auto"
                   label-position="left">

            <el-form-item label="医生：">
              <el-input v-model="query.doctorName"
                        placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="科室：">
              <el-select clearable
                         v-model="query.twoLevelDeptId">
                <el-option :key="item.id"
                           :label="item.netdeptName"
                           :value="item.id"
                           v-for="item in deptOptions"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="号源日期：">
              <peace-date-picker placeholder="选择日期"
                                 type="date"
                                 v-model="query.timeSharing"
                                 value-format="yyyy-MM-dd"></peace-date-picker>
            </el-form-item>
            <el-form-item label="号源时段：">
              <el-select clearable
                         v-model="query.ampm">
                <el-option :key="item.value"
                           :label="item.label"
                           :value="item.value"
                           v-for="item in timeOptions"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="">
              <el-button type="primary"
                         @click="getList()">查询</el-button>
            </el-form-item>

          </el-form>
        </div>

        <div class="card">

          <PeaceTable ref="table"
                      style="width: 100%"
                      pagination>
            <PeaceTableColumn label="号源日期"
                              prop="timeSharing"
                              min-width="120"></PeaceTableColumn>
            <PeaceTableColumn label="医生"
                              prop="doctorName"
                              min-width="120"></PeaceTableColumn>
            <PeaceTableColumn label="科室"
                              prop="departmentName"
                              min-width="120"></PeaceTableColumn>
            <PeaceTableColumn label="价格/¥"
                              min-width="100">
              <template slot-scope="scope">
                <span>{{ (scope.row.unitPrice || 0) | formatCurrency }}</span>
              </template>
            </PeaceTableColumn>
            <PeaceTableColumn label="号源时段"
                              prop="AMPM"
                              min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.AMPM | getEnumLabel(timeOptions) }}</span>
              </template>
            </PeaceTableColumn>
            <PeaceTableColumn label="号源总数"
                              prop="bookingTotal"
                              min-width="100"></PeaceTableColumn>
            <PeaceTableColumn label="开始时间"
                              prop="bookingStart"
                              min-width="120"></PeaceTableColumn>
            <PeaceTableColumn label="结束时间"
                              prop="bookingEnd"
                              min-width="120"></PeaceTableColumn>
            <PeaceTableColumn fixed="right"
                              width="150"
                              label="操作">
              <template slot-scope="scope">
                <div class="align-left">
                  <el-button @click="getInfo(scope.row)"
                             type="text">查看详情</el-button>
                  <el-button v-if="scope.row.bookingCounting"
                             @click="batchModifySource(scope.row)"
                             type="text">停诊</el-button>
                </div>
              </template>
            </PeaceTableColumn>
          </PeaceTable>
        </div>
      </template>
      <template v-else-if="returnVisitIsOpen === false">
        <div class="bg-white full-height q-pa-lg">
          <return-visit-open></return-visit-open>
        </div>
      </template>
      <template v-else>
        <div class="flex bg-white full-height"
             :v-loading="true">
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Service from './service'
import ReturnVisitOpen from './components/ReturnVisitOpen'

export default {
  name: 'ReturnVisitSource',
  components: { ReturnVisitOpen },
  data() {
    return {
      returnVisitIsOpen: null,
      query: {
        doctorName: '',
        twoLevelDeptId: '',
        timeSharing: '',
        ampm: '',
        sourceDisType: '0'
      },
      deptOptions: [],
      timeOptions: [
        { value: 'AM', label: '上午' },
        { value: 'PM', label: '下午' }
      ]
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    },
    formatCurrency(value) {
      /* eslint-disable no-useless-escape */
      value = value.toString().replace(/\$|\,/g, '')
      if (isNaN(value)) value = '0'
      let sign = value == (value = Math.abs(value))
      value = Math.floor(value * 100 + 0.50000000001)
      let cents = value % 100
      value = Math.floor(value / 100).toString()
      if (cents < 10) cents = '0' + cents
      for (var i = 0; i < Math.floor((value.length - (1 + i)) / 3); i++)
        value = value.substring(0, value.length - (4 * i + 3)) + ',' + value.substring(value.length - (4 * i + 3))
      return (sign ? '' : '-') + value + '.' + cents
    }
  },
  created() {
    this.getDeptList()
  },
  async mounted() {
    let checkReturnVisitOpen = await Service.checkReturnVisitOpen()
    let returnVisitList = checkReturnVisitOpen.data.list
    this.returnVisitIsOpen = returnVisitList.isOpen == 1 ? true : false

    if (this.returnVisitIsOpen) {
      this.$nextTick().then(() => {
        this.getList()
      })
    }
  },
  async activated() {
    let checkReturnVisitOpen = await Service.checkReturnVisitOpen()
    let returnVisitList = checkReturnVisitOpen.data.list
    this.returnVisitIsOpen = returnVisitList.isOpen == 1 ? true : false

    if (this.returnVisitIsOpen) {
      this.$nextTick().then(() => {
        this.getList()
      })
    }
  },
  methods: {
    // 获取号源列表
    getList() {
      const fetch = Service.getSource
      let params = Peace.util.deepClone(this.query)
      this.$refs.table.reloadData({ fetch, params })
    },
    getDeptList() {
      Service.getDeptList().then((res) => {
        const array = []
        const data = res.data
        if (!data || !data.length) {
          return
        }
        data.forEach((element) => {
          element.childDept.forEach((item) => {
            array.push(item)
          })
        })

        this.deptOptions = array
      })
    },
    // 获取号源详情
    getInfo(row) {
      this.$router.push({
        path: '/internet-cloud-hospital/setting-center/return-visit-setting/source-detail',
        query: {
          target: row.doctorName,
          ...row
        }
      })
    },
    // 批量更新号源
    batchModifySource(row) {
      this.$confirm('将对医生进行停诊，是否继续？', '提示', { closeOnClickModal: false })
        .then(() => {
          const params = {
            doctorCode: row.doctorCode,
            sourceCode: row.sourceCode,
            bookingState: 3, // 0.未预约 1.已预约 2.已失效 3.已停止
            sourceDisType: 0 // 0线上1线下
          }
          Service.batchModifySource(params).then((res) => {
            Peace.util.success(res.msg)
            this.getList()
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.red {
  color: #f56c6c;
}

::v-deep.el-form-item.el-form-item--mini {
  .el-form-item__label-wrap {
    margin-left: 0 !important;
  }
}
</style>