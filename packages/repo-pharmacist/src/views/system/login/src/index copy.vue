<template>
  <div>

    <PeaceButton type="primary"
                 v-on:click="login">Login</PeaceButton>

  </div>
</template>

<script>
export default {
  methods: {
    login() {
      const params = {
        // 登录模式 password:密码  mobile:手机
        grant_type: 'password',
        // 终端id
        client_id: process.env.VUE_APP_AUTH_CLIENT_ID,
        // 终端secret
        client_secret: process.env.VUE_APP_AUTH_CLIENT_SECRET,
        // 用户名（grant_type=password 时必填）
        username: '17512121212',
        // 密码（grant_type=password 时必填）
        password: '12345678',
        // 加密key（grant_type=password 时必填）
        encryption_key: process.env.VUE_APP_AUTH_ENCRYPTION_KEY,
        // 产品编码
        productCode: '',
        // 菜单类型 left：左菜单, top：顶菜单, button：按钮, 默认
        type: 'left',
        // 环境变量
        processEnv: process.env
      }

      Peace.identity.auth
        .workFlowAuth(params)
        .then(() => {
          this.$router.replace('/').then(() => window.location.reload())
        })
        .catch((error) => {
          Peace.util.error(error?.msg ?? '登录失败')
        })
    },

    redirectToHome() {
      window.location.href = window.location.origin
    }
  }
}
</script>


