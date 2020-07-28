<template>
  <div class="column full-width full-height">
    <div class="row col-2">
      <div class="col header">订单来源</div>
      <div class="col header">接单机构</div>
      <div class="col header">订单金额（元）</div>
      <div class="col header">下单时间</div>
    </div>
    <vue-seamless-scroll :data="orderList"
                         class="seamless-warp col"
                         :class-option="classOption">
      <div class="full-width column col">
        <div class="row col"
             v-for="(item,index) in orderList"
             :key="index">
          <div class="col">{{item.source}}</div>
          <div class="col">{{item.acpectOrg}}</div>
          <div class="col">{{item.price}}</div>
          <div class="col">{{item.createTime}}</div>
        </div>
      </div>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  components: {
    vueSeamlessScroll
  },
  data() {
    return {
      orderList: [
        { source: '微医黄冈', acpectOrg: '九州通湖北仓', price: '59.4', createTime: '2020-07-05' },
        { source: '微医黄冈', acpectOrg: '九州通湖北仓', price: '59.5', createTime: '2020-07-05' },
        { source: '微医黄冈', acpectOrg: '九州通湖北仓', price: '59.6', createTime: '2020-07-05' },
        { source: '微医黄冈', acpectOrg: '九州通湖北仓', price: '59.7', createTime: '2020-07-05' },
        { source: '微医黄冈', acpectOrg: '九州通湖北仓', price: '59.8', createTime: '2020-07-05' },
        { source: '微医黄冈', acpectOrg: '九州通湖北仓', price: '59.4', createTime: '2020-07-05' },
        { source: '微医黄冈', acpectOrg: '九州通湖北仓', price: '59.5', createTime: '2020-07-05' },
        { source: '微医黄冈', acpectOrg: '九州通湖北仓', price: '59.6', createTime: '2020-07-05' },
        { source: '微医黄冈', acpectOrg: '九州通湖北仓', price: '59.7', createTime: '2020-07-05' },
        { source: '微医黄冈', acpectOrg: '九州通湖北仓', price: '59.8', createTime: '2020-07-05' }
      ]
    }
  },
  computed: {
    classOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.seamless-warp {
  width: 100%;
  // height: calc(100% - 16px);
  overflow: hidden;
}
.col {
  text-align: center;
  color: #fff;
  &.header {
    color: #02d9fd;
  }
}
</style>