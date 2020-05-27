<template>
  <div class="inquiry flex">
    <!-- 复诊续方会话列表 -->
    <SessionList class="session-list">

      <!-- 预约挂号 -->
      <Reservation slot="reservation"></Reservation>
    </SessionList>

    <!-- 复诊续方会话详情 -->
    <SessionDetail v-if="canShowDetail"
                   class="session-detail"></SessionDetail>

    <!-- 复诊续方患者详情 -->
    <SessionExtend v-if="canShowExtend"
                   class="session-extend"></SessionExtend>
  </div>
</template>

<script>
import SessionList from './components/SessionList'
import Reservation from './components/Reservation'
import SessionDetail from './components/SessionDetail'
import SessionExtend from './components/SessionExtend'

export default {
  components: {
    SessionList,
    Reservation,
    SessionDetail,
    SessionExtend
  },

  computed: {
    canShowDetail() {
      return !!this.$store.state.inquiry?.session?.id && this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryType === 'returnVisit'
    },

    canShowExtend() {
      return !!this.$store.state.inquiry?.session?.id && this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryType === 'returnVisit'
    }
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

    border: 1px solid #efefef;
  }

  .session-detail {
    flex: 1;

    border: 1px solid #efefef;
    border-left: none;
  }

  .session-extend {
    width: 230px;
    min-width: 230px;
    max-width: 230px;

    border: 1px solid #efefef;
    border-left: none;
  }
}
</style>