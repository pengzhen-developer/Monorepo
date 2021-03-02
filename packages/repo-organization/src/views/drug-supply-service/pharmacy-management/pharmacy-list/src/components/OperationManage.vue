<template>
  <div>
    <div class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">配送服务</p>
      </div>

      <el-form>
        <el-form-item label="是否收费："
                      :style="{'margin-bottom': model.Shipping == 1 ? '0px':''}">
          <el-radio-group v-model="model.Shipping"
                          @change="chargeChange">
            <el-radio v-bind:label=1>否</el-radio>
            <el-radio v-bind:label=2>是</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="收费方式："
                      v-if="model.Shipping===2">
          <el-radio-group v-model="model.ChargeType"
                          @change="chargeTypeChange">
            <el-radio v-bind:label=0>在线支付</el-radio>
            <el-radio v-bind:label=1>货到付款</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="费用计算方式："
                      class="discount"
                      style="margin-bottom: 0px;"
                      v-if="model.Shipping===2">
          <el-radio-group v-model="model.CalculationType">
            <el-radio v-bind:label=0>
              固定配送费 <el-input-number placeholder="请输入"
                               v-bind:min="0"
                               v-bind:max="99.99"
                               v-bind:precision="2"
                               v-bind:controls="false"
                               v-model="model.FixedShippingFee"></el-input-number>元
            </el-radio>
            <el-radio v-bind:label=1>
              满<el-input-number placeholder="请输入"
                               v-bind:min="0"
                               v-bind:max="99999"
                               v-bind:precision="2"
                               v-bind:controls="false"
                               v-model="model.ShippingFull"></el-input-number>元免配送费，否则收配送费
              <el-input-number placeholder="请输入"
                               v-bind:min="0"
                               v-bind:max="99.99"
                               v-bind:precision="2"
                               v-bind:controls="false"
                               v-model="model.ShippingFee"></el-input-number>元
            </el-radio>
            <el-radio v-bind:label=2
                      v-if="model.ChargeType === 1">快递公司自行收取</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

    </div>
    <div class="line"></div>
    <div class="content-item discount">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">优惠活动</p>
      </div>
      <el-radio-group v-model="model.Promotions">
        <el-radio v-bind:label=0>没有优惠活动</el-radio>
        <el-radio v-bind:label=1>
          满减活动，满<el-input-number placeholder="请输入"
                           :min="0"
                           v-bind:max="99999"
                           v-bind:precision="2"
                           v-bind:controls='false'
                           v-model="model.PromotionsFull"></el-input-number>元减
          <el-input-number placeholder="请输入"
                           :min="0"
                           v-bind:max="99.99"
                           v-bind:precision="2"
                           v-bind:controls='false'
                           v-model="model.PromotionsCut"></el-input-number>元
        </el-radio>
      </el-radio-group>
    </div>
    <div class="line"></div>
    <div class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">标签设置</p>
      </div>
      <el-checkbox-group v-model="model.Tags"
                         class="q-mb-12">
        <el-checkbox-button v-for="item in tagList"
                            :label="item"
                            :key="item">{{item}}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div class="line"></div>
    <div class="content-item q-mb-24">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">取药知情同意书</p>
      </div>
      <el-input type="textarea"
                style="width: 802px;"
                rows="7"
                maxlength="500"
                show-word-limit
                placeholder="请输入内容"
                v-model="model.InformedConsent">
      </el-input>
    </div>
    <el-button type="primary"
               v-on:click="save"
               v-bind:loading="isLoading">保存</el-button>
  </div>
</template>

<script>
import Service from '../service'

export default {
  props: {
    data: Number
  },
  data() {
    return {
      model: {
        ID: 0,
        Shipping: 1, //是否收费，1 免费配送 2 收费
        ChargeType: 0, //收费方式， 0 在线支付  1货到付款
        CalculationType: 0, //费用计算方式，  0 固定配送费 1 满减   2 快递公司自取
        FixedShippingFee: '', //固定配送费
        ShippingFull: '', // 满多少元
        ShippingFee: '', // 满多少元 配送费
        Promotions: 0,
        PromotionsFull: '',
        PromotionsCut: '',
        Tags: [],
        InformedConsent: ''
      },
      tagList: ['政府监督', '正品保证', '到店医保', '到店有礼'],
      isLoading: false
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const params = { CustID: this.data }
      let _this = this
      Service.GetOperationInfoByZYY(params).then((res) => {
        const data = res.data
        Object.keys(_this.model).forEach((key) => {
          _this.model[key] = data[key]
        })
        _this.model.Tags = data.Tags !== null ? data.Tags.split(',') : []
      })
    },
    save() {
      this.isLoading = true
      const params = Peace.util.deepClone(this.model)
      params.CustID = this.data
      params.Tags = params.Tags.length > 0 ? params.Tags.join(',') : ''
      Service.SaveOperationInfoByZYY(params)
        .then(() => {
          Peace.util.success('保存成功')
          this.$emit('goBack')
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    //是否收费选中监听
    chargeChange() {
      if (this.model.Shipping === 2) {
        this.model.ChargeType = 0
        this.model.CalculationType = 0
      }
    },

    //收费方式选中监听
    chargeTypeChange() {
      this.model.CalculationType = 0
    }
  }
}
</script>

<style scoped>
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
  margin-bottom: 24px;
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
.line {
  width: 100%;
  margin: 24px 0;
  height: 1px;
  background: #e9e9e9;
}
.discount .el-radio-group .el-radio {
  display: block;
  margin-bottom: 16px;
}
::v-deep .el-button--mini,
.el-button--mini.is-round {
  padding: 9px 56px;
}
::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #999 !important;
}
::v-deep .el-input-number--mini {
  width: 140px !important;
  margin: 0 8px;
}
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
::v-deep .el-checkbox-button__inner {
  margin-right: 10px;
  border-left: 1px solid #eee;
  border-radius: 4px;
  padding: 9px 32px;
}
::v-deep .el-checkbox-button:last-child .el-checkbox-button__inner {
  border-radius: 4px;
}
::v-deep .el-checkbox-button:first-child .el-checkbox-button__inner {
  border-radius: 4px;
}
::v-deep .el-checkbox-button.is-checked .el-checkbox-button__inner {
  background-color: #eaf4f6;
  color: #3099a6;
  box-shadow: none;
}

::v-deep .el-textarea:not(.element-ui-default).el-input--mini .el-textarea__inner {
  padding: 16px;
}
</style>