<template>
  <div class="session-list-item flex column cursor-pointer q-py-md q-px-sm"
       v-bind:class="{ active : this.active}">

    <div class="flex justify-between items-baseline q-mb-sm">

      <div class="flex items-end">
        <span class="q-mr-md text-bold"> {{ patient.name }} </span>
        <span class="q-mr-sm text-caption"> {{ patient.sex }} </span>
        <span class="q-mr-sm text-caption"> {{ patient.age }} </span>
      </div>

      <div>
        <el-tag effect="plain"
                class="tag-style">{{ "开处方" }}</el-tag>
      </div>

    </div>

    <div class="full-width q-mb-md text-caption ellipsis"
         style="max-height: 24px;">

      <span></span>

    </div>

  </div>
</template>

<script>
export default {
  props: {
    active: Boolean,
    patient: Object
  },

  data() {
    return {}
  },

  methods: {
    // 格式化
    formatDuration(beginDate, overDate) {
      const durationString = Peace.util.formatDuration(beginDate, overDate)

      return durationString
    },

    /**
     * 问诊计时器
     *
     * 待接诊：显示【系统自动退诊】倒计时
     * 问诊中：显示【问诊中】正计时
     */
    getInquriyTimer() {
      return '00:12'
    }
  }
}
</script>

<style lang="scss" scoped>
.session-list-item {
  border-bottom: 1px solid #efefef;

  &.active {
    background: #f4f4f4;
  }
}

.tag-style {
  background: #e3f0f0;
  color: var(--q-color-primary);
  border-radius: 20px;
  border-color: var(--q-color-primary);
}
</style>