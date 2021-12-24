
<template>
  <div class="q-mx-16"
       v-loading="loading">
    <el-form v-bind:model="model"
             v-bind:rules="rules"
             ref="ruleForm"
             label-suffix="："
             label-width="auto">
      <el-form-item label="主要编码"
                    prop="icd10Code">
        <peace-input v-model.trim="model.icd10Code"
                     placeholder="请输入"></peace-input>
      </el-form-item>
      <el-form-item label="疾病名称"
                    prop="name">
        <peace-input v-model.trim="model.name"
                     placeholder="请输入"></peace-input>
      </el-form-item>
      <el-form-item label="附加编码">
        <peace-input v-model.trim="model.extCode"
                     placeholder="请输入"></peace-input>
      </el-form-item>
    </el-form>
    <div class="flex justify-end full-width q-pt-32">
      <el-button v-on:click="cancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="submit">{{type==='add'?'提交':'保存'}}</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'
export default {
  name: 'EditModel',
  props: {
    info: Object,
    type: String
  },

  data() {
    return {
      model: {
        icd10Code: '',
        name: '',
        extCode: ''
      },

      rules: {
        icd10Code: [{ required: true, message: '请输入主要编码', tragger: 'blur' }],
        name: [{ required: true, message: '请输入疾病名称', trigger: 'blur' }]
      },

      loading: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.model.orgCode = this.info.orgCode
      this.model.orgName = this.info.orgName
      if (this.type === 'edit') {
        this.model.icd10Code = this.info.icd10Code
        this.model.name = this.info.name
        this.model.extCode = this.info.extCode
        this.model.id = this.info.id
      }
    })
  },
  methods: {
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.type === 'edit') {
            this.updateOrgDiagnosis()
          } else {
            this.addOrgDiagnosis()
          }
        } else {
          return false
        }
      })
    },

    cancel() {
      this.$emit('cancel')
    },
    complate() {
      this.$emit('complate')
    },
    refresh() {
      this.$emit('refresh')
    },
    addOrgDiagnosis() {
      this.loading = true
      const parmas = Peace.util.deepClone(this.model)
      Service.addOrgDiagnosis(parmas)
        .then((res) => {
          Peace.util.success(res.message)
          this.refresh()
          this.complate()
        })
        .finally(() => {
          this.loading = false
        })
    },
    updateOrgDiagnosis() {
      this.loading = true
      const parmas = Peace.util.deepClone(this.model)
      Service.updateOrgDiagnosis(parmas)
        .then((res) => {
          Peace.util.success(res.message)
          this.refresh()
          this.complate()
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>
</style>