<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline=""
               label-width="auto"
               label-suffix="：">

        <el-form-item label="机构名称">
          <el-input v-model.trim=" model.organizationName"
                    placeholder="请输入机构名称"></el-input>
        </el-form-item>

        <el-form-item class="search-btn">
          <el-button type="primary"
                     @click="get()">查询</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="card">

      <div class="top-menu q-mb-md">
        <el-button type="primary"
                   @click="addItem()">新增机构特约商户</el-button>

      </div>

      <peace-table ref="table"
                   style="width: 100%"
                   pagination
                   max-height="600">
        <peace-table-column width="80"
                            type="index"
                            label="序号">
        </peace-table-column>
        <peace-table-column prop="organizationName"
                            min-width="160"
                            label="机构名称">
        </peace-table-column>
        <peace-table-column prop="subMchName"
                            min-width="160"
                            label="已配置订单类型">
          <template slot-scope="scope">
            {{scope.row.orderTypeArr.map(item=>item.orderTypeTxt).join(',')}}
          </template>
        </peace-table-column>
        <peace-table-column prop="subMchName"
                            min-width="160"
                            label="商户号机构名称">
        </peace-table-column>
        <peace-table-column prop="subMchId"
                            width="160"
                            label="商户号">
        </peace-table-column>
        <peace-table-column prop="accountingRate"
                            width="160"
                            label="微信结算费率">
        </peace-table-column>
        <peace-table-column prop="maxShareRatio"
                            width="160"
                            label="允许最大分账比率">
        </peace-table-column>
        <peace-table-column prop="createdTime"
                            width="160px"
                            label="创建时间">
        </peace-table-column>
        <peace-table-column prop="updatedTime"
                            width="160px"
                            label="更新时间">
          <template slot-scope="scope">
            {{scope.row.updatedTime||'--'}}
          </template>
        </peace-table-column>
        <peace-table-column fixed="right"
                            width="220px"
                            label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showItem(scope.row)">查看详情</el-button>
            <el-button type="text"
                       v-on:click="receiverManagement(scope.row)">分账人管理</el-button>
            <el-button type="text"
                       v-on:click="deleteItem(scope.row)">删除</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </div>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="addItemDialog.visible"
                  v-if="addItemDialog.visible"
                  width="880px"
                  append-to-body
                  :title="addItemDialog.type=='add'?'新增机构特约商户':'查看详情'">
      <ReceiverDetail :organizationList="organizationList"
                      :currentOrganization="currentOrganization"
                      :type="addItemDialog.type"
                      v-on:onSucess="addReceiverSuccess"
                      v-on:onCancel="addItemDialog.visible = false" />
    </peace-dialog>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="receiverDialog.visible"
                  v-if="receiverDialog.visible"
                  width="1000px"
                  append-to-body
                  title="分账人管理">
      <ReceiverManagement v-bind:info="receiverDialog.info"
                          v-on:onSucess="receiverDialog.visible = false"
                          v-on:onCancel="receiverDialog.visible = false" />
    </peace-dialog>

  </div>
</template>

<script>
import Service from './service'
// import AddReceiver from './components/AddReceiver'
import ReceiverManagement from './components/ReceiverManagement'
import ReceiverDetail from './components/ReceiverDetail'
export default {
  name: 'receiver',

  components: {
    // AddReceiver,
    ReceiverManagement,
    ReceiverDetail
  },

  data() {
    return {
      model: {
        organizationName: ''
      },
      addItemDialog: {
        visible: false,
        type: 'add'
      },
      receiverDialog: {
        visible: false,
        info: {}
      },
      organizationList: [],
      currentOrganization: {}
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },
  methods: {
    get() {
      const fetch = Service.getSubMchList
      const params = this.model
      this.$refs.table.reloadData({ fetch, params })
    },

    addItem() {
      return Service.getOrganizationList().then((res) => {
        this.organizationList = res.data
        this.addItemDialog.visible = true
        this.addItemDialog.type = 'add'
      })
    },
    showItem(item) {
      this.currentOrganization = {
        organizationName: item.organizationName,
        custCode: item.custCode
      }
      this.addItemDialog.visible = true
      this.addItemDialog.type = 'detail'
    },
    addReceiverSuccess() {
      this.addItemDialog.visible = false
      this.get()
    },

    deleteItem(data) {
      this.$confirm('', '是否确认删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showClose: false,
        left: true,
        closeOnClickModal: false,
        closeOnPressEscape: false
      }).then(() => {
        Service.delSubMch({ custCode: data.custCode }).then((res) => {
          Peace.util.success(res.msg)
          this.get()
        })
      })
    },

    receiverManagement(data) {
      this.receiverDialog.info.custCode = data.custCode
      this.receiverDialog.info.subMchId = data.subMchId
      this.receiverDialog.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>