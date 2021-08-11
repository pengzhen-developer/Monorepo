<template>
  <div>
    <van-cell-group class="group"
                    v-if="loading">
      <van-cell title="订单金额"
                v-if="orderType!==3">
        <peace-price v-bind:price="innerPayInfo.orderMoney"
                     v-bind:transformOrigin="'right'"
                     v-bind:size="16"></peace-price>
      </van-cell>
      <template v-if="!disabled">
        <van-cell title="支付方式">
          <div class="pay-type"
               v-bind:class="innerPayType === 'wxpay' && 'active'"
               v-on:click="selectPayType('wxpay')">全自费支付</div>
          <div class="pay-type"
               v-if="deduction.length>0"
               v-bind:class="innerPayType === 'deduction' && 'active'"
               v-on:click="selectPayType('deduction')">医保/权益抵扣</div>
        </van-cell>
      </template>
      <template v-else>
        <van-cell title="支付方式">
          <div class="pay-type active"
               v-if="(innerPayInfo.source===4&&innerPayInfo.insureTypeCode===11)||innerPayInfo.medCardNo">医保/权益抵扣</div>
          <div class="pay-type active"
               v-else>全自费支付</div>
        </van-cell>
      </template>
      <template v-if="innerPayType === 'wxpay'">
        <van-cell title="支付类型">
          <van-image class="icon-wxpay"
                     :src="require('@src/assets/images/ic_pay_wechat_payment.png')"></van-image>
          <span>微信支付</span>
        </van-cell>
        <van-cell title="自费金额"
                  v-if="orderType!==3">
          <peace-price v-bind:price="innerPayInfo.orderMoney"
                       v-bind:transformOrigin="'right'"
                       v-bind:color="'#f2223b'"
                       v-bind:size="16"></peace-price>
        </van-cell>
      </template>

      <template v-if="innerPayType === 'deduction'">
        <van-cell title="抵扣类型"
                  v-if="!disabled"
                  v-on:click="showDeductionDialog">
          <span>{{getDeductionName}}</span>
          <van-image :src="require('@src/assets/images/ic_right.png')"></van-image>
        </van-cell>
        <van-cell title="抵扣类型"
                  v-else>
          <span>{{getDeductionName}}</span>
        </van-cell>

        <!-- 医保 -->
        <template v-if="deductionType === 'yibaopay'">
          <template v-if="!disabled">
            <van-cell title="医保卡号"
                      v-on:click="openYbDialog">
              <span :class="!innerPayInfo.medCardNo ? 'disabled-text':''">{{innerPayInfo.medCardNo || '请填写'}}</span>
              <van-image :src="require('@src/assets/images/ic_right.png')"></van-image>
            </van-cell>
            <van-cell title="医保类型"
                      v-on:click="openYbTypeDialog">
              <span :class="!innerPayInfo.medicalTreatmentTypeText ? 'disabled-text':''">{{innerPayInfo.medicalTreatmentTypeText || '请填写'}}</span>
              <van-image :src="require('@src/assets/images/ic_right.png')"></van-image>
            </van-cell>
            <van-cell title="病种"
                      v-on:click="openYbMunterDiseaseDialog"
                      v-if="canShowYbMunterDisease">
              <span :class="!innerPayInfo.diseasesName ? 'disabled-text':''">{{innerPayInfo.diseasesName || '请填写'}}</span>
              <van-image :src="require('@src/assets/images/ic_right.png')"></van-image>
            </van-cell>
          </template>
          <template v-else>
            <van-cell title="医保卡号"
                      v-on:click="openYbDialog">
              <span :class="!innerPayInfo.medCardNo ? 'disabled-text':''">{{innerPayInfo.medCardNo || '请填写'}}</span>
              <van-image :src="require('@src/assets/images/ic_right.png')"
                         v-if="!orderInfo.MedicalCardNo"></van-image>
            </van-cell>
            <van-cell title="医保类型"
                      v-on:click="openYbTypeDialog">
              <span :class="!innerPayInfo.medicalTreatmentTypeText ? 'disabled-text':''">{{innerPayInfo.medicalTreatmentTypeText || '请填写'}}</span>
              <van-image :src="require('@src/assets/images/ic_right.png')"
                         v-if="!orderInfo.medicalTreatmentType"></van-image>
            </van-cell>
            <van-cell title="病种"
                      v-on:click="openYbMunterDiseaseDialog"
                      v-if="canShowYbMunterDisease">
              <span :class="!innerPayInfo.diseasesName ? 'disabled-text':''">{{innerPayInfo.diseasesName || '请填写'}}</span>
              <van-image :src="require('@src/assets/images/ic_right.png')"
                         v-if="!orderInfo.diseasesCode"></van-image>
            </van-cell>
          </template>
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
          <van-cell title="自费金额"
                    v-if="orderType!==3">
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

    <!-- 普通医保 -->
    <SelectYibaoCard v-if="showYb"
                     v-model="ybVisible"
                     :info="ybData"
                     :serviceTel="innerPayInfo.serviceTel"
                     @onSuccess="confirmYbInsurance"></SelectYibaoCard>

    <!-- 医保类型 -->
    <SelectYibaoType v-if="showYb"
                     v-model="ybTypeVisible"
                     :medicalTreatmentTypes="medicalTreatmentTypes"
                     :medicalTreatmentType="innerPayInfo.medicalTreatmentType"
                     @onSuccess="confirmYbType"></SelectYibaoType>

    <!-- 门特医保 -->
    <SelectYibaoMunterDisease v-if="showYb"
                              v-model="ybMunterDiseaseVisible"
                              :diseases="diseases"
                              :diseasesCode="innerPayInfo.diseasesCode"
                              @onSuccess="confirmYbMunterDisease"></SelectYibaoMunterDisease>

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
import SelectYibaoType from '@src/views/components/YibaoTypeSelect.vue'
import SelectYibaoCard from '@src/views/components/YibaoCardSelect'
import SelectYibaoMunterDisease from '@/views/components/YibaoMunterDiseaseSelect.vue'
import SelectServicePackage from '@src/views/components/SelectServicePackage'

