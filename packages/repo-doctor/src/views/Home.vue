<template>
  <div class="no-data">
    <img src="./../assets/images/not-status.png">
    <span>暂无信息</span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.no-data {
  display: flex;
  flex-flow: column;

  justify-content: center;
  align-items: center;

  img {
    display: block;
    width: 150px;
    height: 150px;
  }

  span {
    margin-top: 20px;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 20px;
  }
}
</style>

