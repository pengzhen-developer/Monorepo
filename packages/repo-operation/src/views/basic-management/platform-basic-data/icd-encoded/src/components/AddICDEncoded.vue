<template>
  <div>
    <PeaceDialog width="450px"
                 v-bind:visible.sync="visible"
                 title="新增ICD编码">
      <el-form ref="form"
               label-width="auto"
               v-bind:model="model"
               v-bind:rules="rules">

        <el-form-item label="主要编码：" prop="icd10Code">
          <el-input v-model="model.icd10Code"
                    placeholder="请输入"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="附加编码：">
          <el-input v-model="model.extCode"
                    placeholder="请输入"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="疾病名称：" prop="name">
          <el-input v-model="model.name"
                    placeholder="请输入"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="级别： "  prop="leavel">

          <el-select clearable
                     filterable
                     v-model.trim="model.leavel"
                     class="block"
                     placeholder="请选择">
            <el-option v-for="level in source.levelList"
                       :key="level"
                       :label="level"
                       :value="level">
            </el-option>
          </el-select>

        </el-form-item>


        <el-form-item label="父节点编码： ">
          <el-select clearable
                     filterable
                     class="block"
                     v-model.trim="model.parentNode"
                     placeholder="请选择">
            <el-option v-for="item in source.parentNodeCodes"
                       :key="item.icd10Code"
                       :label="item.icd10Code"
                       :value="item.icd10Code">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="el-dialog__footer">
          <el-button class="btn"
                     v-on:click="cancel">取消</el-button>
          <el-button type="primary"
                     class="btn"
                     v-bind:loading="isLoading"
                     v-on:click="validateForm">提交</el-button>

        </el-form-item>

      </el-form>
    </PeaceDialog>
  </div>
</template>

<script>

import Service from '../service';

export default {
  props: {
    value: {
      required: true,
      type: Boolean
    },
  },

  data() {
    return {
      isLoading: false,
      visible: this.value,
      model: {
        icd10Code: undefined,
        extCode: undefined,
        name: undefined,
        leavel: undefined,
        parentNode: undefined,
      },
      source: {
        levelList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        parentNodeCodes: [],
      },
      rules: {
        icd10Code: [{ required: true, message: '请输入主要编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入疾病名称', trigger: 'blur' }],
        leavel: [{ required: true, message: '请选择级别', trigger: 'blur' }],
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      Service.getPatientList().then((res) => {
        this.source.parentNodeCodes = res.data;
      })
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
      Service.addData(params).then((res) => {
        Peace.util.success(res.message)
        this.visible = false
        this.$emit('refresh')
      }).finally(() => this.isLoading = false)
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
