<template>
  <div class="layout-route full-width">
    <div class="card card-search q-mb-md">
      <el-form :model="model"
               label-suffix="："
               inline>
        <el-form-item label="机构名称">
          <el-select v-model="model.CustCode"
                     clearable
                     placeholder="全部">
            <el-option v-for="item in source.hospitalList"
                       v-bind:key="item.CustCode"
                       v-bind:label="item.CustName"
                       v-bind:value="item.CustCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <div class="q-mb-md">
        <el-button v-on:click="openSystemModelDialog">新增系统</el-button>
      </div>
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn type="index"
                          label="序号"
                          width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="机构名称"
                          prop="CustName"></PeaceTableColumn>
        <PeaceTableColumn label="系统名称"
                          prop="SysName"></PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          min-width="180px"
                          prop="LastModifyTime"></PeaceTableColumn>
        <PeaceTableColumn label="创建时间"
                          min-width="180px"
                          prop="CreateTime"></PeaceTableColumn>
        <PeaceTableColumn label="操作">
          <template slot-scope="scope">

            <el-button class="q-px-none"
                       type="text"
                       v-on:click="openSystemDetailDialog(scope.row)">查看详情</el-button>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="removeCallbackSystem(scope.row)">删除</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>

    </div>
    <!-- 回调系统详情 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="callbackSystemDetailDialog"
                  title="查看详情"
                  v-if="callbackSystemDetailDialog"
                  append-to-body
                  width="620px">
      <CallbackSystemDetail :info="currentInfo"
                            v-on:refreshList="fetch"
                            v-on:cancelEdit="cancelEdit"
                            v-on:completeEdit="completeEdit" />
      <!-- 回调系统 新增 -->
    </peace-dialog>
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="callbackSystemModelDialog"
                  title="新增系统"
                  v-if="callbackSystemModelDialog"
                  append-to-body
                  width="620px">
      <CallbackSystemModel :info="{}"
                           v-on:cancelAdd="cancelAdd"
                           v-on:completeAdd="completeAdd"
                           :type="'add'" />
    </peace-dialog>
  </div>
</template>

<script>
import Service from './service'
import CallbackSystemDetail from './components/CallbackSystemDetail'
import CallbackSystemModel from './components/CallbackSystemModel'
export default {
  name: 'CallbackManagement',
  components: { CallbackSystemDetail, CallbackSystemModel },
  data() {
    return {
      model: {
        CustCode: ''
      },
      currentInfo: {},
      callbackSystemModelDialog: false,
      callbackSystemDetailDialog: false,
      source: {
        hospitalList: []
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getDeptList()
      this.fetch()
    })
  },
  methods: {
    getDeptList() {
      Service.getDeptList().then((res) => {
        this.source.hospitalList = res.data.list
      })
    },
    fetch() {
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.getSyncStatusList
      this.$refs.table.reloadData({ fetch, params })
    },
    openSystemModelDialog(data) {
      this.currentInfo = data
      this.callbackSystemModelDialog = true
    },
    openSystemDetailDialog(data) {
      this.currentInfo = data
      this.callbackSystemDetailDialog = true
    },
    removeCallbackSystem(data) {
      this.$confirm('确定删除吗？', { closeOnClickModal: false, closeOnPressEscape: false }).then(() => {
        Service.deleteSyncStatus({id: data.Id}).then((res) => {
          Peace.util.success(res.msg)
          this.fetch()
        })
      })
    },
    cancelAdd() {
      this.callbackSystemModelDialog = false
    },
    completeAdd() {
      this.callbackSystemModelDialog = false
      this.fetch()
    },
    cancelEdit() {
      this.callbackSystemModelDialog = false
      this.callbackSystemDetailDialog = false
    },
    completeEdit() {
      this.callbackSystemModelDialog = false
      this.callbackSystemDetailDialog = false
      this.fetch()
    }
  }
}
</script>

<style>
</style>
