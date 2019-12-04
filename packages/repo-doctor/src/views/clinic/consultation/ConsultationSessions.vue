<template>
  <div class="consultation-sessions">
    <div class="header">
      <img src="~@src/assets/images/inquiry/inquirylist_icon.png" />
      <span>会诊列表</span>
    </div>

    <div class="body"
         v-if="$store.state.consultation.sessions && $store.state.consultation.sessions.length > 0">
      <el-scrollbar class="body-scrollbar">
        <div :class="{ active: $store.state.consultation.session && $store.state.consultation.session.id === session.id }"
             :key="session.id"
             @click="selectSession(session)"
             class="consultation"
             v-for="session in $store.state.consultation.sessions">
          <div class="consultation-title">
            <div class="status">
              <!-- 距开始 -->
              <div v-if="$peace.consultationComponent.getIntervalStatus(session) === $peace.type.CONSULTATION.CONSULTATION_STATUS_EXTEND.距开始">
                <i class="icon_ic_wait_groupconsultation"></i>
                <span>距开始还剩</span>

                <span style="margin: 0 5px; color: #00C6AE;">{{ $peace.consultationComponent.getIntervalValue(session) }}</span>
              </div>

              <!-- 距结束 -->
              <div v-else-if="$peace.consultationComponent.getIntervalStatus(session) === $peace.type.CONSULTATION.CONSULTATION_STATUS_EXTEND.距结束">
                <i class="icon_ic_wait_groupconsultation"></i>
                <span>距关闭还剩</span>

                <span style="margin: 0 5px; color: #FF0000;">{{ $peace.consultationComponent.getIntervalValue(session) }}</span>
              </div>

              <div v-else-if="$peace.consultationComponent.getIntervalStatus(session) === $peace.type.CONSULTATION.CONSULTATION_STATUS_EXTEND.会诊中">
                <i class="icon_ic_ing_groupconsultation"></i>
                <span style="color: #00C6AE;">会诊中</span>
              </div>
            </div>
            <div class="time">
              <span></span>
            </div>
          </div>

          <div class="consultation-doctor">
            <!-- 发起方 -->
            <template v-if="session.content.consultInfo.startDoctor.find(item => item.doctorId === $store.state.user.userInfo.list.docInfo.doctor_id)">
              <span>受邀医生：</span>
              <span class="name">{{ session.content.consultInfo.receiveDoctor.map(item => item.doctorName).toString() }}</span>
              <el-tag type="parmary">我邀请的</el-tag>
            </template>

            <!-- 受邀方 -->
            <template v-if="session.content.consultInfo.receiveDoctor.find(item => item.doctorId === $store.state.user.userInfo.list.docInfo.doctor_id)">
              <span>发起医生：</span>
              <span class="name">{{ session.content.consultInfo.startDoctor.map(item => item.doctorName).toString() }}</span>
              <el-tag type="parmary">邀请我的</el-tag>
            </template>
          </div>
          <div class="consultation-patient">
            <span>患者信息：</span>
            <span>{{ session.content.patientInfo.familyName }}</span>
            <span>{{ session.content.patientInfo.familySex }}</span>
            <span>{{ session.content.patientInfo.familyAge }}岁</span>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="body-no-data"
         v-else>
      <img src="~@src/assets/images/inquiry/ic_no one.png" />
      <span>暂无会诊</span>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  methods: {
    getLastMessage(session) {
      const messageType = session.lastMsg.type

      switch (messageType) {
        case 'text':
          return session.lastMsg.text
        case 'image':
          return '【图片】'
        case 'video':
          return '【视频】'
        case 'custom':
          if (
            session.lastMsg.content &&
            session.lastMsg.content.data &&
            session.lastMsg.content.data.showTextInfo
          ) {
            return session.lastMsg.content.data.showTextInfo.doctorClientText
          }
      }
    },

    selectSession(session) {
      const doneHandler = (error, message) => {
        console.warn('【 IM 】【 getHistoryMsgs 】', new Date(), message)

        if (error) {
          throw new Error(error)
        }

        peace.service.IM.resetConsultationSession()
        peace.service.IM.resetConsultationSessionMessages()

        peace.service.IM.setConsultationSession(session)
        peace.service.IM.setConsultationSessionMessages(message.msgs)
      }

      // 重置会话未读数
      // $peace.NIM.resetSessionUnread(session.id)
      // 获取本次会诊历史消息
      $peace.NIM.getHistoryMsgs({
        scene: session.scene,
        to: session.to,
        done: doneHandler
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$--header-height: 50px;

.consultation-sessions {
  height: 100%;

  .header {
    height: $--header-height;

    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: 1px solid #f2f2f2;

    img {
      margin: 0 10px 0 0;
    }
  }

  .body {
    height: calc(100% - #{$--header-height});

    .body-scrollbar {
      height: 100%;
    }

    .consultation {
      padding: 10px;
      border-bottom: 1px solid #efefef;
      cursor: pointer;

      &.active {
        background: rgba(244, 244, 244, 1);
      }

      .consultation-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 0 12px 0;

        .status {
          font-weight: 400;
          i {
            margin: 0 6px 0 0;
          }
        }

        .time {
          font-size: 12px;
          color: rgba(153, 153, 153, 1);
        }
      }

      .consultation-doctor {
        padding: 0 0 8px 0;
        font-size: 12px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);

        .name {
          font-weight: 800;
          color: rgba(51, 51, 51, 1);
        }

        .el-tag {
          margin: 0 0 0 6px;
          font-size: 12px;
          background: #fff;

          height: 16px;
          padding: 0 5px;
          line-height: 14px;
        }
      }

      .consultation-patient {
        padding: 0 0 12px 0;
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);

        span {
          margin: 0 6px 0 0;

          &:first-child {
            margin: 0;
          }
        }
      }
    }
  }

  .body-no-data {
    height: calc(100% - 50px);

    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;

    span {
      margin: 20px 0 0 0;
      color: rgba(155, 155, 155, 1);
    }
  }
}
</style>

