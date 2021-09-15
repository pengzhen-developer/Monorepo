<template>
  <div class="advisory-info">
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
        <span>{{ info.inquiryStatus | getEnumLabel(source.ENUM_CONSULT_STATUS) }}</span>
      </div>

    </div>
    <div>
      <div class="info-block">
        <div class="info-title">个人信息</div>
        <div class="info-row half">
          <div class="info-row-label">
            <span>姓名：</span>
          </div>
          <div class="info-row-content">
            <span>{{ info.patient_name }}</span>
          </div>
        </div>
        <div class="info-row half">
          <div class="info-row-label">
            <span>年龄：</span>
          </div>
          <div class="info-row-content">
            <span v-if="info.age">{{ info.age }}</span>
          </div>
        </div>
        <div class="info-row half">
          <div class="info-row-label">
            <span>性别：</span>
          </div>
          <div class="info-row-content">
            <span>{{ info.sex }}</span>
          </div>
        </div>
        <div class="info-row half"
             v-if="info.guardianName&&info.guardianSex&&info.guardianAge">
          <div class="info-row-label">
            <span>监护人：</span>
          </div>
          <div class="info-row-content">
            {{ info.guardianName }} |
            {{ info.guardianSex }} |
            {{ info.guardianAge }}
          </div>
        </div>
      </div>
      <div class="info-block">
        <div class="info-title">病情描述</div>
        <div class="info-row-content spec-row">
          <span>{{ info.describe }}</span>
        </div>
      </div>
      <div class="info-block"
           v-if="info.confirm_illness||info.image_list.filter(img=>img.type==1).length>0">
        <div class="info-title">复诊信息</div>
        <div class="info-row"
             v-if="info.image_list.filter(img=>img.type==1).length>0">
          <div class="info-row-label">
            <span>复诊凭证</span>
          </div>
          <div class="info-row-content">
            <div class="imgs">
              <el-image class="preview-img"
                        :z-index="9999"
                        :key="'img_' + index"
                        :src="img.image_path"
                        :preview-src-list="info.image_list.filter(img=>img.type==1)"
                        v-for="(img, index) in info.image_list.filter(img=>img.type==1)"></el-image>
            </div>
          </div>
        </div>
        <div class="info-row"
             v-else>
          <div class="info-row-label">
            <span>复诊凭证</span>
          </div>
          <div class="info-row-content">
            <span>确认遗失</span>
          </div>
        </div>
        <div class="info-row"
             v-if="info.confirm_illness">
          <div class="info-row-label">
            <span>初步诊断</span>
          </div>
          <div class="info-row-content">
            <span>{{ info.confirm_illness }}</span>
          </div>
        </div>
      </div>
      <div class="info-block"
           v-if="info.pregnancyText||info.allergic_history||info.image_list.filter(img=>img.type==2).length>0">
        <div class="info-title">补充信息</div>
        <div class="info-row"
             v-if="info.image_list.filter(img=>img.type==2).length>0">
          <div class="info-row-label">
            <span>患处图片</span>
          </div>
          <div class="info-row-content">
            <div class="imgs">
              <el-image class="preview-img"
                        :z-index="9999"
                        :key="'img_' + index"
                        :src="img.image_path"
                        :preview-src-list="info.image_list.filter(img=>img.type==2)"
                        v-for="(img, index) in info.image_list.filter(img=>img.type==2)"></el-image>
            </div>
          </div>
        </div>
        <div class="info-row"
             v-if="info.pregnancyText">
          <div class="info-row-label">
            <span>特殊时期</span>
          </div>
          <div class="info-row-content">
            <span>{{ info.pregnancyText }}</span>
          </div>
        </div>
        <div class="info-row"
             v-if="info.allergic_history">
          <div class="info-row-label">
            <span>过敏史</span>
          </div>
          <div class="info-row-content">
            <span>{{ info.allergic_history }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="info-block">
      <div class="info-title">订单信息</div>
      <div class="info-block-content">
        <div class="info-row">
          <div class="info-row-label">
            <span>订单编号</span>
          </div>
          <div class="info-row-content">{{ info.order_no }}</div>
        </div>

        <div class="info-row">
          <div class="info-row-label">
            <span>下单时间</span>
          </div>
          <div class="info-row-content">{{ info.created_time }}</div>
        </div>
        <template v-if="info.payInfo">
          <div class="info-row"
               v-if="info.orderStatus >= 3 || info.payTime != null">
            <div class="info-row-label">
              <span>支付方式</span>
            </div>
            <div class="info-row-content">{{info.payInfo.paymentTypeTxt?info.payInfo.payModeTxt +' - ' + info.payInfo.paymentTypeTxt : info.payInfo.payModeTxt }}</div>
          </div>
          <div class="info-row"
               v-if="info.payInfo.deductionTypeTxt">
            <div class="info-row-label">
              <span>抵扣类型</span>
            </div>
            <div class="info-row-content">{{ info.payInfo.deductionTypeTxt }}</div>
          </div>
          <template v-if="info.payInfo.deductionType === 'yibaopay'">
            <div class="info-row"
                 v-if="info.payInfo.medicalTreatmentTypetxt">
              <div class="info-row-label">
                <span>医保类型</span>
              </div>
              <div class="info-row-content">{{ info.payInfo.medicalTreatmentTypetxt }}</div>
            </div>

            <div class="info-row"
                 v-if="info.payInfo.diseasesTxt&&info.payInfo.medicalTreatmentType === 2">
              <div class="info-row-label">
                <span>病种</span>
              </div>
              <div class="info-row-content">{{ info.payInfo.diseasesTxt }}</div>
            </div>
          </template>
          <template v-if="info.payInfo.deductionType === 'servicePackage'">
            <div class="info-row"
                 v-if="info.payInfo.servicePackageName">
              <div class="info-row-label">
                <span>服务包名称</span>
              </div>
              <div class="info-row-content">{{ info.payInfo.servicePackageName }}</div>
            </div>

            <div class="info-row"
                 v-if="info.payInfo.equitiesName">
              <div class="info-row-label">
                <span>服务包权益</span>
              </div>
              <div class="info-row-content">{{ info.payInfo.equitiesName }}</div>
            </div>
          </template>
        </template>
        <div class="info-row"
             v-if="info.orderStatus >= 3 || info.payTime != null">
          <div class="info-row-label">
            <span>支付时间</span>
          </div>
          <div class="info-row-content">{{ info.payTime }}</div>
        </div>
        <div class="info-row"
             v-if="(info.orderStatus >= 3 || info.payTime != null) && info.divisionId">
          <div class="info-row-label">
            <span>发票号</span>
          </div>
          <div class="info-row-content">{{ info.divisionId }}</div>
        </div>
        <div class="info-row"
             v-if="info.backTime">
          <div class="info-row-label">
            <span>退诊时间</span>
          </div>
          <div class="info-row-content">{{ info.backTime }}</div>
        </div>
        <div class="info-row"
             v-if="info.refundTime">
          <div class="info-row-label">
            <span>退款时间</span>
          </div>
          <div class="info-row-content">{{ info.refundTime }}</div>
        </div>

        <div class="info-row"
             v-if="info.cancelTime">
          <div class="info-row-label">
            <span>取消时间</span>
          </div>
          <div class="info-row-content">{{ info.cancelTime }}</div>
        </div>

        <div class="info-row"
             v-if="info.backEquities">
          <div class="info-row-label">
            <span>权益回退</span>
          </div>
          <div class="info-row-content">{{ info.backEquities }}</div>
        </div>
      </div>
      <div class="info-block-content">
        <template v-if="info.moneyRecord&&info.moneyRecord.length>0">
          <div class="info-row"
               v-for="(item,index) in info.moneyRecord"
               :key="index">
            <div class="info-row-label">
              <span>{{item.name}}</span>
            </div>
            <div class="info-row-content">{{ item.value }}</div>
          </div>
        </template>
        <template v-else>
          <div class="info-row">
            <div class="info-row-label">
              <span>订单费用</span>
            </div>
            <div class="info-row-content">￥{{ info.totalMoney }}</div>
          </div>
        </template>
        <div class="info-row">
          <div class="info-row-label">
            <span>自费金额</span>
          </div>
          <div class="info-row-content">
            <span class="red">￥{{ info.pay_money }}</span>
            <span v-if="info.orderStatus === 5"
                  style="font-size: 12px;">(已退款)</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import Constant from '../constant'
export default {
  name: 'advisory-order-info',
  props: {
    info: Object
  },
  data() {
    return {
      source: {
        ENUM_CONSULT_STATUS: Constant.ENUM_CONSULT_STATUS,
        ENUM_PAYMENT: Constant.ENUM_PAYMENT
      }
    }
  },
  computed: {
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
  },
  filters: {
    getEnumLabel: (value, ENUM) => {
      return ENUM.find((item) => item.value == value)?.label
    }
  }
}
</script>



<style lang="scss" scoped>
$text: #333;
$border-color: #f3f3f3;
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
    color: rgba(51, 51, 51, 0.6);
    white-space: nowrap;
    & > span {
      text-align: right;
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
}
.advisory-info {
  color: $text;

  .doctor {
    position: relative;
    .doctor-pic,
    .doctor-info {
      display: inline-block;
      vertical-align: middle;
    }
    .doctor-pic {
      margin-right: 16px;
      width: 60px;
      height: 60px;
      border-radius: 100%;
      overflow: hidden;
      & > img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .doctor-info {
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
  .info-row-content {
    font-weight: normal;
    & > span + span {
      margin-left: 4px;
    }
  }
  .info-row-label,
  .info-row-content {
    font-size: 14px;
    line-height: 28px;
    display: inline-block;
    vertical-align: middle;
  }
}
.info-row-content.spec-row {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 22px;
  margin-top: 8px;
}
.el-icon-picture {
  font-size: 48px;
  color: #b3d8ff;
}
.imgs {
  padding: 10px 0;
  .preview-img {
    width: 57px;
    height: 57px;
    text-align: center;
    display: inline-block;
    margin-right: 10px;
  }
}
.red {
  color: #f56c6c;
}
.info-block {
  display: flex;
  flex-wrap: wrap;
}
.info-title {
  color: $text;
  font-size: 16px;
  line-height: 25px;
  border-top: 1px solid $border-color;
  padding-top: 12px;
  margin-top: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  width: 100%;
  &::before {
    display: inline-block;
    content: '';
    width: 4px;
    height: 16px;
    background: var(--q-color-primary);
    margin-right: 8px;
    margin-bottom: -2px;
    border-radius: 2px;
  }
}
.info-block-content {
  width: 100%;
  background: #f5f5f5;
  margin-top: 10px;
  padding: 5px 15px;
  border-radius: 8px;
  .info-row-content {
    padding-left: 20px;
  }
}
.info-row {
  width: 100%;
  &.half {
    width: 50%;
  }
}
</style>
