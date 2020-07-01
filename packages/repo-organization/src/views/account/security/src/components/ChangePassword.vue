<template>
  <div>
    <el-form ref="form"
             class="dialog-content"
             :model="form"
             label-width="100px">

      <el-form-item label="原始密码：">
        <el-input v-model="form.oldPassword"
                  v-bind:minlength="4"
                  v-bind:maxlength="20"
                  placeholder="请输入原密码"></el-input>
      </el-form-item>

      <el-form-item label="新密码：">
        <el-input v-model="form.newPassword"
                  show-password
                  v-bind:minlength="4"
                  v-bind:maxlength="20"
                  placeholder="6-20位字母、数字"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button class="btn"
                   v-on:click="onCancel">取消</el-button>
        <el-button type="primary"
                   class="btn"
                   v-on:click="onSubmit">立即创建</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('onSucess')
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