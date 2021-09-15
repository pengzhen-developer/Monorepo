<template>
  <div class="q-ml-16 q-mr-40">
    <div class="q-mb-lg">
      <span class="label-text">分单时间：</span>
      <span class="label-value">{{list.CreateTime}}</span>
    </div>
    <div class="q-mb-lg">
      <span class="label-text">分单数量：</span>
      <span class="label-value">{{list.OrderNum}}</span>
    </div>
    <div class="q-mb-22">
      <span class="label-text">分单方式：</span>
    </div>
    <div class="q-ml-lg">
      <div v-for="item in list.SplitOrderLogDetails"
           v-bind:key="item.Sort"
           class="q-mb-32">
        <div class="q-mb-22">
          <span class="title-text">仓/门店{{getChinesNum(item.Sort)}}：</span>
          <span class="title-value">{{item.CustName}}</span>
        </div>
        <PeaceTable ref="table"
                    :data='item.drugDicts'
                    size="mini">
          <el-table-column prop="DrugName"
                           label="药品名称"></el-table-column>
          <el-table-column label="订单总数量/单位">
            <template slot-scope="scope">{{`${scope.row.DrugNumber}/${scope.row.DrugQtyUnit||'-'}`}}</template>
          </el-table-column>
          <el-table-column label="发货数量"
                           width="114px"
                           prop="SoldNumber">
          </el-table-column>
        </PeaceTable>
      </div>
    </div>
  </div>
</template>

<script>
import Util from '@src/util'
import Service from '../service'
export default {
  props: {
    orderId: String
  },
  data() {
    return {
      list: {}
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      Service.getSplitOrderLog({ orderId: this.orderId }).then((res) => {
        this.list = res.data
      })
    },
    getChinesNum(num) {
      return Util.universal.toChinesNum(num)
    }
  }
}
</script>

<style lang="scss" scoped>
.label-text {
  line-height: 22px;
  font-size: 16px;
  color: #333333;
}
.label-value {
  line-height: 22px;
  color: rgba(51, 51, 51, 0.8);
  font-size: 16px;
}
.title-text {
  color: #333333;
}
.title-value {
  color: rgba(51, 51, 51, 0.8);
}
</style>