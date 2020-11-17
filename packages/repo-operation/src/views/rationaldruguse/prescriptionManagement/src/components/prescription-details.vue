<template>
  <div class="layout-route bg-white full-width ">
    <div class="full-height">
      <el-button plain
                 class="q-mb-24"
                 v-on:click="back"
                 style="padding:1px 4px">
        <div class="q-px-md q-py-sm">
          <i class="el-icon-arrow-left"></i>
          <span>返回上一页</span>
        </div>
      </el-button>
      <div class="flex full-width ">
        <!-- 处方详情 -->
        <div class="pre-content left">
          <PrescriptionDetail v-bind:prescriptionInfo="prescriptionInfo"></PrescriptionDetail>
        </div>
        <!-- 审方结果-审方记录 -->
        <div class="pre-content right">
          <PrescriptionReviewReslut v-bind:actionDetail="actionDetail"
                                    v-bind:prescriptionLog="prescriptionLog"></PrescriptionReviewReslut>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrescriptionDetail from './prescription-detail'
import PrescriptionReviewReslut from './prescription-review-reslut'

import Service from '../service'
export default {
  name: 'PrescriptionDetails',
  components: { PrescriptionDetail, PrescriptionReviewReslut },
  props: {
    info: Object
  },

  data() {
    return {
      prescriptionInfo: {},
      prescriptionLog: {},
      actionDetail: {}
    }
  },
  watch: {
    info: {
      handler(val) {
        const jztClaimNo = val.jztClaimNo
        this.getPrescriptionInfo(jztClaimNo)
        this.getPrescriptionLog(jztClaimNo)
        this.getActionDetail(jztClaimNo)
      },
      immediate: true
    }
  },
  methods: {
    back() {
      this.$emit('goback', true)
    },
    //处方信息
    getPrescriptionInfo(jztClaimNo) {
      Service.getPrescriptionInfo({ jztClaimNo }).then((res) => {
        this.prescriptionInfo = Object.assign({}, res.data)
      })
    },
    //审方记录
    getPrescriptionLog(jztClaimNo) {
      Service.getPrescriptionLog({ jztClaimNo }).then((res) => {
        this.prescriptionLog = Object.assign({}, res.data)
      })
    },
    //系统审方结果
    getActionDetail(jztClaimNo) {
      Service.getActionDetail({ jztClaimNo }).then((res) => {
        this.actionDetail = Object.assign({}, res.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pre-content {
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);
  &.left {
    width: calc((100% - 10px) * 53 / 100);
    margin-right: 10px;
  }
  &.right {
    width: calc((100% - 10px) * 47 / 100);
    height: initial;
  }
}
</style>