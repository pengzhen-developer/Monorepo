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
        <!-- <span><img src="" alt=""></span> -->
        <br>
        <span>{{ info.netHospital_name }}</span>
      </div>

      <div class="order-type"
           :style="{ color:orderLabelColor , background: orderLabelBgd }">
        <span>{{ info.inquiryStatus | getEnumLable(source.inquiryStatus) }}</span>
      </div>

    </div>
    <div>
      <div class="info-block">
        <div class="info-title">个人信息</div>
        <div class="info-row half">
          <div class="info-row-label">
            <span>姓名</span>
          </div>
          <div class="info-row-content">
            <span>{{ info.patient_name }}</span>
          </div>
        </div>
        <div class="info-row half">
          <div class="info-row-label">
            <span>年龄</span>
          </div>
          <div class="info-row-content">
            <span v-if="info.age">{{ info.age }}</span>
          </div>
        </div>
        <div class="info-row half">
          <div class="info-row-label">
            <span>性别</span>
          </div>
          <div class="info-row-content">
            <span>{{ info.sex }}</span>
          </div>
        </div>
        <div class="info-row half"
             v-if="info.guardianName&&info.guardianSex&&info.guardianAge">
          <div class="info-row-label">
            <span>监护人</span>
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
      <div class="info-row">
        <div class="info-row-label">
          <span>订单号码</span>
        </div>
        <div class="info-row-content">{{ info.order_no }}</div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>订单金额</span>
        </div>
        <div class="info-row-content"
             v-if="info.order_money">{{ info.order_money }}元</div>
      </div>
      <!-- <div class="info-row">
        <div class="info-row-label">
          <span>优惠金额</span>
        </div>
        <div class="info-row-content"
             v-if="info.discount_money">{{ info.discount_money }}元</div>
      </div> -->
      <div class="info-row">
        <div class="info-row-label">
          <span>订单时间</span>
        </div>
        <div class="info-row-content">{{ info.created_time }}</div>
      </div>
      <template v-if="info.paymentType">
        <div class="info-row">
          <div class="info-row-label">
            <span>支付方式</span>
          </div>
          <div class="info-row-content">{{ info.paymentType | getEnumLable(source.paymentStatus) }}</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">
            <span>支付时间</span>
          </div>
          <div class="info-row-content">{{ info.payTime }}</div>
        </div>
      </template>
      <div class="info-row">
        <div class="info-row-label">
          <span>{{moneyText}}</span>
        </div>
        <div class="info-row-content">
          <span class="red"
                v-if="info.pay_money">{{ info.pay_money }}元</span>
          <span v-if="info.orderStatus === 5"
                style="font-size: 12px;">(已退款)</span>
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
        inquiryStatus: Constant.INQUIRY_STATUS,
        paymentStatus: Constant.PAYMENT_STATUS
      }
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
  },
  filters: {
    getEnumLable: (value, ENUM) => {
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
      margin-left: 1em;
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
  font-size: 16px;
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
.info-row {
  width: 100%;
  &.half {
    width: 50%;
  }
}
</style>
