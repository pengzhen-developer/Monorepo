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
                      v-on:click="logout">
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
      custName: ''
    }
  },

  async beforeCreate() {
    this.accountInfo = await Peace.identity.auth.getAccountInfo()
    this.custName = (await Service.getCustName()).data.list
  },

  methods: {
    logout() {
      Peace.identity.auth.logout().then(() => {
        Util.user.removeUserInfo()
        Util.location.redirectToLogin()
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
</style>