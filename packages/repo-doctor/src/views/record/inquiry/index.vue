<template>
  <div>
    <el-form :model="view.model" inline>
      <el-form-item label="患者姓名">
        <el-input placeholder style="width: 130px;" v-model="view.model.name"></el-input>
      </el-form-item>
      <el-form-item label="问诊类型">
        <el-select clearable placeholder="全部" style="width: 130px;" v-model="view.model.inquiryType">
          <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in view.source.inquiryType"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="问诊下单时间">
        <el-date-picker :picker-options="view.rules.pickerOptionsStart" style="width: 145px;" v-model="view.model.time_start" value-format="yyyy-MM-dd"></el-date-picker>
        <span class="character"></span>
        <el-date-picker :picker-options="view.rules.pickerOptionsEnd" style="width: 145px;" v-model="view.model.time_end" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label=" ">
        <el-button @click="get" round type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <hr />

    <peace-table pagination ref="table">
      <peace-table-column label="问诊单号" prop="inquiry_no" width="180"></peace-table-column>
      <peace-table-column align="left" label="患者姓名" prop="name"></peace-table-column>
      <peace-table-column label="性别" prop="sex"></peace-table-column>
      <peace-table-column label="年龄" prop="age"></peace-table-column>
      <peace-table-column label="问诊类型" prop="type" width="120px">
        <template slot-scope="scope">
          <span class="private-doctor" v-if="scope.row.isPrivateDoctor">私</span>
          <span>{{ scope.row.type }}</span>
        </template>
      </peace-table-column>
      <peace-table-column align="right" label="订单金额" prop="order_money"></peace-table-column>
      <peace-table-column label="订单时间" prop="created_time" width="180"></peace-table-column>
      <peace-table-column label="订单状态" prop="status"></peace-table-column>
      <peace-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.row)" type="text" v-if="!(scope.row.status === '已取消')">查看详情</el-button>
        </template>
      </peace-table-column>
    </peace-table>

    <peace-dialog :visible.sync="dialog.visible" append-to-body title="图文问诊记录">
      <InquirySessionMessageList :data="dialog.data"></InquirySessionMessageList>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'

import InquirySessionMessageList from '@src/views/clinic/inquiry/InquirySessionMessageList'

export default {
  components: {
    InquirySessionMessageList
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
            disabledDate: time => {
              if (this.view.model.time_end) {
                return time.getTime() > this.view.model.time_end.toDate().getTime() || time.getTime() > Date.now()
              } else {
                return time.getTime() > Date.now()
              }
            }
          },

          pickerOptionsEnd: {
            disabledDate: time => {
              if (this.view.model.time_start) {
                return time.getTime() < this.view.model.time_start.toDate().getTime() || time.getTime() > Date.now()
              } else {
                return time.getTime() > Date.now()
              }
            }
          }
        },

        source: {
          inquiryType: [{ label: '图文问诊', value: 'image' }, { label: '视频问诊', value: 'video' }]
        }
      },

      dialog: {
        visible: false,
        data: []
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

      const fetch = peace.service.inquiry.recordList
      const params = { doctorId, ...this.view.model }

      this.$refs.table.loadData({ fetch, params })
    },

    showDetail(row) {
      const params = {
        inquiryNo: row.inquiry_no
      }

      peace.service.patient.getOneInquiry(params).then(res => {
        const historyMessageFormatHandler = messages => {
          if (messages && Array.isArray(messages)) {
            messages.forEach(message => {
              const messageTypeMap = { 0: 'text', 1: 'image', 100: 'custom' }

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
        this.dialog.visible = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.private-doctor {
  background: #00c6ae;
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
