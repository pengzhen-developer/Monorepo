<template>
  <div class="inquiry-session">
    <div class="header">
      <div class="header-description">
        <span class="name">{{ $store.getters['inquiry/patientInfo'].familyName }}</span>

        <el-tag effect="dark"
                style="margin: 0 0 0 10px;"
                v-bind:type="getTagType($store.state.inquiry.session)">
          {{ getInquiryType($store.state.inquiry.session) }}
        </el-tag>
      </div>
      <div class="header-control">
        <!-- <span class="time">{{ $peace.inquiryComponent.getIntervalValue($store.state.inquiry.session) }}</span> -->
        <el-button @click="overConfirm"
                   plain
                   type="primary"
                   v-if="
            $store.getters['inquiry/inquiryInfo'].inquiryStatus ===
              $peace.type.INQUIRY.INQUIRY_STATUS.问诊中
          ">
          结束问诊</el-button>
      </div>
    </div>

    <div class="content">
      <!-- 写病历 -->
      <InquirySessionCase v-if="inquiryAction === $peace.type.INQUIRY.INQUIRY_ACTION.发病历">
      </InquirySessionCase>

      <!-- 写处方 -->
      <InquirySessionRecipe v-else-if="inquiryAction === $peace.type.INQUIRY.INQUIRY_ACTION.发处方">
      </InquirySessionRecipe>

      <!-- 转诊 -->
      <InquirySessionTransfer v-else-if="inquiryAction === $peace.type.INQUIRY.INQUIRY_ACTION.发转诊">
      </InquirySessionTransfer>

      <!-- 会诊 -->
      <InquirySessionConsultation v-else-if="inquiryAction === $peace.type.INQUIRY.INQUIRY_ACTION.发会诊">
      </InquirySessionConsultation>

      <!-- 待接诊 / 问诊中 -->
      <template v-else>
        <div class="message-list">
          <el-scrollbar class="message-list-scrollbar chat-room-bg">
            <InquirySessionMessageList></InquirySessionMessageList>
          </el-scrollbar>
        </div>

        <div class="message-input">
          <!-- 待接诊 -->
          <InquirySessionReceive v-if="
              $store.getters['inquiry/inquiryInfo'].inquiryStatus ===
                $peace.type.INQUIRY.INQUIRY_STATUS.待接诊
            ">
          </InquirySessionReceive>
          <!-- 问诊中 -->
          <InquirySessionMessageInput v-if="
              $store.getters['inquiry/inquiryInfo'].inquiryStatus ===
                $peace.type.INQUIRY.INQUIRY_STATUS.问诊中
            ">
          </InquirySessionMessageInput>
        </div>
      </template>
    </div>

    <peace-dialog :visible.sync="over.visible"
                  class="over-dialog"
                  title
                  top="25vh"
                  width="348px">
      <h4 style="margin: 0 0 30px 0; font-size: 18px;">您是否已经解决了患者的问题？</h4>

      <el-radio-group v-model="over.state">
        <el-radio label="已解决"
                  style="margin: 0 0 20px 0;">已解决</el-radio>
        <br />
        <el-radio label="未解决"
                  style="margin: 0 0 20px 0;">未解决</el-radio>
        <br />

        <el-radio-group style="margin: 0 0 5px 20px;"
                        v-if="over.state === '未解决'"
                        v-model="over.description">
          <el-radio label="不对症"
                    style="margin: 0 0 20px 0;">不对症</el-radio>
          <br />
          <el-radio label="需面诊"
                    style="margin: 0 0 20px 0;">需面诊</el-radio>
          <br />
          <el-radio label="其他">其他</el-radio>
          <el-input placeholder
                    style="display: inline-block; width: 150px"
                    v-if="over.description === '其他'"
                    v-model="over.otherDescription"></el-input>
        </el-radio-group>
      </el-radio-group>

      <hr />

      <div style="text-align: center;">
        <el-button @click="over.visible = false"
                   type>取消</el-button>
        <el-button :disabled="!over.state"
                   @click="overConfirmAgain"
                   type="primary">确认</el-button>
      </div>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'
import util from '@src/util'

import InquirySessionReceive from './InquirySessionReceive'

// import InquirySessionMessageList from './InquirySessionMessageList'
import InquirySessionMessageList from '@src/views/clinic/inquiry/messageList/index'
import InquirySessionMessageInput from './InquirySessionMessageInput'

import InquirySessionCase from './InquirySessionCase'
import InquirySessionRecipe from './InquirySessionRecipe'
import InquirySessionTransfer from './InquirySessionTransfer'
import InquirySessionConsultation from './InquirySessionConsultation'

