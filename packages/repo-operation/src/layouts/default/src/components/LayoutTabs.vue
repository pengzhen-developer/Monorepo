<template>
  <div class="flex items-center full-width bg-white">
    <el-tabs class="layout-tabs"
             v-model="active"
             v-on:tab-click="tabClick"
             v-on:tab-remove="tabRemove">
      <el-tab-pane v-for="tab in tabs"
                   v-bind:key="tab.id.toString()"
                   v-bind:name="tab.id.toString()"
                   v-bind:label="tab.menuName"
                   v-bind:closable="tabs.length > 1 && !!tab.closable">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/*eslint no-prototype-builtins: "off"*/

export default {
  data() {
    return {
      active: null
    }
  },

  computed: {
    tabs: {
      get() {
        return this.$store.state.tabs.tabs
      },
      set(value) {
        this.$store.commit('tabs/setTabs', value)
      }
    },

    activeTab() {
      return this.$store.state.tabs.activeTab
    }
  },

  watch: {
    tabs() {
      // tab 有改变，缓存
      Peace.cache.sessionStorage.set('tabs', this.tabs)
    },

    activeTab() {
      // 选中 tab
      this.active = this.activeTab.id.toString()

      // 更改 route
      this.changeRoute(this.activeTab)
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      // 页面被刷新？ 恢复 tabs
      this.tabs = Peace.cache.sessionStorage.get('tabs') ?? []
    })
  },

  methods: {
    changeRoute(tab) {
      const routePath = tab.menuRoute
      const realPath = tab.menuPath

      if (this.$route.path !== routePath) {
        this.$router.push(routePath).then((route) => {
          /** 动态修改 route meta */
          for (const key in route.meta) {
            if (route.meta.hasOwnProperty(key)) {
              route.meta[key] = tab[key]
            }
          }
        })
      }

      // Fixed iFrame parameter lost
      if (Peace.validate.isUrl(realPath)) {
        this.$router.push({ path: routePath, query: { t: Date.now() } }).then((route) => {
          /** 动态修改 route meta */
          for (const key in route.meta) {
            if (route.meta.hasOwnProperty(key)) {
              route.meta[key] = tab[key]
            }
          }
        })
      }
    },

    tabClick(tab) {
      if (tab.name.toString() === this.activeTab.id.toString()) {
        // 重复点击
        return
      }

      const tabs = this.$store.state.tabs.tabs
      const currentTab = tabs.find((menu) => menu.id === tab.name)

      this.$store.commit('tabs/selectTab', currentTab)
    },

    tabRemove(name) {
      const tabs = this.$store.state.tabs.tabs
      const currentTab = tabs.find((menu) => menu.id === name)

      this.$store.commit('tabs/removeTab', currentTab)

      // 选中最后 tab
      if (this.tabs.length > 0) {
        const lastTab = tabs.find((menu) => menu.id === this.tabs[this.tabs.length - 1].id)
        this.$store.commit('tabs/selectTab', lastTab)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-tabs {
  height: 40px;
  width: 100%;

  ::v-deep .el-tabs__header {
    margin: 0;

    .el-tabs__item {
      font-size: 14px;
      padding: 0 20px !important;

      .el-icon-close {
        font-size: 10px;
        color: #d1d1d1;
        position: relative;
        top: -4px;
        left: 4px;
      }
    }

    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      line-height: 40px;
    }

    .el-tabs__active-bar {
      display: none;
    }

    .el-tabs__item::after {
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

    .el-tabs__nav-wrap::after {
      height: 1px;
    }
  }
}
</style>





<template>
  <div>
    <el-input-number v-model="num"
                     v-bind:min="1"
                     v-bind:max="9999"
                     v-on:blur="blurNum"
                     placeholder=""></el-input-number>

    {{ num }}

    <PeaceTable v-bind:data="data"
                v-on:cell-click="cellClick">
      <PeaceTableColumn property="药品名称">
        <template slot="header">
          <span class="text-red">药品名称</span>
        </template>
        <template slot-scope="scope">
          <el-input v-if="scope.row.编辑状态 === '药品名称'"
                    v-model="scope.row.药品名称"
                    v-on:blur="blur(scope.row)"
                    v-on:enter="enter( scope.row)"></el-input>
          <span v-else>{{ scope.row.药品名称 }}</span>
        </template>
      </PeaceTableColumn>
      <PeaceTableColumn label="规格"
                        prop="规格"></PeaceTableColumn>
      <PeaceTableColumn>
        <template slot="header">
          <span class="text-red">剂量</span>
        </template>
        <template slot-scope="scope">
          <el-input v-model="scope.row.剂量"></el-input>
        </template>
      </PeaceTableColumn>
      <PeaceTableColumn>
        <template slot="header">
          <span class="text-red">频次</span>
        </template>
      </PeaceTableColumn>
      <PeaceTableColumn>
        <template slot="header">
          <span class="text-red">天数</span>
        </template>
      </PeaceTableColumn>
      <PeaceTableColumn>
        <template slot="header">
          <span class="text-red">总量</span>
        </template>
      </PeaceTableColumn>
      <PeaceTableColumn label="单位"></PeaceTableColumn>
    </PeaceTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,

      data: [
        {
          药品名称: '123123',
          规格: '',
          剂量: '',
          频次: '',
          天数: '',
          总量: '',
          单位: '',
          编辑状态: ''
        }
      ]
    }
  },

  methods: {
    blurNum() {
      this.num = parseFloat(Peace.numeral(this.num).format('0.000'))
    },

    cellClick(row, column) {
      row.编辑状态 = column.property
    },

    enter(row) {
      row.编辑状态 = ''
    },

    blur(row, e) {
      row.编辑状态 = ''

      console.log(e)
    }
  }
}
</script>

<style>
</style>