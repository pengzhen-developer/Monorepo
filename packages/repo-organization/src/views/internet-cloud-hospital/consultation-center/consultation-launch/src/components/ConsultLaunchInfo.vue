<template>
  <div class="q-px-lg p-py-md">
    <div class="text-grey-6">
      <span>No.</span>
      <span>{{ data.consultNo }}</span>
    </div>

    <!-- 会诊单标题 -->
    <div class="relative-position text-center q-mb-md">
      <p class="text-h5 text-weight-bolder">{{ data.fromHospitalName }}</p>
      <p class="text-h5 text-weight-bolder">会诊单</p>

      <img v-if="imgSrc"
           v-bind:src="imgSrc"
           class="absolute"
           style="width: 102px; height: 55px; right: 36px; bottom: -10px;" />
    </div>

    <div class="q-mb-lg"
         style="border-bottom: 1px dashed #f3f3f3;"></div>

    <!-- 申请信息 -->
    <div class="q-pl-md q-mb-md">
      <div class="row q-mb-sm flex items-center">
        <span class="before-line text-weight-bold text-subtitle1">申请信息</span>
      </div>

      <div class="row q-mb-xs">
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">患者姓名</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.familyName }}</span>
        </div>
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">性别</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.familySex }}</span>
        </div>
      </div>
      <div class="row q-mb-xs">
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">年龄</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.familyAge }}</span>
        </div>
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">科别</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.fromDeptName }}</span>
        </div>
      </div>
      <div class="row q-mb-xs">
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">申请医生</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.fromDoctorName }}</span>
        </div>
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">疾病诊断</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.familyDisagnose }}</span>
        </div>
      </div>
      <div class="row q-mb-xs">
        <span class="text-justify"
              style="width: 6em;">申请会诊说明</span>
        <span class="q-mx-xs">：</span>
        <span class="col text-weight-bold">{{ data.consultExplain }}</span>
      </div>
      <div class="row q-mb-xs">
        <span class="text-justify"
              style="width: 6em;">期望会诊时间</span>
        <span class="q-mx-xs">：</span>
        <span class="col text-weight-bold">{{ data.expectTime }}</span>
      </div>
      <div class="row q-mb-xs">
        <span class="text-justify"
              style="width: 6em;">申请提交时间</span>
        <span class="q-mx-xs">：</span>
        <span class="col text-weight-bold">{{ data.createdTime }}</span>
      </div>
    </div>

    <!-- 受邀会诊医生 -->
    <div class="q-pl-md q-pt-md q-mb-md"
         style="border-top: 1px solid #f3f3f3;">
      <div class="row q-mb-sm flex items-center">
        <span class="before-line text-weight-bold text-subtitle1">受邀会诊医生</span>
      </div>

      <div class="row q-mb-xs">
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">医生姓名</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.toDoctorName }}</span>
        </div>
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">科别</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.toDeptName }}</span>
        </div>
      </div>
      <div class="row q-mb-xs">
        <span class="text-justify"
              style="width: 4em;">机构名称</span>
        <span class="q-mx-xs">：</span>
        <span class="col text-weight-bold">{{ data.toHospitalName }}</span>
      </div>
    </div>

    <!-- 审核意见 -->
    <div class="q-pl-md q-pt-md q-mb-md"
         style="border-top: 1px solid #f3f3f3;"
         v-if="canShowOrganization">
      <div class="row q-mb-sm flex items-center">
        <span class="before-line text-weight-bold text-subtitle1">审核意见</span>
      </div>

      <div class="bg-grey-2  q-pa-md">

        <!-- 发起机构 -->
        <!-- 已通过审核：才显示 -->
        <div v-if="canShowInitiatorOrganization"
             class="q-pl-md">
          <div class="row q-mb-sm flex items-center">
            <span class="before-circle text-weight-bold">发起机构</span>
          </div>

          <div class="row q-mb-xs">
            <span class="text-justify"
                  style="width: 4em;">审核结果</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ getCheckStatusText(data.outCheckStatus) }}</span>
          </div>
          <div class="row q-mb-xs">
            <span class="text-justify"
                  style="width: 4em;">审核意见</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.outCheckSuggest }}</span>
          </div>
          <div class="row q-mb-xs">
            <span class="text-justify"
                  style="width: 4em;">审核时间</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.outCheckTime }}</span>
          </div>
        </div>

        <!-- 受邀机构 -->
        <!-- 已通过审核：才显示 -->
        <div v-if="canShowReceiverOrganization"
             class="q-pl-md q-pt-md q-mt-md"
             style="border-top: 1px dashed #eeeeee;">
          <div class="row q-mb-sm flex items-center">
            <span class="before-circle text-weight-bold">受邀机构</span>
          </div>

          <div class="row q-mb-xs">
            <span class="text-justify"
                  style="width: 4em;">审核结果</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ getCheckStatusText(data.inCheckStatus) }}</span>
          </div>
          <div class="row q-mb-xs">
            <span class="text-justify"
                  style="width: 4em;">审核意见</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.inCheckSuggest }}</span>
          </div>
          <div class="row q-mb-xs">
            <span class="text-justify"
                  style="width: 4em;">审核时间</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.inCheckTime }}</span>
          </div>
        </div>

        <!-- 受邀医生 -->
        <!-- 退诊：显示【退诊时间】和【退诊原因】 -->
        <!-- 接诊：显示【接诊时间】 -->
        <div v-if="canShowFromDoctor"
             class="q-pl-md q-mt-md q-pt-md"
             style="border-top: 1px dashed #eeeeee;">
          <div class="row q-mb-sm flex items-center">
            <span class="before-circle text-weight-bold">受邀医生</span>
          </div>

          <div class="row q-mb-xs">
            <span class="text-justify"
                  style="width: 4em;">接诊时间</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.doctorExamineTime }}</span>
          </div>
        </div>

      </div>
    </div>

    <!-- 会诊小结 -->
    <!-- 会诊关闭：显示【关闭时间】和【关闭原因】 -->
    <!-- 已填写会诊小结：显示"会诊所见"相关内容 -->
    <div class="q-pl-md q-pt-md q-mb-md"
         style="border-top: 1px solid #f3f3f3;"
         v-if="consultStatus === 8 || data.consultFind">

      <!-- 会诊关闭 -->
      <template v-if="consultStatus === 8">
        <div class="row q-mb-sm flex items-center">
          <span class="before-line text-weight-bold text-subtitle1">会诊已关闭</span>
        </div>

        <div class="q-mb-md">
          <div class="row q-mb-xs">
            <span class="text-justify"
                  style="width: 4em;">关闭时间</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.consultEndTime }}</span>
          </div>
          <div class="row q-mb-xs">
            <span class="text-justify"
                  style="width: 4em;">关闭原因</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.closeReason || '期望会诊时间已过期' }}</span>
          </div>
        </div>
      </template>

      <!-- 已填写会诊小结 -->
      <template v-else-if="data.consultFind">
        <div class="row q-mb-sm flex items-center">
          <span class="before-line text-weight-bold text-subtitle1">会诊小结</span>
        </div>

        <div class="q-mb-md">
          <div class="row q-mb-xs">
            <span class="text-justify"
                  style="width: 4em;">会诊所见</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.consultFind }}</span>
          </div>
          <div class="row q-mb-xs">
            <span class="text-justify"
                  style="width: 4em;">疾病诊断</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.consultDiagnose }}</span>
          </div>
          <div class="row q-mb-xs">
            <span class="text-justify"
                  style="width: 4em;">建议</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.consultSuggest }}</span>
          </div>
          <div class="row q-mb-xs"
               v-if="data.doctorSignImg">
            <span class="text-justify"
                  style="width: 4em;">医生签名</span>
            <span class="q-mx-xs">：</span>
            <img alt="医生签名"
                 style="height: 20px"
                 v-bind:src="data.doctorSignImg" />
          </div>
          <div class="row q-mb-xs">
            <span class="text-justify"
                  style="width: 4em;">开始时间</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.consultStartTime }}</span>
          </div>
          <div class="row q-mb-xs">
            <span class="text-justify"
                  style="width: 4em;">结束时间</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.consultEndTime }}</span>
          </div>
        </div>
      </template>

    </div>

    <!-- 机构端 -->
    <!-- 需要额外处理审核操作 -->
    <!-- 会诊发起所在机构：未审核且未关闭 -->
    <!-- 会诊受邀所在机构：未审核且未关闭 -->
    <div class="q-pl-md q-pt-md q-mb-md"
         style="border-top: 1px solid #f3f3f3;"
         v-if="canShowInitiatorOrganizationAudit">
      <div class="row q-mb-sm flex items-center">
        <span class="before-line text-weight-bold text-subtitle1">发起机构审核</span>
      </div>

      <div class="row flex items-center q-mb-xs">
        <span class="text-justify"
              style="width: 4em;">审核结果</span>
        <span class="q-mx-xs">：</span>
        <el-radio v-model="examineResult"
                  v-bind:label="3">通过</el-radio>
        <el-radio v-model="examineResult"
                  v-bind:label="2">驳回</el-radio>
      </div>

      <div class="row flex items-baseline q-mb-md">
        <span class="text-justify"
              style="width: 4em;">审核意见</span>
        <span class="q-mx-xs">：</span>
        <el-input class="col"
                  type="textarea"
                  v-bind:rows="3"
                  v-bind:placeholder="examineResult === 3 ? '请输入审核意见（选填）' : '请输入审核意见'"
                  v-if="examineResult"
                  v-model="examineOpinion"></el-input>
      </div>

      <div class="text-center">
        <el-button type="primary"
                   v-on:click="submitExamine"
                   v-bind:disabled="processing">提交</el-button>
      </div>
    </div>

    <div class="q-pl-md q-pt-md q-mb-md"
         style="border-top: 1px solid #f3f3f3;"
         v-if="canShowReceiverOrganizationAudit">
      <div class="row q-mb-sm flex items-center">
        <span class="before-line text-weight-bold text-subtitle1">受邀机构审核</span>
      </div>

      <div class="row flex items-center q-mb-xs">
        <span class="text-justify"
              style="width: 4em;">审核结果</span>
        <span class="q-mx-xs">：</span>
        <el-radio v-model="examineResult"
                  v-bind:label="3">通过</el-radio>
        <el-radio v-model="examineResult"
                  v-bind:label="2">驳回</el-radio>
      </div>

      <div class="row flex items-baseline q-mb-md">
        <span class="text-justify"
              style="width: 4em;">审核意见</span>
        <span class="q-mx-xs">：</span>
        <el-input class="col"
                  type="textarea"
                  placeholder="请输入审核意见"
                  v-bind:rows="3"
                  v-if="examineResult"
                  v-model="examineOpinion"></el-input>
      </div>

      <div class="text-center">
        <el-button type="primary"
                   v-on:click="submitExamine"
                   v-bind:disabled="processing">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import CONSTANT from '../constant'
