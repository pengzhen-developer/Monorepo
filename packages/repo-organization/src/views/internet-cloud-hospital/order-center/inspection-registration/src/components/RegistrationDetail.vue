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
        <p class="title ">订单信息</p>
      </div>
      <el-form inline
               space-none
               label-suffix="："
               class="q-mb-24">
        <div class="row">
          <div class="col">
            <el-form-item label="订单编号">
              <span class="no-wrap">{{orderInfo.orderNo||'-'}}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="状态">
              <span>{{orderInfo.orderStatusText||'-'}}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="预约医生">
              <span>{{orderInfo.doctorName||'-'}}</span>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <el-form-item label="预约科室">
              <span>{{orderInfo.deptName||'-'}}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="下单时间">
              <span>{{orderInfo.createdTime||'-'}}</span>
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
        <p class="title ">患者信息</p>
      </div>
      <el-form inline
               space-none
               label-suffix="："
               class="q-mb-24">
        <div class="row">
          <div class="col">
            <el-form-item label="就诊人姓名">
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
        <p class="title ">支付信息</p>
      </div>
      <el-form inline
               space-none
               label-suffix="：">
        <div class="row">
          <div class="col">
            <el-form-item label="支付方式">
              <span>{{payInfo.payType||'-'}}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="合计金额">
              <span>{{payInfo.totalMoney||'-'}}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="自费金额">
              <span>{{payInfo.ownMoney||'-'}}</span>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <el-form-item label="医保个人支付">
              <span>{{payInfo.medicalMoney||'-'}}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="医保统筹支付">
              <span>{{payInfo.medicalTotalMoney||'-'}}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="支付时间">
              <span>{{payInfo.payTime||'-'}}</span>
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
      orderInfo: {},
      patientInfo: {},
      payInfo: {}
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getDetail()
    })
  },
  methods: {
    getDetail() {
      Service.getRegisteringOrderDetail({ orderNo: this.data }).then((res) => {
        this.orderInfo = res.data?.orderInfo ?? {}
        this.patientInfo = res.data?.patientInfo ?? {}
        this.payInfo = res.data?.payInfo ?? {}
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
</style>