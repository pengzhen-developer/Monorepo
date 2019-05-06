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
            <img src="./../../assets/images/icons/clinic/chat_icon_pic.png">图片
          </el-button>
        </el-upload>
        <el-button disabled type="text">
          <img src="./../../assets/images/icons/clinic/chat_icon_video.png">视频
        </el-button>
        <el-button @click="showMedical" type="text">
          <img src="./../../assets/images/icons/clinic/chat_icon_medical.png">写病历
        </el-button>
        <el-button @click="showPrescription" type="text">
          <img src="./../../assets/images/icons/clinic/chat_icon_pr.png">开处方
        </el-button>
        <el-button @click="showTransfer" type="text">
          <img src="./../../assets/images/icons/clinic/chat_icon_pr.png">申请转诊
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
import { mapState, mapMutations } from 'vuex'
import { STATE } from './util.js'

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
    }
  },

  methods: {
    ...mapMutations('chat', ['updateSessionMsg']),

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

    // 双向转诊
    showTransfer() {
      if (!this.isShowTransferButton) {
        $peace.util.warning('尚未填写病历，无法申请转诊')
      } else {
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
    },

    quickSend() {
      this.sendText()

      this.ckEditor.currentMsg = ''
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
