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
          <span v-if="$q.screen.gt.sm"
                class="q-ml-xl q-mt-md q-mr-lg text-h6 text-grey-7 text-weight-medium animated jump-down">
            {{ configuration.application.title }}
          </span>
        </transition>
      </div>

      <div class="flex items-center">
        <!-- 消息通知 -->
        <!-- <q-btn class="q-mr-sm"
               flat
               round
               dense
               color="grey-7"
               v-show="false">
          <q-badge color="primary"
                   floating>3</q-badge>
          <i class="text-h6 el-icon-message"></i>
          <q-tooltip>您有 3 条未读消息</q-tooltip>
          <q-menu>
            <q-list paddingg>
              <q-item clickable
                      v-close-popup>第 1 条消息</q-item>
              <q-item clickable
                      v-close-popup>第 2 条消息</q-item>
              <q-item clickable
                      v-close-popup>第 3 条消息</q-item>
            </q-list>
          </q-menu>
        </q-btn> -->

        <!-- 菜单控制 -->
        <q-btn class="q-mr-sm"
               flat
               round
               dense
               icon="menu"
               color="grey-7"
               v-on:click="toggleDrawer" />

        <!-- 用户头像 -->
        <q-btn class="q-mr-sm"
               flat
               round>
          <q-avatar size="26px">
            <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
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
    }
  },

  created() {
    this.user = Util.user.getUserInfo() ?? {}
  },

  methods: {
    signOut() {
      Util.user.removeUserInfo()
      Util.referrer.replaceToReferrer()
    },

    goWebSite() {
      Util.referrer.replaceToReferrer()
    }
  }
}
</script>

<style>
</style>