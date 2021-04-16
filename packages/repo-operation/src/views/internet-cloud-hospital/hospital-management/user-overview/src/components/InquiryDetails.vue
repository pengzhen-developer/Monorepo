<template>
  <div class="pb-sm">
    <div class="flex info-row two-cols q-mb-4">
      <div class="info-row-label q-mr-8 text-grey-999">
        <span>问诊总数</span>
      </div>
      <div class="info-row-content">{{ count }}</div>
      <div class="info-row-label q-ml-48 q-mr-8 text-grey-999">
        <span>累计费用</span>
      </div>
      <div class="info-row-content">{{ sumMoney || '0.00' }}</div>
    </div>
    <PeaceTable :data="inquirys"
                border
                class="table"
                size="small">
      <PeaceTableColumn label="姓名"
                        prop="familyName"></PeaceTableColumn>
      <PeaceTableColumn label="性别"
                        prop="sex"></PeaceTableColumn>
      <PeaceTableColumn label="年龄"
                        prop="age"></PeaceTableColumn>
      <PeaceTableColumn label="订单类型">
        <template slot-scope="scope">
          <div>{{ scope.row.inquiryType | filterDictionary(source.inquiryType) }}</div>
        </template>
      </PeaceTableColumn>
      <PeaceTableColumn label="订单金额（元）"
                        min-width="120"
                        prop="orderMoney"></PeaceTableColumn>
      <PeaceTableColumn label="接诊医生"
                        prop="doctorName"></PeaceTableColumn>
      <PeaceTableColumn label="订单状态">
        <template slot-scope="scope">
          <div>{{ scope.row.orderStatus | filterDictionary(source.orderStatus) }}</div>
        </template>
      </PeaceTableColumn>
      <PeaceTableColumn label="订单时间"
                        min-width="145"
                        prop="orderTime"></PeaceTableColumn>
    </PeaceTable>
    <el-pagination :current-page.sync="pageNumber"
                   :total="count"
                   @current-change="getInquirys"
                   background
                   layout="->,prev, pager,next"
                   style="margin-top:10px;"
                   v-if="count > 10"></el-pagination>
  </div>
</template>
<script>
import Service from '../service'
import Constant from '../constants'
export default {
  name: 'InquiryDetails',
  props: {
    id: String
  },
  data() {
    return {
      inquirys: [],
      count: 0,
      pageNumber: 1,
      sumMoney: 0,
      source: {
        inquiryType: Constant.INQIRY_TYPE,
        orderStatus: Constant.ORDER_STATUS
      }
    }
  },
  methods: {
    getInquirys() {
      const params = {
        patientId: this.id,
        p: this.pageNumber,
        size: 10
      }
      Service.getInquiryList(params).then((res) => {
        const data = res.data
        this.inquirys = data.list
        this.count = data.total
        this.sumMoney = data.sumMoney
      })
    }
  },
  created() {
    this.getInquirys()
  }
}
</script>
<style lang="scss" scoped>
.text {
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
}
.info-row {
  &-label,
  &-content {
    font-size: 12px;
    font-weight: normal;
  }
  &-content {
    max-width: 200px;
  }
}
</style>
