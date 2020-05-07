<template>
  <div>
    <div class="time-line q-mb-sm">{{ item.followTime }}</div>
    <div class="q-pa-sm q-mb-md rounded-borders no-wrap" style="background: #F9F9F9">
      <div class="col-9 text-justify" style="color: #333333">
        {{ item.chatContent }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FollowRecordListCell',
  props: {
    item: {
      type: Object,
      require: true,
      default: function() {
        return {
          id: '',
          followNo: '',
          chatContent: '',
          followTime: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.time-line {
  color: rgba(153, 153, 153, 1);
  &:before {
    display: inline-block;
    content: '';
    width: 5px;
    height: 5px;
    background: $--color-primary;
    border-radius: 50%;
    margin: 0 8px 0 0;
    vertical-align: middle;
  }
}
</style>
