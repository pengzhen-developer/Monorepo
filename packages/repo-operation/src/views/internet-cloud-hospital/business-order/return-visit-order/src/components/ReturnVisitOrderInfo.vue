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
        {{info.inquiryStatus|getEnumLable(source.returnVisitStatus)}}
      </div>
    </div>
    <div>

      <div class="info-block">
        <div class="info-row">
          <div class="info-row-label label-title">
            <span>复诊时间</span>
          </div>
          <div class="info-row-content">{{ info.appointmentDate }}</div>
        </div>
      </div>
      <div class="info-block">
        <div class="info-row">
          <div class="info-row-label label-title">
            <span>个人信息</span>
          </div>
          <div class="info-row-content">{{ info.patient_name  +'， '+ info.sex+'，'+info.age}}</div>
        </div>

        <div class="info-row"
             v-if="info.guardianName&&info.guardianSex&&info.guardianAge">
          <div class="info-row-label label-title">
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
           v-if="info.firstOptionList&&info.firstOptionList.length>0">
        <div class="info-title">诊疗记录</div>
        <div class="row"
             v-for="item in info.firstOptionList"
             v-bind:key="item.dataNo">
          <el-card class="case-bg">
            <div class="row">
              <img :src="require('../assets/images/ic_medical record.png')"
                   style="with:60px;height:60px" />
              <div class="case-content">
                <p class="case-title"><span>{{Peace.util.formatDate(item.createdTime)}}</span><span>{{ item.title }}</span></p>
                <p>{{item.diagnosis}}</p>
                <p class="case-subtitle">{{item.hospitalName }} | {{ item.deptName }}</p>
              </div>
            </div>
          </el-card>
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
                        :key="'image_'+index"
                        :src="img.image_path"
                        :preview-src-list="info.image_list.filter(img=>img.type==1).map(i=>i.image_path)"
                        v-for="(img, index) in info.image_list.filter(img=>img.type==1)"></el-image>
            </div>
          </div>
        </div>
        <div class="info-row label"
             v-else>
          <div class="info-row-label">
            <span>复诊凭证</span>
          </div>
          <div class="info-row-content">
            <span>确认遗失</span>
          </div>
        </div>
        <div class="info-row label"
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
                        :preview-src-list="info.image_list.filter(img=>img.type==2).map(i=>i.image_path)"
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
               v-if="info.payInfo.payModeTxt&&info.payTime">
            <div class="info-row-label">
              <span>支付方式</span>
            </div>
            <div class="info-row-content">{{info.payInfo.paymentTypeTxt?info.payInfo.payModeTxt +'-'+info.payInfo.paymentTypeTxt : info.payInfo.payModeTxt }}</div>
          </div>
          <div class="info-row"
               v-if="info.payInfo.deductionTypeTxt">
            <div class="info-row-label">
              <span>抵扣类型</span>
            </div>
            <div class="info-row-content">{{ info.payInfo.deductionTypeTxt }}</div>
          </div>

          <div class="info-row"
               v-if="info.payInfo.medicalTreatmentTypetxt">
            <div class="info-row-label">
              <span>医保类型</span>
            </div>
            <div class="info-row-content">{{ info.payInfo.medicalTreatmentTypetxt }}</div>
          </div>

          <div class="info-row"
               v-if="info.payInfo.diseasesTxt">
            <div class="info-row-label">
              <span>病种</span>
            </div>
            <div class="info-row-content">{{ info.payInfo.diseasesTxt }}</div>
          </div>

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
        <div class="info-row"
             v-if="info.payTime">
          <div class="info-row-label">
            <span>支付时间</span>
          </div>
          <div class="info-row-content">{{ info.payTime }}</div>
        </div>
        <div class="info-row"
             v-if="info.payTime&&info.divisionId">
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
  name: 'return-visit-order-info',
  props: {
    info: Object
  },
  data() {
    return {
      source: {
        returnVisitStatus: Constant.RETURN_VISIT_STATUS,
        paymentStatus: Constant.PAYMENT_STATUS
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
    getEnumLable: (value, ENUM) => {
      return ENUM.find((item) => item.value == value)?.label
    }
  }
}
</script>



<style lang="scss" scoped>
$text: #23313f;
$grey-text: #778899;
$border-color: #eee;
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
      min-width: 4em;
      display: inline-block;
    }
    // &:after {
    //   content: '：';
    // }
  }
  .info-row-content {
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
  & > div {
    padding-top: 15px;
  }

  .doctor {
    position: relative;

    .doctor-pic,
    .doctor-info {
      display: inline-block;
      vertical-align: middle;
    }
    .doctor-pic {
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
  .info-row-label:after {
    content: '';
  }
  .label-title {
    font-size: 16px;
    color: #333;
  }
  .info-row.label {
    padding-left: 12px;
  }

  .info-row-content {
    font-weight: normal;
    padding-left: 20px;
    & > span + span {
      margin-left: 4px;
    }
  }
}
.spec-row {
  padding: 5px 12px;
  margin: 10px 0;
  border-radius: 8px;
  background-color: #f5f5f5;
  font-size: 13px;
  width: 100%;
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
  margin-top: 5px;
  > .info-row {
    padding-left: 15px;
  }
  > .row,
  > .info-block-content,
  > .info-row-content {
    margin-left: 12px;
  }
}
.info-title {
  color: $text;
  font-size: 16px;
  line-height: 25px;
  width: 100%;
  &::before {
    display: inline-block;
    content: '';
    width: 4px;
    height: 15px;
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
  .info-row-price {
    padding: 5px 0;

    .info-row-content {
      padding-left: 10px;
      .red {
        font-size: 18px;
      }
    }
    .info-row-label {
      span {
        font-size: 18px;
      }
    }
  }
}
.info-row {
  width: 100%;
  &.half {
    width: 50%;
  }
}

.case-bg {
  border-radius: 4px;
  background-color: white;
  width: 320px;
  margin-top: 15px;
  .case-content {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 0;
    }
  }

  .case-title {
    font-size: 16px;
    color: #333 !important;
    line-height: 22px;
    span + span {
      margin-left: 15px;
    }
  }

  .case-subtitle {
    font-size: 13px;
    color: #999 !important;
    line-height: 18px;
  }
}
</style>
