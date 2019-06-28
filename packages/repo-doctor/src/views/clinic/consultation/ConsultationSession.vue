<template>
  <div class="consultation-session">
    <div class="header">
      <div class="header-left">
        <h4>{{ $store.getters['consultation/patientInfo'].familyName }}</h4>
      </div>
      <div class="header-right">
        <el-button type="text">{{ getConsultStatus() }}</el-button>
      </div>
    </div>

    <div class="content">
      <el-alert :closable="false" class="message-notify" show-icon title type="warning" v-if="$store.getters['consultation/consultInfo'].channel">
        <div slot="title" style="color: rgba(102,102,102,1); font-size: 12px; background: rgba(255,170,0,1) rgba(255,255,255,0.9); ">
          <span>你有一个视频会议正在进行中，</span>

          <el-button @click="sendVideo" type="text">点击进入</el-button>
        </div>
      </el-alert>

      <el-alert
        :closable="false"
        class="message-notify"
        show-icon
        title
        type="warning"
        v-if="$store.getters['consultation/consultInfo'].receiveDoctor.find(item => item.doctorId === $store.state.user.userInfo.list.docInfo.doctor_id) && 
             !$store.getters['consultation/consultInfo'].channel "
      >
        <div slot="title" style="color: rgba(102,102,102,1); font-size: 12px; background: rgba(255,170,0,1) rgba(255,255,255,0.9); ">
          <span>
            <span>视频结束后请填写</span>
            <span style="font-weight: bold; ">【会诊意见】</span>
            <span>，提交成功后本次会诊将结束。</span>
          </span>
        </div>
      </el-alert>

      <div class="message-list">
        <el-scrollbar class="message-list-scrollbar">
          <template
            v-if="$peace.consultationComponent.getIntervalStatus($store.state.consultation.session) === $peace.type.CONSULTATION.CONSULTATION_STATUS_EXTEND.距开始"
          >
            <ConsultationSessionToBegin></ConsultationSessionToBegin>
          </template>

          <template
            v-else-if="$peace.consultationComponent.getIntervalStatus($store.state.consultation.session) === $peace.type.CONSULTATION.CONSULTATION_STATUS_EXTEND.距结束"
          >
            <ConsultationSessionToEnd></ConsultationSessionToEnd>
          </template>

          <ConsultationSessionMessageList></ConsultationSessionMessageList>
        </el-scrollbar>
      </div>

      <div class="message-input">
        <ConsultationSessionMessageInput></ConsultationSessionMessageInput>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

import ConsultationSessionToBegin from './ConsultationSessionToBegin'
import ConsultationSessionToEnd from './ConsultationSessionToEnd'
import ConsultationSessionMessageList from './ConsultationSessionMessageList'
import ConsultationSessionMessageInput from './ConsultationSessionMessageInput'

export default {
  components: {
    ConsultationSessionToBegin,
    ConsultationSessionToEnd,
    ConsultationSessionMessageList,
    ConsultationSessionMessageInput
  },

  data() {
    return {}
  },

  computed: {
    consultationStatusToBegin() {
      const session = this.$store.state.consultation.session

      // 等待会诊, 并且当前时间小于期望时间
      if (session && session.content && session.content.consultInfo) {
        if (session.content.consultInfo.consultStatus === peace.type.CONSULTATION.CONSULTATION_STATUS.等待会诊) {
          if (new Date() < new Date(session.content.consultInfo.expectTime)) {
            return true
          }
        }
      }

      return false
    },

    consultationStatusToEnd() {
      const session = this.$store.state.consultation.session

      // 等待会诊, 并且当前时间大于期望时间, 小于期望结束时间
      if (session && session.content && session.content.consultInfo) {
        if (session.content.consultInfo.consultStatus === peace.type.CONSULTATION.CONSULTATION_STATUS.等待会诊) {
          if (new Date() > new Date(session.content.consultInfo.expectTime) && new Date() < new Date(session.content.consultInfo.expectOverTime)) {
            return true
          }
        }
      }

      return false
    },

    consultationStatusToMessageList() {
      const session = this.$store.state.consultation.session

      if (session && session.content && session.content.consultInfo) {
        if (session.content.consultInfo.consultStatus === peace.type.CONSULTATION.CONSULTATION_STATUS.会诊中) {
          return true
        }
      }

      return false
    }
  },

  created() {},

  methods: {
    getConsultStatus() {
      return Object.keys(peace.type.CONSULTATION.CONSULTATION_STATUS).find(
        key => peace.type.CONSULTATION.CONSULTATION_STATUS[key] === this.$store.getters['consultation/consultInfo'].consultStatus
      )
    },

    sendVideo() {
      $peace.consultationVideoComponent.sendVideo()
    }
  }
}
</script>

<style lang="scss" scoped>
$--header-height: 50px;
$--control-height: 150px;

.consultation-session {
  height: 100%;

  .header {
    height: $--header-height;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    border-bottom: 1px solid #f2f2f2;
    background: #f9f9f9;

    .header-left {
      padding: 0 20px;
      display: flex;
      align-items: center;

      h4 {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }

    .header-right {
      display: flex;
      justify-content: center;
      align-items: center;

      margin: 0 10px 0 0;

      h4 {
        margin: 0 20px 0 0;
        font-size: 18px;
        font-weight: 400;
        color: rgba(0, 198, 174, 1);
      }
    }
  }

  .content {
    height: calc(100% - #{$--header-height} - 30px);

    .message-notify {
      height: 30px;
    }

    .message-list {
      height: calc(100% - #{$--control-height});

      .message-list-scrollbar {
        height: 100%;
      }
    }

    .message-input {
      height: $--control-height;
    }
  }
}

.over-dialog {
  /deep/ .el-dialog__header {
    display: none;
  }

  /deep/ .el-dialog__body {
    padding: 20px;
  }
}
</style>

