<template>
  <div class="auth">{{tips}}</div>
</template>

<script>
import Peace from '@src/library'
import Service from './service'
export default {
  data() {
    return {
      tips: 'Loading ...',
      params: {},
      redirect_url: '',
      client_id: '',
      client_secret: '',
      grant_type: '',
      username: '',
      password: '',
      mobile: '',
      code: ''
    }
  },

  created() {
    let params, data

    try {
      params = Peace.util.queryUrlParam('params')
      data = JSON.parse(decodeURIComponent(params))
    } catch (err) {
      console.log(err)
      this.errBack('参数解析错误！')
    }

    this.params = data

    this.redirect_url = data.redirect_url
    this.client_id = data.client_id
    this.client_secret = data.client_secret
    this.grant_type = data.grant_type
    this.username = data.username
    this.password = data.password
    this.mobile = data.mobile
    this.code = data.code

    this.init()
  },

  methods: {
    init() {
      if (Peace.validate.isUrl(this.redirect_url)) {
        if (this.client_id && this.client_secret) {
          switch (this.grant_type) {
            case 'password':
              this.authByPassword()
              break
            case 'mobile':
              this.authByMobile()
              break
            default:
              this.errBack('授权模式错误！')
              break
          }
        } else {
          this.errBack('终端信息不能为空！')
        }
      } else {
        this.errBack('重定向链接错误！')
      }
    },
    // 密码授权
    authByPassword() {
      let params = {
        username: this.username,
        password: this.password,
        client_id: this.client_id,
        client_secret: this.client_secret
      }
      Service.loginByPassword(params).then(
        (res) => {
          this.redirect(res)
        },
        (err) => {
          this.redirect(err)
        }
      )
    },
    // 手机授权
    authByMobile() {
      let params = {
        mobile: this.mobile,
        code: this.code,
        client_id: this.client_id,
        client_secret: this.client_secret
      }
      Service.loginByMobile(params).then(
        (res) => {
          this.redirect(res)
        },
        (err) => {
          this.redirect(err)
        }
      )
    },
    redirect(result) {
      let url = this.redirect_url + '?result=' + encodeURIComponent(JSON.stringify(result)) + '&params=' + encodeURIComponent(JSON.stringify(this.params))
      window.location.href = url
    },
    errBack(message) {
      Peace.util.error(message)
      setTimeout(() => {
        window.history.back()
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
}
</style>
