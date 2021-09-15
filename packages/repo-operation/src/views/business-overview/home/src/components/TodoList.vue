<template>
  <div class="card-style q-pa-md">
    <div class="card-title">待办事项</div>
    <div class="list-container">
      <p class="text-style cursor-pointer"
         v-for="(item,index) in dataList"
         v-bind:key="index"
         v-on:click='startDosomething(item.menuRoutes)'>
        【{{ item.description }}】<span class="text-red">{{item.count}}</span>条数据待处理
      </p>
      <p class="text-style"
         v-if="!dataList.length">
        暂无待办事项
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo-list',
  data() {
    return {
      dataList: []
    }
  },

  props: {
    data: {
      type: Array
    }
  },

  watch: {
    data: {
      handler(val) {
        this.dataList = val
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async startDosomething(routes) {
      const menus = await Peace.identity.auth.getAccountMenu()
      const menuId = routes.find((route) => route.routeType == 1)?.menuId
      const menuRoute = menus.find((item) => item.id == menuId)?.menuRoute

      if (menuRoute) {
        this.$router.push(menuRoute)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-style {
  height: 196px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 4px 0px rgba(224, 224, 224, 1);
  border-radius: 4px;

  .card-title:before {
    content: '';
    display: inline-block;
    position: relative;
    top: 3px;
    margin-right: 10px;
    width: 4px;
    height: 16px;
    background: rgba(48, 153, 166, 1);
    border-radius: 2px;
  }

  .list-container {
    margin: 10px 0;
    .text-style {
      font-size: 14px;
      color: var(--q-color-grey-999) !important;
    }
    .text-red {
      color: #ff344d;
    }
  }
}
</style>
