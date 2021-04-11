<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form :model="model"
               label-suffix="："
               inline>
        <el-form-item label="服务包名称">
          <el-input placeholder="请输入"
                    v-model="model.servicePackageName"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="核销操作人">
          <el-input placeholder="请输入"
                    v-model="model.docName"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="流水号">
          <el-input placeholder="请输入"
                    v-model="model.waterNo"
                    clearable
                    style="width:260px;"></el-input>
        </el-form-item>
        <el-form-item label="核销时间">
          <peace-date-picker type="daterange"
                             value-format="yyyy-MM-dd"
                             v-model="TimeRange"></peace-date-picker>
        </el-form-item>
        <el-form-item class="search-btn">
          <el-button v-on:click="fetch"
                     type="primary">查询</el-button>
          <!-- <el-button v-on:click="resert">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <peace-table pagination
                   ref="table">
        <PeaceTableColumn prop="orderNumber"
                          label="序号"
                          min-width="60px"></PeaceTableColumn>
        <PeaceTableColumn label="流水号"
                          width="300px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showOrderDetail(scope.row)">{{ scope.row.waterNo}}</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn prop="businessType"
                          label="关联业务"></PeaceTableColumn>

        <PeaceTableColumn prop="businessNo"
                          label="关联交易单号"
                          min-width="240px"></PeaceTableColumn>
        <PeaceTableColumn prop="servicePackageName"
                          label="服务包名称"
                          min-width="160px">
        </PeaceTableColumn>
        <PeaceTableColumn label="交易医院"
                          prop="hospitalName">
        </PeaceTableColumn>
        <PeaceTableColumn label="核销权益"
                          min-width="100px"
                          prop="writeName">
        </PeaceTableColumn>
        <PeaceTableColumn label="核销时间"
                          prop="createdTime"
                          min-width="180px">
        </PeaceTableColumn>
        <PeaceTableColumn label="核销操作人">
          <template slot-scope="scope">
            {{scope.row.operater||"——"}}
          </template>?
        </PeaceTableColumn>
      </peace-table>
    </div>

    <PeaceDialog title="核销记录"
                 width="636px"
                 v-if="SerialNumDetailDialog.visible"
                 v-bind:visible.sync="SerialNumDetailDialog.visible">
      <SerialNumDetail v-bind:data="SerialNumDetailDialog.data"></SerialNumDetail>
    </PeaceDialog>
  </div>
</template>
<script>
import Service from './service'
import SerialNumDetail from './components/SerialNumDetail'

export default {
  name: 'VerificationRecord',
  components: {
    SerialNumDetail
  },
  data() {
    return {
      TimeRange: [],
      model: {
        servicePackageName: '',
        docName: '',
        waterNo: '',
        startDate: '',
        endDate: ''
      },
      SerialNumDetailDialog: {
        visible: false,
        data: ''
      }
    }
  },
  watch: {
    TimeRange(value) {
      this.model.startDate = value?.[0] ?? ''
      this.model.endDate = value?.[1] ?? ''
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      const fetch = Service.writeRecordList
      const params = this.model
      this.$refs.table.reloadData({ fetch, params })
    },

    showOrderDetail(row) {
      this.SerialNumDetailDialog.data = row.waterNo
      this.SerialNumDetailDialog.visible = true
    }
    // resert() {
    //   this.TimeRange = []
    //   this.model = {
    //     servicePackageName: '',
    //     tel: '',
    //     mainPartName: '',
    //     orderStatus: '',
    //     payStatus: '',
    //     afterSaleStatus: '',
    //     orderNo: '',
    //     hosId: '',
    //     startDate: '',
    //     endDate: ''
    //   }
    //   this.fetch()
    // }
  }
}
</script>
<style lang="scss" scoped>
</style>
