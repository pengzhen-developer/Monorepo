<template>
  <div class="inquiry">
    <div class="inquiry-left">
      <InquirySessions></InquirySessions>
    </div>
    <div class="inquiry-center"
         v-if="canShowSession">
      <InquirySession></InquirySession>
    </div>
    <div class="inquiry-right"
         v-if="canShowExtend">
      <InquiryPatient></InquiryPatient>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

import InquirySessions from './InquirySessions'
import InquirySession from './InquirySession'
import InquiryPatient from './InquiryPatient'

export default {
  components: {
    InquirySessions,
    InquirySession,
    InquiryPatient
  },

  data() {
    return {
      intervalList: []
    }
  },

  computed: {
    canShowSession() {
      return (
        !!this.$store.state.inquiry?.session?.id &&
        (this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryType === 'image' ||
          this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryType === 'video')
      )
    },

    canShowExtend() {
      return (
        !!this.$store.state.inquiry?.session?.id &&
        (this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryType === 'image' ||
          this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryType === 'video')
      )
    }
  },

  watch: {
    // 监听 sessions 变化
    // 更新定时器
    '$store.state.inquiry.sessions': {
      handler(sessions) {
        // 清理已存在的 sessions interval
        this.intervalList.forEach((intervalObject) => window.clearInterval(intervalObject.intervalValue))
        this.intervalList = []

        // 清理 loading
        this.loading && this.loading.close()

        sessions.forEach((session) => {
          const intervalObject = {
            id: session.id,
            value: undefined,
            intervalValue: undefined
          }
          this.intervalList.push(intervalObject)

          this.intervalHandler(intervalObject, session)
          intervalObject.intervalValue = setInterval(() => this.intervalHandler(intervalObject, session), 500)
        })
      },
      immediate: true
    }
  },

  created() {
    $peace.inquiryComponent = this
  },

  methods: {
    /**
     * 定时器处理方法
     *
     * @export
     * @param {*} intervalObject 引用参数, 定时器直接更新该值
     * @param {*} session
     */
    intervalHandler(intervalObject, session) {
      // 待接诊, 未到自动退诊时间, 倒计时
      if (
        session.content.inquiryInfo.inquiryStatus === peace.type.INQUIRY.INQUIRY_STATUS.待接诊 &&
        new Date() < session.content.inquiryInfo.startTime.toDate().getTime() + peace.type.INQUIRY.自动退诊时间 * 60 * 60 * 1000
      ) {
        const overEndTime = session.content.inquiryInfo.startTime.toDate().getTime() + peace.type.INQUIRY.自动退诊时间 * 60 * 60 * 1000

        intervalObject.value = peace.util.formatDuration(new Date(), overEndTime)
      }

      // 待接诊, 已到到自动退诊时间, 等待服务端同步
      else if (
        session.content.inquiryInfo.inquiryStatus === peace.type.INQUIRY.INQUIRY_STATUS.待接诊 &&
        new Date() > session.content.inquiryInfo.startTime.toDate().getTime() + peace.type.INQUIRY.自动退诊时间 * 60 * 60 * 1000
      ) {
        this.loading = $peace.$loading({
          lock: true,
          text: '正在同步数据，请稍后······',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.05)'
        })

        // 给 30s 时间用来做缓冲
        setTimeout(() => {
          if (this.loading && this.loading.visible) {
            window.location.reload()
          }
        }, 1000 * 3000)
      }

      // 已接诊, 正计时
      else if (session.content.inquiryInfo.inquiryStatus === peace.type.INQUIRY.INQUIRY_STATUS.问诊中) {
        const acceptTime = session.content.inquiryInfo.acceptTime.toDate().getTime()

        intervalObject.value = peace.util.formatDuration(acceptTime, new Date())
      }

      // 异常
      else {
        console.error('【 我的问诊 】【 定时器 】', new Date(), session)
      }
    },

    // 定时器 - 获取问诊时间
    getIntervalValue(session) {
      return session && this.intervalList.find((intervalObject) => intervalObject.id === session.id).value
    }
  }
}
</script>

<style lang="scss" scoped>
.inquiry {
  margin: 0 !important;
  padding: 0 !important;
  display: flex;

  height: calc(100vh - 56px - 40px - 20px);

  .inquiry-left,
  .inquiry-right {
    width: 230px;

    border: 1px solid #efefef;
  }

  .inquiry-center {
    flex: 1;

    border: 1px solid #efefef;
    border-left: none;
    border-right: none;
  }
}
</style>

