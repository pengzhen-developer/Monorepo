<template>
  <q-toolbar class="q-px-none"
             style="height: 80px;">
    <div class="full-width full-height flex justify-between items-center bg-primary">
      <div style="width: 240px; background: #2c8d98; box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);"
           class="full-height flex column items-center justify-center">

      </div>

      <transition enter-active-class="animated jump-out"
                  leave-active-class="animated jump-up">
        <div class="full-height col q-ml-lg q-pt-sm flex column justify-center flex-start animated jump-down">

          <div class="text-h6 text-weight-bold"
               style="line-height: 1; letter-spacing: 1px; margin: 0 0 3px 0;">
            {{ configuration.application.title }}
          </div>
          <div class="text-subtitle1"
               style="line-height: 1; letter-spacing: 1px;">
            {{ user.hospitalName }}
          </div>
        </div>
      </transition>

      <div class="full-height flex items-center q-pt-sm ">

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
      Peace.identity.auth.logout().then(() => {
        Util.user.removeUserInfo()
        Util.location.redirectToLoginAndClear()
      })
    },

    goWebSite() {
      Util.location.redirectToWebSite()
    }
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