<template>
  <div class="page"
       v-if="!loading.get">
    <div class="consult-detatil">

      <div class="module">
        <DoctorCard v-bind:doctor="doctorInfo"
                    v-bind:type="'检验'"></DoctorCard>
      </div>

      <div class="module order">

        <div class="module-item">
          <div class="title">个人信息</div>
          <FamilyCard v-bind:family="familyInfo"></FamilyCard>
        </div>

        <div class="module-item">
          <div class="title">检验信息</div>
          <InspectInfo v-bind:department="model.execDept"
                       v-bind:time="model.makeTime"></InspectInfo>
        </div>

        <div class="module-item">
          <div class="title mt16">费用明细</div>
          <div class="brief">
            <InspectCost v-bind:inspect="inspectList"></InspectCost>
          </div>
        </div>

      </div>

      <div class="pay-card-wrap">
        <PayCard v-bind:doctorId="model.doctorInfo.doctorId"
                 v-bind:familyId="model.familyInfo.familyId"
                 v-bind:familyName="familyInfo.name"
                 v-bind:payType="payType"
                 v-bind:payInfo="payInfo"
                 v-bind:orderInfo="model"
                 v-bind:nethospitalId="model.doctorInfo.nethospitalId"
                 v-bind:disabled="true"
                 v-bind:orderType="7"
                 v-on:update="updatePayInfo"></PayCard>
      </div>

      <!-- footer -->
      <div class="pay fixedBottom">
        <div class="pay-item">
          <van-button round
                      @click="submit"
                      type="primary"
                      :disabled="loading.submit"
                      size="large">提交订单</van-button>
        </div>
      </div>

      <!-- 确认支付弹框 -->
      <template>
        <ExpenseDetail v-model="payDialog.visible"
                       @changeFlag="changeFlag"
                       :info="payDialog.data"></ExpenseDetail>
      </template>
      <!-- 电话弹框 -->
      <template>
        <CallPhone v-model="phoneDialog.visible"
                   :phone="phoneDialog.data.phone"></CallPhone>
      </template>

    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import { Dialog } from 'vant'

import DoctorCard from './components/DoctorCard'
import FamilyCard from './components/FamilyCard'
import InspectInfo from './components/InspectInfo'
import InspectCost from './components/InspectCost'
import PayCard from '@src/views/components/PayCard'
import ExpenseDetail from '@src/views/components/ExpenseDetail'
import CallPhone from '@src/views/components/CallPhone'

