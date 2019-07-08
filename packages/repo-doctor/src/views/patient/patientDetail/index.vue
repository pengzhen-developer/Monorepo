<template>
  <div class="patient-detail">
    <div class="header" v-if="patientInfo">
      <img :src="patientInfo.user_info.weixin_head_url" class="header-img" />

      <div class="header-info">
        <div class="first-line">
          <span class="name">{{ patientInfo.user_info.patient_remarks || patientInfo.user_info.real_name || patientInfo.user_info.weixin_name }}</span>
          <span class="sex" v-if="patientInfo.user_info.sex">
            <i :class="[patientInfo.user_info.sex === '男' ? 'el-icon-male' : 'el-icon-female']"></i>
          </span>

          <div style="display: inline-block; margin-left: 10px;" v-if="patientInfo.privateDoctor.isPrivateDoctor">
            <span class="sex private-doctor">私人医生</span>
            <span class="date" style="display: inline-block; margin-left: 10px;">{{ patientInfo.privateDoctor.validityTime }} 到期</span>
          </div>
        </div>
        <div class="second-line">
          <span class="label">微信昵称</span>
          <span class="value">{{ patientInfo.user_info.weixin_name }}</span>

          <span class="label">联系方式</span>
          <span class="value">{{ patientInfo.user_info.tel }}</span>
        </div>
      </div>
    </div>

    <div class="content">
      <el-tabs class="tab" v-model="activeTab">
        <el-tab-pane label="咨询记录" name="咨询记录">
          <PatientInquiryDetail></PatientInquiryDetail>
        </el-tab-pane>
        <el-tab-pane label="健康档案" name="健康档案">
          <PatientHealthRecord></PatientHealthRecord>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import PatientInquiryDetail from './PatientInquiryDetail'
import PatientHealthRecord from './PatientHealthRecord'

export default {
  components: {
    PatientInquiryDetail,
    PatientHealthRecord
  },

  data() {
    return {
      activeTab: '健康档案',

      patientInfo: undefined
    }
  },

  created() {
    this.get()
  },

  methods: {
    get() {
      const params = { patientid: this.$route.params.id }

      peace.service.patient.patientListDescPc(params).then(res => {
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

