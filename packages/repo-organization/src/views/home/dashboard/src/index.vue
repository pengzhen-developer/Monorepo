<template>
  <div class="layout-route">
    <div class="bg-grey-2 q-pa-md">

      <div class="empty-view q-mb-lg"
           v-if="isEmpty">
        <img src="./image/ic_empty.png"
             style="width:137px;height:150px;"
             alt="">
        <div>暂无产品可使用，可选择下方服务申请开通哦~</div>
      </div>
      <div class="q-mb-md"
           v-else>
        <h4>使用中的产品</h4>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3"
               v-for="product in productList"
               v-bind:key="product.id">
            <ProductItem v-bind:serviceName="product.serviceName"
                         v-bind:img="product.img"
                         v-bind:url="product.url"
                         v-on:click.native="isExistService(product)">
            </ProductItem>
          </div>
        </div>
      </div>

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

      <!-- 合理用药弹框 -->
      <el-dialog :visible.sync="useDrugDialog"
                 v-if="useDrugDialog"
                 width="334px"
                 title="申请开通">
        <UseDrugDialog v-bind:service="serviceDialogBean"
                       v-on:onCancel="useDrugDialog = false"
                       v-on:onSuccess=" useDrugSuccess" />
      </el-dialog>

      <!-- 处方共享管理 -->
      <el-dialog :visible.sync="rpShareDialog"
                 v-if="rpShareDialog"
                 width="334px"
                 title="申请开通">
        <RpShareManagementDialog v-bind:service="serviceDialogBean"
                                 v-on:onCancel="rpShareDialog = false"
                                 v-on:onSuccess="rpShareSuccess" />
      </el-dialog>

      <!-- 药品供应管理 -->
      <el-dialog :visible.sync="medicineSupplyDialog"
                 v-if="medicineSupplyDialog"
                 width="334px"
                 title="申请开通">
        <MedicineSupplyDialog v-bind:service="serviceDialogBean"
                              v-on:onCancel="medicineSupplyDialog = false"
                              v-on:onSuccess="medicineSupplySuccess" />
      </el-dialog>

    </div>
  </div>

</template>

<script>
import Peace from '@src/library'
import Util from '@src/util'
import Service from './service'

import ServiceItem from './components/ServiceItem'
import ProductItem from './components/ProductItem'
import UseDrugDialog from './components/UseDrugDialog'
import RpShareManagementDialog from './components/RpShareManagementDialog'
import MedicineSupplyDialog from './components/RpShareManagementDialog'

export default {
  components: {
    ServiceItem,
    ProductItem,
    UseDrugDialog,
    RpShareManagementDialog,
    MedicineSupplyDialog
  },

  data() {
    return {
      //传到各个选择框的bean
      serviceDialogBean: {},
      //合理用药弹框开关
      useDrugDialog: false,
      //处方管理服务开关
      rpShareDialog: false,
      //药品供应管理
      medicineSupplyDialog: false,

      /** 服务列表 */
      serviceList: [],
      /** 使用中的产品列表 */
      productList: []
    }
  },

  created() {
    this.getServiceBaseInfo()
  },

  computed: {
    isEmpty() {
      return this.productList.length === 0
    }
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
      //检查是否可以弹框
      this.checkPermis(service)
    },

    checkPermis(service) {
      const params = { serviceId: service.id }
      Service.checkServiceType(params)
        .then(() => {
          switch (service.serviceType) {
            case 1:
              //互联网医院开通
              this.showHospitalDialog(service)
              break
            case 2:
              //合理用药管理
              this.serviceDialogBean = service
              this.useDrugDialog = true
              break
            case 3:
              //处方管理服务
              this.serviceDialogBean = service
              this.rpShareDialog = true
              break
            case 4:
              //药品供应管理
              this.serviceDialogBean = service
              this.medicineSupplyDialog = true
              break
          }
        })
        .finally((res) => {
          Peace.util.error(res.msg)
        })
    },

    showHospitalDialog(service) {
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
        .catch(() => {})
    },

    doApply(service) {
      const params = { serviceId: service.id }
      Service.doApply(params).then((res) => {
        Peace.util.success(res.msg)
        this.getServiceBaseInfo()
      })
    },
    isExistService(product) {
      const params = { serviceId: product.serviceId, accountId: product.accountId }
      Service.isExistService(params).then(() => {
        this.redirectSerivceSite(product)
      })
    },
    redirectSerivceSite(product) {
      const token = Util.user.getUserToken()
      const configMap = [
        { serviceName: '互联网医院管理端', serviceType: 1, config: 'organization' },
        { serviceName: '处方管理医院端', serviceType: 3, config: 'prescription' },
        { serviceName: '合理用药管理', serviceType: 2, config: 'rationaldruguse' },
        { serviceName: '药品供应管理端', serviceType: 4, config: 'drugsupplie' }
      ]
      const config = configMap.find((item) => item.serviceType == product.serviceType).config
      const FLODER_PATH = process.env.VUE_APP_RELEASE_FLODER_PATH

      window.open(`${window.location.origin}${FLODER_PATH}?token=${token}&configuration=${config}&title=${product.serviceName}&serviceId=${product.serviceId}`)
    },

    //申请开通用药建议成功后的方法
    useDrugSuccess() {
      this.useDrugDialog = false
      this.getServiceBaseInfo()
    },
    //处方共享管理成功后的方法
    rpShareSuccess() {
      this.rpShareDialog = false
      this.getServiceBaseInfo()
    },
    //药品供应管理成功后的方法
    medicineSupplySuccess() {
      this.medicineSupplyDialog = false
      this.getServiceBaseInfo()
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

.empty-view {
  width: 100%;
  height: 238px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  color: #9b9b9b;
}
</style>