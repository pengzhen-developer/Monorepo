<template>
  <div class="app">
    <div class="header">
      <div class="header-left">
        <span class="header-left-title">
          <i class="el-icon-rank"></i>爱加医互联网医院
        </span>
      </div>
      <div class="header-right">Message</div>
    </div>
    <div class="body">
      <div class="body-left">
        <el-menu
          :collapse="true"
          :default-active="defaultActive"
          @select="menuSelect"
          class="body-left-menu"
        >
          <template v-for="menu in menuList">
            <el-submenu
              :index="menu.path"
              :key="menu.path"
              v-if="menu.children && menu.children.length > 0"
            >
              <template slot="title">
                <div class="test">
                  <i :class="menu.icon"></i>
                  <label>{{ menu.name }}</label>
                </div>
              </template>

              <el-menu-item
                :index="menuChildren.path"
                :key="menuChildren.path"
                v-for="menuChildren in menu.children"
              >{{ menuChildren.name }}</el-menu-item>
            </el-submenu>

            <el-menu-item :closable="menu.closable" :index="menu.path" :key="menu.path" v-else>
              <div class="test">
                <i :class="menu.icon"></i>
                <label>{{ menu.name }}</label>
              </div>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="body-right">
        <div class="body-right-tabs">
          <el-tabs @tab-click="tabClick" v-model="layout.selectTab">
            <el-tab-pane
              :closable="tab.closable"
              :key="tab.name"
              :label="tab.name"
              :name="tab.path"
              v-for="tab in layout.tabList"
            ></el-tab-pane>
          </el-tabs>
        </div>
        <div class="body-right-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

const menuList = [
  { closable: false, name: '首页', path: '/home', icon: 'el-icon-location-outline' },
  { closable: true, name: '诊室', path: '/1', icon: '' },
  {
    closable: true,
    name: '问诊',
    path: '',
    icon: '',
    children: [
      { closable: false, name: '问诊1', path: '/问诊1', icon: 'el-icon-location-outline' },
      { closable: false, name: '问诊2', path: '/问诊2', icon: 'el-icon-location-outline' }
    ]
  },
  { closable: true, name: '我的', path: '/about', icon: '' },
  { closable: true, name: '帮助', path: '/help', icon: '' }
]

export default {
  data() {
    return {
      menuList,
      defaultActive: '/home'
    }
  },

  watch: {
    '$route.path': {
      handler(val) {
        const path = val === '/' ? '/home' : val

        this.menuSelect(path)
      },
      immediate: true
    }
  },

  computed: {
    ...mapState(['layout'])
  },

  created() {
    const path = '/home'

    const menu = this.menuList.find(item => item.path === path)

    this.unshiftTab(menu)
    this.selectTab(menu.path)

    this.$router.push(path)
  },

  methods: {
    ...mapActions('layout', ['selectTab', 'pushTab', 'unshiftTab', 'removeTab', 'clearTab']),

    menuSelect(path) {
      const menu = this.menuList.find(item => item.path === path)

      this.pushTab(menu)
      this.selectTab(menu.path)

      this.$router.push(path)
    },

    tabClick(tab) {
      this.defaultActive = tab.name

      this.selectTab(tab.name)

      this.$router.push(tab.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  min-width: 1200px;
  width: 100%;
  height: 100%;

  overflow: hidden;

  .header {
    padding: 0 12px;
    height: 56px;
    background: rgba(0, 198, 174, 1);

    display: flex;
    align-items: center;

    .header-left {
      width: 240px;

      .header-left-title {
        font-size: 22px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 30px;

        i {
          margin-right: 16px;
        }
      }
    }

    .header-right {
      text-align: right;
      flex: 1;
    }
  }

  .body {
    display: flex;

    .body-left {
      height: calc(100vh - 56px);
      width: 63px;
      background: #fff;
      box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.1);

      display: flex;

      .body-left-menu {
        border-left: none;
      }
    }

    .body-right {
      flex: 1;

      .body-right-tabs {
        height: 40px;
        background: rgba(255, 255, 255, 1);

        /deep/ .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2),
        /deep/ .el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
        /deep/ .el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
        /deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2),
        /deep/ .el-tabs--bottom .el-tabs__item.is-bottom:last-child,
        /deep/ .el-tabs--bottom .el-tabs__item.is-top:last-child,
        /deep/ .el-tabs--top .el-tabs__item.is-bottom:last-child,
        /deep/ .el-tabs--top .el-tabs__item.is-top:last-child {
          padding: 0 20px;
        }

        /deep/ .el-tabs__nav-wrap::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          background-color: #efefef;
          z-index: 1;
        }

        /deep/ .el-tabs__active-bar {
          display: none;
        }

        /deep/ .el-tabs__item::after {
          content: '';
          position: absolute;
          right: 0;
          top: 9px;
          bottom: 0;
          width: 1px;
          height: 23px;
          background-color: #efefef;
          z-index: 1;
        }
      }
    }

    .el-menu-item {
      height: 72px;
      line-height: 72px;

      .test {
        line-height: 72px;
        height: 72px;

        height: 100%;
        width: 100%;

        display: flex;
        justify-content: center;
        flex-flow: column;

        i {
          font-size: 24px;
          margin-bottom: 4px;
        }
        label {
          line-height: 24px;
        }
      }
    }
  }
}
</style>
