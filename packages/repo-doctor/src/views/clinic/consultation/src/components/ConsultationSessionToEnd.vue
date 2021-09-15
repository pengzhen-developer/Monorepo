<template>
  <div class="consultation-session-to-begin">
    <div class="consultation-content">
      <div class="consultation-status danger">
        <div class="clock">
          <img src="~@/assets/images/inquiry/ic_daojishi_red@2x.png" />
        </div>

        <div class="count-down">
          <span>距会诊结束时间还剩</span>
          <span class="count-down-time">
            <span style="margin: 0 5px; color: #FF0000;">{{ Peace.consultationComponent.getIntervalValue($store.state.consultation.session) }}</span>
          </span>
        </div>
        <div class="count-down-message">
          <span>请尽快发起视频会诊，超期系统将自动关闭会诊单</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.consultation-session-to-begin {
  .consultation-content {
    padding: 40px 20px;

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

        font-size: 16px;
        font-weight: 400;
        color: #333;
        margin: 0 0 5px 0;
      }

      .count-down-time {
        font-size: 18px;
        color: #3099a6;
      }

      .count-down-message {
        color: #333;
        font-size: 14px;
        font-weight: 400;

        display: flex;
        align-items: center;
      }
    }
  }
}
</style>

