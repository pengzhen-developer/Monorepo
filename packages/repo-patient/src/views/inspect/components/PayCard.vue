<template>
  <div>
    <van-cell-group class="group">
      <van-cell title="订单金额">
        <peace-price v-bind:price="info.orderMoney"
                     v-bind:transformOrigin="'right'"
                     v-bind:size="16"></peace-price>
      </van-cell>
      <van-cell title="支付方式">
        <div class="pay-btn"
             v-bind:class="payIndex===0&&'active'"
             v-on:click="selectPayType(0)">全自费支付</div>
        <div class="pay-btn"
             v-bind:class="payIndex===1&&'active'"
             v-on:click="selectPayType(1)"
             v-if="permissionsDeductions.length>0">医保/权益抵扣</div>
      </van-cell>
      <van-cell title="抵扣类型"
                v-if="payIndex===1"
                v-on:click="choosePayment">
        <span>{{currentSeriveInfo.name}}</span>
        <van-image :src="require('@src/assets/images/ic_right.png')"></van-image>
      </van-cell>
      <!-- 医保 -->
      <template v-if="canShowYiybao">
        <van-cell title="医保卡号"
                  v-on:click="choosePayment">
          <span>{{yibaoDialog.data.medCardNo || '请选择'}}</span>
          <van-image :src="require('@src/assets/images/ic_right.png')"></van-image>
        </van-cell>
      </template>

      <!-- 服务包 -->
      <template v-if="canShowServicePackage">
        <van-cell title="权益名称"
                  v-on:click="choosePayment">
          <span>{{servicePackageDialog.data.patientEquitiesName||'请选择'}}</span>
          <van-image :src="require('@src/assets/images/ic_right.png')"></van-image>
        </van-cell>
      </template>

      <van-cell title="自费金额"
                v-if="canShowPayMoney">
        <peace-price v-bind:price="payMoney"
                     v-bind:transformOrigin="'right'"
                     v-bind:color="'#f2223b'"
                     v-bind:size="16"></peace-price>
      </van-cell>
    </van-cell-group>

    <!-- 医保 -->
    <YibaoCardSelect v-model="yibaoDialog.visible"
                     :info="yibaoDialog.data"
                     @onSuccess="selectYiybaoCallback"></YibaoCardSelect>

    <!-- 选择服务包权益 -->
    <SelectServicePackage v-model="servicePackageDialog.visible"
                          :info="servicePackageDialog.data"
                          :list="servicesList"
                          @onSuccess="selectServicePackageCallback"></SelectServicePackage>
  </div>
</template>

<script>
import peace from '@src/library'

