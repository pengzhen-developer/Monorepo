<template>
  <div class="session-detail-control">
    <div class="content flex column">
      <div class="q-editor__toolbars-container">
        <div class="q-editor__toolbar row no-wrap scroll-x bg-grey-1">
          <div class="q-editor__toolbar-group">
            <el-upload v-bind:auto-upload="false"
                       v-bind:on-change="sendImage"
                       accept=".jpg, .jpeg, .png, .gif, .bmp, .pdf, .JPG, .JPEG, .PBG, .GIF, .BMP, .PDF"
                       action=" "
                       ref="upload">
              <el-button type="text">
                <div class="flex items-center">
                  <img class="q-mr-xs"
                       src="~@src/assets/images/inquiry/chat_icon_pic.png" />
                  <span class="text-grey-6">发图片</span>
                </div>
              </el-button>
            </el-upload>
          </div>
          <div class="q-editor__toolbar-group">
            <el-dropdown szie="medium"
                         placement="top">
              <el-button type="text">
                <div class="flex items-center">
                  <img class="q-mr-xs"
                       src="~@src/assets/images/inquiry/chat_icon_language.png" />
                  <span class="text-grey-6">常用语</span>
                </div>
              </el-button>

              <el-dropdown-menu class="el-dropdown-menu-quickReply"
                                slot="dropdown">
                <el-dropdown-item v-for="(item, index) in quickReply"
                                  v-bind:key="item"
                                  v-on:click.native="sendText(item)">
                  {{ index + 1 }}. {{ item }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="q-editor__toolbar-group">
            <el-button type="text"
                       v-on:click="sendCase">
              <div class="flex items-center">
                <img class="q-mr-xs"
                     src="~@src/assets/images/inquiry/chat_icon_medical.png" />
                <span class="text-grey-6">写病历</span>
              </div>
            </el-button>
          </div>
          <div class="q-editor__toolbar-group">
            <el-button type="text"
                       v-on:click="sendRecipe">
              <div class="flex items-center">
                <img class="q-mr-xs"
                     src="~@src/assets/images/inquiry/chat_icon_pr.png" />
                <span class="text-grey-6">开处方</span>
              </div>
            </el-button>
          </div>
          <div class="q-editor__toolbar-group"
               v-if="canShowInspect">
            <el-button type="text"
                       v-on:click="sendInspection">
              <div class="flex items-center">
                <img class="q-mr-xs"
                     src="~@src/assets/images/inquiry/icon_jyd_unchecked.png" />
                <span class="text-grey-6">开检验</span>
              </div>
            </el-button>
          </div>
          <div class="q-editor__toolbar-group">
            <el-button type="text"
                       v-on:click="sendVideo">
              <div class="flex items-center">
                <img class="q-mr-xs"
                     src="~@src/assets/images/inquiry/chat_icon_video.png" />
                <span class="text-grey-6">视频通话</span>
              </div>
            </el-button>
          </div>
        </div>
      </div>
      <div class="q-editor__content session-detail-input">
        <el-input type="textarea"
                  resize="none"
                  placeholder="请输入文字..."
                  v-model="editorMessage"
                  v-on:keydown.prevent.enter.exact.native="sendText()"
                  v-on:keydown.prevent.ctrl.enter.exact.native="warpText()"></el-input>
      </div>
    </div>

    <div class="footer q-px-md flex justify-end items-center">
      <el-button size="mini"
                 plain
                 v-on:click="overInquiry">
        <span class="text-caption">结束问诊</span>
      </el-button>

      <el-button size="mini"
                 type="primary"
                 v-on:click.native="sendText()">
        <span class="text-caption">发送 ( Enter )</span>
      </el-button>
    </div>

    <!-- 模态框 - 填写拒绝原因 -->
    <PeaceDialog width="348px"
                 top="25vh"
                 class="no-header"
                 v-if="overInquiryVisible"
                 v-bind:visible.sync="overInquiryVisible">
      <OverInquiry v-on:close="overInquiryVisible = false"></OverInquiry>
    </PeaceDialog>

    <PeaceDialog append-to-body
                 title="病历详情"
                 v-if="caseDetail.visible"
                 v-bind:visible.sync="caseDetail.visible">
      <PeaceCaseDetail v-bind:data="caseDetail.data"></PeaceCaseDetail>
    </PeaceDialog>
  </div>
</template>

<script>
import Type from '@src/type'
import Service from './../../service/index.js'
import OverInquiry from './../SessionForHeader/OverInquiry.vue'
import { PeaceCaseDetail } from 'peace-components'

export default {
  inject: ['provideCall'],

  components: {
    PeaceCaseDetail,
    OverInquiry
  },

  data() {
    return {
      quickReply: [
        '需要我在网络医院上帮你开药吗？可以配送上门',
        '请问我提供的回复是否解答您的问题？如确认，我将结束问诊。',
        '请问您这种情况持续多长时间了？',
        '请详细描述一下您的病症和感受',
        '因开具的处方中含冷藏药品，请您到店/院自提，不支持快递配送。',
        '希望您早日康复'
      ],

      editorMessage: '',

      overInquiryVisible: false,

      caseDetail: {
        visible: false,
        data: {}
      }
    }
  },

  computed: {
    injectCall() {
      return this.provideCall()
    },

    session() {
      return this.$store.state.inquiry?.session ?? {}
    },

    patientInfo() {
      return this.session?.content?.patientInfo ?? {}
    },

    canShowOver() {
      return this.$store.state?.inquiry?.session?.content?.inquiryInfo?.inquiryStatus === Type.INQUIRY.INQUIRY_STATUS.问诊中
    },

    canShowInspect() {
      return this.$store.state?.inquiry?.session?.content?.inquiryInfo?.isReferral === 1
    }
  },

  methods: {
    warpText() {
      this.editorMessage += '\n'
    },

    sendText(text) {
      const message = (text || this.editorMessage).replace(/^\s+|\s+$/g, '')

      if (message) {
        Peace.NIM.sendText({
          scene: this.$store.state.inquiry?.session?.scene,
          to: this.$store.state.inquiry?.session?.content?.patientInfo?.familyId,
          text: message,
          done: (error, IMMessage) => {
            console.warn('【 IM 】【 sendText 】', new Date(), IMMessage)

            this.editorMessage = ''

            if (error) {
              throw new Error(error)
            } else {
              if (this.$store.state.inquiry?.session?.content?.inquiryInfo?.sourcePatient === 'wx') {
                Service.sendSubscribeMsg({
                  patientId: this.$store.state.inquiry?.session?.content?.patientInfo?.patientId,
                  inquiryNo: this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryNo,
                  content: message
                })
              }
            }
          }
        })
      }
    },

    sendImage(file) {
      if (file) {
        Peace.NIM.sendFile({
          scene: this.$store.state.inquiry?.session?.scene,
          to: this.$store.state.inquiry?.session?.content?.patientInfo?.familyId,
          type: 'image',
          blob: file.raw,
          done: (error, message) => {
            console.warn('【 IM 】【 sendFile 】', new Date(), message)

            if (error) {
              throw new Error(error)
            } else {
              if (this.$store.state.inquiry?.session?.content?.inquiryInfo?.sourcePatient === 'wx') {
                Service.sendSubscribeMsg({
                  patientId: this.$store.state.inquiry?.session?.content?.patientInfo?.patientId,
                  inquiryNo: this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryNo,
                  content: ''
                })
              }
            }
          }
        })
      }
    },

    sendVideo() {
      // sourcePatient
      // h5 / wx
      if (this.$store.state.inquiry?.session?.content?.inquiryInfo?.sourcePatient === 'h5') {
        Peace.util.warning('对方版本过低')
      } else {
        this.injectCall(this.$store.state.inquiry?.session, 'inquiry')
      }
    },

    sendCase() {
      const params = {
        inquiryNo: this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryNo
      }

      // 检查是否为有效会话
      Service.checkOverInquiry(params).then((res) => {
        if (res.data.status === 1) {
          return Peace.util.warning('当前为无效会话，暂时无法发送病历。请先与患者进行病情沟通')
        } else if (res.data.caseStatus === 1) {
          this.$emit('control', '发病历')
        } else {
          this.caseDetail.visible = true
          this.caseDetail.data = () =>
            Service.getCaseDetail({ caseNo: this.$store.state.inquiry?.session?.content?.caseInfo?.caseId }).then((res) => {
              return res.data
            })
        }
      })
    },

    sendRecipe() {
      const params = {
        inquiryNo: this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryNo
      }

      // 检查是否为有效会话
      Service.checkOverInquiry(params).then((res) => {
        // 非有效会话
        if (res.data.status === 1) {
          return Peace.util.warning('当前为无效会话，暂时无法发处方。请先与患者进行病情沟通')
        }
        // 未填写病历，提示填写病历
        else if (res.data.caseStatus === 1) {
          const message = '给用户发送病历后才能【发处方】，是否立即填写病历？'
          const confirmOption = {
            type: 'warning',
            confirmButtonText: '去填写'
          }

          return Peace.util.confirm(message, undefined, confirmOption, () => {
            this.sendCase()
          })
        }

        this.$emit('control', '发处方')
      })
    },

    sendInspection() {
      const params = {
        inquiryNo: this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryNo
      }

      // 检查是否为有效会话
      Service.checkOverInquiry(params).then((res) => {
        // 非有效会话
        if (res.data.status === 1) {
          return Peace.util.warning('当前为无效会话，暂时无法开检验。请先与患者进行病情沟通')
        }
        // 未填写病历，提示填写病历
        else if (res.data.caseStatus === 1) {
          const message = '给用户发送病历后才能【开检验】，是否立即填写病历？'
          const confirmOption = {
            type: 'warning',
            confirmButtonText: '去填写'
          }

          return Peace.util.confirm(message, undefined, confirmOption, () => {
            this.sendCase()
          })
        }

        this.$emit('control', '开检验')
      })
    },

    overInquiry() {
      this.overInquiryVisible = true
    }
  }
}
</script>

<style lang="scss">
.el-dropdown-menu-quickReply {
  max-height: 160px;
  overflow: auto;

  .el-dropdown-menu__item {
    padding: 6px 16px;
  }
}
</style>

<style lang="scss" scoped>
.no-header {
  ::v-deep .el-dialog__header {
    display: none;
  }

  ::v-deep .el-dialog__body {
    padding: 20px;
  }
}

.session-detail-control {
  height: calc(100% - 40px);

  .content {
    height: 100%;

    ::v-deep .q-editor__toolbars-container {
      height: 32px;
      border-top: 1px solid #fbfbfb;

      .q-editor__toolbar-group {
        display: flex;
        align-items: center;
        padding: 0 12px;
      }

      .q-editor__toolbar-group + .q-editor__toolbar-group:before {
        background: #efefef;
      }
    }

    ::v-deep .q-editor__content {
      flex: 1;
      width: 100%;
      padding: 0 0 10px 0;
      word-break: break-all;

      .el-textarea__inner:focus {
        box-shadow: none;
      }
    }

    ::v-deep .el-upload-list__item {
      display: none;
    }

    ::v-deep .session-detail-input {
      .el-textarea {
        height: 100%;
      }
      .el-textarea__inner {
        height: 100%;
        border: 0;
      }
    }
  }

  .footer {
    .el-button {
      padding: 4px 16px;
    }
  }
}
</style>
