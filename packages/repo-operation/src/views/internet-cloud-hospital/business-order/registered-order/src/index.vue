<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form :model="model"
               label-suffix="："
               label-width="auto"
               inline>
        <el-form-item label="姓名">
          <el-input placeholder="请输入医生姓名"
                    v-model="model.doctorName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input placeholder="请输入手机号"
                    v-model="model.tel"></el-input>
        </el-form-item>
        <el-form-item label="医院名称">
          <el-input placeholder="请输入医院名称"
                    v-model="model.hospitalName"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="model.orderStatus">
            <el-option label="全部"
                       value></el-option>
            <el-option :key="item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.registeredOrderStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="search-btn">
          <el-button @click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <PeaceTable ref="table"
                  class="table"
                  pagination>
        <PeaceTableColumn label="订单编号"
                          min-width="270"
                          prop="orderNo"></PeaceTableColumn>
        <PeaceTableColumn label="就诊人"
                          prop="familyName"></PeaceTableColumn>
        <PeaceTableColumn label="身份证号"
                          min-width="180"
                          prop="idcard"></PeaceTableColumn>
        <PeaceTableColumn label="预约医生"
                          min-width="100"
                          prop="doctorName"></PeaceTableColumn>
        <PeaceTableColumn label="医院"
                          min-width="180"
                          prop="netHospitalName"></PeaceTableColumn>
        <PeaceTableColumn label="科室"
                          min-width="140"
                          prop="realDeptName"></PeaceTableColumn>
        <PeaceTableColumn label="联系电话"
                          min-width="140"
                          prop="tel"></PeaceTableColumn>
        <PeaceTableColumn label="预约就诊时间"
                          min-width="200"
                          prop="itemTimeZone"></PeaceTableColumn>
        <PeaceTableColumn label="订单状态"
                          prop="orderStatus"
                          min-width="100px">
          <template slot-scope="scope">
            <span style="line-height: 28px;">{{ scope.row.orderStatus | filterDictionary(source.registeredOrderStatus) }}</span>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>
  </div>
</template>

<script>
import Constant from './constant'
import Service from './service'
export default {
  name: 'registered-order',
  data() {
    return {
      model: {
        doctorName: '',
        tel: '',
        hospitalName: '',
        orderStatus: '',
        p: 1,
        size: 10
      },
      source: {
        registeredOrderStatus: Constant.REGISTERED_ORDER_STATUS
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      const fetch = Service.getOrders
      const params = Peace.util.deepClone(this.model)

      this.$refs.table.reloadData({ fetch, params })
    }
  }
}
</script>

<style>
</style>