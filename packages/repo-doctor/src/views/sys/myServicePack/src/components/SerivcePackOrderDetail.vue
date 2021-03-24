<template>
  <div>
    <div class="flex items-center q-mb-md">
      <span class="absolute inline-block bg-primary"
            style="width: 4px; height: 17px; border-radius: 4px;"></span>
      <span class="q-ml-md text-grey-333"
            style="font-size: 16px; font-weight: 500;">基本信息</span>
    </div>

    <div class="q-mb-lg q-ml-md">
      <el-form space-none
               label-position="left"
               label-suffix="：">
        <el-form-item label="订单号">
          <span>{{ data.orderNo }}</span>
        </el-form-item>
        <el-form-item label="服务包名称">
          <span>{{ data.servicePackageName }}</span>
        </el-form-item>
        <el-form-item label="下单人">
          <span>{{ data.patientName }}</span>
        </el-form-item>
        <el-form-item label="下单时间">
          <span>{{ data.createdTime }}</span>
        </el-form-item>
        <el-form-item label="签约主体">
          <span>{{ data.mainPartName }}</span>
        </el-form-item>
        <el-form-item label="支付时间">
          <span>{{ data.payTime }}</span>
        </el-form-item>
        <el-form-item label="支付方式">
          <span>{{ data.payType }}</span>
        </el-form-item>
        <el-form-item label="支付金额">
          <span>{{ data.payMoney }}</span>
        </el-form-item>
        <el-form-item label="售后状态"
                      v-if="data.afterSaleText">
          <span>{{ data.afterSaleText }}</span>
        </el-form-item>
      </el-form>
    </div>

    <div class="title flex items-center q-mb-md">
      <span class="absolute inline-block bg-primary"
            style="width: 4px; height: 17px; border-radius: 4px;"></span>
      <span class="q-ml-md text-grey-333"
            style="font-size: 16px; font-weight: 500;">服务包信息</span>
    </div>

    <div class="q-mb-lg q-ml-md">
      <el-form space-none
               label-position="left"
               label-suffix="：">
        <el-form-item label="有效期至">
          <span>{{ data.expireDate }}</span>
        </el-form-item>
      </el-form>

      <p class="q-mt-md q-mb-sm text-weight-bold">项目内容</p>

      <el-form space-none
               label-position="left"
               label-suffix="：">
        <el-form-item v-for="item in data.equitiesList"
                      v-bind:key="item.equitiesName"
                      v-bind:label="item.equitiesName">
          <span>{{ `${item.equitiesNum}次（剩余${item.residueNum}次）` }}</span>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import Service from './../service'

export default {
  props: {
    orderNo: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      data: {}
    }
  },

  created() {
    this.fetch()
  },

  methods: {
    fetch() {
      Service.getOrderDetail({ orderNo: this.orderNo }).then((res) => {
        this.data = res.data.info
      })
    }
  }
}
</script>
