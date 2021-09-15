<template>
  <div class="full-width">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model"
               label-width="auto">
        <el-form-item label="申请类型">
          <peace-select v-model="model.type"
                        placeholder="全部">
            <el-option v-for="item in source.type"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </peace-select>
        </el-form-item>
        <el-form-item label="就诊人">
          <peace-input v-model.trim="model.patientName"
                       placeholder="请输入"></peace-input>
        </el-form-item>
        <el-form-item label="申请单号">
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
        <el-form-item label="支付状态">
          <peace-select v-model="model.payStatus"
                        placeholder="全部">
            <el-option v-for="item in source.payStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </peace-select>
        </el-form-item>
        <el-form-item label="申请日期">
          <peace-date-picker type="daterange"
                             value-format="yyyy-MM-dd"
                             v-model.trim="DateValue"></peace-date-picker>
        </el-form-item>
        <el-form-item label="开单医生">
          <peace-input v-model.trim="model.docName"
                       placeholder="请输入"></peace-input>
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
        <PeaceTableColumn label="申请单号"
                          min-width="200px">
          <template slot-scope="scope">
            <div v-on:click="toDetail(scope.row)"
                 class="text-primary cursor-pointer ">{{ scope.row.orderNo }}</div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="申请类型"
                          prop="checkTypeText"
                          min-width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="状态"
                          prop="orderStatusText"
                          min-width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="项目数"
                          prop="checkIteCount"
                          min-width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="就诊人"
                          prop="patientName"
                          min-width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="就诊人手机号"
                          min-width="120px">
          <template slot-scope="scope">
            {{scope.row.tel||'-'}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="总金额"
                          prop="totalMoney"
                          min-width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="开单科室"
                          prop="deptName"
                          min-width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="开单医生"
                          prop="doctorName"
                          min-width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="执行科室"
                          prop="doDeptName"
                          min-width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="申请时间"
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
      DateValue: [],
      model: {
        checkType: '',
        patientName: '',
        orderNo: '',
        orderStatus: '',
        startDate: '',
        endDate: '',
        payStatus: '',
        docName: ''
      },
      source: {
        orderStatus: [],
        payStatus: [],
        dept: [],
        type: [
          { label: '检验', value: 'check' },
          { label: '检查', value: 'pacs' }
        ]
      }
    }
  },
  watch: {
    DateValue(value) {
      this.model.startDate = value?.[0] ?? ''
      this.model.endDate = value?.[1] ?? ''
    }
  },
  async mounted() {
    this.source.orderStatus = await Peace.identity.dictionary.getList('combo_order_status')
    this.source.payStatus = await Peace.identity.dictionary.getList('combo_pay_status')
    this.$nextTick().then(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.getItemOrderList
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