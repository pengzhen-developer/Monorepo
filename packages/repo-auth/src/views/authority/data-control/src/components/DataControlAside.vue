<template>

  <div>
    <el-tree :data="tree"
             ref="tree"
             highlight-current
             node-key="treeId"
             @node-click="setInfo"></el-tree>
  </div>
</template>

<script>
import Service from '../service'

export default {
  name: 'DataControlAside',

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
      this.$store.commit('info/setMenuInfo', data)
    },

    listAdpater(data) {
      data.forEach((item) => {
        item.label = item.clientName
        item.children = item.sysProducts
        item.treeId = item.id + ''
        item?.sysProducts.forEach((subItem) => {
          subItem.label = subItem.productName
          subItem.treeId = item.id + '-' + subItem.productId
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
          this.setInfo(this.tree[0])
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.tree[0].treeId)
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