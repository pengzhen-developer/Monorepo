<template>
  <div>
    <div class="card">
      <div :key="item.familyId" class="card-item" v-for="item in data">
        <div class="card-title">
          <span class="name">{{ item.familyName }}</span>
          <span class="sex" v-if="item.familySex">
            <i :class="[item.familySex  ? 'el-icon-male' : 'el-icon-female']"></i>
          </span>
          <span class="age" v-if="item.familyAge">{{ item.familyAge }}岁</span>
          <el-tag>{{ item.familyRelation }}</el-tag>
        </div>
        <div class="card-content-row">
          <div class="lt">
            <span class="icon">
              <i class="icon_ic_talklog"></i>
            </span>
            <span class="text">咨询记录</span>
          </div>
          <div class="rt">
            <span class="numbers">{{ item.inquiryNum || 0 }}次</span>
            <el-button :disabled="!item.inquiryNum" @click="getInquiryDetail(item)" type="text">查看详情</el-button>
          </div>
        </div>
        <div class="card-content-row">
          <div class="lt">
            <span class="icon">
              <i class="icon_V"></i>
            </span>
            <span class="text">病程记录</span>
          </div>
          <div class="rt">
            <span class="numbers">{{ item.courseCount || 0 }}次</span>
            <el-button :disabled="!item.courseCount" @click="getDiseaseCourseDetail(item)" type="text">查看详情</el-button>
          </div>
        </div>
      </div>
    </div>

    <peace-dialog :visible.sync="patientInquiryDetailDialog.visible" title="咨询记录">
      <PatientInquiryDetail :id="patientInquiryDetailDialog.id"></PatientInquiryDetail>
    </peace-dialog>

    <peace-dialog :visible.sync="diseaseCourseDialog.visible" title="病程记录">
      <DiseaseCourse :id="diseaseCourseDialog.id"></DiseaseCourse>
    </peace-dialog>
  </div>
</template>
<script>
import DiseaseCourse from './DiseaseCourse'
import PatientInquiryDetail from './PatientInquiryDetail'

export default {
  components: {
    DiseaseCourse,
    PatientInquiryDetail
  },

  props: {
    data: {
      type: Array
    }
  },

  data() {
    return {
      sex: '男',

      diseaseCourseDialog: {
        visible: false,
        id: ''
      },

      patientInquiryDetailDialog: {
        visible: false,
        id: ''
      }
    }
  },
  methods: {
    // 获取咨询记录
    getInquiryDetail(item) {
      this.patientInquiryDetailDialog.visible = true
      this.patientInquiryDetailDialog.id = item.familyId
    },

    // 获取病程记录
    getDiseaseCourseDetail(item) {
      this.diseaseCourseDialog.visible = true
      this.diseaseCourseDialog.id = item.familyId
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  padding: 22px 20px;
  margin-right: -20px;
  display: flex;
  flex-wrap: wrap;
  &-item {
    margin-right: 20px;
    margin-bottom: 20px;
    padding: 0 16px;
    width: calc(33.3333% - 20px);
    box-shadow: 3px 5px 6px 1px rgba(238, 238, 238, 0.4);
    border-radius: 4px;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
  &-title,
  &-content-row {
    padding: 10px 0;
  }
  &-title {
    font-size: 12px;
    .name {
      font-size: 16px;
      font-weight: 500;
    }
    .age {
      color: #666;
    }
    & > span {
      margin-right: 10px;
    }
  }
  &-content-row + .card-content-row {
    border-top: 1px solid #eee;
  }
  &-content-row {
    display: flex;
    justify-content: space-between;
    .lt,
    .rt {
      vertical-align: middle;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .el-button {
        padding: 1px 0;
        font-size: 12px;
        font-weight: normal;
      }
      & > span {
        vertical-align: middle;
      }
    }
    .icon {
      margin-right: 10px;
      width: 20px;
      height: 20px;
      text-align: center;
      display: inline-block;
    }
    .numbers {
      margin-right: 20px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
