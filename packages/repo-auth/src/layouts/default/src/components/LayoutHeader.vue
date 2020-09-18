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
          <span class="gt-xs q-mt-sm q-mr-lg text-h6 text-grey-7 text-weight-bold animated jump-down">
            {{ configuration.application.title }}
          </span>
        </transition>
      </div>

      <div class="flex items-center">

        <!-- 用户名称 -->
        <span class="q-mr-sm">
          {{ name }}
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
                      v-on:click="changePassword">
                <q-item-section>
                  修改密码
                </q-item-section>
              </q-item>
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
    <peace-dialog title="修改密码"
                  width="470px"
                  append-to-body
                  v-if="dialog.visible"
                  v-bind:visible.sync="dialog.visible">
      <ChangePassword @onClose="onClose"></ChangePassword>
    </peace-dialog>
  </q-toolbar>
</template>

<script>
import Util from '@src/util'
import ChangePassword from '@src/views/components/changePassword'
export default {
  components: { ChangePassword },
  inject: ['provideToggleDrawer'],

  data() {
    return {
      configuration: window.configuration,

      user: undefined,

      dialog: {
        visible: false
      }
    }
  },

  computed: {
    toggleDrawer() {
      return this.provideToggleDrawer
    },

    name() {
      return this.user?.username
    },

    showSignOut() {
      return !window.sessionStorage.getItem('original-href')
    }
  },

  created() {
    this.user = Util.user.getUserInfo() ?? {}
  },

  methods: {
    changePassword() {
      this.dialog.visible = true
    },
    onClose() {
      this.dialog.visible = false
    },
    signOut() {
      Util.user.removeUserInfo()
      Util.route.replaceToLogin()
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
</style>