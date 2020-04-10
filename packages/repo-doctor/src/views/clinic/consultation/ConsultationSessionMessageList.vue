<template>
  <div class="consultation-session-message-list">

    <!-- 待接诊 -->
    <template
              v-if="type === 'consult' && !data && $store.getters['consultation/consultInfo'].consultStatus === $peace.type.CONSULTATION.CONSULTATION_STATUS.医生待审核">
      <ConsultationSessionReceiveDetail></ConsultationSessionReceiveDetail>
    </template>

    <!-- 已接诊 -->
    <template v-else>
      <div :class="getMessageFlow(message)"
           :key="message.time"
           class="message"
           v-for="(message ,index) in messageList">
        <!-- 文本消息 -->
        <template v-if="getMessageType(message) === $peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.邀请协同会诊 || 
              getMessageType(message) === $peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.结束会诊">
          <!-- 消息时间 -->
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">
                {{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
            </div>
          </template>

          <!-- 消息内容 -->
          <div class="message-body"
               v-html="getMessageText(message)"></div>
        </template>

        <!-- 解散频道时，推送会诊时长 -->
        <template
                  v-else-if="getMessageType(message) === $peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.解散频道 || 
                             getMessageType(message) === $peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.视频记录">
          <!-- 消息时间 -->
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">
                {{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
            </div>
          </template>

          <!-- 消息内容 -->
          <div class="message-body">
            <i class="icon_ic_video_right"
               style="margin: 0 10px 0 0;"
               v-show="getMessageFlow(message) === 'in'"></i>
            <span>{{ getMessageText(message) }}</span>
            <i class="icon_ic_video_left"
               style="margin: 0 0 0 10px;"
               v-show="getMessageFlow(message) === 'out'"></i>
          </div>
        </template>

        <!-- 会诊小结 -->
        <template
                  v-else-if="getMessageType(message) === $peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.会诊所见">
          <!-- 消息时间 -->
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">
                {{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
            </div>
          </template>

          <!-- 消息内容 -->
          <div class="message-body message-check">
            <div class="message-header">
              <img width="17px"
                   height="17px"
                   :src="require('@src/assets/images/ic_fabingli.png')" /> <span>会诊所见</span>
            </div>
            <div class="message-content">
              <div class="item">
                <div class="left other justify">会诊所见</div>
                <div class="right other">{{message.content.data.consultInfo.consultFind}}</div>
              </div>
              <div class="item">
                <div class="left other justify"><span>目前诊断</span></div>
                <div class="right other">{{message.content.data.consultInfo.consultDiagnose}}</div>
              </div>
              <div class="item">
                <div class="left other justify"><span>会议意见</span></div>
                <div class="right other">{{message.content.data.consultInfo.consultSuggest}}</div>
              </div>
              <div class="message-line-solid"></div>
            </div>
            <div class="message-footer"
                 @click="getConsultDetail(message)">
              <span>查看详情</span>
            </div>
          </div>
        </template>

        <!-- 
          病例
          <template
                  v-else-if="getMessageType(message) === $peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.病历">
          
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">
                {{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
            </div>
          </template>

          
          <div class="message-body message-check">
            <div class="message-header">
              <img width="17px"
                   height="17px"
                   :src="require('@src/assets/images/ic_fabingli.png')" /> <span>病历</span>
            </div>
            <div class="message-content">
              <div class="item">
                <div class="left other justify">诊断</div>
                <div class="right other">{{message.content.data.caseInfo.diagnosis}}</div>
              </div>
              <div class="item">
                <div class="left other justify"><span>就诊时间</span></div>
                <div class="right other">{{message.content.data.caseInfo.visitingTime}}</div>
              </div>
              <div class="message-line-solid"></div>
            </div>
            <div class="message-footer"
                 @click="getCaseDetail(message)">
              <span>查看详情</span>
            </div>
          </div>
        </template>

        处方
        <template
                  v-else-if="getMessageType(message) === $peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.处方">
         
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">
                {{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
            </div>
          </template>
         
          <div class="message-body message-check">
            <div class="message-header">
              <img width="17px"
                   height="17px"
                   :src="require('@src/assets/images/ic_rp.png')" /> <span>处方</span>
            </div>
            <div class="message-content">
              <div class="item">
                <div class="left other justify">诊断</div>
                <div class="right other">
                  {{message.content.data.recipeInfo && message.content.data.recipeInfo.diagnosis}}
                </div>
              </div>
              <div class="item">
                <div class="left other">Rp</div>
                <div class="right other">
                  {{message.content.data.recipeInfo && message.content.data.recipeInfo.drugInfo}}
                </div>
              </div>
              <div class="item">
                <div class="left other justify">就诊时间</div>
                <div class="right other">
                  {{message.content.data.recipeInfo && message.content.data.recipeInfo.visitingTime}}
                </div>
              </div>
              <div class="message-line-solid"></div>
            </div>
            <div class="message-footer"
                 @click="getRecipeDetail(message)">
              <span>查看详情</span>
            </div>
          </div>
        </template> -->

        <peace-dialog :visible.sync="caseDetail.visible"
                      v-if="caseDetail.visible"
                      appendToBody
                      title="病历详情">
          <ConsultationSessionCaseDetail :data="caseDetail.data"></ConsultationSessionCaseDetail>
        </peace-dialog>

        <peace-dialog :visible.sync="recipeDetail.visible"
                      v-if="recipeDetail.visible"
                      appendToBody
                      title="处方详情">
          <ConsultationSessionRecipeDetail :data="recipeDetail.data">
          </ConsultationSessionRecipeDetail>
        </peace-dialog>

        <peace-dialog :visible.sync="consultDetail.visible"
                      v-if="consultDetail.visible"
                      appendToBody
                      title="会诊单详情">
          <ConsultationDetail :data="consultDetail.data"></ConsultationDetail>
        </peace-dialog>
      </div>
    </template>
  </div>
</template>
<script>
import peace from '@src/library'
import ConsultationSessionReceiveDetail from './ConsultationSessionReceiveDetail'

import ConsultationSessionCaseDetail from './ConsultationSessionCaseDetail'
import ConsultationSessionRecipeDetail from './ConsultationSessionRecipeDetail'
import ConsultationDetail from './ConsultationDetail'

export default {
  components: {
    ConsultationSessionReceiveDetail,
    ConsultationSessionCaseDetail,
    ConsultationSessionRecipeDetail,
    ConsultationDetail
  },

  props: {
    data: {
      type: Array,
      default() {
        return undefined
      }
    },

    type: {
      type: String,
      default() {
        return 'consult'
      }
    }
  },

  data() {
    return {
      caseDetail: {
        visible: false,
        data: {}
      },

      recipeDetail: {
        visible: false,
        data: {}
      },

      consultDetail: {
        visible: false,
        data: {}
      }
    }
  },

  computed: {
    messageList() {
      let sessionMessages = this.data || this.$store.state.consultation.sessionMessages

      // 过滤无效数据
      sessionMessages = sessionMessages.filter(message => {
        // 屏蔽未知消息
        if (!message.type) {
          return false
        }

        // 屏蔽系统消息
        if (message.type === 'notification') {
          return false
        }

        // 屏蔽部分自定义消息
        if (message.type === 'custom') {
          if (
            message.content.code !==
              peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.邀请协同会诊 &&
            message.content.code !== peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.解散频道 &&
            message.content.code !== peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.结束会诊 &&
            message.content.code !== peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.视频记录 &&
            message.content.code !== peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.病历 &&
            message.content.code !== peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.处方 &&
            message.content.code !== peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.会诊所见
          )
            return false
        }

        return true
      })

      return sessionMessages
    }
  },

  watch: {
    '$store.state.consultation.sessionMessages': {
      handler() {
        this.scrollMessageToBottom()
      },
      immediate: true
    }
  },

  activated() {
    this.scrollMessageToBottom()
  },

  methods: {
    //2019年11月11日
    formDate(time) {
      time = new Date(time)
      let y = time.getFullYear()
      let m = time.getMonth() + 1
      let d = time.getDate()
      return y + '年' + m + '月' + d + '日'
    },

    getCaseDetail() {
      const params = {
        consultNo: this.$store.getters['consultation/consultInfo'].consultNo
      }

      peace.service.inquiry.getCase(params).then(res => {
        this.caseDetail.visible = true
        this.caseDetail.data = res.data
      })
    },

    getRecipeDetail() {
      const params = {
        consultNo: this.$store.getters['consultation/consultInfo'].consultNo,
        p: 1,
        size: 999
      }

      peace.service.prescribePrescrip.getConsultPrescripList(params).then(res => {
        this.recipeDetail.visible = true
        this.recipeDetail.data = res.data
      })
    },

    getConsultDetail(message) {
      const params = {
        consultNo: message.content.data.consultInfo.consultNo
      }

      peace.service.consult.getConsultInfo(params).then(res => {
        this.consultDetail.visible = true
        this.consultDetail.data = res.data.info
      })
    },

    scrollMessageToBottom() {
      this.$nextTick(function() {
        const element = document.querySelector('.message-list-scrollbar .el-scrollbar__wrap')

        if (element) {
          element.scrollTop = element.scrollHeight
        }
      })
    },

    // 是否需要显示系统时间
    isShowMessageTime(message, index) {
      if (index === 0) {
        return true
      } else {
        const prevMessage = this.messageList[index - 1]
        const currentMessage = this.messageList[index]

        if (currentMessage.time - prevMessage.time >= 1000 * 60 * 3) {
          return true
        }

        return false
      }
    },

    getMessageType(message) {
      // text
      // image
      // custom
      if (message.type === 'custom') {
        if (message.content && message.content.code) {
          return message.content.code
        }
      } else {
        return message.type
      }
    },

    getMessageFlow(message) {
      // out
      // in
      // system
      if (message.type === 'custom') {
        if (message.content && message.content.code) {
          if (message.content.code === peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.结束会诊) {
            return 'system'
          }
        }
      }

      return message.flow
    },

    getMessageText(message) {
      if (message.content && message.content.data && message.content.data.showTextInfo) {
        // 视频记录需要区分发起与受邀

        if (
          this.getMessageType(message) ===
          $peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.视频记录
        ) {
          if (this.getHangupConsultRole(message) === 'from') {
            return message.content.data.showTextInfo.doctorClientText
          } else {
            return message.content.data.showTextInfo.patientClientText
          }
        }

        return message.content.data.showTextInfo.doctorClientText
      }

      if (message.text) {
        return message.text
      }
    },

    getHangupConsultRole(message) {
      const doctorId = this.$store.state.user.userInfo.list.docInfo.doctor_id
      const startDoctorList = message.content.data.consultInfo.startDoctor
      const receiveDoctorList = message.content.data.consultInfo.receiveDoctor

      if (startDoctorList.find(item => item.doctorId === doctorId)) {
        return 'from'
      }

      if (receiveDoctorList.find(item => item.doctorId === doctorId)) {
        return 'to'
      }

      return new Error('当前医生未找到角色')
    }
  }
}
</script>

<style lang="scss" scoped>
.consultation-session-message-list {
  padding: 10px 10px 0 10px;

  .message {
    margin: 0 0 10px 0;

    &.in {
      text-align: left;

      .message-body {
        color: rgba(51, 51, 51, 1);
        background: rgba(243, 243, 243, 1);
      }
    }

    &.out {
      text-align: right;

      .message-body {
        color: rgba(255, 255, 255, 1);
        background: rgba(0, 198, 174, 1);
      }
    }

    &.system {
      text-align: center;
      margin: 10px auto;

      .message-body {
        color: rgba(155, 155, 155, 1);
        background: rgba(242, 242, 242, 1);
      }
    }

    &.time {
      font-size: 12px;
      text-align: center;
      margin: 0;

      .message-body {
        color: rgba(155, 155, 155, 1);
        background: rgb(255, 255, 255);
      }
    }

    .message-body {
      text-align: justify;
      /* white-space: pre-wrap; */
      word-wrap: break-word;
      word-break: break-all;
      padding: 5px 10px;
      display: inline-block;
      border-radius: 4px;
      max-width: 80%;

      &.case,
      &.recipe {
        background: #fff;
        border: 1px solid #f2f2f2;
        padding: 10px 12px;
        cursor: pointer;
        display: inline-flex;

        p {
          margin: 0 0 2px 10px;
          font-size: 12px;
          color: #333333;
        }
      }
    }
  }
}
.message-check {
  .message-line-solid {
    margin-top: 10px;
    border-top: 1px solid #ddd;
  }
  .message-content {
    padding-top: 0;
    padding-bottom: 0;
    .item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 5px 0 0 0;
      font-size: 13px;
      &:first-child {
        padding-top: 10px;
      }

      .left {
        width: 80%;
        text-align: left;
        &.other {
          color: #999;
          width: 5em;
          padding-right: 0.8em;
          height: 20px;
          line-height: 20px;
          &.justify {
            /* white-space: normal; */
            text-align: justify;
            text-align-last: justify;
            display: inline-block;
            &:after {
              content: '';
              display: inline-block;
              width: 100%;
              height: 0px;
            }
          }
        }

        &.elps {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .right {
        color: #999;
        flex: 1;
        line-height: 20px;
        text-align: right;
        &.other {
          text-align: left;
          color: #333;
          width: calc(100% - 5em);
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }
  }
  .message-footer {
    height: 35px;
    width: 100%;
    display: flex;
    align-items: center;
    color: #999;
    justify-content: center;
    font-size: 12px;
    &::after {
      height: 0;
    }
  }
}
.message-card,
.message-check {
  width: 250px;
  background-color: #fff !important;
  padding: 0 !important;
  box-sizing: border-box;
  box-shadow: 2px 2px 4px 0px rgba(204, 204, 204, 0.5), -1px 1px 10px 0px rgba(221, 221, 221, 0.5);
}
.message-header {
  background-image: url('~@/assets/images/bg-img.png');
  background-size: cover;
  display: flex;
  align-items: center;
  height: 35px;
  width: 100%;
  color: #fff;
  padding-left: 10px;
  box-sizing: border-box;
  position: relative;
  span {
    margin-left: 10px;
  }
  .fz {
    width: 50px;
    height: 35px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 5;
  }
}
.message-content {
  text-align: left;
  padding: 10px;
  .content {
    color: #333;
    font-size: 13px;
    .t {
      color: #999;
      margin-right: 10px;
    }
    &.top {
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
    }
  }
}
.message-line {
  height: 1px;
  background: #f2f2f2;
  margin: 0 10px;
}
.message-footer {
  color: #999;
  padding: 8px;
  text-align: center;
}
</style>

