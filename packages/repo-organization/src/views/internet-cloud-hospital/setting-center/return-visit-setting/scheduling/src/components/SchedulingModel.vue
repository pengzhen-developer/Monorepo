<template>
  <div>
    <div class="tip"
         v-if="sourceDisType.toString()==='0'">
      不能对未设置数字签名的医生进行复诊排班
    </div>
    <el-radio-group class="doctor"
                    size="medium"
                    @change="checkDoctorStatus"
                    v-model="doctorId">
      <el-radio-button :disabled="doctorDisabled"
                       :key="doctor.doctorId"
                       :label="doctor.doctorId"
                       :value="doctor.signStatus"
                       v-for="doctor in doctors">{{doctor.doctorName}}</el-radio-button>
    </el-radio-group>
    <div>
      <div class="info-row">
        <div class="info-row-label">
          <span>上午</span>
        </div>
        <div class="info-row-content flex-between">
          <div class="times">
            <el-time-picker :clearable="false"
                            :picker-options="{
                selectableRange: time.amStart+' - '+time.amEnd
              }"
                            v-model="amStart"></el-time-picker>
            <span class="separator">—</span>
            <el-time-picker :clearable="false"
                            :picker-options="{
                selectableRange: time.amStart+' - '+time.amEnd
              }"
                            min-time
                            v-model="amEnd"></el-time-picker>
          </div>
          <div class="numbers">
            <span>共</span>
            <el-input-number controls-position="right"
                             v-bind:min="1"
                             v-force="'pInterger'"
                             v-model.trim="amNumber"></el-input-number>
            <span>个号</span>
          </div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>下午</span>
        </div>
        <div class="info-row-content flex-between">
          <div class="times">
            <el-time-picker :clearable="false"
                            :picker-options="{
                selectableRange: time.pmStart+'- '+time.pmEnd
              }"
                            v-model="pmStart"></el-time-picker>
            <span class="separator">—</span>
            <el-time-picker :clearable="false"
                            :picker-options="{
                selectableRange: time.pmStart+'- '+time.pmEnd
              }"
                            v-model="pmEnd"></el-time-picker>
          </div>
          <div class="numbers">
            <span>共</span>
            <el-input-number controls-position="right"
                             v-bind:min="1"
                             v-force="'pInterger'"
                             v-model.trim="pmNumber"></el-input-number>
            <span>个号</span>
          </div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>号源类型</span>
        </div>
        <div class="info-row-content">
          <el-select v-model="type">
            <el-option :key="type.value"
                       :label="type.label"
                       :value="type.value"
                       v-for="type in source.ENUM_OUT_PATIENT_TYPE"></el-option>
          </el-select>
          <div class="q-ml-lg numbers">
            <span>单价</span>
            <el-input type="number"
                      min="0"
                      v-model="price"></el-input>
            <span>元</span>
          </div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>停班</span>
        </div>
        <div class="info-row-content">
          <el-switch :active-value="1"
                     :inactive-value="0"
                     v-model="isStop"></el-switch>
        </div>
      </div>
      <div class="q-mt-lg q-mb-xs"
           style="text-align: center;">
        <div class="red small-text q-mb-xs"
             v-if="isDisabled">* 请先完善排班信息!</div>
        <el-button :disabled="isDisabled"
                   @click="submit"
                   type="primary">提交</el-button>
      </div>
    </div>

  </div>
</template>
<script>
import CONSTANT from '../constant'

const getDateStringByTimer = (timer) => {
  if (typeof timer !== 'number') return timer
  const zero = '0'
  const date = new Date(timer)
  const yyyy = date.getFullYear()
  const mm = zero + (date.getMonth() + 1)
  const dd = zero + date.getDate()

  return `${yyyy}/${mm.substr(-2)}/${dd.substr(-2)}`
}

const InitDate = getDateStringByTimer(new Date().getTime())

