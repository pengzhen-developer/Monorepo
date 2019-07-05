<template>
  <div>
    <div class="top-bar">
      <div class="info">
        <span class="name">{{ details.name }}</span>
        <span class="sex" v-if="details.sex">
          <i class="el-icon-male" v-if="details.sex === '男'"></i>
          <i class="el-icon-male" v-else></i>
        </span>
        <span class="age" v-if="details.age">{{ details.age }}岁</span>
        <span class="relation">{{ details.relation }}</span>
        <div class="health-info">
          <span class="title">健康档案</span>
          <div class="progress">
            <div :style="`width: ${260 * percentage / 100}px`" class="progress-percentage"></div>
          </div>
          <span class="percentage">{{ details.percentage }}</span>
        </div>
      </div>
      <el-button @click="healthInfoDialog.visible = true" type="text">查看详情</el-button>
    </div>
    <div class="content">
      <el-tabs tab-position="left">
        <el-tab-pane label="全部">
          <PatientHealthRecordCheckItem :data="data" :key="data.date" class="tab-content" listClass="col-3" v-for="data in details.all_health"/>
        </el-tab-pane>
        <el-tab-pane label="日常检测">
          <PatientHealthRecordCheckItem
            :data="data"
            :key="data.date"
            :show-case="false"
            :show-times="true"
            class="tab-content"
            listClass="col-2"
            v-for="data in details.all_health"
          />
        </el-tab-pane>
        <el-tab-pane label="就诊病例">
          <PatientHealthRecordCheckItem
            :data="data"
            :key="data.date"
            :show-check-data="false"
            class="tab-content"
            listClass="col-3"
            v-for="data in details.all_health"
          />
        </el-tab-pane>
        <el-tab-pane label="住院病历">住院病历</el-tab-pane>
        <el-tab-pane label="体检报告">体检报告</el-tab-pane>
        <el-tab-pane label="其他">其他</el-tab-pane>
      </el-tabs>
    </div>
    <peace-dialog :visible.sync="healthInfoDialog.visible" title="健康信息详情" v-if="healthInfoDialog.visible" width="340px">
      <PatientHealthInfoDetails :info="healthInfoDialog.data"/>
    </peace-dialog>
  </div>
</template>
<script>
import PatientHealthInfoDetails from './PatientHealthInfoDetails.vue'
import PatientHealthRecordCheckItem from './PatientHealthRecordCheckItem.vue'

export default {
  name: 'PatientHealthRecordDetails',
  components: {
    PatientHealthInfoDetails,
    PatientHealthRecordCheckItem
  },
  props: {
    details: Object
  },
  data() {
    return {
      healthInfoDialog: {
        visible: false,
        data: {}
      }
    }
  },
  computed: {
    percentage() {
      return parseInt(this.details.percentage) || 0
    }
  },
  methods: {
    routeToData() {
      this.$router.push({
        name: '/patient/myPatient/PatientHealthData',
        params: {
          id: 'wdpuzmvnfo'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.top-bar {
  padding: 10px 20px;

  height: 50px;
  border-radius: 4px;
  border: 2px solid #f8f8f8;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info {
  .name,
  .sex,
  .age,
  .relation {
    vertical-align: middle;
  }
  .name {
    margin-right: 5px;

    font-size: 16px;
  }
  .sex,
  .age {
    margin: 0 5px;

    color: #999;
    font-size: 12px;
  }
  .relation {
    margin-right: 30px;
    padding: 0 6px;

    font-size: 13px;
    color: $--color-primary;

    background-color: #d9f7f3;
    border-radius: 2px;
  }
  .health-info {
    color: #5b9eff;
    display: inline-block;
    .title,
    .progress,
    .percentage {
      vertical-align: middle;
    }
    .title {
      font-weight: bold;
      font-weight: 500;
    }
    .progress {
      position: relative;
      margin: 0 10px;
      width: 260px;
      height: 6px;
      border-radius: 6px;
      background-color: #d7e9ff;
      display: inline-block;
      &-percentage {
        position: absolute;
        width: 0;
        height: 100%;
        border-radius: 6px;
        background-color: #5b9eff;
        display: inline-block;
        transition: 0.5s width cubic-bezier(0.4, 0, 0.2, 1);
      }
    }
    .percentage {
      padding: 0 4px;
      border: 1px solid;
      border-radius: 2px;
      font-size: 12px;
      background-color: #e2ebff;
      transform: scale(0.9, 0.9);
      display: inline-block;
    }
  }
}
.content {
  margin-top: 10px;
  .el-tabs {
    /deep/ &__item {
      padding: 0 10px 0 0;
      border-right: 2px solid #e4e7ed;
      font-weight: normal !important;
      height: 34px;
    }
    /deep/ &__content {
      padding: 0 0 0 20px;
    }
  }
}
</style>
