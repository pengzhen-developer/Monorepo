<template>
  <el-tree :data="list"
           :props="{ label: 'clientName'}"
           ref="tree"
           highlight-current
           node-key="treeId"
           @node-click="setInfo"></el-tree>
</template>

<script>
import Service from '../service'
export default {
  name: 'UserAside',
  data() {
    return {
      list: []
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
      this.$store.commit('info/setUserInfo', { clientId: data.clientId })
    },
    getList() {
      const params = { isChild: true }
      Service.client()
        .getList(params)
        .then((res) => {
          this.list = res.data
          if (this.list.length > 0) {
            this.setInfo(this.list[0])
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
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