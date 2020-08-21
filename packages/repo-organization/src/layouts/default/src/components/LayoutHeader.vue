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
          <span class="gt-md q-mt-sm q-mr-lg text-h6 text-grey-7 text-weight-bold animated jump-down">
            {{ configuration.application.title }}
          </span>
        </transition>
      </div>

      <div class="flex items-center">

        <!-- 用户名称 -->
        <span class="q-mr-sm">
          {{ user.tel }}
        </span>

        <!-- 用户控制 -->
        <q-btn class="q-mr-sm"
               flat
               round
               dense
               icon="keyboard_arrow_down"
               color="grey-7">
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
      return !window.sessionStorage.getItem('ORIGINAL_HREF')
    }
  },

  created() {
    this.user = Util.user.getUserInfo() ?? {}
  },

  methods: {
    signOut() {
      Util.user.removeUserInfo()
      Util.referrer.redirectToReferrer('login')
    },

    goWebSite() {
      Util.user.removeOriginalHref()
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