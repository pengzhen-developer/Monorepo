<template>
  <div class="full-width">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model"
               label-width="auto">
        <el-form-item label="患者姓名">
          <peace-input v-model.trim="model.patientName"
                       placeholder="请输入"></peace-input>
        </el-form-item>
        <el-form-item label="订单编号">
          <peace-input v-model.trim="model.orderNo"
                       placeholder="请输入"></peace-input>
        </el-form-item>
        <el-form-item label="状态">
          <peace-select v-model="model.orderStatus"
                        placeholder="全部">
            <el-option v-for="item in source.orderStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </peace-select>
        </el-form-item>
        <el-form-item label="预约科室">
          <peace-select v-model="model.deptId"
                        placeholder="全部">
            <el-option v-for="item in source.dept"
                       v-bind:key="item.deptId"
                       v-bind:label="item.netdeptChild"
                       v-bind:value="item.deptId"></el-option>
          </peace-select>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn prop="orderNumber"
                          label="序号"
                          width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="订单编号"
                          min-width="200px">
          <template slot-scope="scope">
            <div v-on:click="toDetail(scope.row)"
                 class="text-primary cursor-pointer ">{{ scope.row.orderNo }}</div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="状态"
                          prop="orderStatusText"
                          min-width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="就诊人"
                          prop="patientName"
                          min-width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="金额"
                          prop="totalMoney"
                          min-width="100px"></PeaceTableColumn>
        <PeaceTableColumn label="预约科室"
                          prop="deptName"
                          min-width="100px"></PeaceTableColumn>
        <PeaceTableColumn label="预约医生"
                          prop="doctorName"
                          min-width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="支付时间"
                          min-width="180px">
          <template slot-scope="scope">
            {{scope.row.appointmentTime||'-'}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="下单时间"
                          prop="createdTime"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="来源"
                          prop="serviceTypeText"
                          min-width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="支付状态"
                          prop="payStatusText"
                          min-width="80px"></PeaceTableColumn>
      </PeaceTable>

    </div>

  </div>
</template>

<script>
import Service from '../service'
export default {
  data() {
    return {
      model: {
        patientName: '',
        orderNo: '',
        orderStatus: '',
        depId: ''
      },
      source: {
        orderStatus: [],
        dept: []
      }
    }
  },

  async mounted() {
    this.source.orderStatus = await Peace.identity.dictionary.getList('registering_order_status')
    this.$nextTick().then(() => {
      this.getDeptList()
      this.fetch()
    })
  },
  methods: {
    getDeptList() {
      Service.getDeptList().then((res) => {
        this.source.dept = res.data.list
      })
    },
    fetch() {
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.getRegisteringOrder
      this.$refs.table.reloadData({ fetch, params })
    },
    toDetail(row) {
      this.$emit('onOrderClick', row.orderNo)
    }
  }
}
</script>

<style>
</style>