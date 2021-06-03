<template>
  <div>
    <el-form ref="form"
             label-suffix="："
             label-width="120px"
             v-bind:model="model"
             v-bind:rules="model.id ? editRules: addRules">
      <el-form-item label="给药频次编码"
                    prop="extCode">
        <template v-if="model.id">
          <span>{{model.extCode}}</span>
        </template>
        <template v-else>
          <el-input v-model.trim="model.extCode"
                    maxlength="100"
                    placeholder="请输入"></el-input>
        </template>

      </el-form-item>
      <el-form-item label="给药频次名称"
                    prop="name">
        <el-input v-model.trim="model.name"
                  maxlength="100"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="给药频次缩写名"
                    prop="abbreviation">
        <el-input v-model.trim="model.abbreviation"
                  maxlength="100"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="系数"
                    prop="coefficient">
        <el-input v-model.trim="model.coefficient"
                  maxlength="100"
                  placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>

    <div class="text-right">
      <el-button v-on:click="close">取消</el-button>
      <el-button type="primary"
                 v-bind:loading="isLoading"
                 v-on:click="submit">{{model.id ? '保存':'提交'}}</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'

export default {
  name: 'Model',
  props: {
    org: Object,
    data: Object
  },

  data() {
    return {
      isLoading: false,
      model: {
        id: undefined,
        orgCode: '',
        orgName: '',
        extCode: '',
        name: '',
        abbreviation: '',
        coefficient: ''
      },

      addRules: {
        extCode: [{ required: true, message: '请输入给药频次编码', trigger: 'blur' }],
        name: [{ required: true, message: '请填写给药频次名称', trigger: 'blur' }]
      },
      editRules: {
        name: [{ required: true, message: '请填写给药频次名称', trigger: 'blur' }]
      }
    }
  },

  created() {
    if (this.data?.id) {
      this.model = Peace.util.deepClone(this.data)
    } else {
      this.model.orgCode = this.org.orgCode
      this.model.orgName = this.org.orgName
    }
  },

  methods: {
    submit() {
      this.validateForm().then(() => {
        if (this.isLoading) return false
        const params = Peace.util.deepClone(this.model)
        this.isLoading = true
        Service[this.model.id ? 'edit' : 'add'](params)
          .then(() => {
            Peace.util.success(`${this.model.id ? '保存' : '提交'}成功`)
            this.$emit('close')
            this.$emit('refresh')
            this.isLoading = false
          })
          .catch(() => {
            this.isLoading = false
          })
      })
    },

    close() {
      this.$emit('close')
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
</style>
