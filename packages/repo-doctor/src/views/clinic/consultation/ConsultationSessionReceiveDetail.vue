<template>
  <div class="receive"
       v-if="data">
    <div class="card">
      <h4>个人信息</h4>
      <el-row>
        <el-col :span="8">
          <span class="label w4">姓名</span>
          <span class="divider">:</span>
          <span class="value">
            {{ data.familyName }}
          </span>
        </el-col>
        <el-col :span="8">
          <span class="label w4">年龄</span>
          <span class="divider">:</span>
          <span class="value">
            {{ data.familyAge + "岁"}}
          </span>
        </el-col>
        <el-col :span="8">
          <span class="label w4">性别</span>
          <span class="divider">:</span>
          <span class="value">
            {{ data.familySex }}
          </span>
        </el-col>
      </el-row>
    </div>

    <div class="card">
      <h4>申请会诊医生</h4>

      <div style="display: flex; align-items: center;">
        <el-avatar :src="data.fromPhoto"></el-avatar>
        <span style="color: #333; margin: 0 10px; font-weight:600; ">{{ data.fromDoctorName }}</span>
        <span style="color: #999; margin: 0 5px">{{ data.fromDeptName }}</span>
        <span style="color: #999; margin: 0 5px">{{ data.fromDoctorTitle }}</span>
        <span style="color: #999; margin: 0 5px">{{ data.fromHospitalName }}</span>
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
                    v-for="item in data.familyDisagnose.split('|')">{{ item }}</el-tag>
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="label">申请会诊说明</span>
          <span class="divider">:</span>
          <span class="value">
            {{ data.consultExplain }}
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="label">期望会诊时间</span>
          <span class="divider">:</span>
          <span class="value">
            {{ data.expectTime }}
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="label">提交申请时间</span>
          <span class="divider">:</span>
          <span class="value">
            {{ data.createdTime }}
          </span>
        </el-col>
      </el-row>
    </div>

    <div class="card">
      <h4>审核意见</h4>
      <div class="content time-line">
        <el-timeline>
          <el-timeline-item :timestamp="data.outCheckTime"
                            placement="top"
                            type="primary">
            <el-tag class="timestamp_extend">{{ data.outCheckStatus === 3 ? "已通过" : "" }}</el-tag>

            <div class="timestamp_remark">
              <p>
                <span>审核机构：</span>
                <span>{{ data.fromHospitalName }}</span>
              </p>
              <p>
                <span>审核备注：</span>
                <span>{{ data.outCheckSuggest }}</span>
              </p>
            </div>
          </el-timeline-item>

          <el-timeline-item :timestamp="data.inCheckTime"
                            placement="top"
                            type="primary">
            <el-tag class="timestamp_extend">{{ data.inCheckStatus === 3 ? "已通过" : "" }}</el-tag>

            <div class="timestamp_remark">
              <p>
                <span>审核机构：</span>
                <span>{{ data.toHospitalName }}</span>
              </p>
              <p>
                <span>审核备注：</span>
                <span>{{ data.inCheckSuggest }}</span>
              </p>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      data: null
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
        this.data = res.data.info
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
      left: 3px;
      width: 5px;
      height: 5px;
    }
  }

  .timestamp_extend {
    position: absolute;
    top: 0;
    left: 200px;
  }
}
</style>