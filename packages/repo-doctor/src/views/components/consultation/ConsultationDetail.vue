// 会诊详情

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

      <img v-if="data.consultStatus"
           v-bind:src="`./static/images/consultation/${data.consultStatus}.png`"
           class="absolute"
           style="width: 102px; height: 55px; right: 36px; bottom: -10px;"
           alt="医师签名" />
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

      <div class="q-mb-md">
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
          <div class="row col-6">
            <span class="text-justify"
                  style="width: 4em;">机构名称</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.toHospitalName }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 审核意见 -->
    <div v-if="canShowOrganization"
         class="q-pl-md q-pt-md q-mb-sm"
         style="border-top: 1px solid #f3f3f3;">
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
         style="border-top: 1px solid #f3f3f3;">

      <!-- 会诊关闭 -->
      <template v-if="consultStatus === CONSULT_STATUS_MAP['会诊已关闭']">
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
  </div>
</template>

<script>
const CONSULT_STATUS_MAP = {
  ['发起待审核']: 1,
  ['发起已拒绝']: 2,
  ['邀请待审核']: 3,
  ['邀请已拒绝']: 4,
  ['等待会诊']: 5,
  ['会诊中']: 6,
  ['会诊已完成']: 7,
  ['会诊已关闭']: 8,
  ['医生待接诊']: 9,
  ['医生已退诊']: 10
}

const CHECK_STATUS_MAP = {
  ['未审核']: 1,
  ['已拒绝']: 2,
  ['已通过']: 3
}

export default {
  props: {
    data: Object
  },

  data() {
    return {
      CONSULT_STATUS_MAP,
      CHECK_STATUS_MAP
    }
  },

  computed: {
    consultStatus() {
      return this.data?.consultStatus
    },

    canShowInitiatorOrganization() {
      const showInitiatorOrganizationStatusMap = [3, 4, 5, 6, 7, 8, 9, 10]

      return showInitiatorOrganizationStatusMap.includes(this.consultStatus) && this.data?.outCheckSuggest
    },

    canShowReceiverOrganization() {
      const showReceiverOrganizationStatusMap = [5, 6, 7, 8, 9, 10]

      return showReceiverOrganizationStatusMap.includes(this.consultStatus) && this.data?.inCheckSuggest
    },

    canShowFromDoctor() {
      const showFromDoctorStatusMap = [5, 6, 7, 10]

      return showFromDoctorStatusMap.includes(this.consultStatus) && this.data?.doctorExamineTime
    },

    canShowOrganization() {
      return this.canShowInitiatorOrganization || this.canShowReceiverOrganization || this.canShowFromDoctor
    }
  },

  methods: {
    getCheckStatusText(status) {
      return Object.keys(this.CHECK_STATUS_MAP).find((key) => this.CHECK_STATUS_MAP[key] === status)
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
    background: $--color-primary;
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
    top: 7px;
    background: $--color-primary;
  }
}
</style>