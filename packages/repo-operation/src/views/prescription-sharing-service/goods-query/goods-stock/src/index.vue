<template>
  <div class="layout-route
       full-width">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               label-width="auto"
               v-bind:model="model"
               v-on:keyup.enter.native="fetch"
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
        <el-form-item label="商品名称">
          <el-input v-model.trim="model.GoodName"
                    clearable
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="更新日期">
          <peace-date-picker value-format="yyyy-MM-dd"
                             type="daterange"
                             end-placeholder="至今"
                             start-placeholder="开始日期"
                             clearable
                             v-model.trim="DateValue"></peace-date-picker>
        </el-form-item>

        <el-form-item label="库存数量">

          <el-input-number v-model.trim="model.Stock"
                           style="width: 210px; text-align: left"
                           :controls="false"
                           :precision="0"
                           :min="0"
                           placeholder="请输入"></el-input-number>

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
                            prop="GoodCode"
                            min-width="160px"></peace-table-column>
        <peace-table-column label="规格"
                            prop="DrugSpecifications"
                            min-width="120px">
        </peace-table-column>
        <peace-table-column label="厂家"
                            prop="EnterpriseName"
                            min-width="120px"></peace-table-column>
        <peace-table-column label="包装单位"
                            prop="PackUnit"
                            min-width="120px"></peace-table-column>
        <peace-table-column label="库存数量"
                            prop="Stock"
                            min-width="120px"></peace-table-column>
        <peace-table-column label="更新时间"
                            prop="Get3PartStockInfoTime"
                            min-width="180px"></peace-table-column>
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
        EndDate: '',
        Stock: undefined
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
      if (!params.Code) {
        return Peace.util.error('选择供应门店/仓才能支持查询')
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

<style lang="scss" scoped>
::v-deep .el-input-number.is-without-controls .el-input__inner {
  text-align: left;
}
</style>