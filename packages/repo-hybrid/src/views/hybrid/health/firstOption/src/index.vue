<template>
  <div>

    <div class="text-center q-ma-md">
      <div>{{detail.hospitalName}}</div>
      <div>处方笺</div>
    </div>
    <div class="text-grey-666 q-mx-md q-mb-sm">开具日期：{{detail.inputTime}}</div>

    <div class="dashed-line q-mx-md"></div>

    <div class="row items-center q-py-sm">
      <div class="column col items-center">
        <span class="text-grey-666">姓名</span>
        <span>{{detail.patientName}}</span>
      </div>
      <div class="column col items-center">
        <span class="text-grey-666">性别</span>
        <span>{{detail.patientSex}}</span>
      </div>
      <div class="column col items-center">
        <span class="text-grey-666">年龄</span>
        <span>{{detail.patientAge}}</span>
      </div>
      <div class="column col items-center">
        <span class="text-grey-666">科别</span>
        <span>{{detail.deptName}}</span>
      </div>
    </div>

    <div class="section-line"
         color="text-separator"></div>

    <div class="q-mx-md">
      <div class="section-title">处方编号</div>
      <q-separator color="text-separator"
                   size="mini" />
      <div class="section-detail">{{detail.prescriptionCode}}</div>
    </div>

    <div class="section-line"></div>

    <div class="q-mx-md">
      <div class="section-title">临床诊断</div>
      <q-separator color="text-separator"
                   size="mini" />
      <div class="section-detail">{{detail.diagnosis}}</div>
    </div>

    <div class="section-line"></div>

    <div class="q-mx-md">
      <div class="section-title">Rp</div>
      <q-separator color="text-separator" />
      <div class="q-my-10"
           v-for="(item, index) in detail.drugJson"
           v-bind:key="item.drugCode">
        <div class="row justify-between q-mb-6">
          <div>
            <span style="margin-right: 30rpx;">{{item.drugName}} </span>
            <span> {{item.specification}}</span>
          </div>
          <div class="p-drug-qty">x{{item.number}}{{item.numberUnit}}</div>
        </div>
        <div class="text-grey-999"
             v-if="item.usage">用法用量：{{item.usage}}。每次{{item.doseNoce}}{{item.doseUnit}}，每日{{item.dailyTimes}}次，{{item.useDays}}天</div>
        <q-separator v-show="index == detail.drugJson.length"
                     color="text-separator q-mt-10" />
      </div>
    </div>

    <div class="section-line"></div>

    <div class="row q-ma-md justify-between">
      <div class="col">
        <div class="text-grey-666">调配药师：</div>
        <div class="text-grey-333">{{detail.drugMaker}}</div>
      </div>
      <div class="col">
        <div class="text-grey-666">发药药师：</div>
        <div class="text-grey-333">{{detail.drugSender}}</div>
      </div>
    </div>

    <div class="section-line"></div>

  </div>
</template>

<script>
import Service from './service/index'
export default {
  data() {
    return {
      detail: undefined
    }
  },

  beforeMount() {
    this.fetch()
  },

  methods: {
    fetch() {
      const params = {
        prescriptionCode: this.$route.params.prescriptionCode
      }
      Service.fetch(params).then((res) => {
        this.detail = res.data.prescriptionInfo
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.section-line {
  height: 16px;
  background: #f9f9f9;
}

.dashed-line {
  border-top: 1px dashed #cccccc;
  height: 1px;
  overflow: hidden;
}

.section-title {
  color: var(--q-color-grey-666);
  font-size: 15px;
  margin-top: 12px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    // position: absolute;
    display: inline-block;
    margin-right: 8px;
    background: var(--q-color-primary);
    width: 4px;
    height: 18px;
    border-radius: 2px;
  }
}

.section-detail {
  color: var(--q-color-grey-333);
  font-size: 15px;
  margin: 12px 16px;
}
</style>
