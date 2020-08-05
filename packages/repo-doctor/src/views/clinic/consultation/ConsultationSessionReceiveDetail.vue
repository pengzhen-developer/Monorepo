<template>
  <div class="receive"
       v-if="injectConsultInfo">
    <div class="card">
      <h4>患者信息</h4>
      <el-row>
        <el-col :span="8">
          <span class="label w4">姓名</span>
          <span class="divider">:</span>
          <span class="value">
            {{ injectConsultInfo.familyName }}
          </span>
        </el-col>
        <el-col :span="8">
          <span class="label w4">年龄</span>
          <span class="divider">:</span>
          <span class="value">
            {{ injectConsultInfo.familyAge + "岁"}}
          </span>
        </el-col>
        <el-col :span="8">
          <span class="label w4">性别</span>
          <span class="divider">:</span>
          <span class="value">
            {{ injectConsultInfo.familySex }}
          </span>
        </el-col>
      </el-row>
    </div>

    <div class="card">
      <!-- 发起 -->
      <template v-if="injectConsultInfo.toDoctorId ===$store.state.user.userInfo.list.docInfo.doctor_id">
        <h4>会诊医生</h4>

        <div style="display: flex; align-items: center;">
          <el-avatar :src="injectConsultInfo.fromPhoto"></el-avatar>
          <span style="color: #333; margin: 0 10px; font-weight:600; ">{{ injectConsultInfo.fromDoctorName }}</span>
          <span style="color: #999; margin: 0 5px">{{ injectConsultInfo.fromDeptName }}</span>
          <span style="color: #999; margin: 0 5px">{{ injectConsultInfo.fromDoctorTitle }}</span>
          <span style="color: #999; margin: 0 5px">{{ injectConsultInfo.fromHospitalName }}</span>
        </div>
      </template>

      <!-- 受邀 -->
      <template v-else>
        <h4>会诊医生</h4>

        <div style="display: flex; align-items: center;">
          <el-avatar :src="injectConsultInfo.toPhoto"></el-avatar>
          <span style="color: #333; margin: 0 10px; font-weight:600; ">{{ injectConsultInfo.toDoctorName }}</span>
          <span style="color: #999; margin: 0 5px">{{ injectConsultInfo.toDeptName }}</span>
          <span style="color: #999; margin: 0 5px">{{ injectConsultInfo.toDoctorTitle }}</span>
          <span style="color: #999; margin: 0 5px">{{ injectConsultInfo.toHospitalName }}</span>
        </div>
      </template>
    </div>

    <div class="card">
      <h4>会诊信息</h4>
      <el-row>
        <el-col :span="24">
          <span class="label">疾病诊断</span>
          <span class="divider">:</span>
          <span class="value">
            <el-tag :key="item"
                    style="margin-right: 5px; border: none; "
                    type="info"
                    v-for="item in injectConsultInfo.familyDisagnose.split('|')">
              {{ item }}
            </el-tag>
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="label">申请会诊说明</span>
          <span class="divider">:</span>
          <span class="value">
            {{ injectConsultInfo.consultExplain }}
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="label">期望会诊时间</span>
          <span class="divider">:</span>
          <span class="value">
            {{ injectConsultInfo.expectTime }}
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="label">提交申请时间</span>
          <span class="divider">:</span>
          <span class="value">
            {{ injectConsultInfo.createdTime }}
          </span>
        </el-col>
      </el-row>
    </div>

    <div class="card">
      <h4>审核意见</h4>
      <div class="content time-line">
        <el-timeline>
          <el-timeline-item :timestamp="injectConsultInfo.outCheckTime"
                            placement="top"
                            type="primary">
            <el-tag class="timestamp_extend">{{ injectConsultInfo.outCheckStatus === 3 ? "已通过" : "" }}
            </el-tag>

            <div class="timestamp_remark">
              <p>
                <span>审核机构：</span>
                <span>{{ injectConsultInfo.fromHospitalName }}</span>
              </p>
              <p>
                <span>审核备注：</span>
                <span>{{ injectConsultInfo.outCheckSuggest }}</span>
              </p>
            </div>
          </el-timeline-item>

          <el-timeline-item :timestamp="injectConsultInfo.inCheckTime"
                            placement="top"
                            type="primary">
            <el-tag class="timestamp_extend">{{ injectConsultInfo.inCheckStatus === 3 ? "已通过" : "" }}
            </el-tag>

            <div class="timestamp_remark">
              <p>
                <span>审核机构：</span>
                <span>{{ injectConsultInfo.toHospitalName }}</span>
              </p>
              <p>
                <span>审核备注：</span>
                <span>{{ injectConsultInfo.inCheckSuggest }}</span>
              </p>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <div class="card"
         v-if="injectConsultInfo.isCommit">
      <el-row>
        <h4>会诊小结</h4>
        <span class="label w4">会诊所见</span>
        <span class="divider">:</span>
        <span class="value">{{ injectConsultInfo.consultFind }}</span>
      </el-row>
      <el-row>
        <span class="label w4">疾病诊断</span>
        <span class="divider">:</span>
        <span class="value">{{ injectConsultInfo.consultDiagnose }}</span>
      </el-row>
      <el-row>
        <span class="label w4">建议</span>
        <span class="divider">:</span>
        <span class="value">{{ injectConsultInfo.consultSuggest }}</span>
      </el-row>
      <el-row>
        <span class="label w4">医生签名</span>
        <span class="divider">:</span>
        <span class="value">{{ injectConsultInfo.doctorSignImg }}</span>
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

  watch: {
    '$store.state.consultation.session': {
      handler() {
        this.getConsultationDetail()
      },
      immediate: true
    }
  },

  created() {},

  methods: {
    getConsultationDetail() {
      const params = {
        consultNo: this.$store.getters['consultation/consultInfo'].consultNo
      }

      peace.service.consult.getConsultInfo(params).then((res) => {
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

    ::v-depp.el-timeline-item__node--normal {
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