export default {
  name: 'SchedulingModel',
  props: {
    week: {
      type: Number
    },
    doctors: {
      type: Array
    },
    data: {
      type: Object
    },
    sourceDisType: {
      type: [Number, String]
    }
  },
  data() {
    return {
      source: {
        ENUM_OUT_PATIENT_TYPE: CONSTANT.ENUM_OUT_PATIENT_TYPE
      },
      radio: 1,
      time: {
        amStart: '08:00:00',
        amEnd: '12:00:00',
        pmStart: '13:00:00',
        pmEnd: '18:00:00'
      },
      doctorId: '',
      amStart: new Date(InitDate + ' 08:00:00').getTime(),
      amEnd: new Date(InitDate + ' 12:00:00').getTime(),
      amNumber: undefined,
      pmStart: new Date(InitDate + ' 13:00:00').getTime(),
      pmEnd: new Date(InitDate + ' 18:00:00').getTime(),
      pmNumber: undefined,
      type: 1,
      price: 10,
      isStop: 0,
      doctorDisabled: false
    }
  },
  computed: {
    isDisabled() {
      const { doctorId, amNumber, pmNumber, price } = this
      if (this.sourceDisType === '0') {
        return !doctorId || !price || !(amNumber || pmNumber)
      } else {
        return !doctorId || !price || !amNumber || !pmNumber
      }
    }
  },
  created() {
    if (this.sourceDisType === '0') {
      this.time = {
        amStart: '00:00:00',
        amEnd: '12:00:00',
        pmStart: '12:00:00',
        pmEnd: '23:59:59'
      }
    } else if (this.sourceDisType === '1') {
      this.time = {
        amStart: '08:00:00',
        amEnd: '12:00:00',
        pmStart: '13:00:00',
        pmEnd: '18:00:00'
      }
    }
    this.mappingData(this.data)
  },

  methods: {
    // 初始化数据（传入编辑数据）
    mappingData(params) {
      if (params) {
        this.doctorId = params.doctorId

        if (params.workStartAM) {
          this.amStart = new Date(`${InitDate} ${params.workStartAM}`)
        }
        if (params.workEndAM) {
          this.amEnd = new Date(`${InitDate} ${params.workEndAM}`)
        }
        if (params.workStartPM) {
          this.pmStart = new Date(`${InitDate} ${params.workStartPM}`)
        }
        if (params.workEndPM) {
          this.pmEnd = new Date(`${InitDate} ${params.workEndPM}`)
        }

        this.amNumber = params.totalCountAM || undefined
        this.pmNumber = params.totalCountPM || undefined
        this.price = params.unitPrice || '0'
        this.type = parseInt(params.sourceLevelType)
        this.isStop = params.isStopClass
        this.doctorDisabled = true
      } else {
        this.doctorId = this.doctors[0].doctorId
      }
    },
    checkDoctorStatus(id) {
      const signStatus = this.doctors.find((item) => item.doctorId == id).signStatus
      if (this.sourceDisType === '0' && signStatus.toString() !== '2') {
        Peace.util.warning('不能对未设置数字签名的医生进行复诊排班')
      }
    },
    // 获取医生信息
    getDoctor(id) {
      const list = this.doctors

      for (let [i, len] = [0, list.length]; i < len; i += 1) {
        const item = list[i]
        if (item.doctorId === id) {
          return item
        }
      }
    },
    // 提交
    submit() {
      const doctor = this.getDoctor(this.doctorId)
      const amNumber = this.amNumber
      const pmNumber = this.pmNumber

      if (amNumber < 0 || pmNumber < 0) {
        if (amNumber < 0) this.amNumber = undefined
        if (pmNumber < 0) this.pmNumber = undefined

        return Peace.util.warning('请输入合法的号源数量！')
      }
      if (this.price < 0) {
        return Peace.util.warning('请输入正确的金额！')
      }

      const signStatus = this.doctors.find((item) => item.doctorId == this.doctorId).signStatus
      if (this.sourceDisType === '0' && signStatus.toString() !== '2') {
        Peace.util.warning('不能对未设置数字签名的医生进行复诊排班')
        return
      }

      const week = this.week
      const isStopClass = this.isStop
      const sourceLevelType = this.type
      const unitPrice = this.price

      const timeFormat = (time) => {
        const date = new Date(time)
        const zero = '0'
        const H = zero + date.getHours()
        const m = zero + date.getMinutes()
        const s = zero + date.getSeconds()

        return `${H.substr(-2)}:${m.substr(-2)}:${s.substr(-2)}`
      }

      if (new Date(this.amStart).getTime() >= new Date(this.amEnd).getTime()) {
        Peace.util.warning('开始时间需小于结束时间')
        return false
      }

      if (new Date(this.pmStart).getTime() >= new Date(this.pmEnd).getTime()) {
        Peace.util.warning('开始时间需小于结束时间')
        return false
      }

      // JSON 字符串化
      // 上午
      const amJson = {
        ampm: 'AM',
        totalCount: amNumber ? amNumber : null,
        workStart: timeFormat(this.amStart),
        workEnd: timeFormat(this.amEnd),
        week,
        sourceLevelType,
        unitPrice,
        isStopClass,
        schedulingCode: (this.data && this.data.schedulingCodeAM) || undefined
      }
      // 下午
      const pmJson = {
        ampm: 'PM',
        totalCount: pmNumber ? pmNumber : null,
        workStart: timeFormat(this.pmStart),
        workEnd: timeFormat(this.pmEnd),
        week,
        sourceLevelType,
        unitPrice,
        isStopClass,
        schedulingCode: (this.data && this.data.schedulingCodePM) || undefined
      }
      const json = []

      json.push(amJson)
      json.push(pmJson)

      const params = {
        doctor,
        scheduleJson: json
      }

      this.$emit('submit', params)
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

.tip {
  margin-bottom: 20px;
  width: 100%;
  height: 40px;
  background-color: rgba(255, 247, 230, 1);
  background-image: url('../assets/images/ic_action.png');
  background-position: 16px 13px;
  background-repeat: no-repeat;
  background-size: 14px;
  border-radius: 4px;
  border: 1px solid rgba(255, 238, 204, 1);
  padding: 9px 38px;
  position: relative;
  color: #666;
  line-height: 22px;
  font-size: 14px;
  font-weight: 400;
}
.doctor {
  margin-top: 4px;
  margin-left: -20px;
  width: calc(100% + 40px);
  &:after {
    padding: 0 20px;
    content: '';
    height: 1px;
    display: block;
    background: linear-gradient(to right, #bfbfbf, #bfbfbf 5px, transparent 5px, transparent);
    background-size: 10px 100%;
    background-clip: content-box;
  }
  .el-radio {
    &-button {
      margin-bottom: 14px;
      margin-left: 20px;
      ::v-deep &__inner {
        width: 92px;
        padding: 8px 5px;
        border: 0;
        border-radius: 4px;
        color: #333;
        font-weight: 400;
        font-weight: normal;
        line-height: 20px;
        background-color: #f5f5f5;
      }
      & + .el-radio-button {
        margin-left: 20px;
      }
      &.is-active {
        ::v-deep .el-radio-button__inner {
          color: var(--q-color-primary);
          box-shadow: none;
          background: linear-gradient(140deg, #e7f9f6 72px, var(--q-color-primary) 10px, var(--q-color-primary) 10px);
          &:after {
            position: absolute;
            right: 0;
            bottom: 0;
            content: '\e6da';
            color: #fff;
            line-height: 1;
            font-size: 12px;
            font-family: 'element-icons';
          }
        }
      }
    }
  }
}
.info-row {
  margin-top: 18px;
  &-label {
    color: #666;
    &:after {
      display: none;
    }
  }
  &-content {
    padding-left: 10px;
    font-weight: normal;
    color: #333;
    display: flex;
    align-items: center;
    &.flex-between {
      justify-content: space-between;
    }
    .numbers {
      .el-input-number {
        margin: 0 5px;
        width: 90px;
        ::v-deep &__inner {
          padding-right: 5px;
        }
      }
      .el-input {
        margin: 0 5px;
        width: 60px;
        ::v-deep &__inner {
          padding-right: 5px;
        }
      }
    }
  }
}
.el-date-editor.el-input {
  width: 125px;
  ::v-deep .el-input__inner {
    letter-spacing: 2px;
  }
}
.separator {
  margin: 0 12px;
  color: #cecece;
  font-weight: normal;
}
</style>
