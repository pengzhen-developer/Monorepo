<template>
  <div class="card-style q-pa-md">
    <div class="card-title">代办事项</div>
    <div class="list-container">
      <p class="text-style"
         v-for="item in list"
         v-bind:key="item.id">
        {{item.text}}
      </p>
      <p class="text-style"
         v-if="!list.length">
        暂无代办事项
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo-list',

  props: {
    list: {
      type: Array,
      default: function() {
        return [
          { id: 1, text: '【平台管理-资质认证】4条数据待审核' },
          { id: 2, text: '【平台管理-服务开通】4条数据待审核' },
          { id: 3, text: '【合理用药管理-药师审核】2条数据待审核' },
          { id: 4, text: '【药品供应管理-药房审核】1条数据待审核' }
        ]
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
