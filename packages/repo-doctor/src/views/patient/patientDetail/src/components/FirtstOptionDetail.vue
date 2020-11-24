// 处方详情

<template>
  <div class="q-px-lg p-py-md"
       v-if="data">

    <div class="text-grey-6">
      <span>No.</span>
      <span>{{ data.prescriptionCode }}</span>
    </div>
    <!-- 处方标题 -->
    <div class="relative-position text-center q-mb-lg">
      <p class="text-h5 text-weight-bolder">{{ data.hospitalName }}</p>
      <p class="text-h5 text-weight-bolder">处方笺</p>

      <div class="q-mt-md"
           style="border-bottom: 1px dashed #e2e2e2;"></div>
    </div>

    <!-- 处方基础信息 -->
    <div class="q-mb-md">
      <div class="row q-mb-xs">
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">姓名</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.patientName }}</span>
        </div>
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">性别</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.patientSex }}</span>
        </div>
      </div>

      <div class="row q-mb-xs">
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">年龄</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.patientAge }}</span>
        </div>
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">科别</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.deptName }}</span>
        </div>
      </div>

      <div class="row q-mb-xs">
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">开具时间</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.inputTime }}</span>
        </div>
        <div class="row col-6">

        </div>
      </div>

      <div class="row q-mb-xs">
        <span class="text-justify"
              style="width: 4em;">临床诊断</span>
        <span class="q-mx-xs">：</span>
        <span class="col text-weight-bold">
          {{ data.diagnosis }}
        </span>
      </div>
    </div>

    <!-- 处方明细信息 -->
    <div class="q-mb-md">
      <div class="flex justify-between items-end q-mb-xs">
        <span class="text-h6 text-weight-bolder">Rp</span>
      </div>

      <div style="border-bottom: 1px solid #F3F3F3;"></div>

      <!-- 药品 -->
      <div class="q-mb-none">
        <div v-for="(drug, index) in data.drugJson"
             v-bind:key="drug.drugName">
          <div class="q-py-md">
            <div class="flex justify-between q-mb-sm text-subtitle1 text-weight-bold">
              <div>
                <span class="q-mr-sm">{{ drug.drugName }}</span>
                <span>{{ drug.specification }}</span>
              </div>
              <div>
                <span>x</span>
                <span>{{ drug.number + drug.numberUnit }}</span>
              </div>
            </div>
            <div class="text-grey-6"
                 v-if="drug.usage">
              <span>
                用法用量：{{drug.usage}}。每次{{drug.doseNoce}}{{drug.doseUnit}}，每日{{drug.dailyTimes}}次，{{drug.useDays}}天
              </span>
            </div>
          </div>

          <div v-show="index !== data.drugJson.length - 1"
               style="border-bottom: 1px dashed #e2e2e2;"></div>
        </div>
      </div>

      <div class="q-mb-md"
           style="border-bottom: 1px solid #F3F3F3;"></div>
      <!-- 审核 -->
      <div class="q-mb-md">
        <div class="row q-mb-xs">
          <div class="row col-6">
            <span class="text-justify"
                  style="width: 4em;">调配药师</span>
            <span class="q-mx-xs">：</span>
            <div class="text-grey-333">{{data.drugMaker}}</div>
          </div>
          <div class="row col-6">
            <span class="text-justify"
                  style="width: 4em;">发药药师</span>
            <span class="q-mx-xs">：</span>
            <div class="text-grey-333">{{data.drugSender}}</div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  props: {
    prescriptionCode: String
  },

  data() {
    return {
      data: undefined
    }
  },

  beforeMount() {
    this.getRecordDetail()
  },

  methods: {
    getRecordDetail() {
      const params = {
        prescriptionCode: this.prescriptionCode
      }
      Peace.service.inquiry.getFirstOptionDetail(params).then((res) => {
        this.data = res.data.prescriptionInfo
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.text-info {
  color: #3e96f9 !important;
}

.text-justify {
  text-align-last: justify;
}
</style>