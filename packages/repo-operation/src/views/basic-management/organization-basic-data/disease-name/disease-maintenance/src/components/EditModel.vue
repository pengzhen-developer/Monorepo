
<template>
  <div class="flex items-center column"
       v-loading="loading">
    <el-form v-bind:model="model"
             v-bind:rules="rules"
             ref="ruleForm"
             label-width="auto"
             label-suffix="：">
      <el-form-item label="系统编码"
                    v-if="type==='edit'">
        <div>{{info.code}}</div>
      </el-form-item>
      <el-form-item label="疾病名称"
                    prop="name">
        <peace-input v-model.trim="model.name"
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
        name: '',
        orgName: '',
        orgCode: ''
      },

      rules: {
        name: [{ required: true, message: '请输入疾病名称', trigger: 'blur' }]
      },
      loading: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.model.orgName = this.info.orgName
      this.model.orgCode = this.info.orgCode
      if (this.type === 'edit') {
        this.model.name = this.info.name
        this.model.id = this.info.id
      }
    })
  },
  methods: {
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.type === 'add') {
            this.addOrgDisease()
          } else {
            this.updateOrgDisease()
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
    addOrgDisease() {
      this.loading = true
      const parmas = Peace.util.deepClone(this.model)
      Service.addOrgDisease(parmas)
        .then((res) => {
          Peace.util.success(res.message)
          this.refresh()
          this.complate()
        })
        .finally(() => {
          this.loading = false
        })
    },
    updateOrgDisease() {
      this.loading = true
      const parmas = Peace.util.deepClone(this.model)
      Service.updateOrgDisease(parmas)
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