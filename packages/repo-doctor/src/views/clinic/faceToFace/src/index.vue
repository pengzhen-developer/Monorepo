<template>
  <div class="q-pa-md"
       style="min-width: 1300px; max-width: 1440px; margin: 0 auto; ">
    <div class="inquiry flex"
         style="border: 1px solid #f4f4f4;">

      <!-- 面诊患者列表 -->
      <SessionList class="session-list"></SessionList>

      <!-- 患者处方详情 -->
      <SessionDetail class="session-detail"></SessionDetail>
    </div>
  </div>
</template>

<script>
import SessionList from './components/SessionList'
import SessionDetail from './components/SessionDetail'

export default {
  components: {
    SessionList,
    SessionDetail
  }
}
</script>

<style lang="scss" scoped>
.inquiry {
  height: calc(100vh - 56px - 40px - 24px);
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