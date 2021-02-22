<template>
  <div class="layout-route
       full-width">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               label-suffix="："
               v-bind:model="model"
               v-on:submit.native.prevent>
        <el-form-item label="供应门店/仓"
                      required>
          <el-select clearable
                     filterable
                     v-model.trim="model.Code"
                     placeholder="请选择">
            <el-option v-for="item in source.Code"
                       :key="item.Code"
                       :label="item.Name"
                       :value="item.Code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称"
                      required>
          <el-input v-model.trim="model.GoodName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="更新日期">
          <peace-date-picker value-format="yyyy-MM-dd"
                             type="daterange"
                             v-model.trim="DateValue"></peace-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <peace-table ref="table">
        <peace-table-column label="序号"
                            prop="Num"
                            width="80px">
        </peace-table-column>
        <peace-table-column label="商品名称"
                            prop="GoodName"
                            min-width="120px"></peace-table-column>
        <peace-table-column label="机构商品编码"
                            prop="GoodCode"></peace-table-column>
        <peace-table-column label="规格"
                            prop="DrugSpecifications">
        </peace-table-column>
        <peace-table-column label="厂家"
                            prop="EnterpriseName"
                            min-width="120px"></peace-table-column>
        <peace-table-column label="包装单位"
                            prop="PackUnit"></peace-table-column>
        <peace-table-column label="库存数量"
                            prop="Stock"></peace-table-column>
        <peace-table-column label="更新时间"
                            prop="Get3PartStockInfoTime"
                            width="180px"></peace-table-column>
      </peace-table>
    </div>

  </div>
</template>

<script>
import Service from './service/index'
export default {
  name: 'GoodsStock',
  data() {
    return {
      DateValue: '',
      model: {
        Code: '',
        GoodName: '',
        StartDate: '',
        EndDate: ''
      },
      source: {
        Code: []
      }
    }
  },
  watch: {
    DateValue(value) {
      this.model.StartDate = value?.[0] ?? ''
      this.model.EndDate = value?.[1] ?? ''
    }
  },
  created() {
    //获取药店货仓字典
    this.getAllDrugStore()
  },
  methods: {
    fetch() {
      const params = Object.assign({}, this.model)
      if (!(params.Code && params.GoodName)) {
        return Peace.util.error('选择供应门店/仓和商品名称才能支持查询')
      }
      const fetch = Service.GetStockByDrugStoreId
      this.$refs.table.reloadData({ fetch, params })
    },
    getAllDrugStore() {
      Service.GetAllDrugStore().then((res) => {
        this.source.Code = res.data.list
      })
    }
  }
}
</script>

<style>
</style>