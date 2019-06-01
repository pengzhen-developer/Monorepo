<template>
  <div>
    <div>
      <!-- 距开始 -->
      <template v-if="teamStatus === TEAM_STATUS.距开始">
        <div class="consultation-content">
          <div class="consultation-status">
            <div class="clock">
              <img src="~@/assets/images/icons/clinic/electronicmedical_icon.png">
            </div>

            <div class="count-down">
              <span>距会诊开始时间还剩</span>
              <span class="count-down-time">
                <span>{{ $peace.util.getDuration(new Date(), new Date(chat.team.custom.consultation.expectTime)).dd }} 天</span>
                <span>{{ $peace.util.getDuration(new Date(), new Date(chat.team.custom.consultation.expectTime)).HH }} 小时</span>
              </span>
            </div>
            <div class="count-down-message">
              <span>请在</span>
              <span class="count-down-time">
                <span>{{ chat.team.custom.consultation.expectTime.toDate().formatDate('yyyy-MM-dd HH:mm') }}</span>
                <span>-</span>
                <span>{{ chat.team.custom.consultation.expectOverTime.toDate().formatDate('HH:mm') }}</span>
              </span>
              <span>发起视频会诊，超期系统将自动关闭会诊单</span>
            </div>
          </div>
        </div>
      </template>

      <!-- 距关闭 -->
      <template v-if="teamStatus === TEAM_STATUS.距结束">
        <div class="consultation-status danger">
          <div class="clock">
            <img src="~@/assets/images/icons/clinic/electronicmedical_icon.png">
          </div>

          <div class="count-down">
            <span>距会诊关闭时间还剩</span>
            <span class="count-down-time">{{ $peace.util.getDuration(new Date(), new Date(chat.team.custom.consultation.expectOverTime)).mm }} 分</span>
          </div>
          <div class="count-down-message">请尽快发起视频会诊，超期系统将自动关闭会诊单</div>
        </div>
      </template>

      <!-- 会诊中 -->
      <template v-if="teamStatus === TEAM_STATUS.会诊中">会诊中</template>
    </div>

    <template v-if="chat.teamMsgs">
      <div :key="item.time" v-for="item in chat.teamMsgs.msgs">{{ item.text }}</div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const TEAM_STATUS = {
  距开始: '距开始',
  距结束: '距结束',
  会诊中: '会诊中'
}

export default {
  data() {
    return {
      TEAM_STATUS
    }
  },

  computed: {
    ...mapState(['chat']),

    // 获取当前群组（会诊）状态
    teamStatus() {
      const consultStatus = this.chat.team.custom.consultation.consultStatus
      const expectTime = this.chat.team.custom.consultation.expectTime
      const expectOverTime = this.chat.team.custom.consultation.expectOverTime

      if (consultStatus === 5) {
        if (new Date() < new Date(expectTime)) {
          return TEAM_STATUS.距开始
        }

        if (new Date() > new Date(expectTime) && new Date() < new Date(expectOverTime)) {
          return TEAM_STATUS.距结束
        }
      }

      if (consultStatus === 6) {
        return TEAM_STATUS.会诊中
      }

      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.consultation-content {
  padding: 40px 20px;
}

.consultation-status {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f0fcfa;

  width: 100%;
  height: 160px;
  background: rgba(240, 252, 250, 1);
  border-radius: 6px;

  &.danger {
    background: #fff0f0;

    .count-down {
      .count-down-time {
        color: #ff0000;
      }
    }
  }

  .clock img {
    width: 35px;
    height: 35px;
    margin: 0 0 20px 0;
  }

  .count-down {
    text-align: center;

    font-size: 18px;
    font-weight: 400;
    color: #666666;
    margin: 0 0 5px 0;
  }

  .count-down-time {
    font-size: 20px;
    color: #00c6ae;
    margin: 0 10px;
  }

  .count-down-message {
    color: #666666;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
