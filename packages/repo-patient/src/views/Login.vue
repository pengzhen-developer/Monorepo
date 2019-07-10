<template>
  <div class="login">
    <div class="login-form">
      <h4 class="login-form-title">手机快捷登录</h4>

      <van-field placeholder="请输入手机号" ref="tel" v-model="tel" />
      <van-field placeholder="请输入验证码" ref="smsCode" v-model="smsCode">
        <span @click="sendSms" class="login-form-smsCode" slot="right-icon">{{ this.countDown === 60 ? '获取验证码' : this.countDown + 's' }}</span>
      </van-field>

      <van-button @click="signIn" class="login-form-sign-in" type="primary">进入爱家医</van-button>
      <van-button @click="signInByMock" class="login-form-sign-in" type="primary">模拟登录 - 彭真的账号</van-button>
    </div>

    <div class="login-footer">
      <span class="gray">进入爱加医即代表你已同意</span>
      <span>用户协议及隐私策略</span>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      tel: '',
      smsCode: '',
      countDown: 60
    }
  },

  methods: {
    sendSms() {
      if (!(this.tel && peace.validate.pattern.mobile.test(this.tel))) {
        this.$refs.tel.focus()
        return peace.util.alert('请输入正确的手机号')
      }

      const params = { tel: this.tel }
      peace.service.login.sendSms(params).then(res => {
        peace.util.alert(res.msg)
        this.$refs.smsCode.focus()

        const countDownInterval = setInterval(() => {
          if (this.countDown === 0) {
            this.countDown = 60
            window.clearInterval(countDownInterval)
          } else {
            this.countDown = this.countDown - 1
          }
        }, 1000)
      })
    },

    signIn() {
      const params = {
        tel: this.tel,
        smsCode: this.smsCode
      }

      peace.service.login.login(params).then(res => {
        // 提示登录成功
        peace.util.alert('登录成功，正在跳转...')

        // 更新 vuex store
        this.$store.commit('user/setUserInfo', res.data)

        // 存储到本地缓存
        peace.cache.set(peace.type.USER.INFO, res.data, peace.type.SYSTEM.CACHE.LOCAL_STORAGE)

        // 初始化 IM
        peace.service.IM.initNIM()

        setTimeout(() => {
          this.$router.push(peace.config.system.homePage)
        }, 1000)
      })
    },

    signInByMock() {
      // todo
      const mockLoginData = {
        docInfo: {
          id: 'sdhnqkdvyv',
          doctor_id: 'unayuzpaar',
          name: '何泰樑',
          id_card: '42900419920518429X',
          hospital_name: '武汉市第一医院',
          dep_name: '内科',
          is_pass: 'on',
          cert_file: '[{"img":"https://devapi.hp.aijiayi.com/img/img_certificate.png"},{"img":"https://devapi.hp.aijiayi.com/img/img_certificate.png"}]',
          doctor_title: '副主任医师',
          created_time: '2019-03-29 13:49:38',
          cert_no: 'A14514',
          netHospital_name: '武汉市第一医院',
          netHospital_id: 'vpnrstbnvh',
          netdept_name: '内科',
          netdept_child: '呼吸内科',
          dep_child: '呼吸内科',
          pass_reason: null,
          platdept_name: '内科',
          platdept_child: '普通外科',
          netdept_nameId: 'euxmmbqxdt',
          netdept_childId: 'tdmvmnfzfy',
          tel: '13164606327',
          photoDoc: 'https://devdoctor.hp.aijiayi.com/data/20190424/20190424101327jbeaxg_500_500.png',
          qr_ticket: '',
          openid: '7bbfeb38b9ecdc9bq92e4w8c05y99d9a66b',
          sign_status: 2,
          avartor: 'https://devdoctor.hp.aijiayi.com/data/20190424/20190424101327jbeaxg_500_500.png'
        },
        loginInfo: {
          id: 'ffapnptksm',
          tel: '13164606327',
          s_date: '2019-07-08 09:27:39',
          e_date: '2019-07-15 09:27:39',
          accessToken: '_d62e776641c43f02f16be0390cb09a88',
          uid: 'rglnwqnypr'
        },
        registerInfo: {
          id: 'coeoloqjhw',
          user_id: 'unayuzpaar',
          token: '57509078b6dd9b0a2444d040eb94bb47',
          nickname: '何泰樑',
          created_time: '2019-06-28 08:56:39',
          tel: '13164606327',
          birth: '',
          email: '',
          sign: '',
          icon: '',
          gender: 0,
          type: 1,
          to_img: null
        },
        patientInfo: {
          id: 'mbnbxzzdzl'
        }
      }

      // 提示登录成功
      peace.util.alert('登录成功，正在跳转...')

      // 更新 vuex store
      this.$store.commit('user/setUserInfo', mockLoginData)

      // 存储到本地缓存
      peace.cache.set(peace.type.USER.INFO, mockLoginData, peace.type.SYSTEM.CACHE.LOCAL_STORAGE)

      // 初始化 IM
      peace.service.IM.initNIM()

      setTimeout(() => {
        this.$router.push(peace.config.system.homePage)
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .login-form {
    flex: 1;
    display: flex;
    flex-direction: column;

    margin: 80px 10px 0 10px;

    .login-form-title {
      margin: 0 15px 25px 15px;
      font-size: 22px;
    }

    .login-form-smsCode {
      color: #333333;
    }

    .login-form-sign-in {
      margin: 30px 15px 15px 15px;
    }
  }

  .login-footer {
    height: 50px;
    text-align: center;
  }
}
</style>

