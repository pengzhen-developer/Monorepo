<template>
  <div class="inquiry-session-message-input">
    <div class="control">
      <el-upload :auto-upload="false"
                 :on-change="sendImage"
                 accept=".jpg, .jpeg, .png, .gif, .bmp, .pdf, .JPG, .JPEG, .PBG, .GIF, .BMP, .PDF"
                 action=" "
                 ref="upload"
                 style="display: inline-block;">
        <el-button type="text">
          <img src="~@src/assets/images/inquiry/chat_icon_pic.png" />
          <span>图片</span>
        </el-button>
      </el-upload>

      <el-divider direction="vertical"></el-divider>

      <el-button @click="sendVideo"
                 type="text">
        <img src="~@src/assets/images/inquiry/chat_icon_video.png" />
        <span>视频</span>
      </el-button>

      <el-divider direction="vertical"></el-divider>

      <el-button @click="sendCase"
                 type="text">
        <img src="~@src/assets/images/inquiry/chat_icon_medical.png" />
        <span>写病历</span>
      </el-button>

      <el-divider direction="vertical"></el-divider>

      <el-button @click="sendRecipe"
                 type="text">
        <img src="~@src/assets/images/inquiry/chat_icon_pr.png" />
        <span>开处方</span>
      </el-button>

      <el-divider direction="vertical"></el-divider>

      <el-button @click="sendTransfer"
                 type="text">
        <img src="~@src/assets/images/inquiry/chat_icon_zhuanzhen.png" />
        <span>申请转诊</span>
      </el-button>
      <el-divider direction="vertical"></el-divider>
      <el-button @click="sendConsultation"
                 type="text">
        <img src="~@src/assets/images/inquiry/yuanchenghuizhen1.png" />
        <span>申请会诊</span>
      </el-button>
    </div>
    <div class="input-text">
      <el-input :rows="6"
                @keyup.ctrl.enter.native="sendText()"
                placeholder
                resize="none"
                type="textarea"
                v-model="message"></el-input>
    </div>
    <div class="input-send">
      <el-dropdown placement="top">
        <el-button round
                   type="text">快速回复</el-button>
        <el-dropdown-menu slot="dropdown"
                          style="overflow: hidden;">
          <div style="height: 150px; overflow: auto;">
            <el-dropdown-item v-for="item in quickReplys"
                              :key="item"
                              @click.native="sendText(item)"
                              style="padding: 5px 10px;">
              {{ item }}
            </el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button @click="sendText()"
                 round
                 type="primary">发送</el-button>
    </div>

    <peace-dialog :visible.sync="caseDetail.visible"
                  append-to-body
                  title="病历详情">
      <InquirySessionCaseDetail :data="caseDetail.data"></InquirySessionCaseDetail>
    </peace-dialog>
  </div>
</template>

<script>
import InquirySessionCaseDetail from './InquirySessionCaseDetail'

