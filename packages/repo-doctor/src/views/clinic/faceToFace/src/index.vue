<template>
  <div class="inquiry flex">
    <!-- 在线咨询会话列表 -->
    <SessionList class="session-list"></SessionList>

    <!-- 在线咨询会话详情 -->
    <SessionDetail class="session-detail"></SessionDetail>

    <!-- 在线咨询患者详情 -->
    <SessionExtend class="session-extend"></SessionExtend>
  </div>
</template>

<script>
import SessionList from './components/SessionList'
import SessionDetail from './components/SessionDetail'
import SessionExtend from './components/SessionExtend'

export default {
  components: {
    SessionList,
    SessionDetail,
    SessionExtend
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

  .session-extend {
    width: 230px;
    min-width: 230px;
    max-width: 230px;

    border-right: 1px solid #efefef;
    border-left: none;
  }
}
</style>