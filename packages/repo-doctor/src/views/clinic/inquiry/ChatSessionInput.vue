<template>
  <div>
    <div class="tool">
      <div class="shortcut">
        <el-upload
          :auto-upload="false"
          :on-change="sendImage"
          accept=".jpg, .jpeg, .png, .gif, .bmp, .pdf, .JPG, .JPEG, .PBG, .GIF, .BMP, .PDF"
          action=" "
          ref="upload"
          style="display: inline-block;"
        >
          <el-button slot="trigger" type="text">
            <img src="~@/assets/images/icons/clinic/chat_icon_pic.png">图片
          </el-button>
        </el-upload>
        <el-button @click="sendVideoBefore" type="text">
          <img src="~@/assets/images/icons/clinic/chat_icon_video.png">视频
        </el-button>
        <el-button @click="showMedical" type="text">
          <img src="~@/assets/images/icons/clinic/chat_icon_medical.png">写病历
        </el-button>
        <el-button @click="showPrescription" type="text">
          <img src="~@/assets/images/icons/clinic/chat_icon_pr.png">开处方
        </el-button>
        <el-button @click="showTransfer" type="text">
          <img src="~@/assets/images/icons/clinic/chat_icon_zhuanzhen.png">申请转诊
        </el-button>
        <el-button @click="showConsultation" type="text">
          <img src="~@/assets/images/icons/clinic/yuanchenghuizhen1.png">申请会诊
        </el-button>
        <el-button @click="OverOverOver" type="text" v-show="false">
          <img src="~@/assets/images/icons/clinic/chat_icon_pr.png">强行退诊
        </el-button>
      </div>
    </div>

    <div @keyup.ctrl.enter="quickSend" class="input" tabindex="0">
      <ckeditor :config="ckEditor.editorConfig" :editor="ckEditor.editor" @ready="onEditorReady" class="input" tabindex="0" v-model.trim="ckEditor.currentMsg"></ckeditor>
    </div>

    <div class="send">
      <el-dropdown class="quick-reply" placement="top">
        <el-button round type="text">快速回复</el-button>
        <el-dropdown-menu slot="dropdown" style="overflow: hidden;">
          <el-dropdown-item @click.native="quickReply('您好，是否做过检查、化验？如果有，请上传相关附件。')" style="padding: 5px 10px;">您好，是否做过检查、化验？如果有，请上传相关附件。</el-dropdown-item>
          <el-dropdown-item @click.native="quickReply('您好，病历已发送，请注意查收。')" style="padding: 5px 10px;">您好，病历已发送，请注意查收。</el-dropdown-item>
          <el-dropdown-item @click.native="quickReply('您好，处方已开具，请注意查收。')" style="padding: 5px 10px;">您好，处方已开具，请注意查收。</el-dropdown-item>
          <el-dropdown-item @click.native="quickReply('您好，还有其它问题吗?')" style="padding: 5px 10px;">您好，还有其它问题吗?</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-button @click="sendText" class="quick-send" round type="primary">发送</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { STATE } from './util.js'
import config from './config'

import Vue from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'
Vue.use(CKEditor)

