<template>
  <div class="layout-route ">
    <div class="content ">

      <div class="q-mb-lg">
        <el-button v-on:click="back"
                   icon="el-icon-arrow-left">
          返回上一页
        </el-button>
      </div>

      <div class="infor-row flex items-center">
        <span class="inline-block bg-primary q-mr-sm"
              style="width: 4px; height: 16px;border-radius:4px;"></span>
        <span class="text-subtitle1 text-bold">基本信息</span>
      </div>

      <div class="infor-row">
        <span class="label col col-3">姓名：{{ familyInfo.name }}</span>

        <span class="label col col-3">电话：{{ familyInfo.tel }}</span>

      </div>

      <div class="infor-row">
        <span class="label col col-3">性别：{{ familyInfo.sex }}</span>

        <span class="label col col-3">年龄：{{ familyInfo.age }}</span>

        <span class="label col col-3">身份证号：{{ familyInfo.idCard }}</span>
      </div>

      <div class="infor-row">
        <span class="label col col-1">标签：</span>
        <span class="value col">
          <el-tag :key="item"
                  class="tag"
                  type="info"
                  v-for="item in familyInfo.diagnoseInfo">{{ item }}</el-tag>
        </span>
      </div>

      <div class="q-my-lg dividing-line-style" />

      <div class="infor-row flex items-center">
        <span class="inline-block bg-primary q-mr-sm"
              style="width: 4px; height: 16px;border-radius:4px;"></span>
        <span class="text-subtitle1 text-bold">记录信息</span>
      </div>

      <el-tabs>
        <el-tab-pane label="咨询记录">
          <div class="infor-row">
            <span class="label col">咨询总数：</span>
            <span class="value col col-1">{{ inquiryInfo.inquiryTotal }}</span>

            <span class="label col">累计费用：</span>
            <span class="value col">{{ inquiryInfo.moneyTotal }}</span>
          </div>
          <div class="infor-row">
            <peace-table :data="inquiryInfo.list"
                         size="medium"
                         stripe>
              <peace-table-column label="序号"
                                  type="index"
                                  width="80px"></peace-table-column>
              <peace-table-column label="问诊编号"
                                  prop="inquiryNo"
                                  min-width="180px"></peace-table-column>
              <peace-table-column label="问诊类型"
                                  prop="inquiryType"
                                  min-width="100px">
                <template slot-scope="scope">
                  <div>{{ scope.row.inquiryType | filterDictionary(CONSTANT.InquiryType, '--')  }}</div>
                </template>
              </peace-table-column>
              <peace-table-column label="订单金额（元）"
                                  prop="orderMoney"
                                  min-width="140px"></peace-table-column>
              <peace-table-column label="问诊医生"
                                  prop="doctorName"
                                  min-width="100px"></peace-table-column>
              <peace-table-column label="订单状态"
                                  prop="orderStatus"
                                  min-width="100px">
                <template slot-scope="scope">
                  <div>{{ scope.row.inquiryStatusStr }}</div>
                </template>
              </peace-table-column>
              <peace-table-column label="订单时间"
                                  prop="createdTime"
                                  min-width="180px"></peace-table-column>
              <peace-table-column label="操作"
                                  min-width="100px">
                <template slot-scope="scope">
                  <el-button @click="showInquiryDetail(scope.row, 'inquiry')"
                             type="text">查看详情</el-button>
                </template>
              </peace-table-column>
            </peace-table>

            <el-pagination :current-page.sync="search.pageNumber"
                           :page-size.sync="search.pageSize"
                           :total="inquiryInfo.total"
                           @current-change="getInquiryByFamily"
                           @size-change="getInquiryByFamily(1)"
                           background
                           layout="total, sizes ,->, prev, pager,  next"
                           class="q-mt-10"></el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="复诊记录">
          <div class="infor-row">
            <span class="label col">复诊总数：</span>
            <span class="value col col-1">{{ visitInfo.inquiryTotal }}</span>

            <span class="label col">累计费用：</span>
            <span class="value col">{{ visitInfo.moneyTotal }}</span>
          </div>
          <div class="infor-row">
            <peace-table :data="visitInfo.list"
                         size="medium"
                         stripe>
              <peace-table-column label="序号"
                                  type="index"
                                  width="80px"></peace-table-column>
              <peace-table-column label="问诊编号"
                                  prop="inquiryNo"
                                  min-width="180px"></peace-table-column>
              <peace-table-column label="订单金额（元）"
                                  min-width="140px"
                                  prop="orderMoney"></peace-table-column>
              <peace-table-column label="问诊医生"
                                  prop="doctorName"
                                  min-width="100px"></peace-table-column>
              <peace-table-column label="订单状态"
                                  prop="orderStatus"
                                  min-width="100px">
                <template slot-scope="scope">
                  <div>{{ scope.row.inquiryStatusStr }}</div>
                </template>
              </peace-table-column>
              <peace-table-column label="订单时间"
                                  prop="createdTime"
                                  min-width="180px"></peace-table-column>
              <peace-table-column label="操作"
                                  fixed="right"
                                  min-width="100px">
                <template slot-scope="scope">
                  <el-button @click="showInquiryDetail(scope.row, 'returnVisit')"
                             type="text">查看详情</el-button>
                </template>
              </peace-table-column>
            </peace-table>

            <el-pagination :current-page.sync="search3.pageNumber"
                           :page-size.sync="search3.pageSize"
                           :total="visitInfo.total"
                           @current-change="getVisitByFamily"
                           @size-change="getVisitByFamily(1)"
                           background
                           layout="total, sizes ,->, prev, pager,  next"
                           class="q-mt-10"></el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="处方记录">
          <div class="infor-row">
            <span class="label col">处方总数：</span>
            <span class="value col col-1">{{ prescriptionInfo.total }}</span>
          </div>
          <div class="infor-row">
            <peace-table :data="prescriptionInfo.list"
                         size="medium"
                         stripe>
              <peace-table-column label="序号"
                                  type="index"
                                  width="80px"></peace-table-column>
              <peace-table-column label="处方编号"
                                  prop="prescriptionNo"
                                  min-width="180px"></peace-table-column>
              <peace-table-column label="开具医生"
                                  prop="doctorName"></peace-table-column>
              <peace-table-column label="处方状态"
                                  prop="prescriptionStatusDisplay"></peace-table-column>
              <peace-table-column label="开具时间"
                                  prop="createdTime"
                                  min-width="180px"></peace-table-column>
              <peace-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="showPrescriptionDetail(scope.row)"
                             type="text">查看详情</el-button>
                </template>
              </peace-table-column>
            </peace-table>

            <el-pagination :current-page.sync="search2.pageNumber"
                           :page-size.sync="search2.pageSize"
                           :total="prescriptionInfo.total"
                           @current-change="getPrescriptionByfamily"
                           @size-change="getPrescriptionByfamily(1)"
                           background
                           layout="total, sizes ,->, prev, pager,  next"
                           class="q-mt-10"></el-pagination>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>

    <peace-dialog append-to-body
                  v-if="inquiryDialog.visible"
                  v-bind:title="inquiryDialog.title"
                  v-bind:visible.sync="inquiryDialog.visible">
      <PeaceIMMessageHistory v-bind:data="inquiryDialog.data.msgInfo"
                             v-bind:messageFlowIn="inquiryDialog.data.doctorInfo"
                             v-bind:messageFlowOut="inquiryDialog.data.patientInfo"></PeaceIMMessageHistory>
    </peace-dialog>

    <peace-dialog append-to-body
                  title="处方详情"
                  v-if="prescriptionDialog.visible"
                  v-bind:visible.sync="prescriptionDialog.visible">
      <PeacePrescriptionDetail v-bind:data="prescriptionDialog.data"></PeacePrescriptionDetail>
    </peace-dialog>
  </div>
