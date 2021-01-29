<template>
  <div class="layout-route full-width">
    <el-alert type="warning"
              class="q-mb-16"
              v-bind:closable="false">
      <div slot="title">
        <div>1、请先在【基础管理--机构列表】中配置好机构的订单承接系统，若不设置，将默认该机构不支持申请订单取消流程；</div>
        <div>2、机构需开通 "药品供应服务" 并审核通过，否则将不会出现在下方列表中。</div>
      </div>
    </el-alert>
    <div class="card">
      <peace-table ref="table"
                   size="mini"
                   pagination>
        <peace-table-column label="供应机构名称"
                            prop="Name">
          <template slot-scope="scope">
            {{scope.row.Name||'——'}}
          </template>
        </peace-table-column>
        <peace-table-column label="订单承接系统"
                            prop="sys_name">
          <template slot-scope="scope">
            {{scope.row.sys_name||'——'}}
          </template>
        </peace-table-column>
        <peace-table-column label="是否支持申请订单取消"
                            prop="IsSuCancel">
          <template slot-scope="scope">
            <el-switch v-bind:disabled="scope.row.sys_name == null || scope.row.sys_name == '' "
                       v-model="scope.row.IsSuCancel"
                       v-on:change="update(scope.row)">
            </el-switch>
            <span style="margin-left: 16px;">{{ scope.row.IsSuCancel? "支持":"不支持"}}</span>
          </template>
        </peace-table-column>
        <peace-table-column label="更新时间"
                            prop="UpCancelTime"
                            width="180px">
          <template slot-scope="scope">
            {{scope.row.UpCancelTime||'——'}}
          </template>
        </peace-table-column>
      </peace-table>
    </div>
  </div>

</template>

<script>
import Serivce from './service/index'
export default {
  name: 'OrderCancel',
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      const fetch = Serivce.ListCustomer
      this.$refs.table.reloadData({ fetch })
    },

    update(row) {
      this.$confirm('是否确认操作', '提示', { closeOnClickModal: false, closeOnPressEscape: false })
        .then(() => {
          const params = {
            Code: row.Code,
            IsSuCancel: row.IsSuCancel
          }
          Serivce.UpdateCust(params).then((res) => {
            Peace.util.success(res.msg)
            this.fetch()
          })
        })
        .catch(() => {
          row.IsSuCancel = row.IsSuCancel == true ? false : true
        })
    }
  }
}
</script>

<style>
</style>