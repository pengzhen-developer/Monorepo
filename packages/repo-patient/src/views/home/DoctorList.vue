<template>
  <div class="doctor-list">
    <div :key="item" class="doctor-list-item" v-for="item in 5">
      <div class="avatar">
        <img />
      </div>
      <div class="detail">2</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.doctor-list {
  .doctor-list-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #efefef;

    .avatar {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(241, 248, 255, 1);
        border: 1px solid rgba(221, 225, 234, 1);
      }
    }

    detail {
    }
  }
}
</style>

