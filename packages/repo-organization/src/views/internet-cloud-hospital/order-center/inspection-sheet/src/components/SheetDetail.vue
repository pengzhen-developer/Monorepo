// 编码管理

<template>
  <div class="full-width bg-white">

    <div class="q-pa-24"
         style="border-bottom:1px solid #efefef">
      <el-button icon="el-icon-arrow-left"
                 v-on:click="back">返回上一页</el-button>
    </div>
    <div class="q-pa-24">
      <div class="item-title q-mb-24">
        <div class="title-left"></div>
        <p class="title ">开单</p>
      </div>
      <el-form inline
               space-none
               label-suffix="："
               class="q-mb-24">
        <div class="row">
          <div class="col">
            <el-form-item label="申请单号">
              <span>{{orderInfo.orderNo||'-'}}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="HIS处方号">
              <span>{{orderInfo.orderHis||'-'}}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="咨询订单号">
              <span>{{orderInfo.inquiryNo||'-'}}</span>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <el-form-item label="来源">
              <span>{{orderInfo.serviceTypeText||'-'}}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="总金额">
              <span>{{orderInfo.totalMoney||'-'}}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="状态">
              <span>{{orderInfo.orderStatusText||'-'}}</span>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <el-form-item label="开单医生">
              <span>{{orderInfo.doctorName||'-'}}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="开单科室">
              <span>{{orderInfo.deptName||'-'}}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="开单时间">
              <span>{{orderInfo.createdTime||'-'}}</span>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <el-form-item label="执行科室">
              <span>{{orderInfo.doDeptName||'-'}}</span>
            </el-form-item>
          </div>
        </div>
      </el-form>

      <div class="item-title q-mb-24">
        <div class="title-left"></div>
        <p class="title ">患者信息</p>
      </div>
      <el-form inline
               space-none
               label-suffix="："
               class="q-mb-24">
        <div class="row">
          <div class="col">
            <el-form-item label="就诊人">
              <span>{{patientInfo.patientName||'-'}}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="就诊人ID">
              <span>{{patientInfo.patientId||'-'}}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="性别">
              <span>{{patientInfo.sex||'-'}}</span>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <el-form-item label="年龄">
              <span>{{patientInfo.age||'-'}}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="手机号">
              <span>{{patientInfo.tel||'-'}}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="">
              <span></span>
            </el-form-item>
          </div>
        </div>
      </el-form>

      <div class="item-title q-mb-24">
        <div class="title-left"></div>
        <p class="title ">检验项目</p>
      </div>
      <PeaceTable :data="itemInfo"
                  class="q-mb-24">
        <PeaceTableColumn label="序号"
                          prop="orderNumber"></PeaceTableColumn>
        <PeaceTableColumn label="项目编码"
                          prop="itemNo"></PeaceTableColumn>
        <PeaceTableColumn label="项目名称"
                          prop="itemName"></PeaceTableColumn>
        <PeaceTableColumn label="数量"
                          prop="count"></PeaceTableColumn>
        <PeaceTableColumn label="项目单价"
                          prop="singlePrice"></PeaceTableColumn>
        <PeaceTableColumn label="金额"
                          prop="totalPrice"></PeaceTableColumn>
      </PeaceTable>

      <div class="item-title q-mb-24">
        <div class="title-left"></div>
        <p class="title ">支付信息</p>
      </div>
      <el-form inline
               space-none
               label-suffix="：">
        <div class="flex">
          <div class="flex-item">
            <el-form-item label="订单编号">
              <span>{{baseInfo.orderNo}}</span>
            </el-form-item>
          </div>
          <div class="flex-item">
            <el-form-item label="下单时间">
              <span>{{baseInfo.createdTime}}</span>
            </el-form-item>
          </div>
          <div class="flex-item">
            <el-form-item label="支付方式">
              <span>{{payMentInfo.payModeTxt}}{{payMentInfo.paymentTypeTxt ? ' - ' + payMentInfo.paymentTypeTxt : ''}}</span>
            </el-form-item>
          </div>
          <div class="flex-item"
               v-if="payMentInfo.deductionTypeTxt">
            <el-form-item label="抵扣类型">
              <span>{{payMentInfo.deductionTypeTxt}}</span>
            </el-form-item>
          </div>
          <template v-if="payMentInfo.deductionType === 'yibaopay'">
            <div class="flex-item">
              <el-form-item label="医保类型">
                <span>{{payMentInfo.medicalTreatmentTypetxt}}</span>
              </el-form-item>
            </div>
            <div class="flex-item"
                 v-if="payMentInfo.medicalTreatmentType === 2">
              <el-form-item label="病种">
                <span>{{payMentInfo.diseasesTxt}}</span>
              </el-form-item>
            </div>
          </template>
          <div class="flex-item"
               v-if="baseInfo.payStatus > 0 && baseInfo.divisionId">
            <el-form-item label="发票号">
              <span>{{baseInfo.divisionId}}</span>
            </el-form-item>
          </div>
          <div class="flex-item"
               v-if="baseInfo.payStatus > 0">
            <el-form-item label="支付时间">
              <span>{{baseInfo.payTime}}</span>
            </el-form-item>
          </div>
          <div class="flex-item"
               v-if="baseInfo.cancelTime">
            <el-form-item label="取消时间">
              <span>{{baseInfo.cancelTime}}</span>
            </el-form-item>
          </div>
          <div class="flex-item"
               v-if="baseInfo.refundTime">
            <el-form-item label="退款时间">
              <span>{{baseInfo.refundTime}}</span>
            </el-form-item>
          </div>
          <div class="flex-item"
               v-for="item in moneyRecord"
               v-bind:key="item.name">
            <el-form-item :label="item.name">
              <span>{{item.value}}</span>
            </el-form-item>
          </div>
          <div class="flex-item">
            <el-form-item label="自费金额">
              <span>￥{{baseInfo.payStatus >= 1 ? baseInfo.payMoney:baseInfo.orderMoney}}</span>
            </el-form-item>
          </div>
        </div>
      </el-form>

    </div>
  </div>
</template>

<script>
import Service from '../service'
export default {
  props: {
    data: String
  },
  data() {
    return {
      baseInfo: {},
      moneyRecord: [],
      orderInfo: {},
      patientInfo: {},
      payInfo: {},
      itemInfo: [],
      payMentInfo: {}
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getDetail()
    })
  },
  methods: {
    getDetail() {
      Service.getItemOrderInfo({ orderNo: this.data }).then((res) => {
        this.baseInfo = res.data?.baseInfo ?? {}
        this.moneyRecord = res.data?.moneyRecord ?? []
        this.orderInfo = res.data?.orderInfo ?? {}
        this.patientInfo = res.data?.patientInfo ?? {}
        this.payInfo = res.data?.payInfo ?? {}
        this.itemInfo = res.data?.itemInfo ?? []
        this.payMentInfo = res.data?.payMentInfo ?? {}
      })
    },
    back() {
      this.$emit('onBack')
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.item-title {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.title-left {
  width: 4px;
  height: 16px;
  background: #3099a6;
  border-radius: 2px;
}
.title {
  color: var(--q-color-grey-333);
  margin-left: 10px;
  font-weight: 600;
  font-size: 16px;
}

.flex-item {
  flex: none;
  width: 33.33%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>