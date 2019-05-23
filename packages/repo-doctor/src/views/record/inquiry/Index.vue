<template>
  <div>
    <div v-if="data.length <= 0">
      <div>
        <el-form :model="view.model" inline>
          <el-form-item label="患者姓名">
            <el-input placeholder style="width: 90px;" v-model="view.model.name"></el-input>
          </el-form-item>
          <el-form-item label="问诊类型">
            <el-select clearable placeholder="全部" style="width: 110px;" v-model="view.model.inquiryType">
              <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in view.source.inquiryType"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="问诊下单时间">
            <el-date-picker :picker-options="view.rules.pickerOptionsStart" placeholder v-model="view.model.time_start" value-format="yyyy-MM-dd"></el-date-picker>
            <span class="character"></span>
            <el-date-picker :picker-options="view.rules.pickerOptionsEnd" placeholder v-model="view.model.time_end" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label=" ">
            <el-button @click="get" round type="primary">查询</el-button>
          </el-form-item>
        </el-form>

        <hr>

        <peace-table pagination ref="table">
          <peace-table-column label="问诊单号" prop="inquiry_no" width="180"></peace-table-column>
          <peace-table-column align="left" label="患者姓名" prop="name"></peace-table-column>
          <peace-table-column label="性别" prop="sex"></peace-table-column>
          <peace-table-column label="年龄" prop="age"></peace-table-column>
          <peace-table-column label="问诊类型" prop="type"></peace-table-column>
          <peace-table-column align="right" label="订单金额" prop="order_money"></peace-table-column>
          <peace-table-column label="订单时间" prop="created_time" width="180"></peace-table-column>
          <peace-table-column label="订单状态" prop="status"></peace-table-column>
          <peace-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="showDetail(scope.row)" type="text">查看详情</el-button>
            </template>
          </peace-table-column>
        </peace-table>

        <peace-dialog :visible.sync="dialog.visible" append-to-body title="图文问诊记录" top="5vh" width="800px">
          <chat-session-list :localSessionMsgs="dialog.data"></chat-session-list>
        </peace-dialog>
      </div>
    </div>

    <div class="no-data" v-else>
      <img src="./../../../assets/images/not-status.png">
      <span>暂无问诊记录</span>
    </div>
  </div>
</template>

<script>
import ChatSessionList from './../../clinic/ChatSessionList'

import config from './config'
import { STATE } from './../../clinic/util'

export default {
  components: {
    ChatSessionList
  },

  data() {
    return {
      config,

      STATE,

      view: {
        model: {
          name: '',
          time_start: new Date().proDate('{%d-7}').formatDate(),
          time_end: new Date().formatDate(),
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

        model: {},

        data: []
      },

      data: []
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      this.$refs.table.loadData({
        api: this.config.api.inqueryInfo,
        params: {
          doctorId: $peace.cache.get('USER').list.docInfo.doctor_id,
          ...this.view.model
        }
      })
    },

    showDetail(row) {
      this.dialog.data = []
      this.dialog.visible = true

      // 获取病历信息
      this.$http.get(this.config.api.getOneInquiry, { params: { inquiryNo: row.inquiry_no } }).then(res => {
        res.data.forEach(item => {
          item.custom = item.ext

          if (row.doctor_id === item.from) {
            item.flow = this.STATE.msgFlow['医生消息']
          } else if (row.patient_id === item.from) {
            item.flow = this.STATE.msgFlow['患者消息']
          }

          switch (item.type) {
            case 0:
              item.type = this.STATE.msgType['文本消息']
              item.text = item.body.msg
              break
            case 1:
              item.type = this.STATE.msgType['图片消息']
              item.file = item.body
              break
            case 2:
              item.type = this.STATE.msgType['语音消息']
              break
            case 3:
              item.type = this.STATE.msgType['视频消息']
              break
            case 4:
              item.type = this.STATE.msgType['地理信息']
              break
            case 6:
              item.type = this.STATE.msgType['文件']
              break
            case 100:
              item.type = this.STATE.msgType['自定义消息']
              item.content = item.body

              // 视频消息默认为医生消息
              if (item.body.type === 9 && item.body.data.sendType === 3) {
                item.flow = this.STATE.msgFlow['医生消息']
              }
              break
          }
        })

        this.dialog.data = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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

.el-form-item {
  margin-right: 60px;

  .el-input {
    width: 140px;
    height: 27px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.13);
    border-radius: 3px;
  }
}

.no-data {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  img {
    display: block;
    width: 150px;
    height: 150px;
  }

  span {
    margin-top: 20px;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 20px;
  }
}
</style>
