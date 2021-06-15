<template>
  <div>
    <PeaceDialog v-bind:visible="visible"
                 v-bind:show-close="false">
      <div class="text-h5 q-mb-sm">{{ title }}</div>
      <div class="q-mb-md">
        <span>最近更新日期：</span>
        <span>{{ updatedTime }}</span>
      </div>

      <div class="q-mb-md service-agreement__virtual_box"
           v-html="content"></div>

      <div slot="footer">
        <el-button v-on:click="cancel">关闭并退出</el-button>

        <PeaceCountdown class="q-mx-12"
                        v-bind:time="countdownTime"
                        v-on:end="showCountdown = false">
          <template slot-scope="props">
            <el-button type="primary"
                       v-bind:disabled="showCountdown"
                       v-on:click="agree">
              <span>同意并继续</span>
              <span v-if="showCountdown"> ({{ parseInt(props.minutes * 60) + parseInt(props.seconds) }}s) </span>
            </el-button>

          </template>
        </PeaceCountdown>
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

      showCountdown: true,
      countdownTime: 1000 * 15,

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
