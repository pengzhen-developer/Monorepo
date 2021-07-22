<template>
  <div class="order-detail">

    <div class="doctor">
      <div class="doctor-pic">
        <img :src="info.photoDoc"
             alt="医生头像">
      </div>
      <div class="doctor-info">
        <span class="title">
          <strong>{{ info.doctor_name }}</strong>
        </span>
        <span>{{ info.doctor_title }}</span>
        <span>{{ info.netdept_child }}</span>
        <br>
        <span>{{ info.netHospital_name }}</span>
      </div>

      <div class="order-type"
           :style="{ color:orderLabelColor , background: orderLabelBgd }">
        {{info.inquiryStatus|getEnumLabel(source.ENUM_RETURN_VISIT_STATUS)}}
      </div>
    </div>

    <div class="order-info">

      <div class="panel-box">
        <div class="panel-head">
          <div class="panel-title">个人信息</div>
        </div>
        <div class="panel-body">
          <div class="panel-info">
            <div class="panel-label user">姓名：</div>
            <div class="panel-value">{{info.patient_name}}</div>
          </div>
          <div class="panel-info">
            <div class="panel-label user">性别：</div>
            <div class="panel-value">{{info.sex}}</div>
          </div>
          <div class="panel-info">
            <div class="panel-label user">年龄：</div>
            <div class="panel-value">{{info.age}}</div>
          </div>
          <div class="panel-info"
               v-if="info.guardianName&&info.guardianSex&&info.guardianAge">
            <div class="panel-label user">监护人：</div>
            <div class="panel-value">{{ info.guardianName }} |
              {{ info.guardianSex }} |
              {{ info.guardianAge }}</div>
          </div>
        </div>
      </div>

      <div class="panel-box">
        <div class="panel-head">
          <div class="panel-title">病情描述</div>
        </div>
        <div class="panel-body">
          <div class="panel-info"
               style="color: #333333;">{{ info.describe }}</div>
        </div>
      </div>

      <div class="panel-box"
           v-if="info.confirm_illness||info.image_list.filter(img=>img.type==1).length>0">
        <div class="panel-head">
          <div class="panel-title">复诊信息</div>
        </div>
        <div class="panel-body">
          <div class="panel-info"
               v-if="info.image_list.filter(img=>img.type==1).length>0">
            <div class="panel-label">复诊凭证：</div>
            <div class="panel-value">
              <div class="img-list">
                <el-image class="preview-img"
                          :z-index="9999"
                          v-for="(item, index) in info.image_list.filter(img=>img.type==1)"
                          :key="'img_' + index"
                          :src="item.image_path"
                          :preview-src-list="info.image_list.filter(img=>img.type==1).map(i => i.image_path)">
                </el-image>
              </div>
            </div>
          </div>
          <div class="panel-info"
               v-else>
            <div class="panel-label">复诊凭证：</div>
            <div class="panel-value">确认遗失</div>
          </div>
          <div class="panel-info"
               v-if="info.confirm_illness">
            <div class="panel-label">初诊诊断：</div>
            <div class="panel-value">{{ info.confirm_illness }}</div>
          </div>
        </div>
      </div>

      <div class="panel-box"
           v-if="info.pregnancyText||info.allergic_history||info.image_list.filter(img=>img.type==2).length>0">
        <div class="panel-head">
          <div class="panel-title">补充信息</div>
        </div>
        <div class="panel-body">
          <div class="panel-info">
            <div class="panel-label">患处图片：</div>
            <div class="panel-value">
              <div class="img-list">
                <el-image class="preview-img"
                          :z-index="9999"
                          v-for="(item, index) in info.image_list.filter(img=>img.type==2)"
                          :key="'img_' + index"
                          :src="item.image_path"
                          :preview-src-list="info.image_list.filter(img=>img.type==2).map(i => i.image_path)">
                </el-image>
              </div>
            </div>
          </div>
          <div class="panel-info"
               v-if="info.pregnancyText">
            <div class="panel-label">特殊时期：</div>
            <div class="panel-value">{{ info.pregnancyText }}</div>
          </div>
          <div class="panel-info"
               v-if="info.allergic_history">
            <div class="panel-label">过敏史：</div>
            <div class="panel-value">{{ info.allergic_history }}</div>
          </div>
        </div>
      </div>

      <div class="panel-box">
        <div class="panel-head">
          <div class="panel-title">订单信息</div>
        </div>
        <div class="panel-body">
          <div class="panel-info">
            <div class="panel-label">订单编号：</div>
            <div class="panel-value">{{ info.order_no }}</div>
          </div>
          <div class="panel-info">
            <div class="panel-label">订单时间：</div>
            <div class="panel-value">{{ info.created_time }}</div>
          </div>
          <div class="panel-info"
               v-if="info.orderStatus >= 3 || info.payTime != null">
            <div class="panel-label">支付方式：</div>
            <div class="panel-value">{{info.payInfo.payModeTxt}}{{info.payInfo.paymentTypeTxt ? ' - ' +
						info.payInfo.paymentTypeTxt : ''}}</div>
          </div>
          <div class="panel-info"
               v-if="info.payInfo.deductionTypeTxt">
            <div class="panel-label">抵扣类型：</div>
            <div class="panel-value">{{ info.payInfo.deductionTypeTxt }}</div>
          </div>
          <template v-if="info.payInfo.deductionType === 'yibaopay'">
            <div class="panel-info">
              <div class="panel-label">医保类型：</div>
              <div class="panel-value">{{ info.payInfo.medicalTreatmentTypetxt }}</div>
            </div>
            <div class="panel-info"
                 v-if="info.payInfo.medicalTreatmentType === 2">
              <div class="panel-label">病种：</div>
              <div class="panel-value">{{ info.payInfo.diseasesTxt }}</div>
            </div>
          </template>
          <template v-if="info.payInfo.deductionType === 'servicePackage'">
            <div class="panel-info">
              <div class="panel-label">服务包名称：</div>
              <div class="panel-value">{{ info.payInfo.servicePackageName }}</div>
            </div>
            <div class="panel-info"
                 v-if="info.payInfo.medicalTreatmentType === 2">
              <div class="panel-label">权益名称：</div>
              <div class="panel-value">{{ info.payInfo.equitiesName }}</div>
            </div>
          </template>
          <div class="panel-info"
               v-if="info.orderStatus >= 3 || info.payTime != null">
            <div class="panel-label">支付时间：</div>
            <div class="panel-value">{{ info.created_time }}</div>
          </div>
          <div class="panel-info"
               v-if="info.cancelTime">
            <div class="panel-label">取消时间：</div>
            <div class="panel-value">{{ info.cancelTime }}</div>
          </div>
          <div class="panel-info"
               v-if="(info.orderStatus >= 3 || info.payTime != null) && info.divisionId">
            <div class="panel-label">发票号：</div>
            <div class="panel-value">{{info.divisionId}}</div>
          </div>
          <div class="panel-info"
               v-if="info.backTime">
            <div class="panel-label">退诊时间：</div>
            <div class="panel-value">{{ info.backTime }}</div>
          </div>
          <div class="panel-info"
               v-if="info.refundTime">
            <div class="panel-label">退款时间：</div>
            <div class="panel-value">{{ info.refundTime }}</div>
          </div>

          <div class="divider"></div>

          <template v-if="info.moneyRecord && info.moneyRecord.length > 0">
            <div class="panel-info"
                 v-for="item in info.moneyRecord"
                 v-bind:key="item.name">
              <div class="panel-label">{{item.name}}：</div>
              <div class="panel-value">{{ item.value }}</div>
            </div>
          </template>
          <template v-else>
            <div class="panel-info">
              <div class="panel-label">订单费用：</div>
              <div class="panel-value">￥{{ info.totalMoney }}</div>
            </div>
          </template>

          <div class="panel-info">
            <div class="panel-label">{{moneyText}}：</div>
            <div class="panel-value">
              <span class="red"
                    v-if="info.pay_money"> ¥ {{ info.pay_money }}</span>
              <span v-if="info.orderStatus === 5"> (已退款)</span>
            </div>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>


