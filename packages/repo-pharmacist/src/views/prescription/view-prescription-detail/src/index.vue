<template>
  <div class="row  full-width">
    <div class="col bg-white"
         v-loading="loading">
      <PrescriptionDetail v-bind:prescriptionInfo="prescriptionInfo"></PrescriptionDetail>
    </div>
    <div class="col bg-white q-ml-sm">
      <div class="q-pa-24 flex">

        <el-radio-group v-model="active"
                        class="q-mt-4 q-mb-32 q-ml-auto q-mr-auto"
                        v-on:change="handleChange">
          <el-radio-button :label="tab.value"
                           v-for="(tab,index) in tabs"
                           :key="index">{{tab.label}}</el-radio-button>

        </el-radio-group>
        <!-- 审方记录 -->
        <div v-if="active===0"
             class="full-width">

          <PrescriptionCheckRecord v-bind:id="jztClaimNo"></PrescriptionCheckRecord>
        </div>
        <!-- 系统审方结果 -->
        <div class="full-width"
             v-if="active===1"
             v-loading="isShowPreResult">

          <PrescriptionCheckReslut v-bind:data="preInfo"></PrescriptionCheckReslut>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import Service from './service'
import PrescriptionDetail from '@views/prescription/prescription-detail'
import PrescriptionCheckReslut from '@views/prescription/prescription-check-reslut'
import PrescriptionCheckRecord from '@views/prescription/prescription-check-record'
export default {
  components: {
    PrescriptionDetail,
    PrescriptionCheckReslut,
    PrescriptionCheckRecord
  },
  props: {
    jztClaimNo: String
  },
  data() {
    return {
      // currentJztClaimNo: ''
      loading: false,
      isShowPreResult: false,
      tabs: [
        { label: '审方记录', value: 0, checked: true },
        { label: '系统审方结果', value: 1, checked: false }
      ],
      active: undefined,
      prescriptionInfo: {},
      preInfo: undefined
    }
  },
  created() {
    this.getPrescriptionInfo()
  },
  methods: {
    handleChange(value) {
      switch (value) {
        case 1:
          this.getResultInfo()
          break
      }
    },
    //处方信息
    getPrescriptionInfo() {
      this.loading = true
      Service.getPrescriptionInfo({ jztClaimNo: this.jztClaimNo })
        .then((res) => {
          this.prescriptionInfo = Object.assign({}, res.data)
          if (res.data.doubleSign) {
            this.active = 0
          } else {
            this.active = 1
            this.getResultInfo()
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    getResultInfo() {
      this.isShowPreResult = true
      Service.getActionDetail({ jztClaimNo: this.jztClaimNo })
        .then((res) => {
          console.log(res)
          this.preInfo = res.data
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.isShowPreResult = false
        })
    }
  }
}
</script>

<style>
</style>