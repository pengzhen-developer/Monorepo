<template>
  <div class="page"
       v-if="loading.get">
    <div class="consult-detatil">

      <div class="module">
        <DoctorCard v-bind:doctor="doctorInfo"
                    v-bind:type="'检验挂号单'"></DoctorCard>
      </div>

      <div class="module order">

        <div class="module-item">
          <div class="title">个人信息</div>
          <FamilyCard v-bind:familyInfo="patientInfo"></FamilyCard>
        </div>

        <div class="module-item">
          <div class="title mt16">检验项目</div>
          <div class="brief">
            <InspectCard v-bind:list="inspectList"
                         v-bind:totalPrice="model.checkRegisteringOrderTotalPrice"
                         v-bind:cmd="'remind'"></InspectCard>
          </div>
        </div>

      </div>

      <PayCard v-bind:doctorId="model.doctorId"
               v-bind:familyId="model.familyId"
               v-bind:familyName="patientInfo.name"
               v-bind:payType="payType"
               v-bind:payInfo="payInfo"
               v-bind:deduction="deductionList"
               v-on:update="updatePayInfo"></PayCard>

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
      <ExpenseDetail v-model="dialog.visible"
                     @changeFlag="changeFlag"
                     :info="dialog.data"></ExpenseDetail>

    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import { Dialog } from 'vant'

import DoctorCard from './components/DoctorCard'
import FamilyCard from './components/FamilyCard'
import InspectCard from './components/InspectCard'
import PayCard from './components/PayCard'
import ExpenseDetail from '@src/views/components//ExpenseDetail'

export default {
  components: {
    DoctorCard,
    FamilyCard,
    InspectCard,
    PayCard,
    ExpenseDetail,
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
      patientInfo: {},
      // 检验单信息
      inspectList: [],
      // 抵扣信息
      deductionList: [],
      // 默认选中微信支付
      payType: 'wxpay',
      // 支付信息
      payInfo: {
        orderMoney: 0,

        // 所选医保卡卡号
        medCardNo: '',
        // 医保待遇类型
        medicalTreatmentType: '',
        // 医保待遇类型名称
        medicalTreatmentTypeName: '',
        // 疾病种类
        diseases: '',
        // 疾病种类名称
        diseasesName: '',

        // 所选商保ID
        sbInsuranceId: '',
        // 所选商保名称
        sbInsuranceName: '',

        // 所选服务包ID
        servicePackageId: '',
        // 所选服务包名称
        servicePackageName: '',
        // 所选权益ID
        patientEquitiesId: '',
        // 所选权益名称
        equityName: '',
        // 权益剩余次数
        residueNum: ''
      },
      dialog: {
        visible: false,
        data: {}
      }
    }
  },
  activated() {
    this.getDetail()
  },

  methods: {
    // 获取检验挂号单详情
    getDetail() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.inquiry
        .getCheckRegisterOrderDetail(params)
        .then((res) => {
          this.model = res.data
          this.doctorInfo = res.data?.doctorInfo || {}
          this.patientInfo = res.data?.familyInfo || {}
          this.inspectList = res.data?.checkRegisteringOrderDetails || []
          this.getDeduction()
        })
        .finally(() => {
          this.loading.get = false
        })
    },
    // 获取抵扣配置
    getDeduction() {
      let params = {
        doctorId: this.model.doctorId,
        nethospitalId: this.model.doctorInfo.nethospitalId,
        orderType: 6 // 1咨询 2复诊 3购药 4挂号 5服务包 6检验挂号订单 7检验单
      }
      peace.service.inquiry.getPermissionsDeduction(params).then((res) => {
        this.deductionList = res.data || []
      })
    },
    updatePayInfo() {},
    // 跳转检验挂号单详情
    goInspectRegisterDetail() {
      let json = peace.util.encode({
        orderId: this.model.orderId
      })
      this.$router.replace(`/inspectRegisterDetail/${json}`)
    },

    changeFlag() {
      this.dialog.visible = false
      this.get()
    },

    submit() {
      // if (this.yibaoText && !this.yibaoTypeText) {
      //   return peace.util.alert('请选择医保类型')
      // }
      this.sending = true
      let params = peace.util.deepClone(this.params)
      params.medCardNo = this.yibaoInfo.medCardNo || ''
      params.patientEquitiesId = this.hasSelectedServicePackage == false ? '' : this.servicePackageDialog.data.patientEquitiesId
      let message = ''
      switch (this.paymentDialog.data.value) {
        case 'yibaopay':
          params.patientEquitiesId = ''
          message = !params.medCardNo ? '请填写医保卡号' : ''
          break
        case 'servicePackage':
          params.medCardNo = ''
          message = !params.patientEquitiesId ? '请选择服务包' : ''
          break
        default:
          params.patientEquitiesId = ''
          params.medCardNo = ''
          break
      }
      if (message) {
        this.sending = false
        return peace.util.alert(message)
      }

      peace.service.inquiry
        .apply(params)
        .then((res) => {
          // 订单提交成功
          if (res.data.errorState === 0) {
            // 需要支付，跳转支付
            if (res.data.inquiryStatus === 1) {
              if (res.data.inquiryType == 'returnVisit' && res.data.isCurrentDate == 2) {
                this.goToInspectionRegisteredDetail(res.data)
              } else {
                this.gotoExpenseDetailPage(res.data)
              }
            }
            // 不需要支付，跳转订单
            else {
              this.goToInspectionRegisteredDetail(res.data)
            }
          }

          // 订单提交失败
          // errorState:1 存在未支付订单， 跳转订单
          if (res.data.errorState === 1) {
            return Dialog.confirm({
              title: '提示',
              message: res.msg,
              confirmButtonText: '去看看'
            }).then(() => {
              this.goToConsultDetail(res.data)
            })
          }

          // errorState:2 存在未结束订单，跳转咨询
          if (res.data.errorState === 2) {
            return Dialog.confirm({
              title: '提示',
              message: res.msg,
              confirmButtonText: '继续咨询'
            }).then(() => {
              this.goToMessage(res.data)
            })
          }
        })
        .catch((res) => {
          //203  号源不足 或 号源过期
          if (res.data.code == '203') {
            return Dialog.confirm({
              title: '提示',
              message: res.data.msg,
              confirmButtonText: '确定'
            }).then(() => {
              this.changeSource()
            })
          }
          //205 医保不可用
          else if (res.data.code == '205') {
            return Dialog.confirm({
              title: '提示',
              message: res.data.msg,
              confirmButtonText: '确定',
              showCancelButton: false
            }).then(() => {
              this.goToConsultDetail(res.data.data)
            })
          } else {
            peace.util.alert(res.data.msg)
          }
        })
        .finally(() => {
          this.sending = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
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

.page {
  min-height: 100%;
  background-color: #f5f5f5;
  padding-bottom: 0.1px;
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
</style>
