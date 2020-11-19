<template>
  <div class="inquiry flex">

    <!-- 面诊患者列表 -->
    <SessionList class="session-list"></SessionList>

    <!-- 患者处方详情 -->
    <SessionDetail class="session-detail"></SessionDetail>

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
  height: calc(100vh - 56px - 40px - 20px);
  padding: 0px !important;

  .session-list {
    width: 230px;
    min-width: 230px;
    max-width: 230px;

    border-left: 1px solid #efefef;
    border-right: 1px solid #efefef;
  }

  .session-detail {
    flex: 1;

    border-right: 1px solid #efefef;
    border-left: none;
  }
}
</style>