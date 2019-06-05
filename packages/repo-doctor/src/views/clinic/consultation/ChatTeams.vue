<template>
  <div class="chat-teams">
    <div class="header">
      <img src="~@/assets/images/icons/clinic/inquirylist_icon.png">
      <span>会诊列表</span>
    </div>

    <div class="body">
      <el-scrollbar class="scrollbar">
        <div
          :class="{ active: chat.team && chat.team.id === team.id }"
          :key="team.id"
          @click="selectTeam(team)"
          class="consultation-item"
          v-for="team in chatTeams"
        >
          <template v-if="team.custom">
            <div class="title">
              <div class="status">
                <!-- 距开始 -->
                <span
                  v-if="team.custom.consultation.consultStatus === 5 && 
                        new Date(team.custom.consultation.expectTime) > new Date()"
                >
                  <i class="icon_ic_wait_groupconsultation"></i>
                  <span>距开始还剩</span>

                  <template v-if="$peace.util.getDuration(new Date(), new Date(team.custom.consultation.expectTime)).dd !== 0">
                    <span style="margin: 0 5px; color: #00C6AE;">{{ duration[team.id] && duration[team.id].dd }} 天</span>
                  </template>

                  <template v-if="$peace.util.getDuration(new Date(), new Date(team.custom.consultation.expectTime)).HH !== 0">
                    <span style="margin: 0 5px; color: #00C6AE;">{{ duration[team.id] && duration[team.id].HH }} 时</span>
                  </template>

                  <template
                    v-if="$peace.util.getDuration(new Date(), new Date(team.custom.consultation.expectTime)).dd === 0 && 
                          $peace.util.getDuration(new Date(), new Date(team.custom.consultation.expectTime)).HH === 0 && 
                          $peace.util.getDuration(new Date(), new Date(team.custom.consultation.expectTime)).mm !== 0"
                  >
                    <span style="margin: 0 5px; color: #00C6AE;">{{ duration[team.id] && duration[team.id].mm }} 分</span>
                  </template>

                  <template
                    v-if="$peace.util.getDuration(new Date(), new Date(team.custom.consultation.expectTime)).dd === 0 && 
                          $peace.util.getDuration(new Date(), new Date(team.custom.consultation.expectTime)).HH === 0 && 
                          $peace.util.getDuration(new Date(), new Date(team.custom.consultation.expectTime)).mm === 0"
                  >
                    <span style="margin: 0 5px; color: #00C6AE;">{{ duration[team.id] && duration[team.id].ss }} 秒</span>
                  </template>
                </span>

                <!-- 距关闭 -->
                <span
                  v-else-if="team.custom.consultation.consultStatus === 5 && 
                             new Date() > new Date(team.custom.consultation.expectTime) && 
                             new Date() < new Date(team.custom.consultation.expectOverTime)"
                >
                  <i class="icon_ic_wait_groupconsultation"></i>
                  <span>距关闭还剩</span>
                  <template v-if="durationEnd[team.id] && durationEnd[team.id].mm !== 0">
                    <span style="color: #FF0000;">{{ durationEnd[team.id] && durationEnd[team.id].mm }} 分</span>
                  </template>

                  <template v-if="durationEnd[team.id] && durationEnd[team.id].mm === 0">
                    <span style="color: #FF0000;">{{ durationEnd[team.id] && durationEnd[team.id].ss }} 秒</span>
                  </template>
                </span>

                <!-- 会诊中 -->
                <span style="color: #00C6AE;" v-else-if="team.custom.consultation.consultStatus === 6">
                  <i class="icon_ic_ing_groupconsultation"></i>
                  <span>{{ consultStatus.find(item => item.consultStatus === team.custom.consultation.consultStatus).consultTxt }}</span>
                </span>

                <!-- 例外情况 -->
                <span v-else>
                  <span>会诊超时 - 请处理</span>
                </span>
              </div>
              <div class="time">
                <span></span>
              </div>
            </div>

            <div class="doctor">
              <!-- 我发起的会诊 -->
              <template v-if="team.custom.consultation.startDoctor[0].doctorId === user.userInfo.list.docInfo.doctor_id">
                <span>受邀医生：</span>
                <span class="name">{{ team.custom.consultation.receiveDoctor.map(item => item.doctorName).toString() }}</span>
                <el-tag type="parmary">我邀请的</el-tag>
              </template>

              <!-- 我受邀的会诊 -->
              <template v-else>
                <span>发起医生：</span>
                <span class="name">{{ team.custom.consultation.startDoctor.map(item => item.doctorName).toString() }}</span>
                <el-tag type="parmary">邀请我的</el-tag>
              </template>
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
  inject: ['consultStatus'],

  data() {
    return {
      config,

      durationInterval: [],
      durationEnd: {},
      duration: {}
    }
  },

  computed: {
    ...mapState(['chat', 'user']),

    chatTeams() {
      const teams = $peace.util.clone(this.chat.teams)

      return teams.filter(item => item.custom && (item.custom.consultation.consultStatus === 5 || item.custom.consultation.consultStatus === 6))
    }
  },

  watch: {
    chatTeams: {
      handler(newValue) {
        // 移除所有定时器
        this.durationInterval.forEach(interval => window.clearInterval(interval))
        this.durationInterval = []
        this.duration = {}
        this.durationEnd = {}

        if (newValue) {
          this.chatTeams.forEach(team => {
            const intervalHander = () => {
              if (new Date() < new Date(team.custom.consultation.expectTime)) {
                const duration = $peace.util.getDuration(new Date(), new Date(team.custom.consultation.expectTime))
                this.$set(this.duration, team.id, duration)
              } else {
                this.$set(this.duration, team.id, undefined)
              }

              if (new Date() < new Date(team.custom.consultation.expectOverTime)) {
                const durationEnd = $peace.util.getDuration(new Date(), new Date(team.custom.consultation.expectOverTime))
                this.$set(this.durationEnd, team.id, durationEnd)
              } else {
                this.$set(this.durationEnd, team.id, undefined)
              }
            }

            intervalHander()
            this.durationInterval.push(setInterval(intervalHander, 1000))
          })
        }
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions('chat', ['selectTeam'])
  },

  destroyed() {
    this.durationInterval.forEach(interval => window.clearInterval(interval))
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

      &.active {
        background: #f4f4f4;
      }

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 0 12px 0;

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

