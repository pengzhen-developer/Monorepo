<template>
  <q-toolbar style="height: 64px;">
    <div class="full-width full-height flex justify-between items-center">
      <div class="full-height flex items-center q-ml-md">
        <q-img class="q-mr-xl cursor-pointer"
               style="width: 160px;"
               v-bind:src="require('@src/assets/logo.png')"
               v-on:click="goWebSite"></q-img>

        <transition enter-active-class="animated jump-out"
                    leave-active-class="animated jump-up">
          <span
                class="gt-md q-mt-sm q-mr-lg text-h6 text-grey-7 text-weight-bold animated jump-down">
            {{ configuration.application.title }}
          </span>
        </transition>
      </div>

      <div class="flex items-center">
        <!-- 用户头像 -->
        <q-btn class="q-mr-sm"
               flat
               round>
          <q-avatar size="32px">
            <img v-if='user.icon'
                 :src="user.icon">
            <div class="avatar"
                 v-else>{{username}}</div>
          </q-avatar>

          <q-tooltip>
            <span>{{ user.username }}，你好</span>
          </q-tooltip>

          <q-popup-proxy>
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
    username() {
      return this.user?.username.substr(0, 1).toUpperCase()
    }
  },

  created() {
    this.user = Util.user.getUserInfo() ?? {}
  },

  methods: {
    signOut() {
      Util.user.removeUserInfo()
      Util.referrer.redirectToReferrer()
    },

    goWebSite() {
      Util.referrer.redirectToReferrer('_blank')
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
</style>