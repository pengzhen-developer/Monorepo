<template>
  <div>
    <div class="date" v-if="!showTimes">
      <span v-if="data.date">{{ data.date }}</span>
    </div>
    <div :class="listClass" class="record-list">
      <template v-if="showCase">
        <!-- 门诊病历 -->
        <div :key="item.inquiry_no" class="record-item" v-for="item in data.case">
          <div class="icon">
            <i class="icon_ic_medicalrecord_"></i>
          </div>
          <div class="data">
            <p>门诊病历</p>
            <p>{{ item.netHospital_name }}丨{{ item.netdept_name }}</p>
          </div>
        </div>
        <!-- 处方 -->
        <div :key="item.id" class="record-item" v-for="item in data.prescribe">
          <div class="icon">
            <i class="icon_ic_rp_"></i>
          </div>
          <div class="data">
            <p>处方</p>
            <p>{{ item.netHospital_name }}丨{{ item.netdept_name }}</p>
          </div>
        </div>
      </template>
      <template v-if="showCheckData">
        <!-- 血压 -->
        <div :key="item.id" class="record-item" v-for="item in data.bloodpressuredata">
          <div class="icon">
            <i class="icon_ic_bloodpressure"></i>
            <span>血压</span>
          </div>
          <div class="data">
            <p>
              <strong>{{ item.systolicpressure }}/{{ item.diastolicpressure }}</strong>
              <span class="small-text">mmHg</span>
            </p>
            <span class="small-text date" v-if="showTimes">{{ item.measuretime }}</span>
          </div>
          <el-button @click="showDetails(item, 'xy')" type="text" v-if="showTimes">查看详情</el-button>
        </div>
        <!-- 血糖 -->
        <div :key="item.id" class="record-item" v-for="item in data.bloodsugardata">
          <div class="icon">
            <i class="icon_ic_bloodsugar"></i>
            <span>血糖</span>
          </div>
          <div class="data">
            <p>
              <strong>{{ item.bloodsugar }}</strong>
              <span class="small-text">mmol/L</span>
            </p>
            <span class="small-text date" v-if="showTimes">{{ item.measuretime }}</span>
          </div>
          <el-button @click="showDetails(item, 'xt')" type="text" v-if="showTimes">查看详情</el-button>
        </div>
        <!-- 血氧 -->
        <div :key="item.id" class="record-item" v-for="item in data.bloodoxygendata">
          <div class="icon">
            <i class="icon_ic_bloodoxygen"></i>
            <span>血氧</span>
          </div>
          <div class="data">
            <p>
              <strong>{{ item.bloodoxygen }}</strong>
              <span class="small-text">%</span>
            </p>
            <span class="small-text date" v-if="showTimes">{{ item.measuretime }}</span>
          </div>
          <el-button @click="showDetails(item, 'xy')" type="text" v-if="showTimes">查看详情</el-button>
        </div>
        <!-- 体脂 -->
        <div :key="item.id" class="record-item" v-for="item in data.bodyfat">
          <div class="icon">
            <i class="icon_ic_bodyfat"></i>
            <span>体脂</span>
          </div>
          <div class="data">
            <p>
              <strong>{{ item.bfr.toFixed(0) }}</strong>
              <span class="small-text">%</span>
            </p>
            <span class="small-text date" v-if="showTimes">{{ item.createTime }}</span>
          </div>
          <el-button @click="showDetails(item, 'tz')" type="text" v-if="showTimes">查看详情</el-button>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PatientHealthRecordCheckItem',
  props: {
    data: Object,
    listClass: {
      type: String,
      default: 'col-2'
    },
    // 是否显示每一项的时间
    showTimes: {
      type: Boolean,
      default: false
    },
    // 是否显示检测数据（血压、血糖、血氧、体脂）
    showCheckData: {
      type: Boolean,
      default: true
    },
    // 是否显示处方、病历
    showCase: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    showDetails(item, checkItemName) {
      console.log(item, checkItemName)
    }
  }
}
</script>
<style lang="scss" scoped>
.date {
  margin-bottom: 5px;
  font-size: 12px;
  color: #999;
  &:before {
    content: '';
    margin-right: 10px;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background-color: $--color-primary;
    display: inline-block;
    vertical-align: middle;
  }
}
.small-text.date {
  &:before {
    display: none;
  }
}
.col-3 {
  .record-item {
    margin-right: 30px;
    width: calc(33.333333% - 20px);
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
.col-2 {
  padding: 5px;
  background-color: #fafafa;
  .record-item {
    margin: 5px;
    width: calc(50% - 10px);
    background-color: #fff;
    border-radius: 2px;
  }
}
.record-item {
  margin-bottom: 10px;
  padding: 10px 15px;
  min-height: 70px;
  box-shadow: 0px 1px 5px 0px rgba(221, 221, 221, 0.5);
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  vertical-align: top;
  .icon {
    margin-right: 15px;
    width: 40px;
    text-align: center;
    color: $--color-primary;
    & > i {
      font-size: 16px;
    }
    & > span {
      white-space: nowrap;
    }
    .icon_ic_medicalrecord_,
    .icon_ic_rp_ {
      font-size: 24px;
    }
  }
  .icon,
  .data {
    display: inline-block;
    vertical-align: middle;
    & > p {
      color: #999;
      font-size: 12px;
      &:first-of-type {
        color: #333;
        font-size: 16px;
      }
    }
  }
  .text {
    color: $--color-primary;
    & > img {
      width: 14px;
      height: auto;
    }
    & > span {
      margin-top: 7px;
      line-height: 20px;
    }
  }
  .data {
    min-width: calc(100% - 120px);
    text-align: left;
    strong {
      margin-right: 5px;
      color: #38485c;
      font-size: 27px;
      font-weight: normal;
      font-weight: 400;
      line-height: 27px;
    }
  }
}
</style>
