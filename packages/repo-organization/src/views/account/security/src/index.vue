<template>
  <div class="safe-content">
    <div class="content-bgd">
      <div class="content-item">
        <img src="./assets/img/ic_password.png" />
        <p class="title">登录密码</p>
        <p class="content">安全性高的密码可以使账户更安全。建议您定期更换密码，
          设置一个包含字母、符号或数字中至少两项且长度为6位至
          20位的不包括空格的密码。</p>
        <p class="operate"
           @click="changePassword()">修改</p>
      </div>
      <div class="content-item">
        <img src="./assets/img/ic_iphone.png" />
        <p class="title">手机号码</p>
        <p class="content">更换手机号码，您的手机号可以直接用于登录、找回密码</p>
        <p class="operate"
           @click="gotoChangePhonePath()">修改</p>
      </div>

      <el-dialog :visible.sync="changePasswordDialogVisible"
                 v-if="changePasswordDialogVisible"
                 width="554px"
                 title="修改密码">
        <ChangePassword v-on:onSucess="changePasswordDialogVisible = false"
                        v-on:onCancel="changePasswordDialogVisible = false" />
      </el-dialog>
    </div>

    <div v-if="changePhoneVisible">
      <ChangePhone v-on:onCancel="changePhoneVisible = false"
                   v-on:onSuccess="changePhoneVisible = false" />
    </div>

  </div>

</template>

<script>
import ChangePassword from './components/ChangePassword'
import ChangePhone from './components/ChangePhone'

export default {
  data() {
    return {
      changePasswordDialogVisible: false,
      changePhoneVisible: false
    }
  },

  components: {
    ChangePassword,
    ChangePhone
  },

  methods: {
    //修改密码
    changePassword() {
      this.changePasswordDialogVisible = true
    },

    //关闭修改密码的弹框
    closeChangePassword() {
      this.changePasswordDialogVisible = false
    },

    gotoChangePhonePath() {
      this.changePhoneVisible = true
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
.safe-content {
  position: relative;
}
.content-bgd {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: white;
}

.content-item {
  height: 164px;
  background: #f9f9f9;
  margin: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.content-item img {
  width: 74px;
  height: 74px;
}

.title {
  color: var(--q-color-grey-333);
  font-size: 16px;
  font-weight: 600;
}
.content {
  color: var(--q-color-grey-666);
  max-width: 360px;
  font-size: 14px;
}
.operate {
  font-size: 14px;
  color: var(--q-color-primary);
  border: 1px solid var(--q-color-primary);
  padding: 5px 46px;
  border-radius: 5px;
}
</style>