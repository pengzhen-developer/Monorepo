<template>
  <div class="product-item">
    <div class="header">
      <el-image v-bind:src="img"></el-image>
    </div>
    <div class="footer">
      <span>{{ serviceName }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    serviceName: {
      type: String,
      required: true
    },

    img: {
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

    padding: 24px 0;
    background: var(--q-color-primary);

    .el-image {
      width: 60px;
      height: 40px;
      border-radius: 5px;
    }
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