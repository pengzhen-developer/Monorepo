<template>
  <q-toolbar style="height: 64px;">
    <div class="full-width full-height flex justify-between items-center">
      <div class="full-height flex items-center q-ml-md">
        <q-img class="q-mr-xl cursor-pointer"
               style="width: 160px;"
               v-bind:src="require('@src/assets/logo.png')"></q-img>

        <transition enter-active-class="animated jump-out"
                    leave-active-class="animated jump-up">
          <span class="gt-md q-mt-sm q-mr-lg text-h6 text-grey-7 text-weight-bold animated jump-down">
            {{ configuration.application.title }}
          </span>
        </transition>

        <transition enter-active-class="animated jump-out"
                    leave-active-class="animated jump-up">
          <div class="animated jump-down">
            <el-menu mode="horizontal"
                     v-bind:default-active="defaultActive"
                     v-on:select="parentMenuSelect">
              <el-menu-item v-for="menu in menuTree"
                            v-bind:key="menu.id.toString()"
                            v-bind:index="menu.id.toString()"
                            v-bind:router="menu.id.toString()"
                            v-bind:disabled="menu.enable === false">
                <label class="text-subtitle2 cursor-pointer"
                       slot="title">{{ menu.menuName }}
                </label>
              </el-menu-item>
            </el-menu>
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
               icon="keyboard_arrow_down"
               color="grey-7">
          <q-popup-proxy>
            <q-list dense
                    bordered
                    padding
                    class="rounded-borders">

              <q-item clickable
                      v-ripple
                      v-on:click="goUserCenter">
                <q-item-section>
                  个人中心
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
  </q-toolbar>
</template>

<script>
import Util from '@src/util'

export default {
  inject: ['provdeParentMenuSelect', 'provideMenuTree'],

  props: {
    defaultActive: String
  },

  data() {
    return {
      configuration: window.configuration,

      user: Util.user.getUserInfo()
    }
  },

  computed: {
    parentMenuSelect() {
      return this.provdeParentMenuSelect
    },

    menuTree() {
      return this.provideMenuTree()
    }
  },

  methods: {
    goUserCenter() {
      this.$router.push('/user-center')
    },

    signOut() {
      Util.user.removeUserInfo()

      this.$router.push({ name: '/login' })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-menu--horizontal {
  border: none;
  margin: 0 10px 0 0;
}
::v-deep .el-menu--horizontal > .el-menu-item {
  &.is-active {
    color: var(--q-color-primary);
  }

  padding: 0;
  margin: 0 20px;
}
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