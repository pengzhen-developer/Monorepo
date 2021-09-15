<template>
  <div>
    <div class="info-row">
      <div class="info-row-label">
        <span>节日名</span>
      </div>
      <div class="info-row-content">
        <el-input v-model="name"></el-input>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>放假时间</span>
      </div>
      <div class="info-row-content">
        <el-date-picker :picker-options="pickerOptions"
                        placeholder="开始日期"
                        type="date"
                        v-model="holiday.startDate"
                        value-format="yyyy-MM-dd"></el-date-picker>
        <span class="separator">—</span>
        <el-date-picker :picker-options="pickerOptions"
                        placeholder="结束日期"
                        type="date"
                        v-model="holiday.endDate"
                        value-format="yyyy-MM-dd"></el-date-picker>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>上班时间</span>
      </div>
      <div class="info-row-content">
        <el-date-picker :picker-options="pickerOptions"
                        placeholder="选择日期"
                        type="date"
                        v-model="workDate"
                        value-format="yyyy-MM-dd"></el-date-picker>
      </div>
    </div>
    <div style="text-align: center;">
      <el-button :disabled="isDisabled"
                 @click="submit"
                 type="primary">保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HolidayModel',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      name: '',
      holiday: {
        startDate: '',
        endDate: ''
      },
      pickerOptions: {
        disabledDate: (time) => {
          const currentYear = new Date().getFullYear()
          const nextYear = currentYear + 1

          const minTimer = new Date(`${currentYear}/01/01 00:00:00`).getTime()
          const maxTimer = new Date(`${nextYear}/12/31 23:59:59`).getTime()
          const currentTimer = time.getTime()

          return !(minTimer < currentTimer && maxTimer > currentTimer)
        }
      },
      workDate: ''
    }
  },
  computed: {
    isDisabled() {
      return !this.holiday.startDate || !this.holiday.endDate || !this.name
    }
  },
  created() {
    if (this.data) {
      this.setPropsData()
    }
  },
  methods: {
    // 传入数据映射
    setPropsData() {
      const params = this.data
      this.name = params.holidayName
      this.holiday.startDate = new Date(`${params.year}-${params.holidayStartTime}`)
      this.holiday.endDate = new Date(`${params.year}-${params.holidayEndTime}`)
      this.workDate = new Date(`${params.year}-${params.workTime}`)
    },
    // 新增 / 编辑
    submit() {
      const params = {
        holidayName: this.name,
        startDate: this.holiday.startDate,
        endDate: this.holiday.endDate,
        workDate: this.workDate
      }

      const getTimer = (date) => {
        if (!date) return false
        return new Date(date).getTime()
      }

      const startTimer = getTimer(params.startDate)
      const endTimer = getTimer(params.endDate)
      const workTimer = getTimer(params.workDate)

      // 结束日期不可早于开始日期
      if (startTimer > endTimer) {
        return Peace.util.warning('结束日期不可早于开始日期')
      }

      // 上班日期不可介于开始日期和结束日期之间
      if (workTimer && workTimer >= startTimer && workTimer <= endTimer) {
        return Peace.util.warning('上班日期不可介于开始日期和结束日期之间')
      }

      if (this.data) {
        params.holidayId = this.data.id

        return this.$emit('edit', params)
      }

      return this.$emit('submit', params)
    }
  }
}
</script>
<style lang="scss" scoped>
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

.info-row {
  margin-bottom: 20px;
  &-label {
    &:after {
      display: none;
    }
  }
  &-content {
    margin-left: 1em;
  }
}
.el-date-editor.el-input {
  width: 124px;
  ::v-deep .el-input__inner {
    padding-right: 10px;
  }
}
.separator {
  margin: 0 10px;
  color: #cecece;
  font-weight: normal;
}
</style>
