<template>
  <div>
    <el-form :model="model"
             :rules="rules"
             class="content"
             ref="model">
      <el-form-item label="用药频次："
                    label-width="110px"
                    prop="drugtimesName">
        <el-input v-model.trim="model.drugtimesName"
                  maxlength="20"
                  placeholder="请输入用药频次"></el-input>
      </el-form-item>
      <el-form-item label="用药频次编码："
                    label-width="110px">
        <el-input v-model.trim="model.code"
                  maxlength="20"
                  placeholder="请输入用药频次编码"></el-input>
      </el-form-item>
      <el-form-item label="系数："
                    label-width="110px"
                    prop="frequencyValue">
        <el-input v-model.trim="model.frequencyValue"
                  maxlength="20"
                  placeholder=""></el-input>
      </el-form-item>

    </el-form>

    <div class="bottom">
      <el-button v-on:click="onCancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="onSave('model')">确定</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'

export default {
  props: {
    drugtimeData: Object
  },
  watch: {
    drugtimeData: {
      handler() {
        if (this.drugtimeData != null) {
          this.model = Object.assign(this.model, this.drugtimeData)
          this.isEdit = true
        }
      },
      immediate: true
    }
  },
  data() {
    // 校验系数
    let validateFrequencyValue = (rule, value, callback) => {
      if (!value) {
        return callback()
      } else if (!/^([1-9][0-9]{0,2})(?:\.[1-9]{0,1})?$|0(\.[1-9])/.test(value)) {
        return callback(new Error())
      } else {
        return callback()
      }
    }
    return {
      model: {
        drugtimesName: '',
        code: '',
        frequencyValue: ''
      },
      isEdit: false,
      rules: {
        drugtimesName: [
          {
            required: true,
            message: '请输入用药频次',
            trigger: 'blur'
          }
        ],
        frequencyValue: [
          {
            validator: validateFrequencyValue,
            message: '系数大于0小于999.9，且最多一位小数',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onCancel() {
      this.$emit('onCancel')
    },
    onSave(model) {
      this.$refs[model].validate((valid) => {
        if (valid) {
          const params = this.model
          if (this.isEdit) {
            Service.editDrugtimes(params).then((res) => {
              Peace.util.success(res.msg)
              this.$emit('onSucess')
            })
          } else {
            Service.addDrugtimes(params).then((res) => {
              Peace.util.success(res.msg)
              this.$emit('onSucess')
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  display: flex;
  justify-content: flex-end;
}
</style>