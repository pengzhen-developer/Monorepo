<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-suffix="："
               size="mini">
        <el-form-item label="机构名称">
          <el-input v-model.trim="model.organizationName"
                    placeholder="请输入机构名称"></el-input>
        </el-form-item>
        <el-form-item class="search-btn">
          <el-button type="primary"
                     v-bind:disabled="searching"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>

    </div>
    <div class="card">
      <div class="q-mb-lg">
        <el-button type="primary"
                   icon="el-icon-plus"
                   v-on:click="onOpen('add',{})">新增机构规则</el-button>
      </div>

      <peace-table ref="table"
                   size="mini"
                   pagination>
        <peace-table-column type="index"
                            width="80"
                            label="序号"></peace-table-column>
        <peace-table-column min-width="180px"
                            label="机构名称"
                            prop="organizationName">
        </peace-table-column>
        <peace-table-column min-width="140px"
                            label="服务类型"
                            prop="serviceTypeStr">
        </peace-table-column>
        <peace-table-column min-width="180px"
                            label="已配置订单类型"
                            prop="orderTypeStr">
        </peace-table-column>
        <peace-table-column min-width="180px"
                            label="创建时间"
                            prop="createdTime"></peace-table-column>
        <peace-table-column min-width="180px"
                            label="更新时间"
                            prop="updatedTime">
          <template slot-scope="scope">
            {{ scope.row.updatedTime||'——' }}
          </template>
        </peace-table-column>
        <peace-table-column min-width="180px"
                            fixed="right"
                            label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="onOpen('detail',scope.row)">查看详情</el-button>
            <el-button type="text"
                       v-on:click="onOpen('edit',scope.row)">编辑</el-button>
            <el-button type="text"
                       v-on:click="onRemove(scope.row.custCode,scope.row.serviceType)">删除</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </div>
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  v-if="modelDialog.visible"
                  append-to-body
                  destroy-on-close
                  width="900px"
                  v-bind:visible.sync="modelDialog.visible"
                  :title="modelDialog.type=='add'?'新增机构规则':'编辑机构规则'">
      <SeparateRuleModel v-bind:info='modelDialog.info'
                         v-bind:orderTypes="source.orderType"
                         v-if="modelDialog.visible"
                         v-on:onSucess="onSucess"
                         v-on:onCancel="onCancel"></SeparateRuleModel>
    </peace-dialog>
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  v-if="detailDialog.visible"
                  append-to-body
                  width="900px"
                  v-bind:visible.sync="detailDialog.visible"
                  title="机构规则详情">
      <SeparateRuleDetail v-bind:info='detailDialog.info'
                          v-bind:orderTypes="source.orderType"
                          v-on:onSucess="onSucess"
                          v-on:onCancel="onCancel"></SeparateRuleDetail>
    </peace-dialog>
  </div>
</template>

<script>
import SeparateRuleModel from './components/separate-rule-model'
import SeparateRuleDetail from './components/separate-rule-detail'
import Service from './service'
import Constant from './contant'

export default {
  name: 'SeparateRule',
  components: {
    SeparateRuleModel,
    SeparateRuleDetail
  },
  data() {
    return {
      Constant: Constant,
      model: {
        organizationName: ''
      },
      searching: false,
      detailDialog: {
        visible: false,
        info: {},
        type: false
      },
      modelDialog: {
        visible: false,
        info: {},
        type: false
      },
      source: {
        orderType: []
      }
    }
  },
  async mounted() {
    const orderTypes = await Peace.identity.dictionary.getList('service_order_type')
    orderTypes.forEach((item) => (item.value = parseInt(item.value)))
    this.source.orderType = Peace.util.deepClone(orderTypes)
    this.$nextTick().then(() => {
      this.get()
    })
  },
  methods: {
    get() {
      const fetch = Service.getProfitsharingRuleList
      const params = this.model
      this.$refs.table.reloadData({ fetch, params })
    },
    onSucess() {
      this.detailDialog.visible = false
      this.modelDialog.visible = false
      this.get()
    },
    onCancel() {
      this.detailDialog.visible = false
      this.modelDialog.visible = false
    },
    onOpen(type, data) {
      if (type != 'add') {
        data.profitsharingRule.map((rule) => {
          rule.isProfitsharing = Number(rule.isProfitsharing)
          rule.isDel = 0
          rule.accounts.map((account) => {
            account.receiver = account.receive_account
            account.receiverName = account.receive_name
            account.value = account.receive_name && account.receive_account ? account.receive_name + ' ' + account.receive_account : ''
          })
          if (rule.accounts.length == 0) {
            rule.accounts.push({
              value: '', //分账人名称+' '+分账接收账号
              subMchId: '', //分账接收账号
              receiveName: '', //分账人名称
              percentage: '' //分账百分比例
            })
          }
        })
      }
      if (type == 'detail') {
        this.detailDialog.visible = true
        this.detailDialog.info = data
        this.modelDialog.info.type = type
        this.detailDialog.type = type
      } else {
        this.modelDialog.visible = true
        this.modelDialog.info = data
        this.modelDialog.info.type = type
        this.modelDialog.type = type
      }
    },
    onRemove(custCode, serviceType) {
      this.$confirm('', '是否确认删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showClose: false,
        center: true,
        closeOnClickModal: false,
        closeOnPressEscape: false
      }).then(() => {
        Service.delProfitsharingRule({ custCode: custCode, serviceType: serviceType }).then((res) => {
          Peace.util.success(res.msg)
          this.get()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>