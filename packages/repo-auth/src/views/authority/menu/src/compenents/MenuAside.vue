<template>

  <div>
    <!-- <el-menu v-bind:default-active="defaultActive">
      <template v-for="(item,index) in list">

        <el-submenu v-bind:index="item.id.toString()"
                    v-if="item.sysProducts && item.sysProducts.length>0"
                    v-bind:key="'sub'+index">
          <template slot="title">
            <span>{{item.clientName}}</span>
          </template>
          <el-menu-item v-for="(produce) in item.sysProducts"
                        v-bind:key="produce.productId"
                        v-on:click="setInfo(produce)"
                        v-bind:index="produce.productId.toString()">{{ produce.productName }}</el-menu-item>
        </el-submenu>
        <el-menu-item v-on:click="setInfo(item)"
                      v-else
                      v-bind:key="index"
                      v-bind:index="item.id.toString()">{{ item.clientName }}</el-menu-item>
      </template>
    </el-menu> -->

    <el-tree :data="tree"
             ref="vuetree"
             highlight-current
             node-key="sortId"
             @node-click="setInfo"></el-tree>
  </div>
</template>

<script>
import Service from '../service'
export default {
  name: 'MenuAside',

  data() {
    return {
      list: [],
      tree: [],
      defaultActiveId: ''
    }
  },

  computed: {
    defaultActive() {
      return this.list[0]?.id.toString() ?? ''
    }
  },

  created() {
    this.getList()
  },

  methods: {
    setInfo(data) {
      const params = {}
      params.clientId = data.clientId
      params.productId = data.productId || ''

      if (params.sysProducts && params.sysProducts.length > 0) {
        params.productId = params.sysProducts[0].productId
      }

      this.$store.commit('info/setMenuInfo', params)
    },

    listAdpater(data) {
      data.forEach((item, index) => {
        item.label = item.clientName
        item.children = item.sysProducts
        item.sortId = index.toString()
        item?.sysProducts.forEach((item, subIndex) => {
          item.label = item.productName
          item.sortId = index + '-' + subIndex
        })
      })

      return data
    },

    getList() {
      const params = { isChild: true }
      Service.client()
        .getList(params)
        .then((res) => {
          this.list = res.data

          this.tree = this.listAdpater(res.data)

          if (this.tree.length > 0) {
            const info = this.tree[0]
            if (info.sysProducts && info.sysProducts.length > 0) {
              info.productId = info.sysProducts[0].productId
            }
            this.setInfo(info)
          }

          this.$nextTick(() => {
            if (this.tree[0]?.sysProducts.length > 0) {
              this.$refs['vuetree'].setCurrentKey('0-0')
            } else {
              this.$refs['vuetree'].setCurrentKey('0')
            }
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tree {
  border-right: 1px solid #e6e6e6;
  height: 100%;
}
::v-deep .el-tree-node {
  &:focus {
    > .el-tree-node__content {
      background-color: var(--q-color-primary-light-1) !important;
      position: relative;
    }
  }
}
::v-deep .el-tree-node__content {
  padding-top: 10px;
  padding-bottom: 10px;
  height: initial;
  &:hover {
    background: var(--q-color-primary-light-1);
  }
}

::v-deep .el-menu-item {
  &.is-active {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--q-color-primary);
      left: 6px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>