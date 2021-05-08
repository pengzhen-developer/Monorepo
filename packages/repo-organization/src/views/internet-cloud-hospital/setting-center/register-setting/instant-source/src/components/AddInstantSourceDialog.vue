<template>
  <div>
    <el-form :model="model"
             :rules="rules"
             label-position="right"
             class="dialog-content"
             label-width="100px"
             ref="model">

      <el-form-item label="科室名称："
                    prop="departmentCode">
        <el-select clearable
                   filterable
                   style="width:368px"
                   @change="changeDepartment"
                   v-model="model.departmentCode">
          <el-option :key="item.id"
                     :label="item.netdeptName"
                     :value="item.id"
                     v-for="item in deptOptions"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="医生："
                    prop="doctorCode">
        <el-select clearable
                   filterable
                   style="width:368px"
                   v-model="model.doctorCode">
          <el-option :key="item.doctorId"
                     :label="item.doctorName"
                     :value="item.doctorId"
                     v-for="item in doctorDatas"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="号源日期："
                    prop="timeSharing">
        <peace-date-picker placeholder="选择日期"
                           style="width:368px"
                           type="date"
                           v-model="model.timeSharing"
                           :picker-options="pickerOptions"
                           value-format="yyyy-MM-dd"></peace-date-picker>
      </el-form-item>

      <el-form-item label="出诊时段："
                    style="margin-bottom:0px"
                    required>
        <template>
          <div class="info-row">

            <el-select v-model="model.ampm"
                       @change="changeTimeOptions">
              <el-option :key="item.value"
                         :label="item.label"
                         :value="item.value"
                         v-for="item in timeOptions"></el-option>
            </el-select>

            <div class="info-row-content flex-between">
              <div class="times">

                <el-form-item prop="bookingStart">
                  <el-time-picker :clearable="false"
                                  :picker-options="{selectableRange: time.amStart+'-'+maxTime }"
                                  v-model="model.bookingStart"></el-time-picker>
                </el-form-item>

                <span class="separator">—</span>

                <el-form-item prop="bookingEnd">
                  <el-time-picker :clearable="false"
                                  :picker-options="{ selectableRange: minTime+'-'+time.amEnd}"
                                  min-time
                                  v-model="model.bookingEnd"></el-time-picker>
                </el-form-item>

              </div>
            </div>
          </div>
        </template>
      </el-form-item>

      <el-form-item label="号源数："
                    prop="bookingTotal">
        <el-input-number v-model="model.bookingTotal"
                         controls-position="right"
                         :min="1"
                         style="width:368px"
                         class="number-input"
                         :max="500"></el-input-number>
      </el-form-item>

      <el-form-item label="号源级别：">
        <el-select style="width:368px"
                   v-model="model.sourceLevelType">
          <el-option :key="item.value"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in sourceLevelTypes"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="号源价格："
                    prop="unitPrice">
        <div class="price-row">
          <el-input-number v-model="model.unitPrice"
                           controls-position="right"
                           :min="0"
                           style="width:336px"
                           class="number-input"
                           :precision="2"
                           :step="1"
                           :max="9999999"></el-input-number>
          <div class="price-row-then">元</div>
        </div>

      </el-form-item>

    </el-form>

    <div class="bottom">
      <el-button v-on:click="onCancel"
                 :disabled="loading">取消</el-button>
      <el-button v-on:click="onSaveAndNew('model')"
                 :loading="loading">保存并新增</el-button>
      <el-button type="primary"
                 :loading="loading"
                 v-on:click="onSave('model')">保存</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'

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
  data() {
    return {
      model: {
        departmentCode: '',
        doctorCode: '',
        timeSharing: '',
        ampm: 'AM',
        bookingStart: new Date(InitDate + ' 08:00:00').getTime(),
        bookingEnd: new Date(InitDate + ' 12:00:00').getTime(),
        bookingTotal: '',
        sourceLevelType: '1',
        unitPrice: '0.00',
        sourceDisType: '1',
        departmentName: '',
        doctorName: '',
        doctorLevel: ''
      },
      deptOptions: [],
      doctorDatas: [],
      timeOptions: [
        { value: 'AM', label: '上午' },
        { value: 'PM', label: '下午' }
      ],
      sourceLevelTypes: [
        { value: '1', label: '普通门诊' },
        { value: '2', label: '专家门诊' }
      ],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000
        }
      },
      time: {
        amStart: '08:00:00',
        amEnd: ' 12:00:00'
      },
      loading: false,
      rules: {
        departmentCode: [{ required: true, message: '请选择科室', trigger: 'change' }],
        doctorCode: [{ required: true, message: '请选择医生', trigger: 'change' }],
        timeSharing: [{ required: true, message: '请选择号源日期', trigger: 'blur' }],
        bookingStart: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
        bookingEnd: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
        bookingTotal: [{ required: true, message: '请输入号源数', trigger: 'change' }],
        unitPrice: [{ required: true, message: '请输入号源价格', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getDeptList()
  },

  computed: {
    maxTime() {
      return this.timeFormat(this.model.bookingEnd)
    },

    minTime() {
      return this.timeFormat(this.model.bookingStart)
    }
  },

  methods: {
    onCancel() {
      this.$emit('close')
    },

    //保存并新增
    onSaveAndNew(model) {
      this.$refs[model].validate((valid) => {
        if (valid) {
          this.loading = true

          const params = Peace.util.deepClone(this.model)
          params.bookingStart = this.timeFormat(this.model.bookingStart)
          params.bookingEnd = this.timeFormat(this.model.bookingEnd)

          params.departmentName = this.deptOptions.find((item) => item.id == params.departmentCode)?.netdeptName
          params.doctorName = this.doctorDatas.find((item) => item.doctorId == params.doctorCode)?.doctorName
          params.doctorLevel = this.doctorDatas.find((item) => item.doctorId == params.doctorCode)?.doctorLevel
          Service.addTemporarySource(params)
            .then((res) => {
              Peace.util.success(res.msg)
              this.clearModel()
              this.$refs[model].resetFields()
              this.$emit('onSaveAndNew')
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },

    timeFormat(time) {
      const date = new Date(time)
      const zero = '0'
      const H = zero + date.getHours()
      const m = zero + date.getMinutes()
      const s = zero + date.getSeconds()

      return `${H.substr(-2)}:${m.substr(-2)}:${s.substr(-2)}`
    },

    //清空数据
    clearModel() {
      this.model.departmentCode = ''
      this.model.doctorCode = ''
      this.model.timeSharing = ''
      this.model.ampm = 'AM'
      this.model.bookingStart = new Date(InitDate + ' 08:00:00').getTime()
      this.model.bookingEnd = new Date(InitDate + ' 12:00:00').getTime()
      this.model.bookingTotal = ''
      this.model.sourceLevelType = '1'
      this.model.unitPrice = '0.00'
      this.model.sourceDisType = '1'
      this.model.departmentName = ''
      this.model.doctorName = ''
      this.model.doctorLevel = ''
    },
    //保存
    onSave(model) {
      this.$refs[model].validate((valid) => {
        if (valid) {
          this.loading = true

          const params = Peace.util.deepClone(this.model)
          params.bookingStart = this.timeFormat(this.model.bookingStart)
          params.bookingEnd = this.timeFormat(this.model.bookingEnd)

          params.departmentName = this.deptOptions.find((item) => item.id == params.departmentCode)?.netdeptName
          params.doctorName = this.doctorDatas.find((item) => item.doctorId == params.doctorCode)?.doctorName
          params.doctorLevel = this.doctorDatas.find((item) => item.doctorId == params.doctorCode)?.doctorLevel
          Service.addTemporarySource(params)
            .then((res) => {
              Peace.util.success(res.msg)
              this.$emit('onSucess')
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    //获取科室信息
    getDeptList() {
      Service.getDeptList().then((res) => {
        const array = []
        const data = res.data
        if (!data || !data.length) {
          return
        }
        data.forEach((element) => {
          element.childDept.forEach((item) => {
            array.push(item)
          })
        })

        this.deptOptions = array
      })
    },
    //更具科室信息获取医生列表
    getDoctorByDept() {
      const params = { twoLevelDeptId: this.model.departmentCode }
      Service.getDoctorByDept(params).then((res) => {
        this.doctorDatas = res.data
      })
    },

    //切换科室
    changeDepartment() {
      this.model.doctorCode = ''
      this.getDoctorByDept()
    },
    //切换时间断
    changeTimeOptions() {
      if (this.model.ampm == 'AM') {
        this.time.amStart = '08:00:00'
        this.time.amEnd = '12:00:00'
        this.model.bookingStart = new Date(InitDate + '08:00:00').getTime()
        this.model.bookingEnd = new Date(InitDate + ' 12:00:00').getTime()
      } else {
        this.time.amStart = '13:00:00'
        this.time.amEnd = '18:00:00'
        this.model.bookingStart = new Date(InitDate + ' 13:00:00').getTime()
        this.model.bookingEnd = new Date(InitDate + ' 18:00:00').getTime()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
}

.dialog-content {
  padding-left: 20px;
  padding-right: 30px;
}

.info-row {
  display: flex;
  .el-select {
    width: 102px;
  }

  &-content {
    padding-left: 10px;
    display: flex;
    align-items: center;

    .times {
      display: flex;
    }
    &.flex-between {
      justify-content: space-between;
    }
  }
}
.el-date-editor.el-input {
  width: 120px;
  ::v-deep .el-input__inner {
    letter-spacing: 2px;
  }
}

.price-row {
  display: flex;

  &-then {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
  }
}
</style>