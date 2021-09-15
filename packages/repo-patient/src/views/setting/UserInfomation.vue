<template>
  <div class="user-info">
    <van-cell-group>
      <van-cell title="头像">
        <template>
          <van-image :src="require('@src/assets/images/ic_personal.png')"
                     style="width: 50px;height: 50px;border-radius:50%;overflow: hidden;" />
        </template>
      </van-cell>
      <van-cell title="用户名"
                :value="model.realName"></van-cell>
      <van-cell title="昵称"
                is-link
                :value="model.nickName"
                @click="showNickNameDialog"></van-cell>
      <van-cell title="手机号码"
                is-link
                :value="model.tel"
                @click="showTelphoneDialog"></van-cell>
    </van-cell-group>
    <div class="footer">
      <van-button @click="signOut"
                  round
                  size="large"> 退出登录</van-button>
    </div>
    <!-- 修改昵称 -->
    <template v-if="nameDialog.visible">
      <ChangeNickName v-bind:nickName="nameDialog.model.nickName"
                      v-on:onSuccess="changeNickNameCallback"></ChangeNickName>
    </template>
    <!-- 修改手机号 -->
    <template v-if="telDialog.visible">
      <ChangePhone v-bind:phone="telDialog.model.oldTel"
                   v-on:onSuccess="changePhoneCallback"></ChangePhone>
    </template>
  </div>
</template>

<script>
import peace from '@src/library'
import ChangeNickName from '@src/views/setting/ChangeNickName'
import ChangePhone from '@src/views/setting/ChangePhone'
export default {
  name: 'UserInfomation',
  components: { ChangeNickName, ChangePhone },
  data() {
    return {
      model: {
        realName: '',
        nickName: '',
        tel: ''
      },
      nameDialog: {
        visible: false,
        model: {
          nickName: ''
        }
      },
      telDialog: {
        visible: false,
        model: {
          oldTel: ''
        }
      },
      userInfo: undefined
    }
  },

  activated() {
    this.userInfo = peace.cache.get(peace.type.USER.INFO)
    this.model.realName = this.userInfo.patientInfo.realName
    this.model.nickName = this.userInfo.patientInfo.nickName || this.userInfo.patientInfo.realName
    this.model.tel = this.userInfo.patientInfo.tel
  },
  methods: {
    showNickNameDialog() {
      const parmas = peace.util.encode({ nickName: this.model.nickName })
      this.$router.push(`/setting/ChangeNickName/${parmas}`)
    },
    showTelphoneDialog() {
      const parmas = peace.util.encode({ oldTel: this.model.tel })
      this.$router.push(`/setting/ChangePhone/${parmas}`)
    },
    signOut() {
      // 清空登录缓存
      peace.cache.remove(peace.type.USER.INFO)
      peace.cache.remove(peace.type.SYSTEM.WX_AUTH_CODE)

      //销毁IM实例
      peace.service.IM.destroyNIMS()

      // 跳转登录页
      this.$router.replace({ path: peace.config.system.loginPage, query: { referrer: '/setting/index' } })
      // window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .van-field {
    padding: 16px;
    border-bottom: 1px solid $-color--line;
    &.noBorder {
      border-width: 0;
      padding: 2px 16px;
    }
    &::after {
      border-width: 0;
    }
  }
  .van-cell-group {
    flex: 1;

    .van-cell {
      padding: 16px;
      border-bottom: 1px solid $-color--line;
      &::after {
        border-width: 0;
      }
      .van-cell__title {
        display: flex;
        align-items: center;
      }

      .van-cell__title,
      .van-cell__value {
        color: #000;
        font-size: 15px;
      }
    }
  }
  v-deep.van-hairline--top-bottom::after {
    height: 0;
  }

  .footer {
    padding: 12px 16px;
    v-deep.van-button__content {
      color: #666;
    }
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