<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-on:keyup.enter.native="get"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="患者姓名：">
          <el-input v-model="model.name"></el-input>
        </el-form-item>

        <el-form-item label="订单日期：">
          <peace-date-picker style="width: 130px"
                             value-format="yyyy-MM-dd"
                             v-bind:picker-options="rules.orderTimeBeginOptions"
                             v-model="model.orderTimeBegin"></peace-date-picker>
          <span class="q-mx-sm">-</span>
          <peace-date-picker style="width: 130px"
                             value-format="yyyy-MM-dd"
                             v-bind:picker-options="rules.orderTimeEndOptions"
                             v-model="model.orderTimeEnd"></peace-date-picker>
        </el-form-item>

        <el-form-item label="复诊日期：">
          <peace-date-picker style="width: 130px"
                             value-format="yyyy-MM-dd"
                             v-bind:picker-options="rules.returnVisitTimeBeginOptions"
                             v-model="model.returnVisitTimeBegin"></peace-date-picker>
          <span class="q-mx-sm">-</span>
          <peace-date-picker style="width: 130px"
                             value-format="yyyy-MM-dd"
                             v-bind:picker-options="rules.returnVisitTimeEndOptions"
                             v-model="model.returnVisitTimeEnd"></peace-date-picker>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card q-mb-md">
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="复诊单号"
                          min-width="180"
                          prop="inquiryNo"></PeaceTableColumn>
        <PeaceTableColumn label="患者姓名"
                          prop="name"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn label="性别"
                          prop="genderText"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn label="年龄"
                          prop="age"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn label="复诊时间"
                          min-width="220"
                          prop="returnVisitTime"></PeaceTableColumn>
        <PeaceTableColumn label="订单金额"
                          min-width="120"
                          prop="orderAmount"></PeaceTableColumn>
        <PeaceTableColumn label="订单时间"
                          min-width="180"
                          prop="createdTime"></PeaceTableColumn>
        <PeaceTableColumn label="订单状态"
                          prop="orderStatusText"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          label="操作"
                          width="120">
          <template slot-scope="scope">
            <el-button type="text"
                       v-bind:title="getControlTitleTip(scope.row)"
                       v-bind:disabled="getDisabledState(scope.row)"
                       v-on:click="showDetail(scope.row)">查看详情</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog title="复诊续方记录"
                 v-bind:visible.sync="dialog.visible"
                 v-if="dialog.visible">
      <PeaceIMMessageHistory v-bind:data="dialog.data"
                             v-bind:messageFlowIn="dialog.messageFlowIn"
                             v-bind:messageFlowOut="dialog.messageFlowOut">
        <template v-slot:prescription-operation="{ data, refetch }">
          <PrescriptionDetailOperation v-bind:data="data"
                                       v-on:accept="refetch"
                                       v-on:reject="refetch"></PrescriptionDetailOperation>
        </template>
      </PeaceIMMessageHistory>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './service'
import PrescriptionDetailOperation from '@src/views/components/prescription/prescription-detail-operation/src/index.vue'
import { PeaceIMMessageHistory } from 'peace-components'

export default {
  components: {
    PeaceIMMessageHistory,
    PrescriptionDetailOperation
  },

  data() {
    return {
      model: {
        name: '',
        orderTimeBegin: '',
        orderTimeEnd: '',
        returnVisitTimeBegin: '',
        returnVisitTimeEnd: ''
      },

      dialog: {
        visible: false,

        data: [],
        doctorInfo: {},
        patientInfo: {}
      },

      rules: {
        orderTimeBeginOptions: {
          disabledDate: (time) => {
            if (this.model.orderTimeEnd) {
              return time.getTime() > this.model.orderTimeEnd.toDate().getTime() || time.getTime() > Date.now()
            } else {
              return time.getTime() > Date.now()
            }
          }
        },
        orderTimeEndOptions: {
          disabledDate: (time) => {
            if (this.model.orderTimeBegin) {
              return time.getTime() < this.model.orderTimeBegin.toDate().getTime() || time.getTime() > Date.now()
            } else {
              return time.getTime() > Date.now()
            }
          }
        },
        returnVisitTimeBeginOptions: {
          disabledDate: (time) => {
            if (this.model.returnVisitTimeEnd) {
              return time.getTime() > this.model.returnVisitTimeEnd.toDate().getTime() || time.getTime() > Date.now()
            } else {
              return time.getTime() > Date.now()
            }
          }
        },
        returnVisitTimeEndOptions: {
          disabledDate: (time) => {
            if (this.model.returnVisitTimeBegin) {
              return time.getTime() < this.model.returnVisitTimeBegin.toDate().getTime()
            }
          }
        }
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.getReturnVisitList
      const params = this.model

      this.$refs.table.loadData({ fetch, params })
    },

    showDetail(row) {
      const params = {
        inquiryNo: row.inquiryNo
      }

      Service.getReturnVisitDetail(params).then((res) => {
        this.dialog.data = res.data.msgInfo
        this.dialog.messageFlowIn = res.data.patientInfo
        this.dialog.messageFlowOut = res.data.doctorInfo
        this.dialog.visible = true
      })
    },

    getControlTitleTip(row) {
      const controlTitleTipMap = {
        ['已取消']: '复诊未开始，未产生复诊记录'
      }

      return controlTitleTipMap[row.orderStatusText]
    },

    getDisabledState(row) {
      const disabledMap = {
        ['已取消']: true
      }

      return disabledMap[row.orderStatusText] ?? false
    }
  }
}
</script>

<style>
</style>