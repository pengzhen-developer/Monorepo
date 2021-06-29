<template>
  <div>
    <van-cell-group class="group">
      <van-cell title="订单金额">
        <peace-price v-bind:price="innerPayInfo.orderMoney"
                     v-bind:transformOrigin="'right'"
                     v-bind:size="16"></peace-price>
      </van-cell>
      <van-cell title="支付方式">
        <div class="pay-type"
             v-bind:class="innerPayType === 'wxpay' && 'active'"
             v-on:click="selectPayType('wxpay')">全自费支付</div>
        <div class="pay-type"
             v-if="deduction.length>0"
             v-bind:class="innerPayType === 'deduction' && 'active'"
             v-on:click="selectPayType('deduction')">医保/权益抵扣</div>
      </van-cell>

      <template v-if="innerPayType === 'wxpay'">
        <van-cell title="支付类型">
          <van-image class="icon-wxpay"
                     :src="require('@src/assets/images/ic_pay_wechat_payment.png')"></van-image>
          <span>微信支付</span>
        </van-cell>
        <van-cell title="自费金额">
          <peace-price v-bind:price="innerPayInfo.orderMoney"
                       v-bind:transformOrigin="'right'"
                       v-bind:color="'#f2223b'"
                       v-bind:size="16"></peace-price>
        </van-cell>
      </template>

      <template v-if="innerPayType === 'deduction'">
        <van-cell title="抵扣类型"
                  v-on:click="showDeductionDialog">
          <span>{{getDeductionName}}</span>
          <van-image :src="require('@src/assets/images/ic_right.png')"></van-image>
        </van-cell>

        <!-- 医保 -->
        <template v-if="deductionType === 'yibaopay'">
          <van-cell title="医保卡号"
                    v-on:click="openYbDialog">
            <span :class="!innerPayInfo.medCardNo ? 'disabled-text':''">{{innerPayInfo.medCardNo || '请填写'}}</span>
            <van-image :src="require('@src/assets/images/ic_right.png')"></van-image>
          </van-cell>
        </template>

        <!-- 服务包 -->
        <template v-if="deductionType === 'servicePackage'">
          <van-cell title="服务包名称"
                    v-on:click="openServicePackageDialog">
            <span :class="!innerPayInfo.servicePackageId ? 'disabled-text':''">{{innerPayInfo.servicePackageName || '请选择'}}</span>
            <van-image :src="require('@src/assets/images/ic_right.png')"></van-image>
          </van-cell>
          <van-cell class="equity"
                    v-if="innerPayInfo.servicePackageId && innerPayInfo.patientEquitiesId"
                    title="权益名称">
            <span>{{innerPayInfo.patientEquitiesName}}</span>
          </van-cell>
          <van-cell title="自费金额">
            <peace-price price="0"
                         v-bind:transformOrigin="'right'"
                         v-bind:color="'#f2223b'"
                         v-bind:size="16"></peace-price>
          </van-cell>
        </template>
      </template>

    </van-cell-group>

    <!-- 选择抵扣 -->
    <SelectDeduction v-model="deductionDialog.show"
                     v-bind:type="deductionDialog.payType"
                     v-bind:deduction="deduction"
                     v-on:success="selectDeductionType"></SelectDeduction>

    <!-- 医保 -->
    <SelectYibaoCard v-if="showYb"
                     v-model="ybVisible"
                     :info="ybData"
                     @onSuccess="confirmYbInsurance"></SelectYibaoCard>

    <!-- 选择服务包权益 -->
    <SelectServicePackage v-model="spVisible"
                          :info="innerPayInfo"
                          :list="servicePackageList"
                          @onSuccess="confirmServicePackage"></SelectServicePackage>
  </div>
</template>

<script>
import peace from '@src/library'

