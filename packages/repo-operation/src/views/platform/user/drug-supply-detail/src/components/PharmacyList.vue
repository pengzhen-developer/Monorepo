<template>
  <div>
    <div class="card">
      <h2 class="cust-Name ">{{custname}}</h2>
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">药房信息</p>
      </div>
      <peace-table ref="table">
        <el-table-column label="序号"
                         type="index"
                         align="center"
                         width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="药房名称"
                         prop="Name"
                         min-width="180px"></el-table-column>
        <el-table-column label="已上架商品数量"
                         prop="GoodNums"
                         min-width="180px"></el-table-column>
        <el-table-column label="认证状态"
                         prop="ExamineStatus"
                         min-width="100px">
          <template slot-scope="scope">
            <span class="dot"
                  v-bind:class="getColorType(scope.row)"></span>
            <span>{{scope.row.ExamineStatus | getEnumLabel(source.ENUM_CHECK_STATUS)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间"
                         prop="CreateTime"
                         min-width="160px"></el-table-column>
        <el-table-column label="启用状态"
                         prop="EnableStatus"
                         min-width="100px">
          <template slot-scope="scope">
            {{ scope.row.EnableStatus == 0 ? '已启用' : '未启用' }}
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="left"
                         width="160px"
                         fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="pharmacyDetail(scope.row)">药房详情</el-button>
            <el-button type="text"
                       v-if="scope.row.ExamineStatus==15"
                       v-on:click="commodityDetail(scope.row)">商品详情</el-button>
          </template>
        </el-table-column>
      </peace-table>
    </div>

  </div>
</template>

<script>
import Service from '../service/index'
import CONSTANT from '../constant'

export default {
  name: 'PharmacyList',
  inject: ['provideGoTo'],

  props: {
    data: {
      type: Object,
      validator(value) {
        return Object.prototype.hasOwnProperty.call(value, 'custcode')
      }
    }
  },

  data() {
    return {
      custname: '',
      source: {
        ENUM_CHECK_STATUS: CONSTANT.ENUM_CHECK_STATUS
      },
      model: {}
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const fetch = Service.geDrugsCustomerList
      const params = Object.assign({}, this.model)
      params.CustCode = this.data.custcode
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        this.custname = res.data.CustName
        return res
      })
    },
    getColorType(row) {
      const dict = {
        10: 'reviewed',
        15: 'success',
        20: 'failed'
      }
      return dict[row.ExamineStatus]
    },
    pharmacyDetail(row) {
      this.provideGoTo('PharmacyDetail', { UserID: row.UserID })
    },
    commodityDetail(row) {
      this.provideGoTo('CommodityDetail', { custcode: row.Code, custname: row.Name })
    }
  }
}
</script>

<style  lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.cust-Name {
  margin: 0;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
  color: #333333;
  text-align: center;
}
.item-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
}
.title-left {
  width: 4px;
  height: 16px;
  background: #3099a6;
  border-radius: 2px 2px 0px 2px;
}
.title {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  margin-left: 10px;
  height: 24px;
  font-size: 16px;
}
::v-deep .dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 8px 0 0;

  &.failed {
    background: rgba(0, 0, 0, 0.25);
  }
  &.reviewed {
    background: #faad14;
  }
  &.success {
    background: var(--q-color-primary);
  }
}
</style>