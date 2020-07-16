<template>
  <div class="steps">
    <div class="step-item"
         v-for="(item,index) in list"
         :key='index'>
      <img class="step-icon"
           :src="active<index?item.icon:active==index?item.icon_active:compliteIcon">
      <span class="step-title"
            :class="[active==index&&'active',active<index&&'before']">{{item.title}}</span>
      <span class="step-line"
            :class="[active>index&&'active',index==list.length-1&&'none']"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'steps',
  props: {
    /**
     * list->title标题
     * list->icon未选中的icon
     * list->icon_active选中的icon
     * list->compliteIcon已完成的icon
     */
    list: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true,
      default: 0
    },
    compliteIcon: {
      type: String,
      default: require('./image/step/ic_complete.png')
    }
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          this.list.map((item, index) => {
            /** index=0 的图片暂无 */
            let defaultIcon = ''
            if (index == 0) {
              defaultIcon = require(`./image/step/ic_${index + 1}_choose.png`)
            } else {
              defaultIcon = require(`./image/step/ic_${index + 1}.png`)
            }
            item.icon = item.icon || defaultIcon
            item.icon_active = item.icon_active || require(`./image/step/ic_${index + 1}_choose.png`)
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    increase() {
      this.$emit('increase')
    },
    decrease() {
      this.$emit('decrease')
    }
  }
}
</script>

<style lang="scss" scoped>
.steps {
  display: flex;
  align-items: center;
  // width: 100%;
  .step-item {
    display: flex;
    align-items: center;
    flex: 1;
    &:last-child {
      flex: none;
    }
    .step-icon {
      width: 32px;
      height: 32px;
      display: block;
      margin-right: 8px;
    }
    .step-title {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      &.active {
        color: #333;
        font-weight: 500;
      }
      &.before {
        color: #999;
      }
    }
    .step-line {
      margin: 0 16px;
      flex: 1;
      height: 1px;
      background-color: #ddd;
      &.none {
        width: 0;
        flex: none;
      }
      &.active {
        background-color: var(--q-color-primary);
      }
    }
  }
}
</style>