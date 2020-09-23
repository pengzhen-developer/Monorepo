<template>
  <q-toolbar class="q-px-none"
             style="height: 80px;">
    <div class="full-width full-height flex justify-between items-center bg-primary">
      <div class="full-height flex items-center justify-center">
        <div style="width: 240px; background: #2c8d98; box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);"
             class="full-height flex items-center justify-center">
          <q-img class="cursor-pointer"
                 style="width: 160px;"
                 v-bind:src="require('@src/assets/logo.png')"
                 v-on:click="goWebSite"></q-img>
        </div>

        <transition enter-active-class="animated jump-out"
                    leave-active-class="animated jump-up">
          <div class="q-ml-lg flex column justify-center flex-start animated jump-down">
            <div class="text-h6">
              {{ configuration.application.title }}
            </div>
            <div class="text-subtitle2">
              {{ user.hospitalName }}
            </div>
          </div>
        </transition>

      </div>

      <div class="flex items-center">

        <!-- 用户名称 -->
        <span class="q-mr-sm">
          {{ user.username }}
        </span>

        <!-- 用户控制 -->
        <q-btn class="q-mr-sm"
               flat
               round
               dense
               icon="arrow_drop_down">
          <q-popup-proxy v-if="showSignOut">
            <q-list dense
                    bordered
                    padding
                    class="rounded-borders">

              <q-item clickable
                      v-ripple
                      v-on:click="signOut">
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

export default {
  inject: ['provideToggleDrawer'],

  data() {
    return {
      configuration: window.configuration,

      user: undefined
    }
  },

  computed: {
    toggleDrawer() {
      return this.provideToggleDrawer
    },

    tel() {
      return this.user?.tel
    },

    showSignOut() {
      return !window.sessionStorage.getItem('original-href')
    }
  },

  created() {
    this.user = Util.user.getUserInfo() ?? {}
  },

  methods: {
    signOut() {
      // Util.user.logout().then(() => {
      Util.user.removeUserInfo()
      Util.referer.redirectToReferer('login')
      // })
    },

    goWebSite() {}
  }
}
</script>

<style>
.avatar {
  color: #fff;
  background: var(--q-color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  line-height: 1;
}

.text-white {
  color: #fff;
}
</style>