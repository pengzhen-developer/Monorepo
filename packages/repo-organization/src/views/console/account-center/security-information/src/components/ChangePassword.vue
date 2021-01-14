<template>
  <div>
    <el-form ref="form"
             class="dialog-content"
             :model="form"
             :rules="rules"
             label-width="100px">

      <el-form-item label="原始密码："
                    prop="oldPassword">
        <el-input v-model="form.oldPassword"
                  v-bind:minlength="6"
                  v-bind:maxlength="20"
                  placeholder="请输入原密码"></el-input>
      </el-form-item>

      <el-form-item label="新密码："
                    prop="newPassword">
        <el-input v-model="form.newPassword"
                  v-bind:show-password="showPassword"
                  v-bind:minlength="6"
                  v-bind:maxlength="20"
                  auto-complete="new-password"
                  v-on:focus="showPassword=true"
                  placeholder="6-20位字母、数字"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button class="btn"
                   v-on:click="onCancel">取消</el-button>
        <el-button type="primary"
                   class="btn"
                   v-on:click="onSubmit('form')">提交</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Service from '.././service'

export default {
  data() {
    return {
      showPassword: false,
      form: {
        oldPassword: '',
        newPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const params = {
            oldPwd: this.form.oldPassword,
            newPwd: this.form.newPassword
          }
          Service.changePwd(params).then((res) => {
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
<style scoped>
.dialog-content {
  padding-left: 40px;
  padding-right: 70px;
}
.btn {
  font-size: 14px;
  height: 32px;
  margin-top: 30px;
  padding: 0;
  width: 120px;
}
</style>