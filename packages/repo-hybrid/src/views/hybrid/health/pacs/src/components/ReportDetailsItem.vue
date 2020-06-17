<template>
  <q-item class="row flex justify-between items-center">
    <div class="col-3">{{item.key}}</div>
    <div class="text-justify text-grey-7 row-value">{{item.value}}</div>
  </q-item>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          key: '',
          value: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .q-item {
  min-height: auto;
}
.row-value {
  word-break: break-all;
}
</style>