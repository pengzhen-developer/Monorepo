<template>
  <li v-bind:class="{leftstyle: isLeft, 'el-timeline-item': true}">
    <div class="el-timeline-item__tail"></div>

    <div v-if="!$slots.dot"
         class="el-timeline-item__node"
         :class="[
        `el-timeline-item__node--${size || ''}`,
        `el-timeline-item__node--${type || ''}`
      ]"
         :style="{
        backgroundColor: color
      }">
      <i v-if="icon"
         class="el-timeline-item__icon"
         :class="icon"></i>
    </div>
    <div v-if="$slots.dot"
         class="el-timeline-item__dot">
      <slot name="dot"></slot>
    </div>

    <div class="el-timeline-item__wrapper">
      <div v-if="!hideTimestamp && placement === 'top'"
           class="el-timeline-item__timestamp is-top">
        {{timestamp}}
      </div>

      <div v-if="!hideTimestamp && placement === 'left'"
           class="el-timeline-item__timestamp is-left">
        {{timestamp}}<br />
        <span class="el-timeline-item-timestamp_span">{{timestampSpan}}</span>
      </div>

      <div class="el-timeline-item__content">
        <slot></slot>
      </div>

      <div v-if="!hideTimestamp && placement === 'bottom'"
           class="el-timeline-item__timestamp is-bottom">
        {{timestamp}}
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'UserDefinedTimelineItem',

  inject: ['timeline'],

  props: {
    timestamp: String,
    timestampSpan: String,

    hideTimestamp: {
      type: Boolean,
      default: false
    },

    placement: {
      type: String,
      default: 'bottom'
    },

    type: String,

    color: String,

    size: {
      type: String,
      default: 'normal'
    },

    icon: String
  },
  computed: {
    isLeft() {
      return this.placement === 'left'
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep.el-timeline-item__wrapper {
  margin-top: -12px;
}
.leftstyle {
  left: 80px;
  width: calc(100% - 80px);
}

.el-timeline-item__node--normal {
  left: 1px;
  width: 8px;
  height: 8px;
  position: relative;
  z-index: 1;
}
.el-timeline-item__node--normal::before {
  content: '';
  width: 12px;
  height: 12px;
  background: rgba(48, 153, 166, 0.15);
  position: absolute;
  left: -2px;
  top: -2px;
  border-radius: 50%;
  z-index: 0;
}
.el-timeline-item__timestamp.is-left {
  text-align: right;
  position: absolute;
  padding-top: 4px;
  left: -98px;
  font-size: 14px;
  color: #333333;
}

.el-timeline-item-timestamp_span {
  font-size: 12px;
  font-weight: 400;
  color: rgba(51, 51, 51, 0.4);
  line-height: 18px;
}
</style>