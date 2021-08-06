<template>

  <div class="rule-item-style full-width">
    <div class="rule-item-header">
      <div v-html="title"></div>
      <el-button primary type="text" v-on:click="addRule" v-if="isEditing">添加</el-button>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {

  props: {
    name: {
      required: true,
      type: String,
    },
    isEditing: {
      required: false,
      type: Boolean,
      default: true
    }
  },

  computed: {
    title() {
      if (this.name === "提前拿药") {
        return `<span style="font-size: 16px; font-weight: 500;">${this.name}</span><span style="font-size: 16px; font-weight: 400; color: #999999">（系统默认历史用药疗程未结束继续开方即重复用药，可提前拿药需设置）</span>`
      } else {
        return `<span style="font-size: 16px; font-weight: 500;">${this.name}</span>`
      }
    }
  },

  methods: {
    addRule() {
      this.$emit('addRule')
    }
  }
}
</script>

<style lang="scss" scoped>


.rule-item-style {
  display: flex;
  flex-direction: column;
  border: 1px solid #EAEAEA;

  .rule-item-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 16px;

    .rule-item-title {
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
