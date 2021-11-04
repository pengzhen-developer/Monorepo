<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-position="left"
               label-width="auto"
               v-on:keyup.enter.native="getList()"
               v-on:submit.native.prevent>

        <el-form-item>
          <span slot="label">
            <span>患者姓名</span>
            <span>：</span>
          </span>
          <el-input v-model.trim="model.patientName"
                    clearable
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>医生姓名</span>
            <span>：</span>
          </span>
          <el-input v-model.trim="model.doctorName"
                    clearable
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>订单状态</span>
            <span>：</span>
          </span>
          <el-select v-model="model.inquiryStatus"
                     clearable
                     placeholder="全部">
            <el-option v-for="item in source.ENUM_CONSULT_STATUS"
                       :key="item.label"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>支付状态</span>
            <span>：</span>
          </span>
          <el-select v-model="model.orderStatus"
                     clearable
                     placeholder="请选择">
            <el-option v-for="item in source.ENUM_ORDER_PAY_STATUS"
                       :key="item.label"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>下单日期</span>
            <span>：</span>
          </span>
          <peace-date-picker v-model="timeRange"
                             :picker-options="pickerOptions"
                             end-placeholder="至今"
                             format="yyyy-MM-dd"
                             start-placeholder="开始日期"
                             type="daterange"
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
            <el-option v-for="item in departmentList"
                       :key="item.deptId"
                       :label="item.netdeptChild"
                       :value="item.netdeptChild"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     @click="getList()">查询
          </el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="card">

      <div class="top-menu">
        <el-button :loading="exportLoading"
                   type="default"
                   @click="showExportModel">导出
        </el-button>
      </div>

      <PeaceTable ref="table"
                  pagination
                  style="width: 100%">
        <PeaceTableColumn label="问诊单号"
                          prop="inquiry_no"
                          width="200"></PeaceTableColumn>
        <PeaceTableColumn label="患者姓名"
                          min-width="100">
          <template slot-scope="scope">
            <span class="primary"
                  @click="toPatientPage(scope.row.id, scope.row.name, scope.row.patientNo)">{{ scope.row.name }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="性别"
                          min-width="60"
                          prop="sex"></PeaceTableColumn>
        <PeaceTableColumn label="年龄"
                          min-width="70"
                          prop="age"></PeaceTableColumn>
        <PeaceTableColumn label="身份证号"
                          width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.idcard }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="咨询类型"
                          width="120">
          <template slot-scope="scope">
            <div class="private">
              <span v-if="scope.row.isPrivateDoctor"
                    class="private-tag">私</span>
              <span>{{ scope.row.inquiry_type | getEnumLabel(source.ENUM_INQUIRY_TYPE) }}</span>
            </div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="订单金额（元）"
                          prop="pay_money"
                          min-width="130"></PeaceTableColumn>
        <PeaceTableColumn label="问诊医生"
                          min-width="100"
                          prop="doctor"></PeaceTableColumn>
        <PeaceTableColumn label="二级科室"
                          min-width="100"
                          prop="deptName"></PeaceTableColumn>
        <PeaceTableColumn label="订单状态"
                          min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.inquiry_status | getEnumLabel(source.ENUM_CONSULT_STATUS) }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="支付状态"
                          min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.pay_status_str }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="订单时间"
                          min-width="180"
                          prop="created_time"></PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          label="操作"
                          width="200">
          <template slot-scope="scope">
            <div class="align-left">
              <el-button type="text"
                         @click="getConsultOrderDetail(scope.row.inquiry_no)">订单详情
              </el-button>
              <el-button v-if="[4, 5].includes(scope.row.inquiry_status)"
                         type="text"
                         @click="getConsulRecord(scope.row.inquiry_no)">问诊详情
              </el-button>
            </div>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <!-- 咨询订单详情 -->
    <PeaceDialog append-to-body
                 title="咨询订单详情"
                 v-if="orderDetailDialog.visible"
                 v-bind:visible.sync="orderDetailDialog.visible">
      <PeaceOrderInquiryDetail v-bind:data="orderDetailDialog.data"
                               v-bind:type="'inquiry'"></PeaceOrderInquiryDetail>
    </PeaceDialog>
    <PeaceDialog append-to-body
                 title="咨询记录"
                 v-if="dialogVisible"
                 v-bind:visible.sync="dialogVisible">
      <PeaceIMMessageHistory v-bind:data="currentInquiry.msgInfo"
                             v-bind:messageFlowIn="currentInquiry.doctorInfo"
                             v-bind:messageFlowOut="currentInquiry.patientInfo"></PeaceIMMessageHistory>
    </PeaceDialog>

  </div>
