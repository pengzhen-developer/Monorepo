<template>
  <div>
    <div class="title" v-html="data.title"></div>
    <div class="content" v-html="data.content"></div>
  </div>
</template>
<script>
export default {
  name: 'PatientEducationPreview',
  props: {
    data: Object
  }
}
</script>
<style lang="scss" scoped>
.title,
.content {
  color: #333;
}
.title {
  font-size: 20px;
  margin-bottom: 10px;
}
.content /deep/ img {
  max-width: 100%;
  font-size: 14px;
}
</style>
