<template>
  <q-toolbar style="height: 64px;">
    <div class="full-width full-height flex justify-between items-center">
      <div class="full-height flex items-center q-ml-md">
        <q-img class="q-mr-xl"
               style="width: 160px;"
               v-bind:src="require('@src/assets/logo.png')"></q-img>

        <transition enter-active-class="animated jump-out"
                    leave-active-class="animated jump-up">
          <span v-if="$q.screen.gt.sm"
                class="q-ml-xl q-mt-md text-h6 text-grey-7 text-weight-medium animated jump-down">智药云平台运营中心</span>
        </transition>
      </div>

      <div class="flex items-center">
        <!-- 消息通知 -->
        <q-btn class="q-mr-sm"
               flat
               round
               dense
               color="grey-7">
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
        </q-btn>

        <!-- 菜单控制 -->
        <q-btn class="q-mr-sm"
               flat
               round
               dense
               icon="menu"
               color="grey-7"
               v-on:click="toggleDrawer" />

        <!-- 用户信息 -->
        <q-btn round
               flat>
          <q-avatar size="26px">
            <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
          </q-avatar>
          <q-tooltip>阿豆豆，你好</q-tooltip>
          <q-popup-proxy>
            <q-list dense
                    bordered
                    padding
                    class="rounded-borders">
              <q-item clickable
                      v-ripple>
                <q-item-section>
                  Item
                </q-item-section>
              </q-item>

              <q-item clickable
                      v-ripple>
                <q-item-section>
                  Item
                </q-item-section>
              </q-item>

              <q-item clickable
                      v-ripple>
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
export default {
  inject: ['provideToggleDrawer'],

  data() {
    return {
      contacts: [
        {
          id: 1,
          name: 'Ruddy Jedrzej',
          email: 'rjedrzej0@discuz.net',
          letter: 'R'
        },
        {
          id: 2,
          name: 'Mallorie Alessandrini',
          email: 'malessandrini1@marketwatch.com',
          letter: 'M'
        },
        {
          id: 3,
          name: 'Elisabetta Wicklen',
          email: 'ewicklen2@microsoft.com',
          letter: 'E'
        },
        {
          id: 4,
          name: 'Seka Fawdrey',
          email: 'sfawdrey3@wired.com',
          letter: 'S'
        }
      ]
    }
  },

  computed: {
    toggleDrawer() {
      return this.provideToggleDrawer
    }
  }
}
</script>

<style>
</style>