import YibaoCardSelect from '@src/views/components/YibaoCardSelect'
import SelectServicePackage from '@src/views/components/SelectServicePackage'
export default {
  name: 'PayCard',
  props: {
    familyId: {
      type: [String, Number],
      default() {
        return ''
      }
    },
    familyName: {
      type: String,
      default() {
        return ''
      }
    },
    doctorId: {
      type: [String, Number],
      default() {
        return ''
      }
    },
    // 支付方式
    payType: {
      type: String,
      default() {
        return ''
      }
    },
    // 支付信息
    payInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    // 抵扣配置
    deduction: {
      type: Array,
      default() {
        return []
      }
    },
    // 服务包默认权益
    equitiesId: {
      type: String,
      default() {
        return ''
      }
    },
    // 商保配置
    sbConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    // 商保列表
    sbInsuranceList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: { YibaoCardSelect, SelectServicePackage },
  data() {
    return {
      payIndex: 0,
      // 权益列表
      permissionsDeductions: [],
      // 抵扣类型弹框
      paymentDialog: {
        visible: false,
        data: {}
      },
      // 服务包弹框
      servicePackageDialog: {
        visible: false,
        data: {}
      },
      servicesList: [],
      // 医保弹框
      yibaoDialog: {
        visible: false,
        data: {}
      },

      // 组件内部使用的支付方式 (wxpay:全自费支付 deduction:医保/权益抵扣)
      innerPayType: '',
      // 抵扣类型
      deductionType: '',
      // 抵扣弹窗
      deductionDialog: {
        show: false,
        payType: ''
      },

      // 支付信息
      innerPayInfo: {
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

      // 医保卡列表
      ybInsuranceList: [],
      // 所用医保卡
      ybInsuranceCard: {
        familyId: '',
        familyName: '',
        medCardId: '',
        medCardNo: '',
        region: ''
      },
      // 是否显示医保弹窗
      ybVisible: false,

      // 是否显示医保类型
      ybTypeVisible: false,

      // 服务包权益列表
      servicePackageList: [],
      // 是否显示服务包权益弹窗
      spVisible: false,

      // 是否显示商保弹窗
      sbVisible: false
    }
  },
  watch: {
    payType: {
      handler(payType) {
        if (payType === 'wxpay') {
          this.innerPayType = 'wxpay'
          // this.deductionType = ''
        } else {
          this.innerPayType = 'deduction'
          this.deductionType = payType
        }
      },
      immediate: true
    },
    payInfo: {
      handler(payInfo) {
        this.innerPayInfo = payInfo
      },
      immediate: true
    },
    deduction: {
      handler(deduction) {
        // servicePackage 服务包抵扣 yibaopay 医保支付 shangbaopay 商保
        let yibaopay = deduction.find((item) => item.type === 'yibaopay')
        let servicePackage = deduction.find((item) => item.type === 'servicePackage')
        let shangbaopay = deduction.find((item) => item.type === 'shangbaopay')
        if (yibaopay) {
          this.getMedicalInsuranceList()
        }
        if (servicePackage) {
          this.getServicePackageList()
        }
        if (shangbaopay) {
          // 商保配置从父组件传入
        }
      },
      immediate: true
    }
  },
  computed: {
    payMoney() {
      return this.payIndex === 0 ? this.info.orderMoney : '0.00'
    },
    canShowPayMoney() {
      return this.payIndex === 0 || this.canShowServicePackage
    },
    //servicePackage 服务包抵扣 ，medicalInsurance医保支付，commercialInsurance 药事链权益抵扣
    canShowServicePackage() {
      return this.payIndex === 1 && this.currentSeriveInfo.type === 'servicePackage'
    },
    canShowYiybao() {
      return this.payIndex === 1 && this.currentSeriveInfo.type === 'medicalInsurance'
    },
    canShowShangbao() {
      return this.payIndex === 1 && this.currentSeriveInfo.type === 'commercialInsurance'
    }
  },
  methods: {
    // 获取医保卡列表
    getMedicalInsuranceList() {},
    // 获取服务包权益列表
    getServicePackageList() {},
    getPermissionsDeduction() {
      const params = {
        doctorId: this.info.doctorId,
        nethospitalId: this.info.nethospitalId
      }
      peace.service.inquiry.getPermissionsDeduction(params).then((res) => {
        this.permissionsDeductions = res.data
        this.currentSeriveInfo = res.data.length > 0 && res.data[0]
      })
    },
    selectServicePackageCallback(result) {
      if (result) {
        this.servicePackageDialog.data = Object.assign({}, this.servicePackageDialog.data, result)
      }
    },
    selectPaymentCallback(result) {
      if (result) {
        this.currentSeriveInfo = Object.assign({}, this.currentSeriveInfo, result)
        this.$emit('onChooseDeductionType', this.currentSeriveInfo)
      }
    },
    selectYiybaoCallback(result) {
      if (result.checked === true) {
        this.yibaoDialog.data = result.yibaoInfo
      }
    },
    selectPayType(index) {
      if (index !== this.payIndex) {
        this.payIndex = index
      }
    },
    choosePayment() {
      this.paymentDialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.group {
  /deep/ .van-cell__title {
    width: 6em;
    flex: none;
    display: flex;
    align-items: center;
  }
  /deep/ .van-cell__value {
    color: #333;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
.pay-btn {
  cursor: pointer;
  padding: 5px 15px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 0.6);
  line-height: 20px;
  border: 1px solid rgba(51, 51, 51, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: #fff;
  &.active {
    color: #00c6ae;
    background: #eafaf8;
    border-color: #ccf4ef;
  }
  & + .pay-btn {
    margin-left: 10px;
  }
}
</style>