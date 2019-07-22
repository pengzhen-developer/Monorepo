<template>
  <div class="no-data">
    <img src="~@src/assets/images/inquiry/ic_no one.png" />
    <span>暂无记录</span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.no-data {
  height: 100%;
  min-height: 500px;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  span {
    margin: 20px 0 0 0;
    color: rgba(155, 155, 155, 1);
  }
}
</style>
