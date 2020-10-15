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
                  <span class="text-grey-6">图片</span>
                </div>
              </el-button>
            </el-upload>
          </div>
          <div class="q-editor__toolbar-group">
            <el-button type="text"
                       v-on:click="sendVideo">
              <div class="flex items-center">
                <img class="q-mr-xs"
                     src="~@src/assets/images/inquiry/chat_icon_video.png" />
                <span class="text-grey-6">视频</span>
              </div>
            </el-button>
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
          <div class="q-editor__toolbar-group">
            <el-button type="text"
                       v-on:click="sendTransfer">
              <div class="flex items-center">
                <img class="q-mr-xs"
                     src="~@src/assets/images/inquiry/chat_icon_zhuanzhen.png" />
                <span class="text-grey-6">申请转诊</span>
              </div>
            </el-button>
          </div>
          <div class="q-editor__toolbar-group">
            <el-button type="text"
                       v-on:click="sendConsultation">
              <div class="flex items-center">
                <img class="q-mr-xs"
                     src="~@src/assets/images/inquiry/yuanchenghuizhen1.png" />
                <span class="text-grey-6">申请会诊</span>
              </div>
            </el-button>
          </div>
        </div>
      </div>
      <div class="q-editor__content session-detail-input">
        <el-input type="textarea"
                  resize="none"
                  v-model="editorMessage"
                  v-on:keyup.ctrl.enter.exact.native="sendText()"></el-input>
      </div>
    </div>

    <div class="footer q-px-md flex justify-end items-center">
      <el-dropdown placement="top"
                   class="q-mr-sm">
        <el-button round>
          <span class="text-caption">快捷回复</span>
        </el-button>
        <el-dropdown-menu slot="dropdown"
                          style="overflow: hidden;">
          <div style="height: 150px; overflow: auto;">
            <el-dropdown-item v-for="item in quickReplys"
                              v-bind:key="item"
                              v-on:click.native="sendText(item)"
                              style="padding: 5px 10px;">
              {{ item }}
            </el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button round
                 size="mini"
                 type="primary"
                 v-on:click.native="sendText()">
        <span class="text-caption">发送 (ctrl + enter)</span>
      </el-button>
    </div>

    <peace-dialog v-bind:visible.sync="caseDetail.visible"
                  append-to-body
                  title="病历详情">
      <CaseDetail v-bind:data="caseDetail.data"></CaseDetail>
    </peace-dialog>
  </div>
</template>

<script>
import Service from './../../service'

import CaseDetail from '@src/views/components/case/CaseDetail'

export default {
  inject: ['provideCall'],

  components: {
    CaseDetail
  },

  data() {
    return {
      editorMessage: '',

      quickReplys: [
        '请问您这种情况持续多长时间了？',
        '请补充您的患处图片',
        '请详细描述一下您的病症和感受',
        '您是否有过敏史',
        '您是否处于备孕期、怀孕期、哺乳期、月经期等特殊时期？',
        '您之前服用过何种药品？',
        '是否有不良反应',
        '您这种情况建议去医院找医生面诊',
        '希望您早日康复'
      ],

      caseDetail: {
        visible: false,
        data: {}
      }
    }
  },

  computed: {
    injectCall() {
      return this.provideCall
    }
  },

  methods: {
    sendText(text) {
      const message = (text || this.editorMessage).replace(/^\s+|\s+$/g, '')

      if (message) {
        $peace.NIM.sendText({
          scene: this.$store.state.inquiry?.session?.scene,
          to: this.$store.state.inquiry?.session?.content?.patientInfo?.familyId,
          text: message,
          done: (error, message) => {
            console.warn('【 IM 】【 sendText 】', new Date(), message)

            this.editorMessage = ''

            if (error) {
              throw new Error(error)
            }
          }
        })
      }
    },

    sendImage(file) {
      if (file) {
        $peace.NIM.sendFile({
          scene: this.$store.state.inquiry?.session?.scene,
          to: this.$store.state.inquiry?.session?.content?.patientInfo?.familyId,
          type: 'image',
          blob: file.raw,
          done: (error, message) => {
            console.warn('【 IM 】【 sendFile 】', new Date(), message)

            if (error) {
              throw new Error(error)
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
        inquiry_no: this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryNo,
        inquiryNo: this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryNo
      }

      // 检查是否为有效会话
      Service.checkOverInquiry(params).then((res) => {
        if (res.data.status === 1) {
          return Peace.util.warning('当前为无效会话，暂时无法发送病历。')
        } else if (res.data.caseStatus === 1) {
          this.$emit('control', '发病历')
        } else {
          Service.getCase(params).then((res) => {
            this.caseDetail.visible = true
            this.caseDetail.data = res.data
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
          return Peace.util.warning('当前为无效会话，暂时无法发处方。')
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

    sendTransfer() {
      const params = {
        inquiryNo: this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryNo
      }

      // 检查是否为有效会话
      Service.checkOverInquiry(params).then((res) => {
        // 非有效会话
        if (res.data.status === 1) {
          return Peace.util.warning('当前为无效会话，暂时无法申请转诊。')
        }
        // 未填写病历，提示填写病历
        else if (res.data.caseStatus === 1) {
          const message = '给用户发送病历后才能【申请转诊】，是否立即填写病历？'
          const confirmOption = {
            type: 'warning',
            confirmButtonText: '去填写'
          }

          return Peace.util.confirm(message, undefined, confirmOption, () => {
            this.sendCase()
          })
        }

        this.$emit('control', '申请转诊')
      })
    },

    sendConsultation() {
      const params = {
        inquiryNo: this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryNo
      }

      // 检查是否为有效会话
      Service.checkOverInquiry(params).then((res) => {
        // 非有效会话
        if (res.data.status === 1) {
          return Peace.util.warning('当前为无效会话，暂时无法申请会诊。')
        }
        // 未填写病历，提示填写病历
        else if (res.data.caseStatus === 1) {
          const message = '给用户发送病历后才能【申请会诊】，是否立即填写病历？'
          const confirmOption = {
            type: 'warning',
            confirmButtonText: '去填写'
          }

          return Peace.util.confirm(message, undefined, confirmOption, () => {
            this.sendCase()
          })
        }

        this.$emit('control', '申请会诊')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.session-detail-control {
  height: calc(100% - 40px);

  .content {
    height: 100%;

    /deep/ .q-editor__toolbars-container {
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

    /deep/ .q-editor__content {
      flex: 1;
      width: 100%;
      padding: 10px 0;
      word-break: break-all;
    }

    /deep/ .el-upload-list__item {
      display: none;
    }

    /deep/ .session-detail-input {
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