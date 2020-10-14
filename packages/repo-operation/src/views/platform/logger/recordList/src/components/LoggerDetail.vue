<template>
  <div>
    <PeaceDialog width="780px"
                 v-bind:visible.sync="visible"
                 v-bind:title="title">
      <div>日志类型：更新</div>
      <el-table :data="data"
                style="width: 100%">
        <el-table-column prop="date"
                         label="序号"
                         width="150">
        </el-table-column>
        <el-table-column prop="name"
                         label="字段"
                         width="150">
        </el-table-column>
        <el-table-column prop="name"
                         label="名称"
                         width="150">
        </el-table-column>
        <el-table-column prop="name"
                         label="旧值"
                         width="150">
        </el-table-column>
        <el-table-column prop="name"
                         label="新值"
                         width="150">
        </el-table-column>
      </el-table>
    </PeaceDialog>
  </div>
</template>

<script>
import CONSTANT from './../constant'

import Service from './../service'

export default {
  props: {
    value: {
      required: true,
      type: Boolean
    },

    title: String,

    data: Object
  },

  filters: {
    getEnumLabel: function (value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },

  data() {
    return {
      CONSTANT,

      isLoading: false,
      visible: this.value,

      model: {
        checkStatus: '',
        reasonsFailure: ''
      },

      rules: {
        checkStatus: [{ required: true, message: '请选择审核结果', trigger: 'blur' }],
        reasonsFailure: [{ required: true, message: '请输入未通过原因', trigger: 'blur' }]
      }
    }
  },

  computed: {
    showReasonsFailure() {
      return this.model.checkStatus === '2' || this.model.checkStatus === '4'
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
    doCheck() {
      this.validateForm().then(() => {
        this.isLoading = true

        const params = Peace.util.deepClone(this.model)
        params.accountId = this.data.id

        Service.doCheck(params)
          .then((res) => {
            Peace.util.success(res.msg)

            this.isLoading = false
          })
          .finally(() => {
            this.visible = false
            this.$emit('refresh')
          })
      })
    },

    validateForm() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
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
