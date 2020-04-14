<template>
  <div class="product-item">
    <div class="header">
      <el-image v-bind:src="icon"></el-image>
    </div>
    <div class="footer">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.product-item {
  background: #fff;
  margin: 0 0 16px 0;
  border-radius: 4px;
  overflow: hidden;
  min-height: 138px;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 48px 100px;
    background: $--color-primary;
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;

    padding: 12px 0;
  }
}
</style>