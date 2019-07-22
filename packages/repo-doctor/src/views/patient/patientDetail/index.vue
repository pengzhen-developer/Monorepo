<template>
  <div class="patient-detail">
    <div class="header" v-if="patientInfo">
      <img :src="patientInfo.userInfo.wxHeadUrl" class="header-img" />

      <div class="header-info">
        <div class="first-line">
          <span class="name">{{ patientInfo.userInfo.remark || patientInfo.userInfo.realName || patientInfo.userInfo.wxName }}</span>
          <span class="sex" v-if="patientInfo.userInfo.sex">
            <i :class="[patientInfo.userInfo.sex === '男' ? 'el-icon-male' : 'el-icon-female']"></i>
          </span>

          <div style="display: inline-block; margin-left: 10px;" v-if="patientInfo.userInfo.isPrivateDoctor">
            <span class="sex private-doctor">私人医生</span>
            <span class="date" style="display: inline-block; margin-left: 10px;">{{ patientInfo.userInfo.validityTime }} 到期</span>
          </div>
        </div>
        <div class="second-line">
          <span class="label">微信昵称</span>
          <span class="value">{{ patientInfo.userInfo.wxName }}</span>

          <span class="label">联系方式</span>
          <span class="value">{{ patientInfo.userInfo.tel }}</span>
        </div>
      </div>
    </div>

    <div class="content" v-if="patientInfo">
      <el-tabs class="tab" v-model="activeTab">
        <!-- 家人列表 -->
        <el-tab-pane label="家人列表" name="家人列表">
          <MyFamilys :data="patientInfo.familyList" v-if="patientInfo.familyList && patientInfo.familyList.length > 0"></MyFamilys>
          <NoData v-else></NoData>
        </el-tab-pane>
        <!-- 健康档案 -->
        <el-tab-pane label="健康档案" name="健康档案">
          <PatientHealthRecord></PatientHealthRecord>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import MyFamilys from './MyFamilys'
import PatientHealthRecord from './PatientHealthRecord'

import NoData from '@src/views/components/NoData'

export default {
  components: {
    MyFamilys,
    // PatientInquiryDetail,
    PatientHealthRecord,

    NoData
  },

  data() {
    return {
      activeTab: '家人列表',

      patientInfo: undefined
    }
  },

  created() {
    this.get()
  },

  methods: {
    get() {
      const params = { patientId: this.$route.params.id }

      peace.service.patient.getPatientHome(params).then(res => {
        this.patientInfo = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.patient-detail {
  background: #f9f9f9 !important;
  padding: 0 !important;

  .header {
    height: 102px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    margin: 0 0 10px 0;
    padding: 20px;

    background: #fff;
    display: flex;
    align-items: center;

    .header-img {
      width: 50px;
      height: 50px;
      margin: 0 28px 0 0;
      border-radius: 50%;
    }

    .header-info {
      .first-line,
      .name,
      .sex,
      .private-doctor {
        vertical-align: middle;
      }
      .first-line {
        display: flex;
        align-items: center;
        text-align: left;
        margin: 0 0 10px 0;

        .name {
          margin: 0 5px 0 0;
          font-size: 18px;
          font-weight: 500;
        }
        .sex {
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
        .date {
          color: rgba(153, 153, 153, 1);
        }
        .private-doctor {
          background: #504c4f;
          color: #f7f9b3;
          padding: 3px 5px 2px 5px;
          border-radius: 4px;
          font-size: 12px;
          line-height: 17px;
        }
      }

      .second-line {
        .label {
          color: #8f8f8f;
          margin: 0 10px 0 0;
        }

        .value {
          margin: 0 40px 0 0;
        }
      }
    }
  }

  .content {
    /deep/ .el-tabs.tab {
      .el-tabs__header {
        padding: 0 20px;
      }

      .el-tabs__item {
        font-weight: bold;
      }

      .el-tabs__nav-wrap::after {
        display: none;
      }

      .el-tabs__content {
        background: #fff;
      }
    }
  }

  .el-icon-male {
    color: #3890ff;
  }
  .el-icon-female {
    color: #f56c6c;
  }
}
</style>

