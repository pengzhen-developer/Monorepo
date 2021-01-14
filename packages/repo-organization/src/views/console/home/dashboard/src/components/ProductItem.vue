<template>
  <div class="product-item">
    <div class="header"
         :class="{bg1: serviceType == 1, bg2: serviceType == 2, bg3: serviceType == 3, bg4: serviceType == 4}">
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

    serviceType: {
      type: Number
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
  min-height: 144px;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 48px 0;
    background: var(--q-color-primary);
    &.bg1 {
      background: linear-gradient(90deg, #65e5b8 0%, #1dccb6 100%);
    }
    &.bg2 {
      background: linear-gradient(90deg, #f2c94e 0%, #f6b570 100%);
    }
    &.bg3 {
      background: linear-gradient(90deg, #a399f8 0%, #737ef7 100%);
    }
    &.bg4 {
      background: linear-gradient(90deg, #fba189 0%, #ff7d7f 100%);
    }

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