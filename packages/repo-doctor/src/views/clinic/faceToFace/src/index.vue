<template>
  <div class="bg-white overflow-auto">
    <div class="q-pa-md full-height"
         style="min-width: 1300px; max-width: 1440px; margin: 0 auto; ">
      <div class="flex full-height inquiry bg-white"
           style="border: 1px solid #f4f4f4;">

        <!-- 面诊患者列表 -->
        <SessionList class="session-list"></SessionList>

        <!-- 患者处方详情 -->
        <SessionDetail class="session-detail full-height overflow-auto"></SessionDetail>
      </div>
    </div>
  </div>
</template>

<script>
import SessionList from './components/SessionList'
import SessionDetail from './components/SessionDetail'

import { dom } from 'quasar'

export default {
  components: {
    SessionList,
    SessionDetail
  },

  mounted() {
    this.$nextTick().then(() => {
      // dom.offset 是 quasar 提供的工具类
      // 自行了解相关 api 文档
      const offset = dom.offset(this?.$el)

      this.$el.style.height = `${document.body.clientHeight - offset?.top}px`
    })
  }
}
</script>

<style lang="scss" scoped>
.inquiry {
  padding: 0px !important;
  min-width: 1150px;
  .session-list {
    width: 230px;
    min-width: 230px;
    max-width: 230px;

    border-left: 1px solid #efefef;
    border-right: 1px solid #efefef;
  }

  .session-detail {
    flex: 1;
    min-width: 920px;
    border-right: 1px solid #efefef;
    border-left: none;
  }
}
</style>