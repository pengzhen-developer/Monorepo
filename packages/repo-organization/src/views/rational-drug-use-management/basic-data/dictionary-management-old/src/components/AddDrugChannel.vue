<template>
  <div>
    <el-form ref="form"
             class="dialog-content"
             :model="form"
             :rules="rules"
             label-width="150px">

      <el-form-item label="给药途径编码："
                    prop="attrCode">
        <el-input v-model="form.attrCode"
                  v-bind:maxlength="30"
                  placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="给药途径名称："
                    prop="attrName">
        <el-input v-model="form.attrName"
                  v-bind:maxlength="30"
                  placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <div class="text-center">
      <el-button v-on:click="onCancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="onSubmit('form')">提交</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'

export default {
  data() {
    return {
      form: {
        attrCode: '',
        attrName: ''
      },
      rules: {
        attrCode: [{ required: true, message: '请输入给药途径编码', trigger: 'blur' }],
        attrName: [{ required: true, message: '请输入给药途径名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const params = {
            attrCode: this.form.attrCode,
            attrName: this.form.attrName
          }
          Service.addDrugChannel(params).then((res) => {
            Peace.util.success(res.msg)
            this.$emit('onSucess')
          })
        } else {
          return false
        }
      })
    },

    onCancel() {
      this.$emit('onCancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-content {
  padding-left: 40px;
  padding-right: 70px;
}
</style>