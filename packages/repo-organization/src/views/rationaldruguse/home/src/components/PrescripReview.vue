<template>
  <div class="card-style flex column">
    <div class="card-title">处方审核情况</div>
    <el-tabs class="element-ui-default"
             v-model="activeName">
      <q-tabs v-model="activeName"
              dense
              v-bind:breakpoint="0"
              active-color="primary"
              indicator-color="primary"
              align="left"
              style="border-bottom:1px solid #EFEFEF">
        <q-tab v-for="item in resource"
               v-bind:key="item"
               v-bind:label="item"
               v-bind:name="item" />
      </q-tabs>
    </el-tabs>
    <div class="row  col items-center ">
      <div class="preNums  column items-center justify-center">
        <p>{{prescriptionCount}}</p>
        <div></div>
        <span>处方总数</span>
      </div>
      <div class="row col">
        <div class="col">
          <DoughnutChart v-bind:data="interceptionRatio"></DoughnutChart>
        </div>
        <div class="col">
          <DoughnutChart v-bind:data="interveneRatio"></DoughnutChart>
        </div>
        <div class="col">
          <DoughnutChart v-bind:data="prescriptionPassRatio"></DoughnutChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Util from '@src/util'
import Service from '../service'
import DoughnutChart from './DoughnutChart'

export default {
  components: {
    DoughnutChart
  },
  watch: {
    activeName: {
      handler(val) {
        this.getData(val)
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      activeName: '门诊',
      resource: ['门诊', '急诊', '住院'],
      prescriptionCount: 0,
      interceptionRatio: {
        title: '预审拦截率',
        mainColor: '#1391FF',
        secondaryColor: '#E7F4FF',
        subject: 0,
        other: 0
      },
      interveneRatio: {
        title: '审方干预率',
        mainColor: '#915DD4',
        secondaryColor: '#F4EEFA',
        subject: 0,
        other: 0
      },
      prescriptionPassRatio: {
        title: '处方通过率',
        mainColor: '#06C3A2',
        secondaryColor: '#E6F9F5',
        subject: 0,
        other: 0
      }
    }
  },
  methods: {
    getData(source) {
      const params = {
        hosCode: Util.user.getUserInfo().custCode,
        prescriptionSource: source
      }
      Service.prescriptionExeStatisticsChart(params).then((res) => {
        let data = res.data.list
        this.prescriptionCount = Peace.numeral(data.prescriptionCount).format('0,0')
        this.interceptionRatio.subject = data.interceptionRatio.subject
        this.interceptionRatio.other = data.interceptionRatio.other
        this.interveneRatio.subject = data.interveneRatio.subject
        this.interveneRatio.other = data.interveneRatio.other
        this.prescriptionPassRatio.subject = data.prescriptionPassRatio.subject
        this.prescriptionPassRatio.other = data.prescriptionPassRatio.other
      })
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.q-tab {
  padding: 0 8px;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.65);
}
.card-style {
  height: 308px;
  background: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(48, 153, 166, 0.1);
  border-radius: 4px;
  padding: 20px 0 0 20px;
}
.card-title {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22px;
}
.card-title:before {
  content: '';
  display: inline-block;
  position: relative;
  top: 3px;
  margin-right: 10px;
  width: 4px;
  height: 16px;
  background: rgba(48, 153, 166, 1);
  border-radius: 2px;
}
.preNums {
  width: 85px;
  height: 156px;
  background: rgba(48, 153, 166, 0.05);
  border-radius: 4px;
}
.preNums p {
  font-size: 20px;
  font-weight: bold;
  color: #3099a6;
  line-height: 24px;
}
.preNums div {
  width: 60px;
  height: 1px;
  background: #3099a6;
  margin: 22px 0 18px 0;
}
.preNums span {
  font-size: 14px;
  font-weight: 600;
  color: #3099a6;
  line-height: 20px;
}
.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>