import Service from '../service'
import Util from '@src/util'

const CONSULT_LAUNCH_IMAGE_MAP = {
  1: require('@src/views/internet-cloud-hospital/consultation-center/consultation-launch/src/assets/images/1.png'),
  2: require('@src/views/internet-cloud-hospital/consultation-center/consultation-launch/src/assets/images/2.png'),
  3: require('@src/views/internet-cloud-hospital/consultation-center/consultation-launch/src/assets/images/3.png'),
  4: require('@src/views/internet-cloud-hospital/consultation-center/consultation-launch/src/assets/images/4.png'),
  5: require('@src/views/internet-cloud-hospital/consultation-center/consultation-launch/src/assets/images/5.png'),
  6: require('@src/views/internet-cloud-hospital/consultation-center/consultation-launch/src/assets/images/6.png'),
  7: require('@src/views/internet-cloud-hospital/consultation-center/consultation-launch/src/assets/images/7.png'),
  8: require('@src/views/internet-cloud-hospital/consultation-center/consultation-launch/src/assets/images/8.png'),
  9: require('@src/views/internet-cloud-hospital/consultation-center/consultation-launch/src/assets/images/9.png'),
  10: require('@src/views/internet-cloud-hospital/consultation-center/consultation-launch/src/assets/images/10.png')
}

