<template>
  <div>

    <div class="el-dialog__body dialog-content">
      <el-form ref="model"
               label-position="right"
               label-width="95px"
               label-suffix="："
               v-on:submit.native.prevent
               v-on:keyup.enter.native="save('model')"
               v-bind:model="model"
               v-bind:rules="rules">
        <div class="info-list">
          <el-form-item label="系统编码"
                        v-if="isEdit">
            <span>{{ data.code }}</span>
          </el-form-item>

          <el-form-item label="疾病名称"
                        prop="name">
            <PeaceInput v-model.trim="model.name"
                        placeholder="请输入"
                        maxlength="50"></PeaceInput>
          </el-form-item>

        </div>
      </el-form>
    </div>
    <div class="el-dialog__footer">
      <el-button v-on:click="onCancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="save('model')">提交</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service/index'
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
            message: '疾病名称必填，请输入',
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
    save(model) {
      this.$refs[model].validate((valid) => {
        if (valid) {
          const params = Peace.util.deepClone(this.model)
          if (this.isEdit) {
            Service.editPlatformDisease(params).then((res) => {
              Peace.util.success(res.message)
              this.$emit('onSuccess')
            })
          } else {
            Service.addPlatformDisease(params).then((res) => {
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
.dialog-content {
  margin-left: 30px;
  margin-right: 30px;
}
</style>