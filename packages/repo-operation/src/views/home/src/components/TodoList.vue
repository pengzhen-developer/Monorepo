<template>
  <div class="card-style q-pa-md">
    <div class="card-title">待办事项</div>
    <div class="list-container">
      <p class="text-style cursor-pointer"
         v-for="(item,index) in dataList"
         v-bind:key="index">
        {{ item }}
      </p>
      <p class="text-style"
         v-if="!dataList.length">
        暂无待办事项
      </p>
    </div>
  </div>
</template>

<script>
import Service from '../service'

export default {
  name: 'todo-list',
  data() {
    return {
      dataList: []
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      Service.getSchedule()
        .then((res) => {
          this.dataList = res.data
        })
        .finally(() => {})
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

    ::before {
      content: '●';
    }

    .text-style {
      font-size: 14px;
      color: var(--q-color-grey-999) !important;
    }
  }
}
</style>
