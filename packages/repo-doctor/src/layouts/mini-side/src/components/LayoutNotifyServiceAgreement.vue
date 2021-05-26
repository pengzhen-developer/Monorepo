<template>
  <div>
    <PeaceDialog v-bind:visible="visible"
                 v-bind:show-close="false"
                 v-bind:title="title">
      <div class="q-mb-md">
        <span>最近更新日期：</span>
        <span>{{ updatedTime }}</span>
      </div>

      <div class="q-mb-md service-agreement__virtual_box">
      </div>

      <div class="flex justify-end">
        <el-button v-on:click="cancel">关闭并退出</el-button>
        <el-button type="primary"
                   v-on:click="agree">同意并继续</el-button>
      </div>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './../service'
import Util from '@src/util'

export default {
  data() {
    return {
      visible: false,

      agreementId: '',
      title: '',
      content: '',
      updatedTime: ''
    }
  },

  mounted() {
    this.get()
  },

  methods: {
    get() {
      Service.getAgreement().then((res) => {
        if (!res.data.status) {
          this.visible = true

          // iframe 隔离样式
          this.$nextTick().then(() => {
            this.agreementId = res.data.agreementId
            this.title = res.data.title
            this.content = res.data.content
            this.updatedTime = res.data.updatedTime

            // get your div tag as HTML string
            const HTMLToIsolate = res.data.content
            // or something else
            const parentContainerRef = document.querySelector('.service-agreement__virtual_box')
            const newIframe = document.createElement('iframe')

            // set height & width to 100% and remove borders for newIframe
            parentContainerRef.appendChild(newIframe)
            newIframe.style.width = '100%'
            newIframe.style.height = '100%'
            newIframe.style.border = 0
            newIframe.contentWindow.document.open('text/html', 'replace')
            newIframe.contentWindow.document.write(HTMLToIsolate)
            newIframe.contentWindow.document.close()

            // bonus to remove scroll bars by setting proper iframe's height
            newIframe.addEventListener('load', function() {
              const iframeBody = this.contentDocument.querySelector('body')
              this.style.height = `${iframeBody.scrollHeight}px`
              iframeBody.style.overflow = 'hidden'
              iframeBody.style.margin = '0'
              iframeBody.style.padding = '0'
            })
          })
        }
      })
    },

    agree() {
      Service.agreeAgreement({ agreementId: this.agreementId }).then(() => {
        this.visible = false
      })
    },

    cancel() {
      Util.user.removeUserInfo()
      Util.location.redirectToLogin()
    }
  }
}
</script>

<style>
.serivce-agreement__no-header .el-dialog__header {
  display: none !important;
}
</style>