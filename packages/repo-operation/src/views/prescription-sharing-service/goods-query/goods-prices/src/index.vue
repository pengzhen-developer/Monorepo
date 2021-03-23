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
            <el-option v-for="(item,index) in source.Code"
                       :key="index"
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

        <peace-table-column label="价格">
          <template slot-scope="scope">
            {{ scope.row.Price != null ?  scope.row.Price : '——' }}
          </template>
        </peace-table-column>

        <peace-table-column label="批发价">
          <template slot-scope="scope">
            {{ scope.row.WholesalePrice != null ?  scope.row.WholesalePrice : '——' }}
          </template>
        </peace-table-column>

        <peace-table-column label="中标价">
          <template slot-scope="scope">
            {{ scope.row.WiningPrice != null ?  scope.row.WiningPrice : '——' }}
          </template>
        </peace-table-column>

        <peace-table-column label="零售价">
          <template slot-scope="scope">
            {{ scope.row.RetailPrice != null ?  scope.row.RetailPrice : '——' }}
          </template>
        </peace-table-column>

        <peace-table-column label="成本价">
          <template slot-scope="scope">
            {{ scope.row.CostPrice != null ?  scope.row.CostPrice : '——' }}
          </template>
        </peace-table-column>

        <peace-table-column label="更新时间">
          <template slot-scope="scope">
            {{ scope.row.Get3PartStockInfoTime || '——' }}
          </template>
        </peace-table-column>

      </peace-table>
    </div>

  </div>
</template>

<script>
import Service from './service/index'
export default {
  name: 'GoodsPrices',
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
      const fetch = Service.GetPriceByDrugStoreId
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