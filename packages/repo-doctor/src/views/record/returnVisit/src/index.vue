<template>
  <div>
    <el-form v-bind:model="model"
             inline>
      <el-form-item label="患者姓名">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="订单日期">
        <el-date-picker style="width: 140px"
                        value-format="yyyy-MM-dd"
                        v-bind:picker-options="rules.orderTimeBeginOptions"
                        v-model="model.orderTimeBegin"></el-date-picker>
        <span class="q-mx-sm">-</span>
        <el-date-picker style="width: 140px"
                        value-format="yyyy-MM-dd"
                        v-bind:picker-options="rules.orderTimeEndOptions"
                        v-model="model.orderTimeEnd"></el-date-picker>
      </el-form-item>

      <el-form-item label="复诊日期">
        <el-date-picker style="width: 140px"
                        value-format="yyyy-MM-dd"
                        v-bind:picker-options="rules.returnVisitTimeBeginOptions"
                        v-model="model.returnVisitTimeBegin"></el-date-picker>
        <span class="q-mx-sm">-</span>
        <el-date-picker style="width: 140px"
                        value-format="yyyy-MM-dd"
                        v-bind:picker-options="rules.returnVisitTimeEndOptions"
                        v-model="model.returnVisitTimeEnd"></el-date-picker>
      </el-form-item>

      <el-form-item label=" ">
        <el-button type="primary"
                   round
                   v-on:click="getTable">查询</el-button>
      </el-form-item>
    </el-form>

    <hr />

    <peace-table ref="table"
                 pagination>
      <peace-table-column label="复诊单号"
                          width="180"
                          prop="inquiryNo"></peace-table-column>
      <peace-table-column label="患者姓名"
                          prop="name"></peace-table-column>
      <peace-table-column label="性别"
                          prop="genderText"></peace-table-column>
      <peace-table-column label="年龄"
                          prop="age"></peace-table-column>
      <peace-table-column label="复诊时间"
                          width="180"
                          prop="returnVisitTime"></peace-table-column>
      <peace-table-column label="订单金额"
                          align="right"
                          prop="orderAmount"></peace-table-column>
      <peace-table-column label="订单时间"
                          width="150"
                          prop="createdTime"></peace-table-column>
      <peace-table-column label="订单状态"
                          prop="orderStatusText"></peace-table-column>
      <peace-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     v-bind:title="getControlTitleTip(scope.row)"
                     v-bind:disabled="getDisabledState(scope.row)"
                     v-on:click="showDetail(scope.row)">查看详情</el-button>
        </template>
      </peace-table-column>
    </peace-table>

    <peace-dialog title="复诊续方记录"
                  v-bind:visible.sync="dialog.visible"
                  v-if="dialog.visible">

      <MessageList v-bind:data="dialog.data"
                   v-bind:doctorInfo="dialog.doctorInfo"
                   v-bind:patientInfo="dialog.patientInfo">
      </MessageList>

    </peace-dialog>
  </div>
</template>

<script>
import MessageList from '@src/views/components/inquiry/messageList'

import Service from './service'

export default {
  components: {
    MessageList
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
      this.getTable()
    })
  },

  methods: {
    getTable() {
      const fetch = Service.getReturnVisitList
      const params = this.model

      this.$refs.table.loadData({ fetch, params })
    },

    showDetail(row) {
      const params = {
        inquiryNo: row.inquiryNo
      }

      Service.getReturnVisitDetail(params).then((res) => {
        const IMMessageAdapter = (messages) => {
          if (messages && Array.isArray(messages)) {
            messages.forEach((message) => {
              const messageTypeMap = { 0: 'text', 1: 'image', 100: 'custom' }

              message.time = message.sendtime
              message.flow = row.familyId === message.from ? 'in' : 'out'
              message.type = messageTypeMap[message.type]
              message.text = message.body.msg
              message.content = message.body
              message.file = message.body
            })
          }

          return messages
        }

        const messages = IMMessageAdapter(res.data.msgInfo)

        this.dialog.data = messages
        this.dialog.patientInfo = res.data.patientInfo
        this.dialog.doctorInfo = res.data.doctorInfo
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