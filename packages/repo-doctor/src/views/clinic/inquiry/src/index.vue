<template>
  <div class="bg-white overflow-auto">
    <div class="q-pa-md full-height"
         style="min-width: 1440px; max-width: 1440px; margin: 0 auto; ">
      <div class="flex full-height inquiry bg-white"
           style="border: 1px solid #f4f4f4;">

        <!-- 在线咨询会话列表 -->
        <SessionList class="session-list">
        </SessionList>

        <!-- 在线咨询会话详情 -->
        <SessionDetail v-if="canShowDetail"
                       class="session-detail full-height overflow-auto"></SessionDetail>

        <!-- 在线咨询患者详情 -->
        <SessionExtend v-if="canShowExtend"
                       class="session-extend"></SessionExtend>
      </div>
    </div>
  </div>
</template>

<script>
import SessionList from './components/SessionList'
import SessionDetail from './components/SessionDetail'
import SessionExtend from './components/SessionExtend'

import { dom } from 'quasar'

export default {
  components: {
    SessionList,
    SessionDetail,
    SessionExtend
  },

  computed: {
    canShowDetail() {
      return (
        !!this.$store.state.inquiry?.session?.id &&
        (this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryType === 'image' ||
          this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryType === 'video')
      )
    },

    canShowExtend() {
      return (
        !!this.$store.state.inquiry?.session?.id &&
        (this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryType === 'image' ||
          this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryType === 'video')
      )
    }
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