import SelectDeduction from '@src/views/components/SelectDeduction'
import SelectYibaoCard from '@src/views/components/YibaoCardSelect'
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
    // H5 商保未开放，暂不考虑
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
  components: { SelectDeduction, SelectYibaoCard, SelectServicePackage },
  data() {
    return {
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
        sbInsuranceName: ''
      },

      // 是否显示医保
      showYb: false,
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
          // 选择医保卡组件获取
          this.showYb = true
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
    getDeductionName() {
      let deduction = this.deduction.filter((item) => {
        return item.type === this.deductionType
      })
      return deduction.length ? deduction[0].name : ''
    },
    ybData() {
      return {
        familyId: this.familyId,
        familyName: this.familyName
      }
    }
  },
  methods: {
    // 获取服务包权益列表
    getServicePackageList() {
      let params = {
        doctorId: this.doctorId
      }
      peace.service.servicePackage.getRecord(params).then((res) => {
        let servicePackageList = res.data || []

        let servicePackageId = ''
        let servicePackageName = ''
        let patientEquitiesId = ''
        let patientEquitiesName = ''

        if (servicePackageList.length > 0) {
          if (this.equitiesId) {
            servicePackageList.forEach((item) => {
              item.equities.forEach((sitem) => {
                if (sitem.patientEquitiesId == this.equitiesId) {
                  servicePackageId = item.servicePackageId
                  servicePackageName = item.servicePackageName
                  patientEquitiesId = this.equitiesId
                  patientEquitiesName = sitem.equitiesName
                  patientEquitiesName = `${sitem.equitiesName}(剩余${sitem.residueNum}次)`
                }
              })
            })
          } else {
            servicePackageId = servicePackageList[0].servicePackageId
            servicePackageName = servicePackageList[0].servicePackageName
            patientEquitiesId = servicePackageList[0].equities[0].patientEquitiesId
            patientEquitiesName = servicePackageList[0].equities[0].equitiesName
            patientEquitiesName = `${servicePackageList[0].equities[0].equitiesName}(剩余${servicePackageList[0].equities[0].residueNum}次)`
          }
        }

        this.servicePackageList = servicePackageList
        this.innerPayInfo.servicePackageId = servicePackageId
        this.innerPayInfo.servicePackageName = servicePackageName
        this.innerPayInfo.patientEquitiesId = patientEquitiesId
        this.innerPayInfo.patientEquitiesName = patientEquitiesName

        if (patientEquitiesId) {
          // 有服务包权益，就默认选中
          this.innerPayType = 'deduction'
          this.deductionType = 'servicePackage'
          this.deductionDialog.payType = 'servicePackage'
          this.$emit('update', {
            payType: this.deductionType,
            payInfo: this.innerPayInfo
          })
        }
      })
    },
    // 选择支付方式
    selectPayType(payType) {
      this.innerPayType = payType
      if (payType === 'deduction') {
        this.deductionType = this.deductionType || this.deduction[0].type
        this.deductionDialog.payType = this.deductionType || this.deduction[0].type
        this.$emit('update', {
          payType: this.deductionType,
          payInfo: this.innerPayInfo
        })
      } else {
        this.$emit('update', {
          payType: this.innerPayType,
          payInfo: this.innerPayInfo
        })
      }
    },
    // 显示抵扣方式弹窗
    showDeductionDialog() {
      this.deductionDialog.show = true
      this.deductionDialog.payType = this.deductionType
    },
    // 选择抵扣方式
    selectDeductionType(result) {
      this.deductionType = result
    },
    // 打开医保弹窗
    openYbDialog() {
      this.ybVisible = true
    },
    // 确定选择医保
    confirmYbInsurance(result) {
      if (result?.yibaoInfo?.medCardNo) {
        this.innerPayInfo.medCardNo = result.yibaoInfo.medCardNo
        this.$emit('update', {
          payType: this.deductionType,
          payInfo: this.innerPayInfo
        })
      }
    },
    // 打开服务包弹窗
    openServicePackageDialog() {
      this.spVisible = true
    },
    // 确认选择服务包
    confirmServicePackage(result) {
      this.innerPayInfo.servicePackageId = result.servicePackageId
      this.innerPayInfo.servicePackageName = result.servicePackageName
      this.innerPayInfo.patientEquitiesId = result.patientEquitiesId
      this.innerPayInfo.patientEquitiesName = result.patientEquitiesName

      this.$emit('update', {
        payType: this.deductionType,
        payInfo: this.innerPayInfo
      })
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
    span {
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: right;
    }
  }
  .equity {
    /deep/ .van-cell__title {
      font-size: 14px;
      color: #858585;
    }
    /deep/ .van-cell__value {
      font-size: 14px;
      color: #858585;
    }
  }
}

.pay-type {
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
  & + .pay-type {
    margin-left: 10px;
  }
}

.icon-wxpay {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.disabled-text {
  color: #adadad;
}
</style>