<template>
  <div>
    <el-form inline
             space-none
             label-width="auto"
             v-on:keyup.enter.native="get"
             v-on:submit.native.prevent
             v-bind:model="view.model">
      <el-form-item label="患者姓名：">
        <el-input v-model="view.model.name"></el-input>
      </el-form-item>

      <el-form-item label="订单日期：">
        <peace-date-picker :picker-options="view.rules.pickerOptionsStart"
                           style="width: 130px;"
                           v-model="view.model.time_start"
                           value-format="yyyy-MM-dd"></peace-date-picker>
        <span class="q-mx-sm">-</span>
        <peace-date-picker :picker-options="view.rules.pickerOptionsEnd"
                           style="width: 130px;"
                           v-model="view.model.time_end"
                           value-format="yyyy-MM-dd">
        </peace-date-picker>
      </el-form-item>
      <el-form-item label="咨询类型：">
        <el-select clearable
                   placeholder="全部"
                   v-model="view.model.inquiryType">
          <el-option :key="item.value"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in view.source.inquiryType"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="get"
                   type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <hr />

    <PeaceTable pagination
                ref="table">
      <PeaceTableColumn label="咨询单号"
                        prop="inquiry_no"
                        min-width="180"></PeaceTableColumn>
      <PeaceTableColumn label="患者姓名"
                        prop="name"
                        min-width="120"></PeaceTableColumn>
      <PeaceTableColumn label="性别"
                        prop="sex"
                        min-width="120"></PeaceTableColumn>
      <PeaceTableColumn label="年龄"
                        prop="age"
                        min-width="120"></PeaceTableColumn>
      <PeaceTableColumn label="咨询类型"
                        prop="type"
                        min-width="120">
        <template slot-scope="scope">
          <span class="private-doctor"
                v-if="scope.row.isPrivateDoctor">私</span>
          <span>{{ scope.row.type }}</span>
        </template>
      </PeaceTableColumn>
      <PeaceTableColumn label="订单金额"
                        prop="order_money"
                        min-width="80">
      </PeaceTableColumn>
      <PeaceTableColumn label="订单时间"
                        prop="created_time"
                        min-width="160"></PeaceTableColumn>
      <PeaceTableColumn label="订单状态"
                        prop="status"
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

    <PeaceDialog title="问诊记录"
                 v-bind:visible.sync="dialog.visible"
                 v-if="dialog.visible">

      <MessageList v-bind:data="dialog.data"
                   v-bind:doctorInfo="dialog.doctorInfo"
                   v-bind:patientInfo="dialog.patientInfo">
      </MessageList>

    </PeaceDialog>
  </div>
</template>

<script>
import MessageList from '@src/views/components/inquiry/messageList/index'

export default {
  components: {
    MessageList
  },

  data() {
    return {
      view: {
        model: {
          name: '',
          time_start: '',
          time_end: '',
          inquiryType: ''
        },

        rules: {
          pickerOptionsStart: {
            disabledDate: (time) => {
              if (this.view.model.time_end) {
                return time.getTime() > this.view.model.time_end.toDate().getTime() || time.getTime() > Date.now()
              } else {
                return time.getTime() > Date.now()
              }
            }
          },

          pickerOptionsEnd: {
            disabledDate: (time) => {
              if (this.view.model.time_start) {
                return time.getTime() < this.view.model.time_start.toDate().getTime() || time.getTime() > Date.now()
              } else {
                return time.getTime() > Date.now()
              }
            }
          }
        },

        source: {
          inquiryType: [
            { label: '图文', value: 'image' },
            { label: '视频', value: 'video' }
          ]
        }
      },

      dialog: {
        visible: false,
        data: [],
        doctorInfo: {},
        patientInfo: {}
      }
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.get()
    })
  },

  methods: {
    get() {
      const doctorId = this.$store.state.user.userInfo.list.docInfo.doctor_id

      const fetch = Peace.service.inquiry.recordList
      const params = { doctorId, ...this.view.model }

      this.$refs.table.loadData({ fetch, params })
    },

    showDetail(row) {
      const params = {
        inquiryNo: row.inquiry_no
      }

      Peace.service.patient.getOneInquiry(params).then((res) => {
        const historyMessageFormatHandler = (messages) => {
          if (messages && Array.isArray(messages)) {
            messages.forEach((message) => {
              const messageTypeMap = { 0: 'text', 1: 'image', 2: 'audio', 100: 'custom' }

              message.time = message.sendtime
              message.flow = row.doctor_id === message.from ? 'out' : 'in'
              message.type = messageTypeMap[message.type]
              message.text = message.body.msg
              message.content = message.body
              message.file = message.body
            })
          }
        }

        historyMessageFormatHandler(res.data.msgInfo)

        this.dialog.data = []

        this.dialog.data = res.data.msgInfo
        this.dialog.patientInfo = Object.assign({}, this.dialog.patientInfo, res.data.patientInfo)
        this.dialog.doctorInfo = Object.assign({}, this.dialog.doctorInfo, res.data.doctorInfo)
        this.dialog.visible = true
      })
    },

    getControlTitleTip(row) {
      const controlTitleTipMap = {
        ['已取消']: '复诊未开始，未产生复诊记录'
      }

      return controlTitleTipMap[row.status]
    },

    getDisabledState(row) {
      const disabledMap = {
        ['已取消']: true
      }

      return disabledMap[row.status] ?? false
    }
  }
}
</script>

<style lang="scss" scoped>
.private-doctor {
  background: #3099a6;
  color: #ffffff;
  height: 17px;
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  padding: 0 4px;

  margin: 0 10px 0 0;
}

.character {
  display: inline-flex;

  &:before {
    content: '';
    background: #e7e7e1;
    width: 15px;
    height: 1px;
    position: relative;
    top: -4px;
    margin: 0 10px;
  }
}
</style>
