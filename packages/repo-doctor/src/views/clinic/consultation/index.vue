
<template>
  <div class="consultation">
    <div class="consultation-left">
      <ConsultationSessions></ConsultationSessions>
    </div>
    <div class="consultation-center"
         v-if="$store.state.consultation.session && $store.state.consultation.session.id">
      <ConsultationSession></ConsultationSession>
    </div>
    <div class="consultation-right"
         v-if="$store.state.consultation.session && $store.state.consultation.session.id && 
               $store.getters['consultation/consultInfo'].consultStatus !== $peace.type.CONSULTATION.CONSULTATION_STATUS.医生待审核">
      <ConsultationPatient></ConsultationPatient>
    </div>
  </div>
</template>

<script>
import ConsultationSessions from './ConsultationSessions'
import ConsultationSession from './ConsultationSession'
import ConsultationPatient from './ConsultationPatient'

export default {
  components: {
    ConsultationSessions,
    ConsultationSession,
    ConsultationPatient
  },

  data() {
    return {
      intervalList: [],

      notifyList: []
    }
  },

  watch: {
    // 监听 sessions 变化
    // 更新定时器
    '$store.state.consultation.sessions': {
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
            status: undefined,
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
    $peace.consultationComponent = this
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
      // 等待会诊, 未到期望时间, 显示倒计时
      if (
        session.content.consultInfo.consultStatus === peace.type.CONSULTATION.CONSULTATION_STATUS.医生待审核 &&
        new Date() < dayjs(session.content.consultInfo.expectTime).toDate()
      ) {
        const overEndTime = session.content.consultInfo.expectTime.toDate().getTime()

        const durationObject = peace.util.getDuration(new Date(), overEndTime)

        // 时间从大到小显示
        if (durationObject.dd > 0) {
          intervalObject.value = `${durationObject.dd} 天 ${durationObject.HH} 时 `
        } else if (durationObject.HH > 0) {
          intervalObject.value = `${durationObject.HH} 时 ${durationObject.mm} 分 `
        } else if (durationObject.mm > 0) {
          intervalObject.value = `${durationObject.mm} 分`
        } else if (durationObject.ss > 0) {
          intervalObject.value = `${durationObject.ss} 秒`
        }

        intervalObject.status = peace.type.CONSULTATION.CONSULTATION_STATUS_EXTEND.距开始
      }

      // 等待接诊, 已到期望时间, 未到结束时间, 显示会诊结束倒计时
      else if (
        session.content.consultInfo.consultStatus === peace.type.CONSULTATION.CONSULTATION_STATUS.医生待审核 &&
        new Date() > dayjs(session.content.consultInfo.expectTime).toDate() &&
        new Date() < dayjs(session.content.consultInfo.expectOverTime).toDate()
      ) {
        const overEndTime = session.content.consultInfo.expectOverTime.toDate().getTime()

        const durationObject = peace.util.getDuration(new Date(), overEndTime)

        // 时间从大到小显示
        if (durationObject.dd > 0) {
          intervalObject.value = `${durationObject.dd} 天 ${durationObject.HH} 时 `
        } else if (durationObject.HH > 0) {
          intervalObject.value = `${durationObject.HH} 时 ${durationObject.mm} 分 `
        } else if (durationObject.mm > 0) {
          intervalObject.value = `${durationObject.mm} 分`
        } else if (durationObject.ss > 0) {
          intervalObject.value = `${durationObject.ss} 秒`
        }

        intervalObject.status = peace.type.CONSULTATION.CONSULTATION_STATUS_EXTEND.距结束
      }

      // 会诊中, 显示正记时
      else if (session.content.consultInfo.consultStatus === peace.type.CONSULTATION.CONSULTATION_STATUS.会诊中) {
        const overEndTime = session.content.consultInfo.startTime.toDate().getTime()

        intervalObject.value = peace.util.getDuration(overEndTime, new Date())
        intervalObject.status = peace.type.CONSULTATION.CONSULTATION_STATUS_EXTEND.会诊中
      }
    },

    getConsultStatus() {
      return Object.keys(peace.type.CONSULTATION.CONSULTATION_STATUS).find(
        (key) => peace.type.CONSULTATION.CONSULTATION_STATUS[key] === this.$store.getters['consultation/consultInfo'].consultStatus
      )
    },

    // 定时器 - 获取会诊时间
    getIntervalValue(session) {
      return session && this.intervalList.find((intervalObject) => intervalObject.id === session.id).value
    },

    // 定时器 - 获取会诊状态
    getIntervalStatus(session) {
      return session && this.intervalList.find((intervalObject) => intervalObject.id === session.id).status
    }
  }
}
</script>

<style lang="scss" scoped>
.consultation {
  margin: 0 !important;
  padding: 0 !important;
  display: flex;

  height: calc(100vh - 56px - 40px - 20px);

  .consultation-left {
    width: 230px;

    border: 1px solid #efefef;
  }

  .consultation-right {
    width: 230px;

    border: 1px solid #efefef;
    border-left: none;
  }

  .consultation-center {
    flex: 1;

    border: 1px solid #efefef;
    border-left: none;
  }
}
</style>

