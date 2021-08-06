<template>
  <div>
    <PeaceDialog v-bind:title="title"
                 v-bind:visible.sync="visible"
                 width="376px">
      <el-form ref="form"
               label-suffix="："
               label-width="auto"
               v-bind:model="model"
               v-bind:rules="rules"
               v-on:submit.native.prevent
               v-on:keyup.enter.native="validateForm">

        <el-form-item label="规则名称"
                      prop="ruleName">
          <el-input v-model="model.ruleName"
                    clearable
                    maxlength="20"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="规则状态">
          <el-radio v-model="model.state" label="1">启用</el-radio>
          <el-radio v-model="model.state" label="0">停用</el-radio>
        </el-form-item>


        <el-form-item class="el-dialog__footer">
          <el-button class="btn"
                     v-on:click="cancel">取消
          </el-button>
          <el-button class="btn"
                     type="primary"
                     v-bind:loading="isLoading"
                     v-on:click="validateForm">保存
          </el-button>
        </el-form-item>

      </el-form>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from '../service/index'
import Util from '@src/util'
export default {
  name: 'ModifyManagementRule',
  props: {
    value: {
      required: true,
      type: Boolean
    },
    title: {
      required: true,
      type: String
    },
    data: {
      type: Object
    }
  },

  data() {
    return {
      isLoading: false,
      visible: this.value,
      model: {
        ruleName: undefined,
        state: "1",
      },
      rules: {
        ruleName: [{ required: true, message: '规则名称不能为空', trigger: 'blur' }],
        // state:  [{ required: true, message: '请选择规则状态', trigger: 'blur' }],
      }
    }
  },

  created() {
    if (this.isEdit) {
      this.model = Object.assign({}, this.data)
    }
  },

  computed: {
    isEdit() {
      return this.data
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
      this.model.organCode = Util.user.getUserInfo().custCode
      this.model.organName = Util.user.getUserInfo().hospitalName
      const params = Object.assign({}, this.model)
      this.isLoading = true
      if (this.isEdit) {
        Service.modifyManageRuleBasicInfo(params)
            .then((res) => {
              Peace.util.success(res.message)
              this.visible = false
              this.$emit('refresh')
            })
            .finally(() => (this.isLoading = false))
      } else {
        Service.addManageRuleBasicInfo(params)
            .then((res) => {
              Peace.util.success(res.message)
              this.visible = false
              this.$emit('refresh')
            })
            .finally(() => (this.isLoading = false))
      }
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