export default {
  name: 'InspectAdvance',
  components: {
    DoctorCard,
    FamilyCard,
    InspectInfo,
    InspectCost,
    PayCard,
    ExpenseDetail,
    CallPhone,
    [Dialog.Component.name]: Dialog.Component
  },

  data() {
    return {
      loading: {
        get: true,
        submit: false
      },
      model: {},
      // 医生信息
      doctorInfo: {},
      // 患者信息
      familyInfo: {},
      // 检验单信息
      inspectList: [],
      //默认选中微信支付 wxpay alipay
      paymentType: 'wxpay',
      // 抵扣类型
      payType: '',
      // 支付信息
      payInfo: {
        orderMoney: 0,

        // 所选医保卡卡号
        medCardNo: '',
        // 医保待遇类型
        medicalTreatmentType: '',
        // 医保待遇类型名称
        medicalTreatmentTypeText: '',
        // 疾病种类
        diseasesCode: '',
        // 疾病种类名称
        diseasesName: '',

        // 所选服务包ID
        servicePackageId: '',
        // 所选服务包名称
        servicePackageName: '',
        // 所选权益ID
        patientEquitiesId: '',
        // 所选权益名称
        patientEquitiesName: '',

        // H5 商保未开放，暂不考虑
        // 所选商保ID
        sbInsuranceId: '',
        // 所选商保名称
        sbInsuranceName: '',

        serviceTel: ''
      },

      // 支付弹窗
      payDialog: {
        visible: false,
        data: {}
      },

      phoneDialog: {
        visible: false,
        data: {
          phone: ''
        }
      }
    }
  },

  activated() {
    this.getDetail()
  },

  methods: {
    // 获取检验单预售订单详情
    getDetail() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.inquiry
        .getCheckOrderDetailBefore(params)
        .then((res) => {
          this.model = res.data
          this.doctorInfo = res.data?.doctorInfo || {}
          this.familyInfo = res.data?.familyInfo || {}
          this.inspectList = res.data?.comboList || []
          this.payInfo.orderMoney = res.data?.totalMoney || 0

          this.payInfo.medCardNo = res.data?.MedicalCardNo
          this.payInfo.diseasesName = res.data?.diseasesName
          this.payInfo.diseasesCode = res.data?.diseasesCode
          this.payInfo.medicalTreatmentType = res.data?.medicalTreatmentType
          this.payInfo.medicalTreatmentTypeText = res.data?.medicalTreatmentTypeTxt

          this.payType = res.data?.MedicalCardNo || res.data?.medicalTreatmentType ? 'yibaopay' : ''

          this.getOrganizationTelephone()
        })
        .finally(() => {
          this.loading.get = false
        })
    },
    // 更新支付信息
    updatePayInfo(result) {
      this.payType = result.payType
      this.paymentType = result.paymentType
      this.payInfo = result.payInfo
    },
    changeFlag() {
      this.payDialog.visible = false
      this.getDetail()
    },
    callPhone() {
      this.phoneDialog.visible = true
    },
    //获取机构客服电话
    getOrganizationTelephone() {
      const params = {
        hosoitalId: this.model.doctorInfo.nethospitalId
      }
      peace.service.hospital.getOrganizationTelephone(params).then((res) => {
        this.payInfo.serviceTel = res.data.serviceTel
        this.phoneDialog.data.phone = res.data.serviceTel
      })
    },
    submit() {
      // 检验单只有 微信支付、医保支付
      let errMsg = ''
      switch (this.payType) {
        case 'servicePackage':
          errMsg = !this.payInfo.patientEquitiesId ? '请选择服务包' : ''
          break
        case 'yibaopay':
          if (!this.payInfo.medCardNo) {
            errMsg = '请填写医保卡号'
          } else {
            if (!this.payInfo.medicalTreatmentType) {
              errMsg = '请填写医保类型'
            } else if (this.payInfo.medicalTreatmentType.toString() === '2' && !this.payInfo.diseasesCode) {
              errMsg = '请填写病种'
            }
          }
          break
        case 'shangbaopay':
          errMsg = !this.payInfo.cardno ? '请选择商保权益' : ''
          break
        default:
          errMsg = ''
          break
      }

      if (errMsg) {
        peace.util.alert(errMsg)
        return false
      }

      if (this.loading.submit) {
        return false
      }
      this.loading.submit = true

      let params = {
        checkRecordId: peace.util.decode(this.$route.params.json).checkRecordId,
        medCardNo: this.payType === 'yibaopay' ? this.payInfo.medCardNo : '',
        cardNo: this.payType === 'shangbaopay' ? this.payInfo.sbInsuranceId : '',
        medicalTreatmentType: this.payType === 'yibaopay' ? this.payInfo.medicalTreatmentType : '',
        diseasesCode: this.payType === 'yibaopay' && this.payInfo.medicalTreatmentType === 2 ? this.payInfo.diseasesCode : '',
        diseasesName: this.payType === 'yibaopay' && this.payInfo.medicalTreatmentType === 2 ? this.payInfo.diseasesName : '',
        paymentType: this.paymentType,
        deductionType: this.payType
      }

      peace.service.inquiry
        .submitCheckOrder(params)
        .then((res) => {
          let json = {
            money: res.data.orderMoney, //自费金额
            moneyRecord: res.data.moneyRecord, //费用明细
            orderNo: res.data.orderNo,
            orderType: 'inspect'
          }
          this.payDialog.data = json
          this.payDialog.visible = true
        })
        .catch((res) => {
          if (res.data.code == '205') {
            return Dialog.confirm({
              title: '温馨提示',
              message: res.data.msg,
              confirmButtonText: '确定',
              cancelButtonText: '联系客服'
            })
              .then(() => {})
              .catch(() => {
                //医保卡不可用 请联系客服
                this.callPhone()
              })
          } else {
            peace.util.alert(res.data.msg)
          }
        })
        .finally(() => {
          this.loading.submit = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  box-sizing: border-box;
  min-height: 100%;
  padding-bottom: 82px;
  background-color: #f5f5f5;
}

.module-item {
  &.record {
    .title {
      margin: 0;
    }
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
}

.consult-detatil {
  background-color: #f5f5f5;
  color: #333;
  min-height: 100%;

  .module {
    background: #fff;
    margin-top: 0;
    padding: 16px;
    margin-bottom: 8px;

    &.order {
      .module-item {
        &:first-child {
          .title {
            margin-top: 0;
          }
        }
      }
    }
    &.money {
      margin-top: -16px;
      justify-content: space-between;
      padding: 0 16px;
      .right {
        padding-top: 8px;
        padding-bottom: 16px;
        border-top: 1px dashed rgba(51, 51, 51, 0.1);
      }
    }
    &.phone {
      margin-top: -8px;

      color: rgba(51, 51, 51, 0.6);
      font-size: 14px;
      padding: 0 16px;
      .module-item {
        width: 100%;
        padding: 16px 0;
        border-top: 1px solid #ddd;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: normal;
      }

      .van-image {
        width: 14px;
        height: 14px;
        margin-right: 8px;
        cursor: pointer;
      }
    }
  }

  .title {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #333333;
    padding-left: 12px;
    position: relative;
    margin-bottom: 12px;
    margin-top: 16px;
    &::before {
      position: absolute;
      content: '';
      width: 4px;
      height: 16px;
      border-radius: 2px;
      background: $primary;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.pay-card-wrap {
  margin-bottom: 8px;
}

.fixedBottom {
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0px -1px 1px 0px rgba(51, 51, 51, 0.16);
}

.pay {
  padding: 8px 16px 24px;
  justify-content: space-between;
  .pay-item {
    display: flex;
    align-items: center;
    flex: 1;
  }
}
</style>
