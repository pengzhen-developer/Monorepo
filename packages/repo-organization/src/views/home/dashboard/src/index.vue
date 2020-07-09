<template>
  <div class="bg-grey-2">
    <div class="q-mb-md">
      <h4>平台SaaS服务</h4>
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4"
             v-for="service in serviceList"
             v-bind:key="service.id">
          <ServiceItem v-bind:serviceName="service.serviceName"
                       v-bind:isPass="service.isPass"
                       v-bind:isPassText="service.isPassText"
                       v-bind:checkStatus="service.checkStatus"
                       v-bind:checkStatusText="service.checkStatusText"
                       v-bind:isOpenStatus="service.isOpenStatus"
                       v-bind:features="service.item"
                       v-on:openService="onOpenService(service)">
          </ServiceItem>
        </div>
      </div>
    </div>

    <div class="q-mb-md">
      <h4>使用中的产品</h4>
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3"
             v-for="product in productList"
             v-bind:key="product.id">
          <ProductItem v-bind:serviceName="product.serviceName"
                       v-bind:img="product.img"
                       v-bind:url="product.url"
                       v-on:click.native="redirectSerivceSite(product)">
          </ProductItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Peace from '@src/library'
import Util from '@src/util'
import Service from './service'

import ServiceItem from './components/ServiceItem'
import ProductItem from './components/ProductItem'

export default {
  components: {
    ServiceItem,
    ProductItem
  },

  data() {
    return {
      /** 服务列表 */
      serviceList: [],
      /** 使用中的产品列表 */
      productList: []
    }
  },

  created() {
    this.getServiceBaseInfo()
  },

  methods: {
    getServiceBaseInfo() {
      Service.getBaseInfo().then((res) => {
        this.serviceList = res.data.serviceList
        this.productList = res.data.useService
      })
    },

    onOpenService(service) {
      if (service.checkStatusText === '待审核') {
        Peace.util.warning('您的服务申请正在审核中，请勿重复申请')

        return
      } else {
        this.$emit('openService')
      }

      this.$confirm('申请开通后，需等待平台审核，确认开通？', '确认开通', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'service-item-confirm',
        cancelButtonClass: 'service-item-confirm-cancel',
        confirmButtonClass: 'service-item-confirm-confirm',
        center: true
      })
        .then(() => {
          this.doApply(service)
        })
        .catch(() => {
          console.log('取消申请服务')
        })
    },

    doApply(service) {
      const params = { serviceId: service.id }
      Service.doApply(params).then((res) => {
        Peace.util.success(res.msg)

        this.getServiceBaseInfo()
      })
    },

    redirectSerivceSite(product) {
      const cdKey = Util.user.getUserCDKey()
      const configMap = [
        { serviceName: '互联网医院管理端', serviceType: 1, config: 'organization' },
        { serviceName: '处方管理医院端', serviceType: 3, config: 'prescription' },
        { serviceName: '合理用药管理', serviceType: 2, config: 'rationaldruguse' },
        { serviceName: '药品供应管理端', serviceType: 4, config: 'drugsupplie' }
      ]
      const config = configMap.find((item) => item.serviceType == product.serviceType || item.serviceName == product.serviceName).config
      const FLODER_PATH = process.env.VUE_APP_RELEASE_FLODER_PATH
      window.open(`${window.location.origin}${FLODER_PATH}?cdkey=${cdKey}&configuration=${config}&title=${product.serviceName}`)
    }
  }
}
</script>

<style lang="scss" scoped>
h4 {
  font-size: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin: 0 0 12px 0;
}

.flex {
  display: flex;

  &.warp {
    flex-wrap: wrap;
  }
}
</style>