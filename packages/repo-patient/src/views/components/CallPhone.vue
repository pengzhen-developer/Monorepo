<template>
  <!-- 电话弹框 -->
  <van-popup v-model="show"
             @click-overlay="change"
             position="center"
             class="phone">
    <div class="tel--content">
      <div class="tel--item">客服电话</div>
      <div class="tel--item">{{phone}}</div>
    </div>
    <div class="tel-footer">
      <div class="tel--footer cancel"
           @click="change">取消</div>
      <div class="tel--footer call"><a :href="'tel:'+phone">拨打电话</a></div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'CallPhone',
  model: {
    prop: 'visible',
    event: 'input'
  },
  props: {
    visible: Boolean,
    phone: String
  },
  data() {
    return {
      show: false
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.show = val
      },
      immediate: true
    }
  },
  methods: {
    change() {
      this.show = false
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.phone {
  &.van-popup {
    width: 80%;
    padding: 0;
    .tel--content {
      padding: 25px 16px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .tel-footer {
      height: 50px;
      border-top: 1px solid #ddd;
      display: flex;
      width: 100%;
      .tel--footer {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        > a {
          color: $primary;
        }
        &:first-child {
          border-right: 1px solid #ddd;
          color: #999;
        }
      }
    }
  }
}
</style>