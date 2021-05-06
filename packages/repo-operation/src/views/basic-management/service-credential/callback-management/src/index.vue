<template>
  <div class="layout-route full-width">
    <div class="card card-search q-mb-md">
      <el-form :model="model"
               label-suffix="："
               inline>
        <el-form-item label="机构名称">
          <el-select v-model="model.role"
                     placeholder="全部">
            <el-option v-for="item in source.hospitalList"
                       v-bind:key="item.roleId"
                       v-bind:label="item.roleName"
                       v-bind:value="item.roleId"></el-option>
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
                          prop=""></PeaceTableColumn>
        <PeaceTableColumn label="系统名称"
                          prop=""></PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          min-width="180px"
                          prop=""></PeaceTableColumn>
        <PeaceTableColumn label="创建时间"
                          min-width="180px"
                          prop=""></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          prop="">
          <template slot-scope="scope">

            <el-button class="q-px-none"
                       type="text"
                       v-on:click="openSystemDetailDialog(scope.row)">查看详情</el-button>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="removeCallbaclSystem(scope.row)">删除</el-button>
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
                  width="600px">
      <CallbackSystemDetail :info="currentInfo" />
      <!-- 回调系统 新增 -->
    </peace-dialog>
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="callbackSystemModelDialog"
                  title="新增系统"
                  v-if="callbackSystemModelDialog"
                  append-to-body
                  width="600px">
      <CallbackSystemModel :info="{}"
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
      model: {},
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
      this.fetch()
    })
  },
  methods: {
    fetch() {
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.getPatientList
      this.$refs.table.reloadData({ fetch, params })
    },
    openSystemModelDialog() {
      this.callbackSystemModelDialog = true
    },
    openSystemDetailDialog() {
      this.callbackSystemDetailDialog = true
    },
    removeCallbaclSystem() {
      this.$confirm('确定删除吗？', { closeOnClickModal: false, closeOnPressEscape: false }).then(() => {
        // Service.delMenu(row).then((res) => {
        //   Peace.util.success(res.msg)
        //   this.fetch()
        // })
      })
    }
  }
}
</script>

<style>
</style>