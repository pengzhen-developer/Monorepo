<template>
  <div class="patient-health-record-family" v-if="data">
    <div class="header">
      <div class="detail">
        <span class="name">{{ data.name }}</span>
        <span class="sex" v-if="data.sex">
          <i :class="data.sex === '男' ? 'el-icon-male' : 'el-icon-female'"></i>
        </span>
        <span class="age" v-if="data.age">{{ data.age }}岁</span>

        <span class="title">健康信息</span>
        <el-progress :percentage="parseInt(data.percentage)" :show-text="false" class="progress" color="#5b9eff"></el-progress>
        <el-tag class="percent">{{ data.percentage }}</el-tag>
      </div>

      <div class="control">
        <el-button @click="showDetail" type="text">查看详情</el-button>
      </div>
    </div>

    <div class="content">
      <el-tabs tab-position="left" v-model="activeTab">
        <el-tab-pane label="全部" name="1">
          <RecordAll :id="data.familyId" :key="1" type="1"></RecordAll>
        </el-tab-pane>
        <el-tab-pane label="日常检测" lazy name="2">
          <RecordAll :id="data.familyId" key="2" type="2"></RecordAll>
        </el-tab-pane>
        <el-tab-pane label="就诊病历" lazy name="3">
          <RecordAll :id="data.familyId" key="3" type="3"></RecordAll>
        </el-tab-pane>
        <el-tab-pane label="住院病历" lazy name="4">
          <RecordAll :id="data.familyId" key="4" type="4"></RecordAll>
        </el-tab-pane>
        <el-tab-pane label="体检报告" lazy name="5">
          <RecordAll :id="data.familyId" key="5" type="5"></RecordAll>
        </el-tab-pane>
        <el-tab-pane label="其它" lazy name="6">
          <RecordAll :id="data.familyId" key="6" type="6"></RecordAll>
        </el-tab-pane>
      </el-tabs>
    </div>

    <peace-dialog :visible.sync="dialog.visible" title="健康信息详情" width="340px">
      <el-form :model="dialog.model" label-position="right" label-width="160px">
        <el-form-item label="婚姻状况：">
          <span>{{ dialog.model.maritalStatus || '暂无' }}</span>
        </el-form-item>
        <el-form-item label="生育状态：">
          <span>{{ dialog.model.fertilityStatus || '暂无' }}</span>
        </el-form-item>
        <el-form-item label="手术或外伤：">
          <span>{{ dialog.model.surgeryTrauma || '暂无' }}</span>
        </el-form-item>
        <el-form-item label="家族病史：">
          <span>{{ dialog.model.familyHistory || '暂无' }}</span>
        </el-form-item>
        <el-form-item label="药物过敏：">
          <span>{{ dialog.model.drugAllergy || '暂无' }}</span>
        </el-form-item>
        <el-form-item label="食物/接触物过敏：">
          <span>{{ dialog.model.foodAllergy || '暂无' }}</span>
        </el-form-item>
        <el-form-item label="个人习惯：">
          <span>{{ dialog.model.personalHabit || '暂无' }}</span>
        </el-form-item>
      </el-form>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'
import RecordAll from './RecordAll'

export default {
  props: {
    data: Object
  },

  components: {
    RecordAll
  },

  data() {
    return {
      activeTab: '1',

      dialog: {
        visible: false,
        model: {}
      }
    }
  },

  methods: {
    showDetail() {
      const params = { familyId: this.data.familyId }
      peace.service.health.getOneHealth(params).then(res => {
        this.dialog.visible = true
        this.dialog.model = res.data.personalInfo
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.patient-health-record-family {
  .header {
    height: 50px;
    line-height: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border: 2px solid #f8f8f8;
    border-radius: 4px;

    .detail {
      display: flex;
      align-items: center;

      .name {
        font-size: 16px;
        margin: 0 5px 0 0;
      }

      .sex {
        margin: 0 5px 0 0;
      }

      .age {
        margin: 0 20px 0 0;
      }

      .title {
        color: #5b9eff;
        margin: 0 10px 0 0;
        font-weight: 500;
      }

      .progress {
        width: 260px;
        margin: 0 10px 0 0;

        /deep/ .el-progress-bar__outer {
          background: #d7e9ff;
        }
      }

      .percent {
        border-radius: 2px;
        border-color: #4395f5;
        color: #4395f5;
        background: #e3f0f0;
      }
    }
  }

  .content {
    margin: 10px 0 0 0;

    /deep/ .el-tabs {
      .el-tabs__item.is-active {
        border-right: 2px solid #00c6ae;
      }

      &__item {
        padding: 0 10px 0 0;
        border-right: 2px solid #e4e7ed;
        font-weight: normal !important;
        height: 34px;
      }
      &__content {
        padding: 0 0 0 20px;
      }
    }
  }

  .el-form-item {
    margin-bottom: 2px;
  }

  /deep/ .el-form-item--mini .el-form-item__content {
    font-size: 14px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }
}
</style>

