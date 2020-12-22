<template>
  <div class="dialog name">
    <van-form error-message-align="right"
              input-align="right"
              label-width="2.4em">
      <van-field v-model="model.nickName"
                 label="昵称"
                 clearable
                 placeholder="1-20位文字、数字或字母，不可使用特殊符号"
                 :error-message="message" />
      <div style="margin: 15px;">
        <peace-button round
                      block
                      throttle
                      :throttleTime="1500"
                      type="primary"
                      native-type="submit"
                      :disabled="!canSubmitName"
                      @click="changeNickName">
          确认修改
        </peace-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import peace from '@src/library'
export default {
  name: 'ChangeNickName',

  data() {
    return {
      message: '',
      model: {
        nickName: ''
      },
      params: {
        nickName: ''
      }
    }
  },
  computed: {
    canSubmitName() {
      return this.model.nickName && this.model.nickName != this.params.nickName
    }
  },
  created() {
    this.params = peace.util.decode(this.$route.params.json)
    this.model.nickName = this.params.nickName
  },
  methods: {
    //修改成功之后缓存最新的用户信息
    setUserInfo(result) {
      const userInfo = peace.cache.get(peace.type.USER.INFO)
      if (result.tel) {
        userInfo.patientInfo.tel = result.tel
      }
      if (result.nickName) {
        userInfo.patientInfo.nickName = result.nickName
      }
      // 存储用户信息
      this.$store.commit('user/setUserInfo', userInfo)
      peace.cache.set(peace.type.USER.INFO, userInfo)
    },
    changeNickName() {
      const params = { nickname: this.model.nickName }
      peace.service.patient
        .editBaseInfo(params)
        .then((res) => {
          peace.util.alert(res.msg)
          this.setUserInfo({ nickName: this.model.nickName })
          this.$router.go(-1)
        })
        .catch((err) => {
          this.message = err.msg
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-field {
  padding: 15px;
  border-bottom: 1px solid #dedede;
  &.noBorder {
    border-width: 0;
    padding: 2px 15px;
  }
  &::after {
    border-width: 0;
  }
}
.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 100;
  .van-button {
    margin-top: 20px;
  }
  &.name {
    .van-button {
      margin-top: 194px;
    }
  }
  /deep/.van-field__clear {
    color: #dedede;
  }
  /deep/.van-field__control,
  /deep/.van-field__label {
    font-size: 15px;
    color: #000;
  }
  /deep/.van-field__body {
    input::-webkit-input-placeholder {
      /*WebKit browsers*/
      font-size: 13px;
    }

    input::-moz-input-placeholder {
      /*Mozilla Firefox*/
      font-size: 13px;
    }

    input::-ms-input-placeholder {
      /*Internet Explorer*/
      font-size: 13px;
    }
  }
  .tip {
    color: #999;
    // padding: 12px 0;
  }
  .van-button--disabled {
    color: #999;
    background: #e0e0e0;
    opacity: 1;
    border-color: #e0e0e0;
  }

  .text-primary {
    color: $primary;
  }
  .text-gery {
    color: #999;
  }
}
</style>