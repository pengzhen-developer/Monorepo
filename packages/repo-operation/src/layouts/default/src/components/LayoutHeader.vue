<template>
  <q-toolbar class="flex justify-between items-center full-height q-px-none">
    <div class="flex full-height col">
      <template v-if="showTopNav">
        <el-menu class="element-ui-default"
                 mode="horizontal"
                 v-if="$q.screen.gt.sm"
                 v-bind:default-active="selectedTopMenu.id"
                 v-on:select="menuSelect">
          <el-menu-item v-for="menu in accountMenuTree"
                        v-bind:key="menu.id.toString()"
                        v-bind:index="menu.id.toString()"
                        v-bind:router="menu.id.toString()"
                        v-bind:disabled="menu.enable === false">
            <label class="cursor-pointer"
                   slot="title">{{ menu.menuName }}
            </label>
          </el-menu-item>
        </el-menu>
      </template>
    </div>

    <div class="flex">

      <template v-if="showTopNav">
        <q-btn v-if="$q.screen.lt.md"
               round
               dense
               flat
               color="text-grey-7"
               icon="apps">
          <q-tooltip>Apps</q-tooltip>

          <q-menu auto-close>
            <q-list dense
                    style="min-width: 100px">
              <q-item v-for="menu in accountMenuTree"
                      v-bind:key="menu.id.toString()"
                      v-on:click="menuSelect(menu.id)"
                      clickable
                      class="GL__menu-link">
                <q-item-section>{{ menu.menuName }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </template>

      <q-btn round
             flat>
        <q-avatar>
          <i class="zyy-icon zyy-zhanghaozhongxin text-white"
             style="font-size: 16px;"></i>
        </q-avatar>

        <q-tooltip>{{ accountInfo.name }}</q-tooltip>

        <q-menu fit
                auto-close>
          <q-list dense
                  bordered
                  padding>
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
        </q-menu>
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script>
import { queryDeepestNode } from './../util'

import obAccount from './../observable/ob-account'
import obLayoutTabs from './../observable/ob-layout-tabs'
import obLayoutMenu from './../observable/ob-layout-menu'

import Util from '@src/util'

export default {
  props: {
    defaultActive: String
  },

  data() {
    return {}
  },

  computed: {
    accountInfo: () => obAccount.state.accountInfo ?? {},
    accountMenuTree: () => obAccount.state.accountMenuTree ?? [],
    selectedTopMenu: () => obLayoutMenu.state.selectedTopMenu ?? {},

    showTopNav: () => window.configuration.layout.side.showTopNav
  },

  methods: {
    menuSelect(id) {
      const selectedTopMenu = this.accountMenuTree.find((item) => item.id === id)
      const deepestNode = queryDeepestNode(selectedTopMenu.children ?? [])

      obLayoutMenu.mutations.setSelectedTopMenu(selectedTopMenu)

      if (deepestNode) {
        obLayoutTabs.mutations.addTab(deepestNode)
        obLayoutTabs.mutations.setTab(deepestNode)
      } else {
        obLayoutTabs.mutations.addTab(selectedTopMenu)
        obLayoutTabs.mutations.setTab(selectedTopMenu)
      }
    },

    goUserCenter() {
      this.$router.push('/user-center')
    },

    signOut() {
      Peace.identity.auth.logout().then(() => {
        Util.user.removeUserInfo()
        Util.location.redirectToLogin()
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
  margin: 0 16px;
  font-size: 16px;
  transition: none;
  justify-content: center;
  align-items: center;
}

.el-menu--horizontal > .el-menu-item.is-active {
  color: #fff;
  font-weight: 500;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 3px;
    border-bottom: 3px solid #fff;
  }
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