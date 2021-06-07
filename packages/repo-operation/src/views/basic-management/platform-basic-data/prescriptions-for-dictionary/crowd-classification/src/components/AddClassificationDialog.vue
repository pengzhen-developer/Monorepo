<template>
  <div>

    <div class="el-dialog__body">
      <el-form ref="model"
               label-position="right"
               label-width="95px"
               label-suffix="："
               v-bind:model="model"
               v-bind:rules="rules">
        <div class="info-list">
          <el-form-item label="系统编码"
                        v-if="isEdit">
            <span>{{ data.code }}</span>
          </el-form-item>

          <el-form-item label="分类标签"
                        prop="name">
            <el-input v-model.trim="model.name"
                      placeholder="请输入"
                      maxlength="50"></el-input>
          </el-form-item>

        </div>
      </el-form>
    </div>
    <div class="el-dialog__footer">
      <el-button v-on:click="onCancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="onSave('model')">保存</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service/index'

export default {
  name: 'AddClassificationDialog',
  props: {
    data: Object,
    isEdit: Boolean
  },

  watch: {
    data: {
      handler() {
        if (this.data != null) {
          this.model.id = this.data.id
          this.model.name = this.data.name
        }
      },
      immediate: true
    }
  },

  data() {
    return {
      model: {
        id: '',
        name: ''
      },

      rules: {
        name: [
          {
            required: true,
            message: '请输入分类标签',
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
          const params = Peace.util.deepClone(this.model)
          if (this.isEdit) {
            Service.editPlatformHumanClass(params).then((res) => {
              Peace.util.success(res.message)
              this.$emit('onSuccess')
            })
          } else {
            Service.addPlatformHumanClass(params).then((res) => {
              Peace.util.success(res.message)
              this.$emit('onSuccess')
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
</style>