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