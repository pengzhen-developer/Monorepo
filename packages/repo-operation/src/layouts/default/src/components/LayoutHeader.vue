<template>
  <q-toolbar class="q-px-none"
             style="height: 80px;">
    <div class="full-width full-height flex justify-between items-center bg-primary">
      <div style="width: 240px; background: #2c8d98; box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);"
           class="full-height flex column items-center justify-center">
        <q-img class="cursor-pointer inline"
               style="width: 140px; height: 40px;"
               contain
               v-bind:src="require('@src/assets/logo.png')"></q-img>

        <transition enter-active-class="animated jump-out"
                    leave-active-class="animated jump-up">
          <span class="gt-xl inline text-subtitle1 animated jump-down"
                style="min-width: 140px;
                       display: inline-block;
                       text-align: justify;
                       text-align-last: justify;">
            {{ configuration.application.title }}
          </span>
        </transition>
      </div>

      <div class="col q-pt-sm">

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
                <label class="cursor-pointer"
                       slot="title">{{ menu.menuName }}
                </label>
              </el-menu-item>
            </el-menu>
          </div>
        </transition>
      </div>

      <div class="flex items-center q-pt-sm">

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
               color="white">
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

      user: {}
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
  async mounted() {
    this.user = await Peace.identity.auth.getAccountInfo()
  },
  methods: {
    goUserCenter() {
      this.$router.push('/user-center')
    },

    signOut() {
      Peace.identity.auth.logout().then(() => {
        Peace.identity.auth.removeAll()
        Util.user.removeUserInfo()
        this.$router.push({ name: 'Login' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu--horizontal {
  border: none;
  margin: 0 10px 0 0;
  background: var(--q-color-primary);
}
.el-menu--horizontal > .el-menu-item {
  &.is-active {
    color: var(--q-color-primary);
  }

  color: #ffffffb3;
  height: 72px;
  line-height: 72px;
  padding: 0;
  margin: 0 20px;
  font-size: 16px;
  transition: none;
}

.el-menu--horizontal > .el-menu-item.is-active {
  color: #fff;
  font-weight: bold;
  border-bottom: 3px solid #fff;
}

.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  color: #fff;
  background: transparent;
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