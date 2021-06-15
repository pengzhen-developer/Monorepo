<template>
  <div>
    <PeaceDialog width="450px"
                 v-bind:visible.sync="visible"
                 title="修改ICD编码">
      <el-form ref="form"
               label-width="auto"
               v-bind:model="model"
               v-bind:rules="rules"
               v-on:submit.native.prevent
               v-on:keyup.enter.native="validateForm">

        <el-form-item label="主要编码："
                      prop="icd10Code">
          <el-input v-model="model.icd10Code"
                    placeholder="请输入"
                    maxlength="50"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="附加编码：">
          <el-input v-model="model.extCode"
                    placeholder="请输入"
                    maxlength="50"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="疾病名称："
                      prop="name">
          <el-input v-model="model.name"
                    placeholder="请输入"
                    maxlength="50"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="级别： "
                      prop="leavel">

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
                     remote
                     class="block"
                     v-model.trim="model.parentNode"
                     v-on:loading="remoteLoading"
                     v-on:remote-method="remoteMethod"
                     placeholder="请选择">
            <el-option v-for="item in source.parentNodeCodes"
                       :key="item.icd10Code + item.name"
                       :label="item.icd10Code"
                       :value="item.icd10Code">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态："
                      prop="useStatus">
          <el-radio-group v-model="model.useStatus">
            <el-radio label="yes">启用</el-radio>
            <el-radio label="no">停用</el-radio>
          </el-radio-group>
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
import Service from '../service/index'

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
        parentNode: undefined,
        useStatus: 'yes'
      },
      source: {
        levelList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        parentNodeCodes: []
      },
      rules: {
        icd10Code: [{ required: true, message: '请输入主要编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入疾病名称', trigger: 'blur' }],
        leavel: [{ required: true, message: '请选择级别', trigger: 'blur' }],
        // parentNode: [{ required: true, message: '请选择父节点编码', trigger: 'blur' }],
        useStatus: [{ required: true, message: '请选择状态', trigger: 'blur' }]
      }
    }
  },

  created() {
    const tmp = {
      id: this.data.id,
      icd10Code: this.data.icd10Code,
      extCode: this.data.extCode,
      name: this.data.name,
      leavel: this.data.leavel,
      parentNode: this.data.parentNode,
      useStatus: this.data.useStatus
    }
    this.model = Object.assign({}, tmp)
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
      Service.modifyData(params)
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