</template>

<script>
import Service from '../service'
import CONSTANT from '../constant'

import { PeaceIMMessageHistory, PeacePrescriptionDetail } from 'peace-components'

export default {
  name: 'Detail',
  props: {
    data: Object
  },
  components: {
    PeaceIMMessageHistory,
    PeacePrescriptionDetail
  },

  data() {
    return {
      CONSTANT,
      viewType: 'list',

      // 咨询记录
      search: {
        pageNumber: 1,
        pageSize: 10
      },
      // 处方记录
      search2: {
        pageNumber: 1,
        pageSize: 10
      },
      // 复诊记录
      search3: {
        pageNumber: 1,
        pageSize: 10
      },

      familyInfo: {},
      inquiryInfo: {
        list: [],
        total: 0
      },
      prescriptionInfo: {
        list: [],
        total: 0
      },

      visitInfo: {
        list: [],
        total: 0
      },

      inquiryDialog: {
        visible: false,
        title: '',
        inquiryNo: ''
      },
      prescriptionDialog: {
        visible: false,
        data: {}
      },
      source: {}
    }
  },
  methods: {
    getList() {
      this.getOneFamily()

      this.getInquiryByFamily()
      this.getPrescriptionByfamily()
      this.getVisitByFamily()
    },

    getOneFamily() {
      Service.getOneFamily({ patientNo: this.data.id }).then((res) => {
        const data = res.data
        this.familyInfo = data.familyBaseInfo
      })
    },

    getInquiryByFamily(number) {
      if (number && this.search.pageNumber !== number) {
        this.search.pageNumber = number
      }

      Service.getInquiryByFamily({
        serviceType: 'inquiry',
        patientNo: this.data.id,
        p: this.search.pageNumber,
        size: this.search.pageSize
      }).then((res) => {
        const data = res.data
        this.inquiryInfo = data
      })
    },

    getVisitByFamily(number) {
      if (number && this.search3.pageNumber !== number) {
        this.search3.pageNumber = number
      }

      Service.getInquiryByFamily({
        serviceType: 'returnVisit',
        patientNo: this.data.id,
        p: this.search3.pageNumber,
        size: this.search3.pageSize
      }).then((res) => {
        const data = res.data
        this.visitInfo = data
      })
    },

    getPrescriptionByfamily(number) {
      if (number && this.search2.pageNumber !== number) {
        this.search2.pageNumber = number
      }

      Service.getPrescriptionByfamily({
        patientNo: this.data.id,
        p: this.search2.pageNumber,
        size: this.search2.pageSize
      }).then((res) => {
        const data = res.data
        this.prescriptionInfo = data
      })
    },

    showInquiryDetail(row, type) {
      Service.getInquiryInfo({ inquiryNo: row.inquiryNo }).then((res) => {
        const rs = res.data
        if (rs.msgInfo.length > 0) {
          this.inquiryDialog.data = rs
          this.inquiryDialog.title = type == 'returnVisit' ? '复诊详情' : '咨询详情'
          this.inquiryDialog.visible = true
        } else {
          const msg = rs.msg ? rs.msg : `暂无${type == 'returnVisit' ? '复诊' : '咨询'}记录`
          this.$message.error(msg)
        }
      })
    },

    showPrescriptionDetail(row) {
      const fetch = async () => {
        const params = { prescriptionNo: row.id }
        const res = await Service.getPrescriptionDetail(params)

        return res.data
      }

      this.prescriptionDialog.visible = true
      this.prescriptionDialog.data = fetch
    },
    back() {
      this.$emit('onBack')
    }
    // tabClick(info) {
    //   const index = info.index
    //   switch (index) {
    //     case 0:
    //       if (this.inquiryInfo.list.length != 0) {
    //         this.getInquiryByFamily()
    //       }
    //       break
    //     case 1:
    //       if (this.prescriptionInfo.list.length != 0) {
    //         this.getPrescriptionByfamily()
    //       }
    //       break
    //     case 2:
    //       if (this.prescriptionInfo.list.length != 0) {
    //         this.getVisitByFamily()
    //       }
    //       break
    //     case 3:
    //       this.getServiceByfamily()
    //       break
    //   }
    // }
  },

  activated() {
    this.getList()
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-top: 10px;
  padding: 20px;
  background-color: #fff;
  // .list {
  // overflow: auto;
  // }
}
.dividing-line-style {
  height: 1px;
  background: #efefef;
}
::v-deep .el-tabs__nav-wrap:after {
  height: 1px;
}
.infor-row {
  margin: 10px 0 20px 0;

  &:last-child {
    margin: 10px 0 10px 0;
  }

  .col {
    display: inline-block;
    margin: 0 10px 0 0;

    &.label {
      vertical-align: top;
      text-align: left;
      text-align-last: left;
      color: #333333;
    }
    &.value {
      color: rgba(51, 51, 51, 1);
    }

    &.col-1 {
      width: 4em;
      margin-right: 4px;
    }
    &.col-2 {
      width: 10em;
    }
    &.col-3 {
      width: 15em;
    }

    &.col-4 {
      width: 50em;
    }

    .tag {
      border: 0;
      margin: 0 10px 0 0;
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>