<template>
  <div>
    <h4>平台基础服务</h4>
    <div>
      <el-row v-bind:gutter="16">
        <el-col v-for="service in serviceList"
                v-bind:key="service.id"
                v-bind:span="12"
                v-bind:lg="6"
                v-bind:xl="4">
          <ServiceItem v-bind:title="service.title"
                       v-bind:state="service.state"
                       v-bind:stateType="service.stateType"
                       v-bind:controlState="service.controlState"
                       v-bind:controlStateType="service.controlStateType"
                       v-bind:features="service.features">
          </ServiceItem>
        </el-col>
      </el-row>
    </div>

    <h4>使用中的产品</h4>
    <div>
      <el-row v-bind:gutter="16">
        <el-col v-for="product in productList"
                v-bind:key="product.id"
                v-bind:span="12"
                v-bind:lg="6"
                v-bind:xl="4">
          <ProductItem v-bind:title="product.title"
                       v-bind:icon="product.icon">
          </ProductItem>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ServiceItem from './components/ServiceItem'
import ProductItem from './components/ProductItem'

export default {
  components: {
    ServiceItem,
    ProductItem
  },

  data() {
    return {
      serviceList: [
        {
          id: 1,
          title: '互联网云医院',
          state: '未开通',
          controlState: '待审核',
          features: ['健康咨询', '复诊续方', '预约挂号', '查询报告']
        },
        {
          id: 2,
          title: '处方管理事务',
          state: '未开通',
          controlState: '申请开通',
          features: ['智能审方', '药师审方', '处方流转', '处方点评']
        },
        {
          id: 3,
          title: '诊后病程管理',
          state: '已开通',
          controlState: '',
          features: ['药事服务', '诊后随访']
        },
        { id: 4, title: '多点云仓配送', state: '待开通', controlState: '申请开通' }
      ],

      productList: [
        {
          id: 1,
          title: '互联网医院管理端',
          icon: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        {
          id: 2,
          title: '处方管理医院端',
          icon: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
h4 {
  font-size: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin: 0 0 24px 0;
}
</style>