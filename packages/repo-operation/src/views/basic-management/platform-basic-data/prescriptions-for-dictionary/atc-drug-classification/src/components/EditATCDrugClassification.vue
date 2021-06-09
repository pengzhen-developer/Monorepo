<template>
  <div>
    <PeaceDialog width="450px"
                 v-bind:visible.sync="visible"
                 v-bind:title="title">
      <el-form ref="form"
               label-width="auto"
               label-suffix="："
               v-bind:model="model"
               v-bind:rules="rules">

        <el-form-item label="ATC级别"
                      prop="atcGrade">

          <el-select clearable
                     filterable
                     class="block"
                     v-model.trim="model.atcGrade"
                     placeholder="请选择">
            <el-option v-for="item in source.levelList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="父节点"
                      prop="parentNode"
                      v-if="model.atcGrade !== 1">
          <el-input v-model="model.parentNode"
                    placeholder="请输入"
                    maxlength="50"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="ATC编码"
                      prop="atcCode">
          <el-input v-model="model.atcCode"
                    placeholder="请输入"
                    maxlength="50"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="成分类别（英文）"
                      prop="classifyNameEn">
          <el-input v-model="model.classifyNameEn"
                    placeholder="请输入"
                    maxlength="50"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="成分类别"
                      prop="classifyName">
          <el-input v-model="model.classifyName"
                    placeholder="请输入"
                    maxlength="50"
                    clearable></el-input>
        </el-form-item>

        <el-form-item class="el-dialog__footer">
          <el-button class="btn"
                     v-on:click="cancel">取消</el-button>
          <el-button type="primary"
                     class="btn"
                     v-bind:loading="isLoading"
                     v-on:click="validateForm">{{ submitButtonText }}</el-button>

        </el-form-item>

      </el-form>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from '../service/index'

export default {
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
      required: false,
      type: Object
    }
  },

  data() {
    return {
      isLoading: false,
      visible: this.value,
      model: {
        atcGrade: undefined,
        classifyNameEn: undefined,
        atcCode: undefined,
        parentNode: undefined,
        classifyName: undefined
      },
      source: {
        levelList: [
          { value: 1, label: 1 },
          { value: 2, label: 2 },
          { value: 3, label: 3 },
          { value: 4, label: 4 },
          { value: 5, label: 5 }
        ]
      },
      rules: {
        atcGrade: [{ required: true, message: '请选择ATC级别', trigger: 'blur' }],
        parentNode: [{ required: true, message: '请输入父节点', trigger: 'blur' }],
        atcCode: [{ required: true, message: '请输入ATC编码', trigger: 'blur' }],
        classifyNameEn: [{ required: true, message: '请输入成分类别（英文）', trigger: 'blur' }],
        classifyName: [{ required: true, message: '请输入成分类别', trigger: 'blur' }]
      }
    }
  },

  created() {
    if (this.data) {
      this.model = Object.assign({}, this.data)
    }
  },

  computed: {
    isEdit() {
      return this.data
    },
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
