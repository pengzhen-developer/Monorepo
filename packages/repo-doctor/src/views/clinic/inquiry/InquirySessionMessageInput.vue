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
          <el-dropdown-item @click.native="sendText('您好，是否做过检查、化验？如果有，请上传相关附件。')"
                            style="padding: 5px 10px;">
            您好，是否做过检查、化验？如果有，请上传相关附件。
          </el-dropdown-item>
          <el-dropdown-item @click.native="sendText('您好，病历已发送，请注意查收。')"
                            style="padding: 5px 10px;">
            您好，病历已发送，请注意查收。
          </el-dropdown-item>
          <el-dropdown-item @click.native="sendText('您好，处方已开具，请注意查收。')"
                            style="padding: 5px 10px;">
            您好，处方已开具，请注意查收。
          </el-dropdown-item>
          <el-dropdown-item @click.native="sendText('您好，还有其它问题吗?')"
                            style="padding: 5px 10px;">
            您好，还有其它问题吗?
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button @click="sendText()"
                 round
                 type="primary">发送</el-button>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      message: ''
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
          to: this.$store.getters['inquiry/patientInfo'].patientId,
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
          to: this.$store.getters['inquiry/patientInfo'].patientId,
          type: 'image',
          blob: file.raw,
          done: doneHandler
        })
      }
    },

    sendVideo() {
      if (
        this.$store.getters['inquiry/inquiryInfo'].inquiryType ===
        peace.type.INQUIRY.INQUIRY_TYPE.视频问诊
      ) {
        $peace.videoComponent.sendVideo(this.$store.state.inquiry.session)
      } else {
        peace.util.warning('只有视频问诊才能进行发起视频邀请')
      }
    },

    sendCase() {
      if (this.$store.getters['inquiry/inquiryInfo'].isSendCase === 0) {
        $peace.inquiryComponent.$emit(peace.type.INQUIRY.INQUIRY_ACTION.发病历)
      } else {
        peace.util.warning('已经填写病历，无法再次修改')
      }
    },

    sendRecipe() {
      if (this.$store.getters['inquiry/inquiryInfo'].isSendCase === 0) {
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
      peace.service.inquiry.checkOverInquiry(params).then(res => {
        if (res.data.status === 1) {
          const message = '系统检测到当前为无效会话，无法进行转诊。'
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
      peace.service.inquiry.checkOverInquiry(params).then(res => {
        if (res.data.status === 1) {
          const message = '系统检测到当前为无效会话，无法进行会诊。'
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
