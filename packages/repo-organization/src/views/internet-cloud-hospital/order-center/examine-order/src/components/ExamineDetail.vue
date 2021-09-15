<template>
  <div class="examine-order">
    <div class="order-header">
      <div class="order-title">
        <div>{{ hospitalName }}</div>
        <div>检查单</div>
      </div>
      <!-- <div :class="{'order-status': true, 'pay': orderStatus == 1, 'cancel': orderStatus == 2, 'paid': orderStatus == 3}"></div> -->
    </div>
    <div class="order-content">
      <div class="order-item">
        <div class="info-title">患者信息</div>
        <div class="info-content patient">
          <div class="patient-info half">
            <div class="patient-info-label">患者姓名</div>
            <div class="patient-info-value">{{ info.familyName }}</div>
          </div>
          <div class="patient-info half">
            <div class="patient-info-label">性别</div>
            <div class="patient-info-value">{{ info.sex }}</div>
          </div>
          <div class="patient-info half">
            <div class="patient-info-label">年龄</div>
            <div class="patient-info-value">{{ info.age }}</div>
          </div>
          <div class="patient-info half">
            <div class="patient-info-label">科别</div>
            <div class="patient-info-value">{{ info.netdeptChild }}</div>
          </div>
          <div class="patient-info">
            <div class="patient-info-label">创建医生</div>
            <div class="patient-info-value">{{ info.doctorName + '  ' + info.doctorTitle }}</div>
          </div>
          <div class="patient-info">
            <div class="patient-info-label">初步诊断</div>
            <div class="patient-info-value">{{ info.diagnose }}</div>
          </div>
        </div>
      </div>
      <div class="order-item">
        <div class="info-title">检查项目</div>
        <div class="info-content examine">
          <div class="examine-list">
            <div class="examine-item"
                 v-for="(item, index) in info.checkName"
                 :key="index">
              <div>{{ item }}</div>
              <div>x1</div>
            </div>
          </div>
          <div v-if="info.itemTip"
               class="examine-remark">
            <div class="remark-label">备注</div>
            <div class="remark-value">{{ info.itemTip }}</div>
          </div>
          <div class="examine-cost">
            <div>{{ '已添加 ' + info.checkName.length + ' 种检查项' }}</div>
            <div>总金额 <span class="red">￥{{ info.orderMoney }}</span></div>
          </div>
        </div>
      </div>
      <div class="order-item">
        <div class="info-title">订单信息</div>
        <div class="info-content order">
          <div class="order-info">
            <div class="order-info-label">订单编号</div>
            <div class="order-info-value">{{ orderNo }}</div>
          </div>
          <div class="order-info">
            <div class="order-info-label">创建时间</div>
            <div class="order-info-value">{{ info.createdTime }}</div>
          </div>
          <!-- <div class="order-info">
            <div class="order-info-label">实付金额</div>
            <div class="order-info-value">{{ info.payMoney }}</div>
          </div>
          <div class="order-info">
            <div class="order-info-label">支付时间</div>
            <div class="order-info-value">{{ info.payTime }}</div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Util from '@src/util'

export default {
  props: ['info', 'orderNo', 'orderStatus'],
  data() {
    return {
      hospitalName: ''
    }
  },
  created() {},
  mounted() {
    let info = Util.user.getHospitalInfo() ?? {}
    this.hospitalName = info.username
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.examine-order {
  .order-header {
    position: relative;
    text-align: center;
    padding: 10px 0;
    .order-title {
      font-size: 22px;
      color: #333;
      font-weight: 600;
      line-height: 30px;
    }
    .order-status {
      position: absolute;
      right: 64px;
      top: 16px;
      width: 82px;
      height: 44px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 82px 44px;
      &.cancel {
        background-image: url('../assets/images/cancel.png');
      }
      &.pay {
        background-image: url('../assets/images/pay.png');
      }
      &.paid {
        background-image: url('../assets/images/paid.png');
      }
    }
  }
  .order-content {
    border-top: 1px dashed #bfbfbf;
    padding-top: 10px;
  }
  .order-item {
    border-bottom: 1px solid #f3f3f3;
    &:last-child {
      border-bottom: none;
    }
    .info-title {
      position: relative;
      padding-left: 22px;
      height: 40px;
      font-size: 16px;
      color: #333;
      font-weight: 400;
      line-height: 40px;
      &::before {
        content: '';
        position: absolute;
        top: 12px;
        left: 10px;
        width: 4px;
        height: 16px;
        background-color: var(--q-color-primary);
      }
    }
    .info-content {
      padding: 0 10px 10px 10px;
    }
    .patient {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      .patient-info {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        &.half {
          width: 50%;
        }
        .patient-info-label {
          position: relative;
          padding-right: 14px;
          width: 70px;
          height: 24px;
          font-size: 14px;
          font-weight: 400;
          color: #666;
          line-height: 24px;
          display: inline-block;
          text-align: justify;
          text-align-last: justify;
          &::after {
            content: ':';
            position: absolute;
            right: 0;
            top: 0;
            width: 12px;
            height: 24px;
            font-size: 14px;
            font-weight: 400;
            color: #666;
            line-height: 24px;
          }
        }
        .patient-info-value {
          flex: 1;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          line-height: 24px;
          text-align: left;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
    }
    .examine {
      .examine-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 45px;
        font-size: 14px;
        font-weight: 600;
        color: #333;
        line-height: 45px;
        border-bottom: 1px dashed #eee;
        &:last-child {
          border-bottom: 1px solid #f3f3f3;
        }
      }
      .examine-remark {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 10px 0;
        border-bottom: 1px solid #f3f3f3;
        .remark-label {
          position: relative;
          padding-right: 14px;
          display: inline-block;
          width: 70px;
          height: 25px;
          font-size: 14px;
          font-weight: 400;
          color: #666;
          line-height: 25px;
          text-align: justify;
          text-align-last: justify;
          &::after {
            content: ':';
            position: absolute;
            right: 0;
            top: 0;
            width: 12px;
            height: 25px;
            font-size: 14px;
            font-weight: 400;
            color: #666;
            line-height: 25px;
          }
        }
        .remark-value {
          flex: 1;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          line-height: 25px;
          text-align: left;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
      .examine-cost {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 35px;
        padding-top: 10px;
        font-size: 14px;
        color: #333;
        line-height: 25px;
        .red {
          font-size: 16px;
          font-weight: 600;
          color: #ff0000;
        }
      }
    }
    .order-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 14px;
      font-weight: 400;
      color: #666;
      line-height: 24px;
    }
    .order-info-label {
      position: relative;
      padding-right: 14px;
      width: 70px;
      height: 24px;
      display: inline-block;
      text-align: justify;
      text-align-last: justify;
      &::after {
        content: ':';
        position: absolute;
        right: 0;
        top: 0;
        width: 12px;
        height: 24px;
      }
    }
    .order-info-value {
      flex: 1;
    }
  }
}
</style>