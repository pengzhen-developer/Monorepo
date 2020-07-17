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
                            v-bind:key="menu.id"
                            v-bind:index="menu.id"
                            v-bind:router="menu.id"
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
  inject: ['provideToggleDrawer', 'provdeParentMenuSelect', 'provideMenuList', 'provideMenuTree'],

  data() {
    return {
      configuration: window.configuration,

      defaultActive: '',

      user: undefined
    }
  },

  computed: {
    username() {
      return this.user.username ? this.user.username.substr(0, 1).toUpperCase() : ''
    },
    toggleDrawer() {
      return this.provideToggleDrawer
    },

    parentMenuSelect() {
      return this.provdeParentMenuSelect
    },

    menuList() {
      return this.provideMenuList()
    },

    menuTree() {
      return this.provideMenuTree()
    }
  },

  watch: {
    // 路由更新，还原 nav
    '$route.path'() {
      this.$nextTick().then(() => {
        this.resetHeaderSelect()
      })
    },

    // 菜单更新，还原 nav
    menuTree() {
      this.$nextTick().then(() => {
        this.resetHeaderSelect()
      })
    }
  },

  created() {
    this.user = Util.user.getUserInfo() ?? {}
  },

  mounted() {
    this.$nextTick().then(() => {
      // 设定导航选中
      this.resetHeaderSelect()
    })
  },

  methods: {
    resetHeaderSelect() {
      // 初始化进入？ 默认选中第一个顶级菜单
      if (this.$route.path === '/layout') {
        const firstMenuNode = this.$el.querySelector(`li.el-menu-item:not(.is-disabled)`)

        firstMenuNode?.click()

        return
      }

      // 恢复菜单选中
      else {
        // 存在 path，根据 path 寻找顶级菜单
        const node = this.$route?.meta
        const root = this.deepQueryRoot(this.menuList, node)
        if (root) {
          const menuNode = this.$el.querySelector(`li[router="${root?.id}"]`)
          menuNode?.click()
        } else {
          const firstMenuNode = this.$el.querySelector(`li.el-menu-item:not(.is-disabled)`)

          firstMenuNode?.click()
        }
      }
    },

    deepQueryRoot(list, node) {
      var arr = []

      const find = (list, node) => {
        list.some((item) => {
          if (item.id === node.parentId) {
            arr.push(item)

            return find(list, item)
          }
        })
      }

      find(list, node)

      return arr.find((item) => item.parentId === null)
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