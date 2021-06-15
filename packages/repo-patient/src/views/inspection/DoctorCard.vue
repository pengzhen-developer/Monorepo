<template>
  <div class="doctor">
    <div class="doctor-logo">
      <van-image round
                 v-bind:src="doctorInfo.photoDoc"></van-image>
    </div>
    <div class="doctor-body">
      <div class="doctor-name">
        {{ doctorInfo.doctorName }}
        <span class="doctor-small">
          {{ doctorInfo.doctorTitle }}
        </span>
        <span class='type-tag'
              v-if="typeText">{{typeText}}</span>
        <van-image v-if="serviceType==='image'|| serviceType === 'returnVisit'"
                   :src="require('@src/assets/images/icons/icon_01_01_06.jpg')"></van-image>
        <van-image v-if="serviceType==='video'"
                   :src="require('@src/assets/images/icons/icon_01_01_07.jpg')"></van-image>
      </div>

      <div class="doctor-hospitalName">
        <span class="doctor-small">
          {{ doctorInfo.netdeptChild }} |
        </span>
        {{ doctorInfo.hospitalName }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorCard',
  props: {
    doctorInfo: Object,
    serviceType: String,
    typeText: String
  }
}
</script>

<style lang="scss" scoped>
.doctor {
  display: flex;
  .doctor-logo {
    .van-image {
      width: 60px;
      height: 60px;
      border: 1px solid #eee;
      margin-right: 16px;
    }
  }
  .doctor-body {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .doctor-name {
      line-height: 24px;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #333333;
      display: flex;
      align-items: center;
      .van-image {
        width: 12px;
        height: 12px;
        margin-left: 4px;
      }

      .type-tag {
        height: 24px;
        padding: 3px 4px 4px 6px;
        border-radius: 8px 8px 8px 0px;
        display: flex;
        align-items: center;
        line-height: 1;
        color: #fff;
        font-size: 12px;
        font-weight: 400;
        margin-left: 4px;
        background-color: #00c6ae;
      }
    }
    .doctor-small {
      line-height: 24px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: normal;
      color: #333333;
      margin-left: 4px;
    }
    .doctor-hospitalName {
      margin-top: 8px;
      line-height: 20px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: normal;
      color: #333333;
    }
  }
}
</style>