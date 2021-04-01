<template>
  <div>
    <el-form :model="model"
             :rules="rules"
             class="content"
             inline
             label-width="110px"
             label-suffix="："
             ref="model">
      <el-form-item label="给药途径"
                    prop="drugwayName">
        <el-input v-model.trim="model.drugwayName"
                  maxlength="20"
                  placeholder="请输入给药途径"></el-input>
      </el-form-item>
      <el-form-item label="给药途径编码">
        <el-input v-model.trim="model.code"
                  maxlength="20"
                  placeholder="请输入给药途径编码"></el-input>
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
  name: 'RouteAddDialog',
  props: {
    drugwayData: Object
  },
  watch: {
    drugwayData: {
      handler() {
        if (this.drugwayData != null) {
          this.model = Object.assign(this.model, this.drugwayData)
          this.isEdit = true
        }
      },
      immediate: true
    }
  },

  data() {
    return {
      model: {
        drugwayName: '',
        code: ''
      },
      isEdit: false,
      rules: {
        drugwayName: [
          {
            required: true,
            message: '请输入给药途径',
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
            Service.editDrugway(params).then((res) => {
              Peace.util.success(res.msg)
              this.$emit('onSucess')
            })
          } else {
            Service.addDrugway(params).then((res) => {
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