</template>

<script>
import CONSTANT from './constant'
import Service from './service'
import { PeaceIMMessageHistory, PeaceOrderInquiryDetail } from 'peace-components'
import Util from '@src/util'
export default {
  name: 'ConsultOrder',
  components: { PeaceOrderInquiryDetail, PeaceIMMessageHistory },
  data() {
    return {
      model: {
        patientName: '',
        doctorName: '',
        inquiryStatus: '',
        orderStatus: '',
        startTime: '',
        endTime: '',
        deptName: ''
      },
      exportLoading: false,
      timeRange: [],
      departmentList: [],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() || time.getTime() < new Date('2019-02-28')
        }
      },

      currentInquiry: {},
      dialogVisible: false,

      exportDialogVisible: false,

      // 订单详情
      orderDetailDialog: {
        visible: false,
        data: {}
      },

      source: {
        ENUM_CONSULT_STATUS: CONSTANT.ENUM_CONSULT_STATUS,
        ENUM_ORDER_PAY_STATUS: CONSTANT.ENUM_ORDER_PAY_STATUS,
        ENUM_INQUIRY_TYPE: CONSTANT.ENUM_INQUIRY_TYPE
      }
    }
  },
  watch: {
    timeRange(timeRange) {
      if (Array.isArray(timeRange)) {
        this.model.startTime = timeRange[0] ? timeRange[0] : ''
        this.model.endTime = timeRange[1] ? timeRange[1] : ''
      } else {
        this.model.startTime = ''
        this.model.endTime = ''
      }
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value === value)?.label
    }
  },
  created() {
    this.getDepartmentList()
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getList()
    })
  },
  methods: {
    getList() {
      const fetch = Service.getConsultOrderList
      let params = Peace.util.deepClone(this.model)
      params.startTime = params.startTime ? params.startTime + ' 00:00:00' : ''
      params.endTime = params.endTime ? params.endTime + ' 23:59:59' : ''

      this.$refs.table.reloadData({ fetch, params })
    },
    // 获取科室列表
    getDepartmentList() {
      Service.getDepartmentList().then((res) => {
        this.departmentList = (res.data && res.data.list) || []
      })
    },
    // 订单信息
    getConsultOrderDetail(inquiryNo) {
      Service.getConsultOrderDetail({ inquiry_no: inquiryNo }).then((res) => {
        this.orderDetailDialog.data = res.data
        this.orderDetailDialog.visible = true
      })
    },
    getConsulRecord(id) {
      Service.getConsulRecord({ inquiryNo: id }).then((res) => {
        const data = res.data
        if (data.msgInfo.length > 0) {
          this.currentInquiry = data
          this.dialogVisible = true
        } else {
          const msg = data.msg ? data.msg : '暂无问诊记录'
          Peace.util.error(msg)
        }
      })
    },
    toPatientPage(id, name, patientNo) {
      this.$router.push({
        path: '/internet-cloud-hospital/patient-management/patient-detail',
        query: { id, patientNo, name, type: 'inquiry' }
      })
    },
    showExportModel() {
      const info = Util.user.getHospitalInfo() ?? {}

      let params = Peace.util.deepClone(this.model)
      params.type = 'inquiry'
      params.hospitalId = info.id
      params.startTime = params.startTime ? params.startTime + ' 00:00:00' : ''
      params.endTime = params.endTime ? params.endTime + ' 23:59:59' : ''

      this.exportLoading = true
      Service.isExistList(params)
        .then(() => {
          Service.exportOrder(params).finally(() => {
            this.exportLoading = false
          })
        })
        .catch(() => {
          this.exportLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.top-menu {
  margin-bottom: 20px;
}

.primary {
  color: var(--q-color-primary);
  cursor: pointer;
}

.list {
  padding-top: 0;

  .align-left {
    width: 100%;
    text-align: left;
  }

  .el-button {
    margin-right: 10px;
  }

  span {
    vertical-align: middle;
  }
}

.private {
  position: relative;
  padding: 0 20px;

  &-tag {
    position: absolute;
    top: 3px;
    left: 3px;
    margin-right: 3px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    display: inline-block;
    background-color: var(--q-color-primary);
  }
}
</style>
