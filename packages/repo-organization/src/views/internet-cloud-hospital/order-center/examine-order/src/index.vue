<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline=""
               label-width="auto"
               label-position="left">

        <el-form-item>
          <span slot="label">
            <span>医生姓名</span>
            <span>：</span>
          </span>
          <el-input v-model="model.docName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>患者姓名</span>
            <span>：</span>
          </span>
          <el-input v-model="model.parentName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label-width="110px">
          <span slot="label">
            <span>检查项目名称</span>
            <span>：</span>
          </span>
          <el-input v-model="model.name"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     @click="getList()">查询</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="card">

      <PeaceTable ref="table"
                  style="width: 100%"
                  stripe
                  pagination>
        <PeaceTableColumn label="序号"
                          type="index"
                          width="80">
        </PeaceTableColumn>
        <PeaceTableColumn label="订单编号"
                          width="240">
          <template slot-scope="scope">
            <div class="primary"
                 @click="getExamineDetail(scope.row)">{{scope.row.orderNo}}</div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="医生"
                          width="220">
          <template slot-scope="scope">
            {{ scope.row.doctorName + '  ' + scope.row.netdeptChild + '  ' + scope.row.doctorTitle }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="检查项目"
                          width="250"
                          prop="checkName"></PeaceTableColumn>
        <PeaceTableColumn label="患者"
                          width="150">
          <template slot-scope="scope">
            {{ scope.row.familyName + '  ' + scope.row.sex + '  ' + scope.row.age  }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="订单金额（元）"
                          align="right"
                          header-align="right"
                          width="125"
                          prop="orderMoney"></PeaceTableColumn>
        <PeaceTableColumn label="下单时间"
                          min-width="165"
                          prop="createdTime"></PeaceTableColumn>
        <PeaceTableColumn label="订单状态"
                          min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.orderStatus | getEnumLabel(source.ENUM_ORDER_STATUS) }}</span>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog :visible.sync="dialogVisible"
                 append-to-body
                 title="订单详情"
                 v-if="dialogVisible"
                 width="580px">
      <examine-detail :info="currentOrder"
                      :order-no="currentOrderNo"
                      :order-status="currentOrderStatus"></examine-detail>
    </PeaceDialog>
  </div>
</template>

<script>
import CONSTANT from './constant'
import Service from './service'
import ExamineDetail from './components/ExamineDetail'

export default {
  name: 'ExamineOrder',
  components: { ExamineDetail },
  data() {
    return {
      source: {
        ENUM_ORDER_STATUS: CONSTANT.ENUM_ORDER_STATUS
      },
      model: {
        docName: '',
        parentName: '',
        name: ''
      },

      currentOrder: {},
      currentOrderNo: '',
      currentOrderStatus: '',
      dialogVisible: false
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getList()
    })
  },
  methods: {
    getList() {
      const fetch = Service.getExamineOrderList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },
    getExamineDetail(item) {
      let params = {
        orderNo: item.orderNo,
        orderStatus: item.orderStatus
      }
      Service.getExamineDetail(params).then((res) => {
        const data = res.data
        if (data) {
          this.currentOrder = data
          this.currentOrderNo = item.orderNo
          this.currentOrderStatus = item.orderStatus
          this.dialogVisible = true
        } else {
          Peace.util.error(data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.primary {
  color: var(--q-color-primary);
  cursor: pointer;
}
</style>