export default {
  props: {
    sessionMsgs: {
      type: Array,
      default() {
        return undefined
      }
    }
  },

  data() {
    return {
      STATE,
      config,

      ckEditor: {
        editor: ClassicEditor,
        editorConfig: {
          language: 'zh-cn',
          toolbar: {
            items: [],
            viewportTopOffset: 30
          }
        },
        currentMsg: ''
      }
    }
  },

  computed: {
    ...mapState(['chat']),

    lastMsg() {
      let lastMsg

      if (this.chat.sessionMsgs) {
        lastMsg = this.chat.sessionMsgs.msgs[0]
      }

      return lastMsg
    },

    isShowMedicalButton() {
      return this.lastMsg && this.lastMsg.custom.ext.talkState === STATE.talkState['未填写病历']
    },

    isShowPrescriptionButton() {
      return this.lastMsg && this.lastMsg.custom.ext.talkState === STATE.talkState['已填写病历']
    },

    isShowTransferButton() {
      return this.lastMsg && this.lastMsg.custom.ext.talkState === STATE.talkState['已填写病历']
    },

    isShowConsultationButton() {
      return this.lastMsg && this.lastMsg.custom.ext.talkState === STATE.talkState['已填写病历']
    }
  },

  methods: {
    ...mapMutations('chat', ['updateSessionMsg']),
    ...mapActions('chat', ['sendVideo']),

    onEditorReady(editor) {
      // Execute your own callback:
      editor.keystrokes.set('Ctrl+Enter', (data, cancel) => {
        this.sendText()

        console.log(data, cancel)
      })
    },

    // 快捷回复
    quickReply(quickText) {
      this.ckEditor.currentMsg = quickText
      this.sendText()
      this.ckEditor.currentMsg = ''
    },

    // 发送普通文本
    sendText() {
      if (this.ckEditor.currentMsg) {
        $peace.NIM.sendText({
          scene: 'p2p',
          to: this.chat.session.lastMsg.custom.patients.patientId,
          text: this.ckEditor.currentMsg,
          custom: JSON.stringify(this.lastMsg.custom),
          done: (error, msg) => {
            if (error) {
              $peace.util.alert(error.message)

              return
            }
            console.log(new Date().formatTime() + ': ' + '消息发送成功', msg)

            this.ckEditor.currentMsg = ''
            this.updateSessionMsg(msg)
          }
        })
      }
    },

    // 发送图片
    sendImage(file) {
      $peace.NIM.sendFile({
        scene: 'p2p',
        type: 'image',
        blob: file.raw,
        to: this.lastMsg.custom.patients.patientId,
        custom: JSON.stringify(this.lastMsg.custom),
        done: (error, msg) => {
          if (error) {
            $peace.util.alert(error.message)

            return
          }

          console.log(new Date().formatTime() + ': ' + '图片发送成功', error, msg)
          this.updateSessionMsg(msg)
        }
      })
    },

    // 发送视频
    sendVideoBefore() {
      // 仅视频问诊才能提起视频请求
      if (this.chat.session.lastMsg.custom.ext.talkType === STATE.talkType['视频问诊']) {
        this.sendVideo(this.chat.session)
      } else {
        $peace.util.warning('只有视频问诊才能进行发起视频')
      }
    },

    // 发送病历
    showMedical() {
      if (!this.isShowMedicalButton) {
        $peace.util.warning('已经填写病历，无法再次修改')
      } else {
        this.$emit('showMedical')
      }
    },

    // 发送处方
    showPrescription() {
      if (!this.isShowPrescriptionButton) {
        $peace.util.warning('尚未填写病历，无法开具处方')
      } else {
        this.$emit('showPrescription')
      }
    },

    // 申请转诊
    showTransfer() {
      const param = {
        inquiryId: this.chat.session.lastMsg.custom.ext.inquiryId
      }

      this.$http.post(this.config.api.checkOverInquiry, param).then(res => {
        // 非有效会话，提示无法进行转诊
        if (res.data.status === 1) {
          $peace.util.warning('非有效会话，无法进行转诊')
        }
        // 未填写病历，提示填写病历
        else if (res.data.caseStatus === 1) {
          $peace.util.confirm('请填写病历', undefined, { type: 'warning' }, () => {
            this.showMedical()
          })
        }
        // 可正常转诊
        else if (res.data.caseStatus === 2 && res.data.status === 2) {
          $peace.util.confirm(
            '转诊提交成功后， 本次咨询将自动关闭。',
            undefined,
            {
              type: 'warning'
            },
            () => {
              this.$emit('showTransfer')
            }
          )
        }
        // 未知情况
        else {
          $peace.util.warning(res.msg)
        }
      })
    },

    // 申请会诊
    showConsultation() {
      if (!this.isShowConsultationButton) {
        $peace.util.warning('尚未填写病历，无法申请会诊')
      } else {
        $peace.util.confirm(
          '会诊提交成功后， 本次咨询将自动关闭。',
          undefined,
          {
            type: 'warning'
          },
          () => {
            this.$emit('showConsultation')
          }
        )
      }
    },

    // 快捷发送
    quickSend() {
      this.sendText()

      this.ckEditor.currentMsg = ''
    },

    // 黑科技，强行退诊，不走数据库的，请小心行事!!!!!!!!!!!!!!
    OverOverOver() {
      $peace.util.confirm(
        '黑科技，强行退诊，不走数据库的，请小心行事!',
        undefined,
        {
          type: 'warning'
        },
        () => {
          // 给患者发送一个 custom 消息, 用于显示
          // 1. 更改自定义消息体的状态
          const tempCustomData = $peace.util.clone(this.chat.session.lastMsg.custom)
          tempCustomData.ext.talkState = 4

          $peace.NIM.sendCustomMsg({
            type: 'custom',
            scene: 'p2p',
            to: this.chat.session.lastMsg.custom.patients.patientId,
            text: '',
            custom: JSON.stringify(tempCustomData),
            content: JSON.stringify({
              data: { appMsg: '黑科技退诊, 请无视' },
              type: 8,
              wechatMsg: '医生退诊，本次咨询结束，如有疑问可再次预约咨询。',
              description: '黑科技退诊，请无视就好。'
            }),
            done: (error, msg) => {
              if (error) {
                $peace.util.alert(error.message)

                return
              }
              console.log(new Date().formatTime() + ': ' + '黑科技，强行退诊成功', msg)

              this.updateSessionMsg(msg)
            }
          })
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.tool {
  display: flex;
  justify-content: space-between;

  background: rgba(251, 251, 251, 1);
  height: 36px;
  align-items: center;
  margin: 0;
  padding: 0 5px;

  .shortcut {
    .el-button {
      min-width: 0;
      margin: 0 30px 0 0;
      color: rgba(153, 153, 153, 1);

      /deep/ span {
        display: inline-flex;
        justify-content: center;

        img {
          margin: 0 5px 0 0;
        }

        &:after {
          content: '';
          position: relative;
          right: -15px;
          top: 0;
          bottom: 0;
          width: 1px;
          height: 15px;
          background-color: #efefef;
          z-index: 1;
        }
      }
    }
  }

  /deep/ .el-upload-list__item {
    display: none;
  }
}

.input {
  max-width: 700px;

  /deep/ .ck.ck-editor__editable {
    height: 120px;
    border: 0;
    border-color: #efefef !important;
    border-radius: 0 !important;
  }

  /deep/ .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused {
    border: 0;
    box-shadow: none !important;
  }

  /deep/.ck.ck-toolbar {
    display: none !important;
  }
}

.send {
  margin: 5px 5px 0 0;
  text-align: right;
}
</style>