export default {
  name: 'PayCard',
  props: {
    //是否可点击切换 支付类型
    disabled: {
      type: [Boolean],
      default() {
        return false
      }
    },
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
    //订单详情
    orderInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    nethospitalId: {
      type: [String, Number],
      default() {
        return ''
      }
    },
    orderType: {
      type: [String, Number],
      default() {
        return ''
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
  components: { SelectDeduction, SelectYibaoType, SelectYibaoCard, SelectServicePackage, SelectYibaoMunterDisease },
  data() {
    return {
      // 组件内部使用的支付方式 (wxpay:全自费支付 deduction:医保/权益抵扣)
      innerPayType: '',
      //三方支付方式
      paymentType: 'wxpay',
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

      // 是否显示医保
      showYb: false,
      // 是否显示医保弹窗
      ybVisible: false,

      // 是否显示医保类型
      ybTypeVisible: false,

      //是否显示门特
      ybMunterDiseaseVisible: false,

      deduction: [],
      //医保类型
      medicalTreatmentTypes: [],

      //门特疾病
      diseases: [],

      // 服务包权益列表
      servicePackageList: [],
      // 是否显示服务包权益弹窗
      spVisible: false,

      // 是否显示商保弹窗
      sbVisible: false,

      loading: false
    }
  },
  watch: {
    payType: {
      handler(payType) {
        if (payType === '') {
          this.innerPayType = 'wxpay'
          this.deductionType = ''
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
    canGetDeduction: {
      handler(val) {
        if (val) {
          this.getPermissionsDeduction()
        }
      },
      immediate: true
    }
  },
  computed: {
    canShowYbMunterDisease() {
      return this.innerPayInfo?.medicalTreatmentType?.toString() === '2'
    },
    canGetDeduction() {
      if (this.doctorId && this.nethospitalId) {
        return true
      } else {
        return false
      }
    },
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
    //获取权益抵扣列表
    getPermissionsDeduction() {
      const params = {
        doctorId: this.doctorId,
        nethospitalId: this.nethospitalId,
        orderType: this.orderType // 问诊 2复诊 3购药 4挂号 5服务包 6检验挂号订单 7检验单
      }
      peace.service.inquiry.getPermissionsDeduction(params).then(async (res) => {
        const deduction = res.data || []
        //H5暂不处理商保
        this.deduction = deduction.filter((item) => item.type !== 'shangbaopay')

        // servicePackage 服务包抵扣 yibaopay 医保支付 shangbaopay 商保
        let yibaopay = this.deduction.find((item) => item.type === 'yibaopay')
        let servicePackage = this.deduction.find((item) => item.type === 'servicePackage')
        let shangbaopay = this.deduction.find((item) => item.type === 'shangbaopay')
        if (yibaopay) {
          // 选择医保卡组件获取
          await this.geYibaotDicList()
        }
        if (shangbaopay) {
          // 商保配置从父组件传入
        }
        if (servicePackage) {
          await this.getServicePackageList()
        } else {
          this.loading = true
        }
      })
    },
    //获取医保相关信息
    geYibaotDicList() {
      const params = {}
      peace.service.yibao
        .GetMedicareCardType(params)
        .then((res) => {
          this.medicalTreatmentTypes = res.data.medicalTreatmentType
          this.diseases = res.data.diseases
        })
        .finally(() => {
          this.showYb = true
        })
    },

    // 获取服务包权益列表
    getServicePackageList() {
      let params = {
        doctorId: this.doctorId
      }
      peace.service.servicePackage
        .getRecord(params)
        .then((res) => {
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
            this.update()
          }
        })
        .finally(() => {
          this.loading = true
        })
    },

    // 选择支付方式
    selectPayType(payType) {
      this.innerPayType = payType
      if (payType === 'deduction') {
        this.deductionType = this.deductionType || this.deduction[0].type
        this.deductionDialog.payType = this.deductionType || this.deduction[0].type
        this.update()
      } else {
        //全自费支付 清空抵扣信息
        this.deductionType = ''
        this.update()
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
      if (!this.disabled) {
        this.ybVisible = true
      } else {
        if (!this.orderInfo.MedicalCardNo) {
          if (this.orderType === 3) {
            if (this.orderInfo.source === 4 && this.orderInfo.insureTypeCode === 11) {
              this.ybVisible = true
            }
          } else {
            this.ybVisible = true
          }
        } else {
          this.ybVisible = false
        }
      }
    },

    // 确定选择医保
    confirmYbInsurance(result) {
      if (result?.yibaoInfo?.medCardNo) {
        this.innerPayInfo.medCardNo = result.yibaoInfo.medCardNo

        this.update()
      }
    },

    //打开医保类型弹窗
    openYbTypeDialog() {
      if (!this.disabled) {
        this.ybTypeVisible = true
      } else {
        if (!this.orderInfo.medicalTreatmentType) {
          if (this.orderType === 3) {
            if (this.orderInfo.source === 4 && this.orderInfo.insureTypeCode === 11) {
              this.ybTypeVisible = true
            }
          } else {
            this.ybTypeVisible = true
          }
        } else {
          this.ybTypeVisible = false
        }
      }
    },

    //确认选择医保类型
    confirmYbType(result) {
      if (result?.yibaoInfo?.medicalTreatmentType) {
        this.innerPayInfo.medicalTreatmentType = result.yibaoInfo.medicalTreatmentType
        this.innerPayInfo.medicalTreatmentTypeText = result.yibaoInfo.medicalTreatmentTypeText

        if (this.innerPayInfo.medicalTreatmentType === '1') {
          this.innerPayInfo.diseasesCode = ''
          this.innerPayInfo.diseasesName = ''
        }

        this.update()
      }
    },

    //打开门特疾病弹窗
    openYbMunterDiseaseDialog() {
      if (!this.disabled) {
        this.ybMunterDiseaseVisible = true
      } else {
        if (!this.orderInfo.diseasesCode) {
          if (this.orderType === 3) {
            if (this.orderInfo.source === 4 && this.orderInfo.insureTypeCode === 11) {
              this.ybMunterDiseaseVisible = true
            }
          } else {
            this.ybMunterDiseaseVisible = true
          }
        } else {
          this.ybMunterDiseaseVisible = false
        }
      }
    },

    //确认选择门特疾病
    confirmYbMunterDisease(result) {
      if (result?.yibaoInfo?.diseasesCode) {
        this.innerPayInfo.diseasesCode = result.yibaoInfo.diseasesCode
        this.innerPayInfo.diseasesName = result.yibaoInfo.diseasesName

        this.update()
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

      this.update()
    },

    //更新
    update() {
      this.$emit('update', {
        payType: this.deductionType,
        paymentType: this.paymentType,
        payInfo: this.innerPayInfo
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.group {
  /deep/ .van-cell__title {
    max-width: 6em;
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