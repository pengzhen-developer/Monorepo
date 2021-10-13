<template>
  <div class="row col info-item">
    <span :class="{ active: isDiff,  'label': true }">{{label}}</span>
    <span class="value">{{value}}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default() {
        return ''
      }
    },
    value: {
      default() {
        return ''
      }
    },
    preValue: {
      default() {
        return ''
      }
    }
  },
  computed: {
    isDiff() {
      if (Peace.validate.isEmpty(this.preValue)) {
        return false
      } else {
        return this.value !== this.preValue
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.info-item {
  flex-wrap: nowrap;  //强制标题不换行
}

.label {
  font-size: 14px;
  color: #333333;
  line-height: 22px;
  white-space: nowrap;
  &::after {
    content: '：';
  }
}

.active {
  color: #ff3a30;
}

.value {
  font-size: 14px;
  color: #666666;
  line-height: 22px;
}
</style>
