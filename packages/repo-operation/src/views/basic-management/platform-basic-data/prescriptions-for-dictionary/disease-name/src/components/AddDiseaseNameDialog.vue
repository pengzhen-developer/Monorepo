<template>
  <div>

    <div class="el-dialog__body dialog-content">
      <el-form ref="model"
               label-position="right"
               label-width="95px"
               label-suffix="："
               v-bind:model="model"
               v-bind:rules="rules">
        <div class="info-list">
          <el-form-item label="系统编码"
                        v-if="isEdit">
            <span>{{model.code}}</span>
          </el-form-item>

          <el-form-item label="疾病名称"
                        prop="label">
            <el-input v-model.trim="model.label"
                      placeholder="请输入"
                      maxlength="50"></el-input>
          </el-form-item>

        </div>
      </el-form>
    </div>
    <div class="el-dialog__footer">
      <el-button v-on:click="onCancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="onSave('model')">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddDiseaseNameDialog',
  props: {
    data: Object,
    isEdit: Boolean
  },

  watch: {
    data: {
      handler() {
        if (this.data != null) {
          this.model.code = this.data.code
          this.model.label = this.data.label
        }
      },
      immediate: true
    }
  },

  data() {
    return {
      model: {
        code: '',
        label: ''
      },

      rules: {
        label: [
          {
            required: true,
            message: '请输入疾病名称',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    onCancel() {
      this.$emit('onClose', {})
    },
    onSave(model) {
      this.$refs[model].validate((valid) => {
        if (valid) {
          console.log(valid)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-content {
  margin-left: 30px;
  margin-right: 30px;
}
</style>