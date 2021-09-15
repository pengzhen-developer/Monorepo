<template>
  <q-toolbar class="q-px-none"
             style="height: 80px;">
    <div class="full-width full-height flex justify-between items-center bg-primary">
      <div class="full-height flex items-center justify-center">
        <div style="width: 240px; background: #2c8d98; box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);"
             class="full-height flex column items-center justify-center">
          <q-img class="cursor-pointer inline"
                 style="width: 160px;"
                 contain
                 v-bind:src="require('@src/assets/logo.png')"></q-img>
        </div>

        <transition enter-active-class="animated jump-out"
                    leave-active-class="animated jump-up">
          <div class="col q-ml-lg q-pt-sm flex column justify-center flex-start animated jump-down">
            <div class="text-h6 text-weight-bold"
                 style="line-height: 1; letter-spacing: 1px; margin: 0 0 3px 0;">
              {{ configuration.application.title }}
            </div>
            <div class="text-subtitle1"
                 style="line-height: 1; letter-spacing: 1px;">
              {{ custName }}
            </div>
          </div>
        </transition>
      </div>

      <div class="full-height flex items-center q-pt-sm ">

        <!-- 账户名称 -->
        <span class="q-mr-sm">
          {{ accountInfo.name }}
        </span>
        <!-- 账户状态 -->

        <div class="q-mx-sm"
             v-if="status==='1'">
          <q-avatar rounded
                    style="font-size:14px;">
            <img :src="require('../assets/img/ic_work.png')">
          </q-avatar>
          <span class="q-ml-4">工作中</span>
        </div>
        <div class="q-mx-sm"
             v-else-if="status==='0'">
          <q-avatar rounded
                    style="font-size:14px;">
            <img :src="require('../assets/img/ic_rest.png')">
          </q-avatar>
          <span class="q-ml-4">休息中</span>
        </div>
        <!-- 账户名称 -->
        <q-btn class="q-mr-sm"
               flat
               round
               dense
               icon="arrow_drop_down">
          <q-popup-proxy>
            <q-list dense
                    bordered
                    padding
                    class="rounded-borders">
              <q-item clickable
                      v-ripple
                      v-bind:active="status === '1'"
                      active-class="status"
                      v-on:click="changeState('1')">
                <q-item-section avatar>
                  <q-avatar rounded
                            style="font-size:14px;">
                    <img :src="require('../assets/img/ic_work.png')">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  工作中
                </q-item-section>
              </q-item>
              <q-item clickable
                      v-ripple
                      v-bind:active="status === '0'"
                      active-class="status"
                      v-on:click="changeState('0')">
                <q-item-section avatar>
                  <q-avatar rounded
                            style="font-size:14px;">
                    <img :src="require('../assets/img/ic_rest.png')">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  休息中
                </q-item-section>
              </q-item>
              <q-item clickable
                      v-ripple
                      v-on:click="logout">
                <q-item-section avatar>
                  <q-avatar rounded
                            style="font-size:14px;">
                    <img :src="require('../assets/img/ic_logout.png')">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  退出登录
                </q-item-section>
              </q-item>
            </q-list>
          </q-popup-proxy>
        </q-btn>
      </div>
    </div>
  </q-toolbar>
</template>

<script>
import Util from '@src/util'
import Service from './../service'

export default {
  data() {
    return {
      configuration: window.configuration,
      accountInfo: {},
      custName: '',
      status: '',
      userId: ''
    }
  },

  async beforeCreate() {
    const custInfo = await Service.getCustName()
    const accountInfo = await Peace.identity.auth.getAccountInfo()

    this.accountInfo = accountInfo
    this.custName = custInfo.data
    this.getUserStatus()
  },

  methods: {
    changeState(type) {
      if (type == this.status) {
        return
      }
      this.status = type
      this.updateUserStatus()
    },
    logout() {
      Peace.identity.auth.logout().then(() => {
        Util.user.removeUserInfo()
        Util.location.redirectToLogin()
      })
    },
    //获取用户状态
    getUserStatus() {
      Service.getUserStatus().then((res) => {
        this.userId = res.data.userId
        this.status = res.data.status
      })
    },
    //更新用户状态
    updateUserStatus() {
      const params = {
        userId: this.userId,
        status: this.status
      }
      const formData = new FormData()
      Object.keys(params).forEach((key) => {
        formData.append(key, params[key])
      })
      Service.updateUserStatus(formData)
        .then(() => {
          const message = this.status == '1' ? '您已切换为工作中，可以审核处方啦~' : '您已切换为休息中，不可进行处方审核工作'
          Peace.util.success(message)
        })
        .catch((res) => {
          Peace.util.alert(res.msg)
          this.status = params.status == '1' ? '0' : '1'
        })
        .finally(() => {
          setTimeout(() => {
            window.location.reload()
          }, 500)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--q-color-primary);
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  line-height: 32px;
  text-align: center;
}
::v-deep .q-item__section--avatar {
  min-width: auto;
}

.status {
  background: var(--q-color-primary-light-1);
}
.q-item {
  &:hover {
    background: var(--q-color-primary-light-1);
    color: var(--q-color-primary);
  }
}
</style>