export default {
  inject: ['provideCall'],

  components: {
    InquirySessionCaseDetail
  },

  data() {
    return {
      message: '',

      caseDetail: {
        visible: false,
        data: {}
      },

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
      ]
    }
  },

  computed: {
    injectCall() {
      return this.provideCall
    }
  },

  methods: {
    sendText(text) {
      text = text || this.message

      if (text) {
        const doneHandler = (error, message) => {
          console.warn('【 IM 】【 sendText 】', new Date(), message)

          this.message = ''

          if (error) {
            throw new Error(error)
          }
        }

        $peace.NIM.sendText({
          scene: this.$store.state.inquiry.session.scene,
          to: this.$store.getters['inquiry/patientInfo'].familyId,
          text: text,
          done: doneHandler
        })
      }
    },

    sendImage(file) {
      if (file) {
        const doneHandler = (error, message) => {
          console.warn('【 IM 】【 sendFile 】', new Date(), message)

          if (error) {
            throw new Error(error)
          }
        }

        $peace.NIM.sendFile({
          scene: this.$store.state.inquiry.session.scene,
          to: this.$store.getters['inquiry/patientInfo'].familyId,
          type: 'image',
          blob: file.raw,
          done: doneHandler
        })
      }
    },

    sendVideo() {
      if (this.$store.getters['inquiry/inquiryInfo'].inquiryType === peace.type.INQUIRY.INQUIRY_TYPE.视频问诊) {
        this.injectCall(this.$store.state.inquiry.session, 'inquiry')
      } else {
        peace.util.warning('只有视频问诊才能进行发起视频邀请')
      }
    },

    sendCase() {
      const params = {
        inquiryNo: this.$store.getters['inquiry/inquiryInfo'].inquiryNo
      }

      if (this.$store.getters['inquiry/inquiryInfo'].isSendCase === 0) {
        peace.service.inquiry.checkOverInquiry(params).then((res) => {
          if (res.data.status === 1) {
            let message = ''
            if (this.$store.getters['inquiry/inquiryInfo'].inquiryType === peace.type.INQUIRY.INQUIRY_TYPE.视频问诊) {
              message = '您与患者尚未进行视频通话，暂时无法发送病历。'
            } else {
              message = '当前为无效会话，暂时无法发送病历。请先与患者进行病情沟通'
            }

            $peace.util.warning(message)
          } else if (res.data.caseStatus === 1) {
            $peace.inquiryComponent.$emit(peace.type.INQUIRY.INQUIRY_ACTION.发病历)
          }
        })
      } else {
        this.getCaseDetail(this.$store.getters['inquiry/inquiryInfo'].inquiryNo)
      }
    },

    sendRecipe() {
      if (!this.$store.getters['inquiry/inquiryInfo'].isAgain) {
        peace.util.warning('该患者未提供线下复诊材料，不可开具线上处方')
      } else if (this.$store.getters['inquiry/inquiryInfo'].isSendCase === 0) {
        peace.util.warning('尚未填写病历，无法开具处方')
      } else {
        $peace.inquiryComponent.$emit(peace.type.INQUIRY.INQUIRY_ACTION.发处方)
      }
    },

    sendTransfer() {
      const params = {
        inquiryNo: this.$store.getters['inquiry/inquiryInfo'].inquiryNo
      }

      // 验证是否有效会话
      peace.service.inquiry.checkOverInquiry(params).then((res) => {
        if (res.data.status === 1) {
          let message = ''
          if (this.$store.getters['inquiry/inquiryInfo'].inquiryType === peace.type.INQUIRY.INQUIRY_TYPE.视频问诊) {
            message = '您与患者尚未进行视频通话，暂时无法进行转诊。'
          } else {
            message = '当前为无效会话，暂时无法进行转诊。请先与患者进行病情沟通'
          }

          $peace.util.warning(message)
        }
        // 未填写病历，提示填写病历
        else if (res.data.caseStatus === 1) {
          const message = '给用户发送病历后才能【申请转诊】，是否立即填写病历？'
          const confirmOption = {
            type: 'warning',
            confirmButtonText: '去填写'
          }

          peace.util.confirm(message, undefined, confirmOption, () => {
            this.sendCase()
          })
        }
        // 正常问诊
        else if (res.data.caseStatus === 2 && res.data.status === 2) {
          $peace.inquiryComponent.$emit(peace.type.INQUIRY.INQUIRY_ACTION.发转诊)
        }
      })
    },

    sendConsultation() {
      const params = {
        inquiryNo: this.$store.getters['inquiry/inquiryInfo'].inquiryNo
      }

      // 验证是否有效会话
      peace.service.inquiry.checkOverInquiry(params).then((res) => {
        if (res.data.status === 1) {
          let message = ''
          if (this.$store.getters['inquiry/inquiryInfo'].inquiryType === peace.type.INQUIRY.INQUIRY_TYPE.视频问诊) {
            message = '您与患者尚未进行视频通话，暂时无法进行会诊。'
          } else {
            message = '当前为无效会话，暂时无法进行会诊。请先与患者进行病情沟通'
          }

          $peace.util.warning(message)
        }
        // 未填写病历，提示填写病历
        else if (res.data.caseStatus === 1) {
          const message = '给用户发送病历后才能【申请会诊】，是否立即填写病历？'
          const confirmOption = {
            type: 'warning',
            confirmButtonText: '去填写'
          }

          peace.util.confirm(message, undefined, confirmOption, () => {
            this.sendCase()
          })
        }
        // 正常问诊
        else if (res.data.caseStatus === 2 && res.data.status === 2) {
          $peace.inquiryComponent.$emit(peace.type.INQUIRY.INQUIRY_ACTION.发会诊)
        }
      })
    },

    getCaseDetail(inquiryNo) {
      const params = {
        inquiry_no: inquiryNo
      }
      peace.service.inquiry.getCase(params).then((res) => {
        this.caseDetail.visible = true
        this.caseDetail.data = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.inquiry-session-message-input {
  .control {
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    border-top: 1px solid #efefef;
    background: rgba(251, 251, 251, 1);

    /deep/ .el-button {
      color: rgba(153, 153, 153, 1);

      span {
        display: flex;
        align-items: center;
        flex-direction: row;

        img {
          margin: 0 5px 0 0;
        }
      }
    }

    /deep/ .el-upload-list__item {
      display: none;
    }

    .el-divider {
      margin: 0 15px;
    }
  }

  .input-text {
    /deep/ .el-textarea__inner {
      padding: 5px 10px;
      border-radius: 0;
      border-top: 1px solid rgba(251, 251, 251, 1);
      border-bottom: 0;
      border-left: 0;
      border-right: 0;

      &:focus {
        outline: none;
        border-color: rgba(240, 240, 240, 1);
      }
    }
  }

  .input-send {
    padding: 0 5px;
    text-align: right;
    height: 30px;
    line-height: 30px;
  }
}
</style>
