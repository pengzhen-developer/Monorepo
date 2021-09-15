<template>
  <div class="context-menu">
      <div class="context-menu__box full-height flex items-center justify-center">
        <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
    addRule() {
      this.$emit('addRule')
    },

    addRuleGroup() {
      this.$emit('addRuleGroup')
    }
  }
}
</script>

<style lang="scss" scoped>
.context-menu {
  border-radius: 4px;
  overflow: hidden;
}

.context-menu__box {
  width: 64px;
}

.el-dropdown {
  color: inherit;
}
</style>
