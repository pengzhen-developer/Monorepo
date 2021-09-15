<template>
  <div class="column">

    <SessionForHeader></SessionForHeader>

    <!-- 根据会话状态显示 -->
    <Component class="col"
               ref="componentInstanceMap"
               v-bind:is="componentInstance"></Component>
  </div>
</template>

<script>
import type from '@src/type'

import SessionForHeader from './SessionForHeader'

// dynamic load
import SessionForReceive from './SessionForReceive'
import SessionForMessage from './SessionForMessage'

const componentInstanceMap = {
  [type.INQUIRY.INQUIRY_STATUS.待接诊]: SessionForReceive,
  [type.INQUIRY.INQUIRY_STATUS.问诊中]: SessionForMessage
}

export default {
  provide() {
    return {
      provideControl: this.control
    }
  },

  components: {
    SessionForHeader
  },

  computed: {
    componentInstance() {
      const inquiryStatus = this.$store.state?.inquiry?.session?.content?.inquiryInfo?.inquiryStatus

      return componentInstanceMap[inquiryStatus]
    }
  },

  methods: {
    control(type) {
      this.$refs.componentInstanceMap.control(type)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #efefef;
}
</style>