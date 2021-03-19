<template>
  <div class="flex full-width">
    <div class="layout-route full-width">
      <template v-if="registerIsOpen === true">
        <div class="card card-search q-mb-md">
          <el-form inline
                   label-width="auto"
                   label-position="left">

            <el-form-item>
              <span slot="label">
                <span>就诊人</span>
                <span>：</span>
              </span>
              <el-input v-model="model.patientName"
                        placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item>
              <span slot="label">
                <span>订单编号</span>
                <span>：</span>
              </span>
              <el-input v-model="model.orderNo"
                        placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item>
              <span slot="label">
                <span>身份证号</span>
                <span>：</span>
              </span>
              <el-input v-model="model.idCard"
                        placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item>
              <span slot="label">
                <span>订单状态</span>
                <span>：</span>
              </span>
              <el-select v-model="model.orderStatus"
                         clearable
                         placeholder="全部">
                <el-option :key="item.label"
                           :label="item.label"
                           :value="item.value"
                           v-for="item in source.ENUM_REGISTER_ORDER_STATUS"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <span slot="label">
                <span>预约日期</span>
                <span>：</span>
              </span>
              <peace-date-picker type="daterange"
                                 v-model="timeRange"
                                 :picker-options="pickerOptions"
                                 format="yyyy-MM-dd"
                                 value-format="yyyy-MM-dd"></peace-date-picker>
            </el-form-item>

            <el-form-item>
              <span slot="label">
                <span>二级科室</span>
                <span>：</span>
              </span>
              <el-select v-model="model.deptName"
                         clearable
                         placeholder="请选择">
                <el-option :key="item.deptId"
                           :label="item.netdeptChild"
                           :value="item.netdeptChild"
                           v-for="item in departmentList"></el-option>
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
            <PeaceTableColumn label="订单编号"
                              min-width="260"
                              prop="orderNo"></PeaceTableColumn>
            <PeaceTableColumn label="就诊人"
                              prop="familyName"></PeaceTableColumn>
            <PeaceTableColumn label="身份证号"
                              min-width="180"
                              prop="idcard"></PeaceTableColumn>
            <PeaceTableColumn label="联系电话"
                              min-width="120"
                              prop="tel"></PeaceTableColumn>
            <PeaceTableColumn label="预约医生"
                              min-width="80"
                              prop="doctorName"></PeaceTableColumn>
            <PeaceTableColumn label="二级科室"
                              min-width="100"
                              prop="deptName"></PeaceTableColumn>
            <PeaceTableColumn label="预约医院"
                              min-width="120"
                              prop="netHospitalName"></PeaceTableColumn>
            <PeaceTableColumn label="预约就诊时间"
                              min-width="220"
                              prop="itemTimeZone"></PeaceTableColumn>
            <PeaceTableColumn label="订单状态"
                              prop="orderStatus">
              <template slot-scope="scope">
                <span style="line-height: 28px;">{{ scope.row.orderStatus | getEnumLabel(source.ENUM_REGISTER_ORDER_STATUS)}}</span>
              </template>
            </PeaceTableColumn>
          </PeaceTable>
        </div>
      </template>
      <template v-else-if="registerIsOpen === false">
        <div class="bg-white full-height q-pa-lg">
          <register-open></register-open>
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
import CONSTANT from './constant'
import Service from './service'
import RegisterOpen from './components/RegisterOpen'

export default {
  name: 'RegisterOrder',
  components: { RegisterOpen },
  data() {
    return {
      registerIsOpen: null,
      model: {
        patientName: '',
        orderNo: '',
        idCard: '',
        orderStatus: '',
        sourceStartDate: '',
        sourceEndDate: '',
        deptName: ''
      },
      departmentList: [],
      timeRange: [],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() || time.getTime() < new Date('2019-02-28')
        }
      },
      source: {
        ENUM_REGISTER_ORDER_STATUS: CONSTANT.ENUM_REGISTER_ORDER_STATUS
      }
    }
  },
  watch: {
    timeRange(timeRange) {
      if (Array.isArray(timeRange)) {
        this.model.sourceStartDate = timeRange[0] ? timeRange[0] : ''
        this.model.sourceEndDate = timeRange[1] ? timeRange[1] : ''
      } else {
        this.model.sourceStartDate = ''
        this.model.sourceEndDate = ''
      }
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  created() {
    this.getDepartmentList()
  },
  async mounted() {
    let checkRegisterOpen = await Service.checkRegisterOpen()
    let register = checkRegisterOpen.data.isOpenRegister
    this.registerIsOpen = register == 2 ? true : false

    if (this.registerIsOpen) {
      this.$nextTick().then(() => {
        this.getList()
      })
    }
  },
  methods: {
    getList() {
      const fetch = Service.getRegisterOrderList
      let params = Peace.util.deepClone(this.model)
      params.sourceStartDate = params.sourceStartDate ? params.sourceStartDate + ' 00:00:00' : ''
      params.sourceEndDate = params.sourceEndDate ? params.sourceEndDate + ' 23:59:59' : ''

      this.$refs.table.reloadData({ fetch, params })
    },
    // 获取科室列表
    getDepartmentList() {
      Service.getDepartmentList().then((res) => {
        this.departmentList = (res.data && res.data.list) || []
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>