<template>
  <div class="chat-teams">
    <div class="header">
      <img src="~@/assets/images/icons/clinic/inquirylist_icon.png">
      <span>会诊列表</span>
    </div>

    <div class="body">
      <el-scrollbar class="scrollbar">
        <div :key="team.id" @click="selectTeam(team)" class="consultation-item" v-for="team in chat.teams">
          <template v-if="team.custom">
            <div class="title">
              <div class="status">
                <i class="el-icon-alarm-clock"></i>
                <span>根据会诊状态变更</span>
              </div>
              <div class="time">
                <span>{{ team.custom.consultation.consultStatus }}</span>
              </div>
            </div>

            <div class="title">
              <div class="status">
                <i class="el-icon-alarm-clock"></i>
                <!-- 距开始 -->
                <span v-if="team.custom.consultation.consultStatus === 5 && 
                      new Date(team.custom.consultation.expectTime) > new Date()">
                  <span>距开始还剩</span>
                  <span>{{ $peace.util.getDuration(new Date(), new Date(team.custom.consultation.expectTime)).dd }} 天</span>
                  <span>{{ $peace.util.getDuration(new Date(), new Date(team.custom.consultation.expectTime)).HH }} 小时</span>
                </span>

                <!-- 距关闭 -->
                <span
                  v-if="team.custom.consultation.consultStatus === 5 && 
                      new Date() > new Date(team.custom.consultation.expectTime) && 
                      new Date() < new Date(team.custom.consultation.expectOverTime)"
                >距关闭还剩 {{ $peace.util.getDuration(new Date(), new Date(team.custom.consultation.expectOverTime)).dd }} 天 {{ $peace.util.getDuration(new Date(), new Date(team.custom.consultation.expectOverTime)).HH }} 小时</span>

                <!-- 会诊中 -->
                <span v-if="team.custom.consultation.consultStatus === 6">会诊中</span>
              </div>
              <div class="time">
                <span>10:12</span>
              </div>
            </div>

            <div class="doctor">
              <span>申请医生：</span>
              <span class="name">{{ team.custom.consultation.startDoctor[0].doctorName }}</span>
              <el-tag type="parmary">{{ team.custom.consultation.startDoctor[0].doctorId === user.userInfo.list.docInfo.doctor_id ? '我邀请的' : '邀请我的'}}</el-tag>
            </div>
            <div class="patient">
              <span>患者信息：</span>
              <span>{{ team.custom.patient.familyName }}</span>
              <span>{{ team.custom.patient.familySex }}</span>
              <span>{{ team.custom.patient.familyAge }}岁</span>
            </div>
          </template>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import config from './config'

export default {
  computed: {
    ...mapState(['chat', 'user'])
  },

  data() {
    return {
      config
    }
  },

  methods: {
    ...mapActions('chat', ['selectTeam'])
  }
}
</script>

<style lang="scss" scoped>
.chat-teams {
  .header {
    height: 50px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: 1px solid #f2f2f2;
    background: rgba(255, 255, 255, 1);

    img {
      margin: 0 10px 0 0;
    }
  }

  .body {
    height: calc(100% - 50px);

    .scrollbar {
      height: 100%;
      overflow: hidden;
    }

    .consultation-item {
      cursor: pointer;
      border-bottom: 1px solid #efefef;
      padding: 0 10px;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 0 12px 0;
        color: #00c6ae;

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

      .doctor {
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

      .patient {
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
}
</style>

