<template>
  <div v-loading="isLoading">
    <div class="content-item">

      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">配送服务</p>
      </div>
      <div class="item-content q-mt-20 q-pl-14 q-pt-10">
        <el-form space-none>
          <el-form-item label="是否收费：">
            <div class="item-child-item">
              <span class="icon-success"></span>
              <div class="item-text-grey"
                   v-if="operateData.Shipping === 1">否</div>
              <div class="item-text-grey"
                   v-else>是</div>
            </div>
          </el-form-item>

          <el-form-item label="收费方式："
                        v-if="operateData.Shipping !== 1">
            <div class="item-child-item">
              <span class="icon-success"></span>
              <div class="item-text-grey"
                   v-if="operateData.ChargeType === 0">在线支付</div>
              <div class="item-text-grey"
                   v-else>货到付款</div>
            </div>
          </el-form-item>

          <el-form-item label="费用计算方式："
                        v-if="operateData.Shipping !== 1">
            <div class="item-child-item">
              <span class="icon-success"></span>
              <div class="item-text-grey"
                   v-if="operateData.CalculationType === 0">
                固定配送费<span class="item-text-primary">{{operateData.FixedShippingFee}}</span>元
              </div>
              <div class="item-text-grey"
                   v-else-if="operateData.CalculationType === 1">
                满<span class="item-text-primary">{{operateData.ShippingFull}}</span>元免配送费，否则收配送费
                <span class="item-text-primary">{{operateData.ShippingFee}}</span>元
              </div>
              <div class="item-text-grey"
                   v-else>快递公司自行收取</div>
            </div>

          </el-form-item>
        </el-form>
      </div>

    </div>

    <div class="line"></div>

    <div class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">优惠活动</p>
      </div>
      <div class="item-content q-pl-14">
        <div v-if="operateData.Promotions === 0"
             class="item-child">
          <span class="icon-success"></span>
          <div class="item-text-grey">没有优惠活动</div>
        </div>
        <div v-if="operateData.Promotions === 1"
             class="item-child">
          <span class="icon-success"></span>
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
        <div class="item-child q-pl-14">
          <el-tag v-for="item in tagList"
                  :key="item"
                  :class="{'item-tag': true, 'item-tag-primary': operateData.Tags.includes(item)}"
                  :type="operateData.Tags.includes(item) ? '':'info'"
                  :effect="operateData.Tags.includes(item) ? 'light':'plain'">{{item}}</el-tag>
        </div>
      </div>
    </div>

    <div class="line"></div>

    <div class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">取药知情同意书</p>
      </div>
      <div class="q-mt-md q-pl-14"
           style="white-space:pre-wrap;"
           v-html="operateData.InformedConsent">

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
        CalculationType: '', //费用计算方式  0 固定配送费  1 满减   2 快递公司自取
        ChargeType: '', //收费方式  0 在线支付  1货到付款
        FixedShippingFee: '', //固定配送费
        Shipping: '', // 配送方式 是否收费  1 免费配送 2 收费
        ShippingFee: '', // 配送费
        ShippingFull: '', // 满多少元

        Promotions: '', // 优惠活动 0没有优惠活动  1满减活动
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
.icon-success {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--q-color-primary);
  position: relative;
  &::after {
    content: '';
    width: 4px;
    height: 4px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
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
.item-child-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5px;
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
  width: 88px;
  font-size: 14px;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  &:not(:last-child) {
    margin-right: 16px;
  }
}

.item-tag-primary {
  border: 1px solid #3099a6;
}
</style>