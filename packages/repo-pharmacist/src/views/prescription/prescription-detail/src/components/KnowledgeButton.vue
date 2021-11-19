<template>

  <div class="full-height full-width"
       v-loading="loading">
    <iframe ref="iframe"
            class="iframe-style full-width"
            v-bind:src="url"></iframe>
  </div>

</template>

<script>
export default {
  name: 'KnowledgeButton',
  props: {
    drugCscCode: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      loading: true
    }
  },

  mounted() {
    const { iframe } = this.$refs
    // IE和非IE浏览器，监听iframe加载事件不一样，需要兼容
    const that = this
    if (iframe.attachEvent) {
      // IE
      iframe.attachEvent('onload', () => {
        that.stateChange()
      })
    } else {
      // 非IE
      iframe.onload = function() {
        that.stateChange()
      }
    }
  },
  methods: {
    stateChange() {
      this.loading = false
    }
  },
  computed: {
    url() {
      return process.env.VUE_APP_SITE_AUDITENGINE + 'knowledgebaseweb/page/knowledgeBaseApply/knowledgeBase.html?platformDrugCode=' + this.drugCscCode
    }
  }
}
</script>

<style lang="scss" scoped>
.iframe-style {
  height: 530px;
  border: none;
  body {
    overflow-x: hidden;
  }
}
</style>
