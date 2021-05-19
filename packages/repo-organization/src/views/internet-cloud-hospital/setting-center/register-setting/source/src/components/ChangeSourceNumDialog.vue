<template>
  <div>
    <el-form :model="model"
             :rules="rules"
             label-position="right"
             class="dialog-content"
             label-width="180px"
             ref="model">
      <el-form-item label="医生姓名：">
        <span>{{ data.doctorName}}</span>
      </el-form-item>

      <el-form-item label="号源日期：">
        <span>{{ data.timeSharing}}</span>
      </el-form-item>

      <el-form-item label="号源时段：">
        <span>{{ data.AMPM | getEnumLabel(timeOptions) }}{{ data.bookingStart}}-{{ data.bookingEnd}}</span>
      </el-form-item>

      <el-form-item label="改号类型：">
        <el-radio-group v-model="model.modifyType"
                        @change="chargeChange">
          <el-radio label="ADD">加号</el-radio>
          <el-radio :disabled="data.bookingCounting===0"
                    label="REDUCE">减号</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="数量："
                    prop="modifyNum">
        <el-input-number v-model="model.modifyNum"
                         controls-position="right"
                         :min="1"
                         :step="1"
                         step-strictly
                         class="number-input"
                         :max="maxInputNum"></el-input-number>
        <span>剩余可预约{{ data.bookingCounting }}个</span>
      </el-form-item>

    </el-form>

    <div class="bottom">
      <el-button v-on:click="onCancel"
                 :disabled="loading">取消</el-button>
      <el-button type="primary"
                 :loading="loading"
                 v-on:click="onSave('model')">确定</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'

export default {
  props: {
    data: Object
  },
  data() {
    return {
      model: {
        modifyType: 'ADD',
        modifyNum: 1
      },
      loading: false,
      timeOptions: [
        { value: 'AM', label: '上午' },
        { value: 'PM', label: '下午' }
      ],
      rules: {
        modifyNum: [
          {
            required: true,
            message: '请输入数量',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },

  computed: {
    maxInputNum() {
      if (this.model.modifyType == 'ADD') {
        return 240
      } else {
        return this.data.bookingTotal - this.data.bookingCounted
      }
    }
  },

  methods: {
    onCancel() {
      this.$emit('close')
    },
    onSave(model) {
      this.$refs[model].validate((valid) => {
        if (valid) {
          this.loading = true
          const params = {
            sourceCode: this.data.sourceCode,
            hospitalCode: this.data.hospitalCode,
            departmentCode: this.data.departmentCode,
            doctorCode: this.data.doctorCode,
            modifyType: this.model.modifyType,
            modifyNum: this.model.modifyNum,
            timeSharing: this.data.timeSharing,
            bookingStart: this.data.bookingStart,
            bookingEnd: this.data.bookingEnd
          }
          Service.modifyBookingSourceNum(params)
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
    chargeChange() {
      this.model.modifyNum = 1
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

.number-input {
  width: 100px;
  margin-right: 5px;
}
</style>