export default {
  components: {
    InquirySessionReceive,
    InquirySessionMessageList,
    InquirySessionMessageInput,
    InquirySessionCase,
    InquirySessionRecipe,
    InquirySessionTransfer,
    InquirySessionConsultation
  },

  data() {
    return {
      inquiryAction: '',

      over: {
        visible: false,

        state: '',
        description: '',
        otherDescription: ''
      }
    }
  },

  created() {
    // 在 inquiry/index.vue 的组件实例上挂载所有子组件间监听方法
    $peace.inquiryComponent.$on(peace.type.INQUIRY.INQUIRY_ACTION.发病历, this.sendCase)
    $peace.inquiryComponent.$on(peace.type.INQUIRY.INQUIRY_ACTION.发处方, this.sendRecipe)
    $peace.inquiryComponent.$on(peace.type.INQUIRY.INQUIRY_ACTION.发转诊, this.sendTransfer)
    $peace.inquiryComponent.$on(peace.type.INQUIRY.INQUIRY_ACTION.发会诊, this.sendConsultation)

    $peace.inquiryComponent.$on(peace.type.INQUIRY.INQUIRY_ACTION.重置操作, this.resetAction)
  },

  methods: {
    getInquiryType(session) {
      const text = Object.keys(peace.type.INQUIRY.INQUIRY_TYPE).find((key) => peace.type.INQUIRY.INQUIRY_TYPE[key] === session.content.inquiryInfo.inquiryType)

      const isAgain = session.content.inquiryInfo.isAgain

      if (text === '图文问诊') {
        return isAgain ? '图文复诊' : '图文咨询'
      } else if (text === '视频问诊') {
        return isAgain ? '视频复诊' : '视频咨询'
      }
    },

    getTagType(session) {
      const text = this.getInquiryType(session)

      if (text === '图文复诊' || text === '视频复诊') {
        return 'primary'
      } else {
        return 'primary'
      }
    },

    sendCase() {
      this.inquiryAction = peace.type.INQUIRY.INQUIRY_ACTION.发病历
    },

    sendRecipe() {
      this.inquiryAction = peace.type.INQUIRY.INQUIRY_ACTION.发处方
    },

    sendTransfer() {
      this.inquiryAction = peace.type.INQUIRY.INQUIRY_ACTION.发转诊
    },

    sendConsultation() {
      this.inquiryAction = peace.type.INQUIRY.INQUIRY_ACTION.发会诊
    },

    resetAction() {
      this.inquiryAction = ''
    },

    overConfirm() {
      this.over.visible = true

      this.over.state = ''
      this.over.description = ''
      this.over.otherDescription = ''
    },

    overConfirmAgain() {
      const params = {
        inquiryNo: this.$store.getters['inquiry/inquiryInfo'].inquiryNo
      }

      if (this.over.state === '已解决') {
        // 验证是否有效会话
        peace.service.inquiry.checkOverInquiry(params).then((res) => {
          if (res.data.status === 1) {
            let message = ''
            if (this.$store.getters['inquiry/inquiryInfo'].inquiryType === peace.type.INQUIRY.INQUIRY_TYPE.视频问诊) {
              message = '您与患者尚未进行视频通话，此时结束咨询将做退诊处理'
            } else {
              message = '系统检测到当前为无效会话，此时结束咨询将做退诊处理，确定退诊吗？'
            }

            const confirmOption = { type: 'warning', confirmButtonText: '退诊' }

            peace.util.confirm(message, undefined, confirmOption, () => {
              peace.service.inquiry
                .quitInquiry(params)
                .then((res) => {
                  peace.util.alert(res.msg)

                  util.IM.inquiryHelper.resetInquirySession()
                  util.IM.inquiryHelper.resetInquirySessionMessages()
                })
                .finally(() => {
                  this.over.visible = false
                })
            })
          }
          // 未填写病历，提示填写病历
          else if (res.data.caseStatus === 1) {
            const message = '给用户发送病历后才能选择【已解决】，是否立即填写病历？'
            const confirmOption = { type: 'warning', confirmButtonText: '去填写' }

            peace.util.confirm(message, undefined, confirmOption, () => {
              this.over.visible = false
              this.sendCase()
            })
          }
          // 正常问诊
          else if (res.data.caseStatus === 2 && res.data.status === 2) {
            peace.service.inquiry
              .overInquiry(params)
              .then((res) => {
                peace.util.alert(res.msg)

                util.IM.inquiryHelper.resetInquirySession()
                util.IM.inquiryHelper.resetInquirySessionMessages()
              })
              .finally(() => {
                this.over.visible = false
              })
          }
        })
      } else if (this.over.state === '未解决') {
        const description = this.over.description === '其他' ? this.over.otherDescription.trim() : this.over.description

        if (!description) {
          return peace.util.warning('请选择未解决原因。')
        } else {
          params.overCause = description
        }

        const message = '未解决用户问题，此时结束咨询将做退诊处理，确定退诊吗？'
        const confirmOption = { type: 'warning', confirmButtonText: '退诊' }
        peace.util.confirm(message, undefined, confirmOption, () => {
          peace.service.inquiry
            .quitInquiry(params)
            .then((res) => {
              peace.util.alert(res.msg)

              util.IM.inquiryHelper.resetInquirySession()
              util.IM.inquiryHelper.resetInquirySessionMessages()
            })
            .finally(() => {
              this.over.visible = false
            })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$--header-height: 50px;
$--control-height: 200px;

.inquiry-session {
  height: 100%;
  overflow: auto;

  .header {
    height: $--header-height;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    border-bottom: 1px solid #f2f2f2;
    background: #f9f9f9;

    .header-description {
      font-size: 18px;
    }

    .header-control {
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        color: $--color-primary;
      }

      .time {
        font-size: 18px;
        margin: 0 10px 0 0;
      }
    }
  }

  .content {
    height: calc(100% - #{$--header-height});

    .message-list {
      flex: 1;
      height: calc(100% - #{$--control-height});

      .message-list-scrollbar {
        height: 100%;
      }
    }

    .message-input {
      height: $--control-height;
      min-height: $--control-height;
    }
  }
}

.over-dialog {
  /deep/ .el-dialog__header {
    display: none;
  }

  /deep/ .el-dialog__body {
    padding: 20px;
  }
}
</style>
