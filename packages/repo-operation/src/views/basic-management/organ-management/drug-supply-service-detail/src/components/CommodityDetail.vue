<template>
  <div>
    <div class="card card-search q-mb-md">
      <h2 class="cust-Name ">{{data.custname}}</h2>
      <el-form inline
               label-width="auto"
               v-bind:model="model"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent>
        <el-form-item label="药品编码：">
          <el-input v-model.trim="model.DrugsCode"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="药品名称：">
          <el-input v-model.trim="model.DrugsName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="生产厂家：">
          <el-input v-model.trim="model.EnterpriseName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="批准文号：">
          <el-input v-model.trim="model.ApprovalNumber"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="上架状态：">
          <el-select clearable
                     v-model.trim="model.OnShelves"
                     placeholder="全部">
            <el-option v-for="(value,label) in source.ON_SHELF_STATUS"
                       :key="value"
                       :label="label"
                       :value="value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="配码审核状态：">
          <el-select clearable
                     v-model.trim="model.MappingExamineStatus"
                     placeholder="全部">
            <el-option v-for="(value,label) in source.MAPPING_EXAMINE_STATUS"
                       :key="value"
                       :label="label"
                       :value="value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
          <el-button type="primary"
                     plain
                     v-on:click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">

      <peace-table ref="table"
                   pagination>
        <el-table-column label="序号"
                         type="index"
                         align="center"
                         width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="药品编码"
                         prop="CustDrugsCode"
                         min-width="120px"></el-table-column>
        <el-table-column label="药品名称"
                         prop="ProductName"
                         min-width="180px"></el-table-column>
        <el-table-column label="药品规格"
                         prop="DrugSpecifications"
                         min-width="140px"></el-table-column>
        <el-table-column label="包装"
                         prop="PackUnit"
                         min-width="100px"></el-table-column>
        <el-table-column label="生产厂家"
                         prop="EnterpriseName"
                         min-width="200px"></el-table-column>
        <el-table-column label="批准文号"
                         prop="ApprovalNumber"
                         min-width="180px"></el-table-column>
        <el-table-column label="配码审核状态"
                         prop="MappingExamineStatus"
                         min-width="120px">
          <template slot-scope="scope">
            <span>{{scope.row.MappingExamineStatus | getEnumLabel(source.MAPPING_EXAMINE_STATUS)}}</span>
          </template>
        </el-table-column>

        <el-table-column label="单价(元)"
                         prop="Price"
                         min-width="100px">
        </el-table-column>
        <el-table-column label="库存"
                         prop="Stock"
                         min-width="100px">
        </el-table-column>
        <el-table-column label="上架状态"
                         prop="OnShelves"
                         min-width="100px">
          <template slot-scope="scope">
            {{ scope.row.EnableStatus == 0 ? '已下架' : '已上架' }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间"
                         prop="UpdateTime"
                         min-width="180px">
        </el-table-column>
      </peace-table>
    </div>

  </div>
</template>

<script>
import Service from '../service/index'
import CONSTANT from '../constant'

export default {
  name: 'CommodityDetail',
  props: {
    data: {
      type: Object,
      validator(value) {
        return Object.prototype.hasOwnProperty.call(value, 'custcode') && Object.prototype.hasOwnProperty.call(value, 'custname')
      }
    }
  },
  data() {
    return {
      source: {
        ON_SHELF_STATUS: CONSTANT.ON_SHELF_STATUS,
        MAPPING_EXAMINE_STATUS: CONSTANT.MAPPING_EXAMINE_STATUS
      },
      model: {
        DrugsCode: '',
        DrugsName: '',
        EnterpriseName: '',
        ApprovalNumber: '',
        EnableStatus: '',
        OnShelves: '',
        MappingExamineStatus: ''
      }
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },
  watch: {
    DateValue(value) {
      this.model.StartTime = value?.[0] ?? ''
      this.model.EndTime = value?.[1] ?? ''
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const fetch = Service.GetGoodsDetails
      const params = Object.assign({}, this.model)
      params.custcode = this.data.custcode
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        return res
      })
    },
    reset() {
      Object.assign(this.model, {
        DrugsCode: '',
        DrugsName: '',
        EnterpriseName: '',
        ApprovalNumber: '',
        EnableStatus: '',
        OnShelves: '',
        MappingExamineStatus: ''
      })
      this.fetch()
    }
  }
}
</script>

<style  lang="scss" scoped>
.cust-Name {
  margin: 0;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
  color: #333333;
  text-align: center;
}
</style>