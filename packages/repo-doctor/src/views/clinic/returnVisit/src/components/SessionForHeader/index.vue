<template>
  <div class="flex justify-between items-center header q-px-md bg-grey-2">
    <span class="q-mr-md text-subtitle1">{{ patientInfo.familyName }}</span>

    <el-button v-if="invoke.showInvokeExtDLL"
               v-on:click="invokeExtDLL">查看医保记录</el-button>

    <!-- 模态框 - 填写拒绝原因 -->
    <PeaceDialog width="348px"
                 top="25vh"
                 class="no-header"
                 v-if="overInquiryVisible"
                 v-bind:visible.sync="overInquiryVisible">
      <OverInquiry v-on:close="overInquiryVisible = false"></OverInquiry>
    </PeaceDialog>

    <PeaceDialog width="440px"
                 title="异常提示"
                 v-bind:visible.sync="invoke.visible">
      <div class="q-pa-md">
        <p class="text-bold q-mb-sm">医保记录调取失败，失败原因可能有：</p>
        <p>1. 电脑未安装“就医信息共享系统”程序，请联系信息科处理。 </p>
        <p>2. 应用程序未启动，请先打开程序。 </p>
        <p>3. 可能网络问题，请确认网络环境正常。 </p>

        <div class="q-mt-lg text-center">
          <el-button style="width: 120px;"
                     type="primary"
                     v-on:click="invoke.visible = false">知道了</el-button>
        </div>
      </div>
    </PeaceDialog>
  </div>
</template>

<script>
import type from '@src/type'

import Service from './../../service'
import OverInquiry from './OverInquiry'

export default {
  components: {
    OverInquiry
  },

  data() {
    return {
      invoke: {
        visible: false,

        showInvokeExtDLL: false,
        canInvokeExtDLL: false,
        invokeExtDLLInfo: {}
      },

      overInquiryVisible: false
    }
  },

  computed: {
    session() {
      return this.$store.state.inquiry?.session ?? {}
    },

    patientInfo() {
      return this.session?.content?.patientInfo ?? {}
    },

    canShowOver() {
      return this.$store.state?.inquiry?.session?.content?.inquiryInfo?.inquiryStatus === type.INQUIRY.INQUIRY_STATUS.问诊中
    }
  },

  watch: {
    '$store.state.inquiry.session': {
      handler() {
        const inquiryNo = this.$store.state.inquiry.session.content.inquiryInfo.inquiryNo

        Service.getExtDllInfo({ inquiryNo }).then((res) => {
          this.invoke.showInvokeExtDLL = res.data.isShow
          this.invoke.canInvokeExtDLL = res.data.isOpen

          this.invoke.invokeExtDLLInfo = res.data.businessInfo
        })
      },
      immediate: true
    }
  },

  methods: {
    overInquiry() {
      this.overInquiryVisible = true
    },

    async invokeExtDLL() {
      if (!this.invoke.canInvokeExtDLL) {
        return Peace.util.warning('该就诊人为自费支付，不需要核查医保用药记录')
      }

      // 获取调用地址，并调用本地应用程序
      const invokeExtDLLUrlList = await Peace.identity.dictionary.getList('ext_url')
      const invokeExtDLLOrigin = invokeExtDLLUrlList.find((item) => item.label === 'dll_invoke_url_yh')?.value
      const invokeExtDLLAPI = `${invokeExtDLLOrigin}/`

      Peace.http
        .create()
        .get(invokeExtDLLAPI, { params: { ...this.invoke.invokeExtDLLInfo }, timeout: 5000 })
        .then((res) => {
          if (res.data.Code !== 200) {
            Peace.util.alert(res.data.Msg)

            this.invoke.visible = true
          }
        })
        .catch(() => {
          this.invoke.visible = true
        })
    }
  }
}
</script>



<style lang="scss" scoped>
.no-header {
  ::v-deep .el-dialog__header {
    display: none;
  }

  ::v-deep .el-dialog__body {
    padding: 20px;
  }
}
</style>