export default {
  name: 'ConsultLaunchInfo',
  props: {
    data: Object
  },
  data() {
    return {
      source: {
        ENUM_CONSULT_STATUS: CONSTANT.ENUM_CONSULT_STATUS,
        ENUM_CHECK_STATUS: CONSTANT.ENUM_CHECK_STATUS
      },
      hospitalInfo: {},

      processing: false,

      examineResult: 3,
      examineOpinion: ''
    }
  },
  computed: {
    roler() {
      // 当前会诊机构所属
      // 发起机构 or 受邀机构
      if (this.data.fromHospitalName === this.hospitalInfo.username) {
        return 'initiator'
      } else if (this.data.toHospitalName === this.hospitalInfo.username) {
        return 'receiver'
      }
      return ''
    },
    imgSrc() {
      return CONSULT_LAUNCH_IMAGE_MAP[this.data.consultStatus]
    },

    consultStatus() {
      return this.data.consultStatus
    },

    canShowInitiatorOrganization() {
      const showInitiatorOrganizationStatusMap = [3, 4, 5, 6, 7, 8, 9, 10]

      return showInitiatorOrganizationStatusMap.includes(this.consultStatus) && this.data.outCheckSuggest
    },

    canShowReceiverOrganization() {
      const showReceiverOrganizationStatusMap = [5, 6, 7, 8, 9, 10]

      return showReceiverOrganizationStatusMap.includes(this.consultStatus) && this.data.inCheckSuggest
    },

    canShowFromDoctor() {
      const showFromDoctorStatusMap = [5, 6, 7, 8]

      return showFromDoctorStatusMap.includes(this.consultStatus) && this.data.doctorExamineTime
    },

    canShowOrganization() {
      return this.canShowInitiatorOrganization || this.canShowReceiverOrganization || this.canShowFromDoctor
    },

    canShowInitiatorOrganizationAudit() {
      return this.roler === 'initiator' && this.data.outCheckStatus === 1 && this.data.consultStatus !== 8
    },

    canShowReceiverOrganizationAudit() {
      return this.roler === 'receiver' && this.data.inCheckStatus === 1 && this.data.consultStatus !== 8
    }
  },
  mounted() {
    let info = Util.user.getHospitalInfo() ?? {}
    this.hospitalInfo = info
  },
  methods: {
    getCheckStatusText(status) {
      return this.source.ENUM_CHECK_STATUS.find((item) => item.value === status)?.label
    },
    submitExamine() {
      const { outLogId, inLogId, consultId } = this.data
      const examineResult = this.examineResult
      const examineOpinion = examineResult === 3 ? this.examineOpinion || '同意会诊' : this.examineOpinion
      const consultType = this.roler === 'initiator' ? 1 : 2
      const logId = this.roler === 'initiator' ? outLogId : inLogId

      if (examineResult === 2 && !examineOpinion) {
        Peace.util.warning('驳回时，审核意见不能为空！')
        return
      }

      this.processing = true
      Service.examineConsultation({
        logId: logId,
        consultId: consultId,
        checkStatus: examineResult,
        checkSuggest: examineOpinion,
        consultType: consultType
      })
        .then((res) => {
          Peace.util.success(res.msg)
          this.$emit('update')
          this.$emit('close')
        })
        .finally(() => {
          this.processing = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.text-justify {
  display: inline-block;
  text-align: justify;
  text-align-last: justify;
}

.before-circle {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    display: inline-block;
    width: 8px;
    height: 8px;
    left: -16px;
    top: 8px;
    border-radius: 50%;
    background: var(--q-color-primary);
  }
}

.before-line {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    display: inline-block;
    width: 4px;
    height: 16px;
    left: -16px;
    top: 5px;
    background: var(--q-color-primary);
  }
}

.info-row {
  font-size: 0;
  display: flex;
  &-label,
  &-content {
    font-size: 14px;
    line-height: 28px;
    display: inline-block;
    vertical-align: middle;
  }
  &-label {
    color: #778899;
    white-space: nowrap;
    & > span {
      width: 4.3em;
      text-align: right;
      text-align-last: justify;
      text-align: justify;
      text-justify: distribute-all-lines;
      display: inline-block;
    }
    &.t-6 > span {
      width: 6em;
    }
    &.t-6 + .info-row-content {
      width: calc(100% - 7em);
    }
    &.t-7 > span {
      width: 7em;
    }
    &.t-7 + .info-row-content {
      width: calc(100% - 8em);
    }
    &:after {
      content: '：';
    }
  }
  &-content {
    padding-left: 2px;
    width: calc(100% - 1em - 4.3em);
    font-weight: bold;
    word-break: break-all;
    color: #23313f;
    & > img {
      height: 20px;
      display: block;
    }
  }
  &.two-cols {
    .info-row-label.t-6 + .info-row-content {
      width: calc(50% - 7em);
    }
    .info-row-content {
      width: calc(50% - 1em - 4.3em);
    }
  }
}
</style>
