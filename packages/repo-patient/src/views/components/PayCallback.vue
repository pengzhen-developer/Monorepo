
<template>
  <van-overlay :show="showModel"
               @click="changeFlag">
    <div class="content"
         v-if="money">
      <div><span>微信支付</span> <span>￥{{money}}</span></div>
      <van-button type="primary"
                  :loading="loading"
                  v-on:click.stop="changeFlag('click')">查看订单</van-button>
    </div>
  </van-overlay>
</template>

<script>
export default {
  name: 'PayCallback',
  model: {
    prop: 'showModel',
    event: 'changeShowModel'
  },
  props: {
    money: {
      type: String,
      default: ''
    },
    showModel: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    changeFlag(type = '') {
      if (type == 'click') {
        this.loading = true
      }
      setTimeout(() => {
        this.$emit('changeShowModel', false)
        this.$emit('H5PayCallback', false)
        this.loading = false
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  position: fixed;
  top: 50%;
  left: 13%;
  z-index: 1000;
  width: 74%;
  height: 200px;
  transform: translateY(-50%);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 12% 5%;
  border-radius: 10px;
  span {
    font-size: 18px;
    font-weight: 500;
  }
  span + span {
    margin-left: 5px;
  }
  .van-button {
    height: 30px;
    width: 8em;
    border-radius: 4px;
  }
}
</style>