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
        client_id: 'console',
        // 终端secret
        client_secret: 'console',
        // 用户名（grant_type=password 时必填）
        username: '13999999999',
        // 密码（grant_type=password 时必填）
        password: '123456',
        // 加密key（grant_type=password 时必填）
        encryption_key: 'sksksksksksksksk',
        // 产品编码
        productCode: 'kzt',
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


