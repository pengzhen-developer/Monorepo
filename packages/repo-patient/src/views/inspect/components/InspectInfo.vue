<template>
  <div class="family">
    <div class="module-item-content">
      <div class="module-item-label auto">开立时间：</div>
      <div class="module-item-value">{{time | formatDate}}</div>
    </div>
    <div class="module-item-content">
      <div class="module-item-label auto">执行科室：</div>
      <div class="module-item-value">{{department }}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'InspectInfo',
  props: {
    department: {
      type: String,
      default() {
        return ''
      }
    },
    time: {
      type: [Number, String],
      default() {
        return ''
      }
    }
  },
  filters: {
    formatDate: (timestamp) => {
      return new Date(timestamp * 1000).toDate().formatDate('yyyy-MM-dd HH:mm:ss')
    }
  }
}
</script>
<style lang="scss" scoped>
.module-item-content {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 24px;
  justify-content: flex-start;
  &.size-14 {
    font-size: 14px;
    line-height: 20px;
  }
  &.message {
    justify-content: space-between;
  }
  &.start {
    align-items: flex-start;
    .module-item-value {
      word-break: break-all;
    }
  }
  &.img {
    display: block;
  }
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  &:last-child {
    border-bottom: 0;
  }
  .module-item-label {
    color: rgba(51, 51, 51, 0.6);
    min-width: 5.5em;
    &.auto {
      min-width: auto;
    }
  }
  .module-item-value {
    color: #333333;
    &.img {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 5px 0;
      .img {
        width: 60px;
        height: 60px;
        margin: 5px 8px 5px 0;
        &:nth-child(5n) {
          margin-right: 0 !important;
        }
        img {
          width: 60px;
          height: 60px;
          display: block;
          border-radius: 2px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
