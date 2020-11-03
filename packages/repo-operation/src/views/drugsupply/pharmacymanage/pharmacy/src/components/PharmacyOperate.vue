<template>
  <div v-loading="isLoading">
    <div v-if="operateData.Shipping !== 0"
         class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title ">配送服务</p>
      </div>
      <div class="item-content">
        <div v-if="operateData.Shipping === 1"
             class="item-child">
          <i class="el-icon-success"></i>
          <div class="item-text-grey">免费配送</div>
        </div>
        <div v-if="operateData.Shipping === 2"
             class="item-child">
          <i class="el-icon-success"></i>
          <div class="item-text-grey">收费配送，配送费<span class="item-text-primary">{{operateData.ShippingFee}}</span>元</div>
        </div>
        <div v-if="operateData.Shipping === 3"
             class="item-child">
          <i class="el-icon-success"></i>
          <div class="item-text-grey">满<span class="item-text-primary">{{operateData.ShippingFull}}</span>元免配送费，否则收配送费<span class="item-text-primary">{{operateData.ShippingFeeByFull}}</span>元</div>
        </div>
      </div>
    </div>

    <div class="line"></div>

    <div class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">优惠活动</p>
      </div>
      <div class="item-content">
        <div v-if="operateData.Promotions === 0"
             class="item-child">
          <i class="el-icon-success"></i>
          <div class="item-text-grey">没有优惠活动</div>
        </div>
        <div v-if="operateData.Promotions === 1"
             class="item-child">
          <i class="el-icon-success"></i>
          <div class="item-text-grey">满减活动，满<span class="item-text-primary">{{operateData.PromotionsFull}}</span>元减<span class="item-text-primary">{{operateData.PromotionsCut}}</span>元</div>
        </div>
      </div>
    </div>

    <div class="line"></div>

    <div class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">标签设置</p>
      </div>
      <div class="item-content">
        <div class="item-child">
          <el-tag v-for="item in tagList"
                  :key="item"
                  :class="{'item-tag': true, 'item-tag-primary': operateData.Tags.includes(item)}"
                  :type="operateData.Tags.includes(item) ? '':'info'"
                  :effect="operateData.Tags.includes(item) ? 'light':'plain'">{{item}}</el-tag>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Service from '../service'
export default {
  props: {
    data: {
      type: [String, Number]
    }
  },
  data() {
    return {
      operateData: {
        ID: 0,
        Shipping: '', // 配送方式 0没有方式 1 免费配送 2 收费  3 满xx元免费配送，收费xx元
        Promotions: '', // 优惠活动 0没有优惠活动  1满减活动
        ShippingFull: '', // 满多少元
        ShippingFee: '', // 配送费
        PromotionsFull: '', // 满多少元
        ShippingFeeByFull: '',
        PromotionsCut: '', // 优惠金额
        Tags: [] // 标签
      },
      tagList: ['政府监督', '正品保证', '到店医保', '到店有礼'],
      isLoading: false
    }
  },

  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.isLoading = true
      const params = { CustID: this.data }
      Service.getOperateDetail(params)
        .then((res) => {
          this.operateData = res.data
          this.operateData.Tags = res.data.Tags ? res.data.Tags.split(',') : []
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.content-item {
  display: flex;
  flex-direction: column;
  background: white;
}
.item-title {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.title-left {
  width: 4px;
  height: 16px;
  background: #3099a6;
  border-radius: 2px;
}
.title {
  color: var(--q-color-grey-333);
  margin-left: 10px;
  font-weight: 600;
  font-size: 16px;
}
.item-content {
  margin: 0px 14px 10px 0px;
  display: flex;
  flex-direction: column;
}
.item-child {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.line {
  width: 100%;
  margin: 10px 0 20px 0;
  height: 1px;
  background: #e9e9e9;
}
.el-icon-success {
  font-size: 16px;
  color: var(--q-color-primary);
}
.item-text-grey {
  margin: 0 16px;
  font-size: 14px;
  color: var(--q-color-grey-333);
}
.item-text-primary {
  margin: 0 10px;
  font-size: 14px;
  color: var(--q-color-primary);
}
.item-tag {
  height: 32px;
  margin-right: 10px;
  padding: 0 32px;
  font-size: 14px;
  line-height: 31px;
}

.item-tag-primary {
  border: 1px solid #3099a6;
}
</style>