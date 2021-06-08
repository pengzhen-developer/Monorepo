<template>
  <div>
    <PeaceDialog width="450px"
                 v-bind:visible.sync="visible"
                 title="修改过敏信息">
      <el-form ref="form"
               label-width="auto"
               v-bind:model="model"
               v-bind:rules="rules">

        <el-form-item label="系统编码：">
          <span>{{ data.code || "--" }}</span>
        </el-form-item>

        <el-form-item label="过敏名称："
                      prop="name">
          <el-input v-model="model.name"
                    maxlength="50"
                    placeholder="请输入"
                    clearable></el-input>
        </el-form-item>

        <el-form-item class="el-dialog__footer">
          <el-button class="btn"
                     v-on:click="cancel">取消</el-button>
          <el-button type="primary"
                     class="btn"
                     v-bind:disabled="canSubmit"
                     v-bind:loading="isLoading"
                     v-on:click="validateForm">保存</el-button>

        </el-form-item>

      </el-form>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from '../service'

export default {
  props: {
    value: {
      required: true,
      type: Boolean
    },
    data: {
      required: true,
      type: Object
    }
  },

  created() {
    this.model = Object.assign({}, this.data)
  },

  data() {
    return {
      isLoading: false,
      visible: this.value,
      model: {
        name: undefined
      },
      rules: {
        name: [{ required: true, message: '请输入过敏名称', trigger: 'blur' }]
      }
    }
  },

  computed: {
    canSubmit() {
      return Peace.validate.isEmpty(this.model.name) || this.data.name === this.model.name
    }
  },

  watch: {
    value(value) {
      this.visible = value
    },

    visible(value) {
      this.$emit('input', value)
    }
  },

  methods: {
    cancel() {
      this.visible = false
    },
    validateForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitForm()
        }
      })
    },
    submitForm() {
      const params = Object.assign({}, this.model)
      this.isLoading = true
      Service.modifyData(params)
        .then((res) => {
          Peace.util.success(res.message)
          this.visible = false
          this.$emit('refresh')
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item__content {
  span {
    color: #9da4af;
  }
}

.el-form-item {
  margin-bottom: 8px;

  &.is-error {
    margin-bottom: 24px;
  }
}
</style>
