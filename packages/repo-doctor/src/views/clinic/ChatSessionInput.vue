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
        <el-button :disabled="!isShowMedicalButton" :title="!isShowMedicalButton ? '已经填写病历，无法再次修改' : ''" @click="showMedical" type="text">
          <img src="./../../assets/images/icons/clinic/chat_icon_medical.png">写病历
        </el-button>
        <el-button :disabled="!isShowPrescriptionButton" :title="!isShowPrescriptionButton ? '尚未填写病历，无法开具处方' : ''" @click="showPrescription" type="text">
          <img src="./../../assets/images/icons/clinic/chat_icon_pr.png">开处方
        </el-button>
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

    <div @keyup.ctrl.enter="clear" tabindex="0">
      <ckeditor :config="ckEditor.editorConfig" :editor="ckEditor.editor" @ready="onEditorReady" class="input" tabindex="0" v-model.trim="ckEditor.currentMsg"></ckeditor>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'
Vue.use(CKEditor)

import { state } from './util.js'

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
      state,

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
    internalSessionMsgs() {
      return this.sessionMsgs
    },

    isShowMedicalButton() {
      return this.sessionMsgs && this.sessionMsgs[this.sessionMsgs.length - 1].custom.ext.talkState === state.talkState['未填写病历']
    },

    isShowPrescriptionButton() {
      return this.sessionMsgs && this.sessionMsgs[this.sessionMsgs.length - 1].custom.ext.talkState === state.talkState['已填写病历']
    }
  },

  methods: {
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
          to: this.internalSessionMsgs[this.internalSessionMsgs.length - 1].custom.patients.patientId,
          text: this.ckEditor.currentMsg,
          custom: JSON.stringify(this.internalSessionMsgs[this.internalSessionMsgs.length - 1].custom),
          done: (error, msg) => {
            console.log('消息发送成功', error, msg)

            this.ckEditor.currentMsg = ''

            this.$emit('updateMsgHistory', msg)
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
        to: this.internalSessionMsgs[this.internalSessionMsgs.length - 1].custom.patients.patientId,
        custom: JSON.stringify(this.internalSessionMsgs[this.internalSessionMsgs.length - 1].custom),
        done: (error, msg) => {
          console.log('图片发送成功', error, msg)

          this.$emit('updateMsgHistory', msg)
        }
      })
    },

    // 发送病历
    showMedical() {
      this.$emit('showMedical')
    },

    // 发送处方
    showPrescription() {
      this.$emit('showPrescription')
    },

    clear() {
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

/deep/ .ck-editor__editable {
  height: 160px;
  border-color: #efefef !important;
  border-radius: 0 !important;
}

/deep/.ck.ck-toolbar {
  display: none !important;
}
</style>