<script>
import CONSTANT from '../constant'
export default {
  name: 'ReturnVisitOrderDetail',
  props: {
    info: Object
  },
  data() {
    return {
      source: {
        ENUM_RETURN_VISIT_STATUS: CONSTANT.ENUM_RETURN_VISIT_STATUS,
        ENUM_PAYMENT: CONSTANT.ENUM_PAYMENT
      }
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  computed: {
    moneyText() {
      let str = ''
      if (this.info.orderStatus >= 3 || this.info.payTime != null) {
        str = '实付金额'
      } else {
        str = '应付金额'
      }
      return str
    },

    orderLabelColor() {
      let color = '#fff'
      switch (this.info.inquiryStatus) {
        case 1:
        case 2:
        case 3:
          color = '#fff'
          break
        case 4:
        case 6:
          color = '#888'
          break
        case 5:
          color = '#3099A6'
          break
      }
      return color
    },

    orderLabelBgd() {
      let color = '#3099A6'
      switch (this.info.inquiryStatus) {
        case 1:
        case 2:
        case 3:
          color = '#3099A6'
          break
        case 4:
        case 6:
          color = '#eee'
          break
        case 5:
          color = '#EAF4F6'
          break
      }
      return color
    }
  }
}
</script>

<style lang="scss" scoped>
.order-detail {
  .doctor {
    position: relative;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e9e9e9;
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
      overflow: hidden;
      & > img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    &-info {
      & > span {
        line-height: 24px;
        &.title {
          font-size: 16px;
        }
      }
      & > span + span {
        margin-left: 10px;
      }
    }
    .order-type {
      position: absolute;
      top: 20px;
      right: -16px;
      color: #fff;
      line-height: 1.75;
      padding: 0 20px;
      background-color: var(--q-color-primary);
      border-radius: 15px 0 0 15px;
    }
  }

  .panel-box {
    margin-bottom: 20px;
    border-bottom: 1px solid #e9e9e9;
    &:last-child {
      margin-bottom: 0;
      border-bottom: none;
    }
    .panel-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 22px;
      .panel-title {
        position: relative;
        padding-left: 12px;
        font-size: 16px;
        font-weight: 600;
        color: #333333;
        &:before {
          content: '';
          position: absolute;
          top: 4px;
          left: 0;
          width: 4px;
          height: 16px;
          background-color: var(--q-color-primary);
          border-radius: 2px;
        }
      }
    }
    .panel-body {
      padding-top: 16px;
      padding-bottom: 16px;
    }
    .panel-info {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 8px;
      white-space: normal;
      word-wrap: normal;
      word-break: break-all;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
      line-height: 20px;
      &:last-child {
        margin-bottom: 0;
      }
      .panel-label {
        flex: none;
        min-width: 76px;
        height: 20px;
        padding-right: 4px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        line-height: 20px;
        &.user {
          min-width: 48px;
        }
      }
      .panel-value {
        flex: 1;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
        white-space: normal;
        word-wrap: normal;
        word-break: break-all;
      }
    }

    .img-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      .preview-img {
        flex: none;
        width: 56px;
        height: 56px;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }

    .first-list {
      .first-item {
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
      }
      .first-time {
        position: relative;
        width: 56px;
        min-height: 60px;
        padding-right: 16px;
        margin-right: 16px;
        border-right: 1px solid #eeeeee;
        font-weight: 400;
        color: #999999;
        text-align: right;
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: -5px;
          width: 9px;
          height: 9px;
          border-radius: 50px;
          background-color: var(--q-color-primary);
        }
        .first-day {
          height: 14px;
          font-size: 14px;
          line-height: 14px;
          margin-bottom: 6px;
        }
        .first-hour {
          height: 12px;
          font-size: 12px;
          line-height: 12px;
        }
      }
      .first-info {
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 14px;
      }
    }
  }

  .red {
    font-weight: 600;
    color: #f56c6c;
  }

  .divider {
    margin: 20px auto;
    width: 100%;
    height: 1px;
    border-top: 1px dashed #e9e9e9;
  }
}
</style>