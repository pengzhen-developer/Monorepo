<template>
  <div>
    <PeaceDialog width="500px"
                 v-bind:visible.sync="visible"
                 :title=" isEdit ? '修改给药频次' : '新增给药频次' ">
      <el-form ref="form"
               label-width="auto"
               v-bind:model="model"
               v-bind:rules="rules"
               v-on:submit.native.prevent
               v-on:keyup.enter.native="validateForm">

        <el-form-item label="频次名称："
                      prop="icd10Code">
          <el-input v-model="model.icd10Code"
                    placeholder="请输入"
                    maxlength="50"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="频次名称缩写：">
          <el-input v-model="model.extCode"
                    placeholder="请输入"
                    maxlength="50"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="服用频次：">
          <el-input v-model="model.name"
                    placeholder="请输入"
                    maxlength="50"
                    clearable></el-input>
          <span class="unit">次</span>
        </el-form-item>

        <el-form-item label="服用间隔：">

          <el-input v-model="model.name"
                    placeholder="请输入"
                    maxlength="50"
                    clearable></el-input>
          <span class="unit">天</span>
        </el-form-item>

        <el-form-item label="备注：">

          <el-input v-model="model.name"
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
    isEdit: {
      required: true,
      type: Boolean
    }
  },

  data() {
    return {
      isLoading: false,
      remoteLoading: false,
      visible: this.value,
      model: {
        icd10Code: undefined,
        extCode: undefined,
        name: undefined,
        leavel: undefined,
        parentNode: undefined
      },
      source: {
        levelList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        parentNodeCodes: []
      },
      rules: {
        icd10Code: [{ required: true, message: '请输入主要编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入疾病名称', trigger: 'blur' }],
        leavel: [{ required: true, message: '请选择级别', trigger: 'blur' }]
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.getRemoteList()
    })
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
      Service.addData(params)
        .then((res) => {
          Peace.util.success(res.message)
          this.visible = false
          this.$emit('refresh')
        })
        .finally(() => (this.isLoading = false))
    },
    getRemoteList(query) {
      this.remoteLoading = true
      Service.getPatientList(query)
        .then((res) => {
          this.source.parentNodeCodes = res.data
        })
        .finally(() => (this.remoteLoading = false))
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__content {
  display: flex;
}

.unit {
  color: #333;
  padding: 0px 10px;
}

.el-form-item {
  margin-bottom: 8px;

  &.is-error {
    margin-bottom: 24px;
  }
}
</style>
