<template>
  <div class="referral">
    <div class="order-status">
      <div class="row-title">订单状态：</div>
      <div class="order-status-content">
        <div>{{ info.transfer_status | getEnumLable(source.referralStatus)  }}</div>
        <div class="spec-row"
             v-if="info.out_check_suggest || info.in_check_suggest">
          <span v-if="parseInt(info.transfer_status) <= 3">{{ info.out_check_suggest }}</span>
          <span v-else>{{ info.in_check_suggest }}</span>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="row-title">转出信息</div>
      <div class="info-row">
        <div class="info-row-label">
          <span>就/复诊人</span>
        </div>
        <div class="info-row-content">
          <span>{{ info.patient_name }}</span>
          <span>{{ info.sex }}</span>
          <span v-if="info.age">{{ info.age }}</span>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>转出医师</span>
        </div>
        <div class="info-row-content doctor">
          <div class="doctor-pic">
            <img class="round-img"
                 alt="医生头像"
                 :src="info.outDocAvartor" />
          </div>
          <div class="doctor-info">
            <span class="title">
              <strong>{{ info.out_doctor_name }}</strong>
            </span>
            <span>{{ info.out_doctor_title }}</span>
            <span>{{ info.out_netdept_child }}</span>
            <!-- <span><img src="" alt=""></span> -->
            <div>
              <span>{{ info.out_netHospital_name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label">就诊时间</div>
        <div class="info-row-content">{{ info.inquiry_created_time }}</div>
      </div>
      <div class="info-row">
        <div class="info-row-label">初步诊断</div>
        <div class="info-row-content">{{ info.diagnose }}</div>
      </div>
      <div class="info-row">
        <div class="info-row-label">转诊原因</div>
        <div class="info-row-content spec-row">
          <span>{{ info.referral_cause }}</span>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label t-6">
          <span>申请提交时间</span>
        </div>
        <div class="info-row-content">{{ info.created_time }}</div>
      </div>
    </div>
    <div class="info">
      <div class="row-title">转入信息</div>
      <div class="info-row">
        <div class="info-row-label">
          <span>转入医师</span>
        </div>
        <div class="info-row-content doctor">
          <div class="doctor-pic">
            <img class="round-img"
                 alt="医生头像"
                 :src="info.inDocAvartor" />
          </div>
          <div class="doctor-info">
            <span class="title">
              <strong>{{ info.in_doctor_name }}</strong>
            </span>
            <span>{{ info.in_doctor_title }}</span>
            <span>{{ info.in_netdept_child }}</span>
            <div>
              <span>{{ info.in_netHospital_name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label t-6">
          <span>期望转诊时间</span>
        </div>
        <div class="info-row-content">{{ info.expect_time }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import Constant from '../constant'
export default {
  name: 'referral-info',
  props: {
    info: Object
  },
  data() {
    return {
      source: {
        referralStatus: Constant.REFERRAL_STATUS
      }
    }
  },
  filters: {
    getEnumLable: (value, ENUM) => {
      return ENUM.find((item) => item.value == value)?.label
    }
  }
}
</script>
<style lang="scss" scoped>
.info-row {
  font-size: 0;
  display: flex;
  .info-row-label,
  .info-row-content {
    font-size: 14px;
    line-height: 28px;
    display: inline-block;
    vertical-align: middle;
  }
  .info-row-label {
    color: #778899;
    white-space: nowrap;
    & > span {
      width: 4.3em;
      text-align: right;
      text-align-last: justify;
      text-align: justify;
      text-justify: distribute-all-lines;
      display: inline-block;
    }
    &.t-6 > span {
      width: 6em;
    }
    &.t-6 + .info-row-content {
      width: calc(100% - 7em);
    }
    &.t-7 > span {
      width: 7em;
    }
    &.t-7 + .info-row-content {
      width: calc(100% - 8em);
    }
    &:after {
      content: '：';
    }
  }
  .info-row-content {
    padding-left: 2px;
    width: calc(100% - 1em - 4.3em);
    font-weight: bold;
    word-break: break-all;
    color: #23313f;
    & > img {
      height: 20px;
      display: block;
    }
  }
  &.two-cols {
    .info-row-label.t-6 + .info-row-content {
      width: calc(50% - 7em);
    }
    .info-row-content {
      width: calc(50% - 1em - 4.3em);
    }
  }
}
.referral {
  .info > .row-title {
    margin-top: 10px;
    font-size: 16px;
    line-height: 1.75;
    border-bottom: 1px solid #eee;
  }
  .order-status {
    .row-title,
    &-content {
      font-size: 16px;
      display: inline-block;
      vertical-align: top;
    }
    .row-title {
      color: #778899;
    }
    &-content {
      padding-left: 26px;
      width: calc(100% - 5em - 16px);
      line-height: 20px;
      font-size: 14px;
      .spec-row {
        margin-top: 10px;
        margin-left: -9px;
      }
    }
  }
  .doctor {
    margin: 10px 0;
    &-pic,
    &-info {
      display: inline-block;
      vertical-align: middle;
    }
    &-pic {
      margin-right: 10px;
      width: 62px;
      height: 62px;
      border-radius: 100%;
      border: 1px solid #eee;
      background-color: #fafafa;
      & > img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    &-info {
      & > span {
        line-height: 22px;
        &.title {
          font-size: 16px;
        }
      }
      & > span + span {
        margin-left: 10px;
      }
    }
  }
  .info-row-label > span,
  .info-row-content {
    vertical-align: middle;
  }
  .info-row-content {
    padding-left: 30px;
    font-weight: normal;
    & > span + span {
      margin-left: 1em;
    }
  }
  .t-6 + .info-row-content {
    margin-left: calc(30px - 2em);
    padding-left: 0;
  }
  .spec-row {
    margin-left: 25px;
    padding: 5px 9px;
    font-size: 12px;
    background-color: #fafafa;
  }

  .round-img {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
}
</style>
