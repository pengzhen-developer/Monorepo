<template>
  <div>
    <PeaceDialog v-bind:title="title"
                 v-bind:visible.sync="visible"
                 width="450px">
      <el-form ref="form"
               label-suffix="："
               label-width="auto"
               v-bind:model="model"
               v-bind:rules="rules"
               v-on:submit.native.prevent
               v-on:keyup.enter.native="validateForm">

        <el-form-item v-if="isEdit"
                      label="系统编码">
          <span>{{ data.code || "--" }}</span>
        </el-form-item>

        <el-form-item label="药品成分"
                      prop="cnName">
          <el-input v-model="model.cnName"
                    clearable
                    maxlength="50"
                    placeholder="请输入"
                    v-bind:disabled="isEdit"></el-input>
        </el-form-item>

        <el-form-item label="成分类别">

          <el-select v-model.trim="model.atcCode"
                     class="block"
                     clearable
                     filterable
                     :filter-method="filterList"
                     placeholder="请选择"
                     v-bind:disabled="selectDisable"
                     v-on:change="handleCurrentChange">
            <el-option v-for="item in list"
                       :key="item.atcCode"
                       :label="item.classifyName"
                       :value="item.atcCode">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item class="el-dialog__footer">
          <el-button class="btn"
                     v-on:click="cancel">取消
          </el-button>
          <el-button class="btn"
                     type="primary"
                     v-bind:loading="isLoading"
                     v-on:click="validateForm">{{ submitButtonText }}
          </el-button>

        </el-form-item>

      </el-form>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from '../service/index'

export default {
  props: {
    title: {
      required: true,
      type: String
    },
    value: {
      required: true,
      type: Boolean
    },
    sourceList: {
      required: true,
      type: Array
    },
    data: undefined
  },

  data() {
    return {
      isLoading: false,
      visible: this.value,
      isEdit: false,
      selectDisable: true,
      // 渲染列表，限制在20个以内
      list: [],
      model: {
        cnName: undefined,
        atcCode: undefined,
        compositionTypeName: undefined
      },
      rules: {
        cnName: [{ required: true, message: '请输入药品成分', trigger: 'blur' }]
      }
    }
  },

  created() {
    if (this.sourceList && this.sourceList.length > 0) {
      this.selectDisable = false
    }

    if (this.data) {
      this.model = Object.assign({}, this.data)
      this.isEdit = true
      this.list = [{ atcCode: this.data.atcCode, classifyName: this.data.compositionTypeName }].concat(
        this.sourceList.slice(0, 20).filter((item) => item.atcCode !== this.data.atcCode)
      )
    } else {
      this.list = this.sourceList.slice(0, 20)
    }
  },

  computed: {
    submitButtonText() {
      return this.isEdit ? '保存' : '提交'
    }
  },

  watch: {
    value(value) {
      this.visible = value
    },

    visible(value) {
      this.$emit('input', value)
    },

    sourceList(value) {
      this.selectDisable = false
      if (this.isEdit) {
        this.list = [{ atcCode: this.data.atcCode, classifyName: this.data.compositionTypeName }].concat(
          value.slice(0, 20).filter((item) => item.atcCode !== this.data.atcCode)
        )
      } else {
        this.list = value.slice(0, 20)
      }
    }
  },

  methods: {
    filterList(query = '') {
      this.list = this.sourceList.filter(
        function(item) {
          if (this.count < 20 && item.classifyName.indexOf(query) !== -1) {
            this.count++
            return true
          }
          return false
        },
        { count: 0 }
      )
    },

    handleCurrentChange(code) {
      this.model.compositionTypeName = this.sourceList.find((item) => item.atcCode === code)?.classifyName
    },

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

      if (this.isEdit) {
        Service.modifyData(params)
          .then((res) => {
            Peace.util.success(res.message)
            this.visible = false
            this.$emit('refresh')
          })
          .finally(() => (this.isLoading = false))
      } else {
        Service.addData(params)
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
