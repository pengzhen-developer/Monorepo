<template>
  <div class="q-mx-16 q-my-12 prescription-recode-style">
    <div class="full-height column">
      <div class="flex full-width col">
        <!-- 处方详情 -->
        <div class="pre-content left">
          <PrescriptionDetail v-bind:prescriptionInfo="prescriptionInfo"></PrescriptionDetail>
        </div>
        <!-- 审方结果-审方记录 -->
        <div class="pre-content right">
          <PrescriptionReviewReslut v-bind:jztClaimNo="jztClaimNo"></PrescriptionReviewReslut>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrescriptionDetail from './components/prescription-detail'
import PrescriptionReviewReslut from './components/prescription-review-reslut'

import Service from './service'
export default {
  name: 'PrescriptionDetails',
  components: { PrescriptionDetail, PrescriptionReviewReslut },
  props: {},

  data() {
    return {
      jztClaimNo: undefined,
      prescriptionInfo: {}
    }
  },
  created() {
    const id = Peace.cache.sessionStorage.get('358-jztClaimNo')
    if (id) {
      this.jztClaimNo = id
      this.getPrescriptionInfo(id)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.pre-content {
  background-color: white;
  border-radius: 4px;
  &.left {
    width: calc((100% - 10px) * 53 / 100);
    margin-right: 10px;
  }
  &.right {
    width: calc((100% - 10px) * 47 / 100);
    height: initial;
  }
}

.prescription-recode-style {
  height: calc(100vh - 280px);
}
</style>