<template>
  <div class="receive"
       v-if="injectConsultInfo.consultInfo">
    <div class="card">
      <h4>个人信息</h4>
      <el-row>
        <el-col :span="8">
          <span class="label w4">姓名</span>
          <span class="divider">:</span>
          <span class="value">
            {{ injectConsultInfo.patientInfo.familyName }}
          </span>
        </el-col>
        <el-col :span="8">
          <span class="label w4">年龄</span>
          <span class="divider">:</span>
          <span class="value">
            {{ injectConsultInfo.patientInfo.familyAge + "岁"}}
          </span>
        </el-col>
        <el-col :span="8">
          <span class="label w4">性别</span>
          <span class="divider">:</span>
          <span class="value">
            {{ injectConsultInfo.patientInfo.familySex }}
          </span>
        </el-col>
      </el-row>
    </div>

    <div class="card">
      <h4>申请会诊医生</h4>

      <div style="display: flex; align-items: center;">
        <el-avatar :src="injectConsultInfo.fromPhoto"></el-avatar>
        <span
              style="color: #333; margin: 0 10px; font-weight:600; ">{{ injectConsultInfo.inviteDoctorInfo.doctorName }}</span>
        <span
              style="color: #999; margin: 0 5px">{{ injectConsultInfo.inviteDoctorInfo.deptName }}</span>
        <span
              style="color: #999; margin: 0 5px">{{ injectConsultInfo.inviteDoctorInfo.doctorTitle }}</span>
        <span
              style="color: #999; margin: 0 5px">{{ injectConsultInfo.inviteDoctorInfo.hospitalName }}</span>
      </div>
    </div>

    <div class="card">
      <h4>申请会诊信息</h4>
      <el-row>
        <el-col :span="24">
          <span class="label">初诊诊断</span>
          <span class="divider">:</span>
          <span class="value">
            <el-tag :key="item"
                    style="margin-right: 5px; border: none; "
                    type="info"
                    v-for="item in injectConsultInfo.consultInfo.diagnose.split('|')">{{ item }}
            </el-tag>
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="label">申请会诊说明</span>
          <span class="divider">:</span>
          <span class="value">
            {{ injectConsultInfo.consultInfo.consultExplain }}
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="label">期望会诊时间</span>
          <span class="divider">:</span>
          <span class="value">
            {{ injectConsultInfo.consultInfo.expectTime }}
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="label">提交申请时间</span>
          <span class="divider">:</span>
          <span class="value">
            {{ injectConsultInfo.consultInfo.createdTime }}
          </span>
        </el-col>
      </el-row>
    </div>

    <div class="card">
      <h4>审核意见</h4>
      <div class="content time-line">
        <el-timeline>
          <el-timeline-item v-for="check in injectConsultInfo.checkList"
                            v-bind:key="check.checkType"
                            v-bind:timestamp="check.checkDate"
                            placement="top"
                            type="primary">
            <el-tag v-bind:type="check.checkStatus === 3 ? 'primary' : 'info'"
                    class="timestamp_extend">
              {{ check.checkStatus === 3 ? '通过' : '拒绝' }}
            </el-tag>

            <template v-if="check.checkType === 'doctor'">
              <div class="timestamp_remark">
                <template v-if="check.checkStatus === 1">
                  <p>医生：等待审批</p>
                </template>
                <template v-if="check.checkStatus === 2">
                  <p>医生：审批拒绝</p>
                  <p>拒绝原因：{{ check.checkSuggest }}</p>
                </template>
                <template v-if="check.checkStatus === 3">
                  <p>医生：审批通过</p>
                </template>
              </div>
            </template>
            <template v-else>
              <div class="timestamp_remark">
                <p>
                  <span>审核机构：</span>
                  <span>{{ check.hospitalName }}</span>
                </p>
                <p>
                  <span>审核备注：</span>
                  <span>{{ check.checkSuggest }}</span>
                </p>
              </div>
            </template>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <div class="card"
         v-if="injectConsultInfo.consultInfo.isCommit">
      <el-row>
        <h4>会诊小结</h4>
        <span class="label w4">会诊所见</span>
        <span class="divider">:</span>
        <span class="value">{{ injectConsultInfo.consultInfo.consultFind }}</span>
      </el-row>
      <el-row>
        <span class="label w4">目前诊断</span>
        <span class="divider">:</span>
        <span class="value">{{ injectConsultInfo.consultInfo.consultDiagnose }}</span>
      </el-row>
      <el-row>
        <span class="label w4">建议</span>
        <span class="divider">:</span>
        <span class="value">{{ injectConsultInfo.consultInfo.consultSuggest }}</span>
      </el-row>
      <el-row>
        <span class="label w4">医生签名</span>
        <span class="divider">:</span>
        <span class="value">{{ injectConsultInfo.consultInfo.doctorSignImg }}</span>
      </el-row>
    </div>
  </div>
</template>
<script>
import peace from '@src/library'

export default {
  data() {
    return {
      injectConsultInfo: null
    }
  },

  created() {
    this.getConsultationDetail()
  },

  methods: {
    getConsultationDetail() {
      const params = {
        consultNo: this.$store.getters['consultation/consultInfo'].consultNo
      }

      peace.service.consult.getConsultInfo(params).then(res => {
        this.injectConsultInfo = res.data.info
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.receive {
  padding: 10px;

  .card {
    background: rgba(249, 249, 249, 1);
    border-radius: 4px;
    padding: 10px 20px;
    margin: 0 0 20px 0;

    &:last-child {
      margin: 0;
    }

    h4 {
      font-size: 16px;
      color: rgba(0, 0, 0, 1);
      line-height: 22px;
      margin: 0 0 10px 0;
    }

    .label {
      display: inline-block;
      width: 6em;
      text-align: justify;
      text-align-last: justify;
      vertical-align: top;
      margin: 0 0 10px 0;

      &.w4 {
        width: 4em;
      }
    }

    .divider {
      margin: 0 10px 0 5px;
      vertical-align: top;
    }

    .value {
      display: inline-flex;
      flex-flow: wrap;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;

      &.img-container {
        width: calc(100% - 180px);
      }

      .img {
        max-width: 57px;
        max-height: 57px;
        background: #ccc;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }

  .el-timeline {
    padding: 0;

    /deep/.el-timeline-item__node--normal {
      left: 2px;
      width: 6px;
      height: 6px;
    }
  }

  .timestamp_extend {
    position: absolute;
    top: 0;
    left: 200px;
  }
}
.建议 {
  display: inline-block;
  width: 4em;
  text-align: justify;
  text-align-last: